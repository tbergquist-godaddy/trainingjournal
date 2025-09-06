'use client';

import { use, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@tbergq/components';
import ExerciseGraph from './exercise-graph';
import type { GetJournalEntriesForGraph } from '@/services/exercises/exercise-service';

type Props = {
  exerciseId: string;
  initialDataPromise: Promise<GetJournalEntriesForGraph>;
};

export default function ExerciseGraphClient({ exerciseId, initialDataPromise }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const initialData = use(initialDataPromise);

  const handleDateFilterChange = (startDate: string, endDate: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (startDate) params.set('startDate', startDate);
      if (endDate) params.set('endDate', endDate);

      const queryString = params.toString();
      const url = `/exercises/graph/${exerciseId}${queryString ? `?${queryString}` : ''}`;

      router.push(url);
    });
  };

  return (
    <Box opacity={isPending ? 'medium' : undefined} transition="opacity">
      <ExerciseGraph
        initialData={initialData}
        exerciseId={exerciseId}
        onDateFilterChange={handleDateFilterChange}
      />
      {isPending && (
        <Box
          position="fixed"
          top="20px"
          right="20px"
          backgroundColor="primary"
          color="white"
          padding={4}
          borderRadius="default"
          fontSize="small"
        >
          Updating graph...
        </Box>
      )}
    </Box>
  );
}
