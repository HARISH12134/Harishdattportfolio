import { motion, useMotionValue, useSpring } from 'motion/react';
import { Home, User, Briefcase, Mail, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: User, label: "About", href: "#about" },
  { icon: Sparkles, label: "Skills", href: "#skills" },
  { icon: Briefcase, label: "Projects", href: "#projects" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div 
        className="glass-nav flex items-center gap-2 px-4 py-3 relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <motion.a
              key={index}
              href={item.href}
              className={`relative p-3 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              whileHover={{ 
                scale: 1.2,
                y: -5,
              }}
              whileTap={{ scale: 0.9 }}
              title={item.label}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                animate={isActive ? {
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/70'}`} />
              </motion.div>
              
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-blue-600/30 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Glow effect on active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.a>
          );
        })}
      </motion.div>
    </motion.nav>
  );
}