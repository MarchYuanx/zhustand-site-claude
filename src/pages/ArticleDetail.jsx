import { useState, useEffect } from 'react'
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
 * - 返回列表按钮
 *
 * 扩展点：
 * - 预留目录导航
 * - 预留评论功能
 * - 预留点赞功能
 */
function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      const articles = await loadArticles()
      const found = articles.find((a) => a.id === id)
      setArticle(found)
      setLoading(false)
    }
    fetchArticle()
  }, [id])

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
    <div className="py-8">
      {/* 返回按钮 */}
      <Link
        to="/articles"
        className="mb-8 inline-flex items-center text-text-secondary transition-colors hover:text-primary"
      >
        <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回列表
      </Link>

      {/* 文章内容 */}
      <article className="prose prose-lg mx-auto max-w-3xl">
        {/* 文章头部 */}
        <header className="mb-8 border-b border-border pb-8">
          <h1 className="mb-4 text-4xl font-bold text-text-primary">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span>{article.date}</span>
          </div>
        </header>

        {/* Markdown 内容 */}
        <div className="markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // 标题渲染 - 美式字体
              h1: ({ node, ...props }) => (
                <h1 className="mb-6 mt-8 font-serif text-3xl font-bold tracking-tight text-text-primary" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="mb-4 mt-8 font-serif text-2xl font-bold tracking-tight text-text-primary" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="mb-3 mt-6 font-serif text-xl font-semibold tracking-wide text-text-primary" {...props} />
              ),
              // 段落渲染
              p: ({ node, ...props }) => (
                <p className="mb-4 leading-relaxed text-text-secondary" {...props} />
              ),
              // 列表渲染
              ul: ({ node, ...props }) => (
                <ul className="mb-4 ml-6 list-disc space-y-2 text-text-secondary" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="mb-4 ml-6 list-decimal space-y-2 text-text-secondary" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="leading-relaxed" {...props} />
              ),
              // 代码块渲染
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-sm text-primary" {...props} />
                ) : (
                  <code className="block rounded-xl bg-surface-elevated p-4 font-mono text-sm leading-relaxed" {...props} />
                ),
              pre: ({ node, ...props }) => (
                <pre className="mb-4 overflow-x-auto rounded-xl bg-surface-elevated p-4 shadow-soft" {...props} />
              ),
              // 引用块渲染
              blockquote: ({ node, ...props }) => (
                <blockquote className="mb-4 border-l-4 border-primary bg-surface-elevated pl-4 py-2 italic text-text-secondary" {...props} />
              ),
              // 表格渲染
              table: ({ node, ...props }) => (
                <div className="mb-4 overflow-x-auto rounded-xl shadow-soft">
                  <table className="w-full border-collapse" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-surface-elevated" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="border border-border px-4 py-2 text-left font-semibold text-text-primary" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-border px-4 py-2 text-text-secondary" {...props} />
              ),
              // 分割线渲染
              hr: ({ node, ...props }) => (
                <hr className="my-8 border-border" {...props} />
              ),
              // 图片渲染 - 响应式适配
              img: ({ node, ...props }) => (
                <img {...props} className="my-4 rounded-xl shadow-card" loading="lazy" />
              ),
              // 链接渲染
              a: ({ node, ...props }) => (
                <a {...props} className="font-medium text-primary transition-colors hover:underline" target="_blank" rel="noopener noreferrer" />
              ),
              // 强调文本
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-text-primary" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic text-text-secondary" {...props} />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* 扩展点：评论/点赞组件插槽 */}
      {/* <Comments articleId={article.id} /> */}
    </div>
  )
}

export default ArticleDetail
