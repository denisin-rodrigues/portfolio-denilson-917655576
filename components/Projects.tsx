"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { BorderBeam } from "@/components/ui/border-beam";

const projects = [
  {
    id: 1,
    tag: "PROJ.01",
    title: "Agente Shopify",
    description: "Cria lojas completas automaticamente — do produto ao checkout, tudo via agente IA.",
    tags: ["Python", "Shopify API", "LLMs"],
    link: "https://github.com/denisin-rodrigues",
  },
  {
    id: 2,
    tag: "PROJ.02",
    title: "Agentes Instagram",
    description: "Posts automáticos com IA — criação de conteúdo, legendas e publicação 100% autônoma.",
    tags: ["Python", "Instagram API", "IA"],
    link: "https://github.com/denisin-rodrigues",
  },
  {
    id: 3,
    tag: "PROJ.03",
    title: "Agente 3D",
    description: "Extração de arquiteturas 3D do Spline — análise e código gerado automaticamente.",
    tags: ["Three.js", "Spline", "React"],
    link: "https://github.com/denisin-rodrigues",
  },
  {
    id: 4,
    tag: "PROJ.04",
    title: "Landing Pages",
    description: "Agente que constrói páginas premium de alta conversão — do design ao deploy.",
    tags: ["Next.js", "GSAP", "Tailwind"],
    link: "https://github.com/denisin-rodrigues",
  },
  {
    id: 5,
    tag: "PROJ.05",
    title: "Este Portfólio",
    description: "O site que você está vendo — React, Next.js, GSAP, Three.js e Spline 3D.",
    tags: ["React", "Next.js", "GSAP"],
    link: "https://github.com/denisin-rodrigues",
  },
  {
    id: 6,
    tag: "PROJ.06",
    title: "AI Lab",
    description: "Laboratório de automações complexas com n8n e LangChain.",
    tags: ["n8n", "LangChain", "AI"],
    link: "https://github.com/denisin-rodrigues",
  },
  {
    id: 7,
    tag: "PROJ.07",
    title: "Visual System IA",
    description: "Sistema de geração de ativos visuais consistentes para marcas.",
    tags: ["Stable Diffusion", "Tokens", "UI"],
    link: "https://github.com/denisin-rodrigues",
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      const spacing = 0.3;

      // All cards start off-screen right, scaled down, invisible
      gsap.set(cards, { x: "100vw", opacity: 0, scale: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(cards.length * spacing + 1) * 1500}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        }
      });

      // For each card: slide from right→left while scaling up then down
      cards.forEach((card, i) => {
        const startTime = i * spacing;

        // Scale up and fade in (first half)
        tl.fromTo(card,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, ease: "power1.in", immediateRender: false },
          startTime
        );
        // Scale back down and fade out (second half)
        tl.to(card,
          { scale: 0, opacity: 0, duration: 0.5, ease: "power1.out", immediateRender: false },
          startTime + 0.5
        );
        // Simultaneously slide from right to left
        tl.fromTo(card,
          { x: "100vw" },
          { x: "-100vw", duration: 1, ease: "none", immediateRender: false },
          startTime
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 border-t border-border-primary bg-bg-primary"
      id="projetos"
    >
      <div className="gallery relative w-full h-screen overflow-hidden">
        {/* Header */}
        <div className="absolute top-12 left-0 right-0 z-20 text-center pointer-events-none">
          <h3 className="font-display uppercase text-heading-md tracking-[0.2em] text-text-primary mb-2">
            PROJETOS <span className="text-accent-blue">IA</span>
          </h3>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-accent-blue to-transparent mx-auto" />
        </div>

        {/* Cards — absolutely centered container */}
        <div className="cards absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[17rem] h-[22rem] md:w-[22rem] md:h-[28rem]">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card absolute top-0 left-0 w-full h-full rounded-xl border border-white/10 bg-bg-primary overflow-hidden shadow-2xl will-change-transform"
            >
              {/* Border beam effect */}
              <BorderBeam size={150} duration={8} colorFrom="#9ED8FF" colorTo="#CFAE6E" />

              {/* Content */}
              <div className="relative z-10 p-5 md:p-7 h-full flex flex-col justify-center">
                <span className="text-accent-blue font-display text-[9px] block tracking-[0.4em] mb-2 uppercase opacity-60">
                  {project.tag}
                </span>
                <h4 className="text-text-primary font-display text-lg md:text-2xl uppercase leading-[1.1] tracking-tight mb-3">
                  {project.title}
                </h4>
                <p className="text-text-dim text-[11px] md:text-xs mb-5 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-[7px] md:text-[8px] tracking-[0.15em] uppercase border border-white/10 px-2 py-1 text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[9px] font-display tracking-[0.2em] text-accent-gold hover:text-white transition-colors duration-300"
                >
                  EXPLORAR
                  <span className="w-6 h-[1px] bg-accent-gold" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 z-20">
          <span className="text-[9px] tracking-[0.4em] font-display">SCROLL</span>
        </div>
      </div>
    </section>
  );
}
