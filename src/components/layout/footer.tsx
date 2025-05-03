"use client";
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 w-full border-t py-4 md:py-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-4 px-4 sm:px-6 md:flex-row md:justify-between">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-sm text-muted-foreground md:text-left"
        >
          &copy; {new Date().getFullYear()} Erite. All rights reserved.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4 md:gap-6"
        >
          <a
            href="#"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Contact
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
}