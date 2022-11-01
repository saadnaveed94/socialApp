import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useEffect } from "react";
import useComments from "../Hooks/useShowComments";
import { adminContext } from "../Contexts/Admin";
import Box from "@mui/material/Box";

const CommentField = () => {
  const { GetComments } = useComments();
  const { comments } = React.useContext(adminContext);
  useEffect(() => {
    GetComments("33");
  }, []);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Show comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {comments.map((value: any) => {
            return (
              <Box
                sx={{
                  lineHeight: "3rem",
                  borderBottom: "1px solid rgb(230 230 230 / 87%);",
                  paddingLeft: "20px",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                {value.description}
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CommentField;
