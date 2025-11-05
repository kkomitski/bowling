import type React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'data-testid'?: string;
  isDisabled?: boolean;
};

const Button = ({
  children,
  onClick,
  type = 'button',
  className = '',
  'data-testid': dataTestId = 'button-1',
  isDisabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn ${className}`.trim()}
      onClick={onClick}
      data-testid={dataTestId}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
