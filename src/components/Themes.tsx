import { 
  Stethoscope, 
  Wheat, 
  GraduationCap, 
  Building2, 
  Zap, 
  Plane,
  ShieldCheck,
  Briefcase,
  Globe,
  Factory,
  Droplet,
  Leaf,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { useState } from "react";

const themes = [
  {
    icon: Stethoscope,
    title: "Healthcare & Biomedical",
    description: "Medical devices, telemedicine, and healthcare innovations",
    color: "from-red-500 to-red-600",
    borderColor: "group-hover:border-red-500"
  },
  {
    icon: Wheat,
    title: "Agriculture & Rural",
    description: "Smart farming, crop management, and rural technology",
    color: "from-green-600 to-green-700",
    borderColor: "group-hover:border-green-600"
  },
  {
    icon: GraduationCap,
    title: "Education & Learning",
    description: "E-learning, skill development, and educational tools",
    color: "from-blue-600 to-blue-700",
    borderColor: "group-hover:border-blue-600"
  },
  {
    icon: Building2,
    title: "Smart Cities",
    description: "Urban planning, traffic, and city infrastructure",
    color: "from-purple-600 to-purple-700",
    borderColor: "group-hover:border-purple-600"
  },
  {
    icon: Leaf,
    title: "Clean & Green Tech",
    description: "Renewable energy and environmental solutions",
    color: "from-green-500 to-green-600",
    borderColor: "group-hover:border-green-500"
  },
  {
    icon: Plane,
    title: "Travel & Tourism",
    description: "Tourism promotion and travel technology",
    color: "from-[#FF6B35] to-[#FF5722]",
    borderColor: "group-hover:border-[#FF6B35]"
  },
  {
    icon: ShieldCheck,
    title: "Disaster Management",
    description: "Emergency response and disaster prevention",
    color: "from-red-600 to-red-700",
    borderColor: "group-hover:border-red-600"
  },
  {
    icon: Briefcase,
    title: "MedTech & BioTech",
    description: "Advanced biotechnology and medical innovations",
    color: "from-indigo-600 to-indigo-700",
    borderColor: "group-hover:border-indigo-600"
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Industry 4.0 and smart manufacturing solutions",
    color: "from-gray-600 to-gray-700",
    borderColor: "group-hover:border-gray-600"
  },
  {
    icon: Droplet,
    title: "Water & Sanitation",
    description: "Water management and sanitation technology",
    color: "from-blue-500 to-blue-600",
    borderColor: "group-hover:border-blue-500"
  },
  {
    icon: Zap,
    title: "Energy & Power",
    description: "Power distribution and energy efficiency",
    color: "from-yellow-500 to-yellow-600",
    borderColor: "group-hover:border-yellow-500"
  },
  {
    icon: Globe,
    title: "Miscellaneous",
    description: "Other innovative problem domains",
    color: "from-gray-500 to-gray-600",
    borderColor: "group-hover:border-gray-500"
  }
];

export function Themes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(themes.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentThemes = () => {
    const start = currentIndex * itemsPerPage;
    return themes.slice(start, start + itemsPerPage);
  };

  return (
    <section id="themes" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="bg-[#FF6B35]/10 text-[#FF6B35] px-4 py-2 rounded-full text-sm">
                Problem Domains
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
              Problem Statement Themes
            </h2>
            <div className="w-20 h-1 bg-[#FF6B35] mx-auto mb-6"></div>
            <p className="text-gray-600 text-base lg:text-lg max-w-3xl mx-auto">
              RH 2024 covers various domains with innovative problem statements from government organizations, industries, and social sectors
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 bg-white hover:bg-[#FF6B35] text-gray-700 hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
              aria-label="Previous themes"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Themes Grid */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[300px]"
            >
              {getCurrentThemes().map((theme, index) => (
                <motion.div
                  key={currentIndex * itemsPerPage + index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className={`p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-gray-100 ${theme.borderColor} group h-full bg-white`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-gradient-to-br ${theme.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <theme.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-gray-900 mb-2 text-base group-hover:text-[#FF6B35] transition-colors">
                      {theme.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {theme.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 bg-white hover:bg-[#FF6B35] text-gray-700 hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
              aria-label="Next themes"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[#FF6B35] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 text-sm">
              And many more categories to explore innovative solutions for India's challenges
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
