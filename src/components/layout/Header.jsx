import { Link, useLocation } from 'react-router-dom'

/**
 * 顶部导航组件 - 美式极简风格
 *
 * 设计要点：
 * - 固定顶部，半透明背景（玻璃态效果）
 * - 简洁导航链接，当前页面高亮
 * - 响应式设计，移动端自适应
 * - Logo 点击星星特效
 */
function Header() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/videos', label: 'Videos' },
    { path: '/articles', label: 'Articles' },
    { path: '/about', label: 'About' },
    { path: '/settings', label: 'Settings' },
  ]

  const isActive = (path) => location.pathname === path

  // 星星特效处理函数
  const handleLogoClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 创建 8 个星星
    for (let i = 0; i < 8; i++) {
      createStar(rect.left + x, rect.top + y, i)
    }
  }

  // 创建单个星星元素
  const createStar = (x, y) => {
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

        {/* 导航链接 - 优雅字体 */}
        <ul className="flex gap-8">
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
      </nav>
    </header>
  )
}

export default Header
