import { useState } from 'react'

interface GitHubContributionsProps {
  username: string
}

/**
 * GitHub 贡献日历组件 - iOS 风格
 *
 * 使用 GitHub Readme Stats 服务渲染贡献图表
 * 设计要点：
 * - 简洁的卡片布局
 * - 响应式设计
 * - 优雅的加载状态
 */
function GitHubContributions({ username }: GitHubContributionsProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="w-full">
      {/* 标题 - 优雅字体 */}
      <h2 className="mb-6 text-center font-serif text-2xl font-semibold tracking-wide text-text-primary dark:text-gray-100">
        GitHub Contributions
      </h2>

      {/* 贡献图表卡片 */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition-all duration-200 hover:shadow-soft dark:border-gray-700 dark:bg-gray-800">
        {/* Loading 骨架屏 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary dark:border-gray-700"></div>
              <p className="text-sm text-text-tertiary dark:text-gray-500">Loading contributions...</p>
            </div>
          </div>
        )}

        {/* 贡献图表 */}
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt="GitHub Contributions"
          className="w-full"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>

      {/* GitHub 链接 */}
      <div className="mt-4 text-center">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"

          className="inline-flex items-center gap-1 text-sm text-text-tertiary transition-colors duration-200 hover:text-primary dark:text-gray-500 dark:hover:text-primary"
        >
          <span>View Full Profile</span>
          <span>→</span>
        </a>
      </div>
    </div>
  )
}

export default GitHubContributions
