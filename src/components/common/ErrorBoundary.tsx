import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary 组件
 *
 * 功能：
 * - 捕获组件树中的 JavaScript 错误
 * - 显示友好的错误提示界面
 * - 提供重试和返回首页的选项
 * - 在开发环境显示错误详情
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 可以在这里记录错误到日志服务
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义 fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认错误界面 - 美式极简风格
      return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
          <div className="max-w-md text-center">
            {/* 错误图标 */}
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 shadow-soft dark:bg-red-900/20">
                <svg
                  className="h-12 w-12 text-red-500 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* 错误标题 */}
            <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-text-primary dark:text-gray-100">
              出错了
            </h1>

            {/* 错误描述 */}
            <p className="mb-8 text-lg text-text-secondary dark:text-gray-400">
              页面遇到了一些问题，请尝试刷新页面或返回首页
            </p>

            {/* 开发环境显示错误详情 */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mb-8 rounded-xl bg-red-50 p-4 text-left dark:bg-red-900/20">
                <p className="mb-2 font-mono text-sm font-semibold text-red-700 dark:text-red-400">
                  错误详情：
                </p>
                <p className="font-mono text-xs text-red-600 dark:text-red-300">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReset}
                className="rounded-xl bg-primary px-6 py-3 font-medium text-white shadow-soft transition-all hover:scale-105 hover:shadow-card"
              >
                重试
              </button>
              <Link
                to="/"
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-text-primary shadow-soft transition-all hover:scale-105 hover:border-primary hover:shadow-card dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
