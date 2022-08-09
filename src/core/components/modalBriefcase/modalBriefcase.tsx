import React from 'react';
import { formatFloat } from '../../helpers/formatFloat';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { removeCurrency } from '../../redux/slices/briefcaseSlice';
import { useBriefcaseStats } from '../../hooks/useBriefcaseValues';
import { useTranslation } from 'react-i18next';

interface ModalBriefcaseProps {
  setIsOpen: (option: boolean) => void;
}

export const ModalBriefcase = ({ setIsOpen }: ModalBriefcaseProps) => {
  const dispatch = useAppDispatch();
  const briefcase = useAppSelector((state) => state.briefcase.currencies);
  const { currentBriefcasePrice, initialBriefcasePrice } = useBriefcaseStats();
  const { t } = useTranslation();

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
          <div className="modal__heading">{t('modal_briefcase_heading')}</div>
          {briefcase.length > 0 ? (
            <>
              <p>
                {t('modal_initial_price')} ${initialBriefcasePrice.toFixed(2)}
              </p>
              <p>
                {t('modal_current_price')} ${currentBriefcasePrice.toFixed(2)}
              </p>
              <div className="crypto-table__container modal__currencies">
                <table className="crypto-table">
                  <thead>
                    <tr className="crypto-table__row crypto-table__row_header">
                      <th className="crypto-table__cell">{t('crypto_table_name')}</th>
                      <th className="crypto-table__cell">{t('crypto_table_price')}</th>
                      <th className="crypto-table__cell">{t('crypto_table_count')}</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {briefcase.map((item) => (
                      <tr className="crypto-table__row crypto-table__row_body" key={item.id}>
                        <td className="crypto-table__cell">{item.name}</td>
                        <td className="crypto-table__cell crypto-table__cell_align-left">
                          ${formatFloat(item.initialPrice)}
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
            <p>{t('modal_no_currencies')}</p>
          )}
        </div>
      </div>
    </>
  );
};
