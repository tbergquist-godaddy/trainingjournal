import { useFormStatus } from 'react-dom';

type Props = {
  children: (pending: boolean) => React.ReactNode;
};

export default function WithFormLoadingState({ children }: Props) {
  const { pending } = useFormStatus();
  return children(pending);
}
