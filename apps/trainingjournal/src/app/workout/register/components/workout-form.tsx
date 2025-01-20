'use client';

import { ReactNode, useActionState } from 'react';
import { createWorkoutAction } from '../../action/workout-actions';
import { Box, Button, ButtonVariant } from '@tbergq/components';
import WithFormLoadingState from '@/components/with-form-loading-state';

type Props = {
  children?: ReactNode;
  actionText?: string;
  actionVariant?: ButtonVariant;
};

export default function WorkoutForm({
  children,
  actionText = 'Create Workout',
  actionVariant = 'primary',
}: Props) {
  const [, formAction] = useActionState(createWorkoutAction, null);

  return (
    <form action={formAction}>
      <Box display="flex" direction="column" gap={4}>
        {children}
        <WithFormLoadingState>
          {pending => (
            <Button loading={pending} type="submit" variant={actionVariant}>
              {actionText}
            </Button>
          )}
        </WithFormLoadingState>
      </Box>
    </form>
  );
}
