import './App.css'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import router from './components/Routes'
import { RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './constants/apollo-client'
import { Guard } from './components/auth/Guard'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Container>
            <Guard>
              <RouterProvider router={router} />
            </Guard>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App