import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import MusicPlayer from '@/components/features/MusicPlayer'
import { useMusicStore } from '@/stores/musicStore'
import { useThemeStore } from '@/stores/themeStore'

/**
 * 页面布局容器
 *
 * 功能：
 * - 统一页面结构（Header + 内容区）
 * - 提供一致的内边距和最大宽度
 * - 全局音乐播放器（根据设置显示/隐藏）
 * - 预留 Footer 扩展位置
 */

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const showPlayer = useMusicStore((state) => state.showPlayer)
  const theme = useThemeStore((state) => state.theme)

  return (
    <motion.div
      className="min-h-screen bg-surface-base dark:bg-gray-900"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Header />

      {/* 主内容区 - 顶部留出 Header 高度 */}
      <motion.main
        className="mx-auto max-w-6xl px-6 pt-24 pb-12"
        key={theme}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.main>

      {/* 全局音乐播放器 - 根据设置显示 */}
      {showPlayer && <MusicPlayer />}

      {/* 扩展点：Footer 组件 */}
      {/* <Footer /> */}
    </motion.div>
  )
}

export default Layout
