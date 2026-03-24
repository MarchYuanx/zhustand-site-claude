# review

对前端代码进行精准 Code Review，聚焦于真正影响线上质量的问题。

用法：`/review [文件路径或目录]`
- 指定文件：`/review src/components/features/MusicPlayer.tsx`
- 指定目录：`/review src/pages/`
- 不指定：自动 review `git diff` 中的变更代码

## 执行流程

### 1. 确定审查范围

**并行执行以下命令收集变更信息：**
- `git diff --name-only` — 未暂存的变更文件
- `git diff --cached --name-only` — 已暂存的变更文件
- `git diff` 和 `git diff --cached` — 具体代码变更

如果用户指定了文件或目录，直接读取对应文件。

只审查 `src/` 下的代码文件（`.tsx`, `.ts`, `.jsx`, `.js`, `.css`），忽略配置文件和 node_modules。

### 2. 逐文件审查

读取每个变更文件的完整内容，按以下 4 个维度审查。只报告实际发现的问题，没有问题的维度不输出。

---

#### A. Bug 与逻辑错误

检查会导致运行时崩溃或功能异常的代码：

- **空指针风险**：访问可能为 undefined/null 的属性时缺少 `?.` 或守卫检查
- **异步错误**：async 函数缺少 try-catch、Promise 未处理 rejection
- **useEffect 依赖**：缺失依赖导致闭包陈旧值、多余依赖导致无限循环
- **状态更新**：在卸载组件上调用 setState、状态更新依赖旧值但未用函数式更新
- **条件渲染逻辑**：`&&` 短路渲染 falsy 值（如 `{count && <X/>}` 当 count=0 时渲染 "0"）
- **Key 属性**：列表渲染使用 index 作为 key（当列表会增删排序时）
- **事件处理**：事件监听未清理、滚动/resize 事件未节流

#### B. 安全漏洞

检查 OWASP 级别的安全风险：

- **XSS**：使用 `dangerouslySetInnerHTML` 渲染未转义的用户输入
- **敏感信息**：硬编码 API key、token、密码，或未加入 .gitignore 的 .env 文件
- **不安全的 URL**：直接将用户输入拼接到 URL、使用 `javascript:` 协议
- **依赖注入**：动态 import 路径来自用户输入

#### C. 性能问题

检查会造成可感知卡顿或资源浪费的代码：

- **不必要的重渲染**：在 render 中创建新对象/数组/函数作为 props 传递给子组件
- **大型计算**：未用 useMemo 缓存的耗时计算（排序、过滤大数组）
- **组件拆分**：频繁更新的状态和不变的 UI 混在同一组件（应拆分或 memo）
- **图片优化**：缺少 `loading="lazy"`、未使用 WebP 格式、缺少宽高属性导致 CLS
- **Bundle 膨胀**：整包导入库（如 `import _ from 'lodash'` 而非 `import debounce from 'lodash/debounce'`）

#### D. 代码规范

仅检查影响可维护性的关键规范问题，不做风格纠错：

- **组件职责**：单个组件超过 200 行，应考虑拆分
- **TypeScript**：使用 `any` 类型、缺少关键的类型定义
- **死代码**：未使用的 import、变量、函数
- **命名**：组件文件非 PascalCase、变量名语义不清
- **Hooks 规则**：在条件/循环中调用 Hooks

### 3. 输出审查报告

按严重程度分级输出，格式如下：

```markdown
## Code Review 报告

### 🔴 必须修复（影响功能/安全）

**1. [Bug] 问题标题**
📍 `src/path/file.tsx:42`
```tsx
// 问题代码
{count && <Component />}
```
💡 **修复方案：**
```tsx
// 修复后
{count > 0 && <Component />}
```
原因：当 count 为 0 时，React 会渲染数字 "0" 而非不渲染。

---

### 🟡 建议修复（影响性能/可维护性）

**1. [性能] 问题标题**
📍 `src/path/file.tsx:88`
说明 + 修复方案

---

### ✅ 审查通过

- 路由懒加载 ✓
- Props 类型定义 ✓
- 事件清理 ✓
```

### 4. 快速修复

对于 🔴 级别问题：
- 直接提供可复制的修复代码
- 如果修复简单（< 5 行变更），询问用户是否直接应用修复

对于 🟡 级别问题：
- 提供修复方案和原因说明
- 不主动修改代码

## 审查原则

- **不做风格警察**：不纠正缩进、引号、分号等 — 这些交给 ESLint/Prettier
- **不重复 Lint**：如果 ESLint 能检测到的问题，不重复报告
- **聚焦变更**：优先审查新增/修改的代码，不翻旧账
- **给出修复**：每个问题必须附带具体修复方案，不能只指出问题
- **尊重上下文**：理解代码意图后再评判，避免脱离上下文的建议

## 工具使用规则

- 使用 Read 读取文件内容
- 使用 Grep/Glob 搜索相关引用
- 不使用 Edit/Write 修改代码（除非用户明确要求应用修复）
- 不使用 Bash 运行命令（除非需要 git diff）
- 不使用 Agent 工具
