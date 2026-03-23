import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Loading from '../components/common/Loading'
import { loadArticles } from '../utils/fileLoader'
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
function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toc, setToc] = useState([])
  const [activeId, setActiveId] = useState('')
  const [isTocCollapsed, setIsTocCollapsed] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    async function fetchArticle() {
      const articles = await loadArticles()
      const found = articles.find((a) => a.id === id)
      setArticle(found)
      setLoading(false)
    }
    fetchArticle()
  }, [id])

  // 提取文章标题生成目录
  useEffect(() => {
    if (!contentRef.current) return

    const headings = contentRef.current.querySelectorAll('h1, h2, h3')
    const tocData = Array.from(headings).map((heading) => ({
      id: heading.id,
      text: heading.textContent,
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
  const handleTocClick = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (loading) return <Loading />

  if (!article) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-text-primary">文章未找到</h1>
        <Link to="/articles" className="text-primary hover:underline">
          返回文章列表
        </Link>
      </div>
    )
  }

  return (
    <div className="relative mx-auto max-w-[1600px] px-6 py-12 lg:px-12">
      {/* 两栏布局 */}
      <div className="flex gap-16">
        {/* 左侧：目录栏 */}
        <aside className="hidden lg:block lg:w-64">
          <div className="sticky top-28">
            {/* 目录栏 */}
            {toc.length > 0 && (
              <nav className="overflow-hidden rounded-2xl border border-border">
                {/* 目录头部 - 可折叠 */}
                <button
                  onClick={() => setIsTocCollapsed(!isTocCollapsed)}
                  className="flex w-full items-center justify-between p-5 transition-colors hover:bg-surface-elevated/50"
                >
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary">
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
                  <div className="max-h-[calc(100vh-240px)] overflow-y-auto border-t border-border px-5 pb-5">
                    <ul className="space-y-1 pt-4">
                      {toc.map((item) => (
                        <li
                          key={item.id}
                          style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                        >
                          <button
                            onClick={() => handleTocClick(item.id)}
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm leading-relaxed transition-all hover:bg-surface-elevated ${
                              activeId === item.id
                                ? 'font-semibold text-primary hover:bg-primary/5'
                                : 'text-text-secondary hover:text-primary'
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
            className="mb-8 inline-flex items-center rounded-2xl bg-surface-elevated px-6 py-4 text-text-secondary shadow-soft transition-all hover:scale-105 hover:text-primary hover:shadow-card lg:hidden"
          >
            <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">返回列表</span>
          </Link>

          {/* 文章头部 */}
          <header className="mb-12 border-b border-border pb-10">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-text-primary lg:text-5xl">{article.title}</h1>
            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <span className="font-medium">{article.date}</span>
            </div>
          </header>

        {/* Markdown 内容 */}
        <div className="markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // 标题渲染 - 添加 id 用于目录跳转
              h1: ({ children, ...props }) => {
                const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-\u4e00-\u9fa5]/g, '')
                return <h1 id={id} className="mb-6 mt-8 scroll-mt-24 font-serif text-3xl font-bold tracking-tight text-text-primary" {...props}>{children}</h1>
              },
              h2: ({ children, ...props }) => {
                const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-\u4e00-\u9fa5]/g, '')
                return <h2 id={id} className="mb-4 mt-8 scroll-mt-24 font-serif text-2xl font-bold tracking-tight text-text-primary" {...props}>{children}</h2>
              },
              h3: ({ children, ...props }) => {
                const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-\u4e00-\u9fa5]/g, '')
                return <h3 id={id} className="mb-3 mt-6 scroll-mt-24 font-serif text-xl font-semibold tracking-wide text-text-primary" {...props}>{children}</h3>
              },
              // 段落渲染
              p: (props) => (
                <p className="mb-4 leading-relaxed text-text-secondary" {...props} />
              ),
              // 列表渲染
              ul: (props) => (
                <ul className="mb-4 ml-6 list-disc space-y-2 text-text-secondary" {...props} />
              ),
              ol: (props) => (
                <ol className="mb-4 ml-6 list-decimal space-y-2 text-text-secondary" {...props} />
              ),
              li: (props) => (
                <li className="leading-relaxed" {...props} />
              ),
              // 代码块渲染
              code: ({ inline, ...props }) =>
                inline ? (
                  <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-sm text-primary" {...props} />
                ) : (
                  <code className="block rounded-xl bg-surface-elevated p-4 font-mono text-sm leading-relaxed" {...props} />
                ),
              pre: (props) => (
                <pre className="mb-4 overflow-x-auto rounded-xl bg-surface-elevated p-4 shadow-soft" {...props} />
              ),
              // 引用块渲染
              blockquote: (props) => (
                <blockquote className="mb-4 border-l-4 border-primary bg-surface-elevated pl-4 py-2 italic text-text-secondary" {...props} />
              ),
              // 表格渲染
              table: (props) => (
                <div className="mb-4 overflow-x-auto rounded-xl shadow-soft">
                  <table className="w-full border-collapse" {...props} />
                </div>
              ),
              thead: (props) => (
                <thead className="bg-surface-elevated" {...props} />
              ),
              th: (props) => (
                <th className="border border-border px-4 py-2 text-left font-semibold text-text-primary" {...props} />
              ),
              td: (props) => (
                <td className="border border-border px-4 py-2 text-text-secondary" {...props} />
              ),
              // 分割线渲染
              hr: (props) => (
                <hr className="my-8 border-border" {...props} />
              ),
              // 图片渲染 - 响应式适配
              img: (props) => (
                <img {...props} className="my-4 rounded-xl shadow-card" loading="lazy" />
              ),
              // 链接渲染
              a: (props) => (
                <a {...props} className="font-medium text-primary transition-colors hover:underline" target="_blank" rel="noopener noreferrer" />
              ),
              // 强调文本
              strong: (props) => (
                <strong className="font-semibold text-text-primary" {...props} />
              ),
              em: (props) => (
                <em className="italic text-text-secondary" {...props} />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
        </article>
      </div>

      {/* 扩展点：评论/点赞组件插槽 */}
      {/* <Comments articleId={article.id} /> */}
    </div>
  )
}

export default ArticleDetail
