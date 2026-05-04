import type { ReactNode } from 'react';

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}

export function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
        active 
          ? 'bg-gray-900 text-white dark:bg-[#1E1E1E] dark:border dark:border-[#2A2A2A] shadow-md' 
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-[#1A1A1A]'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
