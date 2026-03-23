import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { pageVariants, pageTransition } from '../../config/animations'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * 页面切换动画包装组件
 * 为页面内容添加淡入淡出 + 位移效果
 */
function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
