import { motion } from 'framer-motion'
import SocialLinks from '../components/features/SocialLinks'
import { TECH_STACK } from '../constants'
import SEO from '../components/common/SEO'
import { SEO_CONFIG, SITE_INFO } from '../constants/seo'
import PageTransition from '../components/common/PageTransition'

/**
 * 首页 Hero 模块 - 美式极简风格
 *
 * 设计要点：
 * - 对标 lvyovo-wiki.tech 的极简布局
 * - 充足留白，视觉焦点突出
 * - 柔和动效，克制交互
 *
 * 核心内容：
 * - 个人信息（姓名 + 职业）
 * - 技术栈展示
 * - 社交链接（GitHub/小红书/B站/邮箱）
 */
function Home() {
  return (
    <PageTransition>
      <SEO
        title={SEO_CONFIG.home.title}
        description={SEO_CONFIG.home.description}
        keywords={SEO_CONFIG.home.keywords}
        url={SITE_INFO.url}
        type={SEO_CONFIG.home.type}
        author={SITE_INFO.author}
      />
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
      {/* Hero 内容区 */}
      <div className="text-center">
        {/* 姓名 - 视觉焦点 - 艺术字体 */}
        <motion.h1
          className="relative mb-6 font-serif text-7xl font-bold tracking-tight md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="inline-block" whileHover="hover" initial="rest" animate="rest">
            {/* 渐变文字效果 */}
            <motion.span
              className="inline-block bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-300 dark:to-gray-100"
              variants={{
                rest: { x: 0 },
                hover: { x: -8 }
              }}
              transition={{ duration: 0.3 }}
            >
              Zhu
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-300 dark:to-gray-100"
              variants={{
                rest: { x: 0 },
                hover: { x: 8 }
              }}
              transition={{ duration: 0.3 }}
            >
              stand
            </motion.span>
          </motion.div>
        </motion.h1>

        {/* 职业描述 - 次级信息 - 优雅字体 */}
        <p className="mb-12 font-serif text-xl tracking-widest text-text-secondary md:text-2xl dark:text-gray-400">
          <span className="inline-block transition-all duration-300 hover:tracking-[0.3em]">
            frontend
          </span>
          <span className="mx-3 text-gray-400 dark:text-gray-500">→</span>
          <span className="inline-block transition-all duration-300 hover:tracking-[0.3em]">
            fullstack
          </span>
        </p>

        {/* 技术栈展示 */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((tech) => {
              const Icon = tech.icon
              return (
                <div
                  key={tech.name}
                  className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:shadow-card dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                >
                  <Icon className={`h-4 w-4 ${tech.color} grayscale transition-all duration-300 group-hover:grayscale-0`} />
                  <span className="text-sm font-medium text-text-secondary dark:text-gray-300">{tech.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 社交链接 */}
        <div className="flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </div>
    </PageTransition>
  )
}

export default Home
