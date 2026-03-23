# Claude Code 常用命令行指南

Claude Code 是 Anthropic 官方推出的命令行工具，提供了强大的 AI 辅助编程能力。本文介绍常用命令和最佳实践。

## 基础命令

### 启动与退出

```bash
# 启动 Claude Code
claude

# 退出会话
/exit 或 Ctrl+D
```

### 帮助系统

```bash
# 查看帮助文档
/help

# 查看所有可用命令
/commands
```

## 核心斜杠命令

### 会话管理

- `/clear` - 清空当前会话历史（保留系统上下文）
- `/reset` - 完全重置会话（清除所有上下文）
- `/history` - 查看会话历史记录

### Git 操作

- `/commit` - 智能创建 Git 提交（自动分析变更并生成提交信息）
- `/review-pr` - 审查 Pull Request（支持 GitHub PR 链接或 PR 编号）
- `/push` - 推送当前分支到远程仓库

### 代码操作

- `/simplify` - 审查并优化代码质量（检查复用性、效率和问题）
- `/test` - 运行项目测试
- `/lint` - 执行代码检查

### 配置管理

- `/update-config` - 配置 Claude Code 设置（权限、环境变量、钩子等）
- `/fast` - 切换快速模式（使用相同模型但输出更快）

## 实用技巧

### 1. 使用 @ 符号引用文件

在提示中使用 `@` 符号可以快速引用文件或目录：

```bash
# 引用单个文件
@src/components/Button.tsx 优化这个组件

# 引用整个目录
@src/components 重构所有组件

# 引用多个文件
@package.json @vite.config.ts 检查配置是否一致
```

### 2. 使用 ! 前缀运行本地命令

需要运行交互式命令时，使用 `!` 前缀：

```bash
# 运行需要交互的命令
! gcloud auth login
! npm login
```

### 3. 后台任务管理

查看和管理后台运行的任务：

```bash
/tasks          # 查看所有任务
/task-output    # 获取任务输出
/task-stop      # 停止任务
```

### 4. 循环执行命令

使用 `/loop` 定期执行任务：

```bash
# 每 5 分钟检查一次部署状态
/loop 5m 检查部署状态

# 默认 10 分钟间隔
/loop /test
```

## 高级功能

### Worktree 隔离环境

在独立的 Git worktree 中工作，避免影响主分支：

```bash
# 进入 worktree（需要明确请求）
创建一个 worktree

# 退出 worktree
退出 worktree 并保留更改
退出 worktree 并删除
```

### 定时任务

使用 Cron 语法设置定时提醒：

```bash
# 每天早上 9 点提醒
每天早上 9 点提醒我检查邮件

# 一小时后提醒
一小时后提醒我休息
```

## 最佳实践

### 提问技巧

1. **明确具体**：说明你想要什么，而不是如何做
   - ✅ "优化这个组件的性能"
   - ❌ "用 useMemo 包裹这个函数"

2. **提供上下文**：使用 @ 引用相关文件
   - ✅ "@src/App.tsx 添加深色模式支持"
   - ❌ "添加深色模式"

3. **分步骤**：复杂任务拆分成小步骤
   - ✅ "先重构组件结构，然后添加新功能"
   - ❌ "重构整个项目并添加 10 个新功能"

### Git 工作流

1. **使用 /commit**：让 Claude 自动分析变更并生成规范的提交信息
2. **审查 PR**：使用 `/review-pr` 进行代码审查
3. **避免手动 git 操作**：让 Claude 处理 Git 命令，减少错误

### 代码质量

1. **定期使用 /simplify**：检查代码质量和复用性
2. **提交前运行 /lint**：确保代码符合规范
3. **使用 /test**：验证功能正常

## 常见问题

### Q: Claude 如何访问我的文件？

A: Claude 通过工具（Read、Write、Edit 等）访问文件，每次操作都需要你的授权。

### Q: 如何让 Claude 记住我的偏好？

A: Claude 会自动将重要信息保存到 `.claude/memory/` 目录，跨会话持久化。

### Q: 如何反馈问题？

A: 使用 `/help` 查看帮助，或访问 https://github.com/anthropics/claude-code/issues 提交问题。

## 总结

Claude Code 是一个强大的 AI 编程助手，通过简洁的命令行界面提供智能代码辅助。掌握这些命令和技巧，可以显著提升开发效率。

**核心要点：**
- 使用 `@` 引用文件，提供精确上下文
- 善用斜杠命令（/commit、/simplify、/review-pr）
- 让 Claude 处理复杂的 Git 操作
- 明确具体的需求，而不是实现细节

---

*最后更新：2026-03-24*
