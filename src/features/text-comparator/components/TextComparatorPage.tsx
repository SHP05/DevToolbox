import { Box, Stack } from '@mui/material';
import { ToolLayout } from '../../../components/common/ToolLayout';
import { EditorPanel } from '../../../components/common/EditorPanel';
import { CodeEditor } from '../../../components/common/CodeEditor';
import { useTextComparator } from '../hooks/useTextComparator';
import { DiffToolbar } from './DiffToolbar';
import { DiffView } from './DiffView';

export function TextComparatorPage() {
  const {
    original,
    setOriginal,
    changed,
    setChanged,
    options,
    toggleIgnoreWhitespace,
    toggleIgnoreCase,
    diffLines,
    stats,
    swap,
    clear,
    getDiffAsText,
    hasContent,
  } = useTextComparator();

  return (
    <ToolLayout
      title="Text Comparator"
      description="Compare two blocks of text and see added, removed and changed lines highlighted."
      actions={
        <DiffToolbar
          options={options}
          onToggleIgnoreWhitespace={toggleIgnoreWhitespace}
          onToggleIgnoreCase={toggleIgnoreCase}
          onSwap={swap}
          onClear={clear}
          onCopyDiff={getDiffAsText}
          stats={stats}
          hasContent={hasContent}
        />
      }
    >
      <Stack spacing={2} sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <EditorPanel title="Original">
            <CodeEditor
              value={original}
              onChange={setOriginal}
              language="text"
              placeholder="Paste the original text here…"
              aria-label="Original text"
              minHeight="220px"
            />
          </EditorPanel>
          <EditorPanel title="Changed">
            <CodeEditor
              value={changed}
              onChange={setChanged}
              language="text"
              placeholder="Paste the changed text here…"
              aria-label="Changed text"
              minHeight="220px"
            />
          </EditorPanel>
        </Box>

        <EditorPanel title="Diff Result">
          <DiffView lines={diffLines} />
        </EditorPanel>
      </Stack>
    </ToolLayout>
  );
}
