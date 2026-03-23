import { useState, useEffect } from 'react'
import ImageGrid from '../components/features/ImageGrid'
import Loading from '../components/common/Loading'
import { loadImages } from '../utils/fileLoader'
import { getImageMetadata } from '../data/imageMetadata'

/**
 * 图片作品展示页
 *
 * 功能：
 * - 自动读取 /public/assets/images 目录
 * - 美式网格布局展示
 * - 响应式适配
 *
 * 扩展点：
 * - 预留分类筛选接口（通过 ImageGrid 的 props）
 * - 预留标签管理功能
 */
function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchImages() {
      const loadedImages = await loadImages()
      // 合并图片元数据
      const imagesWithMetadata = loadedImages.map(image => {
        const filename = image.src.split('/').pop()
        const metadata = getImageMetadata(filename)
        return { ...image, ...metadata }
      })
      setImages(imagesWithMetadata)
      setLoading(false)
    }
    fetchImages()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="py-8">
      {/* 页面标题 - 艺术字体 */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-text-primary">
          Gallery
        </h1>
        <p className="font-serif tracking-wide text-text-secondary">我的图片作品集</p>
        <p className="mt-2 text-sm text-text-tertiary">Powered by Stable Diffusion</p>
      </div>

      {/* 扩展点：分类筛选组件插槽 */}
      {/* <CategoryFilter /> */}

      {/* 图片网格 */}
      {images.length > 0 ? (
        <ImageGrid images={images} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-text-secondary">暂无图片作品</p>
          <p className="mt-2 text-sm text-text-tertiary">
            请将图片放入 public/assets/images 目录
          </p>
        </div>
      )}
    </div>
  )
}

export default Gallery
