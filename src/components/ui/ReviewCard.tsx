import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  review: string;
  rating: number;
  date?: string;
  delay?: number;
}

export function ReviewCard({ name, review, rating, delay = 0 }: ReviewCardProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Get initials for avatar
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  if (prefersReducedMotion) {
    return (
      <div className="bg-[#111111] p-8 relative flex flex-col h-full border border-zinc-800">
        <span className="text-4xl text-[#C9A84C] font-serif absolute top-6 left-6 leading-none">"</span>
        <p className="text-zinc-300 italic mb-8 mt-4 relative z-10">{review}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-[#C9A84C] font-bold border border-zinc-700">
              {initials}
            </div>
            <div>
              <div className="font-semibold text-white flex items-center gap-2">
                {name}
                <CheckCircle className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-xs text-zinc-500">Verified Client</div>
            </div>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-[#C9A84C] text-[#C9A84C]' : 'text-zinc-600'}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group bg-[#111111] p-8 relative flex flex-col h-full border border-zinc-800 hover:border-[#C9A84C]/50 transition-colors duration-500 rounded-sm overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <motion.span 
        className="text-5xl text-[#C9A84C] font-serif absolute top-4 left-6 leading-none origin-top-left"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.0 }}
        transition={{ duration: 0.3 }}
      >
        "
      </motion.span>
      
      <p className="text-zinc-300 italic mb-8 mt-4 relative z-10">{review}</p>
      
      <div className="mt-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <motion.div 
            className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-[#C9A84C] font-bold border border-zinc-700 shadow-[0_0_0_rgba(201,168,76,0)]"
            whileHover={{ boxShadow: "0 0 15px rgba(201,168,76,0.3)" }}
          >
            {initials}
          </motion.div>
          <div>
            <div className="font-semibold text-white flex items-center gap-2">
              {name}
              <CheckCircle className="w-3 h-3 text-[#C9A84C]" />
            </div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Verified Client</div>
          </div>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, transition: { delay: i * 0.05 } }}
            >
              <Star className={`w-4 h-4 ${i < rating ? 'fill-[#C9A84C] text-[#C9A84C]' : 'text-zinc-700'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
