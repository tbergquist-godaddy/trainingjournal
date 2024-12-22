import fetch from '@/services/fetcher';
import * as zod from 'zod';

const accountSchema = zod.object({
  id: zod.number(),
});

export async function fetchAccountData() {
  try {
    const res = await fetch('/3/account');
    return accountSchema.parseAsync(await res.json());
  } catch (error) {
    console.error('error fetching account data', error);
    return null;
  }
}

const listSchema = zod.object({
  results: zod.array(
    zod.object({
      id: zod.number(),
      name: zod.string(),
    }),
  ),
});

export type AccountLists = ReturnType<typeof fetchLists>;

export async function fetchLists() {
  const account = await fetchAccountData();
  if (!account) {
    return null;
  }
  try {
    const response = await fetch(`/3/account/${account.id}/lists?page=1`);
    return listSchema.parseAsync(await response.json());
  } catch (error) {
    console.error('error fetching lists', error);
    return null;
  }
}
