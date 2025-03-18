import React, { useState } from 'react';
import { FunctionEditor } from '../../components';
import { Plus, AlertCircle } from 'lucide-react';
import { FunctionCard } from '../../components';
import { validateJson } from '../../utils/jsonUtils';
import { FunctionConfig } from '../../types/agents';
import { predefinedAgents } from '../../mocks/agents';

const defaultConfig = JSON.stringify(predefinedAgents[0], null, 2);
console.log(defaultConfig,'defaultConfig')
export const FunctionBuilder: React.FC = () => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [functionConfig, setFunctionConfig] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleAddFunction = () => {
    setIsEditing(false);
    setShowEditor(true);
    console.log(defaultConfig,'defaultConfig23')
  };

  const handleEditorOpen = () => {
    setIsEditing(true);
    setShowEditor(true);
  };

  const handleSave = (value: string): void => {
    const { isValid } = validateJson(value);
    if (isValid) {
      setFunctionConfig(value);
      setShowEditor(false);
      console.log('Function saved:', value);
    } else {
      console.error('Invalid JSON, cannot save:', value);
    }
  };

  const handleCancel = (): void => {
    setShowEditor(false);
  };

  // Parse function config with error handling
  const parsedConfig = (() => {
    if (!functionConfig) return null;
    const { isValid, error } = validateJson(functionConfig);
    if (!isValid) {
      console.error('Failed to parse functionConfig:', error);
      return null;
    }
    return JSON.parse(functionConfig) as FunctionConfig;
  })();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Function Builder</h1>
        <button
          className="flex items-center gap-2 bg-[#00a67d] hover:bg-[#008e6a] text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-lg"
          onClick={handleAddFunction}
        >
          <Plus className="w-5 h-5" />
          Add Function
        </button>
      </div>

      {functionConfig ? (
        <FunctionCard config={parsedConfig} rawConfig={functionConfig} onEdit={handleEditorOpen} />
      ) : (
        <div className="bg-[#2b2c32] rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center border border-gray-700 h-64">
          <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />
          <h2 className="text-xl font-medium text-gray-300 mb-2">No Function Configured</h2>
          <p className="text-gray-400 mb-6 max-w-md">
            You haven't created any functions yet. Click the "Add Function" button to get started.
          </p>
          <button
            className="flex items-center gap-2 bg-[#00a67d] hover:bg-[#008e6a] text-white px-4 py-2 rounded-md transition-colors duration-200"
            onClick={handleAddFunction}
          >
            <Plus className="w-5 h-5" />
            Add Function
          </button>
        </div>
      )}

      {showEditor && (
        <FunctionEditor
          initialValue={isEditing ? functionConfig : defaultConfig}
          onChange={(value) => console.log('Editor value changed:', value)}
          onSave={handleSave}
          onCancel={handleCancel}
          height="400px"
        />
      )}
    </div>
  );
};

export default FunctionBuilder;
