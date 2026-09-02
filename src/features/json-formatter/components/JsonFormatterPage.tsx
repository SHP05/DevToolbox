import { Box, Stack } from '@mui/material';
import { ToolLayout } from '../../../components/common/ToolLayout';
import { EditorPanel } from '../../../components/common/EditorPanel';
import { CodeEditor } from '../../../components/common/CodeEditor';
import { useJsonFormatter } from '../hooks/useJsonFormatter';
import { JsonToolbar } from './JsonToolbar';
import { ValidationMessage } from './ValidationMessage';

export function JsonFormatterPage() {
  const {
    input,
    setInput,
    output,
    indent,
    setIndent,
    indentOptions,
    validation,
    format,
    minify,
    clear,
    hasContent,
    hasOutput,
  } = useJsonFormatter();

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, minify and validate JSON directly in your browser."
      actions={
        <JsonToolbar
          indent={indent}
          indentOptions={indentOptions}
          onIndentChange={setIndent}
          onFormat={format}
          onMinify={minify}
          onClear={clear}
          onCopyOutput={() => output}
          validation={validation}
          hasContent={hasContent}
          hasOutput={hasOutput}
        />
      }
    >
      <Stack spacing={2} sx={{ height: '100%' }}>
        <ValidationMessage validation={validation} hasContent={hasContent} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
            flex: 1,
            minHeight: 0,
          }}
        >
          <EditorPanel title="Input">
            <CodeEditor
              value={input}
              onChange={setInput}
              language="json"
              placeholder="Paste JSON here…"
              aria-label="JSON input"
              minHeight="360px"
            />
          </EditorPanel>
          <EditorPanel title="Output">
            <CodeEditor
              value={output}
              language="json"
              readOnly
              placeholder="Formatted or minified JSON will appear here…"
              aria-label="JSON output"
              minHeight="360px"
            />
          </EditorPanel>
        </Box>
      </Stack>
    </ToolLayout>
  );
}
