import IUser from './user';

interface IBaseComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: IUser;
}

export default IBaseComment;
