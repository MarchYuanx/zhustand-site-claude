/**
 * B 站 API 工具函数
 *
 * 用于获取 B 站视频的元数据信息
 */

export interface BilibiliVideoInfo {
  title: string
  desc: string
  pic: string
  view: number
  danmaku: number
  reply: number
  favorite: number
  coin: number
  share: number
  like: number
  duration: number
  owner: {
    mid: number
    name: string
    face: string
  }
  pubdate: number
}

/**
 * 从 B 站 API 获取视频信息
 * @param bvid - 视频的 BV 号
 * @returns 视频信息对象
 */
export async function getBilibiliVideoInfo(bvid: string): Promise<BilibiliVideoInfo | null> {
  try {
    const response = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
    const data = await response.json()

    if (data.code === 0 && data.data) {
      return data.data
    }

    return null
  } catch (error) {
    console.error('获取 B 站视频信息失败:', error)
    return null
  }
}

/**
 * 格式化播放量/点赞数等数字
 * @param num - 数字
 * @returns 格式化后的字符串（如 1.2万）
 */
export function formatNumber(num: number): string {
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(1)}亿`
  }
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`
  }
  return num.toString()
}

/**
 * 格式化视频时长
 * @param seconds - 秒数
 * @returns 格式化后的时长字符串（如 12:34）
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}
