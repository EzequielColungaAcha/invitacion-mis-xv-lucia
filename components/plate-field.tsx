"use client";

import { useEffect, useRef } from "react";

function hash(index: number) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export function PlateField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const draw = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const ground = ctx.createLinearGradient(0, 0, 0, height);
      ground.addColorStop(0, "#071426");
      ground.addColorStop(0.45, "#0b2248");
      ground.addColorStop(1, "#07111f");
      ctx.fillStyle = ground;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width * 0.5, height * 0.28, 10, width * 0.5, height * 0.42, width * 0.72);
      glow.addColorStop(0, "rgba(70, 120, 186, 0.38)");
      glow.addColorStop(1, "rgba(7, 20, 38, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const orbs = Math.round(height / 18);
      for (let i = 0; i < orbs; i += 1) {
        const x = hash(i * 3 + 1) * width;
        const y = hash(i * 3 + 2) * height;
        const radius = 6 + hash(i * 3 + 3) * 28;
        const alpha = 0.04 + hash(i * 5) * 0.12;
        const orb = ctx.createRadialGradient(x, y, 0, x, y, radius);
        orb.addColorStop(0, `rgba(232, 240, 250, ${alpha})`);
        orb.addColorStop(0.45, `rgba(143, 180, 214, ${alpha * 0.45})`);
        orb.addColorStop(1, "rgba(143, 180, 214, 0)");
        ctx.fillStyle = orb;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const sparks = Math.round(height / 7);
      for (let i = 0; i < sparks; i += 1) {
        const x = hash(i * 7 + 11) * width;
        const y = hash(i * 7 + 13) * height;
        const size = hash(i * 7 + 17) > 0.82 ? 1.7 : 1;
        ctx.fillStyle = `rgba(247, 249, 251, ${0.25 + hash(i * 7 + 19) * 0.7})`;
        ctx.fillRect(x, y, size, size);
      }

      const inset = width * 0.115;
      ctx.strokeStyle = "rgba(214, 224, 234, 0.72)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(inset, 0);
      ctx.lineTo(inset, height);
      ctx.moveTo(width - inset, 0);
      ctx.lineTo(width - inset, height);
      ctx.stroke();
      ctx.strokeStyle = "rgba(143, 180, 214, 0.35)";
      ctx.beginPath();
      ctx.moveTo(inset + 4, 0);
      ctx.lineTo(inset + 4, height);
      ctx.moveTo(width - inset - 4, 0);
      ctx.lineTo(width - inset - 4, height);
      ctx.stroke();
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
