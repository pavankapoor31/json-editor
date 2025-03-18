// EditorToolbar.tsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import { predefinedAgents } from '../../mocks/agents';

interface EditorToolbarProps {
    onGenerate: () => void;
    onExampleChange: (example: string) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onGenerate, onExampleChange }) => {
    const handleExampleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            onExampleChange(selectedValue);
        }
    };

    return (
        <div className="flex justify-between mb-2 items-center">
            <h3 className="text-sm font-medium">Definition</h3>
            <div className="flex gap-2">
                <button
                    onClick={onGenerate}
                    className="flex items-center gap-1 px-2 py-1 text-white text-xs rounded-md hover:bg-gray-600"
                >
                    <Sparkles className="w-4 h-4" />
                    Generate
                </button>
                <select
                    onChange={handleExampleChange}
                    className="px-1 py-1 bg-transparent text-white rounded-md text-xs w-[5.1rem]"
                    value=""
                >
                    <option value="">Examples</option>
                    {predefinedAgents.map((func, index) => (
                        <option key={index} value={JSON.stringify(func.agent_config, null, 2)}>
                            {func.agent_title}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default EditorToolbar;