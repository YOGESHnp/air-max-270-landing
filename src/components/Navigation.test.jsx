import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import '@testing-library/jest-dom';

test('renders logo image', () => {
  render(<Navigation />);
  const logo = screen.getByAltText(/brand_logo/i);
  expect(logo).toBeInTheDocument();
});

test('renders Login button', () => {
  render(<Navigation />);
  const button = screen.getByRole('button', { name: /Login/i });
  expect(button).toBeInTheDocument();
});
