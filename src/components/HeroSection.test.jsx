import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';
import '@testing-library/jest-dom';

test('renders HeroSection heading', () => {
  render(<HeroSection />);
  const heading = screen.getByRole('heading', { name: /YOUR FEET DESERVE THE BEST/i });
  expect(heading).toBeInTheDocument();
});

test('renders Shop Now button', () => {
  render(<HeroSection />);
  const button = screen.getByRole('button', { name: /Shop Now/i });
  expect(button).toBeInTheDocument();
});
