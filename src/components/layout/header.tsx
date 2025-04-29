"use client";
import { Search } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes'; 
import  MemoryCard  from '../memory/memory-card';
import { useRouter } from 'next/navigation';

export function Header() {
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const starContainer = document.querySelector('.star-container')!;
    if(starContainer){
      const numberOfStars = 100; // You can adjust the number of stars

      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}vw`; // Randomize horizontal position
        star.style.top = `${Math.random() * 100}vh`; // Randomize vertical position
        star.style.animationDuration = `${Math.random() * 5 + 1}s`; // Randomize animation speed
        star.style.animationDelay = `${Math.random() * 5}s`; // Randomize animation delay
        star.style.width = `${Math.random() * 3 + 1}px`; // Randomize star size
        star.style.height = star.style.width; // Keep the star round
        starContainer.appendChild(star);
    }

    }
  }, []);
  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Search className="h-6 w-6 text-white" />
          <span className="text-black-500 font-bold text-2xl tracking-wide">Erite</span>
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggle />
        </div>
      </div>
    </header>
    <div className={`star-container ${theme ==='dark'?'dark-mode':'light-mode' }`}></div>
    {<MemoryCard />}
  </>
  );
}