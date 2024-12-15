'use client';

import {
  Children,
  createContext,
  isValidElement,
  ReactNode,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './accordion.module.css';
import Chevron from '../icons/chevron/chevron';

type Props = {
  children: ReactNode;
};

type AccordionContextType = {
  register: (index: number, ref: HTMLElement) => void;
  closeOthers: (index: number) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

const AccordionProvider = ({ children }: Props) => {
  const [refMap, setRefMap] = useState<Map<number, HTMLElement>>(new Map());

  const register = useCallback((index: number, ref: HTMLElement) => {
    setRefMap(map => new Map(map).set(index, ref));
  }, []);

  const closeOthers = useCallback(
    (index: number) => {
      refMap.forEach((ref, i) => {
        if (i !== index && ref.hasAttribute('open')) {
          ref.removeAttribute('open');
        }
      });
    },
    [refMap],
  );
  const state = useMemo(() => ({ register, closeOthers }), [register, closeOthers]);
  return <AccordionContext.Provider value={state}>{children}</AccordionContext.Provider>;
};

const useAccordion = () => {
  const context = use(AccordionContext);
  if (context === undefined) {
    throw new Error('useAccordion must be used within a AccordionProvider');
  }
  return context;
};

export default function Accordion({ children }: Props) {
  return (
    <AccordionProvider>
      <div className={styles.accordion}>
        {Children.map(children, (child, i) =>
          isValidElement(child) ? <child.type {...child.props} index={i} /> : null,
        )}
      </div>
    </AccordionProvider>
  );
}

type ItemProps = Props & {
  title: ReactNode;
  index?: number;
};

export function AccordionItem({ title, children, index }: ItemProps) {
  const { register, closeOthers } = useAccordion();
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && index != undefined) {
      register(index, ref.current);
    }
  }, [register, index]);

  return (
    <details
      ref={ref}
      onToggle={e => {
        if ('newState' in e && e.newState === 'open' && index != null) {
          closeOthers(index);
        }
      }}
      className={styles.accordionItem}
    >
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
