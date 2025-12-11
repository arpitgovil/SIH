import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import heroImage1 from "figma:asset/1e7ae2b6cfaa6198d52aa8352f0d1039e87a8eb0.png";
import heroImage2 from "figma:asset/f67e8b2130d613f9e926932180972600a54a4cd8.png";
import heroImage3 from "figma:asset/3578d13bebc79b691a8526b1b532169615eff229.png";

interface HeroProps {
  onRegisterClick?: () => void;
  onViewProblems?: () => void;
}

const heroImages = [heroImage1, heroImage2, heroImage3];

export function Hero({ onRegisterClick, onViewProblems }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section id="home" className="relative bg-white overflow-hidden">
      {/* Image Carousel */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentSlide]}
              alt={`Regional Hackathon 2024 - Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="group bg-white/80 hover:bg-white backdrop-blur-sm p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-800 group-hover:text-[#FF6B35] transition-colors" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="group bg-white/80 hover:bg-white backdrop-blur-sm p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-800 group-hover:text-[#FF6B35] transition-colors" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 md:w-10 h-2 md:h-2.5 bg-[#FF6B35]"
                  : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* India Flag */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>
    </section>
  );
}
