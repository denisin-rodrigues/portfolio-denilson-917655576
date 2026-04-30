"use client";

import { useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.from(".nav-item", {
      y: 24,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.1,
    });
  }, []);

  const navLinks = [
    { href: "#sobre", label: "SOBRE" },
    { href: "#habilidades", label: "SKILLS" },
    { href: "#projetos", label: "PROJETOS" },
    { href: "#stack", label: "STACK" },
    { href: "#contato", label: "CONTATO" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-8 pt-4">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 border transition-all duration-500 backdrop-blur-md ${
            scrolled
              ? "bg-bg-primary/95 border-border-primary/80"
              : "bg-bg-primary/85 border-border-primary/50"
          }`}
        >
          {/* Logo */}
          <a href="#" className="nav-item flex items-center gap-3 group shrink-0">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ED8FF"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300 group-hover:stroke-accent-gold shrink-0"
            >
              <polyline points="5 17 12 12 19 17" />
              <polyline points="5 12 12 7 19 12" />
              <polyline points="5 7 12 2 19 7" />
            </svg>
            <span className="text-label-sm sm:text-label-md uppercase text-text-primary tracking-label font-display">
              DENISIN<span className="text-text-dim">.IA</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="nav-item hidden xl:flex items-center border border-border-primary/80 bg-bg-surface/90">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-label-md uppercase transition-colors duration-300 hover:text-accent-gold text-text-caption tracking-label font-display border-r border-border-primary/80 last:border-r-0 px-6 py-3"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="nav-item group inline-flex items-center gap-3 px-5 py-3 text-label-md uppercase transition-all duration-300 hover:border-accent-gold/60 hover:text-accent-gold text-text-primary tracking-label font-display bg-bg-surface/90 border border-border-hover"
            >
              <span className="inline-flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-accent-blue transition-colors duration-300 group-hover:bg-accent-gold" />
                <span className="hidden sm:inline">FALAR COMIGO</span>
                <span className="sm:hidden">CONTATO</span>
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden flex items-center justify-center text-text-primary transition-colors duration-300 hover:text-accent-gold"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" x2="20" y1="7" y2="7" />
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="17" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden mt-2 border border-border-primary/80 bg-bg-primary/95 backdrop-blur-md">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-label-md tracking-label uppercase text-text-caption px-5 py-4 border-b border-border-primary/80 transition-colors duration-300 hover:text-accent-gold last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
