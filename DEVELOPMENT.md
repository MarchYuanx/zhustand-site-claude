# 开发指南

## 📦 包管理器：pnpm

本项目使用 **pnpm** 作为包管理器，相比 npm/yarn 具有以下优势：
- 更快的安装速度
- 更少的磁盘空间占用
- 更严格的依赖管理

### 安装 pnpm

```bash
# 使用 npm 全局安装
npm install -g pnpm

# 或使用 PowerShell（Windows）
iwr https://get.pnpm.io/install.ps1 -useb | iex

# 验证安装
pnpm --version
```

---

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

开发服务器将在 `http://localhost:3000` 启动并自动打开浏览器。

### 3. 构建生产版本

```bash
pnpm build
```

构建产物将输出到 `dist/` 目录。

### 4. 预览生产构建

```bash
pnpm preview
```

### 5. 代码检查

```bash
pnpm lint
```

---

## 📁 项目结构

```
zhustand-site-claude/
├── public/
│   └── assets/
│       ├── images/          # 📸 图片作品（自动扫描）
│       ├── articles/        # 📝 Markdown 文章（自动扫描）
│       └── audio/           # 🎵 背景音乐文件
├── src/
│   ├── components/
│   │   ├── common/          # 通用组件（Button, Card, Loading, Modal）
│   │   ├── layout/          # 布局组件（Header, Layout）
│   │   └── features/        # 功能组件（MusicPlayer, ImageGrid, VideoCard, SocialLinks）
│   ├── pages/               # 页面组件（懒加载）
│   ├── utils/               # 工具函数
│   ├── router/              # 路由配置
│   ├── App.jsx              # 根组件
│   ├── main.jsx             # 入口文件
│   └── index.css            # Tailwind 入口 + 自定义样式
├── tailwind.config.js       # Tailwind 主题配置
├── vite.config.js           # Vite 构建配置
├── package.json             # 依赖管理
├── .npmrc                   # pnpm 配置
├── CLAUDE.md                # Claude Code 工作指南
└── README.md                # 项目说明
```

---

## 🎨 添加内容

### 📸 添加图片作品

**步骤：**
1. 将图片文件放入 `public/assets/images/` 目录
2. 支持格式：png, jpg, jpeg, webp, svg
3. Gallery 页面会自动扫描并展示

**示例：**
```bash
public/assets/images/
├── project1.jpg
├── project2.png
└── design3.webp
```

### 📝 添加文章

**步骤：**
1. 在 `public/assets/articles/` 目录创建 `.md` 文件
2. 使用 Markdown 格式编写内容
3. Articles 页面会自动扫描并展示

**文章模板：**
```markdown
# 文章标题

这里是文章简介或摘要。

## 章节标题

文章内容支持：
- GFM 语法扩展
- 代码高亮
- 图片自适应
- 表格、列表等

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, World!')
}
\`\`\`

## 总结

文章总结内容。
```

### 🎬 添加视频

**步骤：**
1. 打开 `src/pages/Videos.jsx`
2. 在 `videos` 数组中添加新视频

**示例：**
```javascript
const videos = [
  {
    url: 'https://www.bilibili.com/video/BV1xxxxxxxxx/',
    title: '你的视频标题',
  },
  // 添加更多视频...
]
```

### 🎵 修改背景音乐

**步骤：**
1. 打开 `src/components/features/MusicPlayer.jsx`
2. 修改 `songId` 为你的网易云歌曲 ID

**示例：**
```javascript
const songId = '你的歌曲ID' // 从网易云音乐链接中获取
```

---

## 🔧 新增页面（3 步）

### 步骤 1：创建页面组件

在 `src/pages/` 目录创建新页面，例如 `About.jsx`：

```jsx
function About() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-text-primary">About</h1>
      <p className="mt-4 text-text-secondary">关于我...</p>
    </div>
  )
}

export default About
```

### 步骤 2：添加路由配置

编辑 `src/router/index.jsx`：

```javascript
// 1. 添加懒加载导入
const About = lazy(() => import('../pages/About'))

// 2. 在 <Routes> 中添加路由
<Route path="/about" element={<About />} />
```

### 步骤 3：添加导航链接

编辑 `src/components/layout/Header.jsx`：

```javascript
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/videos', label: 'Videos' },
  { path: '/articles', label: 'Articles' },
  { path: '/about', label: 'About' }, // 新增
]
```

---

## 🎨 Tailwind CSS 使用指南

### 自定义主题颜色

```jsx
// 主色（iOS 蓝）
<div className="bg-primary text-white">

// 文本层级
<p className="text-text-primary">主文本</p>
<p className="text-text-secondary">次级文本</p>
<p className="text-text-tertiary">三级文本</p>

// 背景层级
<div className="bg-surface-base">基础背景</div>
<div className="bg-surface-elevated">卡片背景</div>

// 边框
<div className="border border-border">
```

### 复用样式类

```jsx
// 按钮
<button className="btn-primary">主按钮</button>
<button className="btn-secondary">次级按钮</button>

// 卡片
<div className="card">卡片内容</div>

// 玻璃态效果
<div className="glass">半透明背景</div>

// 链接悬停
<a className="link-hover">链接</a>
```

### 响应式设计

```jsx
<div className="
  grid
  grid-cols-1        // 移动端 1 列
  sm:grid-cols-2     // 平板 2 列（≥640px）
  lg:grid-cols-3     // 桌面 3 列（≥1024px）
  xl:grid-cols-4     // 大屏 4 列（≥1280px）
  gap-6
">
```

### 美式 App 交互动效

```jsx
// 悬停缩放
<div className="transition-all duration-200 hover:scale-105">

// 悬停阴影
<div className="shadow-soft hover:shadow-card">

// 点击反馈
<button className="active:scale-95">

// 颜色过渡
<a className="text-text-secondary hover:text-primary transition-colors">
```

---

## 🚀 部署指南

### Vercel 部署（推荐）

```bash
# 1. 安装 Vercel CLI
pnpm add -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 生产部署
vercel --prod
```

### Netlify 部署

1. 构建项目：`pnpm build`
2. 在 Netlify 中配置：
   - Build command: `pnpm build`
   - Publish directory: `dist`

### GitHub Pages 部署

1. 修改 `vite.config.js`：
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. 构建并部署：
```bash
pnpm build
# 将 dist 目录推送到 gh-pages 分支
```

---

## 📋 常见问题

### Q1: 图片/文章不显示？
**A:** 确保文件放在正确的目录（`public/assets/images/` 或 `public/assets/articles/`），并且文件格式正确。

### Q2: 如何修改主题颜色？
**A:** 编辑 `tailwind.config.js` 中的 `colors` 配置，然后重启开发服务器（`pnpm dev`）。

### Q3: 如何添加新的图标？
**A:** 使用 react-icons 库，访问 https://react-icons.github.io/react-icons/ 查找图标，然后导入使用：
```javascript
import { FaGithub } from 'react-icons/fa'
<FaGithub className="h-6 w-6" />
```

### Q4: 视频播放失败？
**A:** 检查视频链接是否正确，B 站视频需要使用完整的 BV 号链接格式。

### Q5: 如何禁用背景音乐？
**A:** 在 `src/pages/Home.jsx` 中注释掉 `<MusicPlayer />` 组件。

### Q6: pnpm 安装依赖失败？
**A:** 尝试以下方法：
```bash
# 清除缓存
pnpm store prune

# 重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 🛠️ 开发技巧

### 热更新
修改代码后，Vite 会自动热更新，无需手动刷新浏览器。

### 代码格式化
项目已配置 Prettier，保存文件时会自动格式化（需要编辑器支持）。

### 组件扩展点
代码中标注了 `扩展点：` 注释，说明预留的扩展接口位置。

### 性能优化
- 所有页面组件使用 `React.lazy()` 懒加载
- 图片使用 `loading="lazy"` 懒加载
- 路由使用 `<Suspense>` 包裹，显示加载态

---

## 📚 技术栈文档

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [react-player](https://github.com/cookpete/react-player)
- [pnpm](https://pnpm.io/)

---

## ✨ 项目特色

✅ **工业级架构** - 组件解耦、职责单一、易于扩展
✅ **美式极简美学** - iOS/macOS 风格，视觉统一
✅ **性能优化** - 路由懒加载、图片懒加载
✅ **开发体验** - Tailwind 原子化、ESLint/Prettier 规范
✅ **自动化** - 图片/文章自动扫描，无需手动配置
✅ **响应式** - 全设备适配，移动端友好
✅ **pnpm 管理** - 快速安装、节省空间

---

**🎉 开始开发：`pnpm install && pnpm dev`**
