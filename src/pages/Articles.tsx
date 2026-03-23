import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '@/components/common/Card'
import Loading from '@/components/common/Loading'
import { loadArticles } from '@/utils/fileLoader'
import type { ArticleData } from '@/utils/fileLoader'
import SEO from '@/components/common/SEO'
import { SEO_CONFIG, SITE_INFO } from '@/constants/seo'
import PageTransition from '@/components/common/PageTransition'
import { staggerContainer, fadeInUpVariants } from '@/config/animations'

/**
 * 文章列表页
 *
 * 功能：
 * - 自动读取 /public/assets/articles 目录
 * - 展示文章标题、简介、发布时间
 * - 点击跳转详情页
 *
 * 扩展点：
 * - 预留标签分类接口
 * - 预留搜索功能
 * - 预留点赞功能
 */
function Articles() {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      const loadedArticles = await loadArticles()
      setArticles(loadedArticles)
      setLoading(false)
    }
    fetchArticles()
  }, [])

  if (loading) return <Loading />

  return (
    <PageTransition>
      <SEO
        title={SEO_CONFIG.articles.title}
        description={SEO_CONFIG.articles.description}
        keywords={SEO_CONFIG.articles.keywords}
        url={`${SITE_INFO.url}/articles`}
        type={SEO_CONFIG.articles.type}
        author={SITE_INFO.author}
      />
      <div className="py-8">
      {/* 页面标题 - 艺术字体 */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-text-primary dark:text-gray-100">
          Articles
        </h1>
        <p className="font-serif tracking-wide text-text-secondary dark:text-gray-400">我的文章作品集</p>
        <p className="mt-2 text-sm text-text-tertiary dark:text-gray-500">Powered by Claude Code</p>
      </div>

      {/* 扩展点：搜索/筛选组件插槽 */}
      {/* <SearchBar /> */}
      {/* <TagFilter /> */}

      {/* 文章列表 - 两栏布局 */}
      {articles.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={fadeInUpVariants}>
              <Link to={`/articles/${article.id}`}>
                <Card className="h-full transition-all hover:border-primary dark:hover:border-primary">
                  <h2 className="mb-2 font-serif text-2xl font-bold tracking-tight text-text-primary dark:text-gray-100">
                    {article.title}
                  </h2>
                  <p className="mb-4 line-clamp-2 text-text-secondary dark:text-gray-400">
                    {article.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm tabular-nums text-text-tertiary dark:text-gray-500">
                      {article.date}
                    </span>
                    <span className="font-serif text-sm font-medium tracking-wide text-primary">
                      阅读更多 →
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-text-secondary dark:text-gray-400">暂无文章</p>
          <p className="mt-2 text-sm text-text-tertiary dark:text-gray-500">
            请将 Markdown 文件放入 public/assets/articles 目录
          </p>
        </div>
      )}
    </div>
    </PageTransition>
  )
}

export default Articles
