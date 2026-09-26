/* atlas-tungusic.js — Tungusic 通古斯语族
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (see languages.md §1.3 for the contract,
 * §2.2 for this family's brief, and research.md §"Tungusic (Phase 1)" for the
 * evidence log — every load-bearing date and figure below is logged there as
 * TU-101 … TU-109).
 *
 * One correction against the §2.2 brief is deliberate and logged as [TU-102]:
 * the Manchu *script* is derived from the Mongolian alphabet, not from the
 * Jurchen script. The Jurchen *language* is the ancestor of Manchu; the two
 * scripts are unrelated. The atlas says so.
 *
 * Speaker figures are approximations that vary widely between sources — the
 * censuses of these communities disagree with each other and with fieldworkers.
 * Where they do, the prose says "by source" rather than picking a winner.
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree ===================== */
const DATA = {
 id:"tungusic", en:"Tungusic", zh:"通古斯", py:"Tōnggǔsī yǔzú", sp:"≈75,000",
 region:"Manchuria, the Amur and Ussuri basins, Sakhalin, and the Siberian taiga from the Yenisei to Kamchatka",
 cls:"c-anc", mk:[],
 h:[`The Tungusic languages — also called Manchu–Tungus — are the family of the forest and the river: birch-bark hunters, fisherfolk and reindeer herders spread across a belt of taiga from the Yenisei to Kamchatka, plus the Manchu aristocracy who ruled China from 1644 to 1911. It is a small family — about a dozen living languages and roughly 75,000 native speakers by source — and one of the fastest-shrinking in the world.`,
   `Linguists divide it into a Northern group (Ewenic, plus the Udegheic languages of the Ussuri) and a Southern group (Nanaic on the Amur, and Jurchenic — Jurchen, Manchu and Xibe). Some specialists reject the tree altogether and describe Tungusic as a dialect continuum shaped by centuries of contact; that caution applies to this diagram as much as to any other.`,
   `The family is bookended by two unrelated scripts. In the twelfth century the Jurchen of the Jin dynasty wrote in a script derived from Khitan and, through it, from Chinese characters. In 1599 Nurhaci had the <em>Mongolian</em> alphabet adapted instead — and it is that vertical script, not the Jurchen one, that carried the Qing state's paperwork and is still written in Xinjiang today.`,
   `Almost every node below is endangered. Manchu is dormant; Negidal, Ulch, Uilta and Oroch are down to single digits or a few dozen speakers; Evenki and Even survive largely because their territories are so vast that no census catches them all. The markers below show where varieties are <em>rooted</em> — the honest unit of measurement for a family this thin.`],
 t:[["1119 / 1185","Jurchen script (from Khitan) writes the Jin dynasty's language; the 1185 Victory Stele survives"],
    ["1599 / 1632","Nurhaci has the Mongolian alphabet adapted to Manchu; Dahai adds dots and circles"],
    ["1644–1911","Manchu runs the Qing state, then retreats from daily life over two centuries"],
    ["1764","A Xibe garrison is sent to the Ili valley — the family's westernmost outpost"],
    ["20th–21st c.","UNESCO lists every Amur and Ussuri language as severely or critically endangered"]],
 kids:[

  { id:"prototung", en:"Proto-Tungusic", zh:"原始通古斯", py:"Yuánshǐ Tōnggǔsī", sp:"reconstructed",
    region:"Homeland disputed: the Lake Baikal region, or the Argun–Hulunbuir borderland",
    cls:"c-anc", mk:[[53.0,108.0,"Lake Baikal (one proposed homeland)"],[49.3,119.4,"Argun–Hulunbuir (the rival proposal)"]],
    h:[`The reconstructed ancestor, assembled chiefly by V. I. Cincius and colleagues in the <em>Sravnitel'nyj slovar' tunguso-man'čžurskich jazykov</em> (1975–77) from correspondences across the whole family. There is no agreed absolute date for it, and the two favourite homelands — around Lake Baikal, or the Argun and Hulunbuir borderland further east — imply quite different histories of who moved where.`,
       `Its features are the family's inheritance: vowel harmony, a case system built by suffixation, and a vocabulary of taiga life — reindeer, birch, fish, snow — that is strikingly consistent from the Yenisei to Sakhalin.`],
    kids:[
     { id:"jurchen", en:"Jurchen", zh:"女真语", py:"Nǚzhēn yǔ", sp:"extinct (developed into Manchu)",
       region:"Southwest Manchuria — the Jin dynasty heartland (1115–1234)", cls:"c-jur",
       mk:[[45.75,126.97,"Acheng — Jin Shangjing (Harbin)"],[39.90,116.40,"Beijing — Jin Zhongdu"],[45.18,126.03,"Jin Victory Memorial Stele, Jilin"],[43.90,125.30,"Jilin (Jin precursor capital)"]],
       h:[`The Tungusic language of the Jurchen, who took northern China from the Song and ruled it as the <em>Jin</em> dynasty from 1115 to 1234. A script was created for it in 1119 by Wanyan Xiyin, built on the Khitan model and so, ultimately, on Chinese characters — a dead end as far as the modern family is concerned, because the script fell out of use when the Jin fell.`,
          `The language itself did not die with the dynasty. The Jurchen of Manchuria kept speaking it, and it is their speech that became Manchu: in 1635 Hong Taiji renamed the people and the language "Manchu". Surviving Jurchen texts are scarce — the most important is the inscription on the back of the 1185 Jin Victory Memorial Stele (大金得勝陀頌碑) — and the two Ming-dynasty dictionaries compiled by the Bureau of Translators and the Bureau of Interpreters are what modern scholars actually work from.`],
       t:[["1115–1234","Jin dynasty: Jurchen is the language of the court in northern China"],
          ["1119","Wanyan Xiyin devises the Jurchen script, based on Khitan"],
          ["1185","The Jin Victory Memorial Stele is erected — the key surviving text"],
          ["1234","Mongol conquest ends the Jin; the Jurchen script falls into disuse"],
          ["1635","Hong Taiji renames the Jurchen people and language “Manchu”"]],
       kids:[
        { id:"manchuric", en:"Jurchenic (Manchu–Xibe)", zh:"满语支", py:"Mǎnyǔ zhī", sp:"≈30,000",
          region:"Northeast China, the Beijing garrisons, and the Ili valley in Xinjiang", cls:"c-man", mk:[],
          h:[`The southern Tungusic line that produced an imperial language. Its two surviving members now sit 4,000 km apart: Manchu in the villages of Heilongjiang, where native transmission has stopped, and Xibe in Xinjiang, where a garrison moved there in 1764 still speaks and writes a close sister of it.`],
          kids:[
           { id:"manchu", en:"Manchu", zh:"满语", py:"Mǎnyǔ", sp:"dormant — a few hundred fluent by source",
             region:"Sanjiazi and Dawujia villages, Heilongjiang; formerly Manchuria and the Beijing banner garrisons", cls:"c-man",
             mk:[[47.79,124.47,"Sanjiazi, Fuyu Co. (Qiqihar)"],[50.25,127.53,"Aihui / Heihe"],[41.80,123.43,"Shenyang"],[45.75,126.97,"Harbin"],[39.90,116.40,"Beijing (banner garrisons)"]],
             h:[`Manchu was the language of the Qing state. Nurhaci had the Mongolian alphabet adapted to it in 1599 — the <em>tongki fuka akū hergen</em>, "script without dots and circles" — and in 1632 Dahai added the dots and circles that distinguish <em>k</em>, <em>g</em> and <em>h</em>, producing the <em>tongki fuka sindaha hergen</em> that became standard. Manuscripts discovered from the 1620s show the diacritics were already creeping in before Dahai, so 1632 is the traditional attribution rather than the whole story.`,
                `For two centuries the Qing ran a bilingual state: Manchu for the court, the banners and the frontier; Chinese for the bureaucracy. Then the language retreated — first from the capital, then from the garrisons, then from Manchuria itself, as bannermen became Chinese-speaking townsmen. By the mid-nineteenth century many Manchus had Chinese as a first language, and documents were still being translated into Manchu for form's sake.`,
                `No native-speaker community remains. As of 2007 the last native speakers were thought to be eighteen octogenarians in Sanjiazi village, Fuyu County, Heilongjiang, with a few more at Dawujia in Aihui District; several thousand people now learn Manchu as a second language in school and adult classes, and revival efforts have grown since the 1980s. Published counts differ by two orders of magnitude depending on whether those learners are counted — Omniglot's ~100 fluent speakers and the "several thousand" of the standard account are both in circulation, so this atlas gives no single number.`,
                `The paradox of Manchu is that it is a <em>dormant</em> language with an enormous written corpus: thousands of archival files, genealogies, treaties and translations survive, and Manchu is still read by historians who cannot speak it.`],
             t:[["1599","Nurhaci has the Mongolian alphabet adapted to Manchu"],
                ["1632","Dahai adds dots and circles, and ten letters for Chinese, Sanskrit and Tibetan loans"],
                ["1644–1911","Manchu is a language of the Qing state and the Eight Banners"],
                ["1764","The Xibe garrison leaves for Xinjiang, carrying the script with it"],
                ["19th c.","Manchu retreats from daily use even in the garrisons"],
                ["2007","Last native speakers thought to be 18 octogenarians in Sanjiazi"],
                ["1980s–","Revival classes; Manchu taught as a second language"]],
             kids:[
              { id:"xibe", en:"Xibe (Sibe)", zh:"锡伯语", py:"Xībó yǔ", sp:"≈30,000",
                region:"Qapqal Xibe Autonomous County and the Ili valley, Xinjiang", cls:"c-man",
                mk:[[43.84,81.15,"Qapqal"],[43.92,81.32,"Yining (Ghulja)"],[43.60,83.00,"Ili valley garrisons"],[43.83,87.62,"Ürümqi"]],
                h:[`In 1764 the Qianlong emperor sent Xibe troops from Manchuria to garrison the newly conquered Ili frontier. They never went home. Two hundred and sixty years later their descendants in Qapqal Xibe Autonomous County speak Xibe and write it in a slightly adapted form of the Manchu alphabet — which makes this small county in Xinjiang the last place on earth where a Manchu-type script is in everyday use.`,
                   `Xibe is conventionally treated as a separate language rather than a Manchu dialect, on the strength of two and a half centuries of separate development: modern written Xibe is very close to Manchu, but the spoken language has drifted — a converb ending <em>-mak</em>, extremely common in spoken Xibe, is unknown in Manchu. With roughly 30,000 speakers by source, Xibe is the most widely spoken Tungusic language and accounts for more than half of the whole family. UNESCO still classifies it as severely endangered, because transmission to children is no longer secure.`],
                t:[["1764","Xibe garrison dispatched to the Ili valley by the Qianlong emperor"],
                   ["1764–","Qapqal becomes the written-Manchu outpost"],
                   ["1950s–","Sibe taught in local schools; radio and publishing in the script"],
                   ["Today","UNESCO: severely endangered — the largest, but still shrinking, Tungusic language"]] }
             ]}
          ]},
         { id:"nanaic", en:"Nanaic (Amur group)", zh:"那乃语支", py:"Nànǎi yǔ zhī", sp:"≈1,550",
           region:"The Amur and lower Amur, Khabarovsk Krai and Heilongjiang; Sakhalin", cls:"c-nan", mk:[],
           h:[`The river languages of the lower Amur: Nanai along the great river and its Chinese bank, Ulch downstream, and Uilta across the Tatar Strait on Sakhalin. All three are fishing cultures of the same waterway, and all three are collapsing — Nanai has the most speakers, and even Nanai's census counts are contested.`],
           kids:[
            { id:"nanai", en:"Nanai (Hezhen)", zh:"赫哲语", py:"Hèzhé yǔ", sp:"≈1,400",
              region:"Khabarovsk Krai and Komsomolsk-on-Amur; Tongjiang and Fuyuan, Heilongjiang", cls:"c-nan",
              mk:[[48.48,135.08,"Khabarovsk"],[50.55,137.00,"Komsomolsk-on-Amur"],[47.65,132.51,"Tongjiang (Hezhen)"],[48.36,134.29,"Fuyuan"],[46.80,130.32,"Jiamusi"]],
              h:[`Nanai — Hezhen on the Chinese side, Gold in older European writing — is spoken along the Amur from Khabarovsk up past Komsomolsk, and in the Hezhen villages of Tongjiang and Fuyuan in Heilongjiang. The 2010 census gave about 1,400 speakers out of some 17,000 ethnic Nanai, and UNESCO classes it as severely endangered.`,
                 `Nanai is the best-documented of the Amur languages, thanks to a Soviet literary tradition: a Latin alphabet in 1931, replaced by Cyrillic in 1937, and a body of published Nanai prose. That literary infrastructure did not save the spoken language, since younger generations are fluent in Russian or Chinese instead. On the Chinese side Hezhen is one of the smallest recognised minority languages in the country.`],
              t:[["1931–37","Nanai written in a Latin alphabet, then switched to Cyrillic"],
                 ["1930s–80s","Soviet Nanai publishing and schooling"],
                 ["2010","≈1,400 speakers out of ≈17,000 ethnic Nanai (census)"],
                 ["Today","UNESCO: severely endangered on both banks of the Amur"]] },
            { id:"ulch", en:"Ulch (Olcha)", zh:"乌尔奇语", py:"Wū'ěrqí yǔ", sp:"≈150",
              region:"Ulchsky District and the lower Amur, Khabarovsk Krai", cls:"c-nan",
              mk:[[52.37,140.44,"Bogorodskoye"],[53.15,140.72,"Nikolaevsk-on-Amur"]],
              h:[`Ulch is the language of the lower Amur around Bogorodskoye, downstream of Nanai country and upstream of the river's mouth at Nikolaevsk. The 2010 census counted 150 speakers out of about 2,800 Ulch, and the language is moribund: it survives mostly among the oldest generation, in a district where Russian is the language of work, school and television.`,
                 `Its importance is out of all proportion to its size. Ulch preserves the vowel system and consonant inventory of the lower-Amur type with unusual clarity, and Ulch oral literature — the <em>telungu</em> narratives — was recorded by Soviet scholars before the tradition broke. UNESCO lists it as critically endangered.`],
              t:[["19th–20th c.","Ulch recorded by Russian and Soviet ethnographers"],
                 ["2010","150 speakers out of ≈2,800 Ulch (census)"],
                 ["Today","UNESCO: critically endangered; no child-first-language transmission"]] },
            { id:"uilta", en:"Uilta (Orok)", zh:"乌伊尔塔语", py:"Wūyī'ěrtǎ yǔ", sp:"8–10 fluent, by source",
              region:"Northern and eastern Sakhalin; a community in Abashiri, Hokkaidō", cls:"c-nan",
              mk:[[51.80,143.13,"Nogliki"],[49.22,143.10,"Poronaysk"],[52.33,143.05,"Val (Sakhalin)"],[44.02,144.27,"Abashiri (Hokkaidō)"]],
              h:[`Uilta — long called Orok in the literature — is spoken on Sakhalin in the Nogliki and Poronaysk districts, and by a small community that moved to Abashiri in Hokkaidō after the Second World War. It is one of the most endangered languages in the family: sources give eight to ten fluent speakers for the 2019–2025 period, against a 2020 census count of 116 people claiming the language — the usual gap between self-report and fluency.`,
                 `Uilta is a Nanaic language, closest to Nanai and Ulch across the Tatar Strait, and it belongs to the Sakhalin story that also produced Nivkh and Ainu settlements on the same island. The three are the last of a linguistic world that Russian and Japanese settlement erased within a century.`],
              t:[["19th c.","Orok/Uilta documented by Russian and Japanese scholars"],
                 ["1945–","Sakhalin divided; a Uilta community resettles in Hokkaidō"],
                 ["2019–25","8–10 fluent speakers by source; 116 claim the language in the 2020 census"],
                 ["Today","UNESCO: critically endangered"]] }
           ]},
         { id:"udegheic", en:"Udegheic (Ussuri group)", zh:"乌德盖语支", py:"Wūdégài yǔ zhī", sp:"≈680",
           region:"The Ussuri basin and the Sikhote-Alin range, Primorsky and Khabarovsk Krais", cls:"c-udg", mk:[],
           h:[`The Ussuri–Sikhote-Alin group: Udege in the mountains, Oroch to the north-east, and Kilen, extinct, along the Amur and Ussuri. This is the corner of the family that sits closest to the Chinese border, and the one that Russian settlement of Primorye hit first.`],
           kids:[
            { id:"udege", en:"Udege (Udihe)", zh:"乌德盖语", py:"Wūdégài yǔ", sp:"≈674",
              region:"Sikhote-Alin foothills, Primorsky and Khabarovsk Krais", cls:"c-udg",
              mk:[[46.53,135.62,"Krasny Yar"],[45.05,136.61,"Terney"],[47.75,136.90,"Khor river villages"],[46.20,135.00,"Bikin valley"]],
              h:[`Udege is the language of the Sikhote-Alin forests, spoken in villages along the Bikin, Khor and Samarga rivers. The 2020 census gave 674 speakers out of 1,325 Udege — an unusually high ratio for the region, and a reminder that these are small, tightly knit communities where the language can persist in one or two valleys while vanishing in the next.`,
                 `Udege is well documented linguistically: Irina Nikolaeva and Maria Tolskaya's <em>A Grammar of Udihe</em> (2001) is one of the best descriptions of any Tungusic language. Its dialects — including the extinct Kur-Urmi variety — are the main evidence for the Udegheic subgroup. UNESCO classes it as critically endangered.`],
              t:[["1890s–","Udege territory opened by Russian settlement of Primorye"],
                 ["1930s","Udege given a written form in Cyrillic"],
                 ["2020","674 speakers out of 1,325 Udege (census)"],
                 ["Today","UNESCO: critically endangered"]] },
            { id:"oroch", en:"Oroch", zh:"奥罗奇语", py:"Àoluóqí yǔ", sp:"8 (2010 census); last fluent speaker reported 2008",
              region:"Sovetskaya Gavan and the Tumnin river, Khabarovsk Krai", cls:"c-udg",
              mk:[[49.00,140.30,"Sovetskaya Gavan"],[49.09,140.25,"Vanino"],[49.70,140.10,"Tumnin river"]],
              h:[`Oroch is the clearest case in the family of a language that has effectively gone. The 2010 census recorded eight speakers; the Association of Indigenous Peoples of the Khabarovsk Krai stated that the last fluent speaker died in 2008, and at a meeting of elderly Orochi in 2010 the participants together could remember about twenty Oroch words and could not count to ten.`,
                 `The census record is itself a cautionary tale about counting small languages: the 2002 census reported 257 Oroch speakers, a figure known to be wrong because enumerators and respondents confused <em>Oroch</em> with the similarly named <em>Orok</em> (Uilta) on Sakhalin. Where this atlas gives figures for the Amur languages, it gives them as ranges for exactly this reason.`],
              t:[["2002","Census reports 257 speakers — later recognised as an error, confused with Orok"],
                 ["2008","Last fluent speaker reported to have died (Khabarovsk association)"],
                 ["2010","Eight speakers recorded; elders could recall ~20 words between them"],
                 ["Today","UNESCO: critically endangered; effectively dormant"]] },
            { id:"kilen", en:"Kilen (Kili)", zh:"奇列恩语", py:"Qíliè'ēn yǔ", sp:"extinct",
              region:"The Amur near Khabarovsk and along the Ussuri", cls:"c-ext",
              mk:[[48.90,135.50,"Amur near Khabarovsk (historical)"],[47.50,134.50,"Ussuri–Amur confluence (historical)"]],
              h:[`Kilen, also written Kili or Kur-Urmi, was the third Udegheic language, spoken by communities along the Amur near Khabarovsk and up the Ussuri. It is extinct, and it is included here because leaving it out would make the Udegheic branch look tidier and younger than it is — this is what the end of the process looks like.`,
                 `What survives is vocabulary and short texts recorded by nineteenth- and early twentieth-century travellers and linguists. Kilen is part of the reason the Udegheic subgroup is recognised at all: without it, Udege and Oroch look like a pair of isolated survivals rather than the remnant of a larger group.`],
              t:[["19th c.","Kilen recorded by travellers and linguists along the Amur"],
                 ["20th c.","Last speakers lost; the language passes out of use"],
                 ["Today","Extinct; known only from documentation"]] }
           ]},
         { id:"ewenic", en:"Ewenic (Northern group)", zh:"埃文语支", py:"Āiwén yǔ zhī", sp:"≈33,000",
           region:"The Siberian taiga from the Yenisei to Kamchatka, plus Inner Mongolia and Heilongjiang", cls:"c-ewn", mk:[],
           h:[`The northern half of the family, and the reason Tungusic is associated with reindeer rather than with emperors. Ewenic spreads over a territory larger than India: Evenki from the Yenisei to the Amur and Sakhalin, Even across the whole north-east, Negidal in a single stretch of the Amur, and Oroqen in the Hinggan forests of China.`],
           kids:[
            { id:"evenki", en:"Evenki (incl. Solon)", zh:"鄂温克语", py:"Èwēnkè yǔ", sp:"≈24,000",
              region:"Evenkia and Yakutia to the Amur; Inner Mongolia and Heilongjiang (Solon / 鄂温克)", cls:"c-ewn",
              mk:[[64.00,100.00,"Evenkia (Krasnoyarsk Krai)"],[62.03,129.73,"Yakutsk"],[51.90,116.60,"Nerchinsk (Transbaikal)"],[50.78,121.52,"Genhe (Inner Mongolia)"],[49.15,119.75,"Ewenki Autonomous Banner (Solon)"],[51.80,143.13,"Sakhalin Evenki"]],
              h:[`Evenki is the widest-spread Tungusic language by far, and probably the widest-spread language of any family relative to its speaker count: communities from the Yenisei to Sakhalin, from the Arctic treeline to the Amur, with Yakut, Russian, Chinese and Mongolian as neighbours depending on where you stand. Around 24,000 speakers by the most recent source — and UNESCO still classes it severely endangered, because that figure is spread over a territory the size of a continent.`,
                 `Its name is also its problem. "Evenki" covers what earlier literature called Tungus, and Chinese sources conventionally separate the Hulunbuir <em>Solon</em> (索伦 / 鄂温克) from the Oroqen, while Russian and English scholarship usually treats Solon as a dialect of Evenki. The tree above follows the linguistic convention; readers meeting Chinese statistics should expect the ethnic division instead.`,
                 `Evenki has been written in three scripts in a century: a Latin alphabet in the 1930s, Cyrillic from 1937, and experimentally in Mongolian script, which is the historic script of the Evenki of Manchuria and Inner Mongolia.`],
              t:[["17th c.","Russian expansion into Tungus territory; the ethnonym “Tungus” enters European use"],
                 ["1930s","Latin alphabet for Evenki, replaced by Cyrillic in 1937"],
                 ["1930–2007","Evenki Autonomous Okrug exists in Krasnoyarsk Krai; abolished in 2007"],
                 ["Today","≈24,000 speakers by source; UNESCO: severely endangered"]] },
            { id:"orogen", en:"Oroqen", zh:"鄂伦春语", py:"Èlúnchūn yǔ", sp:"≈3,800",
              region:"Oroqen Autonomous Banner (Hulunbuir) and the Da and Xiao Hinggan Ling", cls:"c-ewn",
              mk:[[50.57,123.72,"Alihe (Oroqen Banner)"],[51.72,126.65,"Huma"],[52.33,124.71,"Tahe"],[50.25,127.53,"Heihe"]],
              h:[`Oroqen is the Hinggan-forest member of the Evenki group: hunters of the Da and Xiao Hinggan ranges, organised since 1951 into the Oroqen Autonomous Banner in Hulunbuir. About 3,800 speakers were recorded in 2009, and UNESCO classes the language as critically endangered — the smallest of the Ewenic languages in China, and the one whose traditional economy was most completely reorganised in the twentieth century.`,
                 `Oroqen has no historic script. Materials produced since the 1980s have used either the International Phonetic Alphabet or Pinyin-based romanisation, and most speakers use Chinese as their literary language; some also speak Daur (Mongolic). Its two dialects, Gankui and Selpechen, differ enough that Gankui is treated as standard.`],
              t:[["1951","Oroqen Autonomous Banner established in Hulunbuir"],
                 ["1950s–80s","Hunting economy ends; settlement in fixed villages"],
                 ["1980s–","Oroqen teaching materials written in IPA or Pinyin"],
                 ["2009","≈3,789 speakers; UNESCO: critically endangered"]] },
            { id:"even", en:"Even (Lamut)", zh:"埃文语", py:"Āiwén yǔ", sp:"≈5,700",
              region:"Magadan, Chukotka, Kamchatka and northern Yakutia", cls:"c-ewn",
              mk:[[59.56,150.80,"Magadan"],[64.73,177.51,"Anadyr (Chukotka)"],[55.93,158.70,"Esso (Kamchatka)"],[63.46,142.79,"Oymyakon (Yakutia)"],[57.78,158.65,"Tigil (Kamchatka)"]],
              h:[`Even — historically called Lamut — is the language of reindeer herders spread from the Lena to Kamchatka and from the Arctic coast to the Aldan. The 2010 census recorded about 5,700 speakers out of some 21,800 Evens: a scattering so thin that the language survives as a chain of local varieties rather than a single standard, and UNESCO classes it severely endangered.`,
                 `Two varieties have already gone. The Arman dialect, an archaic form of Even spoken at the mouth of the Kolyma, died in the 1970s, and a western–eastern dialect division is all that remains of the old range. Even is written in Cyrillic, and it is one of the few Tungusic languages with a continuous publishing history in the Soviet period.`],
              t:[["17th–18th c.","Evens spread across the north-east with reindeer herding"],
                 ["1930s","Even written in Latin, then Cyrillic"],
                 ["1970s","The Arman dialect, at the Kolyma mouth, becomes extinct"],
                 ["2010","≈5,700 speakers out of ≈21,800 Evens (census)"],
                 ["Today","UNESCO: severely endangered"]] },
            { id:"negidal", en:"Negidal", zh:"涅吉达尔语", py:"Nièjídá'ěr yǔ", sp:"6 (2017) / 29 (2020 census)",
              region:"The Amur and Amgun basins, Khabarovsk Krai", cls:"c-ewn",
              mk:[[52.42,136.48,"Vladimirovka (P. Osipenko dist.)"],[53.15,140.72,"Nikolaevsk-on-Amur"],[52.00,137.00,"Amgun valley"]],
              h:[`Negidal is a small Ewenic language of the Amur and Amgun basins — the northernmost Tungusic presence on the great river, sandwiched between Nanai downstream and Evenki upcountry. Six speakers were reported in 2017; the 2020 census recorded 29 people claiming the language, against 510 ethnic Negidals. UNESCO classes it critically endangered.`,
                 `Its two dialects, Upper and Lower Negidal, are the reason it matters: the Lower dialect, now extinct, was markedly different from the Upper one, and the pair together are a rare window onto how Ewenic and Nanaic features met and mixed along the Amur. A field report published in 2018 described the remaining speakers as a handful of elderly people in two villages.`],
              t:[["1931","Negidal first described from fieldwork by Myl'nikova and Cincius"],
                 ["20th c.","The Lower Negidal dialect dies out"],
                 ["2017 / 2020","6 speakers reported (2017); 29 self-reported (2020 census)"],
                 ["Today","UNESCO: critically endangered"]] }
           ]}
       ]}
    ]}
 ]};

/* ---------- ISO 639-3 codes (SIL) — the codes behind the Forvo links ---------- */
const ISO = {
 tungusic:'tuw (family)', jurchen:'juc', manchuric:'mnc · sjo', manchu:'mnc', xibe:'sjo',
 nanaic:'gld · ulc · oaa', nanai:'gld', ulch:'ulc', uilta:'oaa',
 udegheic:'ude · oac', udege:'ude', oroch:'oac',
 ewenic:'evn · eve · neg · orh', evenki:'evn', orogen:'orh', even:'eve', negidal:'neg'
};

/* ---------- what makes each variety distinctive: structure, not history ---------- */
const FEATURES = {
 tungusic:[
  `<b>Vowel harmony</b> — the family's signature. Suffixes come in front-vowel and back-vowel shapes and must agree with the stem: Manchu <em>haha</em> "man" beside <em>hehe</em> "woman" is the classic illustration.`,
  `<b>Agglutination</b>: case, number and possession are all suffixes, stacked in a fixed order. Tungusic has no grammatical gender and no articles.`,
  `<b>Case systems</b> are large by East Asian standards — eight or more in Evenki and Even — and include a dedicated comitative and a prolative ("along, by way of").`,
  `<b>No lexical tone.</b> Unlike Sinitic, Kra–Dai or Vietic, Tungusic languages are not tonal; pitch differences are stress and length, not word identity.`,
  `<b>Vocabulary of the taiga</b>: reindeer, birch bark, snow types and river fish — a lexicon that maps onto a way of life rather than a territory.`
 ],
 prototung:[
  `<b>Reconstruction</b>: Cincius's comparative dictionary (1975–77) is the standard instrument; the voiced/voiceless series and the sibilant correspondences are the diagnostic sound laws.`,
  `<b>Homeland dispute</b>: a Baikal origin and an Argun–Hulunbuir origin both fit the vocabulary, and the two imply different dates for the family's spread.`
 ],
 jurchen:[
  `<b>Script</b>: the Jurchen script of 1119 is a Khitan-derived logographic–phonetic system — unrelated to the later Manchu alphabet, which is Mongolian-derived.`,
  `<b>Attested only sparsely</b>: the 1185 Jin Victory Memorial Stele, a handful of other inscriptions, and two Ming-dynasty dictionaries are the corpus.`,
  `<b>The link to Manchu</b> is linguistic, not graphic: Manchu descends from Jurchen as a language, but not from the Jurchen script as a writing system.`
 ],
 manchuric:[
  `<b>Two members, 4,000 km apart</b>: Manchu in Heilongjiang and Xibe in Xinjiang, separated since the 1764 garrison move.`,
  `<b>A written register without native speakers</b>: Manchu is read, translated and taught, but not transmitted at home — the clearest example of dormancy in the family.`
 ],
 manchu:[
  `<b>Script</b>: vertical, left-to-right columns, Mongolian-derived, with initial/medial/final letter forms and the dots and circles that disambiguate <em>k</em>, <em>g</em>, <em>h</em> and the <em>t</em>/<em>d</em> series.`,
  `<b>Dormancy, not death</b>: published counts range from ~100 fluent speakers to "several thousand" learners — a two-orders-of-magnitude spread, because the sources count different things.`,
  `<b>Vowel harmony</b> described by Qing grammarians in <em>yin</em>/<em>yang</em> terms, front vowels as feminine and back vowels as masculine.`,
  `<b>An archive language</b>: Manchu documents are still read by historians who cannot speak the language.`
 ],
 xibe:[
  `<b>The last living Manchu-type script</b>: everyday use of a Mongolian-derived vertical alphabet in a Chinese county.`,
  `<b>Divergence from Manchu</b> in morphology and syntax after 1764 — e.g. the converb in <em>-mak</em>, unknown in Manchu.`,
  `<b>Stress, not tone</b>, and vowel harmony retained; Sibe borrowings from Chinese, Uyghur and Kazakh mark two centuries of Ili-valley contact.`
 ],
 nanaic:[
  `<b>A river family</b>: all three languages name fish, nets, boats and river ice in cognate terms — Nanai, Ulch and Uilta share a maritime-freshwater vocabulary.`,
  `<b>Small phoneme inventories by Tungusic standards</b>, with strong vowel harmony and, in Nanai, a set of nasal vowels.`
 ],
 nanai:[
  `<b>The best-documented Amur language</b>, with a Soviet literary tradition from 1931 (Latin) and 1937 (Cyrillic).`,
  `<b>Nasal vowels</b> and a rich suffixal morphology; the written language was standardised on the Naykhin dialect.`,
  `<b>Two names, one language</b>: Nanai in Russia, Hezhen 赫哲 in China, Gold in older European sources.`
 ],
 ulch:[
  `<b>Consonant inventory</b> including uvular allophones of <em>k</em> and <em>x</em> before <em>a</em> and <em>o</em> — a lower-Amur trait.`,
  `<b>Oral literature</b>: the <em>telungu</em> narratives, recorded by Soviet scholars before transmission broke.`,
  `<b>Moribund, not extinct</b>: 150 speakers in 2010, essentially all elderly.`
 ],
 uilta:[
  `<b>Pitch accent</b> as well as vowel harmony, and a vowel system with length distinctions.`,
  `<b>Sakhalin's three-language island</b>: Uilta alongside Nivkh and Ainu, each now down to a handful of speakers.`,
  `<b>Written in Cyrillic</b>, with a small but active documentation effort and a community in Hokkaidō.`
 ],
 udegheic:[
  `<b>Ussuri–Sikhote-Alin group</b>: Udege, Oroch and the extinct Kilen, defined chiefly by shared sound changes against Ewenic.`,
  `<b>All three are moribund or extinct</b> — the branch with the fewest speakers left in the family.`
 ],
 udege:[
  `<b>Dialects as evidence</b>: the extinct Kur-Urmi variety is what ties Udege to the rest of the group.`,
  `<b>Well described</b>: Nikolaeva &amp; Tolskaya, <em>A Grammar of Udihe</em> (2001) — one of the fullest Tungusic grammars.`,
  `<b>Valley-by-valley survival</b>: 674 speakers out of 1,325 ethnic Udege in 2020, concentrated along the Bikin and Khor.`
 ],
 oroch:[
  `<b>A language whose last fluent speaker is dated</b>: 2008, per the Khabarovsk association of indigenous peoples.`,
  `<b>The census trap</b>: the 2002 figure of 257 speakers is wrong, the result of confusion with Orok/Uilta on Sakhalin.`,
  `<b>Documentation survives</b> in nineteenth- and twentieth-century records, so the language can still be studied.`
 ],
 kilen:[
  `<b>Extinct, and structurally informative</b>: Kilen is why Udegheic is recognised as a subgroup rather than an odd pair.`,
  `<b>Known only from records</b> — vocabulary lists and short texts collected along the Amur and Ussuri.`
 ],
 ewenic:[
  `<b>The northern, reindeer-herding half</b> of the family, spread from the Yenisei to Kamchatka.`,
  `<b>Mutual influence</b> with Yakut, Russian, Mongolic and, in China, Chinese — a contact zone rather than a single homeland.`
 ],
 evenki:[
  `<b>Range</b>: probably the widest geographical spread of any language relative to its speaker count — Yenisei to Sakhalin.`,
  `<b>Three scripts</b>: Latin (1930s), Cyrillic (from 1937), and experimentally Mongolian for the Manchurian–Inner Mongolian communities.`,
  `<b>Solon is a dialect here, an ethnicity in Chinese statistics</b> — the clearest case in this atlas of a classification that depends on who is counting.`,
  `<b>Nomadic vocabulary</b>: reindeer terms, seasonal camp terms, and a set of directional suffixes unusual even within Tungusic.`
 ],
 orogen:[
  `<b>Two dialects</b>, Gankui (standard) and Selpechen, in the Da and Xiao Hinggan ranges.`,
  `<b>No historic script</b>: teaching materials use IPA or Pinyin, and Chinese is the literary language.`,
  `<b>Reindeer and hunting lexicon</b> now largely obsolete, with the traditional economy ended in the twentieth century.`
 ],
 even:[
  `<b>A chain of varieties, not a standard</b>: western and eastern Even differ markedly across the Lena-to-Kamchatka range.`,
  `<b>Arman is gone</b>: the archaic Kolyma-mouth variety died in the 1970s.`,
  `<b>Reindeer terminology</b> is unusually rich even by Tungusic standards, and Even has a long Cyrillic publishing history.`
 ],
 negidal:[
  `<b>Upper and Lower dialects</b>: the extinct Lower Negidal was markedly different, and the pair is key evidence for Ewenic–Nanaic contact.`,
  `<b>Six speakers in 2017</b>, twenty-nine self-reports in 2020 — the arithmetic of a language at the edge.`,
  `<b>Amur–Amgun position</b>: the northernmost Tungusic presence on the great river.`
 ]
};

/* ---------- schematic outline (simplified, embedded; [lng,lat] rings) ----------
   Drawn by hand for this atlas: the Manchurian plain, the Amur and Ussuri basins,
   Sakhalin, and a coarse Okhotsk–Kamchatka coast so the Even markers are not
   floating in space. Not a coastline survey — see the sketch caption. */
const MANCHURIA = [[119.5,53.5],[122.0,53.6],[125.5,53.5],[127.5,53.0],[130.7,53.3],[133.0,54.0],[136.0,54.5],[137.5,55.0],[140.5,53.5],[141.5,52.0],[140.5,50.0],[140.0,48.0],[139.5,46.0],[138.0,44.5],[135.5,43.3],[133.5,42.7],[131.0,42.5],[130.6,42.4],[129.5,42.0],[128.0,41.5],[126.5,41.0],[124.5,40.0],[122.0,40.5],[121.5,41.5],[120.0,42.5],[119.0,42.0],[117.5,42.5],[116.0,43.5],[114.5,45.0],[115.5,47.0],[117.0,47.5],[117.5,49.5],[119.0,50.0],[118.5,51.5],[119.5,53.5]];
const SAKHALIN = [[142.6,54.4],[143.4,53.0],[143.6,51.5],[143.4,50.0],[143.0,48.5],[142.7,47.0],[142.4,46.0],[142.0,46.5],[141.8,47.5],[141.7,48.5],[141.9,49.5],[141.6,51.0],[141.7,52.5],[142.0,53.5],[142.6,54.4]];
const OKHOTSK = [[137.0,55.0],[140.0,57.0],[143.0,59.0],[147.0,59.8],[151.0,59.5],[155.0,59.8],[158.5,61.5],[162.0,62.5],[165.0,61.5],[166.5,59.0],[164.5,57.0],[162.0,56.0],[159.5,54.0],[157.0,52.0],[156.0,51.0],[155.2,53.0],[155.8,55.5],[155.0,57.5],[152.0,59.0],[148.0,59.0],[144.0,58.5],[140.5,56.5],[137.0,55.0]];
const TUNGUS_GEO = { type:'FeatureCollection', features:[MANCHURIA,SAKHALIN,OKHOTSK].map(r=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };

/* ---------- approximate "core areas" ----------
   Hand-drawn coarse blocks showing roughly where each branch is rooted — NOT
   surveyed boundaries, and deliberately crude: they omit enclaves, ignore the
   fact that Evenki is a scatter rather than a block, and simplify coastlines.
   The marker layer remains the factual one. */
const AREAS = {
 'c-jur':[[[121.0,45.0],[124.0,48.5],[128.0,48.0],[130.5,44.5],[128.5,41.5],[124.5,40.5],[121.5,42.0]]],
 'c-man':[
  [[119.0,42.0],[124.0,47.5],[128.0,47.0],[129.5,44.0],[127.0,41.0],[123.0,40.0],[119.5,41.0]],
  [[115.6,40.6],[117.4,40.6],[117.4,39.3],[115.6,39.3]],
  [[79.8,45.2],[84.0,45.2],[84.0,42.4],[79.8,42.4]]
 ],
 'c-nan':[[[129.5,50.5],[134.0,52.5],[140.5,53.5],[141.5,51.5],[139.5,48.5],[135.0,47.5],[130.0,47.5]]],
 'c-udg':[[[129.5,48.5],[135.5,49.5],[139.5,46.5],[137.5,43.0],[133.0,42.3],[130.0,44.0]]],
 'c-ewn':[[[94.0,68.5],[112.0,70.0],[130.0,66.0],[140.0,60.0],[152.0,60.5],[163.0,62.0],[168.0,59.0],[160.0,55.0],[150.0,53.5],[138.0,52.0],[128.0,50.5],[116.0,49.0],[104.0,51.0],[94.0,57.0]]],
 'c-ext':[[[134.0,50.0],[137.5,50.0],[137.5,48.3],[134.0,48.3]]]
};
/* ---------- listen links: an Omniglot page where one exists, plus the engine's
   YouTube-search fallback on every node. Omniglot URLs checked 2026-09-26 —
   see research.md, TU-109 "Link health". ---------- */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 tungusic:   [['Tungusic languages — Omniglot index', 'https://www.omniglot.com/writing/langfam.htm']],
 prototung:  [],
 jurchen:    [['Jurchen script — Omniglot', OM+'jurchen.htm']],
 manchuric:  [['Manchu alphabet — Omniglot', OM+'manchu.htm']],
 manchu:     [['Manchu — Omniglot (with sample text)', OM+'manchu.htm']],
 xibe:       [['Xibe — Omniglot', OM+'xibe.htm']],
 nanaic:     [['Nanai — Omniglot', OM+'nanai.htm'], ['Ulch — Omniglot', OM+'ulch.htm'], ['Orok / Uilta — Omniglot', OM+'orok.htm']],
 nanai:      [['Nanai — Omniglot', OM+'nanai.htm']],
 ulch:       [['Ulch — Omniglot', OM+'ulch.htm']],
 uilta:      [['Orok / Uilta — Omniglot', OM+'orok.htm']],
 udegheic:   [['Udege — Omniglot', OM+'udege.htm'], ['Oroch — Omniglot', OM+'oroch.htm'], ['Kili — Omniglot', OM+'kili.htm']],
 udege:      [['Udege — Omniglot', OM+'udege.htm']],
 oroch:      [['Oroch — Omniglot', OM+'oroch.htm']],
 kilen:      [['Kili — Omniglot', OM+'kili.htm']],
 ewenic:     [['Evenki — Omniglot', OM+'evenki.htm'], ['Even — Omniglot', OM+'even.htm']],
 evenki:     [['Evenki — Omniglot (with sample text)', OM+'evenki.htm']],
 orogen:     [['Oroqen — Omniglot', OM+'oroqen.htm']],
 even:       [['Even — Omniglot', OM+'even.htm']],
 negidal:    [['Negidal — Omniglot', OM+'negidal.htm']]
};

/* ===================== the atlas contract (languages.md §1.3) ===================== */
window.ATLASES = window.ATLASES || {};
window.ATLASES.tungusic = {
  key: 'tungusic',
  title:   { zh: '通古斯', en: 'Tungusic' },
  tagline: 'The forest and river family of Manchuria, the Amur and Siberia — from the Manchu script to the last Oroch speakers',
  stats:   [['12', 'living languages'], ['≈75,000', 'speakers, by source'], ['3', 'scripts in four centuries']],
  palette: {
    anc: '#cdd7de', jur: '#7c8fa3', man: '#3f8ec9', nan: '#3fb0a0', udg: '#5fb96a', ewn: '#a8c94f', ext: '#8b94a8'
  },
  legend:  [['anc','Ancestral / proto'],['jur','Jurchenic (historical)'],['man','Manchu–Xibe'],['nan','Nanaic (Amur)'],['udg','Udegheic (Ussuri)'],['ewn','Ewenic (Northern)'],['ext','Extinct']],
  view:    { center: [122, 50], zoom: 3.6 },
  outline: { color: '#a8c94f', fill: 'rgba(168,201,79,0.06)' },
  sketchGeo: TUNGUS_GEO,
  captions: {
    note:   '● Markers show <b>representative settlements</b> where the selected variety is rooted, plus a few diaspora points (Beijing’s banner garrisons, Abashiri in Hokkaidō). For a family this thin a marker means <em>a village or district where the language is still present</em> — not that everyone there speaks it. Khabarovsk, Harbin and Ürümqi are administrative centres, not speech communities.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — coarse hand-drawn blocks showing roughly where each branch is rooted. They follow no surveyed boundary; the Ewenic block in particular is a <em>scatter</em> of settlements across the taiga, not a territory. Real Tungusic boundaries are graded, follow rivers, and are shrinking yearly, and no surveyed boundary data for this family is available as open data.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn Manchurian plain, Amur and Ussuri basin, Sakhalin and a coarse Okhotsk–Kamchatka coast, simplified from memory of the geography; the markers sit at true coordinates. Works fully offline.'
  },
  fonts: ['Noto Sans Mongolian', 'Noto Sans SC'],
  filterPlaceholder: 'e.g. Manchu, Evenki, Sakhalin…',
  listen: {
    om: 'https://www.omniglot.com/writing/',
    fv: 'https://forvo.com/languages/',
    search: 'Tungusic language native speaker'
  },
  rootId: 'tungusic',
  stages: ['prototung', 'jurchen'],
  sources: 'Sources: G. J. Benzing, <i>Die tungusischen Sprachen</i> (1955) · V. I. Cincius et al., <i>Sravnitel’nyj slovar’ tunguso-man’čžurskich jazykov</i> (1975–77) · D. Kane, <i>The Sino-Jurchen Vocabulary of the Bureau of Interpreters</i> (1989) and Manchu studies · J. Janhunen on Tungusic · I. Nikolaeva &amp; M. Tolskaya, <i>A Grammar of Udihe</i> (2001) · B. Pakendorf &amp; N. Aralova, “The endangered state of Negidal” (<i>Language Documentation &amp; Conservation</i> 12, 2018) · the UNESCO <i>Atlas of the World’s Languages in Danger</i> for endangerment grades · Ethnologue and Glottolog for ISO 639-3 codes and counts. Speaker figures are approximations and vary widely: the Russian censuses, Chinese statistics and fieldworker counts for these communities disagree with each other, and two figures used in published sources for this family (Oroch 2002, Uilta 2020) are known to be wrong. Romanisation follows the cited sources rather than a single system.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();

