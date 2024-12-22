import { ReactNode } from 'react';
import Card from '../../components/card/card';
import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';
import { Box } from '@tbergq/components';

type Props = {
  children: ReactNode;
  href: string;
};
export default function CardLink({ children, href }: Props) {
  return (
    <Link href={href}>
      <Card>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {children}
          <IoChevronForward />
        </Box>
      </Card>
    </Link>
  );
}
