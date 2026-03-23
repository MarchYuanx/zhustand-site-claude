/**
 * 颜色常量
 *
 * 统一管理项目中使用的颜色值
 * 与 tailwind.config.ts 配合使用
 */

/**
 * 主题色
 */
export const COLORS = {
  PRIMARY: '#007AFF',

  // 文本颜色
  TEXT_PRIMARY: '#1D1D1F',
  TEXT_SECONDARY: '#86868B',
  TEXT_TERTIARY: '#C7C7CC',

  // 表面颜色
  SURFACE_BASE: '#FFFFFF',
  SURFACE_ELEVATED: '#F5F5F7',

  // 边框颜色
  BORDER: '#D2D2D7',

  // 技术栈颜色
  REACT: '#61DAFB',
  TYPESCRIPT: '#3178C6',
  VITE: '#646CFF',
  TAILWIND: '#06B6D4',
  CLAUDE: '#D97757',

  // 社交媒体颜色
  BILIBILI: '#00A1D6',
} as const
