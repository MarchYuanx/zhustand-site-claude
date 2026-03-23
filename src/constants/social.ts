/**
 * 社交链接配置
 *
 * 统一管理所有社交媒体链接
 * 便于维护和更新
 */

import type { IconType } from 'react-icons'
import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { SiBilibili, SiXiaohongshu } from 'react-icons/si'

export interface SocialLink {
  name: string
  url: string
  icon: IconType
  color: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/MarchYuanx',
    icon: FaGithub,
    color: 'hover:text-gray-900',
  },
  {
    name: '小红书',
    url: 'https://www.xiaohongshu.com/user/profile/60cf61900000000001000cd5',
    icon: SiXiaohongshu,
    color: 'hover:text-red-500',
  },
  {
    name: 'B站',
    url: 'https://space.bilibili.com/17178880',
    icon: SiBilibili,
    color: 'hover:text-[#00A1D6]',
  },
  {
    name: 'Email',
    url: 'mailto:marchyuanx@foxmail.com',
    icon: FaEnvelope,
    color: 'hover:text-blue-500',
  },
]
