/* atlas-kradai.js — Kra–Dai 壮侗 / 侗台语系
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (languages.md §1.3 contract, §2.3 brief,
 * research.md §"Kra–Dai (Phase 2)" for the evidence log — entries KD-101 … KD-109).
 *
 * ISO 639-3 codes below were checked against the SIL ISO 639-3 register itself
 * (iso-639-3.tab, https://iso639-3.sil.org/code_tables/download_tables,
 * retrieved 2026-09-26), not against secondary lists, and Zhuang's macrolanguage
 * membership against iso-639-3-macrolanguages.tab from the same source: `zha`
 * carries sixteen active members plus two retired codes and is presented as one
 * node with a "codes" chip, per §2.3. The family as a whole has no ISO 639-3
 * code — the collective `tai` of ISO 639-2/5 covers the Tai branch only — so the
 * root node carries none. There is likewise no plain "Gelao" code: only Green,
 * Red and White Gelao.
 *
 * Cross-links into the Sinitic atlas: #sinitic/ping (Pinghua's Zhuang contact),
 * #sinitic/yue, #sinitic/hainan, #sinitic/leizhou.
 *
 * ⚠ Research.md KD-108 records corrections made to this file after its first
 * draft (Saek's count, Bouyei's orthography date, Jiamao's count, location and
 * strata, two Lao claims). Read it before editing the affected nodes.
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree ===================== */
const DATA = {
 id:"kradai", en:"Kra–Dai", zh:"壮侗", py:"Zhuàng-Dòng yǔxì", sp:"≈93 million, by source",
 region:"Southern China, Hainan, Vietnam, Laos, Thailand, Myanmar, Northeast India",
 cls:"c-anc", mk:[],
 h:[`Kra–Dai — also written Tai–Kadai, and called 壮侗 or 侗台 in Chinese — is the family of the rice lowlands south of the Chinese heartland. Its speakers live in Guangxi, Guizhou, Yunnan, Hainan, Vietnam, Laos, Thailand, Myanmar and, in one remarkable outlier, Assam; an estimated 93 million people by source. It is one of the few families in this series to contain two state languages, Thai and Lao.`,
   `It is also the family that explains the southern edge of the Sinitic atlas. Han expansion southwards in the Qin and Han dynasties ran into Kra–Dai-speaking populations in the Pearl River basin, and the result is written into the Chinese dialects of the region: the <a href="#sinitic/ping">Pinghua</a> varieties of Guangxi are spoken in Zhuang country, <a href="#sinitic/yue">Yue</a> carries a substrate vocabulary that Austroasiatic and Kra–Dai specialists are still unpacking, and <a href="#sinitic/hainan">Hainanese</a> Min arrived on an island whose own languages are Hlai, Jiamao and Ong Be.`,
   `Classification is still unsettled at the top. The usual division is Kra, Kam–Sui, Hlai–Jiamao, Be–Jizhao and Tai — but Biao–Lakkia floats between them, Ong Be's position has never been fixed, and some scholars argue the whole family is better described as a contact-defined spread than as a clean tree. The family has no ISO 639-3 code of its own: <code>tai</code> covers the Tai branch, not the whole of Kra–Dai.`,
   `Its tones are the family's calling card. Proto-Tai is reconstructed with three contrastive tones on smooth syllables — conventionally *A, *B and *C — plus a checked-syllable category *D, and the modern languages have multiplied those categories in different directions, so that Thai has five tones and some Zhuang varieties have nine. This is the same tonogenesis machinery that produced the Chinese tones, which is why the two families are so often studied together.`],
 t:[["c. 214 BCE","Qin and Han expansion into Lingnan pushes Kra–Dai speakers south and west"],
    ["7th–13th c.","Tai-speaking kingdoms form in the Mekong and Chao Phraya basins"],
    ["1220s","Ahom Tai cross the Patkai into Assam and found a kingdom there"],
    ["1283 / 1351","Sukhothai, then Ayutthaya: Thai becomes a state language"],
    ["1893 / 1957 / 1982","Lao and Zhuang orthographies standardise in their modern forms"],
    ["2009","Dong “grand song” inscribed on UNESCO's Intangible Cultural Heritage list"]],
 kids:[
  { id:"protokd", en:"Proto-Kra–Dai", zh:"原始壮侗", py:"Yuánshǐ Zhuàng-Dòng", sp:"reconstructed",
    region:"By reconstruction, southern China — probably the Pearl River basin and its hinterland",
    cls:"c-anc", mk:[[23.13,113.26,"Pearl River delta (a proposed homeland centre)"],[24.31,109.41,"Guangxi inland (the other candidate zone)"]],
    h:[`The reconstructed ancestor, worked out chiefly from the Tai branch because Tai is by far the best documented. Li Fang-Kuei's <em>Handbook of Comparative Tai</em> (1977) established the comparative framework, and Pittayaporn's <em>The Phonology of Proto-Tai</em> (Cornell, 2009) is the modern full reconstruction: three contrastive tones on smooth syllables (*A, *B, *C) plus a checked-syllable category (*D), an elaborate initial system with voicing contrasts, and a monosyllabic core.`,
       `Whether "Proto-Kra–Dai" as a single ancestor is the right model is contested. The Kra languages in particular look different enough from Tai that some scholars treat the relationship as a spread zone rather than a family tree — the same caveat that hangs over Tungusic and over Sino-Tibetan. The tones, at least, are solid: they are what lets a reader line up a Zhuang word, a Thai word and a Dong word and see the same shape underneath.`],
   },
  { id:"kra", en:"Kra (仡央)", zh:"仡央语支", py:"Gē-Yāng yǔ zhī", sp:"≈20,000",
       region:"Western Guizhou, northern Guangxi, Yunnan and the Vietnam border", cls:"c-kra", mk:[],
       h:[`The Kra branch — 仡央 Gē-Yāng in Chinese — is the family's northern fringe: a scatter of very small languages in western Guizhou, northern Guangxi and the Yunnan–Vietnam borderlands, all under heavy Chinese, Zhuang or Vietnamese pressure. Gelao alone accounts for most of the branch's speakers, and even Gelao is a cluster of varieties rather than a language.`,
          `Kra is where the family's history is most visible as a retreat. Place-name evidence in Guizhou and Guangxi — hundreds of Kra-looking names for rivers, caves and villages — marks ground that Kra speakers have lost over the last millennium, and the surviving communities are usually bilingual in the surrounding majority language.`],
       kids:[
        { id:"gelao", en:"Gelao", zh:"仡佬语", py:"Gēlǎoyǔ", sp:"≈20,000 combined, by source",
          region:"Western Guizhou, northern Guangxi, Yunnan; Ha Giang in Vietnam", cls:"c-kra",
          mk:[[27.73,106.93,"Zunyi"],[26.25,105.93,"Anshun"],[27.03,106.03,"Qianxi"],[24.77,105.34,"Longlin (Guangxi)"],[23.37,104.24,"Wenshan (Yunnan)"]],
          h:[`Gelao is not one language but several: the ISO register distinguishes Green Gelao (<code>giq</code>), Red Gelao (<code>gir</code>) and White Gelao (<code>giw</code>), and further named varieties (Qau, A'ou, Mulao) sit alongside them with relationships still being worked out. Together they may amount to some twenty thousand speakers by source, spread across western Guizhou, northern Guangxi and the Yunnan–Vietnam border.`,
             `The varieties differ sharply, and some are close to the edge: several Gelao lects have only a few hundred speakers, and the Red Gelao varieties are among the most endangered languages in China. Speakers are usually bilingual in Chinese, Zhuang or Miao, and the language is no longer passed to children in most communities. Its interest to linguists is disproportionate to its size — Kra preserves consonant clusters and syllable types that the Tai branch simplified away, so Gelao is one of the main witnesses for what Proto-Kra–Dai looked like.`],
          t:[["c. 10th–13th c.","Kra-speaking territory in Guizhou shrinks as Chinese settlement advances"],
             ["1950s–","Gelao varieties surveyed; several distinguished as separate languages"],
             ["Today","Green, Red and White Gelao all endangered; Red Gelao critically so"]] },
        { id:"buyang", en:"Buyang", zh:"布央语", py:"Bùyāngyǔ", sp:"≈2,000, by source",
          region:"Wenshan and Guangnan, Yunnan; Ha Giang, Vietnam", cls:"c-kra",
          mk:[[24.05,105.00,"Guangnan (Yunnan)"],[23.63,105.63,"Funing"],[23.40,105.83,"Napo"],[22.83,104.98,"Ha Giang (Vietnam)"]],
          h:[`Buyang is a small Kra language of the Yunnan–Vietnam border, in Wenshan and Guangnan counties and across the frontier in Ha Giang. The ISO register names three varieties — Baha Buyang (<code>yha</code>), Langnian Buyang (<code>yln</code>) and E'ma Buyang (<code>yzg</code>) — each with a few hundred speakers, and all of them under pressure from Zhuang, Chinese and Vietnamese.`,
             `Buyang's fame in linguistics rests on a single, much-discussed feature: it preserves disyllabic and even sesquisyllabic word shapes that Tai reduced to monosyllables, which is why Buyang forms are regularly cited in reconstructions of Proto-Kra–Dai. A language with a thousand speakers is, in this case, load-bearing evidence for the whole family's prehistory.`],
          t:[["1950s–","Buyang varieties described; recognised as Kra rather than Tai"],
             ["1990s–","Buyang cited as key evidence for disyllabic Proto-Kra–Dai"],
             ["Today","All three varieties endangered, with few hundred speakers each"]] },
        { id:"lachi", en:"Lachi", zh:"拉基语", py:"Lājīyǔ", sp:"a few hundred, by source",
          region:"Maguan and Hekou, Yunnan; Ha Giang and Lao Cai, Vietnam", cls:"c-kra",
          mk:[[22.93,104.40,"Maguan (Yunnan)"],[22.51,103.94,"Hekou"],[22.83,104.98,"Ha Giang (Vietnam)"]],
          h:[`Lachi is a Kra language straddling the Yunnan–Vietnam border around Maguan and Hekou, with a Vietnamese population in Ha Giang and Lao Cai. The ISO register distinguishes Lachi (<code>lbt</code>) from White Lachi (<code>lwh</code>), a reminder that the Kra branch is still being sorted into languages.`,
             `Its speakers are typically bilingual in Chinese or Vietnamese, and Lachi is no longer being learned by children in most villages. It is one of the languages whose documentation has mostly happened in the last few decades, by Chinese and Vietnamese fieldworkers working against time.`],
          t:[["1900s–","Lachi recorded by Chinese and French-era fieldworkers"],
             ["Today","Endangered; transmission to children largely stopped"]] },
        { id:"laha", en:"Laha", zh:"拉哈语", py:"Lāhāyǔ", sp:"≈1,400, by source",
          region:"Son La and Lao Cai provinces, Vietnam", cls:"c-kra",
          mk:[[21.33,103.92,"Son La (Vietnam)"],[22.48,103.97,"Lao Cai (Vietnam)"]],
          h:[`Laha is the Kra language that stayed south of the border: a few thousand speakers in Son La and Lao Cai provinces of northern Vietnam, where it has been in contact with Tai (Black Tai and White Tai) and Vietnamese for centuries. Vietnamese scholarship treats Laha as one of the country's small Kra–Dai languages alongside Lachi and Qabiao.`,
             `As with the other Kra languages, the interest is comparative: Laha keeps initial clusters and a tone system that behaves differently from Tai, which makes it one of the checks on any reconstruction of the family's northern branch.`],
          t:[["1950s–","Laha surveyed within Vietnam's Kra–Dai inventory"],
             ["Today","Endangered; Vietnamese is the language of schooling and work"]] },
       ]},
  { id:"kamsui", en:"Kam–Sui (侗水)", zh:"侗水语支", py:"Dòng-Shuǐ yǔ zhī", sp:"≈1.9 million",
    region:"Eastern Guizhou, northern Guangxi and western Hunan", cls:"c-kam", mk:[],
    h:[`The Kam–Sui branch — 侗水 Dòng-Shuǐ — sits in the hill country where Guizhou, Guangxi and Hunan meet. It contains the family's most spectacular cultural survivor: the Dong villages of the Liping–Rongjiang basin, whose drum towers and polyphonic “grand song” choirs were inscribed on UNESCO's Intangible Cultural Heritage list in 2009. Sui, its neighbour, keeps a ritual writing system of its own.`],
    kids:[
     { id:"kam", en:"Kam (Dong)", zh:"侗语", py:"Dòngyǔ", sp:"≈1.5 million",
       region:"Guizhou (Rongjiang, Liping, Jinping), northeastern Guangxi and Tongdao, Hunan", cls:"c-kam",
       mk:[[25.93,108.52,"Rongjiang (Guizhou)"],[26.23,109.14,"Liping"],[25.78,109.61,"Sanjiang (Guangxi)"],[26.16,109.79,"Tongdao (Hunan)"],[26.68,109.20,"Jinping"]],
       h:[`Kam — <em>lix Gaeml</em> — is the language of the Dong 侗 people, with about 1.5 million speakers by source spread across Rongjiang, Liping, Jinping, Zhenyuan and Congjiang in Guizhou, Longsheng, Sanjiang and Rongshui in Guangxi, and Tongdao in Hunan. The ISO register splits it into Northern Dong (<code>doc</code>) and Southern Dong (<code>kmc</code>), plus Cao Miao (<code>cov</code>); Southern Dong, the more conservative variety, accounted for almost 1.5 million speakers in the 1990 language census.`,
          `Kam's grammar is unremarkable by Kra–Dai standards — monosyllabic, tonal, verb-medial — but its cultural footprint is enormous. Dong villages are famous for their drum towers (鼓楼) and wind-and-rain bridges, and above all for the <em>grand song</em> (侗族大歌), a polyphonic choral form sung without a conductor or instruments that UNESCO inscribed on the Representative List of the Intangible Cultural Heritage of Humanity in 2009. The songs are the traditional vehicle for the language's oral literature, and their decline tracks the language's own.`,
          `Kam has been written in a Latin orthography since the 1950s, based on the Southern Dong dialect of the Rongjiang area. As in the rest of the family, the written form has not stopped the shift to Chinese among younger speakers.`],
       t:[["1950s–","Latin orthography created for Kam; Dong-language publishing begins"],
          ["1990","Census counts almost 1.5 million Southern Dong speakers within a 2.5 million Dong population"],
          ["2009","“Grand song of the Dong ethnic group” inscribed on UNESCO's Intangible Cultural Heritage list"],
          ["Today","Vigorous in rural Dong villages, but shifting to Chinese among the young"]] },
     { id:"sui", en:"Sui", zh:"水语", py:"Shuǐyǔ", sp:"≈300,000",
       region:"Sandu, Libo and Dushan in Guizhou (93%); Rongshui and Nandan in Guangxi", cls:"c-kam",
       mk:[[25.98,107.87,"Sandu (Guizhou)"],[25.41,107.88,"Libo"],[25.83,107.55,"Dushan"],[25.07,109.26,"Rongshui (Guangxi)"]],
       h:[`Sui is spoken by about 300,000 people, 93% of them in Guizhou — above all in Sandu Shui Autonomous County and neighbouring Libo and Dushan — with smaller communities in Guangxi and Yunnan. Its Sandong 三洞 dialect accounts for the large majority of speakers, and it is the language's phonology that makes it famous: as many as seventy consonants in Sandong, including voiceless nasals (<em>hm</em>, <em>hn</em>), prenasalised stops (<em>mb</em>, <em>nd</em>), pre-glottalised stops and nasals, and a three-way place contrast in the stops.`,
          `The Sui are also the family's script keepers. The <em>Shuishu</em> 水書 is a ritual writing system used by Sui ritual specialists for divination, geomancy and funerary texts — a partly pictographic, partly phonetic script transmitted by hand-copying, with individual masters' versions differing from each other. It is not a general-purpose orthography, and it sits beside Latin script (used since the 1950s) and Chinese characters.`,
          `Sui villages are known for irrigated rice terraces and for a distinctive weaving and indigo tradition, and the language remains in daily use in the core Sandong area — one of the healthier situations in this atlas.`],
       t:[["1950s–","Latin orthography devised for Sui alongside the traditional Shuishu"],
          ["Today","≈300,000 speakers, 93% of them in Guizhou; Shuishu still used for ritual purposes"]] },
     { id:"maonan", en:"Maonan", zh:"毛南语", py:"Máonányǔ", sp:"≈30,000",
       region:"Huanjiang Maonan Autonomous County and Hechi, northern Guangxi", cls:"c-kam",
       mk:[[24.83,108.26,"Huanjiang (Guangxi)"],[24.70,108.06,"Hechi"]],
       h:[`Maonan is spoken in and around Huanjiang Maonan Autonomous County in northern Guangxi, by roughly 30,000 people out of a much larger ethnic Maonan population — the classic pattern in this region, where ethnic identity has outlasted the language. Its close relatives are Mulam to the east and Kam to the north.`,
          `Maonan is heavily influenced by Zhuang and Chinese: the sound system has borrowed tone categories and much of the vocabulary, to the point that some varieties are hard to classify by vocabulary alone. It is written, where it is written at all, in a Latin orthography developed in the 1980s, and Chinese is the language of schooling.`],
       t:[["1980s–","Latin orthography developed for Maonan"],
          ["Today","≈30,000 speakers, well below the ethnic population; UNESCO-style endangerment grading applies"]] },
     { id:"mulam", en:"Mulam", zh:"仫佬语", py:"Mùlǎoyǔ", sp:"≈50,000, by source",
       region:"Luocheng Mulao Autonomous County, Guangxi", cls:"c-kam",
       mk:[[24.78,108.90,"Luocheng (Guangxi)"],[24.50,108.65,"Yizhou"]],
       h:[`Mulam is the language of the Mulao 仫佬 of Luocheng Mulao Autonomous County in northern Guangxi, with a few tens of thousands of speakers by source. It is a Kam–Sui language, closest to Maonan and Kam, and like them it has absorbed a great deal of Zhuang and Chinese material over the centuries.`,
          `Mulam is one of the languages for which the distinction between "endangered" and "declining" matters: it is still spoken in villages by middle-aged and older people, but Chinese has taken over the home domain in most families, and the written form is recent and little used.`],
       t:[["1950s–","Mulam surveyed as a Kam–Sui language distinct from Zhuang"],
          ["Today","≈50,000 speakers by source; Chinese dominant among the young"]] },
     { id:"then", en:"Then (T'en)", zh:"佯僙语", py:"Yángguǎngyǔ", sp:"≈15,000, by source",
       region:"Huishui, Pingtang and Dushan, central Guizhou", cls:"c-kam",
       mk:[[26.13,106.65,"Huishui (Guizhou)"],[25.83,107.32,"Pingtang"],[25.83,107.55,"Dushan"]],
       h:[`Then — recorded in the ISO register as T'en (<code>tct</code>), and known in Chinese as 佯僙 Yángguǎng — is a Kam–Sui language of central Guizhou, in Huishui, Pingtang and Dushan counties. It is one of the family's least-known members: speakers are counted among the Bouyei or Han in some statistics, and the language was for a long time described as a variety of Bouyei rather than a language of its own.`,
          `Its position within Kam–Sui is well established now, and its importance is the usual one for small members of a family: it preserves material that its larger neighbours have lost, and it is a check on how far the Kam–Sui branch really extends northwards.`],
       t:[["1950s–","Then recorded and initially treated as a Bouyei variety"],
          ["1980s–","Recognised as a separate Kam–Sui language"],
          ["Today","≈15,000 speakers by source; shifting to Chinese"]] },
    ]},
  { id:"biaolakkia", en:"Biao–Lakkia", zh:"标话–拉珈语", py:"Biāo-Lājiā", sp:"≈89,000 combined, by source",
    region:"Eastern Guangxi (Jinxiu) and western Guangdong (Huaiji, Fengkai)", cls:"c-bla", mk:[],
    h:[`Biao–Lakkia is the family's most awkward corner, and it is included here precisely because the awkwardness is the point. Its two members sit at opposite ends of the same question — where does this language belong? — and neither answer is settled. Solnit (1988) grouped Biao and Lakkia together as a branch coordinate with Kam–Sui; L.-Thongkum (1992) thought Lakkia was closest to Tai; Norquest (2021) makes Biao–Lakkja the <em>first</em> branch to split off from Kra–Dai altogether.`,
       `The two are also connected by migration: Lakkia speakers are thought to have come from further east, possibly from the Biao-speaking country of north-western Guangdong, which would make the pair a historical unit as well as a classificatory one. Both live inside Chinese-speaking territory rather than on a frontier, and both are small, rural and under pressure.`],
    kids:[
     { id:"lakkia", en:"Lakkia", zh:"拉珈语", py:"Lājiāyǔ", sp:"≈9,000 (2007)",
       region:"Jinxiu Yao Autonomous County, Laibin, east-central Guangxi", cls:"c-bla",
       mk:[[24.13,110.19,"Jinxiu (Dayaoshan)"],[24.20,110.30,"Jintian"],[24.05,110.10,"Liula"],[24.25,110.35,"Lingzu"]],
       h:[`Lakkia — <code>lbc</code>, 拉珈语 Lājiāyǔ, also spelled Lakkja — is spoken by about 9,000 people in Jinxiu Yao Autonomous County in east-central Guangxi, in the Dayaoshan ("Big Yao Mountain") country. Its speakers are known to their neighbours as the Cháshān Yáo 茶山瑶, "Tea Mountain Yao", and the autonym <em>lakkia</em> itself means "mountain people" — a reminder that in this part of China ethnic labels and linguistic affiliations run on separate tracks.`,
          `There is no consensus on where Lakkia belongs. Solnit (1988) and Hansell (1988) place it as a sister of the Kam–Sui branch; Solnit pairs it with Biao in a Biao–Lakkia branch coordinate to Kam–Sui; L.-Thongkum (1992) argues from shared vocabulary that it is closest to Tai; and Norquest (2021) treats Biao–Lakkja as the earliest split in the whole family. All five dialects have five tones, and the Lingzu dialect still keeps the <em>/kl-/</em> initial clusters that most of the others have merged to <em>/kj-/</em> — the kind of conservative detail that makes a small language worth arguing about.`,
          `Lakkia speakers are thought to have migrated from further east, possibly from the Biao-speaking areas of north-western Guangdong. It has no traditional script, and Chinese is the language of schooling.`],
       t:[["1988","Solnit and Hansell place Lakkia with Kam–Sui; Solnit pairs it with Biao"],
          ["1992","L.-Thongkum argues for a closer link to Tai, and for an eastern origin for the speakers"],
          ["2007","≈9,000 speakers recorded in Jinxiu county"],
          ["2021","Norquest proposes Biao–Lakkja as the first branch to split off Kra–Dai"]] },
     { id:"biao", en:"Biao", zh:"标话", py:"Biāohuà", sp:"≈80,000 (2002)",
       region:"South-western Huaiji County and Fengkai County, Zhaoqing, Guangdong", cls:"c-bla",
       mk:[[23.90,112.10,"Huaiji (Shidong)"],[23.70,112.00,"Yonggu"],[23.45,111.90,"Dagang"],[23.42,111.50,"Fengkai"]],
       h:[`Biao — <code>byk</code>, 标话 Biāohuà, autonym <em>kaːŋ¹¹peu̯⁵⁵</em> — is spoken by about 80,000 people in south-western Huaiji County and in Fengkai County, in Zhaoqing, western Guangdong. Its speakers are officially classified as Han Chinese, which is why a language of 80,000 people in the Pearl River hinterland has been so little noticed; it may in fact be three languages rather than one, with the Shidong 诗洞, Yonggu 永固 and Dagang 大岗 varieties conventionally treated as dialects.`,
          `Biao's affiliation is as unresolved as Lakkia's: it could be a sister of Kam–Sui, it could subgroup with Lakkia, or it could be an independent branch of Kra–Dai in its own right (Hsiu 2014). It has no traditional script, and its ten tone categories are more than most of the family's languages carry.`,
          `Geographically Biao is the family's eastern outlier on the Chinese mainland — a Kra–Dai language surrounded entirely by Yue and Hakka-speaking Guangdong, far from any Tai or Kam–Sui speech community. Along with Ong Be and Jiamao, it belongs to the family's category of languages that survive inside somebody else's territory.`],
       t:[["1980s–","Biao recorded as a Kra–Dai language inside Han-classified Guangdong communities"],
          ["2002","≈80,000 speakers counted; the Shidong dialect described in detail"],
          ["2014–2021","Hsiu proposes a Lakkia or independent affiliation; Norquest groups Biao with Lakkja"],
          ["Today","≈80,000 speakers; no script; affiliation still disputed"]] }
    ]},
  { id:"hlai", en:"Hlai–Jiamao", zh:"黎语支", py:"Líyǔ zhī", sp:"≈750,000",
    region:"The mountains of central and south-central Hainan", cls:"c-hlai", mk:[],
    h:[`The Hlai branch is Hainan's own: the languages of the island's indigenous peoples, in the hills of Wuzhishan, Baoting, Ledong, Dongfang, Changjiang and Qiongzhong. The Hlai are not to be confused with the Leizhou Min variety also colloquially called 黎话 Líhuà — the one is a Kra–Dai family, the other a branch of Chinese, and they sit on opposite sides of the strait.`,
       `Hlai matters out of proportion to its size for two reasons. First, it is the family's only large island branch, and its internal diversity — Ha, Qi, Meifu, Run, Baoding, Tongzha and more — is a compressed record of a long settlement history on one island. Second, Jiamao sits inside it as a puzzle: a Kra–Dai language with a Hlai superstratum over a non-Hlai substratum, which no one has yet convincingly assigned.`],
    kids:[
     { id:"li", en:"Hlai (Li)", zh:"黎语", py:"Líyǔ", sp:"≈750,000, by source",
       region:"Wuzhishan, Baoting, Ledong, Dongfang, Changjiang and Qiongzhong, Hainan", cls:"c-hlai",
       mk:[[18.78,109.52,"Wuzhishan (Tongzha)"],[18.63,109.70,"Baoting"],[18.75,109.17,"Ledong"],[19.10,108.65,"Dongfang"],[19.30,109.05,"Changjiang"],[19.03,109.84,"Qiongzhong"]],
       h:[`Hlai — 黎语 Líyǔ, and <code>lic</code> in the ISO register, with Cun (<code>cuq</code>) as a closely related member — has some 750,000 speakers by source, which makes it the largest language of the island after Hainanese Min. Its main varieties are conventionally named Ha (哈), Qi (杞, also called Gei), Meifu (美孚), Run (润, also Běndì 本地), Baoding (保定) and Tongzha (通什), with further local lects in Baisha and Yuanmen; about a quarter of Hlai speakers are monolingual in Hlai.`,
          `None of the Hlai languages had a writing system until the 1950s, when a Latin orthography was adopted for the Ha variety — the basis of the modern literary form. Hlai villages are known for a distinctive material culture: the Li brocade and the tattoo traditions of the women, both now the subject of heritage protection, and the communal longhouse of the central highlands.`,
          `Hlai's situation is mixed by the standards of this atlas: a large speaker base and a strong ethnic identity, against a steady shift to Mandarin and Hainanese in the towns and among the young. The <a href="#sinitic/hainan">Hainanese</a> Min node in the Sinitic atlas sits on top of exactly this geography.`],
       t:[["110 BCE","Han commanderies established on Hainan; the island's Kra–Dai population retreats inland"],
          ["1950s","Latin orthography adopted for the Ha variety of Hlai"],
          ["1988","Hainan becomes a province; tourism and Mandarin spread rapidly"],
          ["Today","≈750,000 speakers; a quarter monolingual, but transmission weakening in towns"]] },
     { id:"jiamao", en:"Jiamao", zh:"加茂语", py:"Jiāmàoyǔ", sp:"≈50,000 (1987)",
       region:"Jiamao Township (Baoting) and Lingshui county, central and south-central Hainan", cls:"c-hlai",
       mk:[[18.63,109.70,"Jiamao (Baoting)"],[18.51,110.03,"Lingshui"],[18.40,109.75,"Haitangwan (Sanya)"],[18.55,109.60,"Liugong"]],
       h:[`Jiamao — <code>jio</code>, autonym <em>tʰai¹</em>, also written 台 Tái, 塞 Sāi or 加我 Jiāwǒ — is the family's standing puzzle: about 50,000 speakers by the 1987 count, in central and south-central Hainan, mostly in Jiamao Township in Baoting Li and Miao Autonomous County and in Lingshui county (Benhao, Nanping, Wenluo, Zuguan, Longguang, Tianzi), with villages in Sanya's Haitangwan. It is conventionally listed with the Hlai branch, and just as often described as a language isolate or an unclassified Kra–Dai language.`,
          `The reason is that Jiamao shares less than half its lexicon with the Hlai languages around it. Norquest (2007, 2015) identified lexical material in Jiamao that does not reconstruct to Proto-Hlai and concluded that the language is non-Hlai with a Hlai overlay; Thurgood (1992) had already suggested an Austroasiatic substratum; Hsiu (2018) notes words borrowed from an unknown, now extinct Tibeto-Burman branch; and Ostapirat (2026) proposes that Jiamao's ancestors moved to southern Hainan from northern Vietnam. Four dialects are recognised — Jiamao, Liugong, Tianzi and Qunying — and the language has eight tone categories, with the Proto-Be-like collapse of the B and C classes into a single X category.`,
          `Jiamao is therefore the clearest evidence in this atlas that a branch's apparent shape is partly the product of contact rather than descent. It is not mutually intelligible with the Hlai varieties surrounding it, and its speakers' own name for themselves is simply "Tai".`],
       t:[["1987","Survey counts ≈50,000 Jiamao speakers in central and south-central Hainan"],
          ["1992","Thurgood proposes an Austroasiatic substratum"],
          ["2007–2015","Norquest establishes Jiamao as non-Hlai within Kra–Dai"],
          ["2018–2026","Borrowings from an extinct Tibeto-Burman branch noted; a northern-Vietnam origin proposed"],
          ["Today","≈50,000 speakers; classified with Hlai but structurally apart"]] }
    ]},
  { id:"ongbe", en:"Ong Be (Lingao)", zh:"临高话", py:"Lín'gāohuà", sp:"≈600,000, of whom 100,000 monolingual",
    region:"The north-central Hainan coast, including the Haikou suburbs; Lingao, Chengmai, Danzhou", cls:"c-ong",
    mk:[[19.91,109.69,"Lingao"],[20.04,110.32,"Haikou"],[19.75,110.00,"Chengmai"],[19.52,109.58,"Danzhou"]],
    h:[`Be — <code>onb</code>, also known as Ong Be, Bê or 临高话 Lín'gāohuà — is spoken by about 600,000 people, a hundred thousand of them monolingual, along the north-central coast of Hainan, including the suburbs of the provincial capital Haikou. Its speakers refer to themselves as <em>ʔaŋ³³vo³³</em> — <em>ʔaŋ³³</em> the person prefix, <em>vo³³</em> "village" — and they are counted as Han Chinese in the census, which is why a language of 600,000 speakers is far less visible than its numbers would suggest. According to Ethnologue it is taught in primary schools, one of the few Kra–Dai languages of China for which that is claimed.`,
       `Its classification is the outstanding problem. Hansell (1988) argued from shared vocabulary that Be is a sister of the Tai branch, proposing a Be–Tai grouping; Ostapirat (1998) and Glottolog instead pair it with Jizhao, a Kra–Dai language of western Guangdong, as "Be–Jizhao"; and the register simply places it inside Kra–Dai with no settled parent. The Be record is also described as a pair of languages rather than one.`,
       `Ong Be sits in the same coastal strip as <a href="#sinitic/hainan">Hainanese</a> Min and the Yue-related 儋州话 Dānzhōuhuà noted in the Sinitic atlas's "unclassified" node — unrelated languages sharing one short stretch of Hainan's north coast.`],
    t:[["c. 110 BCE","Han commanderies on Hainan's north coast; Be speakers classified as Han"],
       ["1988–1998","Hansell proposes Be–Tai; Ostapirat argues for Be–Jizhao"],
       ["Today","≈600,000 speakers, 100,000 monolingual; position in Kra–Dai still unresolved"]] },
  { id:"tai", en:"Tai (台语)", zh:"台语支", py:"Táiyǔ zhī", sp:"≈90 million",
    region:"Guangxi, Guizhou and Yunnan; Vietnam, Laos, Thailand, Myanmar, Assam", cls:"c-tai", mk:[],
    h:[`The Tai branch is the family's centre of gravity — some ninety million speakers, two state languages, and a written tradition going back to the thirteenth century. It divides into three: Northern Tai (Zhuang, Bouyei, Saek), Central Tai (Nung, Tày and the Zhuang varieties of the Sino-Vietnamese border), and Southwestern Tai, which runs from Assam through Shan State and Yunnan to Thailand, Laos and southern Vietnam.`,
       `The three-way split is a geography as much as a genealogy. Northern and Central Tai are the languages of the Guangxi–Guizhou–northern-Vietnam massif; Southwestern Tai is the language of the river valleys that carried Tai speakers south and west into the Mekong and Chao Phraya basins, and eventually into Assam.`],
    kids:[
     { id:"ntai", en:"Northern Tai", zh:"北部台语", py:"Běibù Táiyǔ", sp:"≈18 million",
       region:"Guangxi, southern Guizhou and northern Vietnam", cls:"c-ntai", mk:[],
       h:[`Northern Tai is the branch of the Zhuang and Bouyei — the largest single concentration of Kra–Dai speakers anywhere, in the karst country of Guangxi and southern Guizhou. It also reaches into Laos and Thailand through Saek, a small language stranded far to the south of its relatives.`],
       kids:[
        { id:"zhuang", en:"Zhuang", zh:"壮语", py:"Zhuàngyǔ", sp:"≈15.9 million, by source",
          region:"Guangxi and eastern Yunnan; a macrolanguage of sixteen ISO codes", cls:"c-ntai",
          mk:[[22.82,108.32,"Nanning"],[23.16,108.28,"Wuming (standard Zhuang base)"],[23.90,106.62,"Baise"],[22.38,107.36,"Chongzuo"],[24.31,109.41,"Liuzhou"],[23.13,106.42,"Jingxi"],[22.34,106.85,"Longzhou"],[23.37,104.24,"Wenshan (Yunnan)"]],
          h:[`Zhuang is the largest language in this atlas and the second-largest minority language in China, with about 15.9 million speakers of the northern varieties by source — though that figure covers what is officially a macrolanguage rather than a single speech form. The ISO register gives Zhuang one code (<code>zha</code>, with ISO 639-1 <code>za</code>) over sixteen active individual language codes — Central, Eastern and Guibei Hongshuihe, Dai (Wenma), Guibian, Lianshan, Liujiang, Liuqian, Minz, Nong (Yanguang), Qiubei, Yang, Yongbei, Yongnan, Youjiang and Zuojiang Zhuang — with two older codes since retired. Glottolog's own note is blunt: "Zhuang is not a valid group".`,
             `Standard Zhuang is based on the Yongbei (Wuming) variety and was written in a Latin alphabet created in 1957 and revised in 1982, using a tone-letter convention on the syllable final. Beside it stands <em>sawndip</em> 方块壮字 — "raw/uncooked characters" — a script made of Chinese characters adapted and invented to write Zhuang sounds, in use for over a thousand years for songs, land deeds and ritual texts. Sawndip is one of the great vernacular writing traditions of East Asia, and it is still read by a diminishing number of specialists.`,
             `Zhuang country is also where the Sinitic atlas's southern border is drawn. <a href="#sinitic/ping">Pinghua</a> speakers in Guangxi are frequently Zhuang by ancestry speaking a Chinese variety; <a href="#sinitic/yue">Yue</a> contains Zhuang and broader Kra–Dai substrate material; and the Zhuang themselves have shifted to Southwestern Mandarin in the cities. The 1957 and 1982 romanisations, the Zhuang-language schools of the 1950s–80s, and the state's minority-language publishing programme are all attempts to hold that line.`],
          t:[["c. 214 BCE","Qin conquest of Lingnan; the Luo Yue population comes under Chinese administration"],
             ["pre-20th c.","Sawndip characters used for Zhuang songs, deeds and ritual texts"],
             ["1957","Latin-based Standard Zhuang alphabet created"],
             ["1982","The Zhuang alphabet is revised to its current form"],
             ["Today","≈15.9 million northern-variety speakers by source; urban shift to Mandarin continues"]] },
        { id:"bouyei", en:"Bouyei", zh:"布依语", py:"Bùyīyǔ", sp:"≈2.7 million (2000 census)",
          region:"Qianxinan, Qiannan and Anshun, southern Guizhou; also Yunnan, Sichuan and Vietnam (Giay)", cls:"c-ntai",
          mk:[[25.09,104.90,"Xingyi (Qianxinan)"],[26.26,105.79,"Anshun"],[25.43,107.55,"Dushan (Qiannan)"],[26.58,107.98,"Kaili"],[25.85,106.75,"Wangmo (script base)"]],
          h:[`Bouyei — <code>pcc</code>, autonym <em>Haausqyaix</em> — is spoken by about 2.7 million people by the 2000 census, roughly 98% of them in southern Guizhou, in the Qianxinan and Qiannan autonomous prefectures, Anshun and Guiyang's rural counties, with speakers also in Yunnan and Sichuan and a Vietnamese branch known as Giay (Giáy). It is the closest relative of Zhuang, and the two are conventionally treated together as Northern Tai; the boundary between Bouyei and the Zhuang of Guangxi is a political frontier as much as a linguistic one.`,
             `Bouyei's script history is unusually layered. There is an old character-based Bouyei script of the sawndip type, used for songs and documents; a first Latin-based orthography was created in the 1950s under a policy that sought a joint Bouyei–Zhuang script; and when that alliance policy was abandoned in 1981, a new Bouyei script was designed between 1981 and 1985 on the basis of the Wangmo County dialect. That 1980s orthography is the one in use today.`,
             `As everywhere in this region, schooling and urban employment are in Southwestern Mandarin, and Bouyei transmission has narrowed to rural households — the familiar gap between an ethnic population and its speakers.`],
          t:[["1950s","First Latin-based Bouyei orthography created under a joint Bouyei–Zhuang script policy"],
             ["1981–1985","The joint policy is abandoned and the current Bouyei script is designed on the Wangmo County dialect"],
             ["2000","Census records ≈2.7 million speakers, about 98% in China"],
             ["Today","Guizhou's largest minority language; transmission increasingly rural"]] },
        { id:"saek", en:"Saek", zh:"石语", py:"Shíyǔ", sp:"≈10,000 (2007–2015), by source",
          region:"Khammouane, Laos (≈10 villages); Nakhon Phanom, Thailand (≈4 villages)", cls:"c-ntai",
          mk:[[17.40,104.80,"Thakhek (Khammouane)"],[18.30,103.90,"Bolikhamxay"],[17.40,104.79,"Nakhon Phanom (Thailand)"],[17.60,104.40,"Ban Ba Wa Saek"]],
          h:[`Saek — <code>skb</code> — is the great outlier of Northern Tai: about 10,000 speakers in at least ten villages of Khammouane province in Laos and four villages of Nakhon Phanom province in Thailand, just across the Mekong. Its position is hundreds of kilometres south of the Bouyei and Zhuang, which makes it the strongest single piece of evidence that the Tai move south was not one migration but a long series of them, some of which left Northern Tai speakers behind in the middle Mekong.`,
             `Saek's importance is documentary as much as linguistic. William J. Gedney recorded the language in the 1960s–70s, and his glossary and texts, published as the <em>Concise Saek–English, English–Saek Lexicon</em> (Hudak &amp; Gedney, 2010), with the tone splits Gedney worked out, are the foundation of comparative Tai studies. The tone categories of Saek — six tones distributed across the Proto-Tai A/B/C/D classes in a pattern that differs from its neighbours — are one of the standard checkpoints in reconstructing Proto-Tai.`,
             `UNESCO's <em>Atlas of the World's Languages in Danger</em> classifies Saek as severely endangered. Younger speakers in the Thai villages use Lao, Isan or Central Thai, and the language is described as all but disappearing outside the oldest generation.`],
          t:[["1960s–70s","William Gedney records Saek villages in Nakhon Phanom"],
             ["2010","Hudak &amp; Gedney publish the concise Saek lexicon; the language enters comparative Tai as a standard reference point"],
             ["Today","≈10,000 speakers; classified severely endangered; young speakers shift to Lao, Isan or Thai"]] },
       ]},
     { id:"ctai", en:"Central Tai", zh:"中部台语", py:"Zhōngbù Táiyǔ", sp:"≈4 million",
       region:"The Sino-Vietnamese borderlands: Cao Bang, Lang Son, Bac Kan; Guangxi and Yunnan", cls:"c-ctai", mk:[],
       h:[`Central Tai is the middle term of the Tai triad, and the hardest to draw. Its members sit on both sides of the Guangxi–Vietnam border: the Zhuang varieties of the Sino-Vietnamese uplands (Nong, Yang, Dai Wenma), and the Vietnamese languages Nung and Tày. Because Zhuang is officially one macrolanguage, some of Central Tai's members are counted inside Zhuang's sixteen ISO codes rather than standing beside it.`,
          `The Vietnamese members have the family's longest experience of a national Latin script: Nung and Tày are written in the Vietnamese alphabet, and Tày in particular has a modern literary tradition, including the <em>Then</em> songs and <em>sl</em>-poetry that Vietnamese scholarship has promoted as national heritage.`],
       kids:[
        { id:"tay", en:"Tày", zh:"岱语", py:"Dàiyǔ", sp:"≈1.8 million",
          region:"Cao Bang, Lang Son, Bac Kan, Thai Nguyen and Quang Ninh, northern Vietnam", cls:"c-ctai",
          mk:[[22.67,106.26,"Cao Bang"],[21.85,106.76,"Lang Son"],[22.15,105.83,"Bac Kan"],[21.59,105.84,"Thai Nguyen"]],
          h:[`Tày — <code>tyz</code> — is the largest minority language of northern Vietnam, with about 1.8 million speakers in Cao Bang, Lang Son, Bac Kan, Thai Nguyen and Quang Ninh, plus a considerable presence in Ho Chi Minh City. Its speakers are the lowland Tai of the Vietnamese far north, in the same valleys as the Nung but conventionally distinguished from them by history and by their script: Tày is written with the Vietnamese Latin alphabet, and it has a substantial modern literature, including the <em>Then</em> ritual songs and <em>sl</em> poem tradition that Vietnamese scholarship treats as heritage.`,
             `Tày's relationship to the Zhuang of Guangxi across the border is the reason it matters here: Vietnamese Tày and the Central Tai Zhuang varieties form a dialect continuum in all but name, which is why both "Tày–Nung" and "Central Tai" appear as labels for the same speech area. Its ISO record also includes Cao Lan (<code>mlc</code>), sometimes treated as a separate language.`],
          t:[["19th c.–","Tày written in the Vietnamese alphabet; Then and sl literature recorded"],
             ["1950s–","Tày taught and published in northern Vietnam"],
             ["Today","≈1.8 million speakers; Vietnamese dominant in schools and cities"]] },
        { id:"nung", en:"Nung", zh:"侬语", py:"Nóngyǔ", sp:"≈1 million",
          region:"Cao Bang, Lang Son and Ha Giang, northern Vietnam; Guangxi and Yunnan", cls:"c-ctai",
          mk:[[22.67,106.26,"Cao Bang"],[21.85,106.76,"Lang Son"],[22.83,104.98,"Ha Giang"],[22.34,106.85,"Longzhou (Guangxi)"]],
          h:[`Nung is Tày's neighbour and near-relative in the Vietnamese highlands — about a million speakers in Cao Bang, Lang Son and Ha Giang, and in the borderlands of Guangxi and Yunnan — and the name covers a cluster of varieties: Nùng An, Nùng Giang, Nùng Inh, Nùng Lòi, Nùng Phàn Slình, Nùng Qúy Rin and Nùng Xuồng. Speakers of Zhuang's Nong (Yanguang) variety across the border are counted within the Zhuang macrolanguage, which is why the same speech community can appear under two different names depending on which side of the frontier it is counted.`,
             `The Tày–Nung distinction in Vietnamese ethnography is historical rather than linguistic: the Tày are the older Tai population of the northern valleys, the Nung the more recent arrivals associated with the eighteenth-century Nung migrations. In practice many speakers identify by locality rather than by either label.`],
          t:[["18th c.","Nung migrations into northern Vietnam from Guangxi"],
             ["1950s–","Tày and Nung listed as separate official ethnic groups"],
             ["Today","≈1 million speakers; varieties cross the Chinese border"]] }
       ]},
     { id:"stai", en:"Southwestern Tai", zh:"西南台语", py:"Xīnán Táiyǔ", sp:"≈70 million",
       region:"Assam, Shan State, Yunnan, Laos, Thailand, northern Vietnam", cls:"c-stai", mk:[],
       h:[`Southwestern Tai is the branch that made states. From the thirteenth century onwards its speakers moved down the river valleys of mainland Southeast Asia — the Chao Phraya, the Mekong, the Salween and the Irrawaddy — and by the eighteenth century Tai-speaking courts ruled from Assam to the Malay peninsula. Thai and Lao are the modern national languages of that expansion; Shan, Tai Lue, Tai Nüa, Tai Dam, Khün and Phu Thai are its surviving regional forms.`,
          `Linguistically the branch is conservative in its tones and its writing systems, which all descend from an Indic-derived script family and are still recognisably related across a thousand miles: Thai, Lao, Shan, Lue, Nüa, Khün and Ahom. This is the reason a Tai reader of one tradition can often decipher the letter shapes of another, even where the languages have drifted apart.`],
       kids:[
        { id:"thai", en:"Thai (Siamese)", zh:"泰语", py:"Tàiyǔ", sp:"≈27 million L1; ≈60 million total",
          region:"Central Thailand; standard language of the country", cls:"c-stai",
          mk:[[13.75,100.50,"Bangkok"],[14.03,100.53,"Ayutthaya"],[18.79,99.00,"Chiang Mai"],[16.43,102.83,"Khon Kaen"],[7.19,100.60,"Songkhla"],[14.35,100.57,"Ratchathani"]],
          h:[`Thai — Siamese, <code>tha</code> — is the standard national language of Thailand and the largest Tai language, with roughly 27 million first-language speakers and a much larger total in a country of about 70 million, where it is the language of education, government and broadcasting. It is a Kra–Dai language and not, as is sometimes assumed abroad, related to Chinese or to Khmer; its vocabulary has nevertheless borrowed heavily from Sanskrit, Pali and Khmer, and the script is ultimately of Indian derivation.`,
             `The Thai script was devised in the thirteenth century, and the traditional attribution of its invention to King Ramkhamhaeng of Sukhothai (the Ram Khamhaeng inscription is conventionally dated 1292) is the founding statement of Thai national historiography — though the inscription's authenticity has been argued over since the 1980s. The modern writing system distinguishes 44 consonants, 32 vowels and 5 tones, with consonant classes and tone marks doing much of the tonal work; the same script family is shared, with local modifications, by Lao, Shan, Lue, Nüa, Khün and, historically, Ahom.`,
             `Thai has a second dimension that no other language in this atlas has: a rich apparatus of registers and pronouns keyed to relative social status, which makes it the standard example of a language whose grammar encodes hierarchy. The Central Thai of the Bangkok region is the standard; Northern Thai (Kam Mueang), Southern Thai and the Northeastern varieties close to Lao are the main regional forms, along with Khün, Phu Thai and the other Southwestern Tai languages that share the country's territory.`],
          t:[["13th c.","Sukhothai; the Thai script and the Ram Khamhaeng inscription"],
             ["1350–1767","Ayutthaya; Thai established as the court language"],
             ["1782–","Bangkok period; modern standardisation and printing"],
             ["1932–","Standard Thai consolidated in schools and the civil service"],
             ["Today","≈27 million first-language speakers; the standard for a country of ≈70 million"]] },
        { id:"lao", en:"Lao", zh:"老挝语", py:"Lǎowōyǔ", sp:"≈3.4 million in Laos, by source",
          region:"Laos (national language); northeastern Thailand (Isan); Cambodia and Vietnam", cls:"c-stai",
          mk:[[17.97,102.60,"Vientiane"],[19.89,102.13,"Luang Prabang"],[16.56,104.75,"Savannakhet"],[15.12,105.80,"Champasak"],[16.43,102.83,"Isan (Thailand)"]],
          h:[`Lao — <code>lao</code> — is the national language of Laos and the westernmost major member of the Tai branch, with about 3.4 million speakers in Laos by source, plus several million more in northeastern Thailand, where the closely related Isan varieties are officially counted as Thai dialects. Lao and Thai are mutually intelligible to a considerable degree, especially in their written forms, and the two countries' standard languages diverged more through twentieth-century spelling reform and vocabulary policy than through natural drift.`,
             `The Lao script belongs to the same Indic-derived Tai family as Thai and Shan, and Lao orthography was simplified in the mid-twentieth century, dropping some letters that Thai retains. Lao has a classical literature — the epic <em>Sin Xay</em>, the Lao Ramayana <em>Phra Lak Phra Lam</em>, the epic of Thao Hung Thao Cheuang — which survives chiefly in palm-leaf manuscripts and folios, copied by hand in monastery scriptoria in a tradition in which copying a text was itself an act of merit. Laos is also home to dozens of other languages — Khmu, Hmong, Tai Dam, Saek and more — which is why Lao functions as a lingua franca as much as a mother tongue.`],
          t:[["1353","Lan Xang founded; Lao emerges as a court language"],
             ["1893–1953","French protectorate; Lao orthography and schooling standardised"],
             ["1950s–","Lao confirmed as the national language after independence"],
             ["Today","≈3.4 million in Laos; several million more speakers of Isan in Thailand"]] },
        { id:"shan", en:"Shan", zh:"掸语", py:"Shànyǔ", sp:"≈3.3 million, by source",
          region:"Shan State, Myanmar; Dehong, Yunnan; northern Thailand", cls:"c-stai",
          mk:[[20.79,97.04,"Taunggyi"],[21.98,96.08,"Mandalay Shan area"],[24.00,97.90,"Dehong (Yunnan)"],[19.30,97.97,"Mae Hong Son (Thailand)"],[22.01,99.70,"Kengtung"]],
          h:[`Shan — <code>shn</code>, and <em>Tai Yai</em> to its speakers — is the language of Shan State in eastern Myanmar, with about 3.3 million speakers by source and further communities in Dehong in Yunnan and in northern Thailand. It is the eastern wing of the Southwestern Tai branch, and the Shan States were for centuries a set of Tai-speaking principalities under Burmese suzerainty, with their own sawbwas, courts and manuscript culture.`,
             `Shan is written in a script of the Tai family, historically close to that of Tai Lue and Tai Nüa, and it has a substantial manuscript literature: chronicles, Buddhist texts and legal codes copied on palm leaf and <em>parabaik</em>. Its modern history is inseparable from Myanmar's civil conflicts — the Panglong Agreement of 1947 promised Shan autonomy, the 1962 coup ended the arrangement, and decades of armed conflict since have made Shan State one of the most linguistically and politically fractured regions of Southeast Asia.`,
             `Several Shan-related codes are recognised separately in the ISO register, including Tai Nüa and Tai Lue, which are covered as their own nodes in this atlas.`],
          t:[["13th–19th c.","Tai principalities across the Shan hills and into Yunnan"],
             ["1947","Panglong Agreement promises autonomy to the Shan States"],
             ["1962","The agreement lapses after the coup; decades of conflict follow"],
             ["Today","≈3.3 million speakers, split across Myanmar, China and Thailand"]] },
        { id:"tailue", en:"Tai Lue (Xishuangbanna Dai)", zh:"傣仂语", py:"Dǎilèyǔ", sp:"≈550,000–700,000, by source",
          region:"Xishuangbanna, Yunnan; Shan State; Laos; northern Thailand; northern Vietnam", cls:"c-stai",
          mk:[[22.01,100.79,"Jinghong (Xishuangbanna)"],[21.98,99.30,"Menglian"],[21.30,100.30,"Muang Sing (Laos)"],[20.05,99.90,"Chiang Rai (Thailand)"],[22.01,99.70,"Kengtung (Shan State)"]],
          h:[`Tai Lue — <code>khb</code>, <em>kam tai lue</em>, and in Chinese 西双版纳傣语 Xīshuāngbǎnnà Dǎiyǔ — is the language of the Tai Lue of Xishuangbanna and its neighbours: about 550,000 speakers by Ethnologue's 2000–2013 figures, distributed across Yunnan (≈280,000), Myanmar (≈200,000), Laos (≈134,000), Thailand (≈83,000) and Vietnam (≈5,000), with the total often put nearer 700,000.`,
             `Its writing systems are the family's clearest illustration of how one script can fork. The traditional forms are <em>Tham</em>, the "dharma" script of the Buddhist manuscript tradition shared with Lanna and Laos, and the older <em>Fak Kham</em> ("tamarind-seed script"); in the twentieth century Chinese authorities introduced <em>New Tai Lue</em>, a reformed alphabet now in Unicode and used in Yunnan's schools, while Thai and Tai Tham orthographies remain in use in the other countries.`,
             `Tai Lue is a Chiang Saen-branch language, close to Khün and to Northern Thai. It was the language of the Lue kingdom of Chiang Hung (Jinghong) and of the Tai Lue principalities of the Sipsong Panna, whose Buddhist manuscript culture — copied on palm leaf in Tham script — is one of the great repositories of Tai literature.`],
          t:[["13th c.–","Chiang Hung (Jinghong) and the Sipsong Panna principalities"],
             ["19th–20th c.","Tai Lue communities dispersed across Burma, Laos, Thailand and Vietnam"],
             ["1950s–","New Tai Lue alphabet developed in China; Tham and Thai scripts continue elsewhere"],
             ["Today","≈550,000–700,000 speakers across five countries"]] },
        { id:"tainua", en:"Tai Nüa (Dehong Dai)", zh:"傣那语", py:"Dǎinàyǔ", sp:"≈720,000 (1983–2007), by source",
          region:"Dehong, Yunnan (co-official); Shan State; northern Thailand; Laos", cls:"c-stai",
          mk:[[24.44,98.58,"Mangshi (Dehong)"],[24.00,97.90,"Ruili"],[22.00,99.00,"Menglian"],[22.01,99.70,"Kengtung (Shan State)"]],
          h:[`Tai Nüa — <code>tdd</code>, also Tai Le or Tai Ne, Chinese 傣那语 Dǎinàyǔ — is the Tai language of Dehong prefecture in western Yunnan, where it is co-official alongside Chinese, with about 720,000 speakers by source across China, Myanmar, Thailand and Laos. It belongs to the Northwestern group of Southwestern Tai, alongside Shan and Ahom, and its varieties are conventionally divided between the Mangshi and Menglian types.`,
             `Tai Nüa's script is the <em>Tai Le</em> alphabet, traditionally written on palm leaf and paper, and given a reformed, Unicode-encoded form in the twentieth century. Its manuscript tradition includes Buddhist texts, chronicles and correspondence between the Dehong chieftaincies and the Burmese and Chinese courts, and it is one of the languages in which the "Tai" of the frontier can be read as a written record rather than only as a speech form.`,
             `Dehong is the part of China where Shan, Jingpo, Achang, Wa and Han Chinese all meet, and Tai Nüa has been the region's prestige language for centuries — which is why its writing system, not its speaker numbers, is what makes it visible on a map of Chinese minority languages.`],
          t:[["13th c.–","Tai principalities of Dehong; Tai Le script in use"],
             ["20th c.","Tai Le alphabet reformed and later encoded in Unicode"],
             ["Today","≈720,000 speakers; co-official in Dehong prefecture"]] },
        { id:"taidam", en:"Tai Dam (Black Tai)", zh:"黑傣语", py:"Hēidǎiyǔ", sp:"≈760,000 (1995–2002), by source",
          region:"Vietnam (Son La, Lai Chau, Dien Bien); Laos; Thailand (as Thai Song); Jinping, Yunnan", cls:"c-stai",
          mk:[[21.33,103.92,"Son La (Vietnam)"],[21.39,103.02,"Dien Bien"],[22.39,103.46,"Lai Chau"],[22.71,103.16,"Jinping (Yunnan)"],[13.55,100.27,"Thai Song (central Thailand)"]],
          h:[`Tai Dam — <code>blt</code>, "Black Tai", Chinese 傣担语 Dǎidānyǔ — is a Chiang Saen-branch language of about 760,000 speakers by source, spoken in north-western Vietnam (Son La, Lai Chau, Dien Bien), in Laos, in Jinping county in Yunnan, and in central and western Thailand, where the same language is known as Thai Song.`,
             `The Black Tai belong to the group of Tai peoples whom Vietnamese ethnography calls the Thái — Black Tai, White Tai and Red Tai, distinguished by the colours of their women's clothing rather than by linguistic criteria. In Vietnam all Tai peoples are taught a standardised Tai language based on the Black Tai variety, which gives Tai Dam a formal role that its neighbour Tày does not have; in China, Tai Dam speakers are counted within the Dai nationality alongside most other Tai groups.`,
             `Tai Dam is written in the <em>Tai Viet</em> script, and its history is bound up with the Sip Song Chau Tai — the "twelve Tai chieftaincies" of the Vietnam–Laos borderland, whose lords were a political force in the region into the twentieth century. Unlike Thai and Lao, Tai Dam has almost none of the Khmer, Pali and Sanskrit vocabulary that those languages borrowed, which makes it noticeably harder for Thai and Lao speakers to follow despite the shared Tai core.`],
          t:[["16th c.–","The Sip Song Chau Tai chieftaincies form in the Vietnam–Laos borderlands"],
             ["19th–20th c.","Black Tai, White Tai and Red Tai consolidated as Vietnamese Thái groups"],
             ["20th c.","Tai Viet script; a standardised Tai language based on Black Tai is taught in Vietnam"],
             ["Today","≈760,000 speakers across Vietnam, Laos, Thailand and China"]] },
        { id:"ahom", en:"Ahom", zh:"阿豪姆语", py:"Āháomǔyǔ", sp:"extinct as a spoken vernacular; a learned second language",
          region:"Assam, India — Sibsagar, Dibrugarh, Jorhat and the Brahmaputra valley", cls:"c-ext",
          mk:[[26.98,94.63,"Sibsagar"],[27.47,94.91,"Dibrugarh"],[26.75,94.22,"Jorhat"],[26.14,91.73,"Guwahati"],[27.10,95.30,"Patkai passes (entry route)"]],
          h:[`Ahom — <code>aho</code>, <em>khwám tái ahüm</em> — is the westernmost Tai language on the map and the most surprising: the language of the Ahom kingdom that ruled Assam from the thirteenth century until the British annexation in 1826, it ceased to be a spoken vernacular in the eighteenth or nineteenth century as the Ahom court and nobility shifted to Assamese. It survives as a ritual and scholarly language, used in religious ceremonies and, in the last few decades, taught again in Assam's universities.`,
             `The Ahom crossed the Patkai range from the Tai homelands into the Brahmaputra valley in the 1220s and founded a kingdom that lasted six centuries, defeating Mughal armies repeatedly — most famously at Saraighat in 1671. Their language belongs to the Northwestern group of Southwestern Tai, closest to Shan and Tai Nüa, which means a Tai speaker from Myanmar is a closer linguistic relative of Ahom than any language of India is.`,
             `Its script, the <em>Ahom script</em>, is a Tai script of the same family as Shan and Thai, and the Ahom chronicles — the <em>Buranji</em> — are written in it, in a manuscript tradition that Assamese historians have used to reconstruct the kingdom. Because the language died out of daily use, the Buranji had to be read with the help of a handful of specialists, and the script was kept alive largely by priestly families and later by scholars.`,
             `Revival is the modern chapter. Ahom is classified as critically endangered by Ethnologue, but it is now taught as a second language: Dibrugarh University and Gauhati University offer Tai-Ahom courses, and Gauhati University launched a certificate course in Tai-Ahom language and medieval manuscriptology in 2026. For an atlas of East Asia, Ahom is the demonstration of how far the Tai expansion reached — and of how a court language can outlive its speakers.`],
          t:[["1220s","Ahom Tai cross the Patkai into Assam and found a kingdom"],
             ["1671","Battle of Saraighat: the Ahom defeat the Mughals"],
             ["18th–19th c.","Ahom ceases to be a spoken vernacular, surviving in ritual and the Buranji chronicles"],
             ["1826","British annexation of Assam; Assamese has long since displaced Ahom in speech"],
             ["2020s","Ahom taught as a second language at Dibrugarh and Gauhati universities; classified critically endangered"]] },
       ]},
    ]},
  ]};

/* ---------- ISO 639-3 codes (SIL) ----------
   Checked against iso-639-3.tab, the register's own download
   (https://iso639-3.sil.org/code_tables/download_tables, retrieved 2026-09-26).
   Notes that the register forces: there is no code for the family, and the
   collective "tai" of ISO 639-2/5 is not a 639-3 code; there is no plain
   "Gelao" code either — only Green, Red and White Gelao. Zhuang (zha) is a
   macrolanguage over sixteen active members plus two retired codes. */
const ISO = {
 kradai:'— (no 639-3 code; 639-2/5 collective “tai” covers the Tai branch only)',
 protokd:'— (reconstruction, no code)',
 kra:'— (no collective code)',
 gelao:'giq · gir · giw · aou · giu · gqu · enc · laq',
 buyang:'yha · yln · yzg',
 lachi:'lbt · lwh',
 laha:'lha',
 kamsui:'— (no collective code)',
 kam:'doc · kmc · cov',
 sui:'swi',
 maonan:'mmd',
 mulam:'mlm',
 then:'tct',
 biaolakkia:'lbc · byk',
 lakkia:'lbc',
 biao:'byk',
 hlai:'lic · cuq',
 li:'lic · cuq',
 jiamao:'jio',
 ongbe:'onb',
 tai:'— (branch; 639-2/5 “tai”)',
 ntai:'— (branch)',
 zhuang:'zha (macrolanguage · 16 active codes · za)',
 bouyei:'pcc',
 saek:'skb',
 ctai:'— (branch)',
 tay:'tyz · mlc',
 nung:'nut',
 stai:'— (branch)',
 thai:'tha (th)',
 lao:'lao (lo)',
 shan:'shn',
 tailue:'khb',
 tainua:'tdd',
 taidam:'blt',
 ahom:'aho'
};

/* ---------- what makes each variety distinctive: structure, not history ---------- */
const FEATURES = {
 kradai:[
  `<b>Tone as a system</b>: Proto-Tai is reconstructed with three contrastive tones on smooth syllables — *A, *B, *C — plus a checked category *D, and each branch has multiplied those categories differently. Thai has five tones; some Zhuang varieties have nine.`,
  `<b>The same machinery as Chinese</b>: tonogenesis out of lost voicing contrasts is what produced the Chinese tones and the Tai tones alike, which is why the two families are studied side by side even though they are not related.`,
  `<b>Sesquisyllables</b>: Proto-Kra–Dai words were often a minor syllable plus a major one ("half-syllable" + syllable). Tai ground them down to monosyllables; Kra and Kam–Sui kept more of the original shape, which is why Buyang forms appear in every reconstruction.`,
  `<b>Verb-medial, topic-friendly word order</b>, with numeral classifiers obligatory in counting — the areal norm from Chinese to Thai.`,
  `<b>No inflection</b>: tense, aspect and mood are particles, not endings; the family has no grammatical gender, case or agreement anywhere.`,
  `<b>Writing systems of two origins</b>: Indic-derived scripts for Tai (Thai, Lao, Shan, Lue, Nüa, Dam, Ahom), and Chinese-derived vernacular characters for Zhuang and Bouyei (sawndip).`
 ],
 protokd:[
  `<b>Reconstruction</b>: Li Fang-Kuei's <i>Handbook of Comparative Tai</i> (1977) built the framework from the Tai branch; Pittayaporn's <i>The Phonology of Proto-Tai</i> (2009) is the modern full reconstruction.`,
  `<b>Homeland dispute</b>: the Pearl River basin and the Guangxi–Guizhou interior are the two favourite candidates, and the choice decides whether the family's spread was driven by Han expansion or by rice-farming dispersal.`,
  `<b>The tree is contested</b>: Kra, Kam–Sui, Hlai and Tai are secure; where Be, Jiamao, Biao and Lakkia attach is not. Some scholars prefer a spread-zone model to a single ancestor.`
 ],
 kra:[
  `<b>Retention</b>: Kra keeps initial clusters, sesquisyllabic shapes and consonant systems that Tai simplified away — the branch is the family's conservative witness.`,
  `<b>Place-name evidence</b>: Kra-looking names for rivers, caves and villages cover much of Guizhou and Guangxi, marking territory the branch has lost over a millennium.`,
  `<b>All members are small and bilingual</b>: every Kra language is spoken in communities that also use Chinese, Zhuang, Miao or Vietnamese daily.`
 ],
 gelao:[
  `<b>A cluster, not a language</b>: the ISO register carries Green Gelao (<code>giq</code>), Red Gelao (<code>gir</code>) and White Gelao (<code>giw</code>) separately, with A'ou, Mulao, Qau, En and Qabiao as further Kra members — and no plain "Gelao" code at all.`,
  `<b>Mutual unintelligibility</b> between the Gelao varieties is normal; some pairs are further apart than Zhuang is from Bouyei.`,
  `<b>Consonant clusters and a two-tone system</b> in the conservative varieties, against heavy Chinese and Zhuang borrowing in the rest.`,
  `<b>The edge of the cliff</b>: Red Gelao is among the most endangered languages in China, with speakers in the tens.`
 ],
 buyang:[
  `<b>Sesquisyllables</b>: Buyang preserves disyllabic and sesquisyllabic word shapes — the single most cited evidence for what Proto-Kra–Dai looked like before Tai reduced everything to monosyllables.`,
  `<b>Three named varieties</b> in the register: Baha (<code>yha</code>), Langnian (<code>yln</code>) and E'ma (<code>yzg</code>), each with a few hundred speakers.`,
  `<b>A border language</b>: spoken on both sides of the Yunnan–Vietnam frontier, under Zhuang, Chinese and Vietnamese pressure.`
 ],
 lachi:[
  `<b>Split in the register</b>: Lachi (<code>lbt</code>) and White Lachi (<code>lwh</code>) are separate codes, which tells you how much sorting the Kra branch still needs.`,
  `<b>Initial clusters</b> and a tone system that behaves unlike Tai — the usual reasons a Kra language is cited in comparative work.`,
  `<b>Transmission has stopped</b> in most Lachi villages; children speak Chinese or Vietnamese.`
 ],
 laha:[
  `<b>The Kra language south of the border</b>: spoken in Son La and Lao Cai, in contact with Black Tai and White Tai rather than with Chinese.`,
  `<b>Vietnamese Kra–Dai</b>: Laha, Lachi and Qabiao are the three Kra languages that Vietnamese linguistics inventories as its own.`,
  `<b>Endangered, with Vietnamese as the language of schooling and work</b>.`
 ],
 kamsui:[
  `<b>The branch that kept its consonants</b>: Kam–Sui languages preserve voiceless nasals (<em>hm</em>, <em>hn</em>), prenasalised and pre-glottalised stops, and tone systems that split along different lines from Tai.`,
  `<b>Sui's inventory</b> is the family's largest — up to seventy consonants in the Sandong dialect.`,
  `<b>A ritual script of its own</b>: the Sui <em>Shuishu</em> 水書, used by ritual specialists for divination, geomancy and funerals, and copied by hand rather than printed.`,
  `<b>Two of the family's cultural showpieces</b>: Dong drum towers, wind-and-rain bridges and the polyphonic "grand song" (UNESCO 2009); and the Sui rice terraces of Sandu.`
 ],
 kam:[
  `<b>Split in the register</b>: Northern Dong (<code>doc</code>) and Southern Dong (<code>kmc</code>), plus Cao Miao (<code>cov</code>) — Southern Dong is the conservative variety and the basis of the written language.`,
  `<b>Grand song</b> (侗族大歌): polyphonic choral singing without instruments or conductor, inscribed on UNESCO's Intangible Cultural Heritage list in 2009 and the traditional vehicle of Kam oral literature.`,
  `<b>Latin orthography since the 1950s</b>, based on the Rongjiang dialect, alongside Chinese as the language of schooling.`
 ],
 sui:[
  `<b>Seventy consonants</b> in the Sandong dialect, including voiceless nasals, prenasalised stops and a three-way place contrast — the family's most elaborate inventory.`,
  `<b>Shuishu</b> 水書: a partly pictographic, partly phonetic ritual script for divination and funerary use, transmitted by hand-copying, with each master's version differing.`,
  `<b>A Latin orthography since the 1950s</b>, and daily use still normal in the Sandong core.`
 ],
 maonan:[
  `<b>Heavy Zhuang and Chinese contact</b>: tone categories and much of the vocabulary are borrowed, to the point that some varieties are hard to classify by lexicon alone.`,
  `<b>Speakers are a minority of the ethnic population</b> — the standard pattern in this corner of Guangxi.`,
  `<b>Latin orthography from the 1980s</b>, little used.`
 ],
 mulam:[
  `<b>Closest to Maonan and Kam</b> within Kam–Sui, in Luocheng Mulao Autonomous County.`,
  `<b>Absorbed Zhuang and Chinese material</b> over centuries, like its neighbours.`,
  `<b>Still spoken by older villagers, no longer the home language of children</b> — the "declining" rather than "endangered" case.`
 ],
 then:[
  `<b>Formerly treated as a Bouyei variety</b>, now recognised as a Kam–Sui language of central Guizhou (Huishui, Pingtang, Dushan).`,
  `<b>Speakers are counted among the Bouyei or Han</b> in some statistics, which is why its numbers are uncertain.`,
  `<b>Small and retreating</b>: a useful check on how far Kam–Sui really reaches northwards.`
 ],
 biaolakkia:[
  `<b>The family's unresolved corner</b>: Solnit (1988) makes it coordinate with Kam–Sui; L.-Thongkum (1992) links Lakkia to Tai; Norquest (2021) makes Biao–Lakkja the first split in Kra–Dai.`,
  `<b>A migration link as well as a classificatory one</b>: Lakkia speakers are thought to have come from the Biao country of north-western Guangdong.`,
  `<b>Both live inside Chinese-speaking territory</b>, in communities officially classified as Yao (Lakkia) or Han (Biao).`
 ],
 lakkia:[
  `<b>Five tones in every dialect</b>, and the Lingzu dialect still keeps <em>/kl-/</em> clusters that elsewhere merged to <em>/kj-/</em>.`,
  `<b>Cháshān Yáo 茶山瑶</b>: the speakers are called "Tea Mountain Yao" by their neighbours, while the autonym <em>lakkia</em> means "mountain people".`,
  `<b>≈9,000 speakers</b> in the Dayaoshan of Jinxiu county, with no traditional script.`
 ],
 biao:[
  `<b>Perhaps three languages, not one</b>: the Shidong, Yonggu and Dagang varieties, with Norquest (2021) grouping the first two as Southern Biao and Dagang as Northern.`,
  `<b>Ten tone categories</b> — more than most of the family carries.`,
  `<b>Speakers are officially Han Chinese</b>, which is why a language of 80,000 people in western Guangdong went largely unnoticed.`,
  `<b>The family's eastern mainland outlier</b>: surrounded entirely by Yue and Hakka.`
 ],
 hlai:[
  `<b>Hainan's own branch</b>, with the island's internal diversity — Ha, Qi, Meifu, Run, Baoding, Tongzha — recording a long settlement history on one island.`,
  `<b>Jiamao sits inside it as a puzzle</b>: a Kra–Dai language with a non-Hlai substratum that no one has convincingly assigned.`,
  `<b>Not to be confused with Leizhou Min</b>, the Chinese variety also colloquially called 黎话 Líhuà, on the other side of the strait.`
 ],
 li:[
  `<b>Six named varieties</b> — Ha, Qi, Meifu, Run, Baoding, Tongzha — with Cun (<code>cuq</code>) as a close relative.`,
  `<b>A Latin orthography only since the 1950s</b>, based on the Ha variety.`,
  `<b>≈750,000 speakers, about a quarter monolingual</b>, but shifting to Mandarin and Hainanese in the towns.`,
  `<b>Li brocade and women's tattoo traditions</b> are the cultural markers now under heritage protection.`
 ],
 jiamao:[
  `<b>Shares less than half its lexicon with Hlai</b>, and Norquest (2007, 2015) established that its core is non-Hlai.`,
  `<b>Layered substrata</b>: Thurgood (1992) proposed Austroasiatic; Hsiu (2018) found borrowings from an extinct Tibeto-Burman branch; Ostapirat (2026) suggests a northern-Vietnam origin.`,
  `<b>Eight tone categories</b>, with the Proto-Be-like collapse of the B and C classes into a single X category.`,
  `<b>Possibly an isolate</b> rather than a Hlai language — the register keeps it in Kra–Dai without a settled parent.`
 ],
 ongbe:[
  `<b>600,000 speakers, 100,000 monolingual, classified as Han in the census</b> — one of the most under-visible languages in China.`,
  `<b>Taught in primary schools</b> according to Ethnologue, a rarity among Kra–Dai languages of China.`,
  `<b>Be–Tai (Hansell 1988) or Be–Jizhao (Ostapirat 1998)</b>: the affiliation is still open, and the register describes Be as a pair of languages.`,
  `<b>Autonym</b> <em>ʔaŋ³³vo³³</em>, "person of the village".`
 ],
 tai:[
  `<b>The family's centre of gravity</b>: ≈90 million speakers, two state languages (Thai, Lao) and a written tradition from the thirteenth century.`,
  `<b>Three branches</b>: Northern (Zhuang, Bouyei, Saek), Central (Nung, Tày, the Sino-Vietnamese Zhuang varieties) and Southwestern (Thai, Lao, Shan, Lue, Nüa, Dam, Ahom).`,
  `<b>A geography as much as a genealogy</b>: the northern and central branches are languages of the Guangxi–Guizhou–Vietnam massif; Southwestern Tai is the language of the river valleys that carried its speakers to the Mekong, the Chao Phraya and eventually Assam.`
 ],
 ntai:[
  `<b>The largest concentration of Kra–Dai speakers anywhere</b>, in the karst country of Guangxi and southern Guizhou.`,
  `<b>Zhuang and Bouyei are conventionally one grouping</b>; the frontier between them is political as much as linguistic.`,
  `<b>Saek is the stranded outlier</b>, hundreds of kilometres south in the middle Mekong.`
 ],
 zhuang:[
  `<b>One code over sixteen languages</b>: <code>zha</code> is a macrolanguage covering sixteen active individual codes (Central, Eastern and Guibei Hongshuihe, Dai Wenma, Guibian, Lianshan, Liujiang, Liuqian, Minz, Nong, Qiubei, Yang, Yongbei, Yongnan, Youjiang, Zuojiang) plus two retired ones. Glottolog's note: "Zhuang is not a valid group".`,
  `<b>Two writing systems</b>: the Latin Standard Zhuang of 1957/1982, based on the Wuming (Yongbei) variety with tone letters on the syllable final; and <em>sawndip</em> 方块壮字, characters adapted and invented from Chinese over more than a thousand years.`,
  `<b>Tone letters in the spelling</b> encode the tone categories directly — the written form tells you the tone without a tone mark.`,
  `<b>The second-largest minority language in China</b>, and the one whose speakers most often shift to Southwestern Mandarin in cities.`
 ],
 bouyei:[
  `<b>Closest relative of Zhuang</b>, and conventionally treated with it as Northern Tai.`,
  `<b>A layered script history</b>: a character-based Bouyei script, a 1950s Latin orthography under a joint Bouyei–Zhuang policy, and the current script designed 1981–85 on the Wangmo dialect.`,
  `<b>≈2.7 million speakers, about 98% in China</b>, with a Vietnamese branch known as Giay.`
 ],
 saek:[
  `<b>Gedney's language</b>: his recordings and the <i>Concise Saek–English, English–Saek Lexicon</i> (Hudak &amp; Gedney, 2010) are the standard reference.`,
  `<b>Six tones</b> distributed across the Proto-Tai A/B/C/D classes in a pattern that differs from its neighbours — a checkpoint for Proto-Tai reconstruction.`,
  `<b>Severely endangered</b> per the UNESCO atlas, with ≈10,000 speakers in ten villages in Laos and four in Thailand.`
 ],
 ctai:[
  `<b>The middle term, and the hardest to draw</b>: some of its members are counted inside Zhuang's sixteen codes rather than standing beside it.`,
  `<b>Tày and Nung are written in the Vietnamese alphabet</b> — the family's longest experience of a national Latin script.`,
  `<b>A dialect continuum across a frontier</b>: Vietnamese Tày and the Central Tai Zhuang varieties of Guangxi differ in name and administration more than in speech.`
 ],
 tay:[
  `<b>The largest minority language of northern Vietnam</b>, ≈1.8 million speakers in Cao Bang, Lang Son, Bac Kan, Thai Nguyen and Quang Ninh.`,
  `<b>Then songs and <em>sl</em> poetry</b>: a modern literary tradition in the Vietnamese alphabet that Vietnamese scholarship treats as heritage.`,
  `<b>Cao Lan (<code>mlc</code>)</b> is carried in the same ISO record, sometimes as a separate language.`
 ],
 nung:[
  `<b>A cluster of varieties</b>: Nùng An, Nùng Giang, Nùng Inh, Nùng Lòi, Nùng Phàn Slình, Nùng Qúy Rin, Nùng Xuồng.`,
  `<b>The Tày–Nung distinction is historical, not linguistic</b> — the Tày are the older Tai population of the northern valleys, the Nung the later arrivals.`,
  `<b>The same speech community appears on both sides of the border</b>, as Nung in Vietnam and as Nong Zhuang (<code>zhn</code>) within the Zhuang macrolanguage.`
 ],
 stai:[
  `<b>The branch that made states</b>: from the thirteenth century its speakers moved down the Chao Phraya, Mekong, Salween and Irrawaddy, and by the eighteenth century Tai courts ruled from Assam to the Malay peninsula.`,
  `<b>A shared script family</b>: Thai, Lao, Shan, Lue, Nüa, Khün and Ahom all descend from Indic-derived Tai scripts, still recognisably related across a thousand miles.`,
  `<b>Internal divisions</b>: Northwestern (Shan, Tai Nüa, Ahom), Chiang Saen (Thai, Lue, Dam, Khün), Lao–Phutai and Southern.`
 ],
 thai:[
  `<b>≈27 million first-language speakers</b> and the standard language of a country of ≈70 million.`,
  `<b>The script</b>: 44 consonants, 32 vowels, 5 tones, with consonant classes and tone marks doing much of the tonal work.`,
  `<b>The Ram Khamhaeng inscription</b>, conventionally dated 1292, is the traditional founding document of Thai writing — and its authenticity has been argued over since the 1980s.`,
  `<b>Registers and pronouns keyed to social status</b>, which makes Thai the standard example of a grammar that encodes hierarchy.`,
  `<b>Vocabulary borrowed from Sanskrit, Pali and Khmer</b>, despite the language being Kra–Dai.`
 ],
 lao:[
  `<b>The national language of Laos</b>, ≈3.4 million speakers there, plus several million Isan speakers in north-eastern Thailand.`,
  `<b>Mutually intelligible with Thai to a considerable degree</b>, especially in writing; the two standards diverged largely through twentieth-century spelling and vocabulary policy.`,
  `<b>The Lao script</b> belongs to the Indic-derived Tai family; orthography was simplified in the mid-twentieth century.`,
  `<b>A classical literature</b> — the epic <i>Sin Xay</i>, the Lao Ramayana <i>Phra Lak Phra Lam</i>, the epic of Thao Hung Thao Cheuang — surviving in palm-leaf manuscripts and folios.`
 ],
 shan:[
  `<b>≈3.3 million speakers</b> in Shan State, with communities in Dehong and northern Thailand; <em>Tai Yai</em> to its speakers.`,
  `<b>A manuscript culture</b>: chronicles, Buddhist texts and legal codes on palm leaf and <em>parabaik</em>, in a Tai script close to those of Lue and Nüa.`,
  `<b>Politics is part of the grammar of its survival</b>: the Panglong Agreement of 1947 promised autonomy, the 1962 coup ended it, and decades of conflict have made Shan State one of the most linguistically fractured regions of Southeast Asia.`
 ],
 tailue:[
  `<b>Three scripts</b>: Tham (the "dharma" script shared with Lanna and Laos), the older Fak Kham, and the reformed New Tai Lue alphabet of twentieth-century China, now in Unicode.`,
  `<b>A Chiang Saen-branch language</b>, close to Khün and Northern Thai, and the language of the Lue kingdom of Chiang Hung (Jinghong).`,
  `<b>≈550,000–700,000 speakers across five countries</b>: China ≈280,000, Myanmar ≈200,000, Laos ≈134,000, Thailand ≈83,000, Vietnam ≈5,000.`
 ],
 tainua:[
  `<b>The Tai Le script</b>, traditionally written on palm leaf and paper, reformed and Unicode-encoded in the twentieth century.`,
  `<b>Co-official in Dehong prefecture</b>, Yunnan — one of the few Tai languages with formal status in China.`,
  `<b>Northwestern Tai</b>, closest to Shan and Ahom; ≈720,000 speakers across China, Myanmar, Thailand and Laos.`
 ],
 taidam:[
  `<b>The Tai Viet script</b>, and a history bound up with the Sip Song Chau Tai — the "twelve Tai chieftaincies" of the Vietnam–Laos borderland.`,
  `<b>Black, White and Red Tai</b> are distinguished by the colours of women's clothing rather than by linguistic criteria, and in Vietnam all Tai peoples are taught a standardised Tai based on the Black Tai variety.`,
  `<b>Almost no Khmer, Pali or Sanskrit vocabulary</b>, unlike Thai and Lao — which is why Thai and Lao speakers find it hard to follow despite the shared Tai core.`,
  `<b>Known as Thai Song in central and western Thailand</b>; ≈760,000 speakers in four countries.`
 ],
 ahom:[
  `<b>Extinct as a vernacular</b> — it ceased to be spoken in the eighteenth or nineteenth century — but alive as a ritual and scholarly language and as a modern subject of teaching.`,
  `<b>Northwestern Tai</b>, closest to Shan and Tai Nüa: the Tai language of India is more closely related to languages of Myanmar than to any language of India.`,
  `<b>The Ahom script and the <i>Buranji</i> chronicles</b>: the kingdom's history survives in manuscripts that had to be read with specialist help after the language died out.`,
  `<b>Revival</b>: taught at Dibrugarh and Gauhati universities; a Tai-Ahom and manuscriptology certificate course launched in 2026; classified critically endangered by Ethnologue.`
 ],
};

/* ===================== hand-drawn schematic geometry =====================
   Six coarse polygons traced by hand so the markers sit on something. Nothing
   here is surveyed: coastlines are simplified, the Vietnamese and Burmese
   borders are ignored, and the Indochina and South China blocks are allowed to
   overlap. Markers are at true coordinates; these shapes are not. */
const SOUTHCHINA = [[97.5,29.5],[101.0,30.0],[104.5,30.5],[108.0,30.0],[111.0,29.5],[114.0,29.0],
 [116.5,28.0],[118.5,26.5],[119.8,25.0],[118.0,24.0],[116.0,23.0],[114.5,22.5],[113.5,22.2],
 [113.0,21.9],[111.0,21.6],[110.4,20.3],[110.0,20.4],[109.7,21.5],[108.5,21.5],[106.7,22.0],
 [105.5,23.0],[104.0,22.5],[103.0,22.6],[102.0,22.4],[101.0,21.5],[99.5,22.0],[97.8,23.5],
 [97.5,26.0],[97.5,29.5]];
const INDOCHINA = [[92.5,21.5],[94.5,23.5],[97.0,24.5],[98.5,25.5],[100.5,21.0],[102.0,22.5],
 [104.5,23.0],[107.0,22.0],[109.5,18.0],[109.3,14.0],[106.5,9.5],[104.8,9.2],[104.0,10.5],
 [102.0,12.0],[100.5,13.5],[100.2,12.0],[99.5,9.5],[100.5,6.5],[99.0,6.5],[98.3,9.5],
 [97.5,16.5],[94.3,16.0],[93.5,19.0],[92.5,21.5]];
const MALAYA = [[98.3,9.5],[99.8,10.6],[101.0,10.5],[102.5,8.5],[103.6,6.5],[104.4,1.4],
 [103.3,1.5],[102.4,3.5],[101.3,5.5],[100.4,7.0],[99.5,8.5],[98.3,9.5]];
const HAINAN = [[108.7,19.5],[109.2,19.9],[109.9,20.0],[110.6,20.0],[111.0,19.5],[110.7,18.9],
 [110.1,18.4],[109.5,18.3],[109.0,18.5],[108.7,19.0],[108.7,19.5]];
const BRAHMAPUTRA = [[89.7,26.0],[92.0,26.9],[94.5,27.8],[96.0,27.7],[95.5,26.5],[93.5,25.2],
 [91.5,24.9],[90.5,25.2],[89.7,25.5],[89.7,26.0]];
const KRADAI_GEO = { type:'FeatureCollection', features:[SOUTHCHINA,INDOCHINA,MALAYA,HAINAN,BRAHMAPUTRA].map(r=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };

/* ---------- approximate "core areas" ----------
   Coarse hand-drawn blocks showing roughly where each branch is rooted — NOT
   surveyed boundaries. They merge dialect chains into blocks, ignore enclaves,
   treat the Tai zone as continuous when it is really a set of river valleys,
   and place the Kra and Hlai blocks over ground those branches have largely
   lost. The marker layer remains the factual one. */
const AREAS = {
 'c-anc':[[[104.0,25.5],[110.0,26.5],[112.5,25.0],[113.5,23.5],[111.0,22.0],[107.0,21.5],[104.0,22.5]]],
 'c-kra':[
  [[104.5,28.0],[107.5,27.5],[107.5,25.5],[105.5,24.5],[104.0,25.5]],
  [[103.3,23.5],[105.5,23.5],[105.8,22.0],[104.0,21.5],[103.0,22.5]]
 ],
 'c-kam':[[[106.5,27.5],[110.5,27.5],[110.5,25.5],[109.5,24.5],[107.0,24.5],[106.0,26.0]]],
 'c-bla':[
  [[109.8,24.6],[110.6,24.6],[110.6,23.8],[109.8,23.8]],
  [[111.2,24.3],[112.4,24.3],[112.4,23.2],[111.2,23.2]]
 ],
 'c-hlai':[[[108.9,19.6],[110.4,19.7],[110.6,18.6],[109.5,18.3],[108.9,18.7]]],
 'c-ong':[[[109.0,20.0],[110.6,20.0],[110.4,19.5],[109.2,19.5]]],
 'c-tai':[[[104.0,26.5],[110.0,26.5],[111.5,25.0],[110.0,22.5],[107.0,21.8],[104.5,22.8]]],
 'c-ntai':[[[104.0,26.5],[110.0,26.5],[111.5,25.0],[110.0,22.5],[107.0,21.8],[104.5,22.8]]],
 'c-ctai':[[[103.5,23.0],[107.0,23.3],[107.5,21.8],[105.5,20.5],[103.5,21.5]]],
 'c-stai':[[[96.5,22.5],[100.0,24.5],[103.0,23.0],[106.0,22.0],[108.0,20.0],[107.5,16.0],
            [105.5,12.0],[103.5,10.0],[100.5,9.0],[99.5,13.0],[98.5,16.0],[96.0,19.0]]],
 'c-ext':[[[90.0,26.0],[92.5,27.0],[95.0,27.8],[95.5,26.8],[93.5,25.5],[91.0,25.0]]]
};

/* ---------- listen links: an Omniglot page where one exists, plus the engine's
   YouTube-search fallback on every node. Every URL below was requested on
   2026-09-26 and returned 200; Omniglot has no page for the Kra languages, for
   Hlai, Jiamao, Ong Be, Mulam, Lakkia, Biao, Saek or Tai Nüa, and those nodes
   carry an empty list rather than a guessed link — see research.md, KD-108
   "Link health". ---------- */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 kradai:     [['Kra–Dai languages — Omniglot index', OM+'langfam.htm']],
 protokd:    [],
 kra:        [],
 gelao:      [],
 buyang:     [],
 lachi:      [],
 laha:       [],
 kamsui:     [['Kam (Dong) — Omniglot', OM+'kam.htm'], ['Sui — Omniglot', OM+'sui.htm'], ['Maonan — Omniglot', OM+'maonan.htm']],
 kam:        [['Kam / Dong — Omniglot', OM+'kam.htm'], ['Dong — Omniglot', OM+'dong.htm']],
 sui:        [['Sui — Omniglot', OM+'sui.htm']],
 maonan:     [['Maonan — Omniglot', OM+'maonan.htm']],
 mulam:      [],
 then:       [],
 biaolakkia: [],
 lakkia:     [],
 biao:       [],
 hlai:       [],
 li:         [],
 jiamao:     [],
 ongbe:      [],
 tai:        [['Zhuang — Omniglot', OM+'zhuang.htm'], ['Bouyei — Omniglot', OM+'bouyei.htm']],
 ntai:       [['Zhuang — Omniglot', OM+'zhuang.htm'], ['Bouyei — Omniglot', OM+'bouyei.htm']],
 zhuang:     [['Zhuang — Omniglot', OM+'zhuang.htm']],
 bouyei:     [['Bouyei — Omniglot', OM+'bouyei.htm']],
 saek:       [],
 ctai:       [['Nung — Omniglot', OM+'nung.htm'], ['Tày — Omniglot', OM+'tay.htm']],
 tay:        [['Tày — Omniglot', OM+'tay.htm']],
 nung:       [['Nung — Omniglot', OM+'nung.htm']],
 stai:       [['Thai — Omniglot', OM+'thai.htm'], ['Lao — Omniglot', OM+'lao.htm'], ['Shan — Omniglot', OM+'shan.htm']],
 thai:       [['Thai — Omniglot', OM+'thai.htm'], ['Isan — Omniglot', OM+'isan.htm']],
 lao:        [['Lao — Omniglot', OM+'lao.htm']],
 shan:       [['Shan — Omniglot', OM+'shan.htm']],
 tailue:     [['Tai Lue — Omniglot', OM+'tailue.htm'], ['New Tai Lue — Omniglot', OM+'newtailue.htm']],
 tainua:     [],
 taidam:     [['Tai Dam — Omniglot', OM+'taidam.htm'], ['Tai Viet script — Omniglot', OM+'taiviet.htm']],
 ahom:       [['Ahom — Omniglot', OM+'ahom.htm']]
};

/* ===================== the atlas contract (languages.md §1.3) ===================== */
window.ATLASES = window.ATLASES || {};
window.ATLASES.kradai = {
  key: 'kradai',
  title:   { zh: '壮侗', en: 'Kra–Dai' },
  tagline: 'The rice lowlands south of China — Zhuang, Thai, Lao, Dong, and the Tai languages that reached Assam',
  stats:   [['36', 'nodes'], ['6', 'branches'], ['≈93 million', 'speakers, by source'], ['2', 'national languages']],
  palette: {
    anc: '#cdd7de', kra: '#c8556f', kam: '#8a6fd6', bla: '#d07ac0', hlai: '#2fa8b8',
    ong: '#5f7fbf', tai: '#d9b44a', ntai: '#a8c94f', ctai: '#5fb96a', stai: '#e2703a', ext: '#8b94a8'
  },
  legend:  [['anc','Ancestral / proto'],['kra','Kra (仡央)'],['kam','Kam–Sui (侗水)'],['bla','Biao–Lakkia'],
            ['hlai','Hlai–Jiamao'],['ong','Ong Be'],['tai','Tai (branch)'],['ntai','Northern Tai'],
            ['ctai','Central Tai'],['stai','Southwestern Tai'],['ext','Extinct']],
  view:    { center: [104.5, 16.5], zoom: 3.9 },
  outline: { color: '#e2703a', fill: 'rgba(226,112,58,0.06)' },
  sketchGeo: KRADAI_GEO,
  captions: {
    note:   '● Markers show <b>representative settlements and districts</b> where the selected variety is rooted. For Kra, Kam–Sui and Hlai varieties a marker means <em>a county or township where the language is still present</em> — not that everyone there speaks it. Bangkok, Vientiane, Nanning and Haikou are administrative centres; the markers beside them are the speech communities.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — coarse hand-drawn blocks showing roughly where each branch is rooted. They follow no surveyed boundary, merge dialect chains into single shapes, ignore enclaves, and place the Kra and Hlai blocks over ground those branches have largely lost. The Tai zone is drawn as continuous when it is really a set of river valleys. The marker layer is the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn South China coast, Indochina, Malay peninsula, Hainan and the Brahmaputra valley, simplified from memory of the geography; the markers sit at true coordinates. Works fully offline.'
  },
  fonts: ['Noto Sans Thai', 'Noto Sans Lao', 'Noto Sans Myanmar', 'Noto Sans SC'],
  filterPlaceholder: 'e.g. Zhuang, Thai, Hainan…',
  listen: {
    om: 'https://www.omniglot.com/writing/',
    fv: 'https://forvo.com/languages/',
    search: 'Kra-Dai language native speaker'
  },
  rootId: 'kradai',
  stages: ['protokd'],
  sources: 'Sources: Li Fang-Kuei, <i>A Handbook of Comparative Tai</i> (1977) · P. Pittayaporn, <i>The Phonology of Proto-Tai</i> (Cornell, 2009) · Weera Ostapirat on Kra and on Be–Jizhao · J. Norquest (2007, 2015, 2021) on Hlai, Jiamao and Biao–Lakkja · G. Thurgood (1992) on Jiamao’s substratum · A. Hsiu (2014, 2018) on Biao and Jiamao · Y. Solnit (1988) and A. Hansell (1988) on Lakkia and Be · T. L.-Thongkum (1992) on Lakkia’s affinities · T. Hudak &amp; W. J. Gedney, <i>William J. Gedney’s Concise Saek–English, English–Saek Lexicon</i> (2010) · the UNESCO <i>Atlas of the World’s Languages in Danger</i> for endangerment grades · the SIL ISO 639-3 register (<i>iso-639-3.tab</i>, retrieved 2026-09-26) for every code quoted, and its macrolanguage table for Zhuang’s sixteen active members. Speaker figures are approximations and vary widely between Chinese censuses, Vietnamese and Laotian statistics and fieldworker counts; where sources disagree the hedge “by source” is used rather than a single figure. Classification disputes are stated as disputes rather than resolved here.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();
