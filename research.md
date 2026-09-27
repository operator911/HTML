# research.md — Verified-Claims Ledger

The evidence log for the East Asian Language Atlas series (see `languages.md` §1.6–1.7).

**This file is a ledger, not prose.** It exists so that verified facts survive session
compaction: every claim that goes into an atlas is written here, with its source, the moment
it is checked — never reconstructed from memory afterwards.

## Rules

1. **Append-only.** New entries are added in small batches (one search, or one node cluster at
   a time). Corrections are added as new `superseded` entries that reference the old id — the
   old entry is never rewritten or deleted.
2. **Self-contained entries.** Enough detail (claim, URL, date, what the source says) that a
   future session with zero memory of the search can re-verify or reuse it.
3. **No unlogged facts.** If it is in an atlas file, it is in here.
4. **Never cite what was not fetched.** Paywalled or inaccessible → `secondary — not fetched`.
5. **Leads ≠ sources.** Wikipedia, blogs, press and AI summaries may point the way, but the
   citation must be the underlying standard work, paper, or official source.
6. **Conflicts are content.** Where sources disagree, the disagreement goes into the atlas
   prose and the entry is tagged `disputed`.
7. **Search languages.** English + Chinese (汉语/方言) by default; add Japanese, Korean,
   Russian, Thai, Vietnamese or Mongolian where the family requires it.
8. **Never write two opening braces together, or an opening brace followed by a percent sign.**
   GitHub Pages renders this file through Jekyll's Liquid engine, which reads a double-brace pair
   as a variable expression and **aborts the whole build** — that is exactly what broke the Pages
   deployment at `[KO-108]`. MediaWiki template syntax is therefore logged **brace-free**: a
   `citation needed` template carrying a `date=August 2013` argument is written
   `citation needed (dated August 2013)`, and a `sfnp` template citing Vovin 2013c p. 201 is
   written `sfnp citing Vovin 2013c, p. 201`. The same rule applies to `languages.md`. See
   `[DP-101]` below for the incident and the alternatives.

## Entry template

```md
### [SR-000] Short title of the claim
- **Claim as written:** "…"
- **Appears in:** atlas-<family>.js → node `<id>`, paragraph N
- **Verdict:** verified | corrected | disputed | unverifiable | superseded
- **Source:** Author, *Title* (Year) · URL · retrieved YYYY-MM-DD
- **What the source says:** 1–2 sentences, quoted where the wording matters.
- **Confidence:** high | medium | low
- **Action:** none needed | prose edited | hedged | cut
```

## Counters

| Atlas | Logged | Verified | Disputed | Superseded | Still unverified |
|-------|--------|----------|----------|------------|------------------|
| Sinitic (retrofit) | 0 | 0 | 0 | 0 | 42 seeded targets below — **sweep skipped by instruction (Phase 0.5)** |
| Tungusic | 8 | 8 | 0 | 0 | — |
| Kra–Dai | 9 | 9 | 0 | 0 | — |
| Mongolic | 11 | 8 | 1 | 1 | — |
| Japonic & Ainu | 10 | 8 | 1 | 1 | — |
| Koreanic | 9 | 7 | 2 | 0 | — |
| Tibeto-Burman | 10 | 9 | 1 | 0 | — |
| Hmong–Mien | 9 | 7 | 2 | 0 | — |
| Turkic | 11 | 9 | 2 | 0 | — |
| Formosan | 8 | 7 | 1 | 0 | — |
| Austroasiatic | 0 | 0 | 0 | 0 | atlas not written |
| Silk Road | 10 | 9 | 1 | 0 | — |
| Siberian isolates | 0 | 0 | 0 | 0 | atlas not written |

> **Corrected 2026-09-26.** This table previously carried invented counts for ten atlases that
> have never been researched — Mongolic 6, Japonic 6, Koreanic 6, Tibeto-Burman 7, Hmong–Mien 5,
> Turkic 6, Formosan 6, Austroasiatic 6, Silk Road 7, Siberian 5 — and the note below claimed
> Phases 1–8 had all been built. Neither was true. The counters above now count only entries that
> are actually present in this file, and a family with no atlas gets 0 across the row.
>
> **Files on disk as of 2026-09-27:** `atlas-sinitic.js`, `atlas-tungusic.js`, `atlas-kradai.js`,
> `atlas-japonic.js`, `atlas-mongolic.js`, `atlas-silkroad.js`, `atlas-tibetoburman.js`,
> `atlas-korean.js`, `atlas-hmongmien.js`, `atlas-turkic.js` and `atlas-formosan.js` — Phases 0–6
> plus Koreanic, Hmong–Mien and Turkic of Phase 7, and now **Formosan** too. Their rows above are
> the only ones backed by an atlas; the remaining two families read 0 because nothing has been
> researched for them yet, not because a search came up empty.

> **Phase 0.5 status: SKIPPED.** The user confirmed on 2026-09-26 that the Sinitic
> verification had already been carried out at an earlier time, so the sweep was not re-run
> in this session. The 42 targets below therefore remain `⬜ unverified` and must not be
> treated as checked. Recorded so a later session does not mistake the omission for a pass.

> **Honesty note on scope.** Only Phases 0–6 plus Koreanic, Hmong–Mien and Turkic (the first three
> atlases of Phase 7) have been carried out. For those, each atlas's
> load-bearing dates, figures and classifications were checked with targeted searches and
> logged below with the URL actually fetched; less load-bearing colour in the prose is
> written from the standard works named in each atlas's `sources` note and is flagged in the
> entry where it was not independently re-fetched. Where a figure is a range, the prose says
> "by source". Nothing here is cited that was not read. The rest of Phases 7–8 are unwritten:
> their sections in this file are empty by design, not by omission.
>
> ⚠ **One exception, found and closed on 2026-09-26.** The Mongolic Oirat figure (368,000) was
> in the atlas from the start and *was* read from the source — but it had no entry in this file
> until `[MG-111]`, so for a while the sentence above was not strictly true of it. The same
> re-check also found a Mongolic number (5.6 million) that was in **no** source at all and has
> been removed. Both are recorded at `[MG-111]`. The claim above is now accurate; it was
> previously an aspiration, and that is worth knowing when reading any entry written before
> that date.

---


## Sinitic retrofit — verification targets

Seeded 2026-09-26 from the existing `ChineseLanguagesMap.html` prose. All are **⬜ unverified**:
this is the Phase 0.5 worklist, not a record of completed checks. Each becomes an `SR-###`
entry when checked.

**Classification & framework**
- [ ] ⬜ SR-001 "The *Language Atlas of China* (1987; 2nd ed. 2012) recognises ten main branches; older textbooks teach seven or eight."
- [ ] ⬜ SR-002 "李荣 Li Rong's 1985 reclassification promoted Jin from Mandarin dialect to a branch; adopted by the Atlas."
- [ ] ⬜ SR-003 The Atlas's promotion of Hui and Ping to top-level status (and the dispute over both).
- [ ] ⬜ SR-004 "中国语言资源保护工程 (launched 2015) has recorded 1,700-plus survey points."

**Ancestral stages**
- [ ] ⬜ SR-005 《切韵》 *Qièyùn*, 601 CE, compiled by 陆法言 Lu Fayan with eight colleagues.
- [ ] ⬜ SR-006 《中原音韵》 *Zhōngyuán Yīnyùn*, 1324, 周德清 Zhou Deqing — Old Mandarin four tones, no entering tone.
- [ ] ⬜ SR-007 "Old Chinese had no lexical tones" (Baxter–Sagart; 郑张尚芳 Zhengzhang) and 梅祖麟 Mei Zulin's 1970 tonogenesis account (*-s, *-ʔ).
- [ ] ⬜ SR-008 Qin conquest of Lingnan 214 BCE and the 灵渠 Lingqu canal; Han annexations of Minyue (110 BCE) and Nanyue (111 BCE).

**Mandarin sub-groups**
- [ ] ⬜ SR-009 柳条边 Willow Palisade closure (1668–1860) and the *Chuǎng Guāndōng* migration.
- [ ] ⬜ SR-010 Beijing: 1153 Jin Zhongdu; 1267 Yuan Dadu; 1913 读音统一会; 1932 《国音常用字汇》; 1955–56 Putonghua definition.
- [ ] ⬜ SR-011 "Beijing's érhuà and neutral tones reflect Mongol/Manchu contact" — the disputed-contact claim.
- [ ] ⬜ SR-012 Tianjin's speech descends from Ming garrisons recruited in Anhui/Jiangsu (曾晓渝 Zeng Xiaoyu).
- [ ] ⬜ SR-013 湖广填四川 *Huguang tián Sìchuān* (1660s–1770s); Sichuan's 1640s depopulation; the 岷江小片 Minjiang sub-group keeping 入声.
- [ ] ⬜ SR-014 左宗棠 Zuo Zongtang's reconquest of Xinjiang, 1876–79, and the Zhongyuan-derived speech of the southern oases.
- [ ] ⬜ SR-015 东干 Dungan: flight after the 1862–77 revolts, arrival 1878, ~100,000 speakers in Kyrgyzstan/Kazakhstan, Cyrillic orthography.

- [ ] ⬜ SR-016 Jianghuai Mandarin's retained 入声; Nanjing as Ming koine after 1368; the 1864 Taiping fall and repopulation.

**Wu**
- [ ] ⬜ SR-017 Wu waves: Yongjia 311/317, Hou Jing 548, An Lushan 755 / Huang Chao 879, Southern Song Lin'an 1127–1276.
- [ ] ⬜ SR-018 Shanghainese: treaty port 1843; the Suzhou/Ningbo input to its koine; 得律风 as a telephone loan; 2010s fluency surveys of Shanghai children.
- [ ] ⬜ SR-019 Wenzhou: the "devil's language" nickname; the 1979 Sino-Vietnamese "code talker" story as **undocumented** (the existing hedge must be shown to hold).
- [ ] ⬜ SR-020 Suzhou's prestige, Kunqu stage language, 评弹 píngtán.

**Xiang / Gan / Hakka**
- [ ] ⬜ SR-021 Old Xiang (Loudi, Shuangfeng) still voiced 全浊 initials; New Xiang devoiced; the five recognised subgroups.
- [ ] ⬜ SR-022 江永女书 Nüshu and the disputed affiliation of 江永土话 (Xiang vs northern-Guangxi Pinghua).
- [ ] ⬜ SR-023 曾国藩 Zeng Guofan's 湘军 and the 1850s Xiang prestige claim.
- [ ] ⬜ SR-024 Gan's nine sub-groups (昌都/宜浏/吉茶/抚广/鹰弋/大通/耒资/洞绥/怀岳); 邓茂七 Deng Maoqi 1448–49 and 叶宗留 Ye Zongliu revolts; 江西填湖广.
- [ ] ⬜ SR-025 Hakka: the Yongjia/Tang–Song/Mongol migration narrative as historiography; Hakka's closest relative being Gan.
- [ ] ⬜ SR-026 六堆 Liudui militias 1721 (朱一貴 Zhu Yigui) and 1732 (吳福生 Wu Fusheng); 義民 yimin tied to 林爽文 Lin Shuangwen 1787–88.
- [ ] ⬜ SR-027 Punti–Hakka clan wars 1854–67 and the "hundreds of thousands dead" figure; Sandakan's Hakka majority.
- [ ] ⬜ SR-028 Taiwan Hakka: ~1 in 5 islanders; 1988 還我母語 movement; 2010 客家基本法; 2018 國家語言發展法.

**Min**
- [ ] ⬜ SR-029 Proto-Min / Norman's softened initials with the specific examples (目 ba̍k, 我 guá, 茶 tê, 陳 tân); Min splitting off before the Qieyun layer.
- [ ] ⬜ SR-030 陈政/陈元光 669 garrison; the 固始 Wang brothers 885 and the "eighteen surnames" tradition; 1087 Quanzhou maritime trade bureau; Marco Polo c. 1291–92 and Ibn Battuta on Zayton; the 1684 sea-ban lifting.
- [ ] ⬜ SR-031 Hokkien: pe̍h-ōe-jī in the 1850s; Douglas's Amoy dictionary 1873; Taiwan's Mandarin-only schooling 1945–87; 2019 National Languages Development Act.
- [ ] ⬜ SR-032 Teochew: Han Yu's 819 exile; Swatow treaty port 1860; King Taksin 1767–82; Ngee Ann Kongsi founded in the 1840s; Penang/Singapore/Manila/Medan settlement origins.
- [ ] ⬜ SR-033 Hainan: Han commanderies from 110 BCE; 冼夫人 Lady Xian in the 6th century; 12th–13th-century Lý-dynasty refugee families; Hainan province 1988.
- [ ] ⬜ SR-034 Min branch split: the classic five-way division vs. the 2012 Atlas's 邵将 and 琼文/雷州 primary divisions.

**Yue / Hui / Ping / Unclassified**
- [ ] ⬜ SR-035 赵佗 Zhao Tuo's Nanyue 204 BCE at 番禺 Panyu; Han annexation 111 BCE; the 南越王墓 tomb excavated 1983; 黄巢 Huang Chao's 879 sack of the 蕃坊.
- [ ] ⬜ SR-036 Taishanese as the pre-1960s speech of North American Chinatowns; 开平碉楼 Kaiping diaolou as UNESCO-listed.
- [ ] ⬜ SR-037 徽商 Huizhou merchants' 14th–19th-century dominance; Taiping devastation of Huizhou; Hui's 6–8-tone valleys.
- [ ] ⬜ SR-038 Ping: the 214 BCE 灵渠 Lingqu canal route; Ping speakers counted as Zhuang; the north/south Ping split.
- [ ] ⬜ SR-039 Unclassified node: 瓦乡话 Waxiang ~700k speakers; 韶州土话; 迈话 Maihua and 儋州话 Danzhouhua (~700k); 军话; 五屯话 Wutun in Qinghai.
- [ ] ⬜ SR-040 Speaker figures throughout (1.4 bn Sinitic; 800–940 m Mandarin; the per-branch figures) — log as one cluster of "by source" ranges rather than individual facts.
- [ ] ⬜ SR-041 ISO 639-3 codes in the `ISO` map (`och`, `ltc`, `cmn`, `cjy`, `wuu`, `hsn`, `gan`, `hak`, `nan`, `mnp`, `cdo`, `cpx`, `czo`, `yue`, `czh`, `cnp`, `csp`, `dng`) against the current SIL/Ethnologue register.
- [ ] ⬜ SR-042 Link health (not fact): every Omniglot and Forvo URL in `SOUND`, plus the Forvo ISO-code paths.

## Other atlases — research queues

Opened when each phase begins, seeded from that family's §2 brief in `languages.md`.

### Tungusic (Phase 1) — ✅ done
- [x] Willow Palisade / Manchu–Chinese contact claims (shared with SR-009) — see `[TU-101]`
- [x] Xibe relocation to Qapqal, 1764; present-day written Manchu in Xinjiang — `[TU-104]`
- [x] Jurchen → Manchu script lineage; the 1599/1632 Manchu script reforms — `[TU-102]`, `[TU-103]`
- [x] Speaker status of each language (dormant vs. endangered vs. vigorous) — `[TU-105]`–`[TU-108]`


### Kra–Dai (Phase 2) — ✅ done
- [x] Family size, branch inventory, and the absence of an ISO code — `[KD-101]`
- [x] Zhuang's macrolanguage structure and its sixteen active codes — `[KD-102]`
- [x] Sui's consonant inventory and the Shuishu ritual script — `[KD-103]`
- [x] Ahom: extinct vernacular, revived teaching, Buranji chronicles — `[KD-104]`
- [x] Hainan: Hlai, Jiamao (non-Hlai core), Ong Be (Be–Tai vs Be–Jizhao) — `[KD-105]`, `[KD-108]`
- [x] Bouyei and Kam figures; the 2009 UNESCO Dong grand-song listing — `[KD-106]`
- [x] Proto-Tai tone reconstruction: Li 1977, Pittayaporn 2009 — `[KD-107]`
- [x] Biao–Lakkia: the four competing classifications — `[KD-108]`
- [x] Link health for every Omniglot URL in `SOUND` — `[KD-109]`

### Japonic & Ainu (Phase 3) — ✅ done
- [x] Family inventory: Japonic (Japanese + Ryukyuan + Hachijō) and Ainu as a separate family — `[JP-101]`
- [x] Kyūshū dialect tripartition: Hichiku / Hōnichi / Satsugu — `[JP-102]` (self-correction)
- [x] Ryukyuan: six languages, eleven ISO codes, the speaker table, 71% Okinawan–Japanese cognacy — `[JP-103]`
- [x] UNESCO endangerment grades for all eight Japanese entries — `[JP-104]` (conflict logged)
- [x] Hachijō: no 639-3 code, <1,000 speakers, Eastern Old Japanese descent — `[JP-105]`
- [x] Ainu speaker figures: 2011, 2017 and 2023 Hokkaidō surveys, the 2022 "dormant" verdict — `[JP-106]`
- [x] Sakhalin (1994) and Kuril (1962) Ainu extinction dates and their absent ISO codes — `[JP-107]`
- [x] Ainu script history, Chiri Yukie 1923, and the 1997 / 2008 / 2019 / 2020 recognition sequence — `[JP-108]`
- [x] Proto-Japonic, the Yayoi spread, Old Japanese `ojp`, and the Ryukyu annexation timeline — `[JP-109]`
- [x] Link health for every Omniglot URL in `SOUND` — `[JP-110]`

### Mongolic (Phase 4) — ✅ done
- [x] Family size, the absence of established living relatives, para-Mongolic and the Altaic dispute — `[MG-101]`
- [x] The Janhunen/Nugteren speaker table and its conflicts with Wikipedia's own infoboxes — `[MG-102]`
- [x] Script spine: Uyghur-derived 1204, ʼPhags-pa 1269, Galik 1587, Clear Script 1648, Vagindra, Cyrillic 1941/1946 — `[MG-103]`
- [x] ⚠ The *Secret History*'s date — the brief's "1240" corrected — `[MG-104]`
- [x] ISO findings: `mon`/`bua` macrolanguages, `xwo` Extinct, `xng`/`cmg` historical, Oirat uncoded — `[MG-105]`
- [x] Kalmyk: the 1630 Volga migration, the Khanate, and Europe's only Buddhist-majority polity — `[MG-106]`
- [x] The Shirongolic cluster and its three scripts (Latin, Arabic, Tibetan) — `[MG-107]`
- [x] The mixed Sinitic–Mongolic languages Tangwang and Wutun — the cross-link into Sinitic — `[MG-108]`
- [x] Moghol, Dagur's historical Manchu script, Khamnigan, and the Manchu/Xibe script lineage — `[MG-109]`
- [x] Link health for every Omniglot URL in `SOUND` — `[MG-110]`
- [x] ⚠ **Re-check pass:** three figure problems found and fixed — an unlogged Oirat figure, a source that contradicts itself on Inner Mongolia, and a number with no source behind it — `[MG-111]`
- [x] **Atlas built:** `atlas-mongolic.js` — 26 nodes · 108 markers · 4 branches · 9 palette classes ·
      7 sketch polygons (Mongolia, Buryatia, Kalmykia, Xinjiang, Gansu–Qinghai, Manchuria, Herat).
      `node tools/check-atlas.js` passes (26 nodes · 108 markers · 26 iso · 26 features) and the
      headless Edge smoke test of `#mongolic` and `#mongolic/kalmyk` passes. `status:'done'` in
      `EastAsiaAtlas.html`.

### Formosan — ✅ done
- [x] ⚠ **The family is not a family.** `acceptance = geographic`, `glotto = none`, and "up to nine
      separate primary subfamilies" — so the tree is drawn as a place, with no Proto-Formosan trunk — `[FO-101]`
- [x] Rukai and Puyuma: the two infoboxes with no `fam2`, Li's divergence chronology, and Rukai as
      the family's first split — `[FO-102]`
- [x] Tsouic, and a branch that may not exist: `fam2 = "Tsouic ?"` in all three members — `[FO-103]`
- [x] The plains and the north-west: Thao at four speakers, Saisiyat's 4,750, Kavalan off its own coast — `[FO-104]`
- [x] The two revival stories: Sakizaya's 129 years as an Amis dialect, Pazeh–Kaxabu extinct and
      alive in one node — `[FO-105]`
- [x] Yami, Tsat and Seediq: the three edge cases, including the two languages in this atlas that
      are **not Formosan at all** — `[FO-106]`
- [x] ⚠ **Prose rewrite:** the reader-facing text was written in development jargon — `infobox`
      25×, `this node` 6×, ⚠ 30× — and was rewritten so it describes languages rather than the
      machinery that displays them. Nothing factual was dropped — `[FO-107]`
- [x] Link health measured for fourteen Omniglot pages, the `sigfig` rounding artefact caught,
      and the coordinate-order trap in `areas`/`sketchGeo` found and fixed — `[FO-108]`
- [x] **Atlas built:** `atlas-formosan.js` — 26 nodes · 101 markers · 9 primary branches ·
      12 palette classes · 4 sketch polygons (Taiwan, Orchid Island, Hainan, Batanes) ·
      11 hand-drawn core areas. `node tools/check-atlas.js atlas-*.js` passes
      (26 nodes · 101 markers · 26 iso · 26 features) and the headless Edge smoke tests of
      `#formosan/amis` and `#formosan/tsat` pass. No new font registration was needed.
      `status:'done'` in `EastAsiaAtlas.html`.

### Austroasiatic · Vietic (Phase 7) — ⬜ not started
- [ ] ⬜ _section to be seeded at the start of that phase, from the brief's dates, names, figures and classifications_
- [ ] ⬜ **Not written.** Its row in the Counters table reads 0 and its status in `languages.md` §0 is
      💤 planned. Do not seed entries here until research actually happens.
- [ ] ⚠ **Check the log prefix against this file before the first entry.** `AU-` and `AA-` are both
      reserved for it — the collision that produced `[TK-112]` cost a renumbering pass and is cheaper
      to avoid than to fix. **`FO-` was checked this way before `[FO-101]` was written, and the check
      worked: no collision this time.**

### Turkic (Phase 7) — ✅ done
- [x] **Scope decision:** the brief's option (b), the **full family** — `[60, 42]`, zoom 2.6,
      Istanbul to Yakutsk — on instruction, against the brief's own recommendation of option (a) — `[TK-101]`
- [x] Family-level facts: 35+ languages, ≈200 million speakers, two branches, the *z*/*r* and *š*/*l*
      correspondence — `[TK-101]`
- [x] Oghuz: the 108 million, the three-quarters-of-the-family figure, and the dispute over Oghuz ancestry — `[TK-102]`
- [x] Chuvash, Bulgar and Khazar: the one surviving Oghuric language, and the branch whose relatives are
      partly a guess — `[TK-103]`, `[TK-109]`
- [x] Siberian Turkic: Sakha, Tuvan, Khakas, and the Fuyu Kyrgyz mis-filing catch — `[TK-104]`
- [x] Karluk, Arghu and the two Chinese relics: Uzbek, Uyghur, Ili Turki, Western Yugur, Khalaj — `[TK-105]`
- [x] Kipchak–Nogai and Kipchak–Cuman: Karakalpak, Nogai, Crimean Tatar — `[TK-106]`
- [x] Altai's unresolved classification, and the two-ISO-code situation — `[TK-107]`
- [x] Two new fonts validated against the Google Fonts API; `Noto Sans Cyrillic` found not to exist — `[TK-108]`
- [x] Old Turkic's real position, Ili Turki's "30 families", and **link health measured rather than
      assumed** — four expected Omniglot pages turned out not to exist — `[TK-110]`
- [x] ISO codes re-read where the fetch had truncated them (Turkish, Chagatai); one figure left
      deliberately unresolved — `[TK-111]`
- [x] ⚠ **Log-prefix collision found and fixed** (`TU-` was Tungusic's), plus the full verification pass — `[TK-112]`
- [x] **Atlas built:** `atlas-turkic.js` — 38 nodes · 173 markers · 2 branches at the root and five
      under Common Turkic · 10 palette classes · 6 sketch polygons (Europe, Caucasus–Volga, Central Asia,
      Siberia, Altai–Sayan, Xinjiang–Gansu–Mongolia). `node tools/check-atlas.js` passes
      (38 nodes · 173 markers · 30 iso · 38 features) and the headless Edge smoke test of
      `#turkic/chuvash` passes. `status:'done'` in `EastAsiaAtlas.html`.

> **Silk Road (Phase 5), Tibeto-Burman (Phase 6) and Koreanic + Hmong–Mien + Turkic (Phase 7)** have
> moved out of this queue — their atlases are written and their logs (`SR-101`–`SR-110`,
> `TB-101`–`TB-112`, `KO-101`–`KO-109`, `HM-101`–`HM-109`, `TK-101`–`TK-112`) are below.

## Tungusic (Phase 1) — research log

All URLs below were fetched and read on **2026-09-26**.

### [TU-101] The family: size, subgrouping, and the "most spoken" ranking
- **Claim as written:** "Tungusic is a family of about a dozen living languages with roughly 75,000 native speakers; it splits into a Northern (Ewenic–Udegheic) and a Southern (Jurchenic–Nanaic) branch; Xibe is the most widely spoken, then Evenki, then Even."
- **Appears in:** `atlas-tungusic.js` → node `tungusic` (root), paragraphs 1–2
- **Verdict:** verified
- **Source:** *Tungusic languages*, Wikipedia · https://en.wikipedia.org/wiki/Tungusic_languages · retrieved 2026-09-26 · citing the standard literature (Benzing, Cincius, Janhunen)
- **What the source says:** "There are approximately 75,000 native speakers of the dozen living languages of the Tungusic language family. Today, the most spoken language in the family is Xibe … It is followed by the northern Tungusic languages Evenki … and Even." Classification given as "Northern (Ewenic–Udegheic) / Southern (Jurchenic–Nanaic)", ISO 639-5 `tuw`, Glottolog `tung1282`.
- **Confidence:** medium (the 75,000 total is a rounded aggregate; the prose says "about 75,000 by source")
- **Action:** prose hedged ("about … by source"); ranking used as written
- **Note:** the same page records the standard caveat that some scholars reject a clean tree for Tungusic and treat it as a dialect continuum; that caveat is carried into the root node's prose.

### [TU-102] ⚠ CORRECTION — the Manchu script is *not* descended from the Jurchen script
- **Claim as written (in `languages.md` §2.2 brief):** "Jurchen (historical) → Manchu script lineage"
- **Appears in:** `atlas-tungusic.js` → node `manchu`; also `languages.md` §2.2 tree sketch
- **Verdict:** **corrected** — the brief conflated the *language* lineage with the *script* lineage
- **Source:** *Manchu language*, Wikipedia §Writing system · https://en.wikipedia.org/wiki/Manchu_language · retrieved 2026-09-26; and *Manchu alphabet* §Tongki fuka akū hergen · https://en.wikipedia.org/wiki/Manchu_alphabet · retrieved 2026-09-26
- **What the sources say:** "The Manchu language uses the Manchu script, which was derived from the traditional Mongol script, which in turn was based on the vertically written pre-Islamic Uyghur script. The Jurchen language, which is ancestral to Manchu, used the Jurchen script, which is derived from the Khitan script, which in turn was derived from Chinese characters. **There is no relation between the Jurchen script and the Manchu script.**"
- **Confidence:** high
- **Action:** prose edited — the atlas states the language is descended from Jurchen but the script is Mongolian-derived; the two lineages are kept visibly separate. `languages.md` §2.2 sketch corrected.

### [TU-103] Manchu alphabet: 1599 without dots and circles, 1632 with them
- **Claim as written:** "Nurhaci had the Mongolian alphabet adapted to Manchu in 1599 (*tongki fuka akū hergen*, 'script without dots and circles'); in 1632 Dahai added the dots and circles (*tongki fuka sindaha hergen*) and the *tulergi hergen*, ten extra letters for Chinese, Sanskrit and Tibetan loans."
- **Appears in:** `atlas-tungusic.js` → node `manchu`; timeline entries 1599 / 1632
- **Verdict:** verified
- **Source:** *Manchu alphabet* §Tongki fuka akū hergen / §Tongki fuka sindaha hergen · https://en.wikipedia.org/wiki/Manchu_alphabet · retrieved 2026-09-26
- **What the source says:** "in 1599 the Jurchen leader Nurhaci decided to convert the Mongolian alphabet to make it suitable for the Manchu people … The resulting script was known as *tongki fuka akū hergen* — the 'script without dots and circles'." "In 1632, Dahai added diacritical marks … a leading *k*, *g*, and *h* are distinguished by the placement of no diacritical mark, a dot, and a circle … *tongki fuka sindaha hergen*." Also: "Recently discovered manuscripts from the 1620s make clear, however, that the addition of dots and circles to Manchu script began before their supposed introduction by Dahai."
- **Confidence:** high
- **Action:** prose edited — the 1620s-manuscript caveat is included, so Dahai's 1632 date is presented as the traditional attribution, not the whole story.

### [TU-104] Xibe: the 1764 garrison move to Qapqal, and the language's present standing
- **Claim as written:** "Xibe troops were dispatched to the Xinjiang frontier in 1764 and settled in what is now Qapqal Xibe Autonomous County near the Ili valley; modern written Xibe is very close to Manchu, and Xibe is the most widely spoken Tungusic language."
- **Appears in:** `atlas-tungusic.js` → node `xibe`; timeline entry 1764
- **Verdict:** verified
- **Source:** *Xibe language*, Wikipedia · https://en.wikipedia.org/wiki/Xibe_language · retrieved 2026-09-26; *Manchu language* §Current situation · https://en.wikipedia.org/wiki/Manchu_language · retrieved 2026-09-26
- **What the sources say:** "Sibe troops were dispatched to the Xinjiang frontiers in 1764"; "With over 30 thousand speakers, it is the most widely spoken Tungusic language, accounting for over half of all speakers of Tungusic languages." Infobox: 30,000 speakers (2000, citing Ethnologue 18), 189,000 ethnic Sibe (2000), ISO 639-3 `sjo`, UNESCO **Severely Endangered**. The Manchu page adds: "The Xibe (or Sibe) are often considered to be the modern custodians of the written Manchu language … having been moved there by the Qianlong Emperor in 1764. Modern written Xibe is very close to Manchu, although there are slight differences in the writing system which reflect distinctive Xibe pronunciation."
- **Confidence:** high for the 1764 date and the Qapqal location; medium for "30,000" (a 2000 Ethnologue figure, so the prose says "about 30,000, by source")
- **Action:** prose hedged on the figure

### [TU-105] Manchu today: no native-speaker community left, but not dead
- **Claim as written:** "Very few native Manchu speakers remain — as of 2007 the last were thought to be eighteen octogenarians in Sanjiazi village, Fuyu County, Heilongjiang — while several thousand people now learn Manchu as a second language through school and adult classes, and revitalisation efforts have grown since the 1980s."
- **Appears in:** `atlas-tungusic.js` → node `manchu`, paragraphs 3–4
- **Verdict:** verified
- **Source:** *Manchu language* §Current situation · https://en.wikipedia.org/wiki/Manchu_language · retrieved 2026-09-26
- **What the source says:** "Currently, several thousand people can speak Manchu as a second language through primary education or free classes for adults offered in China. However very few native Manchu speakers remain … As of 2007, the last native speakers of the language were thought to be 18 octogenarian residents of the village of Sanjiazi … in Fuyu County, in Qiqihar, Heilongjiang Province. A few speakers also remain in Dawujia village in Aihui District of Heihe Prefecture." "Since the 1980s, there have been increased efforts to revive the Manchu language."
- **Confidence:** high
- **Action:** prose edited — the atlas calls Manchu *dormant*, not extinct, and says explicitly that the native transmission chain is broken (per languages.md §1.5).

### [TU-106] Evenki and Even: numbers, spread, and the Solon question
- **Claim as written:** "Evenki, the widest-spread Tungusic language, has about 24,000 speakers (2024) across Siberia, Inner Mongolia and Heilongjiang, and is severely endangered; Even (Lamut) has about 5,700 speakers (2010 census) scattered from the Lena to Kamchatka, with the Arman variety extinct since the 1970s."
- **Appears in:** `atlas-tungusic.js` → nodes `evenki`, `even`
- **Verdict:** verified
- **Source:** *Evenki language* · https://en.wikipedia.org/wiki/Evenki_language · retrieved 2026-09-26; *Even language* · https://en.wikipedia.org/wiki/Even_language · retrieved 2026-09-26
- **What the sources say:** Evenki infobox: 24,000 speakers (2024), ISO `evn`, "Cyrillic, Latin, Mongolian (experimentally)", UNESCO **Severely Endangered**; dialect list includes Solon. Even infobox: 5,700 speakers (2010 census) of 21,800 Evens, ISO `eve`, UNESCO **Severely Endangered**; "The now-extinct Arman dialect … (an archaic variety of Even, in the 1970s)".
- **Confidence:** medium-high (the Evenki 2024 figure is a single recent estimate; prose says "by source")
- **Action:** prose hedged on the Evenki figure; Solon presented as a dialect of Evenki (as the source does), with a note that Chinese sources often treat the Hulunbuir Solon/鄂温克 as a distinct variety.

### [TU-107] The Amur group: Nanai, Ulch, Uilta, Udege, Negidal, Oroch
- **Claim as written:** "The Amur and Ussuri languages are all critically or severely endangered: Nanai (Hezhen) about 1,400 speakers (2010) of some 17,000 ethnic Nanai; Ulch about 150 (2010); Uilta (Orok) 8–10 fluent speakers in 2019–2025; Udege 674 (2020 census) of 1,325 Udege; Negidal 6 (2017) / 29 (2020 census); and Oroch, whose last fluent speaker died in 2008."
- **Appears in:** `atlas-tungusic.js` → nodes `nanai`, `ulch`, `uilta`, `udege`, `negidal`, `oroch`
- **Verdict:** verified
- **Sources (all retrieved 2026-09-26):**
  - *Nanai language* https://en.wikipedia.org/wiki/Nanai_language — "about 1,400 speakers out of 17,000 ethnic Nanai"; ISO `gld`; UNESCO Severely Endangered.
  - *Ulch language* https://en.wikipedia.org/wiki/Ulch_language — "150 speakers (2010 census)" of 2,800 Ulch; ISO `ulc`; UNESCO Critically Endangered.
  - *Uilta language* https://en.wikipedia.org/wiki/Uilta_language — "8–10 (2019–2025)" and "116 (2020 census)"; ISO `oaa`; UNESCO Critically Endangered.
  - *Udege language* https://en.wikipedia.org/wiki/Udege_language — "674 (2020 census)" of 1,325 Udege; ISO `ude`; UNESCO Critically Endangered.
  - *Negidal language* https://en.wikipedia.org/wiki/Negidal_language — "6 (2017) / 29 (2020 census)"; ISO `neg`; UNESCO Critically Endangered.
  - *Oroch language* §Extinction https://en.wikipedia.org/wiki/Oroch_language — "According to the 2010 Census, there were eight speakers … The Association of Indigenous Peoples of the Khabarovsk Krai stated that the last fluent speaker of the Oroch language died in 2008. In 2010, this association held a meeting of elderly Orochi, who together were able to remember only about 20 Oroch words, and could not count to ten."
- **Confidence:** high for the shape (all six are moribund); medium for exact counts — censuses of these communities disagree wildly, and the Oroch page documents an actual census error (the 2002 figure of 257 is called erroneous because of confusion with *Orok*).
- **Action:** prose hedged throughout ("by source"); the Oroch census problem is reproduced, because it is the honest version of the story.

### [TU-108] Jurchen: the language behind Manchu, and its unrelated script
- **Claim as written:** "Jurchen was the Tungusic language of the Jin dynasty (1115–1234) in Manchuria; a script for it was created in 1119 by Wanyan Xiyin; the language is ancestral to Manchu, which was renamed from 'Jurchen' by Hong Taiji in 1635; the Jurchen script was derived from Khitan and fell out of use after the Jin collapse."
- **Appears in:** `atlas-tungusic.js` → node `jurchen`; timeline 1119 / 1185 / 1635
- **Verdict:** verified
- **Source:** *Jurchen language* · https://en.wikipedia.org/wiki/Jurchen_language · retrieved 2026-09-26; *Manchu alphabet* §Tongki fuka akū hergen · https://en.wikipedia.org/wiki/Manchu_alphabet · retrieved 2026-09-26
- **What the sources say:** "A writing system for Jurchen language was developed in 1119 by Wanyan Xiyin." "In 1635, Hong Taiji renamed the Jurchen ethnicity and language to 'Manchu'." ISO 639-3 `juc`. The Manchu alphabet page: "The Jurchen script has no relation to the Manchu alphabet, as it was derived from the Khitan script, itself derived from Chinese characters. After the collapse of the Jin dynasty, the Jurchen script fell into disuse." The 1185 Jin Victory Memorial Stele (大金得勝陀頌碑) is named as the most important surviving Jurchen text.
- **Confidence:** high
- **Action:** none needed (the stele is used as the concrete example in the prose)

### [TU-109] Manchu speaker figures conflict — and the Omniglot link check
- **Claim as written:** "Estimates of how many people speak Manchu disagree by two orders of magnitude: Omniglot gives about 100 speakers with only 20 literate, while the standard account has no native speakers left outside a handful of villages, plus several thousand second-language learners."
- **Appears in:** `atlas-tungusic.js` → node `manchu`, paragraph 3; `manchu` `features` entry
- **Verdict:** **disputed** (recorded as a disagreement, not resolved)
- **Source:** *Manchu alphabet and language*, Omniglot · https://omniglot.com/writing/manchu.htm · retrieved 2026-09-26 — "There are currently about 10 million Manchus living mainly in north-eastern China, of whom about 100 speak Manchu and only 20 can read and write it."; versus *Manchu language* §Current situation · https://en.wikipedia.org/wiki/Manchu_language · retrieved 2026-09-26 — "several thousand people can speak Manchu as a second language … very few native Manchu speakers remain … As of 2007, the last native speakers … 18 octogenarian residents of the village of Sanjiazi."
- **What the sources say:** the two figures measure different things — Omniglot's ~100 is *fluent/literate speakers*, the other counts *second-language learners* plus a residual native cohort. Both are unsourced to a single census.
- **Confidence:** low for any single number; high that the two published figures conflict
- **Action:** prose hedged — the atlas gives no single number and says explicitly that published counts differ by two orders of magnitude depending on whether learners are counted.

- **Link health (not fact):** every Omniglot URL used in `atlas-tungusic.js` was fetched or search-confirmed on 2026-09-26 —
  `writing/manchu.htm` (fetched, 200), `writing/evenki.htm` (fetched, 200), `writing/orok.htm` (fetched, 200),
  and `writing/even.htm`, `writing/jurchen.htm`, `writing/kili.htm`, `writing/nanai.htm`, `writing/negidal.htm`,
  `writing/oroch.htm`, `writing/oroqen.htm`, `writing/ulch.htm`, `writing/xibe.htm` (URLs confirmed via a
  `site:omniglot.com` search whose snippets reproduce each page's title and body text).
  `writing/udege.htm` follows the confirmed pattern but was **not** independently fetched — flagged here rather
  than silently assumed. Every node additionally carries the engine's YouTube-search fallback, which cannot 404.

## Kra–Dai (Phase 2) — research log

All URLs below were fetched or search-confirmed on **2026-09-26**.

### [KD-101] The family: ~93 million speakers, six branches, and no ISO code of its own
- **Claim as written:** "Kra–Dai is spoken by an estimated 93 million people across southern China, Hainan, Southeast Asia and Northeast India, and is usually divided into Kra, Kam–Sui, Biao–Lakkia, Be–Jizhao, Tai and Hlai–Jiamao; the family as a whole has no ISO 639-3 code — `tai` covers only the Tai branch."
- **Appears in:** `atlas-kradai.js` → node `kradai` (root)
- **Verdict:** verified
- **Source:** *Kra–Dai languages*, Wikipedia · https://en.wikipedia.org/wiki/Kra%E2%80%93Dai_languages · retrieved 2026-09-26
- **What the source says:** infobox: speakers "est. 93 million"; subdivisions Kra / Kam–Sui / Biao–Lakkia / Be–Jizhao / Tai / Hlai–Jiamao; Glottolog `taik1256`; geographic distribution "Southern China, Hainan Island, Southeast Asia, and Northeast India". The page carries an inline comment noting that ISO 639-2 "tai" is specifically for the Tai languages, not the whole Kra–Dai family.
- **Confidence:** high for the subgrouping and the ISO note; medium for "93 million", which is an undated estimate
- **Action:** prose says "an estimated 93 million by source"; the ISO caveat is stated explicitly, because the engine's ISO chip would otherwise imply a code that does not exist.

### [KD-102] Zhuang: one people, sixteen ISO codes
- **Claim as written:** "Zhuang is a macrolanguage (`zha`, ISO 639-1 `za`) covering sixteen individual ISO 639-3 codes — zch, zhd, zeh, zgb, zgn, zln, zlj, zlq, zgm, zhn, zqe, zyg, zyb, zyn, zyj, zzj — with a standardised written form and roughly 15.9 million speakers of the northern varieties by source."
- **Appears in:** `atlas-kradai.js` → node `zhuang`, "codes" feature entry
- **Verdict:** verified
- **Source:** *Zhuang languages*, Wikipedia · https://en.wikipedia.org/wiki/Zhuang_languages · retrieved 2026-09-26
- **What the source says:** infobox lists `iso1: za`, `iso2/iso3: zha`, and sixteen `lc` codes (Central Hongshuihe, Dai/Wenma, Eastern Hongshuihe, Guibei, Guibian, Lianshan, Liujiang, Liuqian, Minz, Nong/Yanguang, Qiubei, Yang/Dejing, Yongbei, Yongnan, Youjiang, Zuojiang Zhuang); speakers "15.9 million, all Northern Zhuang languages" (2007); scripts "Zhuang, Old Zhuang, Sawndip, Sawgoek"; a 1957 and a 1982 romanisation are both described. Glottolog note: "Zhuang is not a valid group".
- **Confidence:** high for the code list; medium for the speaker figure (a single 2007 count of the northern varieties only)
- **Action:** the atlas groups all sixteen codes under one node with a "codes" chip, as §2.3 directs, and states the figure as a northern-varieties count.

### [KD-103] Sui and the Shuishu script
- **Claim as written:** "Sui has about 300,000 speakers, almost all in Guizhou; its Sandong dialect has as many as seventy consonants; and it keeps a ritual script, the Shuishu 水書, alongside Latin and Chinese writing."
- **Appears in:** `atlas-kradai.js` → node `sui`
- **Verdict:** verified
- **Source:** *Sui language*, Wikipedia · https://en.wikipedia.org/wiki/Sui_language · retrieved 2026-09-26
- **What the source says:** ISO 639-3 `swi`; "Native speakers 300,000 (2023)"; region "Guizhou (93%), Guangxi, Yunnan"; "The language also has its own script, known as 'Shuishu' (水書) in Chinese, which is used for ritual purposes"; "Sui is also unique for its rich inventory of consonants, with the Sandong (三洞) dialect having as many as 70 consonants"; features "voiceless nasals (hm, hn), palatal stops, postvelar stops, prenasalized stops (mb, nd), and pre-glottalized stops and nasals (ʔb, ʔm)". Writing systems listed as "Latin script, Sui script, Chinese characters".
- **Confidence:** high
- **Action:** none needed; the prose keeps the Shuishu described as ritual/liturgical, which is what the source says.

### [KD-104] Ahom: a Southwestern Tai language of Assam, extinct and being revived
- **Claim as written:** "Ahom was the Tai language of the Assam kingdom; it died out as a spoken vernacular in the eighteenth or nineteenth century, and is now taught as a learned second language at universities in Assam."
- **Appears in:** `atlas-kradai.js` → node `ahom`; timeline entry 18th–19th c.
- **Verdict:** verified
- **Source:** *Ahom language*, Wikipedia · https://en.wikipedia.org/wiki/Ahom_language · retrieved 2026-09-26
- **What the source says:** ISO 639-3 `aho`; "Region: Assam"; "Extinct: 18th or 19th century AD"; "spoken as a learned second language; used in religious and educational purposes"; "revived: Teaching under educational institutions such as Dibrugarh University, Gauhati University and AHSEC"; "As of 2026, Ahom is classified as a critically endangered language by Ethnologue and linguists"; classification Southwestern Tai → Northwestern; script: Ahom script.
- **Confidence:** high
- **Action:** prose presents Ahom as extinct as a vernacular with a living liturgical and academic use, exactly as the source does, and notes that the "critically endangered" grade describes the language community, not spoken transmission.

### [KD-105] Hainan: Hlai, Jiamao and Ong Be
- **Claim as written:** "The Hlai languages of central Hainan have some 750,000 speakers, about a quarter of them monolingual; Jiamao, with about 52,000 speakers, is a divergent Kra–Dai language with a Hlai superstratum and a non-Hlai substratum; and Be/Ong Be, with about 600,000 speakers around Haikou, is of unresolved position inside the family, its speakers counted as Han Chinese."
- **Appears in:** `atlas-kradai.js` → nodes `hlai`, `jiamao`, `ongbe`
- **Verdict:** verified
- **Source:** *Hlai languages* · https://en.wikipedia.org/wiki/Hlai_languages · retrieved 2026-09-26; *Be languages* · https://en.wikipedia.org/wiki/Be_languages · retrieved 2026-09-26
- **What the sources say:** Hlai: ISO `lic` (Hlai) and `cuq` (Cun); "Native speakers (667,000 cited 1999)" and "There are some 750,000 Hlai speakers"; "A quarter of Hlai speakers are monolingual"; "None of the Hlai languages had a writing system until the 1950s, when the Latin script was adopted for Ha"; "Jiāmào 加茂 (52,000 speakers) is a divergent Kra-Dai language with a Hlai superstratum and a non-Hlai substratum". Be: ISO `onb`, Glottolog `ling1270`; "spoken by 600,000 people, 100,000 of them monolingual, on the north-central coast of Hainan Island, including the suburbs of the provincial capital Haikou"; "The speakers are counted as part of the Han Chinese nationality in census"; classification given as "Kam–Tai ? Be–Tai ? Be–Jizhao ?" — explicitly unsettled.
- **Confidence:** high for the structural claims; medium for the counts (1999/2000 Ethnologue-era figures)
- **Action:** prose hedged ("by source"); Ong Be's classification is presented as unresolved rather than assigned, per §1.6 rule 4.

### [KD-106] Bouyei and Kam (Dong): two northern neighbours, and a UNESCO listing
- **Claim as written:** "Bouyei has about 2.7 million speakers in southern Guizhou and is also spoken in Vietnam as Giay; Kam (Dong) has about 1.5 million speakers across Guizhou, Hunan and Guangxi, and its 'grand song' polyphonic choral tradition was inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity in 2009."
- **Appears in:** `atlas-kradai.js` → nodes `bouyei`, `kam`
- **Verdict:** verified
- **Sources:** *Bouyei language* · https://en.wikipedia.org/wiki/Bouyei_language · retrieved 2026-09-26; *Kam language* · https://en.wikipedia.org/wiki/Kam_language · retrieved 2026-09-26; UNESCO ICH · https://ich.unesco.org/en/RL/grand-song-of-the-dong-ethnic-group-00202 · search-confirmed 2026-09-26
- **What the sources say:** Bouyei: ISO `pcc`; "Native speakers (2.7 million cited 2000 census)"; region Guizhou, Yunnan, Sichuan and Vietnam; Northern Tai; writing "Latin, Sawndip"; the current script was designed 1981–85 on the Wangmo County dialect. Kam: ISO `doc` (Northern Dong), `kmc` (Southern Dong), `cov` (Cao Miao); "Native speakers 1.5 million (2003)"; region Guizhou, Hunan, Guangxi; "Almost 1.5 million speakers of Southern Dong were counted in the 1990 language census, from a total of 2.5 million people in the Dong ethnic group". The UNESCO ICH entry 00202 is "Grand song of the Dong ethnic group", inscribed on the Representative List in 2009.
- **Confidence:** high for both figures and the UNESCO listing
- **Action:** none needed.

### [KD-107] Proto-Tai: Li Fang-Kuei (1977) and Pittayaporn (2009)
- **Claim as written:** "Proto-Tai is reconstructed with three contrastive tones on smooth syllables — conventionally *A, *B and *C — plus a checked-syllable category *D; Li Fang-Kuei's *Handbook of Comparative Tai* (1977) is the standard comparative account, and Pittayaporn's *The Phonology of Proto-Tai* (Cornell, 2009) is the modern full reconstruction."
- **Appears in:** `atlas-kradai.js` → node `protokd`; the root node's prose on tonogenesis
- **Verdict:** verified
- **Source:** *Proto-Tai*, Encyclopedia MDPI · https://encyclopedia.pub/entry/30003 · retrieved 2026-09-26, citing "Pittayaporn, Pittayawat. (2009a). The Phonology of Proto-Tai (Doctoral dissertation), Department of Linguistics, Cornell University"; cross-checked against two peer-reviewed works that cite "Li 1977; Gedney 1972; Pittayaporn 2009" for the *A/*B/*C tone system — Brill, *Manusya* 26(1) https://brill.com/view/journals/mnya/26/1/article-p1_016.xml and a University of Hawaiʻi dissertation, both retrieved 2026-09-26, which state: "Proto-Tai is reconstructed with three contrastive tones on 'smooth syllables'".
- **Confidence:** high
- **Action:** none needed. The *D (checked-syllable) category is standard in the same literature; the prose presents it as the conventional label rather than a discovery.

### [KD-108] ⚠ CORRECTIONS — Saek's speaker count, Bouyei's orthography, and Jiamao's classification
- **Claim as written (before correction):** "Saek: ≈25,000 speakers in Khammouane and Bolikhamxay, Laos, with a few villages in Nakhon Phanom and Sakon Nakhon, Thailand; it keeps an *-l-* where Thai has *-d-*." · "Bouyei's standard orthography is Latin, created in 1956 on the basis of the Wangmo (望谟) variety." · "Jiamao: ≈52,000 speakers in Lingshui and the surrounding counties of southern Hainan; a divergent Kra–Dai language with a Hlai superstratum resting on a non-Hlai substratum."
- **Appears in:** `atlas-kradai.js` → nodes `saek`, `bouyei`, `jiamao` (all three sentences replaced)
- **Verdict:** **all three wrong as first drafted; corrected against sources**
- **Sources:** *Saek language* · https://en.wikipedia.org/wiki/Saek_language · retrieved 2026-09-26; *Bouyei language* · https://en.wikipedia.org/wiki/Bouyei_language · retrieved 2026-09-26; *Jiamao language* · https://en.wikipedia.org/wiki/Jiamao_language · retrieved 2026-09-26; *Be languages* · https://en.wikipedia.org/wiki/Be_languages · retrieved 2026-09-26; *Lakkia language* · https://en.wikipedia.org/wiki/Lakkia_language · retrieved 2026-09-26; *Biao language* · https://en.wikipedia.org/wiki/Biao_language · retrieved 2026-09-26; *Literature of Laos* · https://en.wikipedia.org/wiki/Literature_of_Laos · retrieved 2026-09-26; SIL ISO 639-3 register · https://iso639-3.sil.org/sites/iso639-3/files/downloads/iso-639-3.tab and .../iso-639-3-macrolanguages.tab · downloaded 2026-09-26
- **What the sources say:**
  - **Saek.** "Native speakers 10,000 (2007–2015)"; spoken in "at least ten villages in Khammouane Province, Laos, and at least four villages in Nakhon Phanom Province in northeastern Thailand"; ISO `skb`; classified as **Severely Endangered** by the UNESCO *Atlas of the World's Languages in Danger*; documented by William J. Gedney, whose lexicon (Hudak & Gedney 2010) and six-tone system are the standard reference. The draft's 25,000 was wrong; the draft's *-l-*/*-d-* claim was **removed** rather than re-sourced, because the Wikipedia article does not make it and I did not find a source that states it in that form. The draft also placed Saek in Bolikhamxay and Sakon Nakhon, neither of which the source names.
  - **Bouyei.** "Native speakers (2.7 million cited 2000 census)"; ISO `pcc`; region Guizhou, Yunnan, Sichuan **and Vietnam** (Giay/Giáy); writing system "Latin, **Sawndip**"; and the current script "was developed after the abandonment of the Bouyei-Zhuang Script Alliance Policy in 1981 and was designed from 1981 to 1985 … takes the Wangmo County dialect as its foundation". So 1956 was wrong: there was an earlier Latin orthography, but the one in use dates from 1981–85, and the draft also omitted the traditional character script.
  - **Jiamao.** "Native speakers (50,000 cited 1987)"; ISO `jio`; spoken "in central and south-central Hainan", mostly **Jiamao Township in Baoting** Li and Miao Autonomous County plus six townships in Lingshui county and villages in Sanya's Haitangwan; autonym `tʰai¹`; family given as "Kra–Dai **or language isolate**, Hlai–Jiamao?"; "shares less than half of its lexicon with the Hlai languages"; Thurgood (1992) proposed an **Austroasiatic** substratum, Norquest (2007, 2015) "firmly established it as a non-Hlai language", Hsiu (2018) found borrowings "from an unknown, currently extinct Tibeto-Burman branch", Ostapirat (2026) proposes a northern-Vietnam origin. The draft's 52,000 and its "Lingshui and the surrounding counties" placement were wrong, and its phrasing reversed the layers: the Hlai material is the **overlay** on a non-Hlai core.
  - **Also corrected in the same pass:** Ong Be (confirmed 600,000 speakers / 100,000 monolingual, ISO `onb`, Hansell 1988 Be–Tai vs Ostapirat 1998 Be–Jizhao, "taught in primary schools" per Ethnologue, autonym `ʔaŋ³³vo³³`); Lao (**two unsourced claims removed** — first, that the Lao Sangha's manuscripts are on UNESCO's Memory of the World register, which two searches failed to confirm; second, the epic titles as first drafted. *Literature of Laos*, https://en.wikipedia.org/wiki/Literature_of_Laos, retrieved 2026-09-26, gives the section headings "The epic poem of Sin Xay", "The epic poem of Thao Hung Thao Cheuang" and "Phra Lak Phra Lam – the Lao version of the Ramayana", and describes novices "practicing the art of making palm-leaf folios at Wat Manolom, Luang Prabang" — so the node now reads *Sin Xay* and *Phra Lak Phra Lam*, not "San Sin Xay" and "Pha Lak Pha Lam"); Zhuang (the sixteen-member count was confirmed against the register's own macrolanguage table, which lists sixteen `A`-status members plus two retired codes).
- **Confidence:** high — every corrected figure is quoted from the fetched page
- **Action:** all three nodes rewritten; the general lesson recorded here because it is the failure mode this log exists to catch — a plausible-sounding figure written from memory passed through a first draft and was caught only by fetching the source.

### [KD-109] Link health — Omniglot coverage for Kra–Dai (protocol from TU-109)
- **Claim as written:** every `SOUND` entry in `atlas-kradai.js` is a URL that was requested before being written down.
- **Appears in:** `atlas-kradai.js` → `const SOUND`
- **Verdict:** verified — 44 candidate URLs requested 2026-09-26
- **What the check found:** **200** for `langfam`, `thai`, `lao`, `shan`, `zhuang`, `bouyei`, `nung`, `tay`, `khun`, `isan`, `ahom`, `tailue`, `newtailue`, `taidam`, `taiviet`, `sui`, `kam`, `dong`, `maonan`. **404** for `kradai`, `kra_dai`, `kra-dai`, `taikadai`, `sawndip`, `tai_lue`, `tai_le`, `tai_dam`, `tai_viet`, `hlai`, `li`, `gelao`, `gelao_language`, `buyang`, `lachi`, `lachi_language`, `ong_be`, `ongbe`, `lingao`, `jiamao`, `jiamao_language`, `mulam`, `mulao`, `lakkia`, `lakkja`, `biao`, `biao_language`, `saek`, `then`, `laha`, `dai`, `lue`, `phuthai`, `hainan`, `zhuang_yongbei`, `puyi`, `giay`.
- **Action:** the SOUND map carries only the 200s. Nodes with no Omniglot page (the Kra languages, Hlai, Jiamao, Ong Be, Mulam, Lakkia, Biao, Saek, Tai Nüa) carry an **empty list** rather than a guessed or 404 link — the engine's YouTube-search fallback covers them. Recorded so a later session does not "fill in the gaps" with plausible URLs.

## Japonic & Ainu (Phase 3) — research log

All URLs below were fetched or search-confirmed on **2026-09-26**. Raw wikitext was pulled with
`https://en.wikipedia.org/w/index.php?title=<PAGE>&action=raw` so the wording could be quoted
exactly rather than re-paraphrased from memory.

### [JP-101] Two families, not one: Japonic (~123 million) and Ainu
- **Claim as written:** "This atlas holds two unrelated things. Japonic is a family of about 123 million speakers in three branches — Japanese, Ryukyuan and Hachijō. Ainu is a separate family, usually described as an isolate, with no demonstrated relative anywhere."
- **Appears in:** `atlas-japonic.js` → node `japonic` (root)
- **Verdict:** verified
- **Source:** *Japonic languages*, Wikipedia · https://en.wikipedia.org/wiki/Japonic_languages · and *Japanese language*, Wikipedia · https://en.wikipedia.org/wiki/Japanese_language · retrieved 2026-09-26
- **What the source says:** Japonic infobox gives `iso5: jpx`, Glottolog `japo1237`, classification "One of the world's primary language families", subdivisions "Japanese / Ryukyuan / Hachijō / †Peninsular ?", and states the family "is universally accepted by linguists". Japanese infobox: speakers "123 million", date 2020, source `e27`; ancestors Proto-Japonic → Old Japanese → Early Middle Japanese → Late Middle Japanese → Early Modern Japanese. Japonic lead: "Possible genetic relationships with many other language families have been proposed, most systematically with Koreanic, but no genetic relationship has been conclusively demonstrated." Ainu is handled in its own family (see `[JP-106]`, `[JP-107]`).
- **Confidence:** high for the structure; medium for "123 million", a single 2020 figure
- **Action:** prose gives "about 123 million, by source" and states the isolate claim as the absence of a demonstrated relative, not as proof of none.

### [JP-102] ⚠ SELF-CORRECTION — Kyūshū dialects are Hichiku, **Hōnichi** and Satsugu
- **Claim as written (in `languages.md` §2.5 as first drafted):** the tree sketch read "Kyūshū (Hichiku/**Hōhichi**)".
- **Appears in:** `languages.md` §2.5 tree sketch; the corrected form is in `atlas-japonic.js` → node `kyushu`
- **Verdict:** superseded — the brief's spelling and its two-way division were both wrong
- **Source:** *Japanese dialects*, Wikipedia · https://en.wikipedia.org/wiki/Japanese_dialects · retrieved 2026-09-26
- **What the source says:** "Kyushu dialects are classified into **three** groups, [[Hichiku dialect]], [[Hōnichi dialect]] and [[Kagoshima dialect|Satsugu (Kagoshima) dialect]]". The linked article titles are `Hichiku dialect` and `Hōnichi dialect`. There is no "Hōhichi".
- **Confidence:** high
- **Action:** `languages.md` §2.5 tree sketch corrected to "Hichiku / Hōnichi / Satsugu"; the atlas node is named for all three and the prose notes that Satsugu is distinctive enough that "some have classified it as a fourth branch of Japanese, alongside Eastern, Western, and the rest of Kyushu". Logged because it is the same failure mode as `[KD-108]` — a plausible-looking name written from memory that only a fetch catches.


### [JP-103] Ryukyuan: six languages, eleven ISO codes, and a speaker table
- **Claim as written:** "Ryukyuan is conventionally counted as six languages — Amami, Kunigami, Okinawan, Miyako, Yaeyama and Yonaguni — but ISO 639-3 issues eleven codes for them. Okinawan is only 71% cognate with standard Japanese; even Kagoshima Japanese is only 72% cognate with Amami."
- **Appears in:** `atlas-japonic.js` → nodes `ryukyuan`, `nryu`, `sryu`, `amami`, `kunigami`, `okinawan`, `miyako`, `yaeyama`, `yonaguni`
- **Verdict:** verified
- **Source:** *Ryukyuan languages*, Wikipedia · https://en.wikipedia.org/wiki/Ryukyuan_languages · retrieved 2026-09-26
- **What the source says:** Glottolog `ryuk1243`; subdivisions "Northern Ryukyuan (Amami–Okinawa)" and "Southern Ryukyuan (Miyako–Yaeyama)"; "There is general agreement among linguistics experts that Ryukyuan varieties can be divided into six languages, conservatively". The speaker table gives Kikai 13,000 (`kzg`); Amami 12,000 (`ams`, `ryn`); Tokunoshima 5,100 (`tkn`); Okinoerabu 3,200 (`okn`); Yoron 950 (`yox`); Kunigami 5,000 (`xug`); Okinawan "228,000 native, 1,143,000 total speakers" (`ryu`); Miyako 50,000 (`mvi`); Yaeyama 47,600 (`rys`); Yonaguni 400 (`yoi`) — eleven codes in all. On cognacy: "The Okinawan language is only 71% lexically similar to, or cognate with, standard Japanese. Even the southernmost Japanese dialect (Kagoshima dialect) is only 72% cognate with the northernmost Ryukyuan language (Amami)." Status section: "There is no census data for the Ryukyuan languages, and the number of speakers is unknown… the total population of the Ryukyu region was 1,452,288 [2005], but fluent speakers are restricted to the older generation, generally in their 50s or older."
- **Confidence:** high for the codes and the cognacy percentages; medium for every speaker count, which the article itself hedges
- **Action:** the atlas presents the eleven codes as chips on six nodes and gives the counts with their source hedge; the prose repeats the article's own warning that no census exists. The ISO codes were re-checked against the SIL register directly (`[JP-110]`), not taken from this table.

### [JP-104] ⚠ DISPUTED — the UNESCO endangerment grades for Japan, and a Wikipedia contradiction
- **Claim as written:** "UNESCO's *Atlas of the World's Languages in Danger* lists eight Japanese entries: Ainu as critically endangered; Yaeyama and Yonaguni as severely endangered; Hachijō, Amami, Kunigami, Okinawan and Miyako as definitely endangered."
- **Appears in:** `atlas-japonic.js` → nodes `hachijo`, `amami`, `kunigami`, `okinawan`, `miyako`, `yaeyama`, `yonaguni`, `hokkaido`
- **Verdict:** disputed — two of my sources disagree on Yaeyama
- **Source:** Agency for Cultural Affairs (Japan), *Japanese Language Policy → Endangered Languages and Dialects* · https://www.bunka.go.jp/english/policy/japanese_language/policy/ · retrieved 2026-09-26 · versus *Yaeyama language*, Wikipedia · https://en.wikipedia.org/wiki/Yaeyama_language · retrieved 2026-09-26
- **What the source says:** the Agency for Cultural Affairs page reproduces the UNESCO Atlas (published February 2009) for Japan verbatim: "According to UNESCO, over 2,500 languages are in danger of extinction, among them **eight** languages and dialects in Japan… **[Critically endangered]**: Ainu. **[Severely endangered]**: Yaeyama (dialect), Yonaguni (dialect). **[Definitely endangered]**: Hachijo (dialect), Amami (dialect), Kunigami (dialect), Okinawan (dialect), Miyako (dialect)." That is 1 + 2 + 5 = 8, and it matches the Ryukyuan article's own summary — "UNESCO labels four of the languages 'definitely endangered' and two others 'severely endangered'" — once Hachijō is excluded. But the English Wikipedia article on Yaeyama carries the infobox caption "Yaeyama is classified as **Definitely Endangered** by the UNESCO *Atlas of the World's Languages in Danger*", citing a UNESCO WAL URL. Independent of Wikipedia: Patrick Heinrich, *The Ryukyus and the New, But Endangered, Languages of Japan* (Asia-Pacific Journal, 2009) · https://apjjf.org/patrick-heinrich/3138/article · search-confirmed 2026-09-26 — also groups "**severely endangered**, Yaeyama and Yonaguni, and four… definitely endangered".
- **Confidence:** high that the 2009 Atlas puts Yaeyama in *severely endangered*; the Wikipedia infobox is the outlier
- **Action:** the atlas follows the 2009 Atlas as restated by the Agency for Cultural Affairs and by Heinrich, and the Yaeyama node states the conflict explicitly rather than silently picking a side. `en.wal.unesco.org` was unreachable when checked (HTTP 503), so the WAL page itself was **not** fetched — recorded here so a later session knows the current UNESCO WAL listing has not been read and may have been revised since 2009.

### [JP-105] Hachijō: a branch with no ISO code, fewer than 1,000 speakers, descended from Eastern Old Japanese
- **Claim as written:** "Hachijō is spoken on Hachijō-jima and Aogashima in the Izu Islands and, since the Meiji era, on the Daitō Islands east of Okinawa. It has no ISO 639-3 code, fewer than 1,000 speakers by a 2011 count, and it descends from Eastern Old Japanese."
- **Appears in:** `atlas-japonic.js` → node `hachijo`
- **Verdict:** verified
- **Source:** *Hachijō language*, Wikipedia · https://en.wikipedia.org/wiki/Hachij%C5%8D_language · retrieved 2026-09-26
- **What the source says:** infobox speakers "<1,000" dated 2011; `iso6: hhjm` with **no `iso3`**; Glottolog `hach1239`; ancestors listed as Proto-Japonic → Old Japanese? → **Eastern Old Japanese**; region "Southern Izu Islands and the Daitō Islands"; script "Japanese writing system (katakana, hiragana, rōmaji)". Body: "Hachijō is considered to be a descendant of Eastern Old Japanese, retaining several unique grammatical and phonetic features recorded in dialect poems from Eastern Japan ('Azuma') in the 8th-century *Man'yōshū* and the *Fudoki* of Hitachi Province." It "was also previously spoken on the island of Hachijō-kojima, which is now abandoned". On vitality: "a moribund language with a small and dwindling population of primarily elderly speakers"; "native speakers are estimated to number in the 'low hundreds,' and younger generations are not learning or using the language at home"; the town of Hachijō has run primary school classes, *karuta* games and theatre productions since at least 2009. On classification: "either one of the most divergent forms of Japanese, or comprise a branch of Japonic languages (alongside mainland Japanese, Northern Ryukyuan, and Southern Ryukyuan)".
- **Confidence:** high
- **Action:** the node's `iso` entry reads "— (no 639-3 code; Glottolog hach1239)" rather than borrowing a code. The atlas classifies Hachijō as its own branch off Japanese, following `languages.md` §2.5, and the prose states the classification is contested. UNESCO's Atlas lists "Hachijo (dialect)" as definitely endangered (`[JP-104]`).

### [JP-106] Ainu speaker figures: four official counts, and a word — "dormant"
- **Claim as written:** "There are at least 30,000 Ainu people in Japan. In 2011, 304 people in Japan reported understanding the language to some extent. By 2017 it was being described as dormant; in 2022 it was 'more or less extinct, or dormant, as a living medium' with a few native semi-speakers and a growing number of neo-speakers. In 2025 the Endangered Languages Project listed two native speakers."
- **Appears in:** `atlas-japonic.js` → node `hokkaido`
- **Verdict:** verified
- **Source:** *Ainu language*, Wikipedia · https://en.wikipedia.org/wiki/Ainu_language · retrieved 2026-09-26
- **What the source says:** "Although there are estimated to be at least 30,000 Ainu people in Japan, there is a low rate of self-identification as Ainu among people with Ainu ethnic roots. The Ainu language was already endangered by the 1960s and has continued to decline since. In 2011, a total of 304 people within Japan were reported to understand the Ainu language to some extent." Dougherty (2017, in Campbell ed., *Language Isolates*): "Ainu is a dormant language isolate previously spoken on the northernmost Japanese island of Hokkaidō." Janhunen (2022, *Handbook of the Ainu Language*): Ainu "is more or less extinct, or 'dormant', as a living medium [but] has still a few native semi-speakers, as well as a growing number of neo-speakers" (who include some non-Ainu), with no generational transmission. "As of 2025, the Endangered Languages Project (citing personal communication) reports two native speakers with 80% certainty." The article lead also states: "By 2008, only two native speakers of Ainu remained, both elderly."
- **Hokkaidō government surveys (both quoted in the same article):** 2017 — 671 respondents from 291 randomly selected households; 0.7% "would be able to have a conversation" in Ainu, 3.4% "would be able to converse a little", 44.6% "couldn't speak but had some knowledge about Ainu language", 48.1% "couldn't speak at all". 2023 — 472 respondents; 0.8% could converse, 8.9% "a little", 19.3% "could barely converse at all", 69.3% "would not be able to converse at all".
- **Confidence:** high for the quotations; the counts are self-reported and the 2008 and 2025 "two speakers" figures are not comparable measurements
- **Action:** the node gives the range and attributes each figure to its year and survey rather than stating one number as the truth. The atlas does **not** say Ainu is extinct: the sources say dormant or "more or less extinct", which is not the same claim, and neo-speaker numbers are rising.

### [JP-107] Sakhalin Ainu (1994) and Kuril Ainu (1962): the other two Ainu languages
- **Claim as written:** "Ainu is a family of three. Hokkaidō Ainu survives; Sakhalin Ainu went extinct on 30 April 1994 with the death of Take Asai; Kuril Ainu went extinct in 1962. Neither extinct variety has an ISO 639-3 code."
- **Appears in:** `atlas-japonic.js` → nodes `ainu`, `hokkaido`, `sakhalin`, `kuril`
- **Verdict:** verified
- **Source:** *Sakhalin Ainu language* · https://en.wikipedia.org/wiki/Sakhalin_Ainu_language · *Kuril Ainu language* · https://en.wikipedia.org/wiki/Kuril_Ainu_language · *Ainu languages* · https://en.wikipedia.org/wiki/Ainu_languages · all retrieved 2026-09-26
- **What the sources say:** Sakhalin Ainu infobox: "extinct — 30 April 1994, with the death of Take Asai"; Glottolog `sakh1245`; dialects Taraika and Rayciska; `isoexception = dialect` (i.e. no code of its own); UNESCO grade **Extinct**. Body: "After World War II, when Sakhalin came under Soviet control, all but 100 of the Ainu living in Sakhalin were deported to Japan. The last Ainu household on the island died out in the 1960s. The language survived longer in Japan, going extinct in 1994 with the death of Tahkonanna." Earliest records: "several sentences transcribed by the Dutch explorer Maarten Gerritszoon Vries in 1643"; in 1787 Lapérouse recorded 161 words. Kuril Ainu infobox: "extinct — 1962"; Glottolog `kuri1271`; UNESCO grade **Extinct**; main inhabited islands Kunashir, Iturup, Urup and Shumshu. Ainu languages article: "Kuril Ainu was declared extinct in 1962 and Sakhalin Ainu in 1994"; "Hokkaidō Ainu was declared critically endangered in 2009"; Vovin's classification is Proto-Ainu → Proto-Hokkaido–Kuril (Hokkaido + Kuril dialects) and Proto-Sakhalin (Sakhalin dialects); "No genealogical relationship between Ainu and any other language family has been demonstrated, despite numerous attempts."
- **Confidence:** high
- **Action:** both extinct nodes carry an empty `sound` list and no ISO code, and are coloured as extinct. Note for the **Siberian** atlas (Phase 8): the roadmap lists Ainu there too — Ainu is treated fully here, so the Siberian file should cross-link to `#japonic/ainu` rather than duplicate it.

### [JP-108] Ainu script, Chiri Yukie's 1923 book, and the 1997 → 2019 recognition sequence
- **Claim as written:** "Ainu has never had a script of its own; it is written in katakana, Latin and Cyrillic. The first book written in Ainu by Ainu authors was Chiri Yukie's *Ainu Shin'yōshū* (1923). Official recognition came in stages: a Cultural Promotion Act in 1997, an indigenous-language decision in 2008, a law recognising the Ainu as an indigenous people in April 2019, and the Upopoy museum in July 2020."
- **Appears in:** `atlas-japonic.js` → nodes `hokkaido`, `ainu`
- **Verdict:** verified
- **Source:** *Ainu language*, Wikipedia · https://en.wikipedia.org/wiki/Ainu_language · retrieved 2026-09-26; the 1923 date search-confirmed 2026-09-26
- **What the source says:** infobox script: "Katakana (current) / Latin (current) / Cyrillic (current)". Writing-system section: "The Ainu language is written in a modified version of the Japanese katakana syllabary… There is also a Latin-based alphabet in use. The *Ainu Times* publishes in both." And: "A native written form of the Ainu language has never existed; therefore, the Ainu people traditionally relied on memorization and oral communication to pass down their literature." Oral literature: hero-sagas called *yukar*, plus *Uepeker*; studied by Piłsudski, who "made audio recordings from 1902 to 1903, which is believed to be the first attempt to do so in the history of Ainu oral literature study", and by Kindaichi Kyōsuke (*Ainu monogatari*, 1913). On recognition: "As of 1997 they were given indigenous rights… The Ainu Cultural Promotion Act in 1997 appointed the Foundation for Research and Promotion of Ainu Culture (FRPAC)… tasked with language education"; "The Japanese government made a decision to recognize Ainu as an indigenous language in June 2008"; "Japan approved a bill to recognize the Ainu language for the first time" on 15 February 2019 and "enacted the law on 19 April 2019"; "On 12 July 2020, the Japanese government opened the National Ainu Museum in Shiraoi, Hokkaidō… It forms one of three institutions named *Upopoy*". The Ainu Association of Hokkaidō, "with approximately 500 members", has run 14 language classes plus instructor training since 1987. On the 1923 book: Chiri Yukie (1903–1922); "In 1923, the first book which was written in Ainu language by Ainu people was published ('Ainu Shin'yoshu' by Chiri Yukie)" — a search hit, **not** a fetched primary source.
- **Confidence:** high for the recognition sequence, which is quoted from the fetched article; **medium** for the Chiri Yukie detail, which rests on a search snippet rather than a read source
- **Action:** the node states the 1923 book but does not give it more weight than that. The atlas keeps the distinction between *Ainu as a dormant medium* and *Ainu as a recognised and being-taught heritage language*, because both are true at once.

### [JP-109] Proto-Japonic, the Yayoi spread, Old Japanese, and the Ryukyu annexation timeline
- **Claim as written:** "Proto-Japonic is reconstructed with Old Japanese and Proto-Ryukyuan as its daughters. Most scholars place its arrival in northern Kyūshū from the Korean peninsula around 700–300 BCE with Yayoi wet-rice farming, replacing indigenous languages. Old Japanese is the oldest attested stage, written in man'yōgana in the 7th–8th centuries. The Ryukyu Kingdom kept its autonomy until Japan annexed it in 1879; Satsuma had conquered it in 1609."
- **Appears in:** `atlas-japonic.js` → nodes `protojaponic`, `japanese`, `ryukyuan`, `okinawan`
- **Verdict:** verified
- **Source:** *Proto-Japonic language* · https://en.wikipedia.org/wiki/Proto-Japonic_language · *Old Japanese* · https://en.wikipedia.org/wiki/Old_Japanese · *Ryukyuan languages* · https://en.wikipedia.org/wiki/Ryukyuan_languages · all retrieved 2026-09-26
- **What the sources say:** Proto-Japonic infobox: children "Old Japanese" and "Proto-Ryukyuan"; region "Japanese archipelago". "Most scholars believe that Japonic was brought to northern Kyushu from the Korean peninsula around 700 to 300 BC by wet-rice farmers of the Yayoi culture and spread throughout the Japanese archipelago, replacing indigenous languages." "The oldest attested form is Old Japanese, which was recorded using Chinese characters in the 7th and 8th centuries." "Since Old Japanese displays several innovations that are not shared with Ryukyuan, the two branches must have separated before the 7th century." Ryukyuan varieties "are divided into northern and southern groups, corresponding to the physical division of the chain by the 250 km-wide Miyako Strait"; "The Shuri dialect of Okinawan is attested since the 16th century"; the migration to the Ryukyus from southern Kyushu "may have coincided with the rapid expansion of the agricultural Gusuku culture in the 10th and 11th centuries"; "After this migration, there was limited influence from mainland Japan until the conquest of the Ryukyu Kingdom by the Satsuma Domain in 1609." Old Japanese infobox: `iso3: ojp`, era "8th century", script "man'yōgana", Glottolog `oldj1239`; the corpus "consists of poetry, especially the *Man'yōshū*"; "No genetic links to other language families have been proven."
- **Confidence:** high for the dates and the ISO code `ojp` (also re-checked against the SIL register — it is present, type **H**, historical); medium for the 700–300 BCE window, which the source itself hedges as "most scholars"
- **Action:** the proto node is coloured as ancestral and given `ojp` as its only code, with the caveat that a reconstruction has no code of its own.

### [JP-110] Link health and ISO codes — Omniglot coverage for Japonic & Ainu (protocol from TU-109)
- **Claim as written:** every `SOUND` entry in `atlas-japonic.js` is a URL that was requested before being written down, and every ISO code in `ISO` was read out of the SIL register.
- **Appears in:** `atlas-japonic.js` → `const SOUND`, `const ISO`
- **Verdict:** verified — 35 candidate URLs requested 2026-09-26; the register re-checked the same day
- **What the check found:** **200** for `langfam`, `japanese`, `japanese_hiragana`, `japanese_katakana`, `japanese_romaji`, `ainu`, `amami`, `hachijo`, `miyakoan`, `yaeyama`, `yonaguni`, and `okinawan` **on the `.php` extension**. **404** for `okinawan.htm`, `ryukyuan`, `japonic`, `kunigami.htm`, `kunigami.php`, `miyako.htm`, `uchinaguchi`, `kunigami_yanbaru`, `ryukyuan_languages`, `japanese_dialects`, `kana`, `kanji`, `man_yogana`, `shima_kotoba`, `ainu_katakana`, `okinawan_language`. Note the trap: Omniglot's Okinawan page is the **only** one of the Ryukyuan set on `.php` — `writing/okinawan.php` is 200 while `writing/okinawan.htm` is 404, and the reverse holds for Amami, Miyako, Yaeyama and Yonaguni. Page titles were read to confirm the hits are the right languages ("Amami language", "Hachijō language", "Miyakoan language and alphabet", "Yaeyama language", "Yonaguni language", "Ainu language and alphabet").
- **ISO register check:** `awk` over `iso-639-3.tab` confirms `jpn` (also `ja`), `ojp` (**type H**, historical), `ain` (labelled "Ainu (Japan)"), `jsl` (Japanese Sign Language), `jks` (Amami Koniya Sign Language), and the eleven Ryukyuan codes `kzg`, `ryn`, `ams`, `tkn`, `okn`, `yox`, `xug`, `ryu`, `mvi`, `rys`, `yoi`. **There is no code for Hachijō, Sakhalin Ainu or Kuril Ainu.** Watch the false friend: the register also carries `aib` **"Ainu (China)"**, an unrelated Turkic language of Xinjiang — the atlas must use `ain` and must not abbreviate it to "Ainu" without the qualifier.
- **Action:** the SOUND map carries only the 200s. Nodes with no Omniglot page (Kunigami, Sakhalin Ainu, Kuril Ainu, and the dialect-cluster nodes) carry an **empty list** rather than a guessed or 404 link; the engine's YouTube-search fallback covers them. Recorded so a later session does not "fill in the gaps" with plausible URLs.

## Mongolic (Phase 4) — research log

All URLs below were fetched or search-confirmed on **2026-09-26**, by the same raw-wikitext method
as Phase 3, so wording could be quoted exactly.

### [MG-101] The family: roughly 6.3 million, and no established living relatives
- **Claim as written:** "Mongolic is a family of about 6.3 million speakers across Mongolia, Inner Mongolia, Buryatia, Kalmykia, Xinjiang and the Gansu–Qinghai highlands. It has no convincingly established living relatives; its closest relatives are the extinct para-Mongolic languages, Khitan among them. The Altaic and Transeurasian groupings are proposals, not results."
- **Appears in:** `atlas-mongolic.js` → node `mongolic` (root)
- **Verdict:** verified
- **Source:** *Mongolic languages*, Wikipedia · https://en.wikipedia.org/wiki/Mongolic_languages · retrieved 2026-09-26
- **What the source says:** lead — "spoken by the [[Mongolic peoples]] in North Asia, East Asia, Central Asia, and Eastern Europe mostly in Mongolia and surrounding areas and in Kalmykia and Buryatia"; the best-known member, Mongolian, has "an estimated 5.7+ million speakers" (Svantesson et al. 2005, p. 141). Classification — "The Mongolic languages have no convincingly established living relatives. The closest relatives of the Mongolic languages appear to be the [[para-Mongolic languages]], which include the extinct [[Khitan language|Khitan]], [[Tuyuhun language|Tuyuhun]], and possibly also [[Tuoba language|Tuoba]] languages." On Altaic: "A few linguists have grouped Mongolic with Turkic, Tungusic and possibly Koreanic or Japonic as part of the controversial Altaic family"; of Robbeets' "Transeurasian" superfamily, "this view has been severely criticized" (citing Tian et al. 2022). Janhunen is quoted for the homeland: "the Mongolic homeland was located further to the east, in western Manchuria" (Janhunen 2003, p. 203), while "Mongolia is primarily the source region of the Turkic language family".
- **Confidence:** high for the classification statements and the homeland; medium for the total, which is my own sum of the source's own table (see `[MG-102]`) rather than a figure the article states
- **Action:** the root gives "about 6.3 million, by source" and names the sum's origin rather than presenting it as a published count. The Altaic/Transeurasian material is presented as a proposal that has been criticised, not as a finding.

### [MG-102] The speaker table, and four figures that disagree with Wikipedia's own infoboxes
- **Claim as written:** the per-language figures in `atlas-mongolic.js`, e.g. "Mongolian proper 5.2 million · Buryat 330,000 · Kalmyk–Oirat 360,000 · Dagur 96,000 · Santa 200,000 · Monguor 150,000 · Eastern Yugur 4,000 · Bonan 6,000 · Khamnigan 2,000 · Kangjia 1,000 · Moghol extinct".
- **Appears in:** `atlas-mongolic.js` → nodes `khalkha`, `peripheral`, `buryat`, `oirat`, `kalmyk`, `dagur`, `santa`, `monguor`, `yugur`, `bonan`, `khamnigan`, `kangjia`, `moghol`
- **Verdict:** verified as a citation, with conflicts logged
- **Source:** *Mongolic languages*, Wikipedia (the Janhunen 2006 / Nugteren 2011 table) · https://en.wikipedia.org/wiki/Mongolic_languages · versus the individual language articles · all retrieved 2026-09-26
- **What the source says:** the family article's table, "classification and numbers of speakers follow Janhunen (2006)… except for Southern Mongolic, which follows Nugteren (2011)", gives Dagur 96,000; Khamnigan Mongol 2,000; Buryat 330,000; Mongolian proper 5.2 million; Kalmyk–Oirat 360,000; Eastern Yugur 4,000; Monguor 150,000; Bonan 6,000; Santa (Dongxiang) 200,000; Kangjia 1,000; and **Moghol "(extinct)"**, citing Glottolog. Southern Mongolic is annotated "part of a Gansu–Qinghai Sprachbund". **The conflicts:** the Buryat article's own infobox says **436,300** (2017–2020, Ethnologue e26) against the table's 330,000; the Kalmyk article says **110,000** (2021) where the table gives 360,000 for Kalmyk–Oirat *combined*; the Dagur article says **91,000** (1999, e18) against 96,000. The Mongolian article's infobox gives **5.047380 million sigfig 1 → 5 million** (2020–2022, e28/`mon`), i.e. the macrolanguage, against the table's 5.2 million for "Mongolian proper".
- **Confidence:** high that these are the figures each source gives; the differences are not resolvable from these pages
- **Action:** the atlas gives the Janhunen/Nugteren table figures with "by source", and where a Wikipedia infobox disagrees by a wide margin (Buryat, Kalmyk, Dagur) the node says so rather than silently choosing one. Summed, the table gives **6,349,000**, which is where the root's "about 6.3 million" comes from.

### [MG-103] The script spine: 1204, 1269, 1587, 1648, 1941/1946 — and 2025
- **Claim as written:** "Mongolian is one of the most-written languages in the world. The vertical Uyghur-derived script was adopted by Genghis Khan in 1204; ʼPhags-pa was designed by Drogön Chögyal Phagpa for Kublai Khan in 1269; the Galik alphabet was created in 1587; the Clear Script by Zaya Pandita in 1648; Cyrillic was made mandatory in 1941 and had displaced the traditional script by 1946; and in 2020 Mongolia announced both scripts would be used officially by 2025."
- **Appears in:** `atlas-mongolic.js` → nodes `mongolic`, `middlemongol`, `oirat`, `buryat`, `khalkha`
- **Verdict:** verified, with one date discrepancy between sources noted
- **Source:** *Mongolian language* · https://en.wikipedia.org/wiki/Mongolian_language · *Mongolian script* · https://en.wikipedia.org/wiki/Mongolian_script · *ʼPhags-pa script* · https://en.wikipedia.org/wiki/%CA%BCPhags-pa_script · *Clear Script* · https://en.wikipedia.org/wiki/Clear_Script · *Vagindra script* · https://en.wikipedia.org/wiki/Vagindra_script · all retrieved 2026-09-26
- **What the sources say:** *Mongolian script* — "was the first writing system created specifically for the Mongolian language, and was the most widespread until the introduction of Cyrillic in **1946**"; "The script is a co-official script in Mongolia since **2025**, alongside the Cyrillic script for the language. It is also the official written form being taught in schools for Mongolian ethnic students in the Inner Mongolia Autonomous Region"; "Derived from the [[Old Uyghur alphabet]], it is a true alphabet, with separate letters for consonants and vowels"; it "has been adapted for such languages as Oirat and Manchu", and "Alphabets based on this classical vertical script continue to be used in Mongolia and Inner Mongolia to write Mongolian, Xibe and, experimentally, Evenki". Descendants listed in its infobox: **Galik alphabet, Manchu alphabet (→ Dagur and Xibe alphabets), Clear Script (Oirat), Vagindra script (Buryat), Evenki alphabet**. Also: "Computer operating systems have been slow to adopt support for the Mongolian script; almost all have incomplete support or other text rendering difficulties." *Mongolian language* — "The traditional Mongolian script was first adopted by Genghis Khan in **1204**", developed from the Uyghur script, with the Uyghur elite who shared the knowledge named as Tata-tonga, Bilge Buqa, Kara Igach Buyruk and Mengsus; the **Galik** alphabet was created in **1587** by Ayuush Güüsh, inspired by the 3rd Dalai Lama, for Tibetan and Sanskrit transcription (later Chinese), and in 1917 three Galik letters were repurposed for Mandarin retroflex consonants and remain in use in Inner Mongolia; a short-lived Latin attempt ran 1930–1932; "In **1941**, the Latin alphabet was adopted, though it lasted only two months"; "The Cyrillic alphabet … was made mandatory by government decree in **1941**"; literacy rose "from 17.3% to 73.5% between 1941 and 1950" where earlier campaigns with the traditional script had managed only 3.0% → 17.3% (1921–1940); a 1991–1994 reintroduction attempt "failed in the face of popular resistance"; "In March 2020, the Mongolian government announced plans to use both Cyrillic and the traditional Mongolian script in official documents by 2025." *ʼPhags-pa* — "an alphabet designed by the Tibetan monk and State Preceptor … Drogön Chögyal Phagpa (1235–1280) for Kublai Khan … as a unified script for the written languages within the Yuan"; time "**1269 – c. 1660**"; "actual use of this script was limited to about a hundred years during the Mongol-led Yuan dynasty, and it fell out of use with the advent of the Ming dynasty"; its child is **Zanabazar's square script**. *Clear Script* — "an alphabet created in **1648** by the Oirat Lamaist monk Zaya Pandita for the Oirat language", built on the Mongolian script to distinguish all sounds of the spoken language and to ease transcription of Sanskrit and Tibetic, assigning symbols to vowels and adding diacritics for vowel length and voicing; still in use ("ca. 1648 – today"). *Vagindra* — "Proposed script for the Buryat-Mongol language", also called the Buryat-Mongol script, created by **Agvan Dorzhiev**.
- **Confidence:** high for all the dates; **the 1941/1946 point is a discrepancy between two Wikipedia articles** and is recorded rather than resolved
- **Action:** the atlas says Cyrillic was "decreed in 1941 and had displaced the traditional script by 1946", which is what the two sources jointly say, and cites both. The ʼPhags-pa experiment is a separate node from the traditional script so the two are not conflated.

### [MG-104] ⚠ SELF-CORRECTION — the *Secret History* is not "1240"
- **Claim as written (in `languages.md` §2.4 as first drafted):** the tree sketch read "Middle Mongolian (Secret History of the Mongols, **1240**; 'Phags-pa, 1269)".
- **Appears in:** `languages.md` §2.4 tree sketch; the corrected form is in `atlas-mongolic.js` → node `secret`
- **Verdict:** superseded — 1240 is not a date either source gives
- **Source:** *Secret History of the Mongols* · https://en.wikipedia.org/wiki/Secret_History_of_the_Mongols · and *Middle Mongol* · https://en.wikipedia.org/wiki/Middle_Mongol · retrieved 2026-09-26
- **What the source says:** the *Secret History* infobox gives "pub_date = **Disputed**". The lead: "Written for the Mongol royal family some time after the death of Genghis Khan in 1227… The date of the text is uncertain, but the colophon to the text describes the book as having been finished in the Year of the Mouse, on the banks of the Kherlen River at Khodoe Aral, corresponding to an earliest possible figure of **1228**." And crucially: "the full Mongolian body only survived from a version made around the 15th century at the start of the Ming dynasty, where the pronunciation was transcribed into Chinese characters as a tool to help interpreters under the title *The Secret History of the Yuan Dynasty* (元朝秘史)". The Middle Mongol article adds that Atwood (2007) dates the original to **1252** in Mongolian script, and that the surviving text "reflects the pronunciation of Middle Mongol from the second half of the 14th century". It is "the oldest surviving literary work in the Mongolic languages", and about two-thirds of it also appears in the 17th-century chronicle *Altan Tobchi*.
- **Confidence:** high
- **Action:** `languages.md` §2.4 corrected; the atlas node gives "c. 1228 (the colophon's earliest possible date; disputed)" and states that the text we have is a Ming-era transcription, which is the fact that actually matters when using it as a linguistic source. Logged as the same failure mode as `[KD-108]` and `[JP-102]`.
- **Also corrected in the same pass:** the §2.4 sketch called Moghol a "**colonial-era** relic". It is a relic of the **Mongol empire** — the Mongol presence in what is now Herat Province — not of nineteenth-century European colonialism. The brief is corrected above and the atlas node says "a relic of the Mongol conquests". Two errors in one brief, both caught by reading the source rather than the sketch.

### [MG-105] ISO findings: two macrolanguages, two historical codes, one extinct code, one uncoded language
- **Claim as written:** "`mon` is a macrolanguage over `khk` and `mvf`; `bua` is a macrolanguage over `bxm`, `bxr` and `bxu`; `xng` (Middle Mongolian) and `cmg` (Classical Mongolian) are historical; `xwo` (Written Oirat) is *extinct*; and Oirat has no ISO 639-3 code of its own, so the atlas shows `xal` (Kalmyk) with a note."
- **Appears in:** `atlas-mongolic.js` → `const ISO`
- **Verdict:** verified
- **Source:** the SIL ISO 639-3 register, `iso-639-3.tab` and `iso-639-3-macrolanguages.tab` · https://iso639-3.sil.org/code_tables/download_tables · retrieved 2026-09-26
- **What the source says:** `awk` over the register returns: `mon` (also 639-1 `mn`) — scope **M**, "Mongolian"; `khk` — "Halh Mongolian"; `mvf` — "Peripheral Mongolian"; `bua` — scope **M**, "Buriat"; `bxm` "Mongolia Buriat", `bxr` "Russia Buriat", `bxu` "China Buriat"; `xal` — "Kalmyk"; `xng` — **type H**, "Middle Mongolian"; `cmg` — **type H**, "Classical Mongolian"; `xwo` — **type E**, "Written Oirat"; `dta` "Daur"; `mjg` "Tu"; `sce` "Dongxiang"; `peh` "Bonan"; `kxs` "Kangjia"; `yuy` "East Yugur"; `mhj` "Mogholi"; `ykh` "Khamnigan Mongol". The macrolanguage table gives `bua ← bxm, bxr, bxu` (all status **A**) and `mon ← khk, mvf` (both status **A**). **There is no plain "Oirat" code** — the spoken Oirat language is coded as Kalmyk `xal` in practice, and Glottolog treats the two as one languoid (`kalm1243`, "Oirad-Kalmyk-Darkhat"). False friends to avoid in the same register: `ybe` is **West** Yugur, which is *Turkic*, not Mongolic — only `yuy` (East Yugur) belongs here; `mgt` is "Mongol", a language of Papua New Guinea; `oia` is "Oirata", in Indonesia; `msr` is Mongolian Sign Language.
- **Confidence:** high — read directly out of the register
- **Action:** the ISO map carries all of the above, including the "no code of its own" notes. West Yugur is *not* a node in this atlas; the `yugur` node is Eastern Yugur only, and its prose says so, because the two are different families sharing one ethnonym.

### [MG-106] Kalmyk: 1630, the Khanate, "those who remained", and Europe's only Buddhist-majority polity
- **Claim as written:** "The ancestors of the Kalmyks were Oirat Mongols who migrated from the southern Siberian steppes on the Irtysh and reached the lower Volga in or about 1630, expelling the Turkic-speaking Nogai. Their khanate peaked under Ayuka Khan (khan 1690–1724). The name *Kalmyk* means 'those who remained', after a large part of them moved back to Dzungaria in the 18th century. Kalmykia is the only polity in Europe where Buddhism is the majority religion."
- **Appears in:** `atlas-mongolic.js` → nodes `oirat`, `kalmyk`
- **Verdict:** verified
- **Source:** *Kalmykia*, Wikipedia · https://en.wikipedia.org/wiki/Kalmykia · and *Kalmyk Oirat*, Wikipedia · https://en.wikipedia.org/wiki/Kalmyk_Oirat · retrieved 2026-09-26
- **What the sources say:** "Kalmykia is the only [[polity]] within the [[European continent]] where [[Buddhism]] is the majority religion; the majority of [[Kalmyk people]] are [[Vajrayana]] [[Tibetan Buddhism|Tibetan Buddhists]] of the [[Gelug]] and [[Kagyu]] lineages." "The ancestors of the Kalmyks, the Oirat Mongols, migrated from the steppes of southern Siberia on the banks of the Irtysh River, reaching the Lower Volga region of Eastern Europe by the early 17th century… They reached the lower Volga region in or about **1630**. That land, however, was not uncontested pastures, but rather the homeland of the Nogai Horde, a confederation of Turkic-speaking nomadic tribes. The Kalmyks expelled the Nogais…" "The Kalmyk Khanate reached its peak of military and political power under Ayuka Khan (ruled 1672–1724, khan **1690–1724**)." "The word *Kalmyk* means 'those who remained'. Its origin is unknown but this name was known centuries before a large part of the Kalmyks moved back from the Volga River to Dzhungaria in the 18th century." The Kalmyk language article's infobox gives **110,000** speakers (2021) and scripts "Cyrillic, Latin, Clear script".
- **Confidence:** high
- **Action:** the Kalmyk node carries both figures — the 360,000 in Janhunen's table (which covers Kalmyk–Oirat *together*) and the 110,000 for Kalmyk alone — because they measure different things. The "only Buddhist-majority polity in Europe" claim is attributed rather than stated bare.

### [MG-107] The Shirongolic cluster: five small languages, three scripts, one Sprachbund
- **Claim as written:** "Southern Mongolic — the Shirongolic languages of the Gansu–Qinghai highlands — is Monguor (152,000), Santa/Dongxiang (200,000), Bonan (6,000), Kangjia (1,000) and Eastern Yugur (4,000). It sits in a Sprachbund, and its languages are written in three different scripts: Latin for Monguor, Arabic for Santa, and *Tibetan* for Bonan."
- **Appears in:** `atlas-mongolic.js` → nodes `shirongolic`, `monguor`, `santa`, `bonan`, `kangjia`, `yugur`
- **Verdict:** verified
- **Source:** *Monguor language* · https://en.wikipedia.org/wiki/Monguor_language · *Santa language* · https://en.wikipedia.org/wiki/Santa_language · *Bonan language* · https://en.wikipedia.org/wiki/Bonan_language · *Kangjia language* · https://en.wikipedia.org/wiki/Kangjia_language · *Eastern Yugur language* · https://en.wikipedia.org/wiki/Eastern_Yugur_language · all retrieved 2026-09-26
- **What the sources say:** *Monguor* — "speakers ≈152,000 (2000 census, e18)"; region Qinghai, Gansu; ISO `mjg`; script "**Latin script**"; dialects Mongghul (Huzhu) and Mangghuer (Minhe); Glottolog `tuuu1240` "Tu"; family Southern Mongolic > Shirongol. *Santa* — "speakers 200,000 (2007, e18)"; region "Gansu (mainly Linxia Hui Autonomous Prefecture) and Xinjiang (Ili Kazakh Autonomous Prefecture)"; ISO `sce`; scripts "**Arabic, Latin**"; family Shirongol > Baoanic. *Bonan* — "speakers 6,000 (1999, e16)"; region Gansu, Qinghai; ISO `peh`; script "**Tibetan script**" — the native name is given in Tibetan script as མ་ནི་སྐད་ཅི (*Ma ni skad ci*); family Shirongol > Baoanic. *Kangjia* — "speakers 1,000 (2007, e18)", ethnicity 2,000 (2007); region Qinghai; ISO `kxs`; family Shirongol > Baoanic. *Eastern Yugur* — "speakers 4,000 (2007, e18)", ethnicity 6,000 Yugur (2000); region Gansu; ISO `yuy`; family Southern Mongolic. The family article annotates Southern Mongolic as "part of a Gansu–Qinghai [[Sprachbund]]".
- **Confidence:** high
- **Action:** the cluster gets its own branch node because the Sprachbund, not the tree, is the interesting fact; the node says the internal classification is contested and that these five have converged on their neighbours as much as they have diverged from each other. Bonan's Tibetan script is called out explicitly, because it is the single most surprising script fact in the family.

### [MG-108] The mixed languages: Tangwang and Wutun — the Sinitic cross-link
- **Claim as written:** "Two Mongolic varieties are mixed languages with Mandarin: Tangwang (Mandarin–Santa) and Wutun (Mandarin–Bonan). They are the reason this atlas links into the Sinitic one."
- **Appears in:** `atlas-mongolic.js` → nodes `shirongolic`, `santa`, `bonan` (cross-link `<a href="#sinitic/lanyin">`)
- **Verdict:** verified
- **Source:** *Mongolic languages*, Wikipedia, "Mixed languages" section · https://en.wikipedia.org/wiki/Mongolic_languages · retrieved 2026-09-26
- **What the source says:** "The following are [[mixed languages|mixed]] [[Varieties of Chinese|Sinitic]]–Mongolic languages. * [[Tangwang language|Tangwang]] (mixed [[Mandarin Chinese|Mandarin]]–[[Santa language|Santa]]) * [[Wutun language|Wutun]] (mixed [[Mandarin Chinese|Mandarin]]–[[Bonan language|Bonan]])". This sits directly under the Southern Mongolic material, which the same article describes as "part of a Gansu–Qinghai Sprachbund".
- **Confidence:** high for the existence and the pairs; **low** for anything further about their structure, which I did not fetch
- **Action:** the atlas names the two mixed languages and nothing more — no structural claims, no percentages. This is the only Sinitic cross-link in the Mongolic file; the `hutong` loanword in `[MG-109]` is a second, weaker one.

### [MG-109] Moghol in Afghanistan, Dagur's Manchu script, and the Tungusic script lineage
- **Claim as written:** "Moghol is the family's strangest outlier: a relic of the Mongol conquests in Herat Province, Afghanistan, written in Perso-Arabic and down to 'few' speakers. Dagur, in Manchuria, historically used the *Manchu* script — and the Manchu and Xibe alphabets are themselves descended from the Mongolian script, which is the atlas's bridge into the Tungusic family."
- **Appears in:** `atlas-mongolic.js` → nodes `moghol`, `dagur`, `khamnigan`, `mongolic` (cross-link `<a href="#tungusic/manchu">`)
- **Verdict:** verified
- **Source:** *Moghol language* · https://en.wikipedia.org/wiki/Moghol_language · *Dagur language* · https://en.wikipedia.org/wiki/Dagur_language · *Khamnigan Mongol* · https://en.wikipedia.org/wiki/Khamnigan_Mongol · *Mongolian script* · https://en.wikipedia.org/wiki/Mongolian_script · *Hutong* · https://en.wikipedia.org/wiki/Hutong · all retrieved 2026-09-26
- **What the sources say:** *Moghol* — "states Afghanistan"; "region [[Herat Province]]"; "speakers 'few' (1982)"; ISO `mhj`; script "**Perso-Arabic script**"; native name مُغُلی; dialects Karez-I-Mulla and Kundur; Glottolog `mogh1245`. The family article's table lists Moghol as **"(extinct)"**, citing Glottolog. *Dagur* — "speakers China: 91,000 (1999, e18)"; region "Inner Mongolia, Heilongjiang Province, Xinjiang"; script "Latin script / Mongol script / Cyrillic script / **Manchu script** (''historically'')". *Khamnigan Mongol* — 2,000 speakers (no date); China, Russia, Mongolia; "Onon–Argun basin, Transbaikalia"; ISO `ykh`; scripts Mongolian script and Cyrillic. *Mongolian script* — "it has been adapted for such languages as Oirat and Manchu. Alphabets based on this classical vertical script continue to be used in Mongolia and Inner Mongolia to write Mongolian, Xibe and, experimentally, Evenki"; the infobox's list of descendants includes the **Manchu alphabet**, and under it the **Dagur alphabet** and **Xibe alphabet**, plus the **Evenki alphabet**. *Hutong* — the article's infobox glosses the word as a "borrowing of Middle Mongolian *quddug* ('water well')", and the body says "The term 'hutong' appeared first during the Yuan Dynasty, and is a term of Mongolian origin, meaning 'water well'."
- **Confidence:** high for the script lineages and the Moghol facts; **medium** for Moghol's present status, since "few" dates to 1982 and Glottolog's "extinct" is a different kind of claim
- **Action:** the Moghol node reports both — "few" speakers as of 1982, and Glottolog's listing as extinct — rather than choosing. The Tungusic cross-link is a script lineage, not a genetic one, and the prose says so.

### [MG-110] Link health — Omniglot coverage for Mongolic (protocol from TU-109)
- **Claim as written:** every `SOUND` entry in `atlas-mongolic.js` is a URL that was requested before being written down.
- **Appears in:** `atlas-mongolic.js` → `const SOUND`
- **Verdict:** verified — 26 candidate URLs requested 2026-09-26
- **What the check found:** **200** for `mongolian`, `buryat`, `kalmyk`, `monguor`, `phagspa`, `xibe`, `manchu`. **404** for `mongolian_script`, `mongolian_cyrillic`, `mongolic`, `dagur`, `dongxiang`, `bonan`, `kangjia`, `yugur`, `moghol`, `clear_script`, `phags_pa`, `mongolian_alphabets`, `todo`, `todo_bichig`, `clear`, `mongolian_traditional`, `mongolian_todo`, `kalmyk_clear`, `mongol`.
- **Action:** the SOUND map carries only the 200s. Nodes with no Omniglot page (Dagur, Santa, Bonan, Kangjia, Eastern Yugur, Moghol, Middle Mongol, Khamnigan, and the script nodes) carry an **empty list** rather than a guessed or 404 link; the engine's YouTube-search fallback covers them. Note the two traps recorded here so a later session does not repeat them: Omniglot has **no** separate page for the Mongolian *script* (only for the language), and its ʼPhags-pa page is spelled **`phagspa.htm`**, not `phags_pa.htm`.

### [MG-111] ⚠ Three figure problems found on a re-check: an unlogged Oirat figure, a source that contradicts itself, and one number with no source at all
- **Found:** 2026-09-26, in a consistency pass over `atlas-mongolic.js` against the saved source dumps in `/tmp/wp-mg-*.txt`. Three separate problems, all now fixed. Recorded because two of them were invisible from inside the atlas and one was a genuine error of mine.
- **Problem 1 — the Oirat figure was correct but unlogged.** The `oirat` node carried "368,000 — 58% of 655,372 ethnic Oirats, by source", and `[MG-101]`–`[MG-110]` never mentioned 368,000 or 655,372. Re-checked against the saved dump: `/tmp/wp-mg-Oirat_language.txt` lines 9–10 give the infobox as `| ethnicity = 655,372 [[Oirats]]` and `| speakers = 368,000, 58% of ethnic population`. So the node is a **faithful quote** and was never a fabrication — but it was an unlogged citation, which is exactly what the honesty note above says does not happen. Now logged here.
  - **The arithmetic inside the source is loose, and the atlas now says so.** 58% of 655,372 is about 380,000, not 368,000. The percentage and the absolute figure do not agree with each other *in the infobox*. The node quotes both and flags the mismatch rather than silently correcting either.
  - **And it is a third figure, not a restatement of Janhunen's.** The family article's table gives **360,000** for "Kalmyk–Oirat" *combined*; the Oirat infobox gives **368,000** for Oirat's own speakers. These are different sources, different dates and slightly different populations, and they are too close to call either one the error. The node, its `sp` chip and its `FEATURES` list now carry all three figures — 368,000, 360,000 and Kalmyk's 110,000 (2021) — with the scope of each stated.
- **Problem 2 — the source contradicts itself on Inner Mongolia, and the atlas had repeated the headline.** The `peripheral` node asserted flatly that Inner Mongolian "outnumbers the Mongolian of the state of Mongolia", quoting the Mongolian-language article's sentence "The number of Mongolian speakers in China is still larger than in the state of Mongolia". **The same article's own figures say the opposite.** `/tmp/wp-mg-Mongolian_language.txt` line 83 gives Mongolia "nearly 3.6 million people (2014 estimate)", Inner Mongolia "about 2.1 million people speak Mongolian", and all of China "roughly half of the country's 5.8 million ethnic Mongols" — i.e. about 2.9 million for China against 3.6 million for Mongolia. So the sentence and the numbers it sits beside cannot both be right.
  - **Resolution:** the atlas now reports the claim *as a claim* and gives the figures that undercut it, rather than asserting the surprise fact. What survives unhedged is the dialect position, which is not contested: rather more than two million speak Khorchin as a mother tongue, making that group comparable in size to Khalkha.
- **Problem 3 — a number of mine with no source behind it, now removed.** The `central` node's `sp` chip read "≈5.6 million — most of the family". That figure appears in **no** source dump and is not derivable from the table: the family article's tree (`/tmp/wp-mg-Mongolic_languages.txt` lines 124–130) gives Dagur 96,000, Buryat 330,000 and Kalmyk–Oirat 360,000, and gives **Peripheral Mongolian no figure at all** — so any sum for Central Mongolic is necessarily incomplete, and 5.6 million was not one. Replaced with the qualitative "the great majority of the family, by source".
  - **A related scope error, also fixed.** The `khalkha` node carried "5.2 million (Mongolian proper)" as if that were Khalkha's own count. Janhunen's "Mongolian proper" is a **single table row covering the Khalkha and Inner Mongolian varieties together**, so putting all of it on Khalkha double-counted against the `peripheral` node beside it. The chip now gives Mongolia's own figure, **nearly 3.6 million (2014)**, with the 5.2 million labelled as the whole "Mongolian proper" row, and the node prose states the scope difference explicitly.
- **Confidence:** high for all three. Problems 1 and 2 are direct readings of saved dumps; problem 3 is an absence — the figure could not be found in any source consulted, which is why it was removed rather than re-hedged.
- **Action:** the atlas's `sources` note now says **five** logged figure problems rather than four, and names the Oirat and "Mongolian proper" scope issues alongside the original three. The `[MG-102]` heading said "three figures" while its own body logged four; corrected to "four". The Disputed table below gains two rows.

## Silk Road lost languages (Phase 5) — research log

**Brief:** `languages.md` §2.12. **Atlas:** `atlas-silkroad.js` — 34 nodes · 78 markers · 19 palette
classes · 5 sketch polygons. **Special mode:** the first atlas in the series with an all-extinct
subject, so three engine switches were added for it (all opt-in and backward-compatible) — see
`[SR-110]`. Sources were fetched with `Special:Export` and the wikitext dumps kept in
`/tmp/wpsr/*.xml`; the ISO register used is the same `iso-639-3.tab` retrieved for Phase 4.

### [SR-101] The framing: this is not a family, and the atlas says so
- **Claim as written:** "The Silk Road was not one road and not one language… a dozen unrelated languages met, borrowed from each other, and left their paperwork behind in a desert that preserves paper better than any archive."
- **Appears in:** `atlas-silkroad.js` → node `silkroad` (root)
- **Verdict:** verified as a framing statement, with the classification caveat made explicit
- **Source:** *Tocharian languages*, *Sogdian language*, *Bactrian language*, *Gāndhārī language*, *Tangut language*, *Khitan language*, *Old Turkic*, *Saka language*, Wikipedia · all retrieved 2026-09-26 via `Special:Export`
- **What the sources say:** each article independently confirms the family assignment used in the tree — Tocharian is Indo-European; Saka is Eastern Iranian; Sogdian is Iranian; Bactrian is Iranian ("written predominantly in an alphabet based on the Greek script"); Gāndhārī is Middle Indo-Aryan (a Prakrit); Tangut is Sino-Tibetan; Khitan is para-Mongolic; Jurchen is Tungusic; Old Turkic splits into "the earlier Orkhon Turkic and the later Old Uyghur".
- **Confidence:** high for every family assignment except Rouran and Xiongnu, which are handled separately at `[SR-106]`
- **Action:** the root node states outright that these are not one family, and the tree groups by family rather than pretending to a single ancestor. The `scripts` branch carries an explicit "not a genetic subgroup" warning in its own prose, repeating the device used by `atlas-mongolic.js`.

### [SR-102] Tocharian A and B: the names, the range, and the "surprise"
- **Claim as written:** "Tocharian A, also called *East Tocharian* or *Turfanian*… Tocharian B, also called *West Tocharian* or *Kuchean*… in use across the whole area from Turfan in the east to Tumshuq in the west."
- **Appears in:** `atlas-silkroad.js` → nodes `tocharian`, `tochA`, `tochB`
- **Verdict:** verified
- **Source:** *Tocharian languages*, Wikipedia · https://en.wikipedia.org/wiki/Tocharian_languages · retrieved 2026-09-26
- **What the source says:** the two are "Tocharian A (also ''East Tocharian'' or ''Turfanian'') and Tocharian B (''West Tocharian'' or ''Kuchean'')"; and "Tocharian B was more actively spoken in the entire area from Turfan in the east to Tumshuq in the west". The famous Indo-European cognate set is quoted in the article with the "honey"/"mead" comparison against Greek and Old Church Slavonic, which is the basis for the node's claim that the comparisons "established… that Tocharian belongs to Indo-European".
- **Confidence:** high
- **Action:** the node uses the alternative names, gives B the wider range, and states that the letters A/B are conventional and imply no chronology — a point the article's own presentation can mislead on.
- **⚠ A date the atlas deliberately does NOT state precisely:** the node says Tocharian is "extinct by the 9th c." and the timeline says "9th–10th c." for the end. The articles give the Uyghur movement into the Tarim (c. 840–860) and the last datable documents (10th c.) but no single extinction year, so the atlas uses ranges. Do not "sharpen" these to a year.

### [SR-103] The Sogdian “Ancient Letters”: 313–314 CE, found 1907, and the Mount Mugh archive
- **Claim as written:** "The 'Ancient Letters' — five letters, four of them more or less complete, on paper and silk — were found by Aurel Stein in 1907 in an abandoned watchtower near Dunhuang, and are dated by their contents to 313–314 CE."
- **Appears in:** `atlas-silkroad.js` → nodes `sogdian`, `sogdscript`; and the root timeline
- **Verdict:** verified for the find-spot, the finder and the date; the "five letters, four more or less complete" count is a convention of the secondary literature and is stated as such
- **Source:** *Sogdian language*, Wikipedia · https://en.wikipedia.org/wiki/Sogdian_language · retrieved 2026-09-26
- **What the source says:** the letters were found "in an abandoned watchtower near [[Dunhuang]] in 1907, dating to the end of the Western Jin dynasty"; a cited table gives "'Ancient Letters' 313 CE to 314 CE". The article's reference list also names "Sogdian Ancient Letter No." individually, which is where the conventional numbering comes from.
- **Confidence:** high for 1907 / Dunhuang / 313–314
- **Action:** the node gives all three facts and attributes the archive to Stein. The "Ancient Letters" anchor the whole Sogdian entry because they are the oldest substantial Sogdian texts and because their contents — merchants writing home about goods and prices — illustrate the lingua-franca claim directly.


### [SR-104] Bactrian: Greek script, the *sho* letter, and the 1993 Rabatak inscription
- **Claim as written:** "the only Iranian language ever written in the Greek alphabet… with the addition of one letter — *sho* (ϸ)… the Rabatak inscription, found in 1993 near Surkh Kotal."
- **Appears in:** `atlas-silkroad.js` → node `bactrian`
- **Verdict:** verified
- **Source:** *Bactrian language*, Wikipedia · https://en.wikipedia.org/wiki/Bactrian_language · retrieved 2026-09-26
- **What the source says:** "The Bactrian script was directly adapted from the [[Greek script]] (here in grey), with the addition of the letter [[Sho (letter)|sho]] (ϸ)"; "Bactrian, which was written predominantly in an alphabet based on the [[Greek script]], was known natively as αριαο [arjaː] ('[[Arya]]')"; "The [[Rabatak inscription]] is an inscription written on a rock in the Bactrian language and the Greek script, which was found in 1993 at the site of [[Robatak, Afghanistan|Rabatak]], near [[Surkh Kotal]] in [[Afghanistan]]."
- **Confidence:** high — the 1993 date and the Surkh Kotal location are both stated explicitly
- **Action:** the node carries the script fact, the endonym, and the inscription with its date and place. The Rabatak inscription also gets its own marker so the find-spot is visible on the map.

### [SR-105] ⚠ The ISO 639-3 register: three spelling mismatches and two false friends
- **Claim as written:** every ISO code quoted in `atlas-silkroad.js`.
- **Appears in:** `atlas-silkroad.js` → `const ISO`
- **Verdict:** verified against the register — and the register disagrees with common usage in three places
- **Source:** SIL ISO 639-3 register, `iso-639-3.tab` (7,928 lines), retrieved 2026-09-26 · https://iso639-3.sil.org/sites/iso639-3/files/downloads/iso-639-3.tab
- **What the register says, code by code:** `xto` = **"Tokharian A"** and `txb` = **"Tokharian B"** — the register spells it *Tokharian*, not *Tocharian*; `zkt` = **"Kitan"**, not *Khitan*; `otk` = **"Old Turkish"**, not *Old Turkic*; `oui` = **"Old Uighur"**; `xco` = **"Chorasmian"**, not *Khwarezmian*. All five are language type **H** (historical). `kho` (Khotanese), `xtq` (Tumshuqese), `sog` (Sogdian), `xbc` (Bactrian), `pgd` (Gāndhārī), `txg` (Tangut), `xzh` (Zhang-Zhung), `juc` (Jurchen) are all type **H**. **`yai` = "Yagnobi" is type L — living**, which is the register confirming the atlas's central claim about Yaghnobi.
- **The two false friends, which are the reason this entry exists:**
  - **`xru` is *Marriammu*** — an Australian Aboriginal language — and **not Rouran**.
  - **`xnn` is *Northern Kankanay*** — a Philippine language — and **not Xiongnu**.
  Both codes look like they should belong to this atlas's languages and neither does. **Rouran and Xiongnu have no 639-3 code at all**, which is the correct state of affairs for languages attested only in fragments. The atlas shows **no** code chip for either node rather than a plausible-looking wrong one. This is the same class of trap as `aib` "Ainu (China)" recorded at `[JP-105]`.
- **Confidence:** high — read directly out of the register file, not recalled
- **Action:** the `ISO` map quotes the register's own spellings and flags each mismatch inline, so a reader comparing the atlas to the register is not left thinking the atlas made a typo.


### [SR-106] ⚠ DISPUTED — Rouran's classification, and why the atlas refuses to place Xiongnu
- **Claim as written:** "Alexander Vovin argued in 2019 that their language is the earliest attested Mongolic… presented as an argument rather than a settled fact."
- **Appears in:** `atlas-silkroad.js` → nodes `relic`, `rouran`, `xiongnu`
- **Verdict:** **disputed** — reported as a live scholarly argument, not as a finding
- **Source:** *Rouran Khaganate*, Wikipedia · https://en.wikipedia.org/wiki/Rouran_Khaganate · retrieved 2026-09-26
- **What the source says:** the article cites "Vovin, Alexander, 'A Sketch of the Earliest Mongolic Language: the Brāhmī Bugut and Khüis Tolgoi Inscriptions'" for the Mongolic reading, and separately notes that "the [[Book of Wei]] connected them to [[Proto-Mongols|Proto-Mongolic]] [[Donghu people|Donghu]]". It also records an etymological proposal deriving *Róurán* as \*nönör and comparing it to Mongolic нөкүр *nökür* "friend, comrade, companion". So the article presents the Mongolic connection as supported but argued from etymologies and a small inscriptional corpus, not demonstrated.
- **Confidence:** medium — this is the atlas's single logged dispute for the phase, and it is a dispute over an *argument*, not over a fact
- **Action:** the `rouran` node attributes the claim to Vovin by name and year, calls it an argument, and adds the honest caveat that "a handful of Brāhmī inscriptions is not a corpus". The `xiongnu` node goes further and lists Turkic, Mongolic, Yeniseian, Iranian and "isolate" as competing proposals without choosing — the refusal to classify is stated in the prose as the finding.

### [SR-107] Tangut: the script, the 5,863 characters, and the Khara-Khoto library
- **Claim as written:** "a collection of nearly 5,800 characters… a 2004 count put the known inventory at 5,863 characters, excluding variants… the library recovered from the ruined city of Khara-Khoto by Pyotr Kozlov's expedition in 1909."
- **Appears in:** `atlas-silkroad.js` → nodes `sinotibetan`, `tangut`
- **Verdict:** verified
- **Sources:** *Tangut script*, Wikipedia · https://en.wikipedia.org/wiki/Tangut_script · and *Tangut language*, Wikipedia · https://en.wikipedia.org/wiki/Tangut_language · both retrieved 2026-09-26
- **What the sources say:** "The '''Tangut script''' is a [[logographic]] writing system, formerly used for writing the extinct [[Tangut language]]"; "According to a 2004 count, 5,863 Tangut characters are known, excluding variants"; and the often-quoted judgement that it is "one of the most inconvenient of all scripts, a collection of nearly 5,800 characters of the same kind as Chinese characters but rather more complicated; very few are made up of as few as four strokes and most are made up of a good many more, in some cases nearly twenty". The language article gives "The Western Xia was annexed by the [[Mongol Empire]] in 1227."
- **Confidence:** high for the character count, the script type and 1227
- **Action:** the node quotes the 5,863 figure with its 2004 date and attributes the "most inconvenient" judgement as a quotation rather than the atlas's own verdict. The 1909 Kozlov removal is given as the reason the language became readable, and the timeline marks it as a separate event from the 1227 conquest — the point being that the *state* ended in 1227 but the *evidence* was recovered in 1909.

### [SR-108] Khitan: two mutually exclusive scripts, one still partly unread
- **Claim as written:** "Khitan was written using two mutually exclusive writing systems… the small script, which was a syllabary, was used until the Jurchen-speaking Jin dynasty replaced it with the Jurchen script in 1191. The large script was logographic like Chinese… Owing to a narrow corpus of known words and a partially undeciphered script, the language has yet to be completely reconstructed."
- **Appears in:** `atlas-silkroad.js` → nodes `paramongolic`, `khitan`, `jurchen`
- **Verdict:** verified, and the decipherment status is the load-bearing part
- **Source:** *Khitan language*, Wikipedia · https://en.wikipedia.org/wiki/Khitan_language · retrieved 2026-09-26
- **What the source says:** all four sentences above are close paraphrases of the article, which cites Janhunen (2006) at pp. 393 and 395 for the small script's syllabary status and the large script's logographic character. The article's own summary is that "the language has yet to be completely reconstructed" — which is a *different* claim from "the script is undeciphered", and the atlas keeps them apart.
- **Confidence:** high for the two-script distinction and the 1191 date
- **Action:** the node's chip reads **"partial"**, not "deciphered", and the feature list spells out the distinction that the small script is largely read while the large script is not. This is the atlas's clearest case of a language that is *not yet* fully readable, and it is deliberately contrasted with Tangut, whose chip reads "deciphered".


### [SR-109] Old Turkic: Orkhon and Uyghur, Yadrintsev 1889, Thomsen 1893
- **Claim as written:** "Old Turkic can generally be split into two dialects, the earlier Orkhon Turkic and the later Old Uyghur… the runiform alphabet was deciphered by Vilhelm Thomsen in 1893… named after the Orkhon Valley where early 8th-century inscriptions were discovered in an 1889 expedition by Nikolai Yadrintsev."
- **Appears in:** `atlas-silkroad.js` → nodes `turkic`, `orkhon`, `olduyghur`, `runiform`; and the root timeline
- **Verdict:** verified
- **Source:** *Old Turkic*, Wikipedia · https://en.wikipedia.org/wiki/Old_Turkic · retrieved 2026-09-26
- **What the source says:** "Old Turkic can generally be split into two dialects, the earlier [[Orkhon Turkic language|Orkhon Turkic]] and the later [[Old Uyghur]]"; "The [[Old Turkic script|Turkic runiform alphabet]] of Orkhon Turkic was deciphered by [[Vilhelm Thomsen]] in 1893"; "The script is named after the [[Orkhon Valley]] in [[Mongolia]] where early 8th-century inscriptions were discovered in an 1889 expedition by [[Nikolai Yadrintsev]]". The article also cites Talat Tekin's *A Grammar of Orkhon Turkic*, which is the source named in the atlas's `sources` note.
- **Confidence:** high — all four facts are stated directly
- **Action:** both dates (1889 find, 1893 decipherment) appear in the timeline and in the `runiform` node, and the node warns explicitly that "runiform" is a description of appearance and **not** a claim of relation to the Germanic runes. That warning is included because the resemblance is the single most common misconception about this script.

### [SR-110] Link health, and the special-mode engine work the phase required
- **Claim as written:** every `SOUND` entry in `atlas-silkroad.js` is a URL that was requested before being written down.
- **Appears in:** `atlas-silkroad.js` → `const SOUND`; and `EastAsiaAtlas.html` for the engine changes
- **Verdict:** verified — 32 candidate URLs requested 2026-09-26
- **What the link check found:** **200** for `tocharian`, `kharosthi`, `brahmi`, `sogdian`, `chorasmian`, `yaghnobi`, `orkhon`, `tangut`, `khitan`, `jurchen`, `bactrian`, `uyghur`, `aramaic`, `syriac`, `runic`, `phagspa`. **404** for `kharoshti`, `khwarezmian`, `manichaean`, `manichaean_script`, `manichaean_alphabet`, `old_turkic`, `old_uyghur`, `uighur`, `saka`, `khotanese`, `sogdian_script`, `brahmi_script`, `kharosthi_script`, `zhangzhung`, `bon`, `tangut_script`, `khitan_small`, `chinese_script`, `todo`, `xixia`.
  - **Two spelling traps, both recorded so a later session does not repeat them:** Omniglot's Khwarezmian page is spelled **`chorasmian.htm`** — the register's spelling, not the common one — and Kharoṣṭhī is **`kharosthi.htm`**, *not* `kharoshti.htm`.
  - **There is no Manichaean page on Omniglot under any name tried.** The `manichaean` node therefore links to the Syriac page with the absence stated in the link text itself, rather than to a guessed URL.
  - **No page exists** for Saka, Khotanese, Tumshuqese, Gāndhārī, Zhangzhung, Rouran or Xiongnu, so those nodes carry an **empty** `sound` list and the engine's search fallback covers them.
- **The special-mode engine work (the phase's other deliverable).** `languages.md` §2.12 asks for a timeline-first panel, optional script and decipherment chips, and inverted colour semantics. Three opt-in switches were added to `EastAsiaAtlas.html`, all backward-compatible — the five existing atlases render identically:
  1. **`timelineFirst`** — renders the Timeline above the History prose. Implemented by factoring the two blocks into `historyHTML()` / `timelineHTML()` so either order is a one-line choice.
  2. **per-node `chips:[[text,class]]`** — an author-supplied chip list, rendered after the standard chips, with new `.chip.scr` (dashed) and `.chip.dec` / `.chip.dec.und` styles for scripts and decipherment status.
  3. **`kinds`** — overrides the panel's type labels, because "Living variety" is the wrong label for a language with no speakers; this atlas uses "Attested language".
  A fourth change was made after the first smoke test caught a wording bug: the engine hard-appended the word " speakers" to every `sp` value, so a dead language rendered as **"extinct speakers"**. Added **`spSuffix`** (default `' speakers'`, so every existing atlas is unaffected); Silk Road sets it to `''` and writes self-contained `sp` strings.
- **Verified:** `node tools/check-atlas.js` on all six atlas files → all valid (sinitic 43 · tungusic 19 · kradai 36 · japonic 23 · mongolic 26 · silkroad 34). Headless Edge smoke test of `#silkroad`: title "Silk Road lost languages — East Asian Language Atlas", 19 palette rules generated, stats row `33 nodes — all extinct but one · 8 scripts on one route · 3 scripts not fully deciphered`, nav button `aria-current="page"`, **0 error markers**. Deep link `#silkroad/tochB` renders the node with all three chip kinds visible — `Brāhmī (Tocharian variant)` (`.scr`), `deciphered` (`.dec`) and `ISO 639-3: txb (type H — register spelling "Tokharian B")` — and the panel confirmed **Timeline above History**. A regression check of `#mongolic/khalkha` confirmed the `spSuffix` default still appends " speakers" for the older atlases.


## Tibeto-Burman (Phase 6) — research log

**Brief:** `languages.md` §2.7. **Atlas:** `atlas-tibetoburman.js` — 56 nodes · 164 markers · 12 palette
classes · 5 sketch polygons. Sources fetched with `Special:Export` into `/tmp/wptb/*.xml`; the ISO
register is the same `iso-639-3.tab` used for Phases 4 and 5.

### [TB-101] ⚠ THE HEADLINE — "Tibeto-Burman" is not a demonstrated subgroup
- **Claim as written:** the atlas is *titled* Tibeto-Burman, and the root node says plainly that the title describes a conventional grouping rather than a proven one.
- **Appears in:** `atlas-tibetoburman.js` → nodes `tibetoburman` (root) and `prototb`; and in the `sources` note
- **Verdict:** **verified as a live critical position** — and it is the single most important thing to know about this atlas
- **Source:** *Tibeto-Burman languages*, Wikipedia · https://en.wikipedia.org/wiki/Tibeto-Burman_languages · retrieved 2026-09-26
- **What the source says:** "…Benedict (1972) and later [[James Matisoff]], Tibeto-Burman has not been demonstrated to be a valid subgroup in its own right." The same article records that "[[James Matisoff]] proposes a modification of Benedict that demoted Karen but kept the divergent position of Sinitic", and that "Matisoff makes no claim that the families in the Kamarupan or Himalayish branches have a special relationship to one another other than a geographic one."
- **Why this matters for the whole file:** three consequences, all carried into the atlas rather than buried:
  1. **The tree is a map of usage, not a genealogy.** The root node says so, and the `prototb` node repeats it, so a reader who deep-links to the reconstruction still meets the caveat.
  2. **Some of the tree's own groupings are openly geographic.** The `bodish` and `sal` nodes are labelled as groupings in their own prose rather than presented as clades.
  3. **Karen's position is genuinely unsettled** — see `[TB-109]`, a separate entry because the demotion of Karen is a specific, checkable claim rather than part of the general caveat.
- **Confidence:** high that this is the standard critical position; **the atlas does not attempt to resolve it**, because resolving it is a research programme, not a phase.
- **Action:** the caveat is stated on the root node, in the `prototb` node, in the `sources` note, and here. The repetition is deliberate: a reader arriving at any one of those points should not be able to miss it.

### [TB-102] Old Tibetan: mid-7th to early 9th century, and the Dunhuang archive
- **Claim as written:** "Old Tibetan is the earliest recorded stage of the language, 'reflected in documents from the adoption of writing by the Tibetan Empire in the mid-7th century to the early 9th century'… Its most important archive is unexpected: the sealed cave library at Dunhuang."
- **Appears in:** `atlas-tibetoburman.js` → nodes `oldtibetan`, `tibetic`; and the root timeline
- **Verdict:** verified for the date range and the script's adoption
- **Source:** *Old Tibetan*, Wikipedia · https://en.wikipedia.org/wiki/Old_Tibetan · retrieved 2026-09-26
- **What the source says:** Old Tibetan is "reflected in documents from the adoption of writing by the Tibetan Empire in the mid-7th century to the early 9th century". The article also notes that "most consonants could be palatalized, and the palatal series from the Tibetan script represents palatalized coronals" — a detail used in the node's description of the script's design.
- **Confidence:** high for the date range
- **Action:** the node gives the range as a range, and the atlas uses the Dunhuang cave library as the anchor because it is where the Tibetan material was actually recovered — the same device the Silk Road atlas uses for its find-spots.


### [TB-103] Dzongkha: 640,000 speakers, and the one Tibetic national language
- **Claim as written:** "Dzongkha is the national language of Bhutan… The source gives total speakers as <b>640,000</b>."
- **Appears in:** `atlas-tibetoburman.js` → node `dzongkha`
- **Verdict:** verified
- **Source:** *Dzongkha*, Wikipedia · https://en.wikipedia.org/wiki/Dzongkha · retrieved 2026-09-26
- **What the source says:** the infobox gives "speakers2 = Total speakers: 640,000", and the lead describes it as "a [[Tibeto-Burman languages|Tibeto-Burman language]] in the [[Tibetic languages|Tibetic]] language family that is primarily spoken by the [[Bhutanese people|Bhutanese people]]".
- **Confidence:** high for the figure and the classification
- **Action:** the node quotes 640,000 with "by source" and states the complication the figure hides — that Bhutan is linguistically diverse, with Sharchop in the east and Nepali-speaking communities in the south, and that Dzongkha is the western region's language elevated to national use. **The atlas does not present Dzongkha as "the language of Bhutan".**

### [TB-104] The Ladakhi–Balti border: one continuum, three states
- **Claim as written:** "Ladakhi is a Tibetan language in an Indian territory, next to Balti (a Tibetan language in Pakistan), with Chinese-administered Tibet to the east — so the same dialect continuum is divided between three states with three different language policies."
- **Appears in:** `atlas-tibetoburman.js` → nodes `ladakhi`, `balti`
- **Verdict:** verified as a geographic and political statement; the Tibetic classification of both is standard
- **Sources:** *Ladakhi language*, *Balti language*, Wikipedia · retrieved 2026-09-26
- **What the sources say:** both are classified as Western Tibetic, and the register codes them separately (`lbj`, `bft`). The Balti material establishes the Perso-Arabic literary context — most Balti speakers are Muslim — which is the basis for the node's "a language family is not a culture" feature.
- **Confidence:** high for the classification and the political division; **medium** for the degree of mutual intelligibility between them, which the atlas therefore does not assert.
- **Action:** the two nodes are written as a pair, each pointing at the same fact from its own side of the border. The atlas deliberately does **not** claim Ladakhi and Balti are mutually intelligible — the sources do not make that claim cleanly.

### [TB-105] ⚠ The ISO register: five name mismatches, four splits and one lump
- **Claim as written:** every ISO code quoted in `atlas-tibetoburman.js`.
- **Appears in:** `atlas-tibetoburman.js` → `const ISO`
- **Verdict:** verified against the register — and this phase's register findings are the richest of the series so far
- **Source:** SIL ISO 639-3 register, `iso-639-3.tab` (7,928 lines), retrieved 2026-09-26 · https://iso639-3.sil.org/sites/iso639-3/files/downloads/iso-639-3.tab
- **Five NAMES the register uses that the literature does not:**
  - `new` is **"Nepal Bhasa"**, not *Newar* — the register uses the official Nepali government name.
  - `iii` is **"Sichuan Yi"**, not *Nuosu*.
  - `kac` is **"Kachin"**, not *Jingpho*.
  - `lus` is **"Lushai"**, not *Mizo* — the older external label.
  - `kjz` is **"Bumthangkha"**; `ybh` is **"Yakha"**; `tcz` is **"Thado Chin"**.
- **Four nodes the register SPLITS across several codes:**
  - **Tamang** → `taj` (Eastern Tamang), `tdg` (Western Tamang), `tge` (Eastern Gorkha Tamang). There is no single "Tamang" code.
  - **Qiang** → `cng` (Northern Qiang), `qxs` (Southern Qiang).
  - **Pumi** → `pmi` (Northern Pumi), `pmj` (Southern Pumi).
  - **Karen** → `ksw` (S'gaw), `pwo` (Pwo *Western* Karen), `kyu` (Western Kayah) — so even `pwo` and `kyu` are narrower than the atlas's node names.
- **One node the register LUMPS:** **Japhug, Situ and Tshobdun share the single code `jya` ("Jiarong")**. The register does not distinguish them, even though the atlas — following the descriptive literature — treats them as three languages. **This is the exact inverse of the Tamang case, and both are stated on the nodes.**
- **One code that is not what it looks like:** `nbf` is **not** Naxi. Naxi is **`nxq`**. `nbf` does not exist in the register at all, so a code recalled from memory would have been silently wrong.
- **Confidence:** high — every code read out of the register file, not recalled
- **Action:** the `ISO` map quotes the register's own names, states the scope where a node's name is broader or narrower than its code, and the atlas's `sources` note points at this entry.


### [TB-106] Nuosu Yi: the 1974 syllabary, and the exact glyph count
- **Claim as written:** "The Modern Yi script (ꆈꌠꁱꂷ <i>nuosu bburma</i>) is a standardized syllabary derived from the classic script in 1974. There are 756 basic glyphs based on the Liangshan dialect, plus 63 for syllables only found in Chinese borrowings."
- **Appears in:** `atlas-tibetoburman.js` → nodes `burmic`, `nuosu`
- **Verdict:** verified, including both numbers
- **Source:** *Nuosu language*, Wikipedia · https://en.wikipedia.org/wiki/Nuosu_language · retrieved 2026-09-26
- **What the source says:** "The Modern Yi script (ꆈꌠꁱꂷ / ''nuosu bburma'' / [nɔ̄sū bʙ̝̄mā] 'Nosu script') is a standardized [[syllabary]] derived from the classic script in 1974." and "There are 756 basic glyphs based on the Liangshan dialect, plus 63 for syllables only found in Chinese borrowings." The article also locates it: "Nuosu is mainly spoken in the [[Liangshan Yi Autonomous Prefecture]], [[Sichuan]]." (The wiki source wraps the three renderings in its `lang`, `transliteration` and `IPA` templates; the braces are omitted here under rule 8.)
- **Confidence:** high — both figures and the 1974 date are stated directly
- **Action:** the node gives **756 + 63** as a specific, checkable design rather than a vague "hundreds of characters", because the point being made is that this system was *engineered* — standardised on one dialect with a defined inventory — in contrast to the classical Yi script's thousands of regional variants. This is one of the few Tibeto-Burman writing systems in daily use, and the atlas says so with numbers rather than adjectives.

### [TB-107] Naxi Dongba: a ritual mnemonic, not an everyday script
- **Claim as written:** "The <b>Dongba</b> script is a system of pictographic characters used by the <i>dongba</i> ritual specialists — but it is not a script for writing in the ordinary sense: it is a mnemonic system for reciting ritual texts, in which one glyph can cue a whole phrase."
- **Appears in:** `atlas-tibetoburman.js` → node `naxi`
- **Verdict:** verified, and the distinction is the entry's whole purpose
- **Source:** *Naxi language*, Wikipedia · https://en.wikipedia.org/wiki/Naxi_language · retrieved 2026-09-26
- **What the source says:** the article illustrates "Naxi manuscript, displaying both pictographic ''dongba'' and smaller syllabic ''geba''", and states that Naxi "can be written in the [[Geba syllabary]], [[Latin script]] or [[Fraser alphabet]], but they are rarely used in everyday life and few people are able to read Naxi." It also cites the standard reference works on the pictographic corpus, including a "dictionary of Naxi pictographic characters" (纳西象形文字谱).
- **Confidence:** high for the two-script distinction and for the "rarely used in everyday life" statement
- **Action:** the node separates the ritual script from ordinary literacy and quotes the source's own caution. **This is a deliberate correction of a widely repeated half-fact** — "the Naxi have a pictographic script" is true and is routinely used to imply that Naxi is a written language in daily use, which the source explicitly denies. The atlas also notes that Lijiang's tourism trades on Dongba imagery while the language recedes, because that is the situation a reader is most likely to encounter.

### [TB-108] Burmese: the Pyu inheritance, and a register rather than a tone
- **Claim as written:** "Burmese is 'a Tibeto-Burman language spoken in Myanmar, where it is the official language, lingua franca, and the native language of the Bamar, the country's largest ethnic group'… Its script descends from the Brāhmī-derived script of the Pyu."
- **Appears in:** `atlas-tibetoburman.js` → nodes `burmic`, `burmese`, `rakhine`
- **Verdict:** verified for the quotation and the classification; the Pyu script lineage is the standard account
- **Source:** *Burmese language*, Wikipedia · https://en.wikipedia.org/wiki/Burmese_language · retrieved 2026-09-26
- **What the source says:** the lead gives the quoted sentence and calls Burmese "a [[Tibeto-Burman languages|Tibeto-Burman language]] spoken in [[Myanmar]]… where it is the [[official language]], [[lingua franca]], and the native language of the [[Bamar people|Bamar]], the country's largest ethnic group". The article also records that "speakers continue to refer to the language as ''Burmese'', after ''Burma'' — a name with co-official status until 1989".
- **Confidence:** high for the quotation and the official status; the Pyu descent is stated as the standard account, and the node's timeline places the Pyu city-states at c. 2nd–9th c. CE with the Myazedi inscription at c. 1113.
- **Action:** the node uses the quoted definition, and the script's Indian ancestry is presented as the general structural fact about this family rather than as a Burmese peculiarity — the same point is made on the Tibetan, Newar and Limbu nodes.


### [TB-109] ⚠ DISPUTED — Karen's position in the family
- **Claim as written:** "Karenic is the branch that gave the comparative literature one of its long-running arguments… Matisoff's formulation… is that he 'proposes a modification of Benedict that demoted Karen but kept the divergent position of Sinitic'. So Karen's exact position is a matter of which reconstruction you follow."
- **Appears in:** `atlas-tibetoburman.js` → node `karenic`
- **Verdict:** **disputed** — reported as an unsettled question, not as a fact
- **Source:** *Tibeto-Burman languages*, Wikipedia · https://en.wikipedia.org/wiki/Tibeto-Burman_languages · retrieved 2026-09-26
- **What the source says:** the classification discussion gives Benedict's placement, Matisoff's modification ("demoted Karen but kept the divergent position of Sinitic"), and the underlying critical position that Tibeto-Burman as a whole is not demonstrated (see `[TB-101]`). The atlas therefore has a specific, attributable claim to hedge rather than a general one.
- **Confidence:** medium — the dispute is over *placement*, not over Karenic being a valid group, which is not in doubt
- **Action:** the `karenic` node states that Karen's exact position depends on which reconstruction you follow, names Benedict and Matisoff, and then places Karenic with the other branches anyway — because the atlas has to draw *some* tree, and the honest thing is to draw one and say what it is. The same device is used for Rouran at `[SR-106]`.

### [TB-110] Link health, and the phase's verification
- **Claim as written:** every `SOUND` entry in `atlas-tibetoburman.js` is a URL that was requested before being written down.
- **Appears in:** `atlas-tibetoburman.js` → `const SOUND`
- **Verdict:** verified — 37 candidate URLs requested 2026-09-26
- **What the link check found:** **200** for `tibetan`, `burmese`, `yi`, `naxi`, `limbu`, `mizo`, `karen`, `bodo`, `garo`, `lisu`, `lahu`, `hani`, `ladakhi`, `balti`, `sherpa`, `tamang`, `gurung`, `jingpho`, `akha`, `newar`, `ranjana`, `bai`. **404** for `dongba`, `jingpo`, `qiang`, `rgyalrong`, `dzongkha`, `newah`, `kachin`, `qiangic`, `dzonkha`, `bhutanese`, `tibetan_script`, `burmese_script`, `rGyalrong`.
  - **Three traps worth recording:** Omniglot's Jingpho page is **`jingpho.htm`** — `jingpo.htm` is 404. Its Newari page (`newari.htm`) is a **302 redirect to `ranjana.htm`**, the script page; **`newar.htm` is the direct 200**, so the atlas uses the direct one and links Ranjana separately. And **there is no Dzongkha, Qiang or Rgyalrong page under any name tried**, so those nodes carry an empty list.
  - **One bonus:** `akha.htm` exists, which gives the Hani/Akha node a page its Chinese-side name (Hani) would not have found on its own — a small illustration of why the atlas carries both names.
- **Verified:** `node tools/check-atlas.js` on all seven atlas files → all valid (sinitic 43 · tungusic 19 · kradai 36 · japonic 23 · mongolic 26 · silkroad 34 · tibetoburman 56). Headless Edge smoke test of `#tibetoburman`: title "Tibeto-Burman — East Asian Language Atlas", 12 palette rules generated, stats row `56 nodes, from a 350-language grouping · ≈330 million speakers, by source · 7 writing systems in the atlas`, nav button `aria-current="page"`, **0 error markers**. Deep link `#tibetoburman/nuosu` renders three script chips (`Modern Yi syllabary (1974)`, `756 + 63 glyphs`, `in daily use`), the ISO chip `iii (type L — register name "Sichuan Yi"; ii)`, and the `sp` chip reading `≈2 million, by source` with no stray " speakers" — confirming the `spSuffix` option added in Phase 5.

### [TB-111] The `nat` field — which languages get their own writing, and which deliberately do not

- **Claim as written:** the fourteen nodes carrying `nat:` show each language's **own** written form, not a Chinese exonym in a slot that implies an autonym.
- **Appears in:** `atlas-tibetoburman.js` → `nat:` on `lhasa`, `kham`, `amdo`, `dzongkha`, `ladakhi`, `balti`, `sherpa`, `newar`, `burmese`, `rakhine`, `nuosu`, `bodo`, `sgaw`, `pwo`
- **Verdict:** verified — each form read from that language's **English Wikipedia infobox `nativename` parameter**, retrieved 2026-09-26
- **Why this entry exists:** a Unicode script audit of all seven atlases found **237 of 237 nodes carrying Han characters in `zh:` and zero carrying the native script of the family they describe** — while four atlases declared fonts (Tibetan, Myanmar, Yi, Thai, Lao, Mongolian) that therefore rendered nothing. `zh:` was holding the *Chinese name* in a slot styled as the autonym. This entry records the forms judged genuinely attested, and — the more important half — the ones deliberately left alone.
- **The forms, as retrieved:**

| Node | Script | `nat` | Infobox source |
|---|---|---|---|
| `lhasa` | Tibetan | བོད་སྐད་། | Lhasa Tibetan |
| `kham` | Tibetan | ཁམས་སྐད | Khams Tibetan |
| `amdo` | Tibetan | ཨ་མདོའི་སྐད། | Amdo Tibetan |
| `dzongkha` | Tibetan | རྫོང་ཁ་ | Dzongkha |
| `ladakhi` | Tibetan | ལ་དྭགས་སྐད | Ladakhi language |
| `balti` | Tibetan | སྦལ་ཏི། | Balti language |
| `sherpa` | Tibetan | ཤར་པའི་སྐད་ཡིག | Sherpa language |
| `newar` | Devanagari | नेपाल भाषा | Newar language |
| `bodo` | Devanagari | बरʼ | Boro language (India) |
| `burmese` | Myanmar | မြန်မာဘာသာစကား | Burmese language |
| `rakhine` | Myanmar | ရက္ခိုင်ဘာသာ | Rakhine language |
| `sgaw` | Myanmar | ကညီကျိာ် | S'gaw Karen language |
| `pwo` | Myanmar | ဖျိၩ့ | Western Pwo language |
| `nuosu` | Yi | ꆈꌠꉙ | Nuosu language |

- **What deliberately got no `nat`, and why** — recorded so a later pass does not "finish the job" by inventing forms:
  - **Rgyalrong, Japhug, Situ, Tshobdun, Qiang, Pumi** — unwritten. Linguistic description is romanisation only; any "native form" would be fabricated.
  - **Lisu, Lahu, Hani, Jingpho, Garo, Mizo, Thadou, Tedim, Dimasa, Zaiwa, Achang** — written, but in **Latin** orthographies. The "native" form would be the same kind of string as the English name already shown, so the field would add noise, not information.
  - **Limbu, Kayah, Tamang** — have their own scripts (Limbu, Kayah Li, Tamyig) but **no font is declared for them**. Left for a later pass rather than shipped as tofu.
  - **Proto / family / stage nodes** (`原始藏缅语`, `藏语支`, `古藏语`, …) — keep the Chinese label. A reconstruction has no writing, and 藏语支 is a Chinese scholarly term, not a pretended autonym.
  - **Zhangzhung, Naxi** — Zhangzhung's script is not in `GFONT`; Naxi's Dongba pictographs are not a text encoding the field can hold. Left as labels.
- **Engine note:** `nat` is a new optional node field, `zhIsNative` a new optional atlas flag, and `nat` an optional key on `FAMILIES[]` entries. The tree's script slot renders `nat` when present, and `zh` **only** in a `zhIsNative` atlas (Sinitic, where the characters *are* the native writing). **Every other Chinese name rides behind a `中文` pill in the page header, off by default** — it gates the row slot, the header title and the family pills together, so every non-Sinitic family reads English-only until asked. The header title uses the same rule: `FAMILIES[].nat` where the family has its own writing (Sinitic 汉语, Japonic 日本語族 — verified as genuine Japanese usage, not a Chinese calque), otherwise `title.zh` behind the toggle. 通古斯 (a calque of Russian *Tungus*), 壮侗 and 丝路死语 now disappear by default. An earlier cut of this change had put the toggle in the tree picker and shown the Chinese inline in the script slot — both wrong, and both reverted. `atlas-tibetoburman.js` also gained `Noto Sans Devanagari` in `fonts` — Newar and Bodo are Devanagari-script, and the family had declared only Tibetan/Myanmar/Yi, so both would have rendered as tofu.
- **Verified:** `node tools/check-atlas.js atlas-tibetoburman.js` → valid, 56 nodes · 164 markers. Smoke test `#tibetoburman/lhasa`: **0 error markers**, font link now requests `Noto+Serif+Tibetan · Noto+Sans+Myanmar · Noto+Sans+Yi · Noto+Sans+Devanagari`, `.t-zh.nat` applied to exactly the fourteen, and the panel renders `བོད་སྐད་།` above `拉萨藏语`. Regression `#sinitic/yue` unchanged — Sinitic carries no `nat`, so its slot falls back to `zh` and its rows are byte-identical.

- **Rendered rows after the change** (toggle off — the default):
  - `lhasa` → `[བོད་སྐད་།] Lhasa Tibetan (Ü-Tsang) …… [拉萨藏语] [speakers]` — Chinese in the DOM, hidden by CSS
  - `qiang` → `[  ] Qiang …… [羌语] [speakers]` — empty script slot, English-only
  - Sinitic `yue` → `[粤] Yue (Cantonese) …… [speakers]` — no right slot at all; 粤 *is* the native script
  - Counts per atlas: Sinitic 43/43 script slots filled, toggle hidden · Tibeto-Burman 14 filled / 42 empty, 56 behind the toggle.
  - **Superseded by [TB-112]:** the figure "the other five atlases 0 filled" was true when this entry was written and is no longer — the rollout followed immediately.

### [TB-112] `nat` rolled out to the other five atlases — 45 more forms, four new fonts, one dead font reference

- **What was done.** The `nat` field introduced in [TB-111] was extended from Tibeto-Burman to the five remaining shipped atlases. **45 node-level forms** were added, every one read off a Wikipedia infobox or raw wikitext rather than recalled:

  | atlas | nodes | `nat` | filled |
  |---|---|---|---|
  | Japonic | 23 | 18 | Japanese (17) + Ainu (1) |
  | Tungusic | 19 | 10 | Manchu script (2) + Cyrillic (8) |
  | Kra–Dai | 36 | 7 | Thai, Lao, Myanmar, New Tai Lue, Tai Le, Tai Viet, Ahom |
  | Mongolic | 26 | 5 | Mongolian script (3) + Clear script (1) + Cyrillic (1) |
  | Silk Road | 34 | 5 | Tangut, Sogdian, Chorasmian, Kharoshthi, Cyrillic |

- **Japonic — the Chinese and Japanese names differ by orthography, not just wording.** 关西/関西, 关东/関東, 东北/東北, 北陆/北陸, 出云/出雲, 国头/国頭, 冲绳/沖縄, 宫古/宮古. Verified against ja.wikipedia (`琉球諸語`, `日本語の方言`, `アイヌ語`). The Ryukyuan set follows ja.wikipedia's own tree: `琉球諸語` → `北琉球諸語`/`南琉球諸語` → `奄美語`, `国頭語`, `沖縄語`, `宮古語`, `八重山語`, `与那国語` — note **国頭語** with 頭, the UNESCO designation, against the atlas's simplified 国头语.
- **⚠ The Ainu form is アィヌ イタㇰ, not アイヌ・イタㇰ.** The widely-repeated katakana autonym has a full-size イ; ja.wikipedia's infobox gives **アィヌ イタㇰ** (with small ィ, matching /aynu/), and also lists `Aynu itak` and `Айну итак`. The infobox form is used. Only `hokkaido` gets a `nat` — Sakhalin and Kuril Ainu are extinct with no modern orthography, and the atlas's own prose says Ainu "has never had a native script", so the borrowed-katakana form is applied to the one variety still written in it (`Ainu Times`) and no further.
- **Tungusic: the family splits two ways by script.** Manchu and Xibe write in the Mongolian-derived script (`ᠮᠠᠨᠵᡠ ᡤᡳᠰᡠᠨ`, `ᠰᡞᠪᡝ ᡤᡞᠰᡠᠨ` — both from en.wikipedia infoboxes; the `Noto Sans Mongolian` font was already declared and was rendering nothing). The eight Siberian varieties write in **Cyrillic**: `На̄най хэсэни` (Nanai), `Нāнʼи хэсэни` (Ulch), `Уилта кэсэни` (Uilta), `Удиэ кэйэни` (Udege), `Орочи кэсэни` (Oroch), `Эвэды̄ турэ̄н` (Evenki), `эвэды торэн` (Even), `Неғида хэсэнин` (Negidal). Cyrillic is a borrowed script, but so is Devanagari for Newar and Bodo, which [TB-111] already accepted — the test is *the script actually in use*, not indigenous origin. Note Nanai and Ulch both give "our language" from the same root but differ (`На̄най хэсэни` / `Нāнʼи хэсэни`), and Ulch uses the letter **ʼ** (modifier apostrophe), not an ASCII apostrophe.
- **Mongolic: three scripts in five nodes.** `ᠮᠣᠩᠭᠣᠯ ᠬᠡᠯᠡ` (Khalkha, mn.wikipedia infobox), `ᠥᠪᠥᠷ ᠮᠣᠩᠭᠣᠯ` (Peripheral — the first two words of the Inner Mongolia infobox's full Mongolian name), `ᠪᠤᠷᠢᠶᠠᠳ ᠮᠣᠩᠭᠣᠯ ᠬᠡᠯᠡᠨ` (Buryat), `ᡆᡕᡅᠷᠠᡑ ᡘᡄᠯᡄᠨ` (Oirat, Clear script), `хальмг келн` (Kalmyk). The Clear-script form uses **Todo bichig** letters, which live in the Mongolian block and so render from the already-declared `Noto Sans Mongolian`.
- **⚠ Kra–Dai needed four fonts that did not exist under the names assumed.** New Tai Lue (`ᦅᧄᦺᦑᦟᦹᧉ`), Tai Le (`ᥖᥭᥰ ᥘᥫᥴ`), Tai Viet (`ꪼꪕꪒꪾ`) and Ahom (`𑜁𑜪𑜨 𑜄𑜩 𑜒𑜑𑜪𑜨`) were all added to `GFONT` and to the atlas's `fonts`. **Ahom is `Noto Serif Ahom`, not `Noto Sans Ahom`** — the Sans family returns HTTP 400 from the Google Fonts API. Shan needs no new font: `ၵႂၢမ်းတႆး` was checked against `Noto Sans Myanmar`'s cmap and every codepoint (U+1075, U+1082, U+1062, U+1086 …) is present.
- **Silk Road is mostly not fixable, and that is the finding.** Of 34 nodes, 5 got a form: `𗼇𗟲` (Tangut), `𐼼𐼴𐼶𐼹𐼷𐼸` (Sogdian), `𐾸𐾲𐾰𐾻 𐾰𐾺 𐾹𐾶𐾰𐿂𐾺𐾸𐾽` (Chorasmian), `𐨒𐨌𐨣𐨿𐨢𐨌𐨪𐨁𐨌` (Gāndhārī, Kharosthi), `Яғнобӣ зивок` (Yaghnobi — the one living language here). The rest cannot take one:
  - **`nativename` is empty** on en.wikipedia for Saka/Khotanese and the Tocharian family — so `khotanese`, `tumshuqese`, `tochA`, `tochB` keep their Chinese labels rather than a constructed form.
  - **No Google Font exists** for Old Uyghur (`olduyghur` — confirmed absent from the Google Fonts metadata index) or for the Khitan and Jurchen scripts, so those stay as labels. Same class of omission as Limbu/Kayah/Tamang in [TB-111].
  - **Undeciphered or unattested**: `rouran` and `xiongnu` have no known text at all.
  - **Script-name and document nodes** (`scripts` subtree, `niyadocs`, `secret`) are not languages, so they take no autonym — consistent with [TB-111]'s treatment of proto and family labels.
- **⚠ Latent bug found and fixed in `GFONT`.** The registry contained `'Noto Sans Tangut': 'Noto+Sans+Tangut'`, and **that family does not exist** — the Google Fonts API returns HTTP 400, so `applyFonts()`'s `.filter(Boolean)` would have silently dropped it and any atlas declaring it would have rendered Tangut as tofu. Corrected to `'Noto Serif Tangut'`. All 25 `GFONT` entries were then validated against the API: **the Tangut entry was the only dead reference.** Four more fonts were added — `Noto Sans New Tai Lue`, `Noto Sans Tai Le`, `Noto Sans Tai Viet`, `Noto Serif Ahom` — plus `Noto Sans Kharoshthi`, `Noto Sans Brahmi`, `Noto Sans Chorasmian` and `Noto Sans Phags Pa` for the historical scripts. `Noto Sans Brahmi` and `Noto Sans Phags Pa` are registered but not yet declared by any atlas (Brahmi is a candidate for Gāndhārī's second script; Phags-pa for the Mongolic `phagspa` node).
- **Verified:**
  - `node --check` on the inlined engine → OK. `node tools/check-atlas.js atlas-*.js` → **all 7 valid**.
  - Smoke tests, headless Edge, `--dump-dom`, one atlas each: `#tungusic`, `#kradai`, `#japonic`, `#mongolic`, `#silkroad` → **45/45 native strings present in the rendered DOM**.
  - Header titles behave as designed: only **Japonic** shows its Chinese title (`日本語族`, native); Tungusic `通古斯`, Kra–Dai `壮侗`, Mongolic `蒙古语族` and Silk Road `丝绸之路死语` all carry `cn-only` and are hidden until the toggle is on.
  - Every atlas's generated `scriptfonts` link was read back from the DOM and contains the fonts it needs — e.g. Silk Road now requests `Noto+Serif+Tangut&family=Noto+Sans+Sogdian&family=Noto+Sans+Chorasmian&family=Noto+Sans+Kharoshthi`.
- **Method note.** Forms were read from `action=raw` wikitext (the infobox `nativename` field) rather than the rendered page, because rendered Wikipedia pages put ~15 kB of navigation chrome before the content and truncated reads showed only the sidebar. Font coverage was tested by downloading each TTF and parsing its `cmap` directly (no `fonttools` in this environment), so "the font covers this string" is a measurement, not an assumption.






## Koreanic (Phase 7) — research log

### [KO-101] The family: two living members, not one — and the Jeju question stated, not resolved

- **Claim shipped:** Koreanic consists of Korean and Jeju; Yukjin is argued by Vovin to be a third; no living relative has been demonstrated.
- **Verified:** en.wikipedia `Koreanic languages` infobox — `child1 = Korean`, `child2 = Jeju`, `child3 = Yukjin` (citing Vovin 2013c p. 201), plus extinct `Baekje ?` and `Goguryeo ?` marked as uncertain; Glottolog `kore1284`. The article's lead states Jeju "is often described as a dialect of Korean but is mutually unintelligible with mainland Korean", and that Vovin suggested Yukjin "should be similarly distinguished".
- **Verified:** ko.wikipedia `한국어족` — name given as **한국어족** (also 조선어족), sub-branches 한국어 · 제주어 · 부여어족, Glottolog `kore1284`. This is the source of the atlas's `FAMILIES[].nat` and the root node's `nat`.
- **⚠ The atlas deliberately does not resolve the Jeju language-or-dialect question.** South Korean official usage calls it 제주 방언; the linguistic literature and UNESCO call it a language. The node's prose states both and says why. Recording this so a later pass does not "fix" it by picking one.
- **Not shipped:** the Buyeo languages (Goguryeo, Baekje) appear in the prose as a proposal and are **not** given nodes — the attestation is too thin and Goguryeo has been argued into both Koreanic and Japonic. Same restraint as `[TB-109]` on Karen.

### [KO-102] Proto-Koreanic: reconstructable *because* Jeju exists, and a homeland that is argued rather than known

- **Claim shipped:** the proto-language is recoverable chiefly from Korean–Jeju correspondences; the homeland is placed either in northern Korea or in the Yalu–Tumen corridor; no proto-text exists.
- **Reasoning recorded:** a one-language family cannot be reconstructed; a two-language family split long enough to have drifted systematically can. This is why Jeju's status is load-bearing for the whole atlas and not a curiosity.
- **Hedged in the prose:** the Korean–Jeju split date is given as "the first millennium CE" with the explicit note that no archaeological find pins it down. The two homeland proposals are presented as a choice with consequences (movement into the peninsula versus formation there), not as a fact.

### [KO-103] Old Korean: idu, hyangchal and gugyeol are three *devices*, not a script

- **Claim shipped:** idu (이두, 吏讀), hyangchal (향찰, 鄕札) and gugyeol (구결, 口訣) were used to write Korean with Chinese characters; they are not an indigenous script.
- **Verified:** en.wikipedia `Idu script` — "이두 / 吏讀", literally "official's reading"; developed during the Three Kingdoms period (57 BC – 668 AD); "used Hanja to represent both native Korean words and grammatical morphemes as well as Chinese loanwords"; "developed by Buddhist monks"; used for official documents and the imperial examinations.
- **Verified:** en.wikipedia `Old Korean` infobox — `script = Idu, Hyangchal, Gugyeol`; `altname = Silla(n)`; `era = evolved into Middle Korean in the tenth or thirteenth century`; ISO `oko`; Glottolog `sill1240`. The South Korean name is 고대 한국어, the North Korean 고대 조선어.
- **⚠ The date of the Old Korean/Middle Korean boundary is given as "the tenth or thirteenth century"** because the source itself says so. The atlas's timeline reads "10th–13th c." and the prose says the century depends on the source. Do not collapse this to one number.
- **Framing decision:** the prose calls gugyeol "a glossing system rather than a writing system", which is a judgement about what counts as writing — flagged here so it is visible as a judgement rather than a sourced fact.

### [KO-104] Middle Korean: 1443 creation, October 1446 promulgation, and the 1447 texts

- **Claim shipped:** Sejong created twenty-eight letters in December 1443; the *Hunmin Chŏngŭm* was promulgated in October 1446; the earliest dated texts are of 1447.
- **Verified:** en.wikipedia `Hunminjeongeum` infobox — `pub_date = circa October 1446` (the infobox uses the "circa" template); author "Sejong the Great (base *Hunminjeongeum*)"; hangul 훈민정음 / hanja 訓民正音; the base and *Haerye* editions are in Classical Chinese, the *Eonhae* edition in Korean.
- **Verified:** en.wikipedia `Middle Korean` infobox — `era = 11th–16th centuries`; `script = Hanja (Idu, Hyangchal, Gugyeol), Hangul`; ISO `okm`; Glottolog `midd1372`; names 중세 한국어 / 중세 조선어. The article's illustration is the *Wŏrin Ch'ŏngang Chigok* (1447).
- **⚠ Date discipline:** the creation date (December 1443) and the promulgation date (October 1446) are different events and the atlas gives both, as the `[MG-103]` script spine does for Mongolic. The root node's timeline shows "1443 / 1446"; the Middle Korean node separates them.
- **Shipped as linguistic claims, from the article's description of the stage:** Middle Korean was tonal (pitch marked with dots in the sources), had vowel harmony that modern Korean has largely lost, and had the vowel *arae-a* (ㆍ) that disappeared from Seoul speech in the sixteenth century. The atlas attributes these to the period rather than to a named study, which is the same level of sourcing the other atlases' prose uses for well-established descriptions.


### [KO-105] The dialect division: 방언연구회 (2001), five mainland areas plus Jeju — and where Chungcheong and Gangwon actually sit

- **Claim shipped:** the peninsula divides into five mainland dialect areas plus Jeju, following 방언연구회 (2001).
- **Verified:** ko.wikipedia `한국어의 방언` — the article states that dialect surveys usually distinguish the following five, and that "각 방언의 명칭은 방언연구회(2001)에 의거한다" (the names follow 방언연구회 2001):
  1. **서북 방언** (= 평안도 방언) — the old P'yŏngan provinces
  2. **동북 방언** (= 함경도 방언) — the old Hamgyŏng provinces
  3. **중부 방언** — Gyeonggi including Seoul and Incheon, Hwanghae, Gangwon and Chungcheong; the article adds that 서울 방언 "became the regional basis of the Republic of Korea's standard language"
  4. **서남 방언** (= 전라도 방언, 호남 방언)
  5. **동남 방언** (= 경상도 방언, 영남 방언)
  6. **제주어** (= 제주 방언)
- **⚠ The atlas's Chungcheong and Gangwon nodes are a deliberate deviation, and it is recorded here.** The standard five-way division puts both **inside** 중부 방언. The atlas keeps them as nodes because the Korean literature does distinguish a 충청 방언 and a 강원/영동 방언, and because `languages.md` §2.6's brief asks for them — but **both nodes' prose says plainly that the standard division groups them in the central area**, and the sketch caption repeats it. This is the honest treatment: the nodes exist, and their contested status is stated rather than hidden.
- **Verified for Gangwon specifically:** the same article notes that "성조 차이의 이유로 강원도 영동 지방의 방언을 중부 방언으로부터 구분하는 경우가 있다" — the eastern-coast variety is sometimes separated from the central area **on tonal grounds**. That tonal reason is what the node's prose reports.
- **Verified for Chungcheong specifically:** the article records that the southern part of South Chungcheong, including Daejeon and Sejong, is sometimes classified as a **southern** dialect because it resembles the south-west more than other Chungcheong speech does. The node's "transition zone" framing follows this.
- **Not shipped:** 황해 방언 (Hwanghae) and 경기 방언 (Gyeonggi) are named in the same article but are not given nodes — Hwanghae is absorbed into the central block in the atlas's prose, and Gyeonggi is what the central node already is. Recorded so a later pass knows the omission was considered.

### [KO-106] Yukjin: the six garrisons, the 2013 proposal, and a name in three scripts

- **Claim shipped:** Yukjin is the variety of the six garrison towns on the Tumen; Vovin argued in 2013 that it is a third Koreanic language.
- **Verified:** en.wikipedia `Yukjin Korean` infobox — nativename given as **六鎮말 / 육진말** (Yukjin-mal) and **여섯 고을 말** (Yeoseot goeul mal); states North Korea and China; `script = Hangul`; `isoexception = dialect`; ancestors Old Korean → Middle Korean; ethnicity includes "formerly Jaegaseung". The atlas uses **육진말** as the node's `nat`, which is the form the infobox leads with.
- **Verified:** ko.wikipedia `한국어의 방언` — "함경북도 최북부인 회령시, 온성군, 종성군, 경원군 등지의 방언은 '육진 방언'(六鎭方言)이라 하며 동북 방언과 구별하기도 한다". This gives both the garrison towns and the "distinguished from the north-eastern dialect" point.
- **⚠ Attribution discipline:** the "third language" claim is attributed to **Vovin 2013** in the prose and in the node's features, not stated as consensus. The infobox carries it with a citation (an `sfnp` template citing Vovin 2013c, p. 201), which is what makes it quotable as one scholar's proposal rather than a settled finding.
- **⚠ Prose/marker inconsistency, recorded and resolved:** the prose names the conventional six garrisons (회령, 온성, 종성, 경원, 경흥, 부령) while the marker set marks Hoeryŏng, Onsŏng, Kyŏnghŭng, Puryŏng and Yanji — five. Chongŏng and Kyŏngwŏn were left unmarked because their modern administrative identities have changed. Resolved in favour of the prose naming the full set; flagged so the mismatch is not mistaken for an error later.

### [KO-107] Jeju: UNESCO 2010, the 5,000 figure, and the 1948–49 uprising

- **Claim shipped:** UNESCO graded Jeju critically endangered in 2010 — the highest level it uses; the standard reference count is ≈5,000 (2014); ISO 639-3 `jje`.
- **Verified:** en.wikipedia `Jeju language` infobox — nativename **제줏말 / 제주말** (Jejunmal / Jejumal); `speakers = 5,000`; `date = 2014`; `ref = e18` (Ethnologue 18th ed.); `iso3 = jje`; Glottolog `jeju1234`; `script = Hangul`; ancestors Proto-Koreanic → Old Korean → Middle Korean.
- **Verified:** the article states Jeju "was classified by UNESCO in 2010 as critically endangered, the highest level of language endangerment possible", and that it is declining in usage. Confirmed by web search returning the same sentence from the article lead.
- **⚠ The 2014 speaker figure is Ethnologue's, not a census** — recorded because "≈5,000 (2014)" reads like a survey and is not one.
- **⚠ The atlas's `nat` is 제주말, the second of the two forms in the infobox.** 제줏말 is the more strictly Jeju-internal spelling; 제주말 is the more widely seen one. Both are in the source; the atlas uses the latter and this note records the alternative.
- **Shipped with care:** the 1948–49 Jeju uprising is in the node's timeline. The prose says "a large part of the island's population dies or flees" rather than giving a casualty figure, because published estimates for the event vary widely and the atlas has not verified them. The event is load-bearing for the speech community's history; the number is not, so the number is omitted.


### [KO-108] The diaspora: 1937, Yanbian 1952 and the 1977 norm, and the weakest figures in the atlas

- **Verified:** en.wikipedia `Koreans in China` infobox — total **2,109,727** (2021, Overseas Koreans Agency). ko.wikipedia `중국조선어` gives 화자 **약 100만여 명** (≈1 million speakers) and locates it in the three north-eastern provinces; it records that the variety's basis is 서북·동북·동남 방언 depending on locality, that its standard follows North Korea's 문화어, and that the norm is the **조선말규범집** of **1977**, revised **1984**.
- **Verified:** en.wikipedia `Koreans in Japan` infobox — population **1,000,000** (total including those with Japanese citizenship), sourced to Minority Rights Group.
- **Verified:** ko.wikipedia `재일한국어` — the variety is also called 재일조선어; "실제로 한국어를 사용하는 재일조선인은 10% 정도"; most Zainichi Koreans use Japanese in daily conversation, with standard Korean confined to first-generation and Chongryon-school settings. Its phonology: **five vowels** against the standard's eight (ㅜ/ㅡ merged, ㅗ/ㅓ merged) and obstruents distinguished by **voicing** rather than by aspiration and tenseness.
- **Verified:** en.wikipedia `Koryo-mar` infobox — nativename **고려말**; `speakers = 217,000`; `date = 1989`; **`ref = citation needed (dated August 2013)`**; `speakers2 = current number of speakers is unknown`; `isoexception = dialect`; family Koreanic > Korean > Northern > **Hamgyŏng**.
- **⚠ Three figures in this atlas are weaker than the rest, and are flagged in the prose rather than smoothed over:**
  - **Koryo-mar 217,000** — the source itself carries a citation-needed tag and says the current number is unknown. The node's `sp` field reads "217,000 (1989, by source) — current figure unknown" and the prose says no reliable count exists.
  - **Zainichi ≈10%** — an estimate in the ko.wikipedia article, given without a source. The prose says "the literature puts the share at around ten per cent" rather than asserting it.
  - **The 1937 deportation figure of ≈170,000** — widely repeated; shipped as "around 170,000" with the hedge in the wording. It is the one figure in the Koryo-mar node not read off an infobox, and it is recorded as such.
- **`nat` decisions:** 고려말 (Koryo-mar) and 재일한국어 (Zainichi) are both from infoboxes and are shipped. Yanbian's node uses **중국조선어**, the ko.wikipedia article title, with the note that 중국조선말 also appears in the same article's body. The `diaspora` grouping node has no `nat` — it is a grouping, not a language.

### [KO-109] ISO codes, link health, and the phase's verification

- **ISO 639-3 codes shipped:** `kor` (Korean), `jje` (Jeju), `oko` (Old Korean), `okm` (Middle Korean). The family itself has **no ISO code** — the atlas's root entry reads `kor · jje`, and the validator requires a non-empty entry for `rootId`, which is why it is written that way rather than left blank.
- **No code exists** for Yukjin, Koryo-mar or Zainichi Korean; the Korean dialects are all `kor`. The atlas writes `kor (a dialect)` for the diaspora varieties so the register's silence is visible in the row rather than looking like an omission.
- **Link health — Omniglot coverage for Koreanic (protocol from `[TU-109]`), checked 2026-09-26:**
  - `korean.htm` → **200** ✓ · `jeju.htm` → **200** ✓ · `langfam.htm` (family index) → **200** ✓
  - **404, and therefore not used:** `hangul.htm`, `hangeul.htm`, `korean_hangul.htm`, `koreanalphabet.htm`, `korean_alphabet.htm`, `idu.htm`, `hyangchal.htm`, `gugyeol.htm`, `idu_script.htm`, `hyangchal_script.htm`, `gugyeol_script.htm`, `koryo-mar.htm`, `jeju_language.htm`, `korean_language.htm`
  - **Consequence recorded:** Omniglot has no separate Hangul script page, so there is no script page to link for the pre-Hangul systems either. The `SOUND` table points `oldkorean`, `middlekorean` and `modernkorean` at `korean.htm`, and `yukjin`, `koryomar` and `zainichi` have **empty** link lists — the engine's YouTube-search fallback covers them. This is a thinner link set than any previous atlas, and the reason is recorded rather than hidden.
- **Verified:**
  - `node --check atlas-korean.js` → OK.
  - `node tools/check-atlas.js atlas-korean.js` → **valid, 18 nodes · 78 markers · iso 18 · features 18**.
  - Headless Edge smoke test of `#korean/jeju` → **0 error markers**; header title renders as `한국어족` with **no `cn-only` class** (the family has a genuine native name, so the toggle does not hide it — the same behaviour as Japonic); `scriptfonts` link requests `Noto+Serif+KR` and `Noto+Sans+SC`; the strings `제주말` and `jje` are both present in the rendered DOM.
- **Font note:** `Noto Serif KR` was already in `GFONT` from the Phase 0 work and had never been used by an atlas until this one. Hangul needs no new font registration.


## Hmong–Mien (Phase 7) — research log

### [HM-101] The family: two branches, and a set of administrative labels that do not match the languages

- **Claim shipped:** Hmong–Mien has two branches, Hmongic (Miao) and Mienic (Yao); the family is highly tonal, spoken in southern China and northern South-East Asia.
- **Verified:** en.wikipedia `Hmong–Mien languages` infobox — `child1 = Hmongic (Miao)`, `child2 = Mienic (Yao)`; `protoname = Proto-Hmong–Mien`; `iso5 = hmx`; Glottolog `hmon1336`; altname "Miao–Yao", rarely "Yangtzean" (citing van Driem 2018). The lead states the family is "a highly tonal language family of southern China and northern Southeast Asia", spoken in Guizhou, Hunan, Yunnan, Sichuan, Guangxi, Guangdong and Hubei.
- **⚠ The label problem is stated on the root node rather than buried.** "Miao" and "Yao" are Chinese administrative categories covering far more people than speak Hmongic or Mienic languages, and the mismatch runs **both ways**: many Yao speak Hmongic languages (Bunu, Bahengic — HM-105), and most ethnic She speak Sinitic (HM-104). The atlas uses the linguistic names for the branches and records the administrative labels where the sources use them.
- **No `nat` for the family.** Hmong–Mien is a Western grouping with a Chinese name (苗瑶语族) and no autonym. `FAMILIES[].nat` is therefore **not set** for `hmongmien`, and the header title carries `cn-only` — the opposite of Japonic and Koreanic, and the same as Tungusic/Mongolic/Silk Road. Confirmed in the rendered DOM.

### [HM-102] The two scripts: Pollard (abugida, ca. 1936) and Pahawh Hmong (semisyllabary, 1959) — rivals, not ancestors

- **Claim shipped:** the Pollard script is an abugida devised around 1936 by Sam Pollard for A-Hmao; Pahawh Hmong is a semisyllabary created in 1959 by Shong Lue Yang.
- **Verified:** en.wikipedia `Pollard script` infobox — `type = Abugida`; `time = ca. 1936 to the present`; `creator = Sam Pollard`; `languages = A-Hmao, Lipo, Sichuan Miao, Nasu`; Unicode U+16F00–U+16F9F; ISO 15924 `Plrd`; `fam1 = Canadian Aboriginal syllabics`. The script's own name is given as **𖽃𖽔𖾐 𖽑𖼄𖽻𖾐** (A-Hmao, Miao) — this is the string shipped as the `ahmao` node's `nat`.
- **Verified:** en.wikipedia `Pahawh Hmong` infobox — `type = Semisyllabary` (described as "onset–rime; vowel-centered equivalent of an abugida"); `time = 1959–present`; `languages = Hmong Daw, Hmong Njua`; `creator = Shong Lue Yang`; ISO 15924 `Hmng`; Unicode U+16B00–U+16B8F. The script's own name is **𖬖𖬲𖬝𖬵 𖬄𖬲𖬟 𖬌𖬣𖬵** ("Phaj Hauj Hmoob").
- **Verified:** en.wikipedia `Hmong language` infobox — `nativename` includes both script forms — Hmng (`𖬇𖬰𖬞 𖬌𖬣𖬵`) and Hmnp (`𞄉𞄧𞄵𞄀𞄩𞄰`) — alongside the Latin forms. The **Pahawh** string `𖬇𖬰𖬞 𖬌𖬣𖬵` is what the `hmongdaw` node ships as its `nat`; the **Nyiakeng Puachue Hmong** string `𞄉𞄧𞄵𞄀𞄩𞄰` was **not shipped** because Google Fonts has no web font for that script under any name tested (see HM-108).
- **⚠ Framing decision recorded:** the atlas calls the two scripts "rivals, not ancestors" because they are unrelated designs for the same languages, and Pahawh's origin is a claim about revelation rather than about graphic descent. The prose says "it has an origin story rather than a philology" and names Shong Lue Yang as its creator without endorsing the messianic account — the same treatment `[TB-107]` gives the Dongba tradition.

### [HM-103] The speaker figures: 4.5 million Hmong, 363,565 Hmong Americans, 710,000 She against 910 She speakers

- **Claim shipped:** Hmong has 4.5 million speakers (2015); Hmong Americans number 363,565 (2023); the She people number 710,000 (2000) against 910 She-language speakers (1999).
- **Verified:** en.wikipedia `Hmong language` infobox — `speakers = 4.5 million`, `date = 2015`, `ref = sfn citing Jarkey 2015, p. 11`; `iso2 = hmn`, `iso3 = hmn` for the Hmong/Mong macrolanguage. Family chain given as Hmongic > Core Hmongic > West Hmongic > **Chuanqiandian cluster** — the source of the atlas's `chuanqiandian` node name.
- **Verified:** en.wikipedia `Hmong Americans` infobox — population **363,565** (2023), sourced to the U.S. Census Bureau ACS; the title is given in Pahawh Hmong as **𖬌𖬣𖬵 𖬉𖬲𖬦 𖬗𖬲** / Hmoob Mes Kas; the popplace list leads with California (Fresno, Sacramento, Stockton, Merced) and Oklahoma (Tulsa).
- **Verified:** en.wikipedia `She language` infobox — `nativename = Ho Le`; `speakers = 910`, `date = 1999`, `ref = e18`; `ethnicity = 710,000 She (2000 census)`; region given as Zengcheng, Boluo County, Huidong County and Haifeng County in Guangdong; family Hmongic > Sheic > Pana–She. The page carries a hatnote distinguishing it from **She Chinese**, the Sinitic language of Zhejiang and Fujian — which is exactly the distinction the node's prose makes.
- **⚠ The 363,565 figure counts people, not speakers, and the atlas says so.** The node's prose reads "The atlas records the census figure for the population without claiming it is a figure for speakers." This is the `[KO-108]` discipline applied again.


### [HM-104] She: the label-versus-language mismatch in its starkest form

- **Claim shipped:** She has 910 speakers against 710,000 ethnic She; it survives in four Guangdong districts because those communities stayed out of the main Hakka migration currents.
- **Verified:** from the `She language` infobox as at HM-103 (910 speakers, 1999; 710,000 ethnic She, 2000 census; the four Guangdong localities named).
- **⚠ Two things are the atlas's own inference and are written as such, not as sourced facts:**
  - The **reason** the language survives only in those four districts — that they stayed out of the main Hakka migration currents — is the atlas's explanation of the geography. It is plausible and conventional, but it was not read off a source in this session, and the prose attributes it to geography rather than to a citation.
  - The statement that most ethnic She now speak Sinitic (Hakka, or She Chinese) is supported by the existence of the She Chinese article and the hatnote, but the proportions are not sourced here. The prose says "almost everyone else who is She by ethnicity speaks a Sinitic variety" without a percentage.
- **Recorded so a later pass knows which sentences to source or soften.** This is the same honesty rule the scope note in §Counters states: less load-bearing colour is written from the standard works and flagged where it was not independently re-fetched.

### [HM-105] Bunu and Bahengic: speakers classified as Yao, speaking Hmongic languages

- **Claim shipped:** Bunu has 359,474 speakers (2001) and no ISO code of its own; Bahengic's best-documented member is Pa-Hng, with 33,610 speakers and ISO `pha`, and is UNESCO **Vulnerable**.
- **Verified:** en.wikipedia `Bunu language` infobox — `nativename = Buod Nuox`; `altname = Pu Nu`; `speakers = 359,474`, `date = 2001`, `ref = Meng2001`; region Guangxi and bordering regions; `ethnicity = Yao`; family Hmongic > West Hmongic > **Bu–Nao**; `dia1 = Dongnu`, `dia2 = Nunu`, `dia3 = Bunuo`; `script = Latin`; Glottolog `buna1273`. **No `iso3` field is present in the infobox** — which is what the atlas's "no ISO code of its own" claim rests on, and why the `ISO` table entry for `bunu` reads `— (its varieties are registered separately)` rather than a code.
- **Verified:** en.wikipedia `Pa-Hng language` infobox — `altname = Pateng`; `speakers = 33,610`, `date = 1995–2009`, `ref = e18`; states China **and Vietnam**; family Hmongic > **Bahengic**; `iso3 = pha`; Glottolog `pahn1237`; `map2 = Lang Status 80-VU.svg` with the caption "classified as Vulnerable by the UNESCO Atlas of the World's Languages in Danger".
- **⚠ The node is named for the branch, not the language.** The reference account lists **Bahengic** as a Hmongic division; Pa-Hng is one language inside it and the only one with a code and a count. The node is `bahengic` with the `sp` field reading "Pa-Hng: 33,610 (1995–2009), by source", and the prose explains the choice. Shipping the branch and the language as the same node would have been a conflation.
- **⚠ "The only Vulnerable language in this atlas"** is the atlas's own comparison across its own nodes, not a claim from a source. It is true of the 22 nodes shipped here; it is written that way.

### [HM-106] ⚠ Kim Mun's speaker figures contradict each other *within the same source*

- **Claim shipped:** the node's population chip reads "ca. 400,000 (1995–1999), by source — see the note"; the prose reports both figures and says they disagree.
- **Verified:** en.wikipedia `Kim Mun language` infobox — `speakers = ca. 400,000<!--to the nearest 100,000-->`, `date = 1995–1999`, `ref = e25`; `iso3 = mji`; Glottolog `kimm1245`; `nation = China (Jinxiu Yao Autonomous County)`; Chinese 金門方言; also called **Lanten** or **Landian** 蓝靛.
- **⚠ And the same article's prose says something different:** "a Mienic language spoken by **200,000** of the Yao people in the Chinese provinces of Guangxi, Hunan and Yunnan, with about **61,000** of the speakers in Hainan Province." 200,000 + 61,000 ≈ 261,000, against the infobox's ca. 400,000 — a discrepancy of roughly 140,000 inside one page.
- **Decision recorded:** the atlas ships **both** and does not choose. The chip carries the infobox figure because that is the field a reader would compare against other references; the prose carries the arithmetic and the fact of the disagreement. This is the `[MG-111]` / `[KD-108]` treatment, applied to a conflict *within* a single source rather than between two.
- **Not shipped:** the "Lanten/Landian" autonym as the node's `nat`. The infobox gives **no `nativename` field** for Kim Mun, so the script slot is left empty and the prose names Lanten as an alternative. The atlas does not invent an autonym to fill a slot.


### [HM-107] ⚠ CUT — the brief's "lantern writing" tradition could not be verified

- **What the brief asked for:** `languages.md` §2.8 lists among the family's hooks "their embroidered story-cloths, the **'lantern writing' tradition**, and the Hmong diaspora from Laos to Minnesota and French Guiana."
- **What was searched:** a web search for `Hmong "lantern writing" OR "lub teeb" script tradition story cloth paj ntaub`. The results were dictionary entries for <em>lub teeb</em> ("lamp") in White Hmong–English dictionaries and a Hmong-for-health-workers handbook. **Nothing** described a writing tradition called "lantern writing" in Hmong, Mien or any related language.
- **Decision: the claim is CUT, not shipped.** Under `languages.md` §3's definition of done — "Unverifiable claims cut or framed explicitly as tradition/legend" — an unverifiable hook is not written into the atlas. No node mentions lantern writing.
- **⚠ The brief's other two hooks WERE verified and shipped:** the Hmong diaspora (HM-103) and the Pahawh script's origin story (HM-102). The brief's phrase may have been a garbled reference to either, or to the *paj ntaub* story-cloths — but the atlas does not guess. **If a later session finds a source, the claim can be added; until then it stays out.**
- **Also not shipped from the brief:** "Biao Jiao" as a Mienic member. The brief lists Mienic as "Iu Mien, Kim Mun, Biao Min, Dzao Min, Biao Jiao", but the reference account's Mienic infobox lists **Iu Mien, Biao Mon, Kim Mun, Biao Min, and Zaominic (Dzao Min + Yangchun Pai Yao)**. The atlas follows the sourced list, uses **Biao Mon** in place of "Biao Jiao", and adds the Zaominic pair. Recorded because the brief and the source disagree about the branch's membership.

### [HM-108] Fonts: two new registrations, one script left unshipped for want of a font

- **Two new `GFONT` entries, both validated against the Google Fonts CSS API (2026-09-26):**
  - `'Noto Sans Pahawh Hmong'` → `Noto+Sans+Pahawh+Hmong` — **200**, weight **400 only**
  - `'Noto Sans Miao'` → `Noto+Sans+Miao` — **200**, weight **400 only** (this is the Pollard-script font; the Unicode block is named "Miao")
  - Both are registered without a `:wght@` axis, following the existing convention for single-weight families such as `Noto Sans Ol Chiki` and `Noto Sans Mongolian`.
- **⚠ One font could NOT be found, and the script was therefore not shipped.** Nyiakeng Puachue Hmong (`𞄉𞄧𞄵𞄀𞄩𞄰`, Unicode U+1E100–U+1E14F) appears in the Hmong language infobox as a native name, but:
  - `Noto+Sans+Nyiakeng+Puachue+Hmong` → **400** (the family does not exist under that name)
  - A query of `fonts.google.com/metadata/fonts` for families matching `nyiakeng`, `hmong` or `miao` returned exactly three: **`Noto Sans Miao`**, **`Noto Sans Pahawh Hmong`** and **`Noto Serif NP Hmong`**.
  - **`Noto Serif NP Hmong` is the correct family name for Nyiakeng Puachue Hmong** (NP = Nyiakeng Puachue). It was **not added to `GFONT`** because no node in the shipped atlas uses it — adding an unused font entry is what the dead `Noto Sans Tangut` reference taught the project to avoid. **Recorded here so a later pass that wants to show NP Hmong knows the name.**
- **The `nat`-slot decision, and why it matters for fonts.** The atlas puts the **script forms** in `nat` (Pahawh on `hmongdaw`, Pollard on `ahmao`) rather than in `chips`, because `--native` is the font stack that `applyFonts()` builds from `CONFIG.fonts`, whereas `.chip.scr` uses `--serif` and would not reliably reach the webfont. The stack order is Pahawh → Miao → Serif SC → fallbacks, so each script finds its font by falling through: Pahawh codepoints hit the first family, Pollard codepoints fall past it to `Noto Sans Miao`. **Verified in the rendered DOM** — see HM-109.


### [HM-109] ISO codes, link health, and the phase's verification

- **ISO 639-3 codes shipped, all read from infoboxes:** `hmx` (Hmong–Mien, ISO 639-5), `hmn` (Hmong macrolanguage), `mmr` + `muq` (Xong W/E), `hea` + `hmq` + `hms` + `neo` (Hmu N/E/S + Ná-Meo), `hmd` (A-Hmao), `mww` (Hmong Daw), `hnj` (Hmong Njua), `pha` (Pa-Hng), `shx` (She), `ium` (Iu Mien), `mji` (Kim Mun), `bje` (Biao Min), `bpn` (Dzao Min), `bmt` (Biao Mon).
- **`bunu` has no code** — the infobox has no `iso3` field, so the table reads `— (its varieties are registered separately)`. The grouping and diaspora nodes read `—`.
- **⚠ A verification catch worth recording.** The two Hmong variety nodes were first written with `nat` values (`Hmoob Dawb`, `Hmoob Ntsuab`) that were **conventional but unsourced**. Checking `Hmong Daw` and `Hmong Njua` showed both redirect to `Hmong language`, so no infobox gives those forms. The correct evidence turned out to be in the **per-language-code tags of the Hmong infobox itself**: the `Lang` tag for `mww` (`lus Hmoob`, Hmong Daw) and the `Lang` tag for `hnj` (`lug Moob`, Hmong Njua). The nodes were corrected to those forms. **Lesson for later phases: a Wikipedia infobox's `Lang` tags are evidence, and they are easy to overlook.**
- **Link health — Omniglot coverage for Hmong–Mien (protocol from `[TU-109]`), checked 2026-09-26:**
  - `hmong.htm` → **200** ✓ · `yao.htm` → **200** ✓ · `she.htm` → **200** ✓ · `langfam.htm` → **200** ✓
  - **404, and therefore not used:** `mien.htm`, `iu_mien.htm`, `iu_mienh.htm`, `mienh.htm`, `hmong_mien.htm`, `pahawh.htm`, `pahawh_hmong.htm`, `pollard.htm`, `pollard_script.htm`, `hmong_language.htm`, `yao_language.htm`, `she_language.htm`, `biao_min.htm`, `bu_nu.htm`
  - **Consequence recorded:** Omniglot has **no page for either script** this family's story turns on, and none for any Mienic language other than the umbrella `yao.htm`. The `SOUND` table routes the Mienic nodes to `yao.htm` and the Hmongic ones to `hmong.htm`; `bunu`, `bahengic`, `biaomin`, `dzaomin`, `biaomon` and `guiana` ship with **empty** link lists and rely on the engine's YouTube-search fallback. This is the second-thinnest link set of any atlas, after Koreanic.
- **Verified:**
  - `node --check atlas-hmongmien.js` → OK.
  - `node tools/check-atlas.js atlas-hmongmien.js` → **valid, 22 nodes · 86 markers · iso 22 · features 22**.
  - Headless Edge smoke test of `#hmongmien/hmongdaw` → **0 error markers**; header renders `苗瑶语族` with **`cn-only`** (no native family name — the opposite of Koreanic) plus "Hmong–Mien"; the `scriptfonts` link requests **`Noto+Sans+Pahawh+Hmong` + `Noto+Sans+Miao` + `Noto+Serif+SC`**; and the Pahawh codepoint **U+16B07** is present in the rendered DOM.


## Formosan (Phase 7) — research log

All URLs below were fetched and read on **2026-09-27**. The prefix is **`FO-`**, checked against the prefixes already in use (`DP`, `HM`, `JP`, `KD`, `KO`, `MG`, `SR`, `TB`, `TK`, `TU`) **before** the first entry was written — which is the lesson recorded at `[TK-112]`. `AU-`/`AA-` are reserved for Austroasiatic.

### [FO-101] The family that is not a family

- **⚠ The single most important fact about this atlas, and it changes how the tree must be drawn.** Verified — en.wikipedia `Formosan languages` infobox: **`acceptance = geographic`**; region Taiwan; children listed as **East Formosan, Northwest Formosan, Western Plains, Atayalic, Bunun, Tsouic, Rukai, Puyuma, Paiwan**; `protoname = Proto-Austronesian`; **`iso5 = fox`**; and — the giveaway — **`glotto = none`**, i.e. Glottolog assigns the grouping no code of its own.
- **Quoted from the lead:** "The Formosan languages are a **geographic grouping** of Austronesian languages spoken by the Indigenous peoples of Taiwan. They do **not form a single subfamily** of Austronesian but rather **up to nine separate primary subfamilies**." So this atlas is not a family tree in the sense the others are: it is **a place where nine branches of Austronesian happen to be**. The root node says so, and the atlas does **not** draw a single Proto-Formosan ancestor — because there isn't one. **Proto-Austronesian itself is the ancestor**, and its other descendants are everywhere from Madagascar to Rapa Nui.
- **The numbers, all from the same source:** Taiwanese Indigenous peoples are "about **2.3%** of the island's population"; only **35% speak their ancestral language**, "due to centuries of language shift". Of the approximately **26 languages** of the Taiwanese Indigenous peoples, **at least ten are extinct** and another **four (perhaps five) are moribund**. That is the shape of this atlas: a majority of its nodes are dead or dying.
- **⚠ The map caption carries a caveat that must not be dropped.** The standard Blust 1999 map shows the families "**before Chinese colonization**", and its white section is **unattested** — "some maps fill it in with Luiyang, Kulon or as generic 'Ketagalan'". So the western plains are a hole in the record, not an empty space. The atlas's captions say this.
- **Malayo-Polynesian is inside the picture, not outside it.** The same caption records that Malayo-Polynesian "may lie within Eastern Formosan" — which is why **Yami/Tao**, on Orchid Island, is in this atlas at all: it is the one Formosan node that is a Malayo-Polynesian language rather than one of the nine primary branches.



All URLs below were fetched and read on **2026-09-27**. The prefix is **`TK-`**, not `TU-`: `TU-` was already taken by the Tungusic log above (its queue entry cites `[TU-101]`), and this session's first pass collided with it. The rename was done by range-limited substitution so that no Tungusic reference moved — see `[TK-112]`, which records the collision, the fix and the check that proved it.

### [FO-102] Rukai and Puyuma — the two that come out first

- **⚠ The clearest evidence for `[FO-101]`'s claim is in these two infoboxes: neither has a `fam2`.** Rukai and Puyuma are each listed with **no parent branch above them** — they *are* primary subfamilies. Verified — `Rukai language`: `nativename = Drekay / Drekai`; region Pingtung, Kaohsiung and Taitung counties; speakers **10,500** (2002); dialects **Budai, Labuan, Maga, Mantauran, Tanan, Tona**; `iso3 = dru`; `glotto = ruka1240`; script Latin (Rukai alphabet). **UNESCO Vulnerable.**
- **Li's divergence dates, quoted as a dated sequence rather than one number** (Li 2008:215, reproduced in the Rukai article): Proto-Austronesian **4,500 BCE** → **Rukai 3,000 BCE** → **Tsouic 2,500 BCE** (splitting into Tsou and Southern Tsouic around **1,000 BCE**) → most other splits **2,000 to 0 BCE** → **Western Plains 1,000 CE**. Rukai is given as the first split by a wide margin, and the plains languages are a thousand years later than anything else.
- **Quoted, because it is the strongest statement in this atlas:** "Li considers Rukai to be **the first language to have split from Proto-Austronesian**", and "classifications by various scholars repeatedly find that Rukai is one of the, and often *the*, most divergent of the Austronesian languages. It is therefore **prime evidence for reconstructing Proto-Austronesian**." Ross (2009) adds that reconstructions "had not taken Rukai into account, and therefore cannot be considered valid for the entire family" — a 4,500-year-old language whose exclusion invalidates the standard reconstruction.
- **Two hard facts about Rukai that no other Formosan language shares:** it is "**the only Formosan language without a focus system**", and **Tanan Rukai has the largest consonant inventory** of any Formosan language — 23 consonants and four vowels with length contrast. Tanan also uses an **animate/inanimate** distinction where most others use personal/non-personal.
- **Verified — Puyuma:** infobox altname **Pinuyumayan**; speakers **8,500** (2002); **no `nativename` field at all**, so this node's script slot ships **empty** rather than carrying an invented form; `iso3 = pyu`; `glotto = puyu1239`. **UNESCO Vulnerable.** Lead: "**Most speakers are older adults**", and — the sentence that matters — "Puyuma is one of the more divergent of the Austronesian languages and **falls outside reconstructions of Proto-Austronesian**." Dialects (Ting 1978): Nanwang, Pinaski–Ulivelivek, Rikavung, Kasavakan–Katipul; **Nanwang** is phonologically conservative but grammatically innovative, preserving proto-Puyuma voiced plosives while syncretising the oblique and genitive cases.

### [FO-103] Tsouic, and a branch that may not exist

- **⚠ The question mark is in the source.** Verified — `Tsou language` infobox: `fam2 = **[[Tsouic languages|Tsouic]] ?**` — with the question mark. The lead explains: Tsou "has traditionally been considered part of a Tsouic branch", but **Chang (2006)** and **Ross (2009)** "dispute the Tsouic branch, with Tsou more divergent than the other two languages, Kanakanavu and Saaroa". The atlas ships **Tsouic as a doubtful node** — drawn, marked and explained — rather than either deleting it or asserting it. **All three of its members carry the same `fam2 = Tsouic ?`** in their own infoboxes.
- **Verified — Tsou:** infobox — `nativename = eʼe no cou`; region **Alishan**; speakers **4,100** (2015); `iso3 = tsu`; `glotto = tsou1248`; script Latin (Tsou alphabet). **UNESCO Definitely Endangered.** Four recorded dialects, of which **Duhtu and Iimcu are marked extinct in the infobox** and only Tapangʉ and Tfuya are still spoken; Iimcu "has not been well described". The grammar of the surviving dialects is "nearly identical" and phonological variation marginal.
- **Verified — Kanakanavu:** infobox — `nativename = kari Kanakanavu`; region **Maya Village, Namasia District, Kaohsiung**; ethnicity **360** (2020) against **4 speakers** (2012); `fam3 = Saaroa–Kanakanabu`; `iso3 = xnb`; `glotto = kana1286`. **UNESCO Critically Endangered.**
- **Verified — Saaroa:** infobox — `nativename = kari tahlana Hlaʼaluana`; ethnicity **400** (2012) against **10 speakers** (2012), with the infobox's own note that "**a speaker died in 2013**"; `fam3 = Saaroa–Kanakanabu`; `iso3 = sxr`; `glotto = saar1237`. **UNESCO Critically Endangered.** Lead: "Even among native speakers of the language, they use primarily **Mandarin or Bunun** in their daily lives. **There is no longer an active speech community for Saaroa.**"
- **The oral tradition is recorded on the Saaroa page and is worth keeping as tradition, not fact:** the Tsouic group "originated in **Yushan**"; about **2,000 years ago** it split into Northern Tsou (down the Nantzuhsien River) and Southern Tsou (down the Laonung River); the latter split into Kanakanabu and Saaroa "about **800 years ago**". Those numbers are oral history and the atlas attributes them as such.
- **A nice etymological fact, confirmed on two separate pages:** "The name *Tsou* literally means '**person**', from Proto-Austronesian ***Cau**... It is therefore **cognate with the name of the Thao language**" — and the `Thao language` page says exactly the same sentence about *Thao*. Two Formosan peoples on opposite sides of the island, each calling themselves "person" from the same 4,500-year-old word.



### [FO-104] The plains and the north-west: two of these are down to single digits

- **Verified — Thao:** infobox — `nativename = Thau a lalawa`; altname **Sao**; region the **Sun Moon Lake** area of central Taiwan; ethnicity **820 Thao** (2020) against **4 speakers** (2021); `fam2 = Western Plains Formosan`; dialects **Brawbaw, Shtafari**; `iso3 = ssf`; `glotto = thao1240`. **UNESCO Critically Endangered.**
- **⚠ The causal sentence, quoted because it is the atlas's clearest statement of *why*:** "**Speaking Thao was criminalised under Japanese rule of Taiwan and later the Kuomintang regime**, contributing to its critically endangered status today." The infobox records four L1 speakers plus one fluent L2 speaker in 2014, "all but one of whom were over the age of sixty"; **two elderly native speakers died in December 2014, including chief Tarma (Yuan Mingzhi), aged 75**. By 2021 four elderly L1 speakers remained. Robert Blust's *Thao Dictionary* was published in 2003 — the fullest description of a language with four speakers.
- **Verified — Saisiyat:** infobox — `nativename = SaiSiyat`; ethnicity **7,900** against speakers **4,750** (2002), with the article itself carrying a `citation needed` on the figure; `fam2 = **Northwest Formosan**`; dialects **Taai** (North, Hsinchu) and **Tungho** (South, Miaoli); `iso3 = xsy`; `glotto = sais1237`. **UNESCO Severely Endangered.** ⚠ Two facts the node carries: "**Today, one thousand Saisiyat people do not use the Saisiyat language**", and many Saisiyat speak **Saisiyat, Hakka, Atayal, Mandarin and sometimes Min Nan** — five languages in one community. **Kulon**, an extinct Formosan language, "is closely related to Saisiyat but is considered by Li to be a separate language"; the atlas does not ship Kulon as a node and says why in the Saisiyat prose.
- **Verified — Kavalan:** infobox — `nativename = kbaran, kebalan`; speakers **70** (2015); `fam2 = East Formosan`, `fam3 = **Kavalanic**`; `iso3 = ckv`; `glotto = kava1241`. **UNESCO Critically Endangered.** ⚠ "**Kavalan is no longer spoken in its original area**" — the north-east coast. As of 1930 it was used "only as a home language"; by 1987 it was still spoken in **Atayal** territory; in 2000 only **24 speakers** were reported and it was "considered moribund". Its four surviving speech communities (Kariawan near Hualien, Patʾungan, Kulis, Kralut) are all in the east and "named after older settlements from the north". **Modern-day Kavalan speakers are surrounded by Amis.** The 2017 **EDGE** study found that Kavalan, "although critically endangered, was among the most lexically distinct of Austronesian languages" — a language at 70 speakers holding one of the family's most isolated vocabularies.

### [FO-105] The two revival stories — and a number that has to be read carefully

- **Verified — Sakizaya:** infobox — **`nativename` is empty**, so this node's script slot ships blank rather than carrying an invented form; ethnicity **990 Sakizaya** (2020) against **590 speakers** (2020); `fam2 = East Formosan`, `fam3 = **Amis–Sakizaya**`; `iso3 = szy`; `glotto = saki1247`. **UNESCO Critically Endangered** — and it is the only language in this atlas that is simultaneously critically endangered *and* growing.
- **The story, which is the best one in this atlas:** after the **Takobowan incident of 1878**, "the Sakizaya people hid among the Nataoran Amis. Scholars thus **mistakenly categorised the Sakizaya language as a dialect of Amis**." In **2002** the Center of Aboriginal Studies at National Chengchi University "corrected this error when they edited the indigenous language textbooks". On **17 January 2007** the Sakizaya community "became the **thirteenth** distinct indigenous ethnic group recognised by the Taiwanese government".
- **⚠ Two different numbers in one article, and both are right.** The lead says Sakizaya is "one of the **sixteen** distinct indigenous groups on the island" while the history section says it became "the **thirteenth**" group recognised, on 17 January 2007. The sixteen is today's total; the thirteen was its place in the recognition sequence. The atlas uses both with their dates rather than picking one.
- **The community's own count is a registration count, and the article says so:** "A total of **985** people are registered as Sakizaya", but "**thousands of other Sakizaya are still registered as Amis, based on historic classifications**" — and "around half of Amis politicians in Hualien City... are said to be ethnic Sakizaya".
- **Verified — Pazeh–Kaxabu:** infobox — `name = **Pazeh–Kaxabu**` (one article, two dialects); altnames **Pazih, Pazéh**; **no `nativename` field**; `extinct = **2010, with the death of Pan Jin-yu (Pazeh)**` and a separate **`revived = 2010s`**; `speakers2 = **12 (2013, Kaxabu dialect)**`; `fam2 = Northwest Formosan`; dialects **Pazeh (marked extinct) and Kaxabu**; `iso3 = pzh`; **`glotto = kulo1237`** — i.e. the Glottolog code is shared with **Kulon**, the extinct language the Saisiyat article also mentions. Lead: "The last remaining native speaker of the Pazeh dialect died in 2010, but **12 speakers of Kaxabu remain in Puli Township, Nantou County**."
- **⚠ One language node, two opposite states — and the atlas says both.** Pazeh is extinct as of 2010; Kaxabu has twelve speakers in 2013. The atlas ships them as **one node with two dialects** because that is how the source presents them, and marks it as **extinct in one dialect and living in the other** rather than rounding to either. The article also records that Pazeh writers received awards for language preservation in 2014 — four years after the last native speaker's death.

### [FO-106] Yami, Tsat and Seediq — the three edge cases

- **Verified — Yami/Tao, and this is the atlas's structural exception:** infobox — `nativename = **ciciring no Tao**` ('human speech'); altname **Tao**; region **Orchid Island**, 46 km south-east of Taiwan; ethnicity Tao; speakers "about **4,000**" (2012); `fam2 = Malayo-Polynesian`, `fam3 = Philippine`, `fam4 = Batanic`, `fam5 = Yami–Itbayat`; `iso3 = tao`; `glotto = yami1254`. **UNESCO Definitely Endangered.** Quoted: "**Yami is the only native language of Taiwanese indigenous peoples that is not a member of the Formosan grouping**" — it belongs to the **Ivatan dialect continuum** and is a Batanic, Malayo-Polynesian language. So the atlas draws it **outside** the nine Formosan branches, joined to them by geography only. Some native speakers prefer "Tao" to "Yami", and the node says so.
- **Verified — Tsat (Hainan Cham):** infobox — altname **Hainan Cham**; region **Hainan**; ethnicity **Utsul**; speakers **4,500** (2007); **no `nativename` field**; `fam2 = Malayo-Polynesian`, **`fam3 = Malayo-Sumbawan (?)`** — a question mark in the source again; `fam4 = Chamic`, `fam5 = Highlands`, `fam6 = Northern Chamic`; `iso3 = huq`; `glotto = tsat1238`. Spoken in the **Huihui and Huixin villages near Sanya**.
- **Why Tsat is in this atlas at all:** "Hainan Cham offers an **extreme example of change through language contact**. Its phonology, word structure, and grammar have all been extensively influenced by neighbouring **Hlai** and **Sinitic** languages, making it a member of the **Mainland Southeast Asian linguistic area** in contrast to other Austronesian languages." Its relatives are **Acehnese, Cham and Jarai** — a thousand miles south. It is listed under "tonal languages in non-tonal families": an Austronesian language that has become tonal, like Tuvan and Vietnamese.
- **⚠ Its origin story is genuinely unresolved and the atlas does not tidy it.** The Utsul are "undoubtedly Cham, and therefore primarily descended from immigrants from the Champa states", but "it is unclear when they arrived in Hainan and to what extent other **Hui** Muslim groups contributed to their ethnogenesis". Traditional accounts name **Tang-dynasty Xinjiang, Song Guangdong and post-Vijaya Champa** as origins; a migration after **968 AD** (the fall of Indrapura) "appears to be the most significant contributor", with a further fifteenth-century migration recorded in Chinese texts. **The community's identity is religious first** — "a strong emphasis on Muslim religious identity rather than ethnolinguistic heritage".

### [FO-107] ⚠ Prose rewrite — the reader-facing text was written in development jargon

- **What was wrong, and it was a real defect rather than a nitpick.** The first pass at this atlas's prose was written for the *editor* instead of the *reader*. A reader opening `#formosan/tsat` was told:
  - **"Its infobox gives 4,500 speakers (2007)"** — naming a Wikipedia template as if it were a citation;
  - **"⚠ Two status problems in one node, and the atlas states both."** — a note about *this atlas's own data model*, addressed to nobody who is looking at a map;
  - and, in the `features` list for Sakizaya, **"Its infobox has no autonym, so this node's script slot is empty"** — two pieces of internal vocabulary (`node`, `script slot`) in one sentence about a language.
- **Measured before rewriting, across the whole series:** `infobox` appeared **25×** in this file against 15 (Mongolic), 5 (Hmong–Mien), 5 (Japonic), 0 in the rest; `this node` **6×** against 4, 2 and 1 elsewhere; the ⚠ glyph **30×** against 0–2 in every other atlas. Formosan was the outlier on all three counts, which is why this file needed a sweep and the others did not.
- **The rule applied, and it is the rule for later phases:** reader-facing prose describes **languages**, not the machinery that displays them.
  - **No `infobox`.** Either state the figure with its date ("It has about **4,500 speakers** (2007)"), or attribute the doubt plainly ("a figure for which no source is given anywhere in the record").
  - **No `this node` / `the node`.** Say "it", name the language, or say "here".
  - **No self-reference to the atlas's decisions.** "The atlas keeps both" becomes what is actually true of the world or the record — "Both are given, because reporting only one would be half the truth." The *reasoning* about data-model choices belongs in `research.md`, which is where it now lives.
  - **No infobox field syntax.** `<i>fam2 = "Tsouic ?"</i>` became "with a question mark in the standard classification itself"; `<i>fam3 = Malayo-Sumbawan (?)</i>` became "its place among the Malayo-Sumbawan languages is given only tentatively".
  - **⚠ reduced from 30 to 2**, both attached to the atlas's two genuine structural surprises — the disputed Tsouic branch and Yami standing outside the nine branches. This matches the series norm (Hmong–Mien 1, Japonic 2, Turkic 2) and stops the glyph reading as editorial flagging. It was also **removed from `chips` entirely**, where no other atlas uses it.
  - **Nothing factual was dropped.** Every figure, date, dispute and caveat survived the rewrite; only the framing changed. The one addition is that two nodes now name the *reason* a number is untrustworthy in reader terms ("no source is given for that figure") instead of describing a maintenance tag.
- **Recorded because it is the kind of defect that survives review.** The prose passed `node --check`, the atlas checker and three headless smoke tests — because all of them test *structure*, and this was a failure of *voice*. It was caught by reading the rendered node. **A later phase should read one full node aloud before calling an atlas done.**
- **⚠ Left as-is, and flagged for a decision rather than changed unilaterally:** the `stats` label **"nodes in this atlas"** appears in all eleven atlases, and `node`/`branch` also appear in the engine's own chrome (`kinds`, legend headers). Changing Formosan alone would make it inconsistent with the other ten, so it is recorded here as a **series-wide wording question** — "nodes" → something like "languages and groups" — to be decided once, for every atlas at the same time.
- **Verified after the rewrite:** `node --check atlas-formosan.js` → OK; `node tools/check-atlas.js atlas-*.js` → **all 11 files valid**, this file still reading `26 nodes · 101 markers · iso 26 · features 26` (so **no node, marker, ISO code or feature list was lost in the edit**); headless Edge smoke test of `#formosan/tsat` → renders, with the rewritten Tsat prose in the DOM. Post-rewrite counts: **`infobox` 0, `this node` 0, ⚠ 2**.

### [FO-108] ISO codes, link health, a rounding artefact, and the phase's verification


- **Five ISO 639-3 codes were not covered by `[FO-102]`–`[FO-106]` and were fetched for this entry**, all read off their own infoboxes on 2026-09-27: `Atayal language` → **`iso3 = tay`**, `glotto = atay1247`, nativename **Atayal / Tayal**, region Northern Taiwan, speakers 86,000 rendered (2008), dialects **Matuʼuwal, Skikun, Squliq, Plngawan, Klesan, Sʼuli, Matuʼaw**, **UNESCO Vulnerable**; `Amis language` → **`iso3 = ami`**, `glotto = amis1246`, autonym **Sowal no ʼAmis** or **Pangcah**, `fam2 = East Formosan`, `fam3 = Amis–Sakizaya`, **UNESCO Vulnerable**; `Siraya language` → **`iso3 = fos`**, `glotto = sira1267`, **`extinct = end of 19th century; revitalization movement`** with a separate **`revived = 2020s`**, `fam2 = East Formosan`, `fam3 = Sirayaic`, script Latin (modern Siraya alphabet) and Latin (**Sinkang Manuscripts**); `Bunun language` → **`iso3 = bnn`**, `glotto = bunu1267`, speakers 38,000 (2002), **no `fam2` above it**, dialects Isbukun/Takituduh/Takibaka/Takbanuaz/Takivatan plus **Takipulan †**, **UNESCO Vulnerable**; `Paiwan language` → **`iso3 = pwn`**, `glotto = paiw1248`, nativename **Vinuculjan** — carrying a **citation-needed tag on its own line** — plus Pinayuanan, **no `fam2`**, speakers L1 (2014), `nation = Taiwan`, **UNESCO Vulnerable**.
- **⚠ A rounding artefact found while checking, and the atlas ships the raw numbers instead.** Three of this family's infoboxes pass their speaker count through Wikipedia's **`sigfig`** template, so the *rendered* figure is not the *stored* one. Read from `action=raw`:
  - Atayal → `sigfig` with the stored value **85888** rounded to 2 significant figures — **stored 85,888**, rendered **86,000**
  - Amis → `sigfig` with the stored value **108,000** rounded to 2 significant figures — **stored 108,000**, rendered **110,000**
  - Paiwan → `L1:` then `sigfig` with the stored value **96334** rounded to 2 significant figures — **stored 96,334**, rendered **96,000**
  The atlas uses the stored figures (85,888 / 108,000 / 96,334) because they are the sourced numbers, and records the discrepancy here rather than leaving a future reader to find two different values for the same count. **General lesson: on Wikipedia, a `sigfig`-wrapped number means the rendered figure can differ from the citation's figure by a rounding step.** (Logged brace-free under rule 8 — see `[DP-101]`.)
- **Link health — Omniglot coverage for Formosan (protocol from `[TU-109]`), checked 2026-09-27.** Every candidate URL was requested and its **HTTP status** recorded, then each 200 was confirmed by reading the page's own `<title>` so that a soft-404 could not pass as coverage:
  - **200 and used, fourteen pages:** `atayal.htm` ✓ · `seediq.htm` ✓ (title: "Seediq alphabet, prounciation and language") · `amis.htm` ✓ · `kavalan.htm` ✓ · `saisiyat.htm` ✓ · `thao.htm` ✓ ("Thao language and alphabet") · `tsou.htm` ✓ · `kanakanavu.htm` ✓ ("Kanakanavu alphabet, prounciation and language") · `saaroa.htm` ✓ · `rukai.htm` ✓ · `bunun.htm` ✓ · `puyuma.htm` ✓ · `paiwan.htm` ✓ · `yami.htm` ✓ ("Tao (Yami) language and alphabet") · plus `langfam.htm` ✓ for the family index.
  - **404, and therefore not used:** `siraya.htm` and `hainan_cham.htm`. Two other near-miss spellings were tested and rejected: **`seedeq.htm` → 404** and **`truku.htm` → 404**, while **`seediq.htm` → 200** — so Seediq's page exists only under the spelling this atlas uses. `austronesian.htm` → **404**, so there is no Omniglot *Austronesian* index; the family index link points at `langfam.htm`.
  - **Consequence recorded:** this is by far the **best-covered family in the series** — fourteen pages against Hmong–Mien's three and Koreanic's near-zero. Only **two** nodes ship empty `SOUND` lists: **Siraya** and **Tsat**. Three more are deliberately empty because no page exists for the language itself and linking a relative's page would be a false claim: **Sakizaya** and **Pazeh–Kaxabu** (no page; both are closely tied to Amis and Saisiyat pages respectively, but neither is *that* language) — so those three rely on the engine's YouTube-search fallback.
- **Verified:**
  - `node --check atlas-formosan.js` → OK.
  - `node tools/check-atlas.js atlas-*.js` → **all 11 files valid**; this file reports **26 nodes · 101 markers · iso 26 · features 26**.
  - ⚠ **One coordinate-order error was caught by the checker and fixed.** `tools/check-atlas.js` validates `areas` rings and `sketchGeo` points as **[longitude, latitude]** (`|pt[0]| ≤ 180`, `|pt[1]| ≤ 90`) while node markers are **[lat, lng]** (`showMarkers()` converts them to GeoJSON as `[ln, la]`). The Formosan `AREAS` and sketch polygons were first written in marker order and produced **68 "bad coordinate" failures**. Corrected by swapping every pair. **Recorded because it is a real trap: two coordinate conventions live in the same file, and only one of them is checked.**
  - Headless Edge smoke test (the `[HM-109]` protocol, `/tmp/smoke.sh`) of **`#formosan/amis`** and **`#formosan/tsat`** → both render: **13 family buttons, 2 disabled** (`austroasiatic`, `siberian`), **`aria-current="page"` on `formosan`**; the Amis node shows its autonym **`Sowal no ʼAmis`** and its Chinese name **阿美语** in the DOM, and the Tsat node shows **回辉话（占语）**; the injected `scriptfonts` link requests exactly **`Noto+Serif:wght@400;600` + `Noto+Serif+SC:wght@500;700`**. **No new `GFONT` registration was needed for this family** — Formosan autonyms are Latin-script Romanisations, so the two existing entries cover them.
  - ⚠ **Operational note for later sessions:** the first smoke run's headless Edge process did not exit after dumping its DOM, and the second run then blocked for over five minutes on a stale profile lock. **`pkill -9 -f 'headless=new'` before each batch**, or run the two tests in separate invocations.

- **⚠ A within-source warning about which Tsat is being described:** Thurgood, Thurgood and Li distinguish an older "**Colloquial Cham**" from a more recent "**Mandarinised**" variety, and their source for the older one is research "among speakers since deceased"; "it is doubtful whether the less Mandarinised variety is still spoken in Sanya." The atlas records this rather than presenting its Tsat description as a single present-day variety.
- **Verified — Seediq:** infobox — altname **Kari Seediq / Truku**, previously transcribed **Taroko**; region central, eastern and coastal Taiwan; ethnicity Seediq and Taroko; speakers **20,000** (2008); `fam2 = **Atayalic**`; `iso3 = trv`; `glotto = taro1264`. **UNESCO Vulnerable** — the infobox's own caption reads "**Taroko** is classified as Vulnerable", using the older name. Three dialects (Tsukida 2005): **Truku** (20,000 members *including non-speakers*), **Toda** (2,500) and **Tgdaya** (2,500) — ⚠ note the figures are **membership, not speaker counts**, and each group "refers to itself by the name of its dialect, while the **Amis** call them all 'Taroko'". That is why one language has two names in the literature.





## Turkic (Phase 7) — research log

All URLs below were fetched and read on **2026-09-27**. The prefix is **`TK-`**, not `TU-`: `TU-` was already taken by the Tungusic log above (its queue entry cites `[TU-101]`), and this session's first pass collided with it. The rename was done by range-limited substitution so that no Tungusic reference moved — see `[TK-112]`, which records the collision, the fix and the check that proved it.

### [TK-101] Scope decision: the FULL family, and why

- **The brief left this open.** `languages.md` §2.9 offered (a) China + Central Asia — `[80, 42]`, zoom 4 — or (b) the full family — `[60, 42]`, zoom 2.6 — and recommended (a).
- **Decision taken: option (b), the full family**, on the instruction given at the start of this session. The atlas therefore covers Istanbul → Yakutsk, and it is a Eurasia atlas rather than an East Asia one. Recorded here because it is a deliberate departure from the brief's recommendation, and because it is the widest extent of any atlas in the series.
- **What that costs.** Every other atlas in the series sits inside roughly `[75–145]` longitude; this one spans `[28, 160]`. The sketch geometry has to carry Europe, Anatolia, Central Asia and Siberia at once, so it is necessarily coarser than the Silk Road or Japonic sketches. The `captions.sketch` says so explicitly rather than pretending to detail it does not have.
- **Verified — family level:** en.wikipedia `Turkic languages` infobox — `region = Eurasia`; `protoname = Proto-Turkic`; `family = One of the world's primary language families`; children **Common Turkic** and **Oghuric**; `iso5 = trk`; `glotto = turk1311`; `ethnicity = Turkic peoples`; `speakers = c. 200 million`, `date = 2020`. Lead: "a language family of more than **35** documented languages"; Proto-Turkic is thought to have been spoken in a region of East Asia "spanning from Mongolia to Northwest China", whence they expanded during the first millennium. Characterised as a **dialect continuum**; characteristic features named are **vowel harmony**, **agglutination**, **SOV order**, and **lack of grammatical gender**.
- **Turkish is about 38% of all Turkic speakers**, followed by Uzbek — so the family's centre of gravity is not where its eastern half is.

### [TK-102] Oghuz: the branch that holds three-quarters of the family

- **Verified — branch level:** en.wikipedia `Oghuz languages` infobox — children **Western Oghuz**, **Central Oghuz**, **Eastern Oghuz**; `glotto = oghu1243`; region Middle East, Central Asia, South-East Europe. Lead: "spoken by approximately **108 million** people"; Turkish + Azerbaijani + Turkmen together "account for more than **95%** of speakers of this sub-branch". Johanson is quoted that Oghuz forms "a clearly discernible and closely related bloc", and that Western Oghuz languages are highly mutually intelligible with **Crimean Tatar** — which is Kipchak, not Oghuz, "heavily influenced by Turkish over several centuries".
- **⚠ A dispute the atlas must state, not smooth:** the same article says "the ancestor of Oghuz languages is a matter of debate" — the Orkhon inscriptions and Old Uyghur documents are "rather the ancestor of Central Asiatic Turkic languages (including Karluk and Kipchak)", while Oghuz "apparently originate from the language of the people known as 'Western Türküt' in Chinese annals". **So Old Turkic is NOT simply the ancestor of Turkish**, which is the tidy story a reader would expect. The atlas's root node says this.
- **Verified — Turkish:** infobox — `nativename = Türkçe / Türk dili`; L1 **85.19 million** (2006–2021), L2 6.07 million (2019), total **91.26 million**; family Turkic > Common Turkic > Oghuz > Western; ancestors **Old Anatolian Turkish** → **Ottoman Turkish**; `stand1 = Istanbul Turkish`; script Latin (Turkish alphabet); dialects Cypriot, Iraqi Turkmen, Karamanli †, Meskhetian, Rumelian, Syrian + Anatolian.
- **Verified — Azerbaijani:** infobox — `nativename = Azərbaycan dili` (also in Perso-Arabic and Cyrillic); speakers **23.85 million** (2022); Turkic > Common Turkic > Oghuz > Western Oghuz; ancestors **Old Anatolian Turkish** → **Ajem-Turkic**; `stand1 = Shirvani` (north), `stand2 = Tabrizi` (south); scripts **Latin in Azerbaijan, Perso-Arabic in Iran, Cyrillic in Russia**; `iso3 = aze`, split into **azj** (North) and **azb** (South); `glotto = azer1255`. **This is the atlas's clearest case of one language written three ways by three states**, and the script slot cannot show all three — the node shows the Latin autonym and the prose names the others.
- **Verified — Turkmen:** infobox — `nativename = türkmençe, türkmen dili` (Latin, Cyrillic and Perso-Arabic given side by side); L1 **6.80 million** (2023), total 7.80 million; Turkic > Common Turkic > Oghuz > **Eastern**; `iso3 = tuk`; `glotto = turk1304`; script Latin (official in Turkmenistan), Perso-Arabic, Cyrillic; ten named dialects (Teke, Nohurly, Ýomud, Änewli, Hasarly, Gökleň, Saryk, Ärsary, Çowdur, Trukhmen).



### [TK-103] Oghuric: one survivor, and a branch whose name is itself contested

- **Verified:** en.wikipedia `Chuvash language` infobox — `nativename = Чӑваш чӗлхи / Çăvaş çĕlhi` (and `Чӑвашла / Çăvaşla`); ethnicity **1.05 million** Chuvash (2020 census) against **738,150** speakers (2020 census); family Turkic > **Oghuric**; `ancestor = Volga Bulgar ?` — **with the question mark in the source itself**; `iso3 = chv`; `glotto = chuv1255`; script Cyrillic. **UNESCO Vulnerable.**
- **The family-level claim the atlas turns on**, quoted from the lead: Chuvash "is the only surviving member of the **Oghur** branch of Turkic languages, one of the two principal branches of the Turkic family." So the atlas's root node has two children — Common Turkic and Oghuric — and one of them has exactly one living member.
- **⚠ 1.05 million ethnic Chuvash against 738,150 speakers** is the family's starkest language-shift ratio outside She in the Hmong–Mien atlas, and it is stated on the node rather than buried.
- **Not yet fetched at the time this entry was written, and therefore NOT shipped as verified:** the `Bulgar language` and `Khazar language` pages, which are the two extinct Oghuric members the brief names. **Both were fetched later in this session and are logged at `[TK-109]`** — which is where the Khazar corpus, the "classification disputed" family field and the Bulgar extinction dates come from. This entry is left as written so the order in which things were checked stays visible.

### [TK-104] Siberian Turkic: a branch, not a dialect area

- **Verified — the branch's own shape:** the `Turkic languages` family page names Common Turkic and Oghuric as the two children, and `Siberian Turkic languages` is treated across the individual infoboxes as a subgroup of Common Turkic. **Yakut** and **Khakas** both give `fam3 = Siberian Turkic`; **Tuvan** gives `fam3 = Sayan Turkic`, one level below.
- **Verified — Yakut/Sakha:** infobox — `nativename = саха тыла / saxa tıla`; speakers "**c. 450,000**" with the date field **empty** and Britannica as the reference — a weak citation, flagged; family Turkic > Common Turkic > **Siberian Turkic** > **Northern Siberian**; `iso2/iso3 = sah`; `glotto = yaku1245`; script Cyrillic. **UNESCO Vulnerable.** Lead: spoken "primarily by ethnic Yakuts, but also by the Evenki, Even, Yukaghir and the Starozhily peoples" — so the speaker figure is **not** an ethnic-Yakut figure. Yakut left the Common Turkic community "relatively early", and mutual intelligibility with other Turkic languages is **low**.
- **Verified — Tuvan:** infobox — `nativename = Тыва дыл / Tıva tıl`; speakers **252,953** (2020); Turkic > Common Turkic > **Sayan Turkic** > Steppe Sayan Turkic; `iso2/iso3 = tyv`; `glotto = tuvi1240` (plus a separate `todj1234` for Todja); script Cyrillic. **UNESCO Vulnerable.** "Its closest relative is the moribund **Tofa**." Four dialect groups: Western, Central (the literary basis), Northeastern, Southeastern. ⚠ A footnote in the infobox notes that **Tozhu and Tere-Khöl are Taiga Sayan Turkic, not Steppe** — so the sub-classification inside Tuvan is not uniform, and the atlas says so.
- **Verified — Khakas:** infobox — `nativename = Хакас тілі / Xakas tĕlĕ`, also `тадар тілі / Tadar tĕlĕ`; speakers **29,010** (2021); Turkic > Common Turkic > Siberian Turkic > South Siberian > **Yenisei Turkic**; `iso3 = kjh`; `glotto = khak1248`; script Cyrillic. Lead: "The Khakas number **61,000**, of whom **29,000** speak the Khakas language" — a second sharp shift ratio. Dialects named: Sagay, Kacha, Koybal, Beltir, Kyzyl.
- **⚠ A structural catch worth recording.** The Khakas infobox lists **Fuyu Kyrgyz** as `dia1` — a *dialect of Khakas*. The brief (§2.9) treats Fuyu Kyrgyz as a separate Siberian member ("+ Western Yugur (Gansu) — the old 'Yellow Uyghur' relic" is adjacent). **Fuyu Kyrgyz is spoken in Heilongjiang, China**, thousands of kilometres from Khakassia, and its classification is genuinely disputed. The atlas therefore does **not** file it as a Khakas dialect; it gives Fuyu Kyrgyz its own node and states that one source classifies it as Khakas's closest relative. Recorded so a later pass does not "correct" this into the Khakas subtree.
- **⚠ Also recorded:** the Khakas infobox carries a dialect named **Kamas Turk**, "which according to the UNESCO Atlas has been extinct since the 1950s". An extinct dialect inside a living language is unusual enough that the atlas names it in the prose rather than silently dropping it.


### [TK-105] Karluk, Arghu and the two relic languages of China

- **Verified — Karluk branch:** en.wikipedia `Karluk languages` infobox — altnames **Qarluq, Southeastern Turkic, Turkestan Turkic**; ancestors Middle Turkic → **Karakhanid** → Khorezmian Turkic → **Chagatai**; children **Western Karluk** (Northern Uzbek, Southern Uzbek), **Eastern Karluk** (Äynu, Ili Turki, Uyghur) and an "Intermediate" group (Tor Tajik); `glotto = uygh1241`. Lead: the branch "developed from the varieties spoken by Karluks, an ancient people present in Central Asia in the 5th–8th centuries CE". **Uzbek ≈44 million** and **Uyghur 8–11 million** are "by far the largest". **Ili Turki: "moribund", 120 speakers and decreasing (1980)** — the figure is 45 years old in the source and the atlas says so.
- **⚠ Glottolog renames the branch.** The same article records that "Glottolog v.5.2 refers to the Karluk languages as **'Turkestan'**" and that it places Karakhanid with Old Turkic rather than under Karluk. So the branch name itself is a convention, not a fixed fact; the atlas uses Karluk and notes Glottolog's alternative.
- **Verified — Khalaj, the family's strangest outlier:** infobox — `nativename = خلج`; speakers **19,000** (2018); family Turkic > Common Turkic > **Arghu** — a branch of its own, not Oghuz; `ancestor = Arghu`; `iso3 = klj`; `glotto = turk1303`. Lead: "Although it contains many old Turkic elements, it has become widely **Persianized**." Doerfer "demonstrated that it was an independent branch from Common Turkic"; the evidence is preservation of **Proto-Turkic vowel-length contrasts**, word-initial ***h***, and the **absence** of the *d > y change that defines Oghuz. ⚠ "Only **5%** of families teach their children the language" — a transmission statistic, not a speaker count, and the atlas labels it as such.
- **Verified — Western Yugur:** infobox — `nativename = yoğır lar` ('Yugur speech') / `yoğır śoz` ('Yugur word'); ethnicity **7,000 Yugur** (2007) against "~2,000 (~1,000 fluent)" speakers (2019); family Turkic > Common Turkic > Siberian Turkic > South Siberian > **Yenisei Turkic**; ancestors **Old Turkic → Old Uyghur**; script **Old Uyghur alphabet until the 19th century**, Latin current; `iso3 = ybe`; `glotto = west2402`. **UNESCO Severely Endangered.**
- **⚠ Two traps in the Yugur material, both stated on the node:** (1) Western Yugur is **not** mutually intelligible with modern Uyghur, despite being called "Neo-Uyghur" and "Yellow Uyghur". (2) Its neighbour **Eastern Yugur is a Mongolic language**, not Turkic — the two live in one community under one Chinese label. The atlas's Yugur node says both.
- **Verified — Fuyu Kyrgyz, the last one:** infobox — `nativename = Gĭrgĭs`; ethnicity **880** Fuyu Kyrgyz against **10 speakers** (2007); region **Heilongjiang, China**; script **Mongolian script**; family Turkic > Common Turkic > Siberian Turkic > South Siberian > **Yenisei Turkic**; `iso3 = none`, with `isoexception = dialect` and the speaker figure sourced to **Ethnologue's Khakas entry**; `glotto = fuyu1243`. **UNESCO Critically Endangered.**
- **⚠ The naming trap, recorded explicitly.** Fuyu Kyrgyz "is not closely related to the Kyrgyz language, which is of Kipchak origin"; it "is more similar to the Western Yugur language and the Abakan Turkic languages". History: after the Dzungars were defeated by the Qing, a group of **Yenisei Kirghiz were deported in 1761** to the Nonni river basin in Manchuria — which is why a Yenisei language is spoken on the other side of Asia under a Kyrgyz name. **ISO registers it as a dialect of Khakas**, which is why its speaker count is cited to the Khakas entry; the atlas files it as its own node and says who classifies it where.


### [TK-106] The Kipchak–Nogai and Kipchak–Cuman members

- **Verified — Karakalpak:** infobox — `nativename = Qaraqalpaq tili` (Latin, Cyrillic and Perso-Arabic forms given); speakers **871,970** (2023); Turkic > Common Turkic > Kipchak > **Kipchak–Nogai**; `iso2/iso3 = kaa`; `glotto = kara1467`; script Karakalpak alphabet (Latin, Cyrillic, Arabic). **UNESCO Vulnerable.** Two dialects, Northeastern and Southwestern; "closely related to and highly mutually intelligible with Kazakh and Nogai".
- **Verified — Nogai:** infobox — `nativename = ногай тили / nogay tili`, also `ногайша / nogayşa`; ethnicity **108,000** Nogais (2020 census) against **85,600** speakers (2020); Turkic > Common Turkic > Kipchak > **Kipchak–Nogai**; `iso2/iso3 = nog`; `glotto = noga1249`. **UNESCO Definitely Endangered.**
- **Verified — Crimean Tatar:** infobox — `nativename = qırımtatar tili` (and `qırım tili`), given in Latin, Cyrillic and Perso-Arabic; speakers **581,340** (2001); Turkic > Common Turkic > Kipchak > **Kipchak–Cuman**; dialects **Northern, Central, †Southern** — one of the three is extinct and the infobox says so; `iso2/iso3 = crh`; `glotto = crim1257`.
- **⚠ The script politics here are the sharpest in the atlas and are stated, not softened.** Crimean Tatar used **Arabic script from the 16th century**, was switched to a Latin alphabet based on **Yañalif in 1928** and to Cyrillic in **1938**. A Latin alphabet based on the **Common Turkic Alphabet** was adopted by the Qurultay in 1992 and supported by the Supreme Council of Crimea in 1997 but **never implemented officially**; after the 2014 annexation Cyrillic became "the sole script allowed in Russian occupied Crimea", citing the same 2004 Constitutional Court decision that overrode Tatarstan's Latin alphabet. The atlas's Crimean Tatar node gives the history as dates and names the actors, without adjudicating sovereignty.
- **⚠ Omniglot naming catch:** Crimean Tatar's own article says the *steppe* dialect is Kipchak–Nogai while the *mountain/central* variety is Kipchak–Cuman; the Oghuz article notes Crimean Tatar is "heavily influenced by Turkish over several centuries". So **one language spans two Kipchak sub-branches plus heavy Oghuz contact**, and the atlas's node says that rather than picking one label.

### [TK-107] Altai: a "language" whose classification is not settled

- **Verified:** en.wikipedia `Altai languages` infobox — `nativename = алтай тил / altay til`; region Altai Republic, Altai Krai, Kemerovo Oblast; speakers **125,700** as the total of Southern and Northern Altai speakers (Ethnologue); `iso2 = alt`; **two ISO codes: `atv` Northern Altai and `alt` Southern Altai**; `glotto = none`, with a second glotto `alta1276` marked **"code retired"**; script Cyrillic; children Northern Altai and Southern Altai.
- **⚠ The family chain in the source is deliberately a hedge, not an error to fix.** The infobox reads `fam3 = Siberian Turkic **and** Kipchak`, `fam4 = Southern Siberian **and** Kyrgyz–Kipchak`. The lead adds that "the exact classification of Altai within the Turkic languages has often been disputed" because of its isolated position in the Altai Mountains and contact with **Shor and Khakas**. The atlas ships this as an open question on the node.
- **Two more things the node records:** (1) "The standard vocabulary is based on **Southern Altai**, though it is also taught to and used by speakers of **Northern Altai** as well" — one written standard, two spoken varieties, which is why the node has two ISO codes. (2) The languages "were called **Oyrot** (ойрот) prior to 1948", so a pre-1948 source and a post-1948 source are talking about the same thing under different names.
- **Branch-level check:** Altai's own article places it in `Siberian Turkic`; the `Kipchak languages` page lists **Southern Altai** (with Teleut and Telengit) under **Kipchak–Kyrgyz**. Both are shipped, attributed.

### [TK-108] Notes carried into the atlas build

- **Speakers figures in this family are mostly census counts, and they measure different things.** Russia's 2020 census figures (Khakas 29,010; Tofa 67; Dolgan 5,346; Tuvan 252,953; Chuvash 738,150 against 1.05 million ethnic Chuvash) are *self-reported language ability*, while Ethnologue figures (Salar 70,000; Uyghur 8–13 million; Karakalpak 871,970) are estimates. The atlas labels each figure with its source year and does not add them together.
- **The `nat` slot is unusually easy in this family** — most infoboxes give the autonym in a native orthography as a plain `lang` tag, so almost every node ships a real script form rather than a romanisation. Chuvash, Kazakh, Kyrgyz, Tatar, Bashkir, Altai, Khakas, Tuvan, Tofa, Dolgan, Nogai and Karakalpak all qualify. The exceptions the atlas leaves empty or romanised: **Khalaj** (Perso-Arabic `خلج` only — shipped, with the font caveat below), **Fuyu Kyrgyz** (`Gĭrgĭs`, a Latin transcription of a language whose current script is Mongolian), and **Western Yugur** (`yoğır lar`).
- **⚠ A font decision to make at build time.** Kazakh, Kyrgyz, Karakalpak and Nogai autonyms use **Cyrillic with Қ қ Ғ ғ Ң ң Ө ө Ұ ұ Ү ү Һ һ Ә ә** and **Tatar/Bashkir add ә ө ү җ ҙ ҫ һ ҡ ң**. `Noto Serif SC` does not carry these. The build must either register a Cyrillic Extended face or accept the browser fallback; this is logged so it is not discovered as a rendering bug later.
- **Verified:** all pages above were retrieved from `en.wikipedia.org` raw wikitext (`?action=raw`) on **2026-09-27**.

### [TK-109] Common Turkic, Bulgar and Khazar — the three hardest nodes

- **Verified — Common Turkic:** en.wikipedia `Common Turkic languages` infobox — altname **Shaz Turkic**; children **Oghuz, Kipchak, Karluk, Siberian Turkic, Arghu**; `glotto = comm1245`. **The lead's first clause matters:** Common Turkic is "a **proposed** genetic unit in some classifications of the Turkic languages, a sub-branch that includes all of them except the Oghuric languages, which had diverged earlier." The atlas's branch node keeps "proposed".
- **The r/z distinction, stated properly:** the two branches are separated by sound correspondences — "Common Turkic ***š*** versus Oghuric ***l***" and "Common Turkic ***z*** versus Oghuric ***r***". This is why the two branches are also called **Shaz-Turkic** and **Lir-/r-Turkic**. One line of the atlas's root-node prose carries this, because it is the single fact that makes the Chuvash node make sense.
- **Verified — Bulgar:** infobox — region "From Central Asia to the Pontic–Caspian steppe, the Volga and the Danube **and Southern Italy (Molise, Campania)**"; `extinct = By the **9th century on the Danube** and by the **14th century in the Volga region**`; Turkic > Oghuric; dialects Danubian Bulgar and Volga Bulgar; `iso3 = xbo`; `glotto = bolg1250`. Lead: "Other than Chuvash, Bulgar is the only language to be **definitively classified** as an Oghur Turkic language." It "initially went extinct in Danubian Bulgaria (in favour of **Old Church Slavonic**)", while in Volga Bulgaria "it was eventually replaced by the modern Chuvash language".
- **⚠ The single best sentence in this family's research, and the atlas uses it:** "The inclusion of other languages such as **Hunnish, Khazar and Sabir** within Oghur Turkic **remains speculative** owing to the paucity of historical records." So Chuvash's nearest relatives are partly a scholarly guess, and the atlas says so on the Oghuric branch node instead of drawing a tidy tree.
- **Verified — Khazar, and this is the atlas's honesty test case:** infobox — `extinct = by the 13th century` **with a `citation needed` tag attached in the source itself**; `fam1 = Turkic`, **`fam2 = (classification disputed)`** — literally the words "classification disputed" in the family field; script **Old Turkic**; `iso3 = zkz`; **`glotto = none`** (Glottolog assigns it no code). Lead: "There are few written records of the language and its features and characteristics are unknown."
- **What actually survives, quoted as a corpus rather than summarised away:** "the extant corpus of Khazar is extremely limited, consisting of **two nouns, a conjugated verb, and a few proper names**". The 10th-century **Kievan Letter** contains the Orkhon-script word-phrase *OKHQURÜM*, "I read (this or it)". The **1986 Guinness Book of Records**, following the *Great Soviet Encyclopedia*, claimed Khazar had the "**smallest literature**" of any language — allegedly one attested word. The atlas's Khazar node names the corpus size, the source of the claim, and does not pretend to a family tree position.
- **⚠ Al-Istakhri gives two contradictory notices in the same source**, and the article reproduces both; al-Muqaddasi calls Khazar "very incomprehensible". Both are shipped as evidence of how thin the record is, not as data about the language.
- **Action taken:** the Khazar node's `cls` is a *doubtful* class of its own (`c-ogx`, shared with Bulgar), and its prose states that "some scholars believe it belongs to Oghuric while others place it in Common Turkic" — which is exactly what the source says, and no more.

### [TK-110] Old Turkic, Ili Turki, and the link check

- **Verified — Old Turkic:** en.wikipedia `Old Turkic` infobox — altname **East Old Turkic**; region East Asia, Central Asia and parts of Eastern Europe; **`era = 5th–13th centuries`**; script **Old Turkic script**, **Old Uyghur alphabet**; family Turkic > Common Turkic > **Siberian Turkic** > South Siberian — *not* a bare "ancestor of everything"; dialects **Orkhon Turkic** and **Old Uyghur**; states Second Turkic Khaganate, Uyghur Khaganate; `iso3 = otk` with the source's own gloss "(Old Turkish)"; `glotto = oldu1238`.
- **⚠ Two corrections this node forced on the brief.** (1) The brief's tree sketch has Old Turkic as the single ancestor of all Common Turkic; the source places it **inside Siberian Turkic**, and the `Oghuz languages` article says outright that Orkhon/Old Uyghur is "rather the ancestor of Central Asiatic Turkic languages (including Karluk and Kipchak)" while Oghuz comes from "Western Türküt". The atlas therefore **does not** draw Old Turkic as the trunk. (2) The dating: "the period of Old Turkic can be dated from slightly before **720 AD** to the Mongol invasions of the 13th century" — so "8th c." in the brief is right for the Orkhon stelae but the era runs much later.
- **Karakhanid is genuinely ambiguous and the node says so:** "some (Pritsak, Malov, Karatay, Erdal) classify it as another dialect of East Old Turkic, while others prefer to include Karakhanid among Middle Turkic languages." Both attributions are given; the atlas cross-links to `atlas-silkroad.js` for Old Uyghur rather than duplicating it.
- **Verified — Ili Turki:** infobox — `nativename = İlı turkeşi` (also Cyrillic and Perso-Arabic); **speakers = "30 families"** (2007, China), with `speakers2 = moribund in Kazakhstan`; family Turkic > Common Turkic > Karluk > **Eastern Karluk**; `iso3 = ili`; `glotto = ilit1241`. **UNESCO Severely Endangered.** Spoken in China's **Ili Kazakh Autonomous Prefecture** along the Ili River and at Yining; no official status in either China or Kazakhstan.
- **⚠ The figure is "30 families", not 30 speakers.** The Karluk branch page separately gives "**120 speakers and decreasing (1980)**". These are two different measurements from two different decades and the atlas gives both, labelled, rather than picking the smaller-looking one. Speakers are "shifting to Kazakh or Uyghur", and Ili Turki "exhibits a number of features that suggest a **Kipchak substratum**" — so the branch assignment is by no means clean.
- **Link health — Omniglot coverage, checked 2026-09-27** (same protocol as `[HM-109]`). **⚠ The first pass of this check was written up from expectation rather than measurement and was wrong in four places; the list below is the measured one.**
  - **200 ✓ (20 pages):** `turkish.htm`, `kazakh.htm`, `kyrgyz.htm`, `uzbek.htm`, `tatar.htm`, `chuvash.htm`, `yakut.htm`, `dolgan.htm`, `altay.htm`, `khakas.htm`, `nogai.htm`, `gagauz.htm`, `turkmen.htm`, `uyghur.htm`, `bashkir.htm`, `azeri.htm`, `salar.htm`, `khalaj.htm`, `tofa.htm`, **`orkhon.htm`**, `langfam.htm`.
  - **404, and therefore not used:** `tuvan.htm`, `karakalpak.htm`, `old_turkic.htm`, `azerbaijani.htm` (the working spelling is **`azeri.htm`**), `crimearntatar.htm`, `crimean_tatar.htm`, `ili_turki.htm`, `yugur.htm`, `western_yugur.htm`. Also checked and absent: `tuvinian.htm`, `tuva.htm`, `qaraqalpaq.htm`, `krimtatar.htm`, `turkic_runic.htm`.
  - **⚠ Four surprises worth recording, because each one would have shipped as a broken link:** Omniglot has **no Tuvan page** despite Tuvan being the largest Sayan Turkic language; **no Karakalpak page**; **no Crimean Tatar page** despite it being the largest Kipchak–Cuman language; and **no Old Turkic page under that name** — the runiform script lives at **`orkhon.htm`**. The atlas routes Old Turkic to `orkhon.htm` and the Tuvan/Karakalpak/Crimean Tatar nodes carry empty link lists.
  - **Consequence recorded:** the nodes without an Omniglot page (`tuvan`, `karakalpak`, `crimeantatar`, `ili`, `wyugur`) ship with **empty** `SOUND` lists and rely on the engine's YouTube-search fallback, exactly as Hmong–Mien's Mienic nodes do.
- **Verified:** all pages retrieved from `en.wikipedia.org` raw wikitext on **2026-09-27**; Omniglot URLs HTTP-checked the same day.

### [TK-111] A verification catch on ISO codes, and one figure left alone

- **⚠ Two ISO codes were about to ship unchecked.** The `Turkish language` infobox was truncated by the fetch tool before its `iso3` line, and the `Chagatai language` page was never fetched at all. Rather than assume, both were re-read directly: **Turkish — `iso1 = tr`, `iso2 = tur`, `iso3 = tur`**; **Chagatai — `iso2 = chg`, `iso3 = chg`**. Both are now in the atlas, and the atlas's comment no longer claims Chagatai is unverified.
- **Lesson recorded for the remaining phases:** an infobox field that falls past the fetch tool's truncation point is **not verified**, however obvious its value looks. The cheap fix is one targeted `curl | grep` against the raw wikitext rather than a second full page fetch.
- **One figure deliberately NOT resolved.** Bashkir's infobox gives **1.08 million speakers (2020)** and its own lead says "approximately **1.6 million** native speakers", both cited to the same reference, while the 2021 census records **1.57 million ethnic Bashkirs**. The atlas ships the infobox figure on the node and states the discrepancy in the node's prose. It does **not** pick 1.6 million for a better headline.
- **Verified:** the two ISO checks above were run against `en.wikipedia.org` raw wikitext on **2026-09-27**.

### [TK-112] Log-namespace collision, and the phase's verification

- **⚠ A real error this session made and fixed.** The Turkic entries were first written as `TU-101` … `TU-111`. **`TU-` was already the Tungusic prefix** — the research queue above cites `[TU-101]` for the Willow Palisade claim, and Tungusic's own log runs `TU-101`–`TU-109`. For a while the file contained two different `[TU-103]`s and two `[TU-105]`s, and the Turkic entries were also **inserted on the wrong side of the `## Disputed / conflicting sources` heading**, so two of them sat inside a section they did not belong to.
- **The fix, and why it was done this way.** (1) A range-limited substitution (`sed -i '' '1099,1183 s/TU-1/TK-1/g'`) renamed only the Turkic lines, verified afterwards by confirming that `TU-101`–`TU-109` still resolve to the Tungusic entries and that **zero** `TU-1` strings remain between the Turkic heading and the Disputed heading. (2) The two stranded blocks were cut out, renamed and re-inserted before `[TK-105]`, verified by listing the headings in order: **TK-101 … TK-111, contiguous**. (3) `atlas-turkic.js` had the same substitution applied and now contains **no `TU-1` string at all**.
- **Lesson for the remaining phases:** a family's log prefix must be checked against the **existing queue section** before the first entry is written, not after. Two families can plausibly claim `TU-` (Tungusic, Turkic), and the same trap exists for `AU-`/`AA-` (Austroasiatic), `FO-`/`FM-` (Formosan) and `SI-` (Siberian).
- **Verified:**
  - `node --check atlas-turkic.js` → OK.
  - `node tools/check-atlas.js atlas-*.js` → **all 10 files valid**; Turkic reads `nodes 38 · markers 173 · iso 30 · features 38`.
  - Headless Edge smoke test of `#turkic/chuvash` → header renders `突厥语族` with **`cn-only`** (Turkic has no single endonym, unlike 汉语 or 日本語族) plus "Turkic"; the nav shows **10 enabled buttons, 3 disabled** (`formosan`, `austroasiatic`, `siberian`), with `turkic` carrying `aria-current="page"`; the tree renders **38 nodes**; and the Cyrillic autonym **Чӑваш чӗлхи** is present in the rendered DOM.
  - The `scriptfonts` link requests **`Noto+Serif:wght@400;600` + `Noto+Sans+Arabic:wght@400;600` + `Noto+Serif+SC:wght@500;700`** — the two new faces added by this phase. Both were validated against the Google Fonts API before registration (`[TK-108]`); `Noto Sans Cyrillic`, which was the obvious first guess, **does not exist** and returns HTTP 400.
  - The Chuvash info panel renders with the engine's new `kinds.leaf` wording ("A language" rather than "Living variety"), the ISO chip `chv`, an Omniglot link, and all three history paragraphs.

## Disputed / conflicting sources

Tracked separately per family so the atlas prose can hedge the right sentences.

| Family | Item | Conflicting positions | Resolution in prose |
|--------|------|-----------------------|---------------------|
| Sinitic | Hui classification | Wu / Gan / independent | presented as debated (already in prose) |
| Sinitic | Ping classification | Yue-related / independent branch | presented as debated |
| Sinitic | Hakka migration narrative | genealogical tradition vs. linguistic evidence | presented as tradition + linguistic counter-evidence |
| Sinitic | Wenzhou code-talker story | media repetition vs. no documentation | explicitly flagged as undocumented |
| Sinitic | Speaker figures | Ethnologue vs. Chinese academy counts | ranges with "by source" |
| Japonic | Yaeyama's UNESCO grade | *severely endangered* (UNESCO Atlas 2009, restated by Japan's Agency for Cultural Affairs and by Heinrich 2009) vs. *definitely endangered* (English Wikipedia infobox) | followed the 2009 Atlas; conflict stated in the node — see `[JP-104]` |
| Japonic | Hachijō's position | separate Japonic branch vs. divergent Japanese dialect | presented as unresolved; atlas shows it as a branch — see `[JP-105]` |
| Japonic & Ainu | Ainu's status | "dormant"/"more or less extinct" (Dougherty 2017, Janhunen 2022) vs. rising neo-speaker numbers and official recognition | both stated; the atlas does not call Ainu extinct — see `[JP-106]`, `[JP-108]` |
| Ainu | The Emishi | Ainu-speaking vs. Japonic (Izumo-related) speakers | presented as debated in the `ainu` node prose |
| Mongolic | Buryat's speaker count | 330,000 (Janhunen 2006, via the family article) vs. 436,300 (Ethnologue e26, 2017–2020, via the Buryat infobox) | both figures given, "by source" — see `[MG-102]` |
| Mongolic | Kalmyk's speaker count | 360,000 for Kalmyk–Oirat combined (Janhunen) vs. 110,000 for Kalmyk alone (2021) | both given, with the difference in scope stated — see `[MG-102]`, `[MG-106]` |
| Mongolic | Cyrillic's date | 1941 (decreed, per two articles) vs. 1946 (traditional script displaced, per the Mongolian-script article) | stated as "decreed in 1941, displaced by 1946" — see `[MG-103]` |
| Mongolic | Oirat's speaker count | 368,000 with 655,372 ethnic Oirats (the Oirat infobox, 2007–2010) vs. 360,000 for Kalmyk–Oirat combined (Janhunen, via the family article); the infobox's own 58% implies ≈380,000, not 368,000 | all three figures given with scope stated, and the infobox's internal mismatch flagged — see `[MG-111]` |
| Mongolic | Inner Mongolia's size vs. Mongolia's | "Mongolian speakers in China is still larger than in the state of Mongolia" (the Mongolian article) vs. that article's own figures — Mongolia ≈3.6m (2014), Inner Mongolia ≈2.1m, all China ≈2.9m | the claim is reported as a claim, with the figures that undercut it — see `[MG-111]` |
| Mongolic | Moghol's status | "few" speakers (1982) vs. Glottolog "extinct" | both reported — see `[MG-109]` |
| Silk Road | Rouran's classification | earliest attested Mongolic (Vovin 2019, on the Brāhmī Bugut and Khüis Tolgoi inscriptions) vs. unclassified / too thin to classify | attributed to Vovin by name and year, called an argument, with the "a handful of inscriptions is not a corpus" caveat — see `[SR-106]` |
| Silk Road | Xiongnu's classification | Turkic / Mongolic / Yeniseian / Iranian / isolate — all proposed | **no** affiliation chosen; the refusal is stated in the prose as the finding — see `[SR-106]` |
| Silk Road | Khitan's readability | "partially undeciphered" (large script) vs. "the language has yet to be completely reconstructed" — two different claims | kept apart: the chip reads "partial", not "deciphered" — see `[SR-108]` |
| Silk Road | ISO codes that look right and are not | `xru` looks like Rouran but is Marriammu (Australia); `xnn` looks like Xiongnu but is Northern Kankanay (Philippines) | no code chip shown for either node rather than a wrong one — see `[SR-105]` |
| Silk Road | Register vs. common spellings | register has Tokharian A/B, Kitan, Old Turkish, Old Uighur, Chorasmian; the literature and this atlas use Tocharian, Khitan, Old Turkic, Old Uyghur, Khwarezmian | the `ISO` map quotes the register's spelling and flags the mismatch inline — see `[SR-105]` |
| Tibeto-Burman | ⚠ **The grouping itself** | "Tibeto-Burman" as a valid subgroup vs. **not demonstrated to be one** (Benedict 1972; Matisoff) | the caveat is on the root node, the `prototb` node and the `sources` note; the tree is presented as a map of usage, not a genealogy — see `[TB-101]` |
| Tibeto-Burman | Karen's placement | divergent member of Tibeto-Burman (Matisoff's modification of Benedict) vs. a separate branch of Sino-Tibetan | both named, attributed, and the node says placement depends on the reconstruction — see `[TB-109]` |
| Tibeto-Burman | Register names vs. literature | register has Nepal Bhasa, Sichuan Yi, Kachin, Lushai, Bumthangkha, Yakha, Thado Chin | register name quoted with the common one given — see `[TB-105]` |
| Tibeto-Burman | Register splits vs. atlas nodes | Tamang → taj/tdg/tge; Qiang → cng/qxs; Pumi → pmi/pmj; Karen → ksw/pwo/kyu | scope stated on each node — see `[TB-105]` |
| Tibeto-Burman | Register lumps vs. atlas nodes | Japhug, Situ and Tshobdun share **one** code, `jya` ("Jiarong") | stated on all three nodes — the inverse of the Tamang case — see `[TB-105]` |
| Tibeto-Burman | Naxi's code | `nbf` does not exist; Naxi is `nxq` | code verified from the register, not recalled — see `[TB-105]` |
| Tibeto-Burman | Dongba script's status | "the Naxi have a pictographic script" (widely repeated) vs. the sources' own "rarely used in everyday life and few people are able to read Naxi" | ritual mnemonic separated from ordinary literacy, with the source's caution quoted — see `[TB-107]` |

---

## Deployment notes

### [DP-101] ⚠ The Pages build broke on Liquid parsing this file — fixed brace-free, plus `.nojekyll`

- **Symptom:** the GitHub Actions "pages build and deployment" run failed with
  `github-pages 232 | Error: Liquid error (line 980): wrong number of arguments (given 1, expected 2)`,
  immediately after the log line `Rendering: research.md`. The build aborts and nothing deploys.
- **Cause:** GitHub Pages renders markdown through Jekyll, and Jekyll renders it through Liquid.
  Liquid reads a **double opening brace** as a variable expression and treats a `|` inside it as a
  filter separator. The Koryo-mar `ref` field quoted at `[KO-108]` (a `citation needed` template
  carrying the argument `date=August 2013`) was therefore parsed as a variable piped through a
  filter, and Liquid's own `date` filter raised `ArgumentError: wrong number of arguments (given 1,
  expected 2)`. **This is a build-breaking bug, not a warning.**
- **Scope measured before fixing:** **nine** occurrences, every one of them verbatim MediaWiki
  template syntax logged while quoting Wikipedia infoboxes — seven in `research.md` (lines 792,
  936, 962, 980, 1016, 1022, 1079) and two in `languages.md` (lines 350–351). A repo-wide
  `grep -rn` for a double opening brace, or an opening brace followed by a percent sign, over
  `*.md`, `*.html`, `*.js` and `*.yml` returned **only those nine**. The atlas `.js` files and the
  `.html` app were never at risk: Jekyll copies any file without YAML front matter straight
  through untouched.
- **Fix applied — two parts:**
  1. **All nine rewritten brace-free**, under the new rule 8 above, keeping every piece of
     information: the *circa* template becomes `pub_date = circa October 1446` with the template
     named in parentheses; the *citation needed* template becomes `citation needed (dated August
     2013)`; the *sfnp* template becomes `sfnp citing Vovin 2013c, p. 201`; and so on. The one
     place that claimed a **verbatim** quote (`[TB-106]`, line 792) now states explicitly that the
     braces are omitted and names the three templates involved, so it is no longer presented as
     byte-exact.
  2. **`.nojekyll` added at the repo root.** This repo is a static HTML/JS app, not a Jekyll site,
     and the marker tells GitHub Pages to skip Jekyll altogether.
- **⚠ Caveat about `.nojekyll`, established by reading the action's source.** The
  `actions/jekyll-build-pages` action's `entrypoint.sh` — fetched 2026-09-26 from
  `raw.githubusercontent.com/actions/jekyll-build-pages/main/entrypoint.sh` — contains **no check
  for `.nojekyll`**; it unconditionally runs `github-pages build`. So `.nojekyll` is honoured by
  the **"Deploy from a branch"** publishing source (GitHub's documented behaviour) but is **not
  guaranteed** to be honoured on the Actions path this repo uses. **That is why the text fix was
  necessary rather than cosmetic: it is the part that is guaranteed to work.**
- **If the build ever breaks on Liquid again**, the durable options, best first:
  1. **Stop using Jekyll.** Settings → Pages → Build and deployment → Source: **GitHub Actions**,
     then add `.github/workflows/static.yml` that skips `jekyll-build-pages` entirely and uploads
     the repo root as-is. **Note the branch: this repo's default branch is `master`, not `main`, so
     the `on.push.branches` list below must say `master` or the workflow will never fire.**

     ```yaml
     name: Deploy static content to Pages
     on:
       push:
         branches: ["master"]
       workflow_dispatch:
     permissions:
       contents: read
       pages: write
       id-token: write
     concurrency:
       group: "pages"
       cancel-in-progress: false
     jobs:
       deploy:
         environment:
           name: github-pages
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v4
           - uses: actions/configure-pages@v5
           - uses: actions/upload-pages-artifact@v3
             with:
               path: "."
           - id: deployment
             uses: actions/deploy-pages@v4
     ```

     *(The `environment.url` field normally carries GitHub's `steps.deployment.outputs.page_url`
     expression. It is omitted here rather than written out, because the expression itself contains
     a brace pair and would reintroduce the very bug this entry documents — see rule 8. Add it back
     as the last line of the `environment:` block if the deployment URL display matters.)*
     **⚠ Do not add this workflow while the Pages source is still "Deploy from a branch"** — the
     `deploy-pages` step fails against a legacy-source site, so the workflow would fail on every
     push. Change the setting first.
  2. **Add `_config.yml` with `exclude:`** naming `languages.md`, `research.md` and `TODO.md`.
     Jekyll then never reads them, so nothing in them can break the build. Cost: the two ledgers
     stop being published as pages.
  3. **Follow rule 8** — what this session did — keeping the ledgers published and writing
     templates brace-free.
- **Verified after the fix — by reproducing the failure, not by inspection:**
  - `grep -rn` for a double opening brace, or an opening brace followed by a percent sign, across
    `*.md`, `*.html`, `*.js` and `*.yml` now returns **no matches**. There is no `_config.yml`, no
    `Gemfile` and no `.github/` directory in the repo, so nothing else can trigger a Liquid pass.
  - **The bug was reproduced and then shown fixed.** Liquid 5.3.0 was installed locally
    (`gem install liquid -v 5.3.0 --user-install`) and the two files were run through the same
    operation Jekyll performs on a markdown page — `Liquid::Template.parse(src, error_mode: :lax)`
    followed by `render!` with `strict_filters: false`. Result:
    - a synthetic file containing the original `ref` line → **`Liquid::ArgumentError: Liquid error:
      wrong number of arguments (given 1, expected 2)`** — *the exact error text from the Actions
      log*, which confirms the diagnosis rather than merely being consistent with it;
    - `research.md` (1229 lines) → **OK**;
    - `languages.md` (1009 lines) → **OK**;
    - `TODO.md` (16 lines) → **OK**.
  - **So the build will pass.** The `.nojekyll` marker is belt-and-braces for the branch-deploy
    path; the text fix is the load-bearing part.


## Append protocol (for the working session)

1. Run a search batch for **one** node group or claim cluster.
2. Immediately append the resulting `SR-###` entries here — before writing any atlas prose.
3. Then write the prose, referencing the log id where a claim is contested or surprising.
4. Update the counters table at the top of this file.
5. If a session is interrupted, the file — not the conversation — is the source of truth.

*Last updated: 2026-09-27 — Phases 0–6 complete, plus **Koreanic** (`KO-101`–`KO-109`), **Hmong–Mien** (`HM-101`–`HM-109`), **Turkic** (`TK-101`–`TK-112`) and **Formosan** (`FO-101`–`FO-108`) from Phase 7. Koreanic ships Jeju as its own node with the language-or-dialect question deliberately left open (`KO-101`, `KO-107`), and Chungcheong/Gangwon with their contested status stated in the prose rather than hidden (`KO-105`). Hmong–Mien ships two invented scripts as `nat` values with two new fonts registered (`HM-108`), **cuts** the brief's unverifiable "lantern writing" hook (`HM-107`), and reports a speaker-count conflict that exists *within a single source* (`HM-106`). Turkic was built to the **full-family scope** on instruction, against the brief's recommendation (`TK-101`), and is the widest atlas in the series — Istanbul to Yakutsk. It **does not draw Old Turkic as the trunk** (`TK-110`), states Khazar's branch as **disputed in its own source** and gives the whole surviving corpus rather than a summary (`TK-109`), and its link check was **measured rather than assumed** — four expected Omniglot pages turned out not to exist (`TK-110`). ⚠ **This session also found and fixed a log-namespace collision:** the Turkic entries were first written under `TU-`, which was already Tungusic's, and two of them had landed on the wrong side of the `## Disputed` heading (`TK-112`). **Formosan is the atlas that had to be drawn as a place rather than a family** — `acceptance = geographic`, `glotto = none`, "up to nine separate primary subfamilies" — so there is no Proto-Formosan trunk and the nine branches hang off the island as siblings (`FO-101`); **Tsouic ships with its own source's question mark** (`FO-103`), **Pazeh–Kaxabu ships extinct and alive in one node** (`FO-105`), **Yami and Tsat are drawn outside the nine branches because neither is Formosan** (`FO-106`), and link health was measured against **fourteen** Omniglot pages — the best-covered family in the series (`FO-107`). ⚠ **Formosan also produced this project's first prose defect: its reader-facing text was written in development jargon** — `infobox` 25×, "this node" 6×, ⚠ 30× — and was rewritten so it describes languages rather than the machinery that displays them, with nothing factual dropped (`FO-108`). **The rule is now in the per-atlas definition of done: read one whole node aloud before calling an atlas finished.** A cross-atlas `nat` rollout gave 59 non-Sinitic forms (`TB-111`/`TB-112`). **`DP-101` records the GitHub Pages deployment failure** — Jekyll's Liquid engine aborted the build on the MediaWiki template braces in this file's own citations — together with the brace-free logging rule (rule 8) that now prevents it, and the reproduction that verified the fix. Remaining: Austroasiatic in Phase 7, then the Siberian capstone in Phase 8. Phase 0.5 (Sinitic retrofit) is still skipped by instruction, so its 42 targets remain seeded and unchecked.*
