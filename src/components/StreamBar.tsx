import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import React, { FC } from 'react';
import { RaceEvent, SessionsName } from '@/data';
import StreamCard from './StreamCard';

type Props = {
  event: RaceEvent;
};

const StreamBar: FC<Props> = ({ event }) => {
  return (
    <Paper
      sx={{
        m: 4,
        p: 2,
        opacity: event.done ? 0.5 : 1,
      }}
      elevation={1}
    >
      <Typography variant="h2">
        {event.countryFlag} {event.gpName}
      </Typography>
      <Divider
        sx={{
          my: 3,
        }}
      />
      <Grid container spacing={2}>
        {event.video?.map((session) => (
          <StreamCard key={session.vodId} event={event} session={session} />
        ))}
      </Grid>
    </Paper>
  );
};

export default StreamBar;
