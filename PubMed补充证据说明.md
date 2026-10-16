# PubMed 补充证据说明

检索与核对日期：2026-10-16（Asia/Shanghai）。这是围绕当前网站问题的定向补证，不是系统综述，不声称覆盖全部相关研究。

## 检索范围与方式

围绕小鼠新皮层 AP/IP 的表达与分裂、祖细胞时间性状态、克隆谱系及 OPC 来源，在 PubMed 定向检索。主要关键词为 mouse/mice、neocortex/cortex、apical/intermediate progenitor、temporal patterning、MADM、lineage、oligodendrocyte origin；并核对 Englund、Telley、Gao、Llorca、Bright、Kessaris 的题目与书目信息。

Entrez 技能脚本缺少 requests，未安装依赖；改用 PubMed 网页与原始研究链接。部分 PMC／出版社全文入口出现访问挑战，本轮不声称已完成全文审查。没有下载 PDF、XML、原始数据或新工具；新增的是人工概括的证据数据与审查说明。

## 纳入的六篇原始研究

| 论文 | 已核对来源 | 当前用途 | 不据此推出 |
|---|---|---|---|
| Englund C, Fink A, Lau C, et al. Journal of Neuroscience, 2005. Pax6, Tbr2, and Tbr1 are expressed sequentially by radial glia, intermediate progenitor cells, and postmitotic neurons in developing neocortex | [PubMed 摘要、Fig. 1–3 图注](https://pubmed.ncbi.nlm.nih.gov/15634788/) | E14.5 AP 中 Pax6 阳性 VZ／放射状胶质相关群体及 Tbr2 阳性非表面分裂 IPC 的直接组织观察 | 不验证现有全部 marker；不覆盖所有 AP 状态；不证明 IP 为唯一必经路线；不把 Fig. 2T–V 培养结果并入组织观察 |
| Telley L, Agirman G, Prados J, et al. Science, 2019. Temporal patterning of apical progenitors and their daughter neurons in the developing neocortex | [PubMed 摘要](https://pubmed.ncbi.nlm.nih.gov/31073041/) | AP 时间性分子状态的背景 | 不指定未核对的具体采样日龄；不将 PRC2 干预当正常事件；不新增直接时期覆盖 |
| Gao P, Postiglione MP, Krieger TG, et al. Cell, 2014. Deterministic progenitor behavior and unitary production of neurons in the neocortex | [PubMed 摘要](https://pubmed.ncbi.nlm.nih.gov/25417155/) | RGP 克隆后代与作者解释的背景 | 不写成所有 AP／RG 的固定输出，不借用 Otx1 干预，不改变现有关系类型 |
| Llorca A, Ciceri G, Beattie R, et al. eLife, 2019. A stochastic framework of neurogenesis underlies the assembly of neocortical cytoarchitecture | [PubMed 摘要、Fig. 3–4 图注](https://pubmed.ncbi.nlm.nih.gov/31736464/) | 克隆输出异质性的背景与限制 | E12.5 标记和 P21 后代分开；P21 不扩展网站时期；数学模型不是逐路径实验验证 |
| Bright AR, Kotlyarenko Y, Neuhaus F, et al. Nature Neuroscience, 2025. Temporal control of progenitor competence shapes maturation in GABAergic neuron development in mice | [PubMed 摘要](https://pubmed.ncbi.nlm.nih.gov/40629142/) | GE 来源与成熟能力的背景，关联 interneuron | GE 取样不是皮层直接观察；GABAergic 投射细胞不全等于皮层中间神经元；不加入 Di Bella 主皮层轨迹 |
| Kessaris N, Fogarty M, Iannarelli P, et al. Nature Neuroscience, 2006. Competing waves of oligodendrocytes in the forebrain and postnatal elimination of an embryonic lineage | [PubMed 摘要](https://pubmed.ncbi.nlm.nih.gov/16388308/) | 前脑 OLP 多来源背景，关联 OPC | 不从摘要补写波次日龄；不设统一 P0 背侧起点；消融补偿不当作正常发育 |

Gao 与 Llorca 的实验策略和作者模型分别保留。后者不能简单理解为推翻前者，前者也不能被推广为所有祖细胞的统一规律。Kessaris 的历史波次解释与 Winkler 胚胎期背侧来源结果并列，不选择一个研究来覆盖另一个研究的条件。

## 数据关联

在唯一的 evidenceNotes 中新增六条：englund_e14、telley_temporal、gao_clonal、llorca_clonal、bright_ge、kessaris_opc。总计 19 条 Evidence、11 篇论文；仍为 27 Cell/State、14 Relation、36 Event。Evidence 数量不是论文数、实验数或可信度。

Cell 关联使用原有 role/scope：Englund 对 ap、ip 为限定范围的 direct_observation；其余按 context 或 limitation 保存。只有 ap:E14.5 与 ip:E14.5 两条显式直接时期关联新增；其他 Cell 时期覆盖保持不变。Pax6 和 Eomes/Tbr2 只在记录中解释，没有解析或扩充 markers 字符串。

既有 Event 的补充链接：E14.5 continuity（Englund、Telley，背景）、E11.5 progenitors（Telley，背景）、P4 trajectory（Gao 背景、Llorca 限制）、E17.5 detection（Kessaris 背景）。这些是该阅读条目的解释材料，不是相同日龄的直接观察；Event temporalContext 没有改变。P0 follow-up 的 observationStage 仍为 null。

14 条 Relation 的 ID、source/target、view、relationshipType 和 evidenceIds 均未修改。不因新增克隆研究而把计算轨迹边或作者模型边升级为 lineage_tracing。

## 界面与维护

Evidence 新增“核对范围”和 PubMed 链接，区分摘要级与指定图注级核对。References 继续只显示题目、主要作者、期刊、年份。Atlas 总览是选定 Event 的阅读目录，不是全部 Cell 证据矩阵；空格提示已明确这一点，E14.5 本期阅读可查看新增 AP/IP 观察对象。观察符号中的背景标签使用“轨迹／时段／背景”，不把普通背景记录误标为计算轨迹。未改 Hero、Logo、导航、框架或整体布局。

代码位于 dist/evidence.js、dist/app.js；style.css 添加限制说明标记样式，并修复额外发现的约 845px 首页时间轴页面级横向溢出（改为组件内部浏览，未改 Hero）；四个 HTML 只更新资源版本参数。新建 cellStageEvidenceAdditions 数据字段用于显式追加核对过的时期证据，不从正文、displayStage 或摘要自动推断。

## 本地验收

脚本与产物目录：output/PubMed补证_20261016/。科学语义脚本以 82ef589 为基线：检查 ID、关系、marker、Event 时间保持；六条新 Evidence 的引用完整；只新增 AP/IP E14.5 coverage；P0 边界与 Evidence 去重计数保持。结果见 科学语义验收结果.json。

浏览器与发布检查结果以该目录的最终验收记录为准。真实手机硬件、完整读屏、Safari/Firefox 和弱网未验证。HANDOFF.md 不在本次修改范围，需展示完整草稿并经用户确认后再追加。
