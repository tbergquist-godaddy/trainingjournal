import ProtectedPage from '../../auth/protected-page';
import Typography from '../../components/typography/typography';
import CreateProgram from './components/create-program';

export default function CreateProgramPage() {
  return (
    <ProtectedPage>
      <Typography as="h1">Create Program</Typography>
      <CreateProgram />
    </ProtectedPage>
  );
}
