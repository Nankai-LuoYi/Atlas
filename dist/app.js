// 内容依据 Di Bella 等 2021 正文及 Fig. 1–3；观察时间不等同于细胞出生时间。
const stages = ['E10.5','E11.5','E12.5','E13.5','E14.5','E15.5','E16.5','E17.5','E18.5','P1','P4'];
const ref = '<a href="/references/#ref-1">[1] Di Bella et al., 2021</a>';
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
let currentStage = stages.includes(new URLSearchParams(location.search).get('stage')) ? new URLSearchParams(location.search).get('stage') : 'E13.5';
const $=id=>document.getElementById(id);
function evidence(stage){const list=['scRNA-seq'];if(['E12.5','E13.5','E15.5','P1'].includes(stage))list.push('Slide-seq v2');if(['E13.5','E15.5','E18.5'].includes(stage))list.push('scATAC-seq');return list;}
function renderStage(stage, updateUrl=false){
 currentStage=stage;const d=stageData[stage];
 $('stage-buttons').innerHTML=stages.map((s,i)=>`<button class="stage-button ${s[0]==='P'?'post ':''}${s===stage?'active':''}" data-stage="${s}" aria-pressed="${s===stage}" aria-label="${s}，${stageData[s].title}"><span class="stage-symbol" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><span class="stage-point"></span><span>${s}</span></button>`).join('');
 $('stage-badge').textContent=stage;$('stage-title').textContent=d.title;$('stage-description').textContent=d.description;
 $('evidence-tags').innerHTML=evidence(stage).map(s=>`<span>${s}</span>`).join('');
 $('stage-boundary').textContent='证据范围：未来体感皮层 · 本研究采样与推断';
 $('stage-events').innerHTML=d.events.map((e,i)=>`<div class="event"><span class="event-index">0${i+1}</span><div><h3>${e[0]}</h3><p>${e[1]}</p></div></div>`).join('');
 $('previous-stage').disabled=stage===stages[0];$('next-stage').disabled=stage===stages.at(-1);
 if(updateUrl){history.replaceState(null,'',`/?stage=${encodeURIComponent(stage)}#timeline`);document.querySelector('.stage-button.active').scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}
}
function showDetail(html){$('dialog-content').innerHTML=html;if(!$('detail-dialog').open)$('detail-dialog').showModal();}
function showCell(key){const c=cells[key];showDetail(`<h2>${c.title}</h2><div class="eyebrow">${c.english}</div><div class="evidence-tags">${c.markers.split(' · ').map(x=>`<span>${x}</span>`).join('')}</div><p>${c.text}</p><p>这些 marker 是本文使用或讨论的表达线索，不构成独立、排他的注释规则。</p><p class="dialog-source">${ref} · ${c.figure}</p>`);}
function showCells(){showDetail('<h2>细胞与 marker</h2><p>先理解细胞状态，再理解表达线索。点击查看适用背景。</p><div class="cell-list">'+Object.entries(cells).map(([k,c])=>`<button data-cell="${k}"><span>${c.title}</span><small>${c.markers} ↗</small></button>`).join('')+'</div>');}
function showRegion(){showDetail(`<h2>脑区与空间</h2><div class="eyebrow">SOMATOSENSORY CORTEX</div><p>首批内容聚焦未来体感皮层。其他脑区尚待文献整理，不将皮层结果直接推广到整个神经系统。</p><p>本文在 E12.5、E13.5、E15.5 和 P1 采集冠状脑切片的 Slide-seq v2 数据，并用 Tangram 将年龄匹配的单细胞身份映射到组织位置。</p><p>E15.5 的迁移及未成熟兴奋性神经元被细分为五种状态，映射结果显示它们沿皮层径向轴位于不同位置。</p><p class="dialog-source">${ref} · 正文第 2、7 页；Fig. 2。空间映射结果应与直接组织标记实验区别理解。</p>`);}
$('stage-buttons').addEventListener('click',e=>{const b=e.target.closest('[data-stage]');if(b)renderStage(b.dataset.stage,true);});
$('previous-stage').addEventListener('click',()=>renderStage(stages[Math.max(0,stages.indexOf(currentStage)-1)],true));
$('next-stage').addEventListener('click',()=>renderStage(stages[Math.min(stages.length-1,stages.indexOf(currentStage)+1)],true));
document.addEventListener('click',e=>{const cell=e.target.closest('[data-cell]');if(cell){if($('search-dialog').open)$('search-dialog').close();showCell(cell.dataset.cell);}if(e.target.closest('.dialog-close'))e.target.closest('dialog').close();});
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
$('open-cells').addEventListener('click',showCells);$('open-region').addEventListener('click',showRegion);$('reference-space').addEventListener('click',showRegion);
$('lineage-info').addEventListener('click',()=>showDetail(`<h2>这张关系图表达什么？</h2><p>它是基于本文皮层细胞轨迹组织的简化学习示意，不是完整谱系树。顶端祖细胞、中间祖细胞和投射神经元用于说明神经发生相关状态；另一侧展示胶质相关的转录状态变化。</p><p>分支不与某个胚胎日一一对应，也不表示所有细胞都经过图中的全部节点。本文的 URD 轨迹基于转录相似性和拟时序，不能等同于实验谱系追踪。</p><p>腹侧来源中间神经元、微胶质、血管及脑膜等细胞未被放入这张简图；“未画出”不代表“没有”。</p><p class="dialog-source">${ref} · Fig. 3 与正文第 2–3 页。</p>`));
const citation='Di Bella DJ, Habibi E, Stickels RR, et al. Molecular logic of cellular diversification in the mouse cerebral cortex. Nature. 2021;595:554–559. doi:10.1038/s41586-021-03670-5.';
$('copy-citation').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(citation);$('copy-status').textContent='引用已复制';}catch{showDetail('<h2>复制引用</h2><p>浏览器未允许自动复制，可选中以下文字复制。</p><p>'+citation+'</p>');}});
function renderSearch(){const q=$('search-input').value.trim().toLowerCase();let results=[];for(const s of stages){if(!q||(s+' '+stageData[s].title).toLowerCase().includes(q))results.push(`<a href="/?stage=${s}#timeline">${s} · ${stageData[s].title}<small>发育时期</small></a>`);}for(const [k,c] of Object.entries(cells)){if(q&&(c.title+' '+c.english+' '+c.markers).toLowerCase().includes(q))results.push(`<button data-cell="${k}">${c.title}<small>${c.markers}</small></button>`);}if(q&&('di bella nature 2021 molecular logic cellular cortex 皮层 参考文献').includes(q))results.push('<a href="/references/#ref-1">Di Bella 等 · Molecular logic of cellular diversification…<small>参考文献 · Nature 2021</small></a>');$('search-results').innerHTML=results.slice(0,12).join('')||'<p>尚未收录匹配内容。可以搜索 E13.5、祖细胞或 Sox2。</p>';}
function openSearch(){if($('detail-dialog').open)$('detail-dialog').close();$('search-dialog').showModal();renderSearch();$('search-input').focus();}
$('open-search').addEventListener('click',openSearch);$('search-input').addEventListener('input',renderSearch);
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!document.querySelector('dialog[open]')){e.preventDefault();openSearch();}});
const isReferences=location.pathname.startsWith('/references');$('home-page').hidden=isReferences;$('references-page').hidden=!isReferences;
document.querySelector(`[data-nav="${isReferences?'references':'home'}"]`).classList.add('active');
if(isReferences)document.title='References · 小鼠神经发育图谱';
renderStage(currentStage);
