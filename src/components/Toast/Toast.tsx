// Toast.tsx
import React, { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 max-w-md">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{message}</span>
            <button onClick={onClose} className="ml-2">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;