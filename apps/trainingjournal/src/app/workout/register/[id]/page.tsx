import ProtectedPage from '@/auth/protected-page';
import Typography from '@/components/typography/typography';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RegisterWorkoutPage({ params }: Props) {
  const { id } = await params;
  return (
    <ProtectedPage>
      <Typography as="h1">Register workout {id}</Typography>
    </ProtectedPage>
  );
}
