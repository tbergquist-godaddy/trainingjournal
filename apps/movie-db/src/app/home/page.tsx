import { fetchLists } from '@/services/account';
import { Spinner } from '@tbergq/components';
import { Suspense } from 'react';
import Lists from './components/lists';

export default async function Home() {
  const list = fetchLists();
  return (
    <div>
      <h1>Home</h1>
      <Suspense fallback={<Spinner />}>
        <Lists list={list} />
      </Suspense>
    </div>
  );
}

export const dynamic = 'force-dynamic';
