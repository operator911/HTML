/* atlas-siberian.js — Siberian isolate pocket 西伯利亚孤立语
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (see languages.md §1.3 for the contract,
 * §2.13 for this atlas's brief, and research.md §"Siberian isolate pocket
 * (Phase 8)" for the evidence log — every load-bearing date and figure below is
 * logged there as SI-101 … SI-113).
 *
 * THE THING THIS ATLAS HAS TO GET RIGHT: this is not a family. The four groups
 * drawn here are isolates and small families with no demonstrated relationship
 * to one another; what they share is that they were in northern Asia before the
 * Tungusic and Turkic speakers who largely displaced them, and before Russian,
 * which displaced those in turn. So the root is drawn as a PLACE, not an
 * ancestor — the same treatment the Formosan atlas needed — and no proto-language
 * is implied at the top.
 *
 * Four further things this atlas is careful about:
 *  1. Ainu is named and linked, not redrawn. It sits inside the areal grouping
 *     in some of the sources and outside the canonical four in others; this atlas
 *     draws the four and links to #japonic/ainu, where it is already covered in
 *     full. Eskaleut is named as deliberately not drawn.
 *  2. Itelmen's speaker count is shipped as CONTESTED. One source gives 808 from
 *     the 2020 census; another says fewer than five people. Both are stated.
 *  3. All markers stay west of 180°, because Chukotka crosses the antimeridian
 *     and this map does not wrap. Cape Navarin, at 179.10°E, is the easternmost.
 *  4. The four families are not related to each other, and the atlas never
 *     implies they are. Where a relationship HAS been proposed — Uralic and
 *     Yukaghir, Chukotko-Kamchatkan and Nivkh, Ket and Na-Dene — the proposal is
 *     named, attributed and left unresolved.
 */

(function () {
'use strict';

/* ---------- the tree ----------
   id · en · zh (the name in Chinese) · nat/py where a native form is useful ·
   sp (speakers, hedged "by source") · region · cls (palette key) ·
   mk [lat, lng, label] · h reader-facing prose · t timeline · kids */
const DATA = {
  id:'siberian', en:'Siberian isolate pocket', zh:'西伯利亚孤立语', py:'Xībólìyà gūlìyǔ',
  nat:'Сибирь', sp:'four groups, about 6,300 speakers in all',
  region:'Northern Asia, from the Yenisei to the Bering Strait, and south down the Kamchatka peninsula',
  cls:'c-anc',
  mk:[[62.49,86.28,'Kellog — the last Ket village'],[64.73,177.52,'Anadyr — Chukchi country'],[53.13,140.73,'Nikolayevsk-on-Amur — Nivkh'],[69.18,154.47,'Andryushkino — Tundra Yukaghir']],
  h:[`These four groups of languages have almost nothing in common except their address. They are not related to each other, and no one has shown that they ever were. <b>What they share is that they were here first</b> — in northern Asia before the Tungusic and then the Turkic speakers who now surround them, and before Russian, which in turn displaced those.`,
     `The name for the grouping says as much: they are called <b>Paleo-Siberian</b>, "old Siberian", and the label is geographic rather than genealogical. It records an order of arrival, not a common ancestor. There is no Proto-Paleo-Siberian and this atlas does not draw one.`,
     `<b>Small numbers, everywhere.</b> Add all four groups together and you have roughly <b>6,300 speakers</b> — fewer people than live in a single small town. One of the five Chukotko-Kamchatkan languages, <b>Kerek</b>, lost its last speaker in 2005. The Chukchi and Koryak counts, the largest here, are each a minority share of their own ethnic population: about one Chukchi in six still speaks Chukchi.`,
     `<b>Two neighbours are named but not redrawn.</b> <a href="#japonic/ainu">Ainu</a> belongs to this neighbourhood too, and is covered in full on the Japonic atlas — so it is linked rather than duplicated here. <b>Eskaleut</b>, the Inuit-Yupik-Unangan family, is also often listed alongside these groups, and is left out: it is a story that runs across the Bering Strait into North America, and drawing half of it here would misrepresent both halves.`],
  t:[["c. 1600","The four groups at their widest, before the Tungusic and Turkic expansions"],
     ["17th–18th c.","Russian expansion along the rivers; tribute and then administration"],
     ["1930s–1950s","Official alphabets created for each of these languages, in Cyrillic"],
     ["2005","Kerek loses its last speaker"]],
  kids:[
   { id:'chukotkokamchatkan', en:'Chukotko-Kamchatkan', zh:'楚科奇-堪察加语系',
     py:'Chǔkēqí-Kānchájiā yǔxì', nat:'Ԓыгъоравэтԓьэн',
     sp:'about 5,300 speakers, by source', region:'Chukotka and the Koryak country, north-east to the Bering Strait and south down Kamchatka',
     cls:'c-ckk',
     mk:[[64.73,177.52,'Anadyr — the Chukchi centre'],[59.08,159.95,'Palana — Koryak country'],[60.43,166.05,'Tilichiki — Alutor'],[62.28,179.10,'Cape Navarin — where Kerek was spoken']],
     h:[`This is the one group in this atlas that really is a family — five languages descended from a single ancestor, and the only one of the four whose internal shape is not in dispute.`,
        `<b>It splits in two.</b> Four of the five are <b>Chukotkan</b>, spoken across Chukotka and the Koryak country: Chukchi, Koryak, Alutor and the extinct Kerek. The fifth, <b>Itelmen</b>, is alone in its own half on the Kamchatka peninsula, and is far enough from the others that the two halves are usually treated as separating at the very root of the family.`,
        `<b>A larger family has been proposed around it.</b> On morphological, typological and lexical evidence, Michael Fortescue has argued that Chukotko-Kamchatkan and Nivkh are related, forming a Chukotko-Kamchatkan–Amuric family. The same author does not consider Yeniseian and Yukaghir related to anything. That proposal is named here and <b>not drawn</b>, because it is one scholar's case rather than an established grouping.`,
        `<b>The old name for the family is Luoravetlan</b>, from a Chukchi self-designation. It appears in older literature and has largely been replaced.`],
     t:[["c. 1000–1500 CE","Chukotkan and Kamchatkan separate, by reconstruction"],
        ["17th–18th c.","Russian contact and the tribute system"],
        ["1930s","Cyrillic alphabets devised for Chukchi, Koryak and Itelmen"],
        ["2005","Kerek loses its last speaker"]],
     kids:[
      { id:'protochk', en:'Proto-Chukotko-Kamchatkan', zh:'原始楚科奇-堪察加语',
        py:'Yuánshǐ Chǔkēqí-Kānchájiā yǔ',
        sp:'reconstructed, not spoken', region:'Reconstructed; no single locality',
        cls:'c-his',
        mk:[[64.00,174.00,'Reconstructed — no single locality']],
        h:[`Proto-Chukotko-Kamchatkan is the ancestor the five languages descend from, and it is a genuine reconstruction rather than a guess: the sound correspondences between Chukchi, Koryak, Alutor and Itelmen are regular enough to project a single earlier system.`,
           `<b>What it looked like.</b> It was polysynthetic, like its descendants — long verbs carrying agreement for both subject and object — and it had <b>vowel harmony</b>, a constraint that every vowel in a word agree in some feature. Chukchi still has both, which is why Chukchi is one of the standard examples of a polysynthetic language in the typological literature.`,
           `<b>Where it was spoken is not agreed.</b> The family's spread from a homeland somewhere in the north-east, and whether Chukotkan or Kamchatkan moved first, are questions the reconstruction alone cannot settle.`],
        t:[["c. 1000–1500 CE","The ancestor of the five languages, by reconstruction"]],
        kids:[] },
      { id:'chukotkan', en:'Chukotkan', zh:'楚科奇语支',
        py:'Chǔkēqí yǔzhī', sp:'four languages, one of them extinct',
        region:'Chukotka and the Koryak country — the whole north-east mainland, from the Kolyma to the Bering Strait',
        cls:'c-ckk',
        mk:[[64.73,177.52,'Anadyr'],[66.00,173.50,'Chukchi coast'],[59.08,159.95,'Palana — Koryak'],[62.28,179.10,'Cape Navarin']],
        h:[`The Chukotkan half of the family runs across the whole north-east mainland, and all four of its languages are close enough to one another that a speaker of one can partly follow another.`,
           `<b>They are the classic polysynthetic languages of Siberia.</b> A single verb can carry the meaning of a whole English clause, with the subject and object marked on the verb and nouns incorporated inside it. They are also ergative, and they have vowel harmony.`,
           `<b>One of the four is gone.</b> Kerek was spoken on the coast around Cape Navarin and had already shrunk to a handful of speakers by the twentieth century; its last speaker died in 2005. Alutor, its nearest surviving neighbour, is down to a few hundred and mostly elderly speakers.`],
        t:[["c. 1000–1500 CE","The Chukotkan group separates from Kamchatkan"],
           ["18th–19th c.","Reindeer-herding Chukchi expand west and south"],
           ["1930s","Cyrillic alphabets for Chukchi, Koryak and Alutor"],
           ["2005","Kerek loses its last speaker"]],
        kids:[
         { id:'chukchi', en:'Chukchi', zh:'楚科奇语', nat:'ԓыгъоравэтԓьэн йиԓыйиԓ',
           py:'Chǔkēqí yǔ', sp:'2,607 — about one in six Chukchi',
           region:'Chukotka — the Anadyr basin, the Chaun lowlands and the coastal settlements facing the Bering Strait',
           cls:'c-ckk',
           mk:[[64.73,177.52,'Anadyr — the administrative centre'],[69.70,170.28,'Pevek — Chaunskaya Bay'],[68.05,166.45,'Bilibino — inland']],
           h:[`Chukchi is the largest language in this atlas and still the smallest kind of large: <b>2,607 speakers</b> counted in 2020, which is <b>about 16% of the Chukchi population</b>. Five out of six Chukchi do not speak it.`,
              `<b>Two ways of life, one language.</b> The Chukchi divide between reindeer herders inland and sea-mammal hunters on the coast, and the two groups have historically differed in dress, diet and social organisation. They speak varieties of the same language that are mutually intelligible — the split is economic, not linguistic.`,
              `<b>The grammar is polysynthetic and ergative.</b> Verbs carry agreement for both participants, nouns can be incorporated into them, and vowel harmony runs through the whole word. Chukchi is one of the languages linguists reach for when they need an example of a polysynthetic system.`,
              `<b>It has been written three ways.</b> In the 1920s a Chukchi reindeer herder named <b>Tenevil</b> invented his own writing system for the language, with some seventy-two signs — <b>entirely his own invention, and never used beyond his camp</b>. A Latin orthography followed in the early Soviet period, and a <b>Cyrillic alphabet</b> replaced it in the 1930s. That Cyrillic script is the one in use now, and the words at the top of this entry are written in it.`,
              `<b>UNESCO grades it Definitely Endangered.</b> It is still taught in some schools in Chukotka and has a small publishing tradition, which most languages in this atlas do not.`],
           t:[["1920s","Tenevil invents his own script for Chukchi"],
              ["1931","A Latin orthography is introduced"],
              ["1930s","Cyrillic replaces it"],
              ["2020 census","2,607 speakers — 16.1% of the ethnic population"]],
           chips:[["invented script, never left one camp","scr"],["polysynthetic and ergative"],["2,607 speakers — one Chukchi in six"]],
           kids:[] },
         { id:'koryak', en:'Koryak', zh:'科里亚克语', nat:'чавʼчывэн',
           py:'Kēlǐyàkè yǔ', sp:'1,665 — about one in five Koryak',
           region:'The Koryak country north of Kamchatka — the Penzhina and Karaginsky coasts, and inland to the reindeer pastures',
           cls:'c-ckk',
           mk:[[59.08,159.95,'Palana — the administrative centre'],[59.25,163.06,'Ossora — the Karaginsky coast']],
           h:[`Koryak is Chukchi's nearest relative and sits between it and Alutor. <b>1,665 speakers</b> were counted in 2010, about <b>21% of the Koryak population</b> — a slightly higher share than Chukchi's, from a smaller base.`,
              `<b>It splits along the same lines as Chukchi</b>, and more finely: five varieties are named, after places and after ways of life — Chavchuven, Apuka, Kamen, Paren and Itkan. Chavchuven is the reindeer-herders' variety; the others are coastal.`,
              `<b>Its speakers live either side of a border that moved.</b> The Koryak country was an administrative district of its own until 2007, when it was merged into Kamchatka Krai — a change that reduced the institutional support the language had.`,
              `<b>UNESCO grades it Definitely Endangered</b>, the same grade as Chukchi.`],
           t:[["18th c.","Russian contact along the Penzhina and Karaginsky coasts"],
              ["1930s","A Cyrillic alphabet is devised for Koryak"],
              ["2007","Koryak Okrug is merged into Kamchatka Krai"],
              ["2010 census","1,665 speakers — 21% of the ethnic population"]],
           chips:[["five varieties, named for places and livelihoods"],["Definitely Endangered — UNESCO"]],
           kids:[] },
         { id:'alutor', en:'Alutor', zh:'阿留特语', nat:'алуталг’у',
           py:'Āliútè yǔ', sp:'172, counted in 2021',
           region:'The north-east coast of Kamchatka — the Karaginsky Gulf and the isthmus toward Chukotka',
           cls:'c-ckk',
           mk:[[60.43,166.05,'Tilichiki — the surviving community']],
           h:[`Alutor is the smallest of the Chukotkan languages that still has speakers: <b>172 people</b> were recorded in the 2021 census. It is close to Koryak, and the two are sometimes treated as a single chain of varieties rather than separate languages.`,
              `<b>Its own sources already record one of its neighbours as lost.</b> Alongside Alutor proper, the varieties listed include Palana Koryak and Karagin Koryak — and <b>Karagin is marked extinct, with a question mark</b>, because the surviving records are not complete enough to date its end.`,
              `<b>UNESCO grades Alutor Severely Endangered</b>, one step worse than Chukchi and Koryak, and one step better than the languages that are gone.`],
           t:[["1930s","Written in Cyrillic, alongside Koryak"],
              ["20th c.","Karagin Koryak dies out; Alutor's speaker base shrinks"],
              ["2021 census","172 speakers"]],
           chips:[["172 speakers, counted in 2021"],["Severely Endangered — UNESCO"]],
           kids:[] },
         { id:'kerek', en:'Kerek', zh:'克列克语', nat:'аӈӄалҕакку',
           py:'Kèlièkè yǔ', sp:'extinct — last speaker died 2005',
           region:'The Bering Sea coast around Cape Navarin, at the north-east tip of Chukotka',
           cls:'c-ckk',
           mk:[[62.28,179.10,'Cape Navarin — the Kerek coast']],
           h:[`Kerek is the language here that has already stopped. <b>Its last speaker, Ekaterina Khatkana, died in 2005</b>, and UNESCO records it as extinct.`,
              `<b>Whether it was ever a language is itself a question.</b> Kerek sat between Chukchi and Koryak, close to both, and the sources describe it as having been treated in different periods as a Koryak dialect, as an independent language, and as something between the two. Its speakers were few throughout the period it was recorded — a small coastal group around Cape Navarin, south of Anadyr.`,
              `<b>Its name for itself survives in the record</b>, which is more than most extinct languages manage: the form at the top of this entry means roughly "the people here", and is written in the Cyrillic alphabet devised for it.`,
              `<b>And the coast it belonged to is unusual on this map.</b> Cape Navarin sits at <b>179.1°E</b>, less than a degree from the 180th meridian, which makes it the easternmost place drawn here — and a reminder that Chukotka continues past the edge of this map.`],
           t:[["19th c.","Recorded as a small coastal group south of Anadyr"],
              ["20th c.","Treated variously as a Koryak dialect and an independent language"],
              ["1991","Two elderly speakers recorded in the field"],
              ["2005","Ekaterina Khatkana dies — the language's last speaker"]],
           chips:[["extinct 2005"],["the easternmost point drawn here, 179.1°E"]],
           kids:[] }
        ] },

      { id:'itelmen', en:'Itelmen', zh:'伊捷尔缅语', nat:'итэнмэн',
        py:'Yījié’ěrmiǎn yǔ', sp:'contested — see below',
        region:'The Kamchatka peninsula, above all the west coast; formerly across the whole peninsula',
        cls:'c-itl',
        mk:[[57.21,156.87,'Kovran — where the community is concentrated'],[53.02,158.65,'Petropavlovsk-Kamchatsky — the regional centre']],
        h:[`Itelmen is alone on its side of the family. It shares a distant ancestor with Chukchi, Koryak and Alutor and nothing else, and the two halves of Chukotko-Kamchatkan are usually taken to have separated at the family's root — which makes Itelmen, not Chukchi, the most divergent member.`,
           `<b>How many speakers it has is genuinely disputed, and this atlas will not pretend otherwise.</b> The <b>2020 census records 808</b> people claiming Itelmen, from an ethnic population of about 2,600. Against that, a widely used reference work on the Paleo-Siberian languages says Itelmen is <b>"spoken by fewer than 5 people, mostly elderly"</b> on the west coast. Those two numbers differ by a factor of about 160, and they are measuring different things — self-reported language claim in a census against an assessment of fluent everyday speakers. <b>Both are reported here; neither is presented as the answer.</b>`,
           `<b>The community's centre is one village.</b> Kovran, on the west coast at the mouth of the river of the same name, is where Itelmen speakers and Itelmen institutions are concentrated, and where teaching has been attempted. It is a long way from Petropavlovsk-Kamchatsky, the regional capital, which is why the language's fortunes are so local.`,
           `<b>Its old name is Kamchadal</b>, and that name was applied both to the language and, in the colonial period, to the mixed population of the peninsula. The people's own name for themselves is Itelmen; the language has also been recorded under the form <i>Itənmən</i>, and the Cyrillic spelling at the top of this entry reflects that.`,
           `<b>UNESCO grades it Severely Endangered</b>, and the sources record a revival effort beginning in the early twenty-first century — which is why the census figure and the "fewer than five" assessment can both be true at once. A language can have hundreds of people who identify with it and a handful who still speak it.`],
        t:[["18th c.","Russian conquest of Kamchatka; the Itelmen population collapses"],
           ["19th c.","The name Kamchadal spreads to the mixed population"],
           ["1930s","A Cyrillic alphabet is devised for Itelmen"],
           ["2020 census","808 record the language; a reference work says fewer than five speak it"],
           ["early 21st c.","Revival efforts begin, centred on Kovran"]],
        chips:[["the most divergent member of its family"],["808 or fewer than five — the sources disagree","warn"],["Severely Endangered — UNESCO"]],
        kids:[] },

     ] },

   { id:'nivkh', en:'Nivkh', zh:'尼夫赫语', nat:'нивғгу диф',
     py:'Nífūhè yǔ', sp:'about 1,300, 2020 census',
     region:'The lower Amur and its liman on the mainland, and the northern half of Sakhalin island',
     cls:'c-niv',
     mk:[[53.13,140.73,'Nikolayevsk-on-Amur'],[53.59,142.95,'Okha — north Sakhalin'],[51.81,143.17,'Nogliki — east Sakhalin']],
     h:[`Nivkh is usually described as an isolate, and that description has become slightly out of date without becoming wrong. The recent literature calls these the <b>Amuric</b> languages and treats them as a small family; older sources call the language <b>Gilyak</b> and call it an isolate. <b>Which label fits depends on whether the Amur and Sakhalin varieties are counted as one language or two</b>, and on how much weight is given to the differences between them.`,
        `<b>About 1,300 people speak it</b>, out of an ethnic population of 4,652 — roughly a quarter. It is the second-largest language in this group after Chukchi, which says more about how small these languages all are than about Nivkh.`,
        `<b>Its geography is a coastline, not a territory.</b> Nivkh is spoken along the lower Amur and around the river's liman on the mainland, and down the northern half of Sakhalin. It was formerly spoken further west into Amur Oblast and on the Shantar Islands, which it no longer is.`,
        `<b>Four varieties are named</b> — Amur (also called Nivkh proper), East Sakhalin, North Sakhalin and South Sakhalin — plus a fifth, <b>Mishihase</b>, marked extinct and with a question mark, which is associated with an early population of northern Hokkaido and is not securely attested as Nivkh at all.`,
        `<b>What it might be related to has been argued for a century without settling.</b> Michael Fortescue has proposed that Nivkh and Chukotko-Kamchatkan form a larger family. Others have proposed links to Algonquian–Wakashan, on the far side of the Pacific. None of these is established, and <b>none is drawn here</b>. What can be said about it is what Nivkh is on its own terms: a language with a consonant system unusual for the region, no known relatives, and a written literature of recent date.`],
     t:[["17th–18th c.","Russian contact along the Amur and on Sakhalin"],
        ["1850s–1860s","The Amur annexed; Nikolayevsk becomes a Russian town"],
        ["1930s","A Cyrillic alphabet is devised for Nivkh"],
        ["2020 census","About 1,300 speakers, from an ethnic population of 4,652"]],
     kids:[
      { id:'amurnivkh', en:'Amur Nivkh', zh:'阿穆尔尼夫赫语', nat:'нивғгу диф',
        py:'Āmù’ěr Nífūhè yǔ', sp:'by source',
        region:'The lower Amur river and the coast around its liman, on the mainland opposite Sakhalin',
        cls:'c-niv',
        mk:[[53.13,140.73,'Nikolayevsk-on-Amur'],[52.60,140.20,'The Amur liman']],
        h:[`Amur Nivkh is the mainland variety, spoken along the lower Amur and the coast around its liman. It is the one usually meant when Nivkh is described as a single language, and the one with the longer written record.`,
           `<b>Its speakers are a small minority in their own towns.</b> Nikolayevsk-on-Amur, at the river's mouth, is where the largest concentration lives; Russians and other groups are the majority there and everywhere else along this coast.`,
           `<b>Fish, and the words for them.</b> The Nivkh economy on the Amur was built on salmon runs and on sea mammals, and the vocabulary reflects a life organised around a river that freezes. That vocabulary is one of the things the language's documentation has concentrated on preserving.`,
           `<b>It is not mutually intelligible with the Sakhalin varieties</b> in any comfortable sense — which is the main reason some sources call Amuric a family rather than an isolate.`],
        t:[["1850s","Nikolayevsk-on-Amur founded as a Russian post"],
           ["1930s","Cyrillic writing standardised on the Amur variety"],
           ["2020s","Textbooks produced in Sakhalin varieties as well"]],
        chips:[["the mainland variety, and the better documented one"]],
        kids:[] },
      { id:'sakhalinnivkh', en:'Sakhalin Nivkh', zh:'萨哈林尼夫赫语', nat:'ниғвӈ дуғс',
        py:'Sàhālín Nífūhè yǔ', sp:'by source; the eastern variety is the larger',
        region:'The northern half of Sakhalin island — the east coast above Nogliki, and the north around Okha',
        cls:'c-niv',
        mk:[[53.59,142.95,'Okha — the north'],[51.81,143.17,'Nogliki — the east coast'],[54.30,142.85,'Cape Elizabeth — the north tip']],
        h:[`The Sakhalin varieties are the island half of Nivkh, and they differ from the mainland variety enough that the two are not comfortably mutually intelligible. <b>East Sakhalin</b> is the larger and better recorded of them; a <b>North Sakhalin</b> variety is also distinguished.`,
           `<b>The island's own name for the language is in its east-coast form</b> at the top of this entry — a different word from the mainland's, which is the sort of thing that makes "one language or two" a real question rather than a bookkeeping one.`,
           `<b>Oil and gas changed the island under the speakers' feet.</b> Sakhalin's northern half became a major petroleum province from the late twentieth century, and the Nivkh communities around Okha and Nogliki sit inside that development area. Population movement into the island has made the speakers a smaller share of it than they were.`,
           `<b>Writing came late and unevenly.</b> The Cyrillic standard was built on the Amur variety, so Sakhalin Nivkh has had less written use; textbooks in the island dialects have been produced only in recent years, for schoolchildren learning a language their grandparents spoke.`],
        t:[["1850s–1870s","Russian settlement and penal colonies on Sakhalin"],
           ["1930s","A written standard is fixed on the mainland variety"],
           ["1990s–2000s","Oil and gas development reshapes northern Sakhalin"],
           ["2018","A textbook in a Sakhalin variety is published for young speakers"]],
        chips:[["not mutually intelligible with the mainland variety"],["oil and gas arrived under it"]],
        kids:[] },

     ] },

   { id:'yeniseian', en:'Yeniseian', zh:'叶尼塞语系', nat:'Остыганна ӄаʼ',
     py:'Yènísāi yǔxì', sp:'156 speakers, counted in 2020–21',
     region:'Today the middle Yenisei and its tributaries in Krasnoyarsk Krai; historically much of central Siberia and northern Mongolia',
     cls:'c-yen',
     mk:[[62.49,86.28,'Kellog — the last Ket village'],[65.80,87.97,'Turukhansk — the old centre']],
     h:[`Yeniseian is a real family that has almost entirely stopped being one. It was formerly spoken across large parts of central Siberia and northern Mongolia; today <b>one language survives, Ket</b>, along a stretch of the middle Yenisei.`,
        `<b>And it did not shrink in place — it moved.</b> The evidence for that is <b>hydronymic</b>: the river names of a much wider area are Yeniseian in form, and they suggest the family's speakers migrated <b>northward from the Sayan Mountains and northern Mongolia</b>, reaching the Yenisei where they were later recorded. The rivers kept the names after the languages changed.`,
        `<b>The speaker count is small enough that the sources disagree about it.</b> The family's own figure is <b>156</b>, described as the sum of Ket and Yugh speakers — but the entry carrying that number dates it to one census while its own footnote cites a different one, which is the kind of discrepancy this atlas reports rather than tidies away. A separate reference work says Ket has <b>"no more than 200 people"</b>. Every number here is in the low hundreds.`,
        `<b>Its own classification is marked as uncertain by the source it comes from.</b> Yeniseian is listed as one of the world's primary families, and in the same breath as possibly being half of a much larger one — <b>Dené–Yeniseian</b>, which would join it to the Na-Dene languages of north-western North America. That proposal is described on the Ket entry below, because it is Ket's story rather than the family's.`,
        `<b>Four branches are named and three of them are gone.</b> Besides Ket's own branch, the family had a Pumpokolic, an Arinic and a Kottic branch, all extinct. They are drawn together below rather than as separate stubs, because what is known about each of them is roughly the same: a name, a place, and a word list collected before it was too late.`],
     t:[["17th c.","Yeniseian languages recorded across a wide stretch of central Siberia"],
        ["18th–19th c.","The southern branches die out one by one"],
        ["1970s–1980s","Yugh loses its last speakers"],
        ["2021 census","Ket and Yugh together number 156"]],
     kids:[
      { id:'protoyen', en:'Proto-Yeniseian', zh:'原始叶尼塞语',
        py:'Yuánshǐ Yènísāi yǔ', sp:'reconstructed, not spoken',
        region:'Reconstructed; the family\'s own speakers place it near the Sayan Mountains',
        cls:'c-his',
        mk:[[52.00,92.50,'Reconstructed — near the Sayan Mountains']],
        h:[`Proto-Yeniseian is the ancestor of Ket and of the branches that died out, and its reconstruction rests on the fact that Ket was recorded thoroughly enough, and late enough, to anchor it.`,
           `<b>It had a tone system, or something like one</b> — and the origin of Ket's tones has been treated as a problem in its own right, because tone is rare in Siberia and had to come from somewhere. The usual answer for Yeniseian, as elsewhere in Asia, is lost consonants at the ends of syllables.`,
           `<b>Where it was spoken is argued from place names rather than from the reconstruction</b>: the concentration of Yeniseian-looking river names to the south suggests a homeland in the mountains, with the family spreading north down the rivers afterward.`],
        t:[["by reconstruction","The ancestor of Ket and the lost branches"]],
        kids:[] },
      { id:'ket', en:'Ket', zh:'凯特语', nat:'Остыганна ӄаʼ',
        py:'Kǎitè yǔ', sp:'under 30 speakers, 2024; no more than 200 by another account',
        region:'The Turukhansky District of Krasnoyarsk Krai — the middle Yenisei and its tributaries, above the Arctic Circle',
        cls:'c-yen',
        mk:[[62.49,86.28,'Kellog — the surviving village'],[65.80,87.97,'Turukhansk — the district centre']],
        h:[`Ket is the last Yeniseian language, and it is close to the end: <b>under 30 speakers</b> were counted in 2024, from an ethnic population of about <b>1,088</b>. A reference work puts it more loosely at "no more than 200 people". Either way the speakers are a small fraction of the people.`,
           `<b>It is tonal, which in Siberia is close to unique.</b> Tone is common in East and Southeast Asia and rare across the whole of northern Asia, so Ket's tones need an explanation, and the usual one is the same as for Vietnamese: <b>lost consonants at the ends of syllables left pitch distinctions behind</b>. This makes Ket and Vietnamese two independent answers to the same question, arrived at on opposite sides of the continent.`,
           `<b>And its most famous claim is that it is related to languages in North America.</b> The <b>Dené–Yeniseian</b> hypothesis proposes that Yeniseian and the Na-Dene languages — Tlingit, Eyak and the Athabaskan languages, from Alaska down to the American Southwest — descend from a common ancestor. <b>Edward Vajda</b> developed the case between 2006 and 2010, resting it on systematic parallels between Proto-Na-Dene and Yeniseian: correspondences in consonants, in vowels, <b>in tones</b>, and a shared verb structure. It was put to a public symposium in Fairbanks and Anchorage in <b>February 2008</b>, was favorably received by a number of specialists, and was published in full as <i>The Dene-Yeniseian Connection</i> — eighteen papers, with Vajda's own contribution running to sixty-seven pages.`,
           `<b>This atlas draws none of that.</b> The hypothesis is named, dated and attributed because it is the most interesting thing about Ket; it is not drawn as a branch, because that would put half of the family in Alaska and outside every map in this series. Whether it is correct is not settled, and the sources that carry it mark the possibility with their own question mark rather than a claim.`,
           `<b>The Ket are forest hunters, not herders.</b> That is part of why the comparison was taken seriously: most languages of northern Asia arrived with pastoralists in the last few thousand years, and Ket's speakers do not fit that pattern — which is what makes an old relationship across the Bering Strait conceivable in the first place.`,
           `<b>Its own name for itself means "the people"</b>, and it is written in a Cyrillic alphabet devised for the language in the 1930s.`],
        t:[["17th c.","Ket recorded along the middle Yenisei"],
           ["1930s","A Cyrillic alphabet is devised for Ket"],
           ["1970s–1980s","The related language Yugh dies out, leaving Ket alone"],
           ["2008","The Dené–Yeniseian hypothesis is examined at a Fairbanks symposium"],
           ["2010","The Dene-Yeniseian Connection is published"],
           ["2024","Under 30 speakers recorded"]],
        chips:[["tonal — and Siberia has almost no tonal languages"],["the pivot of the Dené–Yeniseian proposal","warn"],["under 30 speakers"]],
        kids:[] },

      { id:'yugh', en:'Yugh', zh:'尤格语', sp:'extinct — last speakers in the 1970s–80s',
        region:'The middle Yenisei, alongside Ket and often in the same villages',
        cls:'c-yen',
        mk:[[63.50,87.20,'The Yenisei, alongside Ket']],
        h:[`Yugh was Ket's closest relative, and for a long time it was not counted as a separate language at all — the two lived side by side along the same stretch of the Yenisei, and Yugh was often described as a Ket dialect. Later work established that they were distinct languages with distinct histories, by which point there were very few Yugh speakers left.`,
           `<b>It went in living memory.</b> The last fluent speakers were recorded into the 1970s and 1980s, in villages shared with Ket speakers. Because the two communities were so intermingled, and because Ket itself was already shrinking, the final stage of Yugh is difficult to separate from the contraction of Ket around it.`,
           `<b>Its disappearance is why Ket stands alone in this atlas.</b> With Yugh gone, the northern branch of Yeniseian has one member left; with it present, Ket would have had a sibling.`],
        t:[["18th–19th c.","Recorded as a distinct variety along the middle Yenisei"],
           ["20th c.","Increasingly treated as a Ket dialect"],
           ["1970s–1980s","The last fluent speakers recorded"]],
        chips:[["Ket's closest relative, gone within living memory"]],
        kids:[] },
      { id:'lostyeniseian', en:'The lost Yeniseians', zh:'已消亡的叶尼塞语',
        sp:'four languages, all extinct', region:'The southern Yenisei and the country toward the Sayan Mountains',
        cls:'c-yen',
        mk:[[58.00,92.50,'Kott country — south along the Yenisei'],[54.90,91.30,'Arin and Assan — further south']],
        h:[`Four Yeniseian languages are known from word lists and nothing else, collected in the eighteenth and nineteenth centuries by expeditions working through Siberia. They are grouped here rather than drawn one by one, because the shape of what survives about each is the same: <b>a name, a place, and a vocabulary recorded before the last speakers died</b>.`,
           `<b>Kott</b> was the best documented of them, spoken south along the Yenisei, and enough of it survives to be used in reconstruction. <b>Assan</b> was closely related to Kott and is sometimes treated as its dialect. <b>Arin</b> was spoken further up the river near Krasnoyarsk. <b>Pumpokol</b> was the northernmost and, on the reconstruction, the most divergent of the four.`,
           `<b>Their recorded dates are a reminder of how fast this happened.</b> When the first systematic word lists were collected these languages still had speakers; within two or three generations they did not. What is left of them is in the notebooks of travellers, which is why the reconstruction of Yeniseian leans so heavily on Ket — the one branch that was documented in time.`],
        t:[["18th c.","Kott, Assan, Arin and Pumpokol recorded by expeditions"],
           ["19th c.","The last speakers die; the languages survive only in word lists"],
           ["20th–21st c.","Used, with Ket, to reconstruct the family"]],
        chips:[["known from word lists alone","scr"],["four languages, one record each"]],
        kids:[] },

     ] },

   { id:'yukaghir', en:'Yukaghir', zh:'尤卡吉尔语系', nat:'Вадул аруу',
     py:'Yóukǎjí’ěr yǔxì', sp:'516 speakers, mostly Tundra, 2020 census',
     region:'The lower Kolyma and Indigirka valleys in north-east Yakutia and Magadan Oblast',
     cls:'c-yuk',
     mk:[[69.18,154.47,'Andryushkino — Tundra Yukaghir'],[65.50,151.10,'Nelemnoye — Forest Yukaghir'],[68.77,161.33,'Chersky — the lower Kolyma']],
     h:[`Yukaghir is two languages that cannot understand each other, spoken in the river valleys of the far north-east. <b>516 people</b> speak them between them, and the two are as far apart as any pair of related languages in this atlas.`,
        `<b>The two are Tundra and Forest</b> — also called Northern and Southern, or Southern and Kolyma. Tundra Yukaghir is spoken on the tundra west of the Kolyma; Forest Yukaghir in the river valleys to the south, on the Indigirka and around the Kolyma's tributaries. They are described as <b>mutually unintelligible</b>, which is what makes Yukaghir a family rather than one language with dialects.`,
        `<b>They once covered far more ground.</b> Yukaghir's speakers extended across a much wider area of north-eastern Siberia before the Tungusic and Turkic expansions — the same pressure that shrank every other group in this atlas. What is left is two communities in an enormous empty country, and a people that includes groups whose own languages are gone: <b>Chuvans</b> and <b>Anauls</b> are counted among the Yukaghir, but speak other languages now.`,
        `<b>UNESCO grades both surviving languages Critically Endangered</b> — the most severe grade below extinction, and one step worse than Ket.`,
        `<b>And Yukaghir has a proposed family of its own.</b> A relationship with the <b>Uralic</b> languages — Finnish, Estonian, Hungarian and their relatives on the far side of Siberia — has been argued since similarities were first noticed in <b>1907</b>, and was first argued in detail in <b>1940</b>, independently by two scholars. It is not accepted. One line of criticism accounts for the correspondences as <b>contact rather than inheritance</b>, and a later critic has rejected the hypothesis outright, while it has been argued for again as recently as 2024. <b>The proposal is stated here and left where the sources leave it: unresolved.</b>`,
        `<b>The Yukaghir are also the branch here with no listening links to offer.</b> Unlike every other group in this atlas, none of its languages has a page on the reference site used for pronunciation and script samples — so this branch, alone here, has no external link but the search fallback.`],
     t:[["17th c.","Yukaghir spread across a wide area of the north-east"],
        ["18th–19th c.","Chuvan and Omok die out; the Tungusic and Turkic expansions continue"],
        ["1907","Similarities with Uralic first noticed"],
        ["1940","The Uralic–Yukaghir relationship is argued in detail, independently, by two scholars"],
        ["2020 census","516 speakers, mostly of Tundra Yukaghir"]],
     kids:[
      { id:'tundrayukaghir', en:'Tundra Yukaghir', zh:'冻原尤卡吉尔语', nat:'Вадул аруу',
        py:'Dòngyuán Yóukǎjí’ěr yǔ', sp:'75 in 1993; the larger of the two today',
        region:'The tundra west of the lower Kolyma, in northern Yakutia',
        cls:'c-yuk',
        mk:[[69.18,154.47,'Andryushkino — the main village'],[68.77,161.33,'Chersky — on the Kolyma']],
        h:[`Tundra Yukaghir, also called Northern Yukaghir, is the larger of the two surviving languages and the one with a written standard. Its own name for itself means roughly "the mighty word".`,
           `<b>Its speakers live on the tundra</b>, in a handful of villages west of the lower Kolyma, in country that is snowbound for most of the year. Herding and hunting reindeer, fishing and trapping have been the economy; the Soviet period brought collective farms and village settlement, which concentrated speakers into fewer places.`,
           `<b>Writing dates from the Soviet period</b>, in Cyrillic, and there is a small literature — including school material. The figure of 75 speakers comes from a 1993 count; the census figure for the branch as a whole in 2020 was 516, described as mostly Tundra Yukaghir, so the two numbers are not measuring the same thing and both are reported here.`,
           `<b>UNESCO grades it Critically Endangered.</b>`],
        t:[["1930s–1950s","Collectivisation and village settlement concentrate the speakers"],
           ["1930s","A Cyrillic alphabet is devised for Tundra Yukaghir"],
           ["1993","75 speakers recorded in the field"],
           ["2020 census","The larger share of 516 across both languages"]],
        chips:[["the larger survivor, and the one with a written standard"],["Critically Endangered — UNESCO"]],
        kids:[] },
      { id:'forestyukaghir', en:'Forest Yukaghir', zh:'森林尤卡吉尔语', nat:'Одун ажуу',
        py:'Sēnlín Yóukǎjí’ěr yǔ', sp:'50 in 2003; the smaller of the two',
        region:'The upper Kolyma and Indigirka valleys — Nelemnoye, Zyryanka and the surrounding river country',
        cls:'c-yuk',
        mk:[[65.50,151.10,'Nelemnoye — the main village'],[65.75,150.90,'Zyryanka — on the Indigirka']],
        h:[`Forest Yukaghir — also called Southern or Kolyma Yukaghir — is the smaller and more endangered of the two, with <b>50 speakers</b> recorded in 2003. Its own name for itself is at the top of this entry.`,
           `<b>It is the better described of the two languages.</b> A full reference grammar of Kolyma Yukaghir was published in 2003, which makes this one of the very few languages in this atlas with a modern descriptive grammar written from fieldwork. Its speakers are concentrated in two villages in the river valleys, where hunting, fishing and reindeer herding continued longer than elsewhere.`,
           `<b>Forest and Tundra Yukaghir are not close.</b> They differ in vocabulary, in structure and in the sounds they use, enough that a speaker of one cannot follow the other — which is why this atlas draws them as two entries under one branch rather than as a single language with two dialects.`,
           `<b>UNESCO grades it Critically Endangered.</b>`],
        t:[["1930s–1950s","Village settlement along the upper Kolyma and Indigirka"],
           ["2003","50 speakers recorded, alongside a published reference grammar"],
           ["21st c.","Both surviving Yukaghir languages remain Critically Endangered"]],
        chips:[["one of the few languages here with a modern grammar written from fieldwork"],["Critically Endangered — UNESCO"]],
        kids:[] },
      { id:'omokchuvan', en:'Omok and Chuvan', zh:'奥莫克语与楚万语',
        sp:'both extinct — dates not established', region:'The country between the Kolyma and the Anadyr, and inland toward the upper reaches',
        cls:'c-yuk',
        mk:[[68.00,168.00,'Chuvan country — toward the Anadyr'],[67.50,157.00,'Omok country — near the Kolyma']],
        h:[`Two more Yukaghir languages are recorded and gone, and they are drawn together here for the same reason the lost Yeniseian branches are: what survives about each is a name, a place and a short record.`,
           `<b>Omok</b> was spoken between the Kolyma and the Indigirka. <b>Chuvan</b> was spoken further east and inland, toward the Anadyr country — and its speakers are the reason the name Chuvan still exists at all: they shifted to Yukaghir, Chukchi and Russian over the nineteenth century, and are counted today among the Yukaghir while no longer speaking a language of their own.`,
           `<b>Their disappearance dates are not established.</b> The sources give no single year for either, and this atlas does not invent one. What can be said is that both were gone by the end of the nineteenth century, and that their passing is part of the same contraction that has left Yukaghir with two small communities in a very large country.`],
        t:[["18th c.","Omok and Chuvan recorded with speakers"],
           ["19th c.","Both disappear; the Chuvans shift to other languages"]],
        chips:[["extinct, with no settled date","scr"]],
        kids:[] },

     ] },

  ]
};


/* ---------- ISO 639-3 codes, read from the raw wikitext of each language's page.
   None of the four GROUPINGS has a code of its own, and this atlas shows a dash
   rather than borrowing one from a member language. Note Kott is `zko`, not the
   `ktt` one would guess — which is why these were fetched rather than recalled. */
const ISO = {
  siberian:            '— (a grouping, not a family)',
  chukotkokamchatkan:  '— (family; no code of its own)',
  protochk:            '— (reconstructed)',
  chukotkan:           '— (branch)',
  chukchi:'ckt', koryak:'kpy', alutor:'alr', kerek:'krk (extinct)', itelmen:'itl',
  nivkh:'niv', amurnivkh:'niv (Amur variety)', sakhalinnivkh:'niv (Sakhalin varieties)',
  yeniseian:           '— (family; no code of its own)',
  protoyen:            '— (reconstructed)',
  ket:'ket', yugh:'yug (extinct)',
  lostyeniseian:       'kott zko · arin xrn · pumpokol xpm (all extinct)',
  yukaghir:            '— (family; no code of its own)',
  tundrayukaghir:'ykg (Northern Yukaghir)', forestyukaghir:'yux (Southern Yukaghir)',
  omokchuvan:          'omok omk · chuvan xcv (both extinct)'
};

/* ---------- what is distinctive about each group, shown as bullets on the entry */
const FEATURES = {
 siberian:[
  `<b>Not a family.</b> Four unrelated groups that happen to share a neighbourhood and a history of being there before everyone else.`,
  `<b>About 6,300 speakers in total</b> across all four — roughly the population of a small town.`,
  `<b>Six languages here are extinct</b>, and one died as recently as 2005.`,
  `<b>Two neighbours are named but not drawn:</b> Ainu, which is covered in full on the Japonic atlas, and Eskaleut, which runs across the Bering Strait.`],
 chukotkokamchatkan:[
  `<b>A genuine family</b> — the only one of the four groups here whose internal shape is not in dispute.`,
  `<b>Two halves:</b> four Chukotkan languages on the mainland, and Itelmen alone on Kamchatka.`,
  `<b>Polysynthetic and ergative</b>, with vowel harmony running through the word.`,
  `<b>Sometimes called Luoravetlan</b>, from a Chukchi self-designation.`,
  `<b>A larger family has been proposed</b> joining it to Nivkh; the proposal is named here and not drawn.`],
 protochk:[
  `<b>A reconstruction, not a record.</b> Projected from the regular sound correspondences between the five surviving and extinct languages.`,
  `<b>It had vowel harmony</b>, a constraint that all the vowels in a word agree with one another.`,
  `<b>Where it was spoken is not agreed</b>, and the reconstruction alone cannot settle it.`],
 chukotkan:[
  `<b>Four languages, one of them gone.</b> Chukchi, Koryak, Alutor and the extinct Kerek.`,
  `<b>Close enough to shade into one another</b> — the boundaries between Koryak, Alutor and Kerek have been drawn differently at different times.`,
  `<b>Named for livelihoods as much as places:</b> reindeer herders inland, sea-mammal hunters on the coast.`],
 chukchi:[
  `<b>2,607 speakers — about one Chukchi in six.</b> The largest language in this atlas.`,
  `<b>A script invented by a reindeer herder.</b> Tenevil made his own writing system in the 1920s; it never left his camp.`,
  `<b>Written three ways:</b> Tenevil's signs, then Latin in the early Soviet period, then Cyrillic from the 1930s.`,
  `<b>Polysynthetic and ergative</b>, and a standard example of both in the literature.`,
  `<b>Definitely Endangered</b>, by UNESCO's grading — still taught in some schools.`],
 koryak:[
  `<b>1,665 speakers — about one Koryak in five</b>, a slightly higher share than Chukchi's from a smaller base.`,
  `<b>Five named varieties</b>, split between reindeer herders and coastal hunters.`,
  `<b>Its administrative district was merged away in 2007</b>, which reduced the institutional support the language had.`,
  `<b>Definitely Endangered</b>, by UNESCO's grading.`],
 alutor:[
  `<b>172 speakers</b>, counted in 2021 — the smallest surviving Chukotkan language.`,
  `<b>One of its own recorded varieties is already extinct:</b> Karagin Koryak, marked lost with a question mark because the records are not complete enough to date its end.`,
  `<b>Severely Endangered</b>, by UNESCO's grading — one step worse than Chukchi and Koryak.`],
 kerek:[
  `<b>Extinct.</b> Its last speaker, Ekaterina Khatkana, died in 2005.`,
  `<b>Whether it was ever a separate language is disputed</b> — it has been treated as a Koryak dialect, as an independent language, and as something in between.`,
  `<b>Spoken around Cape Navarin</b>, at 179.1°E — the easternmost place drawn in this atlas, and less than a degree from the 180th meridian.`],
 itelmen:[
  `<b>Alone on its side of the family</b>, and therefore the most divergent member of Chukotko-Kamchatkan.`,
  `<b>Its speaker count is genuinely disputed.</b> The 2020 census records 808 people claiming it; a standard reference work says fewer than five speak it. Both numbers are reported here, and they are measuring different things.`,
  `<b>Centred on one village</b>, Kovran, on Kamchatka's west coast.`,
  `<b>Severely Endangered</b>, with a revival effort recorded from the early twenty-first century.`],
 nivkh:[
  `<b>An isolate, or a two-language family</b> — the recent literature calls these the Amuric languages and treats them as a family; older sources call the language Gilyak and call it an isolate.`,
  `<b>About 1,300 speakers</b>, from an ethnic population of 4,652 — roughly a quarter.`,
  `<b>A coastline rather than a territory:</b> the lower Amur and its liman, plus the northern half of Sakhalin.`,
  `<b>Four named varieties</b>, plus a fifth — Mishihase — marked extinct and carrying a question mark, since it is not securely attested as Nivkh at all.`,
  `<b>Relationships have been proposed to Chukotko-Kamchatkan and, further afield, to Algonquian–Wakashan.</b> None is established and none is drawn.`],
 amurnivkh:[
  `<b>The mainland variety</b>, along the lower Amur and around its liman.`,
  `<b>The better documented of the two</b>, and the one the Cyrillic written standard was built on.`,
  `<b>Not comfortably intelligible with the Sakhalin varieties</b> — which is the main reason some sources call this a family rather than an isolate.`],
 sakhalinnivkh:[
  `<b>The island half</b>, on the northern part of Sakhalin — East and North Sakhalin varieties.`,
  `<b>Its own name for the language differs from the mainland's</b>, which is part of why "one language or two" is a real question.`,
  `<b>Oil and gas development arrived under it</b>, bringing population into the island and making the speakers a smaller share of it.`,
  `<b>Textbooks in the island varieties are recent</b>, written for children whose grandparents were the last fluent speakers.`],
 yeniseian:[
  `<b>A family with one survivor.</b> Ket is all that is left of a group formerly spoken across much of central Siberia and northern Mongolia.`,
  `<b>It did not shrink in place — it moved.</b> River names suggest the family spread northward from the Sayan Mountains.`,
  `<b>The sources disagree about the speaker count</b>, and every number is in the low hundreds.`,
  `<b>Three of its four branches are extinct</b>, known from word lists alone.`,
  `<b>Its own classification carries a question mark</b> in the source: one of the world's primary families, or half of Dené–Yeniseian.`],
 protoyen:[
  `<b>A reconstruction anchored on Ket</b> — the one branch documented thoroughly enough and late enough to build on.`,
  `<b>It had tone, or something like it</b>, which is rare in Siberia and needs explaining.`,
  `<b>Its homeland is argued from place names</b>, not from the reconstruction: the rivers point south, to the mountains.`],
 ket:[
  `<b>Under 30 speakers</b>, from an ethnic population of about 1,088. Another account says no more than 200 — every figure is in the low hundreds.`,
  `<b>Tonal, which is close to unique in Siberia</b> — and the tones came from lost consonants at the ends of syllables, exactly as Vietnamese tones did on the other side of Asia.`,
  `<b>The pivot of the Dené–Yeniseian proposal</b>, which would link it to Tlingit, Eyak and the Athabaskan languages of North America. Named here, not drawn.`,
  `<b>Its speakers are forest hunters</b>, which is part of why an ancient connection was considered plausible at all.`,
  `<b>Kellog is the surviving village.</b>`],
 yugh:[
  `<b>Extinct</b>, with its last fluent speakers recorded in the 1970s and 1980s.`,
  `<b>Ket's closest relative</b>, and long treated as a dialect of it rather than a language.`,
  `<b>Its loss is why Ket stands alone</b> — with Yugh present, Ket would have had a sibling.`],
 lostyeniseian:[
  `<b>Four languages known from word lists alone:</b> Kott, Assan, Arin and Pumpokol.`,
  `<b>Kott was the best documented</b>, well enough to be used in reconstructing the family.`,
  `<b>Their disappearance was fast:</b> recorded with speakers in the eighteenth century, gone within two or three generations.`],
 yukaghir:[
  `<b>Two languages that cannot understand each other</b>, which is what makes this a family rather than one language.`,
  `<b>516 speakers between them</b>, and the two are as far apart as any related pair in this atlas.`,
  `<b>They once covered much more ground</b>, before the Tungusic and Turkic expansions.`,
  `<b>Critically Endangered, both of them</b> — the most severe grade below extinction.`,
  `<b>A relationship with Uralic has been argued since 1907 and is not accepted</b>; critics read the correspondences as contact rather than inheritance.`,
  `<b>No listening links at all</b> — no Yukaghir language has a page on the reference site used here, under any spelling tried.`],
 tundrayukaghir:[
  `<b>The larger survivor</b>, and the one with a written standard.`,
  `<b>75 speakers in a 1993 count</b>, against 516 across both languages in the 2020 census — different measures, both reported.`,
  `<b>Spoken on the tundra west of the lower Kolyma</b>, in villages snowbound for much of the year.`,
  `<b>Critically Endangered</b>, by UNESCO's grading.`],
 forestyukaghir:[
  `<b>The smaller survivor:</b> 50 speakers recorded in 2003.`,
  `<b>The better described of the two</b>, with a reference grammar published from fieldwork in 2003.`,
  `<b>Spoken in the upper Kolyma and Indigirka valleys</b>, concentrated in two villages.`,
  `<b>Critically Endangered</b>, by UNESCO's grading.`],
 omokchuvan:[
  `<b>Both extinct</b>, and neither with a settled date of disappearance.`,
  `<b>Omok was spoken between the Kolyma and the Indigirka; Chuvan further east</b>, toward the Anadyr country.`,
  `<b>The Chuvans are still counted among the Yukaghir</b>, though they no longer speak a language of their own.`],
};

/* ---------- listen links: an Omniglot page where one exists, plus the engine's
   YouTube-search fallback on every node. Coverage here is the THINNEST of any
   atlas in this series, and it was MEASURED rather than assumed — see
   research.md [SI-110], which records the two traps:
     · `alutor` is 404 but `alyutor` is 200 — the page exists under the other
       spelling of the name, and the node itself is called Alutor;
     · `nivkh_language` is 404 but `nivkh` is 200, the inverse of the
       Nicobarese trap at [AU-110];
     · and NO Yukaghir page exists under any spelling tried (yukaghir,
       tundra_yukaghir, southern_yukaghir, kolyma_yukaghir), so that whole
       branch ships empty.
   Eight URLs were confirmed live: nivkh, chukchi, koryak, alyutor, itelmen,
   ket, langfam and ainu. ---------- */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 siberian:      [['Language families — Omniglot', OM+'langfam.htm']],
 chukotkokamchatkan:[], protochk:[], chukotkan:[],
 chukchi:       [['Chukchi — Omniglot', OM+'chukchi.htm']],
 koryak:        [['Koryak — Omniglot', OM+'koryak.htm']],
 alutor:        [['Alyutor — Omniglot', OM+'alyutor.htm']],
 kerek:         [],
 itelmen:       [['Itelmen — Omniglot', OM+'itelmen.htm']],
 nivkh:         [['Nivkh — Omniglot', OM+'nivkh.htm']],
 amurnivkh:     [['Nivkh — Omniglot', OM+'nivkh.htm']],
 sakhalinnivkh: [['Nivkh — Omniglot', OM+'nivkh.htm']],
 yeniseian:     [], protoyen:[],
 ket:           [['Ket — Omniglot', OM+'ket.htm']],
 yugh:          [], lostyeniseian:[],
 yukaghir:[], tundrayukaghir:[], forestyukaghir:[], omokchuvan:[]
};


/* ---------- approximate core areas (coarse, hand-drawn blocks; [lng,lat] rings)
   One block per palette class. These are NOT surveyed boundaries — see the
   areas caption. `c-his` carries two small rings, one per reconstructed
   ancestor, because a proto-language has no single territory. */
const AREAS = {
 'c-anc':[[[82.0,49.0],[100.0,47.5],[125.0,46.5],[150.0,48.0],[172.0,50.5],[180.0,53.0],
           [180.0,72.5],[160.0,74.0],[135.0,75.5],[110.0,77.0],[88.0,73.0],[82.0,66.0]]],
 'c-his':[[[170.0,63.5],[178.0,64.0],[177.5,67.0],[170.5,66.5]],
          [[88.0,52.0],[95.0,51.5],[96.0,54.5],[89.5,55.0]]],
 'c-ckk':[[[155.5,58.5],[160.0,57.8],[166.0,59.0],[172.0,60.5],[179.5,61.8],[180.0,64.5],
           [179.0,69.8],[168.0,70.4],[158.5,68.6],[156.5,65.0]]],
 'c-itl':[[[155.0,57.6],[158.5,57.2],[161.0,55.5],[162.2,53.5],[160.0,51.6],[157.0,51.3],
           [155.2,53.0],[154.6,55.0],[154.9,56.8]]],
 'c-niv':[[[139.0,52.2],[141.3,51.8],[141.6,53.4],[140.4,54.6],[138.9,53.8]],
          [[141.8,50.6],[143.6,50.4],[144.2,52.2],[144.0,54.4],[142.4,55.0],[141.9,53.6]]],
 'c-yen':[[[84.0,58.5],[89.5,58.0],[91.0,62.0],[90.0,67.0],[86.5,68.2],[83.0,66.0],[82.5,62.0]]],
 'c-yuk':[[[145.0,63.0],[152.0,62.5],[158.0,64.5],[163.5,66.5],[162.0,70.5],[156.0,71.5],
           [149.0,70.5],[146.0,67.5]]]
};


/* ---------- schematic outline (simplified, embedded; [lng,lat] rings) ----------
   Drawn by hand here: the Siberian and north-east Asian landmass, the Kamchatka
   peninsula, and Sakhalin island. Not a coastline survey — see the sketch caption.

   Two constraints shaped these rings:
   1. Every marker has to fall on land, not in open water.
   2. The rings stop at 180°E. Chukotka continues past the antimeridian — Lorino
      is at −171.7, Provideniya at −173.3, Uelen at −169.8 — and this map does not
      wrap, so a marker there would be drawn next to Alaska. Cape Navarin, at
      179.10°E, is deliberately the easternmost point drawn. See research.md [SI-112]. */
const MAINLAND_SIB = [[84.0,67.5],[92.0,72.5],[103.0,75.8],[113.0,74.2],[125.0,72.6],
 [137.0,71.8],[148.0,70.9],[158.0,70.3],[168.0,70.6],[176.5,69.6],[179.8,68.0],[179.9,64.6],
 [179.6,62.0],[176.0,61.0],[170.5,60.6],[166.5,61.8],[160.0,62.2],[155.0,60.6],[149.5,59.8],
 [144.0,58.6],[140.5,56.6],[139.9,55.4],[140.8,54.2],[141.6,53.4],[141.5,52.3],[140.0,51.6],
 [137.5,51.2],[134.0,50.8],[127.0,50.5],[118.0,49.5],[108.0,50.0],[98.0,50.0],[90.0,50.5],
 [86.0,51.0],[84.0,54.0],[84.0,61.0]];
/* Kamchatka is drawn as one peninsula ring; its base overlaps the mainland ring,
   which is correct — they are contiguous land. */
const KAMCHATKA = [[158.5,62.8],[166.0,61.5],[168.0,60.0],[165.5,58.3],[163.8,56.3],
 [162.0,54.5],[160.2,52.8],[157.9,51.2],[156.0,52.4],[154.9,54.3],[155.2,56.0],
 [156.3,57.6],[158.6,59.3]];
const SAKHALIN = [[142.6,55.0],[144.2,53.5],[145.0,51.5],[144.3,49.4],[143.3,47.8],
 [142.6,46.4],[142.1,45.8],[141.6,46.8],[141.7,48.6],[141.7,50.6],[141.6,52.6]];
const SIB_GEO = { type:'FeatureCollection', features:[MAINLAND_SIB,KAMCHATKA,SAKHALIN].map((r)=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };


window.ATLASES = window.ATLASES || {};
window.ATLASES.siberian = {
  key: 'siberian',
  title:   { zh: '西伯利亚孤立语', en: 'Siberian isolates' },
  tagline: 'Four unrelated families at the top of the world — where a reindeer herder invented his own script, one language is tonal in a continent that has almost no tone, and the last speaker of another died in 2005',
  stats:   [['21', 'languages and groups'], ['4', 'unrelated families, drawn'], ['6,300', 'speakers in all']],
  palette: {
    anc: '#b9c4d0', his: '#7f8fa6', ckk: '#c8553d', itl: '#e08a4a',
    niv: '#3f8fa8', yen: '#8a5fb0', yuk: '#4fa86a'
  },
  legend:  [['anc','The pocket — four unrelated groups, one neighbourhood'],
            ['his','Reconstructed ancestor · not spoken'],
            ['ckk','Chukotko-Kamchatkan — Chukchi, Koryak, Alutor, Kerek'],
            ['itl','Itelmen — alone on the Kamchatka peninsula'],
            ['niv','Nivkh — the Amur mouth and northern Sakhalin'],
            ['yen','Yeniseian — Ket, the last of its family'],
            ['yuk','Yukaghir — the Kolyma and Indigirka valleys']],
  view:    { center: [133, 61], zoom: 3.0 },
  outline: { color: '#8fa3b8', fill: 'rgba(143,163,184,0.05)' },
  sketchGeo: SIB_GEO,
  captions: {
    note:   '● Markers show <b>representative localities</b> where the selected variety is rooted. This is the widest and thinnest grouping in the series: four unrelated families spread across eleven million square kilometres, from the Yenisei to the Bering Strait. <b>One limit is worth stating plainly</b> — Chukotka continues east across the 180th meridian, and this map does not wrap around it, so Cape Navarin at 179.1°E is as far east as anything here is drawn. The Chukchi settlements beyond that line, including Uelen and Provideniya, are real and are simply off the edge. <b>Nothing in this grouping is anybody\'s majority language</b>, and most of the markers sit in places where Russian is now the everyday speech.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — coarse hand-drawn blocks showing roughly where each family sits. Four need warning. The <b>pocket</b> block is a frame rather than a territory: it covers ground that is overwhelmingly Russian-speaking, and marks the region these four families are scattered across rather than any one of their homelands. The <b>Chukotko-Kamchatkan</b> and <b>Itelmen</b> blocks overlap along the Kamchatka peninsula, because the two are interleaved there. The <b>Nivkh</b> block is in two pieces, one on the mainland and one across the water on Sakhalin, because Nivkh is a coastal language with no continuous territory. And the two small pale rings are <b>reconstructed ancestors</b>, which have no single location — they sit near the country their descendants are argued to have come from. The marker layer is the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn Siberian and north-east Asian landmass, the Kamchatka peninsula, and Sakhalin island; simplified from memory of the geography, with the markers at true coordinates. It is deliberately coarse: this is a map for seeing where four unrelated families sit relative to one another, not for finding a village. The land rings stop at 180°E, and the markers are all placed inside them so that nothing floats in open water. Works fully offline.'
  },
  fonts: ['Noto Serif', 'Noto Serif SC'],
  filterPlaceholder: 'e.g. Ket, Chukchi, Nivkh, Koryak, Itelmen, Yukaghir, Alutor…',
  listen: {
    om: 'https://www.omniglot.com/writing/langfam.htm',
    fv: 'https://forvo.com/languages/',
    search: 'Siberian language native speaker'
  },
  rootId: 'siberian',
  stages: ['protochk', 'protoyen'],
  kinds: { root: 'The grouping', stage: 'Reconstructed ancestor', branch: 'Family or group', leaf: 'A language' },
  sources: 'Sources: the standard descriptive grammars of each family, and the comparative work behind them · M. Fortescue, <i>Language Relations Across The Bering Strait</i> (1998), and “The Relationship of Nivkh to Chukotko-Kamchatkan Revisited”, <i>Lingua</i> 121 (2011), for the proposed Chukotko-Kamchatkan–Amuric family · E. Gruzdeva (1998) on Nivkh, and her 2026 Brill study of reported speech in the Amuric languages, which is where the newer name for the group comes from · E. Vajda, <i>Ket Prosodic Phonology</i> (2000) and “The Origin of Phonemic Tone in Yeniseic” (2002), for Ket’s tones · the same author’s 2006–2010 work on Dené–Yeniseian, published with the symposium papers as <i>The Dene-Yeniseian Connection</i>, ed. J. Kari and B. Potter (Alaska Native Language Center, 2010), and summarised by the Center’s own research pages · J. Diamond, “Deep relationships between languages”, <i>Nature</i> 476 (2011), for the reception of that proposal · E. Maslova, <i>A Grammar of Kolyma Yukaghir</i> (2003), and I. Nikolaeva’s work on the Yukaghir languages · K. Rédei (1990) for reading the Uralic–Yukaghir correspondences as contact rather than inheritance, with A. Aikio (2014) against the hypothesis and Blažek & Piispanen (2024) for it; the earliest notices are Paasonen (1907) and Lewy (1928), and the first detailed arguments Bouda and Collinder (1940) · B. Comrie, <i>The Languages of the Soviet Union</i> (1981), for the family descriptions · the UNESCO <i>Atlas of the World’s Languages in Danger</i> for every endangerment grade here, and for Kerek’s extinction · the Russian censuses of 2010 and 2020–21 for speaker figures, quoted with their own years because they are not comparable with one another · Ethnologue and Glottolog for ISO 639-3 codes. Seven things here are deliberately left unresolved. <b>Itelmen’s speaker count is reported as contested</b>, not claimed: one source gives 808 from the 2020 census, another says fewer than five people speak it, and both numbers are printed. <b>The Yeniseian family figure is dated inconsistently in the source it comes from</b> — one census in the date, a different one in the footnote — and that is said rather than smoothed. <b>Whether Kerek was a language or a dialect of Koryak is not settled</b>, and the entry says so. <b>Mishihase carries a question mark in its own source</b>, which is why it is named in the Nivkh prose and not drawn as a variety. <b>Karagin Koryak is marked extinct with a question mark</b>, because the records are not complete enough to date its end. <b>The extinction dates of Omok and Chuvan are not established</b>, and no date is invented for them. And <b>Chukotka continues east past the edge of this map</b>: the land rings stop at 180°E because the map does not wrap, so the Chukchi settlements beyond that line are named in the caption rather than drawn.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();

