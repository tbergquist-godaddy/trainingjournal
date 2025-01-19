import ProtectedPage from '@/auth/protected-page';
import Section from '@/components/layout/section';
import Typography from '@/components/typography/typography';
import { Box, Button } from '@tbergq/components';
import Link from 'next/link';

export default function WorkoutPage() {
  return (
    <ProtectedPage>
      <Typography as="h1">Workout</Typography>
      <Section>
        <Box display="inline-block">
          <Link href="/workout/register" passHref={true} legacyBehavior={true}>
            <Button href="/workout/register">Start new workout</Button>
          </Link>
        </Box>
      </Section>
    </ProtectedPage>
  );
}
