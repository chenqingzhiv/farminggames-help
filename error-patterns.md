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
