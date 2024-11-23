import chevron from './chevron.svg';
import Image from 'next/image';
import styles from './chevron.module.css';

type Props = {
  alt?: string;
  direction: 'up' | 'down' | 'left' | 'right';
};

export default function Chevron({ alt = '', direction }: Props) {
  return (
    <span data-direction={direction} className={styles.chevron}>
      <Image
        role={alt === '' ? 'presentation' : undefined}
        alt={alt}
        src={chevron.src}
        height={15}
        width={15}
      />
    </span>
  );
}
