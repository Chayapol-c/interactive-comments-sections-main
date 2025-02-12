import IBaseComment from './baseComment';
import IReply from './reply';

interface IComment extends IBaseComment {
  replies: IReply[];
}

export default IComment;
