import React from 'react';
import { Button } from '@mantine/core';
import classes from './all.module.css';

export type MyButtonProps = {
  dummy?: string;
};
export const MyButton = ({ dummy }: MyButtonProps) => {
  return (
    <Button className={classes.root}>
      123{dummy} {classes?.root}
    </Button>
  );
};
