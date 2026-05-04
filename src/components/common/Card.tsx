import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`studio-card ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', icon }: { children: ReactNode, className?: string, icon?: ReactNode }) {
  return (
    <h2 className={`text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3 tracking-tight ${className}`}>
      {icon && <span className="p-2 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl text-gray-600 dark:text-gray-400">{icon}</span>}
      {children}
    </h2>
  );
}
