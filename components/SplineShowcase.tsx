"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SplineShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".showcase-content", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    // Forcefully hide Spline Logo via injected CSS in Shadow DOM
    const removeLogoInterval = setInterval(() => {
      const viewer = document.querySelector("spline-viewer");
      if (viewer && viewer.shadowRoot) {
        // If we haven't injected the style yet
        if (!viewer.shadowRoot.querySelector("#hide-logo-style")) {
          const style = document.createElement("style");
          style.id = "hide-logo-style";
          style.innerHTML = `
            #logo, .logo, a[href*="spline.design"] {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
            }
          `;
          viewer.shadowRoot.appendChild(style);
          clearInterval(removeLogoInterval);
        }
      }
    }, 200);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      clearInterval(removeLogoInterval);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 border-t border-border-primary w-full h-[600px] md:h-[800px] overflow-hidden bg-bg-primary flex items-center justify-center"
      id="3d-showcase"
    >
      {/* Spline Canvas */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <div
            className="absolute inset-0"
            dangerouslySetInnerHTML={{
              __html: `<spline-viewer url="https://prod.spline.design/tP6N9ru3NxmVywFo/scene.splinecode" style="width: 100%; height: 100%; display: block;"></spline-viewer>`,
            }}
          />
        )}
        
        {/* Fallback gradients to blend edges */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary to-transparent z-10 pointer-events-none" />
      </div>

      {/* Optional Overlay Content */}
      <div className="showcase-content relative z-20 pointer-events-none mt-auto mb-12">
        <div className="backdrop-blur-md bg-bg-primary/50 border border-border-primary/50 px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
          <span className="font-display text-label-md tracking-label uppercase text-text-primary">
            Interaja com o modelo
          </span>
        </div>
      </div>
    </section>
  );
}
