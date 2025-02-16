import { FormEvent, memo, useCallback, useState } from 'react';
import './CommentInput.css';
import Button from '../Button/Button';
import IUser from '../../types/user';

export interface CommentInputProps {
  currentUser: IUser;
  replyingTo?: string;
  isReplying?: boolean;
  onSendComment: (comment: string) => void;
}

const CommentInput = ({
  currentUser,
  replyingTo,
  isReplying,
  onSendComment,
}: CommentInputProps) => {
  const [comment, setComment] = useState<string>(
    replyingTo ? `@${replyingTo}` : ''
  );

  const handleSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSendComment(comment);
    },
    [onSendComment]
  );

  return (
    <>
      <div className="wrapper">
        {isReplying && <div className="reply-divider"></div>}
        <form onSubmit={handleSubmitForm} className="comment-input-container">
          <textarea
            className="comment-input"
            placeholder="Add a comment..."
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="comment-input-footer">
            <img
              className="current-user-img"
              src={`./src/${currentUser.image.png}`}
            />
            <Button label="send" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(CommentInput);
