import { motion, HTMLMotionProps } from 'framer-motion'

/**
 * 通用卡片组件 - 美式设计风格
 *
 * Props:
 * - children: 卡片内容
 * - className: 额外样式类
 * - hover: 是否启用悬停效果（默认 true）
 *
 * 扩展点：可添加 padding、shadow 等变体
 */

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode
  hover?: boolean
}

function Card({ children, className = '', hover = true, ...props }: CardProps) {
  return (
    <motion.div
      className={`card ${className}`}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
