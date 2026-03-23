/**
 * Framer Motion 动画配置中心
 * 集中管理所有复用的动画变体和过渡配置
 */

import { Variants, Transition } from 'framer-motion'

// 页面切换动画变体
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const pageTransition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
}

// 视口进入动画变体（用于卡片、列表项）
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

// 列表错落动画容器
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// 卡片悬停动画
export const cardHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

// 主题切换过渡配置
export const themeTransition: Transition = {
  type: 'tween',
  duration: 0.2,
  ease: 'easeInOut',
}

// 移动菜单侧边栏动画
export const mobileMenuVariants: Variants = {
  closed: { x: '100%' },
  open: { x: 0 },
}

export const mobileMenuTransition: Transition = {
  type: 'tween',
  duration: 0.3,
  ease: 'easeInOut',
}

// 背景遮罩动画
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
