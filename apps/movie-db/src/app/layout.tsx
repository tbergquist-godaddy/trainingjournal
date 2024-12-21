import './global.css';

export const metadata = {
  title: 'Welcome to movie-db',
  description: 'Lookup moves and stuff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
