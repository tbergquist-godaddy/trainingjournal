import { ReactNode } from 'react';
import styles from './accordion.module.css';
import Chevron from '../icons/chevron/chevron';

type Props = {
  children: ReactNode;
};

export default function Accordion({ children }: Props) {
  return <div className={styles.accordion}>{children}</div>;
}

type ItemProps = Props & {
  title: ReactNode;
};

export function AccordionItem({ title, children }: ItemProps) {
  return (
    <details className={styles.accordionItem}>
      <summary>
        <span>{title}</span>
        <span className={styles.accordionItem_Expand}>
          <Chevron direction="down" />
        </span>
      </summary>
      <div className={styles.accordionItem_HiddenContent}>{children}</div>
    </details>
  );
}
