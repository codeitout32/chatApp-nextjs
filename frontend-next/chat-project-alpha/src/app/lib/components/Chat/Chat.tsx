"use client";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import ChatPanel from "./ChatPanel/ChatPanel";
import { SocketContext } from "../../context/Socket";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";

import { useParams } from "next/navigation";
import { getChats } from "../../actions/chats";
import Messages from "./Messages";
import Sendbox from "./SendBox";

const Chat = () => {
  const [chat, setChat] = React.useState(null);
  const socket = useContext(SocketContext);
  const chats = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();
  const { chatId } = useParams();
  const prevChatId = useRef("");

  useEffect(() => {
    setChat(chats.find((chat) => chat.id === chatId));
  }, [chats]);

  useEffect(() => {
    if (prevChatId.current == chatId) return;
    if (!chats.find((chat) => chat.id === chatId)) return;

    socket.unSubscribeChatMessages(prevChatId.current);
    prevChatId.current = chatId as string;
    socket.subscribeChatMessages(chatId);
    getChats(dispatch);
  }, []);

  console.log("chat selected", chat, );

  if (chat)
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        flex={1}
        borderRight={1}
        borderColor={"divider"}
      >
        <ChatPanel chat={chat} />
        <Messages chat={chat} />
        <Sendbox chat={chat} />
      </Box>
    );
};

export default Chat;
