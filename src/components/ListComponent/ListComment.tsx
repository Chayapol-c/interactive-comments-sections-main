import { memo } from 'react';
import IComment from '../../types/comment';
import Comment from '../Comment/Comment';
import IUser from '../../types/user';
import './ListComment.css';
import CommentInput from '../CommentInput/CommentInput';

export interface ListCommentProps {
  itemList: IComment[];
  currentUser: IUser;
  addReplyingUserName: string;
  onClickReply: (username: string) => void;
  onSendReply: (reply: string) => void;
  onEditComment?: () => void;
  onDeleteComment?: () => void;
  onIncreaseScore: (id: number, username: string) => void;
  onDecreaseScore: (id: number, username: string) => void;
}

const ListComment = ({
  itemList,
  currentUser,
  addReplyingUserName,
  onClickReply,
  onSendReply,
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
                {addReplyingUserName === reply.user.username && (
                  <CommentInput
                    currentUser={currentUser}
                    replyingTo={reply.replyingTo}
                    isReplying
                    onSendComment={onSendReply}
                  />
                )}
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
              {addReplyingUserName === item.user.username && (
                <CommentInput
                  currentUser={currentUser}
                  onSendComment={onSendReply}
                />
              )}
            </>
          );
        }
      })}
    </div>
  );
};

export default memo(ListComment);
