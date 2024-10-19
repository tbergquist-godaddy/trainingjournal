import './global.css';
import Navbar from './components/navbar/navbar';
import { SuperTokensProvider } from './components/supertokens-provider';
import Container from './components/container/container';

export const metadata = {
  title: 'Welcome to trainingjournal',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SuperTokensProvider>
        <body>
          <title>Trainingjournal</title>
          <Navbar />
          <Container>
            <div className="layout__app-container">{children}</div>
          </Container>
        </body>
      </SuperTokensProvider>
    </html>
  );
}
