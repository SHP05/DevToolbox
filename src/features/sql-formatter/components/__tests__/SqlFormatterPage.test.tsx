import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThemeModeProvider } from '../../../../app/ThemeModeContext';
import { SqlFormatterPage } from '../SqlFormatterPage';

function renderPage() {
  return render(
    <ThemeModeProvider>
      <SqlFormatterPage />
    </ThemeModeProvider>,
  );
}

describe('SqlFormatterPage', () => {
  it('renders the title, both editors and the toolbar controls', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: 'SQL Formatter' })).toBeInTheDocument();
    expect(screen.getByLabelText('SQL input')).toBeInTheDocument();
    expect(screen.getByLabelText('SQL output')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /format/i })).toBeInTheDocument();
  });

  it('disables format/clear/copy actions when the input is empty', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /format/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /clear/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /copy output/i })).toBeDisabled();
  });

  it('formats valid SQL when Format is clicked', async () => {
    const user = userEvent.setup();
    renderPage();

    const input = within(screen.getByLabelText('SQL input')).getByRole('textbox');
    await user.click(input);
    await user.paste('select a from t');

    await user.click(screen.getByRole('button', { name: /format/i }));

    const output = screen.getByLabelText('SQL output');
    expect(within(output).getByText(/SELECT/)).toBeInTheDocument();
    expect(screen.getByText('Valid SQL')).toBeInTheDocument();
  });

  it('shows an error message for invalid SQL', async () => {
    const user = userEvent.setup();
    renderPage();

    const input = within(screen.getByLabelText('SQL input')).getByRole('textbox');
    await user.click(input);
    await user.paste('select * from (');

    expect(screen.getAllByText('Invalid SQL').length).toBeGreaterThan(0);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('clears input/output and disables the toolbar again', async () => {
    const user = userEvent.setup();
    renderPage();

    const input = within(screen.getByLabelText('SQL input')).getByRole('textbox');
    await user.click(input);
    await user.paste('select a from t');
    await user.click(screen.getByRole('button', { name: /format/i }));

    expect(screen.getByRole('button', { name: /clear/i })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: /clear/i }));

    expect(screen.getByRole('button', { name: /format/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /clear/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /copy output/i })).toBeDisabled();
  });
});
