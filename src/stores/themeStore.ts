import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

/**
 * 主题状态管理 Store
 *
 * 功能：
 * - 管理全局主题状态（light/dark）
 * - 自动持久化到 localStorage
 * - 自动切换 document.documentElement 的 class
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light'

        // 更新 HTML 根元素的 class
        const root = document.documentElement
        if (newTheme === 'dark') {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }

        set({ theme: newTheme })
      },
    }),
    {
      name: 'zhustand-theme',
      onRehydrateStorage: () => (state) => {
        // 恢复主题时同步 DOM
        if (state) {
          const root = document.documentElement
          if (state.theme === 'dark') {
            root.classList.add('dark')
          } else {
            root.classList.remove('dark')
          }
        }
      },
    }
  )
)
