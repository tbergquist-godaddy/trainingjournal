import Section from '../../components/layout/section';
import List from '../../components/list/list';
import Typography from '../../components/typography/typography';
import Link from 'next/link';
import { getExercises } from '../../services/exercises/exercise-service';
import styles from './exercise-list.module.css';

export default async function ExerciseList() {
  const exercises = await getExercises();
  return (
    <Section>
      <List>
        {exercises?.map((exercise) => (
          <List.Item className={styles.listItem} key={exercise.id}>
            <Link
              className={styles.exerciseLink}
              href={`/exercises/edit/${exercise.id}`}
            >
              <Typography as="span" key={exercise.id}>
                {exercise.name}
              </Typography>
            </Link>
          </List.Item>
        ))}
      </List>
    </Section>
  );
}
