import React, { useState } from 'react';
import Button from '../Buttons/Button';
import Toast from '../Toast/Toast';
import CodeEditor from '../CodeEditor/CodeEditor';
import EditorToolbar from '../EditorToolbar/EditorToolbar';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import GenerateFunctionDialog from '../GenerateFunctionDialog/GenerateFunctionDialog';
import { useFunctionEditor } from '../../hooks/useFunctionEditor';

interface FunctionEditorProps {
  initialValue?: string;
  onChange?: (value: string, error?: string) => void;
  onSave?: (value: string) => void;
  onCancel?: () => void;
  height?: string;
}

const FunctionEditor: React.FC<FunctionEditorProps> = ({
  initialValue = '',
  onChange,
  onSave,
  onCancel,
  height = 'auto',
}) => {
  const {
    value,
    error,
    showToast,
    handleChange,
    handleExampleChange,
    handleSave,
    closeToast,
  } = useFunctionEditor({ initialValue, onChange }); // Fixed argument structure

  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  const handleGenerate = () => {
    setIsGenerateOpen(true);
  };

  const handleCreateFunction = (description: string) => {
    const newValue = JSON.stringify(
      {
        name: 'generate_function',
        description: description || 'Generates a function based on user specifications',
        strict: true,
        parameters: {
          type: 'object',
          required: ['function_description', 'function_name', 'parameters'],
          properties: {
            function_description: { type: 'string', description: 'A description of what the function is intended to accomplish' },
            function_name: { type: 'string', description: 'The name of the function to be generated' },
            parameters: { type: 'array', description: 'A list of parameters that the function will accept', items: { type: 'object', properties: { name: { type: 'string' } } } },
          },
        },
      },
      null,
      2
    );
    handleChange(newValue);
    setIsGenerateOpen(false);
  };

  const handleSaveClick = () => {
    if (onSave) {
      handleSave(onSave);
    }
  };

  return (
    <dialog open className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-0 m-0 border-none w-full h-full">
      {showToast && (
        <Toast
          message={error ? `Invalid JSON: ${error}` : 'All clear ✅'}
          onClose={closeToast}
        />
      )}
      <div className="w-full max-w-2xl bg-[#2b2c32] text-white rounded-lg shadow-lg flex flex-col overflow-hidden" style={{ maxHeight: 'calc(95vh - 40px)' }}>
        <div className="flex-1 overflow-y-auto p-3">
          <h2 className="text-lg font-medium mb-2">Add function</h2>
          <p className="text-xs text-gray-400 mb-4">
            The model will intelligently decide to call functions based on input it receives from the user.{' '}
            <a href="#" className="text-[#00a67d] hover:underline">
              Learn more.
            </a>
          </p>
          <EditorToolbar onGenerate={handleGenerate} onExampleChange={handleExampleChange} />
          <div className="relative">
            <CodeEditor
              value={value}
              onChange={handleChange}
              error={error}
              height={height}
              className="border-b-0 rounded-b-none"
            />
          </div>
          <ErrorDisplay error={error} showInfo />
        </div>
        <div className="flex justify-end gap-2 p-4 bg-[#2b2c32] border-t border-gray-700">
          <Button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-600 text-white border-0 rounded-md hover:bg-gray-500"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveClick}
            className="px-3 py-1 text-white border-0 rounded-md bg-[#00a67d] dark:bg-[#00a67d] opacity-100 hover:bg-[#00a67d]"
          >
            Save
          </Button>
        </div>
      </div>
      <GenerateFunctionDialog
        isOpen={isGenerateOpen}
        onClose={() => setIsGenerateOpen(false)}
        onGenerate={handleCreateFunction}
      />
    </dialog>
  );
};

export default FunctionEditor;