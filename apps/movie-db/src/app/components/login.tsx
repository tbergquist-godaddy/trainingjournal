'use client';

import { Button } from '@tbergq/components';
import { loginAction } from '@/actions/login-action';

export default function Login() {
  return (
    <div>
      <form action={loginAction}>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
