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
    },
    {
      name: 'Email',
      username: 'marchyuanx@foxmail.com',
      url: 'mailto:marchyuanx@foxmail.com',
      icon: FaEnvelope,
      color: 'text-blue-500',
    },
    {
      name: '小红书',
      username: '翔翔寄_Official',
      url: 'https://www.xiaohongshu.com/user/profile/60cf61900000000001000cd5',
      icon: SiXiaohongshu,
      color: 'text-red-500',
    },
    {
      name: 'B站',
      username: '翔翔寄_Official',
      url: 'https://space.bilibili.com/17178880',
      icon: SiBilibili,
      color: 'text-[#00A1D6]',
    },
  ]

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-16">
      {/* 内容区 */}
      <div className="w-full max-w-3xl">
        {/* 标题 - 艺术字体 */}
        <h1 className="mb-6 text-center font-serif text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
          About Me
        </h1>

        {/* 简介文字 - 优雅字体 */}
        <div className="mb-16 space-y-3 text-center">
          <p className="font-serif text-2xl tracking-wide text-text-secondary">
            Hi, I'm Zustand 😄
          </p>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-text-tertiary">
            曾用名 March Yuanx
            <br />
            AI 全栈工程师，热爱用代码和创作记录生活。
            <br />
            在这里分享我的作品、想法和日常。
          </p>
        </div>

        {/* 社交信息卡片网格 */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {socialCards.map((card) => {
            const Icon = card.icon
            const isEmail = card.url.startsWith('mailto:')

            return (
              <a
                key={card.name}
                href={card.url}
                target={isEmail ? undefined : '_blank'}
                rel={isEmail ? undefined : 'noopener noreferrer'}
                className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:shadow-card"
              >
                {/* 图标 */}
                <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-surface-secondary ${card.color}`}>
                  <Icon className="h-8 w-8" />
                </div>

                {/* 账号名称 */}
                <p className="w-full break-all text-center text-xs text-text-tertiary transition-colors duration-200 group-hover:text-text-secondary">
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