# Mouse Neurodevelopment Atlas v0.1

面向学习与文献整理的交互式网站，以时间连接小鼠皮层细胞状态、发育关系与来源证据。

## 当前功能

- 12 个可点击时期：E10.5–E18.5、P0、P1、P4。P0 使用独立研究证据，其余基础时期来自 Di Bella 2021。
- 首页负责引导；`/atlas/` 是三栏时间上下文工作区；`/lineage/` 复用同一图和 Details，优先探索关系；`/references/` 保存简洁书目。
- 时间轴包含 12 个时期的浅蓝淡粉小鼠形态插图。
- 三种独立关系视图：转录状态、RG 分化模型、OPC 来源。点击 Cell 或 Relation，联动上下游、解释和 Evidence；不把三种视图合并成统一真实谱系。
- 分类搜索 Stage、Cell/State、Relation、Event、Reference 和 relationship view；marker 文本命中只返回 Cell。
- stage/view/cell/relation URL、刷新、前进和后退恢复；Cell 与 Relation 互斥。旧 URL 同含二者时 Relation 优先。
- 19 个 Cell/State、14 条 Relation、36 条展示 Event、9 个 Evidence record、5 篇论文。Evidence 数量不是论文数或可信度。
- 细胞与 marker 说明，含 Eomes 的围出生期限制。
- References 仅显示论文题目、主要作者、期刊及发表年份，点击题目打开原文。
- 正文不显示引用编号、逐条来源说明及来源宣传文案；数据文件继续保留来源关系。
- 桌面与手机布局、键盘切换关系标签、时期和细胞深链接。

## 本地运行

原生 HTML、CSS、JavaScript，无需安装前端依赖。在仓库根目录运行：

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

打开 `http://127.0.0.1:8765/`。文献页 `/references/`；例如 `/atlas/?stage=P0`、`/lineage/?view=rg`、`/lineage/?cell=ip`。

## GitHub Pages 发布

公开网站地址：https://nankai-luoyi.github.io/Atlas/

仓库 Settings → Pages → Source 选择 GitHub Actions。`.github/workflows/pages.yml` 在每次向 `main` 推送或手动运行时发布网站。`scripts/build_pages.py` 将 `dist` 复制为发布副本，并适配 GitHub Pages 的项目路径；不修改原站点文件。只上传网站文件，不发布仓库中的维护文档。

在仓库 Actions 查看“发布小鼠神经发育图谱”的运行状态，成功后刷新网站。无需设置 Custom domain。生成目录必须是尚不存在的独立目录，以避免覆盖已有文件。

## 内容文件

- `dist/app.js`：基础时期、原有细胞条目和交互逻辑。
- `dist/evidence.js`：文献、逐条证据、新增细胞与关系视图配置。
- `dist/index.html`、`dist/atlas/index.html`、`dist/lineage/index.html`、`dist/references/index.html`：共享导航、资源和语义数据；首页、Atlas、Lineage、References 的内容结构分别服务不同任务。
- `dist/style.css`：视觉与响应式布局。
- [网站说明.md](网站说明.md)：证据边界和维护约定。

当前仍聚焦小鼠皮层，不代表完整神经系统。首次检测不是首次产生，计算轨迹不是实验谱系追踪，群体多后代不等于每个细胞都有多能性。跨物种结果和干预结果不自动进入正常小鼠时间轴。

封面与时间轴为 AI 概念插图，非精确孕龄或解剖参考。插图生成说明见 [插图说明.md](插图说明.md)。仓库不包含论文 PDF、原始测序数据、临时部署包或访问凭据。

## v0.1 数据与科学边界

`Atlas.data` 暴露 Cells、Relations、Events、Evidence；`Atlas.validateData()` 检查引用完整性。Cell 使用带 role/scope 的 evidenceLinks；Evidence 本体仅存在于 evidence.js 的 evidenceNotes。

Coverage 区分 direct_stage_evidence、context_only、model_context、not_recorded。只有显式 direct_observation 时期关联可进入直接时期证据；缺失记录不表示不存在。Event.displayStage 只决定展示卡片；temporalContext 独立描述标记、观察或范围，未知保持 null。计算轨迹不等于实验追踪，作者模型不等于单细胞克隆验证，marker 不是结构化 Gene evidence。

Atlas 和 Lineage 共用原生数据驱动 SVG 图、Details renderer、选择与 URL state。横向图滚动限制在画布内，小屏默认选择自动进入可见范围。搜索和 Evidence 使用原生 dialog，支持键盘及焦点返回。

## 发布与本地验收

GitHub Pages 只发布 build_pages.py 从 dist 生成的副本。可用独立目录检查项目路径：

```sh
python3 scripts/build_pages.py --output .pages-output/Atlas
python3 -m http.server 8766 --bind 127.0.0.1 --directory .pages-output
```

生成目录必须尚不存在；若要测试 `/Atlas/` 前缀，应将副本生成到独立预览根目录的 Atlas 子目录，再以该预览根目录启动服务器。普通 dist 本地运行不需要构建。

验收覆盖四页、七种宽度、选择/历史/深链接、Evidence 与文献锚点、键盘搜索、科学数据一致性。本地测试脚本、截图和审查报告保存在项目上级 tmp，不进入 Git 或 Pages。未进行真实手机硬件和完整读屏器认证。

## v0.2 候选

结构化 Gene model、VZ/SVZ/IZ/CP/MZ、空间数据、表达、UMAP、其他脑区与更多人工整理证据。当前版本不实现这些功能，不是完整小鼠脑图谱。
