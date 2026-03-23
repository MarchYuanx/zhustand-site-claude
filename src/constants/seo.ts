// SEO 配置文件
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
}

// 网站基础信息
export const SITE_INFO = {
  name: 'Zhustand',
  url: 'https://zhustand-site-claude.vercel.app', // 注意：不要末尾斜杠
  author: 'Zhustand',
  defaultImage: 'https://zhustand-site-claude.vercel.app/og-image.jpg', // 完整 URL
  logo: 'https://zhustand-site-claude.vercel.app/logo.png', // 网站 logo
  socialLinks: {
    github: 'https://github.com/MarchYuanx',
    bilibili: 'https://space.bilibili.com/17178880',
  },
};

// 各页面 SEO 配置
export const SEO_CONFIG: Record<string, SEOConfig> = {
  home: {
    title: 'Home',
    description: '欢迎来到我的个人作品集，这里展示了我的创意作品、技术项目和文章分享',
    keywords: 'portfolio, 作品集, 前端开发, React, 设计, 创意',
    type: 'website',
  },
  gallery: {
    title: 'Gallery',
    description: '浏览我的图片作品集，包含设计作品、摄影作品和创意视觉',
    keywords: '图片, 作品集, 设计, 摄影, 视觉艺术',
    type: 'website',
  },
  videos: {
    title: 'Videos',
    description: '观看我的视频作品，包含创意视频、教程和项目展示',
    keywords: '视频, 作品, 教程, B站, 创意视频',
    type: 'website',
  },
  articles: {
    title: 'Articles',
    description: '阅读我的技术文章和经验分享，涵盖前端开发、设计和编程技巧',
    keywords: '文章, 博客, 技术分享, 前端开发, 编程',
    type: 'website',
  },
  about: {
    title: 'About',
    description: '了解更多关于我的信息，包括技能、经历和联系方式',
    keywords: '关于, 个人简介, 技能, 联系方式',
    type: 'profile',
  },
  settings: {
    title: 'Settings',
    description: '个性化设置，包括主题切换和偏好配置',
    keywords: '设置, 主题, 配置',
    type: 'website',
  },
};
