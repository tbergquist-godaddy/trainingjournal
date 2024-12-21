'use client';
import TextInput from '../../components/text-input/text-input';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { State } from '../create/components/create-exercise-action';
import { exerciseSchema } from '../schema/exercise-schema';
import Section from '../../components/layout/section';
import Box from '../../components/box/box';
import { Button } from '@tbergq/components';
import Link from 'next/link';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export type Exercise = {
  name: string;
  id?: string;
};

type Props = {
  defaultValues: Exercise;
  action: (exercise: FormData) => Promise<State>;
  actionText: string;
};
export default function ExerciseForm({ action, defaultValues, actionText }: Props) {
  console.log({ defaultValues });
  const router = useRouter();
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(exerciseSchema),
    mode: 'all',
  });
  const [pending, startTransaction] = useTransition();
  return (
    <FormProvider {...methods}>
      <form
        action={async values => {
          const valid = await methods.trigger();
          if (!valid) {
            return;
          }
          startTransaction(async () => {
            const state = await action(values);
            if (state.status === 'success') {
              router.push('/exercises');
            }
          });
        }}
      >
        <Section>
          <TextInput label="Name" name="name" />
          {defaultValues.id != null && <input type="hidden" name="id" value={defaultValues.id} />}
        </Section>
        <Section>
          <Box display="flex" gap={4}>
            <Button loading={pending} type="submit">
              {actionText}
            </Button>
            <Link href="/exercises" legacyBehavior={true}>
              <Button variant="secondary" href="/exercises">
                Cancel
              </Button>
            </Link>
          </Box>
        </Section>
      </form>
    </FormProvider>
  );
}
