import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * 音乐类型定义
 */
export interface Music {
  id: number
  name: string
  artist: string
  url: string
  isDefault?: boolean
}

/**
 * 音乐列表配置
 */
export const MUSIC_LIST: Music[] = [
  {
    id: 26116122,
    name: 'Stay Gold',
    artist: '広橋真紀子',
    url: 'https://music.163.com/song/media/outer/url?id=26116122.mp3',
    isDefault: true,
  },
  {
    id: 2053344480,
    name: '猛独が襲う',
    artist: 'STUDY WITH MIKU',
    url: 'https://music.163.com/song/media/outer/url?id=2053344480.mp3',
  },
  {
    id: 445190,
    name: '银河鉄道の夜',
    artist: '久石譲',
    url: 'https://music.163.com/song/media/outer/url?id=445190.mp3',
  },
]

/**
 * 默认歌曲 ID
 */
export const DEFAULT_MUSIC_ID = MUSIC_LIST.find((music) => music.isDefault)?.id || MUSIC_LIST[0].id

interface MusicState {
  showPlayer: boolean
  selectedMusicId: number
  loopSingle: boolean
  setShowPlayer: (show: boolean) => void
  setSelectedMusicId: (id: number) => void
  setLoopSingle: (loop: boolean) => void
  getCurrentMusic: () => Music
  getMusicList: () => Music[]
}

/**
 * 音乐状态管理 Store
 *
 * 功能：
 * - 管理音乐播放器的显示状态
 * - 管理当前选择的音乐
 * - 自动持久化到 localStorage
 */
export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      showPlayer: true,
      selectedMusicId: DEFAULT_MUSIC_ID,
      loopSingle: false,
      setShowPlayer: (show) => set({ showPlayer: show }),
      setSelectedMusicId: (id) => set({ selectedMusicId: id }),
      setLoopSingle: (loop) => set({ loopSingle: loop }),
      getCurrentMusic: () => {
        const { selectedMusicId } = get()
        return MUSIC_LIST.find((music) => music.id === selectedMusicId) || MUSIC_LIST[0]
      },
      getMusicList: () => MUSIC_LIST,
    }),
    {
      name: 'zhustand-music',
    }
  )
)
