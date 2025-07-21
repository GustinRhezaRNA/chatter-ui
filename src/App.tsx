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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Grid container>
          <Grid item size={{ md: 3 }} >
            <ChatList />
          </Grid>
          <Grid item size={{ md: 3 }} >
            <Container>
              <Guard>
                <RouterProvider router={router} />
              </Guard>
            </Container>
          </Grid>
        </Grid>
        <CustomizedSnackbars />
      </ThemeProvider>
    </ApolloProvider >
  )
}

export default App