import {createContext, useContext} from 'react';
import {Text as RNText} from 'react-native';

import * as Slot from '@rn-primitives/slot';

import {cn} from '~/lib/utils';

export const TextClassContext = createContext<string | undefined>(undefined);

export function Text({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
}) {
  const textClass = useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn(
        'text-base text-foreground web:select-text',
        textClass,
        className,
      )}
      {...props}
    />
  );
}
