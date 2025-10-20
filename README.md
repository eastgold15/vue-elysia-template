# Vue + Elysia + Monorepo 项目模板

一个现代化的全栈 TypeScript 项目模板，使用 Vue 3 作为前端，Elysia 作为后端，通过 Turborepo 管理 monorepo。

## 🚀 技术栈

### 前端 (apps/vue)
- **Vue 3.5** - 渐进式 JavaScript 框架
- **Vue Router** - 官方路由管理器
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的前端构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **VueUse** - Vue 组合式工具集
- **Auto Import** - 自动导入 Vue APIs 和组件
- **Elysia Eden** - 类型安全的 API 客户端

### 后端 (apps/backend)
- **Elysia** - 现代化的 TypeScript Web 框架
- **Drizzle ORM** - 类型安全的数据库 ORM
- **PostgreSQL** - 关系型数据库
- **Bun** - 高性能的 JavaScript 运行时
- **OpenAPI** - 自动生成 API 文档
- **CORS** - 跨域资源共享

### 开发工具
- **Turborepo** - 高性能的 monorepo 构建系统
- **Biome** - 快速的 JavaScript/TypeScript 代码格式化和检查工具
- **TypeScript** - 静态类型检查
- **Workspace Catalog** - 统一管理依赖版本

## 📁 项目结构

```
monorepo-vue-elyisa/
├── apps/
│   ├── vue/                 # Vue 前端应用
│   └── backend/             # Elysia 后端应用
├── packages/
│   └── tsconfig/            # 共享 TypeScript 配置
├── turbo.json               # Turborepo 配置
├── package.json             # 根项目配置
└── README.md                # 项目文档
```

## 🛠️ 快速开始

### 环境要求
- **Node.js** >= 18
- **Bun** >= 1.3.0
- **PostgreSQL** 数据库

### 安装依赖
```bash
bun install
```

### 环境配置
1. 复制环境变量文件：
```bash
cp apps/backend/.env.example apps/backend/.env
```

2. 配置数据库连接信息：
```env
# apps/backend/.env
DATABASE_URL="postgresql://username:password@localhost:5432/database"
```

### 数据库设置
```bash
# 生成数据库迁移文件
bun run db:generate

# 推送数据库 schema
bun run db:push

# 运行数据库迁移
bun run db:migrate

# 打开数据库管理界面
bun run db:studio
```

### 开发模式
```bash
# 同时启动前后端开发服务器
bun run dev

# 单独启动前端
cd apps/vue && bun run dev

# 单独启动后端
cd apps/backend && bun run dev
```

### 构建部署
```bash
# 构建所有应用
bun run build

# 类型检查
bun run check-types

# 代码检查和格式化
bun run lint
bun run lint:fix

# 清理构建文件和依赖
bun run clean
```

## 🌐 应用访问

开发模式下：
- **前端应用**: http://localhost:5173
- **后端 API**: http://localhost:3000
- **API 文档**: http://localhost:3000/docs

## 🔧 开发特性

### 类型共享
- 前端可以直接使用后端定义的类型
- 数据库模型类型自动生成
- API 响应类型完全类型安全

### 自动导入
- Vue Composition API 自动导入
- 组件自动导入
- 工具函数自动导入

### 代码质量
- 使用 Biome 进行代码格式化和检查
- TypeScript 严格模式
- 统一的代码风格

### 性能优化
- Vite 的快速热重载
- Turborepo 的智能缓存
- Bun 的高性能运行时

## 📝 脚本命令

### 根项目命令
```bash
bun run dev          # 启动开发服务器
bun run build        # 构建所有应用
bun run lint         # 代码检查
bun run lint:fix     # 代码格式化
bun run check-types  # 类型检查
bun run clean        # 清理项目
```

### 后端命令 (apps/backend)
```bash
bun run dev          # 开发服务器
bun run build        # 构建生产版本
bun run start        # 启动生产服务器
bun run db:generate  # 生成数据库迁移
bun run db:push      # 推送数据库 schema
bun run db:migrate   # 运行数据库迁移
bun run db:studio    # 数据库管理界面
```

### 前端命令 (apps/vue)
```bash
bun run dev          # 开发服务器
bun run build        # 构建生产版本
bun run preview      # 预览构建结果
```

## 🎯 最佳实践

### 目录结构
- 保持应用逻辑清晰分离
- 使用组合式 API 组织代码
- 遵循 TypeScript 最佳实践

### 代码规范
- 使用 Biome 进行代码格式化
- 编写类型安全的代码
- 保持代码简洁和可读性

### 数据库操作
- 使用 Drizzle ORM 进行数据库操作
- 保持数据库 schema 与代码同步
- 使用迁移文件管理数据库变更

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License