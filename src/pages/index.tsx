import Head from "next/head";
import { Inter } from "next/font/google";
import { Box, Typography, Divider, useMediaQuery } from "@mui/material";
import UpcomingEvents from "@/components/UpcomingEvents";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const smallScreen = useMediaQuery("(max-width:800px)");

  return (
    <>
      <Head>
        <title>League Streaming</title>
        <meta
          name="description"
          content="F1 Twitter Refugees League - Season 1"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box
        sx={{
          position: smallScreen ? undefined : "sticky",
          top: 0,
          backgroundColor: "#121212",
          zIndex: 100,
          mb: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{ textAlign: "center", fontFamily: inter }}
        >
          <b>League Streaming Platform</b>
        </Typography>
        <Divider
          sx={{
            my: 1,
          }}
        />
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontFamily: inter }}
        >
          <b>Season 1: F1 Twitter Refugees league</b>
        </Typography>
        <Divider
          sx={{
            my: 1,
          }}
        />
      </Box>

      <UpcomingEvents font={inter} />
    </>
  );
}
