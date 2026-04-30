"use client";

const technologies = [
  "Python", "JavaScript", "Node.js", "React", "Next.js", "GSAP", "Three.js",
  "Remotion", "Antigravity", "Claude Code", "Prompt Eng", "Design System",
  "Markdown", "APIs", "LLMs", "Agentes", "Shopify", "Instagram API", "Backend", "TypeScript",
];

// Duplicate for seamless loop
const row1 = [...technologies, ...technologies];
const row2 = [...[...technologies].reverse(), ...[...technologies].reverse()];

export default function Stack() {
  return (
    <section
      className="relative z-10 border-t border-border-primary py-20 md:py-32 overflow-hidden"
      id="stack"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-glow-blue" style={{ left: "20%", top: "10%" }} />
      </div>

      <div className="md:px-12 w-full max-w-7xl z-10 mx-auto px-6 relative mb-12">
        <div className="flex gap-4 mb-7 items-center">
          <span className="w-7 md:w-10 h-px bg-accent-blue shrink-0" />
          <span className="text-label-sm sm:text-label-md uppercase tracking-label text-text-caption font-display">
            STACK
          </span>
        </div>
        <h3 className="font-display uppercase leading-[0.98] tracking-heading text-heading-md sm:text-heading-lg md:text-heading-xl text-text-primary">
          Tecnologias em{" "}
          <span className="text-accent-blue">destaque.</span>
        </h3>
      </div>

      {/* Marquee Row 1 — Left */}
      <div
        className="relative overflow-hidden mb-4"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex gap-4 w-max animate-marquee-left hover:[animation-play-state:paused]">
          {row1.map((tech, i) => (
            <span
              key={`r1-${i}`}
              className="shrink-0 inline-flex items-center border border-border-primary bg-bg-primary px-4 py-2.5 text-label-md uppercase tracking-label text-text-dim font-display transition-all duration-300 hover:scale-110 hover:bg-accent-blue/10 hover:text-accent-blue hover:border-accent-blue/30 cursor-default whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — Right */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex gap-4 w-max animate-marquee-right hover:[animation-play-state:paused]">
          {row2.map((tech, i) => (
            <span
              key={`r2-${i}`}
              className="shrink-0 inline-flex items-center border border-border-primary bg-bg-primary px-4 py-2.5 text-label-md uppercase tracking-label text-text-dim font-display transition-all duration-300 hover:scale-110 hover:bg-accent-gold/10 hover:text-accent-gold hover:border-accent-gold/30 cursor-default whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
