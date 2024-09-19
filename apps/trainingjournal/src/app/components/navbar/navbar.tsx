import Link from 'next/link';
import styles from './navbar.module.css';
import Container from '../container/container';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container className={styles.brand}>
        <Link href="/">Trainingjournal</Link>
      </Container>
    </nav>
  );
}
