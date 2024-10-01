import * as React from 'react';
import clsx from 'clsx';
import { Button, Menu } from '@mantine/core';
import { Overflow, OverflowProps } from '../components/overflow';
import { OverflowItem, OverflowItemProps } from '../components/overflow-item';
import { useIsOverflowItemVisible } from '../use-is-overflow-item-visible';
import { useOverflowMenu } from '../use-overflow-menu';
import classes from './all.module.css';

export const Simple = (props: Omit<OverflowProps, 'children'>) => {
  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());
  return (
    <Overflow {...props}>
      <div className={clsx(classes.container, classes.resizableArea)}>
        {itemIds.map((i) => (
          <OverflowItem key={i} id={i}>
            <Button variant="outline" miw="min-content">
              Item {i}
            </Button>
          </OverflowItem>
        ))}
        <OverflowMenu itemIds={itemIds} />
      </div>
    </Overflow>
  );
};

export const SimpleEx = (props: Omit<OverflowProps, 'children'>) => {
  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow {...props}>
      <div className={clsx(classes.container, classes.resizableArea)}>
        {itemIds.map((i) => (
          <OverflowItem key={i} id={i}>
            <Button variant="default" miw="min-content">
              Item {i}
            </Button>
          </OverflowItem>
        ))}
        {/*  
        <OverflowItem id="1">
          <Button variant="default" miw="min-content">
            Item 1
          </Button>
        </OverflowItem>
        <OverflowItem id="2">
          <Button variant="default" miw="min-content">
            Item 2
          </Button>
        </OverflowItem>
        <OverflowItem id="3">
          <Button variant="default" miw="min-content">
            Item 3
          </Button>
        </OverflowItem>
        <OverflowItem id="4">
          <Button variant="default" miw="min-content">
            Item 4
          </Button>
        </OverflowItem>
        <OverflowItem id="5">
          <Button variant="default" miw="min-content">
            Item 5
          </Button>
        </OverflowItem>
        <OverflowItem id="6">
          <Button variant="default" miw="min-content">
            Item 6
          </Button>
        </OverflowItem>
        <OverflowItem id="7">
          <Button variant="default" miw="min-content">
            Item 7
          </Button>
        </OverflowItem>
        <OverflowItem id="8">
          <Button variant="default" miw="min-content">
            Item 8
          </Button>
        </OverflowItem>
        <OverflowMenu itemIds={['1', '2', '3', '4', '5', '6', '7', '8']} /> 
        */}
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
