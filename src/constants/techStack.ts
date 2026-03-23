/**
 * 技术栈配置
 *
 * 统一管理首页展示的技术栈信息
 * 便于维护和更新
 */

import type { IconType } from 'react-icons'
import { FaReact } from 'react-icons/fa'
import { SiTypescript, SiVercel, SiVite, SiTailwindcss, SiClaude } from 'react-icons/si'

export interface TechStackItem {
  name: string
  icon: IconType
  color: string
}

export const TECH_STACK: TechStackItem[] = [
  { name: 'React', icon: FaReact, color: 'text-[#61DAFB]' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
  { name: 'Vite', icon: SiVite, color: 'text-[#646CFF]' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
  { name: 'Vercel', icon: SiVercel, color: 'text-gray-900' },
  { name: 'Claude Code', icon: SiClaude, color: 'text-[#D97757]' },
]
