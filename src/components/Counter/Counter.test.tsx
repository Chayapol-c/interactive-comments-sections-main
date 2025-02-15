import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter component tests', () => {
  const mockOnPlus = vi.fn();
  const mockOnMinus = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should display count value', () => {
    const count = 10;
    render(<Counter count={count} onMinus={mockOnMinus} onPlus={mockOnPlus} />);

    const actualCount = screen.getByText(count).innerHTML;
    expect(actualCount).toEqual(count.toString());
  });

  it('should emit onclick plus button', async () => {
    render(<Counter count={0} onMinus={mockOnMinus} onPlus={mockOnPlus} />);
    const buttonEl = screen.getByTestId('plus-btn');

    await userEvent.click(buttonEl);

    expect(mockOnPlus).toHaveBeenCalled();
    expect(mockOnMinus).not.toHaveBeenCalled();
  });

  it('should emit onclick minus button', async () => {
    render(<Counter count={0} onMinus={mockOnMinus} onPlus={mockOnPlus} />);
    const buttonEl = screen.getByTestId('minus-btn');

    await userEvent.click(buttonEl);

    expect(mockOnMinus).toHaveBeenCalled();
    expect(mockOnPlus).not.toHaveBeenCalled();
  });
});
