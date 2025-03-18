import React from 'react';
import { Code } from 'lucide-react';
import CodeEditor from '../CodeEditor/CodeEditor'; // Import CodeEditor
import { FunctionConfig } from '../../types/agents';

interface FunctionCardProps {
  config: FunctionConfig | null;
  rawConfig: string;
  onEdit: () => void;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ config, rawConfig, onEdit }) => {
  const handleChange = () => {}; // Dummy onChange since readOnly is true

  return (
    <div className="bg-[#2b2c32] rounded-lg shadow-xl overflow-hidden">
      <div className="p-2 bg-[#252530] border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code className="w-5 h-5 text-[#00a67d]" />
          <h2 className="text-lg font-medium text-white">{config?.name || 'Function Configuration'}</h2>
        </div>
        <button
          onClick={onEdit}
          className="text-sm text-gray-300 hover:text-white px-3 py-1 rounded border border-gray-600 hover:border-gray-400 transition-colors"
        >
          Edit
        </button>
      </div>
      <div className="p-4">
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Raw Configuration</h3>
          <CodeEditor
            value={rawConfig}
            onChange={handleChange}
            error={null} // No error since it's read-only
            height="100%"
            readOnly={true} // Set to read-only
            className="border-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionCard;