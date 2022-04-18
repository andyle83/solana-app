import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index';

describe('Index page', () => {
  it('Rendering Home Page', () => {
    render(<Home />);

    const startButton = screen.getByRole('button', {
      name: /Click to start/
    });

    expect(startButton).toBeInTheDocument();
  })
})