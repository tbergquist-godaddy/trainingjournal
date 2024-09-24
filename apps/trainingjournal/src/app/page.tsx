import Container from './components/container/container';
import Typography from './components/typography/typography';

import User from './user';

export default function Index() {
  return (
    <Container>
      <Typography as="h1">Welcome</Typography>

      <User />
    </Container>
  );
}
