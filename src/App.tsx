import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/common/ErrorBoundary'
import { useThemeStore } from './stores/themeStore'

function App() {
  const theme = useThemeStore((state) => state.theme)

  // 确保主题在应用启动时正确应用到 DOM
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

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
