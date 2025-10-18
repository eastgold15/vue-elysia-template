# 类型安全的API使用指南

## 🎯 问题解决

原来的问题：使用 `api.client.api.products.get()` 能看到服务器返回的完整类型，但包装后变成了 `any`。

**重构完成**：现在使用简化的 `Promise<{ data: Data; error: Err }>` 模式来保持完整的类型推导，避免了复杂的类型提取操作。

## 🚀 在我们的 Toast Hook 中使用

### 1. 基础API调用
```typescript
import { useApiWithToast } from './useApiWithToast'

const api = useApiWithToast()

// 保持原始类型推导
const products = await api.call(() =>
  client.api.products.get({ query: { page: 1, limit: 10 } })
)
// products 的类型是直接从 client 推导的，即 ProductsModel.Entity[] | null
```

### 2. CRUD操作
```typescript
// 创建产品
const createResponse = client.api.products.post({
  name: 'New Product',
  basePrice: 99.99
})

const createdProduct = await api.create(() => createResponse, '创建成功')
// createdProduct 保持 createResponse.data 的类型
// 也就是 ProductsModel.Entity | null

// 更新产品
const updateResponse = client.api.products({ id: 1 }).put({
  name: 'Updated Product'
})

const updatedProduct = await api.update(() => updateResponse, '更新成功')
// updatedProduct 保持 updateResponse.data 的类型
// 也就是 ProductsModel.Entity | null
```

### 3. 分页API
```typescript
const paginatedProducts = await api.callPaginated(() =>
  client.api.products.get({ query: { page: 1, limit: 10 } })
)
// paginatedProducts 会保持原始类型，并自动包装为分页格式
```

## 🔍 类型推导示例

### 在组件中使用
```vue
<script setup lang="ts">
import { useApi } from '@/utils/handleApi'
import type { ProductsModel } from '@backend/db/models'

const api = useApi()

// 类型推导正确，products 是 ProductsModel.Entity[]
const products = await api.call(() =>
  api.client.api.products.get({ query: { page: 1, limit: 10 } })
)

// 可以安全地访问属性
products.forEach(product => {
  console.log(product.name)        // ✅ 类型安全
  console.log(product.basePrice)   // ✅ 类型安全
  console.log(product.isActive)    // ✅ 类型安全
})

// 创建产品也有正确的类型
const newProduct = await api.create(() =>
  api.client.api.products.post({
    name: 'New Product',
    basePrice: 99.99,
    isActive: true
  }),
  '创建成功'
)

// newProduct 是 ProductsModel.Entity
if (newProduct) {
  console.log(newProduct.id)       // ✅ 类型安全
  console.log(newProduct.createdAt) // ✅ 类型安全
}
</script>
```

## ✅ 重构后的优势

1. **完整类型推导** - 使用简化模式保持 Eden Treaty 的类型信息
2. **IDE智能提示** - 完整的属性和方法提示
3. **编译时错误检查** - 类型错误会在编译时发现
4. **自动错误处理** - 保持 Toast 错误提示功能
5. **简洁易用** - 使用 `api.call(() => ...)` 模式，统一且直观
6. **CRUD 操作标准化** - 创建、更新、删除操作有专门的 `create`、`update`、`remove` 方法

## 📝 重构后的最佳实践

1. **使用箭头函数包装API调用** - `api.call(() => api.client.api.products.get())`
2. **CRUD操作使用专门方法** - `api.create()`、`api.update()`、`api.remove()`
3. **分页数据使用 `callPaginated`** - 自动处理分页数据结构
4. **让TypeScript自动推导** - 无需手动声明类型，保持类型推导
5. **错误处理自动化** - 所有错误自动显示 Toast，无需手动处理

## 🔄 重构完成状态

✅ **useApiWithToast.ts** - 使用简化的 `Promise<{ data: Data; error: Err }>` 模式
✅ **handleApi.ts** - 所有API调用已重构为新的使用方式
✅ **类型测试文件** - 更新了测试用例和注释
✅ **文档更新** - 反映最新的API使用方式
✅ **示例文件** - ApiUsageExample.vue 已更新

现在你可以享受完整的类型安全和简洁的Toast错误处理了！🎉