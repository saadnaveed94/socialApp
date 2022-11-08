import * as React from "react";
import { useNavigate, useParams } from "react-router";
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
  Tooltip,
  CardActionArea,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import PrimarySearchAppBar from "../../../Components/Appbar";
import AddChallengeModal from "./AddChallengeModal";
import AddTrickModal from "./AddTrickModal";
import useGetChallenges from "../../../Hooks/useGetChallenges";
import { adminContext } from "../../../Contexts/Admin";
import moment from "moment/moment";
import useAddComments from "../../../Hooks/useAddComments";
import CommentField from "../../../Components/CommentField";
import useAddLikes from "../../../Hooks/useAddLikes";
import AlertDialog from "../../../Components/AlertDialog";
import DeleteIcon from "@mui/icons-material/Delete";

export const Feed = () => {
  const [newComment, setNewComment] = React.useState<string>("");
  const { PostComments } = useAddComments();
  const { PostLikes } = useAddLikes();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [challengeId, setChallengeId] = React.useState<string>("");

  const { challenges } = React.useContext(adminContext);

  const { GetChallenges } = useGetChallenges();
  React.useEffect(() => {
    GetChallenges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let navigate = useNavigate();
  const { userType } = useParams();
  if (userType !== "customer" && userType !== "admin" && userType !== "brand") {
    navigate("/404_Not_Found");
  }

  const handleAddComment = () => {
    setNewComment("");
  };

  const handleComment = (challengeId: any | undefined) => {
    PostComments(challengeId, newComment);
  };
  const handleLikes = (challengeId: any | undefined) => {
    PostLikes(challengeId);
  };

  const userId = Number(window.localStorage.getItem("userId"));

  return (
    <>
      {userType === "brand" && (
        <>
          <AddChallengeModal
            open={modalOpen}
            setOpen={setModalOpen}
          ></AddChallengeModal>
          <AlertDialog
            open={dialogOpen}
            setOpen={setDialogOpen}
            challengeId={challengeId}
          ></AlertDialog>
        </>
      )}

      <PrimarySearchAppBar setModalOpen={setModalOpen}></PrimarySearchAppBar>

      <Box
        sx={{
          display: "flex",
          backgroundColor: "#eceff1",
          flexDirection: "column",
        }}
      >
        {challenges && (
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
                      userId === value.brand_id && (
                        <IconButton
                          aria-label="settings"
                          onClick={() => {
                            setDialogOpen(true);
                            setChallengeId(value.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )
                    }
                    title={value.title}
                    subheader={moment(value.created_at).format("ll")}
                  />
                  <CardActionArea
                    onClick={() => {
                      navigate(`/feed/brand/tricks/?ChallengeId=${value.id}`);
                    }}
                  >
                    <CardMedia
                      sx={{ maxHeight: "300px" }}
                      component="img"
                      image={`http://192.168.99.104:3000${value?.images[0]}`}
                    />
                  </CardActionArea>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>

                  {userType === "customer" && (
                    <>
                      <CardActions sx={{ justifyContent: "space-evenly" }}>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon
                            onClick={(e: any) => {
                              handleLikes(value.id);
                            }}
                          />
                        </IconButton>
                        <Typography sx={{ marginLeft: "-7.2rem" }}>
                          {value.counts}
                        </Typography>

                        <Tooltip title="Add a Trick">
                          <IconButton
                            aria-label="add a trick"
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                              setModalOpen(true);
                              setChallengeId(value.id);
                            }}
                          >
                            <FlashOnIcon />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                      {userType === "customer" && (
                        <Box
                          sx={{ display: "flex", flexDirection: "row", p: 1 }}
                        >
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
                            onChange={(event) =>
                              setNewComment(event.target.value)
                            }
                            value={newComment}
                          />
                          <Button
                            sx={{ textTransform: "none" }}
                            onClick={() => {
                              handleComment(value.id);
                              handleAddComment();
                            }}
                          >
                            Post
                          </Button>
                        </Box>
                      )}

                      <AddTrickModal
                        open={modalOpen}
                        setOpen={setModalOpen}
                        challengeId={challengeId}
                      ></AddTrickModal>
                    </>
                  )}
                  <CommentField commentsValue={value.comments} />
                </Card>
              );
            })}
          </Container>
        )}
      </Box>
    </>
  );
};
