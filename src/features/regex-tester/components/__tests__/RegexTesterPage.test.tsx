import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThemeModeProvider } from '../../../../app/ThemeModeContext';
import { RegexTesterPage } from '../RegexTesterPage';

function renderPage() {
  return render(
    <ThemeModeProvider>
      <RegexTesterPage />
    </ThemeModeProvider>,
  );
}

describe('RegexTesterPage', () => {
  it('renders the title, pattern field, test text editor and flag toggles', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: 'Regex Tester' })).toBeInTheDocument();
    expect(screen.getByLabelText('Regex pattern')).toBeInTheDocument();
    expect(screen.getByLabelText('Test text')).toBeInTheDocument();
    expect(screen.getByLabelText('g')).toBeInTheDocument();
    expect(screen.getByLabelText('i')).toBeInTheDocument();
    expect(screen.getByLabelText('m')).toBeInTheDocument();
    expect(screen.getByLabelText('s')).toBeInTheDocument();
  });

  it('shows a placeholder message before any pattern or text is entered', () => {
    renderPage();

    expect(
      screen.getByText('Enter a pattern and test text to see matches highlighted here.'),
    ).toBeInTheDocument();
    expect(screen.getByText('No matches yet.')).toBeInTheDocument();
  });

  it('disables clear and copy actions when there is no content', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /clear/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /copy matches/i })).toBeDisabled();
  });

  it('highlights matches and lists match details once a pattern and text are entered', async () => {
    const user = userEvent.setup();
    renderPage();

    const pattern = screen.getByLabelText('Regex pattern');
    await user.click(pattern);
    await user.paste('\\d+');

    const testText = within(screen.getByLabelText('Test text')).getByRole('textbox');
    await user.click(testText);
    await user.paste('a1 b22');

    const highlighted = screen.getByRole('log', { name: 'Highlighted matches' });
    expect(within(highlighted).getByText('1')).toBeInTheDocument();
    expect(within(highlighted).getByText('22')).toBeInTheDocument();

    expect(screen.getByLabelText('Match details')).toBeInTheDocument();
    expect(screen.getByText('2 matches')).toBeInTheDocument();
  });

  it('shows an error message for an invalid pattern', async () => {
    const user = userEvent.setup();
    renderPage();

    const pattern = screen.getByLabelText('Regex pattern');
    await user.click(pattern);
    await user.paste('(unclosed');

    expect(screen.getByText('Invalid regular expression')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
