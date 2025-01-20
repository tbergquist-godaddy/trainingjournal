'use client';
import { HTMLProps, ReactNode, forwardRef } from 'react';

import buttonStyles from './button.module.css';
import Spinner from '../spinner/spinner';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

type AnchorProps = HTMLProps<HTMLAnchorElement> & {
  href: string;
  type: undefined;
};

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'tertiary';

type Props = (ButtonProps | AnchorProps) & {
  variant?: ButtonVariant;
  loading?: boolean;
  buttonSize?: 'small' | 'medium';
};

export default forwardRef(function Button(
  {
    children,
    variant = 'primary',
    buttonSize = 'medium',
    type = 'button',
    href,
    form,
    loading = false,
    onClick,
    disabled,
  }: Props,
  ref,
) {
  const Component = href != null ? 'a' : 'button';
  const isDisabled = loading || disabled;
  return (
    <div>
      <Component
        type={href != null ? undefined : type}
        data-size={buttonSize}
        data-type={variant}
        className={buttonStyles.button}
        href={href}
        form={form}
        // @ts-expect-error: typing this is hard
        ref={ref}
        aria-disabled={isDisabled}
        aria-label={isDisabled ? 'Loading' : undefined}
        aria-busy={isDisabled}
        onClick={e => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          // @ts-expect-error: typing this is too hard
          onClick?.(e);
        }}
      >
        <span>{loading ? <Spinner /> : children}</span>
      </Component>
    </div>
  );
});
