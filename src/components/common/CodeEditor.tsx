import CodeMirror from '@uiw/react-codemirror';
import type { Extension } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { sql } from '@codemirror/lang-sql';
import { EditorView } from '@codemirror/view';
import { useThemeMode } from '../../app/ThemeModeContext';

export type CodeEditorLanguage = 'json' | 'sql' | 'text';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: CodeEditorLanguage;
  readOnly?: boolean;
  placeholder?: string;
  minHeight?: string;
  'aria-label'?: string;
}

function getLanguageExtension(language: CodeEditorLanguage): Extension[] {
  switch (language) {
    case 'json':
      return [json()];
    case 'sql':
      return [sql()];
    default:
      return [];
  }
}

export function CodeEditor({
  value,
  onChange,
  language = 'text',
  readOnly = false,
  placeholder,
  minHeight = '260px',
  'aria-label': ariaLabel,
}: CodeEditorProps) {
  const { mode } = useThemeMode();

  return (
    <div role="group" aria-label={ariaLabel} style={{ width: '100%' }}>
      <CodeMirror
        value={value}
        onChange={onChange}
        theme={mode === 'dark' ? 'dark' : 'light'}
        placeholder={placeholder}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          foldGutter: language !== 'text',
          highlightActiveLine: !readOnly,
        }}
        extensions={[...getLanguageExtension(language), EditorView.lineWrapping]}
        minHeight={minHeight}
        style={{
          fontSize: 13,
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: mode === 'dark' ? '#2a2e37' : '#dfe3ea',
        }}
      />
    </div>
  );
}
