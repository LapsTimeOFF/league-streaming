export type RaceEvent = {
  id: string;
  gpName: string;
  countryFlag: string;
  countryName: string;
  circuitName: string;
  circuitImage: string;
  done: boolean;
  notes?: string;
  video?: VideoObject[];
};

export type VideoObject = {
  title: string;
  picture?: string;
  description?: string;
  descriptionInPlayer?: string;
  vodId: string;
  type:
    | 'vod'
    | 'live'
    | 'highlights'
    | 'extra_content'
    | 'additional_live_stream'
    | 'additional_vod_stream';
  date?: string | 'Cancelled' | 'TBD';
  startTimestamp?: number;
  status: 'live' | 'offline';
};

export type SessionResult = {
  time: string;
  delta: string;
  name: string;
}[];

export enum ResultsCodes {
  Success = 'success',
  Error = 'error',
  EventNotFound = 'EVENT_NOT_FOUND',
  StreamNotFound = 'STREAM_NOT_FOUND',
}
