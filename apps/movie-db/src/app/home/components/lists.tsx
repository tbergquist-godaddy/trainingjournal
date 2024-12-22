'use client';

import useSwr from 'swr';
import { fetchLists } from '@/services/account';
import { Select } from '@tbergq/components';
import { SyntheticEvent, useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Lists() {
  const listResponse = useSwr('lists', fetchLists, { suspense: true });
  const data = listResponse.data?.results ?? [];
  const searchParams = useSearchParams();
  const [selectedList, setSelectedList] = useState<string>(searchParams.get('listId') ?? '');
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const handleChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    const listId = e.currentTarget.value;
    startTransition(() => {
      setSelectedList(listId);
      router.push(`${pathname}?listId=${listId}`);
    });
  };
  return (
    <Select
      label="Select your list"
      name="lists"
      options={data.map(list => ({ value: list.id.toString(), text: list.name }))}
      onChange={handleChange}
      value={selectedList}
    />
  );
}
