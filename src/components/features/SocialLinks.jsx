import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { SiBilibili, SiXiaohongshu } from 'react-icons/si'

/**
 * 社交链接组件 - 美式极简风格
 *
 * 功能：
 * - 展示 GitHub/小红书/B站/邮箱 链接
 * - 悬停时轻微缩放 + 颜色渐变
 * - 响应式布局
 *
 * 扩展点：可通过 props 传入自定义链接列表
 */
function SocialLinks() {
  const links = [
    {
      name: 'GitHub',
      url: 'https://github.com/MarchYuanx',
      icon: FaGithub,
      color: 'hover:text-gray-900',
    },
    {
      name: '小红书',
      url: 'https://www.xiaohongshu.com/user/profile/60cf61900000000001000cd5',
      icon: SiXiaohongshu,
      color: 'hover:text-red-500',
    },
    {
      name: 'B站',
      url: 'https://space.bilibili.com/17178880',
      icon: SiBilibili,
      color: 'hover:text-[#00A1D6]',
    },
    {
      name: 'Email',
      url: 'mailto:marchyuanx@foxmail.com',
      icon: FaEnvelope,
      color: 'hover:text-blue-500',
    },
  ]

  return (
    <div className="flex gap-6">
      {links.map((link) => {
        const Icon = link.icon
        const isEmail = link.url.startsWith('mailto:')

        return (
          <a
            key={link.name}
            href={link.url}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            className={`text-text-secondary transition-all duration-200 hover:scale-110 ${link.color}`}
            aria-label={link.name}
            onClick={isEmail ? (e) => {
              e.preventDefault()
              window.location.href = link.url
            } : undefined}
          >
            <Icon className="h-6 w-6" />
          </a>
        )
      })}
    </div>
  )
}

export default SocialLinks
