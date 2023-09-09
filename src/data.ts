export type RaceEvent = {
  gpName: string;
  countryFlag: string;
  countryName: string;
  circuitName: string;
  circuitImage: string;
  done: boolean;
  notes?: string;
  video?: VideoObject[];
  additionalStreams?: { live?: AdditionalStream[]; vod?: AdditionalStream[] };
};

export type VideoObject = {
  title: string
  picture?: string
  description?: string
  descriptionInPlayer?: string
  vodId: string
  type: 'vod' | 'live' | 'highlights'
  date?: Date | 'TBD'
}

export type SessionResult = {
  time: string;
  delta: string;
  name: string;
}[];

export type SessionsName = 'qualifying' | 'race' | 'session';

export type AdditionalStream = {
  name: string;
  image?: string;
  streamKey: string;
  environment: 'OBC';
};

// France Testing, Bahrain, Qatar, China, Japan, Barcelona, Austria, Silverstone, Spa, Monza, COTA, Brazil

export const raceEvents: RaceEvent[] = [
  {

    done: true,
    gpName: 'Pre-Season Testing',
    countryName: 'France',
    countryFlag: '🇫🇷',
    circuitName: 'Circuit du Castellet',
    circuitImage:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bandoltourisme.fr%2Fwp-content%2Fuploads%2F2021%2F05%2FSans-titre-2-1200x675.jpg&f=1&nofb=1&ipt=cdd8ad94b9f8770ffe92d163dfa3a23bc2afe915092893bc9c88af2583dfbbba&ipo=images',
    notes:
      'This session is for testing purposes, principal systems, including telemetry and broadcasting will be tested, drivers will be driving on the Paul Ricard track. This session **will not** affect the championship. The qualification will have the classic format, but, the race will be aborted after a few laps. Please make sure to always keep an eye on the Discord for any action given by the Race Control.',
    video: [
      {
        title: 'Pre-Season Testing - Qualifying',
        type: 'live',
        vodId: 'league-pre-season-q',
        date: new Date('2023-08-20T17:00:00.000Z')
      },
      {
        title: 'Pre-Season Testing - Race',
        type: 'live',
        vodId: 'league-pre-season-q',
        date: new Date('2023-08-20T17:15:00.000Z')
      },
    ],
  },
  {

    done: false,
    gpName: 'Bahrain Grand Prix',
    countryName: 'Bahrain',
    countryFlag: '🇧🇭',
    circuitName: 'Bahrain International Circuit',
    circuitImage:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassettocorsa.vip%2Fwp-content%2Fuploads%2F2020%2F12%2FBAHRAIN-INTERNATIONAL-CIRCUIT.jpg&f=1&nofb=1&ipt=abbc95a10a6bf3afe08f65bef9a9486d932bbd462d64a1875481bdf7e85f2ab8&ipo=images',
    video: [
      // live: {
      //   qualifying: 'league-bahrain-q',
      //   race: 'league-bahrain-r',
      // },
      // vod: {
      //   qualifying: '9v2XmZaHaYWU70ImPD18k6h5',
      //   race: 'f5xVJqq1oPGbH8I2gGvYF26w'
      // }
      {
        title: 'Bahrain Grand Prix - Qualifying',
        type: 'vod',
        vodId: '9v2XmZaHaYWU70ImPD18k6h5',
      },
      {
        title: 'Bahrain Grand Prix - Race',
        type: 'vod',
        vodId: 'f5xVJqq1oPGbH8I2gGvYF26w',
      },
      {
        title: 'Bahrain Grand Prix - Qualifying',
        type: 'highlights',
        vodId: '962260738552352930628746',
        description: 'Re-watch the best moments of the Bahrain Grand Prix Qualifying!',
      }
    ],
  },
  {
    done: false,
    gpName: 'Qatar Grand Prix',
    countryName: 'Qatar',
    countryFlag: '🇶🇦',
    video: [
      {
        title: 'Qatar Grand Prix - Qualifying',
        type: 'live',
        vodId: 'league-qatar-q',
        descriptionInPlayer: 'Enjoy the Qualifying of the Qatar Grand Prix! Join us [here](/player/live/league-qatar-r) for the race!',
        date: new Date('2023-09-10T17:00:00.000Z'),
      },
      {
        title: 'Qatar Grand Prix - Race',
        type: 'live',
        vodId: 'league-qatar-r',
        date: new Date('2023-09-10T17:20:00.000Z'),
      }
    ],
    circuitName: 'Losail International Circuit',
    circuitImage:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fmetropolitanmagazine.it%2Fwp-content%2Fuploads%2F2019%2F03%2F2014-wsbk-qatar-promo-circuit_full.jpg&f=1&nofb=1&ipt=914300f4425574154216f737ac01efa8cb24e1b9909512eb62a2083d9d895535&ipo=images',
  },
  // {

  //   done: false,
  //   gpName: 'Chinese Grand Prix',
  //   countryName: 'China',
  //   countryFlag: '🇨🇳',
  //   date: { qualifying: 'TBD', race: 'TBD' },
  //   circuitName: 'Shanghai International Circuit',
  //   circuitImage:
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F2c%2Fd3%2Fce%2F2cd3ced4e5a8afa063b1a4bf18161cc4.jpg&f=1&nofb=1&ipt=c07ac3239a6341aea52b6c3431ecc2b22fbc822552011e20b417f0d775c8c6c4&ipo=images',
  // },
  // {

  //   done: false,
  //   gpName: 'Japanese Grand Prix',
  //   countryName: 'Japan',
  //   countryFlag: '🇯🇵',
  //   date: { qualifying: 'TBD', race: 'TBD' },
  //   circuitName: 'Suzuka International Racing Course',
  //   circuitImage:
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbetotg.com%2Fwp-content%2Fuploads%2F2017%2F10%2Fjapan-2017-3.jpg&f=1&nofb=1&ipt=3f9d37c8761c46ca32a524648390994a042cbdd3859bf870effe36a05d3f495f&ipo=images',
  // },
  // {

  //   done: false,
  //   gpName: 'Spanish Grand Prix',
  //   countryName: 'Spain',
  //   countryFlag: '🇪🇸',
  //   date: { qualifying: 'TBD', race: 'TBD' },
  //   circuitName: 'Circuit de Barcelona-Catalunya',
  //   circuitImage:
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fygh3wlxilmg51.jpg%3Fauto%3Dwebp%26s%3D604953bb85e58501bdd3d008a10d8c7f13be52f5&f=1&nofb=1&ipt=4cc38e838b6a1eb1f6f95c42f6cedfcd7549937635c9e2909ad8982127864f30&ipo=images',
  // },
  // {

  //   done: false,
  //   gpName: 'Austrian Grand Prix',
  //   countryName: 'Austria',
  //   countryFlag: '🇦🇹',
  //   date: { qualifying: 'TBD', race: 'TBD' },
  //   circuitName: 'Red Bull Ring',
  //   circuitImage:
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.motorsportlive.com%2Fmedia-file%2Ff1-austria-overview-55442-1.jpeg&f=1&nofb=1&ipt=2c210ea5106587df1420fd8ef4280d0731fcfe4c4151b74f101624d2b52dad4c&ipo=images',
  // },
  // {

  //   done: false,
  //   gpName: 'British Grand Prix',
  //   countryName: 'United Kingdom',
  //   countryFlag: '🇬🇧',
  //   date: { qualifying: 'TBD', race: 'TBD' },
  //   circuitName: 'Silverstone Circuit',
  //   circuitImage:
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.craggmanagement.co.uk%2Fmedia%2Fzoo%2Fimages%2FSilverston_Motor_Circuit-By_Lee_Dyer_0de487b24d4e701cb78aeb16cab83ff8.jpg&f=1&nofb=1&ipt=0a530138fbffd74587c1fe856e9093606329f282a3ab08577613dd267ac8081d&ipo=images',
  // },
  // {

  //   done: false,
  //   gpName: 'Belgian Grand Prix',
  //   countryName: 'Belgium',
  //   countryFlag: '🇧🇪',
  //   date: { qualifying: 'TBD', race: 'TBD' },
  //   circuitName: 'Circuit de Spa-Francorchamps',
  //   circuitImage:
  //     'https://www.spa-francorchamps.be/sites/default/files/image/raidillon_2.jpg',
  // },
  // {

  //   done: false,
  //   gpName: 'Italian Grand Prix',
  //   countryName: 'Italy',
  //   countryFlag: '🇮🇹',
  //   date: { qualifying: 'TBD', race: 'TBD' },
  //   circuitName: 'Autodromo Nazionale di Monza',
  //   circuitImage:
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmotorsportguides.com%2Fwp-content%2Fuploads%2F2019%2F01%2FSD-2016-Italy-Saturday-140.jpg&f=1&nofb=1&ipt=512dcd78196a227abb789b7a531001da62667bb765fb1e1f54594a01e0b32309&ipo=images',
  // },
  // {

  //   done: false,
  //   gpName: 'American Grand Prix',
  //   countryName: 'United States',
  //   countryFlag: '🇺🇸',
  //   date: { qualifying: 'TBD', race: 'TBD' },
  //   circuitName: 'Circuit of the Americas',
  //   circuitImage:
  //     'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclubs1.net%2Fwp-content%2Fuploads%2F2018%2F04%2F624.jpg&f=1&nofb=1&ipt=2e1b60515ca033423643587eb13c26803614d4f90b3521f5510d179b00c76835&ipo=images',
  // },
  // {

  //   done: false,
  //   gpName: 'Brazilian Grand Prix',
  //   countryName: 'Brazil',
  //   countryFlag: '🇧🇷',
  //   date: { qualifying: 'TBD', race: 'TBD' },
  //   circuitName: 'Autódromo José Carlos Pace',
  //   circuitImage:
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmotorsportguides.com%2Fwp-content%2Fuploads%2F2019%2F01%2Fbrazilian-GP-2.jpg&f=1&nofb=1&ipt=80cdfffb4e539429f82f923f2a8db3830c3629566b75c5ea7ebde0dfabd24327&ipo=images',
  // },
];
