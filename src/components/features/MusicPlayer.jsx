import { useState, useRef, useEffect } from 'react'
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa'

/**
 * 背景音乐播放器 - Claude 风格 + 可折叠
 *
 * 设计特点：
 * - 默认展开并自动播放
 * - 可折叠成小球状态
 * - 点击展开显示完整播放器
 * - 浅色背景，柔和阴影
 * - 优雅的排版和间距
 * - 精致的交互动效
 * - 固定在页面右下角
 *
 * 扩展点：
 * - 修改 songInfo 更换歌曲信息
 */
function MusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isExpanded, setIsExpanded] = useState(true)

  // 歌曲信息
  const songInfo = {
    name: '猛独が襲う',
    artist: 'STUDY WITH MIKU',
    url: 'https://music.163.com/song/media/outer/url?id=2053344480.mp3'
  }

  // 自动播放
  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current?.play()
        setIsPlaying(true)
      } catch (error) {
        // 浏览器阻止自动播放，用户需要手动点击播放
        console.log('自动播放被阻止，需要用户交互')
      }
    }
    playAudio()
  }, [])

  // 播放/暂停切换
  const togglePlay = (e) => {
    e.stopPropagation()
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  // 更新播放进度
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0)
  }

  // 加载音频元数据
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0)
  }

  // 拖动进度条
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // 格式化时间显示（mm:ss）
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // 计算进度百分比
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <>
      {/* 隐藏的 audio 元素 */}
      <audio
        ref={audioRef}
        src={songInfo.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-6 right-6 z-40">
        {/* 折叠状态 - 小球 */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-gray-200/80 bg-gradient-to-br from-white/98 via-gray-50/95 to-white/98 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gray-300/80 hover:shadow-xl"
            aria-label="展开音乐播放器"
          >
            <FaMusic
              className={`text-lg text-gray-900 ${
                isPlaying ? 'animate-bounce' : ''
              }`}
            />
          </button>
        )}

        {/* 展开状态 - 完整播放器 */}
        {isExpanded && (
          <div className="w-64 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gradient-to-br from-white/98 via-gray-50/95 to-white/98 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gray-300/80 hover:shadow-xl">
              {/* 歌曲信息和播放按钮 */}
              <div className="mb-3 flex items-start gap-3">
                {/* 播放/暂停按钮 */}
                <button
                  onClick={togglePlay}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  aria-label={isPlaying ? '暂停' : '播放'}
                >
                  {isPlaying ? (
                    <FaPause size={10} />
                  ) : (
                    <FaPlay size={10} className="ml-0.5" />
                  )}
                </button>

                {/* 歌曲名和歌手 */}
                <div className="flex-1 overflow-hidden pt-0.5">
                  <div className="truncate font-serif text-sm font-semibold leading-snug tracking-wide text-gray-900">
                    {songInfo.name}
                  </div>
                  <div className="truncate font-sans text-xs leading-relaxed tracking-wide text-gray-500">
                    {songInfo.artist}
                  </div>
                </div>

                {/* 折叠按钮 */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  aria-label="折叠"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* 进度条区域 */}
              <div className="space-y-2">
                {/* 进度条容器 */}
                <div className="group/progress relative h-1.5 w-full overflow-hidden rounded-full bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100">
                  {/* 进度填充 - 带渐变和动画 */}
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-sm transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                  {/* 可拖动的 input */}
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>

                {/* 时间显示 */}
                <div className="flex items-center justify-between font-mono text-xs tabular-nums tracking-wider text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default MusicPlayer
