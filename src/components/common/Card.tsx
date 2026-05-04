import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-6 shadow-sm dark:shadow-lg shrink-0 transition-colors ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', icon }: { children: ReactNode, className?: string, icon?: ReactNode }) {
  return (
    <h2 className={`text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2 ${className}`}>
      {icon && icon}
      {children}
    </h2>
  );
}
