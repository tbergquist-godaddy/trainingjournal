import Accordion, { AccordionItem } from '@/components/accordion/accordion';
import Box from '@/components/box/box';
import Section from '@/components/layout/section';
import Typography from '@/components/typography/typography';
import AddDay from '../days/add-day';
import type { GetWeeksType } from '../week-service';

type Props = {
  weeks: GetWeeksType;
};

export default async function WeekList({ weeks }: Props) {
  const resolvedWeeks = (await weeks) ?? [];

  return (
    <Section>
      <Box display="flex" direction="column" gap={4}>
        <Typography as="h2">Weeks</Typography>

        {resolvedWeeks.length === 0 ? (
          <Typography>Click the add weeks button above to create your first week</Typography>
        ) : (
          <Accordion>
            {resolvedWeeks.map(week => {
              return (
                <AccordionItem title={week.name} key={week.id}>
                  <>
                    <AddDay count={1} weekId={week.id} />
                    <pre>{JSON.stringify(week.days, null, 2)}</pre>
                  </>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </Box>
    </Section>
  );
}
