import { Box, Typography } from '@mui/material';
import { NextFont } from 'next/dist/compiled/@next/font';
import React, { FC, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { JSONTree } from 'react-json-tree';
import { RaceEvent, ResultsCodes } from '@/types';
import StreamBar from './StreamBar';
import useSWR from 'swr';

type Props = {
  font: NextFont;
};

const UpcomingEvents: FC<Props> = ({ font }) => {
  const [debug, setDebug] = useState(false);

  const { data, isLoading, error } = useSWR<{
    code: ResultsCodes;
    result: RaceEvent[];
  }>(
    // 'https://api.f1refugeesleague.tech/api/v1/events',
    'https://api.f1refugeesleague.tech/api/v1/events',
    async (url) => {
      const data = await fetch(url).then((res) => res.json());
      console.log(data);
      return data;
    }
  );

  useHotkeys('d', () => setDebug((prev) => !prev));

  if (isLoading) {
    return (
      <Box
        sx={{
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: font,
            textAlign: 'center',
            mb: 1,
            color: 'gray',
            fontSize: 18,
          }}
        >
          Upcoming Events
        </Typography>
        <Typography
          sx={{
            fontFamily: font,
            textAlign: 'center',
            mb: 1,
            color: 'gray',
            fontSize: 18,
          }}
        >
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: font,
            textAlign: 'center',
            mb: 1,
            color: 'gray',
            fontSize: 18,
          }}
        >
          Upcoming Events
        </Typography>
        <Typography
          sx={{
            fontFamily: font,
            textAlign: 'center',
            mb: 1,
            color: 'gray',
            fontSize: 18,
          }}
        >
          Error!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: font,
          textAlign: 'center',
          mb: 1,
          color: 'gray',
          fontSize: 18,
        }}
      >
        Upcoming Events
      </Typography>
      {debug && <JSONTree data={data} />}
      {data?.result.map((event) => (
        <StreamBar key={event.gpName} event={event} />
      ))}
    </Box>
  );
};

export default UpcomingEvents;
