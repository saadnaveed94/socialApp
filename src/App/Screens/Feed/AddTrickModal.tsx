import * as React from "react";
import Textarea from "@mui/joy/Textarea";
import { Box, Button, Typography, Modal } from "@mui/material";
import { adminContext } from "../../../Contexts/Admin";
import usePostTrick from "../../../Hooks/usePostTrick";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  p: 4,
};

const styleMainBox = {
  mt: 2,
  width: "50%",
};

const styleButton = {
  textTransform: "none",
  color: "black",
  backgroundColor: "white",
  m: 1,
  "&.MuiButtonBase-root:hover": {
    bgcolor: "transparent",
  },
};

const styleTypography = {
  display: "flex",
  justifyContent: "center",

  mt: -2,
  fontWeight: "bold",
};

export default function AddTrickModal(props: any) {
  const handleClose = () => props.setOpen(false);
  const { challenges } = React.useContext(adminContext);

  const [trickDescription, setTrickDescription] = React.useState<string>("");
  const [trickImage, setTrickImage] = React.useState<any>(null);
  const [PreviewImage, setPreviewImage] = React.useState<string>("");

  var item = challenges.find((item: any) => item.id === props.challengeId);

  const handleChange = (e: any) => {
    setTrickImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const { postTrick } = usePostTrick();
  const handleClick = () => {
    postTrick(trickDescription, trickImage, item.id);
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={styleTypography}>
            {item?.title}
          </Typography>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {item?.description}
          </Typography>
          <Box sx={styleMainBox}>
            <Textarea
              sx={{ m: 2 }}
              placeholder="Description"
              onChange={(e) => {
                setTrickDescription(e.target.value);
              }}
            />

            <input
              accept="image/*"
              multiple
              type="file"
              onChange={handleChange}
            />
            <img src={PreviewImage} width="300px" height="auto" alt=""></img>
          </Box>

          <Box sx={{ display: "flex", mt: 3 }}>
            <Button variant="contained" onClick={handleClose} sx={styleButton}>
              Cancel
            </Button>
            <Button variant="contained" sx={styleButton} onClick={handleClick}>
              Challenge!
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
