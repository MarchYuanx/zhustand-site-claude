# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
<!-- 新增功能将记录在这里 -->

### Changed
<!-- 功能变更将记录在这里 -->

### Fixed
<!-- Bug 修复将记录在这里 -->

### Removed
<!-- 移除的功能将记录在这里 -->

---

## [1.0.0] - 2026-03-23

### Added
- ✨ 完整的暗色主题支持，支持系统主题自动切换
- 🎵 音乐播放器组件（支持播放控制和状态持久化）
- 📄 About 页面，展示个人信息和社交链接
- 📊 GitHub 贡献日历组件，实时展示开源贡献
- 🎬 Videos 页面，支持 B 站等平台视频展示
- 📝 Articles 页面，支持 Markdown 文章渲染
- 🖼️ Gallery 页面，自动扫描并展示图片作品
- ⚙️ Settings 页面，支持主题切换和个性化设置
- 🎨 美式 App 极简美学设计（iOS/macOS 风格）
- 📱 完整的响应式布局，支持移动端和桌面端
- 🔄 路由懒加载，优化首屏加载性能
- 🎯 Zustand 状态管理，支持状态持久化
- 📦 文件自动扫描系统（图片和文章）
- 🎨 Tailwind CSS 自定义主题配置
- 🔗 社交链接组件（GitHub、B站、邮箱等）
- 💾 本地存储持久化（主题偏好、音乐状态）

### Changed
- ♻️ 从 Context API 迁移到 Zustand 状态管理
- 📁 合并 config 和 data 目录到 constants
- 🎨 调整导航栏顺序，将 About 移至 Home 右侧
- 🔧 重构 About 页面社交链接组件
- 📝 优化 GitHub 贡献日历加载状态
- 🎯 提取常量和枚举，降低代码耦合性
- 📚 精简 CLAUDE.md 文档

### Fixed
- 🐛 修复 ImageGrid 中可选属性的类型断言
- 🐛 修复 ArticleDetail 页面的 TypeScript 类型错误
- 🐛 修复视频卡片数据加载错误和页面崩溃问题
- 🎨 统一 Settings 页面标题样式
- 🔧 修正 About 页面名字显示

### Removed
- ❌ 移除 About 页面的 B 站粉丝数功能
- ❌ 移除视频卡片的 B 站 API 数据请求

### Technical
- 🔧 完整的 TypeScript 支持和类型定义
- 📦 使用 Vite 5.x 作为构建工具
- 🎨 Tailwind CSS 3.x 原子化样式
- 🔄 React Router 6.x 路由管理
- 📝 react-markdown + rehype-highlight 代码高亮
- 🎬 react-player 视频播放支持
- 🎨 react-icons 图标库集成

---

## 版本规范说明

### 版本号格式：MAJOR.MINOR.PATCH

- **MAJOR（主版本号）**：不兼容的 API 修改
- **MINOR（次版本号）**：向下兼容的功能性新增
- **PATCH（修订号）**：向下兼容的问题修正

### 变更类型

- **Added**：新增功能
- **Changed**：功能变更
- **Deprecated**：即将废弃的功能
- **Removed**：已移除的功能
- **Fixed**：Bug 修复
- **Security**：安全性修复

---

## 使用示例

当你完成某个功能后，在 `[Unreleased]` 部分添加记录：

```markdown
## [Unreleased]

### Added
- ✨ 实现图片灯箱效果，支持全屏预览和缩放
- 🔍 添加文章搜索功能，支持标题和内容全文搜索

### Fixed
- 🐛 修复暗色模式下图片显示异常的问题
```

当准备发布新版本时，将 `[Unreleased]` 的内容移动到新版本号下：

```markdown
## [1.1.0] - 2026-04-01

### Added
- ✨ 实现图片灯箱效果，支持全屏预览和缩放
- 🔍 添加文章搜索功能，支持标题和内容全文搜索
```

---

**项目仓库：** [GitHub](https://github.com/yourusername/zhustand-portfolio)
**文档：** [README.md](./README.md)
**待办事项：** [TODO.md](./TODO.md)
