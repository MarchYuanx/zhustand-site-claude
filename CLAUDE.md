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

## 前端开发规范

### 代码风格

**命名规范：**
- 组件文件：PascalCase（如 `Button.jsx`、`ImageGrid.jsx`）
- 工具函数：camelCase（如 `fileLoader.js`、`formatDate.js`）
- 常量：UPPER_SNAKE_CASE（如 `API_BASE_URL`、`MAX_ITEMS`）
- CSS 类名：kebab-case（如 `btn-primary`、`card-container`）

**文件组织：**
- 每个文件只导出一个主要组件
- 相关的子组件可以放在同一文件，但不超过 200 行
- 超过 200 行的组件应拆分为多个文件
- 工具函数按功能分类到 `utils/` 目录

### React 组件规范

**组件结构顺序：**
```jsx
// 1. 导入依赖
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// 2. 组件定义
function ComponentName({ prop1, prop2 }) {
  // 3. Hooks（按顺序：useState, useEffect, 自定义 hooks）
  const [state, setState] = useState(null)

  useEffect(() => {
    // 副作用逻辑
  }, [])

  // 4. 事件处理函数
  const handleClick = () => {
    // 处理逻辑
  }

  // 5. 渲染逻辑
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// 6. PropTypes 定义
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
}

// 7. 默认导出
export default ComponentName
```

**组件设计原则：**
- 单一职责：每个组件只做一件事
- Props 驱动：通过 props 控制组件行为和样式变体
- 无副作用：避免在组件内直接修改外部状态
- 可复用：通用组件放在 `components/common/`
- 可测试：逻辑与 UI 分离，便于单元测试

### 状态管理规范

**状态提升原则：**
- 局部状态：仅在单个组件使用的状态，使用 `useState`
- 共享状态：多个组件共享的状态，提升到最近的公共父组件
- 全局状态：跨多个页面的状态，考虑使用 Context API 或状态管理库

**避免过度状态：**
- 能通过 props 计算得出的值，不要存为 state
- 能通过现有 state 派生的值，不要重复存储
- 使用 `useMemo` 缓存计算结果，避免重复计算

### 性能优化规范

**必须遵守：**
- 所有页面组件使用 `React.lazy()` 懒加载
- 图片使用 `loading="lazy"` 属性
- 列表渲染必须添加唯一 `key` 属性
- 避免在 render 中创建新函数或对象（使用 `useCallback` / `useMemo`）

**推荐实践：**
- 大型列表使用虚拟滚动（如 react-window）
- 图片使用 WebP 格式，提供降级方案
- 使用 Code Splitting 按需加载第三方库
- 避免不必要的重渲染（使用 React DevTools Profiler 分析）

### 代码质量规范

**必须检查：**
- 运行 `pnpm lint` 确保无 ESLint 错误
- 组件必须有 PropTypes 或 TypeScript 类型定义
- 避免使用 `any` 类型或 `eslint-disable` 注释
- 删除未使用的导入和变量

**注释规范：**
- 复杂逻辑必须添加注释说明
- 公共组件必须添加 JSDoc 注释
- 扩展点使用 `// 扩展点：` 标记
- 临时方案使用 `// TODO:` 或 `// FIXME:` 标记

**错误处理：**
- 异步操作必须有 try-catch 或 .catch()
- 用户操作失败要有明确的错误提示
- 使用 Error Boundary 捕获组件错误

### Git 提交规范

**提交信息格式：**
```
<type>: <subject>

<body>
```

**Type 类型：**
- `feat`: 新功能
- `fix`: 修复 bug
- `style`: 样式调整（不影响功能）
- `refactor`: 重构代码
- `perf`: 性能优化
- `docs`: 文档更新
- `chore`: 构建/工具配置

**示例：**
```
feat: 添加图片懒加载功能

在 Gallery 组件中实现图片懒加载，提升首屏加载速度
```

**提交原则：**
- 每次提交只做一件事
- 提交前运行 `pnpm lint` 检查代码
- 避免提交调试代码（console.log、debugger）
- 敏感信息（API key、密码）不得提交

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
