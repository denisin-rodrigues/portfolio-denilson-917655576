"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { BorderBeam } from "@/components/ui/border-beam";

const topics = [
  {
    icon: "📐",
    title: "Design Systems",
    description: "Como extrair, documentar e aplicar tokens de cor, tipografia e espaçamento para projetos consistentes.",
  },
  {
    icon: "🧠",
    title: "Prompts & Skills",
    description: "Engenharia de prompts avançada — como criar skills que amplificam o poder de agentes de IA.",
  },
  {
    icon: "🎬",
    title: "IA Visual",
    description: "Produção de vídeo e imagem com IA generativa — do prompt ao conteúdo final de alta qualidade.",
  },
  {
    icon: "⚙️",
    title: "Automação de Fluxos",
    description: "Criação de pipelines automatizados com n8n, APIs e agentes — sistemas que trabalham por você.",
  },
];

export default function Teaching() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".teaching-card", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".teaching-grid",
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
      id="ensino"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-glow-gold" style={{ left: "15%", top: "25%" }} />
        <div className="ambient-glow-blue" style={{ right: "12%", bottom: "18%" }} />
      </div>

      <div className="md:px-12 w-full max-w-7xl z-10 mx-auto px-6 relative">
        {/* Section header */}
        <div className="flex gap-4 mb-7 items-center">
          <span className="w-7 md:w-10 h-px bg-accent-gold shrink-0" />
          <span className="text-label-sm sm:text-label-md uppercase tracking-label text-accent-gold font-display">
            ENSINO
          </span>
        </div>

        <h3 className="font-display uppercase leading-[0.98] tracking-heading text-heading-md sm:text-heading-lg md:text-heading-xl text-text-primary mb-4">
          Não só faço{" "}
          <span className="block text-accent-gold">— também ensino.</span>
        </h3>

        <p className="text-body-md sm:text-body-lg leading-relaxed font-light text-text-body max-w-2xl mb-14">
          Se você quer aprender a pensar em sistemas, você veio ao lugar certo.
        </p>

        {/* Topics grid */}
        <div className="teaching-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, i) => (
            <div
              key={i}
              className="teaching-card group relative overflow-hidden bg-bg-primary border border-border-primary p-6 md:p-8 transition-colors duration-500 hover:border-accent-gold/30"
            >
              {/* BorderBeam effect */}
              <BorderBeam size={120} duration={9} colorFrom="#CFAE6E" colorTo="#9ED8FF" delay={i} />

              <div className="relative z-10">
                <div className="text-2xl mb-4">{topic.icon}</div>
                <h4 className="font-display uppercase text-lg tracking-subheading text-text-primary mb-3">
                  {topic.title}
                </h4>
                <p className="text-sm leading-relaxed font-light text-text-dim">
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
