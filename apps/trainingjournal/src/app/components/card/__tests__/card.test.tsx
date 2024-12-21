import { render, screen } from '@testing-library/react';
import Card from '../card';

describe('Card', () => {
  it('should render successfully', () => {
    render(<Card>card</Card>);
    expect(screen.getByText('card')).toBeInTheDocument();
  });
});
