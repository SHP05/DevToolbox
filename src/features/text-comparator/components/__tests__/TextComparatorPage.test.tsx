import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThemeModeProvider } from '../../../../app/ThemeModeContext';
import { TextComparatorPage } from '../TextComparatorPage';

function renderPage() {
  return render(
    <ThemeModeProvider>
      <TextComparatorPage />
    </ThemeModeProvider>,
  );
}

describe('TextComparatorPage', () => {
  it('renders the title, both editors and the diff options', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: 'Text Comparator' })).toBeInTheDocument();
    expect(screen.getByLabelText('Original text')).toBeInTheDocument();
    expect(screen.getByLabelText('Changed text')).toBeInTheDocument();
    expect(screen.getByLabelText('Ignore whitespace')).toBeInTheDocument();
    expect(screen.getByLabelText('Ignore case')).toBeInTheDocument();
  });

  it('shows a placeholder message in the diff result before any text is entered', () => {
    renderPage();

    expect(
      screen.getByText('Enter text on both sides to see the differences here.'),
    ).toBeInTheDocument();
  });

  it('highlights differences once text is typed into both editors', async () => {
    const user = userEvent.setup();
    renderPage();

    const original = within(screen.getByLabelText('Original text')).getByRole('textbox');
    const changed = within(screen.getByLabelText('Changed text')).getByRole('textbox');

    await user.click(original);
    await user.type(original, 'hello');
    await user.click(changed);
    await user.type(changed, 'world');

    const diffResult = screen.getByRole('log', { name: 'Difference result' });
    expect(within(diffResult).getByText('hello')).toBeInTheDocument();
    expect(within(diffResult).getByText('world')).toBeInTheDocument();
  });

  it('disables swap/clear/copy actions when both editors are empty', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /swap/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /clear/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /copy diff/i })).toBeDisabled();
  });
});
