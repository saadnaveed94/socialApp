import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

export default function ChallengeCard(props: any) {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 450 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.avatar}
          </Avatar>
        }
        title={props.title}
      />
      <CardMedia
        component="img"
        height="220"
        image="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        alt="Challenge Image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
