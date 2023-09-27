import { Button, Container, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next/types';
import ContentCopy from '@mui/icons-material/ContentCopy';
import mvlogo from '@/assets/multiviewer-logo.png';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useHotkeys } from 'react-hotkeys-hook';
import { ResultsCodes, RaceEvent, VideoObject, API_URL } from '@/types';
import useVideoJS from '@/hooks/useVideoJS';

export const getStaticPaths: GetStaticPaths = async () => {
  const streams = (await fetch(`${API_URL}/api/v1/events`).then((res) =>
    res.json()
  )) as { code: ResultsCodes; result: RaceEvent[] };

  const paths = streams.result.flatMap(
    (stream) =>
      stream.video
        ?.filter(
          (r) => r.type !== 'live' && r.type !== 'additional_live_stream'
        )
        .map((video) => ({
          params: { id: video.vodId },
        })) ?? []
  );

  console.log(paths);

  return {
    paths,
    fallback: false, // false or "blocking"
  };
};

// export const getStaticProps: GetStaticProps<{
//   id: VOD;
// }> = async (context) => {
//   const vod = (await fetch(
//     `https://ott.jstt.me/racing/rest/v2/vods/${context.params?.id}`
//   ).then((res) => res.json())) as VOD;

//   return { props: { id: vod } };
// };

export const getStaticProps: GetStaticProps<{
  id: string;
  currentVideo: VideoObject;
  currentGP: RaceEvent;
}> = async (context) => {
  const events = (await fetch(`${API_URL}/api/v1/events`).then((res) =>
    res.json()
  )) as { code: ResultsCodes; result: RaceEvent[] };

  const currentGP = events.result.find((event) =>
    event.video?.find((video) => video.vodId === context.params?.id)
  )!;

  console.log(
    `${API_URL}/api/v1/videos/?eventId=${currentGP.id}&videoId=${context.params?.id}`
  );

  const currentVideo = (await fetch(
    `${API_URL}/api/v1/videos/?eventId=${currentGP.id}&videoId=${context.params?.id}`
  ).then((res) => res.json())) as { code: ResultsCodes; results: VideoObject };

  console.log(context.params, currentVideo);

  return {
    props: {
      id: context.params?.id as string,
      currentVideo: currentVideo.results,
      currentGP,
    },
  };
};

export default function Page({
  id,
  currentGP,
  currentVideo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [fullscreen, setFullscreen] = useState(false);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `https://flussonic.jstt.me/league-vods/${id}.mp4/index.mpd`,
        type: 'application/dash+xml',
      },
      {
        src: `https://flussonic.jstt.me/league-vods/${id}.mp4/index.m3u8`,
        type: 'application/vnd.apple.mpegurl',
      },
    ],
  };
  const { element: VideoPlayer, playerRef } = useVideoJS({
    options: videoJsOptions,
  });

  useEffect(() => {
    if (currentVideo?.startTimestamp) {
      playerRef.current!.currentTime(currentVideo.startTimestamp);
    }
    if (router.query.t) {
      playerRef.current!.currentTime(Number(router.query.t));
    }
  }, [router.query.t, currentVideo?.startTimestamp, playerRef]);

  useHotkeys('f', () => {
    if (playerRef.current) {
      if (fullscreen) {
        document.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
      setFullscreen((prev) => !prev);
    }
  });

  console.log(currentGP, currentVideo);

  return (
    <>
      <Head>
        <title>
          {currentGP?.countryFlag} {currentVideo?.title}{' '}
          {currentVideo?.type === 'highlights' ? 'Highlights' : undefined}
        </title>
        <meta
          name="title"
          content={`${currentGP?.countryFlag} ${currentVideo?.title} - Replay`}
        />
        <meta name="description" content={currentVideo?.description} />
        <meta
          property="og:image"
          content={currentVideo?.picture ?? currentGP?.circuitImage}
        />
        {/* <meta property="og:type" content="image" /> */}
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
          {currentGP?.countryFlag} {currentVideo?.title}
        </Typography>
        {VideoPlayer}
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mb: 2,
          }}
        >
          {currentVideo?.descriptionInPlayer}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ContentCopy />}
          sx={{
            mt: 2,
          }}
          onClick={() => {
            navigator.clipboard.writeText(location.href);
          }}
        >
          Copy Link
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopy />}
          sx={{
            mt: 2,
          }}
          onClick={() => {
            navigator.clipboard.writeText(
              location.href +
                `?t=${Math.floor(playerRef.current?.currentTime() ?? 0)}`
            );
          }}
        >
          Copy Link at this timestamp
        </Button>
        <Button
          variant="outlined"
          sx={{
            mt: 2,
            mx: 1,
          }}
          onClick={() => {
            location.href = `https://muvi.gg/go/app/play/https://flussonic.jstt.me/${id}.mp4/index.mpd`;
            if (playerRef.current) {
              playerRef.current.pause();
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
      </Container>
    </>
  );
}
