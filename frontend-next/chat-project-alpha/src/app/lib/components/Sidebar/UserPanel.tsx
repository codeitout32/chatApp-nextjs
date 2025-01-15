"use client"
import { getInitials } from '@/app/utils/functions'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { authServiceApi } from '../../services/auth'
import { useAppDispatch, useAppSelector } from '../../reduxHooks'
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { createPrivateChat } from '../../actions/chats'
import { SocketContext } from '../../context/Socket'
import { signOut } from '../../slices/authSlice'
// import { createPrivateChat } from '../../slices/chatSlice'

const UserPanel = () => {

   const socket =  useContext(SocketContext)

  const [signIn, result] = authServiceApi.useSignInUserMutation()
  const dispatch = useAppDispatch();
  const [newPrivateEmail, setNewPrivateEmail] = useState('')
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [openAddPrivate, setOpenAddPrivate] = useState(false)

  const auth = useAppSelector(state => state.auth)

  console.log('result up', auth);

  const openAddMenu = (e) => {
    setMenuAnchor(e.currentTarget)
  }
  const closeAddMenu = () => {
    setMenuAnchor(null)
  }

  const openAddPrivateDialog = () => {
    setOpenAddPrivate(true)
    setNewPrivateEmail('')
    closeAddMenu()
  }
  const closeAddPrivateDialog = () => {
    setOpenAddPrivate(false)
    setNewPrivateEmail('')
     
  }

  const handleAddPrivate = () => {
    if (!newPrivateEmail) return;
    createPrivateChat({email: newPrivateEmail, socket: socket}, dispatch)
    closeAddPrivateDialog()
  }

  const logout = () => {
    dispatch(signOut())
  }
  

  return (
    <Box 
    display={'flex'}
    justifyContent={'space-between'}
    p={2}
    borderBottom={1}
    borderColor={'divider'} 
    >
        <Box>
            <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${getInitials(auth.userData?.name)}`} />
        </Box>
        <Typography
        variant='h5'
        textAlign={'center'}
        style={{fontWeight: 'bold'}}
        ml={2}
        >
          Chats
        </Typography>
        <Box display={'flex'}>
          <IconButton onClick={openAddMenu}>
            <AddIcon />
          </IconButton>
          <Menu
        id="basic-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeAddMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={openAddPrivateDialog}>
        <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Private</ListItemText>
          
        </MenuItem>
        <MenuItem onClick={closeAddMenu}>
        <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Group</ListItemText>
        </MenuItem>
        {/* <MenuItem onClick={closeAddMenu}>Logout</MenuItem> */}
      </Menu>
      <Dialog
        open={openAddPrivate}
        onClose={closeAddPrivateDialog}
       fullWidth
          maxWidth='xs'
      >
        <DialogTitle id="alert-dialog-title">
        Create New Private Chat
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Enter User's Email Address.
          </DialogContentText>
          <TextField
          margin={'dense'}
          id='email'
          type='email'
          fullWidth
          variant='standard'
          value={newPrivateEmail}
          onChange={e => setNewPrivateEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddPrivateDialog}>Cancel</Button>
          <Button onClick={handleAddPrivate} autoFocus>
            Add Chat
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton onClick={logout}>
        <LogoutIcon />
        </IconButton>
          </Box>        
    </Box>     
  )
}

export default UserPanel