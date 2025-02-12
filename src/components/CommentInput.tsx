import { memo } from 'react';
import IUser from '../types/user';
import Button from './Button';
import './comment-input.css';

export interface CommentInputProps {
  currentUser: IUser;
  onSendComment: () => void;
}

const CommentInput = ({ currentUser, onSendComment }: CommentInputProps) => {
  return (
    <form onSubmit={onSendComment} className="comment-input-container">
      <textarea
        className="comment-input"
        placeholder="Add a comment..."
        rows={5}
      />
      <div className="comment-input-footer">
        <img
          className="current-user-img"
          src={`./src/${currentUser.image.png}`}
        />
        <Button label="send" onClick={onSendComment} />
      </div>
    </form>
  );
};

export default memo(CommentInput);
