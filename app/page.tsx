'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const SocialButton: React.FC<{ icon: string, href: string }> = ({ icon, href }) => (
  <motion.a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.95 }}
    className='p-3 rounded-full bg-white bg-opacity-10 backdrop-blur-sm text-white transition-all duration-300'
    style={{ boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)' }}
  >
    <img src={icon} alt='Social Icon' className='h-8 w-8' />
  </motion.a>
);

const StarField: React.FC = () => {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2,
      duration: Math.random() * 20 + 5,
      delay: Math.random() * 5,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className='absolute inset-0 overflow-hidden'>
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className='absolute rounded-full bg-white'
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: Math.random() * 0.8 + 0.2,
          }}
          animate={{
            y: ['-100%', '100%'],
            opacity: [1, 0.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  );
};

const PlanetBackground: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <motion.div
      className='absolute inset-0 z-0'
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.3,
      }}
      animate={{
        scale: [1, 1.5],
        opacity: [0.3, 1],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
      }}
    />
  );
};

export default function Component() {
  const [activePage, setActivePage] = useState('Home');
  const imageUrl = '/Another-earth.jpg'; // Path to your uploaded image

  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className='relative h-screen overflow-hidden bg-black text-white'>
      <StarField />
      <PlanetBackground imageUrl={imageUrl} />

      {/* Translucent Overlay */}
      <div className='absolute inset-0 bg-black bg-opacity-30 z-10'></div>

      {/* Content */}
      <motion.div
        className='relative z-20 h-full pt-28' // Added pt-20 to move everything down
      >
        {/* Navigation Bar */}
        <nav className='fixed top-0 left-0 right-0 z-50'>
          <motion.div
            className='flex justify-center space-x-8 py-4 px-6 mx-auto mt-4 max-w-5xl'
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

        {/* Hero Section */}
        <motion.div
          className='flex items-center justify-between h-full px-16 mt-19' // Added mt-20 to move content further down
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className='max-w-lg'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.h1
              className='text-5xl font-bold mb-4 text-blue-300'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <TypewriterText text="Hey there," />
              <br />
              I am Mihir Parmar
            </motion.h1>
            <motion.p
              className='text-xl mb-6 text-gray-300'
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
              className='mb-10'
            >
              <Button
                variant='outline'
                className='text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110 text-lg py-3 px-6 glow'
              >
                <Download className='mr-2 h-4 w-4' /> Download my CV
              </Button>
            </motion.div>
            <motion.div
              className='flex space-x-8 mt-10'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <SocialButton icon='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' href='https://github.com/Dev-MihirParmar' />
              <SocialButton icon='https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg' href='https://www.linkedin.com/in/dev-mihirparmar/' />
              <SocialButton icon='https://abs.twimg.com/icons/apple-touch-icon-192x192.png' href='https://x.com/dev_mihirparmar' />
              <SocialButton icon='https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png' href='https://www.instagram.com/dev.mihirparmar/' />
              <SocialButton icon='https://miro.medium.com/v2/resize:fill:152:152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png' href='https://dev-mihirparmar.medium.com/' />
            </motion.div>
          </motion.div>
          <motion.div
            className='relative shadow-2xl rounded-lg p-4 bg-gray-900 ml-auto'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{ marginRight: '40%' , marginTop: '50px' }}
            
          >
            <motion.img
              src='/your-photo.jpg'
              alt='Mihir Parmar'
              className='relative z-10 object-cover rounded-lg border-4 border-gray-800'
              style={{
                width: '220px',
                height: '300px',
              }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.div
              className='absolute -inset-1.5 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 blur-lg opacity-70'
            />
          </motion.div>
        </motion.div>

        {/* Sections */}
        <div className={`section transition-all duration-700 ease-in-out transform ${activePage === 'Home' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {/* Portfolio Section */}
          {activePage === 'Portfolio' && (
            <div className='flex justify-center items-center h-screen'>
              <h2 className='text-4xl text-white'>Portfolio Page</h2>
            </div>
          )}
          {/* Projects Section */}
          {activePage === 'Projects' && (
            <div className='flex justify-center items-center h-screen'>
              <h2 className='text-4xl text-white'>Projects Page</h2>
            </div>
          )}
          {/* Gallery Section */}
          {activePage === 'Gallery' && (
            <div className='flex justify-center items-center h-screen'>
              <h2 className='text-4xl text-white'>Gallery Page</h2>
            </div>
          )}
          {/* Articles Section */}
          {activePage === 'Articles' && (
            <div className='flex justify-center items-center h-screen'>
              <h2 className='text-4xl text-white'>Articles Page</h2>
            </div>
          )}
          {/* Blog Section */}
          {activePage === 'Blog' && (
            <div className='flex justify-center items-center h-screen'>
              <h2 className='text-4xl text-white'>Blog Page</h2>
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

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        .section {
          transition: opacity 0.5s ease-in-out, transform 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
}
