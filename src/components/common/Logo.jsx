import React from 'react';
import logoImg from '../../assets/images/as_logo_icon.png';

const Logo = ({ variant = 'full', size = 'medium', className = '' }) => {
  // Enhanced height sizing for maximum clarity & visibility
  const sizeMap = {
    small: 'h-9 sm:h-11',
    medium: 'h-12 sm:h-14 lg:h-16',
    large: 'h-16 sm:h-20',
    xlarge: 'h-24 sm:h-36',
  };

  const heightClass = sizeMap[size] || sizeMap.medium;

  return (
    <div className={`inline-flex items-center select-none group ${className}`}>
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {/* Ambient glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-cyan-400/30 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <img
          src={logoImg}
          alt="Admire Softech Logo"
          className={`relative z-10 ${heightClass} w-auto object-contain filter brightness-110 contrast-110 drop-shadow-[0_4px_25px_rgba(6,182,212,0.6)]`}
        />
      </div>
    </div>
  );
};

export default Logo;
