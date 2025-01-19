import ProtectedPage from '../auth/protected-page';
import Grid from '../components/grid/grid';
import Section from '../components/layout/section';
import Typography from '../components/typography/typography';
import CardLink from './components/card-link';

export default function HomePage() {
  return (
    <ProtectedPage>
      <Typography as="h1">Home</Typography>
      <Section>
        <Grid layout="fluid" min={'200px'} gap={8}>
          <CardLink href="/exercises">My Exercises</CardLink>
          <CardLink href="/programs">My Programs</CardLink>
          <CardLink href="/workout">Workout</CardLink>
        </Grid>
      </Section>
    </ProtectedPage>
  );
}
