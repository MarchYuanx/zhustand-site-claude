import { useMusic } from '../contexts/MusicContext'
import { FaMusic, FaCheck } from 'react-icons/fa'

/**
 * 设置页面
 *
 * 功能：
 * - 控制音乐播放器的显示/隐藏
 * - 选择不同的背景音乐
 * - 设置自动保存到 localStorage
 */
function Settings() {
  const { showPlayer, setShowPlayer, selectedMusicId, setSelectedMusicId, musicList } = useMusic()

  return (
    <div className="min-h-[calc(100vh-12rem)] py-8">
      {/* 页面标题 - 艺术字体 */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-text-primary">
          Settings
        </h1>
        <p className="font-serif tracking-wide text-text-secondary">自定义你的音乐播放体验</p>
      </div>

      {/* 设置卡片容器 */}
      <div className="mx-auto max-w-2xl space-y-6">
        {/* 音乐播放器开关 */}
        <div className="card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <FaMusic className="text-lg text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">音乐播放器</h2>
              <p className="text-sm text-text-tertiary">控制页面右下角的音乐播放器显示</p>
            </div>
          </div>

          <label className="flex cursor-pointer items-center justify-between rounded-xl bg-surface-elevated p-4 transition-colors hover:bg-surface-elevated/80">
            <span className="text-text-secondary">显示音乐播放器</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={showPlayer}
                onChange={(e) => setShowPlayer(e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-primary"></div>
              <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>

        {/* 音乐选择 */}
        <div className="card p-6">
          <div className="mb-4">
            <h2 className="mb-1 text-lg font-semibold text-text-primary">选择音乐</h2>
            <p className="text-sm text-text-tertiary">选择你喜欢的背景音乐</p>
          </div>

          <div className="space-y-3">
            {musicList.map((music) => (
              <button
                key={music.id}
                onClick={() => setSelectedMusicId(music.id)}
                className={`w-full rounded-xl p-4 text-left transition-all ${
                  selectedMusicId === music.id
                    ? 'bg-primary/10 ring-2 ring-primary'
                    : 'bg-surface-elevated hover:bg-surface-elevated/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{music.name}</div>
                    <div className="text-sm text-text-tertiary">{music.artist}</div>
                  </div>
                  {selectedMusicId === music.id && (
                    <FaCheck className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 提示信息 */}
        <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
          <p className="font-medium">💡 提示</p>
          <p className="mt-1 text-blue-700">
            设置会自动保存，刷新页面后依然生效。你可以随时在这里调整音乐播放器的设置。
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings
