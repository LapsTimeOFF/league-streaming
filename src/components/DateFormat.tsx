'use client';
import { FC, useEffect, useState } from 'react';
import { FormattedDate } from 'react-intl';

type Props = {
  date: Date | undefined;
};

const DateFormat: FC<Props> = ({ date }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient ? <FormattedDate
      value={date}
      hour12={false}
      hour="numeric"
      minute="numeric"
      timeZoneName="short"
      day="numeric"
      month="long"
      year="numeric"
    /> : null
  );
};

export default DateFormat;
