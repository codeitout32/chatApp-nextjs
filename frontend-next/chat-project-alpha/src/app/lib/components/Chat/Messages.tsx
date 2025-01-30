import React from "react";
import { useAppSelector } from "../../reduxHooks";
import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const Messages = ({ chat }) => {
  console.log("message component", chat);

  const user = useAppSelector((state) => state.auth.userData);

  const messageBoxes = chat?.messages
    ?.slice()
    .sort((a:any, b:any): number => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
    .map((message) => {
      return (
        <Box
          key={uuidv4()}
          p={1}
          sx={{
           
            position: "relative",
            display: "flex",
            flexDirection: "column",
            marginRight: "auto",
            marginBottom: 3,
            marginLeft: 2,
            borderRadius: "10px",
            backgroundColor: "#eee",
            ...(message.sender.id == user?.id
              ? {
                  textAlign: "right",
                  alignItems: "flex-end",
                  marginRight: 2,
                  marginLeft: "auto",
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  "& $messageAuthor": {
                    right: "5px",
                    left: "auto",
                  },
                }
              : {}),
          }}
        >
          <Typography
            variant="caption"
            sx={{
            //   minWidth: "300px",
              position: "absolute",
              top: "-18px",
              left: "5px",
              color: "text.secondary",
              fontWeight: "bold",
            }}
          >
            {message.sender.id == user.id ? "You" : message.sender.name}
          </Typography>
          {message.text}
        </Box>
      );
    });
  return (
    <Box display={"flex"} flexDirection={"column-reverse"} sx={{
      overflowY: 'scroll'
    }} flex={1}>
      {messageBoxes}
    </Box>
  );
};

export default Messages;
