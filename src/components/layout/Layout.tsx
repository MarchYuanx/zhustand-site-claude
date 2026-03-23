import Header from './Header'
import MusicPlayer from '../features/MusicPlayer'
import { useMusic } from '../../contexts/MusicContext'

/**
 * 页面布局容器
 *
 * 功能：
 * - 统一页面结构（Header + 内容区）
 * - 提供一致的内边距和最大宽度
 * - 全局音乐播放器（根据设置显示/隐藏）
 * - 预留 Footer 扩展位置
 */
function Layout({ children }) {
  const { showPlayer } = useMusic()

  return (
    <div className="min-h-screen bg-surface-base">
      <Header />

      {/* 主内容区 - 顶部留出 Header 高度 */}
      <main className="mx-auto max-w-6xl px-6 pt-24 pb-12">
        {children}
      </main>

      {/* 全局音乐播放器 - 根据设置显示 */}
      {showPlayer && <MusicPlayer />}

      {/* 扩展点：Footer 组件 */}
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
