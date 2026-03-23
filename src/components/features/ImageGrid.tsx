import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCopy, FiCheck } from 'react-icons/fi'
import type { ImageData } from '../../utils/fileLoader'
import { staggerContainer, fadeInUpVariants, overlayVariants } from '../../config/animations'

/**
 * 图片网格组件 - 美式网格布局
 *
 * Props:
 * - images: 图片数组 [{ src, alt, name, prompt, negativePrompt, lora }]
 *
 * 功能：
 * - 响应式网格（桌面 3-4 列，移动 1-2 列）
 * - 图片懒加载
 * - hover 轻微放大
 * - 点击全屏预览（左侧大图 + 右侧信息面板）
 * - 信息面板支持复制功能
 *
 * 扩展点：预留分类筛选插槽
 */

interface ImageGridProps {
  images: ImageData[]
}

function ImageGrid({ images }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // 复制到剪贴板
  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // ESC 键关闭预览
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedImage(null)
      }
      window.addEventListener('keydown', handleEsc)
      return () => {
        document.body.style.overflow = 'unset'
        window.removeEventListener('keydown', handleEsc)
      }
    }
  }, [selectedImage])

  return (
    <>
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {images.map((image: ImageData, index: number) => (
          <motion.div
            key={index}
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-surface-elevated shadow-soft"
            onClick={() => setSelectedImage(image)}
          >
            <motion.img
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              loading="lazy"
              className="h-64 w-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* 全屏预览弹窗 - 左右布局 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative flex h-[85vh] w-full max-w-7xl gap-6 overflow-hidden rounded-2xl bg-surface-base shadow-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
            {/* 关闭按钮 */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-surface-elevated p-2 text-text-secondary transition-all hover:bg-border hover:text-text-primary"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 左侧：大图展示 */}
            <div className="flex flex-1 items-center justify-center overflow-hidden bg-surface-elevated p-8">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-full max-w-full rounded-xl object-contain"
              />
            </div>

            {/* 右侧：信息面板 */}
            <div className="w-80 flex-shrink-0 overflow-y-auto bg-surface-base p-6">
              <h3 className="mb-6 text-xl font-semibold text-text-primary">Image Info</h3>

              {/* Name */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Name</label>
                  {selectedImage.name && (
                    <button
                      onClick={() => copyToClipboard(selectedImage.name, 'name')}
                      className="rounded p-1 text-text-tertiary transition-colors hover:bg-surface-elevated hover:text-text-primary"
                      title="Copy name"
                    >
                      {copiedField === 'name' ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                    </button>
                  )}
                </div>
                <p className="rounded-lg bg-surface-elevated p-3 text-sm text-text-primary">
                  {selectedImage.name || 'Untitled'}
                </p>
              </div>

              {/* Prompt */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Prompt</label>
                  {selectedImage.prompt && (
                    <button
                      onClick={() => copyToClipboard(selectedImage.prompt!, 'prompt')}
                      className="rounded p-1 text-text-tertiary transition-colors hover:bg-surface-elevated hover:text-text-primary"
                      title="Copy prompt"
                    >
                      {copiedField === 'prompt' ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                    </button>
                  )}
                </div>
                <div className="max-h-60 overflow-y-auto rounded-lg bg-surface-elevated p-3">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-primary">
                    {selectedImage.prompt || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Negative Prompt */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Negative Prompt</label>
                  {selectedImage.negativePrompt && (
                    <button
                      onClick={() => copyToClipboard(selectedImage.negativePrompt!, 'negativePrompt')}
                      className="rounded p-1 text-text-tertiary transition-colors hover:bg-surface-elevated hover:text-text-primary"
                      title="Copy negative prompt"
                    >
                      {copiedField === 'negativePrompt' ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                    </button>
                  )}
                </div>
                <div className="max-h-40 overflow-y-auto rounded-lg bg-surface-elevated p-3">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-primary">
                    {selectedImage.negativePrompt || 'N/A'}
                  </p>
                </div>
              </div>

              {/* LoRA Model */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-text-secondary">LoRA Model</label>
                <p className="rounded-lg bg-surface-elevated p-3 text-sm text-text-primary">
                  {selectedImage.lora || 'N/A'}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}

export default ImageGrid
