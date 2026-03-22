import SocialLinks from '../components/features/SocialLinks'

/**
 * 首页 Hero 模块 - 美式极简风格
 *
 * 设计要点：
 * - 对标 lvyovo-wiki.tech 的极简布局
 * - 充足留白，视觉焦点突出
 * - 柔和动效，克制交互
 *
 * 核心内容：
 * - 个人信息（姓名 + 职业）
 * - 社交链接（GitHub/小红书/B站/邮箱）
 */
function Home() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      {/* Hero 内容区 */}
      <div className="text-center">
        {/* 姓名 - 视觉焦点 - 艺术字体 */}
        <h1 className="group relative mb-6 font-serif text-7xl font-bold tracking-tight text-transparent md:text-8xl lg:text-9xl">
          {/* 渐变文字效果 */}
          <span className="bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 bg-clip-text transition-all duration-500 group-hover:from-gray-800 group-hover:via-gray-600 group-hover:to-gray-800">
            Zhustand
          </span>
          {/* 微妙的文字阴影 */}
          <span className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-pink-100/30 bg-clip-text blur-2xl">
            Zhustand
          </span>
        </h1>

        {/* 职业描述 - 次级信息 - 优雅字体 */}
        <p className="mb-12 font-serif text-xl tracking-widest text-text-secondary md:text-2xl">
          <span className="inline-block transition-all duration-300 hover:tracking-[0.3em]">
            frontend
          </span>
          <span className="mx-3 text-gray-400">→</span>
          <span className="inline-block transition-all duration-300 hover:tracking-[0.3em]">
            fullstack
          </span>
        </p>

        {/* 社交链接 */}
        <div className="flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </div>
  )
}

export default Home
