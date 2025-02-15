import './App.css';
import data from './data.json';
import ListComment from './components/ListComponent/ListComment';
import IComment from './types/comment';
import { useCallback, useMemo } from 'react';
import IUser from './types/user';
import CommentInput from './components/CommentInput/CommentInput';

function App() {
  const currentUser = useMemo<IUser>(() => data.currentUser, []);
  const commentList = useMemo<IComment[]>(() => data.comments, []);

  const handleClickReply = useCallback((id: number) => {
    console.log('reply', id);
  }, []);
  const handleIncreaseScore = useCallback(() => {
    console.log('increase');
  }, []);
  const handleDecreaseScore = useCallback(() => {
    console.log('decrease');
  }, []);
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
