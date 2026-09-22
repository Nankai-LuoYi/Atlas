// 保留 Di Bella 的时间序列；新增研究逐条引用，不合并实验条件。
const stages = ['E10.5','E11.5','E12.5','E13.5','E14.5','E15.5','E16.5','E17.5','E18.5','P0','P1','P4'];
const commonPN = ['投射神经元的连续变化','结合祖细胞、迁移及未成熟神经元，理解转录状态的连续性。'];
const stageData = {
 'E10.5':{title:'从早期祖细胞开始',description:'本研究时间序列的起点。早期样本主要由顶端祖细胞和中间祖细胞构成，为后续皮层细胞多样化提供观察起点。',events:[['观察早期祖细胞','关注 Sox2、Pax6、Hes5 等顶端祖细胞相关表达。'],['认识不同的祖细胞状态','Eomes、Neurog2、Btg2 是文中用于识别中间祖细胞的线索。'],['建立时间坐标','这是本研究的首个采样点，并非整个神经系统发育的起点。']]},
 'E11.5':{title:'早期皮层细胞开始丰富',description:'在早期祖细胞背景下，研究首次检测到 Cajal–Retzius 细胞，并将其与 Wnt8b 阳性的内侧祖细胞联系起来。',events:[['Cajal–Retzius 细胞','本文在 E11.5 首次检测到该群体；这一描述限定于本研究。'],['早期祖细胞仍是重要组成','结合顶端与中间祖细胞状态，理解神经发生的起点。'],['区分采样时间与起源','某类细胞在皮层样本中被检测到，不等同于其在此处产生。']]},
 'E12.5':{title:'从祖细胞走向投射神经元',description:'从 E12.5 起，作者观察到祖细胞与投射神经元之间的连续表达梯度，并结合空间转录组探索细胞的组织位置。',events:[commonPN,['深层神经元生成阶段','文中将 E12.5–E13.5 列为第 6、5 层兴奋性神经元的出生时期概括，非严格边界。'],['加入空间位置','该时期有 Slide-seq v2 数据，可连接细胞身份与组织位置。']]},
 'E13.5':{title:'细胞分化，逐渐走向不同命运',description:'神经元相关状态持续分化，皮层样本中开始检测到腹侧来源的抑制性中间神经元。多种测量为这一时期提供互补证据。',events:[['祖细胞的分支状态','轨迹分析提示，祖细胞至早在 E13.5 出现神经元与胶质相关分支。'],['MGE 来源中间神经元','本文从该时期检测到相关群体；代表进入采样视野，不代表此时才产生。'],['时间与空间相互参照','本时期同时具备 scRNA-seq、Slide-seq v2 和 scATAC-seq。']]},
 'E14.5':{title:'持续生成，逐步建立神经元身份',description:'E14.5 位于文中概括的第 4 层及第 2/3 层兴奋性神经元生成时段。沿连续采样观察祖细胞到神经元的分化过程。',events:[['第 4 层与上层神经元','作者用 E14.5–E17.5 概括相关神经元的出生时段，不能视为互斥的时间区间。'],commonPN,['关注动态的分子身份','本文分析支持投射神经元亚型在有丝分裂后逐渐分化，不能仅凭单一 marker 提前指定命运。']]},
 'E15.5':{title:'迁移中的细胞，连接时间与空间',description:'作者对这一时期的迁移和未成熟兴奋性神经元进一步划分状态，并通过空间映射观察沿皮层径向轴的不同位置。',events:[['迁移与未成熟神经元','五种细分状态映射到不同径向位置，见 Fig. 2b。'],['CGE 来源中间神经元','本文从 E15.5 检测到 CGE 来源相关群体，不能据此认定其出生时间。'],['多模态观察','本时期有转录组、空间转录组及染色质可及性数据。']]},
 'E16.5':{title:'沿连续轨迹，理解皮层分化',description:'这一时期的单细胞采样补充了皮层神经发生的连续时间序列。可结合前后时期理解细胞状态，而不强行为每一天指定独有事件。',events:[['连续采样的价值','将 E15.5、E16.5 与 E17.5 联系起来，观察细胞状态变化。'],['第 4 层与上层神经元生成时段','本时期处于作者概括的 E14.5–E17.5 时段。'],['证据覆盖范围','本文在 E16.5 采集 scRNA-seq，未采集该时期的 Slide-seq 或 scATAC-seq。']]},
 'E17.5':{title:'胶质细胞群体进入观察视野',description:'作者在本研究的 E17.5 皮层样本中首次观察到少突胶质前体细胞及星形胶质细胞，为学习神经发生与胶质相关变化提供节点。',events:[['少突胶质前体细胞','文中使用 Olig1、Olig2、Pdgfra 等表达识别 OPC。'],['星形胶质细胞','文中列出 Apoe、Aldh1l1、Slc1a3 等相关表达线索。'],['保留时间解释边界','样本首次检测不等于整个脑中首次生成，也不代表早期没有胶质相关转录状态。']]},
 'E18.5':{title:'走向围出生期的细胞多样性',description:'本文最后一个胚胎期采样点。作者将该时期与 P1、P4 一同放在胶质发生背景下研究，同时观察神经元与其他细胞状态。',events:[['胶质相关变化','连接早期祖细胞状态与晚期胶质相关细胞群体。'],['染色质可及性参照','E18.5 是本文三个 scATAC-seq 采样时期之一。'],['连接出生后观察','下一实际采样点为 P1，本文未采集 P0。']]},
 'P1':{title:'出生后，皮层身份继续细化',description:'出生后第 1 天的空间数据将多个深层投射神经元群体映射到不同位置。部分亚型的分子差异仍在继续形成。',events:[['深层神经元的空间位置','Fig. 2 展示多个投射神经元群体在 P1 的空间映射。'],['第 5、6 层胼胝体投射神经元','轨迹分析从 P1 区分相关分支，空间映射支持两者的位置差异。'],['不是出生当天','P1 表示出生后第 1 天，不能用来替代 P0 的直接证据。']]},
 'P4':{title:'出生后延伸，观察进一步分化',description:'P4 是本研究转录组时间序列的终点，也用于定义 URD 轨迹树的末端细胞群体；研究终点不意味着细胞已经完全成熟。',events:[['神经元身份继续分化','作者在 P4 将第 5、6 层胼胝体投射神经元划分为两个群。'],['回看细胞分化轨迹','以 E10.5 早期祖细胞为根，以 P4 群体为轨迹末端。'],['保留生长的开放性','P4 只是本研究观察窗口的终点，不能称为神经系统发育完成。']]}
};
const cells = {
 ap:{title:'顶端祖细胞',english:'Apical progenitors · AP',markers:'Sox2 · Pax6 · Hes5',text:'本研究早期皮层样本的重要细胞群体。作者发现祖细胞随年龄呈连续变化，不能仅根据个别投射神经元 marker 的表达，将其分成已经严格限定命运的祖细胞。',figure:'正文第 1、3 页；Fig. 1、3'},
 ip:{title:'中间祖细胞',english:'Intermediate progenitors · IP',markers:'Eomes · Neurog2 · Btg2',text:'文中用这些表达线索识别中间祖细胞，并将其放在皮层神经发生的连续状态中理解。简化关系图用于学习，不表示所有神经元都必须经历本站画出的唯一途径。',figure:'正文第 1–3 页；Fig. 1、3'},
 pn:{title:'投射神经元',english:'Projection neurons · PN',markers:'Neurod2 · Tubb3 · Neurod6',text:'本文涵盖皮层下行投射神经元及不同胼胝体投射神经元等群体。作者的转录组与轨迹分析支持亚型身份在有丝分裂后逐渐分化。Pcp4 等表达可随发育状态变化，不能当作恒定的谱系专属标签。',figure:'正文第 1–3 页；Fig. 1、3'},
 glia:{title:'胶质相关分支',english:'Glia-related transcriptional trajectory',markers:'Fabp7 · Dbi · Slc1a3',text:'轨迹树提示，祖细胞至早在 E13.5 分出神经元与胶质相关分支。早期胶质分支包含保持较高放射状胶质相关表达的祖细胞；这不意味着该时期已出现成熟星形胶质细胞。',figure:'正文第 2 页；Fig. 3、Extended Data Fig. 5'},
 astro:{title:'星形胶质细胞',english:'Astrocytes',markers:'Apoe · Aldh1l1 · Slc1a3',text:'作者在本研究 E17.5 皮层样本中首次观察到该群体。沿相关轨迹，部分 DNA 复制相关基因下调，星形胶质相关基因逐渐上调。Slc1a3 也与祖细胞状态相关，应结合时期与其他表达解释。',figure:'正文第 1、3 页；Fig. 1、3'},
 interneuron:{title:'抑制性中间神经元',english:'Inhibitory interneurons',markers:'Dlx2 · Gad1 · Gad2',text:'腹侧来源中间神经元进入皮层样本。本文从 E13.5 检测到 MGE 来源相关群体，从 E15.5 检测到 CGE 来源相关群体。这些非皮层起源细胞被排除在本文主要皮层分化轨迹分析之外。',figure:'正文第 1–2 页；Fig. 1'},
 opc:{title:'少突胶质前体细胞',english:'Oligodendrocyte precursor cells · OPC',markers:'Olig1 · Olig2 · Pdgfra',text:'本文在 E17.5 皮层样本中首次观察到 OPC。这是该研究的采样观察，不能据此推断整个脑中 OPC 的最早生成时间，也不能将 OPC 与成熟少突胶质细胞混为一谈。',figure:'正文第 1 页；Fig. 1'}
};

// 出生当天的证据来自独立研究，不增加到 Di Bella 的采样覆盖中。
stageData.P0 = {
 title:'出生当天，把观察与命运分开',
 description:'P0 的内容来自独立研究：小鼠皮层 SVZ 中的 EOMES 表达、围出生期群体标记，以及条件敲除后的组织观察。它不是 Di Bella 时间序列中的一个样本。',
 events:[
  ['看见 EOMES 阳性细胞','Fig. 4A 展示 P0 小鼠皮层 SVZ 的 EOMES 阳性细胞。单一表达标记不能独立决定最终命运。','p0eomes'],
  ['围出生期标记，后续追踪','P0/P1 标记群体的后代包含多种细胞；后代在后续时间观察，不能都写成 P0 已成熟。','eomesFate'],
  ['单独理解基因干预','Map2k1/2 双条件敲除组在 P0 出现 FOXJ1/CRYAB 表达；对应对照未检出，不属于正常发育必经事件。','p0erk']
 ], refs:[3,2]
};
Object.values(cells).forEach(c=>{c.refs=[1];c.notes=['trajectory'];});
cells.ip.text += ' 围出生期需另看：Li 等的小鼠实验显示，特定 Eomes 阳性标记群体还产生胶质等后代，不能把所有 Eomes 阳性细胞都定义为只产生兴奋性神经元的 IP。';
cells.ip.refs=[1,3];cells.ip.notes=['trajectory','p0eomes','eomesFate'];
cells.opc.text += ' 发育来源与观察位置需要分开。Boda 等研究部分背侧和腹侧来源；Winkler 等原始研究支持背侧少突胶质发生在胚胎期已启动。';
cells.opc.refs=[1,4,5];cells.opc.notes=['trajectory','opcOrigin','opcEmbryo'];
cells.pn.refs=[1,2];cells.pn.notes=['trajectory','rgModel'];
cells.astro.refs=[1,2];cells.astro.notes=['trajectory','rgModel'];
cells.opc.refs=[1,2,4,5];cells.opc.notes=['trajectory','rgModel','opcOrigin','opcEmbryo'];
Object.assign(cells,extraCells);

// 展示摘要与原始来源数据分开维护。
const stageCopy = {
 'E10.5':['从早期祖细胞开始','早期皮层以祖细胞群体为重要组成，后续神经元与胶质相关状态将沿发育逐渐展开。',[['顶端祖细胞','关注 Sox2、Pax6、Hes5 等祖细胞相关表达。'],['中间祖细胞','Eomes、Neurog2、Btg2 等表达帮助识别神经发生相关状态。'],['认识发育起点','本图谱从 E10.5 开始展示，神经系统的发育在更早时期已经启动。']]],
 'E11.5':['早期皮层细胞逐渐丰富','皮层样本中可观察到 Cajal–Retzius 细胞，早期祖细胞与神经元相关状态逐渐丰富。',[['Cajal–Retzius 细胞','关注早期皮层边缘区域的这一细胞群体。'],['祖细胞持续变化','顶端与中间祖细胞共同构成理解早期神经发生的线索。'],['位置与起源','在皮层中观察到一种细胞，不一定意味着它在这里产生。']]],
 'E12.5':['从祖细胞走向投射神经元','祖细胞与投射神经元之间呈现连续的表达变化，细胞身份与组织位置开始相互联系。',[['神经元状态连续变化','结合祖细胞、迁移及未成熟神经元，理解分化过程。'],['深层神经元','E12.5–E13.5 是第 6、5 层兴奋性神经元生成的重要时段，边界并非严格互斥。'],['空间位置','结合组织切片，观察不同细胞沿皮层径向轴的位置。']]],
 'E13.5':['细胞分化，逐渐走向不同命运','神经元相关状态持续分化，皮层样本中可观察到腹侧来源的抑制性中间神经元。',[['祖细胞的分支状态','转录组轨迹中可辨认神经元与胶质相关分支；这不代表成熟胶质细胞已经形成。'],['MGE 来源中间神经元','来自内侧神经节隆起的细胞进入皮层，连接不同区域的发育。'],['时间与空间','从细胞表达、组织位置及染色质状态，理解这一时期的皮层变化。']]],
 'E14.5':['持续生成，建立神经元身份','皮层神经发生持续进行，第 4 层与第 2/3 层兴奋性神经元的生成时段相互衔接。',[['第 4 层与上层神经元','E14.5–E17.5 可概括相关神经元的重要生成时段，各层并非在互斥时间内产生。'],['连续分化','祖细胞、迁移神经元与未成熟神经元之间存在连续变化。'],['动态分子身份','投射神经元亚型逐渐分化，不能只凭单一 marker 提前指定最终命运。']]],
 'E15.5':['迁移中的细胞，连接时间与空间','迁移和未成熟兴奋性神经元分布于不同径向位置，细胞状态与皮层结构逐渐联系起来。',[['迁移与未成熟神经元','沿皮层径向轴观察多种神经元状态。'],['CGE 来源中间神经元','皮层样本中可观察到尾侧神经节隆起来源的相关群体。'],['多层次观察','结合表达、空间定位与染色质状态理解分化。']]],
 'E16.5':['沿连续变化，理解皮层分化','连接前后的胚胎时期，观察祖细胞及神经元状态的变化，而不强行为每一天指定独有事件。',[['联系相邻时期','将 E15.5、E16.5、E17.5 放在一起理解。'],['上层神经元生成','这一时期仍处于相关兴奋性神经元的重要生成时段。'],['区域差异','不同皮层区域的神经发生与胶质相关变化并不同步。']]],
 'E17.5':['胶质细胞群体逐渐丰富','皮层单细胞样本中可观察到 OPC 和星形胶质细胞群体，神经发生与胶质相关变化相互衔接。',[['少突胶质前体细胞','结合 Olig1、Olig2、Pdgfra 等表达识别 OPC。'],['星形胶质细胞','关注 Apoe、Aldh1l1、Slc1a3 等相关表达。'],['发育时间的边界','某个样本中的检测时间，不等于该细胞在整个脑中首次产生的时间。']]],
 'E18.5':['走向围出生期的细胞多样性','胚胎晚期的皮层包含神经元与胶质相关的多种状态，出生前后的分化仍在继续。',[['胶质相关变化','连接祖细胞状态与逐渐丰富的胶质细胞群体。'],['分子状态','结合基因表达与染色质可及性，认识细胞身份的变化。'],['围出生期衔接','从胚胎晚期继续观察 P0、P1 及后续发育。']]],
 'P0':['出生当天，细胞命运仍在展开','出生时的皮层仍含活跃的祖细胞与分化中细胞。EOMES 阳性群体需要结合具体状态和后续发育理解。',[['EOMES 阳性细胞','P0 皮层脑室下区可观察到 EOMES 阳性细胞，单一标记不能独立决定最终命运。'],['出生后的继续分化','围出生期标记群体在后续追踪中出现神经元与胶质等多种后代，并非每个细胞都具有多能性。'],['基因调控的影响','Map2k1/2 双条件敲除后的 P0 可出现 FOXJ1/CRYAB 表达；对应对照未检出。这是干预结果。']]],
 'P1':['出生后，皮层身份继续细化','出生后第 1 天，投射神经元群体分布于不同皮层位置，部分亚型的分子差异仍在形成。',[['深层神经元','把细胞身份与组织中的位置联系起来。'],['胼胝体投射神经元','第 5、6 层相关群体的转录状态分支逐渐可辨认。'],['出生后延伸','P1 表示出生后第 1 天，与 P0 分开观察。']]],
 'P4':['出生后延伸，观察进一步分化','出生后第 4 天，神经元身份和胶质相关状态继续发展，神经系统尚未完成成熟。',[['神经元身份','第 5、6 层胼胝体投射神经元群体呈现进一步的分子差异。'],['回看分化过程','将早期祖细胞与出生后的细胞群体联系起来。'],['持续发育','P4 是当前展示窗口的终点，不是神经系统发育的终点。']]]
};
for(const [stage,[title,description,events]] of Object.entries(stageCopy))Object.assign(stageData[stage],{title,description,events});
const cellCopy = {
 ap:'早期皮层中的重要祖细胞群体。其状态随发育连续变化，不能仅凭个别投射神经元 marker 的表达判断已经严格限定的命运。',
 ip:'皮层神经发生过程中，中间祖细胞连接早期祖细胞与神经元相关状态。围出生期的 Eomes 阳性群体还包含其他后代方向，不能全部归为只产生兴奋性神经元的 IP。',
 pn:'皮层投射神经元包含下行投射及胼胝体投射等群体，亚型身份在有丝分裂后逐渐分化，部分 marker 会随发育状态变化。',
 glia:'早期胶质相关转录状态可包含仍保留放射状胶质特征的祖细胞。转录组中的分支不等于该时期已出现成熟星形胶质细胞。',
 astro:'星形胶质相关状态在发育中逐渐丰富。Aldh1l1、Slc1a3 等表达需结合时期与其他线索；Slc1a3 也可与祖细胞状态有关。',
 interneuron:'腹侧来源的抑制性中间神经元迁入皮层，包含 MGE、CGE 等来源。皮层中的观察位置与细胞的产生区域是两个维度。',
 opc:'OPC 与成熟少突胶质细胞需要分开。发育来源可能不同于后来所在的位置；背侧少突胶质发生在胚胎期已启动，不能统一从 P0 起算。',
 nrg:'按神经发生功能描述的放射状胶质细胞方向，连接锥体神经元中间祖细胞与投射神经元。N-RG 与按顶端位置描述的 AP 不属于完全相同的分类体系。',
 erg:'与室管膜细胞产生相关的 RG 方向。基因干预造成的提前表达不等于正常状态下的发生时刻。',
 trg:'与 Tri-IPC 产生相关的 RG 方向。不同区域、时期及信号条件下的细胞状态需要分别理解。',
 tri:'这一模型中的 Tri-IPC 连接星形胶质、少突胶质及嗅球中间神经元三类方向。marker 共表达本身不能独立证明单细胞三潜能。',
 pynipc:'通向锥体神经元的中间祖细胞。出生前后的 Eomes 阳性群体并非都属于这一方向。',
 apc:'星形胶质方向的祖细胞。APC 与表示顶端祖细胞的 AP 是两个不同概念。',
 ependymal:'室管膜方向的细胞。相关基因表达、命运确立与成熟功能形成不是同一个事件。',
 obinipc:'通向嗅球中间神经元的祖细胞方向，不是迁入皮层的腹侧来源抑制性中间神经元。',
 obin:'这里表示嗅球中的中间神经元后代。围出生期标记与后续后代观察需要分开，不能将后代全部视为 P0 已成熟。',
 ol:'OPC 分化后的少突胶质细胞需进一步区分成熟状态。OPC 的出现不代表髓鞘形成已经完成。',
 dorsal:'发育源于背侧的 OPC。胚胎期已经参与少突胶质发生；发育来源与取材时所在区域需分开描述。',
 ventral:'这里比较特定腹侧来源的 OPC，不包含全部腹侧谱系，尤其不能据此概括未覆盖的 Gsh2 来源群体。'
};
for(const [key,text] of Object.entries(cellCopy))cells[key].text=text;

// 仅建立现有条目的索引；markers 保持展示字符串，不解析为基因。
const uniqueEvidenceIds=ids=>[...new Set(ids||[])];
for(const [id,c] of Object.entries(cells))Object.assign(c,{id,name:c.title,description:c.text,region:null,evidenceLinks:cellEvidenceLinks[id]||[],stageEvidenceLinks:[]});
const events = {};
for(const stage of stages){
 stageData[stage].events=stageData[stage].events.map(([title,description],i)=>{
  const id=`event_${stage.replaceAll('.','_')}_${eventKeys[stage][i]}`;
  const association=eventAssociations[id]||{};
  const event={id,displayStage:stage,temporalContext:{stageRange:null,labelingStage:null,observationStage:null,...association.temporalContext},title,description,cellIds:association.cellIds||[],evidenceIds:uniqueEvidenceIds(association.evidenceIds),stageEvidenceLinks:association.stageEvidenceLinks||[]};
  events[id]=event;return event;
 });
}
// displayStage 仅控制卡片位置，绝不用于科学时间筛选；未知时间不解析正文补齐。
const atlasData={cells,relations,events,evidence:evidenceNotes,viewCellIds,relationshipTypes,evidenceRoles};
const objectEvidenceIds=object=>uniqueEvidenceIds([...(object.evidenceIds||[]),...(object.evidenceLinks||[]).map(link=>link.evidenceId)]);
function validateData(data=atlasData){
 const issues=[];
 const check=(kind,id,object)=>{
  for(const evidenceId of uniqueEvidenceIds([...objectEvidenceIds(object),...(object.stageEvidenceLinks||[]).map(link=>link.evidenceId)])){
   if(!Object.hasOwn(data.evidence,evidenceId))issues.push(`${kind}:${id}: unknown Evidence ${evidenceId}`);
  }
  for(const link of [...(object.evidenceLinks||[]),...(object.stageEvidenceLinks||[])]){
   if(!Object.hasOwn(evidenceRoles,link.role))issues.push(`${kind}:${id}: unknown role ${link.role}`);
  }
  for(const link of object.stageEvidenceLinks||[]){
   if(!objectEvidenceIds(object).includes(link.evidenceId))issues.push(`${kind}:${id}: stage Evidence 未关联对象 ${link.evidenceId}`);
   if(!stages.includes(link.stage))issues.push(`${kind}:${id}: unknown stage ${link.stage}`);
  }
 };
 for(const [id,c] of Object.entries(data.cells))check('cell',id,c);
 const relationIds=new Set();
 for(const r of data.relations){
  check('relation',r.id,r);
  if(relationIds.has(r.id))issues.push(`duplicate relation ${r.id}`);relationIds.add(r.id);
  for(const key of ['source','target'])if(!Object.hasOwn(data.cells,r[key]))issues.push(`relation:${r.id}: unknown ${key} ${r[key]}`);
 }
 for(const [id,e] of Object.entries(data.events)){
  check('event',id,e);
  for(const cellId of e.cellIds||[])if(!Object.hasOwn(data.cells,cellId))issues.push(`event:${id}: unknown cell ${cellId}`);
 }
 return issues;
}
const dataIntegrityIssues=validateData();
if(dataIntegrityIssues.length)console.warn('Atlas 数据完整性检查未通过',dataIntegrityIssues);
const $=id=>document.getElementById(id);
// 从当前 app.js 的位置取得根路径，同时支持 / 和 /Atlas/。
const siteBase=new URL('.',document.currentScript.src).pathname;
const sitePath='/'+location.pathname.slice(siteBase.length);
const pageName=sitePath.startsWith('/references')?'references':sitePath.startsWith('/atlas')?'atlas':sitePath.startsWith('/lineage')?'lineage':'home';
const isExplorer=['atlas','lineage'].includes(pageName);
const isReferences=pageName==='references';
function readUrlState(){
 const p=new URLSearchParams(location.search);
 const selectedRelation=relations.some(r=>r.id===p.get('relation'))?p.get('relation'):null;
  // 旧 URL 同含两种选择时沿用原界面的 relation 优先规则，但 state 只保留一个。
  return {stage:stages.includes(p.get('stage'))?p.get('stage'):'E13.5',view:Object.hasOwn(relationshipViews,p.get('view'))?p.get('view'):'trajectory',selectedCell:!selectedRelation&&Object.hasOwn(cells,p.get('cell'))?p.get('cell'):null,selectedRelation,filters:{}};
}
function canonicalizeSelectionUrl(){
 const url=new URL(location.href);
 if(url.searchParams.has('cell')&&url.searchParams.has('relation')){
  if(state.selectedRelation)url.searchParams.delete('cell');
  else url.searchParams.delete('relation');
  history.replaceState(null,'',url); // 规范旧链接，不新增历史项，也不改路径与其他参数。
 }
}
let state=readUrlState();
canonicalizeSelectionUrl();
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paperById=id=>papers.find(p=>p.id===id);
const evidenceButton=(ids,cellId=null)=>{const keys=uniqueEvidenceIds(ids);return keys.length?`<button class="evidence-link" data-evidence="${keys.join(',')}"${cellId?` data-evidence-cell="${cellId}"`:""}>Evidence · ${keys.length}</button>`:'';};
const noteButton=(key,label='了解更多')=>`<span>${label} · </span>${evidenceButton([key])}`;
function writeUrl(){
 const url=new URL(location.href);
 url.searchParams.set('stage',state.stage);url.searchParams.set('view',state.view);
 for(const [key,value] of [['cell',state.selectedCell],['relation',state.selectedRelation]]){if(value)url.searchParams.set(key,value);else url.searchParams.delete(key);}
 if(url.href!==location.href)history.pushState(null,'',url);
}
function setState(patch,{history=true}={}){
 const next={...state,...patch};
 if(!stages.includes(next.stage)||!Object.hasOwn(relationshipViews,next.view))return;
 if(next.selectedCell&&!Object.hasOwn(cells,next.selectedCell))return;
 if(next.selectedRelation&&!relations.some(r=>r.id===next.selectedRelation))return;
 // 显式选择一个对象会清除另一种选择；同时传入时 relation 优先。
 if(patch.selectedRelation)next.selectedCell=null;
 else if(patch.selectedCell)next.selectedRelation=null;
 state=next;if(history)writeUrl();renderState();
}
function coverage(kind,id,stage=state.stage,view=state.view){
 const object=kind==='cell'?cells[id]:kind==='relation'?relations.find(r=>r.id===id):kind==='event'?events[id]:null;
 const recorded=!!object;
 const inCurrentView=recorded&&(kind==='cell'?(viewCellIds[view]||[]).includes(id):kind==='relation'?object.view===view:false);
 const relatedEvidenceIds=object?objectEvidenceIds(object):[];
 // 只采用显式时期关联；模型、条件实验及展示位置不能自动升级为直接时期证据。
 const evidenceIds=uniqueEvidenceIds((object?.stageEvidenceLinks||[]).filter(link=>link.stage===stage&&link.role==='direct_observation').map(link=>link.evidenceId));
 const hasDirectStageEvidence=evidenceIds.length>0;
 const status=!recorded?'not_recorded':hasDirectStageEvidence?'direct_stage_evidence':relatedEvidenceIds.length?'context_only':inCurrentView?'model_context':'context_only';
 return {status,recorded,inCurrentView,hasDirectStageEvidence,evidenceIds,relatedEvidenceIds};
}
const coverageText=result=>({
 direct_stage_evidence:'当前时期有明确关联的直接观察记录；支持范围与条件见 Evidence。',
 context_only:'对象已收录；尚未建立当前时期的直接证据关联，已有记录请结合背景与实验条件阅读。',
 model_context:'当前模型包含该对象；不代表在当前时期被直接观察。',
 not_recorded:'本站尚未收录该对象；不表示生物学不存在。'
 }[result.status]);
// 供后续工作区复用；视图成员、对象收录和时期证据分别返回，不按缺失信息推断存在与消失。
window.Atlas={data:atlasData,getState:()=>structuredClone(state),setState,coverage,validateData};
function evidence(stage){if(stage==='P0')return ['组织表达观察','群体谱系追踪','基因干预（独立条件）'];const list=['scRNA-seq'];if(['E12.5','E13.5','E15.5','P1'].includes(stage))list.push('Slide-seq v2');if(['E13.5','E15.5','E18.5'].includes(stage))list.push('scATAC-seq');return list;}
function renderStage(stage,update=false){
 if(update){setState({stage});return;}
 if(!$('stage-buttons'))return;
 const d=stageData[stage];
 $('stage-buttons').innerHTML=stages.map((s,i)=>`<button class="stage-button ${s[0]==='P'?'post ':''}${s==='P0'?'independent ':''}${s===stage?'active':''}" data-stage="${s}" aria-pressed="${s===stage}" ${s===stage?'aria-current="step"':''} aria-label="${s}，${stageData[s].title}"><span class="stage-illustration" role="img" aria-label="${s} 小鼠发育形态示意" style="background-position:${(i%6)*20}% ${i<6?0:100}%"></span><span class="stage-point"></span><span>${s}</span></button>`).join('');
 $('stage-badge').textContent=stage;$('stage-title').textContent=d.title;$('stage-description').textContent=d.description;
 if($('stage-events'))$('stage-events').innerHTML=d.events.map((e,i)=>`<div class="event"><span class="event-index">0${i+1}</span><div><h3>${escapeHTML(e.title)}</h3><p>${escapeHTML(e.description)}</p>${evidenceButton(e.evidenceIds)}</div></div>`).join('');
 $('previous-stage').disabled=stage===stages[0];$('next-stage').disabled=stage===stages.at(-1);

 requestAnimationFrame(()=>{const b=document.querySelector('.stage-button.active');$('stage-buttons').scrollLeft=b.offsetLeft-($('stage-buttons').clientWidth-b.offsetWidth)/2;});
}
let detailOpener=null;
function showDetail(html){if(!$('detail-dialog').open)detailOpener=document.activeElement;if($('search-dialog').open)$('search-dialog').close();$('dialog-content').innerHTML=html;const heading=$('dialog-content').querySelector('h2');if(heading){heading.id='detail-title';$('detail-dialog').setAttribute('aria-labelledby','detail-title');}$('detail-dialog').scrollTop=0;if(!$('detail-dialog').open)$('detail-dialog').showModal();else $('detail-dialog').querySelector('.dialog-close').focus();}
function showEvidence(keys,cellId=null){
 const ids=uniqueEvidenceIds(Array.isArray(keys)?keys:String(keys).split(','));if(!ids.length)return;
 const cards=ids.map(id=>{const e=evidenceNotes[id];if(!e)return '';
  const links=cellId?(cells[cellId]?.evidenceLinks||[]).filter(link=>link.evidenceId===id):[];
  const fields=[...links.map(link=>['与当前 Cell 的关联角色',`${evidenceRoles[link.role]} (${link.role}) · ${link.scope}`]),['Evidence type',e.type],['Species',e.species],['Region',e.region],['Developmental time',e.stage],['Labeling / intervention time',e.label],['Observation time',e.readout],['Experimental condition',e.condition],['Finding',e.finding],['Limitation',e.limit],['证据位置',e.location]];
  const papersHtml=[...new Set(e.refs||[])].map(paperById).filter(Boolean).map(p=>`<a href="https://doi.org/${encodeURI(p.doi)}" target="_blank" rel="noopener noreferrer">${escapeHTML(p.title)}</a> · ${escapeHTML(p.authors)} · ${escapeHTML(p.journal)} ${escapeHTML(p.year)}`).join('<br>');
  return `<article class="evidence-record" data-evidence-id="${id}"><h3>${escapeHTML(e.title)}</h3><dl class="evidence-facts">${papersHtml?`<div><dt>Paper</dt><dd>${papersHtml}</dd></div>`:''}${fields.filter(([,v])=>v).map(([k,v])=>`<div><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`).join('')}</dl></article>`;
 }).join('');
 showDetail(`<h2>Evidence · ${ids.length}</h2><p>数量表示去重的关联记录总数，包含背景与限制说明，不代表直接证据数、论文数、独立实验次数或可信度。</p>${state.selectedCell?`<button class="text-link" data-return-cell="${state.selectedCell}">返回细胞详情</button>`:''}${cards}`);
}
function showCell(key,select=true){
 const c=cells[key];if(!c)return;
 if(select){setState({selectedCell:key,selectedRelation:null});return;}
 showDetail(`<h2>${c.title}</h2><div class="eyebrow">${c.english}</div><div class="evidence-tags">${c.markers.split(' · ').map(x=>`<span>${escapeHTML(x)}</span>`).join('')}</div><p>${c.text}</p><p class="coverage-status">${state.stage} · ${coverageText(coverage('cell',key))}</p>${!viewCellIds[state.view].includes(key)?'<p>该对象不在当前关系视图中；保留当前视图和对象选择。</p>':''}${evidenceButton(objectEvidenceIds(c),key)}`);
}
function showRelation(id){const r=relations.find(x=>x.id===id);if(!r)return;showDetail(`<h2>${cells[r.source].title} → ${cells[r.target].title}</h2><p>${r.relationshipType}</p><p>${coverageText(coverage('relation',id))}</p>${r.view!==state.view?'<p>该关系属于其他关系视图；保留当前视图和关系选择。</p>':''}${evidenceButton(r.evidenceIds)}`);}
// Atlas 专用工作区：布局从现有视图成员和关系计算，不另建科学关系或 state。
const relationTypeLabels={computational_trajectory:'Computational trajectory',author_model:'Author model',lineage_tracing:'Lineage tracing',developmental_observation:'Developmental observation',other:'Other',unknown:'Unknown'};
function atlasElement(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
function atlasParagraph(parent,text,className=''){parent.append(atlasElement('p',className,text));}
function atlasEvidence(parent,object,cellId=null){
 const ids=objectEvidenceIds(object);if(!ids.length){atlasParagraph(parent,'尚未关联 Evidence 记录。','atlas-detail-note');return;}
 const block=atlasElement('div','atlas-evidence');block.innerHTML=evidenceButton(ids,cellId);parent.append(block);
 atlasParagraph(parent,'去重关联记录数，包含背景或限制说明。','atlas-detail-note');
}
function renderAtlasControls(){
 const select=$('atlas-stage');if(!select.options.length)for(const stage of stages){const option=atlasElement('option','',stage);option.value=stage;select.append(option);}
 select.value=state.stage;$('atlas-prev').disabled=state.stage===stages[0];$('atlas-next').disabled=state.stage===stages.at(-1);
 const compact=$('atlas-view-select');if(!compact.options.length)for(const [id,view] of Object.entries(relationshipViews)){const option=atlasElement('option','',view.name);option.value=id;compact.append(option);}compact.value=state.view;
 const group=$('relationship-tabs');group.replaceChildren();
 for(const [id,view] of Object.entries(relationshipViews)){
  const button=atlasElement('button','',view.name);button.dataset.view=id;button.setAttribute('aria-pressed',String(id===state.view));group.append(button);
 }
}
function atlasGraphLayout(ids,edges){
 const children=id=>edges.filter(r=>r.source===id).map(r=>r.target);
 const incoming=new Set(edges.map(r=>r.target));const roots=ids.filter(id=>!incoming.has(id));
 const available=$('atlas-graph-scroll').clientWidth;const sparse=ids.length<=5;
 const desktop=matchMedia('(min-width:1180px)').matches;
 const leafCount=Math.max(1,ids.filter(id=>!children(id).length).length);
 // 桌面仅改变几何比例；小屏继续沿用 B.1 尺寸，布局不参与科学判断。
 const nodeWidth=desktop?(sparse?Math.min(220,available*.30):Math.max(118,Math.min(164,Math.floor((available-44-(leafCount-1)*16)/leafCount)))):(sparse?(available<400?136:164):118);
 const nodeHeight=desktop?(sparse?124:108):(sparse?96:80);
 const pitch=desktop?Math.max(nodeWidth+16,(available-44-nodeWidth)/Math.max(1,leafCount-1)):(sparse?(available>=600?246:174):142);
 const step=desktop?(sparse?214:166):(sparse?154:132);
 const positions=new Map();let leaf=0;
 function visit(id,depth,path=new Set()){
  if(path.has(id))return 0; // 数据异常时防止递归死循环；不推导额外边。
  if(positions.has(id))return positions.get(id).x;
  const nextPath=new Set(path);nextPath.add(id);const targets=children(id);
  const xs=targets.map(target=>visit(target,depth+1,nextPath));
  const x=xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:22+leaf++*pitch;
  positions.set(id,{x,y:22+depth*step});return x;
 }
 roots.forEach(id=>visit(id,0));ids.filter(id=>!positions.has(id)).forEach(id=>visit(id,0));
 return {positions,nodeWidth,nodeHeight,width:Math.max(320,(leaf-1)*pitch+nodeWidth+44),height:Math.max(...[...positions.values()].map(p=>p.y))+nodeHeight+22};
}
function renderAtlasGraph(){
 const ids=viewCellIds[state.view];const edges=relations.filter(r=>r.view===state.view);
 const {positions,width,height,nodeWidth,nodeHeight}=atlasGraphLayout(ids,edges);
 const graph=$('atlas-graph');graph.replaceChildren();graph.style.width=width+'px';graph.style.height=height+'px';graph.style.setProperty('--node-width',nodeWidth+'px');graph.style.setProperty('--node-height',nodeHeight+'px');graph.classList.toggle('is-sparse',ids.length<=5);
 const selectedEdge=edges.find(r=>r.id===state.selectedRelation);
 const visibleSelection=ids.includes(state.selectedCell)||!!selectedEdge;
 const related=new Set(selectedEdge?[selectedEdge.source,selectedEdge.target]:edges.filter(r=>r.source===state.selectedCell||r.target===state.selectedCell).flatMap(r=>[r.source,r.target]));
 const svgNS='http://www.w3.org/2000/svg';const svg=document.createElementNS(svgNS,'svg');svg.setAttribute('width',width);svg.setAttribute('height',height);svg.classList.add('atlas-connectors');
 for(const r of edges){
  const source=positions.get(r.source),target=positions.get(r.target);const x1=source.x+nodeWidth/2,x2=target.x+nodeWidth/2,y1=source.y+nodeHeight,y2=target.y;const mid=(y1+y2)/2;
  const g=document.createElementNS(svgNS,'g');g.dataset.relation=r.id;g.setAttribute('role','button');g.setAttribute('tabindex','0');g.setAttribute('aria-label',`${cells[r.source].title} → ${cells[r.target].title} · ${relationTypeLabels[r.relationshipType]||'Unknown'}`);g.setAttribute('aria-pressed',String(r.id===state.selectedRelation));
  g.classList.add('atlas-edge');g.classList.toggle('is-selected',r.id===state.selectedRelation);g.classList.toggle('is-related',r.source===state.selectedCell||r.target===state.selectedCell);g.classList.toggle('is-muted',visibleSelection&&(selectedEdge?r.id!==selectedEdge.id:r.source!==state.selectedCell&&r.target!==state.selectedCell));g.dataset.type=r.relationshipType;
  const title=document.createElementNS(svgNS,'title');title.textContent=g.getAttribute('aria-label');g.append(title);
  for(const cls of ['edge-hit','edge-line']){const path=document.createElementNS(svgNS,'path');path.setAttribute('d',`M ${x1} ${y1} V ${mid} H ${x2} V ${y2-5}`);path.setAttribute('class',cls);g.append(path);}
  const tip=document.createElementNS(svgNS,'path');tip.setAttribute('d',`M ${x2-3} ${y2-9} L ${x2} ${y2-5} L ${x2+3} ${y2-9}`);tip.setAttribute('class','edge-tip');g.append(tip);svg.append(g);
 }
 // 将选中连线置于最上层，避免共用线段被其他淡色连线覆盖。
 const selectedConnector=svg.querySelector('.is-selected');if(selectedConnector)svg.append(selectedConnector);
 graph.append(svg);
 for(const id of ids){
  const c=cells[id],position=positions.get(id);const button=atlasElement('button','atlas-node');button.dataset.cell=id;button.style.left=position.x+'px';button.style.top=position.y+'px';button.title=c.description;
  button.classList.toggle('is-selected',state.selectedCell===id);button.classList.toggle('is-related',related.has(id)&&state.selectedCell!==id);button.classList.toggle('is-muted',visibleSelection&&!related.has(id)&&state.selectedCell!==id);button.setAttribute('aria-pressed',String(state.selectedCell===id));
  button.append(atlasElement('strong','',c.name),atlasElement('small','',c.english.includes(' · ')?c.english.split(' · ').at(-1):c.english));graph.append(button);
 }
 const legend=$('atlas-graph-legend');legend.replaceChildren();
 for(const type of new Set(edges.map(r=>r.relationshipType))){const item=atlasElement('span','atlas-legend-item',relationTypeLabels[type]||'Unknown');item.dataset.type=type;legend.append(item);}
 $('atlas-graph-note').textContent=state.view==='opc'?'来源比较，不绘制方向性关系；仅覆盖已有实验范围，不包含全部腹侧来源。':state.view==='rg'?'作者综合模型；连线不代表每条路径都经过单细胞克隆验证。':'简化的转录状态关系；计算轨迹不等于实验谱系追踪。';
}
function atlasNeighborList(parent,label,edges,direction){
 parent.append(atlasElement('h3','',label));const ids=[...new Set(edges.map(r=>r[direction]))];
 if(!ids.length){atlasParagraph(parent,'当前视图未收录对应连线。','atlas-detail-note');return;}
 const list=atlasElement('div','atlas-neighbors');for(const id of ids){const button=atlasElement('button','text-link',cells[id].name);button.dataset.cell=id;list.append(button);}parent.append(list);
}
function renderAtlasDetails(){
 const target=$('atlas-detail-content');target.replaceChildren();$('atlas-clear').hidden=!state.selectedCell&&!state.selectedRelation;
 if(state.selectedCell){
  const c=cells[state.selectedCell];target.append(atlasElement('h2','',c.name));atlasParagraph(target,'Cell / State · '+c.english,'atlas-detail-note');atlasParagraph(target,c.description);
  target.append(atlasElement('h3','','Markers'));const markers=atlasElement('div','atlas-markers');for(const text of c.markers.split(' · '))markers.append(atlasElement('span','',text));target.append(markers); // 仅分隔原展示文本，不解析 gene。
  const edges=relations.filter(r=>r.view===state.view);
  atlasNeighborList(target,'当前关系图上游',edges.filter(r=>r.target===c.id),'source');atlasNeighborList(target,'当前关系图下游',edges.filter(r=>r.source===c.id),'target');
  target.append(atlasElement('h3','','Coverage / Context'));atlasParagraph(target,state.stage+' · '+coverageText(coverage('cell',c.id)),'atlas-coverage');
  if(!viewCellIds[state.view].includes(c.id))atlasParagraph(target,'该对象不在当前关系视图中；保留当前视图和对象选择。','atlas-cross-view');
  atlasEvidence(target,c,c.id);
 }else if(state.selectedRelation){
  const r=relations.find(r=>r.id===state.selectedRelation);target.append(atlasElement('h2','atlas-relation-names',cells[r.source].name+' → '+cells[r.target].name));atlasParagraph(target,'Relation','atlas-detail-note');
  target.append(atlasElement('h3','','Relationship type'));atlasParagraph(target,relationTypeLabels[r.relationshipType]||'Unknown');
  target.append(atlasElement('h3','','Current view'));atlasParagraph(target,relationshipViews[state.view].name);atlasParagraph(target,'关系所属视图：'+relationshipViews[r.view].name,'atlas-detail-note');
  target.append(atlasElement('h3','','Scientific interpretation'));
  atlasParagraph(target,r.relationshipType==='computational_trajectory'?'简化的转录状态关系，不等于实验谱系，也不是唯一必经路线。':r.relationshipType==='author_model'?'作者综合模型中的关系，不等于每条边都已通过单细胞克隆验证。':'按关联记录的实验范围与限制解释，不仅凭连线判断祖先与后代。');
  atlasParagraph(target,state.stage+' · '+coverageText(coverage('relation',r.id)),'atlas-coverage');
  if(r.view!==state.view)atlasParagraph(target,'该关系属于其他关系视图；保留当前视图和关系选择。','atlas-cross-view');
  atlasEvidence(target,r);
 }else{
  target.append(atlasElement('h2','','选择一个细胞或关系查看详情'));atlasParagraph(target,state.stage+' · '+relationshipViews[state.view].name,'atlas-detail-note atlas-default-short');
  const context=atlasElement('div','atlas-default-desktop');
  for(const [label,value] of [['Current stage',state.stage],['Current view',relationshipViews[state.view].name],['Reading guide','点击节点查看状态与 Evidence；点击连线查看关系解释。']]){context.append(atlasElement('h3','',label));atlasParagraph(context,value);}
  target.append(context);
  atlasParagraph(target,'点击节点查看状态与关联记录，点击连线查看关系解释。','atlas-empty-note');atlasParagraph(target,'连线方向用于阅读当前模型，不自动代表实验验证的祖先与后代。','atlas-detail-note');
 }
}
function renderAtlasEvents(){
 const list=$('stage-events');list.replaceChildren();
 for(const event of Object.values(events).filter(e=>e.displayStage===state.stage)){
  const button=atlasElement('button','atlas-event');button.dataset.atlasEvent=event.id;button.append(atlasElement('span','',event.title),atlasElement('span','atlas-event-arrow','→'));list.append(button);
 }
}
function showAtlasEvent(id){
 const event=events[id];if(!event)return;const time=event.temporalContext;
 const fields=[['已整理时间范围',time.stageRange],['标记时期',time.labelingStage],['观察时期',time.observationStage]].filter(([,value])=>value!==null);
 showDetail(`<h2>${escapeHTML(event.title)}</h2><p>${escapeHTML(event.description)}</p><p>此条目在 ${escapeHTML(event.displayStage)} 阶段页面中展示；展示位置不等于事件发生时间。</p>${fields.map(([label,value])=>`<p>${label}：${escapeHTML(Array.isArray(value)?value.join(' / '):value)}</p>`).join('')}${evidenceButton(event.evidenceIds)}`);
}
function renderAtlasWorkspace(){
 const focus=document.activeElement;const focusCell=focus?.dataset.cell,focusRelation=focus?.dataset.relation,focusView=focus?.dataset.view,focusStage=focus?.dataset.stage;
 const scroll=$('atlas-graph-scroll');const scrollLeft=scroll.scrollLeft;
 if($('search-dialog').open)$('search-dialog').close();if($('detail-dialog').open)$('detail-dialog').close();
 renderAtlasControls();$('atlas-context-title').textContent=(pageName==='lineage'?'':state.stage+' · ')+relationshipViews[state.view].name;
 renderAtlasGraph();renderStage(state.stage);if($('stage-events'))renderAtlasEvents();renderAtlasDetails();scroll.scrollLeft=scrollLeft;
 const focusTarget=focusCell?$('atlas-graph').querySelector(`[data-cell="${focusCell}"]`):focusRelation?$('atlas-graph').querySelector(`[data-relation="${focusRelation}"]`):focusView?$('relationship-tabs').querySelector(`[data-view="${focusView}"]`):focusStage?$('stage-buttons').querySelector(`[data-stage="${focusStage}"]`):null;
 focusTarget?.focus({preventScroll:true});
}
if(isExplorer){
 $('atlas-stage').addEventListener('change',e=>setState({stage:e.target.value}));
 $('atlas-view-select').addEventListener('change',e=>setState({view:e.target.value}));
 // 仅响应画布宽度变化，调整显示尺寸，不修改选择或 URL。
 let previousWidth=0;new ResizeObserver(entries=>{const width=entries[0].contentRect.width;if(width===previousWidth)return;previousWidth=width;renderAtlasGraph();const active=$('stage-buttons')?.querySelector('.active');if(active)$('stage-buttons').scrollLeft=active.offsetLeft-($('stage-buttons').clientWidth-active.offsetWidth)/2;}).observe($('atlas-graph-scroll'));
 $('atlas-prev').addEventListener('click',()=>setState({stage:stages[Math.max(0,stages.indexOf(state.stage)-1)]}));
 $('atlas-next').addEventListener('click',()=>setState({stage:stages[Math.min(stages.length-1,stages.indexOf(state.stage)+1)]}));
 $('atlas-clear').addEventListener('click',()=>setState({selectedCell:null,selectedRelation:null}));
 $('atlas-graph').addEventListener('keydown',e=>{if(e.target.matches('[data-relation]')&&['Enter',' '].includes(e.key)){e.preventDefault();setState({selectedRelation:e.target.dataset.relation});}});
}
function renderState(){
 if(isExplorer){renderAtlasWorkspace();return;}
 const focus=document.activeElement;const stageFocus=focus?.dataset.stage;const viewFocus=focus?.dataset.view;
 renderStage(state.stage);renderRelationships(state.view);
 document.querySelectorAll('[data-atlas-entry]').forEach(a=>a.href=siteBase+'atlas/?stage='+encodeURIComponent(state.stage));
 if(stageFocus)document.querySelector(`[data-stage="${stageFocus}"]`)?.focus({preventScroll:true});
 if(viewFocus)document.querySelector(`[data-view="${viewFocus}"]`)?.focus({preventScroll:true});
 if(state.selectedRelation)showRelation(state.selectedRelation);
 else if(state.selectedCell)showCell(state.selectedCell,false);
 else if($('detail-dialog').open)$('detail-dialog').close();
}
function showCells(){showDetail('<h2>细胞与 marker</h2><p>先理解细胞状态，再理解表达线索。RG 类型也可以按功能方向理解。</p><div class="cell-list">'+Object.entries(cells).map(([k,c])=>`<button data-cell="${k}"><span>${c.title}</span><small>${c.english} ↗</small></button>`).join('')+'</div>');}
function showRegion(){showDetail('<h2>脑区与空间</h2><div class="eyebrow">CORTEX · ORIGIN · DESTINATION</div><p>当前从小鼠皮层开始探索。结合细胞身份与组织位置，可以观察不同细胞沿皮层径向轴的分布。</p><p>发育来源与后来所在位置需要分开：部分细胞从腹侧区域迁入皮层，部分皮层来源祖细胞的后代则进入嗅球。</p><p>不同脑区的发育进程并不同步。</p>');}
// 首页预览仅取既有转录关系；完整关系渲染器由 Atlas 和 Lineage 共用。
function renderRelationships(view,update=false){
 if(update){setState({view});return;}
 const preview=$('home-lineage-preview');if(!preview)return;
 const edges=relations.filter(r=>r.view==='trajectory').slice(0,2);
 const ids=[edges[0].source,...edges.map(r=>r.target)];
 preview.innerHTML=ids.map((id,i)=>`${i?'<span aria-hidden="true">⇢</span>':''}<a href="${siteBase}lineage/?view=trajectory&cell=${id}">${cells[id].name}<small>${cells[id].english}</small></a>`).join('');
}
function renderReferences(){
 $('reference-list').innerHTML=papers.map(p=>`<article class="reference-entry" id="ref-${p.id}" tabindex="-1"><h2><a href="https://doi.org/${p.doi}" target="_blank" rel="noopener noreferrer">${p.title}</a></h2><p class="reference-authors">${p.authors}</p><p class="reference-publication"><span>${p.journal}</span><time>${p.year}</time></p></article>`).join('');
}
function revealReference(){if(isReferences&&/^#ref-\d+$/.test(location.hash)){const target=$(location.hash.slice(1));if(target)requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));}}
function renderSearch(){
 const q=$('search-input').value.trim().toLowerCase();let results=[];
 for(const s of stages){if(!q||`${s} ${stageData[s].title}`.toLowerCase().includes(q))results.push(`<a href="/atlas/?stage=${s}#timeline">${s} · ${stageData[s].title}<small>发育时期</small></a>`);}
 if(q){for(const [k,c] of Object.entries(cells)){if(`${c.title} ${c.english} ${c.markers} ${c.text}`.toLowerCase().includes(q))results.push(`<button data-cell="${k}">${c.title}<small>${c.english}</small></button>`);}
 for(const p of papers){if(`${p.short} ${p.title} ${p.authors} ${p.doi} ${p.tags.join(' ')} ${p.summary}`.toLowerCase().includes(q))results.push(`<a href="/references/#ref-${p.id}">${p.title}<small>${p.authors} · ${p.journal} · ${p.year}</small></a>`);}}
 $('search-results').innerHTML=results.join('')||'<p>尚未收录匹配内容。可以搜索 P0、Eomes、OPC 或作者姓名。</p>';
}
function openSearch(){if($('detail-dialog').open)$('detail-dialog').close();if(!$('search-dialog').open)$('search-dialog').showModal();renderSearch();$('search-input').focus();}
$('stage-buttons')?.addEventListener('click',e=>{const b=e.target.closest('[data-stage]');if(b)renderStage(b.dataset.stage,true);});
$('previous-stage')?.addEventListener('click',()=>renderStage(stages[Math.max(0,stages.indexOf(state.stage)-1)],true));
$('next-stage')?.addEventListener('click',()=>renderStage(stages[Math.min(stages.length-1,stages.indexOf(state.stage)+1)],true));
$('relationship-tabs')?.addEventListener('keydown',e=>{if(isExplorer)return;const keys=Object.keys(relationshipViews);if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const i=keys.indexOf(state.view);const next=e.key==='Home'?0:e.key==='End'?keys.length-1:(i+(e.key==='ArrowRight'?1:-1)+keys.length)%keys.length;renderRelationships(keys[next],true);$(`tab-${keys[next]}`).focus();}});
// 动态文献、关系图和弹窗使用委托事件，避免筛选后按钮失效。
document.addEventListener('click',async e=>{
 const cell=e.target.closest('[data-cell]');if(cell)showCell(cell.dataset.cell);
 const event=e.target.closest('[data-atlas-event]');if(event)showAtlasEvent(event.dataset.atlasEvent);
 const note=e.target.closest('[data-evidence]');if(note)showEvidence(note.dataset.evidence,note.dataset.evidenceCell);
 const view=e.target.closest('[data-view]');if(view)renderRelationships(view.dataset.view,true);
 const relation=e.target.closest('[data-relation]');if(relation)setState({selectedRelation:relation.dataset.relation,selectedCell:null});
 const back=e.target.closest('[data-return-cell]');if(back){if(isExplorer){$('detail-dialog').close();$('atlas-detail-content').scrollIntoView({block:'nearest'});}else showCell(back.dataset.returnCell,false);}
 if(e.target.closest('.dialog-close')){const d=e.target.closest('dialog');if(d.id==='detail-dialog')closeDetail();else d.close();}
 // 在同页文献锚点导航前关闭弹窗，确保引用目标可见。
 const a=e.target.closest('a[href]');if(a&&a.getAttribute('href').startsWith('/references/#'))document.querySelectorAll('dialog[open]').forEach(d=>d.close());
});
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){if(d.id==='detail-dialog')closeDetail();else d.close();}}}));
$('open-cells')?.addEventListener('click',showCells);$('open-region')?.addEventListener('click',showRegion);
$('lineage-info')?.addEventListener('click',()=>showEvidence(relationshipViews[state.view].note));
$('open-search').addEventListener('click',openSearch);$('search-input').addEventListener('input',renderSearch);
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!document.querySelector('dialog[open]')){e.preventDefault();openSearch();}});
$('detail-dialog').addEventListener('close',()=>{if(detailOpener?.isConnected)detailOpener.focus({preventScroll:true});});
function closeDetail(){if(isExplorer){$('detail-dialog').close();return;}if(state.selectedCell||state.selectedRelation)setState({selectedCell:null,selectedRelation:null});else $('detail-dialog').close();}
$('detail-dialog').addEventListener('cancel',e=>{e.preventDefault();closeDetail();});
window.addEventListener('popstate',()=>{state=readUrlState();canonicalizeSelectionUrl();if($('search-dialog').open)$('search-dialog').close();renderState();revealReference();});
window.addEventListener('hashchange',revealReference);
$('home-page').hidden=isReferences;$('references-page').hidden=!isReferences;
document.querySelector(`[data-nav="${pageName}"]`).classList.add('active');
document.body.dataset.page=pageName;
const pageTitles={home:'小鼠神经发育图谱',atlas:'发育图谱',lineage:'细胞关系',references:'参考文献'};
document.title=pageTitles[pageName]+' · Mouse Neurodevelopment Atlas';
document.querySelector('[data-nav="'+pageName+'"]').setAttribute('aria-current','page');
$('page-intro').hidden=!['atlas','lineage'].includes(pageName);
$('page-title').textContent=pageTitles[pageName];
$('page-description').textContent=pageName==='atlas'?'沿时间与细胞关系探索小鼠皮层神经发育。':'从祖细胞出发，探索不同细胞状态与分化方向。';
renderReferences();renderState();
if(isReferences)revealReference();


if($('home-reading-list'))$('home-reading-list').innerHTML=papers.slice(0,3).map(p=>`<a href="/references/#ref-${p.id}"><h3>${p.title}</h3><p>${p.authors}</p><small>${p.journal} · ${p.year}</small></a>`).join('');
