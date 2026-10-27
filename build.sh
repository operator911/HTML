#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

npx --yes esbuild src/app.js --bundle --format=iife --target=es2020 \
  --outfile=v8-engine.bundle.js \
  --alias:three=./vendor/three/three.module.js \
  --alias:three/addons/controls/OrbitControls.js=./vendor/three/addons/controls/OrbitControls.js \
  --alias:three/addons/geometries/RoundedBoxGeometry.js=./vendor/three/addons/geometries/RoundedBoxGeometry.js \
  --alias:three/addons/utils/BufferGeometryUtils.js=./vendor/three/addons/utils/BufferGeometryUtils.js \
  --alias:three/addons/environments/RoomEnvironment.js=./vendor/three/addons/environments/RoomEnvironment.js

python3 - <<'PY'
from pathlib import Path
html_path = Path('v8-engine.html')
html = html_path.read_text()
js = Path('v8-engine.bundle.js').read_text()
marker = '<script>\n/* Bundled Three.js r160'
if marker in html:
    start = html.index(marker)
    end = html.index('</script>', start)
    html = html[:start] + '<script>\n/* Bundled Three.js r160 + V8 dynamometer application. Source in ./src. */\n' + js + '\n</script>' + html[end + len('</script>'):]
else:
    old = '<script src="./v8-engine.bundle.js"></script>'
    if old not in html:
        raise SystemExit('Could not find the application script tag in v8-engine.html')
    html = html.replace(old, '<script>\n/* Bundled Three.js r160 + V8 dynamometer application. Source in ./src. */\n' + js + '\n</script>')
html_path.write_text(html)
print(f'Inlined bundle: {len(html):,} bytes')
PY

echo "Built v8-engine.html"
