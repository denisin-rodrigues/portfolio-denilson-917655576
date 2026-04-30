"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";
import Image from "next/image";

const Orb = dynamic(() => import("@/components/ui/Orb"), { ssr: false });

/**
 * Hero Section — Full-screen with GSAP animations.
 * Features a cinematic fallback gradient background.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animations
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Badge entrance
      if (badgeRef.current) {
        tl.from(badgeRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }, 0);
      }

      // Headline lines
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".headline-line");
        tl.from(lines, {
          y: 40,
          opacity: 0,
          filter: "blur(6px)",
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        }, 0.2);
      }

      // Subheadline
      if (subRef.current) {
        tl.from(subRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }, 0.6);
      }

      // CTAs
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll("a");
        tl.from(buttons, {
          y: 18,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }, 0.8);
      }

      // Hero Ghost Text
      const heroGhost = sectionRef.current?.querySelector('.hero-ghost');
      if (heroGhost) {
        gsap.from(heroGhost, { opacity: 0, duration: 2, ease: "power2.out" });
        gsap.to(heroGhost, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Hero Image Animation
      const heroImg = sectionRef.current?.querySelector('.hero-image-container');
      if (heroImg) {
        gsap.from(heroImg, {
          x: 40,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.4
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex overflow-hidden z-10 relative items-center"
      id="hero"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 bg-bg-primary">
        {/* Orb Interactive Background */}
        <div className="absolute inset-0 z-0" style={{ opacity: 0.8 }}>
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={220} // Adjusted hue for a blueish tint
            forceHoverState={false}
            backgroundColor="#000000" // Set to black for transparency
          />
        </div>

        {/* Overlay gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/70 via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero Image - Now in front of Orb */}
      <div className="hero-image-container absolute right-0 bottom-0 w-full h-full md:w-1/2 z-10 pointer-events-none overflow-hidden select-none">
        <div className="relative w-full h-full">
          <Image
            src="/hero-portrait.png"
            alt="Denilson Rodrigues"
            fill
            priority
            unoptimized
            className="object-cover object-center md:object-right opacity-80"
            style={{ 
              maskImage: 'linear-gradient(to left, black 60%, transparent 100%), linear-gradient(to top, black 60%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%), linear-gradient(to top, black 60%, transparent 100%)',
              WebkitMaskComposite: 'source-in'
            }}
          />
        </div>
      </div>

      {/* Hero Ghost Text */}
      <div className="hero-ghost absolute top-1/4 left-0 right-0 flex justify-center pointer-events-none whitespace-nowrap z-0 overflow-hidden select-none">
        <span className="text-[12rem] md:text-[20rem] font-display font-black text-white/[0.02] uppercase tracking-tighter">
          DENISIN.IA
        </span>
      </div>



      {/* Content */}
      <div className="md:px-12 w-full max-w-7xl z-20 mx-auto px-6 relative">
        <div className="flex flex-col justify-end min-w-0 pt-10 md:pt-16 xl:pt-0">
          {/* Phase label / Badge */}
          <div ref={badgeRef} className="flex gap-4 mb-7 md:mb-9 items-center">
            <span className="w-7 md:w-10 h-px bg-accent-blue shrink-0" />
            <span className="text-label-sm sm:text-label-md uppercase tracking-label text-text-caption font-display">
              @denisin_ia
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display uppercase leading-[0.9] tracking-display mb-7 md:mb-8 max-w-full"
          >
            <span
              className="headline-line block text-display-xs sm:text-display-sm md:text-display-md lg:text-display-lg xl:text-display-xl text-text-secondary"
              style={{ filter: "drop-shadow(0 0 20px rgba(158,216,255,0.12))" }}
            >
              Do prompt
            </span>
            <span className="headline-line block text-display-xs sm:text-display-sm md:text-display-md lg:text-display-lg xl:text-display-xl text-gradient-blue mt-2">
              ao produto.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-body-md sm:text-body-lg md:max-w-[34rem] xl:max-w-[42rem] leading-relaxed font-light text-text-body font-body max-w-[42rem]"
          >
            Código, IA e visão criativa — pixel por pixel, agente por agente.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-8 md:mt-10 z-20 relative flex flex-wrap gap-4">
            {/* CTA Primary */}
            <a
              href="#projetos"
              className="group inline-flex items-center gap-4 px-5 md:px-7 py-3.5 md:py-4 text-label-md uppercase transition-all duration-300 hover:border-accent-gold/60 hover:text-accent-gold text-text-primary tracking-label font-display bg-bg-surface/90 border border-border-hover"
            >
              <span className="inline-flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-accent-blue transition-colors duration-300 group-hover:bg-accent-gold" />
                <span>VER PROJETOS</span>
              </span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M13 5l7 7-7 7" />
              </svg>
            </a>

            {/* CTA Secondary */}
            <a
              href="#contato"
              className="group inline-flex items-center gap-3 px-5 md:px-7 py-3.5 md:py-4 text-label-md uppercase transition-all duration-300 hover:text-accent-blue text-text-dim tracking-label font-display border border-border-primary hover:border-accent-blue/30"
            >
              <span>FALAR COMIGO</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="scroll-indicator flex flex-col items-center gap-2">
          <span className="text-label-sm text-text-dim font-display tracking-label uppercase">
            Scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            stroke="#7D8794"
            strokeWidth="1.5"
            className="opacity-50"
          >
            <rect x="1" y="1" width="14" height="22" rx="7" />
            <circle cx="8" cy="8" r="2" fill="#7D8794">
              <animate
                attributeName="cy"
                values="8;14;8"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
}
