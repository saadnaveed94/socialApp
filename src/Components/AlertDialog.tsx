import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useDeleteChallenge from "../Hooks/useDeleteChallenge";

export default function AlertDialog(props: any) {
  const handleClose = () => {
    props.setOpen(false);
  };
  const { DeleteChallenge } = useDeleteChallenge();
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, challenge cannot be retrieved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              DeleteChallenge(props.challengeId);
              handleClose();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
