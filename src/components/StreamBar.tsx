import { Box, Chip, Divider, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import React, { FC } from 'react';
import { RaceEvent } from '@/data';
import StreamCard from './StreamCard';

type Props = {
  event: RaceEvent;
};

const StreamBar: FC<Props> = ({ event }) => {
  const smallScreen = useMediaQuery("(max-width:900px)");

  return (
    <Paper
      sx={{
        m: 4,
        p: 2,
        opacity: event.done ? 0.5 : 1,
      }}
      elevation={1}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h2">
          {event.countryFlag} {event.gpName}
        </Typography>
        {event.done && (
          <Chip
            sx={{
              ml: 2,
              mt: 2,
              alignSelf: "center",
            }}
            label="Finished"
            color="success"
          />
        )}
      </Box>
      <Divider
        sx={{
          my: 3,
        }}
      />
      {/* we make sure that on mobile, the grid is only 1 column */}
      <Grid container spacing={2} columns={smallScreen ? 1 : undefined}>
        {event.video?.map((session) => (
          <StreamCard key={session.vodId} event={event} session={session} />
        ))}
      </Grid>
    </Paper>
  );
};

export default StreamBar;
