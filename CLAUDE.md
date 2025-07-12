# 项目说明

**这是一个微信小程序项目**
- 使用 TypeScript 开发
- 使用微信开发者工具进行编译和调试
- 遵循微信小程序开发规范

# 开发规范

## TypeScript 类型检查要求
**每次代码修改后必须运行 TypeScript 类型检查并确保通过**

运行命令：
```bash
npx tsc --noEmit
```

- 该命令必须无错误输出
- 如果有类型错误，必须修复后才能提交代码
- 这确保代码质量和类型安全

# Git 提交规范

## 自动提交要求
每次修改文件后必须自动进行 commit。

## 提交信息规范
使用以下格式：

```
<type>(<scope>): <subject>

<body>
```

### Type 类型
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档修改
- `style`: 代码格式修改（不影响代码运行）
- `refactor`: 重构代码
- `test`: 测试用例修改
- `chore`: 构建过程或辅助工具的变动

### Scope 范围（可选）
- `pages`: 页面相关
- `components`: 组件相关
- `utils`: 工具函数
- `config`: 配置文件
- `api`: 接口相关

### 示例
```
feat(pages): 添加用户登录页面
fix(utils): 修复时间格式化函数bug
docs: 更新README文档
style(components): 调整按钮组件样式
```

# 微信小程序特殊配置说明

## TypeScript 配置 - 无需关注的问题
- **无需安装 typescript 包** - 微信开发者工具内置 TypeScript 编译器
- **无需 outDir/rootDir** - 微信开发者工具自动处理编译输出
- **无需复杂的模块解析配置** - 小程序有自己的模块系统
- **当前 tsconfig.json 已足够严格** - 已启用 strict 模式和各种检查

## 已配置完善的部分
- project.config.json 已启用 typescript 插件
- typings 目录提供完整的微信 API 类型定义
- miniprogram-api-typings 提供官方类型支持