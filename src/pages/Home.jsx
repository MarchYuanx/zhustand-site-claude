import SocialLinks from '../components/features/SocialLinks'
import { FaReact } from 'react-icons/fa'
import { SiTypescript, SiVercel, SiVite, SiTailwindcss, SiClaude } from 'react-icons/si'

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
 * - 技术栈展示
 * - 社交链接（GitHub/小红书/B站/邮箱）
 */
function Home() {
  const techStack = [
    { name: 'React', icon: FaReact, color: 'text-[#61DAFB]' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
    { name: 'Vite', icon: SiVite, color: 'text-[#646CFF]' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
    { name: 'Vercel', icon: SiVercel, color: 'text-gray-900' },
    { name: 'Claude Code', icon: SiClaude, color: 'text-[#D97757]' },
  ]

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      {/* Hero 内容区 */}
      <div className="text-center">
        {/* 姓名 - 视觉焦点 - 艺术字体 */}
        <h1 className="group relative mb-6 font-serif text-7xl font-bold tracking-tight md:text-8xl lg:text-9xl">
          {/* 渐变文字效果 */}
          <span className="inline-block bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent transition-transform duration-500 group-hover:-translate-x-2">
            Zhu
          </span>
          <span className="inline-block bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent transition-transform duration-500 group-hover:translate-x-2">
            stand
          </span>
          {/* 微妙的文字阴影 - 保持静止 */}
          <span className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-pink-100/30 bg-clip-text text-transparent blur-2xl">
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

        {/* 技术栈展示 */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => {
              const Icon = tech.icon
              return (
                <div
                  key={tech.name}
                  className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:shadow-card"
                >
                  <Icon className={`h-4 w-4 ${tech.color} grayscale transition-all duration-300 group-hover:grayscale-0`} />
                  <span className="text-sm font-medium text-text-secondary">{tech.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 社交链接 */}
        <div className="flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </div>
  )
}

export default Home
