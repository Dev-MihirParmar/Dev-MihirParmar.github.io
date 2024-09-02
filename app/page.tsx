'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

interface TypewriterTextProps {
  text: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isDeleting && displayText === text) {
      timer = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && displayText === '') {
      timer = setTimeout(() => setIsDeleting(false), 500);
    } else {
      timer = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting ? prev.slice(0, -1) : text.slice(0, prev.length + 1)
        );
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, text]);

  return <span className="text-lg md:text-2xl text-white">{displayText}</span>; // "Hey there," is bigger on desktop 
};

interface NavItemProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ children, isActive, onClick }) => (
  <motion.div
    className={`px-1 py-0.5 rounded-full text-xs md:px-3 md:py-1 md:text-lg ${
      isActive ? 'bg-blue-500 text-white' : 'text-gray-300'
    }`}
    whileHover={{ scale: 1.1, backgroundColor: isActive ? '' : 'rgba(255, 255, 255, 0.2)' }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <a
      href="#"
      className={`transition-colors ${
        isActive ? 'glow' : 'hover:text-blue-300'
      }`}
    >
      {children}
    </a>
  </motion.div>
);

const SocialButton: React.FC<{ icon: string; href: string }> = ({
  icon,
  href,
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.95 }}
    className="p-2 rounded-full bg-white bg-opacity-10 backdrop-blur-sm text-white transition-all duration-300 md:p-3"
    style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}
  >
    <img src={icon} alt="Social Icon" className="h-5 w-5 md:h-8 md:w-8" />
  </motion.a>
);

const SpaceBackground = () => {
  return (
    <>
      <Stars
        radius={80}
        depth={50}
        count={50000}
        factor={4}
        saturation={2}
        fade
      />
      <mesh>
        <sphereGeometry args={[1000, 60, 40]} />
        <meshBasicMaterial
          map={new THREE.TextureLoader().load('/baground.jpg')}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

export default function Component() {
  const [activePage, setActivePage] = useState('Home');

  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black text-white">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Suspense fallback={null}>
          <SpaceBackground />
        </Suspense>
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.7} />
        <ambientLight intensity={0.5} />
      </Canvas>

      {/* Content Container (absolutely positioned) */}
      <div className="absolute inset-0 z-10">
        {/* Translucent Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Content */}
        <motion.div className="relative h-full pt-10 md:pt-20">
          {/* Navigation Bar (Optimized) */}
          <nav className="fixed top-0 left-0 right-0 z-50">
            <motion.div
              className="py-1 mx-auto mt-2 px-2 text-xs md:py-2 md:mt-4 md:px-4 md:max-w-2xl md:rounded-full backdrop-blur-sm bg-opacity-10"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="flex flex-wrap justify-center space-x-1 overflow-x-auto md:space-x-4 md:nowrap">
                {[
                  'Home',
                  'Portfolio',
                  'Projects',
                  'Gallery',
                  'Articles',
                  'Blog',
                ].map((item) => (
                  <NavItem
                    key={item}
                    isActive={activePage === item}
                    onClick={() => handleNavigation(item)}
                  >
                    {item}
                  </NavItem>
                ))}
              </div>
            </motion.div>
          </nav>

          {/* Hero Section */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center h-full px-2 mt-12 md:px-16 md:mt-19"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="max-w-xs text-center md:max-w-lg md:text-left order-2 md:order-1"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.h1
                className="text-xl font-bold mb-2 text-blue-300 md:text-6xl md:mb-4" 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <TypewriterText text="Hey there," />
                <br />
                I am Mihir Parmar
              </motion.h1>
              <motion.p
                className="text-xs mb-3 text-gray-300 md:text-xl md:mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                A Coder, Circuit Designer, Writer, Hobbyist, Electronics
                Enthusiast, JEE Aspirant or whatever you like to call it
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mb-5 md:mb-10"
              >
                <Button
                  variant="outline"
                  className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 text-xs py-1 px-2 md:text-lg md:py-3 md:px-6 glow"
                >
                  <Download className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                  Download my CV
                </Button>
              </motion.div>
              <motion.div
                className="flex justify-center space-x-2 mt-5 md:space-x-8 md:mt-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <SocialButton
                  icon="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  href="https://github.com/Dev-MihirParmar"
                />
                <SocialButton
                  icon="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                  href="https://www.linkedin.com/in/dev-mihirparmar/"
                />
                <SocialButton
                  icon="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
                  href="https://x.com/dev_mihirparmar"
                />
                <SocialButton
                  icon="https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png"
                  href="https://www.instagram.com/dev.mihirparmar/"
                />
                <SocialButton
                  icon="https://miro.medium.com/v2/resize:fill:152:152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"
                  href="https://dev-mihirparmar.medium.com/"
                />
              </motion.div>
            </motion.div>

            {/* Image (moved below text on smaller screens) */}
            <motion.div
              className="relative rounded-lg p-1 bg-blue-900 mt-5 w-36 md:w-64 md:mt-30 md:ml-auto order-1 md:order-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.img
                src="/your-photo.jpg"
                alt="Mihir Parmar"
                className="relative z-10 object-cover rounded-lg border-1 border-blue-800"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                whileHover={{ scale: 1.05 }}
              />
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 blur-lg opacity-70"
              />
            </motion.div>
          </motion.div>

          {/* Sections (optimized) */}
          <div className="mt-12 md:mt-20">
            {activePage === 'Portfolio' && (
              <section className="flex justify-center items-center h-screen">
                <h2 className="text-2xl text-white md:text-4xl">Portfolio Page</h2>
              </section>
            )}
            {/* Other Sections (similar structure) */}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
          background: radial-gradient(
            ellipse at bottom,
            #1b2735 0%,
            #090a0f 100%
          );
          color: white; /* Ensure text is visible against the dark background */
        }

        .glow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
            0 0 20px rgba(0, 255, 255, 0.5);
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        .section {
          transition: opacity 0.5s ease-in-out, transform 0.7s ease-in-out;
          box-shadow: none;
          border-radius: 0;
        }

        /* Absolutely position the content container */
        .absolute.inset-0.z-10 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10; /* Ensure it's above the canvas */
        }

        @media (max-width: 768px) {
          .section {
            padding: 1rem; /* Reduced padding for smaller screens */
          }

          /* Make top bar smaller and reduce space between items on smaller screens */
          nav .motion.div {
            py: 0.5rem; /* Reduced padding */
            mt: 1rem; /* Reduced margin */
          }

          nav .motion.div .flex {
            space-x: 0.5rem; /* Reduced spacing between navigation items */
          }

          nav .motion.div .flex .motion.div {
            px: 1rem; /* Reduced padding within navigation items */
            py: 0.25rem; /* Reduced padding within navigation items */
          }
        }
      `}</style>
    </div>
  );
}