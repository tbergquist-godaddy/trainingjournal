import Accordion, { AccordionItem } from '@/components/accordion/accordion';
import Box from '@/components/box/box';
import Section from '@/components/layout/section';
import List from '@/components/list/list';
import Typography from '@/components/typography/typography';
import type { Week } from '@prisma/client';

type Props = {
  weeks: Promise<{ weeks: Array<Week> } | null>;
};
export default async function WeekList({ weeks }: Props) {
  const { weeks: resolvedWeeks } = (await weeks) ?? { weeks: [] };
  return (
    <Section>
      <Box display="flex" direction="column" gap={4}>
        <Typography as="h2">Weeks</Typography>

        {resolvedWeeks.length === 0 ? (
          <Typography>Click the add weeks button above to create your first week</Typography>
        ) : (
          <Accordion>
            {resolvedWeeks.map(week => (
              <AccordionItem title={week.name} key={week.id}>
                TODO
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Box>
    </Section>
  );
}
