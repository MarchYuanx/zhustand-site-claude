# 项目优化与功能扩展 TODO List

> 生成日期：2026-03-23
> 项目：Zustand Portfolio Site

---

## 🔥 高优先级（建议优先实现）

### SEO 优化
- [ ] 安装 `react-helmet-async` 依赖
- [ ] 为每个页面添加独立的 meta 标签（title、description、keywords）
- [ ] 添加 Open Graph 标签（社交媒体分享优化）
- [ ] 生成 `sitemap.xml` 文件
- [ ] 配置 `robots.txt` 文件
- [ ] 添加结构化数据（JSON-LD）用于搜索引擎

### 图片灯箱效果
- [ ] 安装 `yet-another-react-lightbox` 依赖
- [ ] 在 Gallery 页面实现点击图片全屏预览
- [ ] 支持左右切换、缩放、关闭功能
- [ ] 添加图片下载功能
- [ ] 适配暗色模式样式

### 文章功能增强
- [ ] 实现文章搜索功能（标题/内容全文搜索）
- [ ] 添加标签/分类系统
- [ ] 显示文章阅读时间估算
- [ ] 添加阅读进度条（滚动时显示）
- [ ] 实现文章目录导航（TOC）
- [ ] 为代码块添加复制按钮
- [ ] 添加文章发布日期和更新日期

### Projects 页面
- [ ] 创建 Projects 页面组件
- [ ] 设计项目卡片布局（标题、描述、技术栈、链接、截图）
- [ ] 添加项目数据配置文件
- [ ] 可选：集成 GitHub API 自动获取项目信息
- [ ] 添加项目筛选功能（按技术栈）
- [ ] 在导航栏添加 Projects 链接

---

## ⚡ 中优先级（提升体验）

### 页面动画与过渡
- [ ] 安装 `framer-motion` 依赖
- [ ] 实现页面切换过渡动画
- [ ] 添加元素进入视口时的渐入动画
- [ ] 为卡片添加悬停动画效果
- [ ] 优化主题切换过渡动画

### 图片优化
- [ ] 实现图片懒加载（Intersection Observer）
- [ ] 添加 WebP 格式支持
- [ ] 配置响应式图片尺寸（srcset）
- [ ] 添加图片占位符（blur-up 效果）
- [ ] 图片压缩优化

### PWA 支持
- [ ] 配置 `vite-plugin-pwa` 插件
- [ ] 创建 `manifest.json` 文件
- [ ] 添加 Service Worker 配置
- [ ] 实现离线访问功能
- [ ] 添加安装提示组件
- [ ] 配置缓存策略

### 错误处理与边界
- [ ] 创建 Error Boundary 组件
- [ ] 优化 404 页面设计
- [ ] 添加网络错误提示组件
- [ ] 实现全局错误捕获
- [ ] 添加错误日志记录

### 交互细节优化
- [ ] 添加返回顶部按钮（滚动时显示）
- [ ] 实现骨架屏加载状态
- [ ] 页面滚动位置恢复
- [ ] 添加面包屑导航组件
- [ ] 优化移动端导航菜单（汉堡菜单）

### 通知系统
- [ ] 安装 `react-hot-toast` 依赖
- [ ] 替换 alert 为 toast 通知
- [ ] 配置通知样式（适配暗色模式）
- [ ] 添加成功/错误/警告通知类型

### 简历功能
- [ ] 创建简历页面或 PDF 下载功能
- [ ] 设计简历布局（教育、工作、技能、项目）
- [ ] 添加简历下载按钮
- [ ] 可选：使用 `react-pdf` 在线预览

### 技能展示
- [ ] 创建技能展示组件
- [ ] 技术栈可视化（进度条/标签云）
- [ ] 工具和框架列表
- [ ] 证书/成就展示区域

---

## 📌 低优先级（长期规划）

### 时间线页面
- [ ] 创建 Timeline 页面组件
- [ ] 设计垂直时间轴布局
- [ ] 添加教育经历数据
- [ ] 添加工作经历数据
- [ ] 添加项目里程碑
- [ ] 实现时间轴动画效果

### 联系表单
- [ ] 创建 Contact 页面
- [ ] 设计表单布局（姓名、邮箱、消息）
- [ ] 集成 `emailjs` 或 `formspree` 服务
- [ ] 添加表单验证
- [ ] 实现提交成功/失败提示
- [ ] 添加防垃圾邮件验证（reCAPTCHA）

### 分析与监控
- [ ] 集成 Google Analytics 或 Umami
- [ ] 添加 Web Vitals 性能监控
- [ ] 可选：集成 Sentry 错误追踪
- [ ] 配置隐私友好的分析方案

### 测试体系
- [ ] 配置 Vitest 测试环境
- [ ] 为通用组件编写单元测试
- [ ] 配置 React Testing Library
- [ ] 添加 Playwright E2E 测试
- [ ] 配置 CI/CD 自动测试

### 可访问性（A11y）
- [ ] 添加完整的 ARIA 标签
- [ ] 实现键盘导航支持
- [ ] 优化焦点管理
- [ ] 检查色彩对比度
- [ ] 添加屏幕阅读器支持
- [ ] 使用 `axe-core` 进行可访问性测试

### 多语言支持
- [ ] 安装 `react-i18next` 依赖
- [ ] 配置语言切换功能
- [ ] 创建中英文翻译文件
- [ ] 添加语言切换按钮
- [ ] 持久化语言偏好设置

### 其他功能
- [ ] RSS 订阅功能
- [ ] 文章评论系统（Giscus/Disqus）
- [ ] 代码片段展示页面
- [ ] 书签/收藏功能
- [ ] 打印样式优化

---

## 🛠️ 技术债务与重构

### 代码质量
- [ ] 添加 ESLint 规则优化
- [ ] 配置 Prettier 代码格式化
- [ ] 添加 Husky + lint-staged 预提交检查
- [ ] 统一组件命名规范
- [ ] 优化 TypeScript 类型定义

### 性能优化
- [ ] 使用 React DevTools Profiler 分析性能
- [ ] 优化大列表渲染（虚拟滚动）
- [ ] 减少不必要的重渲染
- [ ] 优化 bundle 大小
- [ ] 配置代码分割策略

### 文档完善
- [ ] 完善组件使用文档
- [ ] 添加开发指南
- [ ] 编写部署文档
- [ ] 添加贡献指南
- [ ] 更新 README.md

---

## 📦 推荐依赖包

### 高优先级
```bash
pnpm add react-helmet-async
pnpm add yet-another-react-lightbox
pnpm add framer-motion
pnpm add react-hot-toast
pnpm add date-fns
pnpm add clsx
```

### 中优先级
```bash
pnpm add -D vite-plugin-pwa
pnpm add -D workbox-window
pnpm add react-intersection-observer
```

### 低优先级
```bash
pnpm add react-i18next
pnpm add emailjs-com
pnpm add @sentry/react
pnpm add -D vitest @testing-library/react
```

---

## 📝 实施建议

### 第一阶段（1-2 周）
专注于用户体验和 SEO，优先完成：
- SEO 优化
- 图片灯箱
- 文章搜索和增强功能
- Projects 页面

### 第二阶段（2-3 周）
提升交互体验和性能：
- 页面动画
- 图片优化
- PWA 支持
- 错误处理

### 第三阶段（长期）
根据需求逐步添加：
- 时间线、联系表单
- 分析监控
- 测试体系
- 多语言支持

---

**最后更新：** 2026-03-23
**项目版本：** 1.0.0
**维护者：** Claude Code
