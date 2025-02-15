import { memo } from 'react';
import IComment from '../../types/comment';
import Comment from '../Comment/Comment';
import IUser from '../../types/user';
import './list-comment.css';

export interface ListCommentProps {
  itemList: IComment[];
  currentUser: IUser;
  onClickReply: (id: number) => void;
  onEditComment?: () => void;
  onDeleteComment?: () => void;
  onIncreaseScore: (id: number) => void;
  onDecreaseScore: (id: number) => void;
}

const ListComment = ({
  itemList,
  currentUser,
  onClickReply,
  onDeleteComment,
  onEditComment,
  onDecreaseScore,
  onIncreaseScore,
}: ListCommentProps) => {
  return (
    <div className="list-comment-container">
      {itemList.map((item) => {
        const hasReply = item.replies.length > 0;
        if (hasReply) {
          return item.replies.map((reply) => {
            return (
              <>
                <Comment
                  key={reply.createdAt}
                  data={reply}
                  replyingTo={reply.replyingTo}
                  isCurrentUser={reply.user.username === currentUser.username}
                  onClickReply={onClickReply}
                  onDecreaseScore={onDecreaseScore}
                  onIncreaseScore={onIncreaseScore}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                />
              </>
            );
          });
        } else {
          return (
            <>
              <Comment
                key={item.id}
                data={item}
                isCurrentUser={hasReply}
                onClickReply={onClickReply}
                onDecreaseScore={onDecreaseScore}
                onIncreaseScore={onIncreaseScore}
                onEditComment={onEditComment}
                onDeleteComment={onDeleteComment}
              />
            </>
          );
        }
      })}
    </div>
  );
};

export default memo(ListComment);
