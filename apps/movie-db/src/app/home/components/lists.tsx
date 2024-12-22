'use client';

import useSwr from 'swr';
import { fetchLists } from '@/services/account';
import { Select, Spinner } from '@tbergq/components';
import { Suspense, SyntheticEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import List from './list';

export default function Lists() {
  const searchParams = useSearchParams();
  const listId = searchParams.get('listId');
  const listResponse = useSwr('lists', fetchLists);

  const data = listResponse.data?.results ?? [];
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    const listId = e.currentTarget.value;
    router.push(`${pathname}?listId=${listId}`);
  };
  return (
    <>
      <Select
        label="Select your list"
        name="lists"
        options={data.map(list => ({ value: list.id.toString(), text: list.name }))}
        onChange={handleChange}
        value={listId ?? ''}
      />
      <Suspense fallback={<Spinner />}>
        <List />
      </Suspense>
    </>
  );
}
