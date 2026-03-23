import VideoCard from '@/components/features/VideoCard'
import { videos } from '@/constants/videos'
import SEO from '@/components/common/SEO'
import { SEO_CONFIG, SITE_INFO } from '@/constants/seo'
import PageTransition from '@/components/common/PageTransition'

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
    <PageTransition>
      <SEO
        title={SEO_CONFIG.videos.title}
        description={SEO_CONFIG.videos.description}
        keywords={SEO_CONFIG.videos.keywords}
        url={`${SITE_INFO.url}/videos`}
        type={SEO_CONFIG.videos.type}
        author={SITE_INFO.author}
      />
      <div className="py-8">
      {/* 页面标题 - 艺术字体 */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-text-primary dark:text-gray-100">
          Videos
        </h1>
        <p className="font-serif tracking-wide text-text-secondary dark:text-gray-400">我的视频作品集</p>
        <p className="mt-2 text-sm text-text-tertiary dark:text-gray-500">Powered by CapCut & Bilibili Cut</p>
      </div>

      {/* 视频网格 - 两栏布局 */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {videos.map((video, index) => (
          <VideoCard key={index} url={video.url} title={video.title} />
        ))}
      </div>
    </div>
    </PageTransition>
  )
}

export default Videos
