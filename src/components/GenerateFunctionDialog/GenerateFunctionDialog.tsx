// GenerateFunctionDialog.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../Buttons/Button';

interface GenerateFunctionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (description: string) => void;
}

const GenerateFunctionDialog: React.FC<GenerateFunctionDialogProps> = ({ isOpen, onClose, onGenerate }) => {
    const [description, setDescription] = useState('');

    const handleCreate = () => {
        onGenerate(description);
        setDescription('');
    };

    if (!isOpen) return null;

    return (
        <dialog open className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-0 m-0 border-none">
            <div className="w-full max-w-lg bg-[#2b2c32] text-white rounded-lg shadow-lg p-6 flex flex-col">
                <h2 className="text-lg font-medium mb-2">Generate Function</h2>
                <p className="text-sm text-gray-400 mb-4">
                    Describe what your function does (or paste your code), and we'll generate a definition.
                </p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 bg-[#252526] border border-gray-700 rounded-md text-white mb-4"
                    rows={4}
                    placeholder="Enter function description..."
                />
                <div className="flex justify-end gap-2">
                    <Button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create
                    </Button>
                </div>
            </div>
        </dialog>
    );
};

export default GenerateFunctionDialog;