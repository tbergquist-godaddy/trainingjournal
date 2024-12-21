'use client';

import Link from 'next/link';
import { signOut } from 'supertokens-auth-react/recipe/passwordless';
import type { MouseEvent } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

export default function Navbar() {
  const session = useSessionContext();
  async function onLogout(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    await signOut();
    window.location.href = '/';
  }
  if (session.loading === true) {
    return null;
  }
  if (session.loading === false && session.doesSessionExist === false) {
    return <Link href="/login">login</Link>;
  }
  return (
    <Link href="/" onClick={onLogout}>
      Sign out
    </Link>
  );
}
