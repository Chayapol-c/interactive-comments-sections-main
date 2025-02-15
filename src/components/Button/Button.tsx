import { memo, useMemo } from 'react';
import './Button.css';

export enum ButtonType {
  CONTAIN,
  TEXT,
}

export enum ButtonStyle {
  PRIMARY,
  DELETE,
}

export interface ButtonProps {
  label: string;
  startIcon?: string;
  buttonType?: ButtonType;
  buttonStyle?: ButtonStyle;
  onClick: () => void;
}

const Button = ({
  label,
  startIcon,
  buttonType = ButtonType.CONTAIN,
  buttonStyle = ButtonStyle.PRIMARY,
  onClick,
}: ButtonProps) => {
  const buttonClassStyle = useMemo(() => {
    switch (buttonStyle) {
      case ButtonStyle.PRIMARY:
        return 'button-primary';
      case ButtonStyle.DELETE:
        return 'button-delete';
      default:
        return 'button-primary';
    }
  }, [buttonStyle]);

  // TODO: handle button type
  switch (buttonType) {
    case ButtonType.CONTAIN:
      return (
        <button
          onClick={onClick}
          className="button-container button-contain button-contain-primary"
        >
          {/* {startIcon && <img src={startIcon} alt="`${startIcon}-button`" />} */}
          {label}
        </button>
      );
    case ButtonType.TEXT:
      return (
        <button
          className={`button-container ${buttonClassStyle}`}
          onClick={onClick}
        >
          {startIcon && <img src={startIcon} alt="`${startIcon}-button`" />}
          {label}
        </button>
      );
    default:
      return (
        <button onClick={onClick}>
          {startIcon && <img src={startIcon} alt="`${startIcon}-button`" />}
          {label}
        </button>
      );
  }
};

export default memo(Button);
