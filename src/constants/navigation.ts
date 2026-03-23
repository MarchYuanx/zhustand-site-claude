/**
 * 导航配置
 *
 * 统一管理导航菜单项，与路由配置解耦
 * 便于扩展和维护
 */

import { ROUTES } from './routes'

export interface NavItem {
  path: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { path: ROUTES.HOME, label: 'Home' },
  { path: ROUTES.ABOUT, label: 'About' },
  { path: ROUTES.GALLERY, label: 'Gallery' },
  { path: ROUTES.VIDEOS, label: 'Videos' },
  { path: ROUTES.ARTICLES, label: 'Articles' },
  { path: ROUTES.SETTINGS, label: 'Settings' },
]
