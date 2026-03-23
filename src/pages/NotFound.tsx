import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { SITE_INFO } from '../constants/seo';

/**
 * 404 页面 - 美式极简风格
 *
 * 设计要点：
 * - 简洁友好的错误提示
 * - 清晰的导航选项
 * - 符合网站整体美学
 */
function NotFound() {
  return (
    <>
      <SEO
        title="404 - 页面未找到"
        description="抱歉，您访问的页面不存在"
        url={`${SITE_INFO.url}/404`}
        author={SITE_INFO.author}
      />
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
        <div className="max-w-md text-center">
          {/* 404 数字 - 视觉焦点 */}
          <div className="mb-8">
            <h1 className="font-serif text-9xl font-bold tracking-tight text-gray-200 dark:text-gray-800">
              404
            </h1>
          </div>

          {/* 错误标题 */}
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-text-primary dark:text-gray-100">
            页面未找到
          </h2>

          {/* 错误描述 */}
          <p className="mb-8 text-lg leading-relaxed text-text-secondary dark:text-gray-400">
            抱歉，您访问的页面不存在或已被移除
          </p>

          {/* 导航选项 */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="rounded-xl bg-primary px-6 py-3 font-medium text-white shadow-soft transition-all hover:scale-105 hover:shadow-card"
            >
              返回首页
            </Link>
            <Link
              to="/articles"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-text-secondary shadow-soft transition-all hover:scale-105 hover:border-gray-300 hover:shadow-card dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              浏览文章
            </Link>
          </div>

          {/* 友好提示 */}
          <p className="mt-8 text-sm text-text-tertiary dark:text-gray-500">
            或许你可以尝试搜索你想要的内容
          </p>
        </div>
      </div>
    </>
  );
}

export default NotFound;
