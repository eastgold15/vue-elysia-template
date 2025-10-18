# API 使用说明

## 简单的Toast Hook方案

现在使用的是简化版的API Hook，集成了Toast错误处理和成功提示。

### 📁 文件结构

```
src/utils/
├── handleApi.ts              # 主要的API接口（使用Toast）
├── useApiWithToast.ts        # 核心Toast Hook
├── useTreaty.ts             # Eden Treaty客户端
└── README.md                # 本说明文档
```

### 🚀 快速开始

```typescript
// 在任何Vue组件中
import { useApi } from '@/utils/handleApi'

const api = useApi()

// 1. 获取列表（自动处理分页）
const partners = await api.partners.list({ page: 1, limit: 10 })

// 2. 获取单个项目
const partner = await api.partners.getById(1)

// 3. 创建项目（自动显示成功Toast）
const newPartner = await api.partners.create({
  name: '新合作伙伴',
  link: 'https://example.com',
  isActive: true
})

// 4. 更新项目（自动显示成功Toast）
await api.partners.update(1, { name: '更新后的名称' })

// 5. 删除项目（自动显示成功Toast）
await api.partners.delete(1)

// 6. 自定义Toast
api.toast.error('自定义错误消息')
api.toast.success('自定义成功消息')
api.toast.warning('自定义警告消息')
```

### 📚 API接口

#### 合作伙伴 (partners)
- `list(params)` - 获取合作伙伴列表
- `getById(id)` - 获取单个合作伙伴
- `create(data)` - 创建合作伙伴
- `update(id, data)` - 更新合作伙伴
- `delete(id)` - 删除合作伙伴

#### 分类 (categories)
- `tree()` - 获取分类树
- `getById(id)` - 获取单个分类
- `create(data)` - 创建分类
- `update(id, data)` - 更新分类
- `delete(id)` - 删除分类

#### 产品 (products)
- `list(params)` - 获取产品列表
- `getById(id)` - 获取单个产品
- `create(data)` - 创建产品
- `update(id, data)` - 更新产品
- `delete(id)` - 删除产品
- `simpleList(params)` - 获取简单产品列表（首页用）

#### 广告 (ads)
- `list(params)` - 获取广告列表
- `getById(id)` - 获取单个广告
- `create(data)` - 创建广告
- `update(id, data)` - 更新广告
- `delete(id)` - 删除广告
- `carousel()` - 获取轮播图广告
- `banner(params)` - 获取横幅广告

#### SKU (skus)
- `list(params)` - 获取SKU列表
- `getByProductId(productId)` - 根据产品ID获取SKU
- `getById(id)` - 获取单个SKU
- `create(data)` - 创建SKU
- `update(id, data)` - 更新SKU
- `delete(id)` - 删除SKU
- `batchCreate(data)` - 批量创建SKU

#### 站点配置 (siteConfigs)
- `list(params)` - 获取配置列表
- `all(params)` - 获取所有配置
- `getById(id)` - 获取单个配置
- `create(data)` - 创建配置
- `update(id, data)` - 更新配置
- `delete(id)` - 删除配置
- `batchDelete(ids)` - 批量删除配置

#### 图片 (images)
- `list(params)` - 获取图片列表
- `getById(id)` - 获取单个图片
- `update(id, data)` - 更新图片
- `delete(id)` - 删除图片
- `batchDelete(body)` - 批量删除图片

### ✨ 特性

1. **自动错误处理** - 使用PrimeVue Toast显示错误信息
2. **自动成功提示** - CRUD操作自动显示成功消息
3. **类型安全** - 使用后端定义的模型类型
4. **分页支持** - 自动处理分页数据格式
5. **简单易用** - 一行代码完成API调用

### 🎯 错误处理

错误会自动根据HTTP状态码显示友好的中文提示：

- 400: 请求参数有误
- 401: 登录已过期，请重新登录
- 403: 没有权限进行此操作
- 404: 请求的资源不存在
- 500: 服务器内部错误，请稍后再试

### 📝 示例组件

参考 `src/components/example/ApiUsageExample.vue` 查看完整的使用示例。