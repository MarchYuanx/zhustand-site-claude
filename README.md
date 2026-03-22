# Zhustand Portfolio

一个基于 React + Tailwind CSS 的个人作品集网站，采用美式 App 极简美学设计。

## 技术栈

- React 18.2+
- Vite 5.x
- Tailwind CSS 3.x
- react-router-dom 6.x
- react-markdown
- react-player

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
│   ├── common/       # 通用组件
│   ├── layout/       # 布局组件
│   └── features/     # 功能组件
├── pages/            # 页面
├── utils/            # 工具函数
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

## 添加内容

### 图片作品
将图片放入 `public/assets/images/` 目录

### 文章
将 Markdown 文件放入 `public/assets/articles/` 目录

### 视频
编辑 `src/pages/Videos.jsx` 添加视频链接

## License

MIT
