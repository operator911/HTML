/**
 * Overlay UI: world rail, transport bar, tune panel, info & diagnostics panels,
 * help sheet, toasts. DOM-built (no framework), glassmorphic styling.
 */
import type { Engine, EngineStats, QualityName } from '../core/engine';
import { QUALITY_PRESETS } from '../core/engine';
import type { World } from '../core/world';
import { PALETTES } from '../core/palettes';
import type { ControlSpec } from '../core/controls';
import type { MandelbrotWorld } from '../worlds/mandelbrot';
import type { JuliaWorld } from '../worlds/julia';
import type { FlameWorld } from '../worlds/flame';
import { JULIA_PRESETS } from '../worlds/julia';

const el = (tag: string, cls = ''): HTMLElement => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
};

export class Overlay {
  private root: HTMLElement;
  private rail!: HTMLElement;
  private tuneBody!: HTMLElement;
  private tune!: HTMLElement;
  private infoPanel!: HTMLElement;
  private diag!: HTMLElement;
  private help!: HTMLElement;
  private toastEl!: HTMLElement;
  private playBtn!: HTMLButtonElement;
  private palBtn!: HTMLButtonElement;
  private hintEl!: HTMLElement;
  private uiHidden = false;
  private diagOpen = false;
  private toastTimer = 0;

  constructor(
    private engine: Engine,
    private mandelbrot: MandelbrotWorld,
    private julia: JuliaWorld,
    private flame: FlameWorld,
  ) {
    this.root = document.getElementById('ui-root')!;
    this.build();
    engine.onStats = (s) => this.updateStats(s);
    engine.onNotify = (m) => this.toast(m);
    engine.onPaletteChange = () => this.updatePaletteBtn();
    engine.onInfoChange = () => this.refreshInfo();
    window.addEventListener('pointermove', () => this.wake());
  }

  private build(): void {
    const e = this.engine;

    // Brand
    const brand = el('div', 'brand');
    brand.innerHTML =
      '<div class="t">Fractal Odyssey</div>' +
      '<div class="s">Swift1.5-<b>Qwen3.8</b>-Flash-Next Edition</div>';
    this.root.appendChild(brand);

    // World rail
    this.rail = el('nav', 'rail glass');
    const worlds = e.worldList();
    worlds.forEach((w, i) => {
      const b = el('button', 'world');
      b.innerHTML =
        `<span class="wt"><span class="num">${i + 1}</span>${esc(w.info.title)}</span>` +
        `<span class="wg">${esc(w.info.tag)}</span>`;
      b.addEventListener('click', () => e.switchTo(w.info.id));
      this.rail.appendChild(b);
    });
    this.root.appendChild(this.rail);

    // Toolbar (top right)
    const tb = el('div', 'toolbar glass');
    this.palBtn = mkBtn('palette · ' + PALETTES[0].name, 'pal-name');
    this.palBtn.addEventListener('click', () => e.setPalette(e.paletteIndex + 1));
    tb.appendChild(this.palBtn);
    const mkTool = (label: string, fn: () => void) => {
      const b = mkBtn(label);
      b.addEventListener('click', fn);
      tb.appendChild(b);
    };
    mkTool('ⓘ info', () => this.toggleInfo());
    mkTool('⌗ stats', () => this.toggleDiag());
    mkTool('? keys', () => this.toggleHelp());
    mkTool('⛶', () => this.fullscreen());
    this.root.appendChild(tb);

    // Transport (bottom center)
    const tr = el('div', 'transport glass');
    this.playBtn = mkBtn('⏸', '');
    this.playBtn.title = 'Pause / resume motion (Space)';
    this.playBtn.addEventListener('click', () => this.togglePlay());
    tr.appendChild(this.playBtn);

    const spd = el('div', '');
    spd.style.display = 'flex';
    spd.style.alignItems = 'center';
    spd.style.gap = '6px';
    const spdL = el('span', 'tlabel'); spdL.textContent = 'speed';
    const spdR = mkRange(0.1, 3, 0.05, 1);
    spdR.addEventListener('input', () => { e.speed = spdR.valueAsNumber; });
    spd.appendChild(spdL); spd.appendChild(spdR);
    tr.appendChild(spd);

    tr.appendChild(separator());

    const tour = mkBtn('⟡ tour', '');
    tour.title = 'Cinematic autoplay (T)';
    tour.addEventListener('click', () => {
      e.autoplay = !e.autoplay;
      e.notify(e.autoplay ? 'Cinematic tour resumed after idle' : 'Cinematic tour off');
      tour.style.color = e.autoplay ? '' : 'var(--ink-faint)';
    });
    tr.appendChild(tour);

    const surprise = mkBtn('✦ Surprise Me', 'tbtn primary');
    surprise.addEventListener('click', () => this.surprise());
    tr.appendChild(surprise);

    tr.appendChild(separator());

    const shot = mkBtn('📷', '');
    shot.title = 'Screenshot (P)';
    shot.addEventListener('click', () => this.screenshot());
    tr.appendChild(shot);

    const hide = mkBtn('◧', '');
    hide.title = 'Hide UI (H)';
    hide.addEventListener('click', () => this.setHidden(true));
    tr.appendChild(hide);

    this.root.appendChild(tr);

    // Tune panel
    this.tune = el('div', 'tune glass');
    const th = el('div', 'thead');
    th.innerHTML = '<span>Tune</span><span>▾</span>';
    th.addEventListener('click', () => this.tune.classList.toggle('collapsed'));
    this.tuneBody = el('div', 'tbody');
    this.tune.appendChild(th);
    this.tune.appendChild(this.tuneBody);
    this.root.appendChild(this.tune);

    // Info panel
    this.infoPanel = el('div', 'panel glass');
    this.root.appendChild(this.infoPanel);

    // Diagnostics
    this.diag = el('div', 'diag glass');
    this.root.appendChild(this.diag);

    // Help
    this.help = el('div', 'help');
    const card = el('div', 'card glass');
    card.innerHTML = HELP_HTML;
    const closeHelp = () => this.help.classList.remove('open');
    card.addEventListener('click', closeHelp);
    this.help.appendChild(card);
    this.help.addEventListener('click', closeHelp);
    this.root.appendChild(this.help);

    // Toast + hint
    this.toastEl = el('div', 'toast glass');
    this.root.appendChild(this.toastEl);
    this.hintEl = el('div', 'hint');
    this.hintEl.textContent = 'drag · scroll · space pauses · ? for keys';
    this.root.appendChild(this.hintEl);
    setTimeout(() => { this.hintEl.style.opacity = '0'; }, 14000);

    this.refreshWorld();
  }

  // ------------------------------------------------------------ behavior

  refreshWorld(): void {
    const e = this.engine;
    [...this.rail.children].forEach((c, i) => {
      c.classList.toggle('active', e.worldIds()[i] === e.activeId);
    });
    this.buildTune();
    this.refreshInfo();
  }

  private buildTune(): void {
    const e = this.engine;
    this.tuneBody.innerHTML = '';
    const w: World | null = e.active;
    if (!w) return;

    // Quality row
    const q = el('div', 'ctrl');
    q.innerHTML = '<div class="row"><label>Quality</label><span class="v" id="qval"></span></div>';
    const row = el('div', 'quality-row');
    (Object.keys(QUALITY_PRESETS) as QualityName[]).forEach((k) => {
      const b = el('button', 'qbtn' + (e.quality === k ? ' active' : ''));
      b.textContent = QUALITY_PRESETS[k].label;
      b.addEventListener('click', () => {
        e.setQuality(k);
        [...row.children].forEach((c) => c.classList.remove('active'));
        b.classList.add('active');
        this.buildTune();
      });
      row.appendChild(b);
    });
    q.appendChild(row);
    this.tuneBody.appendChild(q);

    const auto = mkToggle('Auto-render scale', e.autoQuality, (v) => { e.setAutoQuality(v); });
    this.tuneBody.appendChild(auto);

    const bloom = mkToggle('Bloom glow', w.bloom.enabled, (v) => {
      w.bloom.enabled = v; e.applyBloom();
    });
    this.tuneBody.appendChild(bloom);

    const bs = mkSlider({
      key: 'bloom', label: 'Bloom strength', min: 0, max: 1.4, step: 0.05,
      get: () => w.bloom.strength,
      set: (v) => { w.bloom.strength = v; e.applyBloom(); },
    });
    this.tuneBody.appendChild(bs);

    for (const c of w.controls()) this.tuneBody.appendChild(mkSlider(c));

    // World-specific quick buttons
    if (w === this.mandelbrot) {
      const b = mkBtn('Julia slice of current c (J)');
      b.style.width = '100%';
      b.addEventListener('click', () => this.mandelbrot.toggleJulia());
      this.tuneBody.appendChild(b);
    }
    if (w === this.julia) {
      const wrap = el('div', 'quality-row');
      wrap.style.marginTop = '4px';
      JULIA_PRESETS.forEach((p, i) => {
        const b = el('button', 'qbtn');
        b.style.flex = '1 1 45%';
        b.textContent = p.name;
        b.addEventListener('click', () => this.julia.applyPreset(i));
        wrap.appendChild(b);
      });
      this.tuneBody.appendChild(wrap);
      this.tuneBody.appendChild(
        mkToggle('Choreographed c-path', true, () => this.julia.toggleCPath())
      );
    }
    if (w === this.flame) {
      const b = mkBtn('Next attractor (A)');
      b.style.width = '100%';
      b.addEventListener('click', () => this.flame.setAttractor(this.flameIdx(1)));
      this.tuneBody.appendChild(b);
    }
  }

  private flameIdx(d: number): number {
    return this.flame.attractorIndex() + d;
  }

  refreshInfo(): void {
    const w = this.engine.active;
    if (!w) return;
    const i = w.info;
    this.infoPanel.innerHTML =
      `<button class="tbtn x" aria-label="close">✕</button>` +
      `<h2>${esc(i.title)}</h2><div class="kind">${esc(i.tag)}</div>` +
      `<pre class="eq">${esc(i.equation)}</pre>` +
      `<h3>Why it is interesting</h3><p>${esc(i.about)}</p>` +
      `<h3>What you can adjust</h3><p>${esc(i.params)}</p>`;
    this.infoPanel.querySelector('.x')!.addEventListener('click', () => this.infoPanel.classList.remove('open'));
  }

  toggleInfo(): void {
    this.infoPanel.classList.toggle('open');
    if (this.infoPanel.classList.contains('open')) this.tune.classList.add('collapsed');
  }

  private updatePaletteBtn(): void {
    this.palBtn.textContent = 'palette · ' + PALETTES[this.engine.paletteIndex].name;
  }

  toggleDiag(): void {
    this.diagOpen = !this.diagOpen;
    this.diag.classList.toggle('open', this.diagOpen);
  }

  toggleHelp(): void { this.help.classList.toggle('open'); }
  closeOverlays(): void {
    this.help.classList.remove('open');
    this.infoPanel.classList.remove('open');
  }

  togglePlay(): void {
    const e = this.engine;
    e.paused = !e.paused;
    this.playBtn.textContent = e.paused ? '▶' : '⏸';
  }

  setHidden(v: boolean): void {
    this.uiHidden = v;
    this.root.classList.toggle('hidden', v);
  }

  isHidden(): boolean { return this.uiHidden; }

  fullscreen(): void {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen();
  }

  screenshot(): void {
    const e = this.engine;
    const name = `fractal-odyssey-${e.activeId}-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.png`;
    e.downloadScreenshot(name);
    this.toast('Screenshot saved — ' + name);
  }

  surprise(): void {
    const e = this.engine;
    const list = e.worldList();
    const w = list[Math.floor(Math.random() * list.length)];
    e.setPalette(Math.floor(Math.random() * PALETTES.length));
    if (w.info.id !== e.activeId) {
      e.switchTo(w.info.id);
      setTimeout(() => { w.surprise(Math.random); }, 500);
    } else {
      w.surprise(Math.random);
    }
  }

  toast(msg: string): void {
    this.toastEl.textContent = msg;
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => this.toastEl.classList.remove('show'), 3400);
  }

  private wake(): void {
    this.hintEl.style.opacity = '0';
  }

  private updateStats(s: EngineStats): void {
    if (!this.diagOpen) return;
    const zoom = (this.engine.active as unknown as { zoomDepth?: () => number });
    const depth = typeof zoom.zoomDepth === 'function' ? zoom.zoomDepth() : null;
    const zstr = depth
      ? `<br>zoom <b>×${fmtZoom(depth)}</b>${depth > 1e6 ? ' <span class="warn">(float-pair mode)</span>' : ''}`
      : '';
    this.diag.innerHTML =
      `<b>${s.fps.toFixed(0)}</b> fps · ${s.frameMs.toFixed(1)} ms` +
      `<br>render <b>${s.renderW}×${s.renderH}</b> @${s.pixelRatio.toFixed(2)}× (scale ${(s.autoScale * 100).toFixed(0)}%)` +
      `<br>quality <b>${QUALITY_PRESETS[s.quality].label}</b>${zstr}` +
      `<br>gpu <span style="color:var(--ink-faint)">${esc(shortGpu(s.gpu))}</span>`;
  }
}

// ---------------------------------------------------------------- helpers

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fmtZoom(z: number): string {
  if (z < 1000) return z.toFixed(0);
  const e = Math.log10(z);
  return `10^${e.toFixed(1)}`;
}

function shortGpu(g: string): string {
  return g.length > 64 ? g.slice(0, 61) + '…' : g;
}

function mkBtn(text: string, cls = 'tbtn'): HTMLButtonElement {
  const b = document.createElement('button');
  b.className = cls === 'tbtn' ? 'tbtn' : `tbtn ${cls}`;
  b.textContent = text;
  return b;
}

function separator(): HTMLElement {
  const s = el('span');
  s.className = 'tsep';
  return s;
}

function mkRange(min: number, max: number, step: number, value: number): HTMLInputElement {
  const i = document.createElement('input');
  i.type = 'range';
  i.min = String(min); i.max = String(max); i.step = String(step); i.value = String(value);
  return i;
}

export function mkSlider(c: ControlSpec): HTMLElement {
  const d = el('div', 'ctrl');
  const row = el('div', 'row');
  const l = el('label'); l.textContent = c.label;
  const v = el('span', 'v');
  v.textContent = c.format ? c.format(c.get()) : c.get().toFixed(2);
  row.appendChild(l); row.appendChild(v);
  const r = mkRange(c.min, c.max, c.step, c.get());
  r.addEventListener('input', () => {
    const val = r.valueAsNumber;
    c.set(val);
    v.textContent = c.format ? c.format(c.get()) : c.get().toFixed(2);
  });
  d.appendChild(row); d.appendChild(r);
  return d;
}

function mkToggle(label: string, value: boolean, onChange: (v: boolean) => void): HTMLElement {
  const d = el('div', 'ctrl');
  const row = el('div', 'row');
  const l = el('label'); l.textContent = label;
  const b = el('button', 'qbtn');
  b.style.cssText = 'flex:0 0 62px; padding:3px 8px;';
  const upd = (v: boolean) => {
    b.textContent = v ? 'on' : 'off';
    b.classList.toggle('active', v);
  };
  upd(value);
  b.addEventListener('click', () => {
    const nv = b.textContent !== 'on';
    upd(nv);
    onChange(nv);
  });
  row.appendChild(l); row.appendChild(b);
  d.appendChild(row);
  return d;
}

const HELP_HTML = `
<h2>Fractal Odyssey — controls</h2>
<table>
  <tr><td class="k"><b>Drag</b></td><td>Pan the 2D plane · orbit the 3D camera · rotate the flow (pan with Shift in 3D; Shift+drag moves parameter <i>c</i> in the Julia world)</td></tr>
  <tr><td class="k"><b>Wheel / pinch</b></td><td>Zoom toward the cursor (2D) · dolly (3D) · flow speed (Menger)</td></tr>
  <tr><td class="k"><kbd>1</kbd>…<kbd>7</kbd></td><td>Switch world: Mandelbrot · Julia · Burning Ship · Newton · Mandelbulb · Menger · Flame</td></tr>
  <tr><td class="k"><kbd>Space</kbd></td><td>Pause / resume all motion</td></tr>
  <tr><td class="k"><kbd>T</kbd></td><td>Cinematic tour on/off (auto-resumes ~6 s after you stop touching it)</td></tr>
  <tr><td class="k"><kbd>S</kbd> / <kbd>✦</kbd></td><td>Surprise Me — choreographed random destination + palette</td></tr>
  <tr><td class="k"><kbd>P</kbd></td><td>Save screenshot (PNG)</td></tr>
  <tr><td class="k"><kbd>J</kbd></td><td>Julia slice of the current parameter (Mandelbrot world)</td></tr>
  <tr><td class="k"><kbd>A</kbd></td><td>Next attractor (Flame world)</td></tr>
  <tr><td class="k"><kbd>[</kbd> <kbd>]</kbd></td><td>Colour palette − / +</td></tr>
  <tr><td class="k"><kbd>R</kbd></td><td>Reset camera</td></tr>
  <tr><td class="k"><kbd>I</kbd> / <kbd>D</kbd> / <kbd>?</kbd></td><td>Math info panel · diagnostics · this help</td></tr>
  <tr><td class="k"><kbd>H</kbd></td><td>Hide/show the whole interface (screensaver mode)</td></tr>
  <tr><td class="k"><kbd>F</kbd></td><td>Fullscreen</td></tr>
  <tr><td class="k"><kbd>←</kbd><kbd>→</kbd><kbd>↑</kbd><kbd>↓</kbd> <kbd>+</kbd><kbd>−</kbd></td><td>Pan / zoom with the keyboard</td></tr>
</table>
<p style="margin-top:16px;font-size:11px;color:var(--ink-faint)">
Deep 2D zooms use float-pair (double-float) arithmetic — exact to ≈×10¹³. The animation is a live simulation,
not a captured video: every frame is computed on your GPU.
</p>
`;
