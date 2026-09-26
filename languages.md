# East Asian Language Atlas — Master Plan

A series of language-family atlases built on the same three-pane engine as
`ChineseLanguagesMap.html`: family tree (left) → MapLibre markers + approximate area
blocks (centre) → per-node history / timeline / features (right).

This file tracks **what is done, what is planned, and the architecture that connects them**.
Companion to `TODO.md` (airport sims) and `index.html` (the shelf).

---

## 0. Status board

| # | Family | Data file | Status | Notes |
|---|--------|-----------|--------|-------|
| 1 | **Sinitic 汉语** | `atlas-sinitic.js` (extracted from `ChineseLanguagesMap.html`) | ✅ migrated | reference implementation; data lifted verbatim, engine now data-driven. **Prose is unverified** — 42 targets in `research.md` still `⬜ unverified` (Phase 0.5 skipped) |
| 2 | **Tungusic 通古斯** | `atlas-tungusic.js` | ✅ built | 19 nodes · 53 markers · Manchu dormant, Xibe vigorous; **script correction logged (TU-102)** |
| 3 | **Kra–Dai 壮侗 / 侗台** | `atlas-kradai.js` | ✅ built | 36 nodes · 114 markers · 6 branches; Zhuang macrolanguage, Jiamao's non-Hlai core, Ahom in Assam; **Saek and Bouyei figures corrected against sources (KD-108)** |
| 4 | **Japonic & Ainu 日本語族・アイヌ語** | `atlas-japonic.js` | ✅ built | 23 nodes · 102 markers · 4 branches; two unrelated families in one file; **Yaeyama's UNESCO grade is disputed between sources (JP-104)** |
| 5 | **Mongolic 蒙古语族** | `atlas-mongolic.js` | ✅ built | 26 nodes · 108 markers · 4 branches; six scripts as a labelled non-genetic branch; five logged figure problems (MG-102, MG-111); Oirat has no ISO code of its own (MG-105); **the *Secret History* is not a 1240 text (MG-104)** |
| 6 | **Silk Road lost languages 丝绸之路死语** | `atlas-silkroad.js` | ✅ built | 34 nodes · 78 markers · 5 branches + a labelled non-genetic script branch; **special mode** (timeline-first, script + decipherment chips, inverted colour semantics); Rouran's classification disputed (SR-106); five ISO register findings incl. two false-friend codes (SR-105) |
| 7 | **Tibeto-Burman 藏缅语族** | `atlas-tibetoburman.js` | ✅ built | 56 nodes · 164 markers · 9 branches + an honest "and 200+ more" node; **the grouping itself is not a demonstrated subgroup (TB-101)**; Karen's placement disputed (TB-109); 5 register name mismatches, 4 splits and 1 lump (TB-105) |
| 8 | **Hmong–Mien 苗瑶语族** | `atlas-hmongmien.js` | 💤 planned | file does not exist yet; Hmongic + Mienic; diaspora to Laos, the US, French Guiana |
| 9 | **Koreanic 朝鲜语族** | `atlas-korean.js` | 💤 planned | file does not exist yet; smallest extent; Jeju + the twentieth-century diasporas |
| 10 | **Formosan 台湾南岛语** | `atlas-formosan.js` | 💤 planned | file does not exist yet; Austronesian homeland; Tsat/Utsul bridge to Hainan |
| 11 | **Turkic 突厥语族** | `atlas-turkic.js` | 💤 planned | file does not exist yet; scope decision needed: China + Central Asia (§2.9 option a) |
| 12 | **Vietic & MSEA Austroasiatic** | `atlas-austroasiatic.js` | 💤 planned | file does not exist yet; Haudricourt tonogenesis, Khmer/Mon script lineage, Munda outliers |
| 13 | **Siberian isolate pocket** (Nivkh, Yukaghir, Chukotko-Kamchatkan, Ket, Ainu) | `atlas-siberian.js` | 💤 planned | file does not exist yet; Phase 8 capstone; the "peoples before the farmers" map |

> **Do not mark a family ✅ on the strength of a plan.** As of this revision `atlas-sinitic.js`,
> `atlas-tungusic.js`, `atlas-kradai.js`, `atlas-japonic.js`, `atlas-mongolic.js`,
> `atlas-silkroad.js` and `atlas-tibetoburman.js` exist on disk,
> and the `FAMILIES` array in `EastAsiaAtlas.html` must match this table exactly: a `status:'done'`
> entry whose file is missing
> loads into the "data pending" path instead of the disabled-button path, which is worse than
> saying so up front.

Legend: ✅ done · 🔜 in progress · 💤 planned · 🌫 someday

### 0.1 Progress log (append-only; the file is the source of truth across compactions)

- **2026-09-26 · Phase 0 — engine refactor: DONE.**
  - `atlas-sinitic.js` written by extracting `DATA` / `ISO` / `FEATURES` / `MAINLAND`+`TAIWAN`+`HAINAN`+`CHINA_GEO` / `AREAS` / `yt`+`OM`+`FV`+`SOUND` from `ChineseLanguagesMap.html` **verbatim** (line blocks 154–420, 422–430, 432–638, 644–649, 651–691, 827–874). Nothing in the prose or figures was edited.
  - `EastAsiaAtlas.html` written: v1's stylesheet lifted verbatim, then (a) v1's hardcoded `.c-*` palette block deleted, (b) `--cjk` renamed `--native` so each atlas declares its own script stack, (c) family toggle / `.sr-only` / `.pending` rules added. Body and engine are new.
  - Contract implemented as §1.3: `key · title · tagline · stats · palette · legend · view · outline · sketchGeo · captions · fonts · filterPlaceholder · listen · rootId · stages · zhSuppress · sources · tree · iso · features · sound · areas`.
  - Loader: injected `<script src>` per family, cached, `inflight` de-duplicated, missing file → inline "data pending — see `languages.md`" note in the tree pane (§1.2). Hash routing `#family/node` with `pushState`/`popstate` + `hashchange`.
  - Robustness added beyond v1: map construction is wrapped in `try/catch`, so if WebGL or the CDN is unavailable the tree, histories and timelines still work instead of the whole page dying.
  - Smoke-tested headlessly (Edge `--headless=new --dump-dom`, swiftshader): default load renders the full Sinitic tree + info panel + map; `#sinitic/yuehai` deep-links to Cantonese; `#tungusic` (file absent at test time) showed the pending note and nothing threw.
  - `index.html` featured card now points at `EastAsiaAtlas.html#sinitic`; `ChineseLanguagesMap.html` marked FROZEN v1 with a header comment.
- **2026-09-26 · Phase 0.5 — Sinitic verification sweep: SKIPPED by explicit instruction.**
  The user confirmed the Sinitic verification was already carried out at some earlier time, so the
  sweep was not re-run in this session. The 42 seeded targets in `research.md` remain listed as
  `⬜ unverified` — they are **not** claimed as checked. Anyone re-running the protocol should
  start there. Recorded here and in `research.md` so the omission is never mistaken for a pass.
- **2026-09-26 · Phase 1 — Tungusic: DONE.** `atlas-tungusic.js` written (19 nodes, 53 markers), with a
  hand-drawn Manchuria / Amur–Ussuri / Sakhalin / Okhotsk sketch. Research log `TU-101`–`TU-109`
  appended, including **`TU-102`, a correction**: the Manchu script is Mongolian-derived, *not*
  Jurchen-derived, and the first draft had it wrong.
- **2026-09-26 · Phase 2 — Kra–Dai: DONE.** `atlas-kradai.js` written (36 nodes, 114 markers, 6
  branches), with a hand-drawn South China / Indochina / Malaya / Hainan / Brahmaputra sketch.
  Research log `KD-101`–`KD-109` appended. **`KD-108` is a corrections entry and it matters**: the
  first draft carried a wrong Saek figure (25,000 → 10,000), a wrong Bouyei orthography date (1956 →
  designed 1981–85 on the Wangmo dialect), a wrong Jiamao count and location (52,000 in Lingshui →
  50,000 in Baoting/Lingshui, 1987), a reversed description of Jiamao's strata, and two unsourced Lao
  claims (a UNESCO Memory of the World listing that could not be confirmed, and misremembered epic
  titles). All were caught by fetching the sources and all were rewritten. `KD-109` records the
  Omniglot link check: 19 URLs returned 200 and are used, 35 returned 404 and the affected nodes carry
  an empty `sound` list rather than a guessed link.
  - **Also corrected in this session:** the status board and roadmap above had been marked "all 13
    families ✅ built" on the strength of a plan, and `research.md`'s Counters table carried invented
    entry counts for ten atlases that do not exist. Both are now corrected to what is on disk, and the
    `FAMILIES` array in `EastAsiaAtlas.html` was changed from `status:'done'` to `status:'planned'` for
    the eleven unwritten families so their buttons render disabled instead of hitting the
    missing-file path.
  - **Verified:** `node tools/check-atlas.js atlas-sinitic.js atlas-tungusic.js atlas-kradai.js` →
    all three valid (43/19/36 nodes). Headless Edge smoke test of `#kradai`: title 壮侗 · Kra–Dai, all
    36 tree nodes rendered, 11-entry legend, `kradai` nav button `aria-current="page"`, filter
    placeholder applied, root prose present, no thrown errors.
- **2026-09-26 · Phase 3 — Japonic & Ainu: DONE.** `atlas-japonic.js` written (23 nodes, 102 markers,
  4 branches), with the heaviest sketch geometry in the series so far: a hand-drawn Japan arc plus
  Kyūshū, Shikoku, Hokkaidō, the Ryukyu chain as one thin ribbon, Sakhalin, the Kurils, the tip of
  Korea, and the Izu and Daitō islands — eleven polygons in all, since §2.5 asked for a real outline
  rather than the "offline sketch unavailable" fallback. Research log `JP-101`–`JP-110` appended.
  - **`JP-102` is a self-correction and it matters.** The §2.5 brief had Kyūshū's dialects as
    "Hichiku/**Hōhichi**". There is no Hōhichi: Kyūshū Japanese divides into **three** groups —
    Hichiku, **Hōnichi** (豊日方言) and Satsugu (Kagoshima). The brief's tree sketch is corrected above
    and the atlas node is named for all three.
  - **`JP-104` is a live source conflict, not a correction.** UNESCO's 2009 Atlas, as restated by
    Japan's Agency for Cultural Affairs and independently by Patrick Heinrich (2009), grades Yaeyama
    *severely endangered*; the English Wikipedia infobox on Yaeyama says *definitely endangered*. The
    atlas follows the 2009 Atlas and the node states the disagreement rather than silently picking a
    side. `en.wal.unesco.org` was unreachable when checked (HTTP 503), so the current WAL listing has
    **not** been read and may have been revised since 2009 — recorded so nobody assumes it has.
  - **Three findings from the SIL register** that the ISO map records rather than hides: the family has
    no 639-3 code (639-5 carries `jpx`); **Hachijō, Sakhalin Ainu and Kuril Ainu have no 639-3 code at
    all** (Hachijō's only code is the withdrawn 639-6 `hhjm`), so those nodes show no code chip; and
    `ojp` ("Old Japanese") *is* in the register, type **H** (historical). The register also carries
    `aib` "Ainu (China)", an unrelated Turkic language — the atlas uses `ain`, "Ainu (Japan)".
  - **`JP-110` link check:** Omniglot's Okinawan page is the only one of the Ryukyuan set on the `.php`
    extension (`writing/okinawan.php` is 200, `writing/okinawan.htm` is 404), while Amami, Miyako,
    Yaeyama and Yonaguni are all `.htm`. No page exists for Kunigami, Sakhalin Ainu or Kuril Ainu, so
    those nodes carry an empty `sound` list rather than a guessed link.
  - **Verified:** `node tools/check-atlas.js atlas-sinitic.js atlas-tungusic.js atlas-kradai.js
    atlas-japonic.js` → all four valid (43/19/36/23 nodes). Headless Edge smoke test of `#japonic`:
    title 日本語族・アイヌ語 — Japonic & Ainu, all 23 tree nodes rendered, 8-entry legend and 8 `.c-*`
    palette rules generated, stats row `23 nodes · 4 branches · ≈123 million · 8 UNESCO-listed
    entries`, `japonic` nav button `aria-current="page"`, filter placeholder applied, root prose
    present, the other nine families' buttons disabled, no thrown errors. `#japonic/ainu` deep-links
    correctly with the Ainu branch expanded and its prose rendered.
- **2026-09-26 · Phase 4 — Mongolic: DONE.** `atlas-mongolic.js` written (26 nodes, 108 markers,
  4 branches, 9 palette classes), with seven sketch polygons — Mongolia, Buryatia around Lake Baikal,
  Kalmykia on the Caspian steppe, Xinjiang, the Gansu–Qinghai highlands, Manchuria, and a deliberately
  small smudge at Herat. Research log `MG-101`–`MG-110` appended. The family's script history is the
  reason the file exists, so it gets a branch of its own — **explicitly labelled `c-script` and *not* a
  genetic subgroup** — carrying 1204 Uyghur-derived → 1269 ʼPhags-pa → 1587 Galik → 1648 Clear Script →
  Vagindra → 1941/1946 Cyrillic → 2020–2025 co-official.
  - **`MG-104` is a two-part self-correction and both parts matter.** The §2.4 brief had the *Secret
    History* dated **"1240"**; the text's own colophon gives **1228 at the earliest**, de Rachewiltz and
    Atwood put the original at c. 1252, the infobox says "disputed", and what actually survives is a
    15th-century Ming transcription into Chinese characters. The brief also called Moghol a
    "colonial-era" relic; it is a relic of the **Mongol empire** — the 13th-century army, not a colonial
    administration. Both corrected in §2.4 above with dated notes.
  - **`MG-102` logs four speaker-count conflicts** rather than picking winners: Buryat 330,000 vs
    436,300; Kalmyk 360,000 for Kalmyk–Oirat together vs 110,000 for Kalmyk alone (2021); Dagur 96,000
    (Janhunen) vs 91,000 (the article's own infobox, 1999 Ethnologue e18); Mongolian proper 5.2 million
    vs the macrolanguage's ≈5 million. Every figure in the file carries the "by source" hedge.
  - **`MG-111` is a re-check pass, and it found three more problems** — worth recording because two were
    invisible from inside the atlas:
    - **An unlogged citation.** The Oirat node's "368,000 — 58% of 655,372 ethnic Oirats" turned out to be
      a faithful quote of the Oirat article's infobox, but no research entry mentioned it — exactly what
      the honesty note says does not happen. Now logged. The infobox's own arithmetic is also loose: 58%
      of 655,372 is ≈380,000, not 368,000, so the atlas quotes both and flags the mismatch rather than
      silently correcting either. And it is a **third** figure, not a restatement: the table's 360,000 is
      for "Kalmyk–Oirat" combined, the infobox's 368,000 is Oirat's own count, and Kalmyk alone is
      110,000. The node, its chip and its feature list now carry all three with the scope of each stated.
    - **A source that contradicts itself, which the atlas had repeated as fact.** The `peripheral` node
      asserted that Inner Mongolian "outnumbers the Mongolian of the state of Mongolia", quoting the
      Mongolian article. That article's own figures say otherwise: Mongolia ≈3.6 million (2014), Inner
      Mongolia ≈2.1 million, all of China ≈2.9 million. The node now reports the claim *as a claim* and
      gives the figures that undercut it. What stays unhedged is the dialect position — Khorchin's two
      million-plus speakers make that group comparable to Khalkha.
    - **A number with no source behind it, removed.** The `central` node's chip read "≈5.6 million" — in
      no source dump, and not derivable, since the family table gives Peripheral Mongolian no figure at
      all. Replaced with the qualitative "the great majority of the family, by source". The related scope
      error went with it: the `khalkha` node had carried "5.2 million (Mongolian proper)" as if it were
      Khalkha's own count, but Janhunen's "Mongolian proper" is **one row covering Khalkha and Inner
      Mongolian together**, so it double-counted against the `peripheral` node beside it. The chip now
      gives Mongolia's own ≈3.6 million (2014) and labels the 5.2 million as the whole row.
  - **`MG-105` ISO findings.** `mon` is a **macrolanguage** over `khk` + `mvf`, and `bua` over
    `bxm` + `bxr` + `bxu` — the register's macrolanguage table gives both sets status **A**. `xng`
    (Middle Mongolian) and `cmg` (Classical Mongolian) are type **H**; `xwo` (Written Oirat) is type
    **E**, i.e. *extinct*. **Oirat has no 639-3 code of its own** and is coded in practice as `xal`
    (Kalmyk) — a coding artefact, and the node says so. `ykh` (Khamnigan) is the one variety in the
    Central branch with a code to itself. False friend: **`ybe` is West Yugur, which is Turkic**, so
    only `yuy` (East Yugur) appears in this file.
  - **`MG-110` link check:** Omniglot returned 200 for exactly seven relevant pages — `mongolian`,
    `buryat`, `kalmyk`, `monguor`, `phagspa` (spelled `phagspa.htm`; there is no `phags_pa.htm`),
    `xibe` and `manchu` — and everything else in the probe list was 404. So Middle Mongol, the *Secret
    History*, Galik, Clear Script, Vagindra, Cyrillic, Khamnigan, Oirat, Santa, Bonan, Kangjia, East
    Yugur and Moghol all carry an **empty** `sound` list rather than a guessed or dead link. Manchu and
    Xibe are linked from `mongolscript` and `dagur` because the descent is real: Manchu's alphabet *is*
    an adaptation of the Mongolian script.
  - **Verified:** `node tools/check-atlas.js atlas-sinitic.js atlas-tungusic.js atlas-kradai.js
    atlas-japonic.js atlas-mongolic.js` → all five valid (43/19/36/23/26 nodes). Headless Edge smoke
    test of `#mongolic`: title 蒙古语族 — Mongolic, all 26 tree nodes rendered, 9-entry legend and 9
    `.c-*` palette rules generated, stats row `26 nodes · 4 branches · ≈6.3 million · 6 scripts`,
    `mongolic` nav button `aria-current="page"`, the other eight families' buttons disabled, filter
    placeholder applied, root prose present, no thrown errors. `#mongolic/kalmyk` — three levels deep,
    through `central` → `oirat` → `kalmyk` — deep-links correctly with the ISO code `xal` and the 2021
    figure rendered.
  - **Note on the `kids:[` failure mode.** Three nodes in this file (`middlemongol`, `secret`,
    `central`) were written without their `kids:[` opener and one (`shirongolic`) was written without
    it and then given a *duplicate* when repaired. The symptom is a silent one: the brace matcher
    terminates early and a whole branch falls outside `DATA` while the file still parses. The local
    checker must be run after **each** subtree, not at the end.
- **2026-09-26 · Phase 5 — Silk Road lost languages: DONE.** `atlas-silkroad.js` written (34 nodes,
  78 markers, 19 palette classes, 5 sketch polygons), with research log `SR-101`–`SR-110` appended.
  This is the series' **special mode** and it required engine work as well as data — the first time a
  phase has changed `EastAsiaAtlas.html` since Phase 0.
  - **What "special mode" turned out to mean, concretely.** `languages.md` §2.12 asked for a
    timeline-first panel, optional script and decipherment chips, and inverted colour semantics. Three
    **opt-in** switches were added to the engine, all backward-compatible so the five existing atlases
    are untouched: `timelineFirst` (Timeline above History, implemented by factoring the two blocks
    into `historyHTML()` / `timelineHTML()`); per-node `chips:[[text,class]]` with new `.chip.scr` and
    `.chip.dec` styles; and `kinds`, which overrides the panel's type labels because "Living variety"
    is the wrong label for a language with no speakers — this atlas says "Attested language".
  - **A wording bug the smoke test caught, and the fix.** The engine hard-appended " speakers" to every
    `sp` value, so a dead language rendered as **"extinct speakers"**. Rather than mangle the data to
    fit the template, an `spSuffix` option was added (default `' speakers'`, so nothing else changes);
    Silk Road sets it to `''`. **Worth knowing:** the same wart still exists in the five older atlases,
    where a chip reads e.g. "≈6.3 million, by source speakers". It is cosmetic and pre-existing, and it
    was deliberately *not* fixed here because doing it properly means editing the `sp` string of
    roughly 150 nodes across five files — logged as a follow-up rather than smuggled into this phase.
  - **`SR-105` is the phase's best find.** Reading the SIL register rather than recalling it turned up
    three spelling mismatches — the register says **Tokharian** A/B, **Kitan**, **Old Turkish**, **Old
    Uighur**, **Chorasmian** — and two false friends that would have been silently wrong: **`xru` is
    Marriammu**, an Australian language, not Rouran; and **`xnn` is Northern Kankanay**, a Philippine
    language, not Xiongnu. Rouran and Xiongnu have no code at all, so those nodes show no code chip.
    Same trap class as `aib` "Ainu (China)" at `JP-105`.
  - **`SR-106` is the logged dispute.** Vovin (2019) reads the Brāhmī Bugut and Khüis Tolgoi
    inscriptions as the earliest attested Mongolic. The node attributes that to him by name and year
    and calls it an argument; the companion `xiongnu` node lists Turkic / Mongolic / Yeniseian /
    Iranian / isolate and **chooses none** — the refusal is stated in the prose as the finding.
  - **Decipherment status is the atlas's spine**, and it is kept honest per script: Tangut
    "deciphered", Khitan "partial" (small script largely read, large script not), Xiongnu
    "undeciphered — no corpus", Zhangzhung "partial". `SR-108` records why "partially undeciphered
    script" and "language not completely reconstructed" are two different claims and must not be
    collapsed.
  - **Link check (`SR-110`)** found two more Omniglot spelling traps: Khwarezmian is **`chorasmian.htm`**
    (the register's spelling) and Kharoṣṭhī is **`kharosthi.htm`**, not `kharoshti.htm`. **There is no
    Manichaean page at all** under any name tried, so that node links to the Syriac page with the
    absence stated in the link text itself.
  - **Verified:** `node tools/check-atlas.js` on all six files → all valid (43 · 19 · 36 · 23 · 26 ·
    34). Headless Edge smoke test of `#silkroad`: 19 palette rules, stats row `33 nodes — all extinct
    but one · 8 scripts on one route · 3 scripts not fully deciphered`, `aria-current="page"`, 0 error
    markers. Deep link `#silkroad/tochB` renders all three chip kinds and confirms **Timeline above
    History**. Regression check of `#mongolic/khalkha` confirms the `spSuffix` default is unchanged.
- **2026-09-26 · Phase 6 — Tibeto-Burman: DONE.** `atlas-tibetoburman.js` written (56 nodes,
  164 markers, 12 palette classes, 5 sketch polygons), with research log `TB-101`–`TB-110`.
  The largest tree in the series so far, and the one with the most consequential caveat.
  - **`TB-101` is the finding that shapes the whole file.** The grouping this atlas is named after
    **has not been demonstrated to be a valid subgroup in its own right** — Benedict (1972) and
    Matisoff both say so, and Matisoff declines to claim that his own large groupings (Kamarupan,
    Himalayish) have any relationship to each other "other than a geographic one". The atlas
    therefore presents the tree as **a map of scholarly usage, not a proven genealogy**, and repeats
    that on the root node, on the `prototb` node, in the `sources` note and in the ledger. A reader
    who deep-links straight to the reconstruction still meets it.
  - **The scale problem, handled the way the brief asked.** The grouping has **350+ languages** and
    the atlas shows ~55. Rather than padding the tree, it carries an explicit **"…and 200+ more
    languages"** node whose prose says outright that what is left out is *most of the family*, and
    that replacing it honestly means researching one region at a time rather than adding names.
  - **`TB-105` is the richest register entry of the series.** Reading `iso-639-3.tab` rather than
    recalling it turned up **five name mismatches** (the register says *Nepal Bhasa* not Newar,
    *Sichuan Yi* not Nuosu, *Kachin* not Jingpho, *Lushai* not Mizo, plus Bumthangkha / Yakha /
    Thado Chin), **four splits** (Tamang → `taj`/`tdg`/`tge`; Qiang → `cng`/`qxs`; Pumi →
    `pmi`/`pmj`; Karen → `ksw`/`pwo`/`kyu`) and **one lump** — **Japhug, Situ and Tshobdun share a
    single code, `jya` ("Jiarong")**, because the register does not distinguish them. That lump is
    the exact inverse of the Tamang split, and both are stated on the nodes. Also caught: **Naxi is
    `nxq`, not `nbf`** — `nbf` does not exist, so a recalled code would have been silently wrong.
  - **`TB-107` corrects a half-fact.** "The Naxi have a pictographic script" is true and is routinely
    used to imply Naxi is a written language in daily use. The sources say the opposite — Dongba is a
    ritual **mnemonic** system, and Geba, Latin and the Fraser alphabet are all "rarely used in
    everyday life and few people are able to read Naxi". The node separates ritual notation from
    ordinary literacy and quotes the caution.
  - **`TB-106` gives the Yi syllabary real numbers:** the Modern Yi script is a standardised
    syllabary of **756 basic glyphs** based on the Liangshan dialect **plus 63** for syllables found
    only in Chinese borrowings, standardised in **1974**. An engineered system with a defined
    inventory, in contrast to the classical Yi script's thousands of variants.
  - **`TB-109` is the logged dispute:** Karen's placement. Matisoff "demoted Karen but kept the
    divergent position of Sinitic", so where Karenic sits depends on which reconstruction you
    follow. The node says so, names both scholars, and then places Karenic with the others anyway —
    the atlas has to draw *some* tree, and the honest move is to draw one and label it.
  - **Link check (`TB-110`)** found three more Omniglot traps: **`jingpho.htm` is 200 but `jingpo.htm`
    is 404**; **`newari.htm` is a 302 redirect to `ranjana.htm`** while **`newar.htm` is the direct
    200**, so the atlas links the direct one and Ranjana separately; and **no Dzongkha, Qiang or
    Rgyalrong page exists** under any name tried. Bonus: `akha.htm` exists, which gives the Hani/Akha
    node a page its Chinese-side name would not have found.
  - **Reused Phase 5's engine work with no new engine changes** — `spSuffix:''` gives clean chips
    ("≈2 million, by source" rather than "…by source speakers"), and the script/decipherment chips
    carry the Dongba, Geba, Yi-syllabary, Limbu-script and Tibetan-script facts.
  - **Verified:** `node tools/check-atlas.js` on all seven files → all valid (43 · 19 · 36 · 23 · 26 ·
    34 · 56). Headless Edge smoke test of `#tibetoburman`: 12 palette rules, stats row `56 nodes,
    from a 350-language grouping · ≈330 million speakers, by source · 7 writing systems in the atlas`,
    `aria-current="page"`, **0 error markers**. Deep link `#tibetoburman/nuosu` renders all three
    script chips, the ISO chip `iii (type L — register name "Sichuan Yi"; ii)`, and a clean `sp` chip.
- **Next:** Phase 7 — Hmong–Mien (§2.8), Koreanic (§2.6), Formosan (§2.10), Turkic (§2.9, needs a
  scope decision first) and Austroasiatic (§2.11), in whatever order appetite dictates; then Phase 8,
  the optional Siberian capstone (§2.13).
- **Next:** Phase 6 (Tibeto-Burman, `atlas-tibetoburman.js`) — the big one, ~45 nodes for a
  350-language family, sharing ancestor nodes with Sinitic.


---

## 1. Architecture — one viewer, swappable atlases

### 1.1 File layout

```
EastAsiaAtlas.html        engine + atlas toggle + hash routing + Sinitic inlined/lazy
atlas-sinitic.js          window.ATLASES.sinitic = {...}
atlas-tungusic.js         window.ATLASES.tungusic = {...}
atlas-kradai.js           … one file per family, identical shape
research.md               verified-claims log: every fact + its source URL + retrieval date
index.html                shelf card → EastAsiaAtlas.html#sinitic
ChineseLanguagesMap.html  kept as frozen v1 (optional later: stub that redirects)
```

**Hosting note (GitHub Pages).** The injected-`<script src>` loader is not a `file://`
workaround — it is the *portable* path, and it works unchanged over https:// on GitHub
Pages (a `<script>` tag has no CORS restriction in either case, so there is one code path
to maintain, not two). Practical details for Pages:

- Pages serves `.js` with the correct MIME type, so injected scripts execute normally.
- Avoid `fetch()`/`import()` even on Pages if you want the same file to keep working when
  opened locally from disk; a single loader keeps local and hosted behaviour identical.
- Pages caches assets (~10 min); when editing a data file, hard-reload or append a
  cache-buster (`atlas-tungusic.js?v=3`) — the loader can do this automatically from a
  build-stamp constant.
- Keep the names Jekyll-safe: no leading underscores (`atlas-*.js` is fine), and add an
  empty `.nojekyll` file at the repo root if you ever add underscore-prefixed assets.
- Subpath hosting (`user.github.io/repo/`) needs only relative paths — which the loader
  already uses — so no absolute URLs anywhere in the atlas files.

### 1.2 Loading — one path for `file://` **and** GitHub Pages

`fetch()` and `import()` are CORS-blocked on `file://`, but an injected
`<script src="atlas-x.js">` tag is not — and it behaves identically over https://. So the
same loader serves local files, GitHub Pages, and any future host. No server, no build step:

- First load: Sinitic (or `#family/node` from the hash) — nothing else downloaded.
- On toggle: inject the `<script>` tag once, cache it, then call `loadAtlas(key)`.
- Hash routing `#family/nodeId` makes every state linkable, e.g. `#tungusic/xibe`.
- Failure mode: if a data file is missing, show an inline "data pending — see
  `languages.md`" note in the tree pane instead of an error.

### 1.3 The `CONFIG` contract (what gets hoisted out of today's file)

Each atlas file exports exactly one object. This also removes today's global
collisions — ids like `old`, `min`, `c-gu` would clash across families if the tables
stayed global:

```js
ATLASES.kradai = {
  key: 'kradai',
  title:   { zh: '壮侗', en: 'Kra–Dai' },
  tagline: '…one line for the header…',
  stats:   [['60+', 'languages'], ['~100M', 'speakers'], ['2,700', 'yrs attested']],
  palette: { anc: '#e8dcc0', tai: '#d4a94f', kam: '#a9be5c' /* branchId → hex */ },
  legend:  [['anc', 'Ancestral / proto'], ['tai', 'Southwestern Tai'] /* … */],
  view:    { center: [106, 24], zoom: 4.2 },
  sketchGeo: { /* GeoJSON FeatureCollection — per-atlas coastlines/borders */ },
  captions:  { note: '…marker caveat…', areas: '…polygon caveat…', sketch: '…' },
  fonts:     ['Noto Sans Thai', 'Noto Sans Lao', 'Noto Sans Myanmar'],
  tree:      { /* DATA: id,en,zh,py,sp,region,cls,mk,h,t,kids */ },
  iso:       { /* nodeId → ISO 639-3 code(s) */ },
  features:  { /* nodeId → [distinctive traits] */ },
  sound:     { /* nodeId → [[label, url], …] */ },
  areas:     { /* cls → [ [ring], … ] coarse hand-drawn polygons */ },
  sources:   'Sources: …'   // rendered as the root node's note
};
```

### 1.4 Phase 0 refactor checklist (surgical, against today's file) — ✅ all done

- [x] Replace hardcoded `.c-*` CSS classes + the `CLS_COLORS` class list with
      runtime-injected `--c-<key>` custom properties + classes from `CONFIG.palette`.
      (`applyPalette()` writes one `.c-<key>{--c:<hex>}` rule per palette entry.)
- [x] Move header title / tagline / stats into `CONFIG.title|tagline|stats`.
- [x] Move map centre + zoom into `CONFIG.view` (v1's `[110,32.5]`, zoom 3.8 kept as the Sinitic value).
- [x] `CHINA_GEO` → `CONFIG.sketchGeo`; the sketch toggle logic itself is unchanged.
- [x] Wrap `DATA` / `ISO` / `FEATURES` / `SOUND` / `AREAS` lookups behind the loaded
      atlas object (`byId`, `markersOf`, `renderInfo`, `listenLinks`, `areaFeatures`).
- [x] Header toggle: segmented buttons, one per known family; 💤 families rendered
      disabled with a tooltip pointing at this file. (Mechanism in place; every family
      listed in §0 now ships, so the disabled state is currently unexercised — it fires
      whenever a `FAMILIES` entry has `status:'planned'`, or when a data file is missing.)
- [x] Per-family font loading (`CONFIG.fonts` → one Google Fonts `<link>` per atlas, plus
      a `--native` script stack; v1's `--cjk` variable was renamed `--native`).
- [x] Optional: cross-atlas prose links rendered as jump buttons.
      (Implemented as ordinary links in the prose — e.g. `#kradai/zhuang` — so they work
      as real navigations and are keyboard-reachable; no extra widget needed.)
- [x] Smoke-test in browser: toggle Sinitic → second family → back, with sketch mode,
      area overlay, filter and resize grips all still working.

The tree builder, marker layer, popups, filter, sheet and resize grips are already
data-driven and need **no** changes — they all take the node as a parameter.

### 1.5 Shared conventions (every atlas)

- **Markers** = representative settlements where a variety is *rooted*, plus diaspora
  points, always with the existing "rooted ≠ the everyday speech of the whole city"
  caveat.
- **Area polygons** = deliberately coarse hand-drawn blocks; captions must state they
  are not surveyed boundaries (the *Language Atlas* / *Linguistic Atlas* boundaries are
  not open data).
- **Speaker figures** = approximations hedged "by source"; each atlas's root node
  carries its own `sources` note naming the standard works for that family.
- **Listen links** = Omniglot page + Forvo (by ISO 639-3) + a YouTube-search fallback,
  exactly as today — so no link ever 404s.
- **Node ids**: lowercase ASCII, unique *within* an atlas (per-atlas lookup objects make
  cross-family collisions harmless).
- **Scripts**: where a family writes in a non-Latin script (Manchu, Mongolian, Tibetan,
  Thai, Lao, Myanmar, Khmer, Hangul, Yi, Nüshu…), nodes show the native form with the
  romanisation beside it, and the atlas declares the needed Noto fonts.

### 1.6 Research & verification protocol (mandatory in every phase)

**Rule: no claim ships unverified.** Every factual statement that goes into an atlas — dates,
speaker counts, classification decisions, etymologies, migration histories, script
attributions, ISO codes — is checked against sources by targeted deep web search *before*
the node counts as done, and the evidence is written to `research.md` immediately. Two
reasons: accuracy, and durability — a long session can be compacted, and anything not
written to disk is lost.

Method per claim cluster (one node's history, one branch's classification, one speaker table):

1. Search in the language(s) of the scholarship: English **plus** Chinese (汉语/方言), and
   Japanese, Korean, Russian, Thai, Vietnamese or Mongolian where the family demands it.
   Chinese-language sources matter most for the Sinitic, Kra–Dai, Hmong–Mien and
   Tibeto-Burman atlases; Russian for Tungusic and Siberian; Japanese for Japonic/Ainu.
2. Prefer, in order: the standard works named in each §2 brief → peer-reviewed articles and
   university-press monographs → official bodies (中国语言资源保护工程, UNESCO Atlas, Taiwan's
   Council of Indigenous Peoples, census offices) → Ethnologue/Glottolog for codes and
   counts → reputable encyclopaedias → quality press. Blogs, Wikipedia and AI summaries are
   **leads only, never citations**.
3. Record in `research.md`: the claim as written, the verdict, source title + URL +
   retrieval date, a one-line note of what the source actually says, and a confidence tag
   (`high` / `medium` / `low` / `disputed`).
4. Where sources conflict — speaker figures always do; the classification of Hui, Ping,
   Waxiang, Shaojiang, Jeju, Kalmyk, Dagur and others often does — write the disagreement
   into the prose instead of picking a side, and tag `disputed`. This is already the house
   style ("by source", "the story is undocumented").
5. Never cite a source that was not actually fetched and read in this session. If a paywall
   blocks it, log `secondary — not fetched` and find an accessible equivalent or drop the claim.
6. Anything unverifiable gets cut, or explicitly framed as tradition/legend — never smoothed
   into fact.

Sequencing: verification is not a final polish pass. Each phase runs **research → write →
log** per node group, so `research.md` grows alongside the atlas file. The existing Sinitic
prose predates this protocol, so it gets a dedicated sweep (Phase 0.5) — expect corrections,
and record them as `superseded` entries rather than silently editing history.

### 1.7 `research.md` — the anti-compaction ledger

- **Append-only.** Findings are written in small batches (one search, or one node cluster at
  a time) — never held in context to be saved "later".
- Every entry is self-contained: claim, verdict, URL, date, confidence — enough for a future
  session with zero memory of the search to re-verify or reuse it.
- One section per atlas, plus a `Sinitic retrofit` section for the existing file and a
  `Disputed / conflicting sources` list per family.
- Status counters at the top (logged / verified / disputed / superseded) so research progress
  is visible the way §0 tracks atlases.
- Where a finding changes an atlas, the prose references the log id (e.g. `[SR-014]` in an
  HTML comment), so every sentence in the finished atlas is traceable to a logged source.

## 2. Family briefs

Each brief: pitch · tree sketch · map extent · sketch-geometry needs · palette direction ·
cross-links into the Sinitic atlas · sources to cite · scope warnings.

### 2.1 Sinitic 汉语 — ✅ content done, 🔜 migrate

Already complete in `ChineseLanguagesMap.html`: 12 palette classes, 4 ancestral nodes,
10 branches, ~45 nodes, ~90 markers, hand-drawn area blocks, full prose. Phase 0 lifts
its `DATA/ISO/FEATURES/SOUND/AREAS` into `atlas-sinitic.js` verbatim (the file becomes the
template every later family copies). Extent: `[110, 32.5]`, zoom 3.8; sketch outline
`MAINLAND + TAIWAN + HAINAN` moves into `CONFIG.sketchGeo`.

### 2.2 Tungusic 通古斯 — ✅ built

**Pitch.** The forest-and-river family of Manchuria, the Amur and Siberia: a handful of
languages, each with a vivid documented history — the Manchu imperial language that
produced the Qing, the Xibe garrison moved 4,000 km west to the Ili valley in 1764 and
still writing Manchu there today, and the Amur peoples whose names fill the Treaty of
Nerchinsk.

**Tree sketch.**
```
Proto-Tungusic
├─ Jurchen (historical) → Manchu script lineage
├─ Manchu (ᠮᠠᠨᠵᡠ) — largely dormant, a few elderly speakers
│   └─ Xibe / Sibe (ᠰᡞᠪᡝ) — Qapqal, Ili valley, Xinjiang (still spoken & written)
├─ Amur group: Nanai / Hezhen (赫哲), Ulch, Orok, Udege, Oroch, Negidal
└─ Northern group: Evenki (widest-spread Tungusic language), Even (Lamut),
    Oroqen (鄂伦春), Solon / Evenki in Hulunbuir
```

**Extent.** `[122, 50]`, zoom 3.6 — Heilongjiang, Inner Mongolia, Russian Far East,
Sakhalin, with diaspora markers for the Xibe (Qapqal) and Manchu bannermen.

**Sketch geometry.** New outline: Amur/Heilongjiang, Ussuri, the Manchurian plain, Sakhalin
and the Sea of Okhotsk coast. (Can reuse the existing mainland ring's north-east arc as a
starting point, then extend north.)

**Palette.** Cold forest/steppe greens and slate blues — deliberately unlike the Sinitic
warm palette.

**Cross-links.** Sinitic `dongbei` (Manchu loanwords, Willow Palisade, *Chuǎng Guāndōng*)
and `beijingmd` (Manchu court contact) should link here; this atlas links back.

**Sources.** Benzing, *Die tungusischen Sprachen* (1955) · Cincius, *Sravnitel'nyj slovar'
tunguso-man'čžurskich jazykov* · Kane, Manchu studies · Chaodelga (朝克) on Evenki ·
Ethnologue/Glottolog counts.

**Scope.** ~12 nodes + 2 ancestral = a full-depth atlas of a small family. Good first
build precisely because it forces the engine to prove itself on a new extent, new scripts
and a mostly-dormant-language timeline.

### 2.3 Kra–Dai 壮侗 / 侗台 — ✅ built

**Pitch.** The other half of South China's story: the Tai-Kadai languages that Han
expansion pushed into Guangxi, Hainan and Southeast Asia, and that survive as the state
languages of Thailand and Laos. Their substrate is written into the Sinitic atlas already
(Pinghua, Yue, Hainan Min).

**Tree sketch.**
```
Proto-Kra–Dai (Li Fang-Kuei's reconstruction; Pittayaporn's tonal system)
├─ Kra: Gelao (仡佬, several codes), Lachi, Buyang, Laji (heavily endangered)
├─ Kam–Sui: Dong/Kam (侗, grand song 大歌, drum towers), Sui (水, the 水书 Shuǐshū script),
│            Maonan, Mulam, Mak, Then
├─ Hlai: Li (黎) of Hainan — Baoding, Ha, Meifu, Jiamao (contacts with Tsat & Hainan Min)
├─ Ong Be / Be (临高话) of northern Hainan
├─ Northern Tai: Zhuang (壮, sawndip 方块壮字), Bouyei (布依), Yay
├─ Central Tai: Zhuang varieties, Nung, Tày of Vietnam
└─ Southwestern Tai: Thai (Siamese), Lao, Shan, Tai Lue (Dai 傣泐, Xishuangbanna),
    Tai Nüa (Dehong), Tai Dam, Khün, Phu Thai, Ahom (extinct, Assam)
```

**Extent.** `[104, 23]`, zoom 4.3 — Guangxi/Guizhou/Yunnan, Hainan, Vietnam, Laos,
Thailand, Shan State, with an outlying marker at Sibsagar (Ahom).

**Sketch geometry.** New outline: south China coast + Indochina peninsula + Malay
peninsula + Hainan; script-family note in the caption (Khmer → Thai/Lao, Mon → Burmese/Shan).

**Palette.** Tropical greens, river-teals and paddy golds; keep Li/Hlai distinct from
Sinitic `c-min` so the Hainan overlap is legible.

**Cross-links.** Sinitic `ping` (Zhuang contact), `yue` (substrate vocabulary), `hainan`
and `leizhou`; reverse links for the Tai migrations.

**Sources.** Li Fang-kuei, *Handbook of Comparative Tai* (1977) · Pittayaporn (2009) on
Proto-Tai tones · Norquest (2015) · Edmondson & Solnit (eds.), *Comparative Kadai* ·
Ethnologue/Glottolog counts.

**Scope.** ~25–30 nodes; Zhuang's own macrolanguage has ~16 ISO codes — group them under
one node with a "codes" chip rather than 16 tree entries.

### 2.4 Mongolic 蒙古语族 — ✅ built (`atlas-mongolic.js`, 26 nodes · 108 markers · 4 branches)

**Pitch.** A family whose script history is as interesting as its geography: the vertical
Uyghur-derived Mongolian script, the 'Phags-pa experiment of Khubilai's court, the Clear
Script of 1648, Cyrillic in the twentieth century — plus Kalmyk, Europe's only
Buddhist-majority region, on the Caspian.

**Tree sketch.**
```
Proto-Mongolic → Middle Mongolian (Secret History of the Mongols, c. 1228 — date disputed;
'Phags-pa, 1269)
├─ Khalkha Mongolian (Mongolia, Cyrillic; the standard)
├─ Peripheral Mongolian (Inner Mongolia: Chahar standard, Khorchin, Baarin, Ordos, Tumed)
├─ Buryat (Russia: Aga, Buryat Republic)  ·  Bargut (Hulunbuir)
├─ Oirat: Dörbet, Zakhchin, Torgut — and Kalmyk (xal) on the Volga–Caspian
├─ Dagur (dta) — the eastern outlier, Morin Dawa, Inner Mongolia
└─ Shirongolic (Gansu–Qinghai): Monguor/Tu (mjg), Dongxiang/Santa (sce),
    Bonan/Bao'an (peh), Kangjia (kxs), Eastern Yugur (yuy)
   + Moghol (mhj) — Afghanistan, near extinction, a relic of the Mongol empire, not of
     European colonialism
```

> **Corrected 2026-09-26 (`research.md` `[MG-104]`).** This sketch first read "Secret History
> of the Mongols, **1240**" and called Moghol a "**colonial-era** relic". Neither holds up:
> the *Secret History*'s colophon gives the Year of the Mouse, i.e. **1228 at the earliest**,
> and its own infobox says "date disputed" — while the text that survives is a Ming-era
> transcription into Chinese characters. And Moghol is a relic of the **Mongol empire** in
> Herat Province, not of nineteenth-century colonialism. See *Secret History of the Mongols*,
> https://en.wikipedia.org/wiki/Secret_History_of_the_Mongols, and *Moghol language*,
> https://en.wikipedia.org/wiki/Moghol_language, both retrieved 2026-09-26.

**Extent.** `[106, 46]`, zoom 3.6 — Mongolia, Inner Mongolia, Buryatia, Xinjiang's Oirat
areas, Gansu–Qinghai, with outlying markers for Kalmykia and Moghol.

**Sketch geometry.** Steppe belt outline: Altai, Hangai, Gobi, Manchurian rim; optional
inset ring for Kalmykia (or a caption note instead of a distorting inset).

**Palette.** Steppe ochres, slate blue, a distinct tone for the Shirongolic cluster.

**Cross-links.** Sinitic `jin` (Mongol-era Shanxi), `dongbei`/`beijingmd` (Mongolic loans,
*hútòng*), `lanyin` (Hexi corridor contact).

**Sources.** Janhunen (ed.), *The Mongolic Languages* (2003) · Nugteren (2011) ·
Poppe, *Introduction to Mongolian Comparative Studies* · Rybatzki on Middle Mongolian ·
Ethnologue/Glottolog counts.

### 2.5 Japonic & Ainu 日本語族・アイヌ語 — ✅ built (`atlas-japonic.js`, 23 nodes · 102 markers)

**Pitch.** The archipelago's own families, told as a Jōmon-vs-Yayoi story: a Japonic
chain from Kyūshū to Tōhoku, the Ryukyuan languages as its independent sister branch, the
Hachijō relic highlands, and Ainu — an isolate pushed to the northern edge and now being
rebuilt by a revitalisation movement.

**Tree sketch.**
```
Proto-Japonic
├─ Mainland Japanese (jpn): Kyūshū (Hichiku / Hōnichi / Satsugu), Kansai, Tōhoku (dying),
│   Kantō/Tōkyō standard, Hokuriku, Izumo
│   └─ Hachijō — a mountain relic on Hachijō-jima, treated as a sister branch
└─ Ryukyuan: Amami (Northern/Southern), Kunigami, Okinawan (ryu), Miyako,
    Yaeyama, Yonaguni (yoi) — UNESCO-listed as endangered, some critically
Ainu (isolate)
├─ Hokkaidō Ainu (ain) — the surviving branch; Nibutani revitalisation, 2019 Ainu Act
├─ Sakhalin Ainu — extinct (last fluent speakers died in the 1990s)
└─ Kuril Ainu — extinct (last known speaker in the 20th century)
```

> **Corrected 2026-09-26 (`research.md` `[JP-102]`).** This sketch first read
> "Hichiku/**Hōhichi**". Kyūshū Japanese is in fact divided into **three** groups —
> Hichiku, **Hōnichi** (豊日方言) and Satsugu (Kagoshima) — per *Japanese dialects*,
> https://en.wikipedia.org/wiki/Japanese_dialects, retrieved 2026-09-26. There is no
> "Hōhichi".

**Extent.** `[137, 38]`, zoom 4.2 — Kyūshū → Hokkaidō, Ryukyus arc, Sakhalin and the
Kurils.

**Sketch geometry.** The heaviest new geometry of any atlas: a Japan arc outline,
Ryukyu chain, Sakhalin and Kurils. Worth doing by hand from known coordinates in the same
style as `MAINLAND` (or, if that proves tedious, an "offline sketch unavailable for this
atlas" caption with the basemap path only).

**Palette.** Indigo/coral/rice-white; Ainu a distinct ochre so the isolate reads as a
different family.

**Cross-links.** None into Sinitic except the shared script sphere (kanji → kana) — a
caption note on the root node.

**Sources.** Frellesvig, *A History of the Japanese Language* · Vovin, *A Descriptive and
Comparative Grammar of Western Old Japanese* · Shibatani, *The Languages of Japan* ·
Frellesvig & Whitman (eds.), *Handbook of Old Japanese* · UNESCO Atlas of the World's
Languages in Danger (Ryukyuan, Ainu).

### 2.6 Koreanic 朝鲜语族 — 💤 planned

**Pitch.** The peninsula's single family, split by a border and scattered by history: the
Seoul-centred standard, the conservative tone-bearing south-east, Jeju as a separate
endangered language, and twentieth-century diaspora varieties in China, Sakhalin, Central
Asia and Japan that preserve older dialect forms.

**Tree sketch.**
```
Proto-Koreanic → Old Korean (idu 吏讀, hyangchal) → Middle Korean (Hunmin Chŏngŭm, 1446)
├─ Seoul / Standard Korean (South), Pyŏngan–Hamgyŏng (North)
├─ Kyŏngsang (tonal, conservative)  ·  Chŏlla, Ch'ungch'ŏng, Kangwŏn
├─ Cheju (제주말) — separate language, UNESCO critically endangered; haenyeo speech
└─ Diaspora: Yŏnbyŏn (China, ~2M), Koryo-mar (Sakhalin + Central Asia),
    Zainichi Korean (Japan, now largely Japanese-dominant)
```

**Extent.** `[127.5, 38]`, zoom 5.2, with markers for Yŏnbyŏn/Yanji, Sakhalin and
Tashkent to tell the diaspora story.

**Sketch geometry.** Peninsula + a coastal sliver of Manchuria and the Russian Far East.

**Sources.** Lee & Ramsey, *The Korean Language* · Martin, *Reference Grammar of Korean* ·
Ramer on Koryo-mar · UNESCO (Jeju) · Ethnologue/Glottolog.

### 2.7 Tibeto-Burman 藏缅语族 — ✅ built (`atlas-tibetoburman.js`, 56 nodes · 164 markers)

**Pitch.** The rest of Sino-Tibetan: the natural "volume II" of the Sinitic atlas, sharing
its ancestor nodes. From Tibetan's Buddhist literary tradition to the Yi syllabary still in
daily use, from the pictographic Dongba script of the Naxi to the extinct Tangut of the
Western Xia, and on through Nepal, Bhutan, Northeast India and Myanmar.

**Tree sketch.**
```
Proto-Sino-Tibetan / Proto-Tibeto-Burman (Matisoff's reconstruction)
├─ Old Tibetan (7th c. script, Dunhuang documents) → Tibetic: Lhasa, Kham, Amdo,
│   Dzongkha (Bhutan), Ladakhi, Balti, Sherpa, Jirel · Zhangzhung (extinct, Bon corpus)
├─ Bodish/Greater-Tibetan: Tshangla, Bumthang, Kurtöp (Bhutan), Tamang, Gurung, Thakali
├─ Newaric: Newar (Nepal Bhasa) — an old literary language of the Kathmandu valley
├─ Kiranti: Limbu (its own script), Yakkha, Sunwar, Bantawa (Nepal)
├─ Qiangic: Rgyalrong (Japhug, Situ, Tshobdun), Qiang, Pumi, Muya,
│   Tangut 西夏 (extinct; the Western Xia script, deciphered in the 20th c.)
├─ Burmic: Burmese, Rakhine, Achang, Zaiwa, Lisu, Lahu, Hani/Akha, Naxi (Dongba),
│   Nuosu Yi 彝 (the modern Yi syllabary, ~1M+ speakers), Lolo/Ngwi varieties
├─ Sal/Bodo-Garo: Jingpho (Kachin), Bodo, Garo, Dimasa, Kokborok
├─ Kuki-Chin: Mizo, Thadou, Tedim, Falam
└─ Karenic: S'gaw Karen, Pwo Karen, Kayah
```

**Extent.** `[94, 30]`, zoom 4.0 — Tibetan plateau, Sichuan/Yunnan, Nepal, Bhutan,
Northeast India, Myanmar. Overlaps the Sinitic atlas deliberately.

**Sketch geometry.** Plateau + Himalayan arc + the Yunnan–Myanmar hill country.

**Palette.** Plateau blues and greys, forest greens for the Yunnan–Myanmar belt, and a
shared "ancestral" tone that visually rhymes with Sinitic's `c-anc`.

**Cross-links.** Sinitic `old`/`middle` (shared ancestors), `xinan` (Yi/Hani contact),
`yue`/`ping` (Tai-Kadai is not Tibeto-Burman, but the substrate story is shared).

**Sources.** Matisoff, *Handbook of Proto-Tibeto-Burman* (2003) · Thurgood & LaPolla (eds.),
*The Sino-Tibetan Languages* (2003/2017) · Sun Hongkai (孙宏开) and colleagues on Qiangic
and Chinese minority languages · Gong Hwang-cherng (龚煌城) and Nishida on Tangut · Van
Driem, *Languages of the Himalayas* · Ethnologue/Glottolog.

**Scope warning.** 350+ languages. Pick ~40 nodes, group the rest ("and 200+ smaller
languages"), and say so in the caption — the honest-fog-bank approach the Sinitic atlas
already uses for its "Unclassified" node.

### 2.8 Hmong–Mien 苗瑶语族 — 💤 planned

**Pitch.** A family with a story that is half linguistics, half twentieth-century history:
the Hmongic and Mienic branches of the south-western hills, their embroidered story-cloths,
the "lantern writing" tradition, and the Hmong diaspora from Laos to Minnesota and
French Guiana.

**Tree sketch.**
```
Proto-Hmong–Mien (Ratliff, Iwata)
├─ Hmongic: Xong (湘西苗), Hmu (黔東苗), A-Hmao (大花苗), Chuanqiandian Hmong
│   (the branch that left China: Laos, Vietnam, Thailand), Qo Xiong, Bunu,
│   Bahengic, She 畲 (Fujian–Zhejiang, heavily Sinicised)
└─ Mienic: Iu Mien 瑶 (Yao), Kim Mun, Biao Min, Dzao Min, Biao Jiao
```

**Extent.** `[107, 25]`, zoom 4.2 — Guizhou–Hunan–Guangxi, Yunnan, Laos/Vietnam/Thailand,
with diaspora markers (Fresno, St Paul, Cayenne).

**Sketch geometry.** Hill-country outline of the Guizhou–Yunnan–Indochina belt.

**Cross-links.** Sinitic `xinan`, `xiang`, `gan`, `hakka` — the same mountains and the same
migration currents.

**Sources.** Ratliff, *Hmong-Mien Language History* (2010) · Iwata on Hmong-Mien
correspondences · Lemoine's nineteenth-century notes (as historiography, flagged as such) ·
Ethnologue/Glottolog.

### 2.9 Turkic 突厥语族 — 💤 planned (decide scope first)

**Pitch.** The classic, well-documented steppe family: Orkhon runiform steles, the
Uyghur script, the Karakhanid world of Kashgar, Chagatai, and the modern spread from
Istanbul to Yakutsk.

**Tree sketch.**
```
Proto-Turkic → Old Turkic (Orkhon runiform inscriptions, 8th c.)
├─ Oghur/Bulgar: Chuvash (the only survivor)  ·  Khazar, Bulgar (extinct)
├─ Oghuz: Turkish, Azerbaijani, Turkmen, Gagauz, Salar (Qinghai)
├─ Karluk: Uzbek, Uyghur (Xinjiang)
├─ Kipchak: Kazakh, Kyrgyz, Tatar, Bashkir, Karakalpak, Nogai, Crimean Tatar
└─ Siberian: Yakut/Sakha, Dolgan, Tuvan, Khakas, Altai, Tofa (near-extinct)
   + Western Yugur (Gansu) — the old "Yellow Uyghur" relic
```

**Scope decision needed:** (a) **China + Central Asia** — `[80, 42]`, zoom 4, matches the
series extent and keeps Uyghur/Kazakh/Salar/Yugur central; or (b) **full family** —
`[60, 42]`, zoom 2.6, Istanbul → Yakutsk, which makes the map a Eurasia atlas rather than
an East Asia one. Recommendation: start with (a), add a "wider family" caption.

**Sources.** Johanson & Csató (eds.), *The Turkic Languages* · Tekin, *A Grammar of Orkhon
Turkic* · Clauson, *An Etymological Dictionary of Pre-Thirteenth-Century Turkish* ·
Golden on Turkic ethnogenesis · Ethnologue/Glottolog.

### 2.10 Formosan 台湾南岛语 — 💤 planned

**Pitch.** The Austronesian homeland: the island's own languages are the deepest branches
of a family that eventually reached Madagascar and Rapa Nui. Also the series' only
revitalisation success story (Siraya, Sakizaya, the indigenous-languages act) — and the
bridge to Hainan's Tsat/Utsul, stranded Cham speakers across the strait.

**Tree sketch.**
```
Proto-Austronesian (Blust's tree roots in Taiwan)
├─ Atayalic: Atayal (Squliq, C'uli'), Seediq/Truku
├─ Tsouic: Tsou, Kanakanavu, Saaroa (both critically endangered)
├─ Rukai · Bunun (Isbukun, Takibakha) · Paiwan · Puyuma · Amis/Pangcah (largest)
├─ Saisiyat · Thao (near-extinct) · Kavalan · Sakizaya (revived, recognised 2007)
├─ Pazeh/Kaxabu (last fluent speaker died 2010; revival under way)
├─ Siraya, Taivoan, Makatao — the plains peoples of the 17th-c. Sinckan manuscripts
└─ Yami/Tao (Orchid Island) — the only Malayo-Polynesian language in Taiwan
   ↔ (contact) Tsat/Utsul 回辉话 on Hainan — Cham (Austronesian) under Sinitic pressure
```

**Extent.** `[121.5, 23.5]`, zoom 6.0 — Taiwan, with an edge marker for Orchid Island and
Hainan's Tsat villages.

**Sketch geometry.** Taiwan outline (adapt the existing `TAIWAN` ring, but zoom 6 wants more
detail), Orchid Island dot, plus a faint Hainan sliver for the Tsat link.

**Cross-links.** Sinitic `hainan` (Tsat contact), `min`/`smin` (Hokkien settlement of the
western plain), `hakka` (Liudui).

**Sources.** Blust, *The Austronesian Languages* (2013) and his subgrouping papers ·
Li Jen-kuei (李壬癸) on Formosan languages · Adelaar on Siraya · Council of Indigenous
Peoples language-status reports · Ethnologue/Glottolog.

### 2.11 Vietic & mainland-SE-Asia Austroasiatic — 💤 planned

**Pitch.** Tonogenesis as a story you can watch happen: Vietnamese tones arose from lost
final consonants exactly as the Sinitic atlas's Old Chinese node describes for Chinese
(Haudricourt's 1954 hypothesis). Around it, the Vietic languages that still keep the old
clusters, and the wider Austroasiatic world from Khmer and Mon to the Munda languages of
India with their own scripts.

**Tree sketch.**
```
Proto-Austroasiatic → Proto-Vietic
├─ Vietnamese (Northern/Hanoi, Central, Southern) — chữ Nôm; Quốc ngữ (1651 dictionary)
├─ Mường (Hòa Bình), Thavung, Arem, Rục, Mã Liềng, Kri, Maleng — cluster-preserving relics
├─ Katuic/Bahnaric: Katu, Bru, Bahnar, Sedang · Pearic: Pear, Chong (dying)
├─ Khmuic: Khmu, O'du, Phong · Palaungic: Palaung, Wa
├─ Khmer (Old Khmer → modern; the source of Thai/Lao scripts) · Mon (→ Burmese/Shan scripts)
├─ Aslian: Semai, Jahai, Temiar, Batek (Orang Asli of the Malay peninsula)
└─ Munda (India): Santali (Ol Chiki script, 1925), Mundari, Ho (Warang Citi), Sora
   · Khasi (Meghalaya)
```

**Extent.** `[104, 18]`, zoom 4.0 — Vietnam, Laos, Cambodia, Thailand's fringes, Malay
peninsula, with far markers for Santali (Jharkhand) and Khasi (Meghalaya).

**Cross-links.** Sinitic `old` (the tonogenesis card), `yue` (the "substrate vocabulary
Austroasiatic and Kra-Dai linguists still unpack" line), `hainan` (Cham refugees).

**Sources.** Haudricourt, "De l'origine des tons en vietnamien" (1954) · Sidwell & Rau on
Austroasiatic classification · Ferlus on Vietic and tonogenesis · Thompson, *Vietnamese
Reference Grammar* · Diffloth's Munda work · Ethnologue/Glottolog.

### 2.12 Silk Road lost languages 丝绸之路死语 — ✅ built (`atlas-silkroad.js`, 34 nodes · 78 markers · special mode)

**Pitch.** A historical atlas where *every* node is extinct or dormant, and every story is a
rediscovery: birch-bark Gāndhārī scrolls surfacing in 1994, Sogdian "Ancient Letters"
recovered by Aurel Stein, Khara-Khoto's Tangut library carted off by Kozlov, the Khitan
scripts still only partly read. The tree-plus-timeline layout fits this better than it fits
living families.

**Tree sketch (by family, with script as the anchor).**
```
Indo-European
├─ Tocharian A (Agnean, Karashar) · Tocharian B (Kuchean) — Buddhist translators
├─ Khotanese Saka, Tumshuqese — the kingdom of Khotan
├─ Sogdian — the Silk Road lingua franca ("Ancient Letters", 313 CE; Mount Mugh archive)
│   └─ Yaghnobi — the sole surviving descendant (Tajikistan)
├─ Bactrian — the only Iranian language written in Greek script (Rabatak inscription)
└─ Khwarezmian
Indo-Aryan: Gāndhārī (Kharoṣṭhī) · Niya and Kroraina Prakrit documents
Sino-Tibetan: Tangut 西夏 (Western Xia, 1038–1227; script deciphered in the 20th c.)
              Zhangzhung (Bon corpus) — cross-listed with the Tibeto-Burman atlas
Para-Mongolic & Tungusic: Khitan large and small scripts (Liao; partly undeciphered)
                          Jurchen (Jin) — cross-listed with the Tungusic atlas
Turkic: Old Uyghur (Turfan, Manichaean texts; Xuanzang's hosts at Gaochang, 630)
        Orkhon Turkic (Kül Tigin stele, 732) · Yenisei runiform Kyrgyz
Relic/uncertain: Rouran, Xiongnu (transcription fragments), Xianbei and Wuhuan words
```

**Extent.** `[85, 41]`, zoom 4.2 — the Tarim Basin and Hexi corridor: Kucha, Karashar,
Turfan, Khotan, Kashgar, Niya, Miran, Loulan, Dunhuang, Khara-Khoto.

**Sketch geometry.** Oasis belt + Taklamakan + Tianshan + Hexi corridor; markers become
"document find-spots" with a caption replacing the representative-city caveat.

**Special engine notes.** The timeline becomes the primary panel; add optional "script" chips
(Kharoṣṭhī, Brāhmī, Sogdian, Manichaean, Tangut, Khitan, runiform) and a
"deciphered / partial / undeciphered" chip. This is the only atlas where the
endangered-language colour semantics invert (extinct = default, not alarm).

**Sources.** Sims-Williams on Sogdian and Bactrian · Adams, *A Dictionary of Tocharian B* ·
Emmerick on Khotanese · Salomon, *Ancient Buddhist Scrolls from Gandhāra* · Gong
Hwang-cherng and Nishida on Tangut · Janhunen and Kane on Khitan and Jurchen · Tekin on
Orkhon Turkic · Mallory & Mair, *The Tarim Mummies* (with its controversies flagged).

### 2.13 Siberian isolate pocket — 🌫 someday

Nivkh (Amur/Sakhalin, an isolate), Ainu (cross-listed), Yukaghir (Tundra and Forest), the
Chukotko-Kamchatkan family (Chukchi, Koryak, Alutor, Kerek †, Itelmen), and Ket —
Yeniseian's lone survivor and the pivot of the proposed Dené–Yeniseian link. Extent
`[150, 62]`, zoom 3.2. This is the "peoples before the farmers" companion to the Japonic and
Formosan atlases, and the widest, thinnest atlas in the series; defer until the engine and
the sketch-geometry workflow are well proven.

> **Ainu is now built elsewhere.** Phase 3 (`atlas-japonic.js`) treats Ainu in full — Hokkaidō,
> Sakhalin and Kuril, with the two extinct varieties and their 1962/1994 dates. When Phase 8 is
> written, cross-link to `#japonic/ainu` rather than duplicating those nodes; `research.md`
> `[JP-107]` records this decision.

---

## 3. Roadmap

| Phase | Work | Output | Status |
|-------|------|--------|--------|
| **0** | Engine refactor per §1.4, Sinitic data extracted | `EastAsiaAtlas.html` + `atlas-sinitic.js`, behaviour identical to today; `index.html` card updated | ✅ done |
| **0.5** | **Sinitic verification sweep** (§1.6) — the existing prose predates the protocol | `research.md` → `Sinitic retrofit` section | ⏭️ **skipped by instruction** (verification had already been done; the 42 seeded targets stay `⬜ unverified` in the log) |
| **1** | Tungusic atlas (§2.2) — research first, then write | `atlas-tungusic.js` — proves multi-extent, multi-script, dormant-language handling | ✅ done |
| **2** | Kra–Dai (§2.3) | `atlas-kradai.js` — 36 nodes, 114 markers; reuses the south-China extent; cross-atlas links live in both directions | ✅ done |
| **3** | Japonic & Ainu (§2.5) | forces the new sketch-geometry workflow (Japan arc, Ryukyus, Sakhalin) | ✅ done — `atlas-japonic.js`, 23 nodes, 102 markers, 11 sketch polygons; `JP-102` self-correction, `JP-104` source conflict |
| **4** | Mongolic (§2.4) | script-history spine; Shirongolic cluster and Kalmyk outliers | ✅ done — `atlas-mongolic.js`, 26 nodes, 108 markers, 7 sketch polygons; `MG-104` two-part self-correction, `MG-102` four speaker conflicts, `MG-105` ISO findings, `MG-111` re-check (unlogged Oirat figure, self-contradicting source, one unsourced number removed) |
| **5** | Silk Road lost languages (§2.12) | validates "special mode" (all-extinct, timeline-first, script chips) | ✅ done — `atlas-silkroad.js`, 34 nodes, 78 markers, 5 sketch polygons; three opt-in engine switches added (`timelineFirst`, per-node `chips`, `kinds`) plus an `spSuffix` wording fix; `SR-105` ISO register findings, `SR-106` Rouran dispute |
| **6** | Tibeto-Burman (§2.7) | the big one; shared ancestor nodes with Sinitic | ✅ done — `atlas-tibetoburman.js`, 56 nodes, 164 markers, 5 sketch polygons; **the family's own premise is disputed and stated on the root node** (`TB-101`); Karen's placement disputed (`TB-109`); register findings at `TB-105` |
| **7** | Hmong–Mien (§2.8) · Koreanic (§2.6) · Formosan (§2.10) · Turkic (§2.9, scope decision) · Austroasiatic (§2.11) | in whatever order appetite dictates | 💤 not started |
| **8** | Siberian isolate pocket (§2.13) | optional capstone | 💤 not started |

**Cross-atlas links** use plain hash URLs in the prose (`<a href="#kradai/zhuang">`), so they are
real navigations, keyboard-reachable, and need no extra widget. `#family/node` routing means
every one of them is also a shareable link.


**Research gate on every phase.** A phase is not complete until its `research.md` section
covers every claim shipped in that atlas: no unlogged facts, every disputed item hedged in
the prose, and each correction from a superseded claim recorded rather than quietly dropped.
The log is written incrementally *during* the phase (small batches, appended immediately),
never reconstructed from memory at the end.

### Per-atlas definition of done

- [ ] `research.md` section opened for this atlas **before** any prose is written
- [ ] Tree drafted and reviewed (node ids, branch palette, ancestral stages)
- [ ] Prose written for every node: history paragraphs + timeline entries
- [ ] Every claim in the prose has a log entry (verified / disputed / superseded) — zero unlogged facts
- [ ] Conflicting sources written into the prose, not silently resolved
- [ ] Unverifiable claims cut or framed explicitly as tradition/legend
- [ ] `features` list per node ("what makes it distinctive")
- [ ] Markers placed (representative settlements + diaspora), each with a source-checked label
- [ ] Coarse `areas` polygons drawn for every branch, with the caveat caption
- [ ] `sketchGeo` outline drawn (or the "offline sketch unavailable" caption fallback)
- [ ] ISO 639-3 codes filled; listen links (Omniglot / Forvo / YouTube fallback) checked
- [ ] `sources` note written for the root node, naming the standard works
- [ ] Fonts declared and loaded; native scripts render correctly
- [ ] Hash routes work (`#family/node`); toggle in and out of the atlas without errors
- [ ] Smoke-tested in a browser: filter, sketch mode, area overlay, sheet mode on narrow widths
- [ ] Status updated in §0 of this file; `index.html` card added if it is the first atlas after Sinitic

---

*Last updated: 2026-09-26 — plan drafted; research & verification protocol (§1.6–1.7), the
GitHub Pages hosting note, and the `research.md` ledger added. No atlas files written yet.*

