import React from 'react';
import clsx from 'clsx';
import { Button, Divider, Menu } from '@mantine/core';
import { Overflow, OverflowProps } from '../components/Overflow';
import { OverflowDivider } from '../components/OverflowDivider/OverflowDivider';
import { OverflowItem, OverflowItemProps } from '../components/OverflowItem';
import { useIsOverflowGroupVisible } from '../useIsOverflowGroupVisible';
import { useIsOverflowItemVisible } from '../useIsOverflowItemVisible';
import { useOverflowMenu } from '../useOverflowMenu';
import classes from './all.module.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LargeDividers = (props: Omit<OverflowProps, 'children'>) => {
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
  return (
    <OverflowDivider groupId={props.groupId}>
      {/* <div
        style={{
          flexGrow: 0,
          maxWidth: '4px',
          minWidth: '4px',
          marginInline: 4,
          backgroundColor: 'red',
        }}
      /> */}
      <div
      // style={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   maxWidth: '8px',
      //   minWidth: '8px',
      //   textAlign: 'center',
      // }}
      >
        <div style={{ width: 4, height: '100%', backgroundColor: 'red' }} />
      </div>
    </OverflowDivider>
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
          variant="outline"
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
