import { RaceEvent, raceEvents } from "@/data";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { JSONTree } from "react-json-tree";
import AdditionalStream from "./AdditionalStream";

type Props = {
  id: string;
};

const getEventFromID = (id: string) => {
  let rootObj: RaceEvent | undefined;

  for (const raceEvent of raceEvents) {
    if (raceEvent.video?.live?.session === id) {
      rootObj = raceEvent;
      break;
    }
    if (raceEvent.video?.live?.qualifying === id) {
      rootObj = raceEvent;
      break;
    }
    if (raceEvent.video?.live?.race === id) {
      rootObj = raceEvent;
      break;
    }
  }

  return rootObj;
};

const AdditionalStreamsSection: FC<Props> = ({ id }) => {
  const event = getEventFromID(id);
  const [debug, setDebug] = useState<boolean>(false);

  useHotkeys("d", () => setDebug((prev) => !prev));

  return (
    <Box sx={{ mt: 2 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h2" textAlign="center">
        Additional Streams
      </Typography>
      {debug ? <JSONTree data={event} /> : null}
      <Grid container spacing={2}>
        {event?.additionalStreams?.live?.map((stream) => (
          <AdditionalStream
            stream={stream}
            key={`${stream.name}${stream.streamKey}`}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default AdditionalStreamsSection;
