import React, {useCallback, useRef} from 'react';
import {type LayoutRectangle, type LayoutChangeEvent} from 'react-native';

import {Button, ButtonProps} from '~/components/button';
import {Text} from '~/components/text';
import {Copy, Trash2} from '~/lib/icons';
import {cn} from '~/lib/utils';
import {useAppSelector} from '~/store/hooks';

import type {ActionLayouts} from '../../types';

interface ElementActionsProps {
  onLayoutChange: (layouts: ActionLayouts) => void;
  placement?: 'bottom' | 'top';
}

export const ElementActions: React.FC<ElementActionsProps> = ({
  onLayoutChange,
  placement = 'bottom',
}) => {
  const draggingElementId = useAppSelector(
    state => state.meme.draggingElementId,
  );

  const duplicateLayoutRef = useRef<LayoutRectangle | null>(null);
  const removeLayoutRef = useRef<LayoutRectangle | null>(null);

  const handleLayoutChange = useCallback(() => {
    if (duplicateLayoutRef.current && removeLayoutRef.current) {
      onLayoutChange({
        duplicate: duplicateLayoutRef.current,
        remove: removeLayoutRef.current,
      });
    }
  }, [onLayoutChange]);

  const handleDuplicateLayout = useCallback(
    (event: LayoutChangeEvent) => {
      event.currentTarget.measureInWindow((x, y, width, height) => {
        duplicateLayoutRef.current = {height, width, x, y};
        handleLayoutChange();
      });
    },
    [handleLayoutChange],
  );

  const handleRemoveLayout = useCallback(
    (event: LayoutChangeEvent) => {
      event.currentTarget.measureInWindow((x, y, width, height) => {
        removeLayoutRef.current = {height, width, x, y};
        handleLayoutChange();
      });
    },
    [handleLayoutChange],
  );

  if (!draggingElementId) {
    return null;
  }

  const verticalPlacementClassName = placement === 'top' ? 'top-2' : 'bottom-2';

  return (
    <>
      <ActionButton
        className={`${verticalPlacementClassName} left-1`}
        onLayout={handleDuplicateLayout}>
        <Copy className="text-primary" />
        <Text className="text-primary text-xs">Drop to Duplicate</Text>
      </ActionButton>
      <ActionButton
        className={`${verticalPlacementClassName} right-1`}
        onLayout={handleRemoveLayout}>
        <Text className="text-destructive text-xs">Drop to remove</Text>
        <Trash2 className="text-destructive" />
      </ActionButton>
    </>
  );
};

type ActionButtonProps = Pick<
  ButtonProps,
  'children' | 'className' | 'onLayout'
>;

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  className,
  onLayout,
}) => {
  return (
    <Button
      className={cn(
        'absolute bg-background/70 backdrop-blur-sm rounded-lg shadow-background shadow-lg p-2 flex-row',
        className,
      )}
      onLayout={onLayout}
      variant="ghost">
      {children}
    </Button>
  );
};
