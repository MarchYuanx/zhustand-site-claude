import React from 'react'
import type { Components } from 'react-markdown'
import CodeBlock from './CodeBlock'

/** 生成标题的 id（用于锚点跳转） */
export const toHeadingId = (children: React.ReactNode) =>
  children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-\u4e00-\u9fa5]/g, '')

const ANCHOR_CLASS = 'ml-2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/40 no-underline'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & { children?: React.ReactNode; node?: unknown }

const makeHeading = (Tag: HeadingTag, className: string) =>
  ({ children, node: _node, ...props }: HeadingProps) => {
    const id = toHeadingId(children)
    return (
      <Tag {...props} id={id} className={className}>
        {children}
        <a href={`#${id}`} className={ANCHOR_CLASS}>#</a>
      </Tag>
    )
  }

/** react-markdown 自定义组件映射 */
const markdownComponents: Components = {
  // ── 标题：悬停显示锚点 # ──
  h1: makeHeading('h1', 'group mb-6 mt-8 scroll-mt-24 text-3xl font-bold tracking-tight text-text-primary dark:text-gray-100'),
  h2: makeHeading('h2', 'group mb-4 mt-10 scroll-mt-24 text-2xl font-bold tracking-tight text-text-primary dark:text-gray-100'),
  h3: makeHeading('h3', 'group mb-3 mt-8 scroll-mt-24 text-xl font-semibold text-text-primary dark:text-gray-100'),
  h4: makeHeading('h4', 'group mb-2 mt-6 scroll-mt-24 text-lg font-semibold text-text-primary dark:text-gray-100'),

  // ── 段落 & 列表 ──
  p: ({ node: _node, ...props }) => (
    <p className="mb-5 leading-7 text-text-secondary dark:text-gray-300" {...props} />
  ),
  ul: ({ node: _node, ...props }) => (
    <ul className="mb-5 ml-6 list-disc space-y-2 text-text-secondary dark:text-gray-300" {...props} />
  ),
  ol: ({ node: _node, ...props }) => (
    <ol className="mb-5 ml-6 list-decimal space-y-2 text-text-secondary dark:text-gray-300" {...props} />
  ),
  li: ({ node: _node, ...props }) => (
    <li className="leading-7 pl-1" {...props} />
  ),

  // ── 代码 ──
  // 块级代码交给 CodeBlock，行内代码通过 CSS (.markdown-body :not(pre) > code) 处理
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,

  // ── 引用 ──
  blockquote: ({ children }) => (
    <blockquote className="mb-5 rounded-r-lg border-l-[3px] border-primary/40 bg-primary/[0.03] pl-5 pr-4 dark:border-primary/50 dark:bg-primary/[0.06]">
      {children}
    </blockquote>
  ),

  // ── 表格 ──
  table: ({ node: _node, ...props }) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 shadow-sm dark:border-gray-700">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: ({ node: _node, ...props }) => (
    <thead className="bg-gray-50 dark:bg-gray-800/80" {...props} />
  ),
  th: ({ node: _node, ...props }) => (
    <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-tertiary dark:border-gray-700 dark:text-gray-400" {...props} />
  ),
  td: ({ node: _node, ...props }) => (
    <td className="border-b border-gray-100 px-4 py-3 text-text-secondary dark:border-gray-800 dark:text-gray-300" {...props} />
  ),

  // ── 其他元素 ──
  hr: ({ node: _node, ...props }) => (
    <hr className="my-10 border-border dark:border-gray-700" {...props} />
  ),
  img: ({ alt, node: _node, ...props }) => (
    <figure className="my-6">
      <img {...props} alt={alt} className="mx-auto rounded-xl shadow-card" loading="lazy" />
      {alt && <figcaption className="mt-2 text-center text-sm text-text-tertiary dark:text-gray-500">{alt}</figcaption>}
    </figure>
  ),
  a: ({ node: _node, ...props }) => (
    <a {...props} className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary" target="_blank" rel="noopener noreferrer" />
  ),
  strong: ({ node: _node, ...props }) => (
    <strong className="font-semibold text-text-primary dark:text-gray-100" {...props} />
  ),
  em: ({ node: _node, ...props }) => (
    <em className="italic text-text-secondary dark:text-gray-300" {...props} />
  ),
}

export default markdownComponents
