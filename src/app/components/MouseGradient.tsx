import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';

export function MouseGradient() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        background: 'transparent',
      }}
    >
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4), rgba(0, 200, 255, 0.2), transparent)',
        }}
      />
    </motion.div>
  );
}
