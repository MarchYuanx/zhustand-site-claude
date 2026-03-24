# test

为指定的 React 组件自动生成单元测试和交互测试代码（Vitest + Testing Library）。

用法：`/test [组件路径]`
- 指定路径：`/test src/components/common/Button.tsx`
- 不指定路径：自动分析 `git diff` 找到最近修改的组件文件

## 执行流程

### 1. 环境检测

**检查测试依赖是否已安装：**

读取 `package.json`，检查 devDependencies 中是否包含以下依赖：
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom`

**如果缺少依赖：**
1. 提示用户并运行安装命令：
   ```bash
   pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
   ```
2. 在 `package.json` 中添加 test 脚本（如果不存在）：
   ```json
   "test": "vitest",
   "test:run": "vitest run",
   "test:coverage": "vitest run --coverage"
   ```

**检查 vitest 配置文件：**

如果不存在 `vitest.config.ts`，创建：

```typescript
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
```

**检查测试 setup 文件：**

如果不存在 `src/test/setup.ts`，创建：

```typescript
import '@testing-library/jest-dom'
```

### 2. 确定目标组件

**如果用户指定了组件路径：**
- 直接读取该文件

**如果用户未指定路径：**
- 运行 `git diff --name-only` 和 `git diff --cached --name-only`
- 从变更文件中筛选 `src/components/**/*.tsx` 和 `src/pages/**/*.tsx` 文件
- 如果有多个组件文件，列出让用户选择
- 如果没有变更的组件文件，提示用户手动指定路径

### 3. 分析组件

读取目标组件源码，深入分析以下内容：

**Props 分析：**
- 提取 `interface` 或 `type` 定义的 Props
- 识别必选和可选 props
- 识别 props 的默认值
- 识别 variant/type 类的联合类型 props

**渲染逻辑分析：**
- 组件渲染的主要 DOM 结构
- 条件渲染逻辑（不同 props 下的不同输出）
- 列表渲染
- 子组件依赖

**交互分析：**
- onClick、onChange、onSubmit 等事件处理
- 表单输入和提交
- 键盘事件（Escape 关闭等）
- 状态切换（展开/折叠、显示/隐藏）

**依赖分析：**
- `react-router-dom`（需要 MemoryRouter 包裹）
- `zustand` store（需要 mock）
- `framer-motion`（需要 mock）
- `react-helmet-async`（需要 HelmetProvider 包裹）
- 外部 API 调用（需要 mock）

### 4. 生成测试代码

在目标组件同目录下创建 `ComponentName.test.tsx` 文件。

**测试文件结构模板：**

```typescript
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
// [根据依赖分析添加必要的 import]
import ComponentName from './ComponentName'

// [根据依赖分析添加必要的 mock]

// [如果需要 wrapper，定义 renderWithProviders 辅助函数]

describe('ComponentName', () => {
  // === 渲染测试 ===
  it('should render without crashing', () => {
    render(<ComponentName /* 必选 props */ />)
    // 验证关键元素存在
  })

  it('should render with default props', () => {
    render(<ComponentName /* 必选 props */ />)
    // 验证默认状态下的渲染输出
  })

  // === Props 变体测试 ===
  // 为每个有意义的 prop 组合生成测试
  it('should render variant X when prop is Y', () => {
    render(<ComponentName variant="X" />)
    // 验证该变体的特定渲染
  })

  // === 交互测试 ===
  // 为每个事件处理函数生成测试
  it('should call onClick when button is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<ComponentName onClick={handleClick} />)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // === 条件渲染测试 ===
  it('should show/hide element based on condition', () => {
    // 测试条件渲染逻辑
  })

  // === 边界情况 ===
  it('should handle empty data gracefully', () => {
    render(<ComponentName items={[]} />)
    // 验证空状态显示
  })

  // === 可访问性测试 ===
  it('should have correct ARIA attributes', () => {
    render(<ComponentName />)
    // 验证 aria-label, role 等
  })
})
```

**Mock 模板：**

如果组件依赖 `react-router-dom`：
```typescript
import { MemoryRouter } from 'react-router-dom'

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  )
}
```

如果组件依赖 Zustand store：
```typescript
vi.mock('../../stores/useXxxStore', () => ({
  default: vi.fn(() => ({
    // mock store 返回值
  })),
}))
```

如果组件使用 `framer-motion`：
```typescript
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    // 根据组件实际使用的 motion 元素添加
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
}))
```

如果组件使用 `react-helmet-async`：
```typescript
import { HelmetProvider } from 'react-helmet-async'

const renderWithHelmet = (ui: React.ReactElement) => {
  return render(<HelmetProvider>{ui}</HelmetProvider>)
}
```

### 5. 生成规则

**必须遵守：**
- 测试文件放在组件同目录下（`Button.test.tsx` 与 `Button.tsx` 同级）
- 使用 `userEvent`（而非 `fireEvent`）模拟用户交互
- 使用 `screen` 查询 DOM（而非解构 render 返回值）
- 优先使用语义化查询：`getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- 每个测试用例只验证一个行为
- 测试描述使用英文，以 `should` 开头
- 异步交互使用 `async/await` + `userEvent.setup()`

**不要做：**
- 不要测试实现细节（内部 state 值、组件实例方法）
- 不要测试第三方库的行为
- 不要生成快照测试（snapshot test）
- 不要在测试中直接 import CSS 文件
- 不要生成冗余的重复测试

### 6. 运行验证

生成测试文件后，自动运行测试验证：

```bash
pnpm vitest run <测试文件路径> --reporter=verbose
```

**如果测试失败：**
1. 分析错误信息
2. 常见问题修复：
   - `ReferenceError: xxx is not defined` → 添加缺失的 mock
   - `Unable to find role` → 检查查询方式，换用其他查询
   - `act() warning` → 用 `await` 包裹异步操作
   - `Cannot find module` → 检查 import 路径
3. 修复后重新运行验证
4. 最多尝试修复 3 次，如仍失败则输出错误信息并请用户协助

### 7. 输出报告

测试通过后，输出简要报告：

```markdown
## 测试生成报告

**组件：** `src/components/common/Button.tsx`
**测试文件：** `src/components/common/Button.test.tsx`

**生成的测试用例：**
- [x] 默认渲染测试
- [x] primary 变体测试
- [x] secondary 变体测试
- [x] 点击事件测试
- [x] disabled 状态测试

**运行结果：** 5/5 通过
```

## 工具使用规则

- 使用 Read 读取组件源码和 package.json
- 使用 Grep/Glob 搜索相关文件
- 使用 Write 创建测试文件和配置文件
- 使用 Edit 修改 package.json（添加 test 脚本）
- 使用 Bash 运行安装命令和测试命令
- 不使用 Agent 工具（保持在主会话中执行）
