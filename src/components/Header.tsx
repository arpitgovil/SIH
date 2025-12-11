import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import headerLogos from "figma:asset/d8c71f1d803c63b5d5e9a1d938fbee7f9cb254f9.png";

interface HeaderProps {
  onRegisterClick?: () => void;
  onViewProblems?: () => void;
}

export function Header({ onRegisterClick, onViewProblems }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* Tricolor Bar */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>
      
      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between py-6">
            {/* Logo Section */}
            <div className="flex items-center">
              <img 
                src={headerLogos} 
                alt="Regional Hackathon - Government of India Initiative" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>

            {/* Desktop RH LOGIN Button */}
            <div className="hidden lg:block">
              <Button 
                onClick={onRegisterClick} 
                className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-3 rounded-md shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group"
              >
                <span className="relative z-10 tracking-wide">RH LOGIN</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF5722] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
            </button>
          </div>

          {/* Desktop Navigation - Moved below */}
          <nav className="hidden lg:flex items-center justify-center gap-1 pb-4 border-t border-gray-100 pt-4">
            <a 
              href="#home" 
              className="px-4 py-2 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
            >
              Home
            </a>
            <a 
              href="#about" 
              className="px-4 py-2 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
            >
              About
            </a>
            <a 
              href="#themes" 
              className="px-4 py-2 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
            >
              Themes
            </a>
            <button 
              onClick={onViewProblems} 
              className="px-4 py-2 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
            >
              Problem Statements
            </button>
            <a 
              href="#timeline" 
              className="px-4 py-2 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
            >
              Timeline
            </a>
            <a 
              href="#guidelines" 
              className="px-4 py-2 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
            >
              Guidelines
            </a>
            <a 
              href="#resources" 
              className="px-4 py-2 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
            >
              Resources
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col gap-2">
                <a 
                  href="#home" 
                  className="px-4 py-2.5 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="#about" 
                  className="px-4 py-2.5 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#themes" 
                  className="px-4 py-2.5 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Themes
                </a>
                <button 
                  onClick={() => {
                    onViewProblems?.();
                    setMobileMenuOpen(false);
                  }} 
                  className="text-left px-4 py-2.5 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
                >
                  Problem Statements
                </button>
                <a 
                  href="#timeline" 
                  className="px-4 py-2.5 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Timeline
                </a>
                <a 
                  href="#guidelines" 
                  className="px-4 py-2.5 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Guidelines
                </a>
                <a 
                  href="#resources" 
                  className="px-4 py-2.5 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resources
                </a>
                <a 
                  href="#contact" 
                  className="px-4 py-2.5 text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 rounded-md transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <Button 
                  onClick={() => {
                    onRegisterClick?.();
                    setMobileMenuOpen(false);
                  }} 
                  className="bg-[#FF6B35] hover:bg-[#FF5722] text-white w-full mt-2 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  RH LOGIN
                </Button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
