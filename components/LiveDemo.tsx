"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BorderBeam } from "@/components/ui/border-beam";

/* ─── Demo Data ─── */
const demos = [
  {
    id: "wine-ia",
    tag: "DEMO.01",
    title: "WINE.IA",
    subtitle: "Plataforma SaaS Educacional",
    description:
      "Plataforma completa onde produtores criam cursos, cadastram alunos e vendem planos — com times de agentes IA que auxiliam no aprendizado.",
    codeSnippet: [
      "const wineIA = {",
      "  platform: 'SaaS',",
      "  features: [",
      "    'Multi-tenant',",
      "    'Agentes IA',",
      "    'Gestão de Cursos',",
      "    'Planos & Pagamentos',",
      "  ],",
      "  stack: ['Django', 'LangChain',",
      "    'React', 'PostgreSQL'],",
      "}",
    ],
    tags: ["Django", "LangChain", "React", "PostgreSQL"],
    accentClass: "demo-card-purple",
    link: "#",
  },
  {
    id: "landing-page",
    tag: "DEMO.02",
    title: "LANDING PAGE",
    subtitle: "Alta Conversão Premium",
    description:
      "Landing page cinematográfica com scrollytelling, animações GSAP, design system premium e conversão otimizada.",
    codeSnippet: [
      "const landing = {",
      "  design: 'Scrollytelling',",
      "  animations: [",
      "    'GSAP ScrollTrigger',",
      "    'Canvas frame-scrub',",
      "    'Parallax layers',",
      "  ],",
      "  metrics: {",
      "    lcp: '< 2.5s',",
      "    conversion: '> 8%',",
      "  }",
      "}",
    ],
    tags: ["Next.js", "GSAP", "Tailwind", "Vite"],
    accentClass: "demo-card-green",
    link: "#",
  },
  {
    id: "agent-office",
    tag: "DEMO.03",
    title: "ESCRITÓRIO IA",
    subtitle: "Agentes Trabalhando",
    description:
      "Escritório virtual onde times de agentes IA trabalham de forma autônoma — pesquisa, criação, automação e entrega.",
    codeSnippet: [
      "const office = {",
      "  agents: [",
      "    'Researcher',",
      "    'Writer',",
      "    'Designer',",
      "    'Deployer',",
      "  ],",
      "  workflow: 'LangGraph',",
      "  output: 'Autonomous',",
      "  status: 'Always Running',",
      "}",
    ],
    tags: ["Python", "LangGraph", "n8n", "Agents"],
    accentClass: "demo-card-blue",
    link: "#",
  },
];

export default function LiveDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      if (mainRef.current) mainRef.current.style.visibility = "visible";
      return;
    }

    const ctx = gsap.context(() => {
      /* ── Make section visible after GSAP loads (anti-FOUC) ── */
      gsap.set(mainRef.current, { autoAlpha: 1 });

      /* ── Main ScrollTrigger — SVG paths + tablet parallax ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const tabletMove = 0.65 * window.innerHeight;

          const strokeOffset = -(2400 * progress);
          document.documentElement.style.setProperty(
            "--demo-strokeDashoffset",
            String(strokeOffset)
          );

          const tabletOffset = -parseInt(String(tabletMove * progress)) + "px";
          document.documentElement.style.setProperty(
            "--demo-tabletOffset",
            tabletOffset
          );
        },
      });

      /* ── Section header animation ── */
      gsap.fromTo(
        ".demo-section-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".demo-section-header",
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── Card reveal + typewriter per card ── */
      const cards = gsap.utils.toArray<HTMLElement>(".demo-card");
      cards.forEach((card) => {
        // Card slide-in
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=80",
              toggleActions: "play none none none",
            },
          }
        );

        // Typewriter effect line-by-line recursive logic
        const allChars = card.querySelectorAll<HTMLElement>(".demo-char");
        if (allChars.length > 0) {
          gsap.set(allChars, { opacity: 0 });

          const lines = Array.from(card.querySelectorAll(".demo-code-line"));
          let hasWritten = false;
          let isWriting = false;

          const writeLine = (lineIndex: number) => {
            if (lineIndex >= lines.length) {
              hasWritten = true;
              isWriting = false;
              return;
            }

            const line = lines[lineIndex];
            const chars = line.querySelectorAll<HTMLElement>(".demo-char");

            if (chars.length === 0) {
              writeLine(lineIndex + 1);
              return;
            }

            gsap.to(chars, {
              opacity: 1,
              duration: 0.01,
              stagger: 0.03,
              ease: "none",
              onComplete: () => {
                writeLine(lineIndex + 1);
              }
            });
          };

          ScrollTrigger.create({
            trigger: card,
            start: "top bottom-=100",
            onEnter: () => {
              if (!hasWritten && !isWriting) {
                isWriting = true;
                writeLine(0);
              }
            },
          });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 border-t border-border-primary"
      id="demos"
    >
      {/* SVG Gradient Definitions (hidden) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient
            id="demoGrad1"
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#9ED8FF" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#CFAE6E" stopOpacity="0.5" />
            <stop offset="65%" stopColor="#74C7FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9ED8FF" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      <div
        ref={mainRef}
        className="demo-main relative w-full max-w-[740px] mx-auto"
        style={{ visibility: "hidden", minHeight: "2400px" }}
      >
        {/* ── 3D Tablet Background ── */}
        <div className="demo-world3d">
          <div className="demo-tablet" />
        </div>

        {/* ── SVG Animated Paths ── */}
        <svg
          className="demo-svg-paths"
          viewBox="0 0 740 2200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="lineGrad"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2="2200"
            >
              <stop offset="0%" stopColor="#9ED8FF" stopOpacity="0.6" />
              <stop offset="25%" stopColor="#CFAE6E" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#74C7FF" stopOpacity="0.5" />
              <stop offset="75%" stopColor="#CFAE6E" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#9ED8FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Path 1 */}
          <path
            className="demo-line demo-line-1"
            d="M 370 0 C 370 200 100 300 100 500 S 640 600 640 800 S 100 900 100 1100 S 640 1200 640 1400 S 370 1600 370 1800 L 370 2200"
            fill="none"
            stroke="url(#lineGrad)"
            strokeLinecap="round"
          />
          {/* Path 2 */}
          <path
            className="demo-line demo-line-2"
            d="M 320 0 C 320 180 600 280 600 480 S 140 580 140 780 S 600 880 600 1080 S 140 1180 140 1380 S 320 1580 320 1780 L 320 2200"
            fill="none"
            stroke="url(#lineGrad)"
            strokeLinecap="round"
          />
          {/* Path 3 */}
          <path
            className="demo-line demo-line-3"
            d="M 420 0 C 420 220 180 350 180 550 S 560 650 560 850 S 180 950 180 1150 S 560 1250 560 1450 S 420 1650 420 1850 L 420 2200"
            fill="none"
            stroke="url(#lineGrad)"
            strokeLinecap="round"
          />
        </svg>

        {/* ── Section Header ── */}
        <div className="demo-section-header relative z-20 pt-20 md:pt-32 px-6 md:px-0 mb-16">
          <div className="flex gap-4 mb-7 items-center">
            <span className="w-7 md:w-10 h-px bg-accent-blue shrink-0" />
            <span className="text-label-sm sm:text-label-md uppercase tracking-label text-accent-blue font-display">
              LIVE DEMOS
            </span>
          </div>
          <h3 className="font-display uppercase leading-[0.98] tracking-heading text-heading-md sm:text-heading-lg md:text-heading-xl text-text-primary mb-4">
            Sistemas em{" "}
            <span className="text-accent-blue">produção.</span>
          </h3>
          <p className="text-body-md sm:text-body-lg leading-relaxed font-light text-text-body max-w-2xl">
            Veja o que construo na prática — plataformas, landing pages e
            escritórios de agentes IA rodando ao vivo.
          </p>
        </div>

        {/* ── Demo Cards ── */}
        <div className="demo-cards relative z-20 flex flex-col items-center gap-12 px-4 md:px-0 pb-32">
          {demos.map((demo, i) => (
            <div
              key={demo.id}
              className={`demo-card demo-card-wrapper ${demo.accentClass}`}
              style={{
                transform:
                  i % 2 === 0 ? "translateX(2vw)" : "translateX(-2vw)",
              }}
            >
              {/* Gradient border overlay */}
              <div className="demo-card-border" />

              {/* Glassmorphic backdrop */}
              <div className="demo-card-glass" />

              {/* Content */}
              <div className="demo-card-content relative z-10 flex flex-col md:flex-row gap-0">
                {/* Left — Code block */}
                <div className="demo-card-code">
                  <div className="demo-card-code-dots">
                    <span className="demo-dot demo-dot-red" />
                    <span className="demo-dot demo-dot-yellow" />
                    <span className="demo-dot demo-dot-green" />
                  </div>
                  <pre className="demo-code-pre">
                    {demo.codeSnippet.map((line, li) => (
                      <div key={li} className="demo-code-line">
                        <span className="demo-line-num">{li + 1}</span>
                        {line.split("").map((char, ci) => (
                          <span
                            key={`${li}-${ci}`}
                            className="demo-char"
                            aria-hidden="true"
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                      </div>
                    ))}
                  </pre>
                </div>

                {/* Right — Info */}
                <div className="demo-card-info">
                  <span className="text-accent-blue font-display text-[9px] tracking-[0.4em] uppercase opacity-60 block mb-2">
                    {demo.tag}
                  </span>
                  <h4 className="font-display text-text-primary text-xl md:text-2xl uppercase tracking-tight leading-[1.1] mb-1">
                    {demo.title}
                  </h4>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-text-dim font-display block mb-4">
                    {demo.subtitle}
                  </span>
                  <p className="text-[12px] md:text-[13px] leading-relaxed text-text-body mb-5">
                    {demo.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {demo.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[7px] md:text-[8px] tracking-[0.15em] uppercase border border-white/10 px-2 py-1 text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={demo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-card-cta inline-flex items-center gap-2 text-[9px] font-display tracking-[0.2em] text-accent-gold hover:text-white transition-colors duration-300 uppercase"
                  >
                    VER DEMO
                    <span className="w-6 h-[1px] bg-accent-gold transition-all duration-300" />
                  </a>
                </div>
              </div>

              {/* BorderBeam effect */}
              <BorderBeam
                size={180}
                duration={10}
                colorFrom="#9ED8FF"
                colorTo="#CFAE6E"
                delay={i * 2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
