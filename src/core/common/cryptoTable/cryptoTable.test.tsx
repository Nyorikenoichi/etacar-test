import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CryptoTable } from './cryptoTable';

const args = {
  headerCells: [
    {
      columnClassNames: 'crypto-table__cell crypto-table__cell_align-left',
      content: 'Name',
      isHidden: false,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: 'Price',
      isHidden: false,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: 'Count',
      isHidden: false,
    },
  ],
  bodyRowsContent: [
    ['currency1', 'price1', 'count1'],
    ['currency2', 'price2', 'count2'],
    ['currency3', 'price3', 'count3'],
  ],
  rowIds: ['1', '2', '3'],
};

it('NumberInput component', () => {
  render(<CryptoTable {...args} />);
  const cryptoTable = screen.getByRole('table');
  expect(cryptoTable).toBeInTheDocument();
  expect(cryptoTable).toHaveClass('crypto-table');

  const rows = screen.getAllByRole('row');
  expect(rows[0]).toHaveClass('crypto-table__row_header');
  rows.forEach((row) => {
    expect(row).toHaveClass('crypto-table__row');
  });

  const cells = screen.getAllByRole('cell');
  cells.forEach((cell) => {
    expect(cell).toHaveClass('crypto-table__cell');
  });
});
