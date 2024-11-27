import List from '@/components/list/list';
import Typography from '@/components/typography/typography';
import { getPlannedExercises } from '@/services/planned-exercise-service';

type Props = {
  dayId: string;
};

export default async function PlannedExerciseList({ dayId }: Props) {
  const plannedExercises = await getPlannedExercises(dayId);
  console.log({ plannedExercises });
  if (plannedExercises.length === 0) {
    return <Typography>No exercises yet, add your first in the form above</Typography>;
  }
  return (
    <List>
      {plannedExercises.map(plannedExercise => (
        <List.Item key={plannedExercise.id}>
          {plannedExercise.exercise.name} - {plannedExercise.sets} x {plannedExercise.reps}
        </List.Item>
      ))}
    </List>
  );
}
