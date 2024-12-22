import { Box } from '@tbergq/components';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function ProgramLayout({ children }: Props) {
  return (
    <>
      <Box display="flex" direction="column" gap={3}>
        <Breadcrumbs invalidPaths={['/programs/edit/.*/days', '/programs/edit']} />
        <div>{children}</div>
      </Box>
    </>
  );
}
