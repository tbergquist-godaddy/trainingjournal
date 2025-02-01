import { PropsWithChildren, HTMLElementType } from 'react';
import styles from './typography.module.css';

type Props = {
  as?: HTMLElementType;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  type?: 'subtle';
};

export default function Typography({ children, size, as = 'p', type }: PropsWithChildren<Props>) {
  const Component = as;
  return (
    <Component className={styles.typography} data-size={size} data-type={type}>
      {children}
    </Component>
  );
}
