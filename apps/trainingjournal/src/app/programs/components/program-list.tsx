import Section from '../../components/layout/section';
import List from '../../components/list/list';
import { getPrograms, type Program } from '../program-service';

export default async function ProgramList() {
  const programs = await getPrograms();
  return (
    <Section>
      <List>
        {programs.map((program: Program) => (
          <List.Item key={program.id}>
            <List.Link href={`/programs/edit/${program.id}`}>{program.name}</List.Link>
          </List.Item>
        ))}
      </List>
    </Section>
  );
}
