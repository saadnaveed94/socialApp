import * as React from "react";
import {
  Box,
  Card,
  Container,
  CardMedia,
  CardHeader,
  IconButton,
  Avatar,
  Divider,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import PrimarySearchAppBar from "../../../components/Appbar";
import AddChallengeModal from "./AddChallengeModal";

export const Feed = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  return (
    <>
      <AddChallengeModal
        open={modalOpen}
        setOpen={setModalOpen}
      ></AddChallengeModal>
      <PrimarySearchAppBar
        add={
          <Button
            sx={{ textTransform: "none", color: "inherit" }}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setModalOpen(true);
            }}
          >
            Challenge +
          </Button>
        }
      ></PrimarySearchAppBar>

      <Box
        sx={{
          display: "flex",
          backgroundColor: "#eceff1",
          flexDirection: "column",
        }}
      >
        <Container sx={{ width: "40%", margin: "auto", marginTop: "100px" }}>
          <Card sx={{ borderRadius: "12px", mb: 3, minHeight: "500px" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                  A
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Abbas Backend"
              subheader="October 25, 2022"
            />

            <CardMedia
              sx={{ maxHeight: "300px" }}
              component="img"
              image="https://images.unsplash.com/photo-1550686041-366ad85a1355?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-evenly" }}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>

            <Box sx={{ display: "flex", flexDirection: "row", p: 1 }}>
              <Textarea
                sx={{
                  width: "90%",
                  borderRadius: "0px",
                  borderColor: "transparent",
                  p: 1,
                  "&.JoyTextarea-focused": {
                    focusedHighlight: "black !important",
                  },
                }}
                placeholder="Add a comment…"
                defaultValue=""
                maxRows={4}
              />
              <Button sx={{ textTransform: "none" }}>Post</Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};
