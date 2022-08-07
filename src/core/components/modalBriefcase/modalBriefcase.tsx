import React from 'react';
import { Briefcase } from '../../interfaces/briefcase';
import data from '../../mock-data.json';
import { formatFloat } from '../../helpers/formatFloat';

interface ModalBriefcaseProps {
  setIsOpen: (option: boolean) => void;
}

const ModalBriefcase = ({ setIsOpen }: ModalBriefcaseProps) => {
  const briefcase: Briefcase = {
    currencies: [
      { currency: data[0], count: 0.126 },
      { currency: data[1], count: 2 },
    ],
    initialPrice: 1683.14,
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="modal__background" onClick={onCloseModal} />
      <div className="modal">
        <div className="stack stack_vertical modal__container">
          <button className="close-button" onClick={onCloseModal}>
            X
          </button>
          <div className="modal__heading">Briefcase</div>
          <p>Total price is ${briefcase.initialPrice}</p>
          <div className="crypto-table__container modal__currencies">
            <table className="crypto-table">
              <thead>
                <tr className="crypto-table__row crypto-table__row_header">
                  <th className="crypto-table__cell">Name</th>
                  <th className="crypto-table__cell">Price</th>
                  <th className="crypto-table__cell">Count</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {briefcase.currencies.map((item) => (
                  <tr
                    className="crypto-table__row crypto-table__row_body"
                    key={item.currency.id}
                  >
                    <td className="crypto-table__cell">{item.currency.name}</td>
                    <td className="crypto-table__cell crypto-table__cell_align-left">
                      ${formatFloat(item.currency.priceUsd)}
                    </td>
                    <td className="crypto-table__cell">{item.count}</td>
                    <td className="crypto-table__cell">
                      <div
                        className="cryptoTable__cell_button cryptoTable__cell_button-delete"
                        onClick={onCloseModal}
                      >
                        X
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBriefcase;
