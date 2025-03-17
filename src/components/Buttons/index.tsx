import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = "", disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-md text-sm transition-all flex items-center gap-2 ${
        disabled
          ? "bg-gray-400 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
          : "bg-gray-300 dark:bg-[#333] border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-[#444]"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
