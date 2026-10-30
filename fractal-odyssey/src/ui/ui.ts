import { PALETTES } from '../core/palettes';
import type { AppEvent, Odyssey } from '../core/app';
import type { ControlSpec, QualityName, World } from '../core/types';
import { QUALITIES } from '../core/types';

const ICONS: Record<string, string> = {
  play: '<svg viewBox="0 0 24 24"><polygon points="7,5 19,12 7,19" fill="currentColor" stroke="none"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><rect x="6.5" y="5" width="3.6" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="13.9" y="5" width="3.6" height="14" rx="1" fill="currentColor" stroke="none"/></svg>',
  next: '<svg viewBox="0 0 24 24"><polygon points="6,5 16,12 6,19" fill="currentColor" stroke="none"/><line x1="18.5" y1="5" x2="18.5" y2="19"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M21.2 12h-3M5.8 12h-3M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1M18.5 18.5l-2.1-2.1M7.6 7.6 5.5 5.5"/></svg>',
  camera: '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.4"/></svg>',
  expand: '<svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="12" y1="10.6" x2="12" y2="17"/><circle cx="12" cy="7.4" r="0.6" fill="currentColor"/></svg>',
  diag: '<svg viewBox="0 0 24 24"><polyline points="4,16 9,10 13,14 20,6"/><rect x="3.5" y="4" width="17" height="16" rx="2"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M2.5 12S6 5.6 12 5.6 21.5 12 21.5 12 18 18.4 12 18.4 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  reset: '<svg viewBox="0 0 24 24"><path d="M4.5 9.5A8 8 0 1 1 4 13"/><polyline points="4,4.5 4.6,9.7 9.6,9"/></svg>',
  help: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.4 9.2a2.7 2.7 0 0 1 5.2.9c0 1.8-2.6 2-2.6 3.6"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/></svg>',
};

const WORLD_GLYPHS: Record<string, string> = {
  mandelbrot: '<svg viewBox="0 0 20 20"><path d="M13.5 10a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zM10 3a7 7 0 1 0 4.9 12M10 17a7 7 0 0 0-4.6-1.9"/><circle cx="4.4" cy="6.2" r="1.5"/></svg>',
  julia: '<svg viewBox="0 0 20 20"><path d="M10 2c2 3 1 5 3.5 6.5C16 10 15 13 12 13c1 3-2 4.5-4 3s-1-4-3.5-4.5C2 11 3 7.5 6 7.5 5.5 4 8 2.5 10 2z"/></svg>',
  mandelbulb: '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.5 1.5M14.2 14.2l1.5 1.5M15.7 4.3l-1.5 1.5M5.8 14.2l-1.5 1.5"/><circle cx="10" cy="10" r="7.2" stroke-dasharray="2.5 2.2"/></svg>',
  menger: '<svg viewBox="0 0 20 20"><rect x="2.5" y="2.5" width="5" height="5"/><rect x="12.5" y="2.5" width="5" height="5"/><rect x="2.5" y="12.5" width="5" height="5"/><rect x="12.5" y="12.5" width="5" height="5"/><rect x="7.5" y="7.5" width="5" height="5" opacity=".55"/></svg>',
  attractor: '<svg viewBox="0 0 20 20"><path d="M3 14c4-9 8 7 12-3"/><path d="M4 7c5 6 7-6 13 2" opacity=".65"/></svg>',
};

function paletteCss(i: number): string {
  const p = PALETTES[i];
  const stops: string[] = [];
  for (let s = 0; s <= 6; s++) {
    const t = s / 6;
    const r = p.a.x + p.b.x * Math.cos(6.283185 * (p.c.x * t + p.d.x));
    const g = p.a.y + p.b.y * Math.cos(6.283185 * (p.c.y * t + p.d.y));
    const b = p.a.z + p.b.z * Math.cos(6.283185 * (p.c.z * t + p.d.z));
    stops.push(`rgb(${(r * 255) | 0},${(g * 255) | 0},${(b * 255) | 0}) ${(t * 100).toFixed(0)}%`);
  }
  return `linear-gradient(90deg, ${stops.join(',')})`;
}

export class UI {
  private root: HTMLElement;
  private drawer!: HTMLElement;
  private drawerBody!: HTMLElement;
  private infoEl!: HTMLElement;
  private diagEl!: HTMLElement;
  private toastEl!: HTMLElement;
  private hintEl!: HTMLElement;
  private playBtn!: HTMLButtonElement;
  private worldButtons = new Map<string, HTMLButtonElement>();
  private subtitleEl!: HTMLElement;
  private shotEl!: HTMLElement;
  private idleTimer = 0;
  private hiddenAll = false;
  private toastT = 0;
  private touch = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  private lastTap = { t: -9999, x: 0, y: 0 };

  constructor(private app: Odyssey, root: HTMLElement) {
    this.root = root;
    this.build();
    app.on((e) => this.onApp(e));
    this.bindKeys();
    this.bindActivity();
    this.refreshWorld();
    this.refreshControls();
  }

  private h(html: string): HTMLElement {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild as HTMLElement;
  }

  private build(): void {
    const a = this.app;
    this.root.innerHTML = '';

    // brand
    const brand = this.h(`<div class="brand">
      <div class="title">Fractal <em>Odyssey</em></div>
      <div class="subtitle"></div>
      <div class="shotname"></div>
    </div>`);
    this.subtitleEl = brand.querySelector('.subtitle')!;
    this.shotEl = brand.querySelector('.shotname')!;
    this.root.append(brand);

    // world bar
    const bar = this.h('<nav class="worldbar glass"></nav>');
    for (const w of a.worlds) {
      const b = this.h(`<button data-w="${w.id}" title="${w.name} — ${w.tagline}">
        <span class="glyph">${WORLD_GLYPHS[w.id] ?? '◆'}</span><span class="label">${w.name.split(' ')[0]}</span></button>`) as HTMLButtonElement;
      b.addEventListener('click', () => { a.setWorld(w.id); this.hideHint(); });
      this.worldButtons.set(w.id, b);
      bar.append(b);
    }
    bar.append(this.h('<div class="sep"></div>'));
    this.playBtn = this.h(`<button class="ctl" title="Play / pause (Space)">${ICONS.pause}</button>`) as HTMLButtonElement;
    this.playBtn.addEventListener('click', () => a.setPlaying(!a.playing));
    bar.append(this.playBtn);
    const next = this.h(`<button class="ctl" title="Next shot (→)">${ICONS.next}</button>`) as HTMLButtonElement;
    next.addEventListener('click', () => { a.nextShot(); this.toast(`Shot: ${a.director.currentShotName ?? ''}`); });
    bar.append(next);
    const surprise = this.h('<button class="surprise" title="Surprise me! (X)"><span class="glyph">✦</span><span class="label">Surprise</span></button>') as HTMLButtonElement;
    surprise.addEventListener('click', () => { a.surprise(); this.toast('Surprise — a new corner of mathematics'); });
    bar.append(surprise);
    this.root.append(bar);

    // right rail
    const rail = this.h('<div class="rail glass"></div>');
    const mk = (icon: string, title: string, fn: () => void): HTMLButtonElement => {
      const b = this.h(`<button title="${title}">${ICONS[icon]}</button>`) as HTMLButtonElement;
      b.addEventListener('click', fn);
      rail.append(b);
      return b;
    };
    const gearBtn = mk('gear', 'Controls (K)', () => this.toggleDrawer());
    mk('reset', 'Reset view (R)', () => a.resetView());
    mk('camera', 'Screenshot (S)', () => { a.screenshot(); this.toast('Saved PNG screenshot'); });
    mk('expand', 'Fullscreen (F)', () => a.toggleFullscreen());
    const infoBtn = mk('info', 'About this world (I)', () => this.toggleInfo());
    const diagBtn = mk('diag', 'Diagnostics (D)', () => this.toggleDiag());
    mk('help', 'Keyboard & mouse (?)', () => this.helpEl.classList.toggle('open'));
    mk('eye', 'Hide interface (H)', () => this.toggleUI());
    this.railBtns = { gear: gearBtn, info: infoBtn, diag: diagBtn };

    // drawer
    this.drawer = this.h('<aside class="drawer glass"><h3>Motion</h3><div data-g="motion"></div><h3>Colour</h3><div class="palettes" data-g="pal"></div><h3>Quality</h3><div data-g="qual"></div><h3>This world</h3><div data-g="world"></div></aside>');
    this.root.append(this.drawer);
    this.buildMotion(this.drawer.querySelector('[data-g="motion"]') as HTMLElement);
    this.buildPalettes(this.drawer.querySelector('[data-g="pal"]') as HTMLElement);
    this.buildQuality(this.drawer.querySelector('[data-g="qual"]') as HTMLElement);
    this.drawerBody = this.drawer.querySelector('[data-g="world"]') as HTMLElement;

    // info
    this.infoEl = this.h('<section class="info glass"></section>');
    this.root.append(this.infoEl);

    // diagnostics
    this.diagEl = this.h('<div class="diag glass"></div>');
    this.root.append(this.diagEl);

    // hint
    this.hintEl = this.h(`<div class="hint">
      <span class="key">drag</span> explore &nbsp;·&nbsp; <span class="key">scroll</span> zoom &nbsp;·&nbsp;
      <span class="key">space</span> pause &nbsp;·&nbsp; <span class="key">?</span> all keys
    </div>`);
    this.root.append(this.hintEl);
    setTimeout(() => this.hideHint(), 11000);

    // toast
    this.toastEl = this.h('<div class="toast glass"></div>');
    this.root.append(this.toastEl);

    // help
    this.helpEl = this.h(`<div class="help">
      <div class="card glass">
        <h2>Fractal Odyssey — controls</h2>
        <table>
          <tr><td>drag</td><td>pan / orbit (shift+drag rotates in 2D worlds)</td></tr>
          <tr><td>scroll / pinch</td><td>zoom toward the cursor or dolly the camera</td></tr>
          <tr><td>space</td><td>pause / resume all animation</td></tr>
          <tr><td>C</td><td>toggle cinematic autoplay</td></tr>
          <tr><td>→</td><td>next cinematic shot</td></tr>
          <tr><td>1 – 5</td><td>jump between fractal worlds</td></tr>
          <tr><td>P</td><td>cycle colour palette</td></tr>
          <tr><td>R</td><td>reset the camera</td></tr>
          <tr><td>S</td><td>save screenshot (PNG)</td></tr>
          <tr><td>F</td><td>fullscreen</td></tr>
          <tr><td>H</td><td>hide / show interface (screensaver mode)</td></tr>
          <tr><td>I</td><td>about this world</td></tr>
          <tr><td>D</td><td>diagnostics</td></tr>
          <tr><td>X</td><td>surprise me</td></tr>
          <tr><td>J</td><td>Julia companion (Mandelbrot world)</td></tr>
        </table>
        <div class="foot">click anywhere or press ESC to close</div>
      </div>
    </div>`);
    this.helpEl.addEventListener('click', () => this.helpEl.classList.remove('open'));
    this.root.append(this.helpEl);

    a.canvas.addEventListener('odyssey:toast', ((e: CustomEvent) => this.toast(String(e.detail))) as EventListener);
  }

  private railBtns!: Record<string, HTMLButtonElement>;
  private helpEl!: HTMLElement;
  private palEls!: HTMLElement[];

  private buildMotion(host: HTMLElement): void {
    const a = this.app;
    host.append(this.mkSlider('Animation speed', 0.1, 2.5, 0.05, a.speed, v => a.setSpeed(v), v => `${v.toFixed(2)}×`));
    const cinema = this.h('<div class="check on"><span class="name">Cinematic autoplay</span><span class="box"></span></div>') as HTMLElement;
    cinema.addEventListener('click', () => a.setAutoplay(!a.autoplay));
    this.cinemaEl = cinema;
    host.append(cinema);
  }
  private cinemaEl!: HTMLElement;

  private buildPalettes(host: HTMLElement): void {
    this.palEls = PALETTES.map((p, i) => {
      const el = this.h(`<div class="pal" title="${p.name}"><div class="swatch" style="background:${paletteCss(i)}"></div><div class="pname">${p.name}</div></div>`);
      el.addEventListener('click', () => this.app.setPalette(i));
      host.append(el);
      return el;
    });
    this.syncPalettes();
  }
  private syncPalettes(): void {
    this.palEls.forEach((el, i) => el.classList.toggle('sel', i === this.app.paletteIndex));
  }

  private buildQuality(host: HTMLElement): void {
    const seg = this.h('<div class="seg"></div>');
    const names = Object.keys(QUALITIES) as QualityName[];
    this.qualEls = names.map((n) => {
      const b = this.h(`<button data-q="${n}">${QUALITIES[n].label}</button>`) as HTMLButtonElement;
      b.addEventListener('click', () => this.app.setQuality(n));
      seg.append(b);
      return b;
    });
    host.append(seg);
    this.syncQuality();
  }
  private qualEls!: HTMLButtonElement[];
  private syncQuality(): void {
    this.qualEls.forEach(b => b.classList.toggle('sel', b.dataset.q === this.app.qualityName));
  }

  private mkSlider(name: string, min: number, max: number, step: number, value: number,
    onInput: (v: number) => void, fmt?: (v: number) => string): HTMLElement {
    const row = this.h(`<div class="row"><span class="name"></span><input type="range"><span class="val"></span></div>`);
    row.querySelector('.name')!.textContent = name;
    const inp = row.querySelector('input')!;
    inp.min = String(min); inp.max = String(max); inp.step = String(step);
    const val = row.querySelector('.val') as HTMLElement;
    const paint = () => {
      const p = ((parseFloat(inp.value) - min) / (max - min)) * 100;
      inp.style.setProperty('--fill', `${p}%`);
      val.textContent = fmt ? fmt(parseFloat(inp.value)) : parseFloat(inp.value).toFixed(2);
    };
    inp.value = String(value);
    paint();
    inp.addEventListener('input', () => { onInput(parseFloat(inp.value)); paint(); });
    return row;
  }

  /** rebuild the "This world" section from the active world's ControlSpecs */
  refreshControls(): void {
    const w = this.app.active;
    const specs = w.controls();
    this.drawerBody.innerHTML = '';
    for (const s of specs) this.drawerBody.append(this.specEl(s));
    if (!specs.length) this.drawerBody.innerHTML = '<div class="name" style="opacity:.5">— no extra controls —</div>';
  }

  private specEl(s: ControlSpec): HTMLElement {
    const touch = () => this.app.active.touch();
    if (s.kind === 'slider') {
      const el = this.mkSlider(s.label, s.min, s.max, s.step, s.value, (v) => { s.onInput(v); }, s.format);
      const inp = el.querySelector('input')!;
      inp.addEventListener('change', touch);
      return el;
    }
    if (s.kind === 'toggle') {
      const el = this.h(`<div class="check ${s.value ? 'on' : ''}"><span class="name">${s.label}</span><span class="box"></span></div>`) as HTMLElement;
      el.addEventListener('click', () => {
        const on = !el.classList.contains('on');
        el.classList.toggle('on', on);
        s.onInput(on); touch();
      });
      return el;
    }
    const el = this.h(`<div><div class="name" style="font-size:11px;color:var(--ink-dim);margin-top:6px">${s.label}</div><div class="seg"></div></div>`);
    const seg = el.querySelector('.seg')!;
    for (const o of s.options) {
      const b = this.h(`<button>${o.label}</button>`) as HTMLButtonElement;
      b.classList.toggle('sel', o.value === s.value);
      b.addEventListener('click', () => {
        seg.querySelectorAll('button').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel');
        s.onInput(o.value); touch();
        this.renderInfo(this.app.active); // info text may follow the selection
      });
      seg.append(b);
    }
    return el;
  }

  private refreshWorld(): void {
    const w = this.app.active;
    this.worldButtons.forEach((b, id) => b.classList.toggle('active', id === w.id));
    this.subtitleEl.textContent = `${w.name} — ${w.tagline}`;
    this.renderInfo(w);
    this.refreshControls();
  }

  private renderInfo(w: World): void {
    const i = w.info;
    this.infoEl.innerHTML = '';
    this.infoEl.append(this.h(`<span class="close">✕</span>`));
    (this.infoEl.querySelector('.close') as HTMLElement).addEventListener('click', () => this.toggleInfo(false));
    this.infoEl.append(this.h(`<div class="kicker">Now viewing</div><h2>${w.name}</h2>`));
    this.infoEl.append(this.h(`<div class="formula">${i.formula}</div><div class="fnote">${i.formulaNote}</div>`));
    this.infoEl.append(this.h(`<p class="story">${i.story}</p>`));
    this.infoEl.append(this.h('<h4>Try this</h4>'));
    const ul = this.h('<ul></ul>');
    for (const p of i.params) ul.append(this.h(`<li><b>${p.label}</b><span>${p.desc}</span></li>`));
    this.infoEl.append(ul);
    if (i.limits) this.infoEl.append(this.h(`<div class="limits">${i.limits}</div>`));
  }

  private onApp(e: AppEvent): void {
    switch (e.type) {
      case 'world': this.refreshWorld(); break;
      case 'controls': this.refreshControls(); break;
      case 'palette': this.syncPalettes(); break;
      case 'quality': this.syncQuality(); break;
      case 'playing':
        this.playBtn.innerHTML = e.playing ? ICONS.pause : ICONS.play;
        break;
      case 'autoplay': this.cinemaEl.classList.toggle('on', e.autoplay); break;
      case 'shot':
        this.shotEl.textContent = this.app.autoplay && e.name ? `✦ ${e.name}` : '';
        break;
      case 'toast': this.toast(e.message); break;
    }
  }

  toggleDrawer(open?: boolean): void {
    const v = open ?? !this.drawer.classList.contains('open');
    this.drawer.classList.toggle('open', v);
    this.railBtns.gear.classList.toggle('on', v);
    this.app.markInteraction();
  }
  toggleInfo(open?: boolean): void {
    const v = open ?? !this.infoEl.classList.contains('open');
    this.infoEl.classList.toggle('open', v);
    this.railBtns.info.classList.toggle('on', v);
    this.app.markInteraction();
  }
  toggleDiag(open?: boolean): void {
    const v = open ?? !this.diagEl.classList.contains('open');
    this.diagEl.classList.toggle('open', v);
    this.railBtns.diag.classList.toggle('on', v);
  }
  toggleUI(): void {
    this.hiddenAll = !this.hiddenAll;
    this.root.classList.toggle('hidden-all', this.hiddenAll);
    if (!this.hiddenAll) this.toast('Interface restored');
    else if (this.touch) this.toast('Double-tap anywhere to bring the interface back');
  }

  toast(msg: string): void {
    this.toastEl.textContent = msg;
    this.toastEl.classList.add('show');
    clearTimeout(this.toastT);
    this.toastT = window.setTimeout(() => this.toastEl.classList.remove('show'), 3400);
  }

  hideHint(): void { this.hintEl.classList.add('gone'); }

  private bindActivity(): void {
    const wake = () => {
      this.root.classList.remove('idle-fade');
      clearTimeout(this.idleTimer);
      // Touch screens have no hover to wake the chrome, so a mouse-driven idle
      // auto-hide would strand the controls (the world switcher looked "lost").
      // Keep the chrome visible on coarse pointers; explicit hide (H / eye)
      // still works there, restored by a double-tap.
      if (this.touch) return;
      this.idleTimer = window.setTimeout(() => {
        const a = this.app;
        if (a.autoplay && a.playing && a.idleSeconds > 3 &&
            !this.drawer.classList.contains('open') && !this.infoEl.classList.contains('open') &&
            !this.helpEl.classList.contains('open')) {
          this.root.classList.add('idle-fade');
        }
      }, 4200);
    };
    window.addEventListener('pointermove', wake);
    window.addEventListener('pointerdown', wake);
    window.addEventListener('keydown', wake);
    // double-tap to restore the interface on touch devices (no H key available).
    // Compare event.timeStamp — not wall-clock now — so heavy frame renders on a
    // slow device can't stretch the gap between two taps and break detection.
    window.addEventListener('pointerdown', (e) => {
      if (!this.touch || !this.hiddenAll) return;
      if (e.timeStamp - this.lastTap.t < 500
          && Math.hypot(e.clientX - this.lastTap.x, e.clientY - this.lastTap.y) < 48) {
        this.toggleUI();
        this.lastTap.t = -9999;
      } else {
        this.lastTap = { t: e.timeStamp, x: e.clientX, y: e.clientY };
      }
    });
    wake();
  }

  private bindKeys(): void {
    window.addEventListener('keydown', (e) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        if (e.key === 'Escape') (e.target as HTMLElement).blur();
        return;
      }
      const a = this.app;
      switch (e.key) {
        case ' ': e.preventDefault(); a.setPlaying(!a.playing); this.hideHint(); break;
        case 'c': case 'C': a.setAutoplay(!a.autoplay); this.toast(a.autoplay ? 'Cinematic autoplay on' : 'Cinematic autoplay off'); break;
        case 'p': case 'P': a.cyclePalette(e.shiftKey ? -1 : 1); this.toast(`Palette: ${PALETTES[a.paletteIndex].name}`); break;
        case 'r': case 'R': a.resetView(); this.toast('View reset'); break;
        case 's': case 'S': a.screenshot(); this.toast('Saved PNG screenshot'); break;
        case 'f': case 'F': a.toggleFullscreen(); break;
        case 'h': case 'H': this.toggleUI(); break;
        case 'i': case 'I': this.toggleInfo(); break;
        case 'd': case 'D': this.toggleDiag(); break;
        case 'k': case 'K': this.toggleDrawer(); break;
        case '?': this.helpEl.classList.toggle('open'); break;
        case 'x': case 'X': a.surprise(); this.toast('Surprise — a new corner of mathematics'); break;
        case 'ArrowRight': a.nextShot(); break;
        case 'Escape':
          this.helpEl.classList.remove('open');
          this.drawer.classList.remove('open');
          break;
        default: {
          const handled = a.active.hotkey(e.key);
          if (!handled && /^[1-9]$/.test(e.key)) {
            const w = a.worlds[parseInt(e.key, 10) - 1];
            if (w) { a.setWorld(w.id); this.hideHint(); }
          }
        }
      }
    });
  }

  /** live diagnostics refresh */
  tick(): void {
    if (!this.diagEl.classList.contains('open')) return;
    const d = this.app.diagnostics();
    const row = (k: string, v: string) => `<div><span class="k">${k}</span><span class="v">${v}</span></div>`;
    this.diagEl.innerHTML =
      row('fps', `${d.fps} (${d.frameMs} ms)`) +
      row('render', `${d.renderW}×${d.renderH} @ ${(d.scale * 100).toFixed(0)}%`) +
      row('display', `${d.cssW}×${d.cssH} dpr ${(d.renderW / d.cssW).toFixed(2)}`) +
      row('quality', d.quality) +
      row('zoom', `×${d.zoom}`) +
      (d.status ? row('kernel', d.status) : '') +
      row('shot', d.shot) +
      row('textures', String(d.textures)) +
      row('programs', String(d.programs)) +
      `<div class="gpu">${d.gpu}</div>`;
  }

  startTicker(): void {
    setInterval(() => {
      this.tick();
      this.cinemaEl.classList.toggle('on', this.app.autoplay);
      this.playBtn.innerHTML = this.app.playing ? ICONS.pause : ICONS.play;
    }, 500);
  }
}
