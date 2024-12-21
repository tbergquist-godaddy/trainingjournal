import './global.css';
import { Container } from '@tbergq/components';

export const metadata = {
  title: 'Welcome to movie-db',
  description: 'Lookup moves and stuff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
