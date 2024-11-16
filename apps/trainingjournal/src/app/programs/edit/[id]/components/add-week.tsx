'use client';

import Button from '@/components/button/button';
import addWeekAction from '@/programs/week/actions/add-week';
import { useActionState } from 'react';

type Props = {
  programId: string;
  weekCount: number;
};

export default function AddWeek({ programId, weekCount }: Props) {
  // @ts-expect-error: lets fix later
  const [, formAction] = useActionState(addWeekAction, null);

  return (
    <>
      <form action={formAction}>
        <input name="programId" type="hidden" value={programId} />
        <input name="name" type="hidden" value={`Week ${weekCount}`} />
        <Button type="submit">Add week</Button>
      </form>
    </>
  );
}
