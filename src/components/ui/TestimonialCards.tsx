import * as React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: string;
  id: number;
  author: string;
}

export function TestimonialCard({ 
  handleShuffle, 
  testimonial, 
  position, 
  id, 
  author 
}: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0
      }}
      animate={{
        rotate: position === "front" 
          ? "-6deg" 
          : position === "middle" 
          ? "0deg" 
          : "6deg",
        x: position === "front" 
          ? "0%" 
          : position === "middle" 
          ? "33%" 
          : "66%"
      }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(_, info) => {
        dragRef.current = info.point.x;
      }}
      onDragEnd={(_, info) => {
        if (dragRef.current - info.point.x > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[420px] w-[320px] 
        select-none place-content-center space-y-6 rounded-2xl 
        border border-white/10 bg-[#111111] p-8 shadow-2xl 
        backdrop-blur-md ${isFront 
          ? "cursor-grab active:cursor-grabbing" 
          : ""}`}
    >
      <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 
        border-2 border-primary flex items-center justify-center 
        text-primary text-2xl font-black">
        {author.charAt(0)}
      </div>
      <div className="flex justify-center gap-1 text-primary">
        {[1,2,3,4,5].map(s => (
          <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 
              1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 
              0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 
              00-.364 1.118l1.07 3.292c.3.921-.755 
              1.688-1.54 1.118l-2.8-2.034a1 1 0 
              00-1.175 0l-2.8 2.034c-.784.57-1.838-.197
              -1.539-1.118l1.07-3.292a1 1 0 
              00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588
              -1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
      <p className="text-center text-base italic text-white/80 
        leading-relaxed">"{testimonial}"</p>
      <p className="text-center text-xs font-bold uppercase 
        tracking-widest text-primary">{author}</p>
    </motion.div>
  );
}

interface ShuffleCardsProps {
  testimonials: {
    id: number;
    testimonial: string;
    author: string;
  }[];
}

export function ShuffleCards({ testimonials }: ShuffleCardsProps) {
  const [positions, setPositions] = React.useState([
    "front", "middle", "back"
  ]);

  const handleShuffle = () => {
    const newPositions = [...positions];
    newPositions.unshift(newPositions.pop()!);
    setPositions(newPositions);
  };

  return (
    <div className="relative h-[420px] w-[320px]">
      {testimonials.slice(0, 3).map((t, index) => (
        <TestimonialCard
          key={t.id}
          id={t.id}
          testimonial={t.testimonial}
          author={t.author}
          handleShuffle={handleShuffle}
          position={positions[index]}
        />
      ))}
    </div>
  );
}
