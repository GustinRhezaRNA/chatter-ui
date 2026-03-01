import './App.css'
import { Box, Container, createTheme, CssBaseline, Grid, ThemeProvider, useMediaQuery } from '@mui/material'
import router from './components/Routes'
import { RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './constants/apollo-client'
import { Guard } from './components/auth/Guard'
import Header from './components/auth/header/Header'
import CustomizedSnackbars from './components/snackbar/Snackbar'
import ChatList from './components/chat-list/ChatList'
import { usePath } from './hooks/usePath'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
})

const App = () => {
  const { path } = usePath();
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('md'));
  const showChatList = path === '/' || path.includes('chats');
  const isMobileChatOpen = isMobile && /\/chats\/.+/.test(path);
  const isProfilePage = path === '/profile';
  const isAuthPage = path === '/login' || path === '/signup';
  const hideHeader = isMobileChatOpen || isProfilePage || isAuthPage;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {!hideHeader && <Header />}
        <Guard>
          <Container maxWidth='xl' disableGutters>
            {showChatList ? (
              isMobile ? (
                // Mobile: show either the chat list OR the full-screen chat, never both
                isMobileChatOpen ? (
                  <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
                    <Routes />
                  </Box>
                ) : (
                  <ChatList />
                )
              ) : (
                // Desktop: side-by-side layout
                <Grid container>
                  <Grid size={{ md: 5, lg: 4, xl: 3 }}>
                    <ChatList />
                  </Grid>
                  <Grid size={{ md: 7, lg: 8, xl: 9 }}>
                    <Routes />
                  </Grid>
                </Grid>
              )
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>
        <CustomizedSnackbars />
      </ThemeProvider>
    </ApolloProvider>
  )
}

const Routes = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App