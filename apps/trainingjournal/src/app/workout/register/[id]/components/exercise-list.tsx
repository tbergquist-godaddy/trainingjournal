'use client';

import List from '@/components/list/list';
import { useRegisterContext } from './register-context';
import { Box, Button } from '@tbergq/components';
import { FaPen } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import styles from './exercise-list.module.css';

export default function ExerciseList() {
  const { workout } = useRegisterContext();
  const params = useSearchParams();
  const handleClick = (id: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('exerciseId', id);
    window.history.pushState(null, '', `?${searchParams.toString()}`);
  };
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
            <Button onClick={() => handleClick(id)} buttonSize="small">
              <FaPen />
            </Button>
          </Box>
        </List.Item>
      ))}
    </List>
  );
}
