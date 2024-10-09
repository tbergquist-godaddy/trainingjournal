import Link from 'next/link';
import ProtectedPage from '../../auth/protected-page';
import Box from '../../components/box/box';
import Button from '../../components/button/button';
import Typography from '../../components/typography/typography';
import Section from '../../components/layout/section';

export default function CreateExercise() {
  return (
    <ProtectedPage>
      <Typography as="h1">Create Exercise</Typography>
      <Section>
        <Box display="flex" gap={4}>
          <Button>Create</Button>
          <Link href="/exercises" legacyBehavior={true}>
            <Button variant="secondary" href="/exercises">
              Cancel
            </Button>
          </Link>
        </Box>
      </Section>
    </ProtectedPage>
  );
}
