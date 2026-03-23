import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEO = ({
  title = '个人作品集',
  description = '展示我的创意作品、技术项目和文章分享',
  keywords = 'portfolio, AI, 作品集, 前端开发, React, 设计',
  image = 'https://zhustand-site-claude.vercel.app/og-image.jpg',
  url = 'https://zhustand-site-claude.vercel.app',
  type = 'website',
  author = 'Zhustand',
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  const siteTitle = 'Zhustand';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  // 结构化数据（JSON-LD）
  const structuredData =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: fullTitle,
          description,
          image,
          datePublished: publishedTime,
          dateModified: modifiedTime || publishedTime,
          author: {
            '@type': 'Person',
            name: author,
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteTitle,
          description,
          url,
          author: {
            '@type': 'Person',
            name: author,
          },
        };

  return (
    <Helmet>
      {/* 基础 Meta 标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph 标签（社交媒体分享） */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter Card 标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* 文章特定标签 */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime} />
          <meta property="article:author" content={author} />
        </>
      )}

      {/* 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
