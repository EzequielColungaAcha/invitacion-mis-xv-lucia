"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/event";

const target = new Date(event.startsAt).getTime();

export function Countdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const distance = target - Date.now();
      setDays(distance <= 0 ? 0 : Math.floor(distance / 86_400_000));
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (days === 0) {
    return <p className="poster-copy font-serif text-lg italic">Ya llegó la noche.</p>;
  }

  const label = days === 1 ? "Falta 1 día" : `Faltan ${days ?? "…"} días`;

  return <p className="poster-copy mt-1 font-serif text-lg tracking-wide">{label}</p>;
}
