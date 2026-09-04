# Error Patterns — QA 拦截问题积累（自动进化）

> 规则：每次程序化 QA 拦截的问题按日期追加到本文件；每次 DeepSeek 生成 prompt
> 前将本文件内容注入（"Avoid these known issues"）。这是替代人工抽审的核心机制。

## 2026-08-26 (初始化 · 继承自旧管线润色师反馈)

- 数据准确性：Tales of Seikyu 的 Fox Ruins 房间数曾误写 86（实际 75）——游戏
  数据必须以当前版本为准，警惕记忆中的旧版本数值
- 口径措辞：好评率/销量等动态数据需注明口径（如 "~85-87% of ~1,900 reviews"），
  不给裸数字
- 发售状态：Grave Seasons 发售日推迟到 2026 秋却按已发售写——未发售游戏必须
  按"Preview"定位写作，标题与内容都要体现
- 中式英语高频点：rise level → level up；more and more → increasingly；
  in the internet → online
- 中文残留：英文正文允许游戏中文原名（如 多洛可小镇）出现在括号/斜体专有名词
  位置，禁止整句中文

## 2026-08-26 (首跑 · Go-Go Town Fishing · 管线 v1 QA 实录)

- 引用泄漏：首轮生成正文中残留 `[-2](url)` 式引用链接标记——提取后必须扫描
  `[数字](http` 模式并清除；自审 follow-up 可修复
- [VERIFY] 超标：首轮 4 处（上限 2）——自审后归零，但 prompt 应强调"不确定就查，
  查不到就删列"，价格类动态数据整列删除优于逐格标注
- 结构漂移：自审环节倾向于新增 H2 小节（首轮 3-5 个 → 自审后 6+）——合并 tips
  类小节控制在 5 个 H2 内
- 表格数据缺失：价格/售价等 Web 查证不可靠时，正确做法是删掉整列而不是留空或
  编造（本次 Go-Go Town 鱼价列即如此处理）
- QA 脚本自误报教训：语法检查前的正则预处理把 `go-to`（合法连字符词）误删成
  `go to` 触发 LanguageTool GO_TO_HYPHEN 假阳性——预处理只删 Markdown 标记
  字符（# * ` | > -），不要碰词内连字符；UPPERCASE_SENTENCE_START 对 H1 标题
  边界属误报，应忽略

## 2026-08-29 (Go-Go Town Crops · browser-bridge 通道首跑 · 修复实录)

- 引用泄漏再次出现：成段 `[-1](url)` / `[-2](url)` / `[-13](url)` 散布全文，包括
  表格行尾 `Hot Dogs-1` 残留（来自 `[-1](url)` 删除不彻底）。`extract` 后必扫
  `\[-\d+\]\([^)]*\)` + 表格单元格末尾 `-N` 残留。**自审 follow-up 应能消除
  这类引用泄漏**（本轮因超时未走到自审，故未修复）
- 中文残留：DeepSeek 在介绍农牧业区时输出 "The农牧业区 (Farming and Animal
  Husbandry Area)" ——prompt 明确写 100% English 仍偶发夹生。**清稿阶段必须
  `re.sub(r"[\u4e00-\u9fff]+", "", body)` 作为兜底**
- 表格行格式：DeepSeek 渲染 `[空列表项]` 时输出 `<li></li><li>...</li>`，
  html2md 转出来变成 `"- " + 下一行内容` 的孤儿行；清稿时不要误删行首 `"- "`
  （会被 `\s+-\s*$` 末尾规则误伤），应当用 `^- $` 行级删除或保留列表符号
- 结构 H2 数量：5 内容节 + FAQ = 6 H2 触发上限（"3-5 H2"）。**生成时若按 "5 H2
  + FAQ" 模板写就会刚好压线 6，prompt 应改为 "3-5 H2 + FAQ" 明确让模型合并**
- 缺 H1：DeepSeek 经常省略 `# title` 开头行，仅以正文第一段或第一个 H2 起笔。
  **清稿阶段必须在 frontmatter 后插入 `# {title}` 行**，否则 QA fail
- 选择器 DOM drift：`document.querySelectorAll("[class*=message]")` 在新版本
  DeepSeek DOM 里匹配数为 0（实际容器 class 是 `ds-markdown ds-assistant-
  message-main-content`，不再含 `ds-markmark`）。`waitDone` 改用
  `.ds-markdown.ds-assistant-message-main-content` 的 `textContent.length`
  判断"已稳定"，并将选择器集中到一处常量化以便下次 DOM 变化时单点更新
- 自审超时未触达：bridge 通道的 `waitDone` 选择器失效导致首轮等 8 分钟超时熔
  断（文章其实已生成完）。**修复后下轮必须验证：自审 follow-up + 二次等待
  是否正常完成**

## 2026-09-05 (周六 06:00 自动轮 · 第 5 次自动化 · DOM 重构大事故)

- **DeepSeek 网页版发生 CSS Modules 化重构**：除 `ds-button`/`ds-toggle-button`
  等基础控件类名保留外，所有布局/内容类名改为哈希化 CSS Modules（`cb86951c`/
  `_7780f2e`/`_189b4a0` 等），导致以下选择器**全部失效**：
  - 答案容器 `.ds-markdown.ds-assistant-message-main-content` → 不存在
  - `[class*=message]` → 0 匹配
  - `[class*=markdown]`/`[class*=prose]`/`[class*=answer]`/`[class*=response]`
    /`[class*=assistant]` → 0 匹配
  - 智能搜索 `.ds-toggle-button` → 不存在（按钮位置/标识均变化）
  - 历史选择器 `[class*=ds-button--circle]` 仍可匹配 `ds-button--primary
    ds-button--filled ds-button--circle`，但 fill 后 React 状态不刷新时点
    击无效，**必须 Enter 键发送才稳**
- **fill 兼容修复**：DeepSeek 新版用 React controlled component，旧 `dispatchEvent
  (new Event('input'))` 不会触发 onChange；需用 `Object.getOwnPropertyDescriptor
  (HTMLTextAreaElement.prototype, "value").set` 原生 setter 设置值后再
  dispatchEvent
- **本轮现象**：脚本按旧选择器填了 1937 字符到 textarea 但点击 `[class*=
  ds-button--circle]` 失败；后用 fill+native setter+Enter 重新发送，textarea
  立即清空、bodyLen 149173→154390、出现 prompt 镜像容器 `_189b4a0`；但**4 分
  钟后仍无 assistant 容器**、bodyLen 不再增长——DeepSeek 接收 prompt 但未返
  回答案（疑似深度思考模式耗 token 或服务异常）
- **决策**：按 RUN-CARD 红线「禁止无限重试」熔断，不为完成而跳过质量关卡
- **下次开工必须做的修复**（属于下一轮运营任务前置）：
  1. 浏览器实测打开 `chat.deepseek.com`，开新对话
  2. 探测新 DOM：智能搜索按钮类名、send 按钮（已确认
     `ds-button ds-button--primary ds-button--filled ds-button--circle
     ds-button--m` 可用但需 Enter 兜底）、assistant message 容器选择器
  3. 改 `ds_bridge_generate.js` 顶部 STAT_JS/TOGGLE_JS/SEND_JS/EXTRACT_JS
     四个常量；新增 `nativeSetterFill` 替代旧 fill
  4. 用 probe 脚本跑一轮端到端 smoke test（占位 prompt），验证生成 + 提取
     全链路通了再恢复正式管线
- **教训**：常量化选择器虽然便于维护，但平台大版本升级会让整批常量瞬时
  失效；建议每 1-2 周做一次 probe smoke test，发现漂移立即修
