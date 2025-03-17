import React from 'react'
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const ThemeToggleButton: React.FC<{ theme: string; setTheme: (theme: 'light' | 'dark') => void }> = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="relative w-12 h-6 bg-gray-300 dark:bg-gray-800 rounded-full flex items-center transition-all duration-300 shadow-md"
        >
            <motion.div
                className="w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow-md flex justify-center items-center absolute"
                animate={{ x: theme === 'dark' ? 22 : 2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {theme === 'dark' ? <Moon className="w-3 h-3 text-gray-800" /> : <Sun className="w-3 h-3 text-yellow-500" />}
            </motion.div>
        </motion.button>
    );
};
export default ThemeToggleButton