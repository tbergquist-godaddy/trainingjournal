'use server';

import fetch from '@/services/fetcher';
import { redirect } from 'next/navigation';
import * as z from 'zod';

const tokenSchema = z
  .object({
    request_token: z.string(),
  })
  .transform(data => ({ token: data.request_token }));
export async function loginAction() {
  const token = await (async () => {
    try {
      const response = await fetch('/3/authentication/token/new');
      const data = await response.json();
      const { token } = tokenSchema.parse(data);
      return token;
    } catch (error) {
      console.error(error);
      return null;
    }
  })();
  if (token == null) {
    return;
  }
  redirect(
    `https://www.themoviedb.org/authenticate/${token}?redirect_to=${encodeURIComponent('http://localhost:3002/api/session/new')}`,
  );
}
