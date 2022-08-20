import '@testing-library/jest-dom/extend-expect';
import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NumberInput } from './numberInput';

const InputContainer: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <NumberInput
        value={value}
        setValue={setValue}
        placeholder="Input number..."
        autoFocus={true}
      />
    </>
  );
};

it('NumberInput component', () => {
  render(<InputContainer />);
  const numberInput: HTMLInputElement = screen.getByRole('textbox');
  expect(numberInput).toBeInTheDocument();
  expect(numberInput).toHaveClass('number-input');

  fireEvent.change(numberInput, { target: { value: '12.345' } });
  expect(numberInput.value).toEqual('12.345');
});
