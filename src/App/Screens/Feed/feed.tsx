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
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import PrimarySearchAppBar from "../../../Components/Appbar";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AddChallengeModal from "./AddChallengeModal";
import AddTrickModal from "./AddTrickModal";
import useGetChallenges from "../../../Hooks/useGetChallenges";
import { adminContext } from "../../../Contexts/Admin";
import moment from "moment/moment";
import useAddComments from "../../../Hooks/useAddComments";
import CommentField from "../../../Components/CommentField";
import useDeleteChallenge from "../../../Hooks/useDeleteChallenge";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import useAddLikes from "../../../Hooks/useAddLikes";
import { count } from "console";

export const Feed = () => {
  const [newComment, setNewComment] = React.useState<string>("");
  const { PostComments } = useAddComments();
  const { PostLikes } = useAddLikes();
  const [newLikes, setNewLikes] = React.useState<string>("");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [challengeId, setChallengeId] = React.useState<string>("");

  const { challenges, comments } = React.useContext(adminContext);

  const { GetChallenges } = useGetChallenges();
  React.useEffect(() => {
    GetChallenges();
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
    // setNewLikes(e.target.value);
  };

  const { DeleteChallenge } = useDeleteChallenge();

  return (
    <>
      {userType === "brand" && (
        <AddChallengeModal
          open={modalOpen}
          setOpen={setModalOpen}
        ></AddChallengeModal>
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
                      <IconButton
                        aria-label="settings"
                        onClick={() => {
                          DeleteChallenge(value.id);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={value.title}
                    subheader={moment(value.created_at).format("ll")}
                  />

                  <CardMedia
                    sx={{ maxHeight: "300px" }}
                    component="img"
                    image={`http://192.168.99.104:3000${value?.images[0]}`}

                    // image={
                    //   "http://192.168.99.104:3000/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9JYTJWNVNTSWhabUpyY21GNE5IbHlNVzUzZUdKM05XZDFhVFk0Y3pOaU4zYzVhUVk2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpVjJsdWJHbHVaVHNnWm1sc1pXNWhiV1U5SW1SdmQyNXNiMkZrSUNVeU9ERWxNamt1YW5CbFp5STdJR1pwYkdWdVlXMWxLajFWVkVZdE9DY25aRzkzYm14dllXUWxNakFsTWpneEpUSTVMbXB3WldjR093WlVPaEZqYjI1MFpXNTBYM1I1Y0dWSklnOXBiV0ZuWlM5cWNHVm5CanNHVkRvUmMyVnlkbWxqWlY5dVlXMWxPZ3BzYjJOaGJBPT0iLCJleHAiOiIyMDIyLTExLTAzVDEzOjI3OjAzLjk0OVoiLCJwdXIiOiJibG9iX2tleSJ9fQ==--6807dc99412faaf6ce0dcdd333b64491a5e02f6b/download%20(1).jpeg"
                    // }
                  />
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
                            onClick={(e:any) => {
                              handleLikes(value.id);
                            }}
                          />
                        </IconButton>
                        <Typography
                          sx={{ marginLeft: "-9.2rem", marginTop: "3rem" }}
                        >
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
