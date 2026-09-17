# 小鼠神经发育图谱

面向学习与文献整理的交互式网站，以发育时间轴连接小鼠皮层的细胞状态、发育关系和参考文献。

## 当前功能

- E10.5–E18.5、P1、P4 共 11 个时期的点击切换。
- 当前时期的中文概览、学习要点和证据类型。
- 可点击的简化细胞关系图及 marker 详情。
- 时期、细胞和参考文献搜索。
- 独立的 References 页面、原文 DOI 链接及引用复制。
- 桌面和手机布局。

## 本地运行

网站使用原生 HTML、CSS 和 JavaScript，无需安装前端依赖。在仓库根目录运行：

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

浏览器打开 `http://127.0.0.1:8765/`，文献页位于 `/references/`。

## 内容与文件

`dist/app.js` 保存时期和细胞内容及交互逻辑；`dist/style.css` 定义样式。`dist/index.html` 与 `dist/references/index.html` 使用同一份页面结构，修改时需要同步。更多说明见 [网站说明.md](网站说明.md)。

首批文献为 Di Bella 等（2021），*Molecular logic of cellular diversification in the mouse cerebral cortex*，DOI：[10.1038/s41586-021-03670-5](https://doi.org/10.1038/s41586-021-03670-5)。后续文献独立收录，网站不以单篇研究命名。

当前内容聚焦未来体感皮层，尚不代表整个神经系统。本文没有 P0 样本；首次检测时间不等于细胞产生时间，计算轨迹也不等于实验谱系追踪。封面为 AI 生成概念插图，不是精确孕龄或解剖参考。

仓库不包含论文 PDF、原始测序数据、临时部署包或访问凭据。
