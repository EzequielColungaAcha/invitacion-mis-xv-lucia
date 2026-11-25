"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "cn";

export type RevealVariant = "up" | "down" | "right";

export function Reveal({
  children,
  className,
  delay = 0,
  active = true,
  variant = "up",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  active?: boolean;
  variant?: RevealVariant;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("reveal-in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          el.classList.add("reveal-in");
          if (once) observer.disconnect();
        } else if (!once) {
          el.classList.remove("reveal-in");
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [active, once]);

  return (
    <div
      ref={ref}
      className={cn("reveal", `reveal-${variant}`, className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
