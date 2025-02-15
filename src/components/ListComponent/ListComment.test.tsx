import { describe, it, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import ListComment from './ListComment';

test('demo', () => {
  expect(true).toBe(true);
});

describe('render', () => {
  it('renders the main page', () => {
    render(<ListComment />);
    expect(true).toBeTruthy();
  });
});
