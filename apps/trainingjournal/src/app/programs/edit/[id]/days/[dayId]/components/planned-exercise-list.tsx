import List from '@/components/list/list';
import Typography from '@/components/typography/typography';
import { getPlannedExercises } from '@/services/planned-exercise-service';
import PlannedExerciseItem from './planned-exercise-list-item';

type Props = {
  dayId: string;
};

export default async function PlannedExerciseList({ dayId }: Props) {
  const plannedExercises = await getPlannedExercises(dayId);

  if (plannedExercises.length === 0) {
    return <Typography>No exercises yet, add your first in the form above</Typography>;
  }
  return (
    <List>
      {plannedExercises.map(plannedExercise => (
        <PlannedExerciseItem key={plannedExercise.id} plannedExercise={plannedExercise} />
      ))}
    </List>
  );
}
