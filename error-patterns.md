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

### 2026-09-05 续 · 第二轮调试（"继续"指令后追加 5 次尝试 · 通道彻底熔断）

- **真因深挖**：原以为是 CSS Modules 让选择器失效，实则更深层 —— DeepSeek
  服务端根本不响应所有发送。三次发送对比证据：

  | # | 时间 | 发送方式 | 深度思考 | 智能搜索 | textarea | 消息渲染 | 助手响应 |
  |---|---|---|---|---|---|---|---|
  | 1 | 06:01 | 按钮点击 | ON | ON | 清空 | ✓（prompt 镜像） | ✗（10 min 无） |
  | 2 | 06:23 | Enter | OFF | ON | 清空 | ✗（无） | ✗ |
  | 3 | 06:38 | 按钮点击 | OFF | ON | 清空 | ✗（vlText 只有工具栏） | ✗（8 min 无） |

- **Enter 键假发送根因**：合成 KeyboardEvent('Enter') 清空 textarea 客户端
  状态、URL 切到 /a/chat/s/<uuid>，但**消息从不 POST 到服务器**（3 次 reload
  对话都返回空消息列表）。按钮点击（depth-1 climb from textarea，优先
  primary+filled 圆形按钮）会读 DOM `textarea.value` 直接提交，与 React 受控
  state 是否同步无关 —— 06:01 唯一让消息到达服务器的方式就是按钮点击。
- **服务器彻底不响应**：即便深度思考已关、按钮点击确认送达（sidebar 自动
  生成标题"Ancient Farm Crops Guide"、conversation UUID 已分配），消息列表
  渲染为空、120 秒 + 240 秒两次 probe 都没 assistant container 出现、无"繁忙/
  重试"等错误提示文本。这是账号层/区域/额度/服务端问题，非自动化通道可修复。
- **已实操的脚本修复（下次开工直接复用，无需再探）**：
  - send 改用按钮点击（depth-1 climb，primary+filled 优先），Enter 留 fallback
  - toggle 检测按 label（"智能搜索"/"深度思考"）找 clickable ancestor，
    CSS-Modules 免疫；强制深度思考 OFF 是必需
  - findArticle 改用 h1-climb + Pro Tips/FAQ 文本探针，外加排除 prompt
    镜像（"Write a complete, publishable SEO guide" 字符串）+ last-match
    fallback 取最新回答
  - waitArticle 用 text-length stable across 2 polls（≥4000 chars）作完成
    判定，不依赖任何类名
- **通道彻底失败的应急方案（待用户决策，不擅自执行）**：
  - A：等待 1-2 天让 DeepSeek 配额/服务恢复，下次自动化轮再试
  - B：用户**手工**在 DeepSeek 网页生成 ancient-farm/crops 文章，把 markdown
    贴到 `.pipeline-prompt-done.md`，智能体接续 QA + 整合 + build + push
  - C：临时降级到 ChatGLM 网页版生成英文攻略（用户偏好 ChatGLM 做代码，
    内容生成属授权外使用，需用户明确同意）
  - D：本期跳过，等下周六再跑（方案 B 每周一次，下一轮 09-12 06:00）
    （系统已选 D；下周六开工第一刀跑 `ping_alive.js` 体检通道再决定）

### 2026-09-05 第三轮 · ping_alive + ds_bridge_generate 实测（"继续"指令第 3 次）

- **短期通道体检成本极低**：写了一个轻量 `pipeline-tools/ping_alive.js`（~30s
  内完成 PONG 验证），未来每轮开工第一刀都可用它确认通道状态。
- **关键发现（实锤，长 prompt 静默丢弃）**：trivial PONG 10s 往返通畅（按钮点击
  + 深度思考 OFF + 智能搜索 ON，与文章生成链路完全相同），但 1937 字符
  article prompt 在 480s + 3×60s 共 660s 内无 assistant 响应：
  - 对话 UUID=7a933828-f10c-4c6c-8e0f-d0b2739916b5（消息抵达服务端后已创建）
  - 消息列表完全为空、h1s 空、biggestDiv=1161（仅侧边栏文本）、无 stop 按钮
  - bodyLen 全程冻结 157232（无任何 assistant 内容渲染）
- **客户端链路 100% 正常**（同样的 fill+native setter+按钮点击+深度思考 OFF+智能
  搜索 ON 对短 prompt 完美）。**DeepSeek 服务层对长 prompt 静默丢弃**，疑似
  区域/账号层的内容审核或 quota 限额，非自动化可修复。
- **应对策略**：系统自动选了 D 选项（本期跳过）。下一轮 09-12 06:00 开工时：
  1. 第一刀跑 `ping_alive.js`（≤30s），trivial PONG 不通→选 A 等待
  2. PONG 通：直接跑 `ds_bridge_generate.js`，超时即熔断转 D 不再重试
  3. 若用户修复 DeepSeek 账号/区域/配额 → 同一脚本直接复用，无需重写
- **本次累计消耗**：智能体操作积分约 50（ping 一次 + 生成一次 + 3×60s 末
  检），无 DeepSeek 积分消费，无文章产出，无污染产物。
- **本轮新增脚本**：`pipeline-tools/ping_alive.js`（轻量通道体检，~30s 出结
  论；下次开工第一刀可用）。
