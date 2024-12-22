'use client';

import { HTMLProps, useId } from 'react';
import Box from '../box/box';
import styles from './select.module.css';
import { FaChevronDown } from 'react-icons/fa';

type Props = HTMLProps<HTMLSelectElement> & {
  label: string;
  options: Array<{ value: string; text: string }>;
  name: string;
  invalid?: boolean;
  error?: { message?: string } | undefined;
};

export type SelectProps = Props;

export default function Select({ label, name, options, invalid, error, ...rest }: Props) {
  const id = useId();

  return (
    <Box display="flex" direction="column" gap={1}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.selectWrapper}>
        <select
          {...rest}
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
