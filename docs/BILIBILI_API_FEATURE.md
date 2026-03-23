# B 站视频元数据展示功能

## 功能说明

VideoCard 组件现在可以自动从 B 站 API 获取并展示视频的元数据信息。

## 新增功能

### 1. 自动获取视频信息

- 通过 B 站公开 API 获取视频元数据
- 自动提取视频的 BV 号
- 异步加载，不阻塞页面渲染

### 2. 展示的数据

- **视频标题**：优先使用 API 获取的标题，如果 API 失败则使用配置文件中的标题
- **播放量**：视频的总播放次数
- **点赞数**：视频的点赞数量
- **投币数**：视频的投币数量
- **收藏数**：视频的收藏数量

### 3. 数字格式化

- 大于 1 亿：显示为 "X.X亿"
- 大于 1 万：显示为 "X.X万"
- 小于 1 万：显示原始数字

### 4. 加载状态

- 视频信息加载时显示骨架屏动画
- 优雅的加载过渡效果

## 技术实现

### 新增文件

**src/utils/bilibiliApi.ts**
- `getBilibiliVideoInfo()`: 获取视频信息
- `formatNumber()`: 格式化数字显示
- `formatDuration()`: 格式化视频时长

### 更新文件

**src/components/features/VideoCard.tsx**
- 添加视频信息状态管理
- 使用 useEffect 异步获取视频数据
- 展示播放量、点赞、投币、收藏等信息
- 添加加载状态的骨架屏

**src/config/videos.ts**
- title 字段改为可选
- 优先使用 API 获取的标题

## 使用示例

```typescript
// 配置文件中可以省略 title，会自动从 API 获取
export const videos: Video[] = [
  {
    url: 'https://www.bilibili.com/video/BV15D7NzvEkW/',
    // title 可选，会自动从 B 站 API 获取
  },
  {
    url: 'https://www.bilibili.com/video/BV1MXswekEVY/',
    title: '陕北出生说书', // 也可以手动指定作为备用
  },
]
```

## API 说明

使用 B 站公开 API：
```
https://api.bilibili.com/x/web-interface/view?bvid={BV号}
```

返回数据包括：
- 视频标题、描述、封面
- 播放量、弹幕数、评论数
- 点赞数、投币数、收藏数、分享数
- UP 主信息
- 发布时间、视频时长

## 注意事项

1. API 调用可能受到跨域限制，建议在生产环境配置代理
2. API 有访问频率限制，建议添加缓存机制
3. 如果 API 获取失败，会回退到配置文件中的 title
