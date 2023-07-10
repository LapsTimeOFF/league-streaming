import { Box, Typography, Divider } from "@mui/material";
import { NextFont } from "next/dist/compiled/@next/font";
import React, { FC, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { JSONTree } from "react-json-tree";
import { raceEvents } from "@/data";
import useSWR from "swr";
import StreamBar from "./StreamBar";

type Props = {
  font: NextFont;
};

const UpcomingEvents: FC<Props> = ({ font }) => {
  const [debug, setDebug] = useState(false);

  useHotkeys("d", () => setDebug((prev) => !prev));

  return (
    <Box
      sx={{
        mt: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: font,
          textAlign: "center",
          mb: 1,
          color: "gray",
          fontSize: 18,
        }}
      >
        Upcoming Events
      </Typography>
      {debug && <JSONTree data={raceEvents} />}
      {raceEvents?.map((event) => (
        <StreamBar key={event.gpName} event={event} />
      ))}
    </Box>
  );
};

export default UpcomingEvents;
