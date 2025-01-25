'use client';

import List from '@/components/list/list';
import { useRegisterContext } from './register-context';
import { Box, Button } from '@tbergq/components';
import { FaPen } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import styles from './exercise-list.module.css';
import Link from 'next/link';

export default function ExerciseList() {
  const { workout } = useRegisterContext();
  const params = useSearchParams();
  const exerciseId = params.get('exerciseId');
  return (
    <List>
      {workout?.Day?.PlannedExercise.map(({ id, exercise, sets, reps }) => (
        <List.Item
          key={id}
          className={[styles.exerciseList, exerciseId === id ? styles.active : ''].join(' ')}
        >
          <Box display="flex" justifyContent="space-between">
            <div>
              {exercise.name}: {sets}&nbsp;x&nbsp;{reps}
            </div>
            <Link
              legacyBehavior={true}
              passHref={true}
              href={`/workout/register/${workout.id}?exerciseId=${id}`}
            >
              <Button href={`/workout/register/${workout.id}?exerciseId=${id}`} buttonSize="small">
                <FaPen />
              </Button>
            </Link>
          </Box>
        </List.Item>
      ))}
    </List>
  );
}
