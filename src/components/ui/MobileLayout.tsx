'use client';

import React, { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MobileLayout({ children, className = '' }: MobileLayoutProps) {
  return (
    <div className={`mobile-container ${className}`}>
      {children}
    </div>
  );
}

export function MobileCard({ 
  children, 
  className = '', 
  onClick 
}: MobileLayoutProps & { onClick?: () => void }) {
  return (
    <div 
      className={`mobile-card w-full cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-95 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function MobileButton({ 
  children, 
  onClick, 
  variant = 'default',
  size = 'sm' | 'md' | 'lg' | 'xl',
  className = '',
  disabled = false
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
}) {
  const baseClasses = 'mobile-button';
  const sizeClasses = {
    sm: 'h-10 text-sm',
    md: 'h-12 text-sm',
    lg: 'h-14 text-base',
    xl: 'h-16 text-lg'
  };
  const variantClasses = {
    default: '',
    outline: 'outline',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
