import './App.css'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'

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
          <h1>Hi, Are tou there?
          </h1>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App