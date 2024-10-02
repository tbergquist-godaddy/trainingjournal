import { ReactHTML, ReactNode } from 'react';
import styles from './list.module.css';

type Props = {
  children: ReactNode;
  as?: keyof ReactHTML;
};

export default function List({ children, as = 'ul' }: Props) {
  const Component = as;
  return <Component className={styles.list}>{children}</Component>;
}

function ListItem({ children, as = 'li' }: Props) {
  const Component = as;
  return <Component className={styles.listItem}>{children}</Component>;
}

List.Item = ListItem;
