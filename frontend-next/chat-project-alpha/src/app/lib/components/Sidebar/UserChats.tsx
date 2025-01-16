"use client"
import React from "react";
import { useAppSelector } from "../../reduxHooks";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { getInitials, getOtherMember } from "@/app/utils/functions";

const UserChats = () => {
  const user = useAppSelector((state) => state.auth.userData);
  const chats = useAppSelector((state) => state.chats);
  const { chatId } = useParams();

  console.log('chats', chats);
  

  const chatBoxes = chats.map((chat) => {
    const otherUser = getOtherMember(chat.members, user?.id);

    return (
      <Link
        href={`/userPage/${chat.id}`}
        key={chat.id}
        style={{ textDecoration: "none" }}
      >
        <Button
          fullWidth
          sx={{
            textTransform: "none",
           backgroundColor: chatId == chat.id ? "action.selected" : null,
          }}
        >
          <Box display={"flex"} alignItems={"center"} width={"100%"} p={1}>
            <Avatar
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${getInitials(
                chat.type == "private" ? otherUser.name : chat.name
              )}`}
            />

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
            >
              <Typography variant="body1" ml={1}>
                {chat.type == "private" ? otherUser.name : chat.name}
              </Typography>
            </Box>
          </Box>
        </Button>
      </Link>
    );
  });
  return (
    <Box flex={1} p={2} sx={{ overflowY: "scroll" }}>
      {chatBoxes}
    </Box>
  );
};

export default UserChats;
