import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from '../components/common/Loading'
import { ROUTES } from '../constants'

// 懒加载页面组件 - 提升首屏加载性能
const Home = lazy(() => import('../pages/Home'))
const Gallery = lazy(() => import('../pages/Gallery'))
const Videos = lazy(() => import('../pages/Videos'))
const Articles = lazy(() => import('../pages/Articles'))
const ArticleDetail = lazy(() => import('../pages/ArticleDetail'))
const About = lazy(() => import('../pages/About'))
const Settings = lazy(() => import('../pages/Settings'))

/**
 * 路由配置 - 采用懒加载 + 模块化设计
 *
 * 扩展点：
 * 1. 新增页面：在 pages 目录创建组件，在此添加路由配置
 * 2. 嵌套路由：使用 <Route> 的 children 属性
 * 3. 路由守卫：在此添加权限验证逻辑
 */
function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.GALLERY} element={<Gallery />} />
        <Route path={ROUTES.VIDEOS} element={<Videos />} />
        <Route path={ROUTES.ARTICLES} element={<Articles />} />
        <Route path={ROUTES.ARTICLE_DETAIL} element={<ArticleDetail />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />

        {/* 扩展点：在此添加新路由 */}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
