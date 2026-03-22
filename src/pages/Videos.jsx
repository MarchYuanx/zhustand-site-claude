import VideoCard from '../components/features/VideoCard'
import { videos } from '../config/videos'

/**
 * 视频作品展示页
 *
 * 功能：
 * - 展示 B 站视频作品
 * - 美式卡片布局
 * - 响应式网格
 * - 视频数据统一在 src/config/videos.js 配置
 *
 * 扩展点：
 * - 可添加视频分类功能
 * - 可添加视频搜索/筛选功能
 */
function Videos() {

  return (
    <div className="py-8">
      {/* 页面标题 - 艺术字体 */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-text-primary">
          Videos
        </h1>
        <p className="font-serif tracking-wide text-text-secondary">我的视频作品集</p>
      </div>

      {/* 视频网格 - 两栏布局 */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {videos.map((video, index) => (
          <VideoCard key={index} url={video.url} title={video.title} />
        ))}
      </div>
    </div>
  )
}

export default Videos
