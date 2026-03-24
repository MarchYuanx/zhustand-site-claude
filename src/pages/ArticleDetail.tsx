import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Loading from '@/components/common/Loading'
import { loadArticles } from '@/utils/fileLoader'
import type { ArticleData } from '@/utils/fileLoader'
import SEO from '@/components/common/SEO'
import { SITE_INFO } from '@/constants/seo'
import PageTransition from '@/components/common/PageTransition'
import 'highlight.js/styles/github.css'

/**
 * 文章详情页
 *
 * 功能：
 * - Markdown 渲染（支持 GFM 语法）
 * - 代码高亮
 * - 图片自适应
 * - 目录导航（自动提取标题）
 * - 固定返回按钮
 *
 * 扩展点：
 * - 预留评论功能
 * - 预留点赞功能
 */

interface TocItem {
  id: string
  text: string
  level: number
}

// 生成标题 id 的辅助函数
const toHeadingId = (children: React.ReactNode) =>
  children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-\u4e00-\u9fa5]/g, '')

// 提取为模块级常量，避免每次渲染重建
const markdownComponents = {
  h1: ({ children, ...props }: any) => {
    const id = toHeadingId(children)
    return <h1 id={id} className="mb-6 mt-8 scroll-mt-24 font-serif text-3xl font-bold tracking-tight text-text-primary dark:text-gray-100" {...props}>{children}</h1>
  },
  h2: ({ children, ...props }: any) => {
    const id = toHeadingId(children)
    return <h2 id={id} className="mb-4 mt-8 scroll-mt-24 font-serif text-2xl font-bold tracking-tight text-text-primary dark:text-gray-100" {...props}>{children}</h2>
  },
  h3: ({ children, ...props }: any) => {
    const id = toHeadingId(children)
    return <h3 id={id} className="mb-3 mt-6 scroll-mt-24 font-serif text-xl font-semibold tracking-wide text-text-primary dark:text-gray-100" {...props}>{children}</h3>
  },
  p: (props: any) => (
    <p className="mb-4 leading-relaxed text-text-secondary dark:text-gray-300" {...props} />
  ),
  ul: (props: any) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-text-secondary dark:text-gray-300" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-text-secondary dark:text-gray-300" {...props} />
  ),
  li: (props: any) => (
    <li className="leading-relaxed" {...props} />
  ),
  code: ({ inline, ...props }: any) =>
    inline ? (
      <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-sm text-primary dark:bg-gray-800 dark:text-blue-400" {...props} />
    ) : (
      <code className="block rounded-xl bg-surface-elevated p-4 font-mono text-sm leading-relaxed dark:bg-gray-800" {...props} />
    ),
  pre: (props: any) => (
    <pre className="mb-4 overflow-x-auto rounded-xl bg-surface-elevated p-4 shadow-soft dark:bg-gray-800" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="mb-4 border-l-4 border-primary bg-surface-elevated pl-4 py-2 italic text-text-secondary dark:bg-gray-800 dark:text-gray-300" {...props} />
  ),
  table: (props: any) => (
    <div className="mb-4 overflow-x-auto rounded-xl shadow-soft">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-surface-elevated dark:bg-gray-800" {...props} />
  ),
  th: (props: any) => (
    <th className="border border-border px-4 py-2 text-left font-semibold text-text-primary dark:border-gray-700 dark:text-gray-100" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-border px-4 py-2 text-text-secondary dark:border-gray-700 dark:text-gray-300" {...props} />
  ),
  hr: (props: any) => (
    <hr className="my-8 border-border dark:border-gray-700" {...props} />
  ),
  img: (props: any) => (
    <img {...props} className="my-4 rounded-xl shadow-card" loading="lazy" />
  ),
  a: (props: any) => (
    <a {...props} className="font-medium text-primary transition-colors hover:underline" target="_blank" rel="noopener noreferrer" />
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-text-primary dark:text-gray-100" {...props} />
  ),
  em: (props: any) => (
    <em className="italic text-text-secondary dark:text-gray-300" {...props} />
  ),
}

function ArticleDetail() {
  const { id } = useParams()
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

  // 提取文章标题生成目录
  useEffect(() => {
    if (!contentRef.current) return

    const headings = contentRef.current.querySelectorAll('h1, h2, h3')
    const tocData = Array.from(headings).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }))
    setToc(tocData)
  }, [article])

  // 滚动监听，高亮当前标题
  useEffect(() => {
    if (!contentRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    const headings = contentRef.current.querySelectorAll('h1, h2, h3')
    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [article])

  // 点击目录跳转
  const handleTocClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
      {/* 两栏布局 */}
      <div className="flex gap-16">
        {/* 左侧：目录栏 */}
        <aside className="hidden lg:block lg:w-64">
          <div className="sticky top-28">
            {/* 目录栏 */}
            {toc.length > 0 && (
              <nav className="overflow-hidden rounded-2xl border border-border dark:border-gray-700">
                {/* 目录头部 - 可折叠 */}
                <button
                  onClick={() => setIsTocCollapsed(!isTocCollapsed)}
                  className="flex w-full items-center justify-between p-5 transition-colors hover:bg-surface-elevated/50 dark:hover:bg-gray-800/50"
                >
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary dark:text-gray-500">
                    目录
                  </h2>
                  <svg
                    className={`h-4 w-4 text-text-tertiary transition-transform ${
                      isTocCollapsed ? '-rotate-90' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 目录内容 */}
                {!isTocCollapsed && (
                  <div className="max-h-[calc(100vh-240px)] overflow-y-auto border-t border-border px-5 pb-5 dark:border-gray-700">
                    <ul className="space-y-1 pt-4">
                      {toc.map((item) => (
                        <li
                          key={item.id}
                          style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                        >
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
        <article ref={contentRef} className="prose prose-lg min-w-0 flex-1">
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
            <h1 className="mb-6 text-4xl font-bold leading-tight text-text-primary lg:text-5xl dark:text-gray-100">{article.title}</h1>
            <div className="flex items-center gap-6 text-sm text-text-secondary dark:text-gray-400">
              <span className="font-medium">{article.date}</span>
            </div>
          </header>

        {/* Markdown 内容 */}
        <div className="markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={markdownComponents}
          >
            {article.content}
          </ReactMarkdown>
        </div>
        </article>
      </div>

      {/* 扩展点：评论/点赞组件插槽 */}
      {/* <Comments articleId={article.id} /> */}
      </div>
    </PageTransition>
  )
}

export default ArticleDetail
