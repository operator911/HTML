/* atlas-japonic.js — Japonic & Ainu 日本語族・アイヌ語
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (languages.md §1.3 contract, §2.5 brief,
 * research.md §"Japonic & Ainu (Phase 3)" for the evidence log — JP-101…JP-110).
 *
 * This is the only atlas in the series carrying TWO unrelated things: the
 * Japonic family (Japanese + Ryukyuan + Hachijō) and Ainu, a family of its own
 * with no demonstrated relative anywhere. The Ainu branch is coloured ochre so
 * the difference reads at a glance.
 *
 * ISO 639-3 codes below were checked against the SIL ISO 639-3 register itself
 * (iso-639-3.tab, https://iso639-3.sil.org/code_tables/download_tables,
 * retrieved 2026-09-26), not against secondary lists. Three findings it forces:
 *   · the family has no 639-3 code; ISO 639-5 carries the collective `jpx`;
 *   · Hachijō, Sakhalin Ainu and Kuril Ainu have NO 639-3 code at all
 *     (Hachijō has only the withdrawn 639-6 code `hhjm`);
 *   · `ojp` ("Old Japanese") IS in the register, with type H (historical).
 * False friend to avoid: the register also carries `aib` "Ainu (China)", an
 * unrelated Turkic language of Xinjiang. Ainu here is `ain`, "Ainu (Japan)".
 *
 * ⚠ research.md JP-104 records a live source conflict: the 2009 UNESCO Atlas
 * (restated by Japan's Agency for Cultural Affairs) grades Yaeyama *severely
 * endangered*, while the English Wikipedia infobox on Yaeyama says *definitely
 * endangered*. The atlas follows the 2009 Atlas and says so in the node.
 * ⚠ JP-102 records a correction to this family's brief: Kyūshū Japanese is
 * Hichiku / Hōnichi / Satsugu — three groups, and not "Hōhichi".
 *
 * Cross-links: the root notes the shared script sphere with #sinitic (kanji
 * loaned into Japanese, kana then derived from kanji). There is no other
 * genealogical link into the Sinitic atlas, and the prose says so.
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree ===================== */
const DATA = {
 id:"japonic", en:"Japonic & Ainu", zh:"日本語族・アイヌ語", py:"Rìběnyǔzú · Āinǔyǔ",
 sp:"≈123 million, plus a few Ainu speakers",
 region:"The Japanese archipelago, the Ryukyu chain, Sakhalin and the Kuril Islands",
 cls:"c-anc", mk:[],
 h:[`This atlas holds two things that are not related to each other. <b>Japonic</b> is a family of about 123 million speakers, universally accepted as a family, made up of mainland Japanese, the Ryukyuan languages of the Ryukyu chain, and Hachijō — a relic of eastern Old Japanese stranded on an island south of Tōkyō. <b>Ainu</b> is a separate family, conventionally described as an isolate: no genealogical relationship between Ainu and any other family has ever been demonstrated, though many have been proposed.`,
   `The two are told together because they share a stage. Japonic arrived in the archipelago from the Korean peninsula with Yayoi wet-rice farming, in the first millennium BC, and spread north and south, replacing whatever was there. Ainu is plausibly part of what was there — toponymic evidence puts Ainu place-names across northern Honshū, and the traditional <i>matagi</i> hunters of Tōhoku still carry Ainu words in their hunting vocabulary. The direction of that story is disputed: Ainu may be the language of the Jōmon population pushed north by Japonic, or Ainu may itself have expanded late, out of Hokkaidō and Sakhalin.`,
   `The Sinitic atlas is the neighbour here, and the link is script, not genes. Japanese borrowed Chinese characters from the 5th century onwards, used them phonetically as <i>man'yōgana</i>, and then simplified them into kana in the 9th century — hiragana out of cursive kanji, katakana out of fragments of kanji used by monks in Nara. So <a href="#sinitic">the Sinitic atlas</a> and this one share a writing system without sharing a family. Beyond that there is no genealogical connection in either direction, and the resemblance to Koreanic — the other neighbour — is exactly that: a resemblance, with no relationship conclusively demonstrated.`,
   `Endangerment runs in bands across this atlas. Standard Japanese is one of the most secure languages on earth, and it has been eating its own relatives for a century and a half: the Tōhoku dialects are retreating, Hachijō has a few hundred speakers, and all six Ryukyuan languages are on UNESCO's danger list — four <i>definitely</i> endangered and two <i>severely</i>. Ainu is the far end of the same process: declared <i>critically endangered</i> in 2009, and described by its own handbook in 2022 as "more or less extinct, or 'dormant', as a living medium", while a growing number of neo-speakers learn it.`],
 t:[["c. 700–300 BCE","Japonic reaches northern Kyūshū with Yayoi wet-rice farming, by the standard account"],
    ["7th–8th c. CE","Old Japanese recorded in Chinese characters; the <i>Man'yōshū</i> and the <i>Fudoki</i>"],
    ["9th c.","Katakana and hiragana develop out of <i>man'yōgana</i>"],
    ["before the 7th c.","Japanese and Ryukyuan separate, by the reconstruction"],
    ["10th–11th c.","Ryukyuan spreads through the islands with the Gusuku culture, from southern Kyūshū"],
    ["1609","Satsuma conquers the Ryukyu Kingdom; Ryukyuan borrows heavily from Japanese"],
    ["1869","Hokkaidō Colonization Office founded; Ainu language suppression begins in earnest"],
    ["1879","Japan annexes the Ryukyu Kingdom; Ryukyuan languages suppressed in schools"],
    ["1890s–1945","<i>Hōgen fuda</i> dialect tags humiliate Ryukyuan and Tōhoku schoolchildren"],
    ["1962","Kuril Ainu extinct"],
    ["1994","Sakhalin Ainu extinct, with the death of Take Asai on 30 April"],
    ["1997","Ainu Cultural Promotion Act; the Foundation for Research and Promotion of Ainu Culture"],
    ["2009","UNESCO Atlas lists eight Japanese entries: one critically, two severely, five definitely endangered"],
    ["2019","Japan enacts a law recognising the Ainu as an indigenous people (19 April)"],
    ["2020","National Ainu Museum (<i>Upopoy</i>) opens at Shiraoi, Hokkaidō"]],
 kids:[
  { id:"protojaponic", en:"Proto-Japonic", zh:"原始日语", py:"Yuánshǐ Rìyǔ", sp:"reconstructed",
    region:"By reconstruction, the Japanese archipelago — most likely brought to northern Kyūshū from the Korean peninsula",
    cls:"c-anc", mk:[[33.6,130.4,"Northern Kyūshū (the usual homeland centre)"],[35.8,128.6,"Southern Korea (the proposed Peninsular Japonic zone)"]],
    h:[`The reconstructed ancestor, usually called Proto-Japonic and sometimes Proto-Japanese–Ryukyuan. Its two daughters are Old Japanese and Proto-Ryukyuan, and the family's shape is mostly an argument about how long before the 7th century those two parted company. Because Old Japanese shows innovations that Ryukyuan does not share, the split must predate the 7th century; the migration to the Ryukyus from southern Kyūshū may then have coincided with the expansion of the agricultural Gusuku culture in the 10th and 11th centuries.`,
       `The standard account has Japonic arriving in northern Kyūshū from the Korean peninsula around 700–300 BCE with Yayoi wet-rice farmers, spreading through the archipelago while replacing indigenous languages. Fragmentary evidence suggests Japonic was still spoken in the central and southern Korean peninsula in the early centuries CE — the "Peninsular Japonic" hypothesis, built on place-name glosses in Chinese histories — but that material is thin and the hypothesis is not settled.`,
       `Reconstruction runs on two engines: internal reconstruction from Old Japanese, which produced Samuel Martin's and Shirō Hattori's 20th-century systems, and the comparative method across Old Japanese, Eastern Old Japanese and the Ryukyuan languages, which has grown in importance since Hattori's work in the 1970s. Proto-Japonic words are generally polysyllabic with (C)V syllables — a shape mainland Japanese has since ground down and Ryukyuan has partly kept.`],
    t:[["c. 700–300 BCE","The Yayoi spread, by the standard account"],
       ["before the 7th c. CE","Old Japanese and Proto-Ryukyuan separate"],
       ["1910s–1970s","Internal reconstruction from Old Japanese: Martin, Hattori"],
       ["1970s–","Comparative reconstruction from Ryukyuan grows in importance"]]},
  { id:"japanese", en:"Mainland Japanese", zh:"本土日语", py:"Běntǔ Rìyǔ", sp:"≈123 million, by source",
    region:"Honshū, Kyūshū, Shikoku, Hokkaidō and the worldwide diaspora",
    cls:"c-jpn", mk:[[35.69,139.69,"Tōkyō (the standard)"],[34.69,135.50,"Osaka"],[35.18,136.91,"Nagoya"],
      [43.06,141.35,"Sapporo"],[33.59,130.40,"Fukuoka"],[38.27,140.87,"Sendai"],
      [36.56,136.66,"Kanazawa"],[35.47,133.05,"Matsue"],[31.60,130.56,"Kagoshima"],
      [41.77,140.73,"Hakodate"],[40.82,140.74,"Aomori"]],
    h:[`Japanese is spoken by around 123 million people, by source, and is the only national language of Japan. Its attested history is deep and continuous: Old Japanese in the 8th century, Early Middle Japanese in the Heian period, Late Middle Japanese from 1185 — the first stage described by Europeans, in the Jesuits' <i>Arte da Lingoa de Iapam</i> — Early Modern Japanese from the 17th century, and Modern Japanese after 1853. The standard moved with power: the prestige variety was the Kyōto (Kansai) dialect while Kyōto was the capital, and shifted to the Edo (Tōkyō) dialect in the late 18th century, when glossaries of the period began using Edo speech as the reference form.`,
       `The dialect map is the interesting part, because it records settlement and a long east–west divide. The main line runs between Eastern and Western Japanese and follows the pitch-accent isogloss: the complex Kyōto-type accent to the west, the simpler Tōkyō-type to the east. The same line carries grammatical differences — the copula is <i>da</i> in the east and <i>ja</i> or <i>ya</i> in the west; the negative is <i>-nai</i> in the east and <i>-nu</i> or <i>-n</i> in the west; the existential verb is <i>iru</i> in the east and <i>oru</i> in the west. Modern standard Japanese is Eastern in these respects but carries Western forms in its honourific register — <i>ohayō gozaimasu</i>, the humble <i>oru</i>, the polite negative <i>-masen</i> — all borrowed from the Kyōto court.`,
       `Kyūshū is the outlier and is usually split into <b>three</b> groups of its own: <b>Hichiku</b> in the north-west, <b>Hōnichi</b> in the north-east, and <b>Satsugu</b> — the Kagoshima dialect — in the south. Kyūshū shares lexical items with the Ryukyuan languages, and some scholars have proposed that the Kyūshū dialects and Ryukyuan together form one group within Japonic; Satsugu is distinctive enough that it has been called a fourth branch of Japanese alongside Eastern, Western and the rest of Kyūshū.`,
       `Standard Japanese has been levelling this picture since the Meiji period, when the government built <i>hyōjungo</i> ("standard language") on Tōkyō middle-class speech, put it in school textbooks, and made dialect speakers feel their speech was backward. After the war the milder concept of <i>kyōtsūgo</i> ("common language") replaced it. The result is a generation of Japanese speakers who understand their local dialect but do not use it — and, at the edges, the varieties below, which are now measured by how many children still learn them.`],
    t:[["8th c.","Old Japanese: the <i>Man'yōshū</i> corpus"],
       ["794–1185","Early Middle Japanese; Sino-Japanese vocabulary floods in"],
       ["1185–1600","Late Middle Japanese; European loanwords appear"],
       ["17th c.–1868","Early Modern Japanese; the standard shifts to Edo"],
       ["1868–","Meiji <i>hyōjungo</i> policy spreads Tōkyō speech nationwide"],
       ["1940s–1960s","The push to replace regional varieties with standard peaks"]],
    kids:[
     { id:"kyushu", en:"Kyūshū (Hichiku · Hōnichi · Satsugu)", zh:"九州方言", py:"Jiǔzhōu fāngyán", sp:"by source",
       region:"Kyūshū and the offshore islands — Fukuoka, Saga, Nagasaki, Kumamoto, Ōita, Miyazaki, Kagoshima",
       cls:"c-jpn", mk:[[33.59,130.40,"Fukuoka (Hichiku)"],[33.25,130.30,"Saga (Hichiku)"],
         [32.75,129.87,"Nagasaki (Hichiku)"],[32.80,130.71,"Kumamoto (Hichiku)"],
         [33.24,131.61,"Ōita (Hōnichi)"],[31.91,131.42,"Miyazaki (Hōnichi)"],
         [33.88,130.88,"Kitakyūshū (Hōnichi)"],[31.60,130.56,"Kagoshima (Satsugu)"]],
       h:[`Kyūshū is where Japanese is least like standard Japanese, and it is not one thing but three. <b>Hichiku</b> covers the north-west — Fukuoka, Saga, Nagasaki, Kumamoto. <b>Hōnichi</b> covers the north-east — Ōita, Miyazaki, and Kitakyūshū. <b>Satsugu</b> is the Kagoshima dialect in the south, the most divergent of the three. The division is not merely geographic: <i>ka</i>-adjectives, the emphatic sentence-final particles <i>tai</i> and <i>bai</i>, and the concessive <i>batten</i> are shared by Hichiku and Satsugu but not by Hōnichi.`,
          `Several features set the whole island off from the rest of Japan. The nominalisation and question particle is <i>to</i> rather than <i>no</i>, giving <i>iku to tai?</i> for standard <i>iku no yo</i>. The directional particle is <i>sai</i> where standard has <i>e</i> or <i>ni</i>. The accusative particle <i>o</i> resyllabifies the noun before it — <i>honno</i> for <i>hon-o</i>. The /r/ of <i>kore</i> drops, giving <i>koi</i>. Vowel reduction is heavy in Satsugu and the Gotō Islands: <i>in</i> for <i>inu</i>, <i>kuQ</i> for <i>kubi</i>.`,
          `The Kagoshima dialect is unusual enough that some scholars have called it a fourth branch of Japanese alongside Eastern, Western and the rest of Kyūshū, and much of Kyūshū either lacks pitch accent altogether or has an accent system of its own. Kyūshū also shares lexical material with the Ryukyuan languages, some of it apparently innovative rather than inherited — which is why the Kyūshū–Ryukyuan relationship is one of the live questions in Japonic classification.`],
       t:[["Old Japanese era","Eastern-style imperatives <i>miro ~ mire</i> in Kyūshū, unlike Western <i>miyo</i>"],
          ["Edo period","Some Kyūshū isoglosses follow old <i>han</i> borders"],
          ["1967","A Tokyo-listener intelligibility survey ranks Kagoshima near the bottom (17.6%)"],
          ["present","Satsugu and Gotō speech remain the most opaque to outsiders"]]},
     { id:"kansai", en:"Kansai", zh:"关西方言", py:"Guānxī fāngyán", sp:"by source",
       region:"The Kyōto–Osaka–Kobe–Nara core of western Honshū",
       cls:"c-jpn", mk:[[35.01,135.77,"Kyōto (the old prestige form)"],[34.69,135.50,"Osaka"],
         [34.69,135.20,"Kobe"],[34.69,135.80,"Nara"]],
       h:[`Kansai is the dialect region that used to be the standard. Kyōto was the capital for a thousand years, and the court's speech was the reference form for the written language and, above all, for honourifics — which is why modern standard Japanese still says <i>ohayō gozaimasu</i> rather than <i>ohayaku</i>, uses the humble <i>oru</i>, and forms its polite negative as <i>-masen</i> on the Kyōto model. Kansai speech is also the source of a scattering of everyday standard words, among them <i>yaru</i>, <i>kaminari</i> and <i>asatte</i>.`,
          `The Kansai-type pitch accent is the complex one: it preserves distinctions the Tōkyō-type accent, and the standard built on it, have lost. The dialect also keeps the vowel sequences /ai/, /oi/ and /ui/ intact where eastern dialects coalesce them into [eː], [eː] and [iː] — so standard Japanese patterns with Kyōto here rather than with the east.`,
          `The region's cultural weight has kept it visible in a way Kyūshū speech is not. Osaka dialect in particular is nationally associated with comedy, and Kansai forms are widely understood outside the region even by speakers who do not use them. In the 1967 intelligibility survey run on Tokyo-area students, Kyōto scored 67.1% — the highest of any non-Tōkyō variety tested, and far above Osaka's 26.4%.`],
       t:[["794–1868","Kyōto speech is the prestige form and the model for honourifics"],
          ["late 18th c.","Edo speech displaces it in the glossaries"],
          ["1967","Kyōto scores 67.1% intelligibility to Tokyo students — the highest tested"],
          ["present","Kansai forms remain widely understood, and are borrowed into the standard"]]},
     { id:"tohoku", en:"Tōhoku", zh:"东北方言", py:"Dōngběi fāngyán", sp:"by source — in retreat",
       region:"Northern Honshū — Aomori, Iwate, Akita, Yamagata, Miyagi, Fukushima",
       cls:"c-jpn", mk:[[40.82,140.74,"Aomori"],[39.70,141.15,"Morioka"],[39.72,140.10,"Akita"],
         [38.26,140.34,"Yamagata"],[38.27,140.87,"Sendai"],[37.75,140.47,"Fukushima"]],
       h:[`The Tōhoku dialects run across the north of Honshū, and they are the clearest case in Japan of a regional variety being talked out of existence. They are eastern in the main east–west division, but they differ markedly from the standard in accent and verb morphology, and they carry a large set of local vocabulary. Like the Ryukyus, Tōhoku is where the Meiji <i>hyōjungo</i> campaign did its most conspicuous damage: the <i>hōgen fuda</i>, a dialect tag hung round the neck of a child caught speaking the local form, was used in Tōhoku schools as well as in Okinawa.`,
          `The dialects also preserve a boundary that has nothing to do with language and everything to do with politics: several Tōhoku isoglosses follow the borders of the old <i>han</i> domains, because Edo-period lords restricted movement between fiefs and the speech inside each drifted apart. That is why the region is a patchwork rather than a single dialect, and why the Aomori and Iwate forms differ as much as they do.`,
          `Tōhoku is also where the Ainu question becomes visible in Japanese. Toponymic evidence — place-names explicable in Ainu but not in Japanese — reaches down through northern Honshū, and the traditional <i>matagi</i> hunters of the Tōhoku mountains kept Ainu words in their hunting vocabulary. The usual reading is that Ainu was spoken here before Japonic spread north; a rival reading has the Emishi speaking a Japonic variety closer to ancient Izumo, with Ainu arriving later from Hokkaidō. The atlas states the dispute rather than resolving it.`],
       t:[["8th c.","Eastern Old Japanese recorded in the <i>azuma uta</i> of the <i>Man'yōshū</i>"],
          ["Edo period","<i>Han</i> borders leave their mark on dialect boundaries"],
          ["Meiji–1945","Dialect tags used in Tōhoku schools against local speech"],
          ["1940s–1960s","Replacement of regional varieties by standard peaks"],
          ["present","Children increasingly monolingual in standard Japanese"]]},
     { id:"kanto", en:"Kantō / Tōkyō standard", zh:"关东・东京标准语", py:"Guāndōng · Dōngjīng biāozhǔnyǔ", sp:"the standard",
       region:"The Kantō plain — Tōkyō, Yokohama, Chiba, Saitama — and, as standard Japanese, the whole country",
       cls:"c-jpn", mk:[[35.69,139.69,"Tōkyō"],[35.44,139.64,"Yokohama"],
         [35.61,140.12,"Chiba"],[35.86,139.65,"Saitama"]],
       h:[`The Kantō dialects include the one variety that stopped being a dialect and became the standard. The Tōkyō middle class's speech was taken as the model for Meiji <i>hyōjungo</i>, and through schooling, mass media and internal migration it has become the everyday language of most of Japan — including the Ryukyu Islands and Hokkaidō, where it is now the first language of the young.`,
          `The Tōkyō-type pitch accent is the simpler of the two great accent systems: it marks a downstep but not the full tone-and-downstep pattern of Kyōto. That simplicity is not a mark of age — it is a set of losses — and the standard's adoption of it is why the accent of standard Japanese looks eastern while much of its vocabulary and honourific grammar looks western.`,
          `Kantō speech also shares in the general eastern pattern of vowel coalescence, in which /ai/, /oi/ and /ui/ become [eː], [eː] and [iː] — the feature that makes standard Japanese differ from Kyōto on exactly the words where a learner least expects it. The dialect's present status is the opposite of every other node in this atlas: it is not endangered, it is the thing doing the endangering.`],
       t:[["late 18th c.","Edo speech is treated as the reference form in glossaries"],
          ["1868–","Meiji <i>hyōjungo</i> is built on Tōkyō middle-class speech"],
          ["1920s–","Radio and later television broadcast the standard nationwide"],
          ["present","Standard Japanese is the first language of most young Japanese"]]},
     { id:"hokuriku", en:"Hokuriku", zh:"北陆方言", py:"Běilù fāngyán", sp:"by source",
       region:"The Japan Sea coast — Niigata, Toyama, Ishikawa (Kanazawa), Fukui",
       cls:"c-jpn", mk:[[37.92,139.04,"Niigata"],[36.70,137.21,"Toyama"],
         [36.56,136.66,"Kanazawa"],[36.07,136.22,"Fukui"]],
       h:[`The Hokuriku dialects run down the Japan Sea coast, from Niigata through Toyama and Ishikawa to Fukui, and they sit on the seam between the two great dialect blocks. The pitch-accent isogloss crosses this coast rather than running neatly beside it, so Hokuriku speech has the Kyōto-type accent in some places and the Tōkyō-type in others, and the same is true of the grammatical features that normally travel with the accent line.`,
          `That seam is the reason Hokuriku matters out of proportion to its size. The Kansai-based and Eastern systems meet here and interleave, which is exactly what a dialect geographer wants: the boundary is not a line but a braid, and the coastal valleys that carry it are also the historical route by which Kansai influence reached the north.`,
          `The regional standard for the coast is Kanazawa, which was a major castle town and a centre of craft production, and its speech carries the prestige within the region. Snow-country vocabulary for snow, sledges, roof-work and preserved food is unusually rich here, as it is on the Tōhoku side of the mountains.`],
       t:[["Edo period","Kanazawa and the Kaga domain give the coast its regional prestige form"],
          ["Meiji–","Standard Japanese spreads along the coast from Tōkyō and from Kansai"],
          ["present","Local forms remain strong in everyday speech, weaker among the young"]]},
     { id:"izumo", en:"Izumo", zh:"出云方言", py:"Chūyún fāngyán", sp:"by source",
       region:"The Izumo region of Shimane Prefecture, on the Japan Sea coast of western Honshū",
       cls:"c-jpn", mk:[[35.47,133.05,"Matsue"],[35.37,132.75,"Izumo"]],
       h:[`The Izumo dialect is a small variety on the Shimane coast with an outsized place in the arguments, because it is one of the dialects Kindaichi Haruhiko grouped with the "outer" ring of Japanese — alongside eastern Kantō, Tōhoku, Kyūshū and Hachijō — on the evidence of accent, phonology and conjugation. That grouping is the reason Izumo appears as a node here at all: it is not large, but it is a witness.`,
          `It also appears in the Ainu debate. One proposal for who the Emishi of northern Honshū were has them speaking a Japonic variety closest to ancient Izumo, with Ainu speakers arriving in the north only later, from Hokkaidō — an argument that leans on old-Japanese loanwords in Ainu and on Japonic-looking place-names in Tōhoku and Hokkaidō. The competing proposal makes the Emishi Ainu-speaking. Both are in the literature; neither is settled.`,
          `Izumo itself is the setting of some of the oldest Japanese myth, and the region's speech keeps archaic forms that the standard has lost — the kind of conservative profile that makes a peripheral dialect useful to reconstruction even when it has few speakers.`],
       t:[["8th c.","Izumo named in the earliest Japanese records and myth cycles"],
          ["20th c.","Kindaichi groups Izumo with the “outer” dialects of Japanese"],
          ["present","A small variety, but a witness in the Emishi and Ainu arguments"]]},
     { id:"hachijo", en:"Hachijō", zh:"八丈语", py:"Bāzhàngyǔ", sp:"<1,000 (2011); “low hundreds” of native speakers",
       region:"Hachijō-jima and Aogashima in the Izu Islands; the Daitō Islands, settled from Hachijō in the Meiji era",
       cls:"c-hac", mk:[[33.11,139.78,"Hachijō-jima"],[32.46,139.76,"Aogashima"],
         [25.83,131.23,"Minamidaitō (settled from Hachijō)"],[26.20,131.30,"Kitadaitō"]],
       h:[`Hachijō — <i>Shima Kotoba</i>, "island speech" — is the family's relic. It is spoken on Hachijō-jima and the smaller Aogashima south of Tōkyō, and, since the Meiji era, on the Daitō Islands far to the south-east of Okinawa, which were settled from Hachijō-jima. It was also once spoken on Hachijō-kojima, an island now abandoned.`,
          `What makes it important is that it descends from <b>Eastern Old Japanese</b> — the dialect of the "Azuma" regions recorded in the 8th-century <i>Man'yōshū</i> and in the <i>Fudoki</i> of Hitachi Province. Almost nothing else in modern Japanese preserves those eastern features, which is why Hachijō is treated, depending on who is counting, either as the most divergent form of Japanese or as a branch of Japonic in its own right alongside mainland Japanese, Northern Ryukyuan and Southern Ryukyuan. This atlas shows it under Japanese, but gives it its own colour, because the argument is genuinely open.`,
          `Hachijō also has lexical similarities with the Kyūshū dialects and even with Ryukyuan. It is not clear whether the southern Izu islands were settled from that direction, whether the shared words are loans carried by sailors moving among the southern islands, or whether they are independent retentions from Old Japanese — a nice small example of how hard it is to tell inheritance from contact.`,
          `It is moribund. UNESCO's Atlas lists it as <i>definitely endangered</i>, native speakers are estimated in the low hundreds and mostly elderly, and younger generations are not learning it at home. The town of Hachijō has run primary-school classes, <i>karuta</i> games and Hachijō-language theatre since at least 2009. One oddity worth recording: Hachijō has no ISO 639-3 code at all — only the withdrawn ISO 639-6 code <code>hhjm</code> — so the atlas shows no code chip rather than a borrowed one.`],
       t:[["8th c.","Eastern Old Japanese recorded in the <i>azuma uta</i> and the Hitachi <i>Fudoki</i>"],
          ["Meiji era","The Daitō Islands are settled from Hachijō-jima"],
          ["2009–","The town of Hachijō funds school classes, <i>karuta</i> and theatre"],
          ["2011","Fewer than 1,000 speakers; native speakers in the “low hundreds”"],
          ["present","Moribund; UNESCO grades it definitely endangered"]]}
    ]},
  { id:"ryukyuan", en:"Ryukyuan", zh:"琉球语", py:"Liúqiúyǔ", sp:"speakers unknown; “no census data”",
    region:"The Ryukyu Islands — the Amami Islands (Kagoshima Prefecture) and Okinawa Prefecture",
    cls:"c-ryu", mk:[[26.21,127.68,"Naha"],[28.38,129.49,"Amami Ōshima"],[24.34,124.16,"Ishigaki"],
      [26.34,127.72,"Shuri (the old royal capital)"],[24.80,125.29,"Miyako"],[24.47,123.02,"Yonaguni"]],
    h:[`Ryukyuan — 琉球語派 <i>Ryūkyū-goha</i>, or <i>Shima kotoba</i>, "island speech", in the islands themselves — is the second branch of Japonic, spoken from Amami down through Okinawa, Miyako and Yaeyama to Yonaguni, the westernmost inhabited place in Japan. Ryukyuan and Japanese are not mutually intelligible, and the Ryukyuan languages are largely not mutually intelligible with each other either: each is generally unintelligible to speakers of the others in the same family. For socio-political reasons they have usually been called dialects of Japanese in Japan, a description linguists reject.`,
       `The numbers make the case. Okinawan is only 71% lexically similar to standard Japanese. Even the southernmost Japanese dialect, Kagoshima, is only 72% cognate with the northernmost Ryukyuan language, Amami — while Kagoshima is 80% cognate with the standard. By that measure the family boundary is sharper than the boundary between two Japanese dialects. The chain also divides neatly in two, and the divide is physical: the 250 km-wide Miyako Strait separates Northern Ryukyuan (Amami–Okinawa) from Southern Ryukyuan (Miyako–Yaeyama), and the southern languages are the ones with the strange phonology — syllabic consonants, unvoiced syllabic fricatives, glottalised consonants, voiceless nasals, and a central close vowel instead of the usual [i] and [u].`,
       `Nobody knows how many speakers there are. There is no census data, and the number is unknown; the Ryukyu region had a population of 1,452,288 in 2005, but fluent speakers are restricted to the older generation, generally in their fifties or older. UNESCO's 2009 Atlas lists six Ryukyuan languages, and UNESCO has said all of them are on course for extinction by 2050. Four are graded <i>definitely</i> endangered — Amami, Kunigami, Okinawan and Miyako — and two <i>severely</i>: Yaeyama and Yonaguni.`,
       `The twentieth century was deliberate. From the 1890s the Japanese government suppressed the languages as part of forced assimilation; children caught speaking them wore a <i>hōgen fuda</i>, a dialect tag, and students who wore it repeatedly were beaten. In the war years speaking Ryukyuan was officially illegal, and during the Battle of Okinawa many Okinawans were labelled spies and executed for speaking it. The policy of linguicide continued into the American occupation, partly because Okinawan officials pushed for Japanification as an act of defiance against the occupier.`,
       `What survives is not nothing. Shuri Okinawan is attested as a written language from the 16th century and has a literature, including the <i>Omoro Sōshi</i> — the Ryukyuan court's anthology of ritual songs. Folk music, dance, poetry and folk plays still use the languages; there has been a radio news programme in the Naha dialect since 1960. Okinawa Prefecture declared 18 September <i>Shimakutuba no Hi</i>, "Island Languages Day", in 2006, and both the Okinawa and Kagoshima prefectural governments now have preservation policies. The realistic worry is different: a new mixed variety, Okinawan Japanese, has become the language of choice among the young, and the vast majority of Okinawan children are now monolingual in Japanese.`],
    t:[["first millennium CE","Proto-Japonic speakers settle the Ryukyus and diverge in isolation"],
       ["10th–11th c.","Expansion with the agricultural Gusuku culture, from southern Kyūshū"],
       ["16th c.","Shuri Okinawan attested as a written language; the <i>Omoro Sōshi</i>"],
       ["1609","Satsuma conquers the kingdom; heavy Japanese borrowing follows"],
       ["1846–1849","B. J. Bettelheim writes the first grammar of Shuri Ryukyuan"],
       ["1879","Japan annexes the Ryukyu Kingdom; assimilation policy begins"],
       ["1890s–1945","Dialect tags; speaking Ryukyuan officially illegal in the war years"],
       ["1960","A radio news programme in the Naha dialect begins"],
       ["2006","Okinawa Prefecture declares 18 September <i>Shimakutuba no Hi</i>"],
       ["2009","UNESCO lists six Ryukyuan languages; all projected extinct by 2050"]],
    kids:[
     { id:"nryu", en:"Northern Ryukyuan (Amami–Okinawa)", zh:"北琉球语", py:"Běi Liúqiúyǔ", sp:"by source — the larger half",
       region:"The Amami Islands north of the Miyako Strait, and Okinawa Island",
       cls:"c-nryu", mk:[[28.38,129.49,"Amami Ōshima"],[26.21,127.68,"Naha"],[26.59,127.98,"Nago"]],
       h:[`Northern Ryukyuan covers the Amami Islands — administratively part of Kagoshima Prefecture, geographically the northern end of the Ryukyu chain — and Okinawa Island itself, with Kunigami in the north of that island and Okinawan in the centre and south. The split from Southern Ryukyuan is the Miyako Strait, a gap of some 250 km, and it is the deepest division in the branch.`,
          `Amami and Okinawan are the two best-documented and most-spoken members; Kunigami, Okinoerabu and Yoron are smaller and are grouped differently by different authorities. Glottolog, following Pellard, treats Kunigami and Central Okinawan as the two Okinawan languages and puts the rest of the northern Ryukyus in Amami; Ethnologue adds Okinoerabu and Yoron to Kunigami; the UNESCO Atlas, following Uemura, also includes Okinoerabu and Yoron as varieties of Kunigami. This atlas shows the UNESCO grouping, because that is the grouping the endangerment grades are attached to.`,
          `All of the northern languages are graded <i>definitely endangered</i>, and Okinawan is the one with a genuine literary tradition and the largest speaker base — 228,000 native speakers and 1,143,000 total speakers by source, with Okinawan acting historically as the regional standard. Speakers of Amami, Miyako, Yaeyama and Yonaguni may still know some Okinawan for that reason.`],
       t:[["10th–11th c.","Northern Ryukyuan diverges from Southern across the Miyako Strait"],
          ["1429–1879","The Ryukyu Kingdom, with Shuri as its capital, uses Okinawan"],
          ["1609","Satsuma's conquest brings Japanese influence from the north"],
          ["1890s–","Assimilation policy; Amami Japanese and Okinawan Japanese displace the languages"],
          ["2009","UNESCO grades Amami, Kunigami and Okinawan definitely endangered"]],
        kids:[
     { id:"amami", en:"Amami", zh:"奄美语", py:"Yǎnměiyǔ", sp:"≈34,000 combined, by source",
       region:"The Amami Islands — Amami Ōshima, Kikai, Tokunoshima, Okinoerabu, Yoron",
       cls:"c-nryu", mk:[[28.38,129.49,"Amami Ōshima (Naze / Setouchi)"],[28.32,129.97,"Kikai"],
         [27.73,128.99,"Tokunoshima"],[27.38,128.68,"Okinoerabu"],[27.04,128.57,"Yoron"]],
       h:[`Amami is the northern end of the Ryukyu chain and the northern end of the Ryukyuan languages. It is a cluster rather than a single language: the ISO register carries four codes for it — <code>kzg</code> Kikai, <code>ryn</code> Northern Amami-Oshima, <code>ams</code> Southern Amami-Oshima and <code>tkn</code> Toku-No-Shima — and a further two, <code>okn</code> Oki-No-Erabu and <code>yox</code> Yoron, that UNESCO folds into Kunigami instead. By source the group amounts to roughly 34,000 speakers: Kikai 13,000, Amami Ōshima 12,000, Tokunoshima 5,100, Okinoerabu 3,200 and Yoron 950.`,
          `Amami is where the numbers are least reliable and the language most obviously retreating. Yoron's 950 speakers and Okinoerabu's 3,200 are small enough that the varieties are kept alive by the oldest generation only, and the everyday speech of Amami Ōshima is no longer traditional Amami but a regional variety of Amami-accented Japanese, locally nicknamed <i>Ton Futsūgo</i> — "potato common language", rustic standard.`,
          `The phonology is Ryukyuan-typical and unusual by mainland standards: glottalised consonants such as the Yuwan form <i>ʔma</i> "horse", and a central close vowel in <i>kɨɨ</i> "tree" where standard Japanese has [i]. Amami varieties may have as many as seven vowels excluding length, against Yonaguni's three — the extremes of a family that has diversified in every direction. UNESCO grades Amami <i>definitely endangered</i>.`],
       t:[["10th–11th c.","Proto-Ryukyuan speakers settle the Amami chain"],
          ["1609","Satsuma conquers the Ryukyu Islands; Amami falls under Satsuma rule"],
          ["1890s–","Suppression of the Ryukyuan languages as official policy begins"],
          ["2009","UNESCO grades Amami definitely endangered"],
          ["present","<i>Ton Futsūgo</i> is the everyday speech of Amami Ōshima"]]},
     { id:"kunigami", en:"Kunigami", zh:"国头语", py:"Guótóuyǔ", sp:"≈9,000 combined, by source",
       region:"Northern Okinawa Island (the Yanbaru region) and its offshore islands; Okinoerabu and Yoron",
       cls:"c-nryu", mk:[[26.59,127.98,"Nago (the largest community)"],[26.68,127.97,"Nakijin"],
         [27.38,128.68,"Okinoerabu"],[27.04,128.57,"Yoron"]],
       h:[`Kunigami — <i>Yanbaru Kutūba</i>, "Yanbaru speech", after the forested north of Okinawa Island — is spoken in the northern part of the island and on its minor islands. Central Okinawan is spoken in the centre and south, and the two are conventionally separated even though they sit on the same island: the boundary is linguistic, not administrative.`,
          `Which is not to say the grouping is agreed. Glottolog, following Pellard, treats Kunigami and Central Okinawan as the two Okinawan languages and puts all the other northern Ryukyuan varieties in Amami. Ethnologue and the UNESCO Atlas both attach Okinoerabu (<code>okn</code>, 3,200 speakers) and Yoron (<code>yox</code>, 950 speakers) to Kunigami; the atlas follows that grouping here because the UNESCO endangerment grade is attached to it. Kunigami proper is about 5,000 speakers by source, with Nakijin as the traditional standard and Nago the largest community.`,
          `UNESCO grades Kunigami <i>definitely endangered</i>. Like the other northern Ryukyuan languages it is not taught in schools, and the standard account of its decline is the same one that applies across the chain: the Japanese state treated it as a dialect of standard Japanese, schoolchildren were punished for using it, and the generation born after the war mostly did not pass it on.`],
       t:[["10th–11th c.","Northern Okinawan varieties diverge within Northern Ryukyuan"],
          ["1429–1879","The Ryukyu Kingdom's centre of gravity is in the south, at Shuri"],
          ["1609","Satsuma conquers the Ryukyu Islands"],
          ["1890s–","Assimilation policy suppresses Ryukyuan speech in schools"],
          ["2009","UNESCO grades Kunigami definitely endangered"]]},
     { id:"okinawan", en:"Okinawan (Central)", zh:"冲绳语", py:"Chōngshéngyǔ", sp:"228,000 native · 1,143,000 total, by source",
       region:"Central and southern Okinawa Island and its surrounding islands — Kerama, Kumejima, Tonaki, Aguni",
       cls:"c-nryu", mk:[[26.21,127.68,"Naha (the modern centre)"],[26.22,127.72,"Shuri"],
         [26.34,126.77,"Kumejima"],[26.59,127.23,"Aguni"]],
       h:[`Okinawan — <i>Uchinaaguchi</i>, 沖縄口 — is the largest and best-attested Ryukyuan language, spoken in the centre and south of Okinawa Island and on the surrounding small islands. It is the only member of the family with a literary history of real depth: the Shuri dialect of the Ryukyu Kingdom's capital is attested as a written language from the 16th century, and the court's anthology of ritual songs, the <i>Omoro Sōshi</i>, is the central text. It also acted as the regional standard for the whole chain, so speakers of Amami, Miyako, Yaeyama and Yonaguni may still know some Okinawan.`,
          `It is not close to Japanese. Okinawan is only 71% lexically similar to standard Japanese, and the practical consequence is that it is not mutually intelligible with it. The speaker figures need their hedge: 228,000 native speakers and 1,143,000 total speakers by source, out of a Ryukyu region of 1,452,288 people in 2005 — with the crucial qualification, from the same source, that fluent speakers are restricted to the older generation, generally in their fifties or older. There is no census data, and the true number is unknown.`,
          `The decline is documented and deliberate. Throughout history Okinawan languages were treated as dialects of standard Japanese; in the 20th century many schools used dialect tags to punish pupils who spoke Okinawan, and the stigmatisation was effective enough that many remaining speakers chose not to transmit the language to their children. By around 2007 people under 40 on Okinawa Island had little proficiency in it. What has replaced it among the young is <b>Okinawan Japanese</b> — a mixed variety based on Japanese and Okinawan, long ignored by linguists and language activists, and now the language of choice for the younger generation.`,
          `The counter-movement is real, if late. Okinawa Prefecture proclaimed 18 September <i>Shimakutuba no Hi</i>, "Island Languages Day", on 31 March 2006; there has been a radio news programme in the Naha dialect since 1960; and the prefectural government now makes preservation policy. UNESCO grades Okinawan <i>definitely endangered</i>, and UNESCO has said all Ryukyuan languages are on course for extinction by 2050.`],
       t:[["1429–1879","The Ryukyu Kingdom; Shuri Okinawan is the language of the court"],
          ["16th c.","Shuri Okinawan attested as a written language; the <i>Omoro Sōshi</i>"],
          ["1609","Satsuma conquers the kingdom; Japanese loans enter the language"],
          ["1846–1849","Bettelheim publishes the first grammar of Shuri Ryukyuan"],
          ["1879","Japan annexes the Ryukyu Kingdom"],
          ["1890s–1945","Dialect tags in schools; speaking Ryukyuan illegal in the war years"],
          ["1960","A radio news programme in the Naha dialect begins"],
          ["2006","<i>Shimakutuba no Hi</i> proclaimed on 31 March"],
          ["2009","UNESCO grades Okinawan definitely endangered"],
          ["present","Okinawan Japanese is the everyday language of the young"]]},
     ]},
     { id:"sryu", en:"Southern Ryukyuan (Miyako–Yaeyama)", zh:"南琉球语", py:"Nán Liúqiúyǔ", sp:"by source — the smaller, stranger half",
       region:"The Miyako and Yaeyama island groups, south of the Miyako Strait — Okinawa Prefecture",
       cls:"c-sryu", mk:[[24.80,125.29,"Hirara (Miyako)"],[24.34,124.16,"Ishigaki"],
         [24.47,123.02,"Yonaguni"],[24.06,123.77,"Hateruma"]],
       h:[`Southern Ryukyuan is the far end of the chain: the Miyako Islands and the Yaeyama Islands, the latter including Yonaguni, which is the westernmost inhabited place in Japan. The break from Northern Ryukyuan is the 250 km-wide Miyako Strait, and the southern languages are the phonologically strangest members of the whole Japonic family.`,
          `Miyako and Yaeyama are the two groups; Yonaguni is usually treated as a third language of its own, most closely related to Yaeyama but distinct from it. Each of the three is unintelligible to the others and to Okinawan. Between them they account for roughly 98,000 speakers by source — Miyako 50,000, Yaeyama 47,600, Yonaguni 400 — and every one of those figures is a source estimate rather than a count.`,
          `UNESCO's 2009 grades differ across the three, and the atlas follows the 2009 Atlas as restated by Japan's Agency for Cultural Affairs: Miyako and Yaeyama are <i>definitely</i> endangered, and Yonaguni is <i>severely</i> endangered. Note the disagreement recorded in <code>research.md</code> JP-104: the English Wikipedia infobox on Yaeyama says <i>definitely</i> endangered, but the Agency for Cultural Affairs' reproduction of the Atlas and Patrick Heinrich's 2009 survey both place Yaeyama with Yonaguni in <i>severely</i> endangered. The 2009 Atlas is followed here and the conflict is stated rather than hidden.`,
          `Yonaguni is the outlier of the outliers: it has only three vowels, against as many as seven (excluding length) in some Amami varieties. It is also the most endangered language in Japan after Ainu, at roughly 400 speakers.`],
       t:[["10th–11th c.","Southern Ryukyuan diverges from Northern across the Miyako Strait"],
          ["16th–17th c.","The <i>Omoro Sōshi</i> and the Ryukyu Kingdom's ritual sphere"],
          ["1609","Satsuma conquers the Ryukyu Islands"],
          ["1890s–1945","Assimilation policy; dialect tags in schools"],
          ["2009","UNESCO grades Miyako and Yaeyama definitely, Yonaguni severely endangered"]],
        kids:[
     { id:"miyako", en:"Miyako", zh:"宫古语", py:"Gōnggǔyǔ", sp:"≈50,000, by source",
       region:"The Miyako Islands — Miyako-jima, Irabu, Tarama and the surrounding islets",
       cls:"c-sryu", mk:[[24.80,125.29,"Hirara (the standard)"],[24.83,125.18,"Irabu"],
         [24.67,124.70,"Tarama"],[24.75,125.42,"Ōgami"]],
       h:[`Miyako — <i>Myākufutsu</i>, 宮古口 — is a diverse dialect cluster spoken in the Miyako Islands, and it is a Southern Ryukyuan language most closely related to Yaeyama. The islands' combined population is about 52,000 by a 2011 figure, and the language is put at 50,000 speakers by source; as of 2025 the number of competent native speakers is not definitively known, which is the honest state of the record for the whole family.`,
          `Miyako's phonology is the most striking in Japonic. Southern Ryukyuan languages have syllabic consonants, including unvoiced syllabic fricatives — the Ōgami form <i>kss</i> [ksː] "breast" is the standard example in the literature — and Ikema Miyako has a voiceless nasal phoneme /n̥/. These are the kinds of inventories that make Ryukyuan a standard reference point in typology, and they are also a reminder of how far the branch has travelled from Old Japanese.`,
          `The language is not taught or used in schools, and the Japanese government has traditionally called it the Miyako dialect, <i>Miyako hōgen</i>, or simply a dialect of standard Japanese. Most people born after 1970 tend not to use it except in songs and rituals, and the younger generation uses Japanese almost exclusively as a first language. UNESCO classified Miyako as <i>definitely endangered</i> in February 2009; the Endangered Languages Project, using a different scale, currently calls it <i>severely</i> endangered. Both are recorded here because the difference is a difference of method, not of fact.`],
       t:[["10th–11th c.","Southern Ryukyuan settles the Miyako group"],
          ["16th–17th c.","Within the Ryukyu Kingdom's ritual and trade sphere"],
          ["1609","Satsuma conquers the Ryukyu Islands"],
          ["1890s–1945","Dialect tags in schools; the language is called a Japanese dialect"],
          ["2009","UNESCO classifies Miyako definitely endangered (February)"],
          ["2025","The number of competent native speakers still not definitively known"]]},
     { id:"yaeyama", en:"Yaeyama", zh:"八重山语", py:"Bāchóngshānyǔ", sp:"≈47,600, by source",
       region:"The Yaeyama Islands except Yonaguni — Ishigaki, Taketomi, Kohama, Kuroshima, Hateruma, Aragusuku",
       cls:"c-sryu", mk:[[24.34,124.16,"Ishigaki (the standard)"],[24.33,124.09,"Taketomi"],
         [24.34,123.98,"Kohama"],[24.06,123.77,"Hateruma"],[24.23,123.99,"Kuroshima"]],
       h:[`Yaeyama — <i>Yaimamuni</i>, 八重山物言 — is spoken across the Yaeyama Islands, the group at the south-western end of the Japanese archipelago, with Ishigaki as its standard variety. It is the third-largest Ryukyuan language by speaker count at about 47,600 by source, and it is most closely related to Yonaguni, the next island west.`,
          `It is one of the six languages the UNESCO Atlas lists for Japan, and the grade is where the sources part company. Japan's Agency for Cultural Affairs, reproducing the 2009 Atlas, puts Yaeyama and Yonaguni together in <i>severely endangered</i> — which is also how Patrick Heinrich described them in his 2009 survey, and how the Ryukyuan article counts its own six. The English Wikipedia infobox for Yaeyama instead reads <i>definitely endangered</i>. The atlas follows the 2009 Atlas and states the disagreement, because the difference between "definitely" and "severely" is the difference between two UNESCO categories and is not a rounding error.`,
          `The islands are the westernmost in Japan and were for centuries the Ryukyu Kingdom's frontier with Taiwan and China, which is why Yaeyama speech shows contact effects and why the island group's ritual and trade vocabulary is distinctive within Ryukyuan. Like the rest of the chain, the language is not taught in schools and has been called a dialect of Japanese by the state; UNESCO's projection is that all Ryukyuan languages are on course for extinction by 2050.`],
       t:[["10th–11th c.","Southern Ryukyuan settles the Yaeyama group"],
          ["16th–17th c.","The Ryukyu Kingdom's south-western frontier with Taiwan and China"],
          ["1609","Satsuma conquers the Ryukyu Islands"],
          ["1890s–1945","Assimilation policy; dialect tags in schools"],
          ["2009","UNESCO grades Yaeyama severely endangered (per the Agency for Cultural Affairs)"],
          ["present","Not taught in schools; speaker counts are estimates, not censuses"]]},
     { id:"yonaguni", en:"Yonaguni", zh:"与那国语", py:"Yǔnàguóyǔ", sp:"≈400, by source",
       region:"Yonaguni Island — the westernmost inhabited place in Japan, 125 km from Taiwan",
       cls:"c-sryu", mk:[[24.47,123.02,"Yonaguni"],[24.46,123.00,"Sonai"]],
       h:[`Yonaguni — <i>Dunan Munui</i>, 与那国物言 — is spoken on a single small island at the far western end of Japan, about 125 km from the coast of Taiwan, and it is the most endangered language in Japan after Ainu: roughly 400 speakers by source. It is most closely related to Yaeyama, and speakers of Yonaguni are also likely to know some Yaeyama because of proximity, but the two are not the same language and are not mutually intelligible.`,
          `It is the family's phonological extreme. Yonaguni has only <b>three</b> vowels, against as many as seven in some Amami varieties once length is excluded — a range within one family that is wider than the range across all of Japanese. The article's own summary is blunt: "There is wide diversity among them." The island is also the westernmost point of the Japonic world, roughly 125 km from Taiwan, so its position at the end of the chain is geographic as well as linguistic.`,
          `UNESCO grades Yonaguni <i>severely endangered</i> — one of only two entries in Japan given that grade in the 2009 Atlas, the other being Yaeyama — and it is placed in the Atlas as one of the most endangered languages in Japan after Ainu. The Japanese government does not recognise it, calling it the Yonaguni dialect, <i>Yonaguni hōgen</i>. Four hundred speakers on one island, with the young speaking Japanese, is the thinnest margin in this atlas.`],
       t:[["10th–11th c.","Southern Ryukyuan settles the island"],
          ["16th–17th c.","The Ryukyu Kingdom's westernmost outpost, facing Taiwan"],
          ["1609","Satsuma conquers the Ryukyu Islands"],
          ["1890s–1945","Assimilation policy; the language is called a Japanese dialect"],
          ["2009","UNESCO grades Yonaguni severely endangered"],
          ["present","≈400 speakers; the most endangered language in Japan after Ainu"]]}
     ]},
   ]},
  { id:"ainu", en:"Ainu", zh:"阿伊努语族", py:"Āyīnǔ yǔzú", sp:"a few semi-speakers, by source",
    region:"Historically Hokkaidō, southern Sakhalin, the Kuril Islands and northern Honshū; today Hokkaidō only",
    cls:"c-ain", mk:[[42.86,142.10,"Nibutani (Biratori)"],[43.06,141.35,"Sapporo"],
      [46.96,142.74,"Yuzhno-Sakhalinsk"],[45.10,147.00,"Iturup"],[43.70,145.50,"Kunashir"]],
    h:[`Ainu is not related to Japanese, and it is not related to anything else that has been demonstrated. The Ainu languages — sometimes called Ainuic — are a family of three, traditionally spoken by the Ainu people of northern Japan, southern Sakhalin and the Kuril Islands, and the primary varieties are alternately treated as closely related languages or as divergent dialects of a single language isolate. No genealogical relationship with any other family has been demonstrated, despite numerous attempts; the article's own list of proposals includes Altaic and Austroasiatic, and none of them has held.`,
       `Two of the three are gone. <b>Kuril Ainu</b> was declared extinct in 1962; <b>Sakhalin Ainu</b> in 1994. Only Hokkaidō Ainu survives, and it is a heritage language with some native semi-speakers — described in 2022 as "more or less extinct, or 'dormant', as a living medium", but with a growing number of neo-speakers, some of them not Ainu at all. UNESCO's Atlas grades it <i>critically endangered</i>, the highest grade used for Japan, and both extinct varieties are listed as <i>extinct</i>.`,
       `The family's interest is out of proportion to its numbers. It is a polysynthetic language with a single liquid consonant, a pitch accent, and an oral literature of memorised hero-sagas called <i>yukar</i> plus another narrative form, <i>Uepeker</i>, told at gatherings that lasted hours or days. It has never had a native script: it was written down in katakana, in the Latin alphabet and in Cyrillic by missionaries and researchers — the Rev. John Batchelor was the first to write it — and the <i>Ainu Times</i> publishes in both katakana and Latin today.`,
       `Where the Ainu came from is disputed, and so is where they were. Toponymic evidence — place-names explicable in Ainu but not in Japanese — reaches down through northern Honshū: the <i>-betsu</i> of many northern Japanese names derives from Ainu <i>pet</i> "river", and the same is suspected of names in <i>-be</i> in northern Honshū and Chūbu, such as the Kurobe and Oyabe rivers. Mount Ashigara, Musashi, Keta Shrine and the Noto Peninsula have no explanation in Japanese but do in Ainu, and the traditional <i>matagi</i> hunters of Tōhoku kept Ainu words in their hunting vocabulary. It is occasionally suggested that Ainu was the language of the <i>Emishi</i> of northern Honshū, but that is not established: it is not even known that the Emishi were a single people, and one competing proposal has them speaking a Japonic variety closest to ancient Izumo, with Ainu arriving later from Hokkaidō.`,
       `Since 1997 the state has moved, slowly. The Ainu Cultural Promotion Act of 1997 created the Foundation for Research and Promotion of Ainu Culture and gave the Ainu rights to their culture, heritage and language; in June 2008 the government recognised Ainu as an indigenous language; in April 2019 it enacted a law recognising the Ainu as an indigenous people, the first time it had done so; and on 12 July 2020 the National Ainu Museum opened at Shiraoi under the name <i>Upopoy</i>. The measures have been criticised for failing to acknowledge the history of discrimination and for the government's refusal to apologise for it. Whether the language recovers depends less on any of this than on whether children learn it at home, which they do not.`],
    t:[["1643","The Dutch explorer Maarten Gerritszoon Vries transcribes the first Ainu sentences"],
       ["1787","Lapérouse records 161 Sakhalin Ainu words"],
       ["1869","The Hokkaidō Colonization Office is founded; assimilation policy begins"],
       ["1902–1903","Bronisław Piłsudski makes the first audio recordings of Ainu oral literature"],
       ["1923","Chiri Yukie's <i>Ainu Shin'yōshū</i> — the first book in Ainu by Ainu authors"],
       ["1962","Kuril Ainu extinct"],
       ["1987","The Ainu Association of Hokkaidō begins hosting language classes"],
       ["1994","Sakhalin Ainu extinct, with the death of Take Asai on 30 April"],
       ["1997","Ainu Cultural Promotion Act; the Ainu gain rights to culture, heritage and language"],
       ["2008","Japan recognises Ainu as an indigenous language (June)"],
       ["2009","UNESCO grades Hokkaidō Ainu critically endangered"],
       ["2019","Japan enacts a law recognising the Ainu as an indigenous people (19 April)"],
       ["2020","The National Ainu Museum (<i>Upopoy</i>) opens at Shiraoi (12 July)"],
       ["2022","<i>Handbook of the Ainu Language</i>: “more or less extinct, or ‘dormant’, as a living medium”"]],
    kids:[
     { id:"hokkaido", en:"Hokkaidō Ainu", zh:"北海道阿伊努语", py:"Běihǎidào Āyīnǔyǔ", sp:"a few semi-speakers; “dormant”, by source",
       region:"Hokkaidō — the Saru valley, Sapporo, Asahikawa, Kushiro, Hakodate; today scattered across Japan",
       cls:"c-ain", mk:[[42.86,142.10,"Nibutani, Biratori (the Saru dialect)"],[43.06,141.35,"Sapporo"],
         [43.77,142.36,"Asahikawa"],[42.98,144.38,"Kushiro"],[41.77,140.73,"Hakodate"],
         [42.13,143.09,"Samani"]],
       h:[`Hokkaidō Ainu is the only surviving Ainu language, and the numbers are small enough that every source says something slightly different. In 2011, 304 people within Japan were reported to understand it to some extent. In 2017 Thomas Dougherty called it a "dormant language isolate". In 2019 it was reported that "there remain only a few speakers in Hokkaido, who learned vocabularies from their parents or grandparents and who can use simple sentences in Ainu." In 2022 the <i>Handbook of the Ainu Language</i> said it "is more or less extinct, or 'dormant', as a living medium [but] has still a few native semi-speakers, as well as a growing number of neo-speakers", with no generational transmission. As of 2025 the Endangered Languages Project, citing personal communication, reports two native speakers.`,
          `Two Hokkaidō government surveys in the same article give the shape of the thing. In 2017, of 671 respondents from 291 randomly selected households, 0.7% said they would be able to hold a conversation in Ainu, 3.4% that they could converse a little, 44.6% that they could not speak but had some knowledge, and 48.1% that they could not speak at all. In 2023, of 472 respondents, 0.8% could converse, 8.9% a little, 19.3% barely, and 69.3% not at all. Note the direction of travel: the "converse a little" band nearly tripled in six years, which is what a growing neo-speaker population looks like, while the "cannot converse at all" band grew too.`,
          `The language has dialects, and the one that matters most for learners is the <b>Saru</b> dialect of the Saru river valley, around Nibutani in Biratori, because it has the most grammatical descriptions and records and is therefore the most commonly learned variety — a fact that quietly shapes what "Ainu" means to anyone studying it now. Hokkaidō Ainu is also the most commonly learned variety for the same reason: it is the one with materials.`,
          `It is written in modified katakana, in a Latin alphabet, and in Cyrillic. There has never been a native written form; the language was committed to paper by outsiders and by Ainu working with them, and the Ainu people relied on memorisation to pass literature down. Special extended katakana exist in Unicode for Ainu sounds that ordinary katakana cannot write — final consonants and the like — and the <i>Ainu Times</i> publishes in both katakana and Latin. UNESCO grades Hokkaidō Ainu <i>critically endangered</i>: the highest grade the Atlas uses for Japan, and the only entry given it.`],
       t:[["1869","The Hokkaidō Colonization Office is founded; children are schooled only in Japanese"],
          ["1902–1903","Piłsudski makes the first audio recordings of Ainu oral literature"],
          ["1913","Kindaichi Kyōsuke publishes <i>Ainu monogatari</i>"],
          ["1923","Chiri Yukie's <i>Ainu Shin'yōshū</i> is published posthumously"],
          ["1987","The Ainu Association of Hokkaidō (≈500 members) begins 14 language classes"],
          ["1997","Ainu Cultural Promotion Act; FRPAC is appointed to handle language education"],
          ["2008","Japan recognises Ainu as an indigenous language; two native speakers reported"],
          ["2011","304 people in Japan reported understanding Ainu to some extent"],
          ["2017","Described as “dormant”; Hokkaidō survey finds 0.7% able to converse"],
          ["2019","Japan enacts the Ainu indigenous-peoples law (19 April)"],
          ["2020","The National Ainu Museum opens at Shiraoi"],
          ["2022","“A few native semi-speakers, as well as a growing number of neo-speakers”"],
          ["2023","Hokkaidō survey: 0.8% able to converse, 8.9% able to converse a little"],
          ["2025","The Endangered Languages Project reports two native speakers"]]},
     { id:"sakhalin", en:"Sakhalin Ainu", zh:"萨哈林阿伊努语", py:"Sàhālín Āyīnǔyǔ", sp:"extinct 1994",
       region:"Sakhalin — the Taraika and Rayciska districts; later Hokkaidō, after deportation",
       cls:"c-ext", mk:[[46.96,142.74,"Yuzhno-Sakhalinsk"],[49.22,143.10,"Poronaysk (Taraika)"],
         [49.08,142.06,"Uglegorsk (Rayciska)"],[46.63,142.78,"Korsakov"]],
       h:[`Sakhalin Ainu is extinct. The last speaker, Take Asai — Tahkonanna — died on 30 April 1994. It may have been more than one language: information about linguistic diversity across the island is scant, and the two best-documented dialects, Taraika on the eastern coast facing the Gulf of Patience and Rayciska on the western coast near modern Uglegorsk, are not necessarily the same variety. It has no ISO 639-3 code of its own — the register marks it as a dialect — and UNESCO's Atlas lists it as <i>extinct</i>.`,
          `Its documentation is older than almost anything else in this atlas. The earliest attested records are several sentences transcribed by the Dutch explorer Maarten Gerritszoon Vries in 1643; in 1787 Lapérouse recorded 161 words. The bulk of the material comes from Bronisław Piłsudski's fieldwork in the 1890s and 1900s, and from recordings made later with speakers who had already been deported to Japan.`,
          `The end was political. After the Second World War, when Sakhalin came under Soviet control, all but 100 of the Ainu living on the island were deported to Japan, and the last Ainu household on Sakhalin died out in the 1960s. The language survived longer in Japan and went extinct there in 1994. A Sakhalin Ainu Association still works among Sakhalin Ainu born and raised in Hokkaidō and Honshū to preserve the language and culture.`,
          `Linguistic evidence places proto-Ainu in southern Sakhalin and north-eastern Hokkaidō, expanding from there into the rest of Hokkaidō, the Kurils and partly into northern Honshū — which makes Sakhalin one of the two candidates for the family's homeland, and gives this extinct language an importance well beyond its speaker count. Vovin's classification makes Sakhalin the family's first split: Proto-Ainu into Proto-Hokkaido–Kuril and Proto-Sakhalin.`],
       t:[["1643","Maarten Gerritszoon Vries transcribes the earliest known Ainu sentences"],
          ["1787","Lapérouse records 161 Sakhalin Ainu words"],
          ["1890s–1900s","Bronisław Piłsudski's fieldwork and 1912 materials"],
          ["1945–","All but 100 Sakhalin Ainu are deported to Japan"],
          ["1960s","The last Ainu household on Sakhalin dies out"],
          ["30 April 1994","Take Asai (Tahkonanna) dies; the language is extinct"],
          ["present","UNESCO grades Sakhalin Ainu extinct; a Sakhalin Ainu Association continues"]]},
     { id:"kuril", en:"Kuril Ainu", zh:"千岛阿伊努语", py:"Qiāndǎo Āyīnǔyǔ", sp:"extinct 1962",
       region:"The Kuril Islands — Kunashir, Iturup, Urup and Shumshu; later Kamchatka and Hokkaidō",
       cls:"c-ext", mk:[[43.70,145.50,"Kunashir"],[45.10,147.00,"Iturup"],[45.90,149.30,"Urup"],
         [50.70,156.30,"Shumshu"],[50.68,156.12,"Severo-Kurilsk"]],
       h:[`Kuril Ainu is extinct and poorly attested. It was declared extinct in 1962, it has no ISO 639-3 code, and UNESCO's Atlas lists it as <i>extinct</i>. The main inhabited islands were Kunashir, Iturup and Urup in the south and Shumshu in the north; the other islands either held small populations, such as Paramushir, or were visited only for fishing and hunting. There may also have been a small mixed Kuril–Itelmen population at the southern tip of the Kamchatka Peninsula.`,
          `The documentary record is thin enough that scholars keep finding more of it. There are not many published documents on the Kuril dialects; Torii Ryūzō collected data, and later researchers built dictionaries and analyses on his material. There is currently only one known document of Southern Kuril Ainu, and previously unpublished documents have been found in Russian archives — with the reasonable assumption that more remain to be found. Captain V. M. Golovnin's 1811 glossary is one of the principal sources.`,
          `The end came in two moves. When the Kuril Islands passed to Japanese control in 1875, many northern Kuril Ainu evacuated to Ust-Bolsheretsky District in Kamchatka, where about 100 descendants still live. In the decades after the islands passed to Soviet control in 1945, most of the remaining southern Kuril Ainu evacuated to Hokkaidō and were assimilated there. The language itself is usually dated to 1962.`,
          `The Kurils also bear on the deeper question. The Ainu of the Kurils appear to have been a relatively recent expansion from Hokkaidō that displaced an indigenous Okhotsk culture — one possibly related to the modern Itelmens. That displacement is the mirror image of the other hypothesis, in which the Okhotsk were ancestral to the Nivkh and to part of the modern Ainu, and the Ainu were pushed north rather than expanding south. Both readings are in the literature.`],
       t:[["1811","Captain V. M. Golovnin's Kuril Ainu glossary"],
          ["1875","The Kurils pass to Japanese control; many northern Ainu evacuate to Kamchatka"],
          ["1900s–","Torii Ryūzō collects Kuril dialect data; later dictionaries follow"],
          ["1945–","The islands pass to Soviet control; southern Ainu evacuate to Hokkaidō"],
          ["1962","Kuril Ainu is declared extinct"],
          ["present","~100 descendants in Ust-Bolsheretsky District, Kamchatka; UNESCO grades it extinct"]]}
    ]}
  ]
};
/* ---------- ISO 639-3 codes ----------
   Checked against iso-639-3.tab, the register's own download
   (https://iso639-3.sil.org/code_tables/download_tables, retrieved 2026-09-26).
   Notes that the register forces:
     · the family has no 639-3 code; ISO 639-5 carries the collective "jpx";
     · Hachijō, Sakhalin Ainu and Kuril Ainu have NO 639-3 code at all —
       Hachijō's only code is the withdrawn ISO 639-6 "hhjm", and the register
       marks both extinct Ainu varieties as dialects of "ain";
     · "ojp" IS present, with type H (historical) — so Old Japanese is coded
       but Proto-Japonic, being a reconstruction, is not;
     · watch the false friend: "aib" is "Ainu (China)", an unrelated Turkic
       language of Xinjiang. The Ainu here is "ain", "Ainu (Japan)". */
const ISO = {
 japonic:'— (no 639-3 code; 639-5 collective “jpx”)',
 protojaponic:'— (reconstruction; “ojp” codes Old Japanese, the earliest attested stage)',
 japanese:'jpn (ja)',
 kyushu:'— (dialect cluster, no code)',
 kansai:'— (dialect cluster, no code)',
 tohoku:'— (dialect cluster, no code)',
 kanto:'— (dialect cluster, no code)',
 hokuriku:'— (dialect cluster, no code)',
 izumo:'— (dialect cluster, no code)',
 hachijo:'— (no 639-3 code; 639-6 “hhjm” withdrawn; Glottolog hach1239)',
 ryukyuan:'— (branch, no code)',
 nryu:'— (branch)',
 amami:'kzg · ryn · ams · tkn',
 kunigami:'xug · okn · yox',
 okinawan:'ryu',
 sryu:'— (branch)',
 miyako:'mvi',
 yaeyama:'rys',
 yonaguni:'yoi',
 ainu:'ain (Ainu (Japan); 639-2 “ain”)',
 hokkaido:'ain',
 sakhalin:'— (no code; the register marks it a dialect of “ain”; Glottolog sakh1245)',
 kuril:'— (no code; the register has no entry; Glottolog kuri1271)'
};
/* ---------- what makes each variety distinctive: structure, not history ---------- */
const FEATURES = {
 japonic:[
  `<b>Two families, one atlas</b>: Japonic (Japanese, Ryukyuan, Hachijō) is a universally accepted family; Ainu is a separate family with no demonstrated relative. Nothing in this atlas connects them.`,
  `<b>About 123 million speakers</b>, by source — which makes this the second-largest family in the series after Sinitic, and hides the fact that most of its varieties are endangered.`,
  `<b>The script is borrowed, the language is not</b>: Chinese characters entered Japanese from the 5th century, were used phonetically as <i>man'yōgana</i>, and were simplified into kana in the 9th century. That is a contact story with Sinitic, not a genetic one.`,
  `<b>An east–west divide</b> older than the state: the pitch-accent isogloss between the Kyōto type and the Tōkyō type carries grammatical differences with it (copula <i>da</i>/<i>ja</i>, negative <i>-nai</i>/<i>-nu</i>, existential <i>iru</i>/<i>oru</i>).`,
  `<b>Vowel coalescence in the east</b>: /ai/, /oi/ and /ui/ become [eː], [eː] and [iː], which is why standard Japanese differs from Kyōto on words a learner does not expect.`,
  `<b>One liquid consonant</b>, as in Koreanic and Ainu — an areal feature of north-east Asia rather than a family trait.`,
  `<b>Endangerment in bands</b>: standard Japanese is secure; Tōhoku is retreating; Hachijō has hundreds of speakers; all six Ryukyuan languages are UNESCO-listed; Ainu is critically endangered.`
 ],
 protojaponic:[
  `<b>Reconstruction</b>: built by internal reconstruction from Old Japanese (Martin, Hattori) and by the comparative method across Old Japanese, Eastern Old Japanese and Ryukyuan.`,
  `<b>Two daughters</b>: Old Japanese and Proto-Ryukyuan, separated before the 7th century — Old Japanese has innovations Ryukyuan does not share, which is what dates the split.`,
  `<b>(C)V syllables and polysyllabic words</b>: mainland Japanese has since ground words down and Ryukyuan has partly kept the older shape.`,
  `<b>Homeland dispute</b>: the standard account brings Japonic to northern Kyūshū from the Korean peninsula with Yayoi farming, 700–300 BCE; "Peninsular Japonic" — Japonic surviving in Korea into the early centuries CE — is suggested by place-name glosses in Chinese histories and is not settled.`
 ],
 japanese:[
  `<b>≈123 million speakers</b>, by source, and the only national language of Japan.`,
  `<b>Deep attested history</b>: Old Japanese (8th c.) → Early Middle Japanese → Late Middle Japanese (1185, first described by Europeans) → Early Modern Japanese (17th c.) → Modern.`,
  `<b>The standard moved</b>: Kyōto speech was the prestige form while Kyōto was the capital; Edo (Tōkyō) speech took over in the late 18th century and became the basis of Meiji <i>hyōjungo</i>.`,
  `<b>Kyūshū is three groups, not one</b>: Hichiku (north-west), Hōnichi (north-east) and Satsugu (Kagoshima).`,
  `<b>The standard is eastern in accent and western in politeness</b>: <i>ohayō gozaimasu</i>, the humble <i>oru</i> and the polite negative <i>-masen</i> are all borrowings from the Kyōto court.`,
  `<b>Levelling since Meiji</b>: <i>hyōjungo</i> built on Tōkyō middle-class speech, spread by textbooks, then by radio and television; <i>kyōtsūgo</i> replaced it after the war.`
 ],
 kyushu:[
  `<b>Three groups on one island</b>: Hichiku, Hōnichi, Satsugu — and the divisions are grammatical, not just geographic.`,
  `<b><i>Ka</i>-adjectives</b> in Hichiku and Satsugu: <i>samuka</i> for <i>samui</i> "cold".`,
  `<b>Particles</b>: question/nominaliser <i>to</i> rather than <i>no</i>; directional <i>sai</i> for <i>e</i>/<i>ni</i>; <i>o</i> resyllabifies the noun before it (<i>honno</i> for <i>hon-o</i>).`,
  `<b>Sound change</b>: /r/ drops (<i>koi</i> for <i>kore</i>); heavy vowel reduction in Satsugu and the Gotō Islands (<i>in</i> for <i>inu</i>).`,
  `<b>Accent</b>: much of Kyūshū either lacks pitch accent or has its own system; Kagoshima has been called a fourth branch of Japanese.`,
  `<b>Shared material with Ryukyuan</b>, some apparently innovative — one of the live questions in Japonic classification.`
 ],
 kansai:[
  `<b>The former standard</b>: Kyōto was the reference form for a thousand years, and modern honourifics still follow it.`,
  `<b>Kansai-type pitch accent</b>: the complex tone-plus-downstep system, preserving distinctions the Tōkyō type has lost.`,
  `<b>Keeps /ai/, /oi/, /ui/</b> where eastern dialects coalesce them — standard Japanese patterns with Kyōto on this.`,
  `<b>Source of standard words</b> including <i>yaru</i>, <i>kaminari</i> and <i>asatte</i>.`,
  `<b>Culturally dominant</b>: Osaka dialect is nationally associated with comedy, and Kansai forms are widely understood outside the region.`
 ],
 tohoku:[
  `<b>Eastern, but markedly divergent</b> from the standard in accent, verb morphology and vocabulary.`,
  `<b>Dialect tags were used here too</b> — the <i>hōgen fuda</i> was not an Okinawan-only practice.`,
  `<b>Isoglosses follow old <i>han</i> borders</b>, because Edo-period lords restricted movement between fiefs.`,
  `<b>The Ainu question is visible here</b>: Ainu-explicable place-names reach down through northern Honshū, and <i>matagi</i> hunters kept Ainu words in their hunting vocabulary.`,
  `<b>Contested reading</b>: Ainu spoken here before Japonic spread north, or the Emishi speaking a Japonic variety closest to ancient Izumo with Ainu arriving later.`
 ],
 kanto:[
  `<b>The standard is a dialect</b>: Tōkyō middle-class speech became Meiji <i>hyōjungo</i>.`,
  `<b>Tōkyō-type pitch accent</b>: downstep only, without the full Kyōto tone-and-downstep pattern — a set of losses, not a mark of age.`,
  `<b>Eastern vowel coalescence</b>: /ai/, /oi/, /ui/ → [eː], [eː], [iː].`,
  `<b>Not endangered — endangering</b>: the only node in this atlas whose present status is to be displacing the others.`
 ],
 hokuriku:[
  `<b>The seam</b>: the pitch-accent isogloss crosses this coast rather than running beside it, so Kyōto-type and Tōkyō-type accents interleave.`,
  `<b>Grammar follows the accent unevenly</b>, which is what makes the coast a test case for the east–west division.`,
  `<b>Kanazawa is the regional standard</b>, a castle town and craft centre.`,
  `<b>Snow-country vocabulary</b> for snow, sledges, roof-work and preserved food is unusually rich.`
 ],
 izumo:[
  `<b>A witness, not a heavyweight</b>: small in speakers, but grouped by Kindaichi with the "outer" dialects — eastern Kantō, Tōhoku, Kyūshū and Hachijō.`,
  `<b>Central to the Emishi argument</b>: one proposal has the Emishi speaking a Japonic variety closest to ancient Izumo, with Ainu arriving in the north later.`,
  `<b>Conservative</b>: keeps archaic forms the standard has lost, which is why a peripheral dialect with few speakers still matters to reconstruction.`
 ],
 hachijo:[
  `<b>No ISO 639-3 code</b> — only the withdrawn 639-6 code <code>hhjm</code> — so the atlas shows no code chip rather than a borrowed one.`,
  `<b>Descended from Eastern Old Japanese</b>: it keeps features recorded in the <i>azuma uta</i> of the <i>Man'yōshū</i> and the Hitachi <i>Fudoki</i>.`,
  `<b>Classification is genuinely open</b>: the most divergent form of Japanese, or a branch of Japonic alongside mainland Japanese and both halves of Ryukyuan.`,
  `<b>Outlying settlements</b>: spoken on Hachijō-jima and Aogashima, and on the Daitō Islands, settled from Hachijō-jima in the Meiji era.`,
  `<b>Unexplained links</b> to Kyūshū dialects and Ryukyuan — settlement, sailor-borne loans, or independent retentions from Old Japanese.`,
  `<b>Moribund</b>: under 1,000 speakers (2011), native speakers in the low hundreds, UNESCO "definitely endangered".`
 ],
 ryukyuan:[
  `<b>Not dialects</b>: Ryukyuan and Japanese are not mutually intelligible, and the Ryukyuan languages are largely not intelligible to each other either. They are called dialects of Japanese for socio-political reasons, not linguistic ones.`,
  `<b>The numbers make the case</b>: Okinawan is 71% cognate with standard Japanese; Kagoshima Japanese is 72% cognate with Amami but 80% with the standard — so the family boundary is sharper than a dialect boundary.`,
  `<b>Split by geography</b>: the 250 km-wide Miyako Strait divides Northern (Amami–Okinawa) from Southern (Miyako–Yaeyama) Ryukyuan.`,
  `<b>Southern Ryukyuan phonology is extreme</b>: syllabic consonants, unvoiced syllabic fricatives (<i>kss</i> [ksː] "breast" in Ōgami Miyako), glottalised consonants, voiceless nasals, central close vowels.`,
  `<b>Nobody knows the speaker count</b>: there is no census data; the Ryukyu region had 1,452,288 people in 2005, and fluent speakers are generally in their fifties or older.`,
  `<b>All six are on UNESCO's list</b> and UNESCO has projected all of them extinct by 2050: four definitely endangered (Amami, Kunigami, Okinawan, Miyako), two severely (Yaeyama, Yonaguni).`,
  `<b>The twentieth century was deliberate</b>: suppression from the 1890s, <i>hōgen fuda</i> dialect tags, illegality in the war years, and executions during the Battle of Okinawa for speaking Okinawan.`,
  `<b>A literature, at least</b>: Shuri Okinawan is attested from the 16th century and the <i>Omoro Sōshi</i> is the court's ritual-song anthology; a Naha-dialect radio news programme has run since 1960 and Okinawa Prefecture proclaimed <i>Shimakutuba no Hi</i> in 2006.`
 ],
 nryu:[
  `<b>Amami plus Okinawa Island</b>, with Kunigami in the north of the island and Okinawan in the centre and south.`,
  `<b>Three groupings, one set of data</b>: Glottolog (following Pellard) makes Kunigami and Central Okinawan the two Okinawan languages; Ethnologue adds Okinoerabu and Yoron to Kunigami; UNESCO, following Uemura, does the same.`,
  `<b>Okinawan was the regional standard</b>, so speakers of Amami, Miyako, Yaeyama and Yonaguni may still know some of it.`,
  `<b>All definitely endangered</b> in the 2009 Atlas — except the chain's southern end, which is graded severely.`
 ],
 amami:[
  `<b>A cluster, not a language</b>: four ISO codes (<code>kzg</code>, <code>ryn</code>, <code>ams</code>, <code>tkn</code>) plus two (<code>okn</code>, <code>yox</code>) that UNESCO folds into Kunigami instead.`,
  `<b>≈34,000 speakers by source</b>: Kikai 13,000; Amami Ōshima 12,000; Tokunoshima 5,100; Okinoerabu 3,200; Yoron 950.`,
  `<b>Glottalised consonants and a central vowel</b>: Yuwan Amami <i>ʔma</i> "horse", <i>kɨɨ</i> "tree"; up to seven vowels excluding length.`,
  `<b><i>Ton Futsūgo</i></b> — "potato common language" — is the Amami-accented Japanese that has replaced traditional Amami in everyday use on Amami Ōshima.`,
  `<b>UNESCO: definitely endangered.</b>`
 ],
 kunigami:[
  `<b>Yanbaru Kutūba</b>: the speech of northern Okinawa Island, separated from Central Okinawan on the same island by a linguistic rather than an administrative line.`,
  `<b>≈9,000 combined by source</b>: Kunigami 5,000, Okinoerabu 3,200, Yoron 950 — the last two attached to it by Ethnologue and UNESCO.`,
  `<b>Nakijin is the traditional standard</b>, Nago the largest community.`,
  `<b>Not taught in schools</b>; the state has called it a dialect of standard Japanese. UNESCO: definitely endangered.`
 ],
 okinawan:[
  `<b>The largest Ryukyuan language</b>: 228,000 native speakers and 1,143,000 total by source — and still, by the same source, with fluent speakers restricted to the older generation.`,
  `<b>A written history</b>: Shuri Okinawan is attested from the 16th century; the <i>Omoro Sōshi</i> is the Ryukyu Kingdom's ritual-song anthology.`,
  `<b>71% cognate with standard Japanese</b> — the figure that makes the "dialect" label untenable.`,
  `<b>Dialect tags and stigmatisation</b> in 20th-century schools led many speakers to stop transmitting it to their children.`,
  `<b>Okinawan Japanese has replaced it among the young</b>: a mixed Japanese–Okinawan variety, long ignored by linguists and activists alike.`,
  `<b>Institutional response</b>: <i>Shimakutuba no Hi</i> proclaimed 31 March 2006; Naha-dialect radio news since 1960. UNESCO: definitely endangered.`
 ],
 sryu:[
  `<b>Miyako and Yaeyama</b>, with Yonaguni usually counted as a third language — each unintelligible to the others and to Okinawan.`,
  `<b>≈98,000 speakers by source</b>: Miyako 50,000, Yaeyama 47,600, Yonaguni 400 — all source estimates.`,
  `<b>The phonologically strangest branch</b> of Japonic, with syllabic consonants, unvoiced syllabic fricatives and voiceless nasals.`,
  `<b>Grades differ across the three</b>: Miyako and Yaeyama definitely endangered, Yonaguni severely. Note <code>research.md</code> JP-104 — English Wikipedia's Yaeyama infobox disagrees with the 2009 Atlas on Yaeyama, and the atlas follows the Atlas.`
 ],
 miyako:[
  `<b>A diverse dialect cluster</b> in the Miyako Islands, most closely related to Yaeyama; the islands' population is about 52,000 (2011) and speakers ≈50,000 by source.`,
  `<b>Ōgami Miyako <i>kss</i> [ksː]</b> "breast" — an unvoiced syllabic fricative, the textbook example of Southern Ryukyuan phonology.`,
  `<b>Ikema Miyako has a voiceless nasal</b> /n̥/.`,
  `<b>Most people born after 1970 do not use it</b> except in songs and rituals; it is not taught or used in schools.`,
  `<b>Two grades on record</b>: UNESCO (February 2009) definitely endangered; the Endangered Languages Project severely endangered — a difference of method, not fact.`
 ],
 yaeyama:[
  `<b><i>Yaimamuni</i></b>, spoken across the Yaeyama Islands with Ishigaki as the standard variety; ≈47,600 speakers by source.`,
  `<b>The grade is disputed between sources</b>: the 2009 Atlas as restated by Japan's Agency for Cultural Affairs puts Yaeyama with Yonaguni in <i>severely endangered</i>, as does Patrick Heinrich (2009); the English Wikipedia infobox says <i>definitely endangered</i>. The atlas follows the 2009 Atlas and says so.`,
  `<b>Most closely related to Yonaguni</b>, the next island west.`,
  `<b>The kingdom's frontier</b>: the islands were the Ryukyu Kingdom's south-western edge, facing Taiwan and China.`,
  `<b>UNESCO projects all Ryukyuan languages extinct by 2050.</b>`
 ],
 yonaguni:[
  `<b>≈400 speakers</b>, by source — the most endangered language in Japan after Ainu, on a single island 125 km from Taiwan.`,
  `<b>Three vowels</b>, against as many as seven in some Amami varieties excluding length: the widest phonological range in one family in this series.`,
  `<b>Most closely related to Yaeyama</b>, and speakers are likely to know some Yaeyama for that reason — but the two are not mutually intelligible.`,
  `<b>UNESCO: severely endangered</b>, one of only two Japanese entries given that grade in the 2009 Atlas.`,
  `<b>The state calls it <i>Yonaguni hōgen</i></b>, a dialect of Japanese.`
 ],
 ainu:[
  `<b>Not related to Japanese</b>, and not demonstrably related to anything else: Altaic and Austroasiatic proposals have been made and none has held.`,
  `<b>A family of three</b>: Hokkaidō Ainu (surviving), Kuril Ainu (extinct 1962) and Sakhalin Ainu (extinct 1994). Vovin's classification splits Proto-Ainu into Proto-Hokkaido–Kuril and Proto-Sakhalin.`,
  `<b>Polysynthetic, SOV, one liquid consonant, pitch accent</b> — typologically far from Japanese despite the neighbourhood.`,
  `<b>Oral literature</b>: memorised hero-sagas (<i>yukar</i>) and <i>Uepeker</i>, told at gatherings lasting hours or days; Piłsudski made the first audio recordings in 1902–03.`,
  `<b>No native script, ever</b>: written in modified katakana, Latin and Cyrillic; extended katakana for Ainu sounds exist in Unicode; the <i>Ainu Times</i> publishes in katakana and Latin.`,
  `<b>Toponymy</b>: Ainu-explicable place-names reach through northern Honshū, and <i>matagi</i> hunters kept Ainu words in their hunting vocabulary.`,
  `<b>The Emishi question is open</b>: Ainu-speaking, or speakers of a Japonic variety closest to ancient Izumo.`,
  `<b>Recognised late</b>: 1997 Cultural Promotion Act, 2008 indigenous-language decision, April 2019 indigenous-peoples law, July 2020 the <i>Upopoy</i> museum at Shiraoi.`,
  `<b>Status</b>: UNESCO grades Hokkaidō Ainu critically endangered; the 2022 handbook calls it "more or less extinct, or 'dormant', as a living medium" with a growing number of neo-speakers.`
 ],
 hokkaido:[
  `<b>Every source gives a different number</b>: 304 people understood it to some extent in 2011; "a few speakers" in 2019; "a few native semi-speakers, as well as a growing number of neo-speakers" in 2022; two native speakers reported in 2025.`,
  `<b>The Hokkaidō surveys</b>: 2017 — 671 respondents, 0.7% able to converse, 3.4% a little, 44.6% some knowledge, 48.1% none. 2023 — 472 respondents, 0.8% able to converse, 8.9% a little, 19.3% barely, 69.3% not at all.`,
  `<b>The Saru dialect is what gets learned</b>, because it has the most grammatical descriptions and records — so "Ainu" as taught is largely Saru Ainu.`,
  `<b>Extended katakana</b> exist for Ainu sounds ordinary katakana cannot write, alongside a Latin alphabet and Cyrillic.`,
  `<b>Critically endangered</b> — the highest UNESCO grade used for Japan, and the only entry given it.`,
  `<b>Not "extinct"</b>: the sources say dormant or "more or less extinct", and neo-speaker numbers are rising.`
 ],
 sakhalin:[
  `<b>Extinct 30 April 1994</b>, with the death of Take Asai (Tahkonanna).`,
  `<b>Possibly more than one language</b>: diversity across the island is poorly documented; the best-attested dialects are Taraika and Rayciska.`,
  `<b>No ISO 639-3 code</b> — the register marks it a dialect of <code>ain</code>; Glottolog <code>sakh1245</code>.`,
  `<b>The oldest Ainu records anywhere</b>: sentences transcribed by Maarten Gerritszoon Vries in 1643, and 161 words recorded by Lapérouse in 1787.`,
  `<b>Proto-Ainu may have been spoken here</b>: linguistic evidence places it in southern Sakhalin and north-eastern Hokkaidō, expanding from there.`,
  `<b>The end was political</b>: all but 100 Sakhalin Ainu were deported to Japan after 1945; the last Ainu household on the island died out in the 1960s.`
 ],
 kuril:[
  `<b>Extinct 1962</b>, and poorly attested: no ISO 639-3 code, Glottolog <code>kuri1271</code>.`,
  `<b>Thin documentation, still growing</b>: Torii Ryūzō's data underpins the dictionaries; only one document of Southern Kuril Ainu is known; unpublished material keeps turning up in Russian archives.`,
  `<b>Golovnin's 1811 glossary</b> is one of the principal sources.`,
  `<b>Displaced an Okhotsk culture</b> — possibly Itelmen-related — which is the mirror image of the hypothesis that the Okhotsk were ancestral to the Nivkh and to part of the modern Ainu.`,
  `<b>Evacuated in two waves</b>: north to Kamchatka after 1875, south to Hokkaidō after 1945; about 100 descendants remain in Ust-Bolsheretsky District.`
 ]
};
/* ===================== hand-drawn schematic geometry =====================
   Ten coarse polygons traced by hand so the markers sit on something. Nothing
   here is surveyed: the Japanese arc is simplified to a single outline, the
   Ryukyu chain is drawn as one thin ribbon rather than the ~200 islands it
   really is, and Honshū, Kyūshū and Shikoku are separated by gaps that do not
   exist. Markers are at true coordinates; these shapes are not. */
const HONSHU = [[130.95,34.00],[131.50,34.40],[132.40,34.20],[133.00,34.30],[134.00,34.40],
 [135.00,34.30],[135.40,33.50],[136.00,34.00],[136.90,34.70],[137.50,34.60],[138.30,34.60],
 [139.80,34.90],[140.10,35.60],[140.90,35.70],[141.00,36.90],[141.00,38.30],[141.60,38.90],
 [141.90,39.60],[141.90,41.40],[141.00,41.50],[140.30,41.40],[140.00,40.50],[139.90,39.90],
 [140.00,39.00],[139.90,38.00],[139.50,37.00],[139.00,36.00],[138.30,37.20],[137.20,36.80],
 [136.70,36.60],[136.20,36.10],[135.50,35.60],[135.00,35.60],[134.50,35.60],[133.50,35.40],
 [132.50,35.40],[131.50,34.70],[131.00,34.40],[130.95,34.00]];
const KYUSHU = [[130.95,33.90],[130.90,33.30],[130.20,33.20],[129.80,33.20],[129.70,32.70],
 [129.90,32.60],[130.20,31.60],[130.20,31.00],[130.60,30.90],[130.70,31.30],[131.00,31.40],
 [131.40,31.60],[131.40,32.30],[131.70,32.80],[131.80,33.20],[131.60,33.60],[131.00,33.70],
 [130.95,33.90]];
const SHIKOKU = [[134.00,34.30],[134.70,34.20],[134.60,33.90],[134.20,33.50],[133.50,33.30],
 [133.00,32.70],[132.70,32.90],[132.50,33.30],[132.60,33.60],[133.00,34.00],[133.50,34.30],
 [134.00,34.30]];
const HOKKAIDO = [[140.00,41.50],[140.30,41.40],[141.00,41.40],[141.00,42.00],[141.70,42.60],
 [142.60,42.30],[143.20,41.90],[143.50,42.30],[144.30,42.90],[145.30,43.30],[145.60,43.30],
 [145.00,44.00],[144.80,44.10],[144.30,44.00],[143.70,44.30],[143.30,44.30],[142.70,44.70],
 [142.00,45.40],[141.70,45.50],[141.60,45.20],[141.40,44.50],[141.60,43.90],[141.30,43.40],
 [140.90,43.20],[140.50,43.30],[140.40,42.80],[139.80,42.90],[139.90,42.30],[140.30,41.90],
 [140.00,41.50]];
const RYUKYU = [[130.00,28.60],[129.20,28.20],[128.60,27.00],[128.00,26.40],[127.60,25.90],
 [127.30,26.10],[126.80,26.30],[126.20,26.20],[125.60,25.50],[125.30,25.00],[124.90,24.70],
 [124.20,24.60],[123.80,24.40],[123.30,24.30],[122.90,24.40],[122.80,24.50],[123.20,24.60],
 [123.70,24.70],[124.10,24.90],[124.60,25.00],[125.10,25.30],[125.50,25.80],[126.00,26.50],
 [126.60,26.60],[127.10,26.40],[127.50,26.20],[127.90,26.60],[128.40,27.20],[129.00,28.40],
 [129.70,28.80],[130.00,28.60]];
const SAKHALIN = [[142.00,46.00],[142.60,46.00],[143.00,46.50],[143.30,47.30],[143.50,48.00],
 [143.20,48.60],[142.90,49.30],[142.70,50.00],[142.50,50.70],[142.70,51.60],[142.90,52.30],
 [143.20,52.90],[143.50,53.50],[143.00,54.00],[142.40,54.20],[142.10,53.80],[142.00,53.00],
 [141.80,52.20],[141.60,51.50],[141.80,50.70],[142.00,50.00],[142.00,49.30],[141.90,48.60],
 [141.90,47.80],[141.80,47.00],[141.90,46.30],[142.00,46.00]];
const KURILS = [[156.60,50.90],[155.50,50.40],[154.80,49.80],[154.50,49.50],[153.50,49.20],
 [152.50,48.90],[151.50,48.60],[150.80,48.20],[150.20,47.70],[149.60,47.20],[149.00,46.60],
 [148.40,46.00],[147.80,45.50],[147.30,45.00],[146.70,44.50],[146.20,44.20],[145.80,43.90],
 [145.40,43.60],[145.20,43.70],[145.60,44.10],[146.10,44.50],[146.60,45.00],[147.10,45.40],
 [147.60,45.90],[148.20,46.40],[148.80,47.00],[149.40,47.60],[150.00,48.10],[150.70,48.60],
 [151.50,49.00],[152.40,49.30],[153.40,49.60],[154.40,50.00],[155.20,50.50],[156.20,51.00],
 [156.60,50.90]];
const KOREA = [[126.50,34.30],[126.80,35.00],[127.30,35.40],[127.70,36.00],[128.20,36.50],
 [128.40,37.00],[128.00,37.60],[127.50,38.00],[126.50,37.80],[126.20,37.00],[126.30,36.00],
 [126.20,35.00],[126.30,34.50],[126.50,34.30]];
const IZU = [[139.86,33.14],[139.72,33.12],[139.70,33.06],[139.78,33.05],[139.86,33.09],[139.86,33.14]];
const AOGASHIMA = [[139.79,32.48],[139.73,32.47],[139.72,32.44],[139.77,32.43],[139.79,32.45],[139.79,32.48]];
const DAITO = [[131.26,25.86],[131.20,25.85],[131.19,25.82],[131.24,25.81],[131.26,25.83],[131.26,25.86]];
const JAPONIC_GEO = { type:'FeatureCollection', features:
 [HONSHU,KYUSHU,SHIKOKU,HOKKAIDO,RYUKYU,SAKHALIN,KURILS,KOREA,IZU,AOGASHIMA,DAITO].map(r=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };
/* ---------- approximate "core areas" ----------
   Coarse hand-drawn blocks showing roughly where each branch is rooted — NOT
   surveyed boundaries. They merge dialect chains into blocks, ignore the fact
   that the Ryukyu languages occupy about 200 separate islands, treat the
   Japanese dialect continuum as a single region, and draw the extinct Ainu
   zone over territory that was never one speech area. The marker layer remains
   the factual one. */
const AREAS = {
 'c-anc':[
  [[129.5,31.5],[132.5,32.5],[136.0,35.0],[137.5,37.0],[135.0,37.0],[131.5,35.0],[129.5,33.0],[129.5,31.5]]
 ],
 'c-jpn':[
  [[129.6,31.0],[130.9,30.9],[131.8,33.2],[133.0,34.3],[136.9,34.7],[140.1,35.6],[141.0,36.9],
   [141.0,38.3],[141.9,41.4],[141.0,41.5],[140.0,40.5],[139.9,38.0],[139.0,36.0],[137.2,36.8],
   [136.2,36.1],[134.5,35.6],[132.5,35.4],[131.0,34.4],[129.7,32.7],[129.6,31.0]]
 ],
 'c-hac':[
  [[139.90,33.20],[139.68,33.18],[139.66,33.02],[139.88,33.02],[139.90,33.20]],
  [[139.84,32.54],[139.70,32.53],[139.69,32.40],[139.83,32.41],[139.84,32.54]],
  [[131.32,25.92],[131.14,25.90],[131.12,25.76],[131.30,25.78],[131.32,25.92]]
 ],
 'c-ryu':[
  [[130.2,28.8],[129.0,28.4],[128.0,27.0],[127.0,26.0],[126.0,25.4],[125.2,24.8],[124.2,24.2],
   [123.2,23.9],[122.6,24.2],[122.7,24.7],[123.6,24.9],[124.6,25.2],[125.6,26.0],[126.6,26.7],
   [127.5,26.9],[128.6,27.6],[129.6,28.6],[130.2,28.8]]
 ],
 'c-nryu':[
  [[130.1,28.9],[129.1,28.5],[128.1,27.3],[127.2,26.5],[126.5,26.3],[126.4,26.9],[127.3,27.1],
   [128.3,27.9],[129.3,28.6],[130.0,29.0],[130.1,28.9]]
 ],
 'c-sryu':[
  [[125.7,25.5],[124.8,25.1],[123.9,24.6],[123.0,24.2],[122.5,24.3],[122.6,24.8],[123.5,25.0],
   [124.5,25.3],[125.5,25.8],[125.7,25.5]]
 ],
 'c-ain':[
  [[139.9,42.0],[141.0,41.5],[141.7,42.6],[143.2,41.9],[145.3,43.3],[145.0,44.0],[142.7,44.7],
   [142.0,45.4],[141.6,45.2],[141.3,43.4],[140.4,42.8],[139.9,42.3],[139.9,42.0]]
 ],
 'c-ext':[
  [[141.7,46.0],[143.6,47.5],[142.4,50.7],[143.5,53.5],[142.4,54.2],[141.6,51.5],[141.9,48.6],[141.7,46.0]],
  [[156.6,50.9],[154.5,49.5],[150.8,48.2],[147.3,45.0],[145.2,43.7],[145.6,44.1],[148.8,47.0],
   [152.4,49.3],[156.2,51.0],[156.6,50.9]]
 ]
};
/* ---------- listen links: an Omniglot page where one exists, plus the engine's
   YouTube-search fallback on every node. Every URL below was requested on
   2026-09-26 and returned 200. Note the extension trap recorded in research.md
   JP-110: Omniglot's Okinawan page is the ONLY one of the Ryukyuan set on .php
   (writing/okinawan.php is 200; writing/okinawan.htm is 404), while Amami,
   Miyako, Yaeyama and Yonaguni are all .htm. Omniglot has no page for Kunigami,
   for Sakhalin Ainu or for Kuril Ainu, and the dialect-cluster nodes have none
   either — those carry an empty list rather than a guessed or 404 link. ---------- */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 japonic:    [['Japanese — Omniglot', OM+'japanese.htm'], ['Ainu — Omniglot', OM+'ainu.htm']],
 protojaponic:[],
 japanese:   [['Japanese — Omniglot', OM+'japanese.htm'], ['Hiragana — Omniglot', OM+'japanese_hiragana.htm'],
              ['Katakana — Omniglot', OM+'japanese_katakana.htm'], ['Rōmaji — Omniglot', OM+'japanese_romaji.htm']],
 kyushu:     [],
 kansai:     [],
 tohoku:     [],
 kanto:      [['Japanese — Omniglot', OM+'japanese.htm']],
 hokuriku:   [],
 izumo:      [],
 hachijo:    [['Hachijō — Omniglot', OM+'hachijo.htm']],
 ryukyuan:   [['Okinawan — Omniglot', OM+'okinawan.php'], ['Amami — Omniglot', OM+'amami.htm'],
              ['Miyakoan — Omniglot', OM+'miyakoan.htm'], ['Yaeyama — Omniglot', OM+'yaeyama.htm'],
              ['Yonaguni — Omniglot', OM+'yonaguni.htm']],
 nryu:       [['Okinawan — Omniglot', OM+'okinawan.php'], ['Amami — Omniglot', OM+'amami.htm']],
 amami:      [['Amami — Omniglot', OM+'amami.htm']],
 kunigami:   [],
 okinawan:   [['Okinawan — Omniglot', OM+'okinawan.php']],
 sryu:       [['Miyakoan — Omniglot', OM+'miyakoan.htm'], ['Yaeyama — Omniglot', OM+'yaeyama.htm'],
              ['Yonaguni — Omniglot', OM+'yonaguni.htm']],
 miyako:     [['Miyakoan — Omniglot', OM+'miyakoan.htm']],
 yaeyama:    [['Yaeyama — Omniglot', OM+'yaeyama.htm']],
 yonaguni:   [['Yonaguni — Omniglot', OM+'yonaguni.htm']],
 ainu:       [['Ainu — Omniglot', OM+'ainu.htm']],
 hokkaido:   [['Ainu — Omniglot', OM+'ainu.htm']],
 sakhalin:   [],
 kuril:      []
};
/* ===================== the atlas contract (languages.md §1.3) ===================== */
window.ATLASES = window.ATLASES || {};
window.ATLASES.japonic = {
  key: 'japonic',
  title:   { zh: '日本語族・アイヌ語', en: 'Japonic & Ainu' },
  tagline: 'The archipelago’s own families — a Japonic chain from Kyūshū to Tōhoku, the Ryukyuan languages, Hachijō, and Ainu at the northern edge',
  stats:   [['23', 'nodes'], ['4', 'branches'], ['≈123 million', 'speakers, by source'], ['8', 'UNESCO-listed entries']],
  palette: {
    anc: '#c9d2dd', jpn: '#3f5b9e', hac: '#8296cf', ryu: '#e2703a',
    nryu: '#f0945e', sryu: '#b8452c', ain: '#c08a2e', ext: '#8b94a8'
  },
  legend:  [['anc','Ancestral / proto'],['jpn','Mainland Japanese'],['hac','Hachijō'],
            ['ryu','Ryukyuan (branch)'],['nryu','Northern Ryukyuan (Amami–Okinawa)'],
            ['sryu','Southern Ryukyuan (Miyako–Yaeyama)'],['ain','Ainu'],['ext','Extinct']],
  view:    { center: [137, 38], zoom: 4.2 },
  outline: { color: '#3f5b9e', fill: 'rgba(63,91,158,0.06)' },
  sketchGeo: JAPONIC_GEO,
  captions: {
    note:   '● Markers show <b>representative places</b> where the selected variety is rooted. For the dialect nodes (Kyūshū, Kansai, Tōhoku, Kantō, Hokuriku, Izumo) a marker means <em>a city whose speech is the reference variety for that region</em>, not that everyone there speaks it. For the Ryukyuan and Ainu nodes a marker means an island or district where the language is still present. Sapporo, Naha and Kagoshima are administrative centres; the markers beside them are the speech communities.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — coarse hand-drawn blocks showing roughly where each branch is rooted. They follow no surveyed boundary, treat the Japanese dialect continuum as a single region, and draw the Ryukyuan languages as one band when they occupy some two hundred separate islands. The extinct Ainu zone is drawn over territory that was never one speech area. The marker layer is the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn Japan arc, Kyūshū, Shikoku, Hokkaidō, the Ryukyu chain, Sakhalin, the Kurils, the tip of Korea and the Izu and Daitō islands, simplified from known coordinates; the markers sit at true positions. Works fully offline.'
  },
  fonts: ['Noto Serif JP', 'Noto Sans SC'],
  filterPlaceholder: 'e.g. Okinawan, Ainu, Tōhoku…',
  listen: {
    om: 'https://www.omniglot.com/writing/',
    fv: 'https://forvo.com/languages/',
    search: 'Japonic language native speaker'
  },
  rootId: 'japonic',
  stages: ['protojaponic'],
  sources: 'Sources: B. Frellesvig, <i>A History of the Japanese Language</i> (2010) · A. Vovin, <i>A Descriptive and Comparative Grammar of Western Old Japanese</i> and <i>A Reconstruction of Proto-Ainu</i> (1993) · M. Shibatani, <i>The Languages of Japan</i> (1990) · B. Frellesvig &amp; J. Whitman (eds.), <i>Proto-Japonic and the Handbook of Old Japanese</i> · T. Pellard and M. Shimoji &amp; T. Pellard, <i>An Introduction to Ryukyuan Languages</i> (2010) · P. Heinrich, <i>The Ryukyus and the New, But Endangered, Languages of Japan</i> (Asia-Pacific Journal, 2009) · the UNESCO <i>Atlas of the World’s Languages in Danger</i> (3rd ed. 2010, and the 2009 listing as restated by Japan’s Agency for Cultural Affairs) for every endangerment grade quoted · the SIL ISO 639-3 register (<i>iso-639-3.tab</i>, retrieved 2026-09-26) for every code quoted. Speaker figures are approximations and vary widely between government surveys, Ethnologue, Glottolog and fieldworker counts; where sources disagree the hedge “by source” is used rather than a single figure. The Yaeyama endangerment grade is disputed between sources and the node says so — see <i>research.md</i> JP-104. Hachijō, Sakhalin Ainu and Kuril Ainu have no ISO 639-3 code and are shown without one.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();
