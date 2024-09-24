'use client';

import { useSessionContext } from 'supertokens-auth-react/recipe/session';

export default function Index() {
  const session = useSessionContext();
  if (session.loading === true) {
    return null;
  }
  if (session.doesSessionExist === false) {
    return null;
  }

  return (
    <div>
      <pre>user: {session.userId}</pre>
    </div>
  );
}
