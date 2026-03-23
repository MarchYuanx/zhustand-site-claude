import { useMusicStore } from '../stores/musicStore'
import { FaMusic, FaCheck } from 'react-icons/fa'
import SEO from '../components/common/SEO'
import { SEO_CONFIG, SITE_INFO } from '../constants/seo'
import PageTransition from '../components/common/PageTransition'

/**
 * 设置页面
 *
 * 功能：
 * - 控制音乐播放器的显示/隐藏
 * - 选择不同的背景音乐
 * - 设置自动保存到 localStorage
 */
function Settings() {
  const { showPlayer, setShowPlayer, selectedMusicId, setSelectedMusicId } = useMusicStore()
  const musicList = useMusicStore((state) => state.getMusicList())

  return (
    <PageTransition>
      <SEO
        title={SEO_CONFIG.settings.title}
        description={SEO_CONFIG.settings.description}
        keywords={SEO_CONFIG.settings.keywords}
        url={`${SITE_INFO.url}/settings`}
        type={SEO_CONFIG.settings.type}
        author={SITE_INFO.author}
      />
      <div className="min-h-[calc(100vh-12rem)] py-8">
      {/* 页面标题 - 艺术字体 */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-text-primary dark:text-gray-100">
          Settings
        </h1>
        <p className="font-serif tracking-wide text-text-secondary dark:text-gray-400">自定义你的音乐播放体验</p>
      </div>

      {/* 设置卡片容器 */}
      <div className="mx-auto max-w-2xl space-y-6">
        {/* 音乐播放器开关 */}
        <div className="card p-6 dark:bg-gray-800/50">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
              <FaMusic className="text-lg text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary dark:text-gray-100">音乐播放器</h2>
              <p className="text-sm text-text-tertiary dark:text-gray-400">控制页面右下角的音乐播放器显示</p>
            </div>
          </div>

          <label className="flex cursor-pointer items-center justify-between rounded-xl bg-surface-elevated p-4 transition-colors hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700">
            <span className="text-text-secondary dark:text-gray-200">显示音乐播放器</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={showPlayer}
                onChange={(e) => setShowPlayer(e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-primary dark:bg-gray-600 dark:peer-checked:bg-primary"></div>
              <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>

        {/* 音乐选择 */}
        <div className="card p-6 dark:bg-gray-800/50">
          <div className="mb-4">
            <h2 className="mb-1 text-lg font-semibold text-text-primary dark:text-gray-100">选择音乐</h2>
            <p className="text-sm text-text-tertiary dark:text-gray-400">选择你喜欢的背景音乐</p>
          </div>

          <div className="space-y-3">
            {musicList.map((music) => (
              <button
                key={music.id}
                onClick={() => setSelectedMusicId(music.id)}
                className={`w-full rounded-xl p-4 text-left transition-all ${
                  selectedMusicId === music.id
                    ? 'bg-primary/10 ring-2 ring-primary dark:bg-primary/20 dark:ring-primary'
                    : 'bg-surface-elevated hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-text-primary dark:text-gray-100">{music.name}</div>
                    <div className="text-sm text-text-tertiary dark:text-gray-400">{music.artist}</div>
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
        <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-900 dark:bg-blue-900/30 dark:text-blue-200">
          <p className="font-medium">💡 提示</p>
          <p className="mt-1 text-blue-700 dark:text-blue-300">
            设置会自动保存，刷新页面后依然生效。你可以随时在这里调整音乐播放器的设置。
          </p>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}

export default Settings
