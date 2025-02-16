import './App.css';
import data from './data.json';
import ListComment from './components/ListComponent/ListComment';
import IComment from './types/comment';
import { useCallback, useMemo, useState } from 'react';
import IUser from './types/user';
import CommentInput from './components/CommentInput/CommentInput';
import IReply from './types/reply';

function App() {
  const copyCommentList: IComment[] = [...data.comments];

  const [commentList, setCommentList] = useState<IComment[]>(copyCommentList);
  const [addReplyingUserName, setAddReplyingUserName] = useState<string>('');

  const currentUser = useMemo<IUser>(() => data.currentUser, []);

  const updateComment = useCallback(
    (
      prev: IComment[],
      id: number,
      username: string,
      operation: 'plus' | 'minus'
    ) => {
      const editComment = commentList.find((comment) => {
        // TODO: implement multiple reply depth
        if (comment.replies.length > 0) {
          return comment.replies.find(
            (reply) => reply.id === id && reply.user.username === username
          );
        }
        return comment.id === id && comment.user.username === username;
      });

      return prev.map((comment) => {
        if (!editComment) return comment;

        let editReplies: IReply[] = comment.replies.map((reply) => {
          if (reply.user.username === username) {
            if (operation === 'plus') {
              return { ...reply, score: reply.score + 1 };
            }
            if (operation === 'minus') {
              return { ...reply, score: reply.score - 1 };
            }
          }
          return reply;
        });

        if (editReplies.length > 0) {
          return { ...editComment, replies: editReplies };
        }

        if (comment === editComment) {
          if (operation === 'plus') {
            return { ...editComment, score: comment.score + 1 };
          }
          if (operation === 'minus') {
            return { ...editComment, score: comment.score - 1 };
          }
        }
        return comment;
      });
    },
    [commentList]
  );

  const handleClickReply = useCallback(
    (username: string) => {
      setAddReplyingUserName(username);
    },
    [setAddReplyingUserName]
  );

  const handleSendReply = useCallback((reply: string) => {
    console.log(reply);
  }, []);

  const handleIncreaseScore = useCallback(
    (id: number, username: string) => {
      setCommentList((prev) => updateComment(prev, id, username, 'plus'));
    },
    [setCommentList, updateComment]
  );
  const handleDecreaseScore = useCallback(
    (id: number, username: string) => {
      setCommentList((prev) => updateComment(prev, id, username, 'minus'));
    },
    [setCommentList, updateComment]
  );
  const handleSendComment = useCallback(() => {}, []);
  const handleEditComment = useCallback(() => {}, []);
  const handleDeleteComment = useCallback(() => {}, []);

  return (
    <>
      <header></header>
      <main>
        <ListComment
          itemList={commentList}
          currentUser={currentUser}
          addReplyingUserName={addReplyingUserName}
          onSendReply={handleSendReply}
          onClickReply={handleClickReply}
          onDecreaseScore={handleDecreaseScore}
          onIncreaseScore={handleIncreaseScore}
          onDeleteComment={handleEditComment}
          onEditComment={handleDeleteComment}
        />
        <CommentInput
          currentUser={currentUser}
          onSendComment={handleSendComment}
        />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
