import { ButtonHTMLAttributes } from 'react'

/**
 * 通用按钮组件
 *
 * Props:
 * - variant: 'primary' | 'secondary' (默认 primary)
 * - children: 按钮内容
 * - onClick: 点击事件
 * - className: 额外样式类
 *
 * 扩展点：可添加 size、disabled、loading 等状态
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

function Button({ variant = 'primary', children, onClick, className = '', ...props }: ButtonProps) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'

  return (
    <button
      className={`${baseClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
