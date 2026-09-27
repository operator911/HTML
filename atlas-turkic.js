/* atlas-turkic.js — Turkic 突厥语族
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (see languages.md §1.3 for the contract,
 * §2.9 for this family's brief, and research.md §"Turkic (Phase 7)" for the
 * evidence log — every load-bearing date and figure below is logged there as
 * TK-101 … TK-110).
 *
 * SCOPE: built to the brief's option (b), the FULL family — [60, 42], zoom 2.6
 * — Istanbul to Yakutsk, on instruction. It is the widest atlas in the series
 * and deliberately a Eurasia map rather than an East Asia one. The sketch
 * geometry is correspondingly coarse; see captions.sketch.
 *
 * Four things this atlas is careful about:
 *  1. Old Turkic is NOT drawn as the trunk of Common Turkic. The sources put
 *     it inside Siberian Turkic, and the Oghuz article argues the Orkhon/Old
 *     Uyghur material is rather ancestral to Karluk and Kipchak. It sits beside
 *     the modern branches because it is ancestral to none of them all.
 *  2. Chuvash's relatives are partly a guess. Bulgar is the only other language
 *     definitively classed as Oghuric; Khazar's own infobox says "classification
 *     disputed" and its entire corpus is two nouns, a verb and some names.
 *  3. The family's centre of gravity is not where its eastern half is: Turkish
 *     alone is about 38% of all Turkic speakers.
 *  4. Almost every autonym below is a real script form read off an infobox, not
 *     a romanisation — which is why this atlas registers a Cyrillic and an
 *     Arabic face alongside the CJK fallback.
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree =====================
   Two branches at the root, as the family's own literature has it: Oghuric
   (one living member) and Common Turkic (all the rest). Everything below
   Common Turkic follows Johanson's five-way split — Oghuz, Kipchak, Karluk,
   Siberian and Arghu — which is the arrangement the sources actually use. */
const DATA = {
 id:"turkic", en:"Turkic", zh:"突厥语族", py:"Tūjué yǔzú", sp:"≈200 million, 2020",
 region:"Eurasia — from the Balkans and Anatolia across Central Asia and Siberia to north-western China, and out to Yakutsk in the north-east",
 cls:"c-anc",
 mk:[[41.01,28.98,"Istanbul — the western edge"],[39.93,32.86,"Ankara"],[43.24,76.89,"Almaty"],[41.30,69.24,"Tashkent"],[39.47,75.98,"Kashgar — Uyghur"],[38.49,106.23,"Yinchuan — Western Yugur and Salar country"],[62.03,129.73,"Yakutsk — the eastern edge"]],
 h:[`Turkic is one of the world's largest language families and, by extent, the widest in this series: <b>more than 35 documented languages</b>, spoken from the Balkans to north-eastern Siberia, by about <b>200 million people</b>. It is a <b>dialect continuum</b> in the technical sense — neighbouring varieties shade into each other, and the boundaries drawn on this map are conventions of politics and literacy as much as of speech. Four features run through nearly all of it: <b>vowel harmony</b>, <b>agglutination</b>, <b>subject–object–verb</b> order, and <b>no grammatical gender</b>.`,
   `The family's shape is deceptively simple at the top. There are <b>two branches</b>, and they are not equals. <b>Oghuric</b> — also called Bulgar or Lir-Turkic — split off first and has exactly <b>one living member</b>, Chuvash. <b>Common Turkic</b> — Shaz-Turkic — is everything else, and its five subgroups (Oghuz, Kipchak, Karluk, Siberian, Arghu) are the working classification used in the standard handbook. The two branches are told apart by a sound correspondence rather than by geography: where Common Turkic has <b><i>z</i></b>, Oghuric has <b><i>r</i></b>; where Common Turkic has <b><i>š</i></b>, Oghuric has <b><i>l</i></b>. That one fact is why a language spoken on the Volga belongs with a steppe empire rather than with its neighbours.`,
   `Where the family began is disputed in detail and agreed in outline: <b>Proto-Turkic</b> is placed in East Asia, "spanning from Mongolia to Northwest China", and the expansion westwards ran through the first millennium. What is <em>not</em> agreed is what came next. The Orkhon inscriptions and the Old Uyghur manuscripts are often treated as the ancestor of Turkic in general, but the sources say they are "rather the ancestor of Central Asiatic Turkic languages (including Karluk and Kipchak)", while the Oghuz languages "apparently originate from the language of the people known as 'Western Türküt'". So there is no single trunk, and this atlas does not draw one.`,
   `The modern distribution is lopsided in a way worth stating: <b>Turkish alone accounts for about 38% of all Turkic speakers</b>, followed by Uzbek. The family's demographic centre is Anatolia and Central Asia; its linguistic diversity — the branches that preserve the old distinctions most fully — is in Siberia, on the Volga, and in a handful of villages in Iran.`],
 t:[["c. 3000–500 BC","Proto-Turkic, on the reconstruction's own broad dating"],[". 5th–8th c. CE","Orkhon runiform steles; the Second Turkic Khaganate"],[". 8th–13th c.","Old Uyghur; the Uyghur Khaganate and its manuscripts"],[". 9th c.","Bulgar extinct on the Danube, in favour of Old Church Slavonic"],[". 13th c.","Khazar fades out; the Mongol conquests end the Old Turkic period"],[". 14th c.","Volga Bulgar replaced by what becomes Chuvash"],[". 1928–1940","The Soviet Latin-then-Cyrillic script switches"],[". 1991–","Post-Soviet script politics: Latin in Azerbaijan, disputed in Tatarstan and Crimea"]],
 kids:[
  { id:"prototurkic", en:"Proto-Turkic", nat:"*Türkçe", zh:"原始突厥语", py:"Yuánshǐ Tūjuéyǔ", sp:"reconstructed",
    region:"Reconstructed — placed in East Asia, from Mongolia to north-western China",
    cls:"c-his",
    mk:[[47.89,106.91,"Ulaanbaatar — within the proposed homeland"],[43.65,87.14,"Ürümqi — the other end of it"]],
    h:[`Proto-Turkic is a <b>reconstruction</b>, not a record: no text in it survives, and its dating runs across an enormous window — one of the sources cited for this atlas gives <b>c. 3000–500 BC</b>, another treats the split of Oghuric from Common Turkic as happening in the <b>2nd millennium BC</b>. The atlas repeats the range rather than choosing an end of it.`,
       `What makes the reconstruction unusually firm for a language this old is <b>Chuvash</b>. Because Oghuric branched off first and kept <b><i>r</i></b> where Common Turkic kept <b><i>z</i></b>, the two branches together constrain the proto-language from both sides — the same reason Indo-Europeanists prize Tocharian. The name in the script slot is a modern Turkish reflex marked with an asterisk; it is <b>not an attested Proto-Turkic form</b>, and nothing from this language is written down anywhere.`],
    t:[["c. 3000–500 BC","The broad window given for Proto-Turkic in the sources"],
       ["2nd millennium BC","One dating for the Oghur / Common Turkic split"],
       ["1st millennium CE","The Turkic expansion out of East Asia"]],
    kids:[] },

  { id:"oghuric", en:"Oghuric (Bulgar, Lir-Turkic)", zh:"乌古尔语支", py:"Wūgǔ'ěr yǔzhī", sp:"1 living language",
    region:"Historically the Balkans, the Caucasus and northern China; today only the Volga region",
    cls:"c-ogh",
    mk:[[55.79,49.11,"Kazan — the Volga core"],[43.21,27.91,"Pliska — Danubian Bulgaria"],[47.19,39.72,"Rostov-on-Don — Khazar country"]],
    h:[`Oghuric is the <b>first branch to leave</b> the Turkic family, and it is defined by subtraction: it lacks the changes that Common Turkic shares. The correspondence is <b><i>r</i></b> against <b><i>z</i></b> and <b><i>l</i></b> against <b><i>š</i></b>, which is why the branch is also called <b>Lir-Turkic</b> or <b>r-Turkic</b>, and Common Turkic <b>Shaz-Turkic</b>.`,
       `The branch has exactly one living member — <b>Chuvash</b> — and that is the whole story of its modern distribution. Of the extinct members, only <b>Bulgar</b> is "definitively classified" as Oghuric; the source is explicit that "the inclusion of other languages such as <b>Hunnish, Khazar and Sabir</b> within Oghur Turkic remains speculative owing to the paucity of historical records". This atlas therefore draws <b>three</b> nodes here and marks two of them doubtful, rather than filling the branch out into a plausible-looking tree.`,
       `There is no scholarly consensus even on the branch's relationship to Common Turkic — whether the two are parallel daughters of Proto-Turkic, and if so which is more archaic, or whether Oghuric simply records an earlier stage. The node keeps the question open.`],
    t:[["c. 2nd millennium BC","One proposed date for the Oghur / Common Turkic split"],
       ["5th–7th c. CE","Onogur, Bulgar and Khazar confederations on the steppe"],
       ["mid-7th c.","Old Great Bulgaria; by the 680s the First Bulgarian Empire"],
       ["9th c.","Bulgar extinct on the Danube"],
       ["14th c.","Volga Bulgar gives way to what becomes Chuvash"]],
    kids:[
     { id:"chuvash", en:"Chuvash", nat:"Чӑваш чӗлхи", zh:"楚瓦什语", py:"Chǔwǎshí yǔ", sp:"738,150, 2020 census",
       region:"The Chuvash Republic and adjacent areas of the Volga–Ural region, Russia",
       cls:"c-ogh",
       mk:[[56.15,47.25,"Cheboksary (Chuvashia)"],[55.79,49.11,"Kazan"],[54.74,55.97,"Ufa — diaspora"],[53.20,50.15,"Samara"]],
       h:[`Chuvash is the <b>only surviving member of the Oghuric branch</b> — "one of the two principal branches of the Turkic family", in the source's words — and it is a genuine outlier: a Turkic language whose closest relatives have been dead for six hundred years, spoken on the Volga rather than on the steppe.`,
          `It is also the family's clearest case of language shift, and the numbers are stark: the <b>2020 census</b> records about <b>1.05 million ethnic Chuvash</b> and <b>738,150 speakers</b>. The atlas states both because the gap is the point. Chuvash is classed <b>Vulnerable</b> by UNESCO.`,
          `Linguistically it preserves the Oghuric signature — <b><i>r</i></b> for Common Turkic <b><i>z</i></b>, <b><i>l</i></b> for <b><i>š</i></b> — and it has its own literary history: an eighteenth-century missionary orthography, then a Soviet Latin alphabet, then the <b>Cyrillic</b> in use today. Its autonym, <i>Чӑваш чӗлхи</i>, uses the Cyrillic <b>ӑ</b> and <b>ӗ</b>, letters that exist for Chuvash and a few of its neighbours and for nothing else in Russian.`],
       t:[["15th–16th c.","The Bulgar population on the Volga becomes Chuvash-speaking"],
          [". 1871–1872","Ivan Yakovlev's missionary alphabet and school system"],
          ["1938","The Cyrillic alphabet settles into its present form"],
          ["2020","738,150 speakers against 1.05 million ethnic Chuvash"]],
       kids:[] },

     { id:"bulgar", en:"Bulgar (Bolgar)", zh:"保加尔语", py:"Bǎojiā'ěr yǔ",
       region:"From Central Asia to the Pontic–Caspian steppe, the Volga and the Danube — and, in fragments, southern Italy",
       cls:"c-ogx",
       mk:[[43.21,27.91,"Pliska — Danubian Bulgaria"],[54.99,49.11,"Bolgar — Volga Bulgaria"],[41.56,14.66,"Molise — the Italian fragments"]],
       chips:[["extinct — 9th c. on the Danube, 14th c. on the Volga"]],
       h:[`Bulgar is the <b>one extinct language that can be confidently placed in Oghuric</b> — "other than Chuvash, Bulgar is the only language to be definitively classified as an Oghur Turkic language". Its speakers were the Bulgars, whose tribal confederation produced Old Great Bulgaria in the mid-seventh century and, within a generation, the First Bulgarian Empire.`,
          `Its two ends died differently. On the <b>Danube</b> the language went extinct by the <b>ninth century</b>, displaced in writing and then in speech by <b>Old Church Slavonic</b> — which is why a Slavic language carries the Bulgars' name today. On the <b>Volga</b> it survived far longer, in Volga Bulgaria, until it was <b>replaced by the modern Chuvash language</b> by the fourteenth century. That replacement is the single most important fact about Chuvash: it did not descend from a mystery, it descended from Bulgar.`,
          `What survives is fragmentary and mostly in Arabic script — the Volga Bulgar epitaphs, a handful of words compared directly with Chuvash cognates, and case and verb endings reconstructed from them. The script slot on this node is <b>empty</b>, because Bulgar has no attested autonym in a readable script: there is only the reconstructed <i>Bolgar</i>.`],
       t:[["mid-7th c.","Old Great Bulgaria on the Pontic–Caspian steppe"],
          ["680s","The First Bulgarian Empire is founded on the Danube"],
          [". 9th c.","Bulgar extinct on the Danube, in favour of Old Church Slavonic"],
          [". 10th–13th c.","Volga Bulgar flourishes, with Arabic-script epitaphs"],
          [". 14th c.","Volga Bulgar replaced by what becomes Chuvash"]],
       kids:[] },

     { id:"khazar", en:"Khazar (Khazaric)", zh:"可萨语", py:"Kěsà yǔ",
       region:"The Khazar Khanate — the lower Volga, the north Caucasus and the steppe between the Dnieper and the Ural",
       cls:"c-ogx",
       mk:[[47.19,39.72,"Rostov-on-Don"],[46.35,48.04,"Astrakhan — the Khazar capital region"],[50.45,30.52,"Kyiv — the Kievan Letter"]],
       chips:[["extinct by the 13th c. — the source's own dating carries a citation-needed tag"]],
       h:[`Khazar is the honest case in this atlas. Its infobox does not assign it a branch — the family field literally reads <b>"(classification disputed)"</b> — and Glottolog gives it <b>no code at all</b>. "There are few written records of the language and its features and characteristics are unknown."`,
          `<b>The entire corpus is: two nouns, a conjugated verb, and a few proper names.</b> The most famous item is the word-phrase <i>OKHQURÜM</i>, "I read (this or it)", written in Orkhon script on the <b>Kievan Letter</b>, a tenth-century document from Kyiv. On the strength of that, the <b>1986 Guinness Book of Records</b> — following the <i>Great Soviet Encyclopedia</i> — recorded Khazar as having the "smallest literature" of any language. The atlas repeats the claim and its source rather than dressing it up.`,
          `Everything else is testimony <em>about</em> Khazar, not in it. <b>Al-Istakhri</b>, writing in the tenth century, left two notices that contradict each other: Khazar is unlike Turkic and Persian alike — and the language of the <b>Bulgars</b> "is like the language of the Khazars". <b>Al-Muqaddasi</b> called it "very incomprehensible". The Khazar state was multilingual and multicultural, and the sources do not establish that "Khazar" names one language rather than several. The node therefore ships as <b>doubtful</b>: it is drawn in the Oghuric group because several scholars place it there, and its chip says so.`],
       t:[["7th–10th c.","The Khazar Khanate; Oghuric as its lingua franca"],
          ["c. 930","The Kievan Letter — the single most cited Khazar text"],
          [". 10th c.","Al-Istakhri's contradictory notices; al-Muqaddasi's verdict"],
          [". 13th c.","Extinction, as speakers assimilate into neighbouring Turkic populations"]],
       kids:[] }
    ] },

  { id:"common", en:"Common Turkic (Shaz-Turkic)", zh:"共同突厥语支", py:"Gòngtóng Tūjuéyǔzhī", sp:"≈200 million, 2020",
    region:"Southern and eastern Europe, western Asia, Central Asia, North Asia and East Asia — the whole Turkic extent except the Volga",
    cls:"c-com",
    mk:[[41.01,28.98,"Istanbul"],[39.47,75.98,"Kashgar"],[43.24,76.89,"Almaty"],[62.03,129.73,"Yakutsk"],[34.09,49.70,"Arak — Khalaj country"]],
    h:[`Common Turkic is <b>everything except Oghuric</b>, and the source is careful to call it "a <b>proposed</b> genetic unit in some classifications" rather than a settled one. It covers roughly 200 million speakers across five subgroups, and the classification used here is Johanson's, which is also the one Wikipedia's branch articles follow: <b>Oghuz</b> (south-western), <b>Kipchak</b> (north-western), <b>Karluk</b> (south-eastern), <b>Siberian</b> (north-eastern) and <b>Arghu</b>.`,
       `The name in the header — <b>Shaz-Turkic</b> — is not decoration: it records the sound correspondence that separates this branch from Oghuric. Common Turkic has <b><i>z</i></b> and <b><i>š</i></b> where Oghuric has <b><i>r</i></b> and <b><i>l</i></b>. Because that split is phonological rather than geographic, it produces the family's most counter-intuitive result: <b>Chuvash on the Volga is not a Kipchak language</b>, however much it looks like one on a map.`,
       `Other classifications exist and are not wrong — Samoylovich's and Baskakov's differ from Johanson's, and Glottolog splits Siberian Turkic into a "Central" and a "North" branch. The atlas uses one arrangement consistently rather than blending them, and says which.`],
    t:[["c. 2nd millennium BC","The Oghur / Common Turkic split, on one dating"],
       ["5th–13th c.","Old Turkic — the earliest attested Common Turkic"],
       ["11th c.","Mahmud al-Kashgari's <i>Dīwān Lughāt al-Turk</i>, the first Turkic comparative work"],
       ["13th–20th c.","Chagatai as the shared literary language of Central Asia"],
       ["1928–1940","Soviet script reforms; Latin, then Cyrillic"]],
    kids:[
     { id:"oldturkic", en:"Old Turkic (East Old Turkic)", zh:"古突厥语", py:"Gǔ Tūjuéyǔ",
       region:"East Asia, Central Asia and parts of eastern Europe — the Second Turkic Khaganate and then the Uyghur Khaganate",
       cls:"c-his",
       mk:[[47.55,103.05,"Orkhon valley — the Kül Tigin stele"],[47.89,106.91,"Ulaanbaatar region"],[42.83,87.61,"Turfan — Old Uyghur manuscripts"],[47.30,102.60,"Karakorum region"],[43.00,89.20,"Bezeklik"]],
       chips:[["attested 5th–13th centuries"],["two scripts: runiform and Old Uyghur"]],
       h:[`Old Turkic is the <b>earliest attested Common Turkic language</b>, and its two halves are different enterprises. The earlier is <b>Orkhon Turkic</b>, written in the runiform script on the great steles of the <b>Second Turkic Khaganate</b> — Kül Tigin, Bilge Qaghan, Tonyukuk. The later is <b>Old Uyghur</b>, written in the Old Uyghur alphabet, and it is the one that left books rather than monuments.`,
          `<b>This atlas does not draw Old Turkic as the trunk of the family.</b> The source files it <em>inside</em> Siberian Turkic, and the Oghuz article says outright that the Orkhon and Old Uyghur material is "rather the ancestor of Central Asiatic Turkic languages (including Karluk and Kipchak)", while Oghuz comes from the speech of the "Western Türküt". It is ancestral to a great deal — but not to all of Common Turkic, and not to Turkish by a straight line. It sits here beside the modern branches for that reason.`,
          `The dating is worth getting right, because it is usually compressed: the era runs from <b>slightly before 720 AD</b> — the steles' date — to the <b>Mongol invasions of the 13th century</b>. Old Uyghur is cross-listed in this series with the <b>Silk Road</b> atlas, where its Manichaean and Buddhist texts are treated at length; this node covers the language's place in the family, not its library.`],
       t:[["c. 720 AD","The Orkhon steles — the earliest dated Old Turkic"],
          [". 8th–9th c.","The Uyghur Khaganate; Old Uyghur manuscripts"],
          ["9th c.","The <i>Irk Bitig</i>, a Book of Divination in Old Uyghur"],
          [". 11th c.","Karakhanid — classified either with East Old Turkic or with Middle Turkic"],
          [". 13th c.","The Mongol conquests close the period"]],
       kids:[] },

     { id:"oghuz", en:"Oghuz (South-Western Turkic)", zh:"乌古斯语支", py:"Wūgǔsī yǔzhī", sp:"≈108 million",
       region:"Turkey and the Balkans, Azerbaijan and Iran, Turkmenistan, and outliers in Moldova, Iraq and north-western China",
       cls:"c-ogz",
       mk:[[41.01,28.98,"Istanbul"],[40.41,49.87,"Baku"],[37.95,58.38,"Ashgabat"],[46.30,28.65,"Gagauzia"],[35.74,51.42,"Tehran — South Azerbaijani"],[36.62,101.78,"Xining — Salar"]],
       h:[`Oghuz is the branch that holds most of the family: about <b>108 million</b> speakers, with <b>Turkish, Azerbaijani and Turkmen together accounting for more than 95%</b> of them. Johanson's description is quoted in the source — Oghuz forms "a clearly discernible and closely related bloc" — and the reason is historical rather than structural: the Oghuz tribes' political history kept their speech varieties in contact from the Seljuk period onwards.`,
          `<b>Where Oghuz comes from is disputed, and the atlas says so.</b> The source's own words: "the ancestor of Oghuz languages is a matter of debate." The Orkhon inscriptions and the Old Uyghur manuscripts are "rather the ancestor of Central Asiatic Turkic languages (including Karluk and Kipchak)", while Oghuz "apparently originate from the language of the people known as 'Western Türküt' in Chinese annals". This is why the Old Turkic node is not drawn above this one.`,
          `The branch's defining features are listed in the source and repeated here: voicing of stops (<i>gök</i>, <i>dağ</i>); loss of <b>q/ɣ</b> after <b>ɯ/u</b>; and the participial shifting from <b>-gan</b> to <b>-an</b>. It is split three ways — Western (Turkish, Azerbaijani, Gagauz), Eastern (Turkmen) and Central. <b>Crimean Tatar</b>, though Kipchak, is "highly mutually intelligible" with Western Oghuz because of centuries of Turkish influence, and that contact is noted on its own node.`],
       t:[["11th c.","The Seljuk expansion brings Oghuz speech into Anatolia and Iran"],
          [". 13th c.","Old Anatolian Turkish emerges as a written language"],
          [". 14th–20th c.","Ottoman Turkish, the branch's imperial literary form"],
          ["1928","Turkey's Latin alphabet replaces the Arabic script"],
          ["1991–","Azerbaijan, Turkmenistan and Uzbekistan adopt Latin alphabets"]],
       kids:[
        { id:"turkish", en:"Turkish", nat:"Türkçe", zh:"土耳其语", py:"Tǔ'ěrqí yǔ", sp:"91.3 million, 2006–2021",
          region:"Turkey, Cyprus and the Balkans, with diaspora communities across western Europe and beyond",
          cls:"c-ogz",
          mk:[[41.01,28.98,"Istanbul"],[39.93,32.86,"Ankara"],[38.42,27.14,"İzmir"],[35.19,33.36,"Nicosia — Cyprus"],[41.01,21.34,"Bitola — Rumelia"],[36.19,44.01,"Erbil — Iraqi Turkmen"]],
          h:[`Turkish is the family's largest single language by a wide margin — <b>85.2 million first-language speakers</b>, <b>6.1 million second-language</b>, a total of about <b>91.3 million</b> — and roughly <b>38% of all Turkic speakers</b>. It is also the branch's only language with a continuous written tradition running from Old Anatolian Turkish through Ottoman Turkish to the present day.`,
             `Its <b>script history is a case study in twentieth-century language politics</b>: Arabic script for centuries, then the <b>Latin alphabet of 1928</b>, adopted in a single year as part of the Turkish Republic's reforms. The letters <b>ı</b> and <b>i</b> — dotless and dotted — carry the vowel-harmony distinction that the older script had handled differently, and <b>ğ</b> marks a velar that has been lost between vowels.`,
             `Standard Turkish is <b>Istanbul Turkish</b>. Beyond it the infobox lists <b>Cypriot Turkish</b>, <b>Iraqi Turkmen</b>, <b>Rumelian Turkish</b> in the Balkans, <b>Meskhetian Turkish</b>, and <b>Syrian Turkish</b> — plus the extinct <b>Karamanli</b>, which was Turkish written in Greek characters by Karamanlides Christians, and is the atlas's reminder that a language's script is not a property of the language.`],
          t:[["c. 13th c.","Old Anatolian Turkish, the earliest ancestor named in the sources"],
             [". 15th–19th c.","Ottoman Turkish, written in Arabic script"],
             ["1928","The Latin alphabet; the language reform follows"],
             ["1932–","Türk Dil Kurumu and the deliberate replacement of Arabic loans"],
             ["2006–2021","91.3 million speakers in total, first and second language"]],
          kids:[] },

         { id:"azerbaijani", en:"Azerbaijani (Azeri)", nat:"Azərbaycan dili", zh:"阿塞拜疆语", py:"Āsāibàijiāng yǔ", sp:"23.8 million, 2022",
           region:"Azerbaijan and Iranian Azerbaijan; also Russia, Turkey, Georgia and Iraq",
           cls:"c-ogz",
           mk:[[40.41,49.87,"Baku"],[38.07,46.30,"Tabriz — South Azerbaijani"],[40.68,46.36,"Ganja"],[41.69,44.80,"Tbilisi — Azerbaijani minority"],[37.77,48.91,"Ardabil"]],
           h:[`Azerbaijani is the second-largest Turkic language and the family's clearest case of <b>one language written three ways by three states</b>: <b>Latin in Azerbaijan</b>, <b>Perso-Arabic in Iran</b>, and <b>Cyrillic in Russia</b>. The infobox shows all three, which is why this node's script slot carries the Latin form and its prose has to carry the rest.`,
              `The two written standards are named in the source: <b>Shirvani</b> for the northern variety, in the Republic of Azerbaijan, and <b>Tabrizi</b> for the southern variety in Iranian Azerbaijan. ISO splits them too, as <b>azj</b> (North) and <b>azb</b> (South), under the macrolanguage code <b>aze</b>. The northern standard descends from Old Anatolian Turkish by way of <b>Ajem-Turkic</b>, and it is close enough to Istanbul Turkish that the two are largely mutually intelligible in writing — though not identical, and the differences are real.`,
              `Azerbaijani's script history is the family's most-rewritten: Arabic script, then a Latin alphabet in the early Soviet period, then Cyrillic from 1939, then back to Latin after 1991 — with the southern half of the language, in Iran, never leaving Perso-Arabic at all. <b>Half of Azerbaijani's speakers are outside the country the language is named for</b>, and the atlas states that rather than implying a national language with a diaspora.`],
           t:[["11th–12th c.","Oghuz settlement of the Caucasus and Iranian Azerbaijan"],
              [". 15th–16th c.","Ajem-Turkic, the written ancestor named in the infobox"],
              ["1920s–1939","Arabic script → Latin → Cyrillic, in the Soviet republic"],
              ["1991–1992","The Latin alphabet returns as the state script of Azerbaijan"],
              ["2022","23.8 million speakers across both standards"]],
           kids:[] },

         { id:"turkmen", en:"Turkmen", nat:"türkmençe", zh:"土库曼语", py:"Tǔkùmàn yǔ", sp:"7.8 million, 2021–2023",
           region:"Turkmenistan, north-eastern Iran, Afghanistan and Uzbekistan",
           cls:"c-ogz",
           mk:[[37.95,58.38,"Ashgabat"],[42.32,59.16,"Nukus region — Trukhmen"],[38.09,57.93,"Iranian borderlands"],[34.53,69.17,"Kabul — Afghan Turkmen"]],
           h:[`Turkmen is the <b>Eastern Oghuz</b> language, and it is the branch's bridge between Anatolia and Central Asia: close enough to Turkish to be recognisable, far enough that the two are not mutually intelligible in speech. Its <b>6.8 million first-language and 1.0 million second-language speakers</b> make it the third-largest Oghuz language by a clear margin below Turkish and Azerbaijani.`,
              `Its script situation mirrors the family's as a whole: <b>Latin</b> is official in Turkmenistan, while <b>Perso-Arabic</b> is used by the roughly 359,000 speakers in north-eastern Iran and <b>Cyrillic</b> survives in Russia. The infobox gives the autonym in all three, which is why this node's script slot shows <i>türkmençe</i> — the Latin form — and the prose carries the rest.`,
              `Ten dialects are named: Teke, Nohurly, Ýomud, Änewli, Hasarly, Gökleň, Saryk, Ärsary, Çowdur and the <b>Trukhmen</b> of Stavropol, the last of which is geographically the odd one out — a Turkmen variety living far to the north-west, in the Caucasus, where it has been since the seventeenth century.`],
           t:[["10th–11th c.","Oghuz tribes move east towards the Amu Darya"],
              [". 15th c.","The Turkmen ethnonym settles"],
              ["1928–1940","Latin, then Cyrillic, in Soviet Turkmenistan"],
              ["1993","A new Latin alphabet replaces Cyrillic"],
              ["2021–2023","7.8 million speakers in total"]],
           kids:[] },

         { id:"gagauz", en:"Gagauz", nat:"gagauz dili", zh:"加告兹语", py:"Jiāgàozī yǔ", sp:"148,720, 2014",
           region:"Gagauzia in southern Moldova, plus Ukraine, Russia and Turkey",
           cls:"c-ogz",
           mk:[[46.30,28.65,"Comrat — Gagauzia"],[45.76,28.19,"Vulcănești"],[46.48,30.73,"Odesa — Ukraine"],[41.01,28.98,"Istanbul — Turkish Gagauz"]],
           h:[`Gagauz is an <b>Oghuz language in eastern Europe</b>, and its position is the interesting part: it is a Turkish relative, spoken by an Orthodox Christian community in Moldova, whose ancestors came north from the Balkans during the Russo-Turkish wars. The infobox names its ancestors as <b>Old Anatolian Turkish</b> and then <b>Ottoman Turkish</b> — the same line as Turkish itself.`,
              `It is <b>Definitely Endangered</b> on the UNESCO atlas, and it is a textbook case of state policy driving language shift. It became a written language only in <b>1957</b>, with schools following in <b>1959</b>; a 2015 study quoted in the source found that <b>80.6% of respondents preferred Russian as the medium of instruction</b>. The <i>Ana Sözü</i> newspaper and its editor Todur Zanet are named in the source as the centre of standardisation and maintenance work.`,
              `Its script history is a compressed version of the family's: <b>Greek</b> and <b>Cyrillic</b> historically, then a Latin alphabet in the present day. The <b>2023 New York Times</b> headline quoted in the source — "Our Language Is Dying" — is the situation in one line, and it is attributed rather than adopted.`],
           t:[["18th–19th c.","Gagauz ancestors move north from the Balkans into Bessarabia"],
              ["1957","Gagauz becomes a written language"],
              ["1959","First use in schools"],
              ["1994","Gagauzia becomes an autonomous region of Moldova"],
              ["2014","148,720 speakers in total; 115,000 of them in Moldova"]],
           kids:[] },

         { id:"salar", en:"Salar", nat:"Salarcha 撒拉语", zh:"撒拉语", py:"Sālā yǔ", sp:"70,000, 2002",
           region:"Xunhua and Jishishan in the Qinghai–Gansu borderland, with a group in Ili, Xinjiang",
           cls:"c-ogz",
           mk:[[35.85,102.50,"Xunhua Salar Autonomous County"],[35.72,102.80,"Jiezi — the Gaizi dialect"],[35.50,102.95,"Mengda"],[43.92,81.32,"Ili — Ili Salar"],[36.04,103.83,"Lanzhou region"]],
           h:[`Salar is the <b>eastern outlier of Oghuz</b> — the source calls it "a primary branch and an eastern outlier" — which is to say that a language whose relatives are in Turkey, Azerbaijan and Turkmenistan is spoken on the upper Yellow River in Qinghai. Its speakers trace themselves to the <b>Salur tribe</b> of the Oghuz Turks, who were inside China's borders by the Tang dynasty and have been in the Qinghai–Gansu region since.`,
              `It is <b>Vulnerable</b> on the UNESCO atlas, with about <b>70,000 speakers (2002)</b> out of roughly 105,000 ethnic Salar, and fewer than 20,000 monolinguals. The atlas gives the ethnic figure alongside the speaker figure because the gap is the story — as with Chuvash and Khakas.`,
              `Salar's script situation is the family's most unusual: it is written in a <b>Pinyin-based Latin</b> and, by some speakers, in <b>Chinese characters</b>. There is no traditional Salar script. The node's script slot shows both the Latin autonym <i>Salarcha</i> and the Chinese-character form, because for this language the characters are a real alternative rather than an exonym. Three dialects are named: Ili Salar, Gaizi (Jiezi) and Mengda.`],
           t:[["Tang dynasty","The Salur tribe is recorded within China's borders"],
              [". 14th–16th c.","Salar settlement in the Xunhua region"],
              ["2002","70,000 speakers against about 105,000 ethnic Salar"],
              ["–","Salar is classed Vulnerable by UNESCO"]],
           kids:[] }
        ] },

     { id:"karluk", en:"Karluk (South-Eastern Turkic)", zh:"葛逻禄语支", py:"Géluólù yǔzhī",
       region:"Central Asia and the Tarim Basin — Uzbekistan, Xinjiang, Afghanistan and northern Pakistan",
       cls:"c-kar",
       mk:[[41.31,69.24,"Tashkent"],[39.47,75.98,"Kashgar"],[43.83,87.62,"Ürümqi"],[37.96,58.33,"Ashgabat region"],[38.56,68.79,"Dushanbe"],[36.62,101.78,"Xining region"]],
       h:[`Karluk is the branch that developed "from the varieties spoken by Karluks, an ancient people present in Central Asia in the 5th–8th centuries CE", and it is dominated by two languages: <b>Uzbek</b>, at about 44 million speakers, and <b>Uyghur</b>, at 8–11 million. Between them they account for almost all of it; the rest is <b>Ili Turki</b>, with 30 families, and the extinct literary languages behind them.`,
          `The branch's history is a chain of written languages rather than a set of modern dialects: <b>Karakhanid</b>, the literary language of the Kara-Khanid Khanate from the ninth to the early thirteenth century; <b>Khorezmian Turkic</b>, its successor in the Golden Horde; and <b>Chagatai</b>, which took over and served as the shared literary language of Central Asia "until the early 20th century". Modern Uzbek and Uyghur are both read as continuations of that chain.`,
          `<b>Glottolog calls this branch "Turkestan" rather than Karluk</b>, and it places Karakhanid with Old Turkic instead of under Karluk. The atlas uses Karluk — the name in the standard handbook — and records Glottolog's alternative rather than pretending there is one answer. The branch is also called <b>Southeastern Turkic</b>.`],
    t:[["5th–8th c.","The Karluks in Central Asia"],
       ["9th–13th c.","Karakhanid, the branch's first literary language"],
       [". 11th c.","Mahmud al-Kashgari, writing at Kashgar"],
       [". 13th–15th c.","Khorezmian Turkic, then Chagatai"],
       ["1921–","Chagatai's successors standardised as Uzbek and Uyghur"]],
    kids:[
     { id:"uzbek", en:"Uzbek", nat:"oʻzbekcha", zh:"乌兹别克语", py:"Wūzībiékè yǔ", sp:"35.9 million, 2020–2024",
       region:"Uzbekistan, Afghanistan, Tajikistan, Kyrgyzstan, Turkmenistan and China",
       cls:"c-kar",
       mk:[[41.31,69.24,"Tashkent"],[39.65,66.96,"Samarkand"],[40.10,67.84,"Jizzakh"],[36.71,66.90,"Balkh region — Southern Uzbek"],[38.86,65.79,"Qarshi"]],
       h:[`Uzbek is the <b>second-largest Turkic language after Turkish</b>, and it carries two ISO codes because the written standards of the two halves have drifted apart: <b>uzn</b> for Northern Uzbek in Uzbekistan, <b>uzs</b> for <b>Southern Uzbek</b> in Afghanistan. Together they come to about <b>35.9 million speakers</b> (2020–2024).`,
          `It is a <b>Karluk</b> language with a documented ancestry given in the infobox: <b>Karakhanid → Khorezmian Turkic → Chagatai</b>. That makes Uzbek the modern descendant of the same written tradition as Uyghur, and it explains why Uzbek literature before the twentieth century is usually read as Chagatai rather than as Uzbek.`,
          `Its script situation is the family's most contested in practice: <b>Latin</b> is official in Uzbekistan, <b>Cyrillic</b> remains in wide everyday use and is still the alphabet many adults read, and <b>Perso-Arabic</b> is used in Afghanistan, Pakistan and China. The atlas shows the Latin autonym and states the rest.`],
       t:[["9th–13th c.","Karakhanid, the named ancestor"],
          [". 14th–20th c.","Chagatai as the shared literary language"],
          ["1920s–1940","Arabic → Latin → Cyrillic in Soviet Uzbekistan"],
          ["1993","A Latin alphabet is adopted; the transition is still incomplete"],
          ["2020–2024","35.9 million speakers across both standards"]],
       kids:[] },

      { id:"uyghur", en:"Uyghur", nat:"ئۇيغۇرچە", zh:"维吾尔语", py:"Wéiwú'ěr yǔ", sp:"8–13 million, 2021",
        region:"The Tarim Basin in Xinjiang, China; also Kazakhstan, Kyrgyzstan and Tajikistan",
        cls:"c-kar",
        mk:[[43.83,87.62,"Ürümqi"],[39.47,75.98,"Kashgar"],[37.11,79.94,"Hotan"],[41.72,86.15,"Korla"],[42.83,87.61,"Turfan"],[43.25,76.93,"Almaty — diaspora"]],
        h:[`Uyghur is the eastern half of Karluk and the largest Turkic language inside China. Its speaker figure in the source is a range — <b>8–13 million</b>, dated 2021 — and the atlas gives the range rather than averaging it, because the sources genuinely differ. It descends from <b>Karakhanid</b> and then <b>Chagatai</b>, by way of a stage the source calls <b>Eastern Turki</b>, and it was known by that last name in English until recently.`,
           `Its <b>four alphabets</b> are the most of any language in this atlas: <b>UEY</b>, the Perso-Arabic Uyghur Arabic alphabet, which is official; <b>USY</b>, the Cyrillic alphabet used in Central Asia; and two Latin systems, the <b>Uyghur Latin Alphabet (ULY)</b> and the older <b>Uyghur New Script (UYY)</b>. The node's script slot shows the Perso-Arabic form <i>ئۇيغۇرچە</i>, which is what Uyghur looks like in the street and on the sign.`,
           `The dialects named are Central, Eastern and Southern — a division that cuts across the Tarim Basin rather than following its edges. <b>Äynu</b> and <b>Akto Turkmen</b> speakers are named in the infobox as people whose language this is, which is worth noting because Äynu is usually described as a mixed language with an Iranian core rather than straightforwardly Turkic, while the Karluk branch page lists it under Eastern Karluk. The atlas records the discrepancy rather than resolving it.`],
        t:[["9th–13th c.","Karakhanid at Kashgar; al-Kashgari's dictionary"],
           [". 11th c.","The <i>Kutadgu Bilig</i>, among the earliest Turkic Islamic literature"],
           [". 15th–20th c.","Chagatai, then Eastern Turki"],
           ["1920s–1980s","Arabic → Latin → Cyrillic → Arabic, in successive reversals"],
           ["2021","8–13 million speakers, by the source's own range"]],
        kids:[] },

      { id:"ili", en:"Ili Turki", nat:"İlı turkeşi", zh:"伊犁土尔克语", py:"Yīlí Tǔ'ěrkè yǔ", sp:"30 families, 2007",
        region:"The Ili Kazakh Autonomous Prefecture in Xinjiang — along the Ili river and at Yining",
        cls:"c-kar",
        mk:[[43.92,81.32,"Yining (Ghulja)"],[43.80,82.50,"Ili river valley"],[44.85,65.51,"Kyzylorda region — reported speakers"]],
        chips:[["moribund in Kazakhstan"],["Severely Endangered (UNESCO)"]],
        h:[`Ili Turki is the smallest living member of Karluk and one of the most instructive languages in this atlas. Its <b>speaker figure is "30 families"</b>, dated 2007 — not thirty people, and the atlas quotes the source's unit rather than converting it. The Karluk branch page gives a different and older measurement: <b>"120 speakers and decreasing (1980)"</b>. Both are shown, with their dates.`,
           `Its classification is not clean. It "appears to belong to the Karluk group", but it "exhibits a number of features that suggest a <b>Kipchak substratum</b>" — and the source tabulates the split, with Ili Turki agreeing with Kazakh on some features and with Uzbek on others. This is the family's clearest illustration of why branch labels are conventions: a language can sit in Karluk by ancestry and behave like Kipchak in part of its grammar.`,
           `It is spoken along the <b>Ili river</b> and at <b>Yining</b>, has <b>no official status in either China or Kazakhstan</b>, and its speakers are shifting to Kazakh or Uyghur. UNESCO classes it <b>Severely Endangered</b>. The node has no Omniglot page, so its listening links fall back to the engine's search.`],
        t:[["1760s–1880s","Ili Turks settled in the Ili valley under Qing rule"],
           ["1950s–","Uyghur and Kazakh take over as the local written languages"],
           ["1980","120 speakers recorded, and decreasing"],
           ["2007","30 families reported using the language in China"]],
        kids:[] },

      { id:"chagatai", en:"Chagatai", nat:"چغتای تیلی", zh:"察合台语", py:"Cháhétái yǔ",
        region:"Central Asia — the Chagatai Khanate, the Timurid Empire and their successors, from the Amu Darya to the Tarim Basin",
        cls:"c-his",
        mk:[[39.65,66.96,"Samarkand — the Timurid court"],[41.31,69.24,"Tashkent"],[38.56,68.79,"Dushanbe"],[39.47,75.98,"Kashgar"]],
        chips:[["extinct as a written language — early 20th c."]],
        h:[`Chagatai is the <b>shared literary language of Central Asia for six centuries</b>, and it is why Uzbek and Uyghur look so alike in older texts. It grew out of Khorezmian Turkic, took its name from the Chagatai Khanate, and served as the written medium of the Timurid Empire, the Mughal chancery, the Yarkent Khanate and the Central Asian khanates — "it remained a shared literary language across more than one culture there until the early 20th century".`,
           `Its importance for this atlas is structural: <b>Chagatai is why Karluk has a written history and the other branches mostly do not</b>. A single literary language spanning Transoxiana, the Ferghana valley and the Tarim Basin kept Central Asian Turkic convergent for centuries, which is precisely what makes modern Uzbek and Uyghur mutually recognisable despite the mountains between them.`,
           `It was written in <b>Perso-Arabic script</b> throughout — the autonym on this node is given in that script — and it was displaced not by conquest but by <b>national standardisation</b>: Uzbek and Uyghur were each given their own written norms in the twentieth century, and Chagatai ceased to be anyone's written language. The node is cross-listed in this series with the Silk Road atlas.`],
        t:[["c. 13th–14th c.","Chagatai emerges from Khorezmian Turkic"],
           [". 15th c.","The Timurid court; Ali-Shir Nava'i writes in it"],
           [". 16th–19th c.","The Mughal and Central Asian chanceries"],
           ["1921–1924","Uzbek and Uyghur standardised separately; Chagatai falls out of use"]],
        kids:[] }
     ] },

     { id:"kipchak", en:"Kipchak (North-Western Turkic)", zh:"钦察语支", py:"Qīnchá yǔzhī", sp:"≈30 million",
       region:"From Bulgaria and Romania across the Pontic–Caspian steppe and Central Asia to Xinjiang",
       cls:"c-kip",
       mk:[[55.79,49.11,"Kazan"],[54.74,55.97,"Ufa"],[51.17,71.43,"Astana"],[42.87,74.59,"Bishkek"],[44.95,34.10,"Simferopol — Crimea"],[45.04,38.98,"Krasnodar"],[43.25,76.93,"Almaty"]],
       h:[`Kipchak — also <b>Kypchak, Qypchaq</b>, or <b>North-Western Turkic</b> — is the family's second-largest branch at about <b>30 million speakers</b>, and it is the one with the widest spread: "from Bulgaria and Romania in Southeastern Europe to China in East Asia". Its three largest languages are <b>Kazakh, Kyrgyz and Tatar</b>.`,
          `Its signature is phonological. Kipchak changed Proto-Turkic <b>*d</b> to <b>/j/</b> — the source's example is *<i>hadaq</i> becoming <i>ajaq</i>, "foot" — and it developed <b>diphthongs from syllable-final */ɡ/ and */b/</b>, so *<i>taɡ</i> becomes <i>taw</i> ("mountain") and *<i>sub</i> becomes <i>suw</i> ("water"). Tatar and Bashkir go further still, swapping mid and high vowels by raising and lowering — *<i>e</i> to <i>i</i>, *<i>i</i> to <i>e</i>, and so on across the vowel system.`,
          `The branch divides four ways: <b>Kipchak–Bulgar</b> (Tatar, Bashkir), <b>Kipchak–Cuman</b> (Crimean Tatar's mountain and central varieties, Karachay-Balkar, Kumyk, Karaim, Krymchak), <b>Kipchak–Nogai</b> (Kazakh, Karakalpak, Nogai, the steppe variety of Crimean Tatar) and <b>Kipchak–Kyrgyz</b> (Kyrgyz, Southern Altai). The atlas shows one node per named language rather than four sub-branch nodes, and lists the grouping in each node's prose.`],
       t:[["11th–13th c.","The Kipchaks on the steppe; the <i>Codex Cumanicus</i> is written later"],
          [". 13th c.","The Mongol conquest pushes Kipchak speech into the Golden Horde"],
          [". 14th–16th c.","Kipchak languages spread from Lithuania to Mamluk Egypt"],
          ["1920s–1940","Latin, then Cyrillic, across the Soviet Kipchak languages"],
          ["1990s–","Latin returns in Kazakhstan and Uzbekistan; not in Russia"]],
       kids:[
        { id:"kazakh", en:"Kazakh", nat:"қазақша", zh:"哈萨克语", py:"Hāsàkè yǔ", sp:"16.4 million, 2021 census",
          region:"Kazakhstan, the Ili Kazakh Autonomous Prefecture in Xinjiang, Mongolia's Bayan-Ölgii, and Russia",
          cls:"c-kip",
          mk:[[51.17,71.43,"Astana"],[43.24,76.89,"Almaty"],[42.32,69.59,"Shymkent"],[43.92,81.32,"Yining — Ili Kazakh Prefecture"],[48.97,89.96,"Bayan-Ölgii — Mongolia"],[55.79,49.11,"Kazan region"]],
          h:[`Kazakh is the largest Kipchak language, with <b>16.4 million speakers</b> at the 2021 census, and it is the most widely distributed in political terms: official in Kazakhstan, official in Russia's Altai Republic, and a recognised minority language across four autonomous prefectures and counties in China. Its closest relatives are named in the source as <b>Nogai, Kyrgyz and Karakalpak</b>.`,
             `Its three-script situation is the family's most active. <b>Cyrillic</b> remains in everyday use, a <b>Latin</b> alphabet has been adopted and is being phased in, and <b>Perso-Arabic</b> is used by Kazakh speakers in China — the infobox gives the autonym in all three. The node's script slot shows the Cyrillic <i>қазақша</i>, which is what most Kazakh speakers still read, rather than the Latin form that is officially on its way.`,
             `Kazakh sits in the <b>Kipchak–Nogai</b> group, and it is one of the two Kipchak languages whose vowel system has been reshaped: where Tatar and Bashkir swapped mid and high vowels, Kazakh kept its own arrangement but shows the branch's characteristic diphthongisation of final */ɡ/ and */b/.`],
          t:[["15th–16th c.","The Kazakh Khanate forms out of the Uzbek nomadic confederation"],
             [". 18th–19th c.","Russian expansion; Kazakh becomes a written language in Arabic script"],
             ["1929–1940","Latin, then Cyrillic"],
             ["2017–","A Latin alphabet is adopted by decree and phased in"],
             ["2021","16.4 million speakers"]],
          kids:[] },

         { id:"kyrgyz", en:"Kyrgyz", nat:"Кыргыз тили", zh:"吉尔吉斯语", py:"Jí'ěrjísī yǔ", sp:"5.6 million, 2000–2024",
           region:"Kyrgyzstan, the Kizilsu Kyrgyz Autonomous Prefecture in Xinjiang, Tajikistan and Afghanistan",
           cls:"c-kip",
           mk:[[42.87,74.59,"Bishkek"],[40.53,72.80,"Osh"],[39.47,75.98,"Kashgar — Kizilsu Kyrgyz Prefecture"],[37.49,71.55,"Khorog — Pamiri Kyrgyz"],[34.53,69.17,"Kabul region"]],
           h:[`Kyrgyz is the second-largest Kipchak language and the branch's eastern member, spoken in Kyrgyzstan, in China's <b>Kizilsu Kyrgyz Autonomous Prefecture</b>, and — through the <b>Pamiri Kyrgyz</b> dialect — in Afghanistan and northern Pakistan. Its <b>5.6 million speakers</b> (2000–2024) are counted across all of those.`,
              `It is one of the family's clearest illustrations of the difference between linguistic and political classification. Kyrgyz sits in <b>Kipchak–Kyrgyz</b>, alongside Southern Altai, and the source records "a very high level of <b>mutual intelligibility</b>" between Kyrgyz, Kazakh and Altay — three languages in two different Kipchak subgroups that speakers can largely understand across. Meanwhile the <b>Fuyu Kyrgyz</b> of Heilongjiang, who carry the same name, are <em>not</em> closely related to it at all; their own node in this atlas says so.`,
              `Kyrgyz was "originally written in <b>Göktürk script</b>", then Perso-Arabic until 1928, then a Latin alphabet to 1940, and Cyrillic since — with Perso-Arabic still in use in China. The infobox lists the <b>Old Turkic script</b> among its historical scripts, which makes Kyrgyz one of the few living languages in this atlas that can point to an actual epigraphic ancestor on its own soil.`],
           t:[["8th–10th c.","Yenisei Kyrgyz inscriptions in the runiform script"],
              [". 13th–15th c.","Kyrgyz move south into the Tian Shan under Mongol pressure"],
              ["1928–1940","Perso-Arabic → Latin → Cyrillic"],
              ["1991","Kyrgyz becomes the state language of independent Kyrgyzstan"],
              ["2000–2024","5.6 million speakers"]],
           kids:[] },

         { id:"tatar", en:"Tatar", nat:"татар теле", zh:"鞑靼语", py:"Dádá yǔ", sp:"4.0 million, 2020",
           region:"Tatarstan and the Volga–Ural region of Russia, with communities in Siberia, Central Asia and China",
           cls:"c-kip",
           mk:[[55.79,49.11,"Kazan"],[54.74,55.97,"Ufa"],[55.03,82.92,"Novosibirsk — Siberian Tatars"],[39.65,66.96,"Samarkand — Crimean and Volga Tatar diaspora"],[51.17,71.43,"Astana"]],
           h:[`Tatar is the largest language of the <b>Kipchak–Bulgar</b> group and one of the family's most politically contested. Its <b>4.0 million first-language speakers</b> (2020) make it the second-largest language in Russia by speaker numbers, and its written ancestor is named as <b>Ural-Volga Turki</b>. UNESCO classes it <b>Vulnerable</b>.`,
              `<b>Its script history is the atlas's most instructive example of a language losing an alphabet to law.</b> Tatar was written in Arabic script — <i>İske imlâ</i> to 1920, <i>Yaña imlâ</i> from 1920 — then in a Latin alphabet called <b>Jaꞑalif</b> from 1928, then in Cyrillic from <b>1939</b>. In 1999 Tatarstan passed a law establishing a Latin alphabet; a Russian federal law overrode it in <b>2002</b>, and the Constitutional Court ruled in <b>2004</b> that the federal requirement of Cyrillic did not contradict the Russian constitution. The Tatar Supreme Court then overturned the republic's Latin-alphabet law on 28 December 2004. A 2012 attempt produced a Latin alphabet "with limited usage (mostly for Romanization)". The node gives the dates and the actors.`,
              `Two dialects are named, <b>Kazan Tatar</b> (Central, the majority) and <b>Mishar Tatar</b> (Western), with <b>Siberian Tatar</b> treated as a separate language elsewhere in the branch. Tatar is also one of the few Turkic languages with a long-standing Christian sub-community — the <b>Kryashens</b>, whose Cyrillic alphabet was devised by Nikolay Ilminsky in the nineteenth century and is still in use.`],
           t:[["13th–15th c.","Volga Bulgaria's successor population forms under the Golden Horde"],
              [". 1920–1928","<i>Yaña imlâ</i>, the reformed Arabic orthography, then Jaꞑalif in Latin"],
              ["1939","Cyrillic adopted across the Soviet Union"],
              ["1999–2004","Tatarstan's Latin law, overridden federally and struck down"],
              ["2020","4.0 million first-language speakers, 810,000 second-language"]],
           kids:[] },

         { id:"bashkir", en:"Bashkir (Bashkort)", nat:"башҡорт теле", zh:"巴什基尔语", py:"Bāshíjī'ěr yǔ", sp:"1.08 million, 2020",
           region:"Bashkortostan and the Volga–Ural region of Russia, with communities across the former Soviet Union",
           cls:"c-kip",
           mk:[[54.74,55.97,"Ufa"],[53.36,55.92,"Sterlitamak"],[52.04,58.24,"Orenburg region"],[55.79,49.11,"Kazan"]],
           h:[`Bashkir is Tatar's closest relative and its near-twin in most respects — same <b>Kipchak–Bulgar</b> group, same named ancestor (<b>Ural-Volga Turki</b>), same <b>Cyrillic/Latin/Arabic</b> script set, same UNESCO <b>Vulnerable</b> grade. What separates them is the vowel system: Bashkir and Tatar both "swapped the original mid and high vowels by raising and lowering", but they did it differently, and that is most of what makes the two languages distinct.`,
              `Its numbers are the messiest in this atlas, and both figures come from the same source. The infobox gives <b>1.08 million speakers (2020)</b>, cited to the Joshua Project; the lead says "approximately <b>1.6 million</b> native speakers in Russia", cited to the same reference; and the 2021 Russian census, quoted in the infobox's ethnicity field, records <b>1.57 million Bashkirs</b>. The atlas states the speaker figure it can source and flags the discrepancy in this note rather than picking the larger number for effect.`,
              `Three dialects are named — <b>Southern, Eastern and Northwestern</b> — and Bashkir has a substantial diaspora across the former Soviet Union, with communities in Ukraine, Belarus, Kazakhstan, Uzbekistan and Estonia. Its autonym uses the Bashkir-specific Cyrillic letters <b>ҡ, ң, ө, ү, һ, ҫ, ә</b>, which is why this atlas registers a Cyrillic face for the script slot.`],
           t:[["13th–16th c.","Bashkir ethnogenesis on the southern Ural flank of the Golden Horde"],
              [". 16th c.","Bashkiria joins Russia; the language is written in Chagatai-derived Turki"],
              ["1920s–1939","Arabic → Latin → Cyrillic"],
              ["1990s–","Bashkir is co-official with Russian in Bashkortostan"],
              ["2020","1.08 million speakers in the infobox, ≈1.6 million in the lead"]],
           kids:[] },

         { id:"karakalpak", en:"Karakalpak", nat:"Qaraqalpaq tili", zh:"卡拉卡尔帕克语", py:"Kǎlākǎ'ěrpàkè yǔ", sp:"871,970, 2023",
           region:"Karakalpakstan, an autonomous republic within Uzbekistan; also Kazakhstan, Russia and Afghanistan",
           cls:"c-kip",
           mk:[[42.46,59.61,"Nukus — Karakalpakstan"],[43.77,59.03,"Muynak — the Aral shore"],[41.55,60.63,"Urgench region"],[42.32,69.59,"Shymkent"]],
           h:[`Karakalpak is the language of <b>Karakalpakstan</b>, an autonomous republic inside Uzbekistan, and it is the atlas's clearest case of a language whose speakers are counted in one country while its closest relatives live in another. With <b>871,970 speakers</b> (2023) it sits in the <b>Kipchak–Nogai</b> group, "closely related to and highly mutually intelligible with Kazakh and Nogai".`,
              `Its three alphabets are given in the infobox — <b>Latin, Cyrillic and Arabic</b> — and its Latin orthography was reformed as recently as <b>2009</b>: before that, the letter written <b>C</b> was written <b>TS</b>, and the apostrophe-letters became acute-accented ones. That kind of detail matters here because it means Karakalpak texts from the 1990s and from the 2010s do not look identical.`,
              `UNESCO classes it <b>Vulnerable</b>. Two dialects are named, Northeastern and Southwestern, and its vocabulary shows contact with both <b>Uzbek</b> and <b>Turkmen</b> — the two non-Kipchak languages it sits between. The node has no Omniglot page, so its listening links fall back to the engine's search.`],
           t:[["16th–18th c.","Karakalpak groups form in the lower Amu Darya delta"],
              [". 19th c.","Russian conquest; Karakalpakstan is constituted in the Soviet period"],
              ["1920s–1940","Arabic → Latin → Cyrillic"],
              ["1994–2009","A Latin alphabet, then a reform of it"],
              ["2023","871,970 speakers"]],
           kids:[] },

         { id:"nogai", en:"Nogai (Noghay)", nat:"ногай тили", zh:"诺盖语", py:"Nuògài yǔ", sp:"85,600, 2020 census",
           region:"The north Caucasus — Dagestan and Karachay-Cherkessia — with communities in Romania, Bulgaria, Turkey and Central Asia",
           cls:"c-kip",
           mk:[[44.51,40.18,"Maykop"],[43.50,45.69,"Nogaysky District — Chechnya border"],[44.14,42.86,"Nogaysky District — Stavropol"],[43.30,46.60,"Khasavyurt — Dagestan"],[41.01,28.98,"Istanbul — Nogai diaspora"]],
           h:[`Nogai is the <b>Kipchak–Nogai</b> group's namesake, spoken in two districts of the north Caucasus and scattered from Romania to Turkey. Its numbers follow this atlas's familiar pattern: <b>108,000 Nogais</b> recorded in the 2020 census against <b>85,600 speakers</b>, and it is <b>Definitely Endangered</b> on the UNESCO atlas.`,
              `Its script history is a compressed history of Soviet language policy, and the source lays it out in four stages: <b>unwritten before the 1920s</b>, when Kypchak and Chagatai were used instead in Perso-Arabic script; then a <b>standardised Arabic script of its own, 1926–1928</b>; then a <b>Latin alphabet, 1928–1938</b>; then <b>Cyrillic from 1938</b>. The Cyrillic alphabet was then itself revised three times — digraphs added in 1938, two of them removed in 1944, and the letters <b>Аь</b> and <b>Ё</b> added in 1960, which is when it reached its present form.`,
              `The node's script slot shows the Cyrillic autonym. Its closest relatives are named as <b>Kazakh, Karakalpak and Crimean Tatar</b>, and in 2014 the first Nogai novel written in the Latin alphabet — <i>Akşa Nenem</i> — was published, which the source records as a milestone rather than a statistic.`],
           t:[["16th–17th c.","The Nogai Horde and its successor groups"],
              [". 19th c.","Nogai communities disperse across the north Caucasus and the Balkans"],
              ["1926–1938","Own Arabic script, then Latin"],
              ["1938–1960","Cyrillic, revised three times"],
              ["2014","The first Nogai novel in Latin script"]],
           kids:[] },

         { id:"crimeantatar", en:"Crimean Tatar", nat:"qırımtatar tili", zh:"克里米亚鞑靼语", py:"Kèlǐmǐyà Dádá yǔ", sp:"581,340, 2001",
           region:"Crimea, with communities in Uzbekistan, Turkey, Romania, Bulgaria and Kyrgyzstan",
           cls:"c-kip",
           mk:[[44.95,34.10,"Simferopol"],[45.35,34.50,"Dzhanhoy region"],[44.49,34.17,"Yalta — the Southern dialect"],[41.30,69.24,"Tashkent — the 1944 deportation"],[45.66,25.61,"Brașov — Romanian Tatars"]],
           h:[`Crimean Tatar is the atlas's hardest node, and not because of its linguistics. Its <b>581,340 speakers</b> (2001) are scattered across Crimea, Uzbekistan, Turkey, Romania, Bulgaria and Kyrgyzstan — a distribution created by the <b>1944 deportation</b> of the Crimean Tatar population to Central Asia, which is why the largest single community outside Crimea was for decades in Uzbekistan.`,
              `<b>Its dialects span two Kipchak subgroups and an Oghuz influence.</b> The infobox gives three: <b>Northern</b>, <b>Central</b>, and a <b>Southern dialect marked as extinct</b>. The Kipchak page files the mountain and central varieties under <b>Kipchak–Cuman</b> and the steppe variety under <b>Kipchak–Nogai</b>, while the Oghuz page notes that Crimean Tatar is "highly mutually intelligible" with Western Oghuz languages because of centuries of Turkish influence. One language, two Kipchak sub-branches, heavy Oghuz contact — the atlas states all three rather than picking a label.`,
              `<b>Its script history is where the atlas has to be most careful.</b> Arabic script from the sixteenth century; a Latin alphabet based on <b>Yañalif</b> in <b>1928</b>; Cyrillic in <b>1938</b>. A Latin alphabet based on the <b>Common Turkic Alphabet</b> was adopted by the Qurultay of the Crimean Tatar People in <b>1992</b> and formally supported by the Supreme Council of Crimea in <b>1997</b>, but was never implemented officially. After the <b>2014 annexation</b>, Cyrillic became the sole script permitted in Russian-administered Crimea, on the authority of the same 2004 Constitutional Court decision that overrode Tatarstan's Latin alphabet; in <b>2021</b> Ukraine's Ministry of Reintegration announced a move back towards Latin. The node gives the dates and the institutions, and adjudicates none of the sovereignty questions — because the linguistic facts do not depend on them.`],
           t:[["16th c.","Arabic script; the Crimean Khanate's literary tradition"],
              ["1783–1944","Russian annexation; the Crimean Tatar diaspora begins"],
              ["1928 / 1938","Latin, then Cyrillic, under Soviet rule"],
              ["1944","Deportation to Central Asia; the Uzbek communities date from this"],
              ["1992–1997","A Latin alphabet adopted, never implemented"],
              ["2014–","Cyrillic made the sole permitted script in Russian-administered Crimea"]],
           kids:[] }
        ] },

     { id:"siberian", en:"Siberian Turkic (North-Eastern)", zh:"西伯利亚语支", py:"Xībóliyà yǔzhī",
       region:"Southern Siberia, the Altai–Sayan region and the far north-east — from the Altai Republic to Yakutia",
       cls:"c-sib",
       mk:[[53.02,91.43,"Abakan"],[51.96,85.97,"Gorno-Altaysk"],[51.72,94.44,"Kyzyl"],[62.03,129.73,"Yakutsk"],[69.35,88.20,"Norilsk — Dolgan"],[53.90,102.70,"Irkutsk — Tofalaria"]],
       h:[`Siberian Turkic is the branch that stayed home. It covers the Altai–Sayan region, the upper Yenisei and Lena basins, and the far north-east — a territory larger than all the others combined with by far the fewest speakers. It is also where the family's <b>earliest written record</b> sits, since Old Turkic is filed here by the sources.`,
          `Its internal shape depends on who you ask, and the atlas follows the language articles rather than forcing one scheme. <b>Sayan Turkic</b> holds Tuvan and Tofa, with a further Steppe/Taiga split inside it. <b>Yenisei Turkic</b> holds Khakas, Western Yugur and Fuyu Kyrgyz — three languages geographically nowhere near each other, which is the branch's most surprising fact. <b>Northern Siberian</b> holds Sakha and Dolgan, the family's north-eastern outpost. <b>Altai</b> is filed in Siberian Turkic by its own article and under <b>Kipchak–Kyrgyz</b> by the Kipchak page, and both are shown.`,
          `Glottolog splits this branch differently again, into "Central Siberian Turkic" and "North Siberian Turkic". The atlas uses the geography-first arrangement above because it is what the individual language articles use, and says so.`],
       t:[["8th–13th c.","Old Turkic — the branch's earliest record"],
          [". 9th–10th c.","Yenisei Kyrgyz runiform inscriptions"],
          [". 13th–14th c.","Mongol expansion reshapes the Siberian Turkic area"],
          [". 17th–18th c.","Russian expansion; the ancestor of Sakha moves north-east"],
          ["1930s–1940","Cyrillic alphabets created for each Siberian Turkic language"]],
       kids:[
        { id:"sakha", en:"Sakha (Yakut)", nat:"саха тыла", zh:"雅库特语", py:"Yǎkùtè yǔ", sp:"≈450,000",
          region:"The Sakha Republic (Yakutia), plus Magadan and Amur Oblasts and Evenkiysky District",
          cls:"c-sib",
          mk:[[62.03,129.73,"Yakutsk"],[59.56,150.80,"Magadan — outlying speakers"],[66.00,129.73,"Vilyuy region"],[59.40,112.10,"Lena river"],[55.00,124.60,"Amur Oblast — outlying speakers"]],
          h:[`Sakha is the <b>northernmost and easternmost</b> Turkic language — a family that began in Mongolia, now spoken on the Lena. It "left the community of Common Turkic speakers relatively early", and the consequence is measurable: <b>mutual intelligibility with other Turkic languages is low</b>, and many cognates "are hard to notice when heard". It has heavy <b>Mongolic</b>, <b>Tungusic</b> and then <b>Russian</b> borrowings on top.`,
             `The speaker figure is the weakest in this atlas and it is labelled as such: "around <b>450,000</b>" with the date field <b>empty</b> and Britannica as the only reference. The lead adds something that matters for interpretation — the speakers are "primarily ethnic Yakuts, but also Evenki, Even, Yukaghir and Starozhily peoples" — so this is <b>not</b> an ethnic-Yakut count but a count of everyone who speaks the language. UNESCO classes Sakha <b>Vulnerable</b>.`,
             `Sakha's grammar is where it diverges most sharply. Its converbs end in <b>-(A)n</b> where Common Turkic has <b>-(I)B</b>; its yes–no question marker is the enclitic <b><i>duo</i></b> rather than a <b>-mi</b>-type suffix; and it allows denominal verbs to be formed from essentially any noun. It is written in <b>Cyrillic</b> today, having used a Latin alphabet from 1929 to 1939.`],
          t:[["13th–15th c.","Ancestral Sakha speakers move north-east from the Baikal region"],
             [". 17th c.","Russian expansion into the Lena basin"],
             ["1929–1939","Latin alphabet, then Cyrillic"],
             ["1992","Sakha becomes a state language of the Sakha Republic alongside Russian"],
             ["–","≈450,000 speakers; UNESCO Vulnerable"]],
          kids:[] },

         { id:"dolgan", en:"Dolgan", nat:"долган", zh:"多尔干语", py:"Duō'ěrgàn yǔ", sp:"5,346, 2020 census",
           region:"The Taymyr Peninsula — Taymyrsky Dolgano-Nenetsky District, Krasnoyarsk Krai",
           cls:"c-sib",
           mk:[[69.35,88.20,"Norilsk"],[71.64,128.87,"Tiksi — Khatanga side"],[73.02,113.50,"Anabar region"],[69.40,86.18,"Yenisey side"]],
           h:[`Dolgan is the atlas's northernmost node and its smallest by territory. It is spoken on the <b>Taymyr Peninsula</b>, above the Arctic Circle, and "its closest relative is <b>Sakha</b>" — the two form the <b>Northern Siberian</b> group. The name itself is not Turkic: "Dolgan", from <b>Evenki</b>, means 'tribe living on the middle reaches of the river'.`,
              `The history behind it is one of language shift in a very small population. The Dolgans are a people formed largely from <b>Evenki, Yakuts and other groups</b> on Taymyr; the language they speak is Sakha-derived, but their name and much of their material culture are not. It has <b>5,346 speakers</b> (2020 census) and is <b>Definitely Endangered</b> on the UNESCO atlas.`,
              `Three dialects are named — <b>Western (Norilsk, Yenisey)</b>, <b>Central (Avam)</b> and <b>Eastern (Khatanga)</b> — spread across a peninsula the size of Germany with no road connecting them. The source also records the mechanism of decline plainly: in mixed marriages, families "incorporate Russian as the more dominant language" rather than either parent's language.`],
           t:[["17th–18th c.","Dolgan identity forms on Taymyr from Evenki, Yakut and other groups"],
              [". 19th c.","The Sakha-derived variety becomes the community's language"],
              ["1930s–1973","A written Dolgan; Cyrillic alphabet from 1973"],
              ["2020","5,346 speakers on a peninsula with no road network"]],
           kids:[] },

         { id:"tuvan", en:"Tuvan (Tyvan)", nat:"Тыва дыл", zh:"图瓦语", py:"Túwǎ yǔ", sp:"252,953, 2020 census",
           region:"The Republic of Tuva in south-central Siberia, with distinct Tuvan groups in Mongolia and China",
           cls:"c-sib",
           mk:[[51.72,94.44,"Kyzyl"],[50.27,95.20,"Erzin — southeastern dialects"],[52.05,93.60,"Tozhu — the taiga dialects"],[49.00,89.20,"Mongolian border Tuvans"],[47.90,87.10,"Altay — Chinese Tuvans"]],
           h:[`Tuvan is the largest <b>Sayan Turkic</b> language and the only one with a viable speaker base — <b>252,953</b> in the 2020 census, against Tofa's 67. It is spoken in the <b>Republic of Tuva</b>, a Russian republic on the Mongolian border, with distinct Tuvan groups in Mongolia and China that speak "distinct dialects". UNESCO classes it <b>Vulnerable</b>.`,
              `<b>Its closest relative is the moribund Tofa</b>, and the two form a dialect continuum rather than a clean split — which is exactly why Tofa's position in this atlas is so stark. The four dialect groups are <b>Western, Central, Northeastern and Southeastern</b>, with Central forming the basis of the literary language.`,
              `⚠ <b>The atlas carries one classification wrinkle forward from the source.</b> The infobox files Tuvan under <b>Steppe Sayan Turkic</b>, but a footnote in the same infobox records that <b>Tozhu and Tere-Khöl are Taiga Sayan Turkic, not Steppe</b> — and Tofa is filed under <b>Taiga Sayan Turkic</b>. So the Steppe/Taiga division cuts through Tuvan itself, and the atlas says so rather than presenting one label for the whole language. Tuvan is also listed among languages with <b>tone in a non-tonal family</b>: it has developed phonemic pitch from lost consonants, the same mechanism as Vietnamese and Chinese.`],
           t:[["8th–10th c.","Yenisei Kyrgyz and Uyghur presence in the Tuva basin"],
              [". 13th–18th c.","Mongol and Oirat rule shapes the Sayan area"],
              ["1757–1911","Qing rule; Tuvan is recorded by Klaproth in 1823 and Castrén in 1857"],
              ["1944","Tuva joins the Soviet Union; a Cyrillic Tuvan is standardised"],
              ["2020","252,953 speakers"]],
           kids:[] },

         { id:"tofa", en:"Tofa (Tofalar, Karagas)", nat:"Тоъфа дыл", zh:"托法语", py:"Tuōfǎ yǔ", sp:"67, 2020 census",
           region:"Tofalariya — three villages in Irkutsk Oblast, on the eastern Sayan slopes",
           cls:"c-sib",
           mk:[[53.90,102.70,"Alygdzher"],[53.30,101.20,"Verkhnyaya Gutara"],[53.10,100.50,"Nerkha"],[52.30,99.60,"Eastern Sayan slopes"]],
           chips:[["Critically Endangered (UNESCO)"],["67 speakers, 2020 — fewer than 40 in one other estimate"]],
           h:[`Tofa is the most endangered living language in this atlas, and its numbers are as blunt as they get: <b>67 speakers</b> in the 2020 census, against other recent estimates of "fewer than 40 individuals". It is spoken by the <b>Tofalar</b>, an indigenous people of the eastern Sayan, in three villages in Irkutsk Oblast — a region called Tofalariya. UNESCO classes it <b>Critically Endangered</b>.`,
              `It is also the clearest illustration in this atlas of what "a dialect continuum" means in practice. Tofa "<b>forms a dialect continuum with the closely related Tuvan language</b>" and "shares many features with it"; Tuvan's own article names Tofa as its closest relative, and the two are filed together under <b>Taiga Sayan Turkic</b>. Tuvan has a quarter of a million speakers. Tofa has 67. Same subgroup, same continuum, different outcomes — and the reason is geography and administration, not linguistics.`,
              `Tofa's grammar has features worth recording because they will not be around much longer. Grammatical number includes a <b>dual inclusive</b> — "you and me" as distinct from both the singular and the plural. It has a derivational suffix <b>/-sig/</b> that attaches to any noun to mean 'smelling of —', which is unusual enough to have been written up in <i>Nature</i>. Its suffixes "historically conformed to Tofa vowel harmony rules, but that appears to be changing", which is what obsolescence looks like from the inside. The node has an Omniglot page but no audio in the atlas's link set.`],
           t:[["17th–18th c.","Tofalar groups form on the eastern Sayan from Samoyedic and Turkic populations"],
              [". 19th c.","Recorded as Karagas, alongside the unrelated Mator language's Karagas dialect"],
              ["1930s–","A written Tofa; Cyrillic-based"],
              ["2003–2004","Anderson and Harrison document obsolescent change in the language"],
              ["2020","67 speakers; UNESCO Critically Endangered"]],
           kids:[] },

         { id:"khakas", en:"Khakas (Xakas)", nat:"Хакас тілі", zh:"哈卡斯语", py:"Hākǎsī yǔ", sp:"29,010, 2021",
           region:"The Republic of Khakassia in south-western Siberia, on the upper Yenisei",
           cls:"c-sib",
           mk:[[53.72,91.43,"Abakan"],[52.96,90.80,"Askiz"],[54.42,89.30,"Shira region"],[55.05,91.00,"Achinsk region"]],
           chips:[["61,000 Khakas, 29,010 speakers — a ratio of less than half"]],
           h:[`Khakas is the <b>Yenisei Turkic</b> group's namesake, and its numbers repeat this atlas's recurring pattern: "The Khakas number <b>61,000</b>, of whom <b>29,000</b> speak the Khakas language." Fewer than half. Most Khakas speakers are bilingual in Russian, and the language has no UNESCO listing at all — it is simply absent from the danger atlas, which is its own kind of statement.`,
              `Its dialect list is unusual in two ways. First, the dialects — <b>Sagay, Kacha, Koybal, Beltir and Kyzyl</b> — "take their names from the different tribes", but the source notes these "represent former administrative units rather than tribal or linguistic groups". Second, it contains <b>Kamas Turk</b>, a dialect that UNESCO records as <b>extinct since the 1950s</b>. A living language carrying an extinct dialect inside it is rare enough that the atlas names it rather than dropping it.`,
              `<b>⚠ A structural catch this atlas deliberately does not follow.</b> The Khakas infobox lists <b>Fuyu Kyrgyz</b> as its first dialect. Fuyu Kyrgyz is spoken in <b>Heilongjiang, China</b>, several thousand kilometres away, and its own article says it "is not closely related to the Kyrgyz language" but "more similar to the Western Yugur language and the Abakan Turkic languages". ISO does register it as a Khakas dialect, which is why its speaker count is cited to the Khakas entry. The atlas gives Fuyu Kyrgyz <b>its own node</b> and states who classifies it where, rather than filing a language of Manchuria inside one of Siberia.`],
           t:[["9th–10th c.","Yenisei Kyrgyz runiform inscriptions in the Minusinsk basin"],
              [". 13th c.","Mongol conquest breaks up the Yenisei Kyrgyz polity"],
              ["1707–1860s","Russian annexation; Khakas recorded as 'Abakan Tatars'"],
              ["1924–1939","Cyrillic alphabets; the modern literary Khakas forms"],
              ["2021","29,010 speakers against 61,000 ethnic Khakas"]],
           kids:[] },

         { id:"altai", en:"Altai (Gorno-Altai, Oyrot)", nat:"алтай тил", zh:"阿尔泰语", py:"Ā'ěrtài yǔ", sp:"125,700, Southern + Northern",
           region:"The Altai Republic, plus Altai Krai and Kemerovo Oblast, in the Altai Mountains of southern Siberia",
           cls:"c-sib",
           mk:[[51.96,85.97,"Gorno-Altaysk"],[50.20,86.60,"Kosh-Agach — Southern Altai"],[52.30,87.10,"Turochak — Northern Altai"],[53.35,83.78,"Barnaul — Altai Krai"]],
           chips:[["classification disputed"],["formerly called Oyrot, before 1948"]],
           h:[`Altai is a <b>set of languages rather than one</b>, and its classification is not settled. Its infobox gives two family chains at once — <b>Siberian Turkic</b> and <b>Kipchak</b>, then "Southern Siberian and Kyrgyz–Kipchak" — and its lead says plainly that "the exact classification of Altai within the Turkic languages has often been disputed", because of its isolated position in the mountains and contact with <b>Shor</b> and <b>Khakas</b>. The atlas ships the dispute rather than resolving it.`,
              `It has <b>two ISO codes</b> because it has two varieties: <b>atv</b> for Northern Altai and <b>alt</b> for Southern Altai. There is one written standard and it is based on <b>Southern Altai</b> — "though it is also taught to and used by speakers of Northern Altai as well". The combined speaker figure is <b>125,700</b>, from Ethnologue.`,
              `Two more things the node records. First, the languages "were called <b>Oyrot</b> (ойрот) prior to 1948", so a pre-1948 source and a post-1948 source are describing the same thing under different names. Second, Glottolog assigns the grouping <b>no code</b>, and its older code <b>alta1276</b> is marked "code retired" — which is what a taxonomy looks like when nobody can agree where to put it.`],
           t:[["17th–18th c.","Altai groups form under Oirat and then Russian pressure"],
              [". 19th c.","Recorded by Castrén and Radlov as the Altai dialects"],
              ["1922–1948","Written as Oyrot, in a Cyrillic alphabet"],
              ["1948–","Renamed Altai; Southern Altai becomes the literary basis"],
              ["–","125,700 speakers across both varieties"]],
           kids:[] },

         { id:"wyugur", en:"Western Yugur (Yellow Uyghur)", nat:"yoğır lar", zh:"西部裕固语", py:"Xībù Yùgùyǔ", sp:"≈2,000, about 1,000 fluent",
           region:"Sunan Yugur Autonomous County in Gansu, China — the eastern end of the Hexi corridor",
           cls:"c-sib",
           mk:[[38.84,99.62,"Sunan Yugur Autonomous County"],[39.20,98.80,"Lianhua"],[38.49,106.23,"Yinchuan — the wider region"]],
           chips:[["Severely Endangered (UNESCO)"],["7,000 ethnic Yugur against ≈2,000 speakers"]],
           h:[`Western Yugur is one of the family's two Chinese relics, and it is a <b>Yenisei Turkic</b> language spoken at the far eastern end of the Hexi corridor — that is, an eastern Siberian subgroup represented in Gansu. Its ancestors are given as <b>Old Turkic</b> and then <b>Old Uyghur</b>, and its script was the <b>Old Uyghur alphabet until the 19th century</b>, with Latin in use today.`,
              `<b>Two traps, both stated on the node.</b> First: Western Yugur is <b>not mutually intelligible with modern Uyghur</b>, despite being called "Neo-Uyghur" and "Yellow Uyghur" — the names are historical, not descriptive. Second: <b>Eastern Yugur is a Mongolic language</b>, spoken in the same community under the same Chinese ethnic label. The two Yugur languages are not related to each other; only one of them is Turkic.`,
              `Its numbers follow the atlas's pattern: <b>7,000 ethnic Yugur (2007)</b> against "about <b>2,000 speakers</b>, roughly 1,000 of them fluent" (2019). UNESCO classes it <b>Severely Endangered</b>. The endonym in the script slot, <i>yoğır lar</i>, means 'Yugur speech'; the alternative is <i>yoğır śoz</i>, 'Yugur word'. The node has no Omniglot page.`],
           t:[["9th–13th c.","Old Uyghur speakers move into the Gansu corridor after the khaganate falls"],
              [". 11th–13th c.","The Ganzhou Uyghur kingdom; the Old Uyghur script is used"],
              [". 19th c.","The Old Uyghur alphabet falls out of use"],
              ["2019","About 2,000 speakers, roughly half of them fluent"]],
           kids:[] },

         { id:"fuyukyrgyz", en:"Fuyu Kyrgyz (Manchurian Kirghiz)", nat:"Gĭrgĭs", zh:"富裕柯尔克孜语", py:"Fùyù Kē'ěrkèzī yǔ", sp:"10, 2007",
           region:"Fuyu County, Heilongjiang, China — the Nonni (Nen) river basin in Manchuria",
           cls:"c-sib",
           mk:[[47.79,124.93,"Fuyu County, Heilongjiang"],[47.35,123.92,"Qiqihar region"],[48.24,126.50,"Nonni river basin"]],
           chips:[["Critically Endangered (UNESCO)"],["880 ethnic Fuyu Kyrgyz against 10 speakers"]],
           h:[`Fuyu Kyrgyz is the most surprising node in this atlas: a <b>Yenisei Turkic</b> language spoken in <b>Heilongjiang, China</b>, several thousand kilometres from every other member of its subgroup. The reason is a deportation. After the Dzungars were defeated by the Qing, a group of <b>Yenisei Kirghiz were moved in 1761</b> to the Nonni river basin in Manchuria, where their descendants still are.`,
              `<b>Despite the name, it is not Kyrgyz.</b> "The Fuyu Kyrgyz language is not closely related to the Kyrgyz language, which is of Kipchak origin"; it "is more similar to the Western Yugur language and the Abakan Turkic languages" — that is, to Yenisei Turkic. Two languages on opposite sides of Asia share a name and almost nothing else, and this node is where the atlas says so.`,
              `Its numbers are as stark as Tofa's: <b>880 ethnic Fuyu Kyrgyz</b> and <b>10 speakers</b>, dated 2007, with the speaker figure sourced to Ethnologue's <b>Khakas</b> entry because <b>ISO registers Fuyu Kyrgyz as a dialect of Khakas</b> rather than as a language. Glottolog does give it its own code, <b>fuyu1243</b>. UNESCO classes it <b>Critically Endangered</b>. Its current script is the <b>Mongolian script</b>, a legacy of the community's Manchu and Mongol surroundings; the script slot shows <i>Gĭrgĭs</i>, a Latin transcription rather than a native orthography, because there is no standard written Fuyu Kyrgyz.`],
           t:[["1700s","Yenisei Kirghiz are deported by the Qing to the Nonni basin"],
              ["1761","The relocation is recorded after the Dzungar defeat"],
              [". 20th c.","Chinese and Oirat replace Kirghiz and Oirat as the community's languages"],
              ["2007","10 speakers; UNESCO Critically Endangered"]],
           kids:[] }
        ] },

     { id:"arghu", en:"Arghu", zh:"阿尔胡语支", py:"Ā'ěrhú yǔzhī", sp:"1 living language",
       region:"Historically the Arghu Turkic of western Iran and Afghanistan; today a cluster of villages in Markazi Province, Iran",
       cls:"c-arg",
       mk:[[34.09,49.70,"Arak — Markazi Province"],[34.64,50.88,"Qom region"],[35.20,49.70,"Tafresh"],[34.90,50.10,"Ashtian"]],
       h:[`Arghu is the <b>smallest branch of Common Turkic</b>, and it exists because of one man's fieldwork. The 11th-century lexicographer <b>Mahmud al-Kashgari</b> was the first to write down examples of Khalaj; nearly nine centuries later <b>Gerhard Doerfer</b>, who "first scientifically described Khalaj, demonstrated that it was an independent branch from Common Turkic" rather than a variety of Azerbaijani.`,
          `The evidence is <b>archaism</b>, and it is a neat list: Khalaj preserves the <b>vowel-length contrasts</b> of Proto-Turkic, keeps word-initial <b>*h</b>, and lacks the sound change <b>*d > y</b> that defines Oghuz. Those three facts are why a language spoken in Iran, surrounded by Persian and Azerbaijani, is not part of either.`,
          `The branch has one member, spoken in villages scattered from Qom to Ashtian and Tafresh, and it is not in good health: <b>only 5% of Khalaj families</b> are recorded as teaching the language to their children. The atlas treats that as a transmission statistic rather than a speaker count, because it is one.`],
       t:[["11th c.","Mahmud al-Kashgari records the first written Khalaj examples"],
          [". 20th c.","Doerfer's fieldwork and grammar establish it as its own branch"],
          ["1978–1988","<i>Grammatik des Chaladsch</i>; the classification settles"],
          ["2018","19,000 speakers recorded in Iran"]],
       kids:[
        { id:"khalaj", en:"Khalaj", nat:"خلج", zh:"哈拉吉语", py:"Hālājí yǔ", sp:"19,000, 2018",
          region:"Villages across Markazi Province, Iran — from Qom to Ashtian and Tafresh",
          cls:"c-arg",
          mk:[[34.09,49.70,"Arak"],[34.64,50.88,"Qom region"],[35.20,49.70,"Tafresh"],[34.90,50.10,"Ashtian"]],
          chips:[["heavily Persianised"],["only 5% of families transmit it"]],
          h:[`Khalaj is the family's outlier and its most conservative member at once. It "contains many old Turkic elements" — Proto-Turkic vowel length, word-initial <b>*h</b>, no <b>*d > y</b> change — and it "has become widely <b>Persianized</b>", with about 150 words of uncertain origin. It is what a language looks like after nine centuries of being surrounded by something else.`,
             `It is written in <b>Perso-Arabic</b>, and the script slot carries <i>خلج</i> — one of only two non-Latin, non-Cyrillic autonyms in this atlas. Its three dialects are <b>Talx-āb</b>, <b>Xarrāb</b> and <b>Dāγān</b>. The source records that the western dialects, such as Talx-āb, "are regarded by other Khalaj as a different language" — internal diversity noted from the inside.`,
             `Its transmission figure is the atlas's most alarming single number: surveys "have found that most young Khalaj parents do not pass the language on to their children; <b>only 5% of families teach their children the language</b>". Nineteen thousand speakers in 2018, and a generation behind them that mostly will not have it.`],
          t:[["11th c.","Al-Kashgari's Khalaj examples — largely interchangeable with modern forms"],
             [". 14th–18th c.","The Khalaj settle in western Iran; Persian takes over everything outside the village"],
             ["1940","Minorsky's 'The Turkish Dialect of the Khalaj' appears"],
             ["1978–1988","Doerfer's grammar and dialectology"],
             ["2018","19,000 speakers; 5% of families transmitting"]],
          kids:[] }
       ] }

    ] },

 ]
};

/* ---------- schematic outline (simplified, embedded; [lng,lat] rings) ----------
   Drawn by hand for this atlas. This is the WIDEST extent in the series —
   Istanbul to Yakutsk — so the geometry is necessarily the coarsest: six broad
   blocks standing in for Europe, the Caucasus–Volga corridor, Central Asia and
   Iran, Siberia, the Altai–Sayan region and the Xinjiang–Gansu–Mongolia belt.
   Not a coastline survey, and deliberately not one — see the sketch caption. */
const EUROPE = [[19.0,48.5],[24.0,47.5],[30.0,45.5],[36.0,44.0],[42.0,42.5],[44.0,39.5],[40.0,36.5],[34.0,35.5],[28.0,36.5],[23.0,39.0],[20.0,43.0],[19.0,48.5]];
const CAUCASUS_VOLGA = [[38.0,47.0],[46.0,49.5],[54.0,51.0],[60.0,56.0],[62.0,61.0],[58.0,63.0],[52.0,60.0],[46.0,55.0],[42.0,51.0],[38.0,47.0]];
const CENTRAL_ASIA = [[44.0,41.0],[52.0,43.0],[60.0,45.5],[70.0,48.0],[80.0,50.0],[86.0,46.0],[84.0,40.5],[76.0,37.0],[68.0,35.5],[58.0,33.0],[52.0,29.0],[46.0,31.5],[43.0,36.0],[44.0,41.0]];
const SIBERIA = [[58.0,64.0],[66.0,68.0],[76.0,72.0],[90.0,75.5],[106.0,77.0],[122.0,74.5],[138.0,73.0],[154.0,71.0],[164.0,67.0],[168.0,61.0],[160.0,55.5],[148.0,52.0],[134.0,50.0],[120.0,49.0],[106.0,50.5],[92.0,53.0],[76.0,56.0],[62.0,60.0],[58.0,64.0]];
const ALTAI_SAYAN = [[80.0,55.5],[92.0,56.5],[99.0,53.0],[98.0,48.5],[90.0,47.0],[82.0,49.0],[80.0,55.5]];
const XINJIANG_GANSU = [[74.0,47.5],[88.0,49.0],[100.0,48.0],[112.0,47.0],[124.0,46.5],[132.0,43.5],[128.0,40.5],[114.0,39.5],[102.0,38.5],[96.0,35.5],[86.0,36.5],[76.0,40.0],[74.0,44.0],[74.0,47.5]];
const TURKIC_GEO = { type:'FeatureCollection', features:[EUROPE,CAUCASUS_VOLGA,CENTRAL_ASIA,SIBERIA,ALTAI_SAYAN,XINJIANG_GANSU].map(r=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };

/* ---------- approximate "core areas" ----------
   Hand-drawn coarse blocks showing roughly where each branch is rooted — NOT
   surveyed boundaries. At this extent they are very rough indeed: the Kipchak
   and Common Turkic blocks in particular stand for a dialect continuum that
   shades across half of Eurasia, and the marker layer is the factual one. */
const AREAS = {
 'c-anc':[[[20.0,48.0],[60.0,56.0],[100.0,54.0],[140.0,62.0],[165.0,64.0],[150.0,52.0],[120.0,48.0],[80.0,42.0],[46.0,38.0],[24.0,40.0]]],
 'c-com':[[[30.0,44.0],[62.0,52.0],[100.0,50.0],[140.0,60.0],[164.0,62.0],[150.0,50.0],[118.0,45.0],[80.0,40.0],[48.0,36.0],[32.0,38.0]]],
 'c-ogh':[[[43.0,59.5],[56.0,60.0],[62.0,55.0],[58.0,50.0],[48.0,49.5],[43.0,53.0]]],
 'c-ogx':[[[27.0,48.5],[40.0,51.0],[52.0,50.0],[56.0,45.0],[48.0,42.5],[38.0,44.0],[28.0,45.0]]],
 'c-ogz':[[[26.0,41.0],[40.0,42.0],[52.0,44.0],[62.0,41.0],[64.0,37.0],[52.0,36.0],[40.0,37.5],[28.0,38.0]],
           [[34.0,36.5],[40.0,37.0],[42.0,35.0],[38.0,33.5],[34.0,34.5]]],
 'c-kar':[[[58.0,44.0],[74.0,46.5],[86.0,45.0],[90.0,40.0],[80.0,36.5],[66.0,37.0],[58.0,40.0]]],
 'c-kip':[[[30.0,49.0],[46.0,52.0],[58.0,53.0],[72.0,54.0],[82.0,50.0],[76.0,44.0],[62.0,43.0],[48.0,45.0],[36.0,46.5]]],
 'c-sib':[[[60.0,62.0],[80.0,68.0],[100.0,70.0],[120.0,69.0],[140.0,68.0],[160.0,66.0],[162.0,60.0],[142.0,55.0],[118.0,52.0],[96.0,53.0],[78.0,56.0],[62.0,58.0]],
          [[86.0,55.0],[96.0,56.0],[99.0,50.0],[92.0,47.5],[84.0,49.5]]],
 'c-arg':[[[33.6,35.2],[35.6,34.9],[35.4,33.8],[34.0,33.9]]],
 'c-his':[[[88.0,50.5],[106.0,52.0],[118.0,49.0],[112.0,44.5],[96.0,45.0],[88.0,47.0]],
          [[56.0,42.5],[74.0,45.0],[84.0,43.0],[80.0,37.5],[62.0,36.0],[56.0,39.0]]]
};

/* ---------- listen links: an Omniglot page where one exists, plus the engine's
   YouTube-search fallback on every node. Omniglot coverage for this family is
   twenty pages and the URLs were measured, not assumed, on 2026-09-27 — see
   research.md, TK-110 "Link health", which records that four expected pages do
   not exist (tuvan, karakalpak, crimean tatar, and Old Turkic under that name). */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 turkic:       [['Turkic — Omniglot family index', OM+'langfam.htm'], ['Turkish — Omniglot', OM+'turkish.htm']],
 prototurkic:  [],
 oghuric:      [['Chuvash — Omniglot', OM+'chuvash.htm']],
 chuvash:      [['Chuvash — Omniglot', OM+'chuvash.htm']],
 bulgar:       [],
 khazar:       [],
 common:       [['Turkic — Omniglot family index', OM+'langfam.htm']],
 oldturkic:    [['Orkhon runiform script — Omniglot', OM+'orkhon.htm']],
 oghuz:        [['Turkish — Omniglot', OM+'turkish.htm'], ['Azerbaijani — Omniglot', OM+'azeri.htm'], ['Turkmen — Omniglot', OM+'turkmen.htm']],
 turkish:      [['Turkish — Omniglot', OM+'turkish.htm']],
 azerbaijani:  [['Azerbaijani — Omniglot', OM+'azeri.htm']],
 turkmen:      [['Turkmen — Omniglot', OM+'turkmen.htm']],
 gagauz:       [['Gagauz — Omniglot', OM+'gagauz.htm']],
 salar:        [['Salar — Omniglot', OM+'salar.htm']],
 karluk:       [['Uyghur — Omniglot', OM+'uyghur.htm'], ['Uzbek — Omniglot', OM+'uzbek.htm']],
 uzbek:        [['Uzbek — Omniglot', OM+'uzbek.htm']],
 uyghur:       [['Uyghur — Omniglot', OM+'uyghur.htm']],
 ili:          [],
 chagatai:     [],
 kipchak:      [['Kazakh — Omniglot', OM+'kazakh.htm'], ['Tatar — Omniglot', OM+'tatar.htm']],
 kazakh:       [['Kazakh — Omniglot', OM+'kazakh.htm']],
 kyrgyz:       [['Kyrgyz — Omniglot', OM+'kyrgyz.htm']],
 tatar:        [['Tatar — Omniglot', OM+'tatar.htm']],
 bashkir:      [['Bashkir — Omniglot', OM+'bashkir.htm']],
 karakalpak:   [],
 nogai:        [['Nogai — Omniglot', OM+'nogai.htm']],
 crimeantatar: [],
 siberian:     [['Yakut — Omniglot', OM+'yakut.htm'], ['Khakas — Omniglot', OM+'khakas.htm']],
 sakha:        [['Yakut — Omniglot', OM+'yakut.htm']],
 dolgan:       [['Dolgan — Omniglot', OM+'dolgan.htm']],
 tuvan:        [],
 tofa:         [['Tofa — Omniglot', OM+'tofa.htm']],
 khakas:       [['Khakas — Omniglot', OM+'khakas.htm']],
 altai:        [['Altay — Omniglot', OM+'altay.htm']],
 wyugur:       [],
 fuyukyrgyz:   [],
 arghu:        [['Khalaj — Omniglot', OM+'khalaj.htm']],
 khalaj:       [['Khalaj — Omniglot', OM+'khalaj.htm']]
};

/* ---------- ISO 639 codes, all read from infoboxes ----------
   `turkic` carries the ISO 639-5 family code trk. Branch nodes and Proto-Turkic
   have no ISO 639-3 code of their own. Fuyu Kyrgyz has none because ISO
   registers it as a dialect of Khakas — the note is on the node. */
const ISO = {
 turkic:'trk', chuvash:'chv', bulgar:'xbo', khazar:'zkz', oldturkic:'otk',
 turkish:'tur', azerbaijani:'aze (azj / azb)', turkmen:'tuk', gagauz:'gag', salar:'slr',
 uzbek:'uzb (uzn / uzs)', uyghur:'uig', ili:'ili', chagatai:'chg',
 kazakh:'kaz', kyrgyz:'kir', tatar:'tat', bashkir:'bak', karakalpak:'kaa', nogai:'nog', crimeantatar:'crh',
 sakha:'sah', dolgan:'dlg', tuvan:'tyv', tofa:'kim', khakas:'kjh', altai:'alt / atv',
 wyugur:'ybe', fuyukyrgyz:'— (a Khakas dialect in ISO)',
 khalaj:'klj'
};

/* ---------- "What makes it distinctive" — two to four bullets per node ---------- */
const FEATURES = {
 turkic:[
  '<b>Two branches, not five:</b> Oghuric and Common Turkic. The five familiar groups are all inside the second.',
  '<b>Defined by sound correspondence, not geography:</b> Common Turkic <i>z</i> and <i>š</i> where Oghuric has <i>r</i> and <i>l</i>.',
  '<b>A dialect continuum,</b> not a set of bounded languages — the map\'s edges are conventions.',
  '<b>No grammatical gender</b>, consistent SOV order, and vowel harmony throughout.'
 ],
 prototurkic:[
  '<b>Unattested.</b> No text survives; every form in the literature is marked with an asterisk.',
  '<b>Dated across a 2,500-year window</b> by different sources — c. 3000–500 BC in one, the 2nd millennium BC for the Oghur split in another.',
  '<b>Placed in East Asia,</b> from Mongolia to north-western China.'
 ],
 oghuric:[
  '<b>One living member.</b> Chuvash is all that remains of the branch that left first.',
  '<b>Only Bulgar is definitively Oghuric.</b> Hunnish, Khazar and Sabir are described as speculative inclusions.',
  '<b>Also called Lir-Turkic or r-Turkic</b>, against Common Turkic\'s Shaz-Turkic.',
  '<b>The split itself is unresolved:</b> parallel daughters of Proto-Turkic, or an earlier stage recorded late?'
 ],
 chuvash:[
  '<b>The only surviving Oghuric language</b> — a Turkic outlier six hundred years from its nearest relative.',
  '<b>738,150 speakers against 1.05 million ethnic Chuvash</b> (2020 census).',
  '<b>Keeps the Oghuric signature:</b> <i>r</i> for Common Turkic <i>z</i>, <i>l</i> for <i>š</i>.',
  '<b>Cyrillic ӑ and ӗ</b> exist for Chuvash and a handful of neighbours.'
 ],
 bulgar:[
  '<b>The one extinct language definitively placed in Oghuric.</b>',
  '<b>Two extinctions, two centuries apart:</b> the Danube by the 9th century, the Volga by the 14th.',
  '<b>Its Danube end became Slavic</b> — Old Church Slavonic replaced it, which is why Bulgaria speaks a Slavic language.',
  '<b>Its Volga end became Chuvash.</b>'
 ],
 khazar:[
  '<b>Classification disputed — in the source\'s own family field.</b>',
  '<b>The whole corpus:</b> two nouns, one conjugated verb, a few proper names.',
  '<b>The Kievan Letter\'s <i>OKHQURÜM</i></b> ("I read") is the most cited item; Guinness 1986 called this the "smallest literature" of any language.',
  '<b>Glottolog assigns it no code at all.</b>'
 ],
 common:[
  '<b>Called "a proposed genetic unit"</b> in the sources, not a settled one.',
  '<b>Five subgroups:</b> Oghuz, Kipchak, Karluk, Siberian and Arghu.',
  '<b>Shaz-Turkic:</b> the <i>z</i>/<i>š</i> half of the family\'s defining correspondence.',
  '<b>Competing classifications exist</b> — Samoylovich\'s and Baskakov\'s differ from Johanson\'s.'
 ],
 oldturkic:[
  '<b>The earliest attested Common Turkic</b>, on the Orkhon steles of the Second Turkic Khaganate.',
  '<b>Two scripts:</b> runiform for the steles, Old Uyghur alphabet for the manuscripts.',
  '<b>Dated from slightly before 720 AD to the 13th century</b> — not "the 8th century".',
  '<b>Not the trunk of the family:</b> filed under Siberian Turkic, and argued to be ancestral to Karluk and Kipchak rather than to all.'
 ],
 oghuz:[
  '<b>108 million speakers</b>, with Turkish, Azerbaijani and Turkmen above 95% of them.',
  '<b>"A clearly discernible and closely related bloc"</b> — Johanson, quoted in the source.',
  '<b>Its own ancestry is debated:</b> Orkhon/Old Uyghur is not its ancestor; "Western Türküt" speech may be.',
  '<b>Participial <i>-gan</i> → <i>-an</i></b>, voicing of stops, loss of q/ɣ after ɯ/u.'
 ],
 turkish:[
  '<b>About 38% of all Turkic speakers</b> — 85.2 million L1, 91.3 million in total.',
  '<b>One language, two alphabets in living memory:</b> Arabic script to 1928, Latin after.',
  '<b>Dotless ı and dotted i</b> carry the vowel-harmony contrast; <b>ğ</b> marks a lost velar.',
  '<b>Karamanli Turkish</b> was written in Greek characters — proof that script is not a property of a language.'
 ],
 azerbaijani:[
  '<b>Written three ways by three states:</b> Latin in Azerbaijan, Perso-Arabic in Iran, Cyrillic in Russia.',
  '<b>Half its speakers are outside the country it is named for.</b>',
  '<b>Two ISO codes:</b> azj (North) and azb (South), under the macrolanguage aze.',
  '<b>Two written standards named:</b> Shirvani in the north, Tabrizi in the south.'
 ],
 turkmen:[
  '<b>Eastern Oghuz</b> — the branch\'s bridge between Anatolia and Central Asia.',
  '<b>Three scripts at once:</b> Latin official, Perso-Arabic in Iran, Cyrillic in Russia.',
  '<b>Ten named dialects</b>, including the geographically odd Trukhmen of Stavropol.',
  '<b>6.8 million L1 speakers, 7.8 million in total.</b>'
 ],
 gagauz:[
  '<b>An Oghuz language in Orthodox Moldova</b>, descended from Old Anatolian and Ottoman Turkish.',
  '<b>Definitely Endangered (UNESCO)</b>, with a written language only since 1957.',
  '<b>80.6% of surveyed parents preferred Russian as the medium of instruction</b> — a policy outcome, not a preference for the language.',
  '<b>Greek and Cyrillic scripts historically</b>, Latin today.'
 ],
 salar:[
  '<b>The eastern outlier of Oghuz</b> — spoken on the upper Yellow River in Qinghai.',
  '<b>Written in Pinyin-based Latin and Chinese characters.</b> No traditional script.',
  '<b>70,000 speakers (2002)</b> against about 105,000 ethnic Salar; Vulnerable on the UNESCO atlas.',
  '<b>Traced to the Salur tribe</b>, inside China since the Tang dynasty.'
 ],
 karluk:[
  '<b>Two languages hold almost all of it:</b> Uzbek at about 44 million and Uyghur at 8–11 million.',
  '<b>A chain of written languages:</b> Karakhanid → Khorezmian Turkic → Chagatai.',
  '<b>Glottolog calls it "Turkestan"</b> and files Karakhanid with Old Turkic instead.',
  '<b>Its easternmost member, Ili Turki, is down to 30 families.</b>'
 ],
 uzbek:[
  '<b>The second-largest Turkic language</b> — about 35.9 million speakers.',
  '<b>Two ISO codes:</b> uzn for Northern, uzs for Southern Uzbek in Afghanistan.',
  '<b>Ancestry given in the infobox:</b> Karakhanid → Khorezmian Turkic → Chagatai.',
  '<b>Latin official, Cyrillic in daily use, Perso-Arabic abroad.</b>'
 ],
 uyghur:[
  '<b>Four alphabets:</b> UEY (Perso-Arabic), USY (Cyrillic), and two Latin systems, ULY and UYY.',
  '<b>Speaker figures are a range in the source</b> — 8–13 million (2021) — and the atlas keeps it.',
  '<b>Formerly called Eastern Turki</b> in English.',
  '<b>Äynu is listed here by the branch page</b> but is usually described as a mixed language with an Iranian core — both are recorded.'
 ],
 ili:[
  '<b>The speaker figure is "30 families"</b> (2007) — not thirty people.',
  '<b>A Kipchak substratum under a Karluk language</b>, tabulated feature by feature in the source.',
  '<b>Severely Endangered (UNESCO)</b>, with no official status in China or Kazakhstan.',
  '<b>Two different measurements:</b> 120 speakers (1980) and 30 families (2007).'
 ],
 chagatai:[
  '<b>The shared literary language of Central Asia for six centuries</b>, to the early 20th century.',
  '<b>Why Karluk has a written history</b> and the other branches mostly do not.',
  '<b>Written in Perso-Arabic throughout.</b>',
  '<b>Displaced by national standardisation</b>, not conquest — Uzbek and Uyghur each got their own norm.'
 ],
 kipchak:[
  '<b>About 30 million speakers</b>, spread from Bulgaria and Romania to China.',
  '<b>The *d → /j/ branch:</b> *<i>hadaq</i> becomes <i>ajaq</i>, "foot".',
  '<b>Diphthongs from final */ɡ/ and */b/:</b> *<i>taɡ</i> → <i>taw</i>, *<i>sub</i> → <i>suw</i>.',
  '<b>Four subgroups:</b> Kipchak–Bulgar, –Cuman, –Nogai and –Kyrgyz.'
 ],
 kazakh:[
  '<b>The largest Kipchak language</b> — 16.4 million speakers at the 2021 census.',
  '<b>Three scripts:</b> Cyrillic in daily use, a Latin alphabet being phased in, Perso-Arabic in China.',
  '<b>Official in Kazakhstan and in Russia\'s Altai Republic,</b> plus four autonomous units in China.',
  '<b>Kipchak–Nogai,</b> and highly intelligible with Nogai and Karakalpak.'
 ],
 kyrgyz:[
  '<b>"Very high mutual intelligibility" with Kazakh and Altay</b> — across two Kipchak subgroups.',
  '<b>Not related to Fuyu Kyrgyz,</b> despite the name; that node says so explicitly.',
  '<b>Four scripts in its history:</b> Old Turkic runiform, Perso-Arabic, Latin, Cyrillic.',
  '<b>5.6 million speakers</b>, including Pamiri Kyrgyz in Afghanistan and Pakistan.'
 ],
 tatar:[
  '<b>4.0 million L1 speakers</b> plus 810,000 L2 — the second-largest language in Russia by speakers.',
  '<b>A language that lost an alphabet to law:</b> a 1999 Latin-alphabet law overridden in 2002 and struck down in 2004.',
  '<b>Arabic → Latin (Jaꞑalif) → Cyrillic</b>, 1920s to 1939.',
  '<b>The Kryashens</b> — Christian Tatars with their own Ilminsky-devised Cyrillic since the 19th century.'
 ],
 bashkir:[
  '<b>Tatar\'s near-twin</b> — same subgroup, same ancestor (Ural-Volga Turki), same script set.',
  '<b>The vowel swap is what separates them:</b> mid and high vowels exchanged by raising and lowering.',
  '<b>Three conflicting numbers in one source:</b> 1.08 million speakers, ≈1.6 million in the lead, 1.57 million ethnic Bashkirs.',
  '<b>Bashkir-specific Cyrillic letters</b> — ҡ, ң, ө, ү, һ, ҫ, ә.'
 ],
 karakalpak:[
  '<b>An autonomous republic\'s language inside another country</b> — Karakalpakstan within Uzbekistan.',
  '<b>Its Latin orthography was reformed in 2009,</b> so 1990s and 2010s texts differ.',
  '<b>Kipchak–Nogai,</b> highly intelligible with Kazakh and Nogai.',
  '<b>871,970 speakers</b> (2023); Vulnerable on the UNESCO atlas.'
 ],
 nogai:[
  '<b>The Kipchak–Nogai group\'s namesake</b>, spoken in two districts of the north Caucasus.',
  '<b>Four script stages, with three Cyrillic revisions:</b> unwritten → Arabic 1926 → Latin 1928 → Cyrillic 1938, revised 1944 and 1960.',
  '<b>108,000 Nogais, 85,600 speakers</b> (2020 census); Definitely Endangered.',
  '<b>The first Nogai novel in Latin script appeared in 2014.</b>'
 ],
 crimeantatar:[
  '<b>One language across two Kipchak subgroups</b> — Cuman for the mountain dialects, Nogai for the steppe.',
  '<b>A Southern dialect already extinct</b>, listed as such in the infobox.',
  '<b>Its script history is the atlas\'s most contested:</b> a 1992 Latin alphabet never implemented; Cyrillic made sole permitted script after 2014.',
  '<b>The 1944 deportation</b> created the Uzbek communities that still hold a large share of its speakers.'
 ],
 siberian:[
  '<b>The branch that stayed home</b> — the largest territory in the family with the fewest speakers.',
  '<b>Where the earliest Turkic record sits:</b> Old Turkic is filed here by the sources.',
  '<b>Yenisei Turkic is split across Asia:</b> Khakas in Siberia, Western Yugur in Gansu, Fuyu Kyrgyz in Manchuria.',
  '<b>Glottolog splits it differently again</b>, into Central and North Siberian.'
 ],
 sakha:[
  '<b>The northernmost and easternmost Turkic language</b> — Mongolia to the Lena.',
  '<b>Low mutual intelligibility with other Turkic languages;</b> many cognates are unrecognisable when heard.',
  '<b>Distinct grammar:</b> converbs in <i>-(A)n</i>, the question enclitic <i>duo</i>.',
  '<b>The speaker figure is the weakest here:</b> ≈450,000 with an empty date field and Britannica as the only reference.'
 ],
 dolgan:[
  '<b>The northernmost node in the atlas</b> — above the Arctic Circle on Taymyr.',
  '<b>A Sakha-derived language with an Evenki name:</b> "Dolgan" means \'tribe on the middle reaches of the river\'.',
  '<b>Three dialects on a peninsula with no roads between them.</b>',
  '<b>5,346 speakers</b> (2020); Definitely Endangered.'
 ],
 tuvan:[
  '<b>The only Sayan Turkic language with a real speaker base</b> — 252,953 against Tofa\'s 67.',
  '<b>Its closest relative is moribund,</b> and the two form a dialect continuum.',
  '<b>The Steppe/Taiga division cuts through it:</b> Tozhu and Tere-Khöl are Taiga, the rest Steppe.',
  '<b>Tone in a non-tonal family:</b> phonemic pitch from lost consonants, as in Vietnamese and Chinese.'
 ],
 tofa:[
  '<b>67 speakers</b> (2020 census) — fewer than 40 in another recent estimate.',
  '<b>A dialect continuum with Tuvan</b> whose other end has a quarter of a million speakers.',
  '<b>A dual inclusive pronoun</b> — "you and me" as a distinct category.',
  '<b>A suffix /-sig/</b> that means \'smelling of —\' on any noun.',
  '<b>Vowel harmony is reported as eroding</b> — obsolescence visible in the grammar.'
 ],
 khakas:[
  '<b>61,000 Khakas, 29,010 speakers</b> — fewer than half.',
  '<b>Its dialects are administrative units, not linguistic ones</b>, per the source.',
  '<b>It contains Kamas Turk, extinct since the 1950s</b> — a dead dialect inside a living language.',
  '<b>The infobox files Fuyu Kyrgyz as its dialect;</b> this atlas gives that language its own node and says why.'
 ],
 altai:[
  '<b>Two family chains in one infobox:</b> Siberian Turkic <i>and</i> Kipchak, both shipped.',
  '<b>Two ISO codes:</b> atv for Northern Altai, alt for Southern Altai — one written standard, two varieties.',
  '<b>Called Oyrot before 1948.</b>',
  '<b>Glottolog gives it no code</b>, and its old one is marked "code retired".'
 ],
 wyugur:[
  '<b>A Yenisei Turkic language in Gansu</b> — the eastern end of a Siberian subgroup.',
  '<b>Not mutually intelligible with modern Uyghur</b>, despite being called "Yellow Uyghur".',
  '<b>Its neighbour Eastern Yugur is Mongolic,</b> not Turkic — one Chinese label, two unrelated languages.',
  '<b>Written in the Old Uyghur alphabet until the 19th century.</b>'
 ],
 fuyukyrgyz:[
  '<b>A Yenisei Turkic language in Manchuria,</b> thousands of kilometres from its relatives.',
  '<b>The result of a deportation:</b> Yenisei Kirghiz moved to the Nonni basin in 1761.',
  '<b>Not Kyrgyz,</b> despite the name — its own article says so.',
  '<b>10 speakers (2007) against 880 ethnic Fuyu Kyrgyz;</b> ISO files it as a Khakas dialect.'
 ],
 arghu:[
  '<b>The smallest branch of Common Turkic</b> — one language, in a cluster of Iranian villages.',
  '<b>Established as a branch by Doerfer,</b> against the earlier assumption that Khalaj was Azerbaijani.',
  '<b>Archaisms define it:</b> Proto-Turkic vowel length, word-initial *h, no *d > y.',
  '<b>Al-Kashgari recorded it in the 11th century</b>, and the forms still match.'
 ],
 khalaj:[
  '<b>Conservative and heavily Persianised at once.</b>',
  '<b>Perso-Arabic script</b> — one of only two such autonyms in this atlas.',
  '<b>Only 5% of families teach it to their children.</b>',
  '<b>Three dialects,</b> and speakers of the others regard Talx-āb as a different language.'
 ]
};

/* ===================== the atlas contract (languages.md §1.3) ===================== */
window.ATLASES = window.ATLASES || {};
window.ATLASES.turkic = {
  key: 'turkic',
  title:   { zh: '突厥语族', en: 'Turkic' },
  tagline: 'The steppe family at full extent — Orkhon steles to Yakutsk, one surviving Oghuric cousin on the Volga, and four alphabets for a single language',
  stats:   [['38', 'nodes in this atlas'], ['≈200 million', 'speakers, 2020'], ['35+', 'documented languages'], ['2', 'branches at the root']],
  palette: {
    anc: '#c9c2cf', com: '#8a7fd4', ogh: '#2fa8a0', ogx: '#6c7f86', ogz: '#e0575b',
    kar: '#4f8fd6', kip: '#e0a03a', sib: '#5fbf6a', arg: '#c77fd0', his: '#8b94a8'
  },
  legend:  [['anc','Proto-Turkic · the family'],['com','Common Turkic — the branch'],
            ['ogh','Oghuric — Chuvash, its one survivor'],['ogx','Extinct Oghuric · Bulgar and Khazar'],
            ['ogz','Oghuz — Turkish, Azerbaijani, Turkmen'],['kar','Karluk — Uzbek, Uyghur'],
            ['kip','Kipchak — Kazakh, Kyrgyz, Tatar'],['sib','Siberian — Sakha to Altai'],
            ['arg','Arghu — Khalaj'],['his','Historical stages — Old Turkic, Chagatai']],
  view:    { center: [60, 42], zoom: 2.6 },
  outline: { color: '#8a7fd4', fill: 'rgba(138,127,212,0.05)' },
  sketchGeo: TURKIC_GEO,
  captions: {
    note:   '● Markers show <b>representative localities</b> for the selected variety. This is the widest atlas in the series — <b>Istanbul to Yakutsk</b> — so markers are further apart here than anywhere else, and a single dot often stands for a whole province or republic. Clicking any node fits the map to that node’s markers, which is how Yakutia, Taymyr and Gansu are reached from the initial view.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — very coarse hand-drawn blocks at this scale. The Kipchak and Common Turkic blocks stand for a dialect continuum that shades across half of Eurasia, not for territories; the Yakut and Altai blocks are honest about being the only settlements in enormous empty regions. The marker layer is the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — six broad hand-drawn blocks standing in for Europe, the Caucasus–Volga corridor, Central Asia and Iran, Siberia, the Altai–Sayan region and the Xinjiang–Gansu–Mongolia belt. <b>This is the coarsest sketch in the series</b>, because the atlas covers a continent: it is a rough reminder of where things are, not a coastline survey. Markers sit at true coordinates. Works fully offline.'
  },
  fonts: ['Noto Serif', 'Noto Sans Arabic', 'Noto Serif SC'],
  filterPlaceholder: 'e.g. Turkish, Uyghur, Sakha, Chuvash, Khalaj…',
  listen: {
    om: 'https://www.omniglot.com/writing/langfam.htm',
    fv: 'https://forvo.com/languages/',
    search: 'Turkic language native speaker'
  },
  rootId: 'turkic',
  stages: ['prototurkic', 'oldturkic'],
  kinds: { root: 'The family', stage: 'Historical stage', branch: 'Branch / group', leaf: 'A language' },
  sources: 'Sources: L. Johanson & É. Á. Csató (eds.), <i>The Turkic Languages</i> (Routledge) for the five-way Common Turkic classification and the Oghuric/Common correspondence · T. Tekin, <i>A Grammar of Orkhon Turkic</i> (1968) · G. Clauson, <i>An Etymological Dictionary of Pre-Thirteenth-Century Turkish</i> · P. B. Golden, <i>Studies on the Peoples and Cultures of the Eurasian Steppes</i> (2011) for Oghuric, Bulgar and Khazar · G. Doerfer on Khalaj and the Arghu branch · M. Erdal, <i>A Grammar of Old Turkic</i> (2004) · A. Savelyev on Chuvash and the Bulgharic languages (2020) · the UNESCO <i>Atlas of the World’s Languages in Danger</i> for the Gagauz, Salar, Tatar, Bashkir, Karakalpak, Nogai, Sakha, Dolgan, Tuvan, Tofa, Ili Turki, Western Yugur and Fuyu Kyrgyz grades · Ethnologue and Glottolog for ISO 639-3 codes and counts. Three things in this atlas are deliberately not resolved: <b>Old Turkic is not drawn as the trunk of the family</b>, because the sources file it inside Siberian Turkic and argue that Orkhon/Old Uyghur is ancestral to Karluk and Kipchak rather than to all of Common Turkic; <b>Khazar’s branch is stated as disputed</b>, which is what its own infobox says, and its entire corpus is named rather than summarised; and <b>Bashkir’s own source gives two different speaker counts</b>, which the atlas shows instead of choosing. All three are recorded in research.md at TK-105, TK-109 and TK-111.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();

