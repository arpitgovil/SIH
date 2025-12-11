import { Facebook, Instagram, Twitter, Linkedin, ArrowUp, ChevronUp } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [isScrollTopHovered, setIsScrollTopHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Follow Us Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-[14px] mb-4 tracking-wide">FOLLOW US</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-600 group-hover:text-[#1877F2] transition-colors" fill="currentColor" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-600 group-hover:text-[#E4405F] transition-colors" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-600 group-hover:text-[#1DA1F2] transition-colors" fill="currentColor" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-[#0A66C2] transition-colors" fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-[14px] mb-4 tracking-wide">CONTACT US</h3>
            <div className="flex flex-col items-center gap-2 text-[13px]">
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+919958583293" className="hover:text-orange-400 transition-colors">
                  +91 9958583293
                </a>
                <span>,</span>
                <a href="tel:+919958583235" className="hover:text-orange-400 transition-colors">
                  +91 9958583235
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:sih@aicte-india.org" className="hover:text-orange-400 transition-colors">
                  sih@aicte-india.org
                </a>
                <span>,</span>
                <a href="mailto:hackathon@aicte-india.org" className="hover:text-orange-400 transition-colors">
                  hackathon@aicte-india.org
                </a>
              </div>
            </div>
          </div>

          {/* Scroll to Top Buttons */}
          <div className="flex gap-3">
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setIsScrollTopHovered(true)}
              onMouseLeave={() => setIsScrollTopHovered(false)}
              className="w-10 h-10 bg-[#6B8DD6] hover:bg-[#5a7bc5] rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-gray-700">
          <p className="text-[12px] text-gray-400">
            © 2016-26 Regional Hackathon. All rights reserved.
            <span className="ml-2 text-xs text-gray-700 opacity-0 hover:opacity-100 transition-opacity cursor-help" title="Press Ctrl+Shift+A three times to access admin panel">
              [Dev Mode]
            </span>
          </p>
        </div>
      </div>

      {/* India Flag */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>
    </footer>
  );
}
