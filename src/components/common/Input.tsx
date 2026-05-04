import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export function Input({ label, className = '', containerClassName = '', ...props }: InputProps) {
  return (
    <div className={containerClassName}>
      {label && <label className="block text-xs font-bold text-gray-500 mb-2">{label}</label>}
      <input 
        className={`w-full bg-gray-50 dark:bg-[#1E1E20] border border-gray-200 dark:border-[#3A3A3C] rounded-lg p-3 text-sm text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${className}`} 
        {...props} 
      />
    </div>
  );
}
