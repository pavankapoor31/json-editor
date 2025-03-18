import React, { useState } from 'react';
import Button from '../Buttons/Button';
import Toast from '../Toast/Toast';
import CodeEditor from '../CodeEditor/CodeEditor';
import EditorToolbar from '../EditorToolbar/EditorToolbar';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import GenerateFunctionDialog from '../GenerateFunctionDialog/GenerateFunctionDialog';
import { useFunctionEditor } from '../../hooks/useFunctionEditor';
import { generateJSON } from '../../api/jsonApis';

interface FunctionEditorProps {
    initialValue?: string;
    onChange?: (value: string, error?: string | null | undefined) => void;
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
    const [loading, setLoading] = useState(false);

    const handleGenerate = () => {
        setIsGenerateOpen(true);
    };

    const handleCreateFunction = (description: string) => {
        setIsGenerateOpen(false);
        setLoading(true);
        generateJSON(description).then((response: any) => {
            const newValue = JSON.stringify(response.data.agent_config, null, 2);
            handleChange(newValue);
            setIsGenerateOpen(false);
        }).catch((error) => {
            console.error('Error generating JSON:', error);
        }).finally(() => {
            setLoading(false)
        });
    };

    const handleSaveClick = () => {
        if (onSave) {
            handleSave(onSave);
        }
    };

    return (
        <dialog open className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-0 m-0 border-none w-full h-full`}>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#00a67d]"></div>
                </div>
            )}
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