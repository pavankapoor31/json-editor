// ErrorDisplay.tsx
import React from 'react';
import { AlertCircle, Info } from 'lucide-react';

interface ErrorDisplayProps {
    error: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
    return (
        <>
            <div className={`flex items-center gap-2 mb-4 bg-[#202123] border border-gray-700 border-t-0 rounded-md rounded-t-none text-xs px-4 py-3 ${error ? 'border-red-500' : 'border-green-700'}`}>
                Add <Info className='w-3 h-3 text-xs' /> <code className="text-white bg-black">"strict": true</code> to ensure the model's response always follows this schema.
            </div>
            {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-100 dark:bg-[#2D1B1B] p-3 rounded-md text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <div>
                        <strong>Invalid JSON:</strong> {error}
                    </div>
                </div>
            )}
        </>
    );
};

export default ErrorDisplay;