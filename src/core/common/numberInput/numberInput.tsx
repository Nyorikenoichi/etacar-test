import React, { ChangeEvent } from 'react';

export interface NumberInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  autoFocus: boolean;
}

const validationRegexp = /^([0-9]+)(\.)?([0-9]+)?$/;

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  setValue,
  placeholder,
  autoFocus,
}) => {
  const onInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
  };

  const onBlur = () => {
    if (value.match(validationRegexp)) {
      setValue(parseFloat(value).toString() || '');
    }
  };

  return (
    <input
      placeholder={placeholder}
      className="number-input"
      data-cy="number-input"
      autoFocus={autoFocus}
      onChange={onInputValue}
      onBlur={onBlur}
    />
  );
};
