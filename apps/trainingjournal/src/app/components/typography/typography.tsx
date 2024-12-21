import { PropsWithChildren, HTMLElementType } from 'react';
import styles from './typography.module.css';

type Props = {
  as?: HTMLElementType;
};

export default function Typography({ children, as = 'p' }: PropsWithChildren<Props>) {
  const Component = as;
  return <Component className={styles.typography}>{children}</Component>;
}
