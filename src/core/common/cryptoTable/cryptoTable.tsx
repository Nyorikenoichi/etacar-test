import React from 'react';
import { CryptoTableHeaderCell } from '../../lib/interfaces/cryptoTableHeaderCell';
import { v4 as uuidv4 } from 'uuid';

export interface CryptoTableProps {
  headerCells: CryptoTableHeaderCell[];
  bodyRowsContent: (string | JSX.Element)[][];
  rowIds: string[];
  onRowClick?: (id: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

export const CryptoTable: React.FC<CryptoTableProps> = ({
  headerCells,
  bodyRowsContent,
  rowIds,
  onRowClick,
  className,
}) => {
  return (
    <table
      className={`crypto-table ${className !== undefined ? className : ''}`}
      data-cy="crypto-table"
    >
      <thead>
        <tr className="crypto-table__row crypto-table__row_header">
          {headerCells.map(
            (item) =>
              !item.isHidden && (
                <td key={uuidv4()} className={item.columnClassNames}>
                  {item.content}
                </td>
              )
          )}
        </tr>
      </thead>
      <tbody>
        {rowIds.map((id, rowIndex) => {
          return (
            <tr
              className={`crypto-table__row crypto-table__row_body ${
                onRowClick ? `crypto-table__row_clickable` : ``
              }`}
              data-cy="crypto-table-body-row"
              key={id}
              onClick={onRowClick && onRowClick(id)}
            >
              {bodyRowsContent[rowIndex].map(
                (content, columnIndex) =>
                  !headerCells[columnIndex].isHidden && (
                    <td
                      key={uuidv4()}
                      className={headerCells[columnIndex].columnClassNames}
                      data-cy="crypto-table-body-cell"
                    >
                      {content}
                    </td>
                  )
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
