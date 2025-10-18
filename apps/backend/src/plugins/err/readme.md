
```
src/
└── errors/
    ├── index.ts                 # 统一导出所有错误类
    ├── base.ts                  # 基类 CustomError
    ├── http-errors.ts           # HTTP 语义错误（4xx/5xx）
    ├── database-error-mapper.ts # 数据库错误映射函数
    └── guards.ts                # 类型守卫（如 isDatabaseError）
```