export function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Circle - Gradient Background */}
      <circle cx="100" cy="100" r="95" fill="url(#gradient1)" />
      
      {/* Inner Glow */}
      <circle cx="100" cy="100" r="85" fill="url(#gradient2)" opacity="0.8" />
      
      {/* Brain/Innovation Symbol */}
      <g transform="translate(60, 50)">
        {/* Left Brain Hemisphere */}
        <path
          d="M20 10 C10 10, 5 15, 5 25 C5 35, 10 45, 20 50 L20 10Z"
          fill="#ffffff"
          opacity="0.9"
        />
        {/* Right Brain Hemisphere */}
        <path
          d="M20 10 C30 10, 35 15, 35 25 C35 35, 30 45, 20 50 L20 10Z"
          fill="#ffffff"
          opacity="0.9"
        />
        {/* Brain Details */}
        <path
          d="M15 20 Q12 25, 15 30"
          stroke="#1e40af"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M25 20 Q28 25, 25 30"
          stroke="#1e40af"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      
      {/* Circuit Pattern - Top Right */}
      <g opacity="0.7">
        <circle cx="140" cy="60" r="4" fill="#f97316" />
        <line x1="140" y1="60" x2="160" y2="60" stroke="#f97316" strokeWidth="2" />
        <circle cx="160" cy="60" r="4" fill="#f97316" />
        <line x1="160" y1="60" x2="160" y2="80" stroke="#f97316" strokeWidth="2" />
        <circle cx="160" cy="80" r="4" fill="#f97316" />
      </g>
      
      {/* Circuit Pattern - Bottom Left */}
      <g opacity="0.7">
        <circle cx="40" cy="140" r="4" fill="#16a34a" />
        <line x1="40" y1="140" x2="60" y2="140" stroke="#16a34a" strokeWidth="2" />
        <circle cx="60" cy="140" r="4" fill="#16a34a" />
        <line x1="60" y1="140" x2="60" y2="160" stroke="#16a34a" strokeWidth="2" />
        <circle cx="60" cy="160" r="4" fill="#16a34a" />
      </g>
      
      {/* Lightbulb Filament */}
      <g transform="translate(85, 85)">
        <path
          d="M15 0 L15 -10 M10 -5 L20 -5"
          stroke="#fbbf24"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="15" cy="0" r="3" fill="#fbbf24" />
      </g>
      
      {/* Tech Nodes - Orbital */}
      <circle cx="100" cy="40" r="5" fill="#ffffff" opacity="0.8" />
      <circle cx="160" cy="100" r="5" fill="#ffffff" opacity="0.8" />
      <circle cx="100" cy="160" r="5" fill="#ffffff" opacity="0.8" />
      <circle cx="40" cy="100" r="5" fill="#ffffff" opacity="0.8" />
      
      {/* Connecting Lines - Orbital */}
      <circle cx="100" cy="100" r="60" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.3" strokeDasharray="5,5" />
      
      {/* Center Innovation Spark */}
      <g transform="translate(100, 100)">
        <path
          d="M0,-15 L3,-5 L10,-7 L5,0 L12,5 L3,3 L0,15 L-3,5 L-10,7 L-5,0 L-12,-5 L-3,-3 Z"
          fill="#fbbf24"
          opacity="0.9"
        />
      </g>
      
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.1" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function LogoWithText({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo className="w-16 h-16" />
      <div>
        <h1 className="text-blue-900 leading-tight">Smart India</h1>
        <h1 className="text-blue-900 leading-tight">Hackathon</h1>
        <p className="text-xs text-gray-600">2024</p>
      </div>
    </div>
  );
}
