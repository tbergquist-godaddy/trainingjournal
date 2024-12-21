import Link from 'next/link';
import './global.css';
import { Container, Navbar } from '@tbergq/components';

export const metadata = {
  title: 'Movie DB',
  description: 'Lookup movies and stuff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar left={<Link href="/">Movie-DB</Link>} />
        </header>
        <main>
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
