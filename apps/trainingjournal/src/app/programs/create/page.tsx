import ProtectedPage from '../../auth/protected-page';
import Typography from '../../components/typography/typography';

export default function CreateProgramPage() {
  return (
    <ProtectedPage>
      <Typography as="h1">Create Program</Typography>
    </ProtectedPage>
  );
}
