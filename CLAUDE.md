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