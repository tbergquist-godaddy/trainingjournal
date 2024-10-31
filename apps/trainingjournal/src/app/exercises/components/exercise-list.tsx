import Section from '../../components/layout/section';
import List from '../../components/list/list';
import Typography from '../../components/typography/typography';
import { getExercises } from '../../services/exercises/exercise-service';

export default async function ExerciseList() {
  const exercises = await getExercises();
  return (
    <Section>
      <List>
        {exercises?.map((exercise) => (
          <List.Item key={exercise.id}>
            <List.Link href={`/exercises/edit/${exercise.id}`}>
              <Typography as="span" key={exercise.id}>
                {exercise.name}
              </Typography>
            </List.Link>
          </List.Item>
        ))}
      </List>
    </Section>
  );
}
