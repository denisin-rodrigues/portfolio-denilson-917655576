"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed background grid lines with animated beam effects.
 * Ported from the canvas-based grid in the design system reference.
 */
export default function BackgroundGrid() {
  const beamRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const speeds = [1.5, 2.0, 2.5, 1.8, 2.2];
    const positions = speeds.map(() => Math.random() * -1000);

    let animationId: number;
    const animate = () => {
      beamRefs.current.forEach((beam, i) => {
        if (!beam) return;
        positions[i] += speeds[i];
        if (positions[i] > window.innerHeight) {
          positions[i] = -300;
        }
        beam.style.transform = `translateY(${positions[i]}px)`;
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  const beamHeights = ["h-56", "h-72", "h-40", "h-64", "h-48"];
  const beamOpacities = ["via-white/25", "via-white/15", "via-white/35", "via-white/20", "via-white/30"];
  const breakpoints = ["lg:block", "md:block", "sm:block", "md:block", "lg:block"];

  return (
    <div className="fixed inset-0 z-0 flex justify-center overflow-hidden pointer-events-none">
      <div className="flex h-full w-full max-w-7xl justify-evenly border-x border-border-primary/50">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`relative hidden h-full w-px overflow-hidden bg-border-primary/30 ${breakpoints[i]}`}
          >
            <div
              ref={(el) => { beamRefs.current[i] = el; }}
              className={`absolute left-0 top-0 ${beamHeights[i]} w-full bg-gradient-to-b from-transparent ${beamOpacities[i]} to-transparent`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
