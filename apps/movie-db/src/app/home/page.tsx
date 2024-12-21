import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId');
  console.log('sessionId', sessionId);
  return (
    <div>
      <h1>Home</h1>
      <div>sessionId: {sessionId?.value ?? 'no session'}</div>
    </div>
  );
}
