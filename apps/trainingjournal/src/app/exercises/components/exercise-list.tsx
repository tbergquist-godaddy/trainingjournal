import { getSSRUserId } from '../../auth/ssr-session';
import Section from '../../components/layout/section';
import List from '../../components/list/list';
import Typography from '../../components/typography/typography';

import { getExercises } from '../../services/exercises/exercise-service';

export default async function ExerciseList() {
  const userId = await getSSRUserId();
  const exercises = await (() => {
    if (userId == null) {
      return [];
    }
    return getExercises(userId);
  })();
  return (
    <Section>
      <List>
        {exercises?.map((exercise) => (
          <List.Item key={exercise.id}>
            <Typography key={exercise.id}>{exercise.name}</Typography>
          </List.Item>
        ))}
      </List>
    </Section>
  );
}
