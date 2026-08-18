import React from 'react';

const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'glass'
  size = 'md', // 'sm', 'md', 'lg'
  icon: Icon,
  iconPosition = 'right',
  onClick,
  href,
  className = '',
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:brightness-110 border border-cyan-400/30',
    secondary: 'bg-slate-800/80 hover:bg-slate-700/90 text-white border border-slate-700/60 shadow-lg hover:border-slate-500',
    outline: 'border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white bg-cyan-950/20 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
    glass: 'bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 hover:border-white/40 shadow-xl',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`group ${combinedClasses}`} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`group ${combinedClasses}`} {...props}>
      {content}
    </button>
  );
};

export default Button;
