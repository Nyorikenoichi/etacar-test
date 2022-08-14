import React from 'react';
import { ButtonVariants } from '../../lib/constants/buttonVariants';

export interface ButtonProps {
  variant: ButtonVariants;
  onClick: () => void;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  return (
    <button onClick={onClick} className={variant}>
      {children}
    </button>
  );
};
