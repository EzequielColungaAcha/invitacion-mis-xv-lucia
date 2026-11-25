"use client";

import { withBase } from "@/lib/base-path";

const dust = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  size: i % 3 === 0 ? 3 : 2,
  delay: `${(i % 8) * 0.65}s`,
  duration: `${9 + (i % 6)}s`,
  drift: `${(i % 5) - 2}vw`,
}));

export function Entrance({
  leaving,
  onOpen,
}: {
  leaving: boolean;
  onOpen: () => void;
}) {
  return (
    <div className={`entrance absolute flex justify-center items-center inset-0 z-20 ${leaving ? "is-leaving" : ""}`}>
      <img
        src={withBase("/decor/plate.png")}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#071426]/60" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {dust.map((mote, i) => (
          <span
            key={i}
            className="dust"
            style={{
              left: mote.left,
              width: mote.size,
              height: mote.size,
              animationDelay: mote.delay,
              animationDuration: mote.duration,
              ["--drift" as string]: mote.drift,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
        <p className="text-[0.72rem] tracking-[0.48em] text-silver uppercase">Mis XV</p>
        <p className="script-name foil foil-glow mt-2 font-script text-6xl">Lucía</p>

        <div className="seal-float mt-8">
          <div className="seal" aria-hidden>
            <span className="seal-spin" />
            <span className="seal-face relative">
              <svg viewBox="0 0 64 64" className="seal-monogram absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-[58%]" aria-hidden>
                <path
                  d="M32 50 C32 50 12 36 12 24 C12 16 18 11 25 11 C28.8 11 31.4 13.2 32 16.8 C32.6 13.2 35.2 11 39 11 C46 11 52 16 52 24 C52 36 32 50 32 50 Z"
                  fill="#071426"
                />
              </svg>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.68rem] tracking-[0.42em] text-night/80">
                23/01/27
              </span>
            </span>
          </div>
        </div>

        <button type="button" className="open-button mt-10" onClick={onOpen}>
          Abrir invitación
        </button>
      </div>
    </div>
  );
}
