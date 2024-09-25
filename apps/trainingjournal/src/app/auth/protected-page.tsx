import { ReactNode } from 'react';
import { getSSRSessionHelper } from './ssr-session';
import { redirect } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export default async function ProtectedPage({ children }: Props) {
  const { accessTokenPayload } = await getSSRSessionHelper();
  if (accessTokenPayload == null) {
    redirect('/login');
  }
  return <>{children}</>;
}
