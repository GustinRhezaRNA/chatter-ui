import './App.css'
import { Container, createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material'
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
  const showChatList = path === '/' || path.includes('chats');

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          <Container maxWidth='xl'>
            {showChatList ? (
              <Grid container spacing={5}>
                <Grid size={{ md: 5, xs: 12, lg: 4, xl: 3 }} >
                  <ChatList />
                </Grid>
                <Grid size={{ md: 7, xs: 12, lg: 8, xl: 9 }} >
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>
        <CustomizedSnackbars />
      </ThemeProvider>
    </ApolloProvider >
  )
}

const Routes = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App