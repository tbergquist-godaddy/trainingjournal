import { fetchLists } from '@/services/account';
import { Spinner } from '@tbergq/components';
import { Suspense } from 'react';
import Lists from './components/lists';
import { SWRConfig } from 'swr';

export default async function Home() {
  return (
    <SWRConfig
      value={{
        fallback: {
          lists: fetchLists(),
        },
        revalidateOnMount: false,
        revalidateOnFocus: false,
        keepPreviousData: true,
        refreshInterval: 1000 * 60 * 5, // 5 minutes
      }}
    >
      <div>
        <h1>Home</h1>
        <Suspense fallback={<Spinner />}>
          <Lists />
        </Suspense>
      </div>
    </SWRConfig>
  );
}

export const dynamic = 'force-dynamic';
