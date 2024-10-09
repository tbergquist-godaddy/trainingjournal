import { HTMLProps, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

import buttonStyles from './button.module.css';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

type AnchorProps = HTMLProps<HTMLAnchorElement> & {
  href: string;
  type: undefined;
};

type Props = (ButtonProps | AnchorProps) & {
  variant?: 'primary' | 'secondary';
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  href,
}: Props) {
  const Component = href != null ? 'a' : 'button';
  return (
    <Component
      type={href != null ? undefined : type}
      data-type={variant}
      className={clsx(buttonStyles.button)}
      href={href}
    >
      <span>{children}</span>
    </Component>
  );
}
