import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/common/Card'
import Loading from '../components/common/Loading'
import { loadArticles, ArticleData } from '../utils/fileLoader'

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
    <div className="py-8">
      {/* 页面标题 - 艺术字体 */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-text-primary">
          Articles
        </h1>
        <p className="font-serif tracking-wide text-text-secondary">我的文章作品集</p>
      </div>

      {/* 扩展点：搜索/筛选组件插槽 */}
      {/* <SearchBar /> */}
      {/* <TagFilter /> */}

      {/* 文章列表 - 两栏布局 */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <Link key={article.id} to={`/articles/${article.id}`}>
              <Card className="h-full transition-all hover:border-primary">
                <h2 className="mb-2 font-serif text-2xl font-bold tracking-tight text-text-primary">
                  {article.title}
                </h2>
                <p className="mb-4 line-clamp-2 text-text-secondary">
                  {article.content.substring(0, 150)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm tabular-nums text-text-tertiary">
                    {article.date}
                  </span>
                  <span className="font-serif text-sm font-medium tracking-wide text-primary">
                    阅读更多 →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-text-secondary">暂无文章</p>
          <p className="mt-2 text-sm text-text-tertiary">
            请将 Markdown 文件放入 public/assets/articles 目录
          </p>
        </div>
      )}
    </div>
  )
}

export default Articles
