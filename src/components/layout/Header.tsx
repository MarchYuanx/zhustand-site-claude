import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi'
import { NAV_ITEMS, Z_INDEX, ANIMATION_DURATION, STAR_EFFECT } from '@/constants'
import { useThemeStore } from '@/stores/themeStore'
import { mobileMenuVariants, mobileMenuTransition, overlayVariants } from '@/config/animations'

/**
 * 顶部导航组件 - 美式极简风格
 *
 * 设计要点：
 * - 固定顶部，半透明背景（玻璃态效果）
 * - 简洁导航链接，当前页面高亮
 * - 响应式设计，移动端汉堡菜单
 * - Logo 点击星星特效
 */
function Header() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useThemeStore()

  // 路由变化时关闭移动菜单
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // 禁止移动菜单打开时的背景滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const isActive = (path: string): boolean => {
    // 首页精确匹配
    if (path === '/') return location.pathname === '/'
    // 其他页面支持前缀匹配（如 /articles 匹配 /articles/xxx）
    return location.pathname.startsWith(path)
  }

  // 星星特效处理函数
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 创建星星
    for (let i = 0; i < STAR_EFFECT.COUNT; i++) {
      createStar(rect.left + x, rect.top + y)
    }
  }

  // 创建单个星星元素
  const createStar = (x: number, y: number) => {
    const star = document.createElement('div')
    star.innerHTML = '★'

    // 随机选择颜色
    const color = STAR_EFFECT.COLORS[Math.floor(Math.random() * STAR_EFFECT.COLORS.length)]

    star.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      color: ${color};
      font-size: 12px;
      pointer-events: none;
      z-index: ${Z_INDEX.STAR_EFFECT};
      animation: starBurst ${ANIMATION_DURATION.STAR_BURST}ms ease-out forwards;
      transform-origin: center;
    `

    // 向上扩散，左右随机偏移
    const horizontalOffset = (Math.random() - 0.5) * STAR_EFFECT.HORIZONTAL_OFFSET_MAX
    const verticalDistance = -STAR_EFFECT.VERTICAL_DISTANCE_MIN - Math.random() * STAR_EFFECT.VERTICAL_DISTANCE_RANDOM
    star.style.setProperty('--tx', `${horizontalOffset}px`)
    star.style.setProperty('--ty', `${verticalDistance}px`)

    document.body.appendChild(star)

    // 动画结束后移除元素
    setTimeout(() => star.remove(), ANIMATION_DURATION.STAR_BURST)
  }

  return (
    <>
      <header className="glass fixed left-0 right-0 top-0 border-b border-border/50 dark:border-gray-700" style={{ zIndex: Z_INDEX.HEADER }}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo - 艺术字体 */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="font-serif text-xl font-bold tracking-wide text-text-primary transition-all duration-200 hover:tracking-wider hover:text-primary dark:text-gray-100"
          >
            Zhustand
          </Link>

          {/* 桌面端导航链接 */}
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.path} className="relative">
                  <Link
                    to={item.path}
                    className={`relative font-serif text-sm font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                      isActive(item.path)
                        ? 'text-primary'
                        : 'text-text-secondary dark:text-gray-400'
                    }`}
                  >
                    {item.label}
                    {/* 下划线指示器 */}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 主题切换按钮 */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-text-secondary transition-all duration-200 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <HiMoon className="h-5 w-5" />
              ) : (
                <HiSun className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* 移动端按钮组 */}
          <div className="flex items-center gap-3 md:hidden">
            {/* 主题切换按钮 */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-text-secondary transition-all duration-200 hover:scale-110 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <HiMoon className="h-5 w-5" />
              ) : (
                <HiSun className="h-5 w-5" />
              )}
            </button>

            {/* 汉堡菜单按钮 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-primary transition-colors duration-200 hover:text-primary dark:text-gray-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* 移动端侧边栏菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 md:hidden"
            style={{ zIndex: Z_INDEX.MOBILE_MENU_OVERLAY }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* 背景遮罩 */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              variants={overlayVariants}
              transition={{ duration: 0.2 }}
            />

            {/* 侧边栏内容 */}
            <motion.div
              className="absolute right-0 top-0 h-full w-64 bg-white shadow-modal dark:bg-gray-800"
              variants={mobileMenuVariants}
              transition={mobileMenuTransition}
            >
          {/* 关闭按钮 */}
          <div className="flex items-center justify-between border-b border-border/50 px-6 py-4 dark:border-gray-700">
            <span className="font-serif text-lg font-bold text-text-primary dark:text-gray-100">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-text-secondary transition-colors duration-200 hover:text-primary dark:text-gray-400"
              aria-label="Close menu"
            >
              <HiX className="h-6 w-6" />
            </button>
          </div>

          {/* 导航链接 */}
          <ul className="flex flex-col px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block rounded-xl px-4 py-3 font-serif text-base font-medium tracking-wide transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-gray-100 hover:text-primary dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
