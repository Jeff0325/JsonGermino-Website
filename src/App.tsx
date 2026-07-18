import { useLenis } from "./hooks/useLenis";
import { useReducedMotion } from "./hooks/useReducedMotion";
import Cursor from "./components/ui/Cursor";
import Navbar from "./components/layout/Navbar";
import ChapterRail from "./components/layout/ChapterRail";
import Footer from "./components/layout/Footer";
import Kurama from "./kurama";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import AutomationShowcase from "./components/sections/AutomationShowcase";
import CloudShowcase from "./components/sections/CloudShowcase";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

export default function App() {
  const reducedMotion = useReducedMotion();
  useLenis(!reducedMotion);

  return (
    <div className="relative bg-void">
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <ChapterRail />

      <main>
        <Hero />
        <Kurama />
        <About />
        <Skills />
        <Experience />
        <AutomationShowcase />
        <CloudShowcase />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
