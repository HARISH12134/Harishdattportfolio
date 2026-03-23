import { motion, useInView } from 'motion/react';
import { ExternalLink, Sparkles, ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { ProjectModal } from './ProjectModal';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// Import Food Delivery App images
import foodDeliveryImg1 from 'figma:asset/fa4fb6631876ea067afda46102c5629f6440dfbe.png';
import foodDeliveryImg2 from 'figma:asset/8c8bf2216051505e111b47340deae7514cf9474c.png';
import foodDeliveryImg3 from 'figma:asset/aa6b94ba621b3481b64e7524bc60e03840369e0f.png';
import foodDeliveryImg4 from 'figma:asset/e2871eb265734db44792f23569245156da53811a.png';
import foodDeliveryImg5 from 'figma:asset/9906ed7b6b9fce713e26ddb62d713b8ddb452a59.png';
import foodDeliveryImg6 from 'figma:asset/51f0f327773aa3b1e95d06034c0dbbd5579c1b87.png';
import foodDeliveryImg7 from 'figma:asset/d527da68cf967fbdfacf727ce9cd8e32f01d992c.png';
import foodDeliveryImg8 from 'figma:asset/87846f03ec26e5ddfdf04073184721a7a4467f22.png';

// Import Emergency SOS App images
import emergencySOSImg1 from 'figma:asset/0b9a73a98f1ca4c29ccc940425dd9c6b8a8816d5.png';
import emergencySOSImg2 from 'figma:asset/179bbf8411a780a80ed900db525c35607fc421f7.png';
import emergencySOSImg3 from 'figma:asset/cae2bc806515e2a4d7dbb0a2f004379e9d14c72f.png';
import emergencySOSImg4 from 'figma:asset/bfd7d5a0bb3b8b257f8c259ecd619bb85bae3b93.png';
import emergencySOSImg5 from 'figma:asset/979771d82a162c8f5d34a622ad87680d7806a3e1.png';
import emergencySOSImg6 from 'figma:asset/29ea0542e3941115262c9309157c3fc34e48e979.png';
import emergencySOSImg7 from 'figma:asset/3a011e01d74f4823f32068b08f14d0d498351929.png';
import emergencySOSImg8 from 'figma:asset/a7d2ad8d3260c2073f94c4012eccd24e05c473fc.png';
import emergencySOSImg9 from 'figma:asset/cfcf42ad9e880014cab842a98f45147ff674cf90.png';

// Import Dating App images
import datingAppImg1 from 'figma:asset/310bdea10ea0a8964f476a97785e0213f552774d.png';
import datingAppImg2 from 'figma:asset/9f3a3222a6e9594e1d7e2dc5e07b518c650c08d6.png';
import datingAppImg3 from 'figma:asset/432046bef60ace751f49bf7d7301c24abbaabdae.png';
import datingAppImg4 from 'figma:asset/b86bb7e173ccb2b946524949365a4c659d0bc9a2.png';
import datingAppImg5 from 'figma:asset/5f0466fc2d618b71f26d19143802f004bbf37be1.png';
import datingAppImg6 from 'figma:asset/a9b1bdfd92bc7db022897163f18877756d63de8a.png';

// Import Music App images
import musicAppImg1 from 'figma:asset/646405b94c18c8e0f7d0907daad83e213b5d8bc7.png';
import musicAppImg2 from 'figma:asset/3267e2321c0619079f047ed8220aef2e19290a75.png';
import musicAppImg3 from 'figma:asset/ed3cf1d02883e6abc0238fbbfe3375c1b2122887.png';
import musicAppImg4 from 'figma:asset/c709a684fc18df08aa4de4ada78aec28af5c40a2.png';
import musicAppImg5 from 'figma:asset/11c484db36d107d8ad26f982fa4f2a9d8a11d52c.png';

// Import Mr Trip App images
import mrTripImg1 from 'figma:asset/b529e9140aa397a0f28d2e0fd44b12598a55efeb.png';
import mrTripImg2 from 'figma:asset/9654b4d23884fbfb7affdcadba98079881b2694a.png';
import mrTripImg3 from 'figma:asset/19d0f41b9bc87cf6782cb65dc93cc251d5a84312.png';

const projects = [
  {
    title: "WhatsApp Redesign",
    description: "Applied modern UI patterns and micro-interactions",
    tags: ["Mobile", "Redesign", "UI/UX"],
    status: "completed",
    images: [],
    prototypeLink: null,
    designLink: null,
  },
  {
    title: "Emergency SOS App",
    description: "Designed interaction-focused quick-access UI",
    tags: ["Mobile", "Utility", "UX"],
    status: "completed",
    images: [
      emergencySOSImg1,
      emergencySOSImg2,
      emergencySOSImg3,
      emergencySOSImg4,
      emergencySOSImg5,
      emergencySOSImg6,
      emergencySOSImg7,
      emergencySOSImg8,
      emergencySOSImg9,
    ],
    prototypeLink: "https://www.figma.com/proto/rVWN3fb49XaU2U0TKe5lFS/Emergency-sos--system-Ui--Copy-?page-id=0%3A1&node-id=2016-1668&p=f&viewport=68%2C555%2C0.05&t=rLtLnvN77YuRY8YP-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2016%3A1659&show-proto-sidebar=1",
    designLink: "https://www.figma.com/design/rVWN3fb49XaU2U0TKe5lFS/Emergency-sos--system-Ui--Copy-?node-id=0-1&t=7fAjVKMrxaeIfa3b-1",
  },
  {
    title: "Food Delivery App",
    description: "Modern liquid glass UI with 60+ interactive screens",
    tags: ["Mobile", "Glassmorphism", "E-commerce"],
    status: "completed",
    images: [
      foodDeliveryImg1,
      foodDeliveryImg2,
      foodDeliveryImg3,
      foodDeliveryImg4,
      foodDeliveryImg5,
      foodDeliveryImg6,
      foodDeliveryImg7,
      foodDeliveryImg8,
    ],
    prototypeLink: "https://www.figma.com/proto/vaMsY1uCBCC97LMVOR0WbI/FOODIE-PIE--FOOD-DELIVERY-APP-DESIGN-?page-id=0%3A1&team_id=1553094456552231430&node-id=9-1097&starting-point-node-id=81%3A1133&t=trZwULqEGqpJ8kfg-1",
    designLink: "https://www.figma.com/design/vaMsY1uCBCC97LMVOR0WbI/FOODIE-PIE--FOOD-DELIVERY-APP-DESIGN-?node-id=0-1&t=bwTxLZTIVMvlv4A3-1",
  },
  {
    title: "Dating App",
    description: "Advanced swipe interactions with custom transitions",
    tags: ["Mobile", "Interactive", "Social"],
    status: "completed",
    images: [
      datingAppImg1,
      datingAppImg2,
      datingAppImg3,
      datingAppImg4,
      datingAppImg5,
      datingAppImg6,
    ],
    prototypeLink: "https://www.figma.com/proto/2evwNl6O352evgvi2GbR4r/Dating-App?node-id=1-2&t=Dpa7zxWQO8PfRiEt-1",
    designLink: null,
  },
  {
    title: "Music App",
    description: "Motion + sound-driven onboarding experience",
    tags: ["Mobile", "Audio", "Animation"],
    status: "completed",
    images: [
      musicAppImg1,
      musicAppImg2,
      musicAppImg3,
      musicAppImg4,
      musicAppImg5,
    ],
    prototypeLink: "https://www.figma.com/proto/8fQHplefS2g8GwYZE9Xmz6/Music-App?page-id=0%3A1&node-id=80-192&scaling=scale-down&content-scaling=fixed&t=FmligEM9EexfaH5P-1",
    designLink: "https://www.figma.com/design/8fQHplefS2g8GwYZE9Xmz6/Music-App?node-id=0-1&t=4S2XqFOmKBNAc8qs-1",
  },
  {
    title: "Mr Trip - Tourist Guide App",
    description: "Comprehensive travel companion application",
    tags: ["Mobile", "Travel", "Navigation"],
    status: "completed",
    images: [
      mrTripImg1,
      mrTripImg2,
      mrTripImg3,
    ],
    prototypeLink: null,
    designLink: null,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const projectItem = {
  hidden: { opacity: 0, y: 40, rotateX: -10 },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      duration: 0.8,
    },
  },
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleProjectClick = async (project: typeof projects[0]) => {
    if (project.images.length > 0) {
      setSelectedProject(project);
      
      // Track project view
      try {
        const projectSlug = project.title.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]/g, '');
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-e7f6fb86/projects/${projectSlug}/view`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );
      } catch (error) {
        console.error('Error tracking project view:', error);
      }
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Selected Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={projectItem}
              whileHover={{ 
                scale: 1.03,
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 200, 255, 0.15)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }
              }}
              whileTap={{ scale: 0.98 }}
              className="glass-card-project group cursor-pointer overflow-hidden relative"
              onClick={() => handleProjectClick(project)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.h3 
                    className="text-2xl font-semibold text-white group-hover:text-purple-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>
                  {project.status === "in-progress" ? (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  ) : project.images.length > 0 ? (
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ImageIcon className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ x: 5, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ExternalLink className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                    </motion.div>
                  )}
                </div>
                
                <p className="text-gray-300 mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      className="px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm border border-white/20 text-gray-200"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {project.images.length > 0 && (
                  <motion.div 
                    className="mt-4 pt-4 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-sm text-purple-400 font-medium flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      View {project.images.length} Screenshots
                    </span>
                  </motion.div>
                )}

                {project.status === "in-progress" && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-sm text-yellow-400 font-medium">Currently Working On</span>
                  </div>
                )}
              </div>

              {/* Animated gradient effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />
              
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full"
                transition={{ duration: 0.8, delay: 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          description={selectedProject.description}
          images={selectedProject.images}
          tags={selectedProject.tags}
          prototypeLink={selectedProject.prototypeLink}
          designLink={selectedProject.designLink}
        />
      )}
    </section>
  );
}