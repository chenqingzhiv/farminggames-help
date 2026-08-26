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
