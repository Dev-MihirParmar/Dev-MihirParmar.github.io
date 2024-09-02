'use client';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Sphere, useTexture } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

interface TypewriterTextProps {
  text: string;
  position: [number, number, number];
}

interface NavItemProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, position }) => {
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

  return (
    <Text position={position} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
      {displayText}
    </Text>
  );
};

const Planet = ({ textureUrl, position, size, speed }: { textureUrl: string; position: [number, number, number]; size: number; speed: number }) => {
  const texture = useTexture(textureUrl);
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += speed;
    }
  });

  return (
    <Sphere ref={planetRef} args={[size, 64, 64]} position={position}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight intensity={1.5} position={[10, 10, 10]} color="#ffaa55" />
      <pointLight intensity={1} position={[-10, -10, -10]} color="#5599ff" />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={10000} factor={7} saturation={0} fade speed={1} />

      {/* Planets */}
      <Planet textureUrl="/textures/earth.jpg" position={[0, 0, 0]} size={1} speed={0.001} />
      <Planet textureUrl="/textures/moon.jpg" position={[2, 1, 1]} size={0.27} speed={0.002} />
      <Planet textureUrl="/textures/molten.jpg" position={[-3, -1, -2]} size={0.5} speed={0.0015} />

      {/* 3D Text */}
      <TypewriterText text="Hey there," position={[-2, 2, 0]} />
      <TypewriterText text="I am Mihir Parmar" position={[-2, 1.5, 0]} />
      <TypewriterText text="A Coder, Circuit Designer..." position={[-2, 1, 0]} />

      {/* Orbit controls to navigate the scene */}
      <OrbitControls enableZoom={true} />

      {/* Bloom and glow effect */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </>
  );
};

const NavItem: React.FC<NavItemProps> = ({ children, isActive, onClick }) => (
  <motion.div
    className={`px-4 py-2 rounded-full ${isActive ? 'bg-blue-500 text-white' : 'bg-white bg-opacity-10 text-gray-300'}`}
    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <a href='#' className={`transition-colors text-lg ${isActive ? 'glow' : 'hover:text-blue-300'}`}>
      {children}
    </a>
  </motion.div>
);

export default function Component() {
  const [activePage, setActivePage] = useState('Home');
  
  return (
    <div className="relative h-screen overflow-hidden bg-black text-white">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

      <motion.div className="relative z-20 h-full pt-28">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50">
          <motion.div
            className="flex justify-center space-x-8 py-4 px-6 mx-auto mt-4 max-w-5xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          >
            {['Home', 'Portfolio', 'Projects', 'Gallery', 'Articles', 'Blog'].map((item) => (
              <NavItem
                key={item}
                isActive={activePage === item}
                onClick={() => setActivePage(item)}
              >
                {item}
              </NavItem>
            ))}
          </motion.div>
        </nav>

        {/* Hero Section */}
        <motion.div
          className="flex items-center justify-between h-full px-16 mt-19"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.h1
              className="text-5xl font-bold mb-4 text-blue-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Hey there,<br />I am Mihir Parmar
            </motion.h1>
            <motion.p
              className="text-xl mb-6 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              A Coder, Circuit Designer, Writer, Hobbyist, Electronics Enthusiast, JEE Aspirant or
              whatever you like to call it
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mb-10"
            >
              <Button
                variant="outline"
                className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110 text-lg py-3 px-6 glow"
              >
                <Download className="mr-2 h-4 w-4" /> Download my CV
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Sections */}
        <div className={`section transition-all duration-700 ease-in-out transform ${activePage === 'Home' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {/* Portfolio Section */}
          {activePage === 'Portfolio' && (
            <div className="flex justify-center items-center h-screen">
              <h2 className="text-4xl text-white">Portfolio Page</h2>
            </div>
          )}
          {/* Projects Section */}
          {activePage === 'Projects' && (
            <div className="flex justify-center items-center h-screen">
              <h2 className="text-4xl text-white">Projects Page</h2>
            </div>
          )}
          {/* Gallery Section */}
          {activePage === 'Gallery' && (
            <div className="flex justify-center items-center h-screen">
              <h2 className="text-4xl text-white">Gallery Page</h2>
            </div>
          )}
          {/* Articles Section */}
          {activePage === 'Articles' && (
            <div className="flex justify-center items-center h-screen">
              <h2 className="text-4xl text-white">Articles Page</h2>
            </div>
          )}
          {/* Blog Section */}
          {activePage === 'Blog' && (
            <div className="flex justify-center items-center h-screen">
              <h2 className="text-4xl text-white">Blog Page</h2>
            </div>
          )}
        </div>
      </motion.div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
          background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
          color: white;
        }

        .glow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5);
        }

        .section {
          transition: opacity 0.5s ease-in-out, transform 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
}
