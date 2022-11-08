import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { adminContext } from "../../../Contexts/Admin";
import ChallengeCard from "./ChallengeCard";
import { Container, Box } from "@mui/material";
import useGetTricks from "../../../Hooks/useGetTricks";
import PrimarySearchAppBar from "../../../Components/Appbar";
const styleContainer = {
  display: "flex",
  mt: 9,
};

export const Tricks = () => {
  const [previewImage, setPreviewImage] = React.useState<string>("");
  const { challenges, tricks } = React.useContext(adminContext);

  const url = new URL(window.location.href);
  const challengeId = Number(url.searchParams.get("ChallengeId"));
  const item = challenges.find((item: any) => item.id === challengeId);
  const { GetTricks } = useGetTricks();

  React.useEffect(() => {
    GetTricks(challengeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <Container sx={styleContainer}>
        <ChallengeCard
          avatar={item?.brand_id}
          title={item?.title}
          description={item?.description}
        ></ChallengeCard>
        <ImageList sx={{ width: 450, height: 400 }}>
          {tricks &&
            tricks.map((data: any) => (
              <ImageListItem key={data.id}>
                <img
                  src={`http://192.168.99.104:3000${data?.images}`}
                  alt="trick img"
                  loading="lazy"
                />
                <ImageListItemBar
                  title={data.description}
                  subtitle={<span>by: {data?.customer_info?.name}</span>}
                  position="below"
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Container>
    </>
  );
};
