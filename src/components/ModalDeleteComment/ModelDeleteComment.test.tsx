import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ModalDeleteComment from './ModalDeleteComment';
import userEvent from '@testing-library/user-event';

describe('modal tests', () => {
  let mockIsOpen = false;
  const mockOnClose = vi.fn().mockImplementation(() => (mockIsOpen = false));
  const mockSubmit = vi.fn().mockImplementation(() => (mockIsOpen = false));
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();

  beforeEach(() => {
    mockIsOpen = false;
  });

  it('should not call any callback when initial', async () => {
    render(
      <ModalDeleteComment
        isOpen={mockIsOpen}
        onSubmit={mockSubmit}
        onClose={mockOnClose}
      />
    );

    expect(mockOnClose).not.toHaveBeenCalled();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  describe('test on close', () => {
    it('should close by button', async () => {
      render(
        <ModalDeleteComment
          isOpen={mockIsOpen}
          onSubmit={mockSubmit}
          onClose={mockOnClose}
        />
      );
      //TODO: refactor Button to passing data-testid attr
      const cancelBtnEl = screen.getByText('no, cancel');

      await userEvent.click(cancelBtnEl);

      expect(mockOnClose).toHaveBeenCalled();
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  describe('test on submit', () => {
    it('should close by button', async () => {
      render(
        <ModalDeleteComment
          isOpen={mockIsOpen}
          onSubmit={mockSubmit}
          onClose={mockOnClose}
        />
      );
      //TODO: refactor Button to passing data-testid attr
      const submitBtnEl = screen.getByText('yes, delete');

      await userEvent.click(submitBtnEl);

      expect(mockOnClose).toHaveBeenCalled();
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
