import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Card,
  Container,
  CardMedia,
  CardHeader,
  IconButton,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import PrimarySearchAppBar from "../../../Components/Appbar";
import AddChallengeModal from "./AddChallengeModal";
import useGetChallenges from "../../../Hooks/useGetChallenges";
import { adminContext } from "../../../Contexts/Admin";
import moment from "moment/moment";
import { useParams } from "react-router";
import useAddComments from "../../../Hooks/useAddComments";
import CommentField from "../../../Components/CommentField";

export const Feed = () => {
  const [newComment, setNewComment] = React.useState<string>("");
  const { PostComments } = useAddComments();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { challenges } = React.useContext(adminContext);
  const { comments } = React.useContext(adminContext);
  const { GetChallenges } = useGetChallenges();
  React.useEffect(() => {
    GetChallenges();
  }, []);

  const navigate = useNavigate();
  const { userType } = useParams();
  if (userType !== "customer" && userType !== "admin" && userType !== "brand") {
    navigate("/404_Not_Found");
  }

  const handleAddComment = (e: any) => {
    setNewComment(e.target.value);
  };

  const handleComment = (challengeId: any | undefined) => {
    PostComments(challengeId, newComment);
  };

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
          {challenges.map((value: any, key: string | undefined) => {
            return (
              <Card
                key={value.id}
                sx={{ borderRadius: "12px", mb: 3, minHeight: "auto" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                      {value.brand_id}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={value.title}
                  subheader={moment(value.created_at).format("ll")}
                />

                <CardMedia
                  sx={{ maxHeight: "300px" }}
                  component="img"
                  // image="https://images.unsplash.com/photo-1550686041-366ad85a1355?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                  image={value.image}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
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
                    onChange={handleAddComment}
                  />
                  <Button
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      handleComment(value.id);
                    }}
                  >
                    Post
                  </Button>
                </Box>

                <CommentField commentsValue={value.comments} />
              </Card>
            );
          })}
        </Container>
      </Box>
    </>
  );
};
