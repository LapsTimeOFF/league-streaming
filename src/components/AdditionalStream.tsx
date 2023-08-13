import { AdditionalStream } from "@/data";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  stream: AdditionalStream;
};

const AdditionalStream: FC<Props> = ({ stream }) => {
  return (
    <Grid item>
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 400,
        }}
      >
        <CardActionArea
          LinkComponent={Link}
          href={`/player/live/obc/${stream.streamKey}`}
          disabled={!stream.streamKey}
        >
          {stream.image ? (
            <CardMedia component="img" image={stream.image} alt={stream.name} />
          ) : null}
          <CardContent>
            <Typography variant="h4">{stream.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default AdditionalStream;
