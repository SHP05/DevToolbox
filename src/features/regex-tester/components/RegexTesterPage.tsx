import { Box, Stack, TextField } from '@mui/material';
import { ToolLayout } from '../../../components/common/ToolLayout';
import { EditorPanel } from '../../../components/common/EditorPanel';
import { CodeEditor } from '../../../components/common/CodeEditor';
import { useRegexTester } from '../hooks/useRegexTester';
import { RegexToolbar } from './RegexToolbar';
import { RegexErrorMessage } from './RegexErrorMessage';
import { MatchHighlighter } from './MatchHighlighter';
import { MatchList } from './MatchList';

export function RegexTesterPage() {
  const {
    pattern,
    setPattern,
    testText,
    setTestText,
    flags,
    toggleFlag,
    result,
    segments,
    clear,
    getMatchesAsText,
    hasContent,
    hasMatches,
  } = useRegexTester();

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test JavaScript regular expressions against sample text, entirely in your browser."
      actions={
        <RegexToolbar
          flags={flags}
          onToggleFlag={toggleFlag}
          onClear={clear}
          onCopyMatches={getMatchesAsText}
          result={result}
          hasContent={hasContent}
          hasMatches={hasMatches}
        />
      }
    >
      <Stack spacing={2} sx={{ height: '100%' }}>
        <TextField
          value={pattern}
          onChange={(event) => setPattern(event.target.value)}
          label="Regex pattern"
          placeholder="e.g. (\w+)@(\w+\.\w+)"
          size="small"
          fullWidth
          spellCheck={false}
          slotProps={{ htmlInput: { 'aria-label': 'Regex pattern', style: { fontFamily: 'monospace' } } }}
          error={hasContent && pattern.length > 0 && !result.isValid}
        />

        <RegexErrorMessage result={result} hasPattern={pattern.length > 0} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <EditorPanel title="Test Text">
            <CodeEditor
              value={testText}
              onChange={setTestText}
              language="text"
              placeholder="Paste text to test the pattern against…"
              aria-label="Test text"
              minHeight="220px"
            />
          </EditorPanel>
          <EditorPanel title="Highlighted Matches">
            <MatchHighlighter segments={segments} />
          </EditorPanel>
        </Box>

        <EditorPanel title="Match Details">
          <MatchList matches={result.matches} />
        </EditorPanel>
      </Stack>
    </ToolLayout>
  );
}
