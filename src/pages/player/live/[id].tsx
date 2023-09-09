import Player from '@/components/Player';
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
import { RaceEvent, raceEvents } from '@/data';
import IosShareIcon from '@mui/icons-material/IosShare';
import ReplyIcon from '@mui/icons-material/Reply';
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
  const streams = (await fetch(
    'https://ott.jstt.me/racing/rest/v2/broadcasts/list/0/100'
  ).then((res) => res.json())) as Broadcasts[];

  const paths = streams.map((stream) => ({
    params: { id: stream.streamId },
  }));
  return {
    paths,
    fallback: false, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps<{
  id: string;
  data: Broadcasts;
  localData: string;
}> = async (context) => {
  const data = (await fetch(
    `https://ott.jstt.me/racing/rest/v2/broadcasts/${context.params?.id}`
  ).then((res) => res.json())) as Broadcasts;

  const localData = raceEvents.find((event) =>
    event.video?.find((video) => video.vodId === context.params?.id)
  );

  return {
    props: {
      id: context.params?.id as string,
      data,
      localData: JSON.stringify(localData),
    },
  };
};

export default function Page({
  id,
  data,
  localData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const newData: RaceEvent = JSON.parse(localData);
  console.log(newData);
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `https://ott.jstt.me/racing/streams/${id}/${id}.mpd`,
        // src: `https://ott.jstt.me/${
        //   process.env.NODE_ENV === "production" ? "racing" : "racingDevelopment"
        // }/streams/${streamId}/${streamId}.mpd`,
        type: 'application/dash+xml',
      },
      {
        src: `https://ott.jstt.me/racing/streams/${id}.m3u8`,
        // src: `https://ott.jstt.me/${
        //   process.env.NODE_ENV === "production" ? "racing" : "racingDevelopment"
        // }/streams/${streamId}/${streamId}.mpd`,
        type: 'application/vnd.apple.mpegurl',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>
          {newData.countryFlag} {newData.gpName} - Live
        </title>
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
          variant="h1"
          sx={{
            textAlign: 'center',
          }}
        >
          Live Player
        </Typography>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
          }}
        >
          {newData.countryFlag} {newData.gpName} - Live
        </Typography>
        <Player options={videoJsOptions} />
        <Button
          variant="outlined"
          startIcon={<IosShareIcon />}
          sx={{
            mt: 5,
          }}
          onClick={() => {
            navigator.clipboard.writeText(location.href);
            setOpen(true);
          }}
        >
          Share
        </Button>
        <Typography
          variant="h4"
          sx={{
            mt: 2,
          }}
        >
          <ReactMarkdown>
            {newData.video?.find((video) => video.vodId === id)
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
