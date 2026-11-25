"use client";

import { useId } from "react";

function useSvgId() {
  return useId().replace(/:/g, "");
}

export function Tiara({ className }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" aria-hidden>
      <path
        d="M8 40 C18 28 28 14 40 22 C48 10 56 4 60 4 C64 4 72 10 80 22 C92 14 102 28 112 40"
        stroke={`url(#${id}-stroke)`}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M18 40 H102" stroke={`url(#${id}-stroke)`} strokeWidth="1.2" opacity="0.85" />
      <circle cx="60" cy="10" r="3.2" fill={`url(#${id}-gem)`} />
      <circle cx="42" cy="20" r="2.2" fill={`url(#${id}-gem)`} />
      <circle cx="78" cy="20" r="2.2" fill={`url(#${id}-gem)`} />
      <circle cx="28" cy="30" r="1.8" fill={`url(#${id}-gem)`} />
      <circle cx="92" cy="30" r="1.8" fill={`url(#${id}-gem)`} />
      <path
        d="M54 40 L60 28 L66 40 Z"
        fill={`url(#${id}-fill)`}
        stroke={`url(#${id}-stroke)`}
        strokeWidth="0.8"
      />
      <defs>
        <linearGradient id={`${id}-stroke`} x1="8" y1="4" x2="112" y2="40">
          <stop stopColor="#9eacbb" />
          <stop offset="0.45" stopColor="#ffffff" />
          <stop offset="1" stopColor="#a9b6c4" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="54" y1="28" x2="66" y2="40">
          <stop stopColor="#e8eef5" />
          <stop offset="1" stopColor="#8fb4d6" />
        </linearGradient>
        <radialGradient id={`${id}-gem`} cx="50%" cy="40%" r="60%">
          <stop stopColor="#dcecff" />
          <stop offset="1" stopColor="#3d6ea8" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Butterfly({ className }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg className={className} viewBox="0 0 64 52" fill="none" aria-hidden>
      <path
        d="M32 26 C22 8 6 10 8 22 C10 32 22 34 32 28"
        fill={`url(#${id}-wing)`}
        opacity="0.85"
      />
      <path
        d="M32 26 C42 8 58 10 56 22 C54 32 42 34 32 28"
        fill={`url(#${id}-wing)`}
        opacity="0.85"
      />
      <path
        d="M32 28 C24 34 14 40 16 46 C20 50 28 42 32 36"
        fill={`url(#${id}-wing)`}
        opacity="0.7"
      />
      <path
        d="M32 28 C40 34 50 40 48 46 C44 50 36 42 32 36"
        fill={`url(#${id}-wing)`}
        opacity="0.7"
      />
      <path d="M32 14 V38" stroke="#e8eef5" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M32 14 C28 8 24 6 22 8" stroke="#c5ced8" strokeWidth="1" strokeLinecap="round" />
      <path d="M32 14 C36 8 40 6 42 8" stroke="#c5ced8" strokeWidth="1" strokeLinecap="round" />
      <defs>
        <linearGradient id={`${id}-wing`} x1="8" y1="8" x2="56" y2="46">
          <stop stopColor="#9ec5ef" />
          <stop offset="0.5" stopColor="#5b8fd4" />
          <stop offset="1" stopColor="#1a3f72" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CornerBloom({
  className,
  flip,
}: {
  className?: string;
  flip?: boolean;
}) {
  const id = useSvgId();
  return (
    <svg
      className={className}
      viewBox="0 0 140 140"
      fill="none"
      aria-hidden
      style={flip ? { transform: "scale(-1)" } : undefined}
    >
      <path
        d="M18 42 C34 18 62 22 70 40 C78 22 108 20 124 44 C110 58 88 62 70 54 C52 62 30 56 18 42 Z"
        fill={`url(#${id}-ribbon)`}
        opacity="0.92"
      />
      <path
        d="M70 54 C62 70 58 92 64 118"
        stroke={`url(#${id}-edge)`}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M70 54 C78 72 86 94 82 118"
        stroke={`url(#${id}-edge)`}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="36" cy="58" r="7" fill="#eef3f8" opacity="0.9" />
      <circle cx="52" cy="46" r="5.5" fill="#dce6f0" opacity="0.85" />
      <circle cx="88" cy="48" r="6" fill="#eef3f8" opacity="0.88" />
      <circle cx="104" cy="62" r="5" fill="#d5e0ea" opacity="0.8" />
      <circle cx="44" cy="72" r="4" fill="#c9d6e4" opacity="0.75" />
      <circle cx="96" cy="74" r="4.5" fill="#c9d6e4" opacity="0.75" />
      <defs>
        <linearGradient id={`${id}-ribbon`} x1="18" y1="22" x2="124" y2="70">
          <stop stopColor="#1e4d8c" />
          <stop offset="0.45" stopColor="#2f6ab0" />
          <stop offset="1" stopColor="#163a6b" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="58" y1="54" x2="86" y2="118">
          <stop stopColor="#8fb4d6" />
          <stop offset="1" stopColor="#1a3f72" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function HeartDivider({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 18 16" className="mx-auto h-3 w-3 text-silver/70" fill="none">
        <path
          d="M9 14 C4 10 1.5 7.5 1.5 4.8 C1.5 2.8 3 1.5 4.8 1.5 C6.2 1.5 7.5 2.3 9 3.8 C10.5 2.3 11.8 1.5 13.2 1.5 C15 1.5 16.5 2.8 16.5 4.8 C16.5 7.5 14 10 9 14 Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

export function Flourish({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 12" fill="none" aria-hidden>
      <path
        d="M2 8 C10 2 18 2 24 6 C30 2 38 2 46 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="24" cy="7" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function BokehField() {
  const orbs = [
    { left: "8%", top: "12%", size: 90, opacity: 0.18 },
    { left: "72%", top: "8%", size: 120, opacity: 0.14 },
    { left: "48%", top: "28%", size: 70, opacity: 0.16 },
    { left: "18%", top: "58%", size: 100, opacity: 0.12 },
    { left: "78%", top: "62%", size: 80, opacity: 0.15 },
    { left: "40%", top: "78%", size: 110, opacity: 0.1 },
    { left: "88%", top: "40%", size: 54, opacity: 0.2 },
    { left: "6%", top: "36%", size: 46, opacity: 0.18 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {orbs.map((orb, i) => (
        <span
          key={i}
          className="bokeh"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            opacity: orb.opacity,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
      {Array.from({ length: 22 }, (_, i) => (
        <span
          key={`spark-${i}`}
          className="spark"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 9) * 0.45}s`,
            animationDuration: `${3.5 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}

export function SilverFrame() {
  return (
    <div className="silver-frame pointer-events-none absolute inset-3 sm:inset-4" aria-hidden />
  );
}
