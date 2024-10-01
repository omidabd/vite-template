import React from 'react';
import clsx from 'clsx';
import { Button, Divider, Menu } from '@mantine/core';
import { Overflow, OverflowProps } from '../components/overflow';
import { OverflowItem, OverflowItemProps } from '../components/overflow-item';
import { useIsOverflowGroupVisible } from '../use-is-overflow-group-visible';
import { useIsOverflowItemVisible } from '../use-is-overflow-item-visible';
import { useOverflowMenu } from '../use-overflow-menu';
import classes from './all.module.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Dividers = (props: Omit<OverflowProps, 'children'>) => {
  return (
    <Overflow {...props}>
      <div className={clsx(classes.container, classes.resizableArea)}>
        <OverflowItem id="1" groupId="1">
          <Button variant="default" miw="min-content">
            Item 1
          </Button>
        </OverflowItem>
        <OverflowGroupDivider groupId="1" />
        <OverflowItem id="2" groupId="2">
          <Button variant="default" miw="min-content">
            Item 2
          </Button>
        </OverflowItem>
        <OverflowGroupDivider groupId="2" />
        <OverflowItem id="3" groupId="3">
          <Button variant="default" miw="min-content">
            Item 3
          </Button>
        </OverflowItem>
        <OverflowItem id="4" groupId="3">
          <Button variant="default" miw="min-content">
            Item 4
          </Button>
        </OverflowItem>
        <OverflowGroupDivider groupId="3" />
        <OverflowItem id="5" groupId="4">
          <Button variant="default" miw="min-content">
            Item 5
          </Button>
        </OverflowItem>
        <OverflowItem id="6" groupId="4">
          <Button variant="default" miw="min-content">
            Item 6
          </Button>
        </OverflowItem>
        <OverflowItem id="7" groupId="4">
          <Button variant="default" miw="min-content">
            Item 7
          </Button>
        </OverflowItem>
        <OverflowGroupDivider groupId="4" />
        <OverflowItem id="8" groupId="5">
          <Button variant="default" miw="min-content">
            Item 8
          </Button>
        </OverflowItem>
        <OverflowMenu
          itemIds={[
            '1',
            'divider-1',
            '2',
            'divider-2',
            '3',
            '4',
            'divider-3',
            '5',
            '6',
            '7',
            'divider-4',
            '8',
          ]}
        />
      </div>
    </Overflow>
  );
};

const OverflowGroupDivider: React.FC<{
  groupId: string;
}> = (props) => {
  const isGroupVisible = useIsOverflowGroupVisible(props.groupId);

  if (isGroupVisible === 'hidden') {
    return null;
  }

  // return (
  //   <div
  //     style={{
  //       flexGrow: 0,
  //       // marginInline: '4px',
  //       width: 3,
  //       minWidth: 3,
  //       backgroundColor: 'red',
  //     }}
  //   />
  // );
  return (
    <Divider
      orientation="vertical"
      size="md"
      // style={{
      //   flexGrow: 0,
      //   marginInline: '4px',
      // }}
    />
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
          // This is purely a simplified convention for documentation examples
          // Could be done in other ways too
          if (typeof i === 'string' && i.startsWith('divider')) {
            const groupId = i.split('-')[1];
            return <OverflowMenuDivider key={i} id={groupId} />;
          }
          return <OverflowMenuItem key={i} id={i} />;
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

const OverflowMenuDivider: React.FC<{
  id: string;
}> = (props) => {
  const isGroupVisible = useIsOverflowGroupVisible(props.id);

  if (isGroupVisible === 'visible') {
    return null;
  }

  return <Menu.Divider />;
};
