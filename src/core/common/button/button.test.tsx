import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './button';
import { ButtonVariants } from '../../lib/constants/buttonVariants';

it('Button component', () => {
  let { unmount } = render(
    <Button variant={ButtonVariants.add} onClick={() => null} children={'Add'} />
  );
  const addButton = screen.getByRole('button', { name: 'Add' });
  expect(addButton).toBeInTheDocument();
  expect(addButton).toHaveClass('button');
  expect(addButton).toHaveClass('button_add');
  unmount();

  ({ unmount } = render(
    <Button variant={ButtonVariants.close} onClick={() => null} children={'X'} />
  ));
  const closeButton = screen.getByRole('button', { name: 'X' });
  expect(closeButton).toBeInTheDocument();
  expect(closeButton).toHaveClass('button');
  expect(closeButton).toHaveClass('button_close');
  unmount();

  ({ unmount } = render(
    <Button variant={ButtonVariants.tableCellAdd} onClick={() => null} children={'+'} />
  ));
  const tableAddButton = screen.getByRole('button', { name: '+' });
  expect(tableAddButton).toBeInTheDocument();
  expect(tableAddButton).toHaveClass('button');
  expect(tableAddButton).toHaveClass('button_table-cell-add');
  unmount();

  ({ unmount } = render(
    <Button variant={ButtonVariants.tableCellRemove} onClick={() => null} children={'X'} />
  ));
  const tableRemoveButton = screen.getByRole('button', { name: /x/i });
  expect(tableRemoveButton).toBeInTheDocument();
  expect(tableRemoveButton).toHaveClass('button');
  expect(tableRemoveButton).toHaveClass('button_table-cell-remove');
  unmount();
});
