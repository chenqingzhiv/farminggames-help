# 死链检测报告 - farminggames.help

- 扫描日期: 2026-07-26
- 文档目录: `C:\Users\37784\multica_workspaces_desktop-api.multica.ai\.repos\c5a31bc4-e8fa-4062-b126-bd78f70298f8\farminggames-help-work\docs`
- 总 Markdown 文件数: 197

## ❌ 发现 2 个死链

| # | 来源文件 | 行号 | 链接文本 | 链接目标 | 说明 |
|---|---------|------|---------|---------|------|
| 1 | `dst/seasons-guide.md` | 553 | 🍲 Crock Pot Recipes | `/dst/crock-pot-recipes/` | 目标文件不存在 |
| 2 | `privacy-policy.md` | 63 | Feedback page | `/feedback/` | 目标文件不存在 |

## 📁 按文件分组的死链

### dst/seasons-guide.md

- **行 553**: `/dst/crock-pot-recipes/` → 目标文件不存在

### privacy-policy.md

- **行 63**: `/feedback/` → 目标文件不存在

## 🔧 修复建议

### 1. `dst/seasons-guide.md:553` → `/dst/crock-pot-recipes/`
- 该页面不存在。站点中 Crock Pot 食谱功能位于 `tools/dst/crock-pot-recipe-finder.md`
- 建议修正为: `../tools/dst/crock-pot-recipe-finder/` 或 `/tools/dst/crock-pot-recipe-finder/`

### 2. `privacy-policy.md:63` → `/feedback/`
- `feedback/index.md` 页面不存在
- 如站点没有反馈页面，请移除该链接或替换为有效的联系方式页面
