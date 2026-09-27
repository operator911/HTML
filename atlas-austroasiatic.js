/* atlas-austroasiatic.js — Austroasiatic 南亚语系
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (see languages.md §1.3 for the contract,
 * §2.11 for this family's brief, and research.md §"Austroasiatic (Phase 7)"
 * for the evidence log — every load-bearing date and figure below is logged
 * there as AU-101 … AU-108).
 *
 * THE THING THIS ATLAS HAS TO GET RIGHT: the family is drawn WITHOUT a
 * Mon–Khmer node. The older two-way split — Mon–Khmer on one side, Munda on
 * the other — was abandoned in favour of a flatter classification around 2000,
 * so an atlas that still drew it would be twenty-five years out of date. Eleven
 * branches hang directly off the family, in Sidwell's order, and Munda is one
 * of them rather than half the family.
 *
 * Three further things this atlas is careful about:
 *  1. Vietnamese tones are drawn as what they are: two independent lost
 *     distinctions — initial-consonant voicing and final-consonant type —
 *     crossing to give six tones. Ruc shows the same change mid-way, with
 *     tone and register still coexisting; the two nodes are linked.
 *  2. Five scripts in this family were invented by members of the communities
 *     that speak them — Ol Chiki (1925), Sorang Sompeng (1936), Warang Citi
 *     (1950s), Mundari Bani (1949–1980) and Chong (2000/2010). All four Munda
 *     ones are now in Unicode. No other family in this series can match that.
 *  3. Three branches are NOT drawn — Nicobarese, Pakanic and Mang — because
 *     they fall outside a mainland-and-Munda scope. The root node names them.
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree =====================
   Eleven branches, ordered as Sidwell (2018) groups them — Vietic, Katuic and
   Bahnaric adjacent; Khmuic, Khasian and Palaungic adjacent; Aslian and Munda
   at the end. Sidwell's own Eastern / Northern / Southern groupings are NOT
   drawn as nodes: the source calls many of them tentative and possibly
   "linkages", so naming them would assert more than the evidence does. */
const DATA = {
 id:"austroasiatic", en:"Austroasiatic", zh:"南亚语系", py:"Nányà yǔxì", sp:"≈117 million, by estimate",
 region:"Mainland Southeast Asia and eastern India — from the Chota Nagpur Plateau to the Vietnamese coast, with outposts in southern China and down the Malay peninsula",
 cls:"c-anc",
 mk:[[21.03,105.85,"Hanoi — the northern edge of Vietic"],[16.46,107.59,"Huế — central Vietnam"],[11.56,104.92,"Phnom Penh — Khmer country"],[16.49,97.63,"Mawlamyine — Mon country"],[13.41,103.87,"Angkor — Old Khmer and its inscriptions"],[23.36,85.33,"Ranchi — the Chota Nagpur Plateau"],[25.57,91.88,"Shillong — Khasi country"],[4.45,101.35,"Perak — Semai country"],[19.89,102.14,"Luang Prabang — Khmu country"]],
 h:[`Austroasiatic is one of the world's primary language families, spoken by about <b>117 million people</b> across mainland Southeast Asia, eastern India and southern China. It is the family of <b>Vietnamese</b> and <b>Khmer</b>, the national languages of Vietnam and Cambodia — and those two, with <b>Mon</b>, are the only Austroasiatic languages with a long written history. Everything else in this atlas is a minority language somewhere, and many of them are small.`,
   `The shape of the family is lopsided in a way worth stating at the start. <b>More than two-thirds of all Austroasiatic speakers speak Vietnamese</b>, so the family's demographic centre is one language. Its linguistic diversity is elsewhere: in the highlands of Laos and central Vietnam, in the Malay peninsula's rainforests, and — unexpectedly — on the <b>Chota Nagpur Plateau</b> of eastern India, where the <b>Munda</b> languages are spoken. That last group is Austroasiatic in India because of a migration out of Indochina, which is where the Munda branch begins.`,
   `<b>Eleven of the family's branches are drawn here.</b> Three are deliberately left out, because they fall outside a mainland-and-Munda scope: <b>Nicobarese</b>, spoken in the Nicobar Islands in the Bay of Bengal; <b>Pakanic</b>, two small languages of Guangxi and Yunnan; and <b>Mang</b>, a single language of Yunnan and northern Vietnam with too little documented to draw honestly. Naming them here means a reader who knows the family does not have to wonder whether they were forgotten.`,
   `<b>One older picture of this family is deliberately not drawn.</b> Until about 2000 the standard account split Austroasiatic in two — <b>Mon–Khmer</b> on one side, <b>Munda</b> on the other. That bifurcation has since been abandoned in favour of a flatter classification, so no Mon–Khmer grouping appears here, and Munda stands as one branch among eleven rather than half the family.`],
 t:[["c. 3000–2000 BCE","Proto-Austroasiatic, in southern China or the Mekong valley"],
    ["c. 2500–2000 BCE","Sidwell's proposed locus: the Red River Delta"],
    ["c. 2000–1500 BCE","Proto-Munda speakers reach the Odisha coast from Indochina"],
    ["c. 611 CE","The earliest dated Khmer inscription — the script's starting point"],
    ["7th century CE","Old Mon first attested; the Mon–Burmese script family begins"],
    ["9th–15th c.","Old Khmer and the Angkor inscriptions"],
    ["1925","Raghunath Murmu invents Ol Chiki for Santali"],
    ["1936","Mangei Gomango creates Sorang Sompeng for Sora"],
    ["1950s","Lako Bodra invents Warang Citi for Ho"],
    ["1949–1980","Rohidas Singh Nag designs Mundari Bani"],
    ["2003","Santali enters India's Eighth Schedule"]],
 kids:[
  { id:"protoaa", en:"Proto-Austroasiatic", nat:"*Cau", zh:"原始南亚语", py:"Yuánshǐ Nányàyǔ", sp:"reconstructed; work still in progress",
    region:"Reconstructed — placed in southern China or the Mekong valley, and by Sidwell (2022) in the Red River Delta",
    cls:"c-his",
    mk:[[23.00,102.50,"The Mekong valley — one proposed homeland"],[21.03,105.85,"The Red River Delta — Sidwell's 2022 proposal"],[26.00,104.50,"Southern China — the other proposed homeland"]],
    h:[`Proto-Austroasiatic is a <b>reconstruction</b>, not a record. Its dating is given as <b>c. 3000 – c. 2000 BCE</b>, with a homeland in <b>southern China or the Mekong valley</b>; Sidwell (2022) narrows the locus to the <b>Red River Delta</b> around <b>2500–2000 BCE</b>. The range is repeated rather than reduced to a single date.`,
       `<b>Its reconstruction is unusually incomplete for a family this large.</b> The work that exists is mostly <i>Proto-Mon–Khmer</i> — everything except Munda — collected in Shorto's <i>Mon–Khmer Comparative Dictionary</i>. A full Proto-Austroasiatic reconstruction is still being assembled by Paul Sidwell, and <b>500 Proto-Austroasiatic etyma were published only in 2024</b>. So Proto-Austroasiatic stands for a language being recovered now, by living scholars.`,
       `What is reconstructed has the shape the family still shows: <b>implosive stops</b> (*ɓ, *ɗ), a tentative *ʄ added specifically to account for the <b>Katuic</b> languages, and eight vowels each of which occurs short or long. <b>A caveat worth knowing:</b> the <b>Munda, Khasi and Nicobarese</b> languages — three branches drawn in this atlas — are described as phonologically <i>innovative</i>, which makes them the <b>least useful</b> evidence for reconstructing this language. The branches that look most exotic are the least conservative witnesses to what it sounded like.`],
    t:[["c. 3000–2000 BCE","The broad window given for Proto-Austroasiatic"],
       ["c. 2500–2000 BCE","Sidwell's Red River Delta proposal"],
       ["1976–2006","Shorto's Mon–Khmer Comparative Dictionary is assembled and published"],
       ["2022","Sidwell proposes the Red River Delta locus"],
       ["2024","500 Proto-Austroasiatic etyma published"]],
    kids:[] },

  { id:"vietic", en:"Vietic", nat:"tiếng Việt–Mường", zh:"越语支", py:"Yuè yǔzhī", sp:"≈90 million, nearly all Vietnamese",
    region:"The Red River and Mekong deltas, the north-central highlands of Vietnam, and a strip across into Laos and Thailand",
    cls:"c-vie",
    mk:[[21.03,105.85,"Hanoi — the Vietnamese heartland"],[20.81,105.34,"Hòa Bình — Mường country"],[16.46,107.59,"Huế — Central Vietnamese"],[10.82,106.63,"Ho Chi Minh City — Southern Vietnamese"],[18.15,104.85,"Khamkeut, Laos — Thavung"],[17.75,106.05,"Quảng Bình — Ruc and the Chut villages"]],
    h:[`Vietic is the branch that <b>took over a country and lost its own diversity doing it</b>. It contains Vietnamese, the national language of Vietnam with about 86 million first-language speakers — and then a handful of small languages spoken in the hills behind it, several of them by only hundreds or dozens of people.`,
       `<b>Vietic is also why the birth of tone can be watched happening at all</b>: this is where linguists saw it. Proto-Vietic had <b>no tones at all</b>. Vietnamese has six, and they can be traced — step by step, with the intermediate stage still visible in a related language — to two distinctions that have since disappeared from the sounds around them. That story belongs to Vietnamese; its missing middle is <a href="#austroasiatic/ruc">Ruc</a>.`,
       `<b>Vietnamese and Mường form one sub-branch, Viet–Mường</b>, and the languages below them are the rest. The older literature called the small ones "Chut" — a group name covering <b>Arem, Ruc, Mày, Sách, Thavung and others</b> — and they are grouped together here because they preserve things Vietnamese lost. <b>Their speakers do not all use that name for themselves</b>, and where a name comes from the literature rather than from the community, the entry says so.`],
    t:[["c. 2000 BCE+","Proto-Vietic, in the Red River valley"],
       ["10th–14th c. CE","Vietnamese diverges from Mường"],
       ["1970s","Ruc and other Chut groups are settled into villages"],
       ["2016","Hòa Bình province adopts a 28-letter Mường alphabet"]],
    kids:[
     { id:"vietnamese", en:"Vietnamese", nat:"tiếng Việt", zh:"越南语", py:"Yuènán yǔ", sp:"≈86 million L1, 2019–2023",
       region:"The whole of Vietnam — the Red River delta, the central coast and the Mekong delta — plus large emigrant communities",
       cls:"c-vie",
       mk:[[21.03,105.85,"Hanoi — the northern standard"],[16.46,107.59,"Huế — the central dialects"],[10.82,106.63,"Ho Chi Minh City — the southern standard"],[16.05,108.22,"Đà Nẵng — mid-coast"]],
       h:[`Vietnamese is the largest Austroasiatic language by a wide margin — about <b>86 million first-language speakers</b>, which is <b>more than two-thirds of the entire family</b>. It is tonal, and written in a <b>Latin alphabet with nine diacritics</b>. Almost nothing about its surface looks Austroasiatic. Its tones are why it belongs in this atlas.`,
          `<b>The six tones, and where they came from.</b> Proto-Vietic had none. Two independent things then happened at the edges of syllables, and their combination produced the tones Vietnamese has today:`,
          `<table style="width:100%;border-collapse:collapse;font-size:.95em"><tr><th style="text-align:left;padding:.2em .4em"></th><th style="text-align:left;padding:.2em .4em">smooth ending</th><th style="text-align:left;padding:.2em .4em">glottal ending (-ʔ)</th><th style="text-align:left;padding:.2em .4em">fricative ending (-s, -h)</th></tr><tr><td style="padding:.2em .4em"><b>voiceless initial</b></td><td style="padding:.2em .4em">A1 <i>ngang</i> "level"</td><td style="padding:.2em .4em">B1 <i>sắc</i> "sharp"</td><td style="padding:.2em .4em">C1 <i>hỏi</i> "asking"</td></tr><tr><td style="padding:.2em .4em"><b>voiced initial</b></td><td style="padding:.2em .4em">A2 <i>huyền</i> "deep"</td><td style="padding:.2em .4em">B2 <i>nặng</i> "heavy"</td><td style="padding:.2em .4em">C2 <i>ngã</i> "tumbling"</td></tr></table>`,
          `Read the grid as a multiplication: <b>three syllable endings</b> across the top, <b>two kinds of initial consonant</b> down the side, and <b>six tones</b> in the cells. The final consonants then dropped away — but by then the pitch difference they had caused was carrying meaning on its own, so <b>the tones stayed after the sounds that made them vanished</b>. The voiced initials merged with the voiceless ones for the same reason, leaving only their pitch behind.`,
          `<b>Where the six tones are still audible as something else.</b> In the <b>northern</b> dialects, including Hanoi, the two registers are still distinguished mainly by <b>voice quality</b> — breathy or creaky against plain. In the <b>southern</b> dialects, including Ho Chi Minh City, it is mainly a difference of <b>pitch</b>. The same six tones are therefore carried by two different mechanisms depending on where you stand, and both are audible descendants of a distinction that no longer exists as a sound.`,
          `<b>And the tones no longer line up with their own causes.</b> Because the prefixes that once preceded these syllables were lost <i>after</i> the tone split, modern Vietnamese words beginning with a voiced fricative occur in <b>all six tones</b>, and words beginning with /l/ or /ŋ/ occur in <b>both registers</b>. That is exactly why the reconstruction had to be done from the outside in: the modern language alone does not show you its own history. <a href="#austroasiatic/ruc">Ruc</a> does.`,
          `<b>The writing system has two lives.</b> Vietnamese was written in <b>chữ Nôm</b>, a script built out of Chinese characters, for centuries; the <b>Latin alphabet in use today</b> descends from a seventeenth-century missionary transcription. It is one of the few cases in the world where a Latin orthography displaced an indigenous script and then became the vehicle for a national literature.`],
       t:[["c. 1000 CE","Vietnamese and Mường separate"],
          ["10th–13th c.","The tone split completes; six tones become phonemic"],
          ["17th c.","Alexandre de Rhodes and the Latin transcription"],
          ["19th–20th c.","chữ Nôm gives way to the Latin alphabet"],
          ["1945–","Quốc ngữ is the official script of an independent Vietnam"]],
       chips:[["six tones from lost consonants","scr"],["≈86 million speakers — over two-thirds of the family"]],
       kids:[] },


     { id:"muong", en:"Mường", nat:"thiểng Mường", zh:"芒语", py:"Máng yǔ", sp:"1.5 million, 2019 census",
       region:"The mountainous north-west of Vietnam — Hòa Bình, Thanh Hóa, Phú Thọ, Sơn La, Ninh Bình, Yên Bái",
       cls:"c-vie",
       mk:[[20.81,105.34,"Hòa Bình — the Mường heartland"],[19.80,105.78,"Thanh Hóa"],[21.40,105.22,"Phú Thọ"],[21.33,103.92,"Sơn La"]],
       h:[`Mường is Vietnamese's closest relative and its clearest control case. It has <b>the same six tones</b>, a similar monosyllabic structure and a large shared vocabulary — but it kept different parts of the old sound system, which is what makes it useful.`,
          `<b>It also has a hole in the tone system.</b> The <i>nặng</i> tone is present only in <b>Phú Thọ and Thanh Hóa</b> provinces; in <b>Hòa Bình</b>, the province most associated with Mường, it has <b>merged with <i>sắc</i></b>. So one of the six cells in the grid on the <a href="#austroasiatic/vietnamese">Vietnamese entry</a> is empty across a large part of Mường country — the same system, caught at a different stage.`,
          `<b>Mường may not be one language.</b> The sources describe the Mường dialects as <b>"not a single language, or even most closely related to each other"</b>, but rather an <b>ethnically defined group</b> — a name covering several varieties that are not one another's nearest relatives. It is drawn as one group here because the literature does, and that is said plainly.`,
          `<b>Its written form is recent.</b> Mường had <b>no alphabet</b> until the twentieth century, when scholars devised one from Vietnamese orthography. In <b>September 2016</b>, Hòa Bình province adopted an official alphabet of <b>28 letters and four tone marks</b> for use in schools. Four tone marks, six tones — the gap is in the source and this atlas does not invent the missing two.`],
       t:[["c. 1000 CE","Mường separates from Vietnamese"],
          ["20th c.","A provisional alphabet is devised from Vietnamese orthography"],
          ["2016","Hòa Bình province adopts a 28-letter Mường alphabet"]],
       chips:[["all six tones of Vietnamese","scr"],["nặng merged with sắc in Hòa Bình"]],
       kids:[] },

     { id:"chut", en:"Chut (the relic cluster)", nat:"—", zh:"哲语支", py:"Zhé yǔzhī", sp:"6 languages, several under 50 speakers",
       region:"The Vietnam–Laos border country — Quảng Bình, Hà Tĩnh and Nghệ An provinces and adjacent Laos",
       cls:"c-vie",
       mk:[[17.75,106.05,"Quảng Bình — Ruc and Mày country"],[18.15,104.85,"Khamkeut District, Laos — Thavung"],[16.25,107.30,"A Lưới, Huế — Arem country"],[17.16,104.15,"Sakon Nakhon, Thailand — a Thavung village cluster"]],
       h:[`This is the part of Vietic that <b>Vietnamese left behind</b>. The languages grouped here — <b>Arem, Ruc, Mày, Sách, Thavung</b> and others — are Austroasiatic in the most literal sense: they keep consonant clusters, prefixes and syllable shapes that Vietnamese long ago simplified away, and several of them are spoken by fewer than a hundred people.`,
          `<b>They are the reason linguists can reconstruct anything at all.</b> Vietnamese is a bad witness to its own past: it lost the evidence. A language like <a href="#austroasiatic/ruc">Ruc</a> kept the prefixes — including one used in loanwords that date to the Han period — and a language like <a href="#austroasiatic/thavung">Thavung</a> kept the breathy-versus-clear distinction that Vietnamese turned into tones. Put together, they let a scholar work backwards to Proto-Vietic, which is how the tone grid on the <a href="#austroasiatic/vietnamese">Vietnamese entry</a> was built.`,
          `<b>The group name is a convenience, not an identity.</b> "Chut" comes from the literature and from Vietnamese usage; the communities have their own names — Arem speakers call themselves <b>Cmbrau</b>. And even the grouping is soft: the source's own family tree writes <b>"Chut ?"</b>, with a question mark, against Arem. They are grouped here because these languages are best understood together, with the doubt marked rather than hidden.`,
          `<b>These are also the languages here a reader is least likely ever to have heard of, and they are not all equally close to the end.</b> Thavung has a few hundred speakers across two countries; Arem has <b>seven</b>. Both facts are given here.`],
       t:[["c. 1st millennium CE","The Chut varieties remain in the hills as Vietnamese spreads downriver"],
          ["1959","Arem is discovered by the Vietnamese military — previously assumed to be Bru"],
          ["late 1970s","Ruc and neighbouring groups are settled into fixed villages"],
          ["1985","A Soviet-Vietnamese expedition counts fewer than 200 Ruc"]],
       chips:[["preserves prefixes Vietnamese lost"],["Arem: 7 speakers, 2021","warn"]],
       kids:[

      { id:"thavung", en:"Thavung (Aheu)", nat:"พาซา โซ่", zh:"他文语", py:"Tāwén yǔ", sp:"700, 2007 — UNESCO Definitely Endangered",
        region:"Khamkeut District in Laos and three villages of Sakon Nakhon province in Thailand",
        cls:"c-vie",
        mk:[[18.15,104.85,"Khamkeut District, Laos"],[17.16,104.15,"Ban Nong Waeng, Sakon Nakhon — Thailand"],[17.30,104.20,"The other two Thai villages"]],
        h:[`Thavung — also called <b>Aheu</b>, and its speakers the <b>Phon Sung</b> — is spoken by a few hundred people in Laos and Thailand, on the wrong side of the mountains from the rest of Vietic. It is <b>Definitely Endangered</b>.`,
           `<b>What makes it valuable is what it does with breath.</b> Thavung makes a <b>four-way distinction between clear and breathy voice combined with glottalised final consonants</b>. That is a <i>register</i> system, not a tone system — and it is very close to what Proto-Vietic must have had before Vietnamese turned the same kind of distinction into six tones.`,
           `<b>And it resembles a branch it is not related to.</b> The sources note that this pattern "is very similar to the situation in the <b>Pearic</b> languages" — where the glottalisation sits in the vowel rather than at the end. <a href="#austroasiatic/pearic">Pearic</a> is a separate branch, hundreds of kilometres away. The resemblance is recorded without claiming contact: two languages can arrive at the same sound system separately.`,
           `<b>The numbers are small and old.</b> About <b>750 speakers in Thailand (1996)</b>, about <b>1,770 in Laos (2000)</b>, against a 2007 total of <b>700</b>. The figures disagree partly because they count different things, so all three are given as the sources give them.`],
        t:[["1996","≈750 speakers recorded in Thailand"],
           ["2000","≈1,770 speakers recorded in Laos"],
           ["2007","700 recorded; UNESCO lists it as Definitely Endangered"]],
        chips:[["four-way clear/breathy register","scr"],["Definitely Endangered"]],
        kids:[] },

      { id:"arem", en:"Arem", nat:"Cmbrau [cmrawˀ]", zh:"阿楞语", py:"Āléng yǔ", sp:"7 speakers, 2021",
        region:"A small area on both sides of the Laos–Vietnam border, in Quảng Bình and adjacent Laos",
        cls:"c-vie",
        mk:[[17.60,106.10,"The Arem area — Vietnam side"],[18.00,105.60,"The Laos side of the border"]],
        h:[`Arem has <b>seven speakers</b>. It is classified <b>Critically Endangered</b>, and it has a recorded population history that reads like an argument for counting people and speakers separately.`,
           `<b>It was not known to outsiders until 1959</b>, when the Vietnamese military found the community — local authorities had been treating them as part of a neighbouring <b>Bru</b> group. In <b>1960</b> the population was counted at <b>53 people: 30 men and 23 women</b>. A survey in <b>1999</b> found <b>102 Arem people</b>. The ethnic population has roughly doubled since the first count; <b>the number of speakers has gone the other way, to seven</b>. Both figures belong here, because the gap between them is the whole story.`,
           `<b>Its speakers call themselves Cmbrau</b> — and, as on the <a href="#austroasiatic/chut">Chut entry</a>, that is not the name the literature uses. "Arem" is an ethnographic label; "Umo", another name applied to them, means "cave".`,
           `Linguistically Arem is a Vietic language of the southern type: it has <b>glottalised final consonants like Thavung's</b>, and <b>presyllables</b> — the reduced syllables before a main one that Vietnamese lost entirely. Its own classification carries a question mark in the sources: the family tree writes <b>"Chut ?"</b>.`],
        t:[["1959","Discovered by the Vietnamese military"],
           ["1960","53 people counted — 30 men, 23 women"],
           ["1999","102 Arem people recorded"],
           ["2021","7 speakers"]],
        chips:[["7 speakers, 2021","warn"],["discovered by outsiders only in 1959"]],
        kids:[] },


      { id:"ruc", en:"Ruc", nat:"Rục", zh:"汝语", py:"Rǔ yǔ", sp:"a few hundred; critically endangered",
        region:"Tuyên Hóa district, Quảng Bình province, Vietnam — villages close to the Laotian border",
        cls:"c-vie",
        mk:[[17.75,106.05,"Tuyên Hóa district, Quảng Bình"],[18.00,105.70,"The border villages shared with the Sách"]],
        h:[`Ruc is the single most useful language here, and it has a few hundred speakers. Its name means <b>"underground spring"</b>, and it is classified as critically endangered.`,
           `<b>Why it matters.</b> Unlike Vietnamese, Ruc allows <b>presyllables</b> — reduced syllables with a minor vowel standing before the main one, as in <i>cakuː</i> "bear" against Vietnamese <i>gấu</i>. More importantly, Ruc <b>preserves many prefixes that Vietnamese lost entirely</b>, including a prefix (<b>*k-</b>) in <b>archaic Chinese loanwords</b>. Those prefixes are used in the <b>reconstruction of Old Chinese</b> — so a language spoken by a few hundred people in one Vietnamese district is evidence for the history of a language on the other side of the border, and the <a href="#sinitic/old">Old Chinese entry in the Sinitic atlas</a> is the other end of that thread.`,
           `<b>And it is where tone can be caught halfway.</b> Ruc has a <b>hybrid system in which tone and register coexist</b>: it has tones A1, A2, B1 and B2 grouped into rising and falling pairs, but it <b>still keeps the historical laryngeal final</b>, which shows register cues without a pitch contrast in tones C1 and C2. That places Ruc <b>"in an intermediate stage between register systems and fully tonal systems"</b>.`,
           `So the family gives a reader three points on one line: <a href="#austroasiatic/thavung">Thavung</a> has register and no tone; <b>Ruc has both at once</b>; <a href="#austroasiatic/vietnamese">Vietnamese</a> has tone and no register, with only the voice quality left over. That sequence is not an inference — it is three living languages, and this atlas draws all three.`,
           `<b>Its recent history is grim.</b> Ruc speakers were <b>hunter-gatherers until the late 1970s</b>, when the Vietnamese government settled them into fixed villages. The <b>1985 Soviet-Vietnamese Linguistic Expedition</b> found <b>no more than 200 Ruc people</b>. In the late 1980s <b>half of them died in a cholera epidemic</b>. The community lives today alongside the Sách, near the Laotian border.`],
        t:[["until late 1970s","Ruc speakers live as hunter-gatherers"],
           ["late 1970s","Settled into fixed villages by the Vietnamese government"],
           ["1985","The Soviet-Vietnamese Linguistic Expedition counts under 200 Ruc"],
           ["late 1980s","Cholera kills roughly half the community"]],
        chips:[["keeps *k- prefixes lost in Vietnamese","scr"],["register and tone coexist","scr"],["critically endangered","warn"]],
        kids:[] }
      ] },
    ] },

  { id:"katuic", en:"Katuic", zh:"戈都语支", py:"Gēdū yǔzhī", sp:"≈1.5 million across the branch",
    region:"The Annamite range and the Sekong–Sesan river country — eastern Laos, central Vietnam, and a western arm into Thailand",
    cls:"c-kat",
    mk:[[16.25,107.30,"A Lưới, Huế — Katu"],[15.35,106.70,"Sekong, Laos — the Katuic heartland"],[16.55,104.75,"Savannakhet — Bru country"],[14.70,107.85,"Đắk Tô, Kon Tum — Bru in Vietnam"],[15.60,105.50,"Salavan, Laos"]],
    h:[`Katuic is a branch of the Annamite highlands: <b>Katu, Bru, Kuy, Pacoh, Ta Oi</b> and their relatives, spoken across eastern Laos, central Vietnam and a strip of north-eastern Thailand. Most are small; <b>Bru is by far the largest</b>.`,
       `<b>The branch sits on the Lao–Vietnamese border, and its languages sit on both sides of it.</b> Katu is spoken in Laos <i>and</i> around Huế; Bru stretches from Salavan in Laos through Savannakhet into Thailand and down into Kon Tum. That means several of these languages have two orthographies — one built on Lao script, one on Vietnamese Latin — and the same speech community reads in two different systems.`,
       `<b>The Katuic languages are also where one of Proto-Austroasiatic's sounds survives.</b> The reconstructed proto-language includes an implosive *ʄ, and it is in Katuic that the evidence for it is best preserved — the reconstruction was extended specifically to account for this branch. A sound that exists nowhere in Vietnamese is still audible here.`,
       `<b>And the branch contains a counting problem.</b> Several of its languages are described as <i>dialect continua</i>, which means the boundary between "language" and "dialect" is a decision rather than a fact. <a href="#austroasiatic/bru">Bru</a> has six ISO codes for what one source calls a single continuum; all six are shown here, with the reason stated.`],
    t:[["c. 500–1500 CE","Katuic varieties spread through the Annamite range"],
       ["19th–20th c.","Lao and Vietnamese orthographies are devised for the same languages"],
       ["2005–","Sidwell's comparative work on the branch"]],
    chips:[["best evidence for Proto-Austroasiatic *ʄ","scr"]],
    kids:[
     { id:"katu", en:"Katu (Low Katu)", nat:"—", zh:"戈都语", py:"Gēdū yǔ", sp:"23,000 speakers; 61,588 people, 2009",
       region:"Eastern Laos and central Vietnam — including A Lưới district near Huế",
       cls:"c-kat",
       mk:[[16.25,107.30,"A Lưới district, Huế"],[15.35,106.70,"Sekong province, Laos"]],
       h:[`Katu is spoken in eastern Laos and central Vietnam, including <b>A Lưới district</b> near Huế — the same country as Vietnamese, and a different world from it. It is written in <b>Lao script on one side of the border and Latin on the other</b>.`,
          `<b>Two figures that do not match, and both belong here.</b> The language has <b>23,000 speakers (2005)</b>. The <b>2009 Vietnamese census</b> records <b>61,588 Katu people</b>. The gap is not a contradiction — one counts speakers of the language, the other counts members of the ethnic group — but a reader given only the larger number would form the wrong idea, so both are stated.`,
          `<b>Katu keeps a consonant that Vietnamese lost.</b> Along with its relatives it preserves the <b>implosive *ʄ</b> reconstructed for Proto-Austroasiatic — the sound whose evidence in this branch is why linguists added it to the proto-language's inventory at all.`,
          `Its dialects — <b>Triw, Dakkang, Kantu, Kalum</b> — are treated as one language here; "Katu" is also used for a wider group, and the sources distinguish <b>Low Katu</b> (this language) from the group it belongs to.`],
       t:[["2005","23,000 speakers recorded"],
          ["2009","61,588 Katu people counted in the Vietnamese census"]],
       chips:[["keeps the implosive *ʄ","scr"],["speakers vs. ethnic population differ sharply"]],
       kids:[] },

     { id:"bru", en:"Bru (Bruu)", nat:"—", zh:"布鲁语", py:"Bùlǔ yǔ", sp:"≈300,000, 1991–2006",
       region:"From Salavan in Laos north through Savannakhet and Khammouane into Thailand, and into Kon Tum province in Vietnam",
       cls:"c-kat",
       mk:[[15.60,105.50,"Salavan, Laos"],[16.55,104.75,"Savannakhet"],[17.40,104.80,"Khammouane"],[17.16,104.15,"Sakon Nakhon, Thailand"],[14.70,107.85,"Đắk Tô, Kon Tum — Vietnam"]],
       h:[`Bru is the largest Katuic language — about <b>300,000 speakers</b> spread across Laos, Thailand and Vietnam — and it is described not as a language but as a <b>dialect continuum</b>: neighbouring varieties shade into one another, and the boundaries between them are conventions.`,
          `<b>Six ISO codes for one continuum.</b> The sources assign <b>bru</b> (Eastern Bru), <b>brv</b> (Western Bru), <b>sss</b> (Sô), <b>xhv</b> (Khua), <b>ncq</b> (Northern Katang) and <b>sct</b> (Southern Katang). Two of those — <b>Sô and Khua</b> — the same sources describe as <i>dialects</i>. So all six codes are shown, because that is how the languages are catalogued and linked, and states plainly that the catalogue is finer-grained than the linguistics.`,
          `<b>The communities have their own names.</b> Alongside Bru: <b>Sô</b>, <b>Van Kieu</b> (Vân Kiêu), <b>Leu</b>, <b>Katang</b>, <b>Khua</b>. In Vietnam the group is usually known as <b>Vân Kiêu</b>; in Thailand, <b>Bru</b> or <b>Bruu</b>.`,
          `<b>It is written three ways.</b> Bru uses <b>Latin, Lao and Thai</b> scripts depending on which country a given community is in — one language, three orthographic worlds. Omniglot has no page for Bru under any name tried, so there is nothing to link to.`],
       t:[["1991–2006","Speaker counts recorded across the three countries"],
          ["2012","Western Bru dialects documented in Thailand"]],
       chips:[["six ISO codes for one continuum"],["written in Latin, Lao and Thai","scr"]],
       kids:[] }
    ] },


  { id:"bahnaric", en:"Bahnaric", zh:"巴拿语支", py:"Bānà yǔzhī", sp:"≈40 languages; the branch's largest are in Vietnam",
    region:"The central highlands of Vietnam and adjacent Laos and Cambodia — Gia Lai, Kon Tum, Đắk Lắk and the Bolaven plateau",
    cls:"c-bah",
    mk:[[14.35,108.00,"Kon Tum — Bahnar and Sedang country"],[13.98,108.00,"Pleiku, Gia Lai"],[12.67,108.05,"Đắk Lắk"],[15.10,105.80,"The Bolaven plateau, Laos"]],
    h:[`Bahnaric is the branch of the <b>central Vietnamese highlands</b> — a large group of languages spoken by communities known in Vietnam as the <b>Bahnar, Sedang, Jeh, Halang, Hrê, Mnong</b> and others, in Gia Lai, Kon Tum and Đắk Lắk provinces and across the Lao and Cambodian borders.`,
       `<b>The branch is known among linguists for one thing above all: its vowels.</b> Several North Bahnaric languages carry <b>large inventories of vowel phonations</b> — plain, nasalised and creaky versions of the same qualities — and one of them has been proposed for a world record. That claim is drawn on <a href="#austroasiatic/sedang">Sedang</a>, with the caveat the sources attach to it.`,
       `<b>This is also a branch where the writing came late and from outside.</b> Bahnar and Sedang are written in <b>Latin alphabets adapted from Vietnamese orthography</b>, devised for them rather than by them. The contrast with the <a href="#austroasiatic/munda">Munda branch</a> — where four scripts were invented by their own speakers — is one of the sharpest in the family, and both branches say so.`,
       `Bahnaric is drawn here with <b>two of roughly forty languages</b>. Mnong, Koho, Stieng, Hrê and the rest are not drawn; the ones left out are named here so their absence is visible.`],
    t:[["1960s–70s","North Bahnaric vowel systems documented in detail"],
       ["1975–","Bahnar and Sedang orthographies based on Vietnamese Latin come into use"]],
    kids:[
     { id:"bahnar", en:"Bahnar (Ba-Na)", nat:"—", zh:"巴拿语", py:"Bānà yǔ", sp:"160,000 in Vietnam, 1999 census",
       region:"Gia Lai and Kon Tum provinces — the towns of Kon Tum, Pleiku, An Khê and K'Bang",
       cls:"c-bah",
       mk:[[14.35,108.00,"Kon Tum"],[13.98,108.00,"Pleiku, Gia Lai"],[13.95,108.65,"An Khê"],[14.20,107.80,"K'Bang district"]],
       h:[`Bahnar is one of the larger highland languages of Vietnam — about <b>160,000 speakers</b> in Gia Lai and Kon Tum provinces. It is written in a <b>Latin alphabet adapted from Vietnamese</b>, and it has enough public presence to appear on <b>road signs</b>.`,
          `<b>Its sound system is the branch's signature.</b> Bahnar has <b>nine vowel qualities with phonemic length</b> — that is, each quality can be short or long and the difference changes the word. Its relative <a href="#austroasiatic/sedang">Sedang</a> takes the same machinery further still.`,
          `<b>A small internal disagreement in the sources, left standing.</b> One account calls Bahnar <b>North Bahnar</b>; the same article's opening sentence calls it a <b>Central Bahnaric</b> language. Both appear on one page, and both are repeated here rather than quietly choosing between them — Bahnar is a well-documented language whose classification is still being refined, which is normal in a branch this size.`,
          `<b>It has many varieties.</b> The sources list well over a dozen Bahnar subgroups by district and river — Kon Tum, Jơlong, Golar, Tosung, Tơ Lô, Krem and more — some of them descended from people who moved generations ago. One group traces itself to <b>Tây Sơn soldiers</b> who fled the Nguyễn dynasty about two hundred years ago and settled far to the south-east.`],
       t:[["1999","160,000 speakers recorded in Vietnam"],
          ["1979","Bahnar dictionary published for the Plei Bong–Mang Yang dialect"],
          ["2000s","Bahnar appears on public signage in Kon Tum"]],
       chips:[["nine vowel qualities with length","scr"],["written in Latin adapted from Vietnamese","scr"]],
       kids:[] },


     { id:"sedang", en:"Sedang", nat:"Rơtéang", zh:"色当语", py:"Sèdāng yǔ", sp:"98,000, 2007",
       region:"Kon Tum province in Vietnam and eastern Laos — Kon Tum, Quảng Nam, Quảng Ngãi, Đắk Lắk",
       cls:"c-bah",
       mk:[[14.35,108.00,"Kon Tum"],[15.12,108.80,"Quảng Ngãi"],[14.70,107.60,"Đắk Lắk and the Lao border"]],
       h:[`Sedang is the largest <b>North Bahnaric</b> language, with about <b>98,000 speakers</b> — and it is famous among linguists for its vowels.`,
          `<b>The claim, stated as the sources state it.</b> Sedang has <b>24 pure vowels</b>: <b>seven vowel qualities</b>, each of which can be <b>plain, nasalised or creaky</b>. Add diphthongs — between <b>33 and 55</b> of them depending on the analysis — and the language has <b>up to fifty vowel sounds</b>. It is therefore "sometimes claimed to have the <b>largest vowel inventory in the world</b>".`,
          `<b>That claim is not made here.</b> The same source immediately qualifies it: other Bahnaric languages have <b>more vowel qualities</b> (Bahnar has nine) alongside phonemic length, so <b>"the language with the record depends closely on how the languages are described and distinct vowels are defined"</b>. The figures given here are the 24, the range of diphthongs and the caveat. A contested superlative reported as contested is worth more to a reader than a headline, and this series does not crown world records it cannot defend.`,
          `<b>What is not in doubt is the mechanism.</b> Sedang's vowels differ by <b>phonation</b> — whether the voice is plain, nasal or creaky — which is a <i>register</i>-type distinction rather than a tonal one. It is the same family of sound change that gives Vietnamese its tones and Thavung its breathy register, arriving somewhere else entirely.`,
          `<b>It is also written from outside.</b> Sedang uses a <b>Latin alphabet modified from Vietnamese</b>. It is one of the largest Austroasiatic languages with no script of its own — against four Munda languages that have one invented by a speaker.`],
       t:[["1967–75","Smith's phonological and grammatical work on Sedang is published"],
          ["2007","98,000 speakers recorded"]],
       chips:[["24 pure vowels, 33–55 diphthongs","scr"],["a world record claim the sources qualify","warn"]],
       kids:[] }
    ] },

  { id:"pearic", en:"Pearic", zh:"比尔语支", py:"Bǐ'ěr yǔzhī", sp:"6 languages, all endangered",
    region:"Western Cambodia and south-eastern Thailand — the Cardamom country and the Chanthaburi hills",
    cls:"c-pea",
    mk:[[13.35,105.05,"Preah Vihear — Pear country"],[12.71,104.89,"Kampong Thom"],[12.61,102.10,"Chanthaburi, Thailand — Chong"],[12.24,102.51,"Trat — the Kasong dialect"]],
    h:[`Pearic is a small branch of western Cambodia and south-eastern Thailand, and it is <b>the branch that kept what Khmer lost</b>. Its languages preserve consonant clusters, final consonants and register distinctions that Old Khmer had and modern Khmer does not — which makes them, like the <a href="#austroasiatic/chut">Chut languages</a> on the other side of the family, disproportionately useful to linguists and disproportionately close to disappearing.`,
       `<b>All of it is endangered.</b> Pear has about <b>1,670 speakers</b> in three or four villages. Chong has about <b>500</b>, and is reported to have none left in Cambodia at all. The branch's other members — Samre, Sa'och, Somray, Suoy — are smaller still.`,
       `<b>And its names need handling.</b> "Pear" is a term from the Khmer social order rather than a self-designation, and it survives in the literature because there is no settled replacement. "Chong" covers <b>two languages</b> in one label. The names used here are the ones a reader will find in sources, with what each actually is said plainly.`,
       `<b>One thing this branch has that no other here does: a script made for it this century.</b> <a href="#austroasiatic/chong">Chong</a> was given a writing system by researchers in Thailand — and, unusually for a small endangered language, it is now the subject of a <b>revitalisation programme</b>.`],
    t:[["c. 600–800 CE","Pearic varieties diverge from the Khmer side of the family"],
       ["2000–2010","A Chong writing system is created in Thailand"],
       ["2007","Bradley reports no remaining Chong speakers in Cambodia"]],
    chips:[["preserves clusters Khmer lost"],["every member endangered","warn"]],
    kids:[


     { id:"pear", en:"Pear (Por)", nat:"—", zh:"比尔语", py:"Bǐ'ěr yǔ", sp:"1,670, 2011",
       region:"Three or four villages in Rovieng district, Preah Vihear province, Cambodia",
       cls:"c-pea",
       mk:[[13.35,105.05,"Rovieng district, Preah Vihear"],[12.71,104.89,"Kampong Thom — the most divergent variety"]],
       h:[`Pear is spoken in <b>three or four villages</b> of northern Cambodia by about <b>1,670 people</b>, and it is the most divergent member of its own branch.`,
          `<b>Its name needs a sentence, and the sources give one.</b> "Pear" is <b>"a pejorative term for the historical slave caste of the Khmer, but nonetheless is the usual term in the literature"</b>. There is no settled alternative to use instead. The name used here is the one a reader will find in sources, with what it actually means said plainly — the same judgement that applies to several names in this family, and one worth making explicitly rather than silently.`,
          `<b>Why it matters despite the small numbers.</b> The variety spoken around <b>Kampong Thom</b> is described as the <b>most divergent Pearic language</b>, which means it sits furthest from Khmer on the branch's internal tree. A language of 1,670 speakers is carrying a division of the family that nothing else preserves.`,
          `Pearic as a whole is described in terms of what it <b>keeps</b>: clusters, final consonants and register features that modern Khmer simplified away. That is the same relationship Vietnamese has with <a href="#austroasiatic/ruc">Ruc</a> — a huge language and a tiny one, where the tiny one holds the history. Omniglot has no Pear page, so there is nothing to link to.`],
       t:[["2011","1,670 speakers recorded"],
          ["2009","Sidwell identifies the Kampong Thom variety as the branch's most divergent"]],
       chips:[["the branch's most divergent language"],["name is a term from the Khmer social order","warn"]],
       kids:[] },

     { id:"chong", en:"Chong (Samre)", nat:"ภาษาชอง", zh:"仲语", py:"Zhòng yǔ", sp:"500, 2007 — against an ethnic population of 2,000",
       region:"Chanthaburi and Trat provinces in eastern Thailand; formerly also Pursat province, Cambodia",
       cls:"c-pea",
       mk:[[12.61,102.10,"Chanthaburi, Thailand"],[12.24,102.51,"Trat — the Kasong dialect"],[12.53,103.92,"Pursat, Cambodia — reported empty of speakers"]],
       h:[`Chong is spoken by about <b>500 people</b> in eastern Thailand, out of an ethnic population of roughly <b>2,000</b>. In Cambodia, where it was also spoken, the sources report <b>no remaining speakers</b>.`,
          `<b>It is two languages wearing one name.</b> The sources say plainly that "Chong is actually <b>two languages, Western Chong and Central Chong or Samre</b>" — with the <b>Kasong</b> dialect of Trat belonging to the second. And several different Pearic languages are called "Chong" in the literature without being the same language.`,
          `<b>Its register system is unusual even here.</b> Chong has an <b>unusual four-way contrast in register</b> — the same kind of breath-and-voice distinction that <a href="#austroasiatic/thavung">Thavung</a> has at the other end of the family, in a branch that is not its relative.`,
          `<b>And it has a script — with two dates attached.</b> The sources say the writing system was "invented in <b>2010</b>" and also that Chong "had <b>no written form until 2000</b>, when researchers at <b>Mahidol University</b> used a simplified version of standard Thai characters to create" one, after which the first teaching materials appeared. <b>Both dates are given here</b>, attributed, because there is no way to tell which is right, and neither is pretended to be.`,
          `<b>A different yardstick from everywhere else here.</b> Chong's endangerment is reported on <b>Fishman's Graded Intergenerational Disruption Scale</b>, at <b>stage 7 of 8</b> — where 8 is nearest extinction. Everywhere else in this family the grade is UNESCO's. The two are not interchangeable, so the scale is named rather than left for a bare number to imitate the others.`,
          `<b>The one hopeful note here.</b> Chong is "currently the focus of a <b>language revitalisation project</b> in Thailand" — a rare thing to be able to say about any language here.`],
       t:[["2000","Mahidol University researchers create a Chong writing system"],
          ["2007","500 speakers recorded; Bradley reports none left in Cambodia"],
          ["2010","The script is dated to this year by one of its sources"],
          ["2010s","A revitalisation project begins in Thailand"]],
       chips:[["four-way register contrast","scr"],["script dated 2000 and 2010 in the same source","warn"],["GIDS stage 7 — a different scale"]],
       kids:[] }
    ] },


  { id:"khmuic", en:"Khmuic", zh:"克木语支", py:"Kèmù yǔzhī", sp:"≈10 languages in northern Laos and its borders",
    region:"Northern Laos above all, with arms into Yunnan, Vietnam and Thailand — the uplands of Luang Prabang, Oudomxay and Phongsali",
    cls:"c-khm",
    mk:[[19.89,102.14,"Luang Prabang — Khmu country"],[20.69,101.98,"Oudomxay"],[21.68,101.80,"Phongsali"],[19.35,104.55,"Tương Dương, Nghệ An — O'du"],[18.80,98.95,"Northern Thailand"]],
    h:[`Khmuic is a branch of the <b>uplands of northern Laos</b>. It is named after its largest member — <b>Khmu lends its name to the branch</b> — and it also contains <b>O'du, Ksingmul, Mlabri</b> and the group of small languages known as Phay-Pram.`,
       `<b>The branch sits at the centre of the family's internal debate about who is related to whom.</b> Khmu is often described as <b>most closely related to the Palaungic and Khasic languages</b>, which is why those three branches sit next to each other here rather than being scattered.`,
       `<b>The range inside the branch is extreme.</b> Khmu has about <b>798,000 speakers</b> and no standard written form; O'du has a few hundred speakers and is described as almost extinct. The same branch contains one of the family's largest minority languages and one of its smallest, and both are drawn here.`,
       `<b>And Khmuic is drawn here with two of roughly ten members.</b> Ksingmul, Mlabri and the Phay-Pram languages are not drawn — the ones left out are named here so their absence is visible, as the family entry does for the three branches omitted entirely.`],
    t:[["c. 1000 CE","Khmuic varieties established through the northern Lao uplands"],
       ["19th–20th c.","Khmu recorded in Lao, Thai and Latin scripts"],
       ["2000s","Khmu dialect surveys published"]],
    chips:[["most closely related to Palaungic and Khasic"],["Khmu has no standard variety","warn"]],
    kids:[
     { id:"khmu", en:"Khmu (Kmhmu)", nat:"ກຶມຫມຸ", zh:"克木语", py:"Kèmù yǔ", sp:"798,400, 1990–2015",
       region:"Northern Laos, with communities in adjacent Vietnam, Thailand and Yunnan",
       cls:"c-khm",
       mk:[[19.89,102.14,"Luang Prabang"],[20.69,101.98,"Oudomxay"],[21.68,101.80,"Phongsali"],[18.10,102.60,"Vientiane province"]],
       h:[`Khmu is the largest Austroasiatic language of Laos — about <b>798,400 speakers</b> in the north of the country and across its borders into Vietnam, Thailand and Yunnan. It gives its name to its branch.`,
          `<b>It has no standard form.</b> Khmu has <b>"several dialects but no standard variety"</b>, and the dialects differ in their consonant inventories, in whether they have register at all, and in how much they have absorbed from the national language around them. A language of nearly 800,000 speakers with no agreed written standard is unusual, and it is the reason Khmu appears in <b>Lao, Latin and Thai</b> scripts depending on where you are.`,
          `<b>It is a bridge between branches.</b> Khmu is "often cited as being most closely related to the <b>Palaungic</b> and <b>Khasic</b>" languages — the two branches drawn on either side of it here. That is why the tree puts Khmuic, Khasian and Palaungic together: it follows what the sources say about relatedness rather than what the map looks like.`,
          `<b>And it is one of the languages whose evidence for Proto-Austroasiatic has to be handled with care.</b> Along with Munda and Nicobarese, the Khasi side of this family is described as phonologically <b>innovative</b> — which means a language can be large, well documented and still a poor witness to what the proto-language sounded like.`,
          `<b>Its neighbour O'du is in the same branch and nearly gone</b> — see <a href="#austroasiatic/odu">O'du</a>.`],
       t:[["1990–2015","Speaker counts recorded across the four countries"],
          ["2002","Suwilai Premsrirat's classification of Khmu dialects"]],
       chips:[["798,400 speakers and no standard form","warn"],["written in Lao, Latin and Thai","scr"]],
       kids:[] },

     { id:"odu", en:"O'du (Ơ Đu, Iduh)", nat:"Ơ Đu", zh:"奥都语", py:"Àodū yǔ", sp:"950 by census; described as almost extinct",
       region:"Tương Dương district, Nghệ An province, Vietnam — with a few communities in Laos",
       cls:"c-khm",
       mk:[[19.35,104.55,"Tương Dương district, Nghệ An"],[19.60,103.80,"Across the border in Laos"]],
       h:[`O'du is a Khmuic language of <b>Nghệ An province in central Vietnam</b>, and it is described as <b>"almost extinct"</b>. It sits in the same branch as Khmu, which has nearly eight hundred thousand speakers — the whole range of this family in two languages.`,
          `<b>Two numbers, both from the sources, and the difference is the story.</b> Census figures give <b>950 speakers</b> across 1999 and 2005. A separate count records the language as <b>"once spoken by about 300 people"</b> in Tương Dương district specifically. One is a national census figure for the group; the other is an older count for one district. Both are given here rather than choosing whichever reads better.`,
          `<b>It has no script.</b> O'du is written, where it is written at all, in Vietnamese orthography — like <a href="#austroasiatic/sedang">Sedang</a> and <a href="#austroasiatic/bahnar">Bahnar</a>, it belongs to the side of this family whose writing came from outside. Omniglot has no O'du page under any name tried, so there is nothing to link to.`,
          `<b>Its name is spelled several ways</b> — O'du, Ơ Đu, Iduh — which is itself a sign of how little written material exists in it.`],
       t:[["1999","Census records the group at 950"],
          ["2005","A second census gives the same figure"],
          ["2010","Recorded as once spoken by about 300 people in Tương Dương district"]],
       chips:[["almost extinct","warn"],["950 by census, ≈300 in one district"]],
       kids:[] }
    ] },


  { id:"palaungic", en:"Palaungic", zh:"佤德昂语支", py:"Wǎ-Dé'áng yǔzhī", sp:"≈30 languages; Palaung and Wa are the largest",
    region:"The Shan State uplands of Myanmar, western Yunnan, and the Thai–Myanmar border — the Salween and upper Mekong country",
    cls:"c-pal",
    mk:[[22.93,97.75,"Lashio — Palaung country"],[24.35,98.55,"Santaishan, Yunnan — De'ang"],[22.10,99.20,"Bang Wai, Shan State — standard Wa"],[23.90,98.83,"Zhenkang, Yunnan — Vo Wa"],[20.30,99.10,"The Thai–Myanmar border — Palaung villages"]],
    h:[`Palaungic is the branch of the <b>Shan State uplands</b>, western Yunnan and the Thai border, in the country between the Salween and the upper Mekong. Its two largest members are <b>Palaung</b> (also called Ta'ang and De'ang) and <b>Wa</b>, and between them they account for most of the branch.`,
       `<b>This is a branch where language and statehood cut across each other.</b> <a href="#austroasiatic/wa">Wa</a> is the official language of an autonomous zone inside Myanmar and is listed by UNESCO as severely endangered at the same time. <a href="#austroasiatic/palaung">Palaung</a> is spoken by over half a million people across three countries and has no script of its own. Both facts stand together, with neither softened.`,
       `<b>Palaungic is where the tidy story breaks down hardest.</b> It sits beside Khmuic and Khasian in the tree because the sources relate them — but its speakers are in Myanmar, China and Thailand, not Laos or India, so the map and the classification do not line up. That is normal in this family and worth seeing.`,
       `Palaungic is drawn here with <b>two of roughly thirty languages</b>. Riang, Blang, Lamet, Man Met and the rest are not drawn; the ones left out are named here so their absence is visible.`],
    t:[["c. 1000 CE","Palaungic varieties spread through the Shan uplands"],
       ["1930s","A standard written Wa is established from a Bible translation"],
       ["2008–","Palaungic varieties classified by Shintani, Ostapirat and others"]],
    chips:[["map and classification disagree here"],["Wa is both a state language and severely endangered","warn"]],
    kids:[


     { id:"palaung", en:"Palaung (Ta'ang, De'ang)", nat:"ပလောင်ဘာသာ", zh:"德昂语", py:"Dé'áng yǔ", sp:"≈560,000, by source; components dated separately",
       region:"Shan State in Myanmar, western Yunnan in China, and a few villages in northern Thailand",
       cls:"c-pal",
       mk:[[22.93,97.75,"Lashio, Shan State"],[24.35,98.55,"Santaishan, Mangshi, Yunnan"],[23.90,98.83,"Zhenkang, Yunnan"],[20.30,99.10,"The Thai border"]],
       h:[`Palaung — called <b>Ta'ang</b> in Myanmar and <b>De'ang</b> in China — is spoken by over half a million people across three countries, and it is <b>not one language</b>. The Palaung are divided into three groups, <b>Palé (Ruching), Rumai and Shwe</b>, and each has its own speech.`,
          `<b>The speaker figures come apart, and that is shown here.</b> The headline is about <b>560,000</b>. The components are given separately: <b>150,000 Shwe speakers in 1982</b>, <b>272,000 Ruching in 2000</b> and <b>139,000 Rumai at an unrecorded date</b>. One of the three has <b>no date attached at all</b>, and they add up to more than the total. The pieces are given here, one of them flagged as undated, rather than rounded into a confident number.`,
          `<b>And it has no script of its own.</b> Palaung is written in <b>Burmese</b> and in <b>Tai Le</b> — the writing systems of its neighbours. This is a language with more speakers than most of Europe's minority languages and no orthography of its own, which is the opposite situation from the <a href="#austroasiatic/munda">Munda branch</a> at the other end of this family.`,
          `<b>The whole cluster is listed as severely endangered</b> despite the size of the numbers — because the endangerment applies to varieties within it, not to the total.`],
       t:[["1982","150,000 Shwe speakers recorded"],
          ["2000","272,000 Ruching (Palé) speakers recorded"],
          ["2012","Yan and Zhou classify the Chinese De'ang varieties"]],
       chips:[["three peoples, three languages","scr"],["Burmese and Tai Le script — none of its own","scr"],["severely endangered despite ≈560,000 speakers","warn"]],
       kids:[] },

     { id:"wa", en:"Wa (Va, Parauk)", nat:"—", zh:"佤语", py:"Wǎ yǔ", sp:"900,000, 2000–2008; 820,000 on a 1994 estimate",
       region:"Shan State in Myanmar — the 'Wa corridor' between the Salween and the Mekong — plus Yunnan, Laos and Thailand",
       cls:"c-pal",
       mk:[[22.10,99.20,"Bang Wai, northern Shan State — the standard"],[23.90,98.83,"Zhenkang, Yunnan — Vo"],[22.30,99.90,"Awa country"],[21.60,100.10,"The Chinese border area"]],
       h:[`Wa is spoken by about <b>900,000 people</b> — mostly in the Wa region of Shan State in Myanmar, with communities in Yunnan, Laos and Thailand. It is <b>not one variety</b>: the sources describe three, sometimes treated as separate languages.`,
          `<b>Three codes, one name.</b> The catalogue gives <b>Parauk</b> (the majority and standard form), <b>Vo</b> (about <b>40,000 speakers</b>) and <b>Awa</b> (about <b>100,000</b>). All three may be called Wa. And the totals disagree: the headline is <b>900,000</b>, while a 1994 estimate gives <b>820,000</b> — about a ten per cent spread. The range is given rather than averaged into a false precision.`,
          `<b>It is both official and endangered.</b> Wa is recognised as a <b>state language by the government of Wa State</b>, an autonomous zone within Myanmar — and it is classified as <b>Severely Endangered</b> by UNESCO. A language can have a government and still be losing its speakers, and Wa is where that shows.`,
          `<b>Diffloth's "Wa corridor".</b> The Wa region is described as a corridor <b>between the Salween and the Mekong</b> — a geographic unit with a linguist's name on it, running north–south through Shan State. The corridor is drawn because here the classification and the geography happen to coincide, which is not always true in this family.`,
          `<b>It has been written three ways.</b> Wa is written in <b>Latin</b> today, and formerly in <b>Chinese characters</b> and the <b>Shan script</b>. The standard written form grew out of a Bible translation based on the Bang Wai variety, which is why Christian Wa communities tend to support the standard and others do not.`],
       t:[["1930s","A standard written Wa is established from a Bible translation"],
          ["1994","Bradley estimates 820,000 Wa speakers in total"],
          ["2000–2008","900,000 speakers recorded across the three varieties"]],
       chips:[["three ISO codes — Parauk, Vo, Awa"],["a state language that UNESCO lists as severely endangered","warn"],["written in Latin, formerly Chinese and Shan","scr"]],
       kids:[] }
    ] },


  { id:"khmeric", en:"Khmeric (Khmer)", zh:"高棉语支", py:"Gāomián yǔzhī", sp:"one language, ≈20.5 million in total",
    region:"Cambodia, with large communities in eastern Thailand and the Vietnamese Mekong delta",
    cls:"c-kmr",
    mk:[[11.56,104.92,"Phnom Penh"],[13.41,103.87,"Siem Reap and Angkor"],[14.90,103.50,"Surin, Thailand — Northern Khmer"],[10.05,105.80,"The Vietnamese Mekong delta"]],
    h:[`Khmeric is a branch of <b>one language</b>: Khmer, the national language of Cambodia. Branches like this are unusual — most Austroasiatic branches contain several languages, and one of them contains forty — but Khmer has no close relatives left.`,
       `<b>It is one of the two Austroasiatic languages with a long written record</b>, and its script is the reason this branch matters beyond its own borders. Khmer has been written since at least the <b>seventh century</b>, and it is the ancestor of the writing systems used for <b>Thai, Lao</b> and several others.`,
       `<b>The language itself is not tonal</b>, like Mon — a reminder that "Southeast Asian" does not automatically mean "tonal", and that the tonal languages of the region got their tones from different sources.`,
       `<b>Khmer also exists outside Cambodia.</b> Large communities speak <b>Northern Khmer</b> in Surin and neighbouring Thai provinces, and Khmer Krom communities live in the Vietnamese Mekong delta — speakers of a national language who are minorities where they live.`],
    t:[["c. 611 CE","The earliest dated inscription in the Khmer script"],
       ["9th–15th c.","Old Khmer, the language of Angkor"],
       ["13th–14th c.","The Sukhothai script develops from Khmer — the ancestor of modern Thai"],
       ["19th–20th c.","Modern standardised Khmer orthography"]],
    chips:[["one language — the branch has no siblings"],["the ancestor of the Thai and Lao scripts","scr"]],
    kids:[


     { id:"khmer", en:"Khmer (Cambodian)", nat:"ភាសាខ្មែរ", zh:"高棉语", py:"Gāomián yǔ", sp:"≈20.5 million, L1 + L2, 2019–2024",
       region:"Cambodia above all; also eastern Thailand (Surin, Isan) and the Mekong delta in Vietnam",
       cls:"c-kmr",
       mk:[[11.56,104.92,"Phnom Penh"],[13.41,103.87,"Siem Reap — Angkor"],[14.90,103.50,"Surin, Thailand — Northern Khmer"],[10.05,105.80,"Mekong delta, Vietnam"]],
       h:[`Khmer is the national language of Cambodia: about <b>19.5 million first-language speakers</b> and a further <b>1 million</b> who speak it as a second language. It is the second-largest Austroasiatic language after Vietnamese, and — with Vietnamese and <a href="#austroasiatic/mon">Mon</a> — one of only three in the family with a long written history.`,
          `<b>Its script is the most consequential thing about it.</b> The Khmer script begins with an inscription dated <b>c. 611 CE</b> and descends from the <b>Pallava</b> script of southern India, by way of Brahmi and Tamil-Brahmi. From Khmer came the <b>Sukhothai</b> script — the ancestor of modern <b>Thai</b> — along with <b>Khom Thai</b>, the Khmer-derived hand used in Thai religious texts, and <b>Lai Tay</b>. Lao descends from the same line. So the writing systems of Thailand, Laos and Cambodia all trace back through this one script.`,
          `<b>The script is not simply "the source of Thai", though.</b> It is a <b>sister</b> of the Old Mon script, and both descend from Pallava. Khmer and Mon are two branches of the same Brahmic inheritance, which is why their scripts look related without one being a copy of the other. Both branches are drawn here, and each says so.`,
          `<b>Khmer is not tonal.</b> Like Mon, and unlike Vietnamese or Thai, it distinguishes words by vowel quality rather than by pitch. Its script carries an elaborate set of vowel signs and two series of consonants — the machinery for that distinction, inherited from Indian models.`,
          `<b>And it is not confined to Cambodia.</b> <b>Northern Khmer</b> (with its own ISO code, <i>kxm</i>) is spoken in Surin and eastern Thailand; Khmer Krom communities are in the Vietnamese Mekong delta. Both are marked here, because a national language spoken as a minority language elsewhere is exactly the situation this series tries to make visible.`],
       t:[["c. 611 CE","Earliest dated Old Khmer inscription"],
          ["9th–15th c.","Old Khmer under the Angkor empire; the script spreads"],
          ["13th–14th c.","Sukhothai develops from Khmer — the ancestor of Thai"],
          ["1953–","Modern Khmer is the official language of independent Cambodia"]],
       chips:[["script dated from c. 611 CE","scr"],["ancestor of the Thai and Lao scripts","scr"],["not tonal"]],
       kids:[] }
    ] },

  { id:"monic", en:"Monic", zh:"孟语支", py:"Mèng yǔzhī", sp:"2 languages — Mon and Nyah Kur",
    region:"Lower Myanmar and central Thailand, along the Andaman coast and the old Dvaravati country",
    cls:"c-mon",
    mk:[[16.49,97.63,"Mawlamyine — Mon State"],[17.34,96.48,"Bago"],[14.02,100.53,"Pathum Thani, Thailand — a Mon community"],[15.10,101.30,"The old Dvaravati country — Nyah Kur"]],
    h:[`Monic is a branch of <b>two languages</b>: Mon, once the language of a kingdom on the Andaman coast, and <b>Nyah Kur</b>, its descendant in central Thailand. It is the other half of the pair that gave mainland Southeast Asia its scripts.`,
       `<b>Mon was a literary language before most of Europe's were.</b> Old Mon is attested from the <b>seventh century</b>, and it has its own ISO code (<i>omx</i>) separate from modern Mon (<i>mnw</i>) — the same treatment Old Khmer and Modern Khmer get, and a sign of how long this language has been written.`,
       `<b>And there is a live dispute about what came from what.</b> The traditional account is that the <b>Burmese script descends from the Mon script</b>, and the sources' own family tree of the "Mon–Burmese" script lists Burmese, Shan, Sgaw Karen and others as its descendants. But the same source files <b>Pyu or Old Burmese</b> as the script family's <i>parent</i>, and cites a historian whose argument is precisely that Mon was <b>not</b> prior to Burmese. Two readings sit inside one summary of that script, and the <a href="#austroasiatic/mon">Mon entry</a> states the disagreement rather than settling it.`,
       `<b>Like Khmer, Mon is not tonal</b> — and its speakers are a minority in their own historic territory, in Myanmar and Thailand both.`,
       `<b>Nyah Kur is not drawn.</b> It descends from the Old Mon of the <b>Dvaravati</b> kingdom and survives in a few Thai communities; drawing it would have needed facts not verified for this atlas. The ones left out are named here so their absence is visible.`],
    t:[["7th century CE","Old Mon first attested in inscriptions"],
       ["c. 1057","The Thaton tradition and the spread of Mon writing"],
       ["11th–16th c.","Mon script lineages give rise to Burmese, Shan and Karen scripts"],
       ["2010","UNESCO classifies Mon as vulnerable"]],
    chips:[["Mon attested since the 7th century","scr"],["Burmese's debt to Mon is disputed","warn"]],
    kids:[


     { id:"mon", en:"Mon (Peguan)", nat:"ဘာသာမန်", zh:"孟语", py:"Mèng yǔ", sp:"≈1.1 million, 2000–2014",
       region:"Mon State, Kayin State and the Tanintharyi coast in Myanmar; recognised minority communities in Thailand",
       cls:"c-mon",
       mk:[[16.49,97.63,"Mawlamyine, Mon State"],[17.34,96.48,"Bago"],[15.30,97.90,"Kayin State coast"],[14.02,100.53,"Pathum Thani, Thailand"]],
       h:[`Mon is spoken by about <b>1.1 million people</b> in lower Myanmar and Thailand, and it was the language of a kingdom that once dominated the Andaman coast. It is <b>not tonal</b> — like its relative Khmer, and unlike most languages around it.`,
          `<b>It is one of the three Austroasiatic languages with a long written record</b>, alongside Vietnamese and Khmer. Old Mon has its own ISO code (<i>omx</i>) because it is a distinct historical stage, attested from the <b>seventh century</b>.`,
          `<b>The script question, stated as the sources state it.</b> The writing system is called the <b>Mon–Burmese script</b>, and its child list includes <b>Burmese, Mon, Sgaw Karen, Shan, Tai Tham, Chakma, Ahom, Tai Le and Khamti</b> — nine descendants. The traditional account is that <b>Burmese writing came from Mon</b>. But the same source's parent chain puts <b>Pyu or Old Burmese</b> as the ancestor, citing <b>Aung-Thwin (2005)</b>, whose argument is that Mon was <b>not</b> prior to Burmese. Nothing here asserts "Burmese comes from Mon" as settled, because it is not settled.`,
          `<b>Mon is a minority language in both countries where it is spoken.</b> It is a recognised indigenous language in Myanmar and Thailand, but "many individuals of Mon descent are now monolingual" in the national language. UNESCO classified it as <b>vulnerable</b> in 2010.`,
          `<b>The alphabet is still used — and not only for Mon.</b> The Mon script is the model for the writing of several other languages of Myanmar and Thailand, so a reader who can read Mon script is part-way to reading Shan or Karen.`],
       t:[["7th century CE","Old Mon first attested"],
          ["c. 1057","The Thaton kingdom and the transmission of Mon writing"],
          ["11th–16th c.","Burmese, Shan and Karen scripts develop in the same family"],
          ["2010","UNESCO classifies Mon as vulnerable"]],
       chips:[["Old Mon and Modern Mon have separate ISO codes"],["script shared with Burmese, Shan and Karen","scr"],["vulnerable; a minority in both its countries","warn"]],
       kids:[] }
    ] },


  { id:"aslian", en:"Aslian", zh:"亚斯里语支", py:"Yàsīlǐ yǔzhī", sp:"≈20 languages of the Malay peninsula",
    region:"The rainforests and hill country of Peninsular Malaysia and the Thai–Malaysian border",
    cls:"c-asl",
    mk:[[4.45,101.35,"Perak — Semai and Temiar country"],[4.88,101.97,"Gua Musang, Kelantan"],[5.30,101.60,"The Jahai highlands"],[4.50,102.40,"Taman Negara — Batek country"],[5.80,101.30,"The Thai border"]],
    h:[`Aslian is the Austroasiatic branch of the <b>Malay peninsula</b>, spoken by communities known in Malaysia as <b>Orang Asli</b> — the peninsula's indigenous peoples. It is geographically the family's southern extreme and, in several respects, its strangest corner.`,
       `<b>These languages are surrounded by Austronesian and Tai speakers and have been for a very long time</b>, so they are the family's test case for what survives in isolation. They keep Austroasiatic vocabulary and structure under heavy borrowing, which is why some of them look unlike anything else in the family.`,
       `<b>One of them does something no other language here does.</b> <a href="#austroasiatic/jahai">Jahai</a> has a vocabulary built around <b>abstract qualities of smell</b> rather than the objects that produce them — a way of organising odours that linguists went looking for and found here. It is a sourced fact, not colour, and it is drawn on Jahai's entry.`,
       `<b>And one of them is not endangered at all.</b> <a href="#austroasiatic/semai">Semai</a>, with 60,438 speakers and <b>2,000 monolingual speakers</b>, is one of the few Aslian languages in no immediate danger. It sits in the same branch as <a href="#austroasiatic/batek">Batek</a>, at about a thousand speakers and classified as critically endangered.`,
       `<b>Aslian is drawn here with four of roughly twenty languages.</b> Temoq, Semelai, Mah Meri, Cheq Wong, Kensiu and the rest are not drawn — the ones left out are named here so their absence is visible. <b>And Omniglot has no page for any of the four that are drawn</b>, so the whole branch carries no external link.`],
    t:[["c. 1000 BCE–1 CE","Aslian speakers are in the peninsula before Malayic and Tai arrivals"],
       ["19th–20th c.","Orang Asli communities documented by colonial scholars"],
       ["2006–2020","Speaker counts recorded across the branch"]],
    chips:[["four of roughly twenty languages drawn"],["no Omniglot page for any of them","warn"]],
    kids:[
     { id:"semai", en:"Semai", nat:"engrok Semai", zh:"塞迈语", py:"Sàimài yǔ", sp:"60,438, 2020",
       region:"The Cameron Highlands and the Perak–Pahang hill country of Peninsular Malaysia",
       cls:"c-asl",
       mk:[[4.45,101.35,"Perak"],[4.52,101.38,"The Cameron Highlands"],[3.90,101.60,"Pahang"]],
       h:[`Semai is the healthiest language here. It has <b>60,438 speakers</b> — more than most Austroasiatic languages outside the big three — and it is <b>"one of the few Aslian languages which are not endangered"</b>, with about <b>2,000 monolingual speakers</b>.`,
          `<b>Monolingual speakers are the measure that matters.</b> A language whose speakers all also speak Malay can shift within a generation; one with two thousand people who speak nothing else has a floor under it. That figure is why Semai's numbers read differently from every other small language in this family.`,
          `<b>Its sound system is unusual in a specific way.</b> Semai has a <b>highly irregular pattern of expressive reduplication</b> — copying parts of a word in ways that do not follow the usual rule, taking pieces from the edges of the base rather than repeating it whole. This is a grammatical feature with an expressive function, not decoration.`,
          `<b>Its name and its language are not the same thing.</b> The three groups that speak it — <b>Northern, Central and Southern Semai</b> — are counted together here because that is how the sources do it.`,
          `<b>It has reached a screen.</b> The 2017 Malaysian film <i>Asli</i> used Semai for about half its dialogue — the first feature film to use the language at that scale.`],
       t:[["1976","Diffloth's work on minor-syllable vocalism in the Senoic languages"],
          ["2017","The film <i>Asli</i> is released with half its dialogue in Semai"],
          ["2020","60,438 speakers recorded"]],
       chips:[["2,000 monolingual speakers","scr"],["not endangered — the exception in this branch"]],
       kids:[] },


     { id:"temiar", en:"Temiar", nat:"—", zh:"特米亚语", py:"Tèmǐyà yǔ", sp:"30,000, 2020",
       region:"The Perak, Kelantan and Pahang hill country of Peninsular Malaysia",
       cls:"c-asl",
       mk:[[4.88,101.97,"Gua Musang, Kelantan"],[5.10,101.30,"Perak interior"],[4.40,102.20,"Pahang"]],
       h:[`Temiar is one of the most numerous Aslian languages, with about <b>30,000 speakers</b> in the hill country of Perak, Kelantan and Pahang.`,
          `<b>Its name means "edge".</b> The sources record that the word reflects the way Temiar speakers describe themselves — <b>"people of the edge, outside"</b>, meaning the forest rather than the settlements. A name that states a relationship to the surrounding society, in the speakers' own terms, is worth more than an etymology usually is.`,
          `<b>Its pronouns are the notable piece of grammar.</b> Temiar has <b>three allomorphic classes of pronouns</b> — stressed, unstressed and bound — with separate forms for singular, dual and plural, and a further distinction between inclusive and exclusive "we". So the language draws a line between "you and I" and "us but not you", and marks it three ways depending on how the pronoun is used in a sentence.`,
          `<b>It is written in Latin</b>, and it has been documented since the colonial period — Geoffrey Benjamin's grammatical work on Temiar is a standard reference for the branch.`,
          `Omniglot has no Temiar page under any name tried, so there is nothing to link to.`],
       t:[["1976","Benjamin's <i>An Outline of Temiar Grammar</i> is published"],
          ["2013","Benjamin publishes on aesthetic elements in Temiar grammar"],
          ["2020","30,000 speakers recorded"]],
       chips:[["three classes of pronoun"],["'Temiar' means 'edge' — the people outside"]],
       kids:[] },

     { id:"jahai", en:"Jahai (Jehai)", nat:"—", zh:"雅海语", py:"Yǎhǎi yǔ", sp:"1,000 in Malaysia, 2006",
       region:"The montane rainforests of northern Peninsular Malaysia and southernmost Thailand",
       cls:"c-asl",
       mk:[[5.30,101.60,"The Jahai highlands, Perak–Kelantan"],[5.80,101.30,"Southern Thailand"]],
       h:[`Jahai is the <b>largest Northern Aslian language</b>, with about <b>1,000 speakers in Malaysia</b> and a few across the border in Thailand. It is not in immediate danger — the sources note that Jahai parents are still passing it to their children.`,
          `<b>And it has something no other language here has: a vocabulary for smells.</b> Jahai's odour terms are built on <b>abstract qualities rather than the things that produce them</b>. English says something smells <i>of fish</i> or <i>of smoke</i>; Jahai has words for the qualities themselves — among them terms meaning roughly <b>"to smell edible"</b>, <b>"to smell roasted"</b>, <b>"to stink"</b> and <b>"to have a blood-, fish- or meat-like smell"</b>.`,
          `<b>Why that is a finding and not a curiosity.</b> The sources describe this as an organisation by abstract quality "rather than specific sources, which is more common cross-linguistically, particularly in European languages". A language that names smells the way others name colours tells you something about what a vocabulary can be built out of — and it was found here, among about a thousand speakers in Malaysian rainforest.`,
          `<b>Two sound facts that had to be kept apart.</b> The sources state plainly that <b>"there is no tonal distinction in Jahai"</b>, while the same page discusses stress and tone together. What the source says is what is said here: Jahai is <b>not tonal</b>, and stress falls on the <b>last syllable</b>.`,
          `Omniglot has no Jahai page under any name tried, so there is nothing to link to.`],
       t:[["2006","1,000 speakers in Malaysia recorded"],
          ["2008","An ethnic population of 1,800 recorded"],
          ["2010s","Burenhult's work on Jahai odour terminology is published"]],
       chips:[["abstract vocabulary for smells","scr"],["largest Northern Aslian language"],["not tonal"]],
       kids:[] },

     { id:"batek", en:"Batek", nat:"—", zh:"巴特克语", py:"Bātèkè yǔ", sp:"1,000, 2006 — critically endangered",
       region:"The Taman Negara rainforest and the Kelantan, Pahang and Terengganu interior",
       cls:"c-asl",
       mk:[[4.50,102.40,"Taman Negara, Pahang"],[5.00,102.10,"Kelantan interior"],[4.80,102.90,"Terengganu"]],
       h:[`Batek is spoken by about <b>1,000 people</b> in the rainforest of northern Pahang, Kelantan and Terengganu, out of an ethnic population of roughly <b>1,160</b>. The sources describe its numbers as <b>"small and decreasing"</b>, and it is classified as <b>critically endangered</b>.`,
          `<b>Its speakers are among the peninsula's forest hunter-gatherers</b>, and the language is bound up with that way of life — which is part of why it is contracting as forests are logged and communities are settled.`,
          `<b>One language on paper, possibly three or four in fact.</b> Batek has dialects named <b>Teq, Deq (De'), Iga and Nong</b>, and the sources say that <b>"the Mintil (Batek Tanum), Dèq and Nong dialects may be separate languages"</b>. So the thousand speakers counted here may not all speak the same language, so the count is given with that doubt attached rather than as a tidy figure.`,
          `Omniglot has no Batek page under any name tried, so there is nothing to link to.`],
       t:[["2006","1,000 speakers recorded"],
          ["2008","An ethnic population of 1,160 recorded"]],
       chips:[["critically endangered","warn"],["three dialects may be separate languages"]],
       kids:[] }
    ] },


  { id:"munda", en:"Munda", zh:"蒙达语支", py:"Méngdá yǔzhī", sp:"≈10 million across the branch",
    region:"The Chota Nagpur Plateau and the eastern Indian coast — Jharkhand, Odisha, West Bengal and Assam, with communities in Bangladesh and Nepal",
    cls:"c-mun",
    mk:[[23.36,85.33,"Ranchi — the Munda heartland"],[21.95,86.60,"Mayurbhanj, Odisha — Santali and Ho"],[22.55,85.80,"Chaibasa, Jharkhand — Ho country"],[18.81,82.71,"Koraput, Odisha — Sora country"],[24.27,87.25,"Dumka, Jharkhand"]],
    h:[`Munda is the family's <b>western outlier</b>: Austroasiatic languages spoken in eastern India, thousands of kilometres from the rest of the family. They are there because <b>their speakers walked</b>.`,
       `<b>The migration is the first thing to say.</b> Proto-Munda speakers are thought to have arrived on the <b>coast of Odisha from Indochina about 4000–3500 years ago</b>, and to have spread inland onto the <b>Chota Nagpur Plateau</b> before the Indo-Aryan languages reached the area. So this branch is not a curiosity of classification — it is a record of a prehistoric migration, and the Munda branch leads with it.`,
       `<b>Munda also looks nothing like the rest of the family</b>, which is why it was once treated as one half of a two-way split. Its languages are agglutinating where the others are isolating, they carry complex verb morphology, and several of them have <b>gender or noun-class systems</b>. The sources call the Munda, Khasi and Nicobarese phonologies <b>innovative</b> — meaning these branches changed a great deal, and are therefore the <b>least useful evidence</b> for reconstructing Proto-Austroasiatic.`,
       `<b>And Munda is where this family's scripts come from.</b> Four of the five writing systems invented for Austroasiatic languages by their own speakers belong to this branch — <b>Ol Chiki</b> for Santali (1925), <b>Sorang Sompeng</b> for Sora (1936), <b>Warang Citi</b> for Ho (1950s) and <b>Mundari Bani</b> for Mundari (1949–1980). All four are now in Unicode. No other branch of any family in this series can match that, and each is drawn on its own language entry.`,
       `<b>Munda is drawn here with four of roughly twenty languages.</b> Korku, Kharia, Juang, Gorum and the rest are not drawn — the ones left out are named here so their absence is visible.`],
    t:[["c. 2000–1500 BCE","Proto-Munda speakers reach the Odisha coast from Indochina"],
       ["before 1500 BCE","Munda spreads across the Chota Nagpur Plateau"],
       ["1925","Ol Chiki is invented for Santali"],
       ["1936","Sorang Sompeng is created for Sora"],
       ["1950s","Warang Citi is invented for Ho"],
       ["1949–1980","Mundari Bani is designed for Mundari"],
       ["2003","Santali enters India's Eighth Schedule"]],
    chips:[["Austroasiatic in India — a migration, not a border"],["four scripts invented by their own speakers","scr"]],
    kids:[
     { id:"santali", en:"Santali", nat:"ᱚᱞ ᱪᱤᱠᱤ", zh:"桑塔利语", py:"Sāngtǎlì yǔ", sp:"the largest Munda language",
       region:"Jharkhand, Odisha, West Bengal and Assam; also Bangladesh and Nepal",
       cls:"c-mun",
       mk:[[23.36,85.33,"Ranchi"],[21.95,86.60,"Mayurbhanj, Odisha"],[24.27,87.25,"Dumka"],[24.37,88.60,"Rajshahi division, Bangladesh"]],
       h:[`Santali is the largest Munda language and the best known. It is spoken across Jharkhand, Odisha, West Bengal and Assam, with communities in Bangladesh and Nepal.`,
          `<b>It is one of the few Austroasiatic languages with a script invented by one of its own speakers — and the story has a failed attempt in it.</b> In <b>1922</b>, Sadhu Ramchand Murmu devised a script called <b>Monj Dander Ank</b>, which did not catch on. In <b>1925</b>, <b>Raghunath Murmu</b> of Mayurbhanj district created <b>Ol Chiki</b>, first publicised in <b>1939</b> and eventually adopted across the Santali-speaking states. Two attempts within three years; one is remembered, and both are recorded here.`,
          `<b>Ol Chiki is a designed script, not an evolved one.</b> It has <b>30 letters</b>, is written left to right, and its shapes are <b>not arbitrary</b> — they reflect the names of the letters, which are words for objects and actions. It has a print style (<b>Chapa</b>) and a cursive one (<b>Usara</b>), and no upper or lower case. It is in Unicode from <b>U+1C50</b>.`,
          `<b>Before that, Santali was written in everybody else's scripts.</b> It remained non-literary until the mid-1800s, when missionaries and officials — <b>Jeremiah Phillips, A. R. Campbell, Lars Skrefsrud, Paul Bodding</b> — recorded it in <b>Latin, Bengali, Devanagari and Odia</b>. The first Santali weekly in Latin script appeared in <b>1922</b>.`,
          `<b>Its official standing came late and is uneven.</b> Santali entered the <b>Eighth Schedule</b> of the Indian Constitution in <b>2003</b>, and in <b>December 2013</b> it became a subject in India's National Eligibility Test for university teaching. But speakers in <b>Bangladesh use Bengali script</b>, so the same language is written two ways across a border.`],
       t:[["1922","Sadhu Ramchand Murmu's Monj Dander Ank fails to take hold"],
          ["1925","Raghunath Murmu invents Ol Chiki"],
          ["1939","Ol Chiki is first publicised widely"],
          ["2003","Santali enters India's Eighth Schedule"],
          ["2013","Santali becomes a subject in the UGC National Eligibility Test"]],
       chips:[["Ol Chiki, 1925 — invented by a speaker","scr"],["30 letters; shapes reflect their names","scr"],["written in Bengali script in Bangladesh"]],
       kids:[] },


     { id:"mundari", en:"Mundari", nat:"𞓧𞓟𞓨𞓜𞓕𞓣𞓚", zh:"蒙达里语", py:"Méngdálǐ yǔ", sp:"1.6 million, 2011 census",
       region:"Jharkhand, Odisha and West Bengal; also Bangladesh and Nepal",
       cls:"c-mun",
       mk:[[23.36,85.33,"Ranchi"],[22.80,85.28,"Khunti district"],[21.90,86.10,"Northern Odisha"],[24.37,88.60,"Rajshahi division, Bangladesh"]],
       h:[`Mundari is spoken by about <b>1.6 million people</b>, and the census figure has an arithmetic worth showing: <b>1,128,228</b> people in India reported <b>Mundari</b> as their mother tongue and <b>505,922</b> reported <b>Munda</b>, giving a combined total of <b>1,634,150</b>. Two names for closely related speech, counted separately.`,
          `<b>Its script was designed on a school wall.</b> <b>Rohidas Singh Nag</b> began designing the characters of <b>Mundari Bani</b> — also called <b>Nag Mundari</b> — in <b>1949</b>, while still at primary school, writing them on the wall with clay. By <b>1953</b> he had a set of 35 characters; in <b>1980</b> he simplified it to <b>27 letters and five diacritics</b>, which is the form in use today. It was reformed again in <b>2008</b>.`,
          `<b>The letters are meant to look like things.</b> The shapes of Mundari Bani are intended to <b>evoke natural forms</b>, the same design principle as Ol Chiki and Sorang Sompeng — three Munda scripts invented within sixty years of each other, all by speakers of the languages they were made for, all now in Unicode.`,
          `<b>Mundari is also written in four other scripts</b> — Odia, Devanagari, Bengali and Latin — so a script designed in 1949 is one option among five.`,
          `<b>And the branch's history reaches back to Indochina.</b> Mundari's ancestors arrived on the Odisha coast from southeast Asia some four thousand years ago; that migration is drawn on the <a href="#austroasiatic/munda">Munda branch</a> rather than repeated here.`],
       t:[["1949","Rohidas Singh Nag begins designing Mundari Bani characters"],
          ["1953","A 35-character version is complete"],
          ["1980","The alphabet is simplified to 27 characters and published"],
          ["2008","Mundari Bani is reformed in styling and glyphs"],
          ["2011","≈1.6 million speakers counted"]],
       chips:[["Mundari Bani, designed from 1949","scr"],["27 letters and five diacritics","scr"]],
       kids:[] },

     { id:"ho", en:"Ho", nat:"𑢹𑣉𑣉 𑣎𑣋𑣜", zh:"霍语", py:"Huò yǔ", sp:"1,421,418, 2011 census",
       region:"Chaibasa and the Kolhan in southern Jharkhand, plus Mayurbhanj in northern Odisha",
       cls:"c-mun",
       mk:[[22.55,85.80,"Chaibasa, Jharkhand"],[21.95,86.60,"Mayurbhanj, Odisha"],[22.20,85.40,"Keonjhar district"]],
       h:[`Ho is spoken by about <b>1.4 million people</b> in southern Jharkhand and northern Odisha, where it is an additional official language of the state. It is classified as <b>vulnerable</b>.`,
          `<b>Its script comes with a claim its inventor made.</b> <b>Warang Citi</b> — also written Varang Kshiti — was invented by the community leader <b>Lako Bodra</b>, whose work dates from the <b>1950s</b>. He created it as an <b>alternative to the scripts missionaries had devised</b> for Ho. Bodra also <b>claimed the alphabet originated in the thirteenth century with Deowan Turi</b>, and that he rediscovered it <b>in a shamanistic vision</b> before modernising it. That is reported <b>as a claim</b>, attributed to the person who made it — the same treatment this series gives other unverifiable origin stories.`,
          `<b>Warang Citi is a hybrid kind of writing system.</b> It works partly like an Indian abugida — consonant letters carry an inherent vowel — and partly like an alphabet: <b>there is no virama</b>, letters rarely join into ligatures, and it uses <b>English capitalisation and punctuation conventions</b>.`,
          `<b>Not all Ho speakers use it.</b> The script "has mainly gained acceptance among the easternmost group of speakers", and many others write Ho in <b>Devanagari, Odia, Bengali or Latin</b>, or pass knowledge on orally. So the script is in Unicode (<b>U+118A0</b>) and still contested within its own community.`,
          `<b>The name of the script has two spellings</b> — Warang Citi and Varang Kshiti — which is worth knowing when searching for it.`],
       t:[["1950s","Lako Bodra develops Warang Citi"],
          ["2011","1,421,418 speakers counted"],
          ["2016","Warang Citi is added to Unicode"]],
       chips:[["Warang Citi, invented in the 1950s","scr"],["abugida and alphabet at once","scr"],["thirteenth-century origin claimed by its inventor","warn"]],
       kids:[] },


     { id:"sora", en:"Sora (Savara)", nat:"𑃐𑃚𑃝", zh:"索拉语", py:"Suǒlā yǔ", sp:"409,549 — 61% of the ethnic population, 2011",
       region:"The southern Odisha hills and the Odisha–Andhra Pradesh border — Koraput, Rayagada and Ganjam",
       cls:"c-mun",
       mk:[[18.81,82.71,"Koraput, Odisha"],[19.17,83.42,"Rayagada"],[18.50,84.00,"The Andhra border country"]],
       h:[`Sora is a South Munda language of the hills of southern Odisha and the Andhra Pradesh border, with about <b>409,549 speakers</b>.`,
          `<b>That figure is a share of the ethnic population, not a count of speakers.</b> The census gives it as <b>"61% of ethnic population"</b> — meaning the sources counted how many of the Sora people speak Sora, and the answer is under two-thirds. The distinction matters: a language can have hundreds of thousands of speakers and still be losing them, so which of the two figures is being given matters.`,
          `<b>Its script belongs to a religious movement.</b> <b>Sorang Sompeng</b> was created on <b>18 June 1936</b> by <b>Mangei Gomango</b>, a self-taught scholar and Sora activist. It is used <b>primarily in religious contexts</b>, in the rites of the <b>Matar Banom</b> — a neo-animist movement among the Sora — where it functions something like a liturgical script. It is also taught and written for ordinary purposes, but on a smaller scale.`,
          `<b>That is unusual among this family's invented scripts.</b> Ol Chiki, Warang Citi and Mundari Bani were made to write a language in general; Sorang Sompeng was made for worship first. The difference is drawn here because it is a real one: Sora has a script in Unicode (<b>U+110D0</b>) and, alongside it, <b>Odia, Telugu and Latin</b>.`,
          `<b>The branch's four scripts are worth seeing together.</b> Ol Chiki (1925), Sorang Sompeng (1936), Warang Citi (1950s) and Mundari Bani (1949–1980) were all invented by speakers of the languages they write, and this is one of them. The <a href="#austroasiatic/munda">Munda branch</a> draws the pattern; each language carries its own.`],
       t:[["1936","Mangei Gomango creates Sorang Sompeng"],
          ["2011","409,549 speakers counted — 61% of the ethnic population"],
          ["2012","Sorang Sompeng is added to Unicode"]],
       chips:[["Sorang Sompeng, 18 June 1936","scr"],["used mainly in religious rites","scr"],["61% of the ethnic population, not a speaker total"]],
       kids:[] }
    ] },

  { id:"khasian", en:"Khasian (Khasic)", zh:"卡西语支", py:"Kǎxī yǔzhī", sp:"≈1.5 million across the branch",
    region:"Meghalaya and the Khasi–Jaintia hills of north-eastern India, with communities in Bangladesh",
    cls:"c-kha",
    mk:[[25.57,91.88,"Shillong — Khasi country"],[25.28,91.72,"Cherrapunji"],[25.45,92.20,"Jaintia Hills — Pnar"],[24.90,91.80,"The Bangladesh border"]],
    h:[`Khasian is the branch of the <b>Khasi and Jaintia hills</b> of Meghalaya, in north-eastern India. It is drawn next to Khmuic and Palaungic because the sources relate those branches — even though its speakers are nearly two thousand kilometres from Laos.`,
       `<b>It is a case of a language that behaves unlike its relatives.</b> Khasi is Austroasiatic, but it has <b>subject–verb–object</b> word order, a <b>noun-class or gender system</b>, and it is <b>not tonal</b> — where most of the family is verb-initial or tonal, or both. Its phonology is described as <b>innovative</b>, which means it changed a great deal and is therefore among the least useful evidence for what Proto-Austroasiatic sounded like.`,
       `<b>And that is exactly why Khasi belongs here.</b> A reader who assumes the family has one shape will be corrected by Khasi, Munda and Vietnamese sitting in the same tree doing three different things.`,
       `<b>Khasian is drawn here with one of its languages.</b> Pnar, Lyngngam and War are not drawn — the ones left out are named here so their absence is visible.`],
    t:[["1841","Welsh Presbyterian missionaries devise a Latin alphabet for Khasi"],
       ["1972","Meghalaya becomes a state of India, with Khasi as an official language"],
       ["2026","Khasi is classified as Vulnerable by UNESCO"]],
    chips:[["SVO, gendered and not tonal","scr"],["related to Khmuic — 2,000 km away"]],
    kids:[


     { id:"khasi", en:"Khasi", nat:"Ka Ktien Khasi", zh:"卡西语", py:"Kǎxī yǔ", sp:"1 million, 2011 census",
       region:"Meghalaya in north-eastern India, especially the Khasi Hills around Shillong",
       cls:"c-kha",
       mk:[[25.57,91.88,"Shillong"],[25.28,91.72,"Cherrapunji"],[25.10,91.60,"The Bangladesh border"]],
       h:[`Khasi is spoken by about <b>1 million people</b> in Meghalaya, and it is an official language of that Indian state. It is classified as <b>vulnerable</b>.`,
          `<b>It writes with an alphabet that arrived with missionaries.</b> Khasi is written in a <b>Latin alphabet</b>, devised by <b>Welsh Presbyterian missionaries</b> working in the Khasi Hills from the 1840s — the same route by which Santali and many other languages of the region were first written down. The <a href="#austroasiatic/munda">Munda branch</a> describes the opposite outcome: scripts invented by speakers, decades later.`,
          `<b>Its grammar is the reason linguists keep citing it.</b> Khasi has <b>gender</b>, marking nouns by class; it puts the <b>verb between subject and object</b>; and it is <b>not tonal</b>. None of those three is typical of Austroasiatic, and all three are well documented.`,
          `<b>It has a lost script.</b> The sources record that Khasi once had a writing system of its own before the Latin alphabet replaced it — a reminder that "unwritten" often means "not written any more", not "never written".`,
          `<b>And it sits at the family's north-western edge</b>, in hills that receive more rain than almost anywhere on earth — the same Meghalaya plateau where Cherrapunji's rainfall records come from.`],
       t:[["1840s","Welsh Presbyterian missionaries devise the Khasi alphabet"],
          ["1972","Khasi becomes an official language of Meghalaya"],
          ["2011","1 million speakers recorded"],
          ["2026","UNESCO classifies Khasi as Vulnerable"]],
       chips:[["Latin alphabet, from the 1840s","scr"],["vulnerable"]],
       kids:[] }
    ] }
  ] };


/* ---------- ISO 639-3 codes (SIL) — the codes behind the Forvo links.
   Every code below was re-read from RAW WIKITEXT through the MediaWiki API on
   2026-09-27, not from a rendered infobox: [TK-111] established that an
   infobox field falling past the fetch tool's truncation point is not verified
   however obvious it looks, and [AU-108] records the three calls that failed
   transiently and were retried rather than guessed. `aav` is the family's
   ISO 639-5 code and belongs to no single language. Ruc has NO ISO 639-3 code
   at all — it is Glottolog-only (rucc1239) and reads `—` here rather than
   being given a nearby code. ---------- */
const ISO = {
 austroasiatic:'aav (family, ISO 639-5)', protoaa:'—',
 vietic:'vie · mtq (branch)',
  vietnamese:'vie', muong:'mtq',
 chut:'— (no collective code)',
  thavung:'thm', arem:'aem', ruc:'— (no ISO 639-3 code)',
 katuic:'kuf · bru (branch)',
  katu:'kuf', bru:'bru · brv · sss · xhv · ncq · sct',
 bahnaric:'bdq · sed (branch)',
  bahnar:'bdq', sedang:'sed',
 pearic:'pcb · cog (branch)',
  pear:'pcb', chong:'cog',
 khmuic:'kjg · tyh (branch)',
  khmu:'kjg · khf', odu:'tyh',
 palaungic:'pll · pce · rbb (branch)',
  palaung:'pll · pce · rbb', wa:'prk · wbm · vwa',
 khmeric:'khm (branch)',
  khmer:'khm · kxm',
 monic:'mnw · omx (branch)',
  mon:'mnw Modern · omx Old',
 aslian:'sea · tea · jhi · btq (branch)',
  semai:'sea', temiar:'tea', jahai:'jhi', batek:'btq',
 munda:'sat · unr · hoc · srb (branch)',
  santali:'sat', mundari:'unr · unx', ho:'hoc', sora:'srb',
 khasian:'kha (branch)',
  khasi:'kha'
};


/* ---------- what makes each variety distinctive: structure, not history ---------- */
const FEATURES = {
 austroasiatic:[
  `<b>One of the world's primary language families.</b> About 117 million speakers across mainland Southeast Asia, eastern India and southern China — but more than two-thirds of them speak one language, Vietnamese.`,
  `<b>Only three of its languages have a long written record</b> — Vietnamese, Khmer and Mon. The rest of the family is oral history or a script invented in the last hundred years.`,
  `<b>Its old two-way split is gone.</b> Until about 2000 Austroasiatic was divided into Mon–Khmer and Munda; that bifurcation has been abandoned, so eleven branches are drawn flat instead.`,
  `<b>Five scripts were invented by the people who speak these languages</b> — Ol Chiki, Sorang Sompeng, Warang Citi and Mundari Bani in the Munda branch, plus one for Chong. All four Munda scripts are in Unicode.`,
  `<b>Three branches are not drawn here</b> — Nicobarese, Pakanic and Mang — because they fall outside a mainland-and-Munda scope.`],
 protoaa:[
  `<b>A reconstruction still in progress.</b> The work that exists is mostly Proto-Mon–Khmer — everything except Munda — collected in Shorto's dictionary; a full Proto-Austroasiatic reconstruction is being assembled now, with 500 etyma published only in 2024.`,
  `<b>Implosive stops and eight long/short vowel pairs.</b> The proto-language is reconstructed with *ɓ, *ɗ and a tentative *ʄ — that last one added specifically to account for the Katuic languages.`,
  `<b>The branches that look most exotic are the worst evidence for it.</b> Munda, Khasi and Nicobarese are described as phonologically innovative, which makes them the least useful witnesses to what this language sounded like.`],
 vietic:[
  `<b>It contains the family's centre of gravity and its most endangered members at once</b> — Vietnamese at about 86 million speakers, and Arem at seven.`,
  `<b>The branch where tone can be watched being born.</b> Proto-Vietic had no tones; Vietnamese has six, and the intermediate stage is still spoken in Ruc.`,
  `<b>Vietnamese and Mường form one sub-branch</b>, Viet–Mường, with the smaller Chut languages below them.`],
 vietnamese:[
  `<b>Six tones from two lost distinctions.</b> Final consonants (-ʔ, -s/-h) gave three tone classes; the voicing of the initial consonant split each into two. Both distinctions then disappeared as sounds, leaving the tones behind.`,
  `<b>North and south carry the same six tones differently.</b> Northern dialects distinguish the registers mainly by voice quality; southern ones mainly by pitch.`,
  `<b>The tones no longer match their causes.</b> Because prefixes were lost after the tone split, words beginning with voiced fricatives occur in all six tones — which is why the history had to be reconstructed from outside in.`,
  `<b>Written two ways.</b> chữ Nôm, built from Chinese characters, for centuries; a Latin alphabet since the seventeenth century, now official.`],
 muong:[
  `<b>Vietnamese's closest relative, with one tone missing.</b> Mường has all six tones — but the nặng tone survives only in Phú Thọ and Thanh Hóa, having merged with sắc in Hòa Bình.`,
  `<b>Probably not one language.</b> The sources describe the Mường dialects as an ethnically defined group whose varieties are not one another's closest relatives.`,
  `<b>An alphabet since 2016.</b> Hòa Bình province adopted a 28-letter Mường alphabet with four tone marks — four marks for six tones.`],
 chut:[
  `<b>The part of Vietic that Vietnamese left behind.</b> These languages keep consonant clusters, prefixes and presyllables that Vietnamese simplified away.`,
  `<b>They are why Proto-Vietic can be reconstructed at all.</b> Vietnamese lost the evidence; Arem, Ruc and Thavung kept it.`,
  `<b>The group name is the literature's, not the communities'.</b> Arem speakers call themselves Cmbrau. And even the grouping is soft — one source writes "Chut ?" with a question mark against Arem.`],

 thavung:[
  `<b>A register system, not a tone system.</b> Four-way clear/breathy voice with glottalised final consonants — close to what Proto-Vietic must have had before Vietnamese made tones out of it.`,
  `<b>It resembles a branch it is not related to.</b> The same pattern appears in Pearic, where the glottalisation sits in the vowel instead. Two languages can arrive at the same sound system separately.`,
  `<b>A few hundred speakers in two countries</b>, with counts from 1996, 2000 and 2007 that disagree because they count different things.`],
 arem:[
  `<b>Seven speakers.</b> Against an ethnic population of 102 recorded in 1999 and 53 counted in 1960 — the numbers went opposite ways.`,
  `<b>Unknown to outsiders until 1959</b>, when the Vietnamese military found the community; local authorities had been treating them as Bru.`,
  `<b>Presyllables and glottalised finals</b>, like Thavung — southern Vietic features Vietnamese does not have. Its own classification carries a question mark.`],
 ruc:[
  `<b>It preserves prefixes Vietnamese lost</b>, including *k- in archaic Chinese loanwords — which makes a few hundred speakers in one Vietnamese district evidence for the reconstruction of Old Chinese.`,
  `<b>Tone and register coexist in it.</b> Ruc still keeps the historical laryngeal final, placing it "in an intermediate stage between register systems and fully tonal systems" — the missing middle of the Vietnamese story.`,
  `<b>Presyllables with a minor vowel</b>, as in cakuː "bear" against Vietnamese gấu.`,
  `<b>Its recent history is grim</b>: settled from a hunter-gatherer life in the late 1970s, under 200 people by 1985, and half the community lost to cholera in the late 1980s.`],
 katuic:[
  `<b>The Annamite highlands, on both sides of a border.</b> Katu is spoken in Laos and around Huế; Bru stretches from Salavan through Thailand into Kon Tum — so the same languages have Lao and Vietnamese orthographies.`,
  `<b>Best evidence for Proto-Austroasiatic's *ʄ.</b> The implosive was added to the proto-language's inventory specifically to account for this branch.`,
  `<b>A counting problem built in.</b> Several Katuic languages are dialect continua, so "language" and "dialect" are decisions rather than facts — Bru has six ISO codes for one continuum.`],
 katu:[
  `<b>Keeps the implosive *ʄ</b> that Vietnamese lost — one of the sounds that made linguists extend the proto-language's inventory.`,
  `<b>Two figures that do not match.</b> 23,000 speakers in 2005 against 61,588 Katu people in the 2009 Vietnamese census — speakers versus ethnic population.`,
  `<b>Written two ways</b>: Lao script in Laos, Latin in Vietnam.`],
 bru:[
  `<b>A dialect continuum, not a language.</b> Neighbouring varieties shade into one another across Laos, Thailand and Vietnam.`,
  `<b>Six ISO codes for it</b> — bru, brv, sss, xhv, ncq, sct — two of which the same sources call dialects. The catalogue is finer-grained than the linguistics.`,
  `<b>Written in Latin, Lao and Thai</b>, depending on which country a community is in.`],
 bahnaric:[
  `<b>Known for its vowels.</b> North Bahnaric languages carry large inventories of vowel phonations — plain, nasalised and creaky versions of the same qualities.`,
  `<b>Written from outside.</b> Bahnar and Sedang use Latin alphabets adapted from Vietnamese, devised for them rather than by them — the opposite of the Munda branch.`,
  `<b>Roughly forty languages; two drawn here.</b>`],
 bahnar:[
  `<b>Nine vowel qualities with phonemic length</b> — each quality can be short or long and it changes the word.`,
  `<b>A small disagreement in its own sources.</b> One account says North Bahnar; the same article's opening sentence says Central Bahnaric. Both are repeated here rather than one being picked.`,
  `<b>Well over a dozen named varieties</b>, one of them descended from Tây Sơn soldiers who fled south about two hundred years ago.`],
 sedang:[
  `<b>24 pure vowels and up to fifty vowel sounds.</b> Seven qualities, each plain, nasalised or creaky, plus 33–55 diphthongs.`,
  `<b>A world-record claim the sources qualify.</b> Sedang is "sometimes claimed" to have the largest vowel inventory in the world — but other Bahnaric languages have more qualities, so "the record depends closely on how the languages are described". What is given here is the figures and the caveat, not a headline.`,
  `<b>The distinction is phonation, not pitch</b> — the same family of sound change that gave Vietnamese its tones.`],

 pearic:[
  `<b>The branch that kept what Khmer lost.</b> Its languages preserve clusters, final consonants and register distinctions that Old Khmer had and modern Khmer does not.`,
  `<b>Every member is endangered</b>, from Pear at 1,670 speakers down to Samre and Sa'och.`,
  `<b>One script made this century.</b> Chong was given a writing system by researchers in Thailand, and is now the subject of a revitalisation programme — rare for any language here.`],
 pear:[
  `<b>The most divergent Pearic language.</b> The Kampong Thom variety sits furthest from Khmer on the branch's internal tree.`,
  `<b>Three or four villages, about 1,670 speakers</b> — carrying a division of the family that nothing else preserves.`,
  `<b>Its name is a term from the Khmer social order</b>, not a self-designation, and it survives in the literature because there is no settled replacement.`],
 chong:[
  `<b>Two languages under one name.</b> Western Chong and Central Chong (Samre) are distinct, and several different Pearic languages are called "Chong" in the literature.`,
  `<b>An unusual four-way register contrast</b> — the same kind of distinction Thavung has at the other end of the family, in an unrelated branch.`,
  `<b>Its script is dated both 2000 and 2010 in the same source</b>, so both are given rather than one chosen.`,
  `<b>Measured on a different scale.</b> Chong's endangerment is reported as Fishman's GIDS stage 7 of 8, where everywhere else in this family the grade is UNESCO's.`,
  `<b>Being revived.</b> A revitalisation project in Thailand is working on it.`],
 khmuic:[
  `<b>Named after its largest member.</b> Khmu gives the branch its name; O'du, Ksingmul and Mlabri are also in it.`,
  `<b>Khmu is often related to Palaungic and Khasic</b>, which is why those three branches sit next to each other here.`,
  `<b>The range inside one branch is extreme</b> — Khmu at about 798,000 speakers and O'du described as almost extinct.`],
 khmu:[
  `<b>798,400 speakers and no standard form.</b> Several dialects, differing in consonants, in whether they have register at all, and in how much of the national language they have absorbed.`,
  `<b>Written in Lao, Latin and Thai</b>, depending on the country — a language with no agreed written standard has three orthographies instead.`,
  `<b>A bridge between branches.</b> Khmu is often cited as most closely related to the Palaungic and Khasic languages.`],
 odu:[
  `<b>Described as almost extinct.</b> Census figures give 950; a separate count records about 300 people in one district. Both figures are given here.`,
  `<b>No script</b> — written, where at all, in Vietnamese orthography.`,
  `<b>In the same branch as Khmu</b>, which has nearly eight hundred thousand speakers: the whole range of this family in two languages.`],
 palaungic:[
  `<b>Language and statehood cut across each other here.</b> Wa is an official language of an autonomous zone in Myanmar and is listed as severely endangered at the same time.`,
  `<b>The map and the classification disagree.</b> Palaungic sits beside Khmuic and Khasian in the tree, but its speakers are in Myanmar, China and Thailand.`,
  `<b>Roughly thirty languages; two drawn here.</b>`],
 palaung:[
  `<b>Three peoples, three languages</b> — Palé (Ruching), Rumai and Shwe — under one name.`,
  `<b>The figures come apart.</b> 150,000 Shwe in 1982, 272,000 Ruching in 2000, 139,000 Rumai at an unrecorded date, against a headline of about 560,000. One has no date at all.`,
  `<b>No script of its own</b> — written in Burmese and Tai Le, the writing systems of its neighbours.`,
  `<b>Severely endangered despite half a million speakers</b>, because the endangerment applies to varieties within the cluster.`],
 wa:[
  `<b>Three codes, one name</b> — Parauk (the standard), Vo at about 40,000 speakers and Awa at about 100,000. All may be called Wa.`,
  `<b>A state language that UNESCO also lists as severely endangered.</b> Both facts hold at once.`,
  `<b>Diffloth's "Wa corridor"</b>, between the Salween and the Mekong — a geographic unit with a linguist's name on it.`,
  `<b>Written in Latin, formerly in Chinese characters and Shan script</b>, with the standard growing out of a Bible translation.`],

 khmeric:[
  `<b>A branch of one language.</b> Khmer has no close relatives left, which is unusual: most branches here hold several languages and one holds forty.`,
  `<b>Its script is the branch's legacy.</b> From Khmer came the Sukhothai script — ancestor of Thai — and the Khom Thai hand; Lao descends from the same line.`,
  `<b>Not tonal</b>, like Mon: "Southeast Asian" does not automatically mean "tonal".`],
 khmer:[
  `<b>Written since at least c. 611 CE</b>, from the Pallava script of southern India by way of Brahmi and Tamil-Brahmi.`,
  `<b>The ancestor of the Thai and Lao scripts.</b> Sukhothai, Khom Thai and Lai Tay descend from it — but it is a sister of Old Mon rather than its parent.`,
  `<b>About 19.5 million first-language speakers</b>, plus a million more who speak it second — the second-largest Austroasiatic language.`,
  `<b>Not confined to Cambodia.</b> Northern Khmer has its own ISO code; Khmer Krom communities are in Vietnam's Mekong delta.`,
  `<b>Not tonal</b>: it distinguishes words by vowel quality rather than pitch.`],
 monic:[
  `<b>Two languages: Mon and Nyah Kur.</b> Mon was the language of a kingdom on the Andaman coast; Nyah Kur descends from the Old Mon of Dvaravati.`,
  `<b>Mon was a literary language before most of Europe's were</b>, attested from the seventh century — with Old Mon and Modern Mon carrying separate ISO codes.`,
  `<b>What came from what is disputed.</b> The traditional account has Burmese script descending from Mon; the same source files Pyu or Old Burmese as its parent, citing a historian who argues the opposite. The disagreement is stated rather than settled.`],
 mon:[
  `<b>About 1.1 million speakers</b>, and a minority in both Myanmar and Thailand, where it is nevertheless a recognised indigenous language.`,
  `<b>Old Mon (omx) and Modern Mon (mnw)</b> have separate ISO codes — a sign of how long this language has been written.`,
  `<b>Its script is shared.</b> The Mon–Burmese family includes Burmese, Shan, Sgaw Karen, Tai Tham, Chakma and Ahom among its nine descendants.`,
  `<b>Not tonal</b>, like Khmer — unlike most languages around it.`],
 aslian:[
  `<b>Austroasiatic in the Malay peninsula</b>, spoken by Orang Asli communities — the family's southern extreme, surrounded by Austronesian and Tai for a very long time.`,
  `<b>It contains both extremes.</b> Semai has 60,438 speakers and 2,000 monolinguals and is not endangered; Batek has about a thousand and is critically endangered.`,
  `<b>And something no other language here does</b>: Jahai has a vocabulary built on abstract qualities of smell.`,
  `<b>No Omniglot page for any of the four languages drawn.</b>`],
 semai:[
  `<b>The healthiest language here.</b> 60,438 speakers, "one of the few Aslian languages which are not endangered", and about 2,000 monolingual speakers.`,
  `<b>Monolingual speakers are the measure that matters</b> — a language whose speakers all also speak Malay can shift in a generation.`,
  `<b>Highly irregular expressive reduplication</b>, copying from the edges of a word rather than repeating it whole.`],
 temiar:[
  `<b>Its name means "edge".</b> Speakers describe themselves as "people of the edge, outside" — meaning the forest rather than the settlements.`,
  `<b>Three allomorphic classes of pronoun</b> — stressed, unstressed and bound — with dual forms and an inclusive/exclusive "we".`,
  `<b>About 30,000 speakers</b>, written in Latin and documented since the colonial period.`],
 jahai:[
  `<b>A vocabulary for smells.</b> Jahai odour terms are built on abstract qualities — "to smell edible", "to smell roasted", "to stink" — rather than on the things that produce them.`,
  `<b>That is a finding, not a curiosity.</b> The sources note that organising smell by abstract quality is "more common cross-linguistically, particularly in European languages" — the opposite of what English does.`,
  `<b>Not tonal</b>, with stress on the last syllable — stated as the source states it.`,
  `<b>The largest Northern Aslian language</b>, with about 1,000 speakers in Malaysia and a few in Thailand.`],
 batek:[
  `<b>About 1,000 speakers, "small and decreasing"</b>, classified as critically endangered.`,
  `<b>One language on paper, possibly three or four in fact.</b> The Mintil (Batek Tanum), Dèq and Nong dialects may each be separate languages.`,
  `<b>Spoken by forest hunter-gatherers</b>, which is part of why it is contracting as forests are logged and communities settled.`],

 munda:[
  `<b>Austroasiatic in India because of a migration.</b> Proto-Munda speakers reached the Odisha coast from Indochina about 4000–3500 years ago and spread onto the Chota Nagpur Plateau before Indo-Aryan arrived.`,
  `<b>It looks nothing like the rest of the family</b> — agglutinating, with complex verb morphology and gender or noun-class systems. Its phonology is described as innovative, making it poor evidence for the proto-language.`,
  `<b>Four scripts invented by speakers of these languages.</b> Ol Chiki (1925), Sorang Sompeng (1936), Warang Citi (1950s) and Mundari Bani (1949–1980), all now in Unicode. No other branch in this series can match that.`],
 santali:[
  `<b>Ol Chiki, invented in 1925</b> by Raghunath Murmu of Mayurbhanj — after an earlier attempt, Monj Dander Ank (1922), failed to catch on. Both are recorded here.`,
  `<b>30 letters whose shapes reflect their names.</b> A designed script with print (Chapa) and cursive (Usara) styles, no upper or lower case, in Unicode from U+1C50.`,
  `<b>Before that it was written in everybody else's scripts</b> — Latin, Bengali, Devanagari and Odia, recorded by missionaries from the mid-1800s.`,
  `<b>Scheduled in India since 2003</b>, and a university subject since 2013 — though speakers in Bangladesh still use Bengali script.`],
 mundari:[
  `<b>About 1.6 million speakers</b>, counted as 1,128,228 reporting "Mundari" plus 505,922 reporting "Munda".`,
  `<b>Its script was designed on a school wall.</b> Rohidas Singh Nag began it in 1949 as a child, writing characters in clay; 35 by 1953, simplified to 27 letters and five diacritics in 1980.`,
  `<b>Letters meant to evoke natural forms</b>, the same design principle as Ol Chiki and Sorang Sompeng.`,
  `<b>One of five scripts</b> Mundari is written in, alongside Odia, Devanagari, Bengali and Latin.`],
 ho:[
  `<b>About 1.4 million speakers</b>, an additional official language of Jharkhand, and classified as vulnerable.`,
  `<b>Warang Citi comes with a claim its inventor made.</b> Lako Bodra created it in the 1950s as an alternative to missionary scripts, and claimed it originated in the thirteenth century with Deowan Turi and was rediscovered in a shamanistic vision. That is reported as a claim.`,
  `<b>An abugida and an alphabet at once</b>: consonant letters carry an inherent vowel, but there is no virama, and it uses English capitalisation and punctuation.`,
  `<b>Not all Ho speakers use it</b> — many prefer Devanagari, Odia, Bengali or Latin, or oral transmission.`],
 sora:[
  `<b>409,549 speakers — "61% of ethnic population".</b> A share, not a total: under two-thirds of the Sora people speak Sora.`,
  `<b>Sorang Sompeng, created 18 June 1936</b> by Mangei Gomango, is used mainly in the rites of the Matar Banom, a neo-animist movement — closer to a liturgical script than a general one.`,
  `<b>That makes it different from the other three.</b> Ol Chiki, Warang Citi and Mundari Bani were made to write their languages in general; Sorang Sompeng was made for worship first.`,
  `<b>In Unicode from U+110D0</b>, alongside Odia, Telugu and Latin.`],
 khasian:[
  `<b>Khasi behaves unlike its relatives.</b> Subject–verb–object order, a gender system and no tones — none of them typical of Austroasiatic.`,
  `<b>Drawn beside Khmuic and Palaungic</b> because the sources relate those branches, even though the speakers are nearly two thousand kilometres apart.`,
  `<b>One language drawn of several</b> — Pnar, Lyngngam and War are not.`],
 khasi:[
  `<b>About 1 million speakers</b> and an official language of Meghalaya; classified as vulnerable.`,
  `<b>Written in a Latin alphabet devised by Welsh Presbyterian missionaries</b> from the 1840s — the opposite route to the Munda branch, where speakers designed their own scripts decades later.`,
  `<b>Gender, SVO order and no tone</b>, all well documented and all untypical of the family.`,
  `<b>It once had a script of its own</b>, before the Latin alphabet replaced it.`]
};

/* ---------- schematic outline (simplified, embedded; [lng,lat] rings) ----------
   Drawn by hand here: the mainland Southeast Asian landmass, the Malay
   peninsula hanging off it, the Indian eastern plateau where Munda is spoken,
   and the Mekong delta. Not a coastline survey — see the sketch caption. */
const MAINLAND = [[97.50,16.80],[98.20,13.90],[99.60,10.00],[100.30,7.40],[101.20,6.50],
 [102.10,5.60],[103.40,3.20],[104.30,1.50],[103.00,1.30],[101.60,2.80],[100.40,5.20],
 [99.30,8.00],[98.60,11.50],[97.90,14.60],[96.80,16.20],[95.30,16.00],[94.50,17.60],
 [93.80,19.20],[92.90,21.40],[91.60,22.60],[89.00,26.20],[88.10,27.30],[90.40,28.60],
 [93.50,29.00],[96.20,29.40],[97.30,27.60],[98.70,25.80],[99.90,24.00],[100.10,21.50],
 [101.20,19.40],[101.80,17.60],[99.90,18.10],[98.20,19.30],[97.30,17.90],[96.40,17.60],[95.30,16.00]];
const INDIA_E = [[84.30,19.20],[85.90,19.60],[87.10,21.50],[87.80,24.30],[86.40,25.60],
 [84.90,26.10],[83.30,25.00],[82.40,22.60],[81.80,20.10],[83.00,19.00],[84.30,19.20]];
const MEKONG_DELTA = [[105.10,8.60],[106.90,9.00],[107.30,10.50],[105.90,11.20],[104.80,10.20],[105.10,8.60]];
const AU_GEO = { type:'FeatureCollection', features:[MAINLAND,INDIA_E,MEKONG_DELTA].map(r=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };


/* ---------- approximate "core areas" ----------
   Hand-drawn coarse blocks showing roughly where each branch sits — NOT surveyed
   boundaries. Three need a word of warning and the caption carries it: the MUNDA
   and KHASIAN blocks are two thousand kilometres from everything else, so they sit
   at the western edge of the frame; the ASLIAN block runs down a peninsula that is
   mostly not Austroasiatic at all; and the FAMILY block is a frame rather than a
   territory, because the family's languages are islands inside other people's
   countries. The marker layer is the factual one. */
const AREAS = {
 'c-anc':[[[92.00,27.50],[106.50,23.20],[109.60,11.10],[105.00,1.30],[100.40,5.20],
           [97.60,16.80],[92.00,27.50]]],
 'c-his':[[[97.50,25.60],[107.00,26.40],[108.20,21.80],[104.30,20.60],[98.60,22.40]]],
 'c-vie':[[[102.10,23.20],[109.50,21.60],[110.00,15.60],[106.80,8.40],[104.70,9.90],
           [103.90,15.30],[102.40,19.80]]],
 'c-kat':[[[105.00,16.60],[108.20,16.40],[108.60,13.90],[106.30,12.70],[104.50,14.40]]],
 'c-bah':[[[107.20,15.30],[108.90,15.10],[109.00,12.20],[107.40,11.80],[106.90,13.60]]],
 'c-pea':[[[101.70,13.20],[105.30,14.00],[105.60,11.80],[103.40,11.20],[101.90,12.00]]],
 'c-khm':[[[100.30,22.40],[103.90,21.80],[104.10,18.60],[101.30,17.40],[99.90,19.80]]],
 'c-pal':[[[96.60,24.20],[100.30,23.40],[100.00,20.40],[97.60,19.80],[96.30,21.90]]],
 'c-kmr':[[[102.40,14.40],[107.10,13.60],[106.90,9.80],[103.30,9.40],[102.10,11.60]]],
 'c-mon':[[[94.20,17.90],[98.30,17.60],[98.60,13.40],[96.00,12.20],[94.30,14.80]]],
 'c-asl':[[[100.10,6.90],[103.60,6.20],[104.30,2.40],[102.40,1.50],[100.60,3.20]]],
 'c-mun':[[[82.00,26.30],[87.60,25.90],[88.10,21.40],[84.20,18.80],[81.60,20.30]]],
 'c-kha':[[[89.90,26.40],[93.20,26.10],[93.60,24.30],[91.10,24.00],[89.70,25.20]]]
};


/* ---------- listen links: an Omniglot page where one exists, plus the engine's
   YouTube-search fallback on every node. Coverage for this family is uneven and
   was MEASURED rather than assumed — see research.md [AU-108], which records the
   two traps and the surprises:
     · Omniglot's Ol Chiki page is `olchiki.htm`; `ol_chiki.htm` is 404;
     · its Khmer script page is `khmer.htm`, not `khmer_script.htm`;
     · there is NO page for Semai, Temiar, Jahai or Batek under any name tried,
       so the whole Aslian branch ships with EMPTY lists — including Semai, which
       has 60,438 speakers and a published grammar;
     · also empty: O'du (`o_du.htm` 404), Chong, Bru, Pear, Thavung, Arem and Ruc.
   Twenty-one URLs were confirmed live: vietnamese, muong, khmer, mon, santali,
   khasi, khmu, wa, palaung, katu, bahnar, sedang, mundari, ho, sora, burmese,
   kuy, pacoh, olchiki, shan and langfam. ---------- */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 austroasiatic:[['Language families — Omniglot', OM+'langfam.htm']],
 protoaa:     [],
 vietic:      [['Vietnamese — Omniglot', OM+'vietnamese.htm'], ['Muong — Omniglot', OM+'muong.htm']],
  vietnamese: [['Vietnamese language and alphabet — Omniglot', OM+'vietnamese.htm']],
  muong:      [['Muong — Omniglot', OM+'muong.htm']],
 chut:        [],
  thavung:    [], arem: [], ruc: [],
 katuic:      [['Katu — Omniglot', OM+'katu.htm'], ['Kuy — Omniglot', OM+'kuy.htm'], ['Pacoh — Omniglot', OM+'pacoh.htm']],
  katu:       [['Katu — Omniglot', OM+'katu.htm']],
  bru:        [],
 bahnaric:    [['Bahnar — Omniglot', OM+'bahnar.htm'], ['Sedang — Omniglot', OM+'sedang.htm']],
  bahnar:     [['Bahnar — Omniglot', OM+'bahnar.htm']],
  sedang:     [['Sedang — Omniglot', OM+'sedang.htm']],
 pearic:      [],
  pear:       [], chong: [],
 khmuic:      [['Khmu — Omniglot', OM+'khmu.htm']],
  khmu:       [['Khmu language and alphabet — Omniglot', OM+'khmu.htm']],
  odu:        [],
 palaungic:   [['Palaung — Omniglot', OM+'palaung.htm'], ['Wa — Omniglot', OM+'wa.htm']],
  palaung:    [['Palaung — Omniglot', OM+'palaung.htm']],
  wa:         [['Wa language and alphabet — Omniglot', OM+'wa.htm']],
 khmeric:     [['Khmer — Omniglot', OM+'khmer.htm']],
  khmer:      [['Khmer language and alphabet — Omniglot', OM+'khmer.htm']],
 monic:       [['Mon — Omniglot', OM+'mon.htm'], ['Burmese script — Omniglot', OM+'burmese.htm']],
  mon:        [['Mon language and alphabet — Omniglot', OM+'mon.htm']],
 aslian:      [],
  semai:      [], temiar: [], jahai: [], batek: [],
 munda:       [['Santali and Ol Chiki — Omniglot', OM+'santali.htm'], ['Mundari — Omniglot', OM+'mundari.htm'],
               ['Ho — Omniglot', OM+'ho.htm'], ['Sora — Omniglot', OM+'sora.htm']],
  santali:    [['Santali and Ol Chiki — Omniglot', OM+'santali.htm'], ['Ol Chiki script — Omniglot', OM+'olchiki.htm']],
  mundari:    [['Mundari — Omniglot', OM+'mundari.htm']],
  ho:         [['Ho — Omniglot', OM+'ho.htm']],
  sora:       [['Sora — Omniglot', OM+'sora.htm']],
 khasian:     [['Khasi — Omniglot', OM+'khasi.htm']],
  khasi:      [['Khasi language and alphabet — Omniglot', OM+'khasi.htm']]
};


window.ATLASES = window.ATLASES || {};
window.ATLASES.austroasiatic = {
  key: 'austroasiatic',
  title:   { zh: '南亚语系', en: 'Austroasiatic' },
  tagline: 'Eleven branches from the Chota Nagpur Plateau to the Vietnamese coast — where tone was watched being born, and where five scripts were invented by the people who speak the languages',
  stats:   [['40', 'languages and groups'], ['11', 'branches drawn, of 13'], ['5', 'scripts invented by their own speakers']],
  palette: {
    anc: '#c9c2cf', his: '#8b94a8', vie: '#d9663f', kat: '#4fa8d8', bah: '#5fbf6a',
    pea: '#c74f8a', khm: '#b48ad9', pal: '#3f9e8f', kmr: '#d95f6a', mon: '#7fa650',
    asl: '#d9a83f', mun: '#8c5a2b', kha: '#6b7fd9'
  },
  legend:  [['anc','The family — eleven branches, three not drawn'],['his','Proto-Austroasiatic · reconstructed'],
            ['vie','Vietic — Vietnamese, Mường and the Chut relics'],['kat','Katuic — the Annamite range'],
            ['bah','Bahnaric — the central highlands'],['pea','Pearic — what Khmer lost'],
            ['khm','Khmuic — the northern Lao uplands'],['pal','Palaungic — Shan State and Yunnan'],
            ['kmr','Khmeric — Khmer alone'],['mon','Monic — Mon, and the old Andaman coast'],
            ['asl','Aslian — Orang Asli of the Malay peninsula'],['mun','Munda — Austroasiatic in India'],
            ['kha','Khasian — Meghalaya, 2,000 km west']],
  view:    { center: [99, 15.5], zoom: 4.2 },
  outline: { color: '#9c8fb0', fill: 'rgba(156,143,176,0.05)' },
  sketchGeo: AU_GEO,
  captions: {
    note:   '● Markers show <b>representative localities</b> where the selected variety is rooted. This family spans an unusual amount of ground — the Munda languages are in eastern India, two thousand kilometres from everything else here, and the Aslian languages run down the Malay peninsula — so the initial view is framed to hold both ends, and the outer markers are reached by panning or by clicking an entry, which fits the map to its markers. <b>Nothing in this family is a majority language except Vietnamese and Khmer</b>, so almost every marker sits inside a country whose national language is unrelated to it.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — coarse hand-drawn blocks showing roughly where each branch sits. Three need warning. The <b>Munda</b> and <b>Khasian</b> blocks are the family’s western outliers, in India, and they are that far from everything else because their speakers walked there. The <b>Aslian</b> block runs down a peninsula that is otherwise not Austroasiatic at all. And the <b>family</b> block is a frame rather than a territory: these languages are islands inside other people’s countries, and the block covers ground that is mostly Vietnamese, Thai, Burmese or Malay. The marker layer is the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn mainland Southeast Asia, the Malay peninsula, the Indian eastern plateau where Munda is spoken, and the Mekong delta; simplified from memory of the geography, with the markers at true coordinates. The far-western markers for Santali, Mundari, Ho and Sora sit on the plateau block, and Khasi sits in the Meghalaya hills above it. Works fully offline.'
  },

  fonts: ['Noto Serif', 'Noto Serif SC', 'Noto Sans Thai', 'Noto Sans Lao', 'Noto Sans Myanmar',
          'Noto Sans Khmer', 'Noto Sans Devanagari', 'Noto Sans Ol Chiki',
          'Noto Sans Warang Citi', 'Noto Sans Sora Sompeng', 'Noto Sans Nag Mundari'],
  filterPlaceholder: 'e.g. Vietnamese, Khmer, Mon, Santali, Khasi, Wa, Semai, Ruc…',
  listen: {
    om: 'https://www.omniglot.com/writing/langfam.htm',
    fv: 'https://forvo.com/languages/',
    search: 'Austroasiatic language native speaker'
  },
  rootId: 'austroasiatic',
  stages: ['protoaa'],
  kinds: { root: 'The family', stage: 'Reconstructed ancestor', branch: 'Branch', leaf: 'A language' },
  sources: 'Sources: A.-G. Haudricourt, “De l’origine des tons en vietnamien” (1954), whose analysis of the Vietnamese tones is drawn as a grid on the Vietnamese entry · H. L. Shorto, <i>A Mon–Khmer Comparative Dictionary</i>, for the reconstruction that preceded Sidwell’s · P. Sidwell, “Classifying the Austroasiatic Languages: History and State of the Art” (2009) and his later phylogenetic work (2018, 2021), for the flat classification that replaced the Mon–Khmer/Munda split, and his 2022 proposal placing Proto-Austroasiatic in the Red River Delta · Sidwell & Rau (2015) for the reconstructed vowel inventory, and the 500 etyma published in 2024 · G. Diffloth on Munda, and for the “Wa corridor” between the Salween and the Mekong · R. Ferlus on Vietic and tonogenesis · L. C. Thompson, <i>A Vietnamese Reference Grammar</i>, for the tone system and its dialect distribution · K. D. Smith (1975) on Sedang phonology · G. Benjamin on Temiar grammar · N. Burenhult on Jahai odour terminology · M. Aung-Thwin (2005), cited for the position that the Mon script was not prior to Burmese · the UNESCO <i>Atlas of the World’s Languages in Danger</i> for every endangerment grade except Chong’s, which is reported on Fishman’s GIDS scale and labelled as such · the 2011 Indian census for Santali, Mundari, Ho and Sora · the 2009 Vietnamese census for Katu · Ethnologue and Glottolog for ISO 639-3 codes and speaker counts. Six things here are deliberately left unresolved. <b>The Mon–Khmer grouping is not drawn</b>, because that bifurcation was abandoned around 2000. <b>Sedang’s vowel record is reported as contested</b>, not claimed: the sources say the world-record holder “depends closely on how the languages are described”. <b>Palaung’s speaker figures are given as components</b>, one of them undated, rather than summed into a single number. <b>Wa’s total is given as a range</b>, 900,000 against Bradley’s 820,000. <b>Chong’s script is dated both 2000 and 2010</b> because the source gives both, and its endangerment is on a different scale from everywhere else in this family. And <b>Ruc has no ISO 639-3 code at all</b> — it is Glottolog-only, and reads “—” here rather than being given a neighbouring code.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();

