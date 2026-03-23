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
    // 开发环境使用代理，生产环境直接调用（需要后端支持）
    const apiUrl = import.meta.env.DEV
      ? `/api/bilibili/x/web-interface/view?bvid=${bvid}`
      : `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`

    const response = await fetch(apiUrl, {
      headers: {
        'Referer': 'https://www.bilibili.com',
      }
    })
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
export function formatNumber(num: number | undefined): string {
  if (num === undefined || num === null || isNaN(num)) {
    return '0'
  }
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

/**
 * B 站用户信息接口
 */
export interface BilibiliUserInfo {
  mid: number
  name: string
  face: string
  sign: string
  level: number
  follower: number
  following: number
}

/**
 * 从 B 站 API 获取用户信息
 * @param mid - 用户 ID
 * @returns 用户信息对象
 */
export async function getBilibiliUserInfo(mid: number): Promise<BilibiliUserInfo | null> {
  try {
    // 开发环境使用代理，生产环境直接调用
    const apiUrl = import.meta.env.DEV
      ? `/api/bilibili/x/space/acc/info?mid=${mid}`
      : `https://api.bilibili.com/x/space/acc/info?mid=${mid}`

    const response = await fetch(apiUrl, {
      headers: {
        'Referer': 'https://www.bilibili.com',
      }
    })
    const data = await response.json()

    if (data.code === 0 && data.data) {
      return {
        mid: data.data.mid,
        name: data.data.name,
        face: data.data.face,
        sign: data.data.sign,
        level: data.data.level,
        follower: data.data.follower || 0,
        following: data.data.following || 0,
      }
    }

    return null
  } catch (error) {
    console.error('获取 B 站用户信息失败:', error)
    return null
  }
}
