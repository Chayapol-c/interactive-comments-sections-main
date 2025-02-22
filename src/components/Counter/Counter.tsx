import './Counter.css';
import { memo } from 'react';
import iconPlus from '../../images/icon-plus.svg';
import iconMinus from '../../images/icon-minus.svg';
import ButtonTestId from '../../constants/testId';

export interface CounterProps {
  count: number;
  onPlus: () => void;
  onMinus: () => void;
}

const Counter = ({ count, onMinus, onPlus }: CounterProps) => {
  return (
    <div className="counter-container">
      <button
        className="counter-button"
        onClick={onPlus}
        data-testid={ButtonTestId.PLUS_BTN}
      >
        <img src={iconPlus} alt="plus-btn" />
      </button>
      <span>{count}</span>
      <button
        className="counter-button"
        onClick={onMinus}
        data-testid={ButtonTestId.MINUS_BTN}
      >
        <img src={iconMinus} alt="minus-btn" />
      </button>
    </div>
  );
};

export default memo(Counter);
