"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { event } from "@/lib/event";

const STORAGE_KEY = "lucia-xv-music";

export function MusicControl({ active }: { active: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(event.musicSrc);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const onCanPlay = () => setReady(true);
    const onError = () => setReady(false);
    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !active) return;

    const preferPlay = window.localStorage.getItem(STORAGE_KEY) !== "off";
    if (!preferPlay) {
      setPlaying(false);
      return;
    }

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    void tryPlay();
  }, [active]);

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio || !playing) return;
      if (document.hidden) {
        audio.pause();
      } else if (active) {
        void audio.play().catch(() => setPlaying(false));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [active, playing]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      window.localStorage.setItem(STORAGE_KEY, "off");
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      window.localStorage.setItem(STORAGE_KEY, "on");
    } catch {
      setPlaying(false);
    }
  }

  if (!active) return null;

  return (
    <button
      type="button"
      className="music-toggle"
      data-playing={playing ? "true" : "false"}
      onClick={() => void toggle()}
      aria-label={playing ? "Pausar música" : "Reproducir música"}
      title={ready ? (playing ? "Pausar" : "Música") : "Agregá public/audio/xv.mp3"}
    >
      {playing ? <Music2 className="size-4" /> : <VolumeX className="size-4" />}
    </button>
  );
}
