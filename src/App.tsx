import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import HeroV2 from './components/HeroV2';
import SmartFeatures from './components/SmartFeatures';
import DietShowcase from './components/DietShowcase';
import StoryMode from './components/StoryMode';
import InvisibleManager from './components/InvisibleManager';
import OwnerCalmState from './components/OwnerCalmState';
import GlobalImpact from './components/GlobalImpact';
import Transformation from './components/Transformation';
import Contact from './components/Contact';
import FooterV2 from './components/FooterV2';
import CustomCursor from './components/CustomCursor';


function App() {
  // Lenis initialization for smooth scrolling on the main page
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-primary selection:text-white overflow-hidden cursor-none">
      <CustomCursor />
      <Navbar />

      <main>
        <HeroV2 />
        <SmartFeatures />
        <DietShowcase />
        <StoryMode />
        <InvisibleManager />
        <OwnerCalmState />
        <GlobalImpact />
        <Transformation />
        <Contact />
      </main>

      <FooterV2 />
    </div>
  );
}

export default App;
