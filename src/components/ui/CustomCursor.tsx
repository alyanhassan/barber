import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Use framer-motion values for smooth interpolation
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply spring physics for lag effect (lerp: 0.15 equivalent)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is desktop and prefers motion
    const checkDesktop = () => window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
    const checkMotion = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const handleResize = () => setIsDesktop(checkDesktop() && checkMotion());
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    // Move cursor tracking
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Detect hover on links and buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isDesktop, cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#C9A84C] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHovering ? 0 : 1
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#C9A84C] rounded-full pointer-events-none z-[9998] bg-transparent"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
