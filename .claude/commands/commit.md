# commit

自动分析代码变更并生成符合项目规范的 Git 提交。

## 执行流程

### 1. 收集信息（并行执行）

运行以下命令了解当前状态：
- `git status` - 查看所有未跟踪和已修改的文件（不使用 -uall 标志）
- `git diff` - 查看已暂存和未暂存的变更
- `git log --oneline -5` - 查看最近 5 条提交记录，了解提交风格

### 2. 分析变更并生成提交信息

根据变更内容，生成符合以下规范的提交信息：

**格式：**
```
<type>: <subject>

<body>
```

**Type 类型：**
- `feat`: 新功能
- `fix`: 修复 bug
- `style`: 样式调整（不影响功能）
- `refactor`: 重构代码
- `perf`: 性能优化
- `docs`: 文档更新
- `chore`: 构建/工具配置

**规则：**
- subject：简洁描述（50 字符以内），动词开头，不加句号
- body：详细说明变更原因和影响（可选，复杂变更时必须添加）
- 提交信息必须准确反映变更性质（add=全新功能，update=增强现有功能，fix=修复问题）
- 不要提交可能包含敏感信息的文件（.env, credentials.json 等）

### 3. 添加文件并创建提交

**添加文件：**
- 优先添加具体文件名，避免使用 `git add -A` 或 `git add .`
- 只添加与本次变更相关的文件

**创建提交：**
使用 HEREDOC 格式确保提交信息格式正确：
```bash
git commit -m "$(cat <<'EOF'
<type>: <subject>

<body>

Co-Authored-By: Claude Sonnet 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

**提交后验证：**
运行 `git status` 确认提交成功。

### 4. 错误处理

如果 pre-commit hook 失败：
- 修复问题
- 重新添加文件
- 创建新的提交（不使用 --amend）

## 安全规则

- 永远不要使用 `--no-verify` 跳过 hooks
- 永远不要使用 `--amend` 修改已有提交（除非用户明确要求）
- 永远不要使用破坏性命令（reset --hard, push --force 等）
- 不要推送到远程仓库（除非用户明确要求）

## 注意事项

- 只在用户明确要求时才创建提交
- 如果没有变更，不要创建空提交
- 不要运行额外的代码探索命令
- 不要使用 TodoWrite 或 Agent 工具
