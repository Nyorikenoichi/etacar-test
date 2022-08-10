import React, { ChangeEvent, useState } from 'react';
import { CurrencyInfo } from '../../lib/interfaces/currencyInfo';
import { useAppDispatch } from '../../lib/hooks/useAppDispatch';
import { addCurrency } from '../../redux/slices/briefcaseSlice';
import { useTranslation } from 'react-i18next';

interface ModalAddCurrencyProps {
  setIsOpen: (option: boolean) => void;
  currency: CurrencyInfo | null | undefined;
}

const ModalAddCurrency = ({ setIsOpen, currency }: ModalAddCurrencyProps) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number | string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const { t } = useTranslation();

  const validationRegexp = /^([0-9]+)(\.)?([0-9]+)?$/;

  const onInputAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCount(input);
  };

  const onInputBlur = () => {
    if (typeof count === 'string' && count.match(validationRegexp) && currency) {
      setCount(parseFloat(count) || '');
    }
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onAddCurrency = () => {
    if (count.toString().match(/^([0-9]+)(\.)?([0-9]+)?$/) && currency) {
      setShowWarning(false);
      dispatch(
        addCurrency({
          id: currency.id,
          name: currency.name,
          initialPrice: parseFloat(currency.priceUsd),
          count: +count,
        })
      );
      setIsOpen(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <>
      <div className="modal__background" onClick={onCloseModal} />
      <div className="modal modal_add-currency">
        <div className="stack stack_vertical modal__container">
          <button className="close-button" onClick={onCloseModal}>
            X
          </button>
          <div className="modal__heading">
            {t('modal_currency_heading')} {currency?.name}
          </div>
          <p>{t('modal_currency_message')}</p>
          <div className="stack modal__input-area">
            <input
              autoFocus={true}
              className="modal__input"
              placeholder="Type amount..."
              value={count}
              onChange={onInputAmount}
              onBlur={onInputBlur}
            />
            <button className="add-button" onClick={onAddCurrency}>
              {t('modal_currency_button')}
            </button>
          </div>
          {showWarning && (
            <div className={'modal__warning-message'}>Please, input correct numerical value!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalAddCurrency;
