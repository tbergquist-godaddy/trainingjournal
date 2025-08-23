import { fetchListDetails, fetchLists } from '@/services/account';
import { Spinner } from '@tbergq/components';
import { Suspense } from 'react';
import Lists from './components/lists';
import { SWRConfig, unstable_serialize } from 'swr';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const listId = params.listId ?? '';

  return (
    <SWRConfig
      value={{
        fallback: {
          lists: fetchLists(),
          [unstable_serialize(['list', listId])]: fetchListDetails(Number(listId)),
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


