import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function HiTechBackground() {
  const [lightningFlash, setLightningFlash] = useState(false);

  useEffect(() => {
    // Electric lightning flashes - slower and less frequent
    const triggerLightning = () => {
      setLightningFlash(true);
      setTimeout(() => setLightningFlash(false), 300);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        triggerLightning();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden bg-black" style={{ willChange: 'transform' }}>
      {/* Digital Lightning Flash */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(0, 255, 255, 0.3), rgba(0, 150, 255, 0.2), transparent)',
        }}
        animate={{
          opacity: lightningFlash ? 0.6 : 0,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Hexagonal Tech Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="hexGrid" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
            <polygon
              points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
              fill="none"
              stroke="rgba(0, 255, 255, 0.5)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
      </svg>

      {/* Electric Lightning Bolts */}
      {[...Array(6)].map((_, index) => (
        <motion.svg
          key={`lightning-${index}`}
          className="absolute top-0 w-2 h-full"
          style={{
            left: `${15 + index * 15}%`,
            opacity: 0,
          }}
          animate={{
            opacity: lightningFlash ? [0, 1, 0.5, 1, 0] : 0,
          }}
          transition={{
            duration: 0.4,
            delay: index * 0.05,
          }}
        >
          <defs>
            <linearGradient id={`electricGrad${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
              <stop offset="30%" stopColor="rgba(0, 255, 255, 1)" />
              <stop offset="70%" stopColor="rgba(0, 150, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(0, 100, 255, 0.4)" />
            </linearGradient>
          </defs>
          <path
            d={`M 50 0 L ${45 + Math.random() * 10} ${150 + Math.random() * 50} L ${55 + Math.random() * 10} ${150 + Math.random() * 50} L ${40 + Math.random() * 20} ${350 + Math.random() * 50} L ${50 + Math.random() * 20} ${500 + Math.random() * 100} L ${45 + Math.random() * 10} ${700 + Math.random() * 100} L ${50} 1000`}
            stroke={`url(#electricGrad${index})`}
            strokeWidth={2 + Math.random() * 2}
            fill="none"
            filter="drop-shadow(0 0 10px rgba(0, 255, 255, 1)) drop-shadow(0 0 20px rgba(0, 150, 255, 0.8))"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}

      {/* Circuit Board Patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="circuitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 150, 255, 0.3)" />
          </linearGradient>
        </defs>
        
        <motion.g
          stroke="url(#circuitGlow)"
          strokeWidth="2"
          fill="none"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Horizontal lines */}
          <line x1="0" y1="100" x2="400" y2="100" />
          <line x1="200" y1="100" x2="200" y2="250" />
          <circle cx="200" cy="100" r="5" fill="rgba(0, 255, 255, 0.8)" />
          
          <line x1="600" y1="200" x2="1000" y2="200" />
          <line x1="800" y1="200" x2="800" y2="350" />
          <circle cx="800" cy="200" r="5" fill="rgba(0, 255, 255, 0.8)" />
          
          <line x1="300" y1="400" x2="700" y2="400" />
          <line x1="500" y1="250" x2="500" y2="400" />
          <circle cx="500" cy="400" r="5" fill="rgba(0, 255, 255, 0.8)" />
          
          <line x1="100" y1="600" x2="500" y2="600" />
          <line x1="300" y1="600" x2="300" y2="750" />
          <circle cx="300" cy="600" r="5" fill="rgba(0, 255, 255, 0.8)" />
          
          <line x1="700" y1="500" x2="1100" y2="500" />
          <line x1="900" y1="350" x2="900" y2="500" />
          <circle cx="900" cy="500" r="5" fill="rgba(0, 255, 255, 0.8)" />
        </motion.g>
      </svg>

      {/* Digital Energy Particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 255, 1), rgba(0, 200, 255, 0.5))',
            boxShadow: '0 0 10px rgba(0, 255, 255, 1), 0 0 20px rgba(0, 200, 255, 0.6)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 300],
            y: [0, (Math.random() - 0.5) * 300],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Pulsing Energy Rings */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border-2"
          style={{
            borderColor: 'rgba(0, 255, 255, 0.4)',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.3)',
            left: `${20 + i * 20}%`,
            top: `${25 + i * 15}%`,
          }}
          animate={{
            width: ['100px', '300px'],
            height: ['100px', '300px'],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Cyber Grid with Animated Nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        <defs>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 1)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0)" />
          </radialGradient>
        </defs>
        
        {[...Array(5)].map((_, i) => (
          <g key={`grid-${i}`}>
            <line
              x1="0"
              y1={100 + i * 150}
              x2="100%"
              y2={100 + i * 150}
              stroke="rgba(0, 255, 255, 0.3)"
              strokeWidth="1"
            />
            <line
              x1={100 + i * 200}
              y1="0"
              x2={100 + i * 200}
              y2="100%"
              stroke="rgba(0, 255, 255, 0.3)"
              strokeWidth="1"
            />
            
            <circle cx={100 + i * 200} cy={100 + i * 150} r="5" fill="url(#nodeGlow)">
              <animate
                attributeName="r"
                values="5;10;5"
                dur={`${2 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Massive Cyan Energy Orbs */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: '500px',
              height: '500px',
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, rgba(0, 200, 255, 0.1) 40%, transparent 70%)'
                : 'radial-gradient(circle, rgba(0, 150, 255, 0.15) 0%, rgba(0, 100, 255, 0.08) 40%, transparent 70%)',
              left: `${i * 30}%`,
              top: `${i * 25}%`,
              willChange: 'transform',
            }}
            animate={{
              x: [0, 150, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Electric Sparks during lightning */}
      {lightningFlash && [...Array(20)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(0, 255, 255, 0.8))',
            boxShadow: '0 0 15px rgba(0, 255, 255, 1)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 2, 0],
            opacity: [1, 0.8, 0],
            x: (Math.random() - 0.5) * 150,
            y: Math.random() * 150,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}