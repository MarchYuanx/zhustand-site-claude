import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
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
          {/* 错误信息 - 更大字号 */}
          <h1 className="mb-12 font-serif text-5xl font-semibold tracking-tight text-text-primary md:text-6xl dark:text-gray-100">
            Page not found
          </h1>

          {/* 返回按钮 - iOS 风格，带图标 */}
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-10 py-4 font-medium text-text-primary shadow-card transition-all hover:scale-[1.02] hover:border-primary hover:shadow-modal dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-primary"
          >
            <HiHome className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="tracking-wide">Go back home</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
