import { ReactNode } from 'react';
import styles from './box.module.css';
import type { Property } from 'csstype';

type Props = {
  children: ReactNode;
  display?: Property.Display;
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  direction?: Property.FlexDirection;
};

export default function Box({
  children,
  display,
  alignItems,
  justifyContent,
  gap,
  direction,
}: Props) {
  return (
    <div
      data-display={display}
      data-align-items={alignItems}
      data-justify-content={justifyContent}
      data-gap={gap}
      data-direction={direction}
      className={styles.box}
    >
      {children}
    </div>
  );
}
