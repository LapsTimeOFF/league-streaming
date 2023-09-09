import Head from "next/head";
import { Inter } from "next/font/google";
import { Box, Typography, Divider, useMediaQuery } from "@mui/material";
import UpcomingEvents from "@/components/UpcomingEvents";
import React from "react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const smallScreen = useMediaQuery("(max-width:900px)");

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
          position: "sticky",
          top: 0,
          backgroundColor: "#121212",
          zIndex: 100,
          mb: 4,
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/logo.png"
          alt="League Streaming Platform"
          width="100"
          height="100"
          style={{
            marginLeft: 15,
            marginTop: 15,
            borderRadius: 30,
            marginBottom: 15,
          }}
        />
        <Typography
          variant={smallScreen ? "h6" : "h1"}
          sx={{
            fontFamily: inter,
            ml: 2,
            color: "white",
          }}
        >
          League Streaming Platform
        </Typography>
        <Divider
          sx={{
            mt: 2,
            my: 1,
          }}
        />
      </Box>

      <Typography
        variant="h2"
        sx={{ fontFamily: inter, textAlign: "center", mb: 1 }}
      >
        Season 1 - F1 Twitter Refugees League
      </Typography>

      <Divider/>

      <UpcomingEvents font={inter} />
      <Box
        sx={{
          bottom: 0,
          zIndex: 100,
          mb: 4,
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: inter,
            ml: 3,
            color: "gray",
            fontSize: 15,
          }}
        >
          © Copyright 2023 - F1 Twitter Refugees
        </Typography>
      </Box>
    </>
  );
}
