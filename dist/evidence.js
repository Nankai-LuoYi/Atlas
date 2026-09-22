// 按结论保存来源与实验条件；不同研究的时期、物种和命名不自动合并。
const papers = [
  {id:1, short:'Di Bella 等 · 2021', title:'Molecular logic of cellular diversification in the mouse cerebral cortex', authors:'Di Bella DJ, Habibi E, Stickels RR, et al.', journal:'Nature', year:'2021', volume:'595, 554–559', doi:'10.1038/s41586-021-03670-5', tags:['小鼠','时间序列','空间转录组'], topics:['timeline'],
   summary:'连续采样连接皮层祖细胞与分化状态，并结合空间转录组和染色质可及性分析。构成本站时间轴的基础。',
   facts:[['区域','未来体感皮层'],['scRNA-seq','E10.5–E18.5，P1、P4；无 P0'],['Slide-seq v2','E12.5 / E13.5 / E15.5 / P1'],['scATAC-seq','E13.5 / E15.5 / E18.5']],
   boundary:'已核查正文、关键主图和取材方法，未逐项整理全部补充表。首次检测不是首次产生；转录组轨迹不是实验谱系追踪。其他文献新增的 P0 内容不属于本研究采样。',
   links:[['发育时间轴','/?stage=E13.5#timeline'],['转录状态关系','/?view=trajectory#lineage']]},
  {id:2, short:'Zhang 等 · 2026', title:'Integrated ERK-PKA-YAP/TAZ-SHH Signaling Orchestrates Cortical Radial Glia Identity and Lineage Diversification', authors:'Zhang Z, Xu Z, Fu T, et al.', journal:'Advanced Science', year:'2026', volume:'13(5), e13571', doi:'10.1002/advs.202513571', tags:['小鼠','含人数据','基因干预','作者模型'], topics:['glia','timeline'],
   summary:'结合小鼠遗传干预、单细胞与组织观察，提出 N-RG、E-RG、T-RG 的分化框架，讨论 ERK/PKA、YAP/TAZ 与 SHH 的作用。',
   facts:[['区域 / 物种','小鼠皮层；另复用人胎儿数据'],['新 scRNA-seq 取材','E15.0 / E16.5 / E18.0 / P2；含对照与干预'],['关键图','Fig. 1、4、7；PDF 第 2、7、11 页'],['发表日期','卷期 2026；在线 2025-11-12']],
   boundary:'关系图是作者模型，不能将全部箭头视为单细胞克隆验证。P0 FOXJ1/CRYAB 阳性结果来自 Emx1-Cre;Map2k1/2 双条件敲除组，Fig. 4 对照组对应观察未检出。标记时间与取材时间分开；P0 FlashTag、P2 取材不是 P0 scRNA-seq。与 Li 2026 部分作者及人数据重叠，不能作为完全独立的重复证据。',
   links:[['RG 分化模型','/?view=rg#lineage'],['P0 实验边界','/?stage=P0#timeline']]},
  {id:3, short:'Li 等 · 2026', title:'Molecular signatures and lineage diversification of neurogenic and gliogenic radial glia in the gyrencephalic ferret cortex', authors:'Li J, Yang F, Li W, et al.', journal:'Communications Biology', year:'2026', volume:'9, 771', doi:'10.1038/s42003-026-10366-x', tags:['雪貂为主','含小鼠实验','含人数据','群体谱系追踪'], topics:['timeline','glia','comparative'],
   summary:'主体研究雪貂皮层 RG，另包含小鼠围出生期 EOMES 阳性细胞的表达和命运追踪。本站 P0 与 Eomes 说明仅采用其中的小鼠证据。',
   facts:[['小鼠证据','Fig. 4；PDF 第 7 页'],['标记 / 后续观察','P0/P1 诱导；图中后代标为 P20'],['雪貂 / 人','新 scRNA-seq：雪貂 P3；复用人 GW22'],['发表日期','2026-05-27']],
   boundary:'群体出现多类后代，不代表每个 Eomes 阳性细胞都具有多能性。方法写“诱导后 20 天”，与 P1 组图示 P20 的对应需进一步核对，本站不将其固定换算为精确日龄。雪貂 P3 不等于小鼠 P3。GSE304846 是雪貂数据；人 GSE162170 与 Zhang 论文有复用。',
   links:[['P0 独立证据','/?stage=P0#timeline'],['Eomes 的时期语境','/?cell=ip#main']]},
  {id:4, short:'Boda 等 · 2022', title:'Molecular and functional heterogeneity in dorsal and ventral oligodendrocyte progenitor cells of the mouse forebrain in response to DNA damage', authors:'Boda E, Lorenzati M, Parolisi R, et al.', journal:'Nature Communications', year:'2022', volume:'13, 2331', doi:'10.1038/s41467-022-30010-6', tags:['小鼠','OPC 来源','DNA 损伤'], topics:['opc'],
   summary:'区分 OPC 的发育来源，并研究 Cit-k 缺失或顺铂处理后的不同反应。适合解释“来源”和“所在位置”的区别。',
   facts:[['研究范围','小鼠前脑；背侧与特定腹侧来源'],['方法','遗传标记、组织观察、损伤实验等'],['关键图','Fig. 3、5；PDF 第 5、8 页'],['条件','正常/对照与 Cit-k 缺失、顺铂处理分别解释']],
   boundary:'主要损伤结论不是正常发育事件。方法明确未调查 Gsh2 来源的 vOPC，不能扩展到全部腹侧来源。引言的发育波次是引用背景；背侧来源不能硬设为 P0 起始。本文不是连续单细胞发育图谱。',
   links:[['OPC 来源比较','/?view=opc#lineage']]},
  {id:5, short:'Winkler 等 · 2018', title:'The Dorsal Wave of Neocortical Oligodendrogenesis Begins Embryonically and Requires Multiple Sources of Sonic Hedgehog', authors:'Winkler CC, Yabut OR, Fregoso SP, et al.', journal:'Journal of Neuroscience', year:'2018', volume:'38(23), 5237–5250', doi:'10.1523/JNEUROSCI.3392-17.2018', tags:['小鼠','胚胎期 OPC','在线原始研究'], topics:['opc'],
   summary:'从 Boda 论文的引用追溯到的原始研究：背侧新皮层少突胶质发生已在胚胎期启动，不能把出生当天设为统一起点。',
   facts:[['研究范围','小鼠新皮层'],['用于本站','背侧少突胶质发生的时间边界'],['阅读来源','在线原始研究；未下载 PDF'],['证据位置','Results：胚胎期背侧少突胶质发生']],
   boundary:'仅用于说明胚胎期已经启动，不据此设定所有脑区、所有检测方法共享的首生日龄。未重新分析原始数据。',
   links:[['OPC 来源比较','/?view=opc#lineage']]}
];

const evidenceNotes = {
  trajectory:{title:'皮层转录状态与轨迹', refs:[1], type:'转录组与计算推断', species:'小鼠', region:'未来体感皮层', label:'不适用（连续组织采样）', readout:'E10.5–E18.5、P1、P4；具体模态见时期卡', condition:'发育图谱采样', location:'Fig. 1–3；PDF 第 1–3 页', finding:'祖细胞及后续细胞状态沿发育连续变化；关系图用于概括转录状态。', limit:'拟时序不等于实际时间，也不等于实验谱系追踪。图中箭头不是必须经过的唯一途径。'},
  p0eomes:{title:'P0 皮层 SVZ 中的 EOMES 阳性细胞', refs:[3], type:'直接组织表达观察', species:'小鼠', region:'皮层脑室下区（SVZ）', label:'本条为直接表达观察', readout:'P0', condition:'Fig. 4A 的表达观察；与后续追踪分开', location:'Fig. 4A；PDF 第 7 页', finding:'作者在 P0 小鼠皮层 SVZ 展示 EOMES 阳性细胞。', limit:'单一表达标记不能独立确定细胞的最终命运；本条不提供 P0 scRNA-seq 覆盖。'},
  eomesFate:{title:'围出生期 Eomes 标记群体的后代', refs:[3], type:'遗传群体谱系追踪', species:'小鼠', region:'标记皮层脑室区来源细胞；后代见皮层、胼胝体、嗅球', label:'E17/P0 电转；P0/P1 他莫昔芬诱导', readout:'后续追踪，图注标 P20；方法为诱导后 20 天', condition:'Eomes-CreER;Ai65 + Flpo 交叉标记，仅覆盖特定群体', location:'Fig. 4B–G；PDF 第 7、12 页', finding:'标记后代包括投射神经元、星形胶质细胞、OPC、少突胶质细胞及嗅球中间神经元。', limit:'并非单细胞克隆追踪，不能断言每个 Eomes 阳性细胞都有多能性。P1 组精确终点日龄待核对；后代不应全部画成 P0 已成熟。'},
  p0erk:{title:'ERK 通路干预后的 P0 组织观察', refs:[2], type:'基因干预 · 免疫染色', species:'小鼠', region:'皮层脑室区（VZ）', label:'Emx1-Cre 遗传干预；不等同于 P0 才干预', readout:'P0', condition:'Emx1-Cre;Map2k1/2 双条件敲除 vs 对照', location:'Fig. 4D–E；PDF 第 7 页', finding:'敲除组观察到 FOXJ1/CRYAB 表达，对照组在对应观察中未检出。', limit:'这是干预后的结果，不能据此宣称正常 P0 皮层已普遍出现相同的室管膜细胞状态。'},
  rgModel:{title:'N-RG / E-RG / T-RG 分化框架', refs:[2], type:'作者综合模型', species:'小鼠（本图层）', region:'皮层；室管膜及嗅球分支明确区分', label:'不同实验策略；不是单次标记', readout:'跨时期综合，非某一天完整共存的细胞图', condition:'综合对照、遗传干预与转录/组织证据', location:'Fig. 1、7；PDF 第 1–3、11 页', finding:'作者用 N-RG 表示神经发生方向，E-RG 表示室管膜方向，T-RG 连接 Tri-IPC 及其下游分支。', limit:'AP 与 N-RG 不是可直接互换的分类。模型包含文献综合，并非本文独立验证了每条边；各脑区转变不同步。'},
  signals:{title:'信号作用需要放回细胞状态中', refs:[2], type:'遗传干预与机制解释', species:'小鼠', region:'皮层放射状胶质相关群体', label:'多种遗传/电转策略', readout:'不同实验的胚胎期及出生后观察', condition:'ERK、PKA、YAP/TAZ、SHH 相关干预', location:'Fig. 1–5、7；第 2.4 节', finding:'ERK/PKA 与神经发生能力维持有关；YAP/TAZ 与室管膜方向、SHH-SMO 与 T-RG/Tri-IPC 方向有关。', limit:'ERK 还参与后期 T-RG/Tri-IPC 的维持，不能写成固定的“神经元开、胶质关”。人或雪貂的表达相关性不自动等于同样的因果验证。'},
  opcOrigin:{title:'OPC 的来源与位置分开记录', refs:[4], type:'遗传来源标记与组织观察', species:'小鼠', region:'前脑；Emx1 与 Nkx2.1 等实验定义的来源', label:'依遗传系和诱导策略而异', readout:'如 Fig. 3 的 P2，Fig. 5 的 P14–16；非统一起点', condition:'对照与 Cit-k 缺失组分别比较', location:'Fig. 3、5；PDF 第 5、8、13 页', finding:'在相同区域观察到 OPC，不代表具有相同的发育来源。来源相关差异可影响损伤反应。', limit:'本研究未调查 Gsh2 来源的 vOPC。不能用数量变化替代细胞生成率，也不能把“腹侧”推广为所有腹侧谱系。'},
  opcDamage:{title:'DNA 损伤下的不同反应', refs:[4], type:'干预条件下的功能实验', species:'小鼠', region:'背侧与特定腹侧来源 OPC', label:'遗传标记 / 分离培养策略', readout:'各实验分别取材；不作为正常发育阶段', condition:'Cit-k 缺失或顺铂 DNA 损伤', location:'Fig. 3、5、8 及相应方法', finding:'研究观察到来源相关的细胞死亡、衰老及 NRF2 相关抗氧化反应差异。', limit:'此结论属于损伤条件，不能标作正常发育的必经事件。'},
  opcEmbryo:{title:'背侧少突胶质发生在胚胎期已启动', refs:[5], type:'原始研究的发育来源证据', species:'小鼠', region:'新皮层', label:'Emx1 等遗传来源标记', readout:'胚胎期观察；不是 P0 统一起点', condition:'发育来源观察；与文中 SHH 干预结果分开', location:'Results：胚胎期背侧少突胶质发生', finding:'原始研究支持背侧来源在出生前已参与新皮层少突胶质发生。', limit:'不据此指定所有脑区的统一最早日龄；仅作为起始时间边界的补充。'}
};

const extraCells = {
  nrg:{title:'神经发生型放射状胶质细胞',english:'Neurogenic radial glia · N-RG',markers:'谱系 / 功能命名',text:'Zhang 等模型中的神经发生方向，连接 PyN-IPC 与锥体投射神经元。它与按顶端位置描述的 AP 不属于完全相同的分类体系。',refs:[2],notes:['rgModel','signals']},
  erg:{title:'室管膜方向放射状胶质细胞',english:'Ependymocyte-generating RG · E-RG',markers:'功能定义 · 不凭单一 marker',text:'作者模型中的室管膜方向，讨论 YAP/TAZ 的作用及皮层区域差异。不能将遗传干预导致的提前表达当成正常发生时刻。',refs:[2],notes:['rgModel','p0erk']},
  trg:{title:'Tri-IPC 生成型放射状胶质细胞',english:'Tri-IPC-generating RG · T-RG',markers:'谱系 / 功能命名',text:'作者用 T-RG 表示产生 Tri-IPC 的 RG 方向。不同区域、时期与信号条件下的状态需分别解释。',refs:[2],notes:['rgModel','signals']},
  tri:{title:'三潜能中间祖细胞',english:'Tripotential intermediate progenitor · Tri-IPC',markers:'Ascl1 · Egfr · Olig1/2',text:'在该文框架中连接 APC、OPC 与 OBIN-IPC。三类后代包括星形胶质细胞、少突胶质细胞以及嗅球中间神经元，所以它并非只有胶质后代。此处展示作者综合模型，不能用 marker 共表达独立证明单细胞三潜能。',refs:[2],notes:['rgModel']},
  pynipc:{title:'锥体神经元中间祖细胞',english:'Pyramidal neuron IPC · PyN-IPC',markers:'按后代方向命名',text:'RG 模型中通向锥体神经元的中间祖细胞。不能将出生前后所有 Eomes 阳性细胞都合并到这个节点。',refs:[2,3],notes:['rgModel','eomesFate']},
  apc:{title:'星形胶质细胞祖细胞',english:'Astrocyte lineage-restricted IPC · APC',markers:'按谱系限制命名',text:'作者框架中 Tri-IPC 下游的星形胶质方向。APC 与顶端祖细胞 AP 是两个不同名称，不能按缩写混同。',refs:[2],notes:['rgModel']},
  ependymal:{title:'室管膜细胞',english:'Ependymal cells',markers:'Foxj1 · Cryab（需结合状态）',text:'作者模型中的 E-RG 后代。表达出现、细胞命运确立与成熟室管膜功能不是同一事件。',refs:[2],notes:['rgModel','p0erk']},
  obinipc:{title:'嗅球中间神经元祖细胞',english:'Olfactory bulb interneuron IPC · OBIN-IPC',markers:'终末目标脑区：嗅球',text:'这里是皮层来源模型中的嗅球中间神经元方向，不是迁入皮层的腹侧来源抑制性中间神经元。',refs:[2,3],notes:['rgModel','eomesFate']},
  obin:{title:'嗅球中间神经元',english:'Olfactory bulb interneurons · OBIN',markers:'嗅球后代 · 与皮层中间神经元分开',text:'Li 等小鼠群体追踪在嗅球观察到相应后代。标记发生在围出生期，后代观察发生于后续时间，不能当成 P0 已成熟的结果。',refs:[3],notes:['eomesFate']},
  ol:{title:'少突胶质细胞',english:'Oligodendrocytes · OL',markers:'成熟状态需另外判定',text:'OPC 与少突胶质细胞分开表示；不能仅凭 OPC 的出现断言髓鞘形成已经完成。Li 等在后续追踪中观察到相应标记后代。',refs:[2,3],notes:['rgModel','eomesFate']},
  dorsal:{title:'背侧来源 OPC',english:'Dorsally derived OPCs',markers:'Emx1 谱系标记 ≠ 当前位置',text:'背侧来源与取材时在皮层内是两个维度。背侧少突胶质发生已在胚胎期启动，不能把 P0 设为普遍起点。',refs:[4,5],notes:['opcOrigin','opcEmbryo']},
  ventral:{title:'特定腹侧来源 OPC',english:'Ventrally derived OPCs in the study',markers:'Nkx2.1 等来源策略',text:'此处仅指 Boda 论文实验覆盖的腹侧来源；作者未调查 Gsh2 来源 vOPC，不能概括全部腹侧谱系。',refs:[4],notes:['opcOrigin','opcDamage']}
};

const relationshipViews = {
  trajectory:{name:'转录状态',tag:'Di Bella · 2021',intro:'从单细胞状态理解皮层分化。箭头表示简化的状态关系。',note:'trajectory'},
  rg:{name:'RG 分化模型',tag:'Zhang · 2026',intro:'按作者框架展开不同方向；不是某一日龄的全部细胞，也不是统一命名标准。',note:'rgModel'},
  opc:{name:'OPC 来源',tag:'Boda · 2022 / Winkler · 2018',intro:'发育来源与后来所在区域是两个维度。以下对照不代表全部 OPC 来源。',note:'opcOrigin'}
};

// 关系类型是证据语义，不从箭头形状推断实验验证。
const relationshipTypes = ['lineage_tracing','computational_trajectory','author_model','developmental_observation','other','unknown'];
const relations = [
  ['ap','ip','trajectory'],['ip','pn','trajectory'],['ap','glia','trajectory'],['glia','astro','trajectory'],
  ['nrg','pynipc','rg'],['pynipc','pn','rg'],['erg','ependymal','rg'],['trg','tri','rg'],
  ['tri','apc','rg'],['apc','astro','rg'],['tri','opc','rg'],['opc','ol','rg'],['tri','obinipc','rg'],['obinipc','obin','rg']
].map(([source,target,view])=>({id:`relation_${view}_${source}_${target}`,source,target,view,
  relationshipType:view==='trajectory'?'computational_trajectory':'author_model',
  evidenceIds:[view==='trajectory'?'trajectory':'rgModel']}));
// OPC 来源比较不新增方向性关系。视图成员包含尚无方向边的对象。
const viewCellIds = {
  trajectory:['ap','ip','pn','glia','astro'],
  rg:['nrg','pynipc','pn','erg','ependymal','trg','tri','apc','astro','opc','ol','obinipc','obin'],
  opc:['dorsal','ventral']
};
// 事件 ID 独立于展示标题。没有明确对象或证据关联的字段保留为空。
const eventKeys = {
  'E10.5':['ap','ip','scope'], 'E11.5':['cajal_retzius','progenitors','origin'],
  'E12.5':['continuity','deep_layers','spatial'], 'E13.5':['branches','mge','modalities'],
  'E14.5':['upper_layers','continuity','identity'], 'E15.5':['migration','cge','modalities'],
  'E16.5':['continuity','upper_layers','regional_variation'], 'E17.5':['opc','astro','detection'],
  'E18.5':['glia','chromatin','perinatal'], 'P0':['eomes_expression','eomes_followup','erk_intervention'],
  'P1':['deep_layers','callosal','age'], 'P4':['identity','trajectory','maturation']
};
const eventAssociations = {
  event_E10_5_ap:{cellIds:['ap']}, event_E10_5_ip:{cellIds:['ip']},
  event_E13_5_mge:{cellIds:['interneuron']}, event_E15_5_cge:{cellIds:['interneuron']},
  event_E17_5_opc:{cellIds:['opc']}, event_E17_5_astro:{cellIds:['astro']},
  // EOMES 阳性标记群体不自动等同于 ip，后续后代也不作为 P0 已存在的细胞。
  event_P0_eomes_expression:{evidenceIds:['p0eomes'],temporalContext:{observationStage:'P0'},stageEvidenceLinks:[{stage:'P0',evidenceId:'p0eomes',role:'direct_observation'}]},
  event_P0_eomes_followup:{evidenceIds:['eomesFate'],temporalContext:{labelingStage:['P0','P1']}},
  event_P0_erk_intervention:{evidenceIds:['p0erk'],temporalContext:{observationStage:'P0'},stageEvidenceLinks:[{stage:'P0',evidenceId:'p0erk',role:'condition_observation'}]}
};

// 关联角色只限定此记录支持当前对象的哪一部分，不等于整套属性或 marker 已验证。
const evidenceRoles = {
 direct_observation:'直接观察', relationship_support:'关系支持',
 condition_observation:'条件观察', context:'背景信息', limitation:'限制说明'
};
const cellEvidenceLinks = {
 ap:[['trajectory','relationship_support','简化转录状态关系；不逐项验证 marker 或具体时期。']],
 ip:[['trajectory','relationship_support','皮层神经发生的连续状态；不是唯一必经路线。'],['p0eomes','context','EOMES 阳性表达不独立证明 IP 身份。'],['eomesFate','limitation','标记群体的多类后代不能证明全部 Eomes 阳性细胞属于 IP。']],
 pn:[['trajectory','relationship_support','转录状态关系，不等于实验谱系。'],['rgModel','relationship_support','作者模型中的后代方向，不覆盖全部亚型和 marker。']],
 glia:[['trajectory','relationship_support','胶质相关转录分支，不代表成熟胶质细胞。']],
 astro:[['trajectory','relationship_support','胶质相关状态关系，未建立逐时期直接关联。'],['rgModel','relationship_support','作者模型中的星形胶质方向。']],
 interneuron:[['trajectory','limitation','非皮层起源中间神经元被排除在主要皮层分化轨迹分析之外；本关联不支持其属于该轨迹。']],
 opc:[['trajectory','context','皮层图谱背景，不据此建立 OPC 的直接轨迹或出生时期。'],['rgModel','relationship_support','作者模型中的 OPC 方向。'],['opcOrigin','relationship_support','特定遗传来源与组织观察；对照和 Cit-k 缺失条件需分开。'],['opcEmbryo','context','仅补充背侧来源的胚胎期时间边界，不推广到所有 OPC。']],
 nrg:[['rgModel','relationship_support','作者模型中的神经发生方向。'],['signals','context','信号干预背景，不构成 N-RG 全部属性的直接证据。']],
 erg:[['rgModel','relationship_support','作者模型中的室管膜方向。'],['p0erk','context','基因干预背景，不是正常 E-RG 身份的直接观察。']],
 trg:[['rgModel','relationship_support','作者模型中的 Tri-IPC 生成方向。'],['signals','context','状态依赖的信号干预背景。']],
 tri:[['rgModel','relationship_support','作者综合模型；不证明每个细胞单克隆三潜能。']],
 pynipc:[['rgModel','relationship_support','作者模型中的锥体神经元方向。'],['eomesFate','context','后代追踪不能证明必经 PyN-IPC 中间状态。']],
 apc:[['rgModel','relationship_support','作者模型中的星形胶质方向，不扩大为普遍实验验证。']],
 ependymal:[['rgModel','relationship_support','作者模型中的 E-RG 后代方向。'],['p0erk','condition_observation','Map2k1/2 双条件敲除后的 FOXJ1/CRYAB 表达；不等于正常 P0 成熟室管膜状态。']],
 obinipc:[['rgModel','relationship_support','作者模型中的嗅球中间神经元方向。'],['eomesFate','context','后代追踪不能证明必经 OBIN-IPC 中间状态。']],
 obin:[['eomesFate','condition_observation','特定 Eomes 标记群体的后续嗅球后代；不是 P0 已成熟。']],
 ol:[['rgModel','relationship_support','作者模型中的 OPC 下游方向。'],['eomesFate','condition_observation','特定标记群体的后续少突胶质后代，不证明髓鞘成熟或 P0 已存在。']],
 dorsal:[['opcOrigin','relationship_support','特定背侧遗传来源；对照和损伤条件分别解释。'],['opcEmbryo','relationship_support','背侧来源在胚胎期参与少突胶质发生，不指定统一最早日龄。']],
 ventral:[['opcOrigin','relationship_support','仅研究覆盖的腹侧遗传来源，不包括 Gsh2 来源。'],['opcDamage','condition_observation','Cit-k 缺失或顺铂损伤条件，不作为正常发育事件。']]
};
for(const [id,links] of Object.entries(cellEvidenceLinks))cellEvidenceLinks[id]=links.map(([evidenceId,role,scope])=>({evidenceId,role,scope}));
