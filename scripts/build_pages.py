"""为 GitHub Pages 子目录生成发布副本，保留 dist 的原站点版本。"""
import argparse
import re
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--base-path', default='/Atlas')
parser.add_argument('--output', default='.pages-output')
args = parser.parse_args()
base = '/' + args.base_path.strip('/') if args.base_path.strip('/') else ''
if not re.fullmatch(r'(?:/[A-Za-z0-9_.-]+)*', base):
    raise ValueError('发布路径只能包含英文、数字、下划线、短横线和点')
root = Path(__file__).resolve().parents[1]
source = root / 'dist'
output = (root / args.output).resolve()
if output == source or source in output.parents or output.exists():
    raise ValueError('请使用不存在的独立输出目录，避免覆盖已有文件')

for path in source.rglob('*'):
    if not path.is_file():
        continue
    target = output / path.relative_to(source)
    target.parent.mkdir(parents=True, exist_ok=True)
    if path.suffix not in {'.html', '.css', '.js'}:
        target.write_bytes(path.read_bytes())
        continue
    text = path.read_text(encoding='utf-8')
    # 静态入口与脚本动态生成的站内链接一并添加项目路径。
    text = re.sub(r'((?:href|src)=[\"\'])/(?!/)', lambda m: m[1] + base + '/', text)
    text = re.sub(r'(url\([\"\']?)/(?!/)', lambda m: m[1] + base + '/', text)
    target.write_text(text, encoding='utf-8')
(output / '.nojekyll').write_text('', encoding='utf-8')
print('GitHub Pages 发布副本已生成：' + str(output))
