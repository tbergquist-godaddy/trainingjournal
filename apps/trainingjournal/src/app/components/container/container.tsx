import { PropsWithChildren } from 'react';
import styles from './container.module.css';
import clsx from 'clsx';

type Props = {
  className?: string;
};

export default function Container({
  children,
  className,
}: PropsWithChildren<Props>) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}
