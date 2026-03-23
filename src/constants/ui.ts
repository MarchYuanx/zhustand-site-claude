/**
 * UI 常量配置
 *
 * 统一管理 z-index 层级、动画时间、尺寸等 UI 相关常量
 * 避免魔法数字，提高代码可维护性
 */

/**
 * z-index 层级枚举
 * 统一管理所有组件的层级关系
 */
export const Z_INDEX = {
  HEADER: 50,
  MOBILE_MENU_OVERLAY: 60,
  MUSIC_PLAYER: 40,
  STAR_EFFECT: 9999,
  MODAL: 100,
} as const

/**
 * 动画时间常量（毫秒）
 */
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  STAR_BURST: 600,
} as const

/**
 * 星星特效配置
 */
export const STAR_EFFECT = {
  COUNT: 8,
  COLORS: ['#007AFF', '#1a1a1a'],
  HORIZONTAL_OFFSET_MAX: 60,
  VERTICAL_DISTANCE_MIN: 40,
  VERTICAL_DISTANCE_RANDOM: 20,
} as const

/**
 * 移动端菜单配置
 */
export const MOBILE_MENU = {
  WIDTH: 'w-64',
  SIDEBAR_WIDTH_PX: 256,
} as const

/**
 * 音乐播放器配置
 */
export const MUSIC_PLAYER = {
  EXPANDED_WIDTH: 'w-64',
  COLLAPSED_SIZE: 'h-14 w-14',
} as const
