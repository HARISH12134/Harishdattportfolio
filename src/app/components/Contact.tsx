import { motion } from 'motion/react';
import { Mail, Linkedin, MapPin, Phone } from 'lucide-react';
import { ContactForm } from './ContactForm';

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "dattharish339@gmail.com",
    href: "mailto:dattharish339@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6385648360",
    href: "tel:+916385648360",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Coimbatore",
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/harishdatt/",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Interested in collaborating or have a project in mind? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: info.href ? 1.05 : 1,
                  boxShadow: info.href ? "0 20px 40px rgba(147, 51, 234, 0.3)" : undefined,
                }}
                className="glass-card p-8 relative overflow-hidden group"
              >
                {info.href ? (
                  <a 
                    href={info.href}
                    className="flex items-center gap-4 group"
                    target={info.label === "LinkedIn" ? "_blank" : undefined}
                    rel={info.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                  >
                    <motion.div 
                      className="glass-icon"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="relative z-10">
                      <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                      <p className="text-white font-medium group-hover:text-purple-300 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="glass-icon">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </div>
                )}
                
                {/* Shimmer effect on hover for links */}
                {info.href && (
                  <motion.div
                    className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full"
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}