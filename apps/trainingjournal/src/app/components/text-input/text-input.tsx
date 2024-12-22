'use client';
import { useController, useFormContext } from 'react-hook-form';
import { Box } from '@tbergq/components';
import styles from './text-input.module.css';
import { HTMLProps, useId } from 'react';

type Props = HTMLProps<HTMLInputElement> & {
  label: string;
  name: string;
};

export default function TextInput({ label, name, type = 'text' }: Props) {
  const id = useId();
  const { control } = useFormContext();

  const {
    field: { ref, ...field },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Box display="flex" direction="column" gap={1}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        {...field}
        className={styles.input}
        type={type}
        name={name}
        id={id}
        aria-describedby={invalid ? `error-${id}` : undefined}
        aria-invalid={invalid ? 'true' : undefined}
      />
      {invalid && (
        <span id={`error-${id}`} className={styles.error}>
          {error?.message}
        </span>
      )}
    </Box>
  );
}
