'use client';

import { Button } from '@tbergq/components';
import { createDayAction } from './actions/day';
import { useActionState } from 'react';

type Props = {
  weekId: string;
  count: number;
};
export default function AddDay({ weekId, count }: Props) {
  const [, formAction] = useActionState(createDayAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="weekId" value={weekId} />
      <input type="hidden" name="name" value={`Day ${count + 1}`} />
      <Button buttonSize="small" type="submit">
        Add Day
      </Button>
    </form>
  );
}
