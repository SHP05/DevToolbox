import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CopyButton } from '../CopyButton';

describe('CopyButton', () => {
  afterEach(() => {
    // @ts-expect-error -- restoring the test-only clipboard stub
    delete navigator.clipboard;
  });

  it('copies the provided text to the clipboard when clicked', async () => {
    // userEvent.setup() installs its own Clipboard stub, so our mock must
    // be assigned after setup() to avoid being overwritten by it.
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<CopyButton getText={() => 'hello world'} />);

    await user.click(screen.getByRole('button', { name: 'Copy' }));

    expect(writeText).toHaveBeenCalledWith('hello world');
    await waitFor(() => expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument());
  });

  it('is disabled when disabled prop is true', () => {
    render(<CopyButton getText={() => ''} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
