import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/DeleteOutline';

interface ClearButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export function ClearButton({ onClick, disabled, label = 'Clear' }: ClearButtonProps) {
  return (
    <Button
      variant="outlined"
      color="error"
      size="small"
      startIcon={<ClearIcon />}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}
