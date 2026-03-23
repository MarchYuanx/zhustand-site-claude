/**
 * 视频作品配置文件
 *
 * 在这里集中管理所有视频数据
 *
 * 字段说明：
 * - url: B 站视频链接（完整 URL）
 * - title: 视频标题
 * - description: 视频描述（可选）
 */

export interface Video {
  url: string
  title: string
  description?: string
}

export const videos: Video[] = [
  {
    url: 'https://www.bilibili.com/video/BV15D7NzvEkW/',
    title: '丰川家的黑暗这一块',
  },
  {
    url: 'https://www.bilibili.com/video/BV1MXswekEVY/',
    title: '陕北出生说书',
  },
  {
    url: 'https://www.bilibili.com/video/BV1xw4m1v7hg/',
    title: '【AI Peter】出生四人组的黄色潜水艇之旅《Yellow Submarine》',
  },
  {
    url: 'https://www.bilibili.com/video/BV1SU411o7mu/',
    title: '【AI Peter】出生四人组的黄色潜水艇之旅《Yellow Submarine》',
  },
]
