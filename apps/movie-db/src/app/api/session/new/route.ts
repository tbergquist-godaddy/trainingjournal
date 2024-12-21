import fetch from '@/services/fetcher';
import { cookies } from 'next/headers';
import * as z from 'zod';
import { type NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

const sessionSchema = z
  .object({
    session_id: z.string(),
  })
  .transform(data => ({ sessionId: data.session_id }));

export async function GET(request: NextRequest) {
  const requestToken = request.nextUrl.searchParams.get('request_token');
  const response = await fetch('/3/authentication/session/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      request_token: requestToken,
    }),
  });
  const json = await response.json();
  const { sessionId } = await sessionSchema.parseAsync(json);
  const cookieStore = await cookies();
  cookieStore.set('sessionId', sessionId, {
    httpOnly: true,
  });
  redirect('/home');
}
