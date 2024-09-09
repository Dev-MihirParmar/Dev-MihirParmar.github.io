'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  return <span>{displayText}</span>;
};

interface NavItemProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ children, isActive, onClick }) => (
  <motion.div
    className={`px-1 sm:px-4 py-1 sm:py-2 rounded-full ${
      isActive ? 'bg-blue-500 text-white' : 'text-gray-300'
    }`}
    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <a
      href="#"
      className={`transition-colors text-xs sm:text-base ${
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
    className="p-2 sm:p-3 rounded-full bg-white bg-opacity-10 backdrop-blur-sm text-white transition-all duration-300"
    style={{ boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)' }}
  >
    <img src={icon} alt="Social Icon" className="h-6 w-6 sm:h-8 sm:w-8" />
  </motion.a>
);

const SpaceBackground = () => {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={20000}
        factor={5}
        saturation={0}
        fade
      />
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial
          map={new THREE.TextureLoader().load('/baground.webp')}
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
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        <motion.div className="relative h-full pt-16 sm:pt-28">
          <nav className="fixed top-0 left-0 right-0 z-50">
            <motion.div
               className="flex justify-center space-x-1 sm:space-x-2 py-0 sm:py-1 px-1 sm:px-2 mx-auto mt-1 sm:mt-2 max-w-fit bg-white bg-opacity-10 rounded-full"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            >
              {['Home', 'Portfolio', 'Projects', 'Gallery', 'Articles', 'Blog'].map((item) => (
                <NavItem
                  key={item}
                  isActive={activePage === item}
                  onClick={() => handleNavigation(item)}
                >
                  {item}
                </NavItem>
              ))}
            </motion.div>
          </nav>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-full px-4 sm:px-16 mt-4 sm:mt-19"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="max-w-lg text-left"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.h1
                className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4 text-blue-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <TypewriterText text="Hey there," />
                <br />
                I am Mihir Parmar
              </motion.h1>
              <motion.p
                className="text-sm sm:text-xl mb-3 sm:mb-6 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                A Coder, Circuit Designer, Writer, Hobbyist, Electronics
                Enthusiast, JEE Aspirant or whatever you like to call it
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mb-4 sm:mb-10"
              >
                <Button
                  variant="outline"
                  className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110 text-sm sm:text-lg py-2 sm:py-3 px-4 sm:px-6 glow"
                >
                  <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Download my CV
                </Button>
              </motion.div>
              <motion.div
                className="flex space-x-4 sm:space-x-8 mt-4 sm:mt-10"
                initial={{ opacity: 0, y: 20 }}
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
            <motion.div
              className="relative shadow-2xl rounded-lg p-2 bg-gray-900 mt-4 sm:mt-0 sm:ml-auto"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style={{ marginRight: '15%', marginTop: '30px' }}
            >
              <motion.img
                src="/your-photo.jpg"
                alt="Mihir Parmar"
                className="relative z-10 object-cover rounded-lg border-2 border-purple-800"
                style={{
                  width: '250px',
                  height: '300px',
                }}
                whileHover={{ scale: 1.05 }}
              />
              <motion.div
                className="absolute -inset-1.5 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 blur-lg opacity-70"
              />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            <motion.div
              key={activePage}
              className={`section transition-all duration-700 ease-in-out transform ${
                activePage === 'Home'
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-90'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {activePage === 'Portfolio' && (
                <div className="flex justify-center items-center h-screen">
                  <h2 className="text-4xl text-white">Portfolio Page</h2>
                </div>
              )}
              {activePage === 'Projects' && (
                <div className="flex justify-center items-center h-screen">
                  <h2 className="text-4xl text-white">Projects Page</h2>
                </div>
              )}
              {activePage === 'Gallery' && (
                <div className="flex justify-center items-center h-screen">
                  <h2 className="text-4xl text-white">Gallery Page</h2>
                </div>
              )}
              {activePage === 'Articles' && (
                <div className="flex justify-center items-center h-screen">
                  <h2 className="text-4xl text-white">Articles Page</h2>
                </div>
              )}
              {activePage === 'Blog' && (
                <div className="flex justify-center items-center h-screen">
                  <h2 className="text-4xl text-white">Blog Page</h2>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
          color: white;
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
        }

        .absolute.inset-0.z-10 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
        }

        @media (max-width: 640px) {
          .max-w-lg {
            max-width: 100%;
          }
          .flex-col.sm\\:flex-row {
            flex-direction: column;
          }
          .items-start.sm\\:items-center {
            align-items: flex-start;
          }
          .relative.shadow-2xl {
            margin-top: 1rem !important;
            margin-right: 0 !important;
            align-self: center;
          }
          .relative.shadow-2xl img {
            width: 200px;
            height: 240px;
          }
        }
      `}</style>
    </div>
  );
}
