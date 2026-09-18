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

const $=id=>document.getElementById(id);
const params=new URLSearchParams(location.search);
const isReferences=location.pathname.startsWith('/references');
let currentStage=stages.includes(params.get('stage'))?params.get('stage'):'E13.5';
let currentView=Object.hasOwn(relationshipViews,params.get('view'))?params.get('view'):'trajectory';
let referenceFilter=['timeline','glia','opc','comparative'].includes(params.get('topic'))?params.get('topic'):'all';
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paperById=id=>papers.find(p=>p.id===id);
const sourceLinks=ids=>ids.map(id=>`<a href="/references/#ref-${id}">[${id}] ${paperById(id).short}</a>`).join(' · ');
const noteButton=(key,label='查看实验与边界')=>`<button class="evidence-link" data-evidence="${key}">${label} ↗</button>`;
function updateUrl(hash){const url=new URL(location.href);url.pathname='/';url.searchParams.set('stage',currentStage);url.searchParams.set('view',currentView);url.searchParams.delete('cell');url.hash=hash;history.replaceState(null,'',url);}
function evidence(stage){if(stage==='P0')return ['组织表达观察','群体谱系追踪','基因干预（独立条件）'];const list=['scRNA-seq'];if(['E12.5','E13.5','E15.5','P1'].includes(stage))list.push('Slide-seq v2');if(['E13.5','E15.5','E18.5'].includes(stage))list.push('scATAC-seq');return list;}
function renderStage(stage,update=false){
 currentStage=stage;const d=stageData[stage];
 $('stage-buttons').innerHTML=stages.map((s,i)=>`<button class="stage-button ${s[0]==='P'?'post ':''}${s==='P0'?'independent ':''}${s===stage?'active':''}" data-stage="${s}" aria-pressed="${s===stage}" aria-label="${s}，${stageData[s].title}${s==='P0'?'，独立文献证据':''}"><span class="stage-symbol" aria-hidden="true">${s==='P0'?'✦':String(i+1).padStart(2,'0')}</span><span class="stage-point"></span><span>${s}</span></button>`).join('');
 $('stage-badge').textContent=stage;$('stage-title').textContent=d.title;$('stage-description').textContent=d.description;
 $('stage-citations').innerHTML=(d.refs||[1]).map(id=>`<a href="/references/#ref-${id}" aria-label="参考文献 ${id}">[${id}]</a>`).join(' ');
 $('evidence-tags').innerHTML=evidence(stage).map(s=>`<span>${s}</span>`).join('');
 $('stage-boundary').innerHTML=stage==='P0'?'小鼠皮层 · 来源 [2][3] · 标记与观察时间分开；本节点不提供 P0 scRNA-seq。':'基础来源：[1] Di Bella 2021 · 未来体感皮层。此卡中的“本文/本研究”均指该文。';
 $('stage-events').innerHTML=d.events.map((e,i)=>`<div class="event"><span class="event-index">0${i+1}</span><div><h3>${e[0]}</h3><p>${e[1]}</p><div class="event-source">${sourceLinks(e[2]?evidenceNotes[e[2]].refs:[1])} ${e[2]?noteButton(e[2]):''}</div></div></div>`).join('');
 $('stage-context').innerHTML=stage==='P0'?'<strong>读图提示</strong> 三条内容来自不同实验，不代表同一批动物。':'<strong>读图提示</strong> 首次检测 ≠ 首次产生。'+noteButton('trajectory','了解证据类型');
 $('previous-stage').disabled=stage===stages[0];$('next-stage').disabled=stage===stages.at(-1);
 if(update)updateUrl('timeline');
 requestAnimationFrame(()=>{const b=document.querySelector('.stage-button.active');$('stage-buttons').scrollLeft=b.offsetLeft-($('stage-buttons').clientWidth-b.offsetWidth)/2;});
}
function showDetail(html){if($('search-dialog').open)$('search-dialog').close();$('dialog-content').innerHTML=html;$('detail-dialog').scrollTop=0;if(!$('detail-dialog').open)$('detail-dialog').showModal();else $('detail-dialog').querySelector('.dialog-close').focus();}
function showEvidence(key){const e=evidenceNotes[key];if(!e)return;showDetail(`<div class="eyebrow">EVIDENCE NOTES</div><h2>${e.title}</h2><div class="evidence-tags"><span>${e.type}</span><span>${e.species}</span></div><p>${e.finding}</p><dl class="evidence-facts">${[['区域',e.region],['标记 / 干预',e.label],['取材 / 观察',e.readout],['实验条件',e.condition],['证据位置',e.location]].map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl><div class="boundary-box"><strong>如何解释</strong><p>${e.limit}</p></div><p class="dialog-source">${sourceLinks(e.refs)}</p>`);}
function showCell(key){const c=cells[key];if(!c)return;showDetail(`<h2>${c.title}</h2><div class="eyebrow">${c.english}</div><div class="evidence-tags">${c.markers.split(' · ').map(x=>`<span>${x}</span>`).join('')}</div>${c.figure?'<p class="cell-scope">基础条目：[1] Di Bella 2021 · 未来体感皮层；其他来源作为补充。</p>':''}<p>${c.text}</p><p class="fine-print">marker 需结合物种、时期、区域和其他证据；功能命名也不能替代细胞身份验证。</p><div class="note-list">${c.notes.map(k=>noteButton(k,evidenceNotes[k].title)).join('')}</div><p class="dialog-source">${sourceLinks(c.refs)}${c.figure?`<br>[1] ${c.figure}`:''}</p>`);}
function showCells(){showDetail('<h2>细胞与 marker</h2><p>先理解细胞状态，再理解表达线索。新增的 RG 类型采用作者的功能命名。</p><div class="cell-list">'+Object.entries(cells).map(([k,c])=>`<button data-cell="${k}"><span>${c.title}</span><small>${c.english} ↗</small></button>`).join('')+'</div>');}
function showRegion(){showDetail(`<h2>脑区与空间</h2><div class="eyebrow">CORTEX · ORIGIN · DESTINATION</div><p>时间轴基础研究聚焦未来体感皮层；新增研究的皮层区域和实验条件另外标注，不直接推广到整个神经系统。</p><p>Di Bella 在 E12.5、E13.5、E15.5、P1 使用 Slide-seq v2，并用 Tangram 将年龄匹配的细胞身份映射到组织位置。${sourceLinks([1])}</p><p>Zhang 的小鼠模型讨论室管膜方向与 Tri-IPC 方向的区域差异。Fig. 7 同时含人图示；本站模型仅展示小鼠框架。${sourceLinks([2])}</p><p>OPC 的“来源区域”与“后来所在位置”分开；OBIN 的目标是嗅球，不是皮层。雪貂与人的 oRG/OSVZ 结果保留在文献页，不套用小鼠日龄。</p>${noteButton('opcOrigin','查看 OPC 来源证据')}`);}
const node=(key,label)=>`<button class="graph-node" data-cell="${key}"><strong>${label||cells[key].title}</strong><small>${cells[key].english}</small></button>`;
const arrow=key=>`<button class="graph-arrow" data-evidence="${key}" aria-label="查看这条关系的证据">↓ <span>证据</span></button>`;
function renderRelationships(view,update=false){
 currentView=view;const v=relationshipViews[view];
 $('relationship-tabs').innerHTML=Object.entries(relationshipViews).map(([k,x])=>`<button role="tab" id="tab-${k}" aria-controls="relationship-panel" aria-selected="${k===view}" tabindex="${k===view?0:-1}" data-view="${k}">${x.name}</button>`).join('');
 $('relationship-panel').setAttribute('aria-labelledby',`tab-${view}`);
 $('relationship-intro').textContent=v.intro;
 let graph='';
 if(view==='trajectory')graph=`<div class="graph-root">${node('ap')}</div><div class="graph-columns two"><div class="graph-column">${arrow('trajectory')}${node('ip')}${arrow('trajectory')}${node('pn')}</div><div class="graph-column lavender">${arrow('trajectory')}${node('glia')}${arrow('trajectory')}${node('astro')}</div></div>`;
 if(view==='rg')graph=`<div class="model-kicker">小鼠皮层 RG · 按作者框架分为三个方向</div><div class="graph-columns three"><div class="graph-column">${node('nrg','N-RG · 神经发生')}${arrow('rgModel')}${node('pynipc','PyN-IPC')}${arrow('rgModel')}${node('pn')}</div><div class="graph-column sand">${node('erg','E-RG · 室管膜方向')}${arrow('rgModel')}${node('ependymal')}</div><div class="graph-column lavender">${node('trg','T-RG · Tri-IPC 方向')}${arrow('rgModel')}${node('tri','Tri-IPC')}<span class="branch-continuation">下方展开三条分支 ↓</span></div></div><div class="tri-branches"><p>Tri-IPC 下游 · 包含胶质与嗅球神经元方向</p><div class="graph-columns three"><div class="graph-column lavender">${arrow('rgModel')}${node('apc','APC')}${arrow('rgModel')}${node('astro')}</div><div class="graph-column lavender">${arrow('rgModel')}${node('opc','OPC')}${arrow('rgModel')}${node('ol')}</div><div class="graph-column sand">${arrow('rgModel')}${node('obinipc','OBIN-IPC')}${arrow('rgModel')}${node('obin')}<span class="destination">目标脑区：嗅球</span></div></div></div><div class="model-footer">${noteButton('signals','ERK / PKA / YAP / SHH 如何参与')}</div>`;
 if(view==='opc')graph=`<div class="origin-grid"><article><span class="origin-label">DORSAL ORIGIN</span>${node('dorsal')}<p>胚胎期已经启动，不能统一从 P0 起算。</p>${noteButton('opcEmbryo','时间依据')}</article><article><span class="origin-label">VENTRAL ORIGIN</span>${node('ventral')}<p>当前证据仅覆盖部分来源，不包含 Gsh2 来源 vOPC。</p>${noteButton('opcOrigin','实验范围')}</article></div><div class="origin-shared"><strong>来源 ≠ 当前位置</strong><p>同一区域的 OPC 可以具有不同发育来源。此处不绘制未被本研究验证的完整迁移路线。</p></div><details class="damage-details"><summary>扩展阅读：DNA 损伤下的不同反应</summary><p>Cit-k 缺失或顺铂处理属于干预实验，不能放入正常发育时间轴。</p>${noteButton('opcDamage','查看干预条件')}</details>`;
 $('relationship-graph').innerHTML=graph;
 $('relationship-source').innerHTML=`<span>${v.tag} · ${evidenceNotes[v.note].type}</span>${noteButton(v.note,'如何读这张图')}`;
 if(update)updateUrl('lineage');
}
function renderReferences(){
 const q=$('reference-search').value.trim().toLowerCase();
 const list=papers.filter(p=>(referenceFilter==='all'||p.topics.includes(referenceFilter))&&`${p.title} ${p.authors} ${p.journal} ${p.year} ${p.doi} ${p.tags.join(' ')} ${p.summary}`.toLowerCase().includes(q));
 $('reference-count').textContent=`${list.length} / ${papers.length}`;
 $('reference-list').innerHTML=list.map(p=>`<article class="reference-detail panel" id="ref-${p.id}" tabindex="-1"><div class="paper-meta"><span>[${p.id}] ${p.journal} · ${p.year}</span><span>${p.id===5?'在线追溯原始研究':'正文与关键图已核对'}</span></div><h2>${p.title}</h2><p class="authors">${p.authors}</p><p class="citation-line">${p.journal} ${p.volume} (${p.year}) · DOI: ${p.doi}</p><div class="paper-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><p>${p.summary}</p><div class="reference-facts">${p.facts.map(([k,v])=>`<div><small>${k}</small><strong>${v}</strong></div>`).join('')}</div><h3>本站关联内容</h3><div class="source-links">${p.links.map(([t,u])=>`<a href="${u}">${t} →</a>`).join('')}</div><details><summary>阅读范围与使用边界</summary><p>${p.boundary}</p></details><div class="reference-actions"><a class="primary" href="https://doi.org/${p.doi}" target="_blank" rel="noopener noreferrer">前往原文 ↗</a><button class="secondary" data-copy="${p.id}">复制引用</button><span class="copy-status" id="copy-status-${p.id}" role="status"></span></div></article>`).join('')||'<div class="empty-state"><h2>没有匹配的文献</h2><p>试试 Eomes、OPC 或作者姓名，也可以清除筛选。</p><button class="secondary" id="reset-references">显示全部文献</button></div>';
 document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.filter===referenceFilter));
}
function revealReference(){if(!isReferences||!/^#ref-\d+$/.test(location.hash))return;const id=Number(location.hash.slice(5));if(!paperById(id))return;referenceFilter='all';$('reference-search').value='';renderReferences();requestAnimationFrame(()=>$(location.hash.slice(1)).scrollIntoView({block:'start',behavior:'instant'}));}
function renderSearch(){
 const q=$('search-input').value.trim().toLowerCase();let results=[];
 for(const s of stages){if(!q||`${s} ${stageData[s].title}`.toLowerCase().includes(q))results.push(`<a href="/?stage=${s}#timeline">${s} · ${stageData[s].title}<small>发育时期${s==='P0'?' · 独立文献证据':''}</small></a>`);}
 if(q){for(const [k,c] of Object.entries(cells)){if(`${c.title} ${c.english} ${c.markers} ${c.text}`.toLowerCase().includes(q))results.push(`<button data-cell="${k}">${c.title}<small>${c.english}</small></button>`);}
 for(const p of papers){if(`${p.short} ${p.title} ${p.authors} ${p.doi} ${p.tags.join(' ')} ${p.summary}`.toLowerCase().includes(q))results.push(`<a href="/references/#ref-${p.id}">${p.short} · ${p.title}<small>参考文献 [${p.id}] · ${p.tags.join(' / ')}</small></a>`);}}
 $('search-results').innerHTML=results.join('')||'<p>尚未收录匹配内容。可以搜索 P0、Eomes、OPC 或作者姓名。</p>';
}
function openSearch(){if($('detail-dialog').open)$('detail-dialog').close();if(!$('search-dialog').open)$('search-dialog').showModal();renderSearch();$('search-input').focus();}
$('stage-buttons').addEventListener('click',e=>{const b=e.target.closest('[data-stage]');if(b)renderStage(b.dataset.stage,true);});
$('previous-stage').addEventListener('click',()=>renderStage(stages[Math.max(0,stages.indexOf(currentStage)-1)],true));
$('next-stage').addEventListener('click',()=>renderStage(stages[Math.min(stages.length-1,stages.indexOf(currentStage)+1)],true));
$('relationship-tabs').addEventListener('keydown',e=>{const keys=Object.keys(relationshipViews);if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const i=keys.indexOf(currentView);const next=e.key==='Home'?0:e.key==='End'?keys.length-1:(i+(e.key==='ArrowRight'?1:-1)+keys.length)%keys.length;renderRelationships(keys[next],true);$(`tab-${keys[next]}`).focus();}});
// 动态文献、关系图和弹窗使用委托事件，避免筛选后按钮失效。
document.addEventListener('click',async e=>{
 const cell=e.target.closest('[data-cell]');if(cell)showCell(cell.dataset.cell);
 const note=e.target.closest('[data-evidence]');if(note)showEvidence(note.dataset.evidence);
 const view=e.target.closest('[data-view]');if(view)renderRelationships(view.dataset.view,true);
 const filter=e.target.closest('[data-filter]');if(filter){referenceFilter=filter.dataset.filter;renderReferences();}
 if(e.target.closest('#reset-references')){referenceFilter='all';$('reference-search').value='';renderReferences();}
 const copy=e.target.closest('[data-copy]');if(copy){const p=paperById(Number(copy.dataset.copy));const citation=`${p.authors} ${p.title}. ${p.journal}. ${p.year};${p.volume}. doi:${p.doi}.`;try{await navigator.clipboard.writeText(citation);$(`copy-status-${p.id}`).textContent='引用已复制';}catch{showDetail(`<h2>复制引用</h2><p>浏览器未允许自动复制，可选中下方文字复制。</p><textarea class="citation-text" readonly aria-label="引用文本">${escapeHTML(citation)}</textarea>`);$('dialog-content').querySelector('textarea').select();}}
 if(e.target.closest('.dialog-close'))e.target.closest('dialog').close();
 // 在同页文献锚点导航前关闭弹窗，确保引用目标可见。
 const a=e.target.closest('a[href]');if(a&&a.getAttribute('href').startsWith('/references/#'))document.querySelectorAll('dialog[open]').forEach(d=>d.close());
});
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
$('open-cells').addEventListener('click',showCells);$('open-region').addEventListener('click',showRegion);
$('lineage-info').addEventListener('click',()=>showEvidence(relationshipViews[currentView].note));
$('reference-search').addEventListener('input',renderReferences);
$('open-search').addEventListener('click',openSearch);$('search-input').addEventListener('input',renderSearch);
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!document.querySelector('dialog[open]')){e.preventDefault();openSearch();}});
window.addEventListener('hashchange',revealReference);
$('home-page').hidden=isReferences;$('references-page').hidden=!isReferences;
document.querySelector(`[data-nav="${isReferences?'references':'home'}"]`).classList.add('active');
if(isReferences)document.title='References · 小鼠神经发育图谱';
renderStage(currentStage);renderRelationships(currentView);renderReferences();
if(isReferences)revealReference();
if(!isReferences&&Object.hasOwn(cells,params.get('cell')))showCell(params.get('cell'));
