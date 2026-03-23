/**
 * 全局类型定义
 */

// 图片相关类型
export interface ImageData {
  src: string
  name: string
  alt: string
  prompt?: string
  negativePrompt?: string
  lora?: string
}

export interface ImageMetadata {
  name: string
  prompt: string
  negativePrompt: string
  lora: string
}

// 文章相关类型
export interface ArticleData {
  id: string
  title: string
  content: string
  date: string
}

// 视频相关类型
export interface Video {
  url: string
  title: string
  description?: string
}

// 音乐相关类型
export interface Music {
  id: string
  title: string
  artist: string
  url: string
  cover?: string
}

// Context 相关类型
export interface MusicContextType {
  currentMusic: Music | null
  showPlayer: boolean
  setShowPlayer: (show: boolean) => void
  selectedMusicId: string | null
  setSelectedMusicId: (id: string | null) => void
  musicList: Music[]
}

// 组件 Props 类型
export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface LayoutProps {
  children: React.ReactNode
}
