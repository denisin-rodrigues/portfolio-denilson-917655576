"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { BorderBeam } from "@/components/ui/border-beam";

const skills = [
  {
    icon: "🤖",
    title: "Agentes de IA",
    description: "Criação de agentes autônomos com Python, LLMs, integração Shopify e Instagram API.",
    tags: ["Python", "LLMs", "Shopify", "Instagram API"],
    color: "accent-blue",
  },
  {
    icon: "⚡",
    title: "Frontend de Alto Impacto",
    description: "Interfaces premium com React, Next.js, GSAP e Three.js — animações cinematográficas.",
    tags: ["React", "Next.js", "GSAP", "Three.js"],
    color: "accent-blue-mid",
  },
  {
    icon: "🎬",
    title: "Vídeo & Imagem com IA",
    description: "Produção visual automatizada com Remotion, Antigravity e IA generativa.",
    tags: ["Remotion", "Antigravity", "IA Generativa"],
    color: "accent-blue-light",
  },
  {
    icon: "🧠",
    title: "Prompt Engineering & Skills",
    description: "Engenharia de prompts avançada para Claude Code, LLMs e skills customizadas.",
    tags: ["Claude Code", "LLMs", "Skills"],
    color: "accent-gold",
  },
  {
    icon: "📐",
    title: "Design System & Markdown",
    description: "Extração e documentação de tokens, criação de design systems completos.",
    tags: ["Tokens", "Documentação", "CSS"],
    color: "accent-gold-light",
  },
  {
    icon: "🚀",
    title: "Produto & Automação",
    description: "Backend, ofertas digitais, marketing automatizado e fluxos com n8n.",
    tags: ["Backend", "Marketing", "n8n", "Ofertas"],
    color: "accent-blue",
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-card", 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-grid",
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
      id="habilidades"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-glow-blue" style={{ right: "15%", top: "20%" }} />
        <div className="ambient-glow-gold" style={{ left: "8%", bottom: "15%" }} />
      </div>

      <div className="md:px-12 w-full max-w-7xl z-10 mx-auto px-6 relative">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <div className="flex gap-4 mb-7 items-center">
              <span className="w-7 md:w-10 h-px bg-accent-blue shrink-0" />
              <span className="text-label-sm sm:text-label-md uppercase tracking-label text-text-caption font-display">
                COMPETÊNCIAS
              </span>
            </div>
            <h3 className="font-display uppercase leading-[0.98] tracking-heading text-heading-md sm:text-heading-lg md:text-heading-xl text-text-primary max-w-[14ch]">
              O que eu{" "}
              <span className="block text-accent-blue">domino.</span>
            </h3>
          </div>

          {/* Decorative dots */}
          <div className="hidden md:flex gap-2 pb-2">
            <div className="w-2 h-2 bg-border-primary" />
            <div className="w-2 h-2 bg-border-primary" />
            <div className="w-2 h-2 bg-accent-blue" />
            <div className="w-2 h-2 bg-accent-gold" />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="skill-card group relative overflow-hidden bg-bg-primary border border-border-primary transition-colors duration-500 hover:border-accent-blue/30"
            >
              {/* Inner card bg */}
              <div className="absolute inset-[1px] bg-bg-primary z-0" />
              <div className="absolute inset-[1px] bg-gradient-to-b from-accent-blue/[0.04] to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* BorderBeam */}
              <BorderBeam size={120} duration={10} colorFrom="#9ED8FF" colorTo="#CFAE6E" delay={i * 1.5} />

              <div className="relative z-10 p-6 md:p-8">
                {/* Icon */}
                <div className="text-3xl mb-5 transition-transform duration-300 group-hover:rotate-[5deg]">
                  {skill.icon}
                </div>

                {/* Title */}
                <h4 className="font-display uppercase text-lg tracking-subheading text-text-primary mb-3">
                  {skill.title}
                </h4>

                {/* Description */}
                <p className="text-sm leading-relaxed font-light text-text-dim mb-5">
                  {skill.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center border border-accent-blue/20 bg-accent-blue/5 px-2 py-1 text-[10px] uppercase tracking-label-wide text-accent-blue font-display transition-all duration-300 group-hover:border-accent-blue/40 group-hover:bg-accent-blue/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
