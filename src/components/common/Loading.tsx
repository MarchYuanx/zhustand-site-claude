/**
 * 加载态组件 - 美式极简风格
 *
 * 使用场景：
 * - 路由懒加载
 * - 数据加载中
 * - 异步操作等待
 */
function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* 加载动画 - 简约圆环 */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-surface-elevated border-t-primary dark:border-gray-700"></div>
        <p className="text-sm text-text-secondary dark:text-gray-400">Loading...</p>
      </div>
    </div>
  )
}

export default Loading
