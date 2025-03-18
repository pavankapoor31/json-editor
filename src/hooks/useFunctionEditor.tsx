import { useState, useCallback } from 'react';
import { validateJson } from '../utils/jsonUtils';

interface UseFunctionEditorProps {
  initialValue: string;
  onChange?: (value: string, error?: string|null) => void; // Updated to match FunctionEditorProps
}

export const useFunctionEditor = ({ initialValue, onChange }: UseFunctionEditorProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      const { isValid, error: validationError } = validateJson(newValue);
      setError(validationError);
      if (onChange) onChange(newValue, validationError); // Pass error if it exists
    },
    [onChange]
  );

  const handleExampleChange = useCallback(
    (selectedValue: string) => {
      setValue(selectedValue);
      const { isValid, error: validationError } = validateJson(selectedValue);
      setError(validationError);
      if (onChange) onChange(selectedValue, validationError);
    },
    [onChange]
  );

  const handleSave = useCallback(
    (onSave?: (value: string) => void) => {
      const { isValid, error: validationError } = validateJson(value);
      if (isValid && onSave) {
        onSave(value);
        setShowToast(false);
      } else {
        setError(validationError);
        setShowToast(true);
      }
    },
    [value]
  );

  const closeToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return {
    value,
    error,
    showToast,
    handleChange,
    handleExampleChange,
    handleSave,
    closeToast,
  };
};