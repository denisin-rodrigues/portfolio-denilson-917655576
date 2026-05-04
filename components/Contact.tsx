"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { BorderBeam } from "@/components/ui/border-beam";

const socialLinks = [
  {
    label: "Twitter / X",
    handle: "@denisin_ia",
    href: "https://twitter.com/denisin_ia",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: "denisin.ia",
    href: "https://instagram.com/denisin.ia",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    handle: "denisin-rodrigues",
    href: "https://github.com/denisin-rodrigues",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const ctaEyebrow = sectionRef.current?.querySelector(".cta-eyebrow");
      const ctaLines = sectionRef.current?.querySelectorAll(".contact-line");
      const ctaSub = sectionRef.current?.querySelector(".cta-sub");
      const ctaBtns = sectionRef.current?.querySelectorAll(".social-link");

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          toggleActions: "play none none none"
        },
      });

      if (ctaEyebrow) {
        ctaTl.fromTo(ctaEyebrow, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.2);
      }
      if (ctaLines?.length) {
        ctaTl.fromTo(ctaLines, { y: 30, opacity: 0, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "power3.out" }, 0.4);
      }
      if (ctaSub) {
        ctaTl.fromTo(ctaSub, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.8);
      }
      if (ctaBtns?.length) {
        ctaTl.fromTo(ctaBtns, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 1.2);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 border-t border-border-primary py-20 md:py-32 overflow-hidden"
      id="contato"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-primary to-transparent" />
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 h-[220px] w-[520px] bg-accent-blue/[0.05] blur-[120px]" />
        <div className="absolute right-[18%] bottom-[20%] h-[160px] w-[160px] bg-accent-gold/[0.03] blur-[90px] rounded-full" />
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="md:px-12 w-full max-w-7xl z-10 mx-auto px-6 relative">
        {/* Decorative */}
        <div className="cta-eyebrow flex items-center justify-center gap-4 text-text-dim text-sm mb-8">
          <span className="h-px w-12 bg-border-primary" />
          <span className="font-body">Vamos criar juntos</span>
          <span className="h-px w-12 bg-border-primary" />
        </div>

        {/* Headline */}
        <h2 className="font-display uppercase leading-[0.98] tracking-heading text-heading-md sm:text-heading-lg md:text-heading-xl text-text-primary text-center max-w-3xl mx-auto mb-6">
          <span className="contact-line block">
            Quer um produto,
          </span>
          <span className="contact-line block">
            uma automação
          </span>
          <span className="contact-line block text-accent-blue">
            ou aprender a fazer você mesmo?
          </span>
        </h2>

        <p className="cta-sub text-body-md sm:text-body-lg leading-relaxed font-light text-text-body text-center max-w-xl mx-auto mb-14">
          Atendo como freelancer e também compartilho conhecimento.
        </p>

        {/* Social links */}
        <div className="social-links flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-16">
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link relative overflow-hidden group w-full sm:w-auto inline-flex items-center gap-4 px-6 py-4 border border-border-primary bg-bg-primary/80 transition-colors duration-300 hover:border-accent-gold/40"
            >
              <BorderBeam size={80} duration={5} colorFrom="#9ED8FF" colorTo="#CFAE6E" delay={i * 1.2} />
              
              <div className="relative z-10 w-10 h-10 rounded-full bg-bg-surface border border-border-hover flex items-center justify-center transition-all duration-300 group-hover:bg-accent-gold/10 group-hover:border-accent-gold/30 text-text-dim group-hover:text-accent-gold">
                {social.icon}
              </div>
              <div className="relative z-10">
                <span className="block text-label-md uppercase tracking-label font-display text-text-primary group-hover:text-accent-gold transition-colors duration-300">
                  {social.label}
                </span>
                <span className="block text-sm text-text-dim font-light">
                  {social.handle}
                </span>
              </div>
              <svg
                className="relative z-10 w-4 h-4 ml-auto text-text-dim transition-all duration-300 group-hover:text-accent-gold group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 h-px bg-border-primary/50" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-dim gap-4">
          <p className="font-body">
            © 2026 Denilson Rodrigues. Todos os direitos reservados.
          </p>
          <p className="font-body text-center sm:text-right">
            Código, IA e visão criativa · @denisin_ia
          </p>
        </div>
      </div>
    </section>
  );
}
