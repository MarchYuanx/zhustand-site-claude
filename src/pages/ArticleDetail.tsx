import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Loading from '@/components/common/Loading'
import { loadArticles } from '@/utils/fileLoader'
import type { ArticleData } from '@/utils/fileLoader'
import SEO from '@/components/common/SEO'
import { SITE_INFO } from '@/constants/seo'
import PageTransition from '@/components/common/PageTransition'
import markdownComponents from '@/components/common/MarkdownComponents'
import 'highlight.js/styles/github-dark.css'

interface TocItem {
  id: string
  text: string
  level: number
}

const estimateReadingTime = (content: string): number => {
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  const words = content.replace(/[\u4e00-\u9fa5]/g, '').trim().split(/\s+/).filter(Boolean).length
  const minutes = chineseChars / 300 + words / 200
  return Math.max(1, Math.round(minutes))
}

function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState<ArticleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')
  const [isTocCollapsed, setIsTocCollapsed] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const articles = await loadArticles()
        const found = articles.find((a) => a.id === id)
        setArticle(found || null)
      } catch (error) {
        console.error('Failed to load article:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  useLayoutEffect(() => {
    if (!contentRef.current) return

    const headings = contentRef.current.querySelectorAll('h1, h2, h3')
    const seen = new Set<string>()
    const tocData = Array.from(headings).reduce<TocItem[]>((acc, heading) => {
      if (!heading.id || seen.has(heading.id)) return acc
      seen.add(heading.id)
      const text = heading.textContent?.replace(/#/g, '').trim() || ''
      acc.push({ id: heading.id, text, level: parseInt(heading.tagName.charAt(1)) })
      return acc
    }, [])
    setToc(tocData)
  }, [article])

  const handleTocClick = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return
    setActiveId(id)
    navigate(`#${id}`, { replace: false })
    const top = element.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const readingTime = useMemo(
    () => (article ? estimateReadingTime(article.content) : 0),
    [article]
  )

  if (loading) return <Loading />

  if (!article) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-text-primary dark:text-gray-100">文章未找到</h1>
        <Link to="/articles" className="text-primary hover:underline">
          返回文章列表
        </Link>
      </div>
    )
  }

  return (
    <PageTransition>
      <SEO
        title={article.title}
        description={article.content.substring(0, 150)}
        keywords="文章, 博客, 技术分享"
        url={`${SITE_INFO.url}/articles/${article.id}`}
        type="article"
        author={SITE_INFO.author}
        publishedTime={article.date}
      />
      <div className="relative mx-auto max-w-[1600px] px-6 py-12 lg:px-12">
        <div className="flex gap-16">
          {/* 左侧：目录栏 */}
          <aside className="hidden lg:block lg:w-64">
            <div className="sticky top-28">
              {toc.length > 0 && (
                <nav className="overflow-hidden rounded-2xl border border-border dark:border-gray-700">
                  <button
                    onClick={() => setIsTocCollapsed(!isTocCollapsed)}
                    className="flex w-full items-center justify-between p-5 transition-colors hover:bg-surface-elevated/50 dark:hover:bg-gray-800/50"
                  >
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary dark:text-gray-500">
                      目录
                    </h2>
                    <svg
                      className={`h-4 w-4 text-text-tertiary transition-transform ${isTocCollapsed ? '-rotate-90' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {!isTocCollapsed && (
                    <div className="max-h-[calc(100vh-240px)] overflow-y-auto border-t border-border px-5 pb-5 dark:border-gray-700">
                      <ul className="space-y-1 pt-4">
                        {toc.map((item) => (
                          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
                            <button
                              onClick={() => handleTocClick(item.id)}
                              className={`block w-full rounded-lg px-3 py-2 text-left text-sm leading-relaxed transition-all hover:bg-surface-elevated dark:hover:bg-gray-800 ${
                                activeId === item.id
                                  ? 'font-semibold text-primary hover:bg-primary/5 dark:hover:bg-primary/10'
                                  : 'text-text-secondary hover:text-primary dark:text-gray-400'
                              }`}
                            >
                              {item.text}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </nav>
              )}
            </div>
          </aside>

          {/* 右侧：文章内容 */}
          <article ref={contentRef} className="min-w-0 flex-1">
            {/* 移动端返回按钮 */}
            <Link
              to="/articles"
              className="mb-8 inline-flex items-center rounded-2xl bg-surface-elevated px-6 py-4 text-text-secondary shadow-soft transition-all hover:scale-105 hover:text-primary hover:shadow-card dark:bg-gray-800 dark:text-gray-300 lg:hidden"
            >
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">返回列表</span>
            </Link>

            {/* 文章头部 */}
            <header className="mb-12 border-b border-border pb-10 dark:border-gray-700">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-text-primary lg:text-5xl dark:text-gray-100">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-text-secondary dark:text-gray-400">
                <span className="font-medium">{article.date}</span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  约 {readingTime} 分钟阅读
                </span>
              </div>
            </header>

            {/* Markdown 内容 */}
            <div className="markdown-body max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
                components={markdownComponents}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
    </PageTransition>
  )
}

export default ArticleDetail
