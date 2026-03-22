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
function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`card ${hover ? 'hover:scale-[1.02]' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
