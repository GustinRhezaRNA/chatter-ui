import './App.css'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Auth from './components/auth/Auth'
import router from './components/Routes'
import { RouterProvider } from 'react-router-dom'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
})

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container>
          <RouterProvider router={router} />
        </Container>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App