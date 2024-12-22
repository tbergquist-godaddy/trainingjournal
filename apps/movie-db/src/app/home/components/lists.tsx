'use client';

import useSwr from 'swr';
import { fetchLists } from '@/services/account';

export default function Lists() {
  const listResponse = useSwr('lists', fetchLists, { suspense: true });
  return <pre>{JSON.stringify(listResponse, null, 2)}</pre>;
}
