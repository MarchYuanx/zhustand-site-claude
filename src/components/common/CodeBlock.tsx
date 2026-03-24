import React, { useState } from 'react'

/** 递归提取 React 节点中的纯文本 */
export const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (React.isValidElement(node)) return extractText((node.props as { children?: React.ReactNode }).children)
  return ''
}

/** 代码块组件：顶栏语言标签 + 一键复制 */
export default function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)

  const codeEl = React.Children.toArray(children)[0] as React.ReactElement
  const className = (codeEl?.props?.className as string) || ''
  const language =
    className.split(' ').find((c: string) => c.startsWith('language-'))?.replace('language-', '') || 'text'

  const handleCopy = async () => {
    const text = extractText(codeEl?.props?.children)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard 不可用（非 HTTPS 或权限拒绝）时静默失败
    }
  }

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 shadow-sm dark:border-gray-700">
      {/* 顶栏：语言 + 复制按钮 */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
        <span className="font-mono text-xs font-medium tracking-wider text-gray-400 dark:text-gray-500">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-500">已复制</span>
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>复制</span>
            </>
          )}
        </button>
      </div>
      {/* 代码内容 */}
      <pre className="overflow-x-auto bg-[#0d1117] p-5 text-sm leading-relaxed text-gray-300">{children}</pre>
    </div>
  )
}
