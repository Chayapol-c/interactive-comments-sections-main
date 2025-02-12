import IBaseComment from './baseComment';

interface IReply extends IBaseComment {
  replyingTo: string;
}

export default IReply;
