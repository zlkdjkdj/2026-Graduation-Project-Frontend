import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export function Input({ label, className = '', containerClassName = '', ...props }: InputProps) {
  return (
    <div className={`w-full space-y-2 ${containerClassName}`}>
      {label && <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{label}</label>}
      <input
        className={`w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all placeholder:text-gray-400 ${className}`}
        {...props}
      />
    </div>
  );
}
