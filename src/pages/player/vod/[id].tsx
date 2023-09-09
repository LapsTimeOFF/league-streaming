import { Button, Container, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next/types';
import IosShareIcon from '@mui/icons-material/IosShare';
import ReplyIcon from '@mui/icons-material/Reply';

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
export const getStaticPaths: GetStaticPaths = async () => {
  const streams = (await fetch(
    'https://ott.jstt.me/racing/rest/v2/vods/list/0/100'
  ).then((res) => res.json())) as VOD[];

  const paths = streams.map((stream) => ({
    params: { id: stream.vodId },
  }));
  return {
    paths,
    fallback: false, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps<{
  id: VOD;
}> = async (context) => {
  const vod = (await fetch(
    `https://ott.jstt.me/racing/rest/v2/vods/${context.params?.id}`
  ).then((res) => res.json())) as VOD;

  return { props: { id: vod } };
};

export default function Page({
  id,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const videoPlayer = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    console.log(id);
    if (id) {
      videoPlayer.current!.src = `https://ott.jstt.me/racing/${id.filePath}`;
    }
  }, [id]);

  return (
    <Container>
      <IconButton aria-label="back" LinkComponent={Link} href="/">
        <ArrowBackIcon
          sx={{
            color: 'white',
            m: 2,
          }}
        />
      </IconButton>
      <Typography
        variant="h1"
        sx={{
          textAlign: 'center',
        }}
      >
        VOD Player
      </Typography>
      <video
        ref={videoPlayer}
        controls
        autoPlay
        style={{
          width: '100%',
        }}
      />
      <Button
        variant="outlined"
        startIcon={<IosShareIcon />}
        sx={{
          mt: 5,
        }}
        onClick={() => {
          navigator.clipboard.writeText(location.href);
        }}
      >
        Share
      </Button>
      <Button
        variant="outlined"
        startIcon={<ReplyIcon />}
        sx={{
          mt: 5,
          mx: 1,
        }}
        onClick={() => {
          location.href = `https://muvi.gg/go/app/play/https://ott.jstt.me/racing/${id.filePath}`;
          if (videoPlayer.current) {
            videoPlayer.current.pause();
          }
        }}
      >
        Open in MultiViewer
      </Button>
    </Container>
  );
}
