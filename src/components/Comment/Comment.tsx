import './Comment.css';
import { memo, useCallback, useMemo, useState } from 'react';
import Counter from '../Counter/Counter';
import iconReply from '../../images/icon-reply.svg';
import iconEdit from '../../images/icon-edit.svg';
import iconDelete from '../../images/icon-delete.svg';
import Button, { ButtonStyle, ButtonType } from '../Button/Button';
import IBaseComment from '../../types/baseComment';
import IUser from '../../types/user';

export interface CommentProps {
  data: IBaseComment;
  replyingTo?: string;
  currentUser: IUser;
  isCurrentUser: boolean;
  onClickReply: (username: string) => void;
  onEditComment?: (editComment: string) => void;
  onDeleteComment?: () => void;
  onIncreaseScore: (id: number, username: string) => void;
  onDecreaseScore: (id: number, username: string) => void;
}

const Comment = ({
  data,
  replyingTo,
  currentUser,
  isCurrentUser,
  onClickReply,
  onDeleteComment,
  onEditComment,
  onIncreaseScore,
  onDecreaseScore,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const commentRelativeTime = useMemo(() => '2 weeks ago', [data.createdAt]);

  const [editComment, setEditComment] = useState<string>(
    `@${replyingTo} ${data.content}`
  );
  const isCommentReplying = useMemo(
    () => replyingTo && replyingTo?.length > 0,
    [replyingTo]
  );

  const handleDeleteComment = useCallback(() => {
    if (onDeleteComment) {
      onDeleteComment();
    }
  }, [onDeleteComment]);

  const handleEditComment = useCallback(() => {
    if (onEditComment) {
      onEditComment(editComment);
      setIsEditing(false);
    }
  }, [onEditComment]);

  const handleFocus = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const lengthOfInput = event.target.value.length;
      return event.target.setSelectionRange(lengthOfInput, lengthOfInput);
    },
    []
  );

  const handleClickEdit = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  return (
    <>
      <div className="wrapper">
        {isCommentReplying && <div className="reply-divider"></div>}
        <div className="comment-container">
          <div className="comment-header">
            <img
              className="comment-user-image"
              src={`./src/${data.user.image.png}`}
              alt={`${data.user.username} profile`}
            />
            <div className="comment-username">
              {data.user.username}
              {isCurrentUser && <span className="comment-you">you</span>}
            </div>
            <div className="comment-age">{commentRelativeTime}</div>
          </div>

          <div>
            {isEditing && currentUser && isCurrentUser ? (
              <div className="comment-input-container">
                <textarea
                  className="comment-input"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  rows={5}
                  autoFocus
                  onFocus={handleFocus}
                />
              </div>
            ) : (
              <p className="comment-content">
                {replyingTo && (
                  <span className="comment-mention">@{replyingTo}&nbsp;</span>
                )}
                {data.content}
              </p>
            )}
          </div>
          <div className="comment-actions">
            <Counter
              count={data.score}
              onPlus={() => onIncreaseScore(data.id, data.user.username)}
              onMinus={() => onDecreaseScore(data.id, data.user.username)}
            />

            {isCurrentUser ? (
              <>
                {isEditing ? (
                  <Button label="update" onClick={() => handleEditComment()} />
                ) : (
                  <div className="button-group">
                    <Button
                      label="delete"
                      startIcon={iconDelete}
                      onClick={() => handleDeleteComment()}
                      buttonStyle={ButtonStyle.DELETE}
                      buttonType={ButtonType.TEXT}
                    />
                    <Button
                      label="edit"
                      startIcon={iconEdit}
                      onClick={() => handleClickEdit()}
                      buttonType={ButtonType.TEXT}
                    />
                  </div>
                )}
              </>
            ) : (
              <Button
                label="reply"
                startIcon={iconReply}
                onClick={() => onClickReply(data.user.username)}
                buttonType={ButtonType.TEXT}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Comment);
