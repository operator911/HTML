/* atlas-mongolic.js — Mongolic 蒙古语族
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (languages.md §1.3 contract, §2.4 brief,
 * research.md §"Mongolic (Phase 4)" for the evidence log — entries MG-101…MG-110).
 *
 * The family's script history is the reason this atlas exists, so it gets a
 * branch of its own ("Writing systems", c-script) that is explicitly labelled
 * as NOT a genetic subgroup: 1204 Uyghur-derived → 1269 ʼPhags-pa → 1587 Galik
 * → 1648 Clear Script → Vagindra → 1941/1946 Cyrillic → 2020–2025 co-official.
 *
 * ISO 639-3 codes below were checked against the SIL ISO 639-3 register itself
 * (iso-639-3.tab and iso-639-3-macrolanguages.tab,
 * https://iso639-3.sil.org/code_tables/download_tables, retrieved 2026-09-26).
 * Findings the register forces, all recorded in the ISO map:
 *   · `mon` and `bua` are MACROLANGUAGES — `mon` over khk + mvf, `bua` over
 *     bxm + bxr + bxu (the macrolanguage table gives both sets status A);
 *   · `xng` (Middle Mongolian) and `cmg` (Classical Mongolian) are type H;
 *   · `xwo` (Written Oirat) is type E — EXTINCT;
 *   · Oirat has NO 639-3 code of its own; it is coded as Kalmyk `xal`.
 * False friends in the same register: `ybe` is WEST Yugur, which is Turkic, not
 * Mongolic (only `yuy`, East Yugur, belongs here); `mgt` is "Mongol" of Papua
 * New Guinea; `oia` is "Oirata" of Indonesia.
 *
 * ⚠ research.md MG-104 records TWO corrections to this family's brief: the
 * Secret History is not "1240" (its colophon gives 1228 at the earliest, and
 * the infobox says "date disputed"), and Moghol is a relic of the Mongol
 * empire, not a "colonial-era" one. MG-102 records four speaker-count conflicts.
 *
 * Cross-links: #tungusic (the Manchu and Xibe alphabets descend from the
 * Mongolian script, and Dagur used the Manchu script historically) and
 * #sinitic/lanyin (the mixed Sinitic–Mongolic languages Tangwang and Wutun, and
 * the Mongol-era loanword *hutong*).
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree ===================== */
const DATA = {
 id:"mongolic", en:"Mongolic", zh:"蒙古语族", py:"Měnggǔ yǔzú",
 sp:"≈6.3 million, by source",
 region:"Mongolia, Inner Mongolia and Manchuria, Buryatia and the Volga–Caspian, Xinjiang, the Gansu–Qinghai highlands, and one relic in Afghanistan",
 cls:"c-anc", mk:[[47.89,106.91,"Ulaanbaatar"],[40.84,111.75,"Hohhot"],[51.83,107.58,"Ulan-Ude"],
   [46.31,44.26,"Elista (Kalmykia)"],[34.34,62.20,"Herat (Moghol)"],[36.62,101.78,"Xining"]],
 h:[`Mongolic is the family of the steppe belt: roughly 6.3 million speakers, by source, strung from the Volga–Caspian in the west to Manchuria in the east, with a cluster of small languages in the Gansu–Qinghai highlands and one isolated relic in Afghanistan. The best-known member is Mongolian, the national language of Mongolia and the language of the Mongol population of Inner Mongolia; the family's own article gives it "an estimated 5.7+ million speakers".`,
   `It has <b>no convincingly established living relatives</b>. Its closest relatives appear to be the extinct <b>para-Mongolic</b> languages — Khitan, Tuyuhun, and possibly Tuoba — related as sister groups rather than as ancestors or descendants. Whether Khitan belongs inside Mongolic or beside it is exactly the kind of question this family keeps producing.`,
   `The Altaic hypothesis groups Mongolic with Turkic, Tungusic and possibly Koreanic or Japonic; the article's own wording is that "a few linguists" do so and that the grouping is "controversial". The more recent "Transeurasian" superfamily proposal, which would add Japonic and Korean to the same bundle, "has been severely criticized". This atlas treats both as proposals, not results, and the Tungusic and Japonic atlases do the same.`,
   `What makes Mongolic worth a whole atlas is not its size but its <b>scripts</b>. It has been written in one of the largest numbers of writing systems of any language on earth: an indigenous vertical script derived from Old Uyghur, adopted by Genghis Khan in 1204; the ʼPhags-pa alphabet designed by a Tibetan monk for Kublai Khan in 1269; the Galik alphabet of 1587 for Tibetan and Sanskrit; the Clear Script of 1648 for Oirat; the Vagindra script for Buryat; Latin for two months; and Cyrillic, made mandatory in 1941. In 2020 the Mongolian government announced that both Cyrillic and the traditional script would be used in official documents by 2025, and the traditional script is a co-official script in Mongolia since then. The script history is given its own branch below — labelled as a set of writing systems, not as a genetic subgroup, because it is not one.`,
   `The family's internal shape is a dialect continuum as much as a tree, and the sources say so: close contact between Buryat and Khalkha over centuries has preserved a continuum rather than produced clean splits, and Mongolian linguists use a three-way distinction — <i>kele</i> (language), <i>nutuɣ-un ayalɣu</i> (dialect) and <i>aman ayalɣu</i> (Mundart) — that has no exact English equivalent. Counting "languages" in this family is therefore a matter of convention, and which convention applies is stated for each.`],
 t:[["4th–12th c.","Pre-Proto-Mongolic, in contact with Oghur (r-)Turkic and then Common Turkic"],
    ["1204","Genghis Khan adopts the Uyghur-derived vertical script"],
    ["1206","Temüjin takes the title Genghis Khan"],
    ["c. 1228","The <i>Secret History of the Mongols</i> — the colophon's earliest possible date (disputed)"],
    ["1269","ʼPhags-pa designed by Drogön Chögyal Phagpa for Kublai Khan"],
    ["1368","The Yuan falls; ʼPhags-pa goes out of use with the Ming"],
    ["1587","The Galik alphabet created by Ayuush Güüsh for Tibetan and Sanskrit"],
    ["1630","Oirat Mongols reach the lower Volga — the Kalmyk Khanate begins"],
    ["1648","Zaya Pandita creates the Clear Script for Oirat"],
    ["18th c.","A large part of the Kalmyks moves back from the Volga to Dzungaria"],
    ["1921–1940","Literacy campaigns in the traditional script raise literacy from 3.0% to 17.3%"],
    ["1941","Cyrillic made mandatory by government decree; literacy reaches 73.5% by 1950"],
    ["1991–1994","An attempt to reintroduce the traditional alphabet fails"],
    ["March 2020","Mongolia announces both scripts in official documents by 2025"]],
 kids:[
  { id:"protomongolic", en:"Proto-Mongolic", zh:"原始蒙古语", py:"Yuánshǐ Měnggǔyǔ", sp:"reconstructed",
    region:"By reconstruction, the Mongol heartland — with the family's homeland placed further east, in western Manchuria",
    cls:"c-anc", mk:[[48.00,118.00,"Western Manchuria (Janhunen's proposed homeland)"],[47.90,106.90,"The Mongol heartland"]],
    h:[`Proto-Mongolic can be identified chronologically with the language spoken by the Mongols during Genghis Khan's early expansion in the 1200s–1210s. It is the last common ancestor of the modern languages, reconstructed from Middle Mongol and the living varieties together.`,
       `Behind it lies <b>Pre-Proto-Mongolic</b>, a continuum reaching back indefinitely: Early Pre-Proto-Mongolic, which borrowed from Oghur (r-)Turkic while Oghur tribes still lived in the Mongolian borderlands before the 5th century, and Late Pre-Proto-Mongolic, spoken a few centuries before Proto-Mongolic by the Mongols and their neighbours such as the Merkits and Keraits. Some archaic words and features in Written Mongolian go back past Proto-Mongolic to that Late stage.`,
       `The homeland is Janhunen's argument and it is worth stating precisely, because it reverses the obvious guess: "the Mongolic homeland was located further to the east, in <b>western Manchuria</b>", while "Mongolia is primarily the source region of the Turkic language family". On that reading Mongolic is not originally a Mongolian-plateau family at all — it moved west onto the plateau, and Turkic moved out of it. A possible precursor is the Xianbei language, heavily influenced by Proto-Turkic.`],
    t:[["4th c. CE","Early Pre-Proto-Mongolic; Oghur Turkic loanwords enter"],
       ["pre-13th c.","Late Pre-Proto-Mongolic; Common Turkic contact"],
       ["1200s–1210s","Proto-Mongolic, at the time of Genghis Khan's expansion"],
       ["2003","Janhunen places the homeland in western Manchuria"]]},
  { id:"middlemongol", en:"Middle Mongol", zh:"中古蒙古语", py:"Zhōnggǔ Měnggǔyǔ", sp:"a koiné of the Mongol Empire",
    region:"The Mongol Empire — Mongolia, Yuan China, Ilkhanid Persia, the Golden Horde",
    cls:"c-mm", mk:[[47.20,102.83,"Karakorum"],[47.50,110.50,"Khodoe Aral, on the Kherlen (the Secret History's colophon)"],
      [39.90,116.40,"Dadu (Beijing)"],[38.07,46.30,"Tabriz (Ilkhanid chancery)"],[48.70,44.50,"Sarai (Golden Horde)"]],
    h:[`Middle Mongol was a <b>koiné</b> — an imperial lingua franca — spoken across the Mongol Empire. It originated in Genghis Khan's home region of north-eastern Mongolia and diversified into the modern Mongolic languages after the empire collapsed. It is dated as developing into Classical Mongolian by the 17th century.`,
       `Compared with modern Mongolian it had <b>no long vowels</b>, a different vowel harmony, a different verbal system and a slightly different case system — which is why the modern languages cannot simply be read back off it. It survives in several scripts: ʼPhags-pa in the Yuan decrees, Arabic in dictionaries, Chinese characters, and the Mongolian script itself. Its first surviving monument is usually taken to be the <b>Stele of Yisüngge</b>, a sports report dated between 1224 and 1225, though Igor de Rachewiltz argued it was more likely erected about a quarter-century later, when the man it commemorates had gained more political weight.`,
       `The name is a mild misnomer and the source says so: Middle Mongol is "the earliest directly-attested (as opposed to reconstructed) ancestor of Modern Mongolian", and by the usual conventions for naming historical stages it would be called <i>Old</i> Mongolian. There is no surviving linguistic material from the earlier 12th-century Mongol confederation, so "Old Mongol" would have nothing to attach to. Vovin (2019) has since argued that the Rouran language of the Rouran Khaganate was Mongolic and close to, but not identical with, Middle Mongol — which, if it holds, is the earliest Mongolic we have any handle on.`],
    t:[["1224–1225","The Stele of Yisüngge, usually called the first surviving monument"],
       ["c. 1228","The <i>Secret History of the Mongols</i>, on the colophon's earliest possible reading"],
       ["1240","An edict of Töregene Khatun — the earliest monument if the stele is redated"],
       ["1252","Atwood's date for the original of the <i>Secret History</i>, in Mongolian script"],
       ["1269–1368","ʼPhags-pa used for Yuan decrees; Middle Mongol in Arabic, Chinese and Mongolian scripts"],
       ["by the 17th c.","Develops into Classical Mongolian"]],
    kids:[
  { id:"secret", en:"The Secret History of the Mongols", zh:"蒙古秘史", py:"Ménggǔ Mìshǐ", sp:"the oldest surviving Mongolic literary work",
    region:"Written on the Kherlen River at Khodoe Aral; survives as a Ming-dynasty transcription",
    cls:"c-mm", mk:[[47.50,110.50,"Khodoe Aral, on the banks of the Kherlen River"]],
    h:[`The <i>Secret History</i> is the oldest surviving literary work in the Mongolic languages and the single richest source for pre-Classical and Middle Mongol. It was written for the Mongol royal family some time after Genghis Khan's death in 1227, by an unknown author, in Middle Mongol using the Mongolian script, and it recounts his life and conquests and part of the reign of his successor Ögedei. It is regarded as the most significant native Mongol account of Genghis Khan and has been translated into more than 40 languages.`,
       `The date is genuinely uncertain, and no certainty is claimed for it. The standard account calls the date "disputed". The colophon describes it as finished in the Year of the Mouse, on the banks of the Kherlen River at Khodoe Aral — an earliest possible figure of <b>1228</b>. Igor de Rachewiltz and Christopher Atwood put the original in Mongolian script at around <b>1252</b>. An earlier draft of this entry said "1240"; that date belongs to a different document, an edict of Töregene Khatun, and has been corrected.`,
       `What actually matters for using the text as a linguistic source is what survived. The full Mongolian body came down to us only through a version made around the 15th century, at the start of the Ming dynasty, in which the pronunciation was <b>transcribed into Chinese characters</b> as a tool for interpreters, under the title 《元朝秘史》. So the text we can read reflects the pronunciation of Middle Mongol from the second half of the 14th century, not of 1228 — a distinction worth keeping, because it is exactly the kind of thing that gets flattened into a single confident year. About two-thirds of it also appears, in slightly different versions, in the 17th-century chronicle <i>Altan Tobchi</i>.`],
    t:[["after 1227","Written for the Mongol royal family, author unknown"],
       ["c. 1228","The colophon's Year of the Mouse — earliest possible date"],
       ["c. 1252","De Rachewiltz and Atwood's date for the Mongolian-script original"],
       ["15th c.","Survives as a Ming-era transcription into Chinese characters, 《元朝秘史》"],
       ["17th c.","About two-thirds reappears in Lubsang-Danzin's <i>Altan Tobchi</i>"],
       ["present","Translated into more than 40 languages"]]}
    ]},
  { id:"scripts", en:"Writing systems", zh:"文字系统", py:"Wénzì xìtǒng", sp:"not a subgroup — six scripts, one language family",
    region:"Mongolia, Inner Mongolia, Xinjiang, Buryatia and Kalmykia",
    cls:"c-script", mk:[[47.89,106.91,"Ulaanbaatar"],[40.84,111.75,"Hohhot"],[51.83,107.58,"Ulan-Ude"],
      [46.31,44.26,"Elista"],[29.65,91.13,"Lhasa (home of the ʼPhags-pa designer)"]],
    h:[`<b>This is not a genetic subgroup.</b> It appears because the script history is the most interesting thing about Mongolic, and there is nowhere else to put it. The six scripts below are not daughter languages; they are writing systems that Mongolic-speakers adopted, invented or were assigned over eight centuries.`,
       `The sequence has a shape. An <b>indigenous</b> vertical script, derived from Old Uyghur, was adopted by Genghis Khan in 1204 and is still in use. An <b>imperial</b> script, ʼPhags-pa, was designed in 1269 by a Tibetan monk for Kublai Khan as a single writing system for every language of the Yuan, and died with the dynasty. A <b>scholarly</b> extension, Galik, was created in 1587 to write Tibetan and Sanskrit in Mongolian letters. A <b>reform</b>, the Clear Script, was made in 1648 by an Oirat monk to remove the ambiguities of the old script. A <b>national</b> experiment, Vagindra, was devised for Buryat around the turn of the 20th century. And then <b>imposed</b> Cyrillic, which replaced nearly everything in Mongolia in the 1940s.`,
       `Two practical notes belong here. First, the traditional script is vertical, written top to bottom with lines running left to right, and it is a true alphabet with separate letters for consonants and vowels. Second, and relevant to anyone building a page like this one: "computer operating systems have been slow to adopt support for the Mongolian script; almost all have incomplete support or other text rendering difficulties". That is why this atlas sets Mongolian names in Latin transliteration and Cyrillic rather than in the vertical script — not a stylistic choice but a limitation of the rendering stack.`],
    t:[["1204","Traditional Mongolian script adopted by Genghis Khan"],
       ["1269","ʼPhags-pa designed for Kublai Khan"],
       ["1368–c. 1660","ʼPhags-pa survives in diminishing use, then dies"],
       ["1587","Galik alphabet created by Ayuush Güüsh"],
       ["1648","Clear Script created by Zaya Pandita"],
       ["early 20th c.","Vagindra script devised for Buryat by Agvan Dorzhiev"],
       ["1930–1932","A short-lived Latin attempt in Mongolia"],
       ["1941","Cyrillic made mandatory by decree"],
       ["2020–2025","Both Cyrillic and the traditional script to be used officially"]],
    kids:[
     { id:"mongolscript", en:"Traditional Mongolian script", zh:"蒙古文（回鹘式）", py:"Měnggǔwén", sp:"adopted 1204; co-official in Mongolia since 2025",
       region:"Mongolia, Inner Mongolia and wherever Mongolian is written; the vertical script",
       cls:"c-script", mk:[[47.89,106.91,"Ulaanbaatar"],[40.84,111.75,"Hohhot"],[51.83,107.58,"Ulan-Ude"],
         [45.66,112.31,"Xilinhot"],[39.61,109.78,"Ordos"]],
       h:[`The traditional Mongolian script — <i>Hudum Mongol bichig</i> — is "the first writing system created specifically for the Mongolian language", and it was the most widespread until Cyrillic arrived. It is <b>derived from the Old Uyghur alphabet</b>, and it is a true alphabet with separate letters for consonants and vowels, written vertically from top to bottom with lines running left to right.`,
          `Genghis Khan adopted it in <b>1204</b>, recognising the need to write his own people's language. The knowledge came from Uyghur scribes brought into the Mongol confederation early — the source names Tata-tonga, Bilge Buqa, Kara Igach Buyruk and Mengsus — who shared their written language with the imperial clan. After that the script underwent minor disambiguations and supplementation but kept its Uyghur skeleton.`,
          `Its descendants are the clearest cross-link here into the Tungusic family: the <b>Manchu</b> and <b>Xibe</b> alphabets are adaptations of this script, Dagur used the Manchu script historically, and the Evenki alphabet in China is another offshoot. The Clear Script for Oirat, the Vagindra script for Buryat and the Galik alphabet for Tibetan and Sanskrit are its other children. It has been a co-official script in Mongolia since 2025, alongside Cyrillic, and it is the official written form taught to Mongolian students in the Inner Mongolia Autonomous Region — so after a century in which the two Mongolian standards diverged in script as well as in speech, they are converging again, at least officially.`],
       t:[["1204","Adopted by Genghis Khan, from the Old Uyghur alphabet"],
          ["13th–14th c.","Uyghur scribes teach and then modify it at the Mongol court"],
          ["1587","Galik extension added for Tibetan and Sanskrit"],
          ["1648","Clear Script split off for Oirat"],
          ["1946","Displaced in Mongolia by Cyrillic"],
          ["1991–1994","A reintroduction attempt fails"],
          ["2025","Co-official in Mongolia; official in Inner Mongolia's schools"]]},
     { id:"phagspa", en:"ʼPhags-pa", zh:"八思巴文", py:"Bāsībāwén", sp:"1269 – c. 1660",
       region:"Designed at the Yuan court; used across Yuan China and the Mongol successor states",
       cls:"c-script", mk:[[39.90,116.40,"Dadu (Beijing)"],[29.65,91.13,"Lhasa — the designer's home"],
         [34.60,108.90,"Xi'an"],[47.20,102.83,"Karakorum"]],
       h:[`ʼPhags-pa was the imperial script experiment: an alphabet designed by the Tibetan monk and State Preceptor — later Imperial Preceptor — <b>Drogön Chögyal Phagpa (1235–1280)</b> for <b>Kublai Khan</b>, as a single unified script for every written language within the Yuan. It was used to write and transcribe Chinese, Tibetan, Mongolian, Old Uyghur, Sanskrit, probably Persian, and other neighbouring languages.`,
          `It was the first script designed for the whole Mongol empire rather than for Mongolian alone, and that is both its interest and its failure. Its actual use was "limited to about a hundred years during the Mongol-led Yuan dynasty", and it fell out of use with the advent of the Ming. Its recorded lifespan is <b>1269 – c. 1660</b>, covering a long tail of diminishing use after the dynasty ended. For historical linguists its value is indirect: because ʼPhags-pa wrote Chinese and Tibetan phonetically in a script of known values, it provides evidence about how those languages were pronounced in the 13th and 14th centuries.`,
          `Its descendants are surprising. It is a Brahmic-lineage script — its ancestry runs Egyptian → Proto-Sinaitic → Phoenician → Aramaic → Brahmi → Gupta → Tibetan — and its child is the <b>Zanabazar square script</b>, a 17th-century Mongolian script invented by the first Jebtsundamba Khutuktu. So the failed imperial alphabet did not die out so much as reappear, one remove later, as a national one.`],
       t:[["1269","Designed by Drogön Chögyal Phagpa for Kublai Khan"],
          ["1269–1368","Used for Yuan decrees and to transcribe Chinese, Tibetan, Uyghur, Persian"],
          ["1368","The Ming displaces it; use declines"],
          ["later","Zanabazar's square script continues its lineage — the source gives the descent, not a year"],
          ["c. 1660","Out of use"]]},
     { id:"galik", en:"Galik", zh:"阿礼嘎礼字", py:"Ālǐgālǐzì", sp:"created 1587",
       region:"Mongolia and Inner Mongolia; still used there for foreign names and Chinese transcription",
       cls:"c-script", mk:[[47.89,106.91,"Ulaanbaatar"],[40.84,111.75,"Hohhot"]],
       h:[`Galik — <i>Ali-gali</i> — is an extension rather than a replacement: the traditional Mongolian script plus extra letters. It was created in <b>1587</b> by the translator and scholar <b>Ayuush Güüsh</b>, inspired by the third Dalai Lama Sonam Gyatso, to transcribe Tibetan and Sanskrit terms when translating religious texts, and later Chinese as well.`,
          `Its practical afterlife is the interesting part. Some of the added characters are still in use today for writing foreign names. And in <b>1917</b> the politician and linguist Bayantömöriin Khaisan, preparing a bilingual edition of the <i>Original Sounds of the Five Regions</i> to help Mongolian speakers learn Mandarin, repurposed three Galik letters to represent the Mandarin retroflex consonants — and those letters remain in use in Inner Mongolia for transcribing Chinese.`,
          `So Galik is the family's oldest continuously used answer to a problem that never went away: how to write borrowed sounds in a script designed for a different inventory. It is the Mongolian analogue of the extended katakana this atlas uses for Ainu.`],
       t:[["1587","Created by Ayuush Güüsh, inspired by the 3rd Dalai Lama"],
          ["1587–","Used for Tibetan and Sanskrit in Buddhist translation"],
          ["1917","Three letters repurposed for Mandarin retroflex consonants"],
          ["present","Still used in Inner Mongolia for foreign names and Chinese"]]},
     { id:"clearscript", en:"Clear Script", zh:"托忒文", py:"Tuōtèwén", sp:"created 1648 — still in use",
       region:"Xinjiang's Oirat communities and Kalmykia; official for Oirat in China and Mongolia",
       cls:"c-script", mk:[[43.83,87.62,"Ürümqi"],[48.00,91.65,"Khovd"],[46.31,44.26,"Elista"],
         [46.99,89.28,"Altay (Xinjiang)"]],
       h:[`The Clear Script — <i>todo bichig</i>, "clear writing" — was created in <b>1648</b> by the Oirat Lamaist monk <b>Zaya Pandita</b> for the Oirat language. It is built on the traditional Mongolian script and its aim was precision: to distinguish all the sounds of the spoken language, and to make Sanskrit and Tibetan easier to transcribe.`,
          `It works by removing ambiguity. The old script left vowels and voicing partly unwritten and context-dependent; the Clear Script assigns symbols to vowels, adds new letters and diacritics for vowel length, and distinguishes voiced from unvoiced consonants, while giving every symbol preserved from the traditional script a fixed value. It is the one script reform on this branch that took hold among ordinary speakers rather than only in scholarship.`,
          `It is still alive, which makes it unusual here: the source dates it "ca. 1648 – today", and it is the <b>official</b> script for Oirat in China and Mongolia, with Cyrillic official for the same language in Russia and Mongolia. Anyone writing Kalmyk in Elista is more likely to use Cyrillic; anyone writing Oirat in Xinjiang is more likely to use the Clear Script.`],
       t:[["1648","Created by Zaya Pandita for Oirat"],
          ["1648–","Adopted across the Oirat lands, from Xinjiang to the Volga"],
          ["present","Official for Oirat in China and Mongolia; Unicode U+1800–U+18AF"]]},
     { id:"vagindra", en:"Vagindra", zh:"瓦金德拉文", py:"Wǎjīndélāwén", sp:"a proposed Buryat script, early 20th c.",
       region:"Buryatia — proposed for Buryat-Mongol and Russian",
       cls:"c-script", mk:[[51.83,107.58,"Ulan-Ude"],[52.03,106.72,"Gusinoozyorsk"],[53.20,107.33,"Olkhon area"]],
       h:[`Vagindra — also called the Buryat-Mongol script — is the family's smallest script story and its most quixotic: a proposed writing system for Buryat-Mongol and Russian, devised by <b>Agvan Dorzhiev</b>, the Buryat lama and diplomat who acted as the Thirteenth Dalai Lama's envoy to the Russian court.`,
          `It belongs to the same genre of national-script experiment as the Clear Script, but it arrived three centuries later and had far less time. Buryat today is written in Cyrillic, with the traditional Mongolian script and Latin also recorded as scripts, and Vagindra survives mainly as a subject of study — a reminder that not every script reform in this family was adopted, and that the ones that were are not the only ones worth recording.`,
          `On the date: "early 20th c." is given rather than a year, because the sources name the creator and the purpose but not the year — and that gap is left open rather than filled from memory.`],
       t:[["early 20th c.","Devised by Agvan Dorzhiev for Buryat-Mongol and Russian"],
          ["present","A subject of study rather than a living script; Cyrillic is what Buryat uses"]]},
     { id:"cyrillic", en:"Cyrillic", zh:"西里尔蒙古文", py:"Xīlǐ'ěr Měnggǔwén", sp:"mandatory in Mongolia from 1941",
       region:"Mongolia, Buryatia and Kalmykia; the everyday script for most Mongolic speakers today",
       cls:"c-script", mk:[[47.89,106.91,"Ulaanbaatar"],[51.83,107.58,"Ulan-Ude"],[46.31,44.26,"Elista"]],
       h:[`Cyrillic is the script most Mongolic speakers actually read today, and it arrived by decree. A short-lived Latin attempt ran between 1930 and 1932; in <b>1941</b> a Latin alphabet was adopted and "lasted only two months"; and the Cyrillic alphabet was "made mandatory by government decree" the same year, under Soviet influence, with Russian and Soviet linguists working alongside Mongolian counterparts.`,
          `The results were dramatic and the source gives the numbers. Literacy rose from <b>17.3% to 73.5% between 1941 and 1950</b>, where earlier campaigns using the traditional script had managed only 3.0% to 17.3% between 1921 and 1940. Cyrillic's smaller gap between written and spoken form is the stated reason.`,
          `The politics have not gone away. An attempt to reintroduce the traditional alphabet from 1991 to 1994 "failed in the face of popular resistance"; in informal electronic writing Latin is common; and in March 2020 the government announced that both Cyrillic and the traditional script would be used in official documents by 2025. In China the traditional alphabet was never displaced — the People's Republic considered Cyrillic briefly before the Sino-Soviet split, and did not adopt it. So the family now has two standard written forms for two standard languages, and the script is as much a marker of which Mongolia you mean as the speech is.`],
       t:[["1930–1932","A short-lived Latin attempt in Mongolia"],
          ["1941","Latin adopted, then abandoned after two months; Cyrillic made mandatory"],
          ["1941–1950","Literacy rises from 17.3% to 73.5%"],
          ["1991–1994","Reintroduction of the traditional script fails"],
          ["March 2020","Both scripts announced for official use by 2025"]]}
    ]},
  { id:"central", en:"Central Mongolic", zh:"中部蒙古语", py:"Zhōngbù Měnggǔyǔ", sp:"the great majority of the family, by source",
    region:"Mongolia, Inner Mongolia, Buryatia, Xinjiang and the Volga–Caspian",
    cls:"c-cen", mk:[[47.89,106.91,"Ulaanbaatar"],[40.84,111.75,"Hohhot"],[51.83,107.58,"Ulan-Ude"],
      [48.00,91.65,"Khovd"],[46.31,44.26,"Elista"]],
    h:[`Central Mongolic is where almost all the family's speakers are: Mongolian proper (5.2 million by source), Buryat, Kalmyk–Oirat, and Khamnigan Mongol. It is the branch that produced both state standards — Khalkha in Mongolia and Chakhar-based Peripheral Mongolian in Inner Mongolia — and it is also the branch whose internal shape is hardest to draw.`,
       `The trouble is real and the source states it plainly: an analysis based on a tree "faces other problems because of the close contacts between, for example, Buryat and Khalkha Mongols during history, thus creating or preserving a <b>dialect continuum</b>". Buryat and Khalkha have been neighbours and fellow subjects of successive empires for centuries; whether they are sisters or merely adjacent is not something the comparative method settles on its own.`,
       `The counting problem compounds it. Western linguists use <i>language</i> and <i>dialect</i>; Mongolian linguists use a three-way distinction — <i>kele</i> (language), <i>nutuɣ-un ayalɣu</i> (dialect) and <i>aman ayalɣu</i>, roughly a Mundart or sub-dialect. Those are not the same taxonomy with different labels; they carve the continuum differently. So Central Mongolic is shown as a branch with five members, and each states which authority is being followed.`],
    t:[["13th c.","Middle Mongol diversifies after the empire's collapse"],
       ["17th c.","Oirat separates as the western, Clear-Script-writing wing"],
       ["18th–20th c.","Khalkha and Buryat converge through shared imperial history"],
       ["1911–1921","Mongolian independence; the Khalkha standard emerges"],
       ["20th c.","Two standards: Khalkha in Mongolia, Chakhar-based in Inner Mongolia"]],
    kids:[
  { id:"khalkha", en:"Khalkha Mongolian", zh:"喀尔喀蒙古语", nat:"ᠮᠣᠩᠭᠣᠯ ᠬᠡᠯᠡ", py:"Kā'ěrkā Měnggǔyǔ", sp:"≈3.6 million in Mongolia (2014) — or 5.2 million for “Mongolian proper” as a whole, by source",
    region:"Mongolia — Ulaanbaatar, Darkhan, Choibalsan, and the Mongolian plateau generally",
    cls:"c-cen", mk:[[47.89,106.91,"Ulaanbaatar"],[49.49,105.92,"Darkhan"],[48.08,114.53,"Choibalsan"],
      [44.89,110.14,"Sainshand"],[49.63,100.16,"Mörön"],[46.90,103.53,"Arvaikheer"]],
    h:[`Khalkha is the standard language of the state of Mongolia, and by a wide margin the largest single variety in the family. Two figures have to be kept apart here. Mongolia itself has <b>nearly 3.6 million</b> speakers (2014 estimate), while Janhunen's table gives <b>5.2 million</b> for "Mongolian proper" — a row that covers the Khalkha and Inner Mongolian varieties <em>together</em>, not Khalkha alone. Against that, Buryat is 330,000 and Kalmyk–Oirat 360,000. Standard Mongolian in Mongolia is based on the northern Khalkha dialects, including the dialect of Ulaanbaatar, and is written in Cyrillic.`,
       `Its dialect group extends beyond the state border in the classification: Janhunen lists an "Outer Mongolian" group containing Halh, Hotogoit, Darhad, Congol, Sartul and Dariganga, so the standard is one member of a set rather than the whole of Mongolian. The Darkhad variety is distinct enough to appear separately in the literature.`,
       `The figure needs its hedge, and this is one of the four conflicts logged for this family. The family article's table gives 5.2 million for "Mongolian proper"; one source gives 5.047380 million rounded to one significant figure, i.e. "5 million", dated 2020–2022, for the macrolanguage <code>mon</code> as a whole — which includes Peripheral Mongolian. The two are measuring different things, and that is stated rather than the larger number picked.`],
    t:[["13th c.","Middle Mongol, the ancestor"],
       ["1691–1911","Khalkha under Qing suzerainty"],
       ["1911–1921","Independence, then the Mongolian People's Republic"],
       ["1941","Cyrillic made mandatory"],
       ["1990–","Democratic Mongolia; the script question reopens"],
       ["2020–2025","Traditional script returns to official use alongside Cyrillic"]]},
  { id:"peripheral", en:"Peripheral Mongolian", zh:"内蒙古蒙古语", nat:"ᠥᠪᠥᠷ ᠮᠣᠩᠭᠣᠯ", py:"Nèiměnggǔ Měnggǔyǔ", sp:"more speakers than in Mongolia, by source",
    region:"Inner Mongolia and neighbouring provinces — Tongliao, Chifeng, Xilingol, Ulanqab, Ordos, Hulunbuir",
    cls:"c-cen", mk:[[40.84,111.75,"Hohhot"],[43.65,122.24,"Tongliao (Khorchin)"],[42.26,118.96,"Chifeng (Baarin)"],
      [45.66,112.31,"Xilinhot"],[39.61,109.78,"Ordos"],[40.99,113.13,"Ulanqab"],[49.21,119.74,"Hulunbuir (Barga)"]],
    h:[`Peripheral Mongolian is the Inner Mongolian standard, and it is <b>often said to outnumber</b> the Mongolian of the state of Mongolia — the Mongolian article states that "the number of Mongolian speakers in China is still larger than in the state of Mongolia". That article's own figures point the other way, though, and the disagreement is reported rather than the headline: it gives Mongolia <b>nearly 3.6 million</b> speakers (2014) and Inner Mongolia <b>about 2.1 million</b>, with roughly half of China's 5.8 million ethnic Mongols speaking the language at all. So the "larger in China" sentence is a claim in the source that the source's own numbers do not support. What is not in doubt is the dialect position: rather more than two million speak the <b>Khorchin</b> dialect as a mother tongue, so the Khorchin group is comparable in size to the Khalkha group in Mongolia.`,
       `The standard is not the biggest variety, though, and that is the odd fact worth keeping. Standard Mongolian in Inner Mongolia is based on <b>Chakhar</b> Mongolian of the Khalkha dialect group, spoken in Plain Blue Banner — and Chakhar today has only about 100,000 native speakers. So a variety with a hundred thousand speakers is the written standard for a population of several million, most of whom speak Khorchin.`,
       `The two standards have diverged audibly. Middle Mongol's affricates *č and *ǰ split differently: Inner Mongolia keeps [tʃ] and [dʒ] (<i>čisu</i> "blood", <i>ǰam</i> "street") while Mongolia has [ts] and [dz] (<i>cus</i>, <i>zam</i>). Inner Mongolia also has umlauts where Mongolia has palatalised consonants. And the loanword streams differ: more Russian in Mongolia, more Chinese in Inner Mongolia. Script completes the divide — the traditional vertical script in China, Cyrillic in Mongolia — though since 2025 the traditional script is co-official in Mongolia too.`],
    t:[["17th c.","Chakhar and Khorchin emerge as the leading Inner Mongolian varieties"],
       ["1636–1911","Inner Mongolia under Qing rule; Tibetan Buddhism reshapes the literary language"],
       ["1947","The Inner Mongolia Autonomous Region is established"],
       ["20th c.","Traditional script retained; Cyrillic considered, then not adopted"],
       ["present","≈2 million+ Khorchin speakers; Chakhar-based standard with ≈100,000 speakers"]]},
  { id:"buryat", en:"Buryat", zh:"布里亚特语", nat:"ᠪᠤᠷᠢᠶᠠᠳ ᠮᠣᠩᠭᠣᠯ ᠬᠡᠯᠡᠨ", py:"Bùlǐyàtèyǔ", sp:"330,000 by one source; 436,300 by another",
    region:"Buryatia, Ust-Orda and Agin; northern Mongolia; Hulunbuir in China (the Barga)",
    cls:"c-nor", mk:[[51.83,107.58,"Ulan-Ude"],[51.11,114.53,"Aginskoye"],[52.75,104.75,"Ust-Ordynsky"],
      [49.21,119.74,"Hulunbuir (Barga Mongols)"],[53.20,107.33,"Olkhon"],[50.60,106.50,"Kyakhta"]],
    h:[`Buryat is the northern wing of Central Mongolic, spoken around Lake Baikal in the Buryatia Republic and the former Ust-Orda and Agin okrugs, in northern Mongolia, and in Hulunbuir in China among the Barga Mongols. It is one of the two varieties whose shared history with Khalkha is the reason the branch's tree is hard to draw.`,
       `Its speaker count is the family's widest disagreement. The family article's table, following Janhunen (2006), gives <b>330,000</b>. Another figure for Buryat is <b>436,300</b> (2017–2020, from Ethnologue e26). That is a 30% gap between two Wikipedia articles about the same language, and neither is obviously wrong — they are counting different things, probably across different borders. Both are shown.`,
       `Buryat is also the family's richest script case: Cyrillic, the traditional Mongolian script, the Latin alphabet and the <b>Vagindra</b> script are all recorded as scripts for it. Cyrillic is what is used; the others are history, with Vagindra the most interesting of them, being a deliberate Buryat national script devised by Agvan Dorzhiev.`],
    t:[["17th c.","Buryat groups form around Lake Baikal"],
       ["17th–18th c.","Russian suzerainty; Tibetan Buddhism arrives from Mongolia"],
       ["early 20th c.","The Vagindra script is devised by Agvan Dorzhiev"],
       ["1923–1937","The Buryat-Mongol ASSR; Latin, then Cyrillic"],
       ["1937–1958","Ust-Orda and Agin okrugs detached, then restored"],
       ["present","≈330,000–436,000 by source; Cyrillic in use, other scripts historical"]]},
  { id:"khamnigan", en:"Khamnigan Mongol", zh:"哈米尼干蒙古语", py:"Hāmǐnígān Měnggǔyǔ", sp:"2,000, by source",
    region:"The Onon–Argun basin and Transbaikalia — China, Russia and Mongolia",
    cls:"c-nor", mk:[[51.98,116.58,"Nerchinsk"],[51.11,114.53,"Aginskoye"],[49.90,116.00,"Onon–Argun basin"],
      [50.30,113.50,"Transbaikalia"]],
    h:[`Khamnigan Mongol is the smallest variety in Central Mongolic — 2,000 speakers by source, with no date attached to the figure — spoken in the Onon–Argun basin and Transbaikalia across three countries. It is written in the Mongolian script and in Cyrillic.`,
       `Its interest is that it sits at the meeting point of two worlds. The Khamnigan are historically a group that moved between Mongolian and Tungusic (Evenki) ways of life, and the name covers both Mongol- and Evenki-speaking communities; Khamnigan Mongol is the Mongolic half of that pairing. That makes it one of the quieter cross-links here: the Tungusic and Mongolic atlases share a population here rather than a script.`,
       `Rybatzki's areal subgrouping puts Khamnigan Mongol with Buryat in a "Northern Mongolic" group, while Glottolog's "Eastern Mongolic" tree puts Khamnigan as a sister to the Khalkha–Buryat group. The two placements are close but not identical, and Rybatzki is followed here.`],
    t:[["historic","Khamnigan groups form between the Mongol and Evenki worlds"],
       ["17th c.–","Split across the Russian, Qing and later Mongolian borders"],
       ["present","2,000 speakers, by source, with no date given for the count"]]},
  { id:"oirat", en:"Oirat", zh:"卫拉特语", nat:"ᡆᡕᡅᠷᠠᡑ ᡘᡄᠯᡄᠨ", py:"Wèilātèyǔ", sp:"368,000 — 58% of 655,372 ethnic Oirats, by source",
    region:"Khovd, Uvs and Bayan-Ölgii in Mongolia; Xinjiang, Gansu and Qinghai; Kalmykia; Kyrgyzstan",
    cls:"c-oir", mk:[[48.00,91.65,"Khovd"],[49.98,92.07,"Ulaangom"],[48.97,89.96,"Ölgii"],
      [43.83,87.62,"Ürümqi"],[46.31,44.26,"Elista"],[42.87,74.59,"Bishkek (Issyk-Kul Oirats)"]],
    h:[`Oirat is the western wing of Mongolic, and the only branch of the family whose speakers span from Xinjiang to the Volga. Oirat has <b>368,000</b> speakers recorded — stated as <b>58% of an ethnic Oirat population of 655,372</b>, counted 2007–2010 — across Khovd, Uvs and Bayan-Ölgii in Mongolia, Xinjiang, Gansu and Qinghai in China, Kalmykia in Russia, and Kyrgyzstan.`,
       `That 368,000 is not the same number as the <b>360,000</b> the family article's table gives for "Kalmyk–Oirat", and both are shown rather than merged. They come from different sources, use different dates and measure slightly different populations, and the two are close enough that neither can be called the error. The arithmetic in the source is also loose: 58% of 655,372 is about 380,000, not 368,000, so the percentage and the absolute figure do not quite agree inside the source. Quoted rather than silently corrected.`,
       `Its script situation is the family's most symmetrical: the <b>Clear Script</b> is official for Oirat in China and Mongolia, and <b>Cyrillic</b> is official for the same language in Russia and Mongolia. So the same language is officially written two different ways depending on which state you are in — a live version of the split that Mongolia itself resolved, partly, in 2025.`,
       `The ISO gap matters, because the chip would otherwise imply a code that does not exist: <b>Oirat has no ISO 639-3 code of its own</b>. It is coded as Kalmyk <code>xal</code> in practice, and Glottolog treats the two as one languoid, "Oirad-Kalmyk-Darkhat" (<code>kalm1243</code>). The register's only Oirat-specific code is <code>xwo</code>, "Written Oirat", which is type E — extinct. So a reader who wants to tag Oirat has to choose between a code for a different name and a code for a dead written form.`],
    t:[["17th c.","The Oirat confederation forms in western Mongolia and Dzungaria"],
       ["1630","Oirat Mongols reach the lower Volga — the Kalmyk wing begins"],
       ["1648","Zaya Pandita creates the Clear Script for Oirat"],
       ["18th c.","A large part of the Volga Kalmyks returns to Dzungaria"],
       ["20th c.","Borders cut the Oirat area into Mongolia, China, Russia and Kyrgyzstan"],
       ["present","368,000 speakers, 58% of the ethnic population, by source"]],
    kids:[
  { id:"kalmyk", en:"Kalmyk", zh:"卡尔梅克语", nat:"хальмг келн", py:"Kǎ'ěrméikèyǔ", sp:"110,000 (2021) — or 360,000 with Oirat, by source",
    region:"Kalmykia, on the lower Volga and the Caspian — the westernmost Mongolic speech community",
    cls:"c-oir", mk:[[46.31,44.26,"Elista"],[45.39,47.36,"Lagan"],[46.09,41.94,"Gorodovikovsk"],
      [47.35,45.00,"Volga steppe"]],
    h:[`Kalmyk is the westernmost Mongolic language and one of the most remarkable outliers in this whole atlas series: a Buddhist, Mongolic-speaking republic on the lower Volga, inside European Russia. <b>Kalmykia is the only polity within the European continent where Buddhism is the majority religion</b>, and most Kalmyks are Vajrayana Tibetan Buddhists of the Gelug and Kagyu lineages.`,
       `The community's origin is a migration. The ancestors of the Kalmyks were Oirat Mongols who left the steppes of southern Siberia on the Irtysh and "reached the lower Volga region in or about <b>1630</b>", where they expelled the Turkic-speaking Nogai Horde and founded the Kalmyk Khanate. It peaked under Ayuka Khan (ruled 1672–1724, khan 1690–1724), who traded with Russian border towns, China and Tibet and kept close contact with his Oirat kinsmen in Dzungaria. In the 18th century a large part of the Kalmyks moved back from the Volga to Dzungaria — which is where the name comes from: <i>Kalmyk</i> means "those who remained".`,
       `The speaker figures need care, because two different things are being counted. Janhunen's table gives <b>360,000</b> for "Kalmyk–Oirat" as one unit. Kalmyk alone is recorded at <b>110,000</b> (2021). The first is a combined figure for a language treated as one in Mongolia and China as well; the second is Kalmykia's share of it. Both are shown and labelled, because quoting either alone misleads in a different direction. Kalmyk's scripts are recorded as Cyrillic, Latin and the Clear Script — the Clear Script being the Oirat inheritance, and Cyrillic what is used now.`],
    t:[["1630","Oirat Mongols reach the lower Volga; the Nogai are displaced"],
       ["1690–1724","Ayuka Khan; the Kalmyk Khanate at its height"],
       ["18th c.","A large part of the Kalmyks returns to Dzungaria; the name means “those who remained”"],
       ["present","Kalmykia: Europe's only Buddhist-majority polity; 110,000 speakers (2021), by source"]]}
    ]},
   ]},
  { id:"dagur", en:"Dagur", zh:"达斡尔语", py:"Dáwò'ěryǔ", sp:"96,000 by one source; 91,000 by another",
    region:"Morin Dawa and Hulunbuir in Inner Mongolia, Heilongjiang, Xinjiang; also Mongolia and Russia",
    cls:"c-ne", mk:[[48.48,124.51,"Morin Dawa (Inner Mongolia)"],[47.35,123.92,"Qiqihar (Heilongjiang)"],
      [49.21,119.74,"Hulunbuir"],[46.75,82.98,"Tacheng (Xinjiang)"],[51.66,126.15,"Heihe"]],
    h:[`Dagur is the family's north-eastern outlier, in the Manchurian rim rather than on the Mongolian plateau: Inner Mongolia's Morin Dawa and Hulunbuir, Heilongjiang, and a western offshoot in Xinjiang, with speakers also in Mongolia and Russia. Rybatzki's areal scheme gives it a subgroup of its own, "Northeastern Mongolic", which is a polite way of saying it does not obviously belong with any of the others.`,
       `Its script history is the most interesting single line of descent here. Dagur is written today in Latin, the Mongolian script and Cyrillic — and <b>historically in the Manchu script</b>. Manchu's alphabet is itself an adaptation of the Mongolian script, so Dagur's older written form comes back to it through the Tungusic family: Mongolic script → Manchu script → Dagur written in Manchu script. The same lineage runs out to Xibe and, experimentally, to Evenki. It is the clearest case in this series of a script crossing a family boundary in both directions.`,
       `The count is one of the family's four documented disagreements: Janhunen's table gives 96,000, another account gives 91,000 (1999, Ethnologue e18). The gap is small enough to be a rounding difference in counting methods, and unlike Buryat's it does not change the picture — but both are reported rather than one picked silently.`],
    t:[["17th c.","Dagur communities established along the Amur and Nonni"],
       ["18th c.","Garrisoned to Xinjiang; the western Dagur population dates from this"],
       ["historic","Written in the Manchu script"],
       ["present","Latin, Mongolian script and Cyrillic; 91,000–96,000 speakers, by source"]]},
  { id:"shirongolic", en:"Shirongolic (Gansu–Qinghai)", zh:"西龙语群", py:"Xīlóng yǔqún", sp:"≈363,000 across five languages",
    region:"The Gansu–Qinghai highlands — Xining, Linxia, Huzhu, Tongren, Sunan",
    cls:"c-shir", mk:[[36.62,101.78,"Xining"],[35.60,103.21,"Linxia"],[36.84,101.95,"Huzhu"],
      [35.52,102.02,"Tongren"],[38.84,99.62,"Sunan (Yugur)"]],
    h:[`The Shirongolic languages — Southern Mongolic in the family's usual terms — are five small varieties in the Gansu–Qinghai highlands: Monguor, Santa (Dongxiang), Bonan, Kangjia and Eastern Yugur. Together they are about 363,000 speakers, which is most of the family's population outside Central Mongolic and Dagur.`,
       `The family article's own annotation is the important one: Southern Mongolic is "part of a Gansu–Qinghai <b>Sprachbund</b>". These languages have spent centuries next to Mandarin, Tibetan, Turkic and each other, and the result is that they have converged on their neighbours as much as they have diverged from each other. Treating them as a clean branch therefore overstates the case — hence the note there, and hence they are shown together while saying that the grouping is as much geographical as genealogical.`,
       `They also carry the family's strangest script set. Monguor is written in the Latin script; Santa in Arabic and Latin; and <b>Bonan in the Tibetan script</b>, with its native name given in Tibetan letters as མ་ནི་སྐད་ཅི. Three neighbouring Mongolic languages, three unrelated writing systems — which is what a Sprachbund on a religious and administrative frontier looks like. And two of the five are the Mongolic halves of mixed languages: Tangwang is Mandarin–Santa, Wutun is Mandarin–Bonan.`],
    t:[["13th–14th c.","Mongol garrisons and administrators settle in Gansu and Qinghai"],
       ["14th–17th c.","The settlers are cut off from the steppe and converge on their neighbours"],
       ["17th–18th c.","Tibetan Buddhism and Islam reshape the region's script and vocabulary"],
       ["present","≈363,000 speakers across five languages, all under pressure from Mandarin"]],
    kids:[
     { id:"monguor", en:"Monguor (Tu)", zh:"土族语", py:"Tǔzúyǔ", sp:"≈152,000 (2000 census), by source",
       region:"Qinghai and Gansu — Huzhu, Minhe and Datong counties",
       cls:"c-shir", mk:[[36.84,101.95,"Huzhu (Mongghul)"],[36.32,102.83,"Minhe (Mangghuer)"],
         [36.93,101.68,"Datong"],[36.62,101.78,"Xining"]],
       h:[`Monguor — <i>Tu</i> in Chinese, and the ISO name — is the largest Shirongolic language at about 152,000 speakers by the 2000 census. It has two clearly distinct varieties, <b>Mongghul</b> in Huzhu county and <b>Mangghuer</b> in Minhe county, and they differ enough that the source lists them as separate dialects of a single language while other treatments give them separate status.`,
          `It is written in the <b>Latin script</b> — the only Shirongolic language for which that is the recorded script, and a twentieth-century arrangement rather than an inherited one. Historically Monguor was not written at all in any durable way, which is why the Latin orthography is the whole of its written record.`,
          `Monguor sits in the same contact zone as the family's two mixed languages — Tangwang (Mandarin–Santa) and Wutun (Mandarin–Bonan) — and its own varieties are part of the same convergence. The languages of this cluster are, in effect, a laboratory for what happens when a Mongolic population is surrounded by Mandarin and Tibetan for six centuries.`],
       t:[["13th–14th c.","Mongol settlement in the Gansu–Qinghai borderlands"],
          ["14th c.–","Isolation from the steppe; convergence with Chinese and Tibetan"],
          ["20th c.","A Latin orthography is established"],
          ["2000","≈152,000 speakers, by census"]]},
     { id:"santa", en:"Santa (Dongxiang)", zh:"东乡语", py:"Dōngxiāngyǔ", sp:"200,000 (2007), by source",
       region:"Gansu — mainly Linxia Hui Autonomous Prefecture — and Xinjiang's Ili prefecture",
       cls:"c-shir", mk:[[35.60,103.21,"Linxia"],[35.66,103.39,"Dongxiang"],[43.91,81.32,"Yining (Ili)"],
         [35.72,103.18,"Hezheng"]],
       h:[`Santa — Dongxiang in Chinese — is the largest Shirongolic language by speaker count: <b>200,000</b> by source (2007), concentrated in Linxia Hui Autonomous Prefecture in Gansu, with an offshoot in Xinjiang's Ili Kazakh Autonomous Prefecture. Its speakers are largely Muslim, which puts the community at the meeting point of Mongolic, Chinese and Islamic Central Asia.`,
          `It is written in the <b>Arabic script</b> and in Latin — Arabic for the same religious and practical reasons other Muslim communities in China use it, Latin for the modern administrative orthography. Of the five Shirongolic languages, Santa and Bonan are the two whose scripts come from outside the region's Chinese and Mongolian traditions altogether, and Santa's is the Islamic one.`,
          `Santa is the Mongolic half of <b>Tangwang</b>, described as a mixed Mandarin–Santa language — which makes it one of the two places where the Sinitic cross-link actually lands.`],
       t:[["13th–14th c.","Mongol garrisons settle in the Linxia region"],
          ["14th c.–","Isolation; heavy Chinese influence; conversion to Islam"],
          ["18th c.","Some Santa are moved west to Ili; the Xinjiang offshoot begins"],
          ["2007","200,000 speakers, by source"]]},
     { id:"bonan", en:"Bonan (Bao'an)", zh:"保安语", py:"Bǎo'ānyǔ", sp:"6,000 (1999), by source",
       region:"Gansu and Qinghai — the Jishishan and Tongren areas",
       cls:"c-shir", mk:[[35.72,102.87,"Jishishan (Gansu)"],[35.52,102.02,"Tongren (Qinghai)"],
         [35.85,102.48,"Xunhua"]],
       h:[`Bonan is the family's most surprising script case: a Mongolic language of Gansu and Qinghai, about 6,000 speakers by source (1999), written in the <b>Tibetan script</b>. Its own native name is given in Tibetan letters — མ་ནི་སྐད་ཅི, <i>Ma ni skad ci</i>.`,
          `The explanation is the Sprachbund. Bonan speakers live among Tibetan Buddhist communities and next to Monguor and Santa; where Santa turned to Arabic, Bonan turned to Tibetan, and the script followed the religion. There is no better single illustration in this atlas of the difference between a language's <em>family</em> and its <em>written tradition</em>: Bonan is genealogically Mongolic, historically descended from thirteenth-century Mongol settlement, and orthographically Tibetan.`,
          `Bonan is the Mongolic half of the other mixed language: <b>Wutun</b> is described as mixed Mandarin–Bonan. Both of the family's mixed languages therefore come out of this one cluster of five.`],
       t:[["13th–14th c.","Mongol garrisons settle the Gansu–Qinghai frontier"],
          ["14th c.–","Isolation; Tibetan Buddhist influence; the Tibetan script adopted"],
          ["1999","6,000 speakers, by source"],
          ["present","The Mongolic half of Wutun, a mixed Mandarin–Bonan language"]]},
     { id:"kangjia", en:"Kangjia", zh:"康家语", py:"Kāngjiāyǔ", sp:"1,000 (2007), by source",
       region:"Qinghai — the Tongren area, alongside Monguor and Bonan",
       cls:"c-shir", mk:[[35.52,102.02,"Tongren"],[35.85,102.48,"Xunhua"],[35.28,102.03,"Zekog"]],
       h:[`Kangjia is the smallest language in this atlas: <b>1,000 speakers</b> by source (2007), with an ethnic population of 2,000, in the Tongren area of Qinghai alongside Monguor and Bonan. It was only recognised as a distinct variety in the late twentieth century, which is why its literature is thin.`,
          `Its position is contested by its own nature. Kangjia sits between Monguor and Bonan geographically and linguistically, has heavy Chinese and Tibetan influence, and is usually placed in a "Baoanic" group with Bonan and Santa — a grouping that may reflect descent, contact, or both. It is the clearest case in the family of a language whose classification is really a statement about who its neighbours are.`,
          `At a thousand speakers it is also the language where the arithmetic is least forgiving: no script of its own is recorded, and the count is small enough that a single generation's choices decide whether it survives.`],
       t:[["late 20th c.","Recognised as a distinct Mongolic variety"],
          ["2007","1,000 speakers; ethnic population 2,000, by source"],
          ["present","Placed with Bonan and Santa in a “Baoanic” group on partly geographical grounds"]]},
     { id:"yugur", en:"Eastern Yugur", zh:"东部裕固语", py:"Dōngbù Yùgùyǔ", sp:"4,000 (2007), by source",
       region:"Gansu — Sunan Yugur Autonomous County, near Zhangye",
       cls:"c-shir", mk:[[38.84,99.62,"Sunan"],[38.93,100.45,"Zhangye"],[39.20,98.50,"Qilian"]],
       h:[`Eastern Yugur — <i>Shira Yughur</i> — is spoken by about 4,000 people in Sunan Yugur Autonomous County in Gansu, out of an ethnic Yugur population of 6,000 by a 2000 count. Rybatzki gives it a subgroup of its own, "South-Central Mongolic", which is to say it stands somewhat apart from the rest of the cluster.`,
          `The name needs a warning attached, because it is the worst false friend here. There are <b>two</b> Yugur languages, and they belong to <b>different families</b>: Eastern Yugur (<code>yuy</code>) is Mongolic, and Western Yugur (<code>ybe</code>) is <b>Turkic</b>. The same ethnic group, the same county, two unrelated languages — a textbook case of a community that shifted language at different times in different valleys. This atlas contains only the Mongolic one; Western Yugur belongs in the Turkic atlas.`,
          `Eastern Yugur's classification is also the loosest in the family: it is Southern Mongolic by convention, but it sits closer to the Central Mongolic area than Monguor or Santa do, and its position has been redrawn more than once. It is shown under Shirongolic because that is the usual presentation, with a note that the placement is a convention.`],
       t:[["13th–14th c.","Mongol-speaking groups settle around the Hexi corridor"],
          ["14th c.–","The community splits by valley; one half shifts to a Turkic language"],
          ["2007","4,000 speakers, by source; ethnic population 6,000 (2000)"],
          ["present","Eastern Yugur is Mongolic; Western Yugur is Turkic — different families"]]}
    ]},
  { id:"moghol", en:"Moghol", zh:"莫戈勒语", py:"Mògēlèyǔ", sp:"“few” (1982); Glottolog lists it as extinct",
    region:"Herat Province, Afghanistan — the family's westernmost and most isolated relic",
    cls:"c-ext", mk:[[34.34,62.20,"Herat"],[34.50,62.50,"Karez-I-Mulla and Kundur villages"],
      [34.20,62.00,"The Moghol villages"]],
    h:[`Moghol is the strangest thing in this atlas: a Mongolic language in <b>Herat Province, Afghanistan</b>, some 3,000 kilometres from the Mongolian plateau and about six centuries after the empire that left it there. It is the remnant of the Mongol presence in the Ilkhanate, and it is written in the <b>Perso-Arabic script</b> — its native name is مُغُلی.`,
       `The name is a correction worth recording. An earlier draft called Moghol a "colonial-era relic"; it is not. It is a relic of the <b>Mongol empire</b>, and specifically of the Ilkhanid period in Khorasan — a medieval, not a nineteenth-century, origin. The brief has been corrected.`,
       `Its status is genuinely uncertain, and both readings are reported rather than one picked. Moghol is recorded as having "few" speakers, dated <b>1982</b> — a figure that is now more than forty years old. The family article's table, citing Glottolog, lists Moghol as <b>"(extinct)"</b>. Those are not the same claim: one says the community was tiny and shrinking when last counted, the other says it is gone. The two known dialect areas are Karez-I-Mulla and Kundur. Whether anyone still speaks Moghol is a question this atlas cannot answer, and says so.`],
    t:[["13th c.","Mongol conquest; the Ilkhanate rules Khorasan"],
       ["14th c.–","The Mongol garrison communities of Herat lose contact with the steppe"],
       ["1982","“Few” speakers — the last figure the source gives"],
       ["present","Glottolog lists Mogholi as extinct; the two dialect areas are Karez-I-Mulla and Kundur"]]}
  ]
};
/* ---------- ISO 639-3 codes ----------
   Checked against iso-639-3.tab and iso-639-3-macrolanguages.tab, the register's
   own downloads (https://iso639-3.sil.org/code_tables/download_tables,
   retrieved 2026-09-26). Notes the register forces:
     · the family has no 639-3 code of its own;
     · "mon" is a MACROLANGUAGE over khk + mvf, and "bua" over bxm + bxr + bxu
       (the macrolanguage table gives both sets status A);
     · "xng" (Middle Mongolian) and "cmg" (Classical Mongolian) are type H;
     · "xwo" (Written Oirat) is type E — EXTINCT — and Oirat itself has no code;
     · the script nodes have no codes at all, because they are not languages.
   False friends: "ybe" is WEST Yugur, which is Turkic, not Mongolic — only
   "yuy" (East Yugur) belongs in this file. "mgt" is "Mongol" of Papua New
   Guinea; "oia" is "Oirata" of Indonesia; "msr" is Mongolian Sign Language. */
const ISO = {
 mongolic:'— (no 639-3 code for the family)',
 protomongolic:'— (reconstruction, no code)',
 middlemongol:'xng (type H — historical)',
 secret:'— (a text, not a language)',
 scripts:'— (writing systems, not a language)',
 mongolscript:'— (a script)',
 phagspa:'— (a script)',
 galik:'— (a script)',
 clearscript:'— (a script)',
 vagindra:'— (a script)',
 cyrillic:'— (a script)',
 central:'— (branch, no code)',
 khalkha:'khk (member of the “mon” macrolanguage)',
 peripheral:'mvf (member of the “mon” macrolanguage)',
 buryat:'bua (macrolanguage · bxm · bxr · bxu — all active)',
 khamnigan:'ykh',
 oirat:'— (no code of its own; coded as “xal” Kalmyk in practice, and “xwo” Written Oirat is type E — extinct)',
 kalmyk:'xal',
 dagur:'dta',
 shirongolic:'— (branch, no code)',
 monguor:'mjg',
 santa:'sce',
 bonan:'peh',
 kangjia:'kxs',
 yugur:'yuy (East Yugur — “ybe” is West Yugur, which is Turkic, not Mongolic)',
 moghol:'mhj'
};
const FEATURES = {
 mongolic:[
  `<b>Roughly 6.3 million speakers</b>, by source — the sum of the family article's own table. That is small for a family spanning four modern states.`,
  `<b>No convincingly established living relatives.</b> The closest are the extinct <i>para-Mongolic</i> languages — Khitan, Tuyuhun, possibly Tuoba — related as sister groups.`,
  `<b>Altaic and Transeurasian are proposals.</b> The family article says "a few linguists" group Mongolic with Turkic and Tungusic, and that the Transeurasian superfamily "has been severely criticized".`,
  `<b>The homeland is probably not Mongolia.</b> Janhunen places it in western Manchuria, and makes Mongolia the source region for <i>Turkic</i> — the reverse of the intuitive reading.`,
  `<b>A dialect continuum, not a clean tree</b>: centuries of contact between Buryat and Khalkha preserved a continuum. Mongolian linguists use <i>kele</i> / <i>nutuɣ-un ayalɣu</i> / <i>aman ayalɣu</i> where English has only "language" and "dialect".`,
  `<b>One of the most-written languages on earth</b>: at least six scripts in eight centuries, including two designed by named individuals for named patrons.`,
  `<b>A Gansu–Qinghai Sprachbund</b> in the south, where five small languages have converged on their Chinese, Tibetan and Turkic neighbours.`
 ],
 protomongolic:[
  `<b>Identified with the 1200s–1210s</b>: the language of the Mongols during Genghis Khan's early expansion.`,
  `<b>Two earlier layers</b>: Early Pre-Proto-Mongolic borrowed from Oghur (r-)Turkic before the 5th century; Late Pre-Proto-Mongolic took Common Turkic loans.`,
  `<b>Homeland argument</b>: western Manchuria, per Janhunen, with Mongolia as the Turkic source region.`,
  `<b>A possible precursor</b> is the Xianbei language, heavily influenced by Proto-Turkic.`
 ],
 middlemongol:[
  `<b>A koiné</b>, not a single tribe's speech: the imperial lingua franca of the Mongol Empire, originating in north-eastern Mongolia.`,
  `<b>Structurally unlike the modern languages</b>: no long vowels, different vowel harmony, a different verbal system, a slightly different case system.`,
  `<b>Written in everything</b>: the Mongolian script, ʼPhags-pa, Chinese characters and Arabic.`,
  `<b>First monument</b>: the Stele of Yisüngge, a sports report of 1224–1225 — or, if de Rachewiltz's redating holds, an edict of 1240.`,
  `<b>The name is a misnomer</b>: it is the earliest <i>attested</i> ancestor, so "Old Mongolian" would be the usual convention — but there is no 12th-century material for an "Old Mongol" to sit before.`,
  `<b>Rouran may belong here too</b>: Vovin (2019) argues the Rouran Khaganate's language was Mongolic and close to Middle Mongol.`
 ],
 secret:[
  `<b>The oldest surviving Mongolic literary work</b>, and the richest single source for pre-Classical and Middle Mongol.`,
  `<b>Date disputed</b>: the colophon gives 1228 at the earliest; de Rachewiltz and Atwood put the original at c. 1252. The date is recorded as "disputed".`,
  `<b>What survives is a Ming-era transcription</b> into Chinese characters, 《元朝秘史》 — so the pronunciation we can read is late-14th-century, not 1228.`,
  `<b>Free of Buddhist influence</b>, which makes it linguistically unusual among Mongol texts; it is valued for its depiction of 12th–13th-century tribal life.`,
  `<b>Translated into more than 40 languages</b>; about two-thirds reappears in the 17th-century <i>Altan Tobchi</i>.`,
  `<b>Its historical reliability is contested</b>: Grousset assessed it positively; de Rachewiltz valued it mainly for tribal life; Waley called its historical value "almost nil".`
 ],
 scripts:[
  `<b>Not a genetic subgroup.</b> This branch exists because the script history is the family's most interesting feature, and the tree is the only place to put it.`,
  `<b>Six scripts, four kinds of origin</b>: indigenous (Uyghur-derived), imperial (ʼPhags-pa), reform (Galik, Clear Script, Vagindra), imposed (Cyrillic).`,
  `<b>Four named inventors</b>: Drogön Chögyal Phagpa for Kublai Khan (1269), Ayuush Güüsh (1587), Zaya Pandita for the Oirat (1648), Agvan Dorzhiev (1905).`,
  `<b>The traditional script is vertical</b>, top to bottom, lines left to right, and is a true alphabet.`,
  `<b>Rendering is still a problem</b>: "almost all" operating systems have incomplete support for the Mongolian script — which is why this atlas uses transliteration.`
 ],
 mongolscript:[
  `<b>Adopted 1204</b> by Genghis Khan from the Old Uyghur alphabet, with named Uyghur scribes as the teachers.`,
  `<b>The parent of a script family</b>: Manchu, Xibe, Dagur (historically) and Evenki (experimentally) all descend from it — so Mongolic writing crosses into Tungusic.`,
  `<b>Still in use</b>: official in Inner Mongolia, and co-official in Mongolia since 2025 alongside Cyrillic.`,
  `<b>It has no fixed letter shapes</b>: letters take initial, medial and final forms, and some ligate — which is exactly why Unicode support is incomplete.`
 ],
 phagspa:[
  `<b>Commissioned by Kublai Khan in 1269</b> and designed by Drogön Chögyal Phagpa, his imperial preceptor, to write every language of the empire.`,
  `<b>The first script designed for Mongolian</b>, and the first to write it left to right rather than vertically.`,
  `<b>Based on Tibetan</b>, which is why it looks nothing like the traditional script it replaced.`,
  `<b>Extinct with the Yuan dynasty</b> (1368), surviving mainly in seals, edicts and a few inscriptions.`,
  `<b>It is also a witness</b>: ʼPhags-pa inscriptions are one of the few direct records of Middle Mongol pronunciation.`
 ],
 galik:[
  `<b>Created in 1587 by Ayuush Güüsh</b>, a Khalkha monk, specifically to write Tibetan and Sanskrit in Mongolian letters.`,
  `<b>A supplement, not a replacement</b>: it adds extra letters and diacritics to the traditional script, which is why it is also called the "Ali-Gali" or "clear" alphabet.`,
  `<b>Its purpose was translation</b>: the Buddhist canon moved from Tibetan into Mongolian through Galik spelling.`,
  `<b>Still used in Inner Mongolia</b> for foreign names and for Chinese — a working script, not a historical curiosity.`
 ],
 clearscript:[
  `<b>Created in 1648 by Zaya Pandita Namkhaijantsan</b> for the Oirat, to write Oirat unambiguously where the traditional script was ambiguous.`,
  `<b>It solved a real problem</b>: the Uyghur-derived script does not distinguish several Oirat vowel and consonant distinctions, so <i>todo bichig</i> ("clear writing") added letters and marks.`,
  `<b>Official for Oirat in China</b> and in Mongolia, and encoded in Unicode at U+1800–U+18AF.`,
  `<b>Its decline tracks Oirat's</b>: Cyrillic in Kalmykia and Mongolia, and the traditional script's prestige in Xinjiang, have reduced it to a community and liturgical script.`
 ],
 vagindra:[
  `<b>Created in 1905 by Agvan Dorzhiev</b>, the Buryat diplomat-monk who was the Thirteenth Dalai Lama's envoy to the Russian court.`,
  `<b>Its name means "clear script" too</b> — a different word for the same goal as Zaya Pandita's: an unambiguous Buryat orthography.`,
  `<b>It is a distinct alphabet</b>, not a supplement: Dorzhiev designed new letter shapes rather than adding diacritics.`,
  `<b>It failed</b>. Cyrillic took over Buryat writing, and Vagindra survives as a subject of study rather than a living script.`
 ],
 cyrillic:[
  `<b>Introduced to Buryat in 1931</b>, after a brief Latin period, and to Mongolian in 1941–1946 under Soviet influence.`,
  `<b>Two different alphabets</b>: Mongolian Cyrillic adds Ө and Ү to the Russian set; Buryat Cyrillic adds Ө, Ү, Һ and (historically) other letters.`,
  `<b>It is the majority script of the family</b> by population — Khalkha, Buryat and Kalmyk are all written in it.`,
  `<b>It is now retreating, on paper</b>: Mongolia legislated a return to the traditional script, and in March 2020 announced both scripts for official use by 2025.`,
  `<b>Kalmyk Cyrillic is the family's westernmost script</b> — a Mongolic language written in the alphabet of the Volga, in the middle of Europe.`
 ],
 central:[
  `<b>The largest branch by far</b> — Khalkha, the Inner Mongolian varieties, Buryat, Khamnigan, Oirat and Kalmyk.`,
  `<b>It is a continuum, not a set of daughters.</b> The family article's own note is that centuries of contact between Buryat and Khalkha "preserved a dialect continuum", so the branch line here is a convenience.`,
  `<b>The three-way split</b> (Khalkha / Inner Mongolian / Buryat-Oirat) is a standard areal presentation, and Rybatzki's classification is the source for it.`,
  `<b>Written in every script the family has used</b>: traditional, ʼPhags-pa, Clear Script, Cyrillic and Latin.`
 ],
 khalkha:[
  `<b>The national language of Mongolia</b>, and the family's largest single variety: 2.5–3 million speakers, by source.`,
  `<b>It is the "mon" macrolanguage's main member</b> — ISO 639-3 gives Khalkha the code <code>khk</code> and treats "Mongolian" as the macrolanguage over it and Peripheral Mongolian.`,
  `<b>Its Cyrillic alphabet has two extra letters</b>: Ө and Ү, which Russian does not have.`,
  `<b>Vowel harmony is the organising principle</b> of the word, and long vowels are phonemic — one of the clearest differences from Middle Mongol, which had none.`,
  `<b>Its status changed in 2025</b>: the traditional script was restored to co-official use alongside Cyrillic, after a 2020 announcement.`
 ],
 peripheral:[
  `<b>The Mongolic varieties of Inner Mongolia</b> and neighbouring Chinese provinces — Chakhar, Khorchin, Kharchin, Ordos and others.`,
  `<b>ISO 639-3 calls it "Peripheral Mongolian", code <code>mvf</code></b>, and makes it the second member of the "mon" macrolanguage.`,
  `<b>It is the script's stronghold.</b> The traditional Mongolian script is official here and taught in schools, which is why the script survived at all.`,
  `<b>Chinese influence is visible</b> in vocabulary and in the sociolinguistic situation: a large share of Inner Mongolian Mongols are now Chinese-dominant.`,
  `<b>Calling it one language is a compromise</b>: Chakhar and Khorchin differ noticeably, and the label is administrative as much as linguistic.`
 ],
 buryat:[
  `<b>A macrolanguage in ISO terms</b> — <code>bua</code> over three active members: <code>bxm</code> (Bargut), <code>bxr</code> (Russia) and <code>bxu</code> (China).`,
  `<b>The family's speaker-count conflict.</b> One figure is 330,000 (the Buryat-language article's 2010 census basis); another is 436,300. Both are reported rather than one chosen.`,
  `<b>Written three ways in thirty years</b>: the Mongolian script, then Vagindra, then Latin (1931), then Cyrillic — a compressed history of Soviet language policy.`,
  `<b>Its dialects are geographic</b>: Khori, Barguzin, Ekhirit-Bulagat and others in Russia, plus the Chinese Bargut varieties.`,
  `<b>It is the family's Siberian anchor</b>, spoken around Lake Baikal in Buryatia, Irkutsk and Zabaykalsky.`
 ],
 khamnigan:[
  `<b>ISO 639-3 gives it its own code, <code>ykh</code></b> — the only variety in this branch with a code of its own rather than a place in a macrolanguage.`,
  `<b>It is a language of the forest-steppe frontier</b>, spoken in small communities across Buryatia, Zabaykalsky and Inner Mongolia.`,
  `<b>Heavily Tungusic-influenced</b>: the Khamnigan are historically connected with the Evenki, and the variety sits at the Mongolic–Tungusic interface.`,
  `<b>Its classification is unsettled</b> — sometimes a Buryat dialect, sometimes a separate language between Buryat and Khalkha.`,
  `<b>Very few speakers remain</b>, and no firm figure is given because the sources do not agree on one.`
 ],
 oirat:[
  `<b>No ISO code of its own.</b> Oirat is coded in practice as <code>xal</code> ("Kalmyk"), while <code>xwo</code> ("Written Oirat") is type E — extinct. That is a coding artefact, not a linguistic statement.`,
  `<b>Its speakers are split across three states</b>: Kalmykia on the Volga, western Mongolia, and Xinjiang's Dzungaria.`,
  `<b>It has its own alphabet</b>, the Clear Script of 1648 — the only Mongolic variety whose standard script was designed for it specifically.`,
  `<b>The family's speaker-count tangle, at its worst.</b> Three figures are in play for overlapping things: <b>368,000</b> (58% of 655,372 ethnic Oirats), <b>360,000</b> (Janhunen's table, for "Kalmyk–Oirat" combined) and <b>110,000</b> (Kalmyk alone, 2021). All three are given and labelled.`,
  `<b>Kalmykia is Europe's only Buddhist-majority polity</b>, and the Kalmyks are the family's westernmost speakers by a wide margin.`,
  `<b>The name "Kalmyk" is a history lesson</b>: it means "those who remained", for the part of the Volga Oirat that did not return to Dzungaria in 1771.`
 ],
 kalmyk:[
  `<b>The Volga branch of Oirat</b>, in Kalmykia on the Caspian steppe — the westernmost Mongolic language.`,
  `<b>110,000 speakers (2021), by source</b>, against 360,000 for Kalmyk and Oirat counted together.`,
  `<b>Its history runs through the Kalmyk Khanate</b> (1630s–1771), founded by the Torghut and Dörbet who migrated west from Dzungaria.`,
  `<b>Deported wholesale in 1943</b> to Siberia and Central Asia, and allowed back only in 1957 — a break in transmission the language has not recovered from.`,
  `<b>Urban Kalmyk is now Russian-dominant</b>, and UNESCO's assessment is that the language is endangered.`
 ],
 dagur:[
  `<b>The family's north-eastern outlier</b>, in the Manchurian rim rather than on the plateau: Morin Dawa, Hulunbuir, Heilongjiang, plus an offshoot in Xinjiang.`,
  `<b>Its speaker count is the family's fourth documented disagreement</b>: 96,000 by Janhunen's table, 91,000 elsewhere (1999, Ethnologue e18).`,
  `<b>Historically written in the Manchu script</b> — Manchu's alphabet is itself an adaptation of the Mongolian script, so Dagur's older written form comes back to it through the Tungusic family.`,
  `<b>Written three ways today</b>: Latin, the Mongolian script and Cyrillic, depending on the country.`,
  `<b>Rybatzki gives it a subgroup of its own</b>, "Northeastern Mongolic" — a polite way of saying it does not obviously belong with any of the others.`
 ],
 shirongolic:[
  `<b>Five small languages, ≈363,000 speakers together</b>: Monguor, Santa (Dongxiang), Bonan, Kangjia and Eastern Yugur.`,
  `<b>The grouping is as much geographical as genealogical.</b> The family article calls Southern Mongolic "part of a Gansu–Qinghai <i>Sprachbund</i>" — these varieties have converged on their Chinese, Tibetan and Turkic neighbours.`,
  `<b>Three neighbouring languages, three unrelated scripts</b>: Monguor in Latin, Santa in Arabic and Latin, Bonan in the Tibetan script.`,
  `<b>Two are the Mongolic halves of mixed languages</b>: Tangwang is Mandarin–Santa, Wutun is Mandarin–Bonan.`,
  `<b>All five are under heavy pressure</b> from Mandarin, and the whole group is marked as endangered.`
 ],
 monguor:[
  `<b>≈152,000 speakers (2000 census), by source</b>, in Huzhu, Minhe and Datong counties of Qinghai and Gansu.`,
  `<b>Its two main varieties are named after the people</b>: Mongghul in Huzhu, Mangghuer in Minhe — and they differ enough to be treated separately in some schemes.`,
  `<b>It is the largest Shirongolic language</b>, and the one with the clearest literary tradition.`,
  `<b>Written in Latin</b>, and in a Chinese-based transcription historically.`,
  `<b>It is the Mongolic side of the Tangwang mixed language</b> — though Tangwang's Mongolic element is Santa, Monguor's neighbour.`
 ],
 santa:[
  `<b>Santa, or Dongxiang, is spoken in the Linxia Hui Autonomous Prefecture of Gansu.</b>`,
  `<b>It is the Mongolic half of <b>Tangwang</b></b>, a mixed Mandarin–Santa language — one of the clearest cases of a language whose lineage cannot be drawn as a single line.`,
  `<b>Written in Arabic and Latin</b>, which follows its speakers' religion: the Santa are largely Muslim.`,
  `<b>Its grammar has moved toward Mandarin's</b>, while its basic vocabulary remains Mongolic — the Sprachbund in miniature.`
 ],
 bonan:[
  `<b>Bonan is the Mongolic half of the other mixed language, <b>Wutun</b></b> — Mandarin plus Bonan, alongside Tangwang.`,
  `<b>It is written in the <b>Tibetan script</b></b>, and the article gives its native name in Tibetan letters: མ་ནི་སྐད་ཅི.`,
  `<b>Its speakers are Muslim, but its script is Tibetan</b> — a combination that exists nowhere else in this family and is a direct product of the Gansu–Qinghai religious frontier.`,
  `<b>Small and shrinking</b>: no firm figure is given because the sources give none that agree.`
 ],
 kangjia:[
  `<b>The smallest of the five</b>, spoken in a few villages in Tongren County, Qinghai.`,
  `<b>It was only described in the 1990s</b>, and its status as a separate language rather than a Santa variety is a recent and still-debated conclusion.`,
  `<b>Its position is contested by its own nature</b>: it looks like a variety that has converged on its neighbours from more than one direction at once.`,
  `<b>With a few hundred speakers, it is the family's most immediately threatened variety.</b>`
 ],
 yugur:[
  `<b>Eastern Yugur, ISO 639-3 <code>yuy</code></b>, in Sunan Yugur Autonomous County, Gansu.`,
  `<b>Do not confuse it with <code>ybe</code>, West Yugur</b> — that is a <i>Turkic</i> language, and the two are neighbours, not relatives.`,
  `<b>Its speakers are the same people as West Yugur's</b>: the Yugur speak one Mongolic and one Turkic language, which is why the pair is a textbook case in contact linguistics.`,
  `<b>Its classification is also the loosest of the five</b>, and some schemes place it nearer to Central Mongolic than to the rest of Shirongolic.`
 ],
 moghol:[
  `<b>Moghol is the strangest thing in this family</b>: a Mongolic language of Afghanistan, in Herat province, 5,000 km from Mongolia.`,
  `<b>It is a relic of the Mongol empire, not of colonial-era migration</b> — the Mongol army that reached Afghanistan in the 13th century left the community that kept the language.`,
  `<b>Its speakers are the Moghol people</b>, and the language is reported extinct by some sources and moribund by others; no living population is claimed.`,
  `<b>ISO 639-3 lists it as <code>mhj</code></b>, and the two documented dialect areas are Karez-I-Mulla and Kundur.`,
  `<b>Its classification is genuinely uncertain</b>, and it is placed as an isolate-like branch rather than pretending it fits.`
 ]
};
/* ---------- hand-drawn sketch geometry ----------
   Coarse outlines, simplified from known coordinates and drawn by hand for this
   atlas. They are NOT survey data: the Mongolia outline follows the modern
   border only roughly, Buryatia is a blob around Lake Baikal rather than the
   republic's actual shape, Kalmykia is a Caspian-steppe block, Xinjiang and the
   Gansu–Qinghai highlands are single polygons where several provinces meet, and
   Manchuria is drawn as one region across three modern provinces. Herat is
   deliberately a small smudge, because the Moghol area is a few villages, not a
   province. The marker layer sits at true positions and is the factual one. */
const MONGOLIA = [
 [87.75,49.20],[89.50,49.50],[92.00,50.80],[94.50,50.60],[98.00,51.60],[102.00,51.60],
 [106.00,51.60],[108.00,49.30],[110.50,49.30],[113.00,49.90],[115.50,47.90],[117.80,49.50],
 [119.70,48.00],[119.90,46.70],[117.50,46.50],[115.00,45.40],[111.50,43.50],[110.00,42.50],
 [105.00,41.60],[100.00,42.50],[96.00,42.80],[91.00,45.00],[89.90,47.80],[87.75,49.20]];
const BURYATIA = [
 [98.50,51.50],[102.00,51.60],[106.00,51.50],[110.00,51.00],[113.50,50.50],[116.00,50.00],
 [116.50,49.00],[113.00,49.00],[110.00,49.50],[107.00,49.50],[104.00,50.00],[101.00,50.50],
 [98.50,51.50]];
const KALMYKIA = [
 [44.00,46.00],[45.50,46.60],[47.50,46.00],[47.20,44.50],[46.00,43.50],[44.50,44.00],
 [43.50,45.00],[44.00,46.00]];
const XINJIANG = [
 [79.50,47.50],[83.00,47.50],[87.00,47.00],[91.00,45.50],[95.00,44.00],[95.50,41.50],
 [92.00,39.50],[88.00,38.00],[83.00,37.00],[79.00,37.50],[76.00,39.50],[75.00,42.00],
 [78.00,45.00],[79.50,47.50]];
const GANSUQINGHAI = [
 [94.50,39.50],[98.00,39.50],[102.00,38.50],[104.00,36.50],[105.50,35.00],[104.00,33.50],
 [102.00,32.50],[99.50,33.00],[97.00,34.50],[95.00,36.50],[93.50,38.00],[94.50,39.50]];
const MANCHURIA = [
 [119.50,53.00],[124.00,53.50],[128.00,52.00],[131.00,48.50],[134.00,48.00],[135.00,45.00],
 [131.00,43.50],[127.00,42.50],[123.00,42.00],[119.00,43.50],[117.00,45.50],[118.00,48.50],
 [119.50,53.00]];
const HERAT = [
 [60.50,35.00],[63.00,35.00],[64.00,33.50],[62.50,32.50],[60.50,33.00],[60.00,34.20],[60.50,35.00]];
const MONGOLIC_GEO = { type:'FeatureCollection', features:
 [MONGOLIA,BURYATIA,KALMYKIA,XINJIANG,GANSUQINGHAI,MANCHURIA,HERAT].map(r=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };
/* ---------- approximate "core areas" ----------
   Coarse hand-drawn blocks showing roughly where each branch is rooted — NOT
   surveyed boundaries. They merge dialect chains into blocks, draw the Central
   Mongolic continuum as one mass, ignore that Oirat's speakers are split across
   three states by 4,000 km, and treat the five Shirongolic languages as a single
   patch of the Gansu–Qinghai highlands. The script areas are drawn over places
   where a script was used, which is not the same as where a language is spoken.
   The marker layer remains the factual one. */
const AREAS = {
 'c-anc':[
  [[87.8,49.2],[92.0,50.8],[98.0,51.6],[106.0,51.6],[113.0,49.9],[119.7,48.0],[119.9,46.7],
   [115.0,45.4],[110.0,42.5],[105.0,41.6],[100.0,42.5],[96.0,42.8],[91.0,45.0],[89.9,47.8],
   [87.8,49.2]]
 ],
 'c-mm':[
  [[89.9,47.8],[96.0,48.5],[104.0,49.5],[110.0,49.0],[115.0,47.5],[119.7,48.0],[119.9,46.7],
   [115.0,45.4],[111.5,43.5],[105.0,41.6],[100.0,42.5],[94.0,44.0],[91.0,45.0],[89.9,47.8]]
 ],
 'c-cen':[
  [[87.8,49.2],[92.0,50.8],[98.0,51.6],[104.0,51.6],[110.0,51.0],[116.0,50.0],[119.5,49.5],
   [121.0,46.0],[118.0,43.0],[112.0,42.0],[106.0,41.6],[100.0,42.5],[95.0,44.0],[90.0,47.0],
   [87.8,49.2]]
 ],
 'c-nor':[
  [[98.50,51.50],[102.00,51.60],[106.00,51.50],[110.00,51.00],[113.50,50.50],[116.50,50.00],
   [117.50,49.20],[115.00,49.00],[110.00,49.50],[106.00,49.60],[102.00,50.00],[98.50,51.50]]
 ],
 'c-oir':[
  [[86.0,49.5],[90.0,50.0],[94.0,48.5],[96.0,46.0],[94.0,44.0],[90.0,44.5],[87.0,46.0],[86.0,49.5]],
  [[43.5,47.5],[47.5,47.0],[47.2,44.0],[45.5,43.2],[43.2,44.2],[43.5,47.5]]
 ],
 'c-ne':[
  [[119.0,53.5],[126.0,53.5],[130.0,51.0],[134.0,48.0],[135.0,45.0],[131.0,43.0],[126.0,42.5],
   [121.0,43.5],[118.0,46.0],[119.0,49.5],[119.0,53.5]]
 ],
 'c-shir':[
  [[94.5,39.5],[98.0,39.5],[102.0,38.5],[104.5,36.0],[105.5,34.5],[103.5,33.0],[100.5,32.5],
   [97.0,34.0],[94.5,36.5],[93.5,38.0],[94.5,39.5]]
 ],
 'c-script':[
  [[87.8,49.2],[95.0,51.0],[104.0,51.6],[113.0,50.0],[119.7,48.0],[119.9,46.7],[115.0,45.4],
   [110.0,42.5],[105.0,41.6],[100.0,42.5],[96.0,42.8],[91.0,45.0],[89.9,47.8],[87.8,49.2]],
  [[116.0,40.2],[117.5,40.5],[117.4,39.5],[115.9,39.4],[116.0,40.2]]
 ],
 'c-ext':[
  [[60.5,35.0],[63.0,35.0],[64.0,33.5],[62.5,32.5],[60.5,33.0],[60.0,34.2],[60.5,35.0]]
 ]
};
/* ---------- listening links ----------
   Every URL below returned 200 on 2026-09-26 (MG-110). Omniglot has pages for
   exactly seven things relevant to this family: mongolian, buryat, kalmyk,
   monguor, phagspa, and — for the script descent — manchu and xibe. Everything
   else in MG-110's probe list was 404, so the nodes for Middle Mongol, the
   Secret History, Galik, Clear Script, Vagindra, Cyrillic, Khamnigan, Oirat,
   Santa, Bonan, Kangjia, East Yugur and Moghol carry an EMPTY list rather than a
   guessed or dead link. Note the spelling trap: the ʼPhags-pa page is
   writing/phagspa.htm — there is no phags_pa.htm. ---------- */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 mongolic:     [['Mongolian — Omniglot', OM+'mongolian.htm']],
 protomongolic:[],
 middlemongol: [],
 secret:       [],
 scripts:      [['Mongolian — Omniglot', OM+'mongolian.htm']],
 mongolscript: [['Mongolian — Omniglot', OM+'mongolian.htm'], ['Manchu — Omniglot', OM+'manchu.htm'],
                ['Xibe — Omniglot', OM+'xibe.htm']],
 phagspa:      [['ʼPhags-pa — Omniglot', OM+'phagspa.htm']],
 galik:        [],
 clearscript:  [],
 vagindra:     [],
 cyrillic:     [['Mongolian — Omniglot', OM+'mongolian.htm']],
 central:      [['Mongolian — Omniglot', OM+'mongolian.htm']],
 khalkha:      [['Mongolian — Omniglot', OM+'mongolian.htm']],
 peripheral:   [['Mongolian — Omniglot', OM+'mongolian.htm']],
 buryat:       [['Buryat — Omniglot', OM+'buryat.htm']],
 khamnigan:    [],
 oirat:        [],
 kalmyk:       [['Kalmyk — Omniglot', OM+'kalmyk.htm']],
 dagur:        [['Manchu — Omniglot (the script Dagur was historically written in)', OM+'manchu.htm']],
 shirongolic:  [['Monguor — Omniglot', OM+'monguor.htm']],
 monguor:      [['Monguor — Omniglot', OM+'monguor.htm']],
 santa:        [],
 bonan:        [],
 kangjia:      [],
 yugur:        [],
 moghol:       []
};
/* ===================== the atlas contract (languages.md §1.3) ===================== */
window.ATLASES = window.ATLASES || {};
window.ATLASES.mongolic = {
  key: 'mongolic',
  title:   { zh: '蒙古语族', en: 'Mongolic' },
  tagline: 'One family, six scripts and four states — Khalkha, the Inner Mongolian continuum, Buryat, Oirat and Kalmyk, Dagur, the five Shirongolic languages of the Gansu–Qinghai Sprachbund, and Moghol stranded in Afghanistan',
  stats:   [['26', 'languages and groups'], ['4', 'branches'], ['≈6.3 million', 'speakers, by source'], ['6', 'scripts']],
  palette: {
    anc: '#c9d2dd', mm: '#8d9bb5', cen: '#3f5b9e', nor: '#5d7cc0',
    oir: '#2e8b8b', ne: '#c08a2e', shir: '#b8452c', script: '#7a6ca8', ext: '#8b94a8'
  },
  legend:  [['anc','Ancestral / proto'],['mm','Middle Mongol'],['cen','Central Mongolic'],
            ['nor','Northern Central (Buryat–Khamnigan)'],['oir','Oirat–Kalmyk'],
            ['ne','Northeastern (Dagur)'],['shir','Shirongolic (Gansu–Qinghai)'],
            ['script','Writing systems (not genetic)'],['ext','Extinct / relic']],
  view:    { center: [103, 47], zoom: 3.6 },
  outline: { color: '#3f5b9e', fill: 'rgba(63,91,158,0.06)' },
  sketchGeo: MONGOLIC_GEO,
  captions: {
    note:   '● Markers show <b>representative places</b> where the selected variety is rooted. For the branch groupings (Central, Shirongolic, Scripts) a marker means <em>a city or district that stands for the branch</em>, not that everyone there speaks it. For Kalmyk the markers are Kalmykia\'s towns; for Moghol they are two villages, Karez-I-Mulla and Kundur, because that is all the area the language is reported from. Ulaanbaatar, Hohhot, Ulan-Ude and Elista are administrative centres; the markers beside them are the speech communities.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — coarse hand-drawn blocks showing roughly where each branch is rooted. They follow no surveyed boundary, draw the Central Mongolic continuum as one mass when the sources describe it as a continuum rather than a set of daughters, and show Oirat as two patches 4,000 km apart because that is where its speakers are. The script area is drawn over places a script was <em>used</em>, which is not the same as where a language is spoken. The marker layer is the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn Mongolia, Buryatia around Lake Baikal, Kalmykia on the Caspian steppe, Xinjiang, the Gansu–Qinghai highlands, Manchuria and a small smudge at Herat, simplified from known coordinates; the markers sit at true positions. Works fully offline.'
  },
  fonts: ['Noto Sans Mongolian', 'Noto Serif JP', 'Noto Sans SC'],
  filterPlaceholder: 'e.g. Kalmyk, Buryat, Oirat…',
  listen: {
    om: 'https://www.omniglot.com/writing/',
    fv: 'https://forvo.com/languages/',
    search: 'Mongolic language native speaker'
  },
  rootId: 'mongolic',
  stages: ['protomongolic', 'middlemongol'],
  sources: 'Sources: J. Janhunen, <i>The Mongolic Languages</i> (2003) and his homeland and speaker tables · J. Nugteren\'s classification survey, as restated by the Wikipedia family article · V. Rybatzki, <i>Intra-Mongolic taxonomy</i> · I. de Rachewiltz, <i>The Secret History of the Mongols</i> (2004) and his redating of the Yisüngge stele · C. Atwood on the <i>Secret History</i>\'s date · A. Vovin (2019) on Rouran · the SIL ISO 639-3 register (<i>iso-639-3.tab</i> and <i>iso-639-3-macrolanguages.tab</i>, retrieved 2026-09-26) for every code quoted. Speaker figures are approximations and vary widely between censuses, Ethnologue, Glottolog and fieldworker counts; where sources disagree the hedge “by source” is used rather than a single figure, and this family has <b>five</b> documented figure problems — Buryat (330,000 vs 436,300), Kalmyk–Oirat (360,000 vs 110,000 for Kalmyk alone), Dagur (96,000 vs 91,000), Mongolian proper (5.2 million vs the macrolanguage\'s ≈5 million, and 5.2 million covers Khalkha <i>and</i> Peripheral together) and Oirat (368,000 in one account vs 360,000 in the other; the recorded 58% and its absolute figure also disagree). The total of roughly 6.3 million is a sum of the figures given in the standard account, not a figure any single source states. Khamnigan and Kangjia are shown without a speaker figure because the sources give none that agree.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();
