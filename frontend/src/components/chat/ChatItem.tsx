import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

const ChatItem = ({content, role}:{content:string, role:"user"|"assistant"}) => {
    const auth = useAuth()
    return (
        role === 'assistant'?(
            <Box 
                sx={{display:'flex',p:2,bgcolor:"#3a141f", my: 2, gap:2}}
            >
                <Avatar sx={{ml: '0'}}>
                    <img src="dk-logo-png-transparent.png" alt="DK Logo" width={'30px'} />
                </Avatar>
                <Box>
                    <Typography fontSize={'20px'}>{content}</Typography>
                </Box>
            </Box>
            ):(
            <Box 
                sx={{display:'flex',p:2,bgcolor:"#973652", gap:2}}
            >
                <Avatar sx={{ml: '0', bgcolor:'black', color:'white'}}>
                    {auth?.user?.name[0]}
                    {auth?.user?.name.split(" ")[1][0]}
                </Avatar>
                <Box>
                    <Typography fontSize={'20px'}>{content}</Typography>
                </Box>
            </Box>
        )
    )
}

export default ChatItem