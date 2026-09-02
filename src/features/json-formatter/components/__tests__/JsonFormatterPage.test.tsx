import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThemeModeProvider } from '../../../../app/ThemeModeContext';
import { JsonFormatterPage } from '../JsonFormatterPage';

function renderPage() {
  return render(
    <ThemeModeProvider>
      <JsonFormatterPage />
    </ThemeModeProvider>,
  );
}

describe('JsonFormatterPage', () => {
  it('renders the title, both editors and the toolbar controls', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: 'JSON Formatter' })).toBeInTheDocument();
    expect(screen.getByLabelText('JSON input')).toBeInTheDocument();
    expect(screen.getByLabelText('JSON output')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /format/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /minify/i })).toBeInTheDocument();
  });

  it('disables format/minify/clear/copy actions when the input is empty', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /format/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /minify/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /clear/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /copy output/i })).toBeDisabled();
  });

  it('formats valid JSON when Format is clicked', async () => {
    const user = userEvent.setup();
    renderPage();

    const input = within(screen.getByLabelText('JSON input')).getByRole('textbox');
    await user.click(input);
    await user.paste('{"a":1}');

    await user.click(screen.getByRole('button', { name: /format/i }));

    const output = screen.getByLabelText('JSON output');
    expect(within(output).getByText(/"a"/)).toBeInTheDocument();
    expect(screen.getByText('Valid JSON')).toBeInTheDocument();
  });

  it('shows an error message for invalid JSON', async () => {
    const user = userEvent.setup();
    renderPage();

    const input = within(screen.getByLabelText('JSON input')).getByRole('textbox');
    await user.click(input);
    await user.paste('{invalid}');

    expect(screen.getAllByText('Invalid JSON').length).toBeGreaterThan(0);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('clears both input and output and disables the toolbar again', async () => {
    const user = userEvent.setup();
    renderPage();

    const input = within(screen.getByLabelText('JSON input')).getByRole('textbox');
    await user.click(input);
    await user.paste('{"a":1}');
    await user.click(screen.getByRole('button', { name: /format/i }));

    expect(screen.getByRole('button', { name: /clear/i })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: /clear/i }));

    expect(screen.getByRole('button', { name: /format/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /minify/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /clear/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /copy output/i })).toBeDisabled();
  });
});
