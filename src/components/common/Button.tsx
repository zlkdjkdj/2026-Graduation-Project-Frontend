import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyle = "rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2";
  
  let variantStyle = "";
  switch(variant) {
    case 'primary':
      variantStyle = "bg-blue-600 hover:bg-blue-700 text-white shadow-md";
      break;
    case 'danger':
      variantStyle = "bg-red-500 hover:bg-red-600 text-white shadow-md";
      break;
    case 'outline':
      variantStyle = "bg-white dark:bg-transparent border border-gray-200 dark:border-[#3A3A3C] hover:bg-gray-50 dark:hover:bg-[#2A2A2C] text-gray-700 dark:text-gray-300";
      break;
    case 'secondary':
      variantStyle = "bg-gray-100 dark:bg-[#2A2A2C] hover:bg-gray-200 dark:hover:bg-[#343436] text-gray-600 dark:text-white border border-transparent dark:border-[#3A3A3C]";
      break;
  }

  return (
    <button className={`${baseStyle} ${variantStyle} py-3.5 px-4 ${className}`} {...props}>
      {children}
    </button>
  );
}
