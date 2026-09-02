import { Box, Stack } from '@mui/material';
import { ToolLayout } from '../../../components/common/ToolLayout';
import { EditorPanel } from '../../../components/common/EditorPanel';
import { CodeEditor } from '../../../components/common/CodeEditor';
import { useSqlFormatter } from '../hooks/useSqlFormatter';
import { SqlToolbar } from './SqlToolbar';
import { SqlErrorMessage } from './SqlErrorMessage';

export function SqlFormatterPage() {
  const {
    input,
    setInput,
    output,
    indent,
    setIndent,
    indentOptions,
    keywordCase,
    setKeywordCase,
    validation,
    format,
    clear,
    hasContent,
    hasOutput,
  } = useSqlFormatter();

  return (
    <ToolLayout
      title="SQL Formatter"
      description="Format T-SQL / SQL Server queries with readable indentation, directly in your browser."
      actions={
        <SqlToolbar
          indent={indent}
          indentOptions={indentOptions}
          onIndentChange={setIndent}
          keywordCase={keywordCase}
          onKeywordCaseChange={setKeywordCase}
          onFormat={format}
          onClear={clear}
          onCopyOutput={() => output}
          validation={validation}
          hasContent={hasContent}
          hasOutput={hasOutput}
        />
      }
    >
      <Stack spacing={2} sx={{ height: '100%' }}>
        <SqlErrorMessage validation={validation} hasContent={hasContent} />

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
              language="sql"
              placeholder="Paste a SQL query here…"
              aria-label="SQL input"
              minHeight="360px"
            />
          </EditorPanel>
          <EditorPanel title="Output">
            <CodeEditor
              value={output}
              language="sql"
              readOnly
              placeholder="Formatted SQL will appear here…"
              aria-label="SQL output"
              minHeight="360px"
            />
          </EditorPanel>
        </Box>
      </Stack>
    </ToolLayout>
  );
}
