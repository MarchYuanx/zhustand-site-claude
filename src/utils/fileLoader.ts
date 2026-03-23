/**
 * 文件加载工具 - 自动读取 public/assets 目录
 *
 * 功能：
 * 1. loadImages() - 加载所有图片
 * 2. loadArticles() - 加载所有 Markdown 文章
 *
 * 使用 Vite 的 import.meta.glob 实现自动扫描
 */

export interface ImageData {
  src: string
  name: string
  alt: string
}

export interface ArticleData {
  id: string
  title: string
  content: string
  date: string
}

/**
 * 加载图片文件
 * @returns {Promise<Array>} 图片数组 [{ src, name }]
 */
export async function loadImages(): Promise<ImageData[]> {
  try {
    // Vite 动态导入 - 自动扫描 public/assets/images 目录
    const imageModules = import.meta.glob('/public/assets/images/*.(png|jpg|jpeg|webp|svg)', {
      eager: true,
      as: 'url',
    })

    const images = Object.entries(imageModules).map(([path, url]) => ({
      src: url as string,
      name: path.split('/').pop() || '',
      alt: path.split('/').pop()?.split('.')[0] || '',
    }))

    return images
  } catch (error) {
    console.error('Failed to load images:', error)
    return []
  }
}

/**
 * 加载 Markdown 文章
 * @returns {Promise<Array>} 文章数组 [{ id, title, content, date }]
 */
export async function loadArticles(): Promise<ArticleData[]> {
  try {
    const articleModules = import.meta.glob('/public/assets/articles/*.md', {
      as: 'raw',
    })

    const articles = await Promise.all(
      Object.entries(articleModules).map(async ([path, loader]) => {
        const content = await loader() as string
        const filename = path.split('/').pop()?.replace('.md', '') || ''

        // 解析 Markdown 前置元数据（可选）
        const titleMatch = content.match(/^#\s+(.+)$/m)
        const title = titleMatch ? titleMatch[1] : filename

        return {
          id: filename,
          title,
          content,
          date: new Date().toISOString().split('T')[0], // 默认日期
        }
      })
    )

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Failed to load articles:', error)
    return []
  }
}
