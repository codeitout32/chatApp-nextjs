
'use client'
import React, { useContext } from "react";
import { useAppDispatch } from "../../reduxHooks";
import { SocketContext } from "../../context/Socket";
import { sendMessage } from "../../actions/chats";
import { Box, IconButton, Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Sendbox = ({ chat }) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = React.useState("");
  const socket = useContext(SocketContext);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    sendMessage(dispatch, { message, socket, chatId: chat.id });

    setMessage("");
  };
  return (
    <Box p={2} borderColor={"divider"}>
      <Box component={"form"} display={"flex"} onSubmit={handleSendMessage}>
        <Input
          fullWidth
          disableUnderline
          placeholder="Aa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></Input>
        <IconButton size="large" type="submit">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sendbox;
