'use client';

import { useController, useFormContext } from 'react-hook-form';
import { Select, SelectProps } from '@tbergq/components';

type Props = Omit<SelectProps, 'invalid' | 'error'>;
export default function RHFSelect(props: Props) {
  const { control } = useFormContext();

  const {
    field: { ref, ...field },
    fieldState: { invalid, error },
  } = useController({
    name: props.name,
    control,
  });
  return <Select {...props} {...field} invalid={invalid} error={error} />;
}
