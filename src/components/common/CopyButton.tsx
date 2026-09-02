import { Button, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

interface CopyButtonProps {
  getText: () => string;
  disabled?: boolean;
  label?: string;
}

export function CopyButton({ getText, disabled, label = 'Copy' }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Tooltip title={copied ? 'Copied!' : ''} open={copied} placement="top">
      <span>
        <Button
          variant="outlined"
          size="small"
          color={copied ? 'success' : 'primary'}
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          disabled={disabled}
          onClick={() => copy(getText())}
        >
          {copied ? 'Copied' : label}
        </Button>
      </span>
    </Tooltip>
  );
}
