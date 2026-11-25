"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Calendar, Clock, Home, MapPin, MessageCircle, Phone } from "lucide-react";
import { Countdown } from "@/components/countdown";
import { Flourish, HeartDivider } from "@/components/decor";
import { PlateField } from "@/components/plate-field";
import { Entrance } from "@/components/entrance";
import { MusicControl } from "@/components/music";
import { Reveal } from "@/components/reveal";
import { event } from "@/lib/event";

const Butterflies = dynamic(
  () => import("@/components/butterflies").then((mod) => mod.Butterflies),
  { ssr: false },
);

export function Invitation() {
  const [phase, setPhase] = useState<"sealed" | "opening" | "open">("sealed");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function openInvite() {
    if (phase !== "sealed") return;
    setPhase("opening");
    timer.current = window.setTimeout(() => {
      setPhase("open");
      titleRef.current?.focus();
    }, 780);
  }

  const shown = phase !== "sealed";
  const open = phase === "open";

  return (
    <main className="flex min-h-dvh justify-center bg-night px-3 py-4 text-foil">
      <div
        className={`relative w-full max-w-[430px] ${open ? "" : "h-[calc(100dvh-2rem)] overflow-hidden"}`}
      >
        <MusicControl active={open} />

        <article
          className={`invite relative min-h-[calc(100dvh-2rem)] overflow-hidden bg-night ${shown ? "is-open" : "pointer-events-none"}`}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="plate-zoom relative h-full min-h-full">
              <PlateField />
              <img
                src="/decor/plate-top.png"
                alt=""
                className="pointer-events-none absolute top-0 left-0 block h-auto w-full [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)]"
              />
              <img
                src="/decor/plate-bottom.png"
                alt=""
                className="pointer-events-none absolute bottom-0 left-0 block h-auto w-full [mask-image:linear-gradient(to_top,#000_58%,transparent_100%)]"
              />
            </div>
            <div className="tiara-shine" />
          </div>
          <div className="pointer-events-none absolute inset-0 z-[5]">
            <Butterflies />
          </div>

          <div className="relative z-10 flex flex-col items-center px-8 pt-36 pb-44 text-center">
            <header className={shown ? "rise" : ""}>
              <h1
                ref={titleRef}
                tabIndex={-1}
                className="script-name foil foil-glow font-script text-7xl outline-none"
              >
                {event.name}
              </h1>
              <div className="mt-1 flex items-center justify-center gap-2 text-silver">
                <Flourish className="h-3 w-12" />
                <p className="poster-copy text-sm tracking-[0.42em] uppercase">Mis</p>
                <Flourish className="h-3 w-12 scale-x-[-1]" />
              </div>
              <p className="foil foil-glow font-display text-6xl leading-none font-semibold tracking-wide">
                XV
              </p>
              <p className="poster-copy mt-3 font-serif text-lg tracking-wide">
                {event.dateLabel}
                <span className="mx-2 text-line" aria-hidden>
                  ·
                </span>
                {event.timeLabel}
              </p>
              <Countdown />
            </header>

            <div className="mt-5 w-full rounded-3xl bg-[#071426]/82 px-4 py-5">
            <Reveal active={shown}>
              <blockquote>
                <p className="poster-copy font-serif text-lg leading-relaxed italic">{event.quote[0]}</p>
                <p className="poster-copy mt-3 font-serif text-lg leading-relaxed italic">{event.quote[1]}</p>
                <footer className="script-name foil foil-glow mt-2 font-script text-5xl">
                  {event.signature}{" "}
                  <span className="align-middle text-[1.35rem]" aria-hidden>
                    💙
                  </span>
                </footer>
              </blockquote>
            </Reveal>

            <HeartDivider className="mt-3" />

            <Reveal className="mt-4 w-full" delay={80} active={shown}>
              <section className="space-y-3" aria-label="Detalles de la fiesta">
                <DetailRow icon={<Calendar className="size-5" />} label="Día" value={event.dateLabel} />
                <DetailRow icon={<Clock className="size-5" />} label="Hora" value={event.timeLabel} />
                <DetailRow icon={<MapPin className="size-5" />} label="Lugar" value={event.place} />
                <DetailRow
                  icon={<Home className="size-5" />}
                  label="Dirección"
                  value={`${event.address}, ${event.city}`}
                />
              </section>
            </Reveal>

            <Reveal className="mt-6 w-full" delay={140} active={shown}>
              <section aria-label="Confirmar asistencia">
                <p className="poster-copy flex items-center justify-center gap-2 font-serif text-lg">
                  <Phone className="size-5 shrink-0" aria-hidden />
                  Confirmar asistencia hasta el {event.rsvpBy}
                </p>
                <p className="poster-copy mt-2 font-serif text-[1.375rem]">
                  Teléfono:{" "}
                  <a className="poster-link font-medium" href={event.phoneTel}>
                    {event.phoneDisplay}
                  </a>
                </p>
                <nav className="mt-4 grid grid-cols-2 gap-2">
                  <a className="poster-action" href={event.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="size-5" />
                    Cómo llegar
                  </a>
                  <a className="poster-action" href={event.calendarUrl} target="_blank" rel="noopener noreferrer">
                    <Calendar className="size-5" />
                    Agendar
                  </a>
                  <a className="poster-action" href={event.phoneTel}>
                    <Phone className="size-5" />
                    Llamar
                  </a>
                  <a className="poster-action" href={event.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-5" />
                    WhatsApp
                  </a>
                </nav>
              </section>
            </Reveal>
            </div>
          </div>
        </article>

        {phase !== "open" ? <Entrance leaving={phase === "opening"} onOpen={openInvite} /> : null}
      </div>
    </main>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 text-left">
      <span className="poster-copy mt-1">{icon}</span>
      <div className="min-w-0">
        <p className="poster-copy text-sm tracking-[0.16em] uppercase">{label}</p>
        <p className="poster-copy font-serif text-lg leading-snug">{value}</p>
      </div>
    </div>
  );
}
