'use client';
import { useController, useFormContext } from 'react-hook-form';
import { TextInput } from '@tbergq/components';
import { HTMLProps } from 'react';

type Props = HTMLProps<HTMLInputElement> & {
  label: string;
  name: string;
};

export default function ExtendedTextInput({ label, name, type = 'text', ...rest }: Props) {
  const { control } = useFormContext();

  const {
    field: { ref, ...field },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextInput
      {...field}
      {...rest}
      ref={ref}
      type={type}
      name={name}
      label={label}
      invalid={invalid}
      error={error}
    />
  );
}
