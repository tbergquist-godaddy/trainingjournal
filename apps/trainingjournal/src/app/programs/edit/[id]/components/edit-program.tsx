import ProgramForm from '../../../components/program-form';
import editProgramAction from '../../../actions/edit-program';
import { getProgram } from '../../../program-service';

type Props = { id: string };
export default async function EditProgram({ id }: Props) {
  const program = await getProgram(id);
  return <ProgramForm actionText="Edit Program" program={program} action={editProgramAction} />;
}
