import { ReactNode } from 'react';
import styles from './box.module.css';
import type { Property } from 'csstype';

type Props = {
  children: ReactNode;
  display?: Property.Display;
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export default function Box({
  children,
  display,
  alignItems,
  justifyContent,
  gap,
}: Props) {
  return (
    <div
      data-display={display}
      data-align-items={alignItems}
      data-justify-content={justifyContent}
      data-gap={gap}
      className={styles.box}
    >
      {children}
    </div>
  );
}
