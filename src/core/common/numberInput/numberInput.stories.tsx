import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { NumberInput, NumberInputProps } from './numberInput';

export default {
  title: 'Input',
  component: NumberInput,
} as Meta;

const Template: Story<NumberInputProps> = (args: NumberInputProps) => {
  const [value, setValue] = useState<string>('');

  return <NumberInput {...args} value={value} setValue={setValue} />;
};

export const Add = Template.bind({});
Add.args = {
  placeholder: 'Input number...',
  autoFocus: true,
};
