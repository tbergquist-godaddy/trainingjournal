'use client';

import Box from '../box/box';
import styles from './text-input.module.css';
import { HTMLProps, useId } from 'react';

type Props = HTMLProps<HTMLInputElement> & {
  label: string;
  name: string;
  invalid?: boolean;
  error?: { message?: string } | undefined;
};

export default function TextInput({ label, name, type = 'text', invalid, error, ...rest }: Props) {
  const id = useId();

  return (
    <Box display="flex" direction="column" gap={1}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        {...rest}
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
