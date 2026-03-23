import { useEffect } from 'react'

/**
 * 全屏弹窗组件
 *
 * Props:
 * - isOpen: 是否打开
 * - onClose: 关闭回调
 * - children: 弹窗内容
 *
 * 功能：
 * - 点击遮罩关闭
 * - ESC 键关闭
 * - 防止背景滚动
 */

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      // 禁止背景滚动
      document.body.style.overflow = 'hidden'

      // ESC 键关闭
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleEsc)

      return () => {
        document.body.style.overflow = 'unset'
        window.removeEventListener('keydown', handleEsc)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-overlay p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-2xl bg-surface-base p-4 shadow-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-surface-elevated p-2 text-text-secondary transition-all hover:bg-border hover:text-text-primary"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  )
}

export default Modal
