// useFunctionEditor.ts
import { useState, useCallback } from 'react';

export const useFunctionEditor = (initialValue: string, onChange?: (value: string) => void) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

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

    const handleChange = useCallback((newValue: string) => {
        setValue(newValue);
        validateJson(newValue);
        if (onChange) onChange(newValue);
    }, [onChange, validateJson]);

    const handleExampleChange = useCallback((selectedValue: string) => {
        setValue(selectedValue);
        validateJson(selectedValue);
        if (onChange) onChange(selectedValue);
    }, [onChange, validateJson]);

    const handleSave = useCallback((onSave?: (value: string) => void) => {
        if (validateJson(value) && onSave) {
            onSave(value);
        } else {
            setShowToast(true);
        }
    }, [value, validateJson]);

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
        closeToast
    };
};