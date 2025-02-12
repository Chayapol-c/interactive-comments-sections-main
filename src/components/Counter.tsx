import './counter.css';
import { memo } from 'react';
import iconPlus from '../images/icon-plus.svg?url';
import iconMinus from '../images/icon-minus.svg?url';

export interface CounterProps {
  count: number;
  onPlus: () => void;
  onMinus: () => void;
}

const Counter = ({ count, onMinus, onPlus }: CounterProps) => {
  return (
    <div className="counter-container">
      <button className="counter-button" onClick={onPlus}>
        <img src={iconPlus} alt="" />
      </button>
      <span>{count}</span>
      <button className="counter-button" onClick={onMinus}>
        <img src={iconMinus} alt="" />
      </button>
    </div>
  );
};

export default memo(Counter);
