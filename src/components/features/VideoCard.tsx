import { useState, useEffect } from 'react'
import Card from '../common/Card'
import { getBilibiliVideoInfo, formatNumber, type BilibiliVideoInfo } from '../../utils/bilibiliApi'
import { FaPlay, FaThumbsUp, FaCoins, FaStar } from 'react-icons/fa'

/**
 * 视频卡片组件 - B 站 iframe 嵌入
 *
 * Props:
 * - url: B 站视频链接
 * - title: 视频标题（可选，优先使用 API 获取的标题）
 *
 * 功能：
 * - 使用 B 站官方 iframe 播放器
 * - 从 B 站 API 获取视频元数据（标题、播放量、点赞数等）
 * - 默认显示视频封面（第一帧）
 * - 点击播放按钮开始播放
 * - 自动提取 BV 号
 * - 响应式 16:9 比例
 * - 加载时显示骨架屏
 */

interface VideoCardProps {
  url: string
  title?: string
}

function VideoCard({ url, title }: VideoCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [videoInfo, setVideoInfo] = useState<BilibiliVideoInfo | null>(null)
  const [infoLoading, setInfoLoading] = useState(true)

  // 从 URL 中提取 BV 号
  const getBvid = (url: string): string => {
    const match = url.match(/BV[\w]+/)
    return match ? match[0] : ''
  }

  const bvid = getBvid(url)

  // 获取视频信息
  useEffect(() => {
    async function fetchVideoInfo() {
      if (bvid) {
        setInfoLoading(true)
        const info = await getBilibiliVideoInfo(bvid)
        setVideoInfo(info)
        setInfoLoading(false)
      }
    }
    fetchVideoInfo()
  }, [bvid])

  // 使用 API 获取的标题，如果没有则使用传入的 title
  const displayTitle = videoInfo?.title || title || '加载中...'

  return (
    <Card className="overflow-hidden" hover={false}>
      {/* 视频标题 */}
      <h3 className="mb-3 font-serif text-lg font-semibold tracking-wide text-text-primary line-clamp-2">
        {displayTitle}
      </h3>

      {/* 视频元数据 */}
      {!infoLoading && videoInfo && (
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-1.5">
            <FaPlay className="h-3.5 w-3.5" />
            <span>{formatNumber(videoInfo.view)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaThumbsUp className="h-3.5 w-3.5" />
            <span>{formatNumber(videoInfo.like)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaCoins className="h-3.5 w-3.5" />
            <span>{formatNumber(videoInfo.coin)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaStar className="h-3.5 w-3.5" />
            <span>{formatNumber(videoInfo.favorite)}</span>
          </div>
        </div>
      )}

      {/* 加载中的骨架屏 */}
      {infoLoading && (
        <div className="mb-4 flex gap-4">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
        </div>
      )}

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
