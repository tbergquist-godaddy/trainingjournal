import { PropsWithChildren, ReactHTML } from 'react';
import styles from './typography.module.css';

type Props = {
  as?: keyof ReactHTML;
};

export default function Typography({
  children,
  as = 'p',
}: PropsWithChildren<Props>) {
  const Component = as;
  return <Component className={styles.typography}>{children}</Component>;
}
