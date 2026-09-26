/* atlas-silkroad.js — Silk Road lost languages 丝绸之路死语
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (see languages.md §1.3 for the contract,
 * §2.12 for this atlas's brief, and research.md §"Silk Road lost languages
 * (Phase 5)" for the evidence log — every load-bearing date, find-spot and
 * decipherment claim below is logged there as SR-101 … SR-110).
 *
 * This is the series' "special mode" atlas (languages.md §2.12). Three things
 * differ from every other file, and the engine supports them opt-in:
 *   1. `timelineFirst:true` — the timeline renders ABOVE the history prose,
 *      because for a dead language a find-spot's dates are the primary fact.
 *   2. Per-node `chips:[[text,class]]` — script names and a decipherment
 *      status chip, which no living-family atlas needs.
 *   3. The endangerment colour semantics INVERT: extinct is the default and
 *      the calm colour, and the one living language (Yaghnobi) is the outlier.
 *
 * Almost every node here is a language with no speakers at all. The markers
 * therefore show DOCUMENT FIND-SPOTS — where the birch-bark, the wall
 * painting, the stele or the library was recovered — not where a community
 * lives. The caption says so.
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree ===================== */
const DATA = {
 id:"silkroad", en:"Silk Road lost languages", zh:"丝绸之路死语", py:"Sīchóu zhī lù sǐyǔ",
 sp:"all extinct but one", 
 region:"The Tarim Basin, the Hexi corridor and the Bactrian–Sogdian lands — from Kashgar and Kucha to Dunhuang, Khara-Khoto and Balkh",
 cls:"c-anc", mk:[],
 h:[`The Silk Road was not one road and not one language. It was a chain of oasis city-states across the Tarim Basin and the Hexi corridor — Kashgar, Kucha, Karashar, Turfan, Khotan, Niya, Miran, Loulan, Dunhuang — where a dozen unrelated languages met, borrowed from each other, and left their paperwork behind in a desert that preserves paper better than any archive. Almost every language in this atlas is extinct. One is not.`,
   `What makes the subject work as a map is that the evidence is <em>archaeological</em>. These languages are known from things somebody dug up: birch-bark scrolls that surfaced in Afghanistan in the 1990s, Sogdian letters found in a watchtower near Dunhuang in 1907, a Tangut library carted out of Khara-Khoto by a Russian expedition in 1909, Tocharian Buddhist translations from the Turfan oasis, a Bactrian inscription found on a rock in 1993. Each node below is therefore anchored to a place and a discovery, and its timeline is the point of the entry.`,
   `The families here are not one family, and this atlas does not pretend otherwise. Tocharian is Indo-European — and its position in that family was a genuine surprise. The Iranian languages (Saka, Sogdian, Bactrian, Khwarezmian) are Indo-European too. Gāndhārī is Indo-Aryan. Tangut and Zhangzhung are Sino-Tibetan. Khitan is para-Mongolic and Jurchen is Tungusic — both cross-listed to the atlases where they also appear. Old Turkic is Turkic. Rouran and Xiongnu are fragments whose affiliation is still argued about.`,
   `Two of these scripts were deciphered in living memory and one still is not. The Turkic runiform alphabet was cracked by Vilhelm Thomsen in 1893; Tangut was reconstructed in the twentieth century from a bilingual glossary; the Khitan small script is now largely read while the large script remains only partly so. The "deciphered" chip on each node records which is which, and the atlas marks uncertainty rather than hiding it.`],
 t:[["313–314 CE","The Sogdian “Ancient Letters” are written — the oldest substantial Sogdian texts"],
    ["1907","Aurel Stein finds those letters in an abandoned watchtower near Dunhuang"],
    ["1889","Nikolai Yadrintsev's expedition reaches the Orkhon Valley inscriptions in Mongolia"],
    ["1893","Vilhelm Thomsen deciphers the Turkic runiform alphabet"],
    ["1909","Kozlov's expedition removes the Tangut library from Khara-Khoto"],
    ["1993","The Rabatak inscription is found in Afghanistan — Bactrian in Greek script"],
    ["1994","Birch-bark Gāndhārī Buddhist manuscripts begin surfacing in Afghanistan and Pakistan"]],
 kids:[
  { id:"indoeuropean", en:"Indo-European on the Silk Road", zh:"丝路印欧语", py:"Sīlù Yìn'ōu yǔ",
    sp:"four dead branches, one living descendant",
    region:"From Bactria and Sogdiana eastward through the Tarim Basin to the Hexi corridor",
    cls:"c-ie", mk:[],
    h:[`The Indo-European languages of the Silk Road are three separate migrations that arrived in Central Asia centuries apart, and the atlas keeps them apart: Tocharian, the Iranian group, and Gāndhārī. They are related, but not closely, and their speakers were neighbours rather than kin.`,
       `What unites them as a story is that they all died the same way — absorbed by the Turkic and Chinese worlds that replaced them after the ninth and tenth centuries — and that they were all recovered by the same nineteenth-century method: decipher a script, then read a language nobody had spoken for a thousand years.`],
    t:[["c. 2nd c. BCE–1st c. CE","Tocharian and Saka are attested in the Tarim Basin"],
       ["c. 1st c. CE","Gāndhārī Buddhist manuscripts reach China"],
       ["7th–10th c.","Sogdian is the trading lingua franca of the whole route"],
       ["9th–11th c.","Turkic and Chinese expansion ends all of them but one"]],
    kids:[

     { id:"tocharian", en:"Tocharian", zh:"吐火罗语", py:"Tǔhuǒluó yǔ",
       sp:"extinct by the 9th c.", region:"The northern Tarim Basin — Kucha, Karashar and Turfan",
       cls:"c-toc", mk:[[41.72,82.96,"Kucha (Tocharian B heartland)"],[42.06,86.57,"Karashar / Yanqi (Tocharian A)"],[42.95,89.19,"Turfan"],[39.87,79.05,"Tumshuq — western edge of B's range"]],
       h:[`Tocharian is the great surprise of Indo-European studies. It is an Indo-European language — the numerals, the verb endings, the pronouns are unmistakable — spoken at the eastern end of the family's range, in oasis cities on the northern edge of the Taklamakan, by people whose neighbours were Chinese, Turkic and Iranian speakers.`,
          `It comes in two varieties that were never one language at the time they are attested. <b>Tocharian A</b>, also called <em>East Tocharian</em> or <em>Turfanian</em>, is known from liturgical and monastic texts around Karashar and Turfan. <b>Tocharian B</b>, also called <em>West Tocharian</em> or <em>Kuchean</em>, is the better attested of the two and was the more widely spoken, in use across the whole area from Turfan in the east to Tumshuq in the west. The labels "A" and "B" are purely conventional and carry no claim about which came first.`,
          `The texts are overwhelmingly Buddhist: translations and adaptations of Sanskrit scripture, monastic records, and the business documents that come with running a monastery on a trade route. That is why the language is known at all — the desert preserved what the monasteries wrote — and it is also why the surviving vocabulary is tilted toward religion and commerce rather than daily life.`,
          `Both varieties disappear from the record as the Uyghur Turks take over the northern oases in the ninth century. The people were not exterminated; they were absorbed, and their language stopped being written and then stopped being spoken.`],
       t:[["c. 2nd c. BCE–1st c. CE","Tocharian appears in the Tarim Basin oasis states"],
          ["c. 1st–7th c. CE","Buddhist translation produces the surviving Tocharian corpus"],
          ["c. 640","Tang armies take Karashar; Chinese administration arrives"],
          ["c. 840–860","The Uyghur Khaganate collapses; Uyghurs move into the Tarim oases"],
          ["9th–10th c.","Tocharian ceases to be written, then to be spoken"]],
       kids:[

        { id:"tochA", en:"Tocharian A", zh:"吐火罗语 A", py:"Tǔhuǒluó yǔ A",
          sp:"extinct", region:"Karashar (Yanqi) and the Turfan depression",
          cls:"c-toc", mk:[[42.06,86.57,"Karashar (Yanqi)"],[42.95,89.19,"Turfan oasis"]],
          h:[`The eastern and more restricted variety — <em>East Tocharian</em> or <em>Turfanian</em>. Its texts are almost entirely Buddhist and almost entirely liturgical: it survives mainly as a language of translation, which makes it hard to hear as a spoken tongue. It is also the more conservative of the two in some respects, which is the opposite of what one would guess if one thought of it as simply "later Tocharian".`,
             `The standard description treats A and B as two members of a single Tocharian branch. Some scholars read the differences between them as deep enough to suggest they were never one undifferentiated language within the historical period.`],
          t:[["c. 5th–8th c.","The surviving Tocharian A manuscripts are written"],
             ["8th–9th c.","Monastic production shifts toward Tocharian B, then stops"]],
          chips:[["Brāhmī (Tocharian variant)","scr"],["deciphered","dec"]] },

        { id:"tochB", en:"Tocharian B", zh:"吐火罗语 B", py:"Tǔhuǒluó yǔ B",
          sp:"extinct", region:"Kucha and the whole northern Tarim belt, Turfan to Tumshuq",
          cls:"c-toc", mk:[[41.72,82.96,"Kucha (Kuchean)"],[42.95,89.19,"Turfan"],[39.87,79.05,"Tumshuq"]],
          h:[`The better-known variety — <em>West Tocharian</em> or <em>Kuchean</em> — and the one that gives the atlas most of what it can say about Tocharian. It was spoken across a wider area than A, from Turfan in the east to Tumshuq in the west, and its corpus includes not only scripture but monastery accounts, caravan receipts and letters.`,
             `Tocharian B is where the famous Indo-European comparisons come from: a word for "honey" that matches Greek and Old Church Slavonic, the numerals, the kinship terms. Those comparisons are what established, against early expectation, that Tocharian belongs to Indo-European and not to any Central Asian family.`],
          t:[["c. 5th–8th c.","The Tocharian B corpus is written — scripture, records and letters"],
             ["c. 840–860","Uyghur expansion into the Tarim oases"],
             ["10th c.","Last datable Tocharian B documents"]],
          chips:[["Brāhmī (Tocharian variant)","scr"],["deciphered","dec"]] }] },

     { id:"iranian", en:"Iranian (Middle Iranian)", zh:"伊朗语支", py:"Yīlǎng yǔ zhī",
       sp:"three dead, one living", region:"Sogdiana, Bactria, Khwarezm and the southern Tarim Basin",
       cls:"c-ira", mk:[],
       h:[`The Iranian languages of the Silk Road are the middle stage of a family that still runs from Persian to Pashto and Ossetic. Four of them matter here: Saka in the southern Tarim, Sogdian at the centre of the whole trading network, Bactrian in what is now northern Afghanistan, and Khwarezmian on the lower Oxus.`,
          `They are <em>Middle</em> Iranian — the stage between Old Iranian (Avestan, Old Persian) and the modern languages — and they are recorded in four different scripts, none of them Persian: Brāhmī for Saka, Sogdian script for Sogdian, Greek for Bactrian, and a local script for Khwarezmian. Reading them therefore meant deciphering four writing systems before one could read a word.`],
       t:[["c. 2nd c. BCE","Saka appears in the Buddhist kingdoms of Khotan and Kashgar"],
          ["313–314 CE","The Sogdian “Ancient Letters” — the oldest substantial Sogdian texts"],
          ["c. 2nd c. BCE–3rd c. CE","Bactrian is written in Greek script; the Rabatak inscription"],
          ["7th–8th c.","Sogdian colonies along the whole route, from Semirechye to the Ordos"],
          ["13th c.","Khwarezmian gives way to Persian and Turkic; the Iranian Silk Road ends"]],
       kids:[

        { id:"saka", en:"Saka", zh:"塞语", py:"Sài yǔ",
          sp:"extinct", region:"The southern Tarim Basin — the Kingdom of Khotan and Tumshuq, and Kashgar",
          cls:"c-sak", mk:[[37.11,79.93,"Khotan"],[39.87,79.05,"Tumshuq"],[39.47,75.99,"Kashgar (Shule)"]],
          h:[`"Saka" is the name the ancient Iranians gave to the nomadic Iranian speakers of the steppe, and it is used here for the two closely related varieties attested in the western Tarim Basin: <b>Khotanese</b>, spoken in the Kingdom of Khotan, and <b>Tumshuqese</b>, a poorly attested variety named for the place its documents were found.`,
             `These are Eastern Iranian languages — relatives of Sogdian and of modern Pashto and Wakhi — spoken in Buddhist oasis kingdoms that sat on the southern branch of the Silk Road. Khotan was a major centre of Buddhist scholarship and translation, and it is from Khotan's monasteries that the surviving texts come: scripture, medical and astronomical treatises, and official documents.`,
             `Both varieties are written in Brāhmī, adapted to Iranian sounds — so they are Indian in script and Iranian in language, a combination that is itself the story of the route.`],
          t:[["c. 2nd c. BCE","Iranian Saka is established in the Khotan and Kashgar region"],
             ["c. 3rd–8th c. CE","The Khotanese Buddhist and documentary corpus is written"],
             ["c. 790","Tibetan occupation of Khotan; the record thins"],
             ["c. 1006","The Karakhanids take Khotan; the language goes out of use"]],
          kids:[
           { id:"khotanese", en:"Khotanese", zh:"于阗语", py:"Yútián yǔ",
             sp:"extinct", region:"The Kingdom of Khotan, southern Tarim Basin",
             cls:"c-sak", mk:[[37.11,79.93,"Khotan"],[38.15,85.55,"Niya (administrative documents)"]],
             h:[`The better-attested Saka variety, and the language of one of the great Buddhist kingdoms of the Silk Road. Khotan sat on the southern edge of the Taklamakan and prospered on the jade and silk trade; its monks translated Sanskrit scripture and its officials kept records, and the desert kept both.`,
                `Its extinction is a case study in how these languages ended: not conquered and silenced in one moment, but displaced over a century as first Tibetan and then Turkic Muslim powers took the oasis, until the last documents in Khotanese are written around the turn of the eleventh century.`],
             t:[["c. 3rd c. CE","Earliest Khotanese documents"],
                ["c. 790","Tibet occupies Khotan"],
                ["c. 1006","The Karakhanids take the kingdom; Khotanese falls out of use"],
                ["1890s–1900s","Stein and others recover the Khotanese corpus from the Tarim"]],
             chips:[["Brāhmī","scr"],["deciphered","dec"]] },

           { id:"tumshuqese", en:"Tumshuqese", zh:"图木舒克语", py:"Túmùshūkè yǔ",
             sp:"extinct", region:"Tumshuq, northwest of Kucha on the northern Tarim route",
             cls:"c-sak", mk:[[39.87,79.05,"Tumshuq"]],
             h:[`The other Saka variety, and the thinner one. It is named for Tumshuq, where its documents were found, and it is attested in a small corpus — enough to show that it is a distinct variety from Khotanese and closer to it than to anything else, but not enough to describe in full.`,
                `It is a useful corrective to the tidy tree: the atlas shows Khotanese and Tumshuqese as sisters because that is the standard classification, but the label rests on a handful of texts.`],
             t:[["c. 5th–7th c.","The Tumshuqese documents are written"],
                ["20th c.","The corpus is recovered and identified as Saka"]],
             chips:[["Brāhmī","scr"],["deciphered","dec"]] }] },

        { id:"sogdian", en:"Sogdian", zh:"粟特语", py:"Sùtè yǔ",
          sp:"extinct c. 11th c. — one descendant survives", region:"Sogdiana — Samarkand and Panjakent — with colonies from the Crimea to the Ordos",
          cls:"c-sog", mk:[[39.65,66.96,"Samarkand"],[39.50,67.61,"Panjakent (Mount Mugh archive)"],[40.14,94.66,"Dunhuang (the Ancient Letters)"],[39.0,68.6,"Yaghnob valley — the surviving descendant"]],
          h:[`Sogdian was the lingua franca of the Silk Road. For roughly four centuries — from about the fourth to the eighth — a merchant from Samarkand could travel from the Black Sea to the Chinese capital and do business in Sogdian, because Sogdian trading colonies were planted at every staging post along the way. Sogdian was, for a long stretch, the language in which the route talked to itself.`,
             `The two documents that anchor its history are both archives. The <b>“Ancient Letters”</b> — five letters, four of them more or less complete, on paper and silk — were found by Aurel Stein in 1907 in an abandoned watchtower near Dunhuang, and are dated by their contents to 313–314 CE, at the end of the Western Jin. They are the oldest substantial Sogdian texts known, and they are business correspondence: a network of Sogdian merchants in China writing home about goods, prices and bad news.`,
             `The <b>Mount Mugh archive</b>, found in the 1930s in Tajikistan, is the other end of the story — the documents of a Sogdian prince's last stand against the Arab conquest in the 720s, including his correspondence and, eventually, his surrender. Between the two archives sits the whole arc of Sogdian commercial and political life.`,
             `Sogdian also left its script behind as its most durable legacy. The <b>Sogdian script</b> was adopted by the Uyghurs, and through them became the ancestor of the Mongolian and Manchu alphabets — so the vertical script on this atlas's Mongolic page is, ultimately, a descendant of the writing of Samarkand's merchants.`],
          t:[["313–314 CE","The “Ancient Letters” are written; found at Dunhuang in 1907"],
             ["c. 4th–8th c.","Sogdian trading colonies spread across the whole route"],
             ["c. 700–720s","The Mount Mugh archive records the last Sogdian principality"],
             ["8th–9th c.","Arab conquest and Turkicisation end Sogdian as a trade language"],
             ["c. 11th c.","Sogdian ceases to be spoken — except in one mountain valley"]],
          kids:[

           { id:"yaghnobi", en:"Yaghnobi", zh:"雅格诺比语", py:"Yǎgénuòbǐ yǔ",
             sp:"≈12,500 speakers, by source", region:"The Yaghnob valley and the Zarafshan range, Tajikistan",
             cls:"c-live", mk:[[39.0,68.6,"Yaghnob valley"],[38.56,68.78,"Dushanbe (where many now live)"],[39.50,67.61,"Panjakent"]],
             h:[`Yaghnobi is the only language in this atlas with living speakers, and it is here for that reason: it is the <b>sole surviving descendant of Sogdian</b>, the last thread of the lingua franca that once ran the Silk Road. It is spoken in the Yaghnob valley and the surrounding Zarafshan mountains of Tajikistan — a place remote enough that the language survived the Arab conquest, the Mongol conquest and the Soviet period.`,
                `It is not a museum piece. Yaghnobi is a living Eastern Iranian language with roughly 12,500 speakers by source, most of them bilingual in Tajik — Tajik being the language of business, schooling and formal transactions, and Yaghnobi the language of the home and the village. That bilingualism is exactly the situation that precedes language shift, and Yaghnobi is generally described as endangered rather than safe.`,
                `The atlas marks it in a different colour from everything else on the page. In every other family in this series the alarm colour means <em>dying</em>; here the alarm colour would be meaningless, because almost everything is already gone. The one colour that means something is the one language still being learned by children.`],
             t:[["c. 11th c.","Sogdian goes out of use in the lowlands; a mountain variety survives"],
                ["19th c.","Russian and European scholars identify Yaghnobi as a Sogdian descendant"],
                ["1970","Soviet authorities forcibly relocate the Yaghnobi from the valley"],
                ["2000s–","Revitalisation efforts; the language remains endangered"]],
             chips:[["Cyrillic (official)","scr"],["Tajik-influenced","scr"],["living — the one survivor","dec"]] }] },

        { id:"bactrian", en:"Bactrian", zh:"巴克特里亚语", py:"Bākètèlǐyà yǔ",
          sp:"extinct c. 9th c.", region:"Bactria — Balkh and the Surkh Kotal–Rabatak area, northern Afghanistan",
          cls:"c-bac", mk:[[36.76,66.90,"Balkh"],[36.05,68.63,"Surkh Kotal"],[35.90,68.75,"Rabatak — the 1993 inscription"]],
          h:[`Bactrian is the only Iranian language ever written in the Greek alphabet. That single fact is its whole significance: when Alexander's successors ruled Bactria they left the Greek script behind, and the local Iranian language was written in it for centuries afterwards, with the addition of one letter — <em>sho</em> (ϸ) — to handle a sound Greek did not have.`,
             `The language called itself <em>αριαο</em> — <b>Arya</b>, an endonym shared across the Indo-Iranian world. Its heartland was Balkh, and its best-known monument is the <b>Rabatak inscription</b>, found in 1993 near Surkh Kotal in Afghanistan on a rock, in Bactrian and Greek script. The inscription records the deeds of the Kushan emperor Kanishka and, incidentally, gives scholars a fixed point for the Kushan chronology.`,
             `Bactrian survives in coins, seals and official inscriptions rather than literature, which is why its corpus is small and its vocabulary heavy with titles and administration. It fades out after the Arab conquest and the arrival of Islam, replaced by Persian.`],
          t:[["c. 3rd c. BCE","Greek administration brings the Greek script to Bactria"],
             ["c. 1st–3rd c. CE","Bactrian is used by the Kushan state; the Rabatak inscription"],
             ["1993","The Rabatak inscription is found near Surkh Kotal"],
             ["8th–9th c.","Arab conquest and Persianisation; Bactrian ceases"]],
          chips:[["Greek script (with ϸ)","scr"],["deciphered","dec"]] },

        { id:"khwarezmian", en:"Khwarezmian", zh:"花剌子模语", py:"Huālàzǐmó yǔ",
          sp:"extinct, in use until at least the 13th c.", region:"Khwarezm — the lower Oxus, around Khiva and Urgench",
          cls:"c-khw", mk:[[41.38,60.36,"Khiva"],[42.32,59.15,"Konye-Urgench"],[41.55,60.63,"Toprak-Kala"]],
          h:[`Khwarezmian — also spelled Chorasmian, and known in the ISO register under that spelling — was an Eastern Iranian language of the lower Oxus, in the oasis south of the Aral Sea that is now part of Uzbekistan and Turkmenistan. It had its own script, derived from Aramaic, and its own literary and scholarly tradition.`,
             `Two of the medieval Islamic world's great scholars were Khwarezmian speakers: the polymath <b>Al-Biruni</b> and the lexicographer <b>Zamakhshari</b>. It is largely through their testimony that the language's late period is known at all, and it is on that basis that it is said to have been in use at least until the thirteenth century.`,
             `It then went the way of the rest. Persian replaced it for most purposes, and Turkic dialects replaced it in daily speech, so that what survives of Khwarezmian is a body of texts and the memory of two famous speakers.`],
          t:[["c. 4th c. BCE–1st c. CE","Khwarezmian is attested in its own Aramaic-derived script"],
             ["c. 10th–12th c.","Al-Biruni and Zamakhshari write in and about the language"],
             ["13th c.","Mongol invasion; the language is displaced by Persian and Turkic"]],
          chips:[["Aramaic-derived script","scr"],["deciphered","dec"]] }] },

        { id:"indoaryan", en:"Indo-Aryan on the Silk Road", zh:"丝路印度-雅利安语", py:"Sīlù Yìndù-Yǎlì'ān yǔ",
          sp:"extinct", region:"Gandhāra (Peshawar valley and Taxila) and the southern Tarim route",
          cls:"c-ia", mk:[],
          h:[`The Indo-Aryan contribution to the Silk Road is Gāndhārī — the language of Gandhāra, the region around Peshawar and Taxila — which travelled east along the route with Buddhism and left administrative documents in the Tarim Basin. It is the only Indo-Aryan language in this atlas, and its presence is a reminder that the "Silk Road" was as much a Buddhist transmission route as a commercial one.`],
          t:[["c. 3rd c. BCE","Kharoṣṭhī and Gāndhārī are used in the Gandhāra region"],
             ["c. 1st–3rd c. CE","Gāndhārī documents appear in the Tarim Basin — Niya and Kroraina"],
             ["1994–","Birch-bark Gāndhārī manuscripts surface in Afghanistan and Pakistan"]],
          kids:[
           { id:"gandhari", en:"Gāndhārī", zh:"犍陀罗语", py:"Jiāntuóluó yǔ",
             sp:"extinct", region:"Gandhāra — the Peshawar valley, Taxila and Swat; manuscripts also found in Afghanistan",
             cls:"c-ia", mk:[[34.02,71.58,"Peshawar (Gandhāra)"],[33.75,72.79,"Taxila"],[34.75,72.36,"Swat valley"]],
             h:[`Gāndhārī is a Middle Indo-Aryan language — a Prakrit — written in <b>Kharoṣṭhī</b>, a script that runs right to left and derives from Aramaic rather than from Brāhmī. It was the language of Gandhāra, and it became the language in which Buddhism first moved along the Silk Road.`,
                `Its modern recovery is the most dramatic in this atlas. <b>From 1994 onward</b>, large numbers of fragmentary Buddhist manuscripts began to be discovered in eastern Afghanistan and western Pakistan — birch-bark scrolls that had survived in jars and caves. A major group was donated to the British Library in 1994. Because they are older than most surviving Sanskrit manuscripts, they have pushed the history of Buddhist literature back by centuries and changed what is known about how the texts were transmitted.`,
                `Kharoṣṭhī itself was deciphered in the nineteenth century, which is why Gāndhārī can be read at all. The script died out around the third century CE, replaced in its own homeland by Brāhmī-derived writing.`],
             t:[["c. 3rd c. BCE","Kharoṣṭhī is in use in Gandhāra under the Mauryas"],
                ["c. 1st–3rd c. CE","Gāndhārī travels the Silk Road with Buddhism"],
                ["c. 3rd–4th c. CE","Kharoṣṭhī falls out of use in its homeland"],
                ["1994","Birch-bark Gāndhārī manuscripts begin to surface; British Library donation"]],
             chips:[["Kharoṣṭhī","scr"],["deciphered","dec"]] },

           { id:"niyadocs", en:"Niya and Kroraina documents", zh:"尼雅与楼兰文书", py:"Níyǎ yǔ Lóulán wénshū",
             sp:"extinct", region:"The southern Tarim — Niya, Miran, Loulan and the Shanshan kingdom",
             cls:"c-ia", mk:[[38.15,85.55,"Niya"],[39.15,88.75,"Miran"],[40.53,89.86,"Loulan"],[39.03,88.10,"Kroraina / Shanshan area"]],
             h:[`Not a language but an archive, and the atlas includes it because the archive is the evidence. The <b>Niya documents</b> — several hundred wooden tablets and leather pieces in Gāndhārī and Kharoṣṭhī — were recovered from the site of Niya on the southern Silk Road, along with material from Miran and Loulan.`,
                `They are administrative records of the Shanshan kingdom: land transfers, tax demands, legal decisions, a surprising number of complaints. For the everyday running of a Silk Road kingdom they are the single best source there is, and they are in a language — Gāndhārī — whose homeland was a thousand kilometres to the west.`],
             t:[["c. 3rd–4th c. CE","The Niya, Miran and Loulan documents are written"],
                ["1901–1906","Aurel Stein excavates Niya and Loulan and removes the tablets"],
                ["20th c.","The archive becomes the core evidence for Silk Road administration"]],
             chips:[["Kharoṣṭhī","scr"],["deciphered","dec"]] }] }] },

     { id:"sinotibetan", en:"Sino-Tibetan on the Silk Road", zh:"丝路汉藏语", py:"Sīlù Hàn-Zàng yǔ",
       sp:"extinct", region:"The Hexi corridor and the Tibetan plateau's western edge",
       cls:"c-st", mk:[],
       h:[`Two Sino-Tibetan languages reached the Silk Road, and they did so from opposite directions. <b>Tangut</b> came from the east — the language of the Western Xia state that controlled the Hexi corridor and invented its own script to prove it had arrived. <b>Zhangzhung</b> came from the west, the language of the pre-Buddhist kingdom of the western Tibetan plateau, surviving mainly in the Bon religious corpus.`,
          `Tangut is cross-listed with the Tibeto-Burman atlas, where it also appears; Zhangzhung belongs to the same family and is treated there in fuller company.`],
       t:[["c. 7th–8th c.","Zhangzhung is absorbed by the Tibetan empire; its language survives in Bon texts"],
          ["1038","The Tangut Western Xia state is founded in the Hexi corridor"],
          ["1036–","The Tangut script is promulgated; a Buddhist canon is translated into it"],
          ["1227","The Mongol Empire annexes the Western Xia"],
          ["1909","Kozlov removes the Tangut library from Khara-Khoto"]],
       kids:[
        { id:"tangut", en:"Tangut", zh:"西夏语", py:"Xīxià yǔ",
          sp:"extinct by the 16th c., by source", region:"The Hexi corridor — the Western Xia capital near Yinchuan and Khara-Khoto",
          cls:"c-tan", mk:[[38.49,106.23,"Yinchuan — Western Xia capital (Xingqing)"],[41.76,101.14,"Khara-Khoto (the library city)"],[40.14,94.66,"Dunhuang"]],
          h:[`Tangut was the language of the <b>Western Xia</b> (西夏) state, founded in 1038 by the Tangut people in the Hexi corridor — the narrow strip of oasis towns between the Gobi and the Tibetan plateau that every east–west traveller had to pass through. It was a real power: it fought the Song, the Liao and the Jin, and it held the corridor for nearly two centuries.`,
             `It also had its own script, which is the reason it can be read today. The <b>Tangut script</b> is logographic — a character per word, built on the Chinese model — and it is famously difficult. One scholar's summary, quoted on the script's own page, calls it "one of the most inconvenient of all scripts": a collection of nearly 5,800 characters, very few made up of as few as four strokes and most made up of many more, some approaching twenty. A 2004 count put the known inventory at 5,863 characters, excluding variants.`,
             `The state was destroyed by the Mongols in 1227 and the language died out over the following centuries. The script was reconstructed in the twentieth century, partly from a bilingual glossary, and the decisive find was archaeological: the library recovered from the ruined city of <b>Khara-Khoto</b> by Pyotr Kozlov's expedition in 1909, which carried a mass of Tangut texts — including printed books — off to St Petersburg.`],
          t:[["1038","The Western Xia state is founded; Tangut becomes a written language"],
             ["1036–1094","The Tangut script is devised and the Buddhist canon translated"],
             ["1227","The Mongol Empire annexes the Western Xia; the state ends"],
             ["16th c.","Tangut is last reported in use, by source"],
             ["1909","Kozlov removes the Khara-Khoto library to St Petersburg"],
             ["20th c.","The script is deciphered and the language reconstructed"]],
          chips:[["Tangut script","scr"],["deciphered (20th c.)","dec"]] },

        { id:"zhangzhung", en:"Zhangzhung", zh:"象雄语", py:"Xiàngxióng yǔ",
          sp:"extinct", region:"Western Tibet — the Ngari region and around Mount Kailash",
          cls:"c-zz", mk:[[31.07,81.31,"Mount Kailash"],[30.63,81.20,"Lake Manasarovar"],[32.50,80.10,"Ngari / Guge area"]],
          h:[`Zhangzhung was the language of the kingdom that ruled the western Tibetan plateau before the Tibetan empire absorbed it — a kingdom associated with <b>Bon</b>, the pre-Buddhist religion of Tibet, and with Mount Kailash and Lake Manasarovar, the region's sacred centre.`,
             `The language survives almost entirely in the <b>Bon corpus</b> — texts that preserve a Zhangzhung layer under later Tibetan — plus place names and ritual vocabulary. Its classification within Tibeto-Burman is agreed in outline and uncertain in detail, which is normal for a language known mainly from religious texts written down long after it stopped being spoken.`],
          t:[["c. 1st millennium CE","Zhangzhung is the kingdom of the western plateau"],
             ["c. 7th–8th c.","The Tibetan empire absorbs it; the language begins to recede"],
             ["c. 10th–11th c.","Zhangzhung material is preserved in the Bon tradition"]],
          chips:[["Zhangzhung script (Bon)","scr"],["partial","dec und"]] }] },

     { id:"paramongolic", en:"Para-Mongolic &amp; Tungusic", zh:"类蒙古语与通古斯语", py:"Lèi Měnggǔ yǔ yǔ Tōnggǔsī yǔ",
       sp:"extinct", region:"Manchuria, the West Liao river basin and northern China",
       cls:"c-pm", mk:[],
       h:[`Two languages that ruled northern China and then vanished, and both are cross-listed to the atlases where they properly belong: Khitan to the Mongolic page, as the best-known para-Mongolic language, and Jurchen to the Tungusic page, as the ancestor of Manchu. They appear here as well because the Silk Road atlas is about scripts and lost states, and these two are the clearest cases of a script outliving — and out-obscuring — the language it was made for.`,
          `They also form a chain. The Khitan script was the model for the Jurchen script, which was created in 1119 and which the Jin dynasty then abandoned in favour of the Khitan one it had inherited; and the Jurchen <em>language</em>, not its script, is what became Manchu.`],
       t:[["907–1125","The Khitan Liao dynasty rules northern China and Mongolia"],
          ["1119","Wanyan Xiyin devises the Jurchen script, modelled on Khitan"],
          ["1125–1234","The Jurchen Jin dynasty replaces the Liao in northern China"],
          ["1191","The Jin replace the Khitan small script with the Jurchen script"],
          ["1234","The Mongol conquest ends the Jin; both scripts fall into disuse"]],
       kids:[
        { id:"khitan", en:"Khitan", zh:"契丹语", py:"Qìdān yǔ",
          sp:"extinct — language not fully reconstructed", region:"The West Liao river basin, Manchuria and the Liao dynasty heartland",
          cls:"c-kit", mk:[[43.50,118.50,"West Liao basin — Khitan homeland"],[45.75,126.97,"Acheng — Jin Shangjing (former Liao territory)"],[41.10,122.10,"Liao river plain"],[39.90,116.40,"Beijing — Liao southern capital"]],
          h:[`Khitan was the language of the Khitan people, who ruled northern China and Mongolia as the <b>Liao dynasty</b> from 907 to 1125. It is the best-known member of the <b>para-Mongolic</b> languages — the extinct group that appears to be the closest relatives of Mongolic without being part of it.`,
             `It was written in two mutually exclusive systems, and they are not two versions of one thing. The <b>large script</b> was logographic, like Chinese: a character per word. The <b>small script</b> was a syllabary. Both were used for the administration of a state that governed tens of thousands of Chinese speakers, and both went out of use when the Liao fell.`,
             `Khitan is the atlas's clearest case of a language still not fully read. Owing to a narrow corpus of known words and a partially undeciphered script, the language has yet to be completely reconstructed. The small script is now largely understood; the large script remains only partly so. That is why the chip on this node says "partial" while Tangut's says "deciphered" — the difference is real and it matters for what can honestly be claimed.`],
          t:[["907","The Khitan Liao dynasty is founded"],
             ["c. 920s","The Khitan large script is devised"],
             ["c. 925–","The Khitan small script is created"],
             ["1125","The Jin destroy the Liao; the scripts fall out of official use"],
             ["1191","The Jin replace the Khitan small script with the Jurchen script"],
             ["20th–21st c.","The small script is largely read; the large script remains partly undeciphered"]],
          chips:[["Khitan large script (logographic)","scr"],["Khitan small script (syllabary)","scr"],["partial","dec und"]] },

        { id:"jurchen", en:"Jurchen", zh:"女真语", py:"Nǚzhēn yǔ",
          sp:"extinct — became Manchu", region:"Eastern Manchuria — the Jin dynasty heartland around Acheng and Jilin",
          cls:"c-jur", mk:[[45.75,126.97,"Acheng — Jin Shangjing"],[39.90,116.40,"Beijing — Jin Zhongdu"],[45.18,126.03,"Jin Victory Memorial Stele"]],
          h:[`Jurchen was the Tungusic language of the Jurchen people of eastern Manchuria, who ruled northern China as the <b>Jin dynasty</b> from 1115 to 1234. A writing system was developed for it in <b>1119</b> by <b>Wanyan Xiyin</b>, built on the Khitan model — so Jurchen writing descends, at two removes, from Chinese characters.`,
             `The language did not die with the dynasty. The Jurchen of Manchuria kept speaking it, and it is that speech which became <b>Manchu</b>: in 1635 Hong Taiji renamed the people and the language. So the line runs Jurchen → Manchu → Xibe, and the modern descendants are in the Tungusic atlas, where the full story is told — this node is a pointer, and clicking through to <a href="#tungusic/jurchen">Tungusic → Jurchen</a> gives the rest.`,
             `What is worth noticing here is the script's fate. The Jurchen script was modelled on Khitan and replaced the Khitan small script in 1191 — and then it too was abandoned, so that the surviving texts are few: the key one is the inscription on the back of the 1185 Jin Victory Memorial Stele.`],
          t:[["1115–1234","Jin dynasty: Jurchen is the language of the northern court"],
             ["1119","Wanyan Xiyin devises the Jurchen script, based on Khitan"],
             ["1185","The Jin Victory Memorial Stele is erected"],
             ["1234","The Mongol conquest ends the Jin; the script falls into disuse"],
             ["1635","Hong Taiji renames the Jurchen people and language “Manchu”"]],
          chips:[["Jurchen script","scr"],["deciphered","dec"],["cross-listed → Tungusic","scr"]] }] },

     { id:"turkic", en:"Turkic on the Silk Road", zh:"丝路突厥语", py:"Sīlù Tūjué yǔ",
       sp:"extinct as written varieties", region:"The Orkhon valley in Mongolia and the Turfan oasis in the Tarim Basin",
       cls:"c-tk", mk:[],
       h:[`Old Turkic is the earliest recorded stage of the Turkic family, and it has two phases: the earlier <b>Orkhon Turkic</b> of the Mongolian steppe and the later <b>Old Uyghur</b> of the Turfan oasis. The two are conventionally treated as dialects of one Old Turkic.`,
          `The Orkhon inscriptions are also the reason Turkic is a well-documented family at all: they gave scholars a corpus of connected text in a language whose modern descendants are spoken from Turkey to Siberia, and the decipherment of their script in 1893 was one of the great philological feats of the century.`],
       t:[["1889","Nikolai Yadrintsev's expedition reaches the Orkhon Valley inscriptions"],
          ["1893","Vilhelm Thomsen deciphers the Turkic runiform alphabet"],
          ["c. 744–840","The Uyghur Khaganate rules the steppe from the Orkhon"],
          ["c. 840–860","The Uyghurs move south into the Turfan oasis; Old Uyghur flourishes"],
          ["13th–15th c.","Old Uyghur gives way to Chagatai and the modern Turkic languages"]],
       kids:[
        { id:"orkhon", en:"Orkhon Turkic", zh:"鄂尔浑突厥语", py:"È'ěrhún Tūjué yǔ",
          sp:"extinct — the earliest recorded Turkic", region:"The Orkhon valley, Mongolia — the Khöshöö Tsaidam monuments",
          cls:"c-tk", mk:[[47.20,102.83,"Orkhon valley"],[47.43,102.66,"Ordu-Baliq / Karabalghasun — Uyghur capital"],[47.55,102.75,"Khöshöö Tsaidam — Kül Tigin and Bilge Khagan steles"],[47.36,103.20,"Karakorum (later Mongol capital)"]],
          h:[`The earliest recorded form of Turkic: the language of the inscriptions carved on stone monuments in the <b>Orkhon valley</b> of Mongolia in the early eighth century. The most famous are the steles of <b>Kül Tigin</b> and of Bilge Khagan, political and military narratives in the voice of the rulers themselves — among the oldest surviving examples of any Turkic language written at length.`,
             `The inscriptions were found in an <b>1889</b> expedition by Nikolai Yadrintsev, and the script — a runiform alphabet unrelated to the Germanic runes despite the name — was deciphered by <b>Vilhelm Thomsen in 1893</b>. That decipherment is what opened the whole early history of the Turkic languages, and it is why this atlas can put a date and a text beside a steppe polity.`,
             `Orkhon Turkic is not the ancestor of all Turkic — it is one early branch — but it is the earliest one written down, and the language of the steppe empires that shaped the Silk Road's northern route.`],
          t:[["c. 720s–730s","The Orkhon steles are erected, including that of Kül Tigin"],
             ["744–840","The Uyghur Khaganate rules the steppe from Ordu-Baliq"],
             ["1889","Yadrintsev's expedition reaches the inscriptions"],
             ["1893","Thomsen deciphers the runiform alphabet"],
             ["20th c.","The corpus is edited and becomes the foundation of Turkic philology"]],
          chips:[["Turkic runiform","scr"],["deciphered 1893","dec"]] },

        { id:"olduyghur", en:"Old Uyghur", zh:"回鹘语", py:"Huíhú yǔ",
          sp:"extinct", region:"The Turfan oasis — Gaochang, Bezeklik and the Tarim Basin's northern edge",
          cls:"c-tk", mk:[[42.85,89.53,"Gaochang (Qocho)"],[42.95,89.19,"Turfan"],[41.72,82.96,"Kucha"],[40.14,94.66,"Dunhuang"]],
          h:[`Old Uyghur is the later phase of Old Turkic, spoken and — more importantly — written in the Turfan oasis after the Uyghur Khaganate collapsed and its people moved south into the Tarim Basin in the ninth century. It is the language of a literate, urban, religiously plural society: Buddhist, Manichaean and Christian texts survive in it, in several scripts.`,
             `It matters for two reasons beyond itself. First, its script — the <b>Sogdian-derived Uyghur script</b> — is the ancestor of the Mongolian and Manchu alphabets, which makes the vertical writing on this atlas's Mongolic page a descendant of it. Second, the Uyghur state of Qocho was the polity that absorbed and replaced the Tocharian-speaking oases, so this node and the Tocharian node are two ends of the same story.`,
             `Xuanzang, travelling west in 630, passed through the region before the Uyghurs arrived — the hosts he describes at Gaochang were not Uyghur speakers. The atlas keeps that straight, because the usual telling of the Silk Road compresses four centuries into an afternoon.`],
          t:[["c. 840–860","The Uyghurs move into the Turfan oasis after the Khaganate falls"],
             ["9th–13th c.","Old Uyghur flourishes; Buddhist, Manichaean and Christian texts"],
             ["c. 1200s","The Uyghur script is adopted for Mongolian"],
             ["13th–15th c.","Old Uyghur gives way to Chagatai Turkic"]],
          chips:[["Uyghur script (from Sogdian)","scr"],["Manichaean script","scr"],["deciphered","dec"]] }] },

     { id:"relic", en:"Relic &amp; uncertain", zh:"残存与存疑", py:"Cányún yǔ Cúnyí",
       sp:"fragments only", region:"The Mongolian steppe and the Ordos — the Xiongnu and Rouran heartlands",
       cls:"c-rel", mk:[],
       h:[`The honest-fog-bank branch. Two steppe polities left behind scraps of language that nobody has yet placed with confidence, and the atlas shows them as scraps rather than inventing a classification.`,
          `Neither Rouran nor Xiongnu has an ISO 639-3 code, and neither should: there is not enough attested material to code. Note also the two register traps recorded in the research log — <code>xru</code> looks like "Rouran" but is <b>Marriammu</b>, an Australian language, and <code>xnn</code> looks like "Xiongnu" but is <b>Northern Kankanay</b>, a Philippine one. The atlas shows no code chip for either node rather than a wrong one.`],
       t:[["c. 3rd c. BCE–1st c. CE","The Xiongnu empire dominates the steppe north of China"],
          ["c. 330–555 CE","The Rouran Khaganate rules Mongolia"],
          ["2019","Vovin argues the Bugut and Khüis Tolgoi inscriptions are the earliest Mongolic"]],
       kids:[
        { id:"rouran", en:"Rouran", zh:"柔然语", py:"Róurán yǔ",
          sp:"extinct — fragmentary", region:"The Mongolian steppe; the Rouran Khaganate (c. 330–555)",
          cls:"c-rel", mk:[[47.20,102.83,"Orkhon valley — Rouran and later Uyghur centre"],[42.00,108.00,"Gobi fringe"]],
          h:[`Rouran is the name of a steppe khaganate that ruled Mongolia from about 330 to 555 CE, and of whatever language its rulers spoke. The evidence is thin: a few words and names preserved in Chinese sources, and — the important part — a small group of inscriptions.`,
             `The <b>Bugut</b> and <b>Khüis Tolgoi</b> inscriptions in Mongolia are written in Brāhmī script, and Alexander Vovin argued in 2019 that their language is the earliest attested Mongolic. That claim is the reason this node exists, and it is presented as an argument rather than a settled fact: the <em>Book of Wei</em> connected the Rouran to the Donghu, whom scholars associate with proto-Mongolic peoples, so the Mongolic reading is plausible — but "plausible" is what the atlas says.`,
             `It is also worth keeping the scale in view. A handful of Brāhmī inscriptions is not a corpus, and a language known from a handful of inscriptions is not a language one can classify with confidence.`],
          t:[["c. 330","The Rouran Khaganate forms on the Mongolian steppe"],
             ["c. 555","The khaganate is destroyed by the Göktürks"],
             ["1950s–","The Bugut and Khüis Tolgoi Brāhmī inscriptions are studied"],
             ["2019","Vovin proposes them as the earliest attested Mongolic"]],
          chips:[["Brāhmī (Bugut / Khüis Tolgoi)","scr"],["classification disputed","dec und"]] },

        { id:"xiongnu", en:"Xiongnu", zh:"匈奴语", py:"Xiōngnú yǔ",
          sp:"extinct — fragments only", region:"The Ordos, the Mongolian steppe and the Chinese frontier",
          cls:"c-rel", mk:[[39.61,109.78,"Ordos"],[41.00,112.00,"Inner Mongolian steppe"],[40.80,111.70,"Hohhot area"]],
          h:[`The Xiongnu built the first steppe empire north of China, from about the third century BCE to the first century CE, and their language is one of the oldest unsolved problems in the field. What survives is a set of words and names transcribed into Chinese characters — a method that tells a reader roughly what a word sounded like and almost nothing about how the language worked.`,
             `The proposed affiliations cover most of the map: Turkic, Mongolic, Yeniseian, Iranian, and "isolate". The Yeniseian proposal is the most interesting, because if the Xiongnu spoke a Yeniseian language it would connect them to Ket, the lone surviving Yeniseian language in Siberia, and to the Dené–Yeniseian hypothesis linking that family to Navajo and the Athabaskan languages of North America.`,
             `The atlas lists Xiongnu under "relic and uncertain" and refuses to draw it into any of the families above. That refusal is the finding.`],
          t:[["c. 3rd c. BCE","The Xiongnu empire forms on the steppe"],
             ["c. 200 BCE","The Xiongnu defeat the Han at Baideng; the heqin treaty follows"],
             ["c. 1st c. CE","The empire splits and declines"],
             ["20th–21st c.","Proposed affiliations: Turkic, Mongolic, Yeniseian, Iranian, isolate"]],
          chips:[["Chinese transcription only","scr"],["undeciphered — no corpus","dec und"]] }] },

     { id:"scripts", en:"The scripts of the Silk Road", zh:"丝路文字", py:"Sīlù wénzì",
       sp:"not a subgroup — five scripts, one route",
       region:"From Gandhāra and Sogdiana across the Tarim Basin to Dunhuang and Mongolia",
       cls:"c-script", mk:[],
       h:[`<b>This is not a genetic subgroup and must not be read as one.</b> The five nodes below are writing systems, not languages: they are grouped here because on this route the scripts are as much the story as the speech, and because a reader who wants to understand how these languages were recovered needs them side by side. The Mongolic atlas makes the same move with its script branch.`,
          `What the grouping shows is that the Silk Road's scripts came from two directions. From the west came Aramaic-derived systems — Kharoṣṭhī, the Sogdian script and the Manichaean script — all written right to left. From India came Brāhmī and its descendants, written left to right. From the steppe came the Turkic runiform alphabet, which belongs to neither tradition.`,
          `And the routes the scripts travelled are not the routes the languages travelled. Sogdian script outlived Sogdian by centuries, carried by Uyghur into Mongolian and Manchu. That is the central lesson of this atlas: on the Silk Road, writing systems are cargo.`],
       t:[["c. 3rd c. BCE","Kharoṣṭhī and Brāhmī are both in use in the northwest of the subcontinent"],
          ["c. 2nd c. BCE–3rd c. CE","Aramaic-derived scripts spread along the route"],
          ["c. 8th c.","The Turkic runiform alphabet is carved on the Orkhon steles"],
          ["1893","Thomsen deciphers runiform; the nineteenth century cracks the rest"],
          ["c. 1200s","The Sogdian-derived Uyghur script is adopted for Mongolian"]],
       kids:[
        { id:"kharosthi", en:"Kharoṣṭhī", zh:"佉卢文", py:"Qūlúwén",
          sp:"extinct by the 4th c.", region:"Gandhāra, and east along the route to Niya, Miran and Loulan",
          cls:"c-script", mk:[[34.02,71.58,"Peshawar / Gandhāra"],[38.15,85.55,"Niya"],[40.53,89.86,"Loulan"]],
          h:[`Kharoṣṭhī is the script of Gāndhārī, and it is the odd one out among Indian scripts because it runs <b>right to left</b> — a direction it inherited from Aramaic rather than from Brāhmī. It was used in Gandhāra from about the third century BCE and travelled east along the Silk Road with Buddhism and with administration.`,
             `It is why the Niya and Loulan archives can be read, and its decipherment in the nineteenth century is what made the whole Gāndhārī corpus accessible. It fell out of use around the fourth century, displaced in its own homeland by Brāhmī-derived writing.`],
          t:[["c. 3rd c. BCE","Kharoṣṭhī is in use in Gandhāra"],
             ["c. 1st–4th c. CE","It travels east; the Niya, Miran and Loulan documents"],
             ["19th c.","Kharoṣṭhī is deciphered"],
             ["1994–","Gāndhārī manuscripts in Kharoṣṭhī surface in Afghanistan and Pakistan"]],
          chips:[["Aramaic-derived","scr"],["right to left","scr"],["deciphered","dec"]] },

        { id:"brahmi", en:"Brāhmī", zh:"婆罗米文", py:"Pólúomǐwén",
          sp:"ancestor of most South and Southeast Asian scripts", region:"India, and the Central Asian oases where it was adapted",
          cls:"c-script", mk:[[34.02,71.58,"Gandhāra"],[37.11,79.93,"Khotan — Khotanese in Brāhmī"],[41.72,82.96,"Kucha — Tocharian in Brāhmī"],[42.95,89.19,"Turfan"]],
          h:[`Brāhmī is the ancestor of most of the writing systems of South and Southeast Asia, and it is the script in which two of this atlas's dead languages were written: <b>Tocharian</b> (in a Brāhmī variant adapted to its sounds) and <b>Khotanese Saka</b>. It was also the script of the Bugut and Khüis Tolgoi inscriptions that may preserve the earliest Mongolic.`,
             `That is the pattern worth noticing: Brāhmī was not carried east as a fixed system but adapted, each time, to fit a language it was not designed for — which is why Tocharian and Khotanese look Indian on the page and sound nothing like it.`],
          t:[["c. 3rd c. BCE","Brāhmī is attested in the Mauryan period"],
             ["c. 1st–8th c. CE","Brāhmī variants are adapted for Tocharian and Khotanese"],
             ["6th–8th c.","Brāhmī-derived scripts spread to Tibet and Southeast Asia"]],
          chips:[["Indian tradition","scr"],["left to right","scr"],["deciphered","dec"]] },

        { id:"sogdscript", en:"Sogdian script", zh:"粟特文", py:"Sùtèwén",
          sp:"extinct as a script — but its descendants are everywhere", region:"Sogdiana, then the whole route; later Turfan and Mongolia",
          cls:"c-script", mk:[[39.65,66.96,"Samarkand"],[42.95,89.19,"Turfan — Uyghur adoption"],[47.20,102.83,"Orkhon valley — Mongolian adoption"],[45.75,126.97,"Manchu adoption"]],
          h:[`The most consequential script in this atlas. The <b>Sogdian script</b> is Aramaic-derived and written right to left, and it was used for Sogdian across the whole trade network — including on the “Ancient Letters”. When the Uyghurs moved into the Turfan oasis they took the script with them and adapted it to Turkic, producing the <b>Uyghur script</b>.`,
             `From there it kept going. The Uyghur script was adopted for <b>Mongolian</b> around 1200, and the Mongolian alphabet was in turn adapted for <b>Manchu</b> in 1599. So the vertical writing on this atlas's <a href="#mongolic">Mongolic</a> and <a href="#tungusic">Tungusic</a> pages is a direct descendant of the script of Samarkand's merchants — a writing system that outlived its language by roughly a thousand years and is still in daily use in Inner Mongolia and Xinjiang.`,
             `The atlas draws that line explicitly because it is the single best example of its theme.`],
          t:[["c. 4th c. CE","The Sogdian script is in use; the “Ancient Letters”"],
             ["9th c.","Adapted as the Uyghur script in the Turfan oasis"],
             ["c. 1200s","Adopted for Mongolian"],
             ["1599","Adapted for Manchu by Nurhaci's order"]],
          chips:[["Aramaic-derived","scr"],["right to left, then vertical","scr"],["deciphered","dec"]] },

        { id:"manichaean", en:"Manichaean script", zh:"摩尼文", py:"Móníwén",
          sp:"extinct", region:"Sogdiana and the Turfan oasis — wherever Manichaeism was practised",
          cls:"c-script", mk:[[42.95,89.19,"Turfan — Manichaean texts"],[39.65,66.96,"Samarkand"],[40.14,94.66,"Dunhuang"]],
          h:[`The script of the Manichaean religion, derived from Syriac and written right to left, used for Middle Persian, Parthian, Sogdian and Old Uyghur. It matters here because the Turfan oasis preserved a large Manichaean literature that would otherwise have been lost — Manichaeism was persecuted and suppressed almost everywhere else, and the desert kept what the church could not.`,
             `It is the clearest demonstration in this atlas that a script belongs to a <em>community</em>, not to a language: the same Sogdian and Uyghur texts were written in different scripts depending on whether the scribe was a Buddhist, a Manichaean or a Christian.`],
          t:[["c. 3rd c. CE","The Manichaean script develops from Syriac"],
             ["8th–11th c.","Manichaean texts are written in Sogdian and Old Uyghur at Turfan"],
             ["20th c.","German expeditions recover the Turfan Manichaean archive"]],
          chips:[["Syriac-derived","scr"],["right to left","scr"],["deciphered","dec"]] },

        { id:"runiform", en:"Turkic runiform", zh:"突厥如尼文", py:"Tūjué Rúníwén",
          sp:"extinct", region:"The Orkhon valley, the Yenisei and the Mongolian steppe",
          cls:"c-script", mk:[[47.20,102.83,"Orkhon valley"],[54.00,91.00,"Yenisei — Kyrgyz runiform inscriptions"],[47.36,103.20,"Karakorum"]],
          h:[`The alphabet of the Orkhon inscriptions, and a warning about names. It is called "runiform" because it looks like the Germanic runes, but the resemblance is superficial and the two systems are <b>unrelated</b> — the name is a description, not a genealogy.`,
             `It was deciphered by <b>Vilhelm Thomsen in 1893</b>, after the inscriptions were found by Yadrintsev's expedition in 1889, and that decipherment is one of the founding events of Turkic philology. Related runiform inscriptions, mostly shorter, are found along the Yenisei and associated with the Kyrgyz.`],
          t:[["c. 8th c.","The Orkhon inscriptions are carved in runiform"],
             ["1889","Yadrintsev's expedition reaches the Orkhon Valley"],
             ["1893","Thomsen deciphers the alphabet"],
             ["20th c.","The Yenisei and other runiform corpora are catalogued"]],
          chips:[["Steppe tradition","scr"],["not related to Germanic runes","scr"],["deciphered 1893","dec"]] }] }
    ]
 };


/* ===================== ISO 639-3 =====================
   Every code below was read out of the SIL register (iso-639-3.tab, retrieved
   2026-09-26) rather than remembered — see research.md [SR-105]. Three register
   quirks are recorded here because the atlas's chips would otherwise mislead:
     · the register spells these Tokharian A/B, Kitan, Old Turkish and Old
       Uighur — not Tocharian, Khitan, Old Turkic, Old Uyghur;
     · xco is listed as "Chorasmian", not "Khwarezmian";
     · two codes that LOOK like this atlas's languages are not: xru is
       Marriammu (Australia) and xnn is Northern Kankanay (Philippines).
   Rouran and Xiongnu have no code at all, and the atlas shows none. */
const ISO = {
 silkroad:     '— (not a family; a corridor of unrelated languages)',
 indoeuropean: '— (a family, not a language)',
 tocharian:    '— (branch, no code)',
 tochA:        'xto (type H — register spelling “Tokharian A”)',
 tochB:        'txb (type H — register spelling “Tokharian B”)',
 iranian:      '— (branch, no code)',
 saka:         '— (branch, no code)',
 khotanese:    'kho (type H — historical)',
 tumshuqese:   'xtq (type H — historical)',
 sogdian:      'sog (type H — historical)',
 yaghnobi:     'yai (type L — LIVING, the one survivor)',
 bactrian:     'xbc (type H — historical)',
 khwarezmian:  'xco (type H — register spelling “Chorasmian”)',
 indoaryan:    '— (branch, no code)',
 gandhari:     'pgd (type H — historical)',
 niyadocs:     '— (an archive, not a language)',
 sinotibetan:  '— (a family, not a language)',
 tangut:       'txg (type H — historical)',
 zhangzhung:   'xzh (type H — historical)',
 paramongolic: '— (a grouping, no code)',
 khitan:       'zkt (type H — register spelling “Kitan”)',
 jurchen:      'juc (type H — historical)',
 turkic:       '— (a family, not a language)',
 orkhon:       'otk (type H — register spelling “Old Turkish”)',
 olduyghur:    'oui (type H — register spelling “Old Uighur”)',
 relic:        '— (not a grouping; fragments only)',
 rouran:       '— (no code — note xru is Marriammu, Australia, not Rouran)',
 xiongnu:      '— (no code — note xnn is Northern Kankanay, Philippines, not Xiongnu)',
 scripts:      '— (writing systems, not a language)',
 kharosthi:    '— (a script, not a language)',
 brahmi:       '— (a script, not a language)',
 sogdscript:   '— (a script, not a language)',
 manichaean:   '— (a script, not a language)',
 runiform:     '— (a script, not a language)'
};


/* ===================== per-node feature lists ===================== */
const FEATURES = {
 silkroad:[
  `<b>Every node is dead but one.</b> The colour semantics of this atlas are inverted: here the calm colour is <em>extinct</em> and the one living language, Yaghnobi, is the outlier.`,
  `<b>Markers are find-spots, not settlements.</b> Each dot is where documents, inscriptions or a library were recovered — a watchtower near Dunhuang, a rock in Afghanistan, a ruined city in the Gobi.`,
  `<b>The scripts are the spine.</b> The node chips name each language's writing system and say whether it is deciphered, partial or undeciphered, because that is what determines how much can be known.`],
 indoeuropean:[
  `<b>Three separate arrivals, not one migration.</b> Tocharian, the Iranian group and Gāndhārī are all Indo-European, but they are not close relatives and they reached Central Asia independently.`,
  `<b>All four dead branches ended the same way</b> — absorbed by Turkic and Chinese expansion between the ninth and eleventh centuries.`],
 tocharian:[
  `<b>The easternmost Indo-European language</b> in the ancient world, and the one whose discovery forced a revision of how the family spread.`,
  `<b>Two varieties, never one language</b> in the attested period: A (East/Turfanian) and B (West/Kuchean). The letters are conventional and imply no chronology.`,
  `<b>Buddhist translation is why it survives</b> — the corpus is scripture and monastery paperwork, preserved by desert aridity.`],
 tochA:[
  `<b>Almost entirely liturgical.</b> Tocharian A survives as a language of translation, which makes it hard to assess as speech.`,
  `<b>Conservative in some respects</b> despite being the more restricted variety — a reminder that "restricted" does not mean "late".`],
 tochB:[
  `<b>The source of the famous comparisons.</b> Tocharian B is where the numerals, the kinship terms and the "honey" word that match Greek and Old Church Slavonic come from.`,
  `<b>The widest range of any Tocharian variety</b> — from Turfan in the east to Tumshuq in the west.`],
 iranian:[
  `<b>Four scripts, no Persian.</b> Saka in Brāhmī, Sogdian in Sogdian script, Bactrian in Greek, Khwarezmian in an Aramaic-derived script — reading them meant deciphering four writing systems first.`,
  `<b>Middle Iranian</b>, the stage between Avestan and Old Persian and the modern languages. One of the four still has a descendant.`],
 saka:[
  `<b>Indian script, Iranian language.</b> Khotanese and Tumshuqese are written in Brāhmī — the combination is itself the story of the route.`,
  `<b>Tumshuqese is a thin corpus.</b> The sister relationship shown here rests on a small body of texts and is the standard classification, not an established certainty.`],
 khotanese:[
  `<b>The language of a major Buddhist kingdom.</b> Khotan was a centre of translation and scholarship on the southern Silk Road.`,
  `<b>A slow extinction, not a sudden one.</b> Tibetan occupation, then the Karakhanid conquest around 1006, and the language goes out of use over the following century.`],
 tumshuqese:[
  `<b>Named for a find-spot, not a people.</b> The atlas labels it by the place its documents came from.`,
  `<b>Saka's second variety</b>, distinct from Khotanese and closer to it than to anything else — on the strength of a small corpus.`],
 sogdian:[
  `<b>The lingua franca of the Silk Road.</b> For about four centuries a merchant could travel from the Black Sea to the Chinese capital and do business in Sogdian.`,
  `<b>Two archives anchor it:</b> the “Ancient Letters”, found at Dunhuang in 1907 and dated 313–314 CE, and the Mount Mugh archive of a prince's last stand in the 720s.`,
  `<b>Its script outlived it spectacularly.</b> Sogdian → Uyghur → Mongolian → Manchu: the vertical scripts on the Mongolic and Tungusic pages descend from it.`],
 yaghnobi:[
  `<b>The only living language in this atlas.</b> The sole surviving descendant of Sogdian, spoken in the Yaghnob valley of Tajikistan.`,
  `<b>≈12,500 speakers, by source</b>, most of them bilingual in Tajik — the classic pre-shift situation. Described as endangered, not safe.`,
  `<b>Marked in the opposite colour to everything else here</b>, because in an atlas where almost everything is extinct, "still being learned by children" is the remarkable fact.`],
 bactrian:[
  `<b>The only Iranian language ever written in the Greek alphabet</b> — with one added letter, <em>sho</em> (ϸ), for a sound Greek lacked.`,
  `<b>It called itself Arya</b> (αριαο), an endonym shared across the Indo-Iranian world.`,
  `<b>The Rabatak inscription, found in 1993</b>, is its best-known monument and a fixed point for Kushan chronology.`],
 khwarezmian:[
  `<b>Its own script, derived from Aramaic</b> — Khwarezmian is not written in any script borrowed from a neighbour's literature.`,
  `<b>Two famous speakers:</b> the polymath Al-Biruni and the lexicographer Zamakhshari, through whom the late period is known.`,
  `<b>In use at least until the 13th century</b>, then displaced by Persian for most purposes and by Turkic in daily speech.`],

 indoaryan:[
  `<b>The Buddhist transmission route, in linguistic form.</b> Gāndhārī travelled east with Buddhism — the Silk Road was as much a religious network as a commercial one.`],
 gandhari:[
  `<b>A Prakrit, written right to left.</b> Kharoṣṭhī is the one major Indian script that runs the other way, because it descends from Aramaic rather than Brāhmī.`,
  `<b>The 1994 discoveries changed the field.</b> Birch-bark Buddhist manuscripts surfacing in Afghanistan and western Pakistan are older than most surviving Sanskrit texts and have pushed Buddhist literary history back by centuries.`,
  `<b>It reached China.</b> Gāndhārī material is found as far east as the Tarim Basin, in the Niya and Loulan archives.`],
 niyadocs:[
  `<b>An archive, not a language</b> — included because the archive <em>is</em> the evidence for everyday life on the route.`,
  `<b>Administrative records of the Shanshan kingdom:</b> land transfers, tax demands, legal decisions and a striking number of complaints, in a language whose homeland lay a thousand kilometres west.`],
 sinotibetan:[
  `<b>Two arrivals from opposite directions.</b> Tangut came from the east with the Western Xia state; Zhangzhung is the pre-Buddhist language of the western plateau.`,
  `<b>Both are cross-listed.</b> Tangut and Zhangzhung also belong to the Tibeto-Burman atlas, where they appear in fuller company.`],
 tangut:[
  `<b>Its own logographic script</b>, built on the Chinese model and famously difficult — one scholar called it "one of the most inconvenient of all scripts".`,
  `<b>Nearly 5,800 characters</b>, very few made up of as few as four strokes; a 2004 count put the known inventory at 5,863, excluding variants.`,
  `<b>The Khara-Khoto library</b>, removed by Kozlov's expedition in 1909, is what made the language readable again.`],
 zhangzhung:[
  `<b>Preserved by a religion.</b> Zhangzhung survives almost entirely in the Bon corpus, beneath later Tibetan.`,
  `<b>Its classification is agreed in outline and uncertain in detail</b> — normal for a language known mainly from religious texts written long after it stopped being spoken.`],
 paramongolic:[
  `<b>Two states, two scripts, both abandoned.</b> The Khitan script was the model for the Jurchen script; the Jin then replaced the Khitan small script with their own in 1191.`,
  `<b>Jurchen's script is not its legacy</b> — the Jurchen <em>language</em> became Manchu. See <a href="#tungusic/jurchen">Tungusic → Jurchen</a>.`],
 khitan:[
  `<b>Two mutually exclusive writing systems</b>, not two versions of one: a logographic large script and a syllabary small script.`,
  `<b>Still not fully read.</b> Owing to a narrow corpus and a partially undeciphered script, Khitan has yet to be completely reconstructed. The small script is largely understood; the large script is not.`,
  `<b>Para-Mongolic</b> — the closest extinct relatives of Mongolic without being part of it.`],
 jurchen:[
  `<b>The script was devised in 1119</b> by Wanyan Xiyin, on the Khitan model, so Jurchen writing descends from Chinese characters at two removes.`,
  `<b>The language became Manchu.</b> In 1635 Hong Taiji renamed the people and the language; the line runs Jurchen → Manchu → Xibe.`,
  `<b>Its key surviving text</b> is the inscription on the 1185 Jin Victory Memorial Stele.`],
 turkic:[
  `<b>Two phases of the earliest recorded Turkic:</b> the earlier Orkhon Turkic of the Mongolian steppe, and the later Old Uyghur of the Turfan oasis.`,
  `<b>Deciphered in 1893</b> — which is why the early history of the whole Turkic family can be written at all.`],
 orkhon:[
  `<b>The earliest recorded Turkic</b>, carved on stone monuments in the Orkhon valley of Mongolia in the early eighth century.`,
  `<b>Runiform is a description, not a genealogy.</b> The script looks like the Germanic runes and is unrelated to them.`,
  `<b>Found in 1889, deciphered in 1893</b> by Vilhelm Thomsen — one of the founding events of Turkic philology.`],
 olduyghur:[
  `<b>The ancestor of the Mongolian and Manchu scripts.</b> Its Sogdian-derived Uyghur script is the link in that chain.`,
  `<b>Religiously plural:</b> Buddhist, Manichaean and Christian texts survive, in several different scripts.`,
  `<b>It replaced Tocharian.</b> The Uyghur state of Qocho absorbed the oases whose older Indo-European languages died out in the ninth and tenth centuries.`],

 relic:[
  `<b>The honest-fog-bank branch.</b> Two steppe polities left scraps of language that nobody has placed with confidence, and the atlas shows scraps rather than inventing a classification.`,
  `<b>Neither has an ISO 639-3 code</b>, and neither should — there is not enough attested material to code.`],
 rouran:[
  `<b>The claim is an argument, not a settled fact.</b> Vovin argued in 2019 that the Brāhmī Bugut and Khüis Tolgoi inscriptions are the earliest attested Mongolic.`,
  `<b>A handful of inscriptions is not a corpus</b>, and a language known from a handful of inscriptions cannot be classified with confidence.`],
 xiongnu:[
  `<b>Known only from Chinese transcriptions</b> of words and names — a method that hints at sounds and reveals almost nothing about grammar.`,
  `<b>The proposed affiliations cover most of the map:</b> Turkic, Mongolic, Yeniseian, Iranian, and "isolate".`,
  `<b>The Yeniseian proposal is the interesting one</b>, because it would connect the Xiongnu to Ket and to the Dené–Yeniseian hypothesis.`,
  `<b>No ISO code</b> — and note that xnn is Northern Kankanay, a Philippine language, not Xiongnu.`],
 scripts:[
  `<b>Not a genetic subgroup, and must not be read as one.</b> These are writing systems, grouped because on this route the scripts are as much the story as the speech.`,
  `<b>Two directions of origin:</b> Aramaic-derived systems from the west (Kharoṣṭhī, Sogdian, Manichaean), Brāhmī from India, and runiform from the steppe, which belongs to neither.`,
  `<b>Scripts are cargo.</b> Sogdian script outlived Sogdian by centuries, carried by Uyghur into Mongolian and Manchu — the central lesson of this atlas.`],
 kharosthi:[
  `<b>Right to left</b>, because it descends from Aramaic rather than Brāhmī — the odd one out among the scripts of the subcontinent.`,
  `<b>It is why the Niya and Loulan archives can be read</b>, and its nineteenth-century decipherment opened the whole Gāndhārī corpus.`],
 brahmi:[
  `<b>The ancestor of most South and Southeast Asian scripts</b>, and the script of two of this atlas's dead languages: Tocharian and Khotanese Saka.`,
  `<b>Adapted, not transplanted.</b> Each language it was applied to required a variant — which is why Tocharian and Khotanese look Indian on the page and sound nothing like it.`],
 sogdscript:[
  `<b>The most consequential script here.</b> Sogdian script → Uyghur script → Mongolian → Manchu: still in daily use in Inner Mongolia and Xinjiang today.`,
  `<b>It outlived its language by roughly a thousand years</b> — the single best example of the atlas's theme.`],
 manichaean:[
  `<b>The script of a persecuted religion</b>, derived from Syriac, used for Middle Persian, Parthian, Sogdian and Old Uyghur.`,
  `<b>The Turfan oasis preserved what the church could not</b> — a large Manichaean literature that would otherwise be lost.`,
  `<b>A script belongs to a community, not a language:</b> the same Sogdian and Uyghur texts were written in different scripts by Buddhists, Manichaeans and Christians.`],
 runiform:[
  `<b>Called "runiform" for its appearance only.</b> The resemblance to Germanic runes is superficial and the two systems are unrelated.`,
  `<b>Deciphered by Vilhelm Thomsen in 1893</b>, four years after Yadrintsev's expedition reached the inscriptions.`,
  `<b>Related but shorter inscriptions</b> run along the Yenisei and are associated with the Kyrgyz.`]
};


/* ===================== links (Omniglot) =====================
   Every URL below was requested before being written down — see research.md
   [SR-110], which also records the traps found:
     · chorasmian.htm is 200 but khwarezmian.htm is 404 — the register
       spelling is the one that works;
     · kharosthi.htm is 200 but kharoshti.htm is 404;
     · there is NO Manichaean page under any name tried, and no page for Saka,
       Khotanese, Tumshuqese, Gāndhārī, Zhangzhung or the Khitan large script.
   Nodes with no page carry an empty list rather than a guessed link; the
   engine's search fallback covers them. */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 silkroad:    [['Omniglot — writing systems index', 'https://www.omniglot.com/writing/langfam.htm']],
 indoeuropean:[['Omniglot — writing systems index', 'https://www.omniglot.com/writing/langfam.htm']],
 tocharian:   [['Tocharian script — Omniglot', OM+'tocharian.htm']],
 tochA:       [['Tocharian script — Omniglot', OM+'tocharian.htm']],
 tochB:       [['Tocharian script — Omniglot', OM+'tocharian.htm']],
 iranian:     [['Sogdian script — Omniglot', OM+'sogdian.htm']],
 saka:        [],
 khotanese:   [],
 tumshuqese:  [],
 sogdian:     [['Sogdian script — Omniglot', OM+'sogdian.htm']],
 yaghnobi:    [['Yaghnobi — Omniglot', OM+'yaghnobi.htm']],
 bactrian:    [['Bactrian — Omniglot', OM+'bactrian.htm']],
 khwarezmian: [['Chorasmian — Omniglot', OM+'chorasmian.htm']],
 indoaryan:   [['Kharoṣṭhī — Omniglot', OM+'kharosthi.htm']],
 gandhari:    [['Kharoṣṭhī — Omniglot', OM+'kharosthi.htm']],
 niyadocs:    [['Kharoṣṭhī — Omniglot', OM+'kharosthi.htm']],
 sinotibetan: [['Tangut — Omniglot', OM+'tangut.htm']],
 tangut:      [['Tangut — Omniglot', OM+'tangut.htm']],
 zhangzhung:  [],
 paramongolic:[['Khitan — Omniglot', OM+'khitan.htm']],
 khitan:      [['Khitan — Omniglot', OM+'khitan.htm']],
 jurchen:     [['Jurchen — Omniglot', OM+'jurchen.htm']],
 turkic:      [['Old Turkic (Orkhon) — Omniglot', OM+'orkhon.htm']],
 orkhon:      [['Old Turkic (Orkhon) — Omniglot', OM+'orkhon.htm']],
 olduyghur:   [['Uyghur script — Omniglot', OM+'uyghur.htm']],
 relic:       [],
 rouran:      [],
 xiongnu:     [],
 scripts:     [['Aramaic — Omniglot', OM+'aramaic.htm']],
 kharosthi:   [['Kharoṣṭhī — Omniglot', OM+'kharosthi.htm']],
 brahmi:      [['Brāhmī — Omniglot', OM+'brahmi.htm']],
 sogdscript:  [['Sogdian script — Omniglot', OM+'sogdian.htm']],
 manichaean:  [['Syriac — Omniglot (no Manichaean page exists)', OM+'syriac.htm']],
 runiform:    [['Old Turkic (Orkhon) — Omniglot', OM+'orkhon.htm'], ['Runic (for the look-alike)', OM+'runic.htm']]
};


/* ===================== schematic outline (hand-drawn, offline) =====================
   Coarse rings for the Tarim oasis belt, the Hexi corridor, the Tianshan and the
   Bactrian–Sogdian lands. Simplified from memory of the geography, NOT surveyed
   boundaries; the markers sit at true coordinates. Works with no tiles at all. */
const TARIM  = [[75.99,39.47],[78.50,40.50],[80.26,41.17],[82.96,41.72],[86.57,42.06],[89.19,42.95],
                [93.51,42.83],[94.66,40.14],[92.00,38.50],[85.55,38.15],[82.00,37.50],[79.93,37.11],
                [77.24,38.42],[75.99,39.47]];
const HEXI   = [[93.50,39.50],[99.00,38.00],[103.50,35.00],[104.50,36.50],[100.00,40.50],[94.00,41.00],
                [93.50,39.50]];
const GOBI   = [[99.00,42.50],[104.00,43.00],[104.50,40.50],[100.00,40.50],[99.00,42.50]];
const TIANSHAN=[[80.00,45.50],[88.00,45.00],[90.50,43.50],[86.00,42.00],[80.50,42.50],[80.00,45.50]];
const WEST   = [[60.00,38.00],[68.00,40.50],[71.00,38.00],[67.00,36.00],[61.00,36.00],[60.00,38.00]];
const SR_GEO = { type:'FeatureCollection',
  features:[TARIM,HEXI,GOBI,TIANSHAN,WEST].map(r=>({
    type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };

/* ---------- approximate "core areas" ----------
   Hand-drawn coarse blocks showing roughly where each branch is rooted — NOT
   surveyed boundaries, and deliberately crude. For a dead language the block is
   a region of ATTESTATION, not a speech territory: it marks where the documents
   came from. The marker layer remains the factual one. */
const AREAS = {
 'c-ie':[[[74.0,42.0],[91.0,44.0],[92.0,37.0],[76.0,36.0],[74.0,42.0]],
         [[59.0,40.5],[71.5,40.5],[71.5,35.5],[59.0,35.5],[59.0,40.5]]],
 'c-toc':[[[76.0,43.5],[90.5,44.0],[91.0,40.5],[76.5,40.0],[76.0,43.5]]],
 'c-ira':[[[59.0,40.5],[71.5,40.5],[71.5,35.5],[59.0,35.5],[59.0,40.5]],
          [[76.0,41.5],[92.0,42.5],[92.5,36.5],[76.5,36.0],[76.0,41.5]]],
 'c-sak':[[[76.0,40.0],[90.0,40.5],[90.5,36.0],[76.5,35.5],[76.0,40.0]]],
 'c-sog':[[[64.0,41.0],[72.0,41.0],[72.0,37.0],[64.0,37.0],[64.0,41.0]]],
 'c-bac':[[[64.0,38.0],[71.0,38.0],[71.0,35.0],[64.0,35.0],[64.0,38.0]]],
 'c-khw':[[[57.5,43.0],[62.5,43.0],[62.5,40.0],[57.5,40.0],[57.5,43.0]]],
 'c-ia':[[[70.0,36.0],[74.5,36.0],[74.5,32.0],[70.0,32.0],[70.0,36.0]],
         [[80.0,40.5],[88.0,40.5],[88.0,37.0],[80.0,37.0],[80.0,40.5]]],
 'c-st':[[[94.0,41.0],[104.5,40.5],[104.5,35.5],[94.0,36.0],[94.0,41.0]]],
 'c-tan':[[[99.0,43.0],[107.5,42.5],[107.5,38.0],[99.0,38.5],[99.0,43.0]]],
 'c-zz':[[[79.0,33.5],[86.0,33.5],[86.0,29.5],[79.0,29.5],[79.0,33.5]]],
 'c-pm':[[[117.0,48.5],[130.0,48.0],[130.5,41.0],[117.5,41.0],[117.0,48.5]]],
 'c-kit':[[[117.0,46.0],[125.0,45.5],[125.0,41.5],[117.0,42.0],[117.0,46.0]]],
 'c-jur':[[[124.0,48.0],[131.0,47.0],[131.0,42.5],[124.5,43.0],[124.0,48.0]]],
 'c-tk':[[[100.0,50.0],[106.5,50.0],[106.5,46.5],[100.0,46.5],[100.0,50.0]],
         [[86.0,44.0],[92.0,44.0],[92.0,41.0],[86.0,41.0],[86.0,44.0]]],
 'c-rel':[[[98.0,50.0],[113.0,50.0],[113.0,42.0],[98.0,42.0],[98.0,50.0]]],
 'c-live':[[[68.0,39.5],[69.5,39.5],[69.5,38.5],[68.0,38.5],[68.0,39.5]]]
};


/* ===================== registration ===================== */
window.ATLASES = window.ATLASES || {};
window.ATLASES.silkroad = {
  key: 'silkroad',
  title:   { zh: '丝绸之路死语', en: 'Silk Road lost languages' },
  tagline: 'A corridor of dead languages and live scripts — from the Tarim oases to Bactria, and the one descendant that survived',
  stats:   [['33', 'nodes — all extinct but one'], ['8', 'scripts on one route'], ['3', 'scripts not fully deciphered']],
  palette: {
    anc: '#cdd7de', ie: '#7f8fb0', toc: '#c98a4b', ira: '#8f7fc0', sak: '#a06fb8',
    sog: '#c07fa8', bac: '#7fa8c0', khw: '#9fb0d0', ia: '#c9a04b', st: '#6fa88f',
    tan: '#4f9f7f', zz: '#7fb8a0', pm: '#b08050', kit: '#c09060', jur: '#d0a070',
    tk: '#a8b84f', rel: '#8b94a8', script: '#d4a94f', live: '#3fd6a0'
  },
  legend:  [['anc','The atlas'],['ie','Indo-European'],['toc','Tocharian'],['ira','Iranian'],
            ['sak','Saka'],['sog','Sogdian'],['bac','Bactrian'],['khw','Khwarezmian'],
            ['ia','Indo-Aryan (Gāndhārī)'],['st','Sino-Tibetan'],['tan','Tangut'],['zz','Zhangzhung'],
            ['pm','Para-Mongolic & Tungusic'],['kit','Khitan'],['jur','Jurchen'],['tk','Turkic'],
            ['rel','Relic / uncertain'],['script','Scripts (not genetic)'],['live','★ Yaghnobi — the one survivor']],
  view:    { center: [85, 41], zoom: 4.2 },
  outline: { color: '#d4a94f', fill: 'rgba(212,169,79,0.05)' },
  sketchGeo: SR_GEO,
  captions: {
    note:   '● These markers are <b>document find-spots, not settlements</b> — a watchtower near Dunhuang where the Sogdian “Ancient Letters” lay, a rock near Surkh Kotal, a ruined city in the Gobi, the caves and jars the Gāndhārī scrolls came out of. Almost nothing here has speakers, so a marker answers "where was this language <em>recovered</em>?" rather than "who speaks it?". Cities like Samarkand, Kashgar and Turfan appear as find-spots or as the seats of the states whose documents survive, not as speech communities.',
    areas:  '<b style="color:var(--gold)">Approximate regions of attestation</b> — coarse hand-drawn blocks showing roughly where each group\'s documents came from. They are not speech territories and not surveyed boundaries: for a dead language a block marks where the <em>evidence</em> is, and the edges are guesswork. The marker layer remains the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn Tarim oasis belt, Hexi corridor, Tianshan and Bactrian–Sogdian outline, simplified from memory of the geography; the markers sit at true coordinates. Works fully offline, which matters here because several of these find-spots are in areas with poor tile coverage.'
  },
  fonts: ['Noto Serif SC'],
  filterPlaceholder: 'e.g. Tocharian, Sogdian, Tangut, Khitan…',
  listen: {
    om: 'https://www.omniglot.com/writing/',
    fv: 'https://forvo.com/languages/',
    search: 'pronunciation reconstruction'
  },
  /* Special mode (languages.md §2.12) — three opt-in switches the engine honours:
       kinds         — the panel's type labels, because "Living variety" is wrong here
       timelineFirst — the timeline renders above the history prose
       per-node chips — script names and decipherment status (see the DATA nodes) */
  kinds: { root: 'The atlas', branch: 'Branch / group', leaf: 'Attested language', stage: 'Stage' },
  timelineFirst: true,
  /* Every node's `sp` string is already complete, so the engine must not append
     its default " speakers" — otherwise a dead language reads "extinct speakers". */
  spSuffix: '',
  rootId: 'silkroad',
  stages: [],
  sources: 'Sources: the SIL ISO 639-3 register (<i>iso-639-3.tab</i>, retrieved 2026-09-26) for every code quoted, including the three spelling mismatches and the two false friends recorded at SR-105 · N. Sims-Williams on Bactrian and Sogdian, including the Rabatak inscription · D. Q. Adams, <i>A Dictionary of Tocharian B</i>, and the Tocharian grammatical literature · R. E. Emmerick on Khotanese · R. Salomon, <i>Ancient Buddhist Scrolls from Gandhāra</i> (1999) and the subsequent Gāndhārī manuscript publications · Gong Hwang-cherng (龚煌城) and T. Nishida on Tangut · J. Janhunen and D. Kane on Khitan and Jurchen · T. Tekin, <i>A Grammar of Orkhon Turkic</i> · A. Vovin (2019), “A Sketch of the Earliest Mongolic Language: the Brāhmī Bugut and Khüis Tolgoi Inscriptions”, for the Rouran claim, presented as an argument · the UNESCO and Glottolog entries for Yaghnobi. <b>This atlas is all-extinct by design, so the endangerment colour semantics are inverted</b>: the calm colour is "dead" and the one living language is the outlier. Speaker figures are given only for Yaghnobi, and carry "by source" because the counts vary. Decipherment status is stated per script: "deciphered" means the script can be read, "partial" means it partly can, and "undeciphered — no corpus" means the material is too thin to try. See <i>research.md</i> SR-101 to SR-110.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();

