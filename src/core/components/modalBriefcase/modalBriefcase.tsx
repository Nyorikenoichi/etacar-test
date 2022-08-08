import React from 'react';
import { formatFloat } from '../../helpers/formatFloat';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  calculateCurrentBriefcasePrice,
  calculateInitialBriefcasePrice,
} from '../../helpers/briefcaseCalculators';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { removeCurrency } from '../../redux/slices/briefcaseSlice';

interface ModalBriefcaseProps {
  setIsOpen: (option: boolean) => void;
}

const ModalBriefcase = ({ setIsOpen }: ModalBriefcaseProps) => {
  const dispatch = useAppDispatch();
  const briefcase = useAppSelector((state) => state.briefcase.currencies);
  const currencies = useAppSelector((state) => state.currency.currencies);
  const briefcaseInitialPrice = calculateInitialBriefcasePrice(briefcase);
  const briefcaseCurrentPrice = calculateCurrentBriefcasePrice(
    briefcase,
    currencies
  );

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onRemoveCurrency = (currencyId: string) => () => {
    dispatch(removeCurrency(currencyId));
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
          {briefcase.length > 0 ? (
            <>
              <p>Initial price was ${briefcaseInitialPrice.toFixed(2)}</p>
              <p>Current price is ${briefcaseCurrentPrice.toFixed(2)}</p>
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
                    {briefcase.map((item) => (
                      <tr
                        className="crypto-table__row crypto-table__row_body"
                        key={item.id}
                      >
                        <td className="crypto-table__cell">{item.name}</td>
                        <td className="crypto-table__cell crypto-table__cell_align-left">
                          ${formatFloat(item.initialPrice.toString())}
                        </td>
                        <td className="crypto-table__cell">{item.count}</td>
                        <td className="crypto-table__cell">
                          <div
                            className="cryptoTable__cell_button cryptoTable__cell_button-delete"
                            onClick={onRemoveCurrency(item.id)}
                          >
                            X
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p>No currencies yet :(</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalBriefcase;
