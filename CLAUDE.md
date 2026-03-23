# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 React 18 + Tailwind CSS 的个人作品集网站，采用美式 App 极简美学设计（iOS/macOS 风格）。

**技术栈：**
- React 18.2+ (Vite 构建)
- react-router-dom 6.x (路由管理)
- Tailwind CSS 3.x (原子化样式)
- react-icons (图标库)
- react-markdown (Markdown 渲染)
- react-player (视频播放)

## 常用命令

**包管理器：pnpm**

```bash
# 安装依赖
pnpm install

# 启动开发服务器（端口 3000）
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 代码检查
pnpm lint
```

## 项目架构

### 目录结构

```
src/
├── components/
│   ├── common/          # 通用基础组件（Button, Card, Loading, Modal）
│   ├── layout/          # 布局组件（Header, Layout）
│   └── features/        # 功能组件（MusicPlayer, ImageGrid, VideoCard, SocialLinks）
├── pages/               # 页面组件（懒加载）
│   ├── Home.jsx         # 首页 Hero
│   ├── Gallery.jsx      # 图片作品展示
│   ├── Videos.jsx       # 视频作品展示
│   ├── Articles.jsx     # 文章列表
│   └── ArticleDetail.jsx # 文章详情
├── utils/               # 工具函数
│   └── fileLoader.js    # 文件自动加载（图片/文章）
├── router/              # 路由配置（懒加载）
└── index.css            # Tailwind 入口 + 自定义样式
```

### 核心设计原则

1. **组件职责单一**：每个组件只负责一个功能，通过 props 控制变体
2. **样式原子化**：优先使用 Tailwind 原子类，公共样式通过 @apply 封装
3. **路由懒加载**：所有页面组件采用 React.lazy() 懒加载，提升首屏性能
4. **文件自动扫描**：图片和文章通过 Vite 的 import.meta.glob 自动读取

### Tailwind 自定义主题

主题配置位于 `tailwind.config.js`，遵循美式 App 审美：

- **颜色**：primary (#007AFF iOS 蓝)、text (三级层级)、surface (背景层级)
- **圆角**：xl (16px)、2xl (24px)
- **阴影**：soft / card / modal（柔和层级）
- **字体**：-apple-system 优先

### 复用样式类（index.css）

```css
.btn-primary      # 主按钮样式
.btn-secondary    # 次级按钮样式
.card             # 通用卡片样式
.link-hover       # 链接悬停效果
.glass            # 玻璃态效果
```

## 扩展指南

### 新增页面（3 步）

1. 在 `src/pages/` 创建新页面组件（如 `About.jsx`）
2. 在 `src/router/index.jsx` 添加懒加载导入和路由配置
3. 在 `src/components/layout/Header.jsx` 添加导航链接

### 添加图片作品

将图片文件（png/jpg/webp/svg）放入 `public/assets/images/` 目录，Gallery 页面会自动扫描并展示。

### 添加文章

将 Markdown 文件放入 `public/assets/articles/` 目录，Articles 页面会自动扫描并展示。文章格式：

```markdown
# 文章标题

文章内容...
```

### 自定义视频列表

编辑 `src/pages/Videos.jsx`，修改 `videos` 数组，添加新的视频链接和标题。

## 设计规范

### 美式 App 审美要点

- **简约排版**：充足留白，视觉焦点突出
- **柔和阴影**：使用 shadow-soft / shadow-card / shadow-modal
- **克制动效**：transition-all duration-200，hover 轻微缩放（scale-105/110）
- **清晰层级**：文本三级层级（primary/secondary/tertiary）
- **通透布局**：玻璃态效果（glass 类）

### 响应式断点

- `sm:` 640px（移动端）
- `md:` 768px（平板）
- `lg:` 1024px（桌面）
- `xl:` 1280px（大屏）

## 开发规范

### TypeScript 规范

- 新组件使用 `.tsx` 扩展名，优先使用 TypeScript
- 组件 Props 使用 `interface` 定义
- 导入类型时使用 `import type` 语法（避免循环依赖）
- 避免使用 `any` 类型

### 命名规范

- 组件文件：PascalCase（如 `Button.tsx`、`ImageGrid.tsx`）
- 工具函数：camelCase（如 `fileLoader.ts`、`formatDate.ts`）
- 常量：UPPER_SNAKE_CASE（如 `API_BASE_URL`、`MAX_ITEMS`）

### 组件规范

- 单一职责：每个组件只做一件事
- Props 驱动：通过 props 控制组件行为和样式变体
- 通用组件放在 `components/common/`
- 所有页面组件使用 `React.lazy()` 懒加载

### 状态管理

- 局部状态：使用 `useState`
- 全局状态：使用 Zustand（已配置 persist 中间件）
- 主题状态：`useThemeStore()`
- 音乐状态：`useMusicStore()`

### Git 提交规范

提交格式：`<type>: <subject>`

Type 类型：`feat` / `fix` / `style` / `refactor` / `perf` / `docs` / `chore`

## 注意事项

1. **组件扩展点**：代码中标注了 `扩展点：` 注释，说明预留的扩展接口
2. **图标使用**：统一使用 react-icons 库，保持视觉一致性
3. **懒加载**：新增页面必须使用 React.lazy() 懒加载
4. **样式优先级**：Tailwind 原子类 > @apply 复用类 > 内联样式
5. **文件命名**：组件使用 PascalCase（如 Button.jsx），工具函数使用 camelCase（如 fileLoader.js）

## 依赖说明

- **react-router-dom**：路由管理，使用 v6 新 API
- **react-markdown**：Markdown 渲染，配合 remark-gfm（GFM 语法）和 rehype-highlight（代码高亮）
- **react-player**：视频播放，支持 B 站等多平台
- **react-icons**：图标库，包含 Font Awesome、Simple Icons 等
- **highlight.js**：代码高亮样式（使用 github 主题）
