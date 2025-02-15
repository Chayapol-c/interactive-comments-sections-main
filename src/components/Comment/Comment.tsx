import './comment.css';
import { memo, useCallback, useMemo } from 'react';
import Counter from '../Counter/Counter';
import iconReply from '../../images/icon-reply.svg';
import iconEdit from '../../images/icon-edit.svg';
import iconDelete from '../../images/icon-delete.svg';
import Button, { ButtonStyle, ButtonType } from '../Button/Button';
import IBaseComment from '../../types/baseComment';

export interface CommentProps {
  data: IBaseComment;
  replyingTo?: string;
  isCurrentUser: boolean;
  onClickReply: (id: number) => void;
  onEditComment?: () => void;
  onDeleteComment?: () => void;
  onIncreaseScore: (id: number) => void;
  onDecreaseScore: (id: number) => void;
}

const Comment = ({
  data,
  replyingTo,
  isCurrentUser,
  onClickReply,
  onDeleteComment,
  onEditComment,
  onIncreaseScore,
  onDecreaseScore,
}: CommentProps) => {
  const commentRelativeTime = useMemo(() => '2 weeks ago', [data.createdAt]);
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
      onEditComment();
    }
  }, [onEditComment]);

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
            <div className="comment-username">{data.user.username}</div>
            {isCurrentUser && <div>you</div>}
            <div className="comment-age">{commentRelativeTime}</div>
          </div>

          <div>
            <p className="comment-content">
              {replyingTo && (
                <span className="comment-mention">@{replyingTo}&nbsp;</span>
              )}
              {data.content}
            </p>
          </div>
          <div className="comment-actions">
            <Counter
              count={data.score}
              onPlus={() => onIncreaseScore(data.id)}
              onMinus={() => onDecreaseScore(data.id)}
            />

            {isCurrentUser ? (
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
                  onClick={() => handleEditComment()}
                  buttonType={ButtonType.TEXT}
                />
              </div>
            ) : (
              <Button
                label="reply"
                startIcon={iconReply}
                onClick={() => onClickReply(data.id)}
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
