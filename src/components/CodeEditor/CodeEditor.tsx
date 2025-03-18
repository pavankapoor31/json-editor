import React, { useCallback } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { linter, Diagnostic } from '@codemirror/lint';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    error: string | null;
    height?: string;
    formatOnBlur?: boolean;
    formatOnSave?: boolean;
    className?:string
}

const CodeEditor: React.FC<CodeEditorProps> = ({
    value,
    onChange,
    error,
    height = 'auto',
    formatOnBlur = true,
    formatOnSave = true,
    className=''
}) => {
    const customTheme = EditorView.theme({
        '&': {
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
        },
        '.cm-content': {
            caretColor: '#fff',
        },
        '.cm-property': {
            color: '#df3079',
        },
        '.cm-string': {
            color: '#00a67d',
        },
    });

    const lintTheme = EditorView.baseTheme({
        '.cm-diagnosticText': {
            display: 'none',
        },
        '.cm-diagnostic': {
            paddingLeft: 0,
        },
        '.cm-diagnostic-error': {
            borderLeft: 'none',
        },
        '.cm-lintRange-error': {
            backgroundImage: 'none',
            textDecoration: 'wavy underline #ff0000',
            textDecorationThickness: '1px',
        },
    });

    const findErrorPosition = (jsonString: string, errorMessage: string): { from: number, to: number } => {
        let from = 0;
        let to = jsonString.length;

        const positionMatch = errorMessage.match(/at position (\d+)/);
        if (positionMatch && positionMatch[1]) {
            const errorPos = parseInt(positionMatch[1], 10);
            from = Math.max(0, errorPos - 1);
            const searchEnd = Math.min(from + 20, jsonString.length);
            for (let i = from; i < searchEnd; i++) {
                const char = jsonString[i];
                if ([',', '}', ']', '{', '['].includes(char)) {
                    to = i + 1;
                    break;
                }
                to = i + 1;
            }
        } else if (errorMessage.includes('Expected')) {
            const quoted = errorMessage.match(/'([^']+)'/);
            if (quoted && quoted[1]) {
                const searchTerm = quoted[1];
                const idx = jsonString.lastIndexOf(searchTerm, jsonString.length);
                if (idx >= 0) {
                    from = idx;
                    to = idx + searchTerm.length;
                }
            }
        }

        return { from, to };
    };

    const jsonLinter = linter((view) => {
        const diagnostics: Diagnostic[] = [];
        const content = view.state.doc.toString();

        try {
            JSON.parse(content);
        } catch (e) {
            if (e instanceof SyntaxError) {
                const { from, to } = findErrorPosition(content, e.message);
                diagnostics.push({
                    from,
                    to,
                    severity: 'error',
                    message: e.message,
                });
            }
        }
        return diagnostics;
    });

    const formatJSON = useCallback((jsonString: string): string => {
        try {
            const parsedJSON = JSON.parse(jsonString);
            return JSON.stringify(parsedJSON, null, 2);
        } catch {
            return jsonString;
        }
    }, []);

    const handleBlur = useCallback(() => {
        if (formatOnBlur && value.trim()) {
            const formattedJSON = formatJSON(value);
            if (formattedJSON !== value) {
                onChange(formattedJSON);
            }
        }
    }, [formatOnBlur, value, formatJSON, onChange]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (formatOnSave && (event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            const formattedJSON = formatJSON(value);
            if (formattedJSON !== value) {
                onChange(formattedJSON);
            }
        }
    }, [formatOnSave, value, formatJSON, onChange]);

    return (
        <div
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full"
            role="textbox"
            aria-label="JSON Code Editor"
        >
            <CodeMirror
                value={value}
                extensions={[json(), customTheme, lintTheme, jsonLinter]}
                onChange={onChange}
                theme="dark"
                className={`text-sm w-full border border-gray-700 rounded-md  overflow-auto ${className} ${error ? 'border-red-700' : 'border-green-500'}`}
                height={height}
            />
        </div>
    );
};

export default CodeEditor;