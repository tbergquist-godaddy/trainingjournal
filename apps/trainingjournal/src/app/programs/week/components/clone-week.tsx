'use client';

import { Button } from '@tbergq/components';
import cloneWeekAction from '../actions/clone-week';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

type Props = {
  weekId: string;
};

function CloneWeekButton() {
  const { pending } = useFormStatus();
  return (
    <Button loading={pending} buttonSize="small" variant="tertiary" type="submit">
      Clone week
    </Button>
  );
}
export default function CloneWeek({ weekId }: Props) {
  const [, formAction] = useActionState(cloneWeekAction, null);
  return (
    <form action={formAction}>
      <input type="hidden" name="weekId" value={weekId} />
      <CloneWeekButton />
    </form>
  );
}
