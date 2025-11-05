import Button from '@/components/button';
import { render, screen } from '@testing-library/react';

// jest.mock()

describe('Button is working as expected', () => {
  test('Button', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByTestId('button-1');

    button.innerHTML;

    expect(button.innerHTML).toBe('Click me');
  });

  test('Disabled state', () => {
    render(<Button isDisabled={true}>Click me</Button>);

    const button = screen.getByTestId('button-1');

    expect(button).toBeDisabled();
  });
});
