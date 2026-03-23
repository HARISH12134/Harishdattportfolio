import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { FloatingNav } from './components/FloatingNav';
import { HiTechBackground } from './components/HiTechBackground';
import { CursorFollower } from './components/CursorFollower';
import { MouseGradient } from './components/MouseGradient';
import { useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export default function App() {
  // Track page visit on mount
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-e7f6fb86/visit`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              page: window.location.pathname,
              referrer: document.referrer,
              userAgent: navigator.userAgent,
            }),
          }
        );
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0505] via-[#0f1729] to-[#1a0000] text-white overflow-x-hidden">
      {/* Hi-Tech Animated Background */}
      <HiTechBackground />
      
      {/* Interactive Mouse Effects */}
      <CursorFollower />
      <MouseGradient />
      
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Main Content */}
      <main>
        <div id="home">
          <Hero />
        </div>
        
        <div id="about">
          <About />
        </div>
        
        <div id="skills">
          <Skills />
        </div>
        
        <div id="projects">
          <Projects />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/10">
        <div className="container mx-auto px-6">
          <p className="text-gray-400">
            © 2026 Harish M. Crafted with passion and precision.
          </p>
        </div>
      </footer>
    </div>
  );
}