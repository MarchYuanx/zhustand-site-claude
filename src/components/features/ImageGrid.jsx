import { useState } from 'react'
import Modal from '../common/Modal'

/**
 * 图片网格组件 - 美式网格布局
 *
 * Props:
 * - images: 图片数组 [{ src, alt }]
 *
 * 功能：
 * - 响应式网格（桌面 3-4 列，移动 1-2 列）
 * - 图片懒加载
 * - hover 轻微放大
 * - 点击全屏预览
 *
 * 扩展点：预留分类筛选插槽
 */
function ImageGrid({ images }) {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-surface-elevated shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-card"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              loading="lazy"
              className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* 全屏预览弹窗 */}
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[85vh] max-w-full rounded-xl"
          />
        )}
      </Modal>
    </>
  )
}

export default ImageGrid
