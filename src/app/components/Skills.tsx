import { motion } from 'motion/react';
import { Smartphone, Code2, Users, Lightbulb } from 'lucide-react';
import { memo } from 'react';

const skills = [
  {
    icon: Smartphone,
    title: "Mobile UI/UX Design",
    description: "Creating intuitive and beautiful mobile experiences",
  },
  {
    icon: Code2,
    title: "Responsive & Interactive Prototyping",
    description: "Building prototypes that bring ideas to life",
  },
  {
    icon: Lightbulb,
    title: "UX Case Studies",
    description: "Detailed documentation of design processes",
  },
  {
    icon: Users,
    title: "User-Centered Design Thinking",
    description: "Solving real user problems with empathy",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export function Skills() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            What I Bring
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ 
                y: -15,
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(147, 51, 234, 0.3)",
              }}
              className="glass-card p-8 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-blue-600/20 to-red-500/20 opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                className="glass-icon mb-6 relative z-10"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2,
                }}
                transition={{ 
                  rotate: { duration: 0.6 },
                  scale: { duration: 0.2 },
                }}
              >
                <skill.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-semibold mb-3 text-white relative z-10">{skill.title}</h3>
              <p className="text-gray-300 relative z-10">{skill.description}</p>
              
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full"
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Skills);