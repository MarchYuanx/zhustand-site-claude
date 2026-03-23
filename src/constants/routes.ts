/**
 * 路由路径常量
 *
 * 统一管理所有路由路径，避免硬编码字符串
 * 便于维护和重构
 */

export const ROUTES = {
  HOME: '/',
  GALLERY: '/gallery',
  VIDEOS: '/videos',
  ARTICLES: '/articles',
  ARTICLE_DETAIL: '/articles/:id',
  ABOUT: '/about',
  SETTINGS: '/settings',
} as const

/**
 * 生成文章详情路由
 */
export const getArticleDetailRoute = (id: string): string => {
  return `/articles/${id}`
}
