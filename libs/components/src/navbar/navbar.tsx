import styles from './navbar.module.css';
import Container from '../container/container';
import { ReactNode } from 'react';

type Props = {
  right?: ReactNode;
  left?: ReactNode;
};

export default function Navbar({ left, right }: Props) {
  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.flex}>
          <div>{left}</div>
          <div>{right}</div>
        </div>
      </Container>
    </nav>
  );
}
