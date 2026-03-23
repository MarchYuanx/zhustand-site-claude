import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import Layout from './components/layout/Layout'
import { MusicProvider } from './contexts/MusicContext'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MusicProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </MusicProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
