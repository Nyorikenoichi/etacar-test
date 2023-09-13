import React from 'react';
import { ButtonVariants } from '../../lib/constants/buttonVariants';

export interface ButtonProps {
  variant: ButtonVariants;
  onClick: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | (() => void);
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  let dataCy = 'button-add';
  if (variant == ButtonVariants.close) {
    dataCy = 'button-close';
  }
  if (variant == ButtonVariants.tableCellAdd) {
    dataCy = 'button-table-add';
  }
  if (variant == ButtonVariants.tableCellRemove) {
    dataCy = 'button-table-remove';
  }

  return (
    <button onClick={onClick} className={variant} data-cy={dataCy}>
      {children}
    </button>
  );
};
