/* atlas-formosan.js — Formosan 台湾南岛语
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (see languages.md §1.3 for the contract,
 * §2.10 for this family's brief, and research.md §"Formosan (Phase 7)" for the
 * evidence log — every load-bearing date and figure below is logged there as
 * FO-101 … FO-106).
 *
 * THE THING THIS ATLAS HAS TO GET RIGHT: Formosan is NOT a family.
 * Its own infobox says `acceptance = geographic` and `glotto = none`, and its
 * lead says the languages "do not form a single subfamily of Austronesian but
 * rather up to nine separate primary subfamilies". So the root node is a PLACE,
 * not an ancestor, and the atlas draws nine branches of Austronesian side by
 * side under it — not a tree with a Proto-Formosan trunk, because there is no
 * such thing. Proto-Austronesian is the ancestor, and its other descendants run
 * from Madagascar to Rapa Nui.
 *
 * Three further things this atlas is careful about:
 *  1. Two of the nine branches are single languages (Rukai, Puyuma, Bunun,
 *     Paiwan) and two carry a question mark in their own sources (Tsouic,
 *     Malayo-Sumbawan for Tsat). Doubtful nodes are drawn AND marked.
 *  2. Yami/Tao is not Formosan at all — it is Malayo-Polynesian and Batanic.
 *     It sits in an "outlying" group with Tsat on Hainan, both joined to the
 *     island by geography rather than by descent.
 *  3. Most of this atlas is dead or dying: of ~26 languages, at least ten are
 *     extinct and four more moribund. Pazeh died in 2010; Thao has four
 *     speakers; Kanakanavu has four.
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree =====================
   Nine primary subfamilies of Austronesian happen to be on Taiwan. The order
   below follows the Formosan-languages infobox's own child list, with the two
   non-Formosan outposts kept apart at the end. */
const DATA = {
 id:"formosan", en:"Formosan (geographic grouping)", zh:"台湾南岛语", py:"Táiwān Nándǎoyǔ", sp:"≈26 languages, at least 10 extinct",
 region:"Taiwan — the whole island, from the western plains to the Central Mountain Range and the east coast",
 cls:"c-anc",
 mk:[[25.03,121.57,"Taipei — the northern limit of the family"],[23.48,120.45,"Chiayi — the western plains"],[24.15,121.25,"Central Mountain Range"],[22.63,120.30,"Kaohsiung — Rukai and Tsouic country"],[22.76,121.14,"Taitung — Puyuma and Amis country"],[23.98,121.61,"Hualien — Amis and Sakizaya"]],
 h:[`<b>Formosan is a place, not a family.</b> The indigenous languages of Taiwan are grouped together geographically rather than by descent: they "do <b>not</b> form a single subfamily of Austronesian but rather <b>up to nine separate primary subfamilies</b>". Glottolog, the standard catalogue of the world's languages, gives the grouping no code of its own. So this is not a family tree in the way the other atlases here are. It is <b>nine branches of Austronesian that happen to be on one island</b>, and the tree below starts from a place rather than from an ancestor.`,
   `What makes that extraordinary is what the island is. Taiwan is where <b>Proto-Austronesian</b> was spoken — the ancestor of a family that runs from <b>Madagascar to Rapa Nui</b>, through the Philippines, Indonesia, Polynesia and Micronesia. The nine branches here are not dialects of one another; they are the deepest divisions of that whole family, and several of them have no close relatives anywhere.`,
   `The numbers are severe. Taiwan's Indigenous peoples are "about <b>2.3%</b> of the island's population", and only <b>35% speak their ancestral language</b>, "due to centuries of language shift". Of the approximately <b>26 languages</b> of Taiwan's Indigenous peoples, <b>at least ten are extinct</b> and another <b>four (perhaps five) are moribund</b>. More than half of what follows is dead or dying, and several languages below are down to <b>single-digit speaker counts</b>.`,
   `<b>One caveat about the map.</b> The standard reconstruction of where these languages sat is Blust's, and it shows the position "before Chinese colonization". Its white area — the western plains — is <b>unattested</b>: some maps fill it in with Luiyang, Kulon or a generic "Ketagalan", but the record there is a hole rather than an empty space. The map captions here say so as well.`],
 t:[["c. 4500 BCE","Proto-Austronesian, on Li's reconstruction (2008)"],[". 3000 BCE","Rukai splits off — the first division in the family"],[". 2500 BCE","Tsouic, and then most other splits through to 0 BCE"],[". 1000 CE","The Western Plains languages diverge"],[". 1624–1662","Dutch Formosa; the Sinckang manuscripts are written"],[". 17th–19th c.","Han colonisation of the plains; most plains languages die"],[". 1895–1945","Japanese rule; Thao-speaking is criminalised"],[". 1945–1987","Kuomintang rule; Mandarin imposed as the sole national language"],[". 2001–2017","The Indigenous Languages Development Act; Paiwan and others become national languages"],[". 2010","Pazeh loses its last native speaker"]],
 kids:[
  { id:"protoan", en:"Proto-Austronesian", nat:"*Cau", zh:"原始南岛语", py:"Yuánshǐ Nándǎoyǔ", sp:"reconstructed",
    region:"Reconstructed — placed in Taiwan, c. 4500 BCE on Li's dating",
    cls:"c-his",
    mk:[[23.51,120.80,"Yushan — the traditional origin point in Tsouic oral history"],[24.15,121.25,"Central Mountain Range"]],
    h:[`Proto-Austronesian is <b>the ancestor of the largest language family on earth by geographic spread</b> — Madagascar to Rapa Nui, Hawaii to New Zealand — and on the current consensus it was spoken <b>in Taiwan</b>, around <b>4,500 BCE</b> on Li's dating. That is why this atlas exists: the nine branches below are not a family inside Taiwan, they are <b>the deepest divisions of Austronesian</b>, and the rest of the family is one branch that left.`,
       `The name shown for it, <b>*Cau</b>, is a reconstruction rather than an autonym — hence the asterisk. It means "person", and it survives as the self-name of two peoples on opposite sides of the island: <b>Tsou</b> and <b>Thao</b>, each of whose entries records that the two names are cognate. A 4,500-year-old word for "person" is still in use as two ethnic names today.`,
       `<b>One language on the island does not descend from that migration at all.</b> <b>Yami/Tao</b>, on Orchid Island, is a Malayo-Polynesian language of the <b>Batanic</b> subgroup — "the only native language of Taiwanese indigenous peoples that is not a member of the Formosan grouping". It appears in this atlas because of where it is, not what it is.`],
    t:[["c. 4500 BCE","Proto-Austronesian in Taiwan, on Li (2008)"],
       ["c. 3000 BCE","The first split: Rukai"],
       ["c. 2500 BCE","Tsouic; then most other branches through to 0 BCE"],
       ["c. 1500 BCE–1000 CE","The Austronesian expansion out of Taiwan"],
       ["c. 2026","≈26 languages left on the island, at least ten extinct"]],
    kids:[] },

  { id:"atayalic", en:"Atayalic", zh:"泰雅语支", py:"Tàiyǎ yǔzhī", sp:"2 languages, ≈106,000 speakers",
    region:"The northern and central mountains of Taiwan, along the Hsuehshan Range",
    cls:"c-ata",
    mk:[[24.65,121.42,"Squliq Atayal country"],[24.20,121.30,"C'uli' Atayal country"],[23.95,121.45,"Truku Seediq country"],[24.05,121.60,"Taroko gorge"]],
    h:[`Atayalic is one of the nine primary branches, and it has two members: <b>Atayal</b> and <b>Seediq</b>. Both are mountain languages of the north and centre, both are written in Latin-script alphabets devised in the twentieth century, and between them they hold most of the family's remaining speakers north of the Amis country.`,
       `The branch is the clearest case in this atlas of a <b>naming problem</b>: Seediq is also called <b>Truku</b> and was formerly transcribed as <b>Taroko</b>, because its own three dialect groups each call themselves by the name of their dialect while <b>the Amis call them all "Taroko"</b>. So the same people appear in the literature under two unrelated-looking names, and one of them is somebody else's word for them.`,
       `Both languages are classed <b>Vulnerable</b> by UNESCO, and both are among the very few Formosan languages with speaker counts in the tens of thousands rather than the hundreds. That is not a comfortable margin, but it is the healthiest part of this map.`],
    t:[["c. 2000–0 BCE","Atayalic among the later primary splits"],
       ["1930","The Wushe (Mona Rudao) uprising, in Seediq country"],
       ["1980","Egerod's Atayal–English dictionary is published"],
       ["2003","The Bible is completed in Atayal"],
       ["–","Both languages classed Vulnerable by UNESCO"]],
    kids:[
     { id:"atayal", en:"Atayal (Tayal)", nat:"Atayal", zh:"泰雅语", py:"Tàiyǎ yǔ", sp:"85,888, 2008",
       region:"The Hsuehshan Range and the northern and central mountains of Taiwan",
       cls:"c-ata",
       mk:[[24.65,121.42,"Squliq — the northern dialect"],[24.20,121.30,"C'uli' (Ts'ole') — the southern dialect"],[24.55,121.35,"Wufeng — Mayrinax Atayal"],[24.80,121.20,"Hsinchu mountains"]],
       h:[`Atayal is the northern half of Atayalic and one of the two largest Formosan languages, with <b>85,888 speakers</b> recorded in 2008. Its two major dialects are <b>Squliq</b> and <b>C'uli' (Ts'ole')</b>, and two subdialects of C'uli' do something no other language here does: <b>Matu'uwal and Pa'kuali' "are unique among Atayal dialects in having male and female register distinctions in their vocabulary"</b> — different words for the same thing depending on who is speaking.`,
          `Its twentieth century is a clear case of suppression without extinction: under Kuomintang rule "Taiwan saw the imposition of Mandarin Chinese as the sole national language, resulting in the suppression of indigenous languages, including Atayal", and mandatory Mandarin instruction "led to a decline in the intergenerational transmission of Atayal". Despite that, "Atayal communities maintained their language in private and informal settings" — which is the difference between suppression and loss.`,
          `Two further things belong here. Atayal is one of the source languages of <b>Yilan Creole Japanese</b>, a creole that grew up in the Japanese period and is treated alongside the Japonic atlas. And its 2003 Bible translation makes it one of the few Formosan languages with a complete scriptural text — a common route to standardisation for small languages worldwide.`],
       t:[["c. 2000–0 BCE","Atayalic splits into the Atayal and Seediq lines"],
          ["1895–1945","Japanese rule; the Atayal are among the last to be subdued"],
          ["1963","Valle's handbook of Wufeng Atayal is published"],
          ["1980","Egerod's Atayal–English dictionary appears"],
          ["2003","The Bible is completed in Atayal"]],
       kids:[] },

     { id:"seediq", en:"Seediq (Truku, Taroko)", nat:"Kari Seediq", zh:"赛德克语", py:"Sàidékè yǔ", sp:"20,000, 2008",
       region:"Central, eastern and coastal Taiwan — the mountains behind Hualien and Nantou",
       cls:"c-ata",
       mk:[[23.95,121.45,"Truku — the largest dialect group"],[24.05,121.60,"Taroko gorge"],[23.85,121.20,"Toda country"],[24.02,120.95,"Tgdaya (Paran) country"]],
       chips:[["UNESCO lists it as Vulnerable under the older name Taroko"],["dialect figures are membership, not speaker counts"]],
       h:[`Seediq is the Atayalic language of the central and eastern mountains, and it has <b>three dialect groups</b>: <b>Truku</b>, <b>Toda</b> and <b>Tgdaya</b>. <b>The figures attached to them are membership, not speaker counts</b> — the source gives "20,000 members including non-speakers" for Truku and 2,500 each for Toda and Tgdaya — so the figure of <b>20,000 (2008)</b> used here is an ethnic count and should be read as one.`,
          `Its naming is the most tangled in the family. The language is called <b>Seediq</b> by linguists, <b>Truku</b> after its largest dialect group, and was transcribed as <b>Taroko</b> in older sources — a name that is really the Amis' word for all three groups. UNESCO's own listing still reads "<b>Taroko</b> is classified as Vulnerable". All three names are worth knowing, because all three appear in the literature.`,
          `Seediq is also, historically, the language of the <b>Wushe uprising of 1930</b> — the largest armed resistance to Japanese colonial rule in Taiwan, led from Truku country. It is recorded here as history, not used as a linguistic fact.`],
       t:[["c. 2000–0 BCE","The Seediq line separates from Atayal"],
          ["1895–1945","Japanese rule; the Wushe uprising of 1930"],
          ["2005","Tsukida's description of the three dialect groups"],
          ["2018","Grammar volumes published for Seediq and Truku separately"]],
       kids:[] }
    ] },

  { id:"eastform", en:"East Formosan", zh:"东台湾南岛语支", py:"Dōng Táiwān Nándǎoyǔ zhī",
    region:"The east coast and the southern plains of Taiwan, from Hualien down to Tainan",
    cls:"c-east",
    mk:[[23.98,121.61,"Hualien — Amis and Sakizaya"],[22.76,121.14,"Taitung — Amis south"],[24.60,121.85,"Kavalan country — the north-east coast"],[22.99,120.20,"Tainan — Siraya country"]],
    h:[`East Formosan is the branch that holds <b>the family's largest language and its best revival story</b>: <b>Amis</b>, at 108,000 speakers, and <b>Sakizaya</b>, which was reclassified out of Amis and recognised as a people in 2007. It also holds the two branches that lost their ground most completely — <b>Kavalan</b>, pushed off its own coast, and <b>Siraya</b>, extinct by the end of the nineteenth century.`,
       `The branch's geography is a long arc: the north-east coast (Kavalan), down the east coast (Amis, Sakizaya) and round to the south-western plains (Siraya). That arc is why the sketch here needs the whole island rather than a corner of it.`,
       `<b>A classification note worth stating.</b> The standard Formosan map records that <b>Malayo-Polynesian "may lie within Eastern Formosan"</b> — a claim about the shape of Austronesian as a whole rather than about Taiwan. It matters here because it is the reason this branch sits next to the outlying group containing Yami and Tsat.`],
    t:[["c. 2000–1000 BCE","East Formosan among the primary splits"],
       ["1624–1662","Dutch Formosa; Siraya is written in the Sinckang manuscripts"],
       [". 19th c.","Siraya ceases to be spoken; Kavalan is displaced from the north-east"],
       ["1878","The Takobowan incident; Sakizaya hides among the Amis"],
       ["2007","Sakizaya recognised as an indigenous people; 2020s Siraya revival"]],
    kids:[
     { id:"amis", en:"Amis (Pangcah)", nat:"Sowal no ʼAmis · Pangcah", zh:"阿美语", py:"Āměi yǔ", sp:"108,000, 2015",
       region:"The east coast of Taiwan from Hualien to Taitung, plus the Hengchun Peninsula",
       cls:"c-east",
       mk:[[23.98,121.61,"Hualien — the northern end"],[23.11,121.32,"Chenggong"],[22.76,121.14,"Taitung — the southern end"],[23.85,121.50,"Nataoran — Sakizaya country"],[22.00,120.75,"Hengchun Peninsula"]],
       h:[`Amis is <b>the largest Formosan language</b>, with <b>108,000 speakers</b> in 2015 out of about <b>200,600 ethnic Amis</b>, and it is spoken along the whole east coast from <b>Hualien</b> to <b>Taitung</b>, with a further population on the <b>Hengchun Peninsula</b>. It is the only language here with a speaker count in six figures.`,
          `It is a <b>dialect cluster</b> of five dialects — Southern Amis, Tavalong-Vataan, Central Amis, Chengkung-Kwangshan and Northern Amis (Nanshi Amis, including Nataoran) — and "the northern varieties are considered to be separate languages". That is the hook the whole Sakizaya story hangs on.`,
          `Its public presence is the most visible of any language here: "Government services in counties where many Amis people live in Taiwan broadcast in Amis alongside Mandarin, such as at the <b>Hualien and Taitung railway stations</b>." The qualification is immediate — "few Amis under the age of 20 spoke the language in 1995", and "it is not known how many of the 200,000 ethnic Amis speak the language". UNESCO classes Amis <b>Vulnerable</b>. The ethnic figure and the speaker figure are given side by side rather than treating the larger as the answer.`],
       t:[["c. 2000–1000 BCE","East Formosan; the Amis–Sakizaya line forms"],
          [". 17th–19th c.","Amis country largely escapes Han settlement of the plains"],
          ["1878","Sakizaya refugees settle among the Nataoran Amis"],
          ["1995","Few under-20s speaking; the shift is visible"],
          ["2015","108,000 speakers against 200,600 ethnic Amis"]],
       kids:[] },

     { id:"sakizaya", en:"Sakizaya", zh:"撒奇莱雅语", py:"Sāqíláiyǎ yǔ", sp:"590, 2020",
       region:"The eastern Pacific coast of Taiwan, around Hualien — the Takubuwan, Sakur, Maifor and Kaluluwan communities",
       cls:"c-east",
       mk:[[23.98,121.61,"Hualien — the Sakizaya communities"],[24.05,121.60,"Takubuwan"],[23.92,121.55,"Sakur"],[24.12,121.65,"Kaluluwan"]],
       chips:[["recognised as a people in 2007"],["reclassified out of Amis in 2002"]],
       h:[`Sakizaya is the one genuinely hopeful story on this map, and it is also a story about <b>a classification error that lasted 129 years</b>. After the <b>Takobowan incident of 1878</b>, "the Sakizaya people hid among the Nataoran Amis. Scholars thus <b>mistakenly categorised the Sakizaya language as a dialect of Amis</b>." The error stood until <b>2002</b>, when the Center of Aboriginal Studies at National Chengchi University corrected it while editing indigenous language textbooks. On <b>17 January 2007</b> the Sakizaya became "the <b>thirteenth</b> distinct indigenous ethnic group recognised by the Taiwanese government".`,
          `<b>The numbers here need care, and both are given.</b> "A total of <b>985</b> people are registered as Sakizaya", but "thousands of other Sakizaya are still <b>registered as Amis, based on historic classifications</b>" — and "around half of Amis politicians in Hualien City... are said to be ethnic Sakizaya". The <b>590 speakers</b> (2020) are those who answer as Sakizaya; the community is larger than its registration.`,
          `<b>Two different totals appear in the same account and both are correct.</b> The Sakizaya are called "one of the <b>sixteen</b> distinct indigenous groups on the island" in one place and their recognition is dated as "the <b>thirteenth</b>" in 2007 in another. The sixteen is today's total; the thirteen was their place in the recognition sequence. UNESCO still classes the language <b>Critically Endangered</b>, and no autonym is recorded for it, so none is shown.`],
       t:[["1878","The Takobowan incident; Sakizaya hides among the Nataoran Amis"],
          ["1878–2002","129 years classified as an Amis dialect"],
          ["2002","National Chengchi University corrects the classification"],
          ["17 Jan 2007","Recognised as the thirteenth indigenous people of Taiwan"],
          ["2020","590 speakers; 990 registered, against thousands still registered as Amis"]],
       kids:[] },

     { id:"kavalan", en:"Kavalan (Kbaran)", nat:"kbaran · kebalan", zh:"噶玛兰语", py:"Gámǎlán yǔ", sp:"70, 2015",
       region:"The east coast of Taiwan — four communities around Hualien, far south of the Kavalan homeland",
       cls:"c-east",
       mk:[[24.60,121.85,"The original north-east coast homeland"],[23.98,121.61,"Kariawan — near Hualien"],[23.60,121.52,"Patʀungan (Xinshe)"],[23.40,121.45,"Kulis and Kralut"]],
       chips:[["no longer spoken in its original area"],["70 speakers, 2015"]],
       h:[`Kavalan is the clearest case here of a language that has been <b>displaced off its own map</b>. It "was formerly spoken in the Northeast coast area of Taiwan", and the record states it flatly: "<b>Kavalan is no longer spoken in its original area.</b>" Its four surviving speech communities are all on the <b>east</b> coast, and they are "named after older settlements from the north, such as Kariawan, Sahut, and Tamayan" — the names were carried south like luggage.`,
          `The decline is documented decade by decade: as of <b>1930</b> it was used "only as a home language"; as of <b>1987</b> it was still spoken in <b>Atayal</b> territory; in <b>2000</b> only <b>24 speakers</b> were reported and it was "considered moribund"; by <b>2015</b> the figure is <b>70</b>. Those last two come from different surveys with different methods and should not be read as a trend line.`,
          `<b>The most striking finding here is from 2017.</b> A study applying the <b>EDGE</b> metric — imported from species conservation — found that Kavalan, "although critically endangered, was among the <b>most lexically distinct</b> of Austronesian languages". So this is not only a dying language; it is one of the most isolated vocabularies in a family that spans half the planet, at seventy speakers. <b>Modern-day Kavalan speakers are surrounded by Amis</b>, which is the last thing to say about them.`],
       t:[["c. 1000 CE","Kavalanic established on the north-east coast"],
          [". 18th–19th c.","Han settlement of the Lanyang plain displaces the Kavalan south"],
          ["1930","Reduced to a home language"],
          ["2000","24 speakers reported; moribund"],
          ["2017","Found among the most lexically distinct Austronesian languages"]],
       kids:[] },

     { id:"siraya", en:"Siraya (Siraiya)", zh:"西拉雅语", py:"Xīlāyǎ yǔ",
       region:"The south-western plains of Taiwan, around present-day Tainan — and, after the 2020s revival, in Sinhua District",
       cls:"c-east",
       mk:[[22.99,120.20,"Tainan — the Siraya heartland"],[23.10,120.35,"Sinhua District — the revival classrooms"],[23.00,120.25,"Kou-pei and Chiou Chen Lin area"],[22.68,120.49,"Makatao country — Pingtung"]],
       chips:[["extinct by the end of the 19th century"],["revived — dormant for a century, spoken again in the 2020s"]],
       h:[`Siraya is <b>the language that came back</b>. It was the speech of the south-western plains around present-day <b>Tainan</b>, it died out at the end of the nineteenth century, and in the 2020s children in Tainan are speaking and singing it again. It also has the deepest documentary record of any Formosan language — written down by Dutch missionaries in the seventeenth century.`,
          `<b>Its classification has just changed.</b> Siraya "was previously thought to include three dialects" — Siraya proper, <b>Taivoan</b> and <b>Makatao</b> — but "more and more evidences have shown that Siraya, Taivoan, and Makatao are <b>three different languages</b>, rather than three dialects, forming the <b>Sirayaic</b> languages". It is filed here under East Formosan with a Sirayaic note rather than under a branch the sources have only just begun to agree on.`,
          `<b>The Dutch records contain the best single detail in this atlas.</b> From the <i>Dagregisters van het Kasteel Zeelandia</i> (1629–1662): to speak to the chief of Cannacannavo, the Dutch had to translate "from <b>Dutch</b> to Sinckan (<b>Siraya</b>), from Sinckan to <b>Tarroequan</b>, from Tarroequan to <b>Taivoan</b>, and from Taivoan to <b>Cannacannavo</b>". <b>Four languages across one island</b>, recorded by a colonial administration that needed every one of them.`,
          `The revival is specific rather than aspirational: after more than a decade of cultural and language work, "a group of Siraya children in <b>Sinhua District</b> of Tainan, particularly in Kou-pei and Chiou Chen Lin area, are able to <b>speak and sing</b> in the Siraya language". Siraya is described as "<b>dormant for a century</b>" rather than dead — the same choice this series makes for Ainu. No autonym is recorded; only the exonym survives, alongside the name of the manuscripts.`],
       t:[["1624–1662","Dutch Formosa; Siraya is written in the Sinckang manuscripts"],
          [". 17th–18th c.","Han settlement of the plains; Hoklo displaces Siraya"],
          [". 19th c.","Siraya ceases to be spoken — extinct by the end of the century"],
          ["2000s","A Sirayan cultural and language revitalisation movement begins"],
          ["2020s","Children in Sinhua District speak and sing in Siraya"]],
       kids:[] }
    ] },

  { id:"northwest", en:"Northwest Formosan", zh:"西北台湾南岛语支", py:"Xīběi Táiwān Nándǎoyǔ zhī",
    region:"The north-western mountains and foothills of Taiwan — Hsinchu, Miaoli and the Puli basin",
    cls:"c-nw",
    mk:[[24.60,121.05,"Wufeng — Saisiyat"],[24.45,120.95,"Nanzhuang — Saisiyat"],[23.97,120.96,"Puli — Kaxabu country"],[24.30,120.75,"The old Pazeh area"]],
    h:[`Northwest Formosan holds two languages and, between them, the sharpest contrast on this map: <b>Saisiyat</b>, which still has several thousand speakers and is nonetheless classed <b>Severely Endangered</b>, and <b>Pazeh–Kaxabu</b>, whose Pazeh half lost its last native speaker in <b>2010</b>.`,
       `The branch's geography is small and squeezed: Saisiyat sits "between the <b>Hakka Chinese</b> and <b>Atayal</b> regions in the mountains", and many Saisiyat speakers also speak Hakka, Atayal, Mandarin and sometimes Min Nan. Five languages in one community is not a sign of health; it is what happens when a small speech area sits where three larger ones meet.`,
       `<b>Kulon is named here rather than mapped.</b> It was an extinct Formosan language "closely related to Saisiyat" but "considered by Li to be a separate language", and Pazeh–Kaxabu's Glottolog code is <b>kulo1237</b> — the Kulon code. Kulon has no place on the map: it is extinct, barely attested, and its position is unresolved, so naming it in prose is more honest than giving it a false precision.`],
    t:[["c. 2000–1000 BCE","Northwest Formosan among the primary splits"],
       [". 17th–19th c.","Han settlement of the western plains reaches the foothills"],
       [". 20th c.","Pazeh declines; Kaxabu survives at Puli"],
       ["2010","The last native speaker of the Pazeh dialect dies"],
       [". 2010s–","Pazeh and Kaxabu revival work; Pazeh writers receive awards in 2014"]],
    kids:[
     { id:"saisiyat", en:"Saisiyat (Saisiat)", nat:"SaiSiyat", zh:"赛夏语", py:"Sàixià yǔ", sp:"4,750, 2002",
       region:"The north-western mountains of Taiwan — Wufeng in Hsinchu, Nanchuang and Shitan in Miaoli",
       cls:"c-nw",
       mk:[[24.60,121.05,"Wufeng — Taai, the northern dialect"],[24.45,120.95,"Nanchuang"],[24.40,120.90,"Shitan — Tungho, the southern dialect"],[24.55,121.00,"The Atayal border"]],
       h:[`Saisiyat is the trap this atlas exists to show: <b>a relatively large speaker count attached to an endangered language</b>. It has <b>4,750 speakers</b> (2002) out of about 7,900 ethnic Saisiyat — a figure for which no source is given anywhere in the record. UNESCO nonetheless classes it <b>Severely Endangered</b>, and the reason is stated alongside the count: "<b>Today, one thousand Saisiyat people do not use the Saisiyat language.</b>"`,
          `Its situation is multilingual in a way that is easy to misread as vitality. Many Saisiyat "are able to speak <b>Saisiyat, Hakka, Atayal, Mandarin, and, sometimes, Min Nan</b> as well", and "many young people use <b>Hakka or Atayal</b> instead, and few children speak Saisiyat". The conclusion drawn from the same evidence is careful: "Although Saisiyat has a relatively large number of speakers, the language is endangered."`,
          `Two dialects are named — <b>Taai</b> (North Saisiyat, in Hsinchu) and <b>Tungho</b> (South Saisiyat, in Miaoli) — and Hakka influence "varies wildly between more isolated dialects with almost no Hakka influence and less isolated dialects with heavy Hakka influence". A language can be more than one thing at once depending on which village you are in.`],
       t:[["c. 2000–1000 BCE","Northwest Formosan; the Saisiyat line forms"],
          [". 18th–19th c.","Hakka and Atayal neighbours move into the same mountains"],
          ["1978","Li's comparative vocabulary of the Saisiyat dialects"],
          ["2015","Zeitoun, Chu and Kaybaybaw's study of Saisiyat morphology"],
          ["–","UNESCO Severely Endangered, despite 4,750 speakers"]],
       kids:[] },

     { id:"pazeh", en:"Pazeh–Kaxabu (Pazih)", zh:"巴宰语", py:"Bāzǎi yǔ", sp:"12, 2013 (Kaxabu dialect only)",
       region:"The Puli basin in Nantou County, after displacement from the Taichung foothills",
       cls:"c-nw",
       mk:[[23.97,120.96,"Puli Township — the Kaxabu villages"],[24.25,120.70,"The original Pazeh area, Taichung foothills"],[23.90,120.85,"Shoucheng — the Kaxabu dictionary project"]],
       chips:[["Pazeh dialect extinct 2010"],["Kaxabu: 12 speakers, 2013"],["revival under way since the 2010s"]],
       h:[`Pazeh–Kaxabu is <b>one language in two opposite states at once</b>, and both are true. The last remaining native speaker of the <b>Pazeh</b> dialect, Pan Jin-yu, died in <b>2010</b> — while <b>12 speakers of Kaxabu remain in Puli Township, Nantou County</b>, recorded in 2013. It is the same language with two dialects, and one of them has outlived the other by more than a decade.`,
          `Splitting it in two would misrepresent a single language; reporting only its extinction, or only its twelve speakers, would each be half the truth. So both are given: <b>Pazeh</b>, extinct in 2010, and <b>Kaxabu</b>, alive at a dozen speakers.`,
          `<b>Two details worth keeping.</b> First, its Glottolog code is <b>kulo1237</b> — the <b>Kulon</b> code — which is why Kulon appears in this prose rather than on the map. Second, the revival has measurable results: <b>Pazeh writers received awards for preserving the language in 2014</b>, four years after the last native speaker died. Documentation had begun earlier and thoroughly — Li and Tsuchida's <i>Pazih Dictionary</i> in 2001 and their <i>Pazih Texts and Songs</i> in 2002, both published while Pazeh still had speakers.`],
       t:[["c. 2000–1000 BCE","Northwest Formosan; the Pazeh line forms on the western foothills"],
          [". 17th–19th c.","Hoklo Taiwanese displace Pazeh from the Taichung area"],
          ["2001–2002","Li and Tsuchida publish the Pazih dictionary and texts"],
          ["2010","Pan Jin-yu dies; the Pazeh dialect is extinct"],
          ["2014","Pazeh writers receive awards for preserving the language"]],
       kids:[] }
    ] },

  { id:"westplains", en:"Western Plains Formosan", zh:"西部平原南岛语支", py:"Xībù Píngyuán Nándǎoyǔ zhī",
    region:"The western plains and the Sun Moon Lake basin of central Taiwan",
    cls:"c-wp",
    mk:[[23.85,120.93,"Sun Moon Lake — Thao country"],[24.05,120.60,"The western plains, largely unattested"],[23.48,120.45,"Chiayi"]],
    h:[`Western Plains Formosan is a branch with <b>one language left in it</b>, and its own name is a reminder of how much has gone. The white area on the standard Formosan map — the western plains — is <b>unattested</b>: "some maps fill it in with Luiyang, Kulon or as generic 'Ketagalan'", but the record there is a gap. Li dates the Western Plains split to around <b>1,000 CE</b>, a thousand years later than every other primary division in the family.`,
       `What survives is <b>Thao</b>, at Sun Moon Lake, with <b>four speakers</b>. The branch is kept separate rather than folded into East Formosan because that is where the sources put it, and because the emptiness of the branch is itself the fact worth showing on a map.`],
    t:[["c. 1000 CE","The Western Plains languages diverge, on Li's dating"],
       [". 17th–19th c.","Han settlement of the western plains; most of the branch is lost"],
       [". 20th c.","Thao declines to single-digit speaker numbers"],
       ["2003","Blust's Thao Dictionary is published"]],
    kids:[
     { id:"thao", en:"Thao (Sao)", nat:"Thau a lalawa", zh:"邵语", py:"Shào yǔ", sp:"4, 2021",
       region:"The Sun Moon Lake area of central Taiwan — the village of Ita Thaw (Barawbaw)",
       cls:"c-wp",
       mk:[[23.85,120.93,"Ita Thaw (Barawbaw) — Sun Moon Lake"],[23.80,120.90,"Shtafari"],[23.88,120.96,"The lake's northern shore"]],
       chips:[["4 speakers, 2021"],["820 ethnic Thao (2020)"],["speaking it was criminalised"]],
       h:[`Thao is one of two languages here down to <b>four speakers</b>, and it is the one whose cause is documented in a single sentence: "<b>Speaking Thao was criminalised under Japanese rule of Taiwan and later the Kuomintang regime</b>, contributing to its critically endangered status today." That is not a metaphor for decline; it is a policy.`,
          `The end is recorded year by year. In <b>2014</b> there were four L1 speakers and one fluent L2 speaker living at Ita Thaw, "all but one of whom were over the age of sixty". <b>Two elderly native speakers died in December 2014</b>, "including chief Tarma (Yuan Mingzhi), age 75". By <b>2021</b>, four elderly L1 speakers remained, against an ethnic population of <b>820</b>.`,
          `Its two dialects are <b>Brawbaw</b> and <b>Shtafari</b>. Thao has an unusual advantage: Robert Blust's <b>Thao Dictionary</b>, published by Academia Sinica in <b>2003</b>, is a full description of the language made while it still had speakers — which is why more is known about four-speaker Thao than about several languages here with hundreds. Its own name for itself is <i>Thau a lalawa</i>, "Thao speech", and the name Thao itself means "person" — cognate with <b>Tsou</b>.`],
       t:[["c. 1000 CE","The Western Plains branch diverges"],
          ["1895–1945","Japanese rule; speaking Thao is criminalised"],
          [". 1960s–1980s","The Kuomintang regime imposes Mandarin as the sole national language"],
          ["2003","Blust's Thao Dictionary is published"],
          ["Dec 2014","Two elderly native speakers die, including chief Tarma"],
          ["2021","Four elderly L1 speakers remain"]],
       kids:[] }
    ] },

  { id:"tsouic", en:"Tsouic (doubtful)", zh:"邹语支", py:"Zōu yǔzhī", sp:"3 languages, 2 of them near extinction",
    region:"The west-central and south-western mountains of Taiwan — Alishan, Namasia and the Laonung valley",
    cls:"c-tsu",
    mk:[[23.47,120.80,"Alishan — Tsou country"],[23.25,120.75,"Maya Village — Kanakanavu"],[23.10,120.72,"Taoyuan District — Saaroa"],[23.51,120.80,"Yushan — the traditional origin point"]],
    chips:[["linguists dispute whether this branch exists"]],
    h:[`⚠ <b>Tsouic is the one doubtful grouping in this atlas, and the doubt comes from the linguists rather than from caution here.</b> Tsou "has traditionally been considered part of a Tsouic branch", but <b>Chang (2006)</b> and <b>Ross (2009)</b> "dispute the Tsouic branch, with Tsou more divergent than the other two languages, <b>Kanakanavu</b> and <b>Saaroa</b>". The three are shown together because that is the conventional grouping, and marked as disputed rather than presented as settled.`,
       `Two of the three are in immediate danger of disappearing and one is not, which makes this group an unusually clear picture of what a family's last decades look like: <b>Tsou</b> has about 4,100 speakers; <b>Kanakanavu</b> has <b>four</b>; <b>Saaroa</b> has <b>ten</b>, and one of those died in 2013.`,
       `The group also carries the oldest story anyone tells about itself, from Saaroa oral tradition: the Tsouic peoples "originated in <b>Yushan</b>"; about <b>2,000 years ago</b> they split into Northern Tsou (down the Nantzuhsien River) and Southern Tsou (down the Laonung River); the latter split into Kanakanavu and Saaroa "about <b>800 years ago</b>". Those are the community's own numbers, recorded here as tradition rather than as dating.`],
    t:[["c. 2500 BCE","Tsouic splits from Proto-Austronesian, on Li's dating"],
       ["c. 1000 BCE","Tsou and Southern Tsouic separate"],
       [". c. 1200 CE","Kanakanavu and Saaroa split, per the oral tradition"],
       [". 17th–20th c.","The group's territory shrinks under invasion and disease"],
       ["2012–2021","Kanakanavu 4 speakers; Saaroa 10, one dying in 2013"]],
    kids:[
     { id:"tsou", en:"Tsou", nat:"eʼe no cou", zh:"邹语", py:"Zōu yǔ", sp:"4,100, 2015",
       region:"The west-central mountains south-east of the Alishan Range, Taiwan",
       cls:"c-tsu",
       mk:[[23.47,120.80,"Alishan Range"],[23.40,120.85,"Tapangʉ — a surviving dialect"],[23.35,120.78,"Tfuya — the other surviving dialect"],[23.30,120.70,"Duhtu and Iimcu — extinct dialects"]],
       chips:[["Definitely Endangered (UNESCO)"],["two of its four dialects are extinct"]],
       h:[`Tsou is the largest Tsouic language at <b>4,100 speakers</b> (2015), and its name is a small piece of poetry. "The name <i>Tsou</i> literally means '<b>person</b>', from Proto-Austronesian <b>*Cau</b> through regular sound changes. It is therefore <b>cognate with the name of the Thao language</b>" — and the Thao record says the same thing in reverse. Two peoples on opposite sides of Taiwan, both naming themselves "person" with the same 4,500-year-old word.`,
          `<b>Half of its dialect range is already gone.</b> Four dialects are recorded — <b>Tapangʉ</b>, <b>Tfuya</b>, <b>Duhtu</b> and <b>Iimcu</b> — and <b>Duhtu and Iimcu are extinct</b>. Only Tapangʉ and Tfuya are still spoken, and Iimcu "has not been well described", so one of the two dead dialects is also barely documented. The surviving dialects' grammar is "nearly identical" and their phonological variation marginal, which is why the language still functions as one.`,
          `Tsou is classed <b>Definitely Endangered</b> by UNESCO, and its position is the evidence behind the doubt over this branch: it is "more divergent than the other two languages", which is what makes grouping all three together questionable.`],
       t:[["c. 1000 BCE","Northern Tsou separates from Southern Tsouic"],
          ["1895–1945","Japanese rule; the Alishan area is surveyed and recorded"],
          ["1964","Tung T'ung-ho's descriptive study of Tsou is published"],
          ["2015","4,100 speakers; Duhtu and Iimcu already extinct"]],
       kids:[] },

     { id:"kanakanavu", en:"Kanakanavu (Kanakanabu)", nat:"kari Kanakanavu", zh:"卡那卡那富语", py:"Kǎnàkǎnàfù yǔ", sp:"4, 2012",
       region:"Maya Village in Namasia District, Kaohsiung — two villages, Manga and Takanua",
       cls:"c-tsu",
       mk:[[23.25,120.75,"Maya Village — Namasia District"],[23.20,120.72,"Takanua"],[23.30,120.80,"Manga"]],
       chips:[["4 speakers, 2012"],["360 ethnic Kanakanavu (2020)"],["Critically Endangered (UNESCO)"]],
       h:[`Kanakanavu is one of two languages here down to <b>four speakers</b> — four (2012) against an ethnic population of <b>360</b> (2020). It is spoken in two villages, <b>Manga</b> and <b>Takanua</b>, in Namasia District, Kaohsiung. UNESCO classes it <b>Critically Endangered</b>.`,
          `<b>The villages themselves are a colonial artefact.</b> "The village of Takanua is a village <b>assembled by Japanese rulers</b> to relocate various indigenous groups in order to establish easier dominion over these groups." The settlement pattern the language now survives in was drawn by an administration, not by where its speakers lived.`,
          `Its sound system is unusual in the family for containing <b>only voiceless plosives</b>, with 14 consonants and six vowels; it is also incompletely described — "adequate descriptions of liquid consonants become a challenge", vowel length is often unclear, and "very few, even simple words, contain less than three to four syllables". A four-speaker language with an unresolved phonology is a reminder of how much description there is left to do.`,
          `<b>It shares territory with Bunun and has partly shifted to it.</b> The Kanakanavu and the Saaroa "share their territory with an Isbukun Bunun group" and "have also adopted <b>Bunun as their vernacular</b>" — so the pressure on this language is not only from Mandarin but from <b>another Formosan language</b>.`],
       t:[["c. 1200 CE","Kanakanavu and Saaroa separate, per oral tradition"],
          [". 17th c.","Dutch records need a four-language chain to reach the Kanakanavu chief"],
          ["1930s","Takanua is assembled by Japanese administrators"],
          ["2012","4 speakers recorded"],
          ["2020","360 ethnic Kanakanavu"]],
       kids:[] },

     { id:"saaroa", en:"Saaroa (Hla'alua)", nat:"kari tahlana Hlaʼaluana", zh:"拉阿鲁哇语", py:"Lā'ālǔwā yǔ", sp:"10, 2012",
       region:"Taoyuan and Kaochung villages in Taoyuan District, Kaohsiung — south-east of Minchuan along the Laonung River",
       cls:"c-tsu",
       mk:[[23.10,120.72,"Taoyuan District — Taoyuan village"],[23.05,120.70,"Kaochung village"],[23.15,120.80,"The Laonung River valley"]],
       chips:[["10 speakers, 2012"],["no active speech community"],["Critically Endangered (UNESCO)"]],
       h:[`Saaroa is the clearest statement on this map of a language at its end. It has <b>10 speakers</b> (2012) against an ethnic population of <b>400</b>, and one of those ten died in 2013. The sentence that matters most is this: "Even among native speakers of the language, they use primarily <b>Mandarin or Bunun</b> in their daily lives. <b>There is no longer an active speech community for Saaroa.</b>"`,
          `<b>"No longer an active speech community" means something specific.</b> It means there is no setting in which the language is the ordinary medium of conversation — not that nobody can speak it. Ten people can; none of them uses it to talk to anyone else by default.`,
          `Its two villages are <b>Taoyuan</b> and <b>Kaochung</b>, in Taoyuan District, Kaohsiung, along the <b>Laonung River</b>. The oral tradition here is the oldest self-description in this atlas: origin at <b>Yushan</b>, a split into Northern and Southern Tsou about 2,000 years ago, and the Kanakanavu–Saaroa separation about 800 years ago. As early as <b>1990</b>, Saaroa was recorded as already "nearly extinct" and <b>Bunun was becoming the community's main language</b>.`],
       t:[["c. 1200 CE","Kanakanavu and Saaroa separate, per oral tradition"],
          [". 17th–19th c.","Invasion and disease shrink the Tsouic territory"],
          ["1990","Nearly extinct; Bunun becomes the community's main language"],
          ["2012","10 speakers; a grammar of Lha'alua is completed"],
          ["2013","One of the ten speakers dies"]],
       kids:[] }
    ] },

  { id:"rukai", en:"Rukai", nat:"Drekay · Drekai", zh:"鲁凯语", py:"Lǔkǎi yǔ", sp:"10,500, 2002",
    region:"Pingtung, Kaohsiung and Taitung counties — the southern mountains of Taiwan",
    cls:"c-ruk",
    mk:[[22.72,120.55,"Budai — the main dialect"],[22.85,120.62,"Labuan and Maga"],[22.60,120.72,"Tanan — the largest consonant inventory"],[22.95,120.85,"Tona"],[22.80,120.75,"Mantauran — the most divergent dialect"]],
    chips:[["the first language to split from Proto-Austronesian"],["the only Formosan language with no focus system"]],
    h:[`<b>Rukai is the oldest division in the Austronesian family, and the most consequential single language on this map.</b> Li dates its split from Proto-Austronesian to <b>c. 3000 BCE</b> — a thousand years before Tsouic and two to three thousand before most of the rest — and calls Rukai "the first language to have split from Proto-Austronesian". It stands alone as one of the nine primary subfamilies, with no closer relative than the rest of Austronesian.`,
       `What follows from that is not a curiosity but a methodological problem: classifications "repeatedly find that Rukai is one of the, and often <i>the</i>, most divergent of the Austronesian languages. It is therefore <b>prime evidence for reconstructing Proto-Austronesian</b>", and Ross (2009) notes that reconstructions to date "had <b>not taken Rukai into account</b>, and therefore <b>cannot be considered valid for the entire family</b>". A language of 10,500 speakers holds evidence that the standard reconstruction of a family spanning half the world has not yet absorbed.`,
       `Two structural facts make it unique here. It is "the only Formosan language <b>without a focus system</b>" — the voice system that organises nearly every other Formosan language's grammar. And <b>Tanan Rukai</b> "is the Formosan language with the <b>largest consonant inventory</b>, with 23 consonants and 4 vowels having length contrast", using an <b>animate/inanimate</b> distinction where most others use personal/non-personal.`,
       `Six dialects are named — <b>Budai, Labuan, Maga, Mantauran, Tanan, Tona</b> — with "varying degrees of mutual intelligibility", and <b>Mantauran</b> is "one of the most divergent". Some Rukai speakers are still monolingual, which has become rare in Taiwan. UNESCO classes the language <b>Vulnerable</b>.`],
    t:[["c. 3000 BCE","Rukai splits from Proto-Austronesian — the family's first division"],
       [". 17th–19th c.","Rukai territory in the southern mountains holds out against lowland settlement"],
       ["1973","Li's <i>Rukai Structure</i> is published"],
       ["2007","Zeitoun's grammar of Mantauran Rukai"],
       ["–","UNESCO Vulnerable, at 10,500 speakers"]],
    kids:[] },

  { id:"bunun", en:"Bunun", nat:"Bunun", zh:"布农语", py:"Bùnóng yǔ", sp:"38,000, 2002",
    region:"From Ren-ai in Nantou south to Yanping in Taitung — the central mountains, and beyond them",
    cls:"c-bun",
    mk:[[23.70,120.90,"Ren-ai — the northern dialects"],[23.48,120.95,"Sinyi Township (Xinyi) — the Bunun homeland"],[23.10,121.15,"Yanping — the southern limit"],[23.30,120.75,"Isbukun territory, shared with Kanakanavu and Saaroa"]],
    chips:[["one of the nine primary branches, alone"],["a sixth dialect went extinct in the 1970s"]],
    h:[`Bunun is another of the nine single-language primary branches, with no relative closer than the rest of Austronesian — and at <b>38,000 speakers</b> (2002) it is the third-largest language here. Its name "literally means '<b>human</b>' or 'man'", which makes three peoples on this map whose self-name is simply the word for person.`,
       `<b>Bunun expanded, and its expansion is why two other languages are dying.</b> "From the 17th century onwards, the Bunun people expanded towards the south and east, <b>absorbing other ethnic groups such as the Saaroa, Kanakanavu, and Thao</b>." The Saaroa and Kanakanavu "have also adopted <b>Bunun as their vernacular</b>". The pressures on the smallest languages here are not all external to Taiwan: one Formosan language is displacing two others.`,
       `Five dialects survive — <b>Isbukun</b> (the dominant and most divergent, in the south), <b>Takituduh</b>, <b>Takibaka</b>, <b>Takbanuaz</b> and <b>Takivatan</b> — and a sixth, <b>Takipulan</b>, "became extinct in the 1970s". The most conservative dialects are in the <b>Northern</b> branch, while Isbukun is both the prestige dialect and the most changed. UNESCO classes Bunun <b>Vulnerable</b>.`],
    t:[["c. 2000–0 BCE","Bunun among the primary splits"],
       [". 17th c.","Bunun expansion south and east begins from Sinyi Township"],
       [". 17th–19th c.","The Saaroa, Kanakanavu and Thao are absorbed or displaced"],
       [". 1970s","The Takipulan dialect becomes extinct"],
       ["2020","Shibata's reconstruction of Proto-Bunun"]],
    kids:[] },

  { id:"puyuma", en:"Puyuma (Pinuyumayan)", zh:"卑南语", py:"Bēinán yǔ", sp:"8,500, 2002",
    region:"The Taitung plain of south-eastern Taiwan — ten villages in the Puyuma and Katipul clusters",
    cls:"c-puy",
    mk:[[22.76,121.14,"Taitung — the Puyuma villages"],[22.72,121.10,"Nanwang (Puyuma) — the conservative dialect"],[22.80,121.05,"Ulivelivek (Chulu)"],[22.68,121.06,"Katratripul (Chihpen)"]],
    chips:[["falls outside reconstructions of Proto-Austronesian"],["most speakers are older adults"]],
    h:[`Puyuma is one of the nine single-language primary branches, and it is the second language here that the standard reconstruction cannot accommodate: "Puyuma is one of the more divergent of the Austronesian languages and <b>falls outside reconstructions of Proto-Austronesian</b>." Together with Rukai, that makes <b>two</b> of the nine branches whose evidence the accepted proto-language does not yet account for.`,
       `Its status is stated bluntly: "<b>Most speakers are older adults.</b>" It has <b>8,500 speakers</b> (2002), UNESCO classes it <b>Vulnerable</b>, and its altname — <b>Pinuyumayan</b> — is the form its own community uses. No autonym is recorded for Puyuma at all, so none is shown here rather than inventing one — exactly as with Sakizaya.`,
       `The dialect picture (Ting 1978) is a clean small tree: <b>Nanwang</b> branches first, then the main branch divides into Pinaski–Ulivelivek, Rikavung and Kasavakan–Katipul. The interesting detail is a mismatch: <b>Nanwang</b> is "relatively phonologically <b>conservative</b> but grammatically <b>innovative</b>", preserving proto-Puyuma voiced plosives while merging the oblique and genitive cases. Conservatism is not one thing.`,
       `Its villages carry meanings as names: the Puyuma cluster is described as "born of the bamboo" and the Katipul cluster as "<b>born of a stone</b>" — origin categories rather than places, which is why the markers here are villages and not a territory.`],
    t:[["c. 2000–0 BCE","Puyuma among the primary splits"],
       [". 17th–19th c.","The Taitung plain stays largely outside Han settlement"],
       ["1978","Ting's reconstruction of Proto-Puyuma phonology"],
       ["2008","Teng's reference grammar of Puyuma"],
       ["–","UNESCO Vulnerable; most speakers are older adults"]],
    kids:[] },

  { id:"paiwan", en:"Paiwan", nat:"Vinuculjan · Pinayuanan", zh:"排湾语", py:"Páiwān yǔ", sp:"96,334, 2014",
    region:"Southern Taiwan — the mountains and valleys of Pingtung and Taitung counties",
    cls:"c-pai",
    mk:[[22.68,120.49,"Pingtung — the Paiwan heartland"],[22.35,120.70,"Kulalao — the dictionary dialect"],[22.55,120.90,"Tjuabar and Tjariḍik"],[22.20,120.85,"The southernmost dialect, Tjuaqatsiɬay"],[22.76,121.14,"Taitung — eastern Paiwan"]],
    chips:[["a national language of Taiwan"],["a dialect list that two scholars disagree about"]],
    h:[`Paiwan is the second-largest Formosan language, with <b>96,334 first-language speakers</b> (2014), and one of the nine primary branches. It was "historically spoken as a second language by most people in southern Taiwan" — a regional lingua franca, not just an ethnic language — and it is now "one of the <b>national languages of Taiwan</b>" under the Indigenous Languages Development Act.`,
       `<b>Nobody is sure how many dialects it has, and the record says so.</b> "Although there aren't any solid dialects, many people have made guesses on what they think are the dialects." Ferrell's 1982 scheme gives six zones (A1, A2, B1–B4) with ten named varieties including <b>Kuɬaɬau</b>, the dialect used for his dictionary "due to its widespread intelligibility and preservation of various phonemic distinctions"; Cheng (2016) reorganises the same material into <b>Ravar</b> and Vuculj groups. The language is shown here without a dialect tree, because the sources do not agree on one.`,
       `<b>Even its name for itself is uncertain.</b> Two forms are recorded — <i>Vinuculjan</i> and <i>Pinayuanan</i> — and no source is given for the first. Both are shown, because both appear in the record and neither is fully established.`,
       `Paiwan has one of the better-documented grammars in the family — Chang's reference grammar (2006), Egli's <i>Paiwangrammatik</i> (1990) and Ferrell's dictionary (1982) — which is why more can be said about its affixes than about most languages here. UNESCO classes it <b>Vulnerable</b>.`],
    t:[["c. 2000–0 BCE","Paiwan among the primary splits"],
       [". 17th–19th c.","Paiwan serves as a regional second language in southern Taiwan"],
       ["1982","Ferrell's <i>Paiwan Dictionary</i> and dialect zones"],
       ["2014","96,334 first-language speakers"],
       ["2017","Paiwan becomes a national language of Taiwan"]],
    kids:[] },

  { id:"outliers", en:"Outlying Austronesian (not Formosan)", zh:"外围南岛语（非台湾南岛语）", py:"Wàiwéi Nándǎoyǔ",
    region:"Orchid Island, 46 km south-east of Taiwan; and two villages near Sanya on Hainan",
    cls:"c-out",
    mk:[[22.05,121.53,"Orchid Island — Yami/Tao"],[18.25,109.50,"Sanya, Hainan — Tsat/Utsul"],[20.42,121.97,"Batanes — the Yami homeland to the north"]],
    chips:[["neither of these is a Formosan language"]],
    h:[`<b>Two Austronesian languages sit inside this map area and neither belongs to the Formosan grouping.</b> <b>Yami/Tao</b>, on Orchid Island, is the one native language of Taiwan's Indigenous peoples that is not Formosan: it is <b>Malayo-Polynesian</b>, in the <b>Batanic</b> subgroup, and belongs with the languages of Batanes in the northern Philippines. <b>Tsat</b>, on Hainan, is a <b>Chamic</b> language whose relatives are in Vietnam and Sumatra.`,
       `Both appear here because of geography, and both are marked as outliers rather than folded into one of the nine branches. Putting them under East Formosan would be wrong; leaving them out would leave two Austronesian languages inside the map unexplained.`,
       `The pair is instructive. <b>Yami stayed in place</b> — same island chain, same subgroup as its neighbours across the Bashi Channel. <b>Tsat moved and was transformed</b>: an Austronesian language on the Chinese mainland, tonal, analytic, reshaped by contact with Hlai and Sinitic. One shows what the family looks like when it stays home; the other, when it does not.`],
    t:[["c. 1500 BCE–1000 CE","The Austronesian expansion out of Taiwan reaches the Philippines"],
       [". 968 CE","The fall of Indrapura; a Cham migration that contributes to the Utsul"],
       [". 15th c.","A second recorded migration from Champa to Hainan"],
       ["–","Yami stays Batanic; Tsat becomes a Mainland Southeast Asian language"]],
    kids:[
     { id:"yami", en:"Yami (Tao)", nat:"ciciring no Tao", zh:"雅美语（达悟语）", py:"Yǎměi yǔ (Dáwù yǔ)", sp:"≈4,000, 2012",
       region:"Orchid Island (Lanyu), 46 km south-east of Taiwan, and the Batanes to its north",
       cls:"c-out",
       mk:[[22.05,121.53,"Orchid Island (Lanyu)"],[22.02,121.55,"Irala and Iraralay — the northern villages"],[21.98,121.55,"Yayu and Iratai"],[20.45,121.97,"Itbayat, Batanes — the sister island chain"]],
       chips:[["the only non-Formosan Indigenous language of Taiwan"],["Malayo-Polynesian, not Formosan"]],
       h:[`Yami — the name its speakers prefer is <b>Tao</b>, and their own name for the language is <i>ciciring no Tao</i>, "the speech of people" — is <b>not a Formosan language</b>. It is the one native language of Taiwan's Indigenous peoples that belongs outside the Formosan grouping: it is <b>Malayo-Polynesian</b>, specifically <b>Batanic</b>, and its closest relatives are the languages of <b>Itbayat, Batan and Sabtang</b> in the northern Philippines, across the Bashi Channel.`,
          `⚠ <b>That is why Yami stands outside the nine Formosan branches.</b> Taiwan's government recognises the Tao as one of its Indigenous peoples, but linguistic classification and political recognition are different things: Yami is on this map because <b>Orchid Island is administered by Taiwan</b>, and it stands apart from the tree because <b>its family is elsewhere</b>.`,
          `Its speakers number about <b>4,000</b> (2012) on an island of some 3,000 people — meaning the language is spoken well beyond its ethnic base, by Tao and non-Tao alike. Yami has an unusual place in the study of this whole family: because it preserves <b>Proto-Malayo-Polynesian</b> forms and its homeland is one migration step from Taiwan, it has been used repeatedly as a control on reconstructions of Proto-Austronesian — the family that is <b>not</b> its own.`],
       t:[["c. 2000 BCE","The Austronesian expansion leaves Taiwan for the Philippines"],
          ["c. 1000 BCE–500 CE","The Batanic subgroup forms in the Bashi Channel islands"],
          [". 17th c.","Orchid Island comes into the Dutch and then Qing record"],
          ["1895–1945","Japanese rule; the island is administered from Taiwan"],
          ["2012","About 4,000 speakers"]],
       kids:[] },

     { id:"tsat", en:"Tsat (Hainan Cham, Utsul)", nat:"tsat", zh:"回辉话（占语）", py:"Huíhuī huà (Zhàn yǔ)", sp:"4,500, 2007",
       region:"Two villages on the southern coast of Hainan — Huihui and Yanglan, in Sanya",
       cls:"c-out",
       mk:[[18.25,109.50,"Huihui village — Sanya"],[18.30,109.55,"Yanglan village"],[18.15,109.35,"The coast south-west of Sanya"],[16.05,108.20,"Champa — the ancestral homeland in Vietnam"]],
       chips:[["Austronesian, on the Chinese mainland"],["tonal — 7 tones in Huihui"],["classified as a dialect by China"]],
       h:[`Tsat is <b>an Austronesian language spoken on the Chinese mainland</b>, and its speakers are one of China's officially recognised Muslim peoples. That fact is stranger than anything in the family tree: <b>a Chamic language, related to the Cham of Vietnam and to Acehnese in Sumatra, surviving in two villages on Hainan.</b>`,
          `It has about <b>4,500 speakers</b> (2007), and it is "the only Austronesian language that has been <b>strongly influenced by Chinese</b>" — an understatement for a language that has become <b>tonal and analytic</b>, with seven tones in the Huihui variety. Those two villages, <b>Huihui</b> and <b>Yanglan</b>, are all that is left of it.`,
          `<b>Two things about Tsat are recorded inconsistently, and both are worth knowing.</b> China counts it as a dialect of Utsul rather than a separate language, so official figures and linguistic ones do not line up. And where its speakers came from is only partly settled: the account rests on migrations, one group arriving from <b>Champa</b> after the fall of <b>Indrapura in 968</b> and a second in the <b>15th century</b>, with the community's identity resting on Muslim religion rather than on a remembered homeland. <i>Utsul</i> names the people, <i>Tsat</i> the language, and its speakers' own word for it is <i>tsat</i>.`,
          `Its relatives are all far away and mostly in trouble too: Cham, Raglai and the other Chamic languages of Vietnam and Cambodia. Tsat is the northernmost outpost of a branch whose centre of gravity moved, and whose speakers became Muslim on the coast of a Chinese island.`],
       t:[["c. 500 BCE–200 CE","Chamic forms on the coast of what is now central Vietnam"],
          ["968","Indrapura falls; a Champa migration that contributes to the Utsul"],
          [". 15th c.","A second recorded migration from Champa to Hainan"],
          [". 16th–18th c.","Contact with Hlai and Sinitic makes the language tonal"],
          ["2007","4,500 speakers in two villages"]],
       kids:[] }
    ] },

 ]
};

/* ---------- ISO 639-3 codes (SIL) — the codes behind the Forvo links.
   Every code below was read off its language's own infobox on 2026-09-27; the
   five not already covered by FO-102…FO-106 (Atayal, Amis, Siraya, Bunun,
   Paiwan) were fetched and confirmed for FO-108. `fox` is the family's ISO 639-5
   code and belongs to no single language. ---------- */
const ISO = {
 formosan:'fox (family, ISO 639-5)', protoan:'—',
 atayalic:'tay · trv (branch)',
  atayal:'tay', seediq:'trv',
 eastform:'ami · szy · ckv · fos (branch)',
  amis:'ami', sakizaya:'szy', kavalan:'ckv', siraya:'fos',
 northwest:'xsy · pzh (branch)',
  saisiyat:'xsy', pazeh:'pzh',
 westplains:'ssf (branch)', thao:'ssf',
 tsouic:'tsu · xnb · sxr (branch)',
  tsou:'tsu', kanakanavu:'xnb', saaroa:'sxr',
 rukai:'dru', bunun:'bnn', puyuma:'pyu', paiwan:'pwn',
 outliers:'— (not Formosan: tao and huq are Malayo-Polynesian)',
  yami:'tao', tsat:'huq'
};

/* ---------- what makes each variety distinctive: structure, not history ---------- */
const FEATURES = {
 formosan:[
  `<b>Not one family but up to nine.</b> The grouping is defined by geography rather than by descent, and Glottolog gives it no code: these are separate primary branches of Austronesian that share an island.`,
  `<b>Proto-Austronesian was spoken here.</b> The family that runs from Madagascar to Rapa Nui has its deepest divisions on Taiwan, and several of them have no close relatives anywhere else.`,
  `<b>A verb-initial family with a focus system.</b> Most Formosan languages are predicate-initial and mark the subject's semantic role on the verb — a voice system unlike anything in the surrounding mainland languages.`,
  `<b>Two branches are missing from the standard reconstruction.</b> Rukai and Puyuma both fall outside reconstructions of Proto-Austronesian, which is why Rukai alone can invalidate a proto-language built without it.`,
  `<b>Mostly Latin, recently written.</b> Every living language here uses a twentieth-century Romanisation; the only older written record is Dutch missionary Siraya.`
 ],
 protoan:[
  `<b>The ancestor of a sixth of the world's languages.</b> Reconstructed from Taiwan, the Philippines, Indonesia, Polynesia and Madagascar together — not from any one region.`,
  `<b>*Cau, the reconstructed word for 'person', keeps recurring.</b> Tsou <i>cou</i>, Thao, and the self-names of three peoples here descend from it; several branches preserve it with almost no change.`,
  `<b>A four-vowel system</b> (*a, *i, *u, *e) with a full set of voiced and voiceless stops — the inventory most Formosan languages have since reshaped.`,
  `<b>Reconstruction is still moving.</b> Ross (2009) notes that published reconstructions had not taken Rukai into account, so the accepted proto-language does not yet cover its own family.`
 ],
 atayalic:[
  `<b>Two languages, both in the tens of thousands</b> — Atayal at 85,888 and Seediq at 20,000, the healthiest pair in this atlas.`,
  `<b>Male and female register in Atayal.</b> The Matu'uwal and Pa'kuali' subdialects of C'uli' use different vocabulary depending on the speaker's sex — a distinction with no parallel elsewhere in this series.`,
  `<b>One people, two names.</b> Seediq's three dialect groups each call themselves after their own dialect, while the Amis call them all "Taroko" — hence Truku/Taroko/Seediq in the literature.`,
  `<b>Both written in Latin alphabets</b> devised in the twentieth century, with a complete Atayal Bible since 2003.`
 ],
 eastform:[
  `<b>The branch with the family's largest language and its best revival.</b> Amis at 108,000 speakers; Sakizaya reclassified out of Amis and recognised as a people in 2007.`,
  `<b>Amis–Sakizaya is a subgroup inside the branch</b>, which is exactly why Sakizaya could hide inside Amis for 129 years.`,
  `<b>Siraya is the only Formosan language with a seventeenth-century written corpus</b> — Dutch missionary texts in the Sinckang manuscripts.`,
  `<b>Sirayaic may be a sub-branch of its own.</b> Siraya, Taivoan and Makatao were long called dialects of one language and are now usually three.`
 ],
 northwest:[
  `<b>The branch where the record is thinnest.</b> Two surviving members — Saisiyat and Pazeh–Kaxabu — both in the low thousands or below, plus the extinct Kulon and Taokas.`,
  `<b>A speaker count that misleads.</b> Saisiyat's 4,750 is a large number for this atlas and still leaves it Severely Endangered.`,
  `<b>One node holding extinction and revival at once</b>: Pazeh died in 2010, Kaxabu has twelve speakers, and the revival began the same decade.`
 ],
 westplains:[
  `<b>One language left, and a hole in the map.</b> The western plains are <i>unattested</i> before Chinese colonisation, not empty — which is why the standard map leaves them white.`,
  `<b>Thao, at four speakers</b>, is the last of it, and its decline has a named cause: speaking it was criminalised under Japanese rule and again under the Kuomintang.`,
  `<b>The branch's split is dated a thousand years later than any other</b> (c. 1000 CE on Li's chronology), which makes the plains languages the family's most recent division.`
 ],
 tsouic:[
  `<b>The branch itself is disputed.</b> All three are usually grouped as Tsouic, with a question mark in the standard classification itself, and Chang (2006) and Ross (2009) argue Tsou is too divergent to group with the other two.`,
  `<b>Two of three members are down to single digits</b>: Kanakanavu four, Saaroa ten. Tsou has 4,100.`,
  `<b>Tsou and Thao both call themselves 'person'</b> from Proto-Austronesian *Cau — the same word on opposite sides of the island.`,
  `<b>Saaroa has no active speech community</b>: ten people can speak it and none uses it by default.`
 ],
 rukai:[
  `<b>The first language to split from Proto-Austronesian</b>, at c. 3000 BCE — a thousand years before anything else in this atlas.`,
  `<b>No focus system</b>, alone among Formosan languages: the voice system that organises its relatives' grammar is absent.`,
  `<b>Tanan Rukai has the family's largest consonant inventory</b> — 23 consonants — and an animate/inanimate rather than personal/non-personal distinction.`,
  `<b>Prime evidence for the proto-language, and not yet used by it.</b> Rukai's divergence is why reconstructions made without it are not valid for the whole family.`
 ],
 bunun:[
  `<b>A primary branch that is one language</b>, and the third-largest here at 38,000 speakers. Its name means 'human'.`,
  `<b>An expanding language.</b> From the seventeenth century Bunun moved south and east, absorbing Saaroa, Kanakanavu and Thao territory — one Formosan language displacing others.`,
  `<b>Five dialects and one grave.</b> Isbukun, Takituduh, Takibaka, Takbanuaz and Takivatan survive; Takipulan became extinct in the 1970s.`,
  `<b>The most conservative dialects are northern</b>, while Isbukun is both the prestige dialect and the most divergent.`
 ],
 puyuma:[
  `<b>Falls outside reconstructions of Proto-Austronesian</b>, like Rukai — two of the nine branches are unaccounted for by the standard proto-language.`,
  `<b>Most speakers are older adults</b>, at 8,500 in 2002.`,
  `<b>Nanwang is phonologically conservative and grammatically innovative</b> at once, which is why 'conservatism' is not one property.`,
  `<b>Its villages are named for origins, not places</b>: the Puyuma cluster 'born of the bamboo', the Katipul 'born of a stone'.`
 ],
 paiwan:[
  `<b>The second-largest Formosan language</b>, at 96,334 first-language speakers, and a national language of Taiwan.`,
  `<b>Formerly a regional lingua franca</b> — historically spoken as a second language by most people in southern Taiwan.`,
  `<b>Its dialect list is honestly unsettled</b>: Ferrell's six zones and Cheng's two groups are both in print, and the article says outright that nobody has solid dialect boundaries.`,
  `<b>One of the best-described grammars in the family</b>: Ferrell's dictionary (1982), Egli's <i>Paiwangrammatik</i> (1990) and Chang (2006).`
 ],
 atayal:[
  `<b>Two major dialects and seven recorded ones</b>: Squliq and C'uli' (Ts'ole') dominate, with Matuʼuwal, Skikun, Plngawan, Klesan and Sʼuli also named.`,
  `<b>Male and female registers</b> in the Matu'uwal and Pa'kuali' subdialects of C'uli': the same meaning has different words depending on who says it.`,
  `<b>A Latin alphabet since the twentieth century</b>, and a complete Bible translation in 2003 — one of the few Formosan languages with one.`,
  `<b>Suppressed but not lost.</b> Under Kuomintang rule Mandarin was imposed as the sole national language, yet Atayal "communities maintained their language in private and informal settings".`
 ],
 seediq:[
  `<b>One language, three names.</b> Seediq is also Truku and was formerly written Taroko; the Amis use "Taroko" for all three dialect groups.`,
  `<b>Three dialects</b>: Truku (20,000 members), Toda (2,500) and Tgdaya (2,500) — and those are <i>membership</i> figures, not speaker counts.`,
  `<b>Each group names itself after its own dialect</b>, which is why one language appears in the literature under several unrelated-looking names.`,
  `<b>Latin script</b>, standardised in the twentieth century; UNESCO grades it Vulnerable under the older name Taroko.`
 ],
 amis:[
  `<b>The largest Formosan language</b>, at 108,000 speakers (2015) — the only six-figure count in this atlas.`,
  `<b>Five dialects</b>: Southern, Tavalong-Vataan, Central, Chengkung-Kwangshan and Northern (Nanshi, including Nataoran) — and the northern varieties "are considered to be separate languages".`,
  `<b>Public use is real</b>: stations at Hualien and Taitung broadcast in Amis alongside Mandarin.`,
  `<b>Written Latin</b>, with a standardised Amis alphabet; predicate-initial, like its relatives.`
 ],
 sakizaya:[
  `<b>Classified as an Amis dialect for 129 years</b> — from the Takobowan incident of 1878 until scholars re-examined it.`,
  `<b>Recognised as a people on 17 January 2007</b>, the thirteenth group to be so recognised, in a country that now counts sixteen.`,
  `<b>590 speakers against 990 registered Sakizaya</b>, with thousands more still registered as Amis under historic classifications.`,
  `<b>No autonym is recorded for Sakizaya</b>, so none is shown rather than inventing one.`
 ],
 kavalan:[
  `<b>No longer spoken in its original area</b>: the north-east coast, from which its four surviving communities' names were carried south.`,
  `<b>A documented decline</b>: a home language by 1930, still spoken in Atayal territory in 1987, 24 speakers and moribund in 2000, 70 in 2015.`,
  `<b>Among the most lexically distinct Austronesian languages</b> — an EDGE-metric finding in 2017, at seventy speakers.`,
  `<b>Its speakers are now surrounded by Amis</b>, a language of the same branch but a different subgroup.`
 ],
 siraya:[
  `<b>The atlas's revival node</b>: extinct at the end of the nineteenth century, revived in the 2020s.`,
  `<b>The only Formosan language with a seventeenth-century written corpus</b> — Dutch missionary texts, including Gravius's Gospels and catechism (1661).`,
  `<b>The Sinckang manuscripts</b> are the reason its phonology and grammar could be retrieved at all, by Adelaar in 1997 and 2011.`,
  `<b>Once called three dialects, now usually three languages</b>: Siraya, Taivoan and Makatao form the Sirayaic group.`
 ],
 saisiyat:[
  `<b>Two dialects</b>: Taai (northern, Hsinchu) and Tungho (southern, Miaoli).`,
  `<b>4,750 speakers against about 7,900 ethnic Saisiyat</b> — a large count for this atlas, and still Severely Endangered.`,
  `<b>No source is given for that figure</b>, which is worth knowing before relying on it.`,
  `<b>Written in a Latin alphabet</b>; the pwaz s-bato' (dwarf spirit) festival is its best-known cultural marker.`
 ],
 pazeh:[
  `<b>Two dialects in two opposite states</b>: Pazeh marked extinct (2010) and Kaxabu at twelve speakers (2013).`,
  `<b>No autonym is recorded for Pazeh–Kaxabu</b>, so none is shown; documentation exists instead — Li and Tsuchida's dictionary (2001) and texts (2002).`,
  `<b>Its Glottolog code is Kulon's</b> (kulo1237), which is why Kulon is discussed in the text rather than shown on the map.`,
  `<b>Revival is measurable</b>: Pazeh writers received preservation awards in 2014, four years after the last native speaker died.`
 ],
 thao:[
  `<b>Four elderly L1 speakers</b> (2021) against an ethnic population of 820 — Critically Endangered.`,
  `<b>Its decline was policy, not accident</b>: "speaking Thao was criminalised under Japanese rule of Taiwan and later the Kuomintang regime".`,
  `<b>Two dialects</b>: Brawbaw and Shtafari, in the villages around Sun Moon Lake.`,
  `<b>Exceptionally well described for its size</b>: Blust's <i>Thao Dictionary</i> (2003) is a full description made while speakers remained.`
 ],
 tsou:[
  `<b>Four dialects, two already extinct</b>: Tapangʉ and Tfuya survive; Duhtu and Iimcu are extinct, and Iimcu "has not been well described".`,
  `<b>The name means 'person'</b>, from Proto-Austronesian *Cau — cognate with Thao's own name on the other side of the island.`,
  `<b>4,100 speakers</b> (2015), Definitely Endangered, and the largest language of a branch that may not exist.`,
  `<b>Surviving dialects are near-identical</b> in grammar, with only marginal phonological variation.`
 ],
 kanakanavu:[
  `<b>Four speakers</b> (2012) against 360 ethnic Kanakanavu (2020).`,
  `<b>Only voiceless plosives</b> among its consonants — unusual in the family — with vowel length often unclear and few words shorter than three syllables.`,
  `<b>Its villages are administrative artefacts</b>: Takanua was "assembled by Japanese rulers to relocate various indigenous groups".`,
  `<b>It shares territory with an Isbukun Bunun group</b>, and has partly adopted Bunun as its vernacular.`
 ],
 saaroa:[
  `<b>No longer an active speech community.</b> Ten speakers (2012) against 400 ethnic Saaroa, and one of those ten died in 2013.`,
  `<b>Mandarin or Bunun are used daily</b> even by native speakers of the language.`,
  `<b>Two villages, Taoyuan and Kaochung</b>, in Taoyuan District along the Laonung River.`,
  `<b>Its oral tradition is the oldest account a Formosan people gives of itself</b>: origin at Yushan, a northern/southern split about 2,000 years ago, and the Kanakanavu separation about 800 years ago.`
 ],
 yami:[
  `<b>Malayo-Polynesian, not Formosan</b>: Batanic, in the Ivatan dialect continuum, with its closest relatives across the Bashi Channel.`,
  `<b>About 4,000 speakers on an island of some 3,000 people</b> — spoken well beyond its ethnic base.`,
  `<b>Its autonym is <i>ciciring no Tao</i></b>, 'the speech of people', and some speakers prefer the name Tao to Yami.`,
  `<b>Used as a control on Proto-Austronesian reconstructions</b> — a family that is not its own.`
 ],
 tsat:[
  `<b>An Austronesian language on the Chinese mainland</b>, in two villages near Sanya: Huihui and Yanglan.`,
  `<b>Tonal and analytic</b> — seven tones in Huihui Tsat — after contact with Hlai and Sinitic; the only Austronesian language strongly influenced by Chinese.`,
  `<b>Its relatives are a thousand miles south</b>: Acehnese, Cham and Jarai, in the Chamic branch.`,
  `<b>Registered as a dialect rather than a language by China</b>, and even its place among the Malayo-Sumbawan languages is given only tentatively.`
 ],
 outliers:[
  `<b>Neither of these is Formosan.</b> Yami is Malayo-Polynesian and Batanic; Tsat is Chamic. Both are here because of geography, not descent.`,
  `<b>Yami is the one Indigenous language of Taiwan outside the Formosan grouping</b>, and it belongs with the languages of Batanes across the Bashi Channel.`,
  `<b>Tsat is an Austronesian language of the Chinese mainland</b>, tonal (seven tones in Huihui) and analytic after contact with Hlai and Sinitic.`,
  `<b>Both are placed with a question or an official mismatch</b>: Tsat's position among the Malayo-Sumbawan languages is given only tentatively, and China registers it as a dialect rather than a language.`
 ]
};

/* ---------- schematic outline (simplified, embedded; [lng,lat] rings) ----------
   Drawn by hand for this atlas: the island of Taiwan, Orchid Island off its
   south-east corner, Hainan (where Tsat is), and the Batanes group that Yami
   belongs to across the Bashi Channel. Not a coastline survey — see the sketch
   caption. The Champa marker sits outside every ring on purpose: it is Tsat's
   origin point, not a place the language is spoken. */
const TAIWAN = [[121.55,25.30],[121.90,25.15],[121.95,24.85],[121.88,24.50],[121.72,24.05],
 [121.52,23.55],[121.42,23.10],[121.20,22.70],[120.95,22.35],[120.85,21.90],[120.70,22.05],
 [120.27,22.63],[120.20,23.00],[120.45,23.48],[120.67,24.15],[120.97,24.80],[121.30,25.03],
 [121.45,25.18],[121.55,25.30]];
const ORCHID = [[121.52,22.06],[121.56,22.07],[121.57,22.01],[121.53,21.99],[121.52,22.06]];
const HAINAN_F = [[110.60,20.10],[111.00,19.95],[110.90,19.30],[110.10,18.40],[109.60,18.20],
 [108.90,18.55],[108.65,19.30],[109.45,19.95],[110.60,20.10]];
const BATANES = [[121.90,20.50],[122.00,20.52],[122.03,20.42],[121.93,20.36],[121.90,20.50]];
const FO_GEO = { type:'FeatureCollection', features:[TAIWAN,ORCHID,HAINAN_F,BATANES].map(r=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };

/* ---------- approximate "core areas" ----------
   Hand-drawn coarse blocks showing roughly where each branch sits — NOT surveyed
   boundaries. Two of them need a word of warning and the caption carries it:
   the NORTHWEST block stands for a foothill strip whose languages are now
   displaced into Puli, and the WESTERN PLAINS block covers ground that is
   *unattested* rather than known. The marker layer is the factual one. */
const AREAS = {
 'c-anc':[[[120.20,21.90],[121.10,25.30],[121.95,25.15],[121.55,23.60],[120.98,22.35],[120.85,21.90]]],
 'c-ata':[[[120.75,24.10],[121.20,25.05],[121.80,25.15],[121.75,24.30],[121.35,23.85]]],
 'c-east':[[[120.75,22.30],[121.00,23.40],[121.60,24.20],[121.80,25.05],[122.00,24.85],
            [121.60,23.55],[121.30,22.70],[120.88,21.90]],
           [[119.95,23.10],[121.60,24.00],[120.80,22.30]]],
 'c-nw':[[[120.55,24.20],[121.05,25.00],[121.35,24.85],[121.15,23.95],[120.80,23.75]]],
 'c-wp':[[[120.05,22.90],[120.45,24.35],[121.10,24.20],[120.98,23.40],[120.60,22.85]]],
 'c-tsu':[[[120.45,22.90],[120.62,23.60],[120.95,23.55],[120.90,23.00]]],
 'c-ruk':[[[120.35,22.40],[120.55,23.10],[120.90,22.95],[120.80,22.30]]],
 'c-bun':[[[120.65,23.00],[120.95,24.10],[121.40,23.60],[121.00,22.85]]],
 'c-puy':[[[120.90,22.50],[121.05,23.15],[121.35,23.00],[121.10,22.45]]],
 'c-pai':[[[120.30,21.90],[120.45,22.85],[121.05,23.00],[120.95,22.20],[120.85,21.88]]],
 'c-out':[[[121.48,21.96],[121.60,22.10],[121.62,21.94]],
          [[108.55,18.15],[110.60,20.10],[111.05,19.95],[109.70,18.40]]]
};

/* ---------- listen links: an Omniglot page where one exists, plus the engine's
   YouTube-search fallback on every node. Omniglot coverage for this family is
   unusually good — fourteen pages, checked 2026-09-27 and listed here with their
   titles: atayal, seediq, amis, kavalan, saisiyat, thao, tsou, kanakanavu,
   saaroa, rukai, bunun, puyuma, paiwan, yami. Two nodes have NO page and ship
   empty lists: Siraya (siraya.htm → 404) and Tsat (hainan_cham.htm → 404). See
   research.md, FO-108 "Link health". ---------- */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 formosan:    [['Omniglot language families index', OM+'langfam.htm'], ['Atayal — Omniglot', OM+'atayal.htm']],
 protoan:     [],
 atayalic:    [['Atayal — Omniglot', OM+'atayal.htm'], ['Seediq — Omniglot', OM+'seediq.htm']],
 atayal:      [['Atayal alphabet and language — Omniglot', OM+'atayal.htm']],
 seediq:      [['Seediq alphabet and language — Omniglot', OM+'seediq.htm']],
 eastform:    [['Amis — Omniglot', OM+'amis.htm'], ['Kavalan — Omniglot', OM+'kavalan.htm']],
 amis:        [['Amis — Omniglot', OM+'amis.htm']],
 sakizaya:    [],
 kavalan:     [['Kavalan — Omniglot', OM+'kavalan.htm']],
 siraya:      [],
 northwest:   [['Saisiyat — Omniglot', OM+'saisiyat.htm']],
 saisiyat:    [['Saisiyat — Omniglot', OM+'saisiyat.htm']],
 pazeh:       [],
 westplains:  [['Thao — Omniglot', OM+'thao.htm']],
 thao:        [['Thao language and alphabet — Omniglot', OM+'thao.htm']],
 tsouic:      [['Tsou — Omniglot', OM+'tsou.htm'], ['Kanakanavu — Omniglot', OM+'kanakanavu.htm'], ['Saaroa — Omniglot', OM+'saaroa.htm']],
 tsou:        [['Tsou — Omniglot', OM+'tsou.htm']],
 kanakanavu:  [['Kanakanavu — Omniglot', OM+'kanakanavu.htm']],
 saaroa:      [['Saaroa — Omniglot', OM+'saaroa.htm']],
 rukai:       [['Rukai — Omniglot', OM+'rukai.htm']],
 bunun:       [['Bunun — Omniglot', OM+'bunun.htm']],
 puyuma:      [['Puyuma — Omniglot', OM+'puyuma.htm']],
 paiwan:      [['Paiwan — Omniglot', OM+'paiwan.htm']],
 outliers:    [['Tao (Yami) — Omniglot', OM+'yami.htm']],
 yami:        [['Tao (Yami) language and alphabet — Omniglot', OM+'yami.htm']],
 tsat:        []
};

window.ATLASES = window.ATLASES || {};
window.ATLASES.formosan = {
  key: 'formosan',
  title:   { zh: '台湾南岛语', en: 'Formosan' },
  tagline: 'A place, not a family — up to nine primary branches of Austronesian on one island, most of them dying, and the ancestor of a family that reaches Madagascar',
  stats:   [['26', 'nodes in this atlas'], ['9', 'primary branches of Austronesian, all here'], ['10+', 'languages already extinct']],
  palette: {
    anc: '#c9c2cf', his: '#8b94a8', ata: '#d9663f', east: '#4fa8d8', nw: '#b48ad9',
    wp: '#d9a83f', tsu: '#5fbf6a', ruk: '#c74f8a', bun: '#3f9e8f', puy: '#7fa650',
    pai: '#d95f6a', out: '#9aa3b0'
  },
  legend:  [['anc','The island — a geographic grouping'],['his','Proto-Austronesian · reconstructed'],
            ['ata','Atayalic — Atayal, Seediq'],['east','East Formosan — Amis to Siraya'],
            ['nw','Northwest Formosan — Saisiyat, Pazeh–Kaxabu'],
            ['wp','Western Plains — Thao alone'],['tsu','Tsouic — disputed'],
            ['ruk','Rukai · a primary branch by itself'],['bun','Bunun · a primary branch by itself'],
            ['puy','Puyuma · a primary branch by itself'],['pai','Paiwan · a primary branch by itself'],
            ['out','Outliers — not Formosan: Yami, Tsat']],
  view:    { center: [115.8, 21.8], zoom: 5.0 },
  outline: { color: '#9c8fb0', fill: 'rgba(156,143,176,0.05)' },
  sketchGeo: FO_GEO,
  captions: {
    note:   '● Markers show <b>representative localities</b> where the selected variety is rooted. This is the densest atlas in the series — nine branches on one island, several of them within a few dozen kilometres of each other — so markers cluster and a single dot often stands for one village. <b>Two markers lie far off the island by design</b>: Tsat on Hainan and Yami on Orchid Island, both joined to this tree by geography rather than descent. Clicking any node fits the map to that node’s markers, which is how Hainan and Orchid Island are reached from the initial view.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — coarse hand-drawn blocks showing roughly where each branch sits, <em>before Chinese colonisation</em>, which is the frame the standard map uses. Two of them need warning: the <b>western plains</b> block covers ground that is <b>unattested</b>, not known — the record there is a hole, and filling it with "Ketagalan" is guesswork; and the <b>northwest</b> block stands for a foothill strip whose surviving languages have since been displaced into Puli. The marker layer is the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn Taiwan, Orchid Island off its south-east corner, Hainan and the Batanes group, simplified from memory of the geography; the markers sit at true coordinates. The Champa marker near Đà Nẵng lies outside every ring on purpose: it is Tsat’s <em>origin point</em>, not a place the language is spoken. Works fully offline.'
  },
  fonts: ['Noto Serif', 'Noto Serif SC'],
  filterPlaceholder: 'e.g. Amis, Rukai, Tsou, Thao, Saisiyat, Siraya…',
  listen: {
    om: 'https://www.omniglot.com/writing/langfam.htm',
    fv: 'https://forvo.com/languages/',
    search: 'Formosan language native speaker'
  },
  rootId: 'formosan',
  stages: ['protoan'],
  kinds: { root: 'A place, not a family', stage: 'Reconstructed ancestor', branch: 'Primary subfamily', leaf: 'A language' },
  sources: 'Sources: P. Li, “The Past, Present and Future of the Formosan Languages” (2008) for the divergence chronology quoted throughout — Proto-Austronesian 4,500 BCE, Rukai 3,000, Tsouic 2,500, most other splits 2,000–0 BCE, Western Plains 1,000 CE · R. Blust on Proto-Austronesian reconstruction and on Thao (his <i>Thao Dictionary</i>, Academia Sinica, 2003) · M. Ross (2009) and H.-C. Chang (2006) on the disputed Tsouic branch and on Rukai’s absence from reconstructions · P. Li and S. Tsuchida, <i>Pazih Dictionary</i> (2001) and <i>Pazih Texts and Songs</i> (2002) · A. Adelaar, <i>Siraya: Retrieving the Phonology, Grammar and Lexicon of a Dormant Formosan Language</i> (2011) and his 1997 grammar notes · J. Ting (1978) on Proto-Puyuma · R. Ferrell, <i>Paiwan Dictionary</i> (1982) · H. Egli, <i>Paiwangrammatik</i> (1990) · the Dutch <i>Dagregisters van het Kasteel Zeelandia</i> (1629–1662), cited for the four-language translation chain and the Sinckang manuscripts · G. Thurgood, E. Thurgood and F. Li on Tsat, including their warning that the less Mandarinised variety may no longer be spoken · Shibata (2020) on Proto-Bunun · the UNESCO <i>Atlas of the World’s Languages in Danger</i> for every endangerment grade in this atlas · Ethnologue and Glottolog for ISO 639-3 codes and speaker counts. Four things here are deliberately left unresolved. <b>Formosan is drawn as a place rather than a family</b>, because the grouping has no Glottolog code of its own and its languages form “up to nine separate primary subfamilies” — so there is no Proto-Formosan trunk. <b>Tsouic is shown with a question mark</b>, because the linguists who dispute it are named and their doubt is real. <b>Pazeh–Kaxabu is one language in two opposite states</b> — extinct in 2010 and alive at twelve speakers — because that is how the record presents it. And <b>three speaker figures are the stored numbers rather than the rounded ones</b>: Atayal 85,888 (rounded to 86,000), Amis 108,000 (rounded to 110,000) and Paiwan 96,334 (rounded to 96,000). All four decisions are recorded in research.md at FO-101 and FO-108.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();
