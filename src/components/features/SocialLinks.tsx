import { SOCIAL_LINKS } from '../../constants'

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
  return (
    <div className="flex gap-6">
      {SOCIAL_LINKS.map((link) => {
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
