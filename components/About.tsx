"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { BorderBeam } from "@/components/ui/border-beam";

const stats = [
  { value: "5+", label: "Anos" },
  { value: "20+", label: "Projetos" },
  { value: "IA", label: "Agentes" },
  { value: "∞", label: "Freelancer" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(".about-title", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top bottom",
            toggleActions: "play none none none"
          },
        }
      );

      // Bio text animation — line by line
      gsap.fromTo(".about-line", 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top bottom",
            toggleActions: "play none none none"
          },
        }
      );

      // Stats animation
      gsap.fromTo(".stat-item", 
        { y: 24, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top bottom",
            toggleActions: "play none none none"
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 border-t border-border-primary py-20 md:py-32"
      id="sobre"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-glow-blue" style={{ left: "12%", top: "16%" }} />
        <div className="ambient-glow-gold" style={{ right: "10%", bottom: "12%" }} />
      </div>

      <div className="md:px-12 w-full max-w-7xl z-10 mx-auto px-6 relative">
        {/* Section label */}
        <div className="flex gap-4 mb-9 items-center">
          <span className="w-7 md:w-10 h-px bg-accent-blue shrink-0" />
          <span className="text-label-sm sm:text-label-md uppercase tracking-label text-text-caption font-display">
            SOBRE MIM
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Title + Bio */}
          <div>
            <h2 className="about-title font-display uppercase leading-[0.98] tracking-heading text-heading-md sm:text-heading-lg md:text-heading-xl text-text-primary mb-8">
              Não apenas desenvolvo{" "}
              <span className="block text-accent-blue">
                — eu construo sistemas.
              </span>
            </h2>

            <div className="about-text space-y-4">
              <p className="about-line text-body-md sm:text-body-lg leading-relaxed font-light text-text-body">
                Sou Denilson Rodrigues — desenvolvedor full stack, arquiteto de agentes de IA, engenheiro de prompts e criador de conteúdo visual com inteligência artificial.
              </p>
              <p className="about-line text-body-md sm:text-body-lg leading-relaxed font-light text-text-body">
                Transformo ideias complexas em produtos digitais que funcionam: de agentes autônomos que criam lojas Shopify a times de IA que gerenciam perfis no Instagram.
              </p>
              <p className="about-line text-body-md sm:text-body-lg leading-relaxed font-light text-text-body">
                Minha stack combina React, Next.js, GSAP e Three.js no frontend com Python, LLMs e automações no backend — sempre com design system como fonte de verdade.
              </p>
              <p className="about-line text-body-md sm:text-body-lg leading-relaxed font-light text-accent-gold">
                &quot;Se existe um sistema repetitivo, eu automatizo. Se existe uma interface genérica, eu reinvento.&quot;
              </p>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="stats-grid grid grid-cols-2 gap-6 self-center">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-item group relative overflow-hidden bg-bg-primary border border-border-primary p-6 md:p-8 transition-colors duration-500 hover:border-accent-blue/30"
              >
                {/* BorderBeam effect */}
                <BorderBeam size={100} duration={8} colorFrom="#9ED8FF" colorTo="#CFAE6E" delay={i} />

                <div className="relative z-10">
                  <span className="block text-4xl sm:text-5xl md:text-6xl font-display text-text-primary tracking-tight mb-2">
                    {stat.value}
                  </span>
                  <span className="text-label-md uppercase tracking-label text-text-dim font-display">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
