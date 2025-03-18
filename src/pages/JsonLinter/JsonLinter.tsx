import React, { useState } from 'react';
import { CodeEditor } from '../../components';
import { ErrorDisplay } from '../../components';

const JsonLinter: React.FC = () => {
  const [value, setValue] = useState<string>('{ }');
  const [error, setError] = useState<string | null>(null);

  const validateJson = (jsonString: string) => {
    try {
      JSON.parse(jsonString);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    validateJson(newValue);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">JSON Linter</h1>
      <p className="text-sm text-gray-400 mb-4">
        Enter your JSON below to validate and lint it.
      </p>
      <CodeEditor
        value={value}
        onChange={handleChange}
        error={error}
        height="auto"
        className='min-h-[400px]'
      />
      {error && <ErrorDisplay error={error} showInfo={false}/>}
    </div>
  );
};

export default JsonLinter;