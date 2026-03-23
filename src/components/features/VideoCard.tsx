import { useState } from 'react'
import Card from '../common/Card'

/**
 * 视频卡片组件 - B 站 iframe 嵌入
 *
 * Props:
 * - url: B 站视频链接
 * - title: 视频标题
 *
 * 功能：
 * - 使用 B 站官方 iframe 播放器
 * - 默认显示视频封面（第一帧）
 * - 点击播放按钮开始播放
 * - 自动提取 BV 号
 * - 响应式 16:9 比例
 * - 加载时显示骨架屏
 */
function VideoCard({ url, title }) {
  const [isLoading, setIsLoading] = useState(true)

  // 从 URL 中提取 BV 号
  const getBvid = (url) => {
    const match = url.match(/BV[\w]+/)
    return match ? match[0] : ''
  }

  const bvid = getBvid(url)

  return (
    <Card className="overflow-hidden" hover={false}>
      {/* 视频标题 */}
      <h3 className="mb-4 font-serif text-lg font-semibold tracking-wide text-text-primary">
        {title}
      </h3>

      {/* B 站 iframe 播放器 - 默认显示封面 */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
        {/* 骨架屏加载占位符 */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex flex-col items-center gap-4">
              {/* 加载动画 - 转圈效果 */}
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
              <p className="font-sans text-sm font-medium tracking-wider text-text-secondary">Loading...</p>
            </div>
          </div>
        )}

        {bvid ? (
          <iframe
            src={`//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`}
            scrolling="no"
            border="0"
            frameBorder="no"
            allowFullScreen={true}
            className="absolute left-0 top-0 h-full w-full"
            title={title}
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-text-secondary">无效的视频链接</p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default VideoCard
