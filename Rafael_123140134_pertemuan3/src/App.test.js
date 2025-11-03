import { render, screen } from '@testing-library/react';
import App from './App';

test('renders book manager app header', () => {
  render(<App />);
  const linkElement = screen.getByRole('heading', {
    name: /My Book Collection/i
  });
  expect(linkElement).toBeInTheDocument();
});