import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLinks from './shared/NavigationLinks'

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{bgcolor:"transparent", position:"static", boxShadow:"none"}}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
          <>
            <NavigationLinks 
              bg="#b995a1" 
              to="/chat" 
              text="Chat Now" 
              textColor='black'
            />
            <NavigationLinks
              bg="#2f2f30" 
              to="/" 
              text="Logout" 
              textColor='white'
              onClick={auth.logout}
              />
            </>
          ) : (
            <>
            <NavigationLinks 
              bg="#b995a1" 
              to="/login" 
              text="Login" 
              textColor='black'
            />
            <NavigationLinks
              bg="#2f2f30" 
              to="/signup" 
              text="Signup" 
              textColor='white'
            />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header