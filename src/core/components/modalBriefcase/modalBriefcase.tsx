import React from 'react';
import { formatFloat } from '../../lib/helpers/formatFloat';
import { useAppSelector } from '../../lib/hooks/useAppSelector';
import { useAppDispatch } from '../../lib/hooks/useAppDispatch';
import { removeCurrency } from '../../redux/slices/briefcaseSlice';
import { useBriefcaseStats } from '../../lib/hooks/useBriefcaseValues';
import { useTranslation } from 'react-i18next';
import { Button } from '../../common/button/button';
import { ButtonVariants } from '../../lib/constants/buttonVariants';
import { CryptoTableHeaderCell } from '../../lib/interfaces/cryptoTableHeaderCell';
import { CryptoTable } from '../../common/cryptoTable/cryptoTable';

interface ModalBriefcaseProps {
  setIsOpen: (option: boolean) => void;
}

export const ModalBriefcase: React.FC<ModalBriefcaseProps> = ({ setIsOpen }) => {
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

  const headerCells: CryptoTableHeaderCell[] = [
    {
      columnClassNames: 'crypto-table__cell',
      content: t('crypto_table_name'),
      isHidden: false,
    },
    {
      columnClassNames: 'crypto-table__cell crypto-table__cell_align-left',
      content: t('crypto_table_price'),
      isHidden: false,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: t('crypto_table_count'),
      isHidden: false,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: '',
      isHidden: false,
    },
  ];

  const bodyRowsContent: (string | JSX.Element)[][] = briefcase.map((item) => {
    const deleteButton = (
      <div
        className="crypto-table__cell_button crypto-table__cell_button-delete"
        onClick={onRemoveCurrency(item.id)}
      >
        X
      </div>
    );
    return [item.name, formatFloat(item.initialPrice), item.count.toString(), deleteButton];
  });

  return (
    <>
      <div className="modal__background" onClick={onCloseModal} />
      <div className="modal">
        <div className="stack stack_vertical modal__container">
          <Button variant={ButtonVariants.close} onClick={onCloseModal}>
            X
          </Button>
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
                <CryptoTable
                  headerCells={headerCells}
                  bodyRowsContent={bodyRowsContent}
                  rowIds={briefcase.map((item) => item.id)}
                  className="briefcase-table"
                />
              </div>
            </>
          ) : (
            <p className="modal__error-message">{t('modal_no_currencies')}</p>
          )}
        </div>
      </div>
    </>
  );
};
