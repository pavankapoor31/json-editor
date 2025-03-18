// components/FunctionBuilder/FunctionBuilder.tsx
import React, { useState } from 'react';
import { FunctionEditor } from '../../components';
import { Plus, Code, AlertCircle } from 'lucide-react';

export const FunctionBuilder: React.FC = () => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [functionConfig, setFunctionConfig] = useState<string>('');

  const initialValue: string = JSON.stringify({
    name: "example_function",
    description: "This is an example function",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Name parameter"
        }
      }
    }
  }, null, 2);

  const handleEditorChange = (value: string): void => {
    console.log("Editor value changed:", value);
  };

  const handleSave = (value: string): void => {
    setFunctionConfig(value);
    setShowEditor(false);
    console.log("Function saved:", value);
  };

  const handleCancel = (): void => {
    setShowEditor(false);
  };

  // Parse function config to display formatted information
  const parsedConfig = functionConfig ? JSON.parse(functionConfig) : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#1e1e2e] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Function Builder</h1>
        <button 
          className="flex items-center gap-2 bg-[#00a67d] hover:bg-[#008e6a] text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-lg"
          onClick={() => setShowEditor(true)}
        >
          <Plus className="w-5 h-5" />
          Add Function
        </button>
      </div>

      {functionConfig ? (
        <div className="bg-[#2b2c32] rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 bg-[#252530] border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-[#00a67d]" />
              <h2 className="text-lg font-medium text-white">{parsedConfig?.name || "Function Configuration"}</h2>
            </div>
            <button 
              onClick={() => setShowEditor(true)}
              className="text-sm text-gray-300 hover:text-white px-3 py-1 rounded border border-gray-600 hover:border-gray-400 transition-colors"
            >
              Edit
            </button>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
              <p className="text-white">{parsedConfig?.description}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Parameters</h3>
              <div className="bg-[#1e1e1e] p-3 rounded border border-gray-700 overflow-x-auto">
                <pre className="text-[#d4d4d4] text-sm whitespace-pre-wrap">
                  {JSON.stringify(parsedConfig?.parameters, null, 2)}
                </pre>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Raw Configuration</h3>
              <div className="bg-[#1e1e1e] p-3 rounded border border-gray-700 overflow-x-auto">
                <pre className="text-[#d4d4d4] text-sm whitespace-pre">{functionConfig}</pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#2b2c32] rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center border border-gray-700 h-64">
          <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />
          <h2 className="text-xl font-medium text-gray-300 mb-2">No Function Configured</h2>
          <p className="text-gray-400 mb-6 max-w-md">
            You haven't created any functions yet. Click the "Add Function" button to get started.
          </p>
          <button 
            className="flex items-center gap-2 bg-[#00a67d] hover:bg-[#008e6a] text-white px-4 py-2 rounded-md transition-colors duration-200"
            onClick={() => setShowEditor(true)}
          >
            <Plus className="w-5 h-5" />
            Add Function
          </button>
        </div>
      )}

      {showEditor && (
        <FunctionEditor
          initialValue={initialValue}
          onChange={handleEditorChange}
          onSave={handleSave}
          onCancel={handleCancel}
          height="400px"
        />
      )}
    </div>
  );
};

export default FunctionBuilder;