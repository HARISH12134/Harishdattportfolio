import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { memo } from 'react';
import { MagneticButton } from './MagneticButton';

export const Hero = memo(function Hero() {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const yButton = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            type: "spring",
            stiffness: 100,
          }}
          style={{ y: yText, opacity }}
          className="text-center"
        >
          {/* Floating particles - reduced count */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-white to-cyan-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              textShadow: '0 0 40px rgba(0, 255, 255, 0.5), 0 0 80px rgba(0, 200, 255, 0.3)',
            }}
          >
            Hi, I'm Harish
          </motion.h1>
          
          <motion.div
            className="glass-card p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 60px rgba(147, 51, 234, 0.3)",
            }}
          >
            <p className="text-xl md:text-2xl text-gray-200 mb-4">
              UI/UX Designer who builds clean, modern, and user-focused mobile experiences
            </p>
            <p className="text-lg text-gray-300">
              Crafting intuitive interfaces and responsive prototypes at WhiterApps & Sherlock Studio
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <MagneticButton
              href="#projects"
              className="glass-button px-8 py-4 text-lg font-semibold"
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="glass-button-secondary px-8 py-4 text-lg font-semibold"
            >
              Get in Touch
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-8 h-8 text-white/50" />
      </motion.div>
    </section>
  );
});