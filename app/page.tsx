import Navigation from "@/components/Navigation";
import BackgroundGrid from "@/components/BackgroundGrid";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import LiveDemo from "@/components/LiveDemo";
import Stack from "@/components/Stack";
import Teaching from "@/components/Teaching";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Fixed background elements */}
      <BackgroundGrid />

      {/* Navigation */}
      <Navigation />

      {/* Main content — all sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <LiveDemo />
        <Stack />
        <Teaching />
        <Contact />
      </main>
    </>
  );
}

