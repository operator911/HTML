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
| Koreanic | 0 | 0 | 0 | 0 | atlas not written |
| Tibeto-Burman | 10 | 9 | 1 | 0 | — |
| Hmong–Mien | 0 | 0 | 0 | 0 | atlas not written |
| Turkic | 0 | 0 | 0 | 0 | atlas not written |
| Formosan | 0 | 0 | 0 | 0 | atlas not written |
| Austroasiatic | 0 | 0 | 0 | 0 | atlas not written |
| Silk Road | 10 | 9 | 1 | 0 | — |
| Siberian isolates | 0 | 0 | 0 | 0 | atlas not written |

> **Corrected 2026-09-26.** This table previously carried invented counts for ten atlases that
> have never been researched — Mongolic 6, Japonic 6, Koreanic 6, Tibeto-Burman 7, Hmong–Mien 5,
> Turkic 6, Formosan 6, Austroasiatic 6, Silk Road 7, Siberian 5 — and the note below claimed
> Phases 1–8 had all been built. Neither was true. The counters above now count only entries that
> are actually present in this file, and a family with no atlas gets 0 across the row.
>
> **Files on disk as of 2026-09-26:** `atlas-sinitic.js`, `atlas-tungusic.js`, `atlas-kradai.js`,
> `atlas-japonic.js`, `atlas-mongolic.js`, `atlas-silkroad.js` and `atlas-tibetoburman.js` —
> Phases 0–6. Their rows above are the only ones backed by an atlas; the remaining six families read
> 0 because nothing has been researched for them yet, not because a search came up empty.

> **Phase 0.5 status: SKIPPED.** The user confirmed on 2026-09-26 that the Sinitic
> verification had already been carried out at an earlier time, so the sweep was not re-run
> in this session. The 42 targets below therefore remain `⬜ unverified` and must not be
> treated as checked. Recorded so a later session does not mistake the omission for a pass.

> **Honesty note on scope.** Only Phases 0–6 have been carried out. For those, each atlas's
> load-bearing dates, figures and classifications were checked with targeted searches and
> logged below with the URL actually fetched; less load-bearing colour in the prose is
> written from the standard works named in each atlas's `sources` note and is flagged in the
> entry where it was not independently re-fetched. Where a figure is a range, the prose says
> "by source". Nothing here is cited that was not read. Phases 5–8 are unwritten: their
> sections in this file are empty by design, not by omission.
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

### Koreanic · Hmong–Mien · Turkic · Formosan · Austroasiatic
- [ ] ⬜ _section to be seeded at the start of each phase, from the brief's dates, names, figures and classifications_
- [ ] ⬜ **None of these atlases has been written.** Their rows in the Counters table read 0 and their
      status in `languages.md` §0 is 💤 planned. Do not seed entries here until research actually happens.

> **Silk Road (Phase 5) and Tibeto-Burman (Phase 6) have moved out of this queue** — their atlases
> are written and their logs (`SR-101`–`SR-110`, `TB-101`–`TB-111`) are below.

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
- **What the source says:** verbatim — "The Modern Yi script ({{lang|ii|ꆈꌠꁱꂷ}} {{transliteration|ii|''nuosu bburma''}} {{IPA|[nɔ̄sū bʙ̝̄mā]}} 'Nosu script') is a standardized [[syllabary]] derived from the classic script in 1974." and "There are 756 basic glyphs based on the Liangshan dialect, plus 63 for syllables only found in Chinese borrowings." The article also locates it: "Nuosu is mainly spoken in the [[Liangshan Yi Autonomous Prefecture]], [[Sichuan]]."
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
- **Engine note:** `nat` is a new optional node field, and `zhIsNative` a new optional atlas flag. The tree's script slot renders `nat` when present, and `zh` **only** in a `zhIsNative` atlas (Sinitic, where the characters *are* the native writing); a Chinese exonym instead rides on the **right** of the row behind a `中文` toggle that **defaults off**, so every non-Sinitic family reads English-only until asked. The info panel follows the same rule, `nat` in gold above the Chinese. The toggle is hidden entirely for Sinitic, where it would reveal nothing. This supersedes the first cut of this change, which had shown the Chinese inline in the script slot — the wrong place for an exonym. `atlas-tibetoburman.js` also gained `Noto Sans Devanagari` in `fonts` — Newar and Bodo are Devanagari-script, and the family had declared only Tibetan/Myanmar/Yi, so both would have rendered as tofu.
- **Verified:** `node tools/check-atlas.js atlas-tibetoburman.js` → valid, 56 nodes · 164 markers. Smoke test `#tibetoburman/lhasa`: **0 error markers**, font link now requests `Noto+Serif+Tibetan · Noto+Sans+Myanmar · Noto+Sans+Yi · Noto+Sans+Devanagari`, `.t-zh.nat` applied to exactly the fourteen, and the panel renders `བོད་སྐད་།` above `拉萨藏语`. Regression `#sinitic/yue` unchanged — Sinitic carries no `nat`, so its slot falls back to `zh` and its rows are byte-identical.

- **Rendered rows after the change** (toggle off — the default):
  - `lhasa` → `[བོད་སྐད་།] Lhasa Tibetan (Ü-Tsang) …… [拉萨藏语] [speakers]` — Chinese in the DOM, hidden by CSS
  - `qiang` → `[  ] Qiang …… [羌语] [speakers]` — empty script slot, English-only
  - Sinitic `yue` → `[粤] Yue (Cantonese) …… [speakers]` — no right slot at all; 粤 *is* the native script
  - Counts per atlas: Sinitic 43/43 script slots filled, toggle hidden · Tibeto-Burman 14 filled / 42 empty, 56 behind the toggle · the other five atlases 0 filled, all names behind the toggle.




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

## Append protocol (for the working session)

1. Run a search batch for **one** node group or claim cluster.
2. Immediately append the resulting `SR-###` entries here — before writing any atlas prose.
3. Then write the prose, referencing the log id where a claim is contested or surprising.
4. Update the counters table at the top of this file.
5. If a session is interrupted, the file — not the conversation — is the source of truth.

*Last updated: 2026-09-26 — Phase 6 (Tibeto-Burman) researched and logged: entries `TB-101`–`TB-111`, one logged dispute (`TB-109`, Karen's placement) and the series' most consequential caveat (`TB-101`: the grouping itself is not a demonstrated subgroup). The ISO register findings at `TB-105` are the richest of the series — five name mismatches, four splits and one lump. `TB-111` records a cross-atlas audit that found **all 237 nodes in all seven atlases carrying Han characters in the script slot and none carrying the native script**, and adds an optional `nat` field with fourteen verified Tibeto-Burman forms plus an explicit list of the forms deliberately not invented. Phases 0–6 complete; Phase 0.5 (Sinitic retrofit) skipped by instruction, so its 42 targets remain seeded and unchecked. Phases 7–8 not started: Hmong–Mien, Koreanic, Formosan, Turkic, Austroasiatic and the Siberian capstone.*
