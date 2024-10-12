import { ReactHTML, ReactNode } from 'react';
import styles from './list.module.css';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  as?: keyof ReactHTML;
  className?: string;
};

export default function List({ children, className, as = 'ul' }: Props) {
  const Component = as;
  return (
    <Component className={clsx(styles.list, className)}>{children}</Component>
  );
}

function ListItem({ children, className, as = 'li' }: Props) {
  const Component = as;
  return (
    <Component className={clsx(styles.listItem, className)}>
      {children}
    </Component>
  );
}

List.Item = ListItem;
