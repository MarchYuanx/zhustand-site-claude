import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { SiBilibili, SiXiaohongshu } from 'react-icons/si'

/**
 * About Me 页面 - 美式极简风格
 *
 * 设计要点：
 * - 居中布局，充足留白
 * - 简洁的自我介绍
 * - 卡片式社交信息展示
 * - 柔和的视觉效果
 */
function About() {
  const socialCards = [
    {
      name: 'GitHub',
      username: 'MarchYuanx',
      url: 'https://github.com/MarchYuanx',
      icon: FaGithub,
      color: 'text-gray-900',
      bgColor: 'bg-gray-50',
      hoverColor: 'hover:bg-gray-100',
    },
    {
      name: 'Email',
      username: 'marchyuanx@foxmail.com',
      url: 'mailto:marchyuanx@foxmail.com',
      icon: FaEnvelope,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
    },
    {
      name: '小红书',
      username: '翔翔寄_Official',
      url: 'https://www.xiaohongshu.com/user/profile/60cf61900000000001000cd5',
      icon: SiXiaohongshu,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100',
    },
    {
      name: 'B站',
      username: '翔翔寄_Official',
      url: 'https://space.bilibili.com/17178880',
      icon: SiBilibili,
      color: 'text-[#00A1D6]',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
    },
  ]

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-12">
      {/* 内容区 */}
      <div className="w-full max-w-4xl">
        {/* 标题 - 艺术字体 */}
        <h1 className="mb-4 text-center font-serif text-5xl font-bold tracking-tight text-text-primary md:text-6xl">
          About Me
        </h1>

        {/* 简介文字 - 优雅字体 */}
        <p className="mb-12 text-center font-serif text-xl tracking-wide text-text-secondary md:text-2xl">
          这个人很懒什么都没有留下
        </p>

        {/* 社交信息卡片网格 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socialCards.map((card) => {
            const Icon = card.icon
            const isEmail = card.url.startsWith('mailto:')

            return (
              <a
                key={card.name}
                href={card.url}
                target={isEmail ? undefined : '_blank'}
                rel={isEmail ? undefined : 'noopener noreferrer'}
                className={`group rounded-2xl ${card.bgColor} p-6 shadow-card transition-all duration-200 hover:scale-105 hover:shadow-modal ${card.hoverColor}`}
              >
                {/* 图标 */}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-soft ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* 平台名称 */}
                <h3 className="mb-2 text-sm font-semibold text-text-secondary">
                  {card.name}
                </h3>

                {/* 账号名称 */}
                <p className="break-all text-sm text-text-tertiary group-hover:text-text-secondary transition-colors duration-200">
                  {card.username}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default About