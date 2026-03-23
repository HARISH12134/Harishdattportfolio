import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function CursorFollower() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Create particle trail occasionally
      if (Math.random() > 0.9) {
        const newParticle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
        };

        setParticles((prev) => [...prev, newParticle]);

        // Remove particle after animation
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Custom cursor glow */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.6), rgba(0, 200, 255, 0.3), transparent)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
        }}
      />

      {/* Particle trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-40"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0.8,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 255, 1), rgba(0, 200, 255, 0.5))',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
          }}
        />
      ))}
    </>
  );
}
