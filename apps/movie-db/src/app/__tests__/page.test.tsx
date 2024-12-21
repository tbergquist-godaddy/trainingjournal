import { render, screen } from '@testing-library/react';

import Page from '../page';

describe('Page', () => {
  it('should render successfully', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
});
