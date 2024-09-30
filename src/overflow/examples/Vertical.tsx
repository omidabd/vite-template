import * as React from 'react';
import clsx from 'clsx';
import { Button, Menu } from '@mantine/core';
import { Overflow, OverflowProps } from '../components/Overflow';
import { OverflowItem, OverflowItemProps } from '../components/OverflowItem';
import { useIsOverflowItemVisible } from '../useIsOverflowItemVisible';
import { useOverflowMenu } from '../useOverflowMenu';
import classes from './all.module.css';

export const Vertical = (props: Omit<OverflowProps, 'children'>) => {
  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());
  return (
    <Overflow {...props} overflowAxis="vertical">
      <div
        className={clsx(
          classes.containerVertical,
          classes.resizableArea,
          classes.resizableAreaVertical
        )}
      >
        {itemIds.map((i) => (
          <OverflowItem key={i} id={i}>
            <Button variant="default" className={classes.verticalItem}>
              Item {i}
            </Button>
          </OverflowItem>
        ))}
        <OverflowMenu itemIds={itemIds} />
      </div>
    </Overflow>
  );
};

const OverflowMenuItem: React.FC<Pick<OverflowItemProps, 'id'>> = (props) => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  // As an union between button props and div props may be conflicting, casting is required
  return <Menu.Item>Item {id}</Menu.Item>;
};

const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <Menu.Target>
        <Button
          ref={ref}
          rightSection={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 9l6 6l6 -6" />
            </svg>
          }
        >
          +{overflowCount} items
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {itemIds.map((i) => {
          return <OverflowMenuItem key={i} id={i} />;
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
