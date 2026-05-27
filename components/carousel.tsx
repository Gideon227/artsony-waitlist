"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

const videos = [
  { id: 1, image: "/images/ocean.jpg", title: "Ocean" },
  { id: 2, image: "/images/mountain.jpg", title: "Mountain" },
  { id: 3, image: "/images/forest.jpg", title: "Forest" },
  { id: 4, image: "/images/desert.jpg", title: "Desert" },
];

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, videos.length - 1));
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full relative flex flex-col items-center justify-center py-16 z-50">
      {/* Main Carousel Area */}
      <div className="relative w-full flex items-center justify-between md:px-12">

        {/* Left Control */}
        <button
          onClick={prevVideo}
          disabled={currentIndex === 0}
          className="z-50 w-6 h-6 md:w-12 md:h-12 rounded-full border border-[#E6E8EB] flex items-center cursor-pointer justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Image src="/icons/arrow-left.svg" width={12} height={7} alt="left arrow icon" className="md:w-[14px] md:h-[8px]" />
        </button>

        {/* Stacked Cards Container */}
        <div className="relative w-full max-w-[280px] sm:max-w-lg md:max-w-3xl aspect-[16/10] mx-3 md:mx-8 perspective-1000">
          {videos.map((video, index) => {
            const isPast = index < currentIndex;
            const offset = index - currentIndex;
            const isVisible = offset >= 0 && offset <= 2;

            return (
              <motion.div
                key={video.id}
                initial={false}
                animate={{
                  x: isPast ? "-40%" : "0%",
                  y: isPast ? 0 : -offset * 30,
                  scale: isPast ? 0.9 : 1 - offset * 0.05,
                  opacity: isPast ? 0 : isVisible ? 1 : 0,
                }}
                transition={{
                  duration: 1,
                  ease: [0.32, 0.72, 0, 1],
                }}
                style={{
                  zIndex: videos.length - index,
                  transformOrigin: "bottom center",
                  borderRadius: "20px",
                  border: "2px solid #A2D1D2",
                  padding: "10px 11px 10px 10px",
                  opacity: "0.6",
                  background: "rgba(255, 255, 255, 0.68)",
                  boxShadow: "0 -4px 16px 0 rgba(0, 0, 0, 0.25)",
                }}
                className="absolute inset-0 w-full h-full rounded-[1.5rem] bg-gray-100 border-[4px] md:border-[6px] border-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)] overflow-hidden flex items-center justify-center"
              >
                <img
                  src={video.image}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {offset === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 w-12 h-12 md:w-16 md:h-16 bg-[#F25B38] rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Play fill="currentColor" strokeWidth={0} size={18} className="ml-1 md:hidden" />
                    <Play fill="currentColor" strokeWidth={0} size={24} className="ml-1 hidden md:block" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right Control */}
        <button
          onClick={nextVideo}
          disabled={currentIndex === videos.length - 1}
          className="z-50 w-6 h-6 md:w-12 md:h-12 rounded-full border border-[#E6E8EB] flex items-center cursor-pointer justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Image src="/icons/arrow-right.svg" width={12} height={7} alt="right arrow icon" className="md:w-[14px] md:h-[8px]" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center gap-2 mt-5 md:mt-8">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-3 md:w-4 bg-[#171717]"
                : "w-1.5 md:w-2 bg-[#D1D5DB]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}