import React, { useState } from 'react';
import { CurrencyInfo } from '../../lib/interfaces/currencyInfo';
import { useAppDispatch } from '../../lib/hooks/useAppDispatch';
import { addCurrency } from '../../redux/slices/briefcaseSlice';
import { useTranslation } from 'react-i18next';
import { Button } from '../../common/button/button';
import { ButtonVariants } from '../../lib/constants/buttonVariants';
import { NumberInput } from '../../common/numberInput/numberInput';

interface ModalAddCurrencyProps {
  setIsOpen: (option: boolean) => void;
  currency: CurrencyInfo | null | undefined;
}

const ModalAddCurrency: React.FC<ModalAddCurrencyProps> = ({ setIsOpen, currency }) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const { t } = useTranslation();

  const validationRegexp = /^([0-9]+)(\.)?([0-9]+)?$/;

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onAddCurrency = () => {
    if (count.match(validationRegexp) && currency) {
      setShowWarning(false);
      dispatch(
        addCurrency({
          id: currency.id,
          name: currency.name,
          initialPrice: parseFloat(currency.priceUsd),
          count: parseFloat(count),
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
      <div className="modal modal_add-currency" data-cy="modal-add-currency">
        <div className="stack stack_vertical modal__container">
          <Button variant={ButtonVariants.close} onClick={onCloseModal}>
            X
          </Button>
          <div className="modal__heading">
            {t('modal_currency_heading')} {currency?.name}
          </div>
          <p>{t('modal_currency_message')}</p>
          <div className="stack modal__input-area">
            <NumberInput
              autoFocus={true}
              placeholder="Type amount..."
              value={count}
              setValue={setCount}
            />
            <Button variant={ButtonVariants.add} onClick={onAddCurrency}>
              {t('modal_currency_button')}
            </Button>
          </div>
          {showWarning && (
            <div className={'modal__error-message'} data-cy="modal-error-message">
              {t('modal_wrong_input')}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalAddCurrency;
