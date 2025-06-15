type Props = {
  date: Date | string;
};

export default function FormattedDate({ date }: Props) {
  return new Intl.DateTimeFormat('en-US').format(new Date(date));
}
