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

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  label: string;
  startIcon?: string;
  buttonType?: ButtonType;
  buttonStyle?: ButtonStyle;
  onClick?: () => void;
}

const Button = ({
  label,
  startIcon,
  buttonType = ButtonType.CONTAIN,
  buttonStyle = ButtonStyle.PRIMARY,
  type = 'button',
  onClick,
  ...restProp
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
          type={type}
          onClick={onClick}
          className="button-container button-contain button-contain-primary"
          {...restProp}
        >
          {/* {startIcon && <img src={startIcon} alt="`${startIcon}-button`" />} */}
          {label}
        </button>
      );
    case ButtonType.TEXT:
      return (
        <button
          type={type}
          className={`button-container ${buttonClassStyle}`}
          onClick={onClick}
          {...restProp}
        >
          {startIcon && <img src={startIcon} alt="`${startIcon}-button`" />}
          {label}
        </button>
      );
    default:
      return (
        <button type={type} onClick={onClick} {...restProp}>
          {startIcon && <img src={startIcon} alt="`${startIcon}-button`" />}
          {label}
        </button>
      );
  }
};

export default memo(Button);
