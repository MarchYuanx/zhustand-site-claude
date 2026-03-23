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
 * - 加载状态处理
 */
function GitHubContributions({ username }: GitHubContributionsProps) {
  return (
    <div className="w-full">
      {/* 标题 - 优雅字体 */}
      <h2 className="mb-6 text-center font-serif text-2xl font-semibold tracking-wide text-text-primary">
        GitHub Contributions
      </h2>

      {/* 贡献图表卡片 */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition-all duration-200 hover:shadow-soft">
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt="GitHub Contributions"
          className="w-full"
          loading="lazy"
        />
      </div>

      {/* GitHub 链接 */}
      <div className="mt-4 text-center">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-text-tertiary transition-colors duration-200 hover:text-primary"
        >
          <span>View Full Profile</span>
          <span>→</span>
        </a>
      </div>
    </div>
  )
}

export default GitHubContributions
