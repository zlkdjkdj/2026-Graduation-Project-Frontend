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
      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[0.85rem] font-medium transition-colors duration-200 whitespace-nowrap ${
        active 
          ? 'bg-gray-100 text-gray-900 dark:bg-[#1a1a1a] dark:text-white' 
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-[#111]'
      }`}
    >
      <span className={`${active ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{icon}</span>
      {label}
    </button>
  );
}
