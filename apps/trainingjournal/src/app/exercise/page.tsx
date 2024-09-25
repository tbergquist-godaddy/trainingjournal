import ProtectedPage from '../auth/protected-page';

export default function ExercisePage() {
  return (
    <ProtectedPage>
      <h1>Exercise Page</h1>
    </ProtectedPage>
  );
}
