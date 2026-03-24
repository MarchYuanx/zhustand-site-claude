# Claude MCP 完全指南：Model Context Protocol 入门与常用推荐

## 什么是 MCP？

MCP（Model Context Protocol，模型上下文协议）是 Anthropic 于 2024 年底推出的开放协议，它定义了 AI 模型与外部工具、数据源之间的标准通信方式。

简单来说，MCP 就像是 AI 的"插件系统"——通过 MCP Server，Claude 可以直接读写文件、查询数据库、调用 API、操作浏览器，而无需你手动粘贴内容。

**没有 MCP 的工作流：**
> 你 → 手动复制文件内容 → 粘贴给 Claude → Claude 回答 → 你手动执行

**有了 MCP 的工作流：**
> 你 → 告诉 Claude 做什么 → Claude 直接读取/操作/执行

---

## MCP 架构

```
┌─────────────┐     MCP Protocol     ┌──────────────────┐
│  Claude /   │ ◄──────────────────► │   MCP Server     │
│  Claude Code│                      │  (本地或远程)     │
└─────────────┘                      └──────────────────┘
                                              │
                                    ┌─────────┼─────────┐
                                    ▼         ▼         ▼
                                 文件系统   数据库    外部 API
```

MCP 有三种核心能力：
- **Tools（工具）**：Claude 可以调用的函数，如执行命令、读写文件
- **Resources（资源）**：Claude 可以读取的数据，如文件内容、数据库记录
- **Prompts（提示模板）**：预定义的提示词模板，方便复用

---

## 如何配置 MCP

在 Claude Code 中，MCP Server 通过 `settings.json` 配置：

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@some/mcp-package"],
      "env": {
        "API_KEY": "your-key-here"
      }
    }
  }
}
```

配置文件位置：
- **项目级**：`.claude/settings.json`（只对当前项目生效）
- **用户级**：`~/.claude/settings.json`（全局生效）

---

## 常用 MCP 推荐

### 1. Filesystem — 文件系统操作

**包名：** `@modelcontextprotocol/server-filesystem`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/your/project/path"]
    }
  }
}
```

**能做什么：** 读取、写入、搜索、移动文件，列出目录结构。

**适用场景：** 让 Claude 直接操作项目文件，无需手动复制粘贴代码。

---

### 2. GitHub — 代码仓库管理

**包名：** `@modelcontextprotocol/server-github`

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxx"
      }
    }
  }
}
```

**能做什么：** 读取 Issues、PR、代码、提交记录，创建 Issue，评论 PR。

**适用场景：** 代码审查、Issue 分析、自动化 PR 流程。

---

### 3. Playwright — 浏览器自动化

**包名：** `@playwright/mcp`

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}
```

**能做什么：** 打开网页、截图、点击、填表、抓取页面内容、执行 JS。

**适用场景：** 网页测试自动化、数据抓取、UI 验证。

---

### 4. Context7 — 实时文档查询

**包名：** `@upstash/context7-mcp`

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

**能做什么：** 实时获取各大开源库的最新文档和代码示例（React、Vue、Next.js、Tailwind 等）。

**适用场景：** 编写代码时获取最新 API 文档，避免 Claude 使用过期知识。

---

### 5. Postgres / SQLite — 数据库查询

**包名：** `@modelcontextprotocol/server-postgres`

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}
```

**能做什么：** 执行 SQL 查询、浏览表结构、分析数据。

**适用场景：** 数据分析、调试 SQL、生成数据报告。

---

### 6. Fetch — 网络请求

**包名：** `@modelcontextprotocol/server-fetch`

```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

**能做什么：** 发起 HTTP 请求，获取网页内容、调用 REST API。

**适用场景：** 实时查询天气、价格、新闻等外部数据。

---

### 7. Memory — 持久化记忆

**包名：** `@modelcontextprotocol/server-memory`

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

**能做什么：** 用知识图谱存储和检索信息，跨对话保持记忆。

**适用场景：** 长期项目协作，让 Claude 记住你的偏好、决策和上下文。

---

### 8. Sequential Thinking — 结构化推理

**包名：** `@modelcontextprotocol/server-sequential-thinking`

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

**能做什么：** 引导 Claude 进行分步推理，将复杂问题拆解为有序步骤。

**适用场景：** 复杂架构设计、多步骤调试、逻辑密集型任务。

---

## 实用组合推荐

### 全栈开发场景

```json
{
  "mcpServers": {
    "filesystem": { "..." },
    "github": { "..." },
    "playwright": { "..." },
    "context7": { "..." }
  }
}
```

适合日常开发：Claude 能直接读写代码、查文档、跑测试、管理 PR。

### 数据分析场景

```json
{
  "mcpServers": {
    "filesystem": { "..." },
    "postgres": { "..." },
    "fetch": { "..." }
  }
}
```

适合数据工作：Claude 能查数据库、抓外部数据、生成分析报告。

---

## 注意事项

1. **安全第一**：MCP Server 拥有访问你授权资源的能力，只安装来源可信的包，API Key 不要提交到代码仓库。

2. **权限最小化**：Filesystem MCP 只传入需要的目录路径，避免传入根目录。

3. **性能考量**：过多 MCP Server 同时运行会增加启动时间，按项目需要按需启用。

4. **版本锁定**：生产环境建议锁定包版本，避免自动升级带来的兼容问题：
   ```json
   "args": ["-y", "@modelcontextprotocol/server-filesystem@0.6.2", "..."]
   ```

---

## 自己写一个 MCP Server

MCP 协议是开放的，你可以用 TypeScript 或 Python 快速构建自定义 Server：

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

server.tool(
  "get_weather",
  { city: z.string() },
  async ({ city }) => {
    // 调用天气 API...
    return { content: [{ type: "text", text: `${city} 今天晴，25°C` }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

这让 Claude 拥有了一个专属的 `get_weather` 工具，可以直接在对话中调用。

---

## 资源链接

- [MCP 官方文档](https://modelcontextprotocol.io)
- [MCP Server 官方仓库](https://github.com/modelcontextprotocol/servers)
- [Claude Code 文档](https://docs.anthropic.com/claude/docs/claude-code)
- [MCP 社区服务器列表](https://github.com/punkpeye/awesome-mcp-servers)

MCP 生态正在快速成长，越来越多的工具和平台加入支持。掌握 MCP，就是给 Claude 插上了翅膀。
