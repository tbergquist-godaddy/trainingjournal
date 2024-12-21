import Link from 'next/link';
import styles from './navbar.module.css';
import { Container } from '@tbergq/components';
import Logout from './logout';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.flex}>
          <div>
            <Link className={styles.brand} href="/home">
              Trainingjournal
            </Link>
          </div>
          <div>
            <Logout />
          </div>
        </div>
      </Container>
    </nav>
  );
}
