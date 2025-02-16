import { memo, useCallback, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import './ModalDeleteComment.css';

interface ModalDeleteCommentProps {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
  title?: string;
}

const ModalDeleteComment = ({
  isOpen,
  onClose,
  onSubmit,
}: ModalDeleteCommentProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  const handleClickSubmit = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    onSubmit();
  }, [onSubmit]);

  const handleClose = useCallback(() => {
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
    onClose();
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <h1>Delete comment</h1>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className="button-actions">
        {/* TODO: handle Button style */}
        <Button data-close-modal label="no, cancel" onClick={() => onClose()} />
        <Button label="yes, delete" onClick={handleClickSubmit} />
      </div>
    </dialog>
  );
};

export default memo(ModalDeleteComment);
