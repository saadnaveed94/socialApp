import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";

const CommentField = (props: any) => {
  const [itemsToShow, setItemsToShow] = useState(5);
  const commentsField = props.commentsValue;
  const showmore = () => {
    setItemsToShow(commentsField.length);
  };
  const showless = () => {
    setItemsToShow(5);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              color: "#8b8b8b",
              cursor: "pointer",
            }}
          >
            View comments
          </button>
        </AccordionSummary>
        <AccordionDetails>
          {commentsField &&
            commentsField
              .slice(0, itemsToShow)
              .map((value: any, key: string) => {
                return (
                  <Box
                    key={value.id}
                    sx={{
                      lineHeight: "1rem",
                      paddingLeft: "10px",
                      marginBottom: "20px",
                      fontSize: "13px",
                      paddingBottom: "11px",
                    }}
                  >
                    {value?.description}
                  </Box>
                );
              })}

          {itemsToShow === 5 ? (
            <Box>
              <button
                style={{
                  marginTop: "1rem",
                  border: "none",
                  backgroundColor: "white",
                  color: "#8b8b8b",
                  cursor: "pointer",
                }}
                onClick={showmore}
              >
                View more comments
              </button>
            </Box>
          ) : (
            <button
              style={{
                marginTop: "1rem",
                border: "none",
                backgroundColor: "white",
                color: "#8b8b8b",
                cursor: "pointer",
              }}
              onClick={showless}
            >
              View less comments
            </button>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CommentField;
