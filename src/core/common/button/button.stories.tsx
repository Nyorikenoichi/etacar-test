import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from './button';
import { ButtonVariants } from '../../lib/constants/buttonVariants';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => (
  <div className="modal">
    <Button {...args} />
  </div>
);

export const Add = Template.bind({});
Add.args = {
  variant: ButtonVariants.add,
  children: 'Add',
};

export const Close = Template.bind({});
Close.args = {
  variant: ButtonVariants.close,
  children: 'X',
};
