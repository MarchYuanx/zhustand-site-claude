import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/common/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <AppRouter />
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
