'use client';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../../components/text-input/text-input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Section from '../../components/layout/section';
import Button from '../../components/button/button';
import Box from '../../components/box/box';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

const programSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});
type Props = {
  action: (data: FormData) => Promise<unknown>;
  program?: {
    id: string;
    name: string;
  } | null;
  actionText?: string;
};

export default function ProgramForm({ action, program, actionText = 'Create Program' }: Props) {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      name: program?.name ?? '',
    },
    mode: 'all',
    resolver: zodResolver(programSchema),
  });
  const [pending, startTransition] = useTransition();
  return (
    <FormProvider {...methods}>
      <form
        action={async (formData: FormData) => {
          const isValid = await methods.trigger();
          if (!isValid) {
            return;
          }
          startTransition(() => {
            action(formData).then(() => {
              router.push('/programs');
            });
          });
        }}
      >
        <Section>
          <TextInput name="name" label="Name" />
          {program?.id && <input type="hidden" name="id" value={program.id} />}
        </Section>
        <Section>
          <Box display="flex" gap={4}>
            <Button loading={pending} type="submit">
              {actionText}
            </Button>
            <Button href="/programs" variant="secondary">
              Cancel
            </Button>
          </Box>
        </Section>
      </form>
    </FormProvider>
  );
}
