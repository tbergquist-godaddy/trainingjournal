import { render, screen } from '@testing-library/react';
import Container from '../container';
import { it, expect } from 'vitest';

it('should render successfully', () => {
  render(<Container>Container</Container>);
  expect(screen.getByText('Container')).toBeInTheDocument();
});
