import { useVideoJS } from '@/hooks/useVideoJS';
import {
  Alert,
  Button,
  Container,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import Link from 'next/link';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next/types';
import Head from 'next/head';
import Image from 'next/image';
import { RaceEvent, ResultsCodes, VideoObject } from '@/types';
import ContentCopy from '@mui/icons-material/ContentCopy';
import mvlogo from '@/assets/multiviewer-logo.png';
import ReactMarkdown from 'react-markdown';

export interface Broadcasts {
  streamId: string;
  status: string;
  playListStatus: null;
  type: string;
  publishType: null;
  name: string;
  description: null;
  publish: boolean;
  date: number;
  plannedStartDate: number;
  plannedEndDate: number;
  duration: number;
  endPointList: null;
  playListItemList: any[];
  publicStream: boolean;
  is360: boolean;
  listenerHookURL: null;
  category: null;
  ipAddr: null | string;
  username: null;
  password: null;
  quality: null;
  speed: number;
  streamUrl: null;
  originAdress: string;
  mp4Enabled: number;
  webMEnabled: number;
  expireDurationMS: number;
  rtmpURL: string;
  zombi: boolean;
  pendingPacketSize: number;
  hlsViewerCount: number;
  dashViewerCount: number;
  webRTCViewerCount: number;
  rtmpViewerCount: number;
  startTime: number;
  receivedBytes: number;
  bitrate: number;
  userAgent: string;
  latitude: null;
  longitude: null;
  altitude: null;
  mainTrackStreamId: null;
  subTrackStreamIds: any[];
  absoluteStartTimeMs: number;
  webRTCViewerLimit: number;
  hlsViewerLimit: number;
  dashViewerLimit: number;
  subFolder: null;
  currentPlayIndex: number;
  metaData: null;
  playlistLoopEnabled: boolean;
  updateTime: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const streams = (await fetch('https://api.f1refugeesleague.tech/api/v1/events').then(
    (res) => res.json()
  )) as { code: ResultsCodes; result: RaceEvent[] };

  const paths = streams.result.flatMap(
    (stream) =>
      stream.video
        ?.filter(
          (r) => r.type === 'live' || r.type === 'additional_live_stream'
        )
        .map((video) => ({
          params: { id: video.vodId },
        })) ?? []
  );

  return {
    paths,
    fallback: false, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps<{
  id: string;
  data: VideoObject;
  localData: RaceEvent;
}> = async (context) => {
  const events = (await fetch('https://api.f1refugeesleague.tech/api/v1/events').then(
    (res) => res.json()
  )) as { code: ResultsCodes; result: RaceEvent[] };

  const localData = events.result.find((event) =>
    event.video?.find((video) => video.vodId === context.params?.id)
  )!;

  console.log(
    context.params,
    `https://api.f1refugeesleague.tech/api/v1/videos?eventId=${localData.id}&videoId=${context.params?.id}`
  );

  const data = (await fetch(
    `https://api.f1refugeesleague.tech/api/v1/videos/?eventId=${localData.id}&videoId=${context.params?.id}`
  ).then((res) => res.json())) as VideoObject;

  console.log(context.params);

  return {
    props: {
      id: context.params?.id as string,
      data,
      localData: localData,
    },
  };
};

export default function Page({
  id,
  data,
  localData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `https://flussonic.jstt.me/${id}/index.mpd`,
        type: 'application/dash+xml',
      },
      {
        src: `https://flussonic.jstt.me/${id}/index.m3u8`,
        type: 'application/vnd.apple.mpegurl',
      },
    ],
  };

  const [open, setOpen] = React.useState(false);
  const { element: VideoPlayer, playerRef } = useVideoJS({
    options: videoJsOptions,
  });

  console.log(localData);

  if (!localData)
    return (
      <>
        <Typography variant="h1">
          Whoopsie! You were not supposed to see that!
        </Typography>
      </>
    );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>
          {localData.countryFlag} {localData.gpName} - Live
        </title>
        <meta
          name="title"
          content={`${localData.countryFlag} ${localData.gpName} - Live`}
        />
        <meta
          name="description"
          content={localData.video?.find((r) => r.vodId === id)?.description}
        />
      </Head>
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
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
          }}
        >
          {localData.countryFlag} {localData.gpName} - Live
        </Typography>
        {VideoPlayer}
        <Button
          variant="outlined"
          startIcon={<ContentCopy />}
          sx={{
            mt: 2,
          }}
          onClick={() => {
            navigator.clipboard.writeText(location.href);
            setOpen(true);
          }}
        >
          Copy Link
        </Button>
        <Button
          variant="outlined"
          sx={{
            mt: 2,
            mx: 1,
          }}
          onClick={() => {
            location.href = `https://muvi.gg/go/app/play/https://ott.jstt.me/racing/streams/${id}/${id}.mpd`;
            if (playerRef.current) {
              // Check if the player reference is available
              const player = playerRef.current;
              player.pause(); // Pause the player
            }
          }}
        >
          <Image
            src={mvlogo}
            alt="MultiViewer Logo"
            style={{
              width: '20px',
              height: '20px',
              marginRight: '5px',
            }}
          />
          Open in MultiViewer
        </Button>
        <Typography
          variant="h4"
          sx={{
            mt: 2,
          }}
        >
          <ReactMarkdown>
            {localData.video?.find((video) => video.vodId === id)
              ?.descriptionInPlayer ?? ''}
          </ReactMarkdown>
        </Typography>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%', color: 'white' }}
          >
            Link copied to clipboard!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
