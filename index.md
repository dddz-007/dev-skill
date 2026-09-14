---
layout: home

hero:
  name: dev-skill
  text: 通用全栈开发 Agent Skill
  tagline: 让 AI Coding Agent 更系统地完成前端、后端、数据库与工程化开发任务。
  actions:
    - theme: brand
      text: 开始使用
      link: /SKILL
    - theme: alt
      text: 查看 GitHub
      link: https://github.com/dddz-007/dev-skill

features:
  - icon: 🤖
    title: Agent First
    details: 面向 Codex、Cursor、Qoder 等 AI Coding Agent 设计，让 Agent 按照标准工程流程完成开发任务。
    link: /SKILL
    linkText: 查看 Skill

  - icon: 🎨
    title: 全栈开发
    details: 覆盖前端、后端、API、数据库、联调、缺陷修复、重构和发布检查等完整开发场景。
    link: /全栈开发Agent工作流
    linkText: 查看工作流

  - icon: 🗄️
    title: 工程纪律
    details: 默认保护用户修改，数据库按只读处理，高风险和不可逆操作明确提示并等待确认。
    link: /SKILL
    linkText: 查看约束

  - icon: 🧩
    title: 可扩展
    details: references 与 examples 自动生成导航，新增加 Markdown 文档无需维护 Sidebar 配置。
    link: /examples/
    linkText: 查看案例

  - icon: 🔍
    title: 快速检索
    details: 内置本地全文搜索，快速定位 Skill、Reference 和 Example 中的内容。

  - icon: 🚀
    title: 开箱即用
    details: 基于 VitePress 构建静态文档站，推送到 GitHub 后即可自动部署。
---

## 快速开始

如果你正在使用 AI Coding Agent，可以直接从核心 Skill 开始：

<div class="quick-start">

<a href="./SKILL" class="quick-card">
  <div class="quick-icon">🤖</div>
  <div>
    <strong>SKILL</strong>
    <span>核心 Agent Skill</span>
  </div>
</a>

<a href="./全栈开发Agent工作流" class="quick-card">
  <div class="quick-icon">⚙️</div>
  <div>
    <strong>开发工作流</strong>
    <span>完整全栈开发流程</span>
  </div>
</a>

<a href="./references/" class="quick-card">
  <div class="quick-icon">📚</div>
  <div>
    <strong>参考资料</strong>
    <span>流程细则与规范</span>
  </div>
</a>

<a href="./examples/" class="quick-card">
  <div class="quick-icon">💡</div>
  <div>
    <strong>使用案例</strong>
    <span>可复制调用示例</span>
  </div>
</a>

</div>

## 一套 Skill，覆盖完整开发流程

`dev-skill` 的目标不是让 Agent 单纯生成代码，而是让 Agent 按照完整的软件工程流程完成任务。

```text
需求分析
   ↓
项目结构理解
   ↓
技术方案设计
   ↓
前端开发
   ↓
后端开发
   ↓
数据库修改
   ↓
前后端联调
   ↓
测试与验证
   ↓
Code Review
   ↓
发布前检查
```
