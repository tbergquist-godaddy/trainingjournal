import { AccountLists } from '@/services/account';
import { use } from 'react';

type Props = {
  list: AccountLists;
};

export default function Lists({ list }: Props) {
  const listResponse = use(list);
  return <pre>{JSON.stringify(listResponse, null, 2)}</pre>;
}
