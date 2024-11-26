import ProtectedPage from '@/auth/protected-page';
import Box from '@/components/box/box';
import Section from '@/components/layout/section';
import Typography from '@/components/typography/typography';
import { getDayById } from '@/programs/week/days/day-service';

type Props = {
  params: Promise<{ id: string; dayId: string }>;
};
export default async function EditDay({ params }: Props) {
  const { dayId } = await params;
  const day = await getDayById(dayId);
  return (
    <ProtectedPage>
      <Typography as="h1">Edit Day</Typography>
      <Section>
        <Box display="flex" direction="column" gap={4}>
          <label>
            <div>Name (TODO: Add form)</div>
            <input readOnly={true} name="name" defaultValue={day?.name ?? ''} />
          </label>
          <Typography as="h2">Exercises</Typography>
          <div>TODO: Add exercises</div>
        </Box>
      </Section>
    </ProtectedPage>
  );
}
