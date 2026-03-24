# Zhustand Portfolio

一个基于 React + Typescript + Tailwind CSS 的个人作品集网站，采用美式 App 极简美学设计。

## 技术栈

- React 18.2+
- Typescript 5.9+
- Vite 5.x
- Tailwind CSS 3.x
- react-router-dom 6.x
- Zustand 5.0+
- react-markdown

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 项目结构

```
src/
├── components/       # 组件
│   ├── common/       # 通用组件（Button, Card, Modal, Loading 等）
│   ├── layout/       # 布局组件（Header, Layout）
│   └── features/     # 功能组件（MusicPlayer, ImageGrid, VideoCard 等）
├── pages/            # 页面（懒加载）
├── stores/           # Zustand 全局状态（musicStore, themeStore）
├── constants/        # 常量配置（路由、导航、SEO、视频等）
├── types/            # TypeScript 类型定义
├── utils/            # 工具函数
├── config/           # 动画等配置
└── router/           # 路由配置
```

## 功能特性

- ✨ 美式极简设计风格
- 📱 全响应式适配
- 🎨 Tailwind CSS 原子化样式
- 🚀 路由懒加载优化
- 🖼️ 图片作品自动扫描
- 📝 Markdown 文章渲染
- 🎬 视频作品展示
- 🎵 背景音乐播放器

## License

MIT
