import {
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { RaceEvent, VideoObject } from '@/types';
import useSWR from 'swr';
import Link from 'next/link';
import DateFormat from './DateFormat';

type Props = {
  event: RaceEvent;
  session: VideoObject;
};

enum BroadcastStatus {
  CREATED = 'created',
  BROADCASTING = 'broadcasting',
  FINISHED = 'finished',
}

interface Broadcast {
  streamId: string;
  status: BroadcastStatus;
  playListStatus: null | string;
  type: string;
  publishType: null;
  name: string;
  description: null;
  publish: boolean;
  date: number;
  plannedStartDate: number;
  plannedEndDate: number;
  duration: number;
  endPointList: any[] | null;
  playListItemList: PlayListItemList[];
  publicStream: boolean;
  is360: boolean;
  listenerHookURL: null;
  category: null;
  ipAddr: null;
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

interface PlayListItemList {
  streamUrl: string;
  type: string;
}

const StreamCard: FC<Props> = ({ event, session }) => {
  return (
    <Grid
      item
      xs={3}
      md={6}
      sx={{
        opacity: session.status === 'offline' ? 0.5 : 1,
      }}
    >
      <Paper elevation={6} sx={{ height: '100%' }}>
        <CardActionArea
          sx={{ height: '100%' }}
          LinkComponent={Link}
          href={
            session.type === 'live' || session.type === 'additional_live_stream'
              ? `/player/live/${session.vodId}`
              : `/player/vod/${session.vodId}`
          }
          disabled={
            (session.type === 'live' ||
            session.type === 'additional_live_stream') &&
              session.status === 'offline'
          }
        >
          <CardMedia
            sx={{ height: 240 }}
            image={session.picture ?? event.circuitImage}
            title={event.circuitName}
          />
          <CardContent>
            <Typography variant="h4">{session.title}</Typography>
            {session.type === 'live' ||
            session.type === 'additional_live_stream' ? (
              <Typography variant="subtitle1">
                {session.status === 'live' ? (
                  <Chip color="error" label="LIVE" />
                ) : session.date === 'TBD' ? (
                  <Chip color="info" label="To Be Decided" />
                ) : session.date === 'Cancelled' ? (
                  <Chip color="warning" label="Cancelled" />
                ) : (
                  <DateFormat date={session.date ?? ''} />
                )}
              </Typography>
            ) : session.description ? (
              <Typography variant="subtitle1">{session.description}</Typography>
            ) : null}
            {event.done && <Chip color="success" label="Finished" />}
            {session.type === 'vod' && (
              <Chip color="info" label="Full Replay" />
            )}
            {session.type === 'highlights' && (
              <Chip color="warning" label="Highlights" />
            )}
            {session.type === 'extra_content' && (
              <Chip color="secondary" label="Extra Content" />
            )}
          </CardContent>
        </CardActionArea>
      </Paper>
    </Grid>
  );
};

export default StreamCard;
