import Player from "@/components/Player";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { use, useEffect, useRef } from "react";
import Link from "next/link";
import useSWR from "swr";

interface VOD {
  streamName: string;
  vodName: string;
  streamId: string;
  creationDate: number;
  startTime: number;
  duration: number;
  fileSize: number;
  filePath: string;
  vodId: string;
  type: string;
  previewFilePath: null;
}

const LivePlayer = () => {
  const router = useRouter();
  const videoPlayer = useRef<null | HTMLVideoElement>(null);

  console.log(router.query);

  const vodId = router.query.id;

  const { data } = useSWR<VOD>(
    `https://ott.jstt.me/racing/rest/v2/vods/${vodId}`,
    (url: string) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    console.log(data);
    if (data) {
      videoPlayer.current!.src = `https://ott.jstt.me/racing/${data.filePath}`;
    }
  }, [data, vodId]);

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
        VOD Player
      </Typography>
      <video
        ref={videoPlayer}
        controls
        autoPlay
        style={{
          width: "100%",
        }}
      />
    </Container>
  );
};

export default LivePlayer;
