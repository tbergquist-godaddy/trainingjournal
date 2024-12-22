'use client';

import useSwr from 'swr';
import { fetchListDetails } from '@/services/account';
import { useSearchParams } from 'next/navigation';

export default function Lists() {
  const searchParams = useSearchParams();
  const listId = searchParams.get('listId');
  const list = useSwr(
    listId == null ? null : ['list', listId],
    ([, listId]) => fetchListDetails(Number(listId)),
    { suspense: true },
  );

  if (listId == null) {
    return null;
  }
  return <pre>{JSON.stringify(list, null, 2)}</pre>;
}
