import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import Layout from './components/layout/Layout'
import { MusicProvider } from './contexts/MusicContext'

function App() {
  return (
    <BrowserRouter>
      <MusicProvider>
        <Layout>
          <AppRouter />
        </Layout>
      </MusicProvider>
    </BrowserRouter>
  )
}

export default App
