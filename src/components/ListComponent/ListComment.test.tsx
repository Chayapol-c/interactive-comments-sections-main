import { describe, it, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import ListComment from './ListComment';
import IUser from '../../types/user';
import IComment from '../../types/comment';

test('demo', () => {
  expect(true).toBe(true);
});

describe('render', () => {
  it('renders the main page', () => {
    const mockCurrentUser: IUser = {
      image: {
        png: '',
        webp: '',
      },
      username: '',
    };
    const mockItemList: IComment[] = [];

    render(
      <ListComment
        itemList={mockItemList}
        currentUser={mockCurrentUser}
        onClickReply={vi.fn()}
        onIncreaseScore={vi.fn()}
        onDecreaseScore={vi.fn()}
      />
    );
    expect(true).toBeTruthy();
  });
});
