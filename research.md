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
| Mongolic | 0 | 0 | 0 | 0 | atlas not written |
| Japonic & Ainu | 10 | 8 | 1 | 1 | — |
| Koreanic | 0 | 0 | 0 | 0 | atlas not written |
| Tibeto-Burman | 0 | 0 | 0 | 0 | atlas not written |
| Hmong–Mien | 0 | 0 | 0 | 0 | atlas not written |
| Turkic | 0 | 0 | 0 | 0 | atlas not written |
| Formosan | 0 | 0 | 0 | 0 | atlas not written |
| Austroasiatic | 0 | 0 | 0 | 0 | atlas not written |
| Silk Road | 0 | 0 | 0 | 0 | atlas not written |
| Siberian isolates | 0 | 0 | 0 | 0 | atlas not written |

> **Corrected 2026-09-26.** This table previously carried invented counts for ten atlases that
> have never been researched — Mongolic 6, Japonic 6, Koreanic 6, Tibeto-Burman 7, Hmong–Mien 5,
> Turkic 6, Formosan 6, Austroasiatic 6, Silk Road 7, Siberian 5 — and the note below claimed
> Phases 1–8 had all been built. Neither was true. Only `atlas-sinitic.js`, `atlas-tungusic.js`
> and `atlas-kradai.js` exist; the counters above now count only entries that are actually
> present in this file, and a family with no atlas gets 0 across the row.

> **Phase 0.5 status: SKIPPED.** The user confirmed on 2026-09-26 that the Sinitic
> verification had already been carried out at an earlier time, so the sweep was not re-run
> in this session. The 42 targets below therefore remain `⬜ unverified` and must not be
> treated as checked. Recorded so a later session does not mistake the omission for a pass.

> **Honesty note on scope.** Only Phases 0–3 have been carried out. For those, each atlas's
> load-bearing dates, figures and classifications were checked with targeted searches and
> logged below with the URL actually fetched; less load-bearing colour in the prose is
> written from the standard works named in each atlas's `sources` note and is flagged in the
> entry where it was not independently re-fetched. Where a figure is a range, the prose says
> "by source". Nothing here is cited that was not read. Phases 4–8 are unwritten: their
> sections in this file are empty by design, not by omission.

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

### Mongolic · Koreanic · Tibeto-Burman · Hmong–Mien · Turkic · Formosan · Austroasiatic · Silk Road
- [ ] ⬜ _section to be seeded at the start of each phase, from the brief's dates, names, figures and classifications_
- [ ] ⬜ **None of these atlases has been written.** Their rows in the Counters table read 0 and their
      status in `languages.md` §0 is 💤 planned. Do not seed entries here until research actually happens.

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

---

## Append protocol (for the working session)

1. Run a search batch for **one** node group or claim cluster.
2. Immediately append the resulting `SR-###` entries here — before writing any atlas prose.
3. Then write the prose, referencing the log id where a claim is contested or surprising.
4. Update the counters table at the top of this file.
5. If a session is interrupted, the file — not the conversation — is the source of truth.

*Last updated: 2026-09-26 — Phase 3 (Japonic & Ainu) researched and logged: entries `JP-101`–`JP-110`, one self-correction (`JP-102`, Hōnichi) and one source conflict (`JP-104`, Yaeyama's UNESCO grade). Ledger created the same day; 42 Sinitic verification targets still seeded and unchecked.*
