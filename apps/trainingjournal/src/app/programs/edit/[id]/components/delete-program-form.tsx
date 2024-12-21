'use client';

import { useTransition } from 'react';
import { Button } from '@tbergq/components';
import deleteProgramAction from '../../../actions/delete-program-action';

type Props = {
  id: string;
};

export default function DeleteProgramForm({ id }: Props) {
  const [pending, startTransition] = useTransition();
  return (
    <form
      action={(formData: FormData) => {
        startTransition(() => {
          deleteProgramAction(formData);
        });
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button loading={pending} type="submit" variant="danger">
        Delete Program
      </Button>
    </form>
  );
}
