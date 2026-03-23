import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

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

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/videos', label: 'Videos' },
    { path: '/articles', label: 'Articles' },
    { path: '/about', label: 'About' },
    { path: '/settings', label: 'Settings' },
  ]

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

    // 创建 8 个星星
    for (let i = 0; i < 8; i++) {
      createStar(rect.left + x, rect.top + y)
    }
  }

  // 创建单个星星元素
  const createStar = (x: number, y: number) => {
    const star = document.createElement('div')
    star.innerHTML = '★'

    // 随机选择蓝色或黑色
    const colors = ['#007AFF', '#1a1a1a']
    const color = colors[Math.floor(Math.random() * colors.length)]

    star.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      color: ${color};
      font-size: 12px;
      pointer-events: none;
      z-index: 9999;
      animation: starBurst 0.6s ease-out forwards;
      transform-origin: center;
    `

    // 向上扩散，左右随机偏移
    const horizontalOffset = (Math.random() - 0.5) * 60
    const verticalDistance = -40 - Math.random() * 20
    star.style.setProperty('--tx', `${horizontalOffset}px`)
    star.style.setProperty('--ty', `${verticalDistance}px`)

    document.body.appendChild(star)

    // 动画结束后移除元素
    setTimeout(() => star.remove(), 600)
  }

  return (
    <>
      <header className="glass fixed left-0 right-0 top-0 z-50 border-b border-border/50">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo - 艺术字体 */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="font-serif text-xl font-bold tracking-wide text-text-primary transition-all duration-200 hover:tracking-wider hover:text-primary"
          >
            Zhustand
          </Link>

          {/* 桌面端导航链接 */}
          <ul className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`font-serif text-sm font-medium tracking-wide transition-all duration-200 hover:tracking-wider hover:text-primary ${
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-text-secondary'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* 移动端汉堡菜单按钮 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-primary transition-colors duration-200 hover:text-primary md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </header>

      {/* 移动端侧边栏菜单 */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        {/* 背景遮罩 */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* 侧边栏内容 */}
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-modal transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* 关闭按钮 */}
          <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
            <span className="font-serif text-lg font-bold text-text-primary">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-text-secondary transition-colors duration-200 hover:text-primary"
              aria-label="Close menu"
            >
              <HiX className="h-6 w-6" />
            </button>
          </div>

          {/* 导航链接 */}
          <ul className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block rounded-xl px-4 py-3 font-serif text-base font-medium tracking-wide transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-surface-secondary hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header
