import Player from "@/components/Player";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import Link from "next/link";
import AdditionalStreamsSection from "@/components/AdditionalStreamsSection";

const LivePlayer = () => {
  const router = useRouter();

  console.log(router.query);

  const streamId = router.query.id;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `https://ott.jstt.me/racing/streams/${streamId}/${streamId}.mpd`,
        // src: `https://ott.jstt.me/${
        //   process.env.NODE_ENV === "production" ? "racing" : "racingDevelopment"
        // }/streams/${streamId}/${streamId}.mpd`,
        type: "application/dash+xml",
      },
    ],
  };

  return (
    <Container>
      <IconButton aria-label="back" LinkComponent={Link} href="/">
        <ArrowBackIcon
          sx={{
            color: "white",
            m: 2,
          }}
        />
      </IconButton>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
        }}
      >
        Live Player
      </Typography>
      <Player options={videoJsOptions} />
      <AdditionalStreamsSection id={streamId as string} />
    </Container>
  );
};

export default LivePlayer;
