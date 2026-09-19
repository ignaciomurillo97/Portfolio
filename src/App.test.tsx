import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio navigation', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Experience' })).toBeInTheDocument();
});
