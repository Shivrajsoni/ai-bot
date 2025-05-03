"use client";
import { Search } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useEffect } from 'react';
import { useTheme } from 'next-themes'; 
import MemoryCard from '../memory/memory-card';
import { motion } from "framer-motion";

export function Header() {
  const { theme } = useTheme();

  useEffect(() => {
    const starContainer = document.querySelector('.star-container')!;
    if(starContainer){
      const numberOfStars = 100;

      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 5 + 1}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        starContainer.appendChild(star);
      }
    }
  }, []);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <Search className="h-6 w-6 text-primary" />
            <span className="text-primary font-bold text-2xl tracking-wide">Erite</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </motion.header>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`star-container ${theme ==='dark'?'dark-mode':'light-mode' }`}
      />
      <MemoryCard />
    </>
  );
}