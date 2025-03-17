import React, { useState, useCallback, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Save, FileCode, AlertCircle } from 'lucide-react';
import { predefinedAgents } from '../static/agents';
import Button from './Buttons';
import ThemeToggleButton from './Buttons/ToggleButton';

interface JsonEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  height?: string;
}


const JsonEditor: React.FC<JsonEditorProps> = ({ initialValue = '', onChange, height = 'calc(100% - 25rem)' }) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'dark');

  useEffect(() => {
    const savedJson = localStorage.getItem('json-editor-content');
    if (savedJson) setValue(savedJson);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const validateJson = useCallback((jsonString: string): boolean => {
    try {
      JSON.parse(jsonString);
      setError(null);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return false;
    }
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);
      validateJson(value);
      setIsSaved(false);
      if (onChange) onChange(value);
    },
    [onChange, validateJson]
  );

  const formatJson = useCallback(() => {
    try {
      const formatted = JSON.stringify(JSON.parse(value), null, 2);
      setValue(formatted);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [value]);

  const saveJson = useCallback(() => {
    if (validateJson(value)) {
      localStorage.setItem('json-editor-content', value);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  }, [value, validateJson]);

  const handleDefaultAgentChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      if (selectedValue) {
        const selectedAgent = predefinedAgents.find(agent => JSON.stringify(agent) === selectedValue);
        if (selectedAgent) {
          handleChange(JSON.stringify(selectedAgent, null, 2));
        }
      }
    },
    [handleChange]
  );

  return (
    <div className="w-full h-full max-w-5xl mx-auto p-6 space-y-4 bg-gray-100 dark:bg-[#1E1E1E] text-gray-900 dark:text-white rounded-md shadow-lg border border-gray-300 dark:border-gray-700 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <FileCode className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          JSON Editor
        </h2>
        <div className="flex items-center gap-3">
          <ThemeToggleButton theme={theme} setTheme={setTheme} />
          <select
            onChange={handleDefaultAgentChange}
            className="px-3 py-1.5 bg-gray-200 dark:bg-[#252526] border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-300 rounded-md outline-none text-sm"
          >
            <option value="">Examples</option>
            {predefinedAgents.map(
              (agent, index) =>
                agent.agent_title && (
                  <option key={index} value={JSON.stringify(agent)}>
                    {agent.agent_title}
                  </option>
                )
            )}
          </select>
          <Button onClick={formatJson}>Format</Button>
          <Button onClick={saveJson} disabled={!!error} className='bg-blue-700 dark:bg-blue-700 text-bold text-white'>
            <Save className="w-4 h-4" />
            {isSaved ? "Saved!" : "Save"}
          </Button>
        </div>
      </div>

      <div className={`rounded-md overflow-hidden border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} flex-grow`}>
        <CodeMirror
          value={value}
          extensions={[json()]}
          onChange={handleChange}
          theme={theme}
          className="text-sm w-full h-full"
          height={height}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-100 dark:bg-[#2D1B1B] p-3 rounded-md text-sm">
          <AlertCircle className="w-5 h-5" />
          <div>
            <strong>Invalid JSON:</strong> {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonEditor;
