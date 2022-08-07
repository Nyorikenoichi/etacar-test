import React, { ChangeEvent, useState } from 'react';
import { CurrencyInfo } from '../../interfaces/currencyInfo';

interface ModalAddCurrencyProps {
  setIsOpen: (option: boolean) => void;
  currency: CurrencyInfo | null;
}

const ModalAddCurrency = ({ setIsOpen, currency }: ModalAddCurrencyProps) => {
  const [number, setNumber] = useState<number | string>('');

  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.match(/^([0-9]+)?(\.)?([0-9]+)?$/)) {
      setNumber(input);
    }
  };

  const handleFloat = () => {
    if (typeof number === 'string') {
      setNumber(parseFloat(number) || '');
    }
  };

  const onAddCurrency = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="modal__background" onClick={() => setIsOpen(false)} />
      <div className="modal modal_add-currency">
        <div className="stack stack_vertical modal__container">
          <button className="close-button" onClick={() => setIsOpen(false)}>
            X
          </button>
          <div className="modal__heading">Adding {currency?.name}</div>
          <p>Please, enter amount of currency to add</p>
          <div className="stack">
            <input
              className="modal__input"
              placeholder="Type amount..."
              value={number}
              onChange={handleNumber}
              onBlur={handleFloat}
            />
            <button className="modal__accept-button" onClick={onAddCurrency}>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddCurrency;
