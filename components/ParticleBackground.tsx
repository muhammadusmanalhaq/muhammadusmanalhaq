"use client";
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 55;
const CONNECT_DISTANCE = 140;
const BASE_SPEED = 0.18;
const COLOR = "90, 169, 230"; // soft tech-blue, as r,g,b

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }).map(
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * BASE_SPEED,
        vy: (Math.random() - 0.5) * BASE_SPEED,
        r: Math.random() * 1.5 + 1,
        pulse: Math.random() * Math.PI * 2,
      })
    );

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
    }
    window.addEventListener("resize", resize);

    function drawFrame(animated: boolean) {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (animated) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
          p.pulse += 0.02;
        }
        const glow = 0.4 + Math.sin(p.pulse) * 0.2;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${COLOR}, ${glow})`;
        ctx!.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const opacity = 0.18 * (1 - dist / CONNECT_DISTANCE);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${COLOR}, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }
    }

    if (prefersReducedMotion) {
      drawFrame(false);
      return () => window.removeEventListener("resize", resize);
    }

    let animationId: number;
    function animate() {
      drawFrame(true);
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
    />
  );
}
