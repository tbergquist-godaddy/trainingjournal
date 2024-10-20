import ProgramForm from '../../components/program-form';
import createProgramAction from '../../actions/create-program';

export default function CreateProgram() {
  return <ProgramForm action={createProgramAction} />;
}
