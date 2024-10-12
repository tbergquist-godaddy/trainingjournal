import { ReactNode } from 'react';
import styles from './grid.module.css';
import clsx from 'clsx';

type LayoutProps = {
  layout?: 'fluid';
  min: string;
};
type Props = (LayoutProps | { [key: string]: never }) & {
  children: ReactNode;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export default function Grid({ children, layout, min, gap }: Props) {
  return (
    <div
      className={clsx(styles.grid, layout != null && styles[layout])}
      style={{
        // @ts-expect-error: this is actually allowed
        '--grid-min': min,
      }}
      data-gap={gap}
    >
      {children}
    </div>
  );
}
