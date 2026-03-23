import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

/**
 * 音乐设置 Context
 *
 * 功能：
 * - 管理音乐播放器的显示状态
 * - 管理当前选择的音乐
 * - 持久化设置到 localStorage
 */

// 音乐类型定义
export interface Music {
  id: number
  name: string
  artist: string
  url: string
  isDefault?: boolean
}

// Context 类型定义
interface MusicContextType {
  showPlayer: boolean
  setShowPlayer: (show: boolean) => void
  selectedMusicId: number
  setSelectedMusicId: (id: number) => void
  currentMusic: Music
  musicList: Music[]
}

// 音乐列表配置
export const MUSIC_LIST: Music[] = [
  {
    id: 26116122,
    name: 'Stay Gold',
    artist: '広橋真紀子',
    url: 'https://music.163.com/song/media/outer/url?id=26116122.mp3',
    isDefault: true // 默认播放的歌曲
  },
  {
    id: 2053344480,
    name: '猛独が襲う',
    artist: 'STUDY WITH MIKU',
    url: 'https://music.163.com/song/media/outer/url?id=2053344480.mp3'
  },
  {
    id: 667244,
    name: '银河鉄道の夜',
    artist: '久石譲',
    url: 'https://music.163.com/song/media/outer/url?id=445190.mp3'
  }
]

// 默认歌曲 ID
export const DEFAULT_MUSIC_ID = MUSIC_LIST.find(music => music.isDefault)?.id || MUSIC_LIST[0].id

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: ReactNode }) {
  // 从 localStorage 读取设置，默认显示播放器，选择第一首歌
  const [showPlayer, setShowPlayer] = useState(() => {
    const saved = localStorage.getItem('musicSettings')
    if (saved) {
      try {
        return JSON.parse(saved).showPlayer ?? true
      } catch {
        return true
      }
    }
    return true
  })

  const [selectedMusicId, setSelectedMusicId] = useState(() => {
    const saved = localStorage.getItem('musicSettings')
    if (saved) {
      try {
        return JSON.parse(saved).selectedMusicId ?? DEFAULT_MUSIC_ID
      } catch {
        return DEFAULT_MUSIC_ID
      }
    }
    return DEFAULT_MUSIC_ID
  })

  // 保存设置到 localStorage
  useEffect(() => {
    const settings = {
      showPlayer,
      selectedMusicId
    }
    localStorage.setItem('musicSettings', JSON.stringify(settings))
  }, [showPlayer, selectedMusicId])

  // 获取当前选择的音乐信息
  const currentMusic = MUSIC_LIST.find(music => music.id === selectedMusicId) || MUSIC_LIST[0]

  const value = {
    showPlayer,
    setShowPlayer,
    selectedMusicId,
    setSelectedMusicId,
    currentMusic,
    musicList: MUSIC_LIST
  }

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider')
  }
  return context
}
