import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { SITE_INFO } from '../constants/seo';

/**
 * 404 页面 - 极简风格
 */
function NotFound() {
  return (
    <>
      <SEO
        title="404"
        description="Page not found"
        url={`${SITE_INFO.url}/404`}
        author={SITE_INFO.author}
      />
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <div className="text-center">
          {/* 错误信息 */}
          <h1 className="mb-8 font-serif text-2xl font-medium tracking-wide text-text-secondary dark:text-gray-400">
            Page not found
          </h1>

          {/* 返回按钮 */}
          <Link
            to="/"
            className="inline-block rounded-xl bg-primary px-8 py-3 font-medium text-white shadow-soft transition-all hover:scale-105 hover:shadow-card"
          >
            Go back home
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
