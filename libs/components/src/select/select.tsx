'use client';

import { HTMLProps, useId } from 'react';
import Box from '../box/box';
import styles from './select.module.css';
import { useController, useFormContext } from 'react-hook-form';
import { FaChevronDown } from 'react-icons/fa';

type Props = HTMLProps<HTMLSelectElement> & {
  label: string;
  options: Array<{ value: string; text: string }>;
  name: string;
};

export default function Select({ label, name, options }: Props) {
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
      <label htmlFor={id}>{label}</label>
      <div className={styles.selectWrapper}>
        <select
          {...field}
          name={name}
          id={id}
          className={styles.select}
          aria-describedby={invalid ? `error-${id}` : undefined}
          aria-invalid={invalid ? 'true' : undefined}
        >
          <option value="">--Select--</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <FaChevronDown size={14} className={styles.icon} />
      </div>
      {invalid && (
        <span id={`error-${id}`} className={styles.error}>
          {error?.message}
        </span>
      )}
    </Box>
  );
}
