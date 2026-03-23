import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Figma } from 'lucide-react';
import { useState } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  prototypeLink?: string | null;
  designLink?: string | null;
}

export function ProjectModal({ isOpen, onClose, title, description, images, tags, prototypeLink, designLink }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="glass-card max-w-6xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Header */}
              <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/10 border-b border-white/10 p-6 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                      <p className="text-gray-300">{description}</p>
                    </div>
                    {prototypeLink && (
                      <motion.a
                        href={prototypeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-button px-6 py-3 text-sm flex items-center gap-2 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Prototype
                      </motion.a>
                    )}
                    {designLink && (
                      <motion.a
                        href={designLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-button px-6 py-3 text-sm flex items-center gap-2 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Figma className="w-4 h-4" />
                        View Design
                      </motion.a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm border border-white/20 text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="glass-icon w-10 h-10 hover:bg-white/20 transition-colors flex-shrink-0 ml-4"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Image Carousel */}
              <div className="p-6">
                <div className="relative aspect-[9/16] max-w-md mx-auto mb-6">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`${title} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain rounded-2xl"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Navigation Buttons */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 glass-icon w-12 h-12 hover:scale-110 transition-transform"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 glass-icon w-12 h-12 hover:scale-110 transition-transform"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-nav px-4 py-2">
                    <span className="text-white text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-[9/16] rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-purple-400 scale-105'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-red-600/20" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}