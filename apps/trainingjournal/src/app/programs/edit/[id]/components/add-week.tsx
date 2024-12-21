'use client';

import { Button } from '@tbergq/components';
import addWeekAction from '@/programs/week/actions/add-week';
import { Week } from '@prisma/client';
import { useActionState, use } from 'react';

type Props = {
  programId: string;
  weeks: Promise<Array<Week> | null>;
};

export default function AddWeek({ programId, weeks }: Props) {
  // @ts-expect-error: lets fix later
  const [, formAction] = useActionState(addWeekAction, null);
  const resolvedWeeks = use(weeks) ?? [];

  return (
    <>
      <form action={formAction}>
        <input name="programId" type="hidden" value={programId} />
        <input name="name" type="hidden" value={`Week ${resolvedWeeks.length + 1}`} />
        <Button variant="tertiary" type="submit">
          Add week
        </Button>
      </form>
    </>
  );
}
