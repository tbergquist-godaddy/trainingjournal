import ProgramForm from '../../../components/program-form';
import editProgramAction from '../../../actions/edit-program';
import { getProgram } from '../../../program-service';
import { ReactNode } from 'react';

type Props = { id: string; children: ReactNode };
export default async function EditProgram({ id, children }: Props) {
  const program = await getProgram(id);
  return (
    <ProgramForm
      actionText="Edit Program"
      program={program}
      action={editProgramAction}
      actions={children}
    />
  );
}
