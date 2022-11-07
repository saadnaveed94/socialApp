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
import DeleteIcon from "@mui/icons-material/Delete";
import PrimarySearchAppBar from "../../../components/Appbar";
import AddChallengeModal from "./AddChallengeModal";
import AddTrickModal from "./AddTrickModal";
import useGetChallenges from "../../../Hooks/useGetChallenges";
import { adminContext } from "../../../Contexts/Admin";
import moment from "moment/moment";
import AlertDialog from "../../../components/AlertDialog";

export const Feed = () => {
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
  let { userType } = useParams();
  if (userType !== "customer" && userType !== "admin" && userType !== "brand") {
    navigate("/404_Not_Found");
  }

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
        <Container sx={{ width: "40%", margin: "auto", marginTop: "100px" }}>
          {challenges.map((value: any, key: number) => {
            return (
              <Card
                key={value.id}
                sx={{ borderRadius: "12px", mb: 3, minHeight: "500px" }}
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
                      <Tooltip title="Like">
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                      </Tooltip>
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
                    <AddTrickModal
                      open={modalOpen}
                      setOpen={setModalOpen}
                      challengeId={challengeId}
                    ></AddTrickModal>
                  </>
                )}
              </Card>
            );
          })}
        </Container>
      </Box>
    </>
  );
};
