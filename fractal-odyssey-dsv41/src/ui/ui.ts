import { PALETTES, paletteCss } from '../core/palettes';
import { WORLDS, worldMeta, type WorldMeta } from '../worlds';
import type { ParamSpec, QualityId, WorldId } from '../core/types';
import { QUALITY } from '../core/types';

export interface UIActions {
  setWorld(id: WorldId): void;
  setPalette(id: string): void;
  setQuality(q: QualityId): void;
  cycleQuality(): void;
  setSpeed(v: number): void;
  togglePlay(): void;
  nextShot(): void;
  prevShot(): void;
  resetView(): void;
  surprise(): void;
  toggleFullscreen(): void;
  screenshot(): void;
  toggleInfo(): void;
  toggleDiag(): void;
  toggleUI(): void;
  setJuliaC(x: number, y: number): void;
  setParam(key: string, value: number): void;
  resume(): void;
}

const KEY_HELP: [string, string][] = [
  ['Space', 'play / pause'],
  ['← →', 'previous / next movement'],
  ['1 – 7', 'jump to a universe'],
  ['P', 'next palette'],
  ['X', 'surprise me'],
  ['R', 'reset the view'],
  ['F', 'fullscreen'],
  ['S', 'save a screenshot'],
  ['H', 'hide the interface'],
  ['I', 'about this world'],
  ['D', 'diagnostics'],
  ['?', 'this panel'],
];

export class UI {
  private actions: UIActions;
  private world: WorldMeta = WORLDS[0];
  private infoOpen = false;
  private diagOpen = false;
  private padUrl: string | null = null;
  private padDot: HTMLElement | null = null;
  private padC: [number, number] = [-0.123, 0.745];
  private paramSpecs: ParamSpec[] = [];
  private hintTimer: number | null = null;
  private shotTimer: number | null = null;
  private toastTimer: number | null = null;
  private userHidden = false;

  constructor(actions: UIActions) {
    this.actions = actions;
    this.buildWorlds();
    this.buildPalettes();
    this.bind();
    this.setWorld(WORLDS[0]);
    this.hintTimer = window.setTimeout(() => this.hideHint(), 9000);
  }

  private $(sel: string): HTMLElement {
    return document.querySelector(sel) as HTMLElement;
  }

  private buildWorlds(): void {
    const host = this.$('#worlds');
    host.innerHTML = '';
    for (const w of WORLDS) {
      const b = document.createElement('button');
      b.className = 'world-tab';
      b.dataset.world = w.id;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', 'false');
      b.innerHTML = `<span class="num">${w.numeral}</span><span class="nm">${w.short}</span>`;
      b.addEventListener('click', () => this.actions.setWorld(w.id));
      host.appendChild(b);
    }
  }

  private buildPalettes(): void {
    const host = this.$('#palettes');
    host.innerHTML = '';
    for (const p of PALETTES) {
      const b = document.createElement('button');
      b.className = 'swatch';
      b.dataset.palette = p.id;
      b.title = p.name;
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-label', p.name);
      b.setAttribute('aria-checked', 'false');
      b.style.background = paletteCss(p);
      b.addEventListener('click', () => this.actions.setPalette(p.id));
      host.appendChild(b);
    }
  }

  private bind(): void {
    document.addEventListener('click', (ev) => {
      const el = (ev.target as HTMLElement).closest('[data-act]') as HTMLElement | null;
      if (!el) return;
      const act = el.dataset.act!;
      switch (act) {
        case 'info': this.actions.toggleInfo(); break;
        case 'diag': this.actions.toggleDiag(); break;
        case 'shot': this.actions.screenshot(); break;
        case 'fullscreen': this.actions.toggleFullscreen(); break;
        case 'hide': this.actions.toggleUI(); break;
        case 'prev': this.actions.prevShot(); break;
        case 'next': this.actions.nextShot(); break;
        case 'play': this.actions.togglePlay(); break;
        case 'quality': this.actions.cycleQuality(); break;
        case 'reset': this.actions.resetView(); break;
        case 'surprise': this.actions.surprise(); break;
        case 'resume': this.actions.resume(); break;
        default: break;
      }
    });

    const speed = this.$('#speed') as HTMLInputElement;
    speed.addEventListener('input', () => {
      const v = Number(speed.value);
      this.$('#speed-out').textContent = `${v.toFixed(2).replace(/0$/, '')}×`;
      this.actions.setSpeed(v);
    });
  }

  setWorld(meta: WorldMeta): void {
    this.world = meta;
    for (const el of document.querySelectorAll<HTMLElement>('.world-tab')) {
      const on = el.dataset.world === meta.id;
      el.classList.toggle('on', on);
      el.setAttribute('aria-selected', on ? 'true' : 'false');
    }
    this.$('#brand-sub').innerHTML = `<b>${meta.numeral}</b> &nbsp;·&nbsp; ${meta.name}`;
    this.renderInfo();
    this.setJuliaC(this.padC);
    this.renderParams();
  }

  setPalette(id: string): void {
    for (const el of document.querySelectorAll<HTMLElement>('.swatch')) {
      const on = el.dataset.palette === id;
      el.classList.toggle('on', on);
      el.setAttribute('aria-checked', on ? 'true' : 'false');
    }
  }

  setQuality(q: QualityId): void {
    this.$('#quality').textContent = QUALITY[q].label;
  }

  setPlaying(playing: boolean): void {
    const btn = document.querySelector('[data-act="play"]') as HTMLElement;
    const pause = btn.querySelector('.i-pause') as HTMLElement;
    const play = btn.querySelector('.i-play') as HTMLElement;
    pause.style.display = playing ? '' : 'none';
    play.style.display = playing ? 'none' : '';
    btn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    btn.title = playing ? 'Pause — Space' : 'Play — Space';
  }

  setShot(name: string): void {
    const el = this.$('#shot-name');
    el.textContent = name;
    el.classList.add('show');
    if (this.shotTimer) window.clearTimeout(this.shotTimer);
    this.shotTimer = window.setTimeout(() => el.classList.remove('show'), 4200);
  }

  setDiag(rows: [string, string][]): void {
    const dl = this.$('#diag-body');
    dl.innerHTML = rows
      .map(([k, v]) => `<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`)
      .join('');
  }

  setParams(specs: ParamSpec[]): void {
    this.paramSpecs = specs;
    this.renderParams();
  }

  /** Update slider positions without rebuilding the DOM (used while the film plays). */
  syncParams(specs: ParamSpec[]): void {
    this.paramSpecs = specs;
    const host = document.getElementById('world-params');
    if (!host) return;
    for (const input of host.querySelectorAll<HTMLInputElement>('input')) {
      const spec = specs.find((s) => s.key === input.dataset.param);
      if (!spec) continue;
      if (document.activeElement !== input) input.value = String(spec.value);
      const out = input.parentElement?.querySelector('output');
      if (out) out.textContent = spec.format ? spec.format(spec.value) : spec.value.toFixed(2);
    }
  }

  private renderParams(): void {
    const host = document.getElementById('world-params');
    if (!host) return;
    const specs = this.paramSpecs;
    host.innerHTML = specs
      .map(
        (s) => `<label class="param">
          <span class="param-label">${escapeHtml(s.label)}</span>
          <input type="range" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.value}" data-param="${s.key}" aria-label="${escapeHtml(s.label)}" />
          <output>${s.format ? s.format(s.value) : s.value.toFixed(2)}</output>
        </label>`,
      )
      .join('');
    for (const input of host.querySelectorAll<HTMLInputElement>('input')) {
      input.addEventListener('input', () => {
        const v = Number(input.value);
        const spec = specs.find((x) => x.key === input.dataset.param);
        const out = input.parentElement?.querySelector('output');
        if (out) out.textContent = spec?.format ? spec.format(v) : v.toFixed(2);
        if (spec) this.actions.setParam(spec.key, v);
      });
    }
  }

  setJuliaC(c: [number, number]): void {    this.padC = c;
    if (!this.padDot) return;
    const u = (c[0] + 2.2) / 3.0;
    const v = (1.3 - c[1]) / 2.6;
    this.padDot.style.left = `${Math.min(1, Math.max(0, u)) * 100}%`;
    this.padDot.style.top = `${Math.min(1, Math.max(0, v)) * 100}%`;
    const label = document.getElementById('pad-c');
    if (label) label.textContent = `${c[0].toFixed(4)} ${c[1] < 0 ? '−' : '+'} ${Math.abs(c[1]).toFixed(4)} i`;
  }

  toast(msg: string, ms = 2400): void {
    const el = this.$('#toast');
    el.textContent = msg;
    el.classList.add('show');
    if (this.toastTimer) window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => el.classList.remove('show'), ms);
  }

  hideHint(): void {
    this.$('#hint').classList.add('away');
  }

  showResume(show: boolean): void {
    const el = this.$('#resume');
    if (show) el.removeAttribute('hidden');
    else el.setAttribute('hidden', '');
  }

  toggleInfo(force?: boolean): void {
    this.infoOpen = force ?? !this.infoOpen;
    const el = this.$('#info');
    el.classList.toggle('open', this.infoOpen);
    el.setAttribute('aria-hidden', this.infoOpen ? 'false' : 'true');
    (document.querySelector('[data-act="info"]') as HTMLElement).classList.toggle('on', this.infoOpen);
  }

  toggleDiag(force?: boolean): void {
    this.diagOpen = force ?? !this.diagOpen;
    this.$('#diag').hidden = !this.diagOpen;
    (document.querySelector('[data-act="diag"]') as HTMLElement).classList.toggle('on', this.diagOpen);
  }

  toggleUI(): void {
    this.userHidden = !this.userHidden;
    document.body.classList.toggle('ui-hidden', this.userHidden);
  }

  get hidden(): boolean {
    return this.userHidden;
  }

  setHidden(v: boolean): void {
    this.userHidden = v;
    document.body.classList.toggle('ui-hidden', v);
  }

  get isInfoOpen(): boolean {
    return this.infoOpen;
  }

  closeOverlays(): void {
    this.toggleInfo(false);
    this.toggleDiag(false);
  }

  private renderInfo(): void {
    const m = this.world;
    const pad = m.id === 'julia' ? this.padMarkup() : '';
    const body = this.$('#info-body');
    body.innerHTML = `
      <div class="kicker">${escapeHtml(m.kicker)}</div>
      <h2>${escapeHtml(m.name)}</h2>
      <p class="sub">${escapeHtml(m.short)} — an interactive mathematical object</p>
      <div class="equation">${escapeHtml(m.equation)}</div>
      <div id="world-params" class="params"></div>
      ${pad}
      ${m.intro.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
      <h3>Why it is interesting</h3>
      <ul class="facts">${m.facts.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
      <h3>How to move</h3>
      <ul class="facts">${m.controls.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
      <h3>Keyboard</h3>
      <div class="keys">${KEY_HELP.map(([k, v]) => `<kbd>${escapeHtml(k)}</kbd><span>${escapeHtml(v)}</span>`).join('')}</div>
      <p style="margin-top:1.2rem;font-size:.72rem;color:rgba(239,236,227,.32)">Cinematic mode is choreographed by hand. Touch anything to take over; after a quiet minute the odyssey resumes on its own.</p>
    `;
    const padEl = body.querySelector('.pad') as HTMLElement | null;
    if (padEl) {
      this.padDot = padEl.querySelector('.dot') as HTMLElement;
      const setFromEvent = (ev: PointerEvent) => {
        const r = padEl.getBoundingClientRect();
        const u = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
        const v = Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height));
        const cx = -2.2 + u * 3.0;
        const cy = 1.3 - v * 2.6;
        this.setJuliaC([cx, cy]);
        this.actions.setJuliaC(cx, cy);
      };
      padEl.addEventListener('pointerdown', (ev) => {
        ev.preventDefault();
        padEl.setPointerCapture(ev.pointerId);
        setFromEvent(ev);
      });
      padEl.addEventListener('pointermove', (ev) => {
        if (ev.buttons) setFromEvent(ev);
      });
    }
    this.setJuliaC(this.padC);
  }

  private padMarkup(): string {
    if (!this.padUrl) this.padUrl = makePadImage();
    return `
      <h3>The parameter plane</h3>
      <div class="pad-wrap">
        <div class="pad" style="background-image:url(${this.padUrl})"><span class="dot"></span></div>
        <div class="pad-meta">
          drag to choose <b>c</b><br />
          <b id="pad-c">−0.1230 + 0.7450 i</b><br />
          <span style="opacity:.6">inside → connected</span><br />
          <span style="opacity:.6">outside → dust</span>
        </div>
      </div>
    `;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** A tiny Mandelbrot map for the Julia parameter pad. */
function makePadImage(): string {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const maxIter = 90;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cx = -2.2 + (x / (size - 1)) * 3.0;
      const cy = 1.3 - (y / (size - 1)) * 2.6;
      let zx = 0;
      let zy = 0;
      let i = 0;
      for (; i < maxIter; i++) {
        const nx = zx * zx - zy * zy + cx;
        const ny = 2 * zx * zy + cy;
        zx = nx;
        zy = ny;
        if (zx * zx + zy * zy > 4) break;
      }
      const o = (y * size + x) * 4;
      if (i >= maxIter) {
        img.data[o] = 5;
        img.data[o + 1] = 7;
        img.data[o + 2] = 11;
      } else {
        const t = Math.sqrt(i / maxIter);
        img.data[o] = Math.round(10 + 222 * t * t);
        img.data[o + 1] = Math.round(16 + 186 * t * t);
        img.data[o + 2] = Math.round(26 + 120 * t * t);
      }
      img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}
