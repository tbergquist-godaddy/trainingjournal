import Accordion, { AccordionItem } from '@/components/accordion/accordion';
import { Box } from '@tbergq/components';
import Section from '@/components/layout/section';
import Typography from '@/components/typography/typography';
import AddDay from '../days/add-day';
import type { GetWeeksType } from '../week-service';
import DayList from '../days/actions/components/day-list';
import CloneWeek from './clone-week';

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
                    <Box display="flex" gap={2}>
                      <AddDay count={week.days.length} weekId={week.id} />
                      <CloneWeek weekId={week.id} />
                    </Box>
                    <Section>
                      <DayList days={week.days} />
                    </Section>
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
