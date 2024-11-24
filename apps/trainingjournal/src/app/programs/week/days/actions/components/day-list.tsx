'use client';
import type { GetWeeksType } from '@/programs/week/week-service';
import List from '@/components/list/list';
import { useEditProgram } from '@/programs/edit/[id]/components/edit-program-context';

type Props = {
  days: Awaited<GetWeeksType>[0]['days'];
};

export default function DayList({ days }: Props) {
  const { programId } = useEditProgram();

  return (
    <List>
      {days.map(day => (
        <List.Item key={day.id}>
          <List.Link href={`/programs/edit/${programId}/days/${day.id}`}>{day.name}</List.Link>
        </List.Item>
      ))}
    </List>
  );
}
