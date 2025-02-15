import { memo } from 'react';
import './CommentInput.css';
import Button from '../Button/Button';
import IUser from '../../types/user';

export interface CommentInputProps {
  currentUser: IUser;
  isReplying?: boolean;
  onSendComment: () => void;
}

const CommentInput = ({
  currentUser,
  isReplying,
  onSendComment,
}: CommentInputProps) => {
  return (
    <>
      <div className="wrapper">
        {isReplying && <div className="reply-divider"></div>}
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
      </div>
    </>
  );
};

export default memo(CommentInput);
