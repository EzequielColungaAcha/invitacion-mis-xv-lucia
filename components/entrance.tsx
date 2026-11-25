"use client";

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
        src="/decor/plate.png"
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
              <svg viewBox="0 0 64 64" className="seal-monogram absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2" aria-hidden>
                <path
                  transform="translate(-4.27 -1.24)"
                  d="M26 14 C25 16 24.5 20 25.2 24 C26 34 24.8 42 27.2 47 C29 51.2 35 54 43.5 51.6 C47.6 50.4 49 47.2 46.2 46.2 C41.8 44.8 36 47 32.6 49.2"
                  fill="none"
                  stroke="#071426"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.68rem] tracking-[0.42em] text-night/80">
                XV
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
