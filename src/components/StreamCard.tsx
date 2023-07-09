import {
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { FC, useEffect } from "react";
import { RaceEvent, SessionsName } from "@/data";
import { FormattedDate } from "react-intl";
import useSWR from "swr";
import Link from "next/link";

type Props = {
  event: RaceEvent;
  sessionKey: SessionsName;
  sessionDate: RaceEvent["date"][SessionsName];
};

enum BroadcastStatus {
  CREATED = "created",
  BROADCASTING = "broadcasting",
  FINISHED = "finished",
}

const sessionsDisplayName: { [key in SessionsName]: string } = {
  qualifying: "Qualifying",
  race: "Race",
  session: "Session",
};

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

const StreamCard: FC<Props> = ({ event, sessionKey, sessionDate }) => {
  const { data } = useSWR<Broadcast>(
    `https://ott.jstt.me/racing/rest/v2/broadcasts/${event.video?.live?.[sessionKey]}`,
    async (url: string) => {
      if (!event.video?.live?.[sessionKey]) return Promise.resolve(null);

      const data = await fetch(url).then((res) => res.json());

      return data;
    },
    { refreshInterval: 5000 }
  );

  useEffect(() => {
    console.log(
      data,
      sessionKey,
      event,
      event.video?.vod?.[sessionKey],
      data
        ? data.status === BroadcastStatus.BROADCASTING
          ? `/player/live/${data.streamId}`
          : event.video?.vod?.[sessionKey] !== undefined
          ? `/player/vod/${event.video?.vod?.[sessionKey]}`
          : ``
        : event.video?.vod?.[sessionKey] !== undefined
        ? `/player/vod/${event.video?.vod?.[sessionKey]}`
        : ``
    );
  }, [data, event, sessionKey]);

  return (
    <Grid item xs={10} md={5}>
      <Paper elevation={6}>
        <CardActionArea
          LinkComponent={Link}
          href={
            data
              ? data.status === BroadcastStatus.BROADCASTING
                ? `/player/live/${data.streamId}`
                : event.video?.vod?.[sessionKey] !== undefined
                ? `/player/vod/${event.video?.vod?.[sessionKey]}`
                : ``
              : event.video?.vod?.[sessionKey] !== undefined
              ? `/player/vod/${event.video?.vod?.[sessionKey]}`
              : ``
          }
        >
          <CardMedia
            sx={{ height: 240 }}
            image={event.circuitImage}
            title={event.circuitName}
          />
          <CardContent>
            <Typography variant="h3">
              {sessionsDisplayName[sessionKey]}
            </Typography>
            <Typography variant="subtitle1">
              {data && data.status === BroadcastStatus.BROADCASTING ? (
                <Chip color="error" label="LIVE" />
              ) : sessionDate instanceof Date ? (
                <FormattedDate
                  value={sessionDate}
                  hour12={false}
                  hour="numeric"
                  minute="numeric"
                  timeZoneName="short"
                  day="numeric"
                  month="long"
                  year="numeric"
                />
              ) : sessionDate === "TBD" ? (
                <Chip color="info" label="To Be Decided" />
              ) : (
                <Chip color="warning" label="Cancelled" />
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Paper>
    </Grid>
  );
};

export default StreamCard;
