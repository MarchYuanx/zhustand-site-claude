# Zhustand 个人作品集网站 - 架构设计与技术文档

## 项目概述

Zhustand 是一个基于 React 18 + Tailwind CSS 构建的现代化个人作品集网站，采用美式 App 极简美学设计理念（iOS/macOS 风格）。项目注重性能优化、代码质量和用户体验，通过组件化架构和原子化样式系统实现高度可维护性。

**核心特性：**
- 🎨 美式极简设计 - iOS/macOS 风格的视觉语言
- ⚡ 性能优化 - 路由懒加载、图片懒加载、代码分割
- 📱 响应式布局 - 完美适配桌面端、平板和移动设备
- 🎯 组件化架构 - 单一职责、高复用性、易测试
- 🎭 原子化样式 - Tailwind CSS 驱动的样式系统
- 📝 Markdown 支持 - 代码高亮、GFM 语法、自动目录生成

## 技术栈

### 核心框架
- **React 18.2+** - 现代化 UI 框架，支持并发特性
- **Vite 5.x** - 下一代前端构建工具，极速开发体验
- **react-router-dom 6.x** - 声明式路由管理

### 样式系统
- **Tailwind CSS 3.x** - 原子化 CSS 框架
- **自定义主题** - iOS 风格的颜色、阴影、圆角系统

### 功能库
- **react-markdown** - Markdown 渲染引擎
- **remark-gfm** - GitHub Flavored Markdown 支持
- **rehype-highlight** - 代码语法高亮
- **react-player** - 多平台视频播放器
- **react-icons** - 图标库（Font Awesome、Simple Icons）

## 架构设计

### 目录结构

```
src/
├── components/
│   ├── common/          # 通用基础组件
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Loading.jsx
│   │   └── Modal.jsx
│   ├── layout/          # 布局组件
│   │   ├── Header.jsx   # 顶部导航
│   │   └── Layout.jsx   # 页面布局容器
│   └── features/        # 功能组件
│       ├── MusicPlayer.jsx
│       ├── ImageGrid.jsx
│       ├── VideoCard.jsx
│       └── SocialLinks.jsx
├── pages/               # 页面组件（懒加载）
│   ├── Home.jsx         # 首页 Hero
│   ├── Gallery.jsx      # 图片作品展示
│   ├── Videos.jsx       # 视频作品展示
│   ├── Articles.jsx     # 文章列表
│   ├── ArticleDetail.jsx # 文章详情（带目录）
│   ├── About.jsx        # 关于页面
│   └── Settings.jsx     # 设置页面
├── utils/               # 工具函数
│   └── fileLoader.js    # 文件自动加载
├── router/              # 路由配置
│   └── index.jsx
└── index.css            # Tailwind 入口 + 自定义样式
```

### 设计原则

#### 1. 组件职责单一
每个组件只负责一个功能，通过 props 控制变体：

```jsx
// ✅ 好的设计
<Button variant="primary" size="lg" onClick={handleClick}>
  提交
</Button>

// ❌ 避免的设计
<SubmitButton isLarge={true} isPrimary={true} />
```

#### 2. 样式原子化
优先使用 Tailwind 原子类，公共样式通过 @apply 封装：

```css
/* index.css */
.btn-primary {
  @apply rounded-xl bg-primary px-6 py-3 font-medium text-white;
  @apply shadow-soft transition-all duration-200;
  @apply hover:scale-105 hover:shadow-card;
}
```

#### 3. 路由懒加载
所有页面组件采用 React.lazy() 懒加载，提升首屏性能：

```jsx
const Home = lazy(() => import('../pages/Home'))
const Gallery = lazy(() => import('../pages/Gallery'))
```

#### 4. 文件自动扫描
图片和文章通过 Vite 的 import.meta.glob 自动读取：

```javascript
// utils/fileLoader.js
export async function loadArticles() {
  const modules = import.meta.glob('/public/assets/articles/*.md', {
    as: 'raw',
    eager: false
  })
  // 自动扫描并解析 Markdown 文件
}
```

## 业务模块

### 1. 首页（Home）
**功能：** Hero 展示、技术栈展示、快速导航

**设计亮点：**
- 大标题 + 副标题的经典 Hero 布局
- 技术栈图标黑白到彩色的 hover 效果
- 简洁的 CTA 按钮引导用户探索

### 2. 图片作品集（Gallery）
**功能：** 响应式图片网格、图片预览、信息面板

**技术实现：**
- 自动扫描 `public/assets/images/` 目录
- 瀑布流布局（CSS Grid）
- 图片懒加载（loading="lazy"）
- 点击放大预览 + 复制功能

### 3. 视频作品（Videos）
**功能：** 多平台视频播放、响应式卡片布局

**支持平台：**
- Bilibili
- YouTube
- Vimeo
- 本地视频

### 4. 文章系统（Articles）
**功能：** 文章列表、详情页、目录导航、代码高亮

**核心特性：**
- **自动目录生成** - 提取 h1/h2/h3 标题
- **滚动高亮** - IntersectionObserver 监听当前章节
- **点击跳转** - 平滑滚动到对应位置
- **可折叠目录** - 节省屏幕空间
- **代码高亮** - highlight.js + GitHub 主题
- **GFM 支持** - 表格、任务列表、删除线等

**文章详情页布局：**
```
┌─────────────────────────────────────┐
│         Header (固定顶部)            │
├──────────┬──────────────────────────┤
│  目录栏   │      文章内容区域         │
│ (可折叠)  │  - 标题                  │
│          │  - 日期                  │
│ • 章节1   │  - Markdown 渲染         │
│ • 章节2   │  - 代码高亮              │
│   - 2.1  │  - 图片/表格             │
│   - 2.2  │                         │
│ • 章节3   │                         │
└──────────┴──────────────────────────┘
```

### 5. 关于页面（About）
**功能：** 个人介绍、技能展示、社交链接

### 6. 设置页面（Settings）
**功能：** 主题切换、音乐播放器控制

## 设计系统

### 颜色系统
```javascript
// tailwind.config.js
colors: {
  primary: '#007AFF',        // iOS 蓝
  'text-primary': '#1a1a1a', // 主文本
  'text-secondary': '#666',  // 次级文本
  'text-tertiary': '#999',   // 三级文本
  'surface-base': '#ffffff', // 基础背景
  'surface-elevated': '#f5f5f7', // 提升背景
  border: '#e5e5e5',         // 边框
}
```

### 阴影系统
```javascript
boxShadow: {
  soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
  card: '0 4px 16px rgba(0, 0, 0, 0.08)',
  modal: '0 8px 32px rgba(0, 0, 0, 0.12)',
}
```

### 圆角系统
```javascript
borderRadius: {
  xl: '16px',
  '2xl': '24px',
}
```

### 字体系统
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Helvetica Neue', Arial, sans-serif;
```

## 性能优化

### 1. 代码分割
- 路由级别懒加载
- 组件级别动态导入
- 第三方库按需加载

### 2. 资源优化
- 图片懒加载（Intersection Observer）
- WebP 格式优化
- 代码压缩和 Tree Shaking

### 3. 渲染优化
- React.memo 避免不必要的重渲染
- useCallback / useMemo 缓存计算结果
- 虚拟滚动（大列表场景）

### 4. 网络优化
- Vite 的 HTTP/2 推送
- 资源预加载（preload/prefetch）
- CDN 加速

## 开发规范

### 命名规范
- **组件文件：** PascalCase（Button.jsx）
- **工具函数：** camelCase（fileLoader.js）
- **常量：** UPPER_SNAKE_CASE（API_BASE_URL）
- **CSS 类名：** kebab-case（btn-primary）

### 组件结构
```jsx
// 1. 导入依赖
import React, { useState, useEffect } from 'react'

// 2. 组件定义
function ComponentName({ prop1, prop2 }) {
  // 3. Hooks
  const [state, setState] = useState(null)

  useEffect(() => {
    // 副作用逻辑
  }, [])

  // 4. 事件处理
  const handleClick = () => {}

  // 5. 渲染
  return <div>...</div>
}

// 6. PropTypes
ComponentName.propTypes = {}

// 7. 导出
export default ComponentName
```

### Git 提交规范
```
<type>: <subject>

<body>
```

**Type 类型：**
- feat: 新功能
- fix: 修复 bug
- style: 样式调整
- refactor: 重构代码
- perf: 性能优化
- docs: 文档更新
- chore: 构建/工具配置

## 扩展指南

### 新增页面（3 步）
1. 在 `src/pages/` 创建新页面组件
2. 在 `src/router/index.jsx` 添加路由配置
3. 在 `src/components/layout/Header.jsx` 添加导航链接

### 添加图片作品
将图片文件放入 `public/assets/images/` 目录，Gallery 页面会自动扫描并展示。

### 添加文章
将 Markdown 文件放入 `public/assets/articles/` 目录，Articles 页面会自动扫描并展示。

### 自定义主题
编辑 `tailwind.config.js` 修改颜色、阴影、圆角等主题配置。

## 总结

Zhustand 项目通过现代化的技术栈和精心设计的架构，实现了高性能、高可维护性的个人作品集网站。项目遵循美式 App 的极简美学，注重细节和用户体验，是学习 React + Tailwind CSS 的优秀实践案例。

**核心优势：**
- ✅ 清晰的架构设计
- ✅ 完善的设计系统
- ✅ 优秀的性能表现
- ✅ 良好的代码规范
- ✅ 易于扩展维护

**适用场景：**
- 个人作品集网站
- 技术博客
- 在线简历
- 创意展示平台
