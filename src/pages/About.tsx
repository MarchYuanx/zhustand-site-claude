import GitHubContributions from '../components/features/GitHubContributions'
import SocialLinks from '../components/features/SocialLinks'

/**
 * About Me 页面 - 美式极简风格
 *
 * 设计要点：
 * - 居中布局，充足留白
 * - 简洁的自我介绍
 * - GitHub 贡献日历展示
 * - 社交链接展示
 * - 柔和的视觉效果
 */
function About() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-16">
      {/* 内容区 */}
      <div className="w-full max-w-4xl">
        {/* 标题 - 艺术字体 */}
        <h1 className="mb-8 text-center font-serif text-4xl font-bold tracking-tight text-text-primary md:text-5xl dark:text-gray-100">
          About Me
        </h1>

        {/* 简介文字 - 优雅字体 */}
        <div className="mb-16 space-y-4 text-center">
          <p className="font-serif text-3xl tracking-wide text-gray-700 dark:text-gray-300">
            Hi, I&apos;m Zhustand 😄
          </p>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            曾用名 March Yuanx
            <br />
            AI 全栈工程师，热爱用代码和创作记录生活。
            <br />
            在这里分享我的作品、想法和日常。
          </p>
        </div>

        {/* GitHub 贡献日历 */}
        <div className="mb-12">
          <GitHubContributions username="MarchYuanx" />
        </div>

        {/* 社交链接 - 底部联系方式 */}
        <div className="flex justify-center border-t border-gray-200 pt-8 dark:border-gray-700">
          <SocialLinks />
        </div>
      </div>
    </div>
  )
}

export default About