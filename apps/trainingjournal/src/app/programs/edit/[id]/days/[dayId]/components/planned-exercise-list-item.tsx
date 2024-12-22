import { Box } from '@tbergq/components';
import List from '@/components/list/list';
import type { PlannedExercise } from '@/services/planned-exercise-service';
import DeletePlannedExerciseItem from './delete-planned-exericse';
import ReorderExercise from './reorder-exercise';

type Props = {
  plannedExercise: Awaited<PlannedExercise>[0];
  isFirst: boolean;
  isLast: boolean;
};
export default function PlannedExerciseItem({ plannedExercise, ...rest }: Props) {
  return (
    <List.Item key={plannedExercise.id}>
      <Box display="flex" direction="row" justifyContent="space-between" flexWrap="wrap">
        <span>
          {plannedExercise.exercise.name} - {plannedExercise.sets} x {plannedExercise.reps}
        </span>
        <Box display="flex" gap={2}>
          <ReorderExercise {...rest} id={plannedExercise.id} />
          <DeletePlannedExerciseItem name={plannedExercise.exercise.name} id={plannedExercise.id} />
        </Box>
      </Box>
    </List.Item>
  );
}
