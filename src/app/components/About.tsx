import { motion } from 'motion/react';
import { Briefcase, Download } from 'lucide-react';
import { memo } from 'react';
import profileImage from 'figma:asset/4e700778e94814606f2e77a85abeb4e3d6203f5e.png';

const experiences = [
  {
    role: "Full-time Designer",
    company: "WhiterApps",
    period: "Oct 2025 - Nov 2025",
    description: "Designed high-fidelity screens for mobile applications. Led design sprints on app redesign projects.",
  },
  {
    role: "Design Internship",
    company: "Sherlock Studio",
    period: "Sep 2025 - Nov 2025",
    description: "Supported design team with research, wireframing, and UI prototyping. Collaborated on client-based design projects.",
  },
];

export const About = memo(function About() {
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
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 via-white to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              className="glass-card p-8"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(147, 51, 234, 0.3)",
              }}
            >
              <motion.img 
                src={profileImage} 
                alt="Harish - UI/UX Designer" 
                className="w-full h-auto rounded-lg shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            {/* Download Resume Button */}
            <motion.a
              href="/resume.pdf"
              download="Harish_Resume.pdf"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(147, 51, 234, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="glass-card p-6 relative overflow-hidden group cursor-pointer flex items-center justify-center gap-3 block"
            >
              <motion.div
                className="glass-icon"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  y: [0, -5, 0],
                }}
                transition={{ duration: 0.5 }}
              >
                <Download className="w-5 h-5 text-red-500" />
              </motion.div>
              <span className="text-lg font-semibold text-white relative z-10">
                Download Resume
              </span>
              
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-blue-600/20 to-red-500/20"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />
              
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full"
                transition={{ duration: 0.8 }}
              />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="glass-card p-8 mb-6"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                I'm passionate about designing impactful digital products that are simple, engaging, and solve real user problems. With a strong foundation in mobile app and web design, I leverage both technical and creative skills to craft intuitive digital experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My approach combines user-centered design thinking with modern UX principles, prototyping, and iterative testing to create products that users love.
              </p>
            </motion.div>

            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ 
                    x: 10,
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(147, 51, 234, 0.25)",
                  }}
                  className="glass-card p-6 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="glass-icon mt-1"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Briefcase className="w-5 h-5 text-red-500" />
                    </motion.div>
                    <div className="flex-1 relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                          <p className="text-blue-400">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-400 whitespace-nowrap ml-4">{exp.period}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{exp.description}</p>
                    </div>
                  </div>
                  
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-12 group-hover:left-full"
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});