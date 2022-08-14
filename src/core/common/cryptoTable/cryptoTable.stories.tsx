import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CryptoTable, CryptoTableProps } from './cryptoTable';

export default {
  title: 'CryptoTable',
  component: CryptoTable,
} as Meta;

const Template: Story<CryptoTableProps> = (args: CryptoTableProps) => (
  <div className="main">
    <CryptoTable {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
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
