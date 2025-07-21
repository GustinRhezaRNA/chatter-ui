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

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {path === "/" ? (
            <Grid container>
              <Grid item md={3}>
                <ChatList />
              </Grid>
              <Grid item md={9}>
                <Routes />
              </Grid>
            </Grid>
          ) : (
            <Routes />
          )}
        </Guard>
        <CustomizedSnackbars />
      </ThemeProvider>
    </ApolloProvider >
  )
}

const Routes = () => {
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  )
}

export default App