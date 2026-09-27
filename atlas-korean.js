/* atlas-korean.js — Koreanic 朝鲜语族
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (see languages.md §1.3 for the contract,
 * §2.6 for this family's brief, and research.md §"Koreanic (Phase 7)" for the
 * evidence log — every load-bearing date and figure below is logged there as
 * KO-101 … KO-109).
 *
 * Two things this atlas is careful about:
 *  1. Koreanic has two living members, not one. Jeju is mutually unintelligible
 *     with mainland Korean and UNESCO graded it critically endangered in 2010 —
 *     but South Korean official usage calls it 제주 방언, a dialect, and the atlas
 *     says both things rather than picking a side.
 *  2. The peninsula's pre-Hangul writing (idu 吏讀, hyangchal 鄕札, gugyeol 口訣)
 *     was not a script for Korean so much as a set of devices for writing Korean
 *     *with Chinese characters*. Hangul is the only writing system this family
 *     has ever had of its own.
 *
 * Speaker figures for the diaspora varieties are the weakest numbers here, and
 * the prose says so: the Koryo-mar count is a 1989 figure that the source itself
 * flags as needing a citation.
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree =====================
   The three historical stages are siblings of the living branch rather than a
   chain, which is how the family's own handbooks present them (Old Korean and
   Middle Korean are periodisations of one lineage, not side branches). */
const DATA = {
 id:"korean", en:"Koreanic", zh:"朝鲜语族", nat:"한국어족", py:"Cháoxiǎn yǔzú", sp:"≈81 million",
 region:"The Korean peninsula, the Yanbian prefecture of Northeast China, and diaspora communities in Japan, Sakhalin, Central Asia and beyond",
 cls:"c-anc",
 mk:[[37.57,126.98,"Seoul"],[39.03,125.75,"Pyongyang"],[33.50,126.53,"Jeju"],[42.91,129.51,"Yanji (Yŏnbyŏn)"],[46.96,142.74,"Yuzhno-Sakhalinsk"],[41.30,69.24,"Tashkent"]],
 h:[`Koreanic is among the smallest language families in the world, and among the least disputed as a family: it consists of <b>Korean</b>, spoken by some eighty million people on the peninsula and across the world, and <b>Jeju</b>, the speech of the island off the peninsula's south coast. That is the whole of it. Reference works agree on the membership; they part company on what to call Jeju, because South Korean official usage treats it as 제주 방언 — the Jeju <em>dialect</em> — while the linguistic literature and UNESCO treat it as a separate language, mutually unintelligible with mainland Korean. Both statements are true of the same island, which is why it has its own entry here.`,
   `Whether Koreanic has any living relative is a different question, and the honest answer is that none has been demonstrated. The <b>Altaic</b> hypothesis once grouped Korean with Tungusic, Mongolic and Turkic; it has largely been abandoned, and the family is normally treated as standing alone. Deeper in the past there is more to say and less to prove: the Three Kingdoms period left names and glosses for <b>Goguryeo</b>, <b>Baekje</b> and <b>Buyeo</b>, and Korean scholars group these as the <em>Buyeo languages</em> — a proposed branch of Koreanic rather than of anything else — but the material is too thin to settle it, and Goguryeo in particular has been argued into both Koreanic and Japonic.`,
   `The writing history runs in two halves. For a thousand years Korean was written <em>with Chinese characters</em> — not in a script of its own, but through devices for borrowing them: <b>idu</b> for official documents, <b>hyangchal</b> for vernacular poetry, <b>gugyeol</b> for annotating Chinese texts. Then in 1446 Sejong promulgated the <b>Hunmin Chŏngŭm</b> (훈민정음), the alphabet now called Hangul — the only writing system this family has ever had of its own, and the reason Korean is the best-documented language in East Asia after Chinese.`,
   `The twentieth century divided the family twice over. The 1945 partition and the 1953 armistice cut the peninsula into two states with two standards — <b>Pyojuneo</b> (표준어) in the South, built on Seoul speech, and <b>Munhwaŏ</b> (문화어) in the North, built on Pyongyang speech — which differ in orthography, vocabulary and some grammar. Migration then scattered the language: to Yanbian in China, to Sakhalin and then Central Asia under Stalin's deportations, and to Japan. The varieties those movements produced are the ones in this atlas whose speaker figures are least reliable.`],
 t:[["57 BC – 668 AD","Three Kingdoms period: idu is developed to write Korean with Chinese characters"],
    ["918–1392","Goryeo; the Buddhist <i>gugyeol</i> annotation system is elaborated"],
    ["1443 / 1446","Sejong creates the alphabet; the <i>Hunmin Chŏngŭm</i> is promulgated in October 1446"],
    ["1937","Stalin deports the Korean population of the Russian Far East to Central Asia — the origin of Koryo-mar"],
    ["1945–1953","Partition and armistice divide the peninsula into two standard languages"],
    ["2010","UNESCO grades Jeju critically endangered — the highest level it uses"]],
 kids:[


  { id:"protokorean", en:"Proto-Koreanic", zh:"原始朝鲜语", py:"Yuánshǐ Cháoxiǎnyǔ", sp:"reconstructed",
    region:"Reconstructed; the homeland is placed in the peninsula's north or in southern Manchuria",
    cls:"c-anc",
    mk:[[39.5,126.0,"Northern Korea (one proposed homeland)"],[42.0,128.5,"The Yalu–Tumen corridor (the rival proposal)"]],
    h:[`The reconstructed ancestor of Korean and Jeju, recovered chiefly from the correspondences between the two — and Jeju is what makes the reconstruction possible at all. A family of one language cannot be reconstructed; a family of two, split for long enough to have drifted apart systematically, can. The vowel system, the consonant inventory and a set of lexical items are the standard results.`,
       `Where it was spoken is argued rather than known. The two conventional placements are the northern half of the peninsula and the Yalu–Tumen corridor on the Manchurian side of the modern border, and the choice matters, because a Manchurian homeland makes the early Koreanic story one of movement into the peninsula rather than one of continuous occupation. The date is equally open: the split that produced Jeju is usually put somewhere in the first millennium CE, and no archaeological find pins it down.`],
    t:[["1st millennium CE","The Korean–Jeju split is conventionally placed in this range, on linguistic rather than archaeological evidence"],
       ["1960s–1970s","Comparative work on Korean and Jeju dialect data establishes the reconstruction"],
       ["—","No proto-text exists: Proto-Koreanic is known entirely from its descendants"]],
    kids:[]},

  { id:"oldkorean", en:"Old Korean (Silla)", nat:"고대 한국어", zh:"古朝鲜语", py:"Gǔ Cháoxiǎnyǔ", sp:"attested 6th–10th c.",
    region:"The Silla kingdom and, after 668, the unified peninsula; earlier material from Goguryeo and Baekje is fragmentary",
    cls:"c-old",
    mk:[[35.84,129.21,"Gyeongju — Silla capital"],[37.57,126.98,"Hanseong (Seoul)"],[36.28,126.91,"Buyeo — Baekje capital"]],
    h:[`Old Korean is the language of the Silla kingdom and of the unified peninsula that followed it, attested from roughly the sixth to the tenth century — and it survives only in fragments, because it was never written in a script of its own. The surviving texts are Korean words written with Chinese characters through three devices, and each device is a different bargain with a writing system that was not built for the language.`,
       `<b>Idu</b> (이두, 吏讀, "official's reading") used Chinese characters for their Korean meanings and for their sounds, with characters also standing in for grammatical endings; it was developed in the Three Kingdoms period, largely by Buddhist monks, and carried official documents and the examinations. <b>Hyangchal</b> (향찰, 鄕札) used characters phonetically to write vernacular poetry — the <em>hyangga</em> — and is the most valuable of the three for the linguist, because it records the language rather than a bureaucratic register of it. <b>Gugyeol</b> (구결, 口訣) is later and more modest: brief characters inserted beside a Chinese text to show the Korean reading, which makes it a glossing system rather than a writing system.`,
       `The practical consequence is that Old Korean is understood unevenly. Place-names and short glosses can be read; whole poems can be read with effort and disagreement. The period is also where the rest of this map begins: Old Korean is ancestral to Middle Korean, and after the tenth or thirteenth century — sources differ on the date — the language that emerges is a different one.`],
    t:[["57 BC – 668","Three Kingdoms period: idu emerges for writing Korean with Chinese characters"],
       ["6th–7th c.","The earliest hyangga poems are recorded"],
       ["668","Silla unifies the peninsula; its speech becomes the prestige form"],
       ["918","Goryeo replaces Silla; Old Korean shades into Middle Korean over the following centuries"],
       ["10th–13th c.","The end of the Old Korean period is dated here, the century depending on the source"]],
    kids:[]},


  { id:"middlekorean", en:"Middle Korean", nat:"중세 한국어", zh:"中世朝鲜语", py:"Zhōngshì Cháoxiǎnyǔ", sp:"11th–16th c.",
    region:"The Korean peninsula under Goryeo and early Chosŏn",
    cls:"c-mid",
    mk:[[37.97,126.55,"Gaegyeong — Goryeo capital"],[37.57,126.98,"Hanyang — Chosŏn capital"]],
    h:[`Middle Korean is the best-attested stage of the language before the modern period, and the reason is a single event: the invention of the alphabet. In December 1443 Sejong created a set of twenty-eight letters, and in October 1446 the <b>Hunmin Chŏngŭm</b> (훈민정음, 訓民正音, "the correct sounds for instructing the people") was promulgated. From that moment Korean could be written as it was spoken, and Middle Korean became the first stage of the language recorded in its own script rather than through Chinese characters.`,
       `What the new alphabet revealed is a language that no longer exists in this form. Middle Korean was <b>tonal</b> — the sources mark pitch with dots, and the system is recoverable — and it had a vowel harmony in which the vowels of a word and its suffixes agreed, a harmony that modern Korean has largely lost. It also had the letter <em>arae-a</em> (ㆍ), a vowel that disappeared from Seoul speech in the sixteenth century and is one of the clearest markers of the period's boundary. The earliest dated texts are the <em>Yongbi Ŏch'ŏn Ka</em> and the <em>Wŏrin Ch'ŏngang Chigok</em>, both of 1447.`,
       `The stage ends when the language has changed enough that a modern speaker can no longer read it comfortably — conventionally around the sixteenth century. The consonant system reorganised, the tone system gave way to the pitch accent still found in the south-east, and the vowel inventory shrank.`],
    t:[["918–1392","Goryeo; the capital's speech is the prestige form, and gugyeol annotation flourishes"],
       ["1443 (December)","Sejong creates the twenty-eight letters of the new alphabet"],
       ["1446 (October)","The <i>Hunmin Chŏngŭm</i> is promulgated — the start of written Korean in Korean"],
       ["1447","<i>Yongbi Ŏch'ŏn Ka</i> and <i>Wŏrin Ch'ŏngang Chigok</i> — the earliest dated texts in the alphabet"],
       ["16th c.","Tone gives way to pitch accent; the vowel ㆍ disappears from Seoul speech"],
       ["1894","The Kabo reforms begin the end of Chinese characters in official writing"]],
    kids:[]},

  { id:"modernkorean", en:"Modern Korean", nat:"한국어", zh:"现代朝鲜语", py:"Xiàndài Cháoxiǎnyǔ", sp:"≈81 million, by source",
    region:"The peninsula, Yanbian in China, and the diaspora",
    cls:"c-mod",
    mk:[[37.57,126.98,"Seoul — ROK standard"],[39.03,125.75,"Pyongyang — DPRK standard"]],
    h:[`Modern Korean is the language of two states with two standards. South Korea's <b>Pyojuneo</b> (표준어, "standard language") is built on the speech of Seoul; North Korea's <b>Munhwaŏ</b> (문화어, "cultured language") is built on that of Pyongyang, though it was consciously revised to remove loanwords and to prefer native coinages. The two are mutually intelligible and differ less than the political distance suggests — in orthography, in vocabulary, and in a small number of grammatical endings.`,
       `The language's most remarked feature is its <b>honorific system</b>: a set of speech levels, verb endings and honorific inflections that encode the relationship between speaker, listener and subject, and that a learner must get right to say anything at all. It is also agglutinative, with a large inventory of suffixes, and has no grammatical gender and no articles. Whether it has lexical tone is regional: standard Korean has a pitch accent that is not distinctive in the way Sinitic tone is, while the south-eastern dialects retain a genuine and conservative tonal system.`,
       `Since the 1960s the language has been written almost entirely in Hangul. Chinese characters survive in South Korea in limited, declining use — for disambiguation in some newspapers and academic writing — and were abolished in the North in 1949, though the vocabulary they carried remains, so that the two Koreas differ in how they write the same Chinese-derived words. The dialect map below is the one Korean dialectology conventionally uses: five mainland areas, following 방언연구회 (2001), plus Jeju, with Yukjin in the far north-east sometimes split off from the north-eastern area.`],
    t:[["1894–1896","The Kabo reforms and the first newspapers move Korean towards vernacular writing"],
       ["1933","The Chosŏn Ŏhakhoe fixes the unified orthography (한글 맞춤법 통일안)"],
       ["1949","North Korea abolishes Chinese characters in official use"],
       ["1953","The armistice makes the two standards the daily reality of two states"],
       ["1960s–","Hangul becomes effectively the only script in general use in the South"],
       ["1988–","The Seoul Olympics and the Hallyu wave make Korean a globally studied language"]],
    kids:[


     { id:"jungbu", en:"Central — Seoul · Gyeonggi · Hwanghae · Gangwon · Chungcheong", nat:"중부 방언", zh:"中部方言", py:"Zhōngbù fāngyán", sp:"the standard, and the largest area",
       region:"Gyeonggi including Seoul and Incheon, Hwanghae, Gangwon and Chungcheong",
       cls:"c-mod",
       mk:[[37.57,126.98,"Seoul"],[37.46,126.71,"Incheon"],[37.26,127.03,"Suwon"],[38.00,126.70,"Hwangju (Hwanghae)"],[36.35,127.38,"Daejeon"],[37.88,127.73,"Chuncheon"]],
       h:[`The central dialect area is the largest on the peninsula and the one that became the standard: the speech of <b>Seoul</b> is the regional base of South Korea's Pyojuneo, which is why the standard is sometimes called simply 서울말. The area as conventionally drawn also takes in Hwanghae, Gangwon and Chungcheong — a very wide block, held together by a bundle of features rather than by mutual intelligibility among its edges.`,
          `Its most-cited characteristics are the loss of the pitch accent that the south-east preserves, a relatively simple vowel system by the standards of the south-western dialects, and the ㅔ/ㅐ merger now spreading outward from Seoul. Because the standard is this dialect, the area's own regional forms are widely known but also widely levelled: younger speakers in Daejeon or Chuncheon often sound more like Seoul than their grandparents did.`],
       t:[["1394","Hanyang (Seoul) becomes the Chosŏn capital; its speech rises in prestige"],
          ["1933","The Chosŏn Ŏhakhoe standard takes Seoul speech as its base"],
          ["1960s–","Urbanisation and broadcasting level regional forms towards the standard"],
          ["Today","The ㅔ/ㅐ merger and other Seoul features continue to spread outward"]],
       kids:[]},

     { id:"pyongan", en:"North-west (P’yŏngan)", nat:"서북 방언", zh:"西北方言", py:"Xīběi fāngyán", sp:"the DPRK standard's base, by source",
       region:"P'yŏngan and Chagang — Pyongyang, Nampo, Sinŭiju, Ch'ŏngju",
       cls:"c-nw",
       mk:[[39.03,125.75,"Pyongyang"],[38.74,125.41,"Nampo"],[40.10,124.40,"Sinŭiju"],[39.68,125.21,"Ch'ŏngju"],[40.97,126.61,"Kanggye (Chagang)"]],
       h:[`The north-western dialect area covers the old P'yŏngan provinces and Chagang, with Pyongyang at its centre — which is why it is the regional base of North Korea's Munhwaŏ standard. Its southern edge abuts the central area, and some researchers include northern Hwanghae in it while others put the whole of Hwanghae there; the boundary is one of the more debated lines on the Korean dialect map.`,
          `Its best-known features are prosodic and lexical. The area is generally described as having a pitch accent of its own rather than the pattern of Seoul, and it preserves vocabulary that the standard has replaced — a conservatism shared with the north-eastern area, and part of the reason the northern half of the peninsula is often said to be more conservative than the south.`],
       t:[["918–1392","Goryeo; the P'yŏngan region is the dynasty's western frontier"],
          ["1592–1598","The Imjin War: Ming and Japanese armies cross the region repeatedly"],
          ["1948","Pyongyang becomes the DPRK capital; its speech becomes the basis of Munhwaŏ"],
          ["1960s–","Munhwaŏ is codified, with native coinages preferred to loanwords"]],
       kids:[]},

     { id:"hamgyong", en:"North-east (Hamgyŏng)", nat:"동북 방언", zh:"东北方言", py:"Dōngběi fāngyán", sp:"the most conservative northern area, by source",
       region:"South and North Hamgyŏng and Ryanggang — Hamhŭng, Ch'ŏngjin, Wŏnsan",
       cls:"c-ne",
       mk:[[39.92,127.54,"Hamhŭng"],[41.80,129.78,"Ch'ŏngjin"],[39.15,127.44,"Wŏnsan"],[40.67,129.20,"Kimch'aek"],[41.40,128.20,"Hyesan (Ryanggang)"]],
       h:[`The north-eastern dialect area covers Hamgyŏng and Ryanggang and is generally held to be the most conservative of the mainland dialects — the one whose vowel system and vocabulary depart least from Middle Korean. It shares that reputation with the south-east, at the opposite corner of the peninsula, and the pairing is one of the recurring puzzles of Korean dialectology: the two areas that changed least are the two farthest apart.`,
          `Its features include a distinctive set of verb endings and a strong pitch accent, and at its far north-eastern corner it shades into the Yukjin variety, which some scholars treat separately. Speakers of this dialect made up much of the population deported from the Russian Far East in 1937, which is why the Koryo-mar of Sakhalin and Central Asia is described in the literature as Hamgyŏng-derived.`],
       t:[["1398–1443","The six north-eastern garrisons are established along the Tumen"],
          ["1860s–1945","Famine and then colonial policy push Hamgyŏng speakers across the Tumen into Manchuria and the Russian Far East"],
          ["1937","Deportation of the Far Eastern Korean population; Hamgyŏng speech is carried to Central Asia"],
          ["Today","Widely described as the most conservative mainland dialect area"]],
       kids:[


        { id:"yukjin", en:"Yukjin (the six garrisons)", nat:"육진말", zh:"六镇方言", py:"Liùzhèn fāngyán", sp:"by source — often grouped with the north-east",
          region:"The six garrisons of far north-eastern Hamgyŏng — Hoeryŏng, Onsŏng, Chongŏng, Kyŏngwŏn, Kyŏnghŭng, Puryŏng — and across the Tumen in Yanbian",
          cls:"c-ne",
          mk:[[42.44,129.75,"Hoeryŏng"],[42.95,129.98,"Onsŏng"],[42.60,130.30,"Kyŏnghŭng"],[42.13,129.85,"Puryŏng"],[42.91,129.51,"Yanji (across the Tumen)"]],
          h:[`Yukjin — 육진말, "the speech of the six garrisons" — is the variety of the far north-eastern corner of Hamgyŏng, named for the six frontier garrison towns planted along the Tumen in the fifteenth century. Korean dialectology usually folds it into the north-eastern area; Alexander Vovin argued in 2013 that it should be distinguished as a third Koreanic language alongside Korean and Jeju, on the strength of its divergent phonology and lexicon.`,
             `Its interest is historical as much as linguistic. The garrisons were founded by settlers moved there from the south-east of the peninsula, and Yukjin is often described as preserving features that connect it to the south-eastern dialects — an inheritance from its founding population rather than a borrowing. The same corner of the peninsula is where most of the Korean migration into Manchuria began, so Yukjin speech and the Korean of Yanbian are close relatives across a river.`],
          t:[["1398–1443","The six garrisons (육진) are established along the Tumen frontier"],
             ["15th–16th c.","Settlers moved from the south-east bring their speech to the frontier"],
             ["1860s–","Famine drives Yukjin speakers across the Tumen into Manchuria"],
             ["2013","Vovin argues Yukjin should be recognised as a third Koreanic language"]],
          kids:[]}
       ]},

     { id:"gyeongsang", en:"South-east (Gyeongsang) — tonal", nat:"동남 방언", zh:"东南方言", py:"Dōngnán fāngyán", sp:"by source — the tonal mainland area",
       region:"Gyeongsang — Busan, Daegu, Ulsan, Gyeongju",
       cls:"c-se",
       mk:[[35.18,129.08,"Busan"],[35.87,128.60,"Daegu"],[35.84,129.21,"Gyeongju"],[35.54,129.31,"Ulsan"],[36.57,128.73,"Andong"]],
       h:[`The south-eastern dialect area is the one that kept the tones. Where Seoul lost the Middle Korean pitch system and reduced what remained to a non-distinctive accent, Gyeongsang retains a <b>tonal system</b> in which pitch distinguishes words — the single most important fact about the dialect, and the reason it is the best-studied regional variety in the country. It is also the most conservative area for vocabulary, alongside the north-east at the other end of the peninsula.`,
          `The dialect is strongly associated with Busan and Daegu, and its intonation is the most recognisable regional accent in South Korea — used in broadcasting and comedy the way Kansai speech is in Japan. The area also has a distinct set of verb endings, notably an interrogative ending in <em>-no</em> where the standard has <em>-ni</em>, and a vowel system that keeps a distinction the standard has merged. The subdivision into northern (Gyeongbuk) and southern (Gyeongnam) varieties is conventional but not sharp.`],
       t:[["918–1392","Goryeo; the south-east is the old Silla heartland and its speech retains prestige"],
          ["16th c.","Tone survives here as it disappears from central speech"],
          ["1960s–","Industrialisation around Busan and Daegu makes the accent nationally familiar"],
          ["Today","The most conservative mainland area for vocabulary, with a live tone system"]],
       kids:[]},

     { id:"jeolla", en:"South-west (Jeolla)", nat:"서남 방언", zh:"西南方言", py:"Xīnán fāngyán", sp:"by source",
       region:"The old Jeolla provinces — Gwangju, Jeonju, Mokpo, Yeosu",
       cls:"c-sw",
       mk:[[35.16,126.85,"Gwangju"],[35.82,127.15,"Jeonju"],[34.81,126.39,"Mokpo"],[34.76,127.66,"Yeosu"],[35.42,127.39,"Namwon"]],
       h:[`The south-western dialect area covers the old Jeolla provinces and is conventionally divided into northern (Jeonbuk) and southern (Jeonnam) varieties. Its best-known characteristics are prosodic: a distinctive intonation pattern that is often described as having more pitch movement than the standard, and a vowel system with more distinctions than the standard retains — the area is generally treated as conservative in its vowels while innovative in its intonation.`,
          `Vocabulary differences are also marked, and a number of everyday items have regionally specific words here that the standard replaced. The dialect is the butt of a well-documented and much-discussed regional prejudice in South Korean media, where Jeolla speech has historically been used to signal a rustic or comic character; the fact is recorded because the dialect's public image has shaped how much of it survives in younger speech.`],
       t:[["918–1392","Goryeo; the region's speech is already described in the period's sources"],
          ["1896","The Jeolla provinces are reorganised; the north/south division of the dialect follows roughly the old provincial line"],
          ["1960s–","Regional stereotyping in broadcasting affects the dialect's public standing"],
          ["Today","Prosodically distinct, with a conservative vowel system"]],
       kids:[]},


     { id:"chungcheong", en:"Ch’ungch’ŏng", nat:"충청 방언", zh:"忠清方言", py:"Zhōngqīng fāngyán", sp:"usually grouped inside the central area",
       region:"South and North Ch'ungch'ŏng — Daejeon, Cheongju, Cheonan",
       cls:"c-cen",
       mk:[[36.35,127.38,"Daejeon"],[36.64,127.49,"Cheongju"],[36.81,127.15,"Cheonan"],[36.33,126.61,"Boryeong"]],
       h:[`Ch'ungch'ŏng is the dialect area that dialectology usually <em>does not</em> list separately: the standard five-way division of the peninsula places Chungcheong inside the central area along with Gyeonggi, Hwanghae and Gangwon, and it appears separately here only because the Korean literature does distinguish a 충청 방언 within that block. Its treatment here follows the literature's own hesitation rather than resolving it.`,
          `Where it is distinguished, its features are intermediate between the central and south-western areas — which is what its position in the middle of the country would predict. The southern part of the province is sometimes grouped with the south-west on the strength of shared features, and the northern part with Gyeonggi, so the area functions as a transition zone rather than a region with a bundle of its own. That is a legitimate linguistic finding and not a failure to describe it.`],
       t:[["1394","The province lies between the new capital and the south-western provinces"],
          ["1930s–","Dialect surveys place Chungcheong inside the central area"],
          ["Today","Usually treated as a transition zone between the central and south-western areas"]],
       kids:[]},

     { id:"gangwon", en:"Kangwŏn (Yŏngdong)", nat:"영동 방언", zh:"江原方言", py:"Jiāngyuán fāngyán", sp:"sometimes split from the central area",
       region:"The eastern coast of Gangwon — Gangneung, Sokcho, Samcheok — plus the inland Yŏngsŏ area",
       cls:"c-cen",
       mk:[[37.75,128.90,"Gangneung"],[38.20,128.59,"Sokcho"],[37.44,129.17,"Samcheok"],[37.88,127.73,"Chuncheon (Yŏngsŏ)"],[38.38,128.47,"Goseong"]],
       h:[`Gangwon is divided by a mountain range, and the dialect division follows the mountains: the eastern coastal strip, <b>Yŏngdong</b>, is distinguished by some researchers from the inland <b>Yŏngsŏ</b> and from the central area generally. The stated reason is tonal — the eastern coast has pitch behaviour that the rest of the central block does not — and Korean dialectology treats the line as one of the places where the conventional five-way map is least satisfactory.`,
          `The area's interest for this atlas is that it is a boundary case twice over. It sits inside the central dialect area by the standard division and outside it by several researchers' accounts, and it also straddles the peninsula's main mountain spine, which is the kind of geography that produces dialect boundaries. The Yŏngdong variety is marked because that is the one the literature singles out.`],
       t:[["1930s–","Dialect surveys note tonal behaviour on the eastern coast"],
          ["1960s–","The Yŏngdong/Yŏngsŏ distinction is drawn within Gangwon"],
          ["Today","Often grouped with the central area, sometimes split from it"]],
       kids:[]},


     { id:"jeju", en:"Jeju", nat:"제주말", zh:"济州语", py:"Jìzhōuyǔ", sp:"≈5,000 (2014), by source",
       region:"Jeju island and its islets, off the peninsula's south coast",
       cls:"c-jeju",
       mk:[[33.50,126.53,"Jeju City"],[33.25,126.56,"Seogwipo"],[33.40,126.25,"Hallasan"],[33.33,126.84,"Seongsan"]],
       h:[`Jeju is the family's second language or its most divergent dialect, depending on who is asked — and both answers are given because both are official somewhere. South Korean usage calls it 제주 방언, the Jeju dialect, and the island is administratively part of the same state as the standard; the linguistic literature and UNESCO treat it as a separate language, mutually unintelligible with mainland Korean. In 2010 UNESCO graded it <b>critically endangered</b>, the highest level the organisation uses, and its speakers are overwhelmingly elderly.`,
          `The variety's divergence is the reason it matters. Jeju preserves features lost on the mainland — archaic verb endings, a conservative vowel system, and a large stock of vocabulary with no mainland cognate, much of it bound to the island's maritime and diving culture: the <em>haenyeo</em> diving vocabulary, and terms for the island's distinctive kinship and household arrangements.`,
          `Its speaker figures are contested in the way endangered-language figures usually are. The count of roughly 5,000 in the standard reference is a 2014 figure for people who speak it at all; the number of fluent everyday speakers is smaller and falling. Revitalisation efforts are under way — a standardised orthography, teaching materials, broadcasting — and they are recorded without any claim that they have reversed the decline. A separate ISO 639-3 code, <b>jje</b>, is what makes the language's status visible in the registers even where official usage calls it a dialect.`],
       t:[["1273","Jeju is absorbed into Goryeo after the suppression of the Sambyeolcho rebellion"],
          ["1948–1949","The Jeju uprising and its suppression: a large part of the island's population dies or flees, with lasting effects on the speech community"],
          ["2010","UNESCO grades Jeju critically endangered"],
          ["2014","≈5,000 speakers recorded in the standard reference"],
          ["Today","Revitalisation under way; fluent speakers overwhelmingly elderly"]],
       kids:[]}
     ]},


  { id:"diaspora", en:"Diaspora Korean", zh:"离散朝鲜语", py:"Lísàn Cháoxiǎnyǔ", sp:"≈3.2 million, by source",
    region:"Yanbian in China, Sakhalin and Central Asia, and Japan",
    cls:"c-dia",
    mk:[[42.91,129.51,"Yanji (Yŏnbyŏn)"],[46.96,142.74,"Yuzhno-Sakhalinsk"],[41.30,69.24,"Tashkent"],[34.69,135.50,"Osaka"]],
    h:[`Korean left the peninsula in three great movements, and the three varieties here are their results. The largest is in <b>China</b>: some two million ethnic Koreans, most of them in the Yanbian Korean Autonomous Prefecture of Jilin, whose speech is based on the north-western, north-eastern and south-eastern dialects of the peninsula depending on where the settlers came from — and whose written norm follows North Korea's rather than South Korea's.`,
       `The second movement was forced. In 1937 Stalin deported the entire Korean population of the Soviet Far East — around 170,000 people — to Kazakhstan and Uzbekistan, and the variety they and their descendants speak, <b>Koryo-mar</b>, is a Hamgyŏng-derived speech now heavily influenced by Russian. Its speaker figures are the weakest in this atlas: the 217,000 usually quoted is a 1989 figure that the source itself flags as needing a citation, and no reliable current count exists.`,
       `The third is in <b>Japan</b>, where Koreans arrived largely under colonial labour policy and stayed. Zainichi Korean is now the most attenuated of the three: most Zainichi Koreans speak Japanese in daily life, standard Korean is used mainly in first-generation and Chongryon-school settings, and the variety that has emerged has a five-vowel system and a voicing-based consonant contrast that follow Japanese rather than Korean. It is a variety shaped by the language surrounding it — which is what a diaspora variety is.`],
    t:[["1860s–1930s","Famine and colonial policy move Korean speakers into Manchuria and the Russian Far East"],
       ["1937","Stalin deports ≈170,000 Koreans from the Far East to Central Asia"],
       ["1952","Yanbian Korean Autonomous Prefecture is established"],
       ["1965","The Japan–ROK treaty settles the status of Zainichi Koreans without giving them citizenship"],
       ["Today","≈2.1 million ethnic Koreans in China; Koryo-mar counts unreliable; Zainichi Korean largely Japanese-dominant"]],
    kids:[


     { id:"yonbyon", en:"Korean in China (Yŏnbyŏn)", nat:"중국조선어", zh:"延边朝鲜语", py:"Yánbiān Cháoxiǎnyǔ", sp:"≈1 million, by source",
       region:"Yanbian and the other Korean districts of the three north-eastern provinces — Jilin, Heilongjiang, Liaoning",
       cls:"c-dia",
       mk:[[42.91,129.51,"Yanji"],[42.77,129.42,"Longjing"],[42.97,129.84,"Tumen"],[44.05,126.50,"Jilin City"],[45.75,126.97,"Harbin"]],
       h:[`The Korean of north-east China is the largest diaspora variety and the most institutionally supported: Yanbian Korean Autonomous Prefecture was constituted in 1952, Korean is an official language there alongside Chinese, and the region has its own universities, publishing houses and broadcasting in Korean. Around two million ethnic Koreans live in China, though the number who speak Korean in daily life is smaller and falling as urbanisation and intermarriage proceed.`,
          `Its written norm is a separate tradition. A norm commission covering the three north-eastern provinces produced the <b>Chosŏnmal Kyubŏmjip</b> (조선말규범집) in 1977, revised in 1984, which fixed pronunciation, spelling, spacing and punctuation; it was built on North Korea's norms rather than the South's, so that written Korean in China differs from written Korean in Seoul in ways that are orthographic before they are linguistic. Since the 1992 normalisation of China–ROK relations, South Korean usage has spread through business and language teaching, and the two norms now compete.`,
          `Because the settlers came from different parts of the peninsula at different times, "Chinese Korean" is not one homogeneous variety: it has north-western, north-eastern and south-eastern bases depending on the locality, which is why the linguistic literature is cautious about treating it as a single dialect.`],
       t:[["1860s–1945","Famine and colonial labour policy move Korean speakers into Manchuria"],
          ["1952","Yanbian Korean Autonomous Prefecture is established"],
          ["1977","The <i>Chosŏnmal Kyubŏmjip</i> fixes a norm for the three north-eastern provinces (revised 1984)"],
          ["1992","China–ROK normalisation; South Korean usage spreads"],
          ["Today","≈2.1 million ethnic Koreans in China; daily use of the language is declining"]],
       kids:[]},

     { id:"koryomar", en:"Koryo-mar (Sakhalin · Central Asia)", nat:"고려말", zh:"高丽语", py:"Gāolíyǔ", sp:"217,000 (1989, by source) — current figure unknown",
       region:"Sakhalin and the Central Asian republics — Uzbekistan, Kazakhstan, Kyrgyzstan — plus Ukraine and southern Russia",
       cls:"c-dia",
       mk:[[46.96,142.74,"Yuzhno-Sakhalinsk"],[47.05,142.04,"Kholmsk"],[41.30,69.24,"Tashkent"],[45.25,77.98,"Ushtobe (Kazakhstan)"],[43.12,131.89,"Ussuriysk (historical Far East)"]],
       h:[`Koryo-mar — 고려말, "Koryŏ speech", the name the community uses for itself — is the variety spoken by the <b>Koryo-saram</b>, the Koreans deported from the Soviet Far East in 1937. Around 170,000 people were moved to Kazakhstan and Uzbekistan in a matter of weeks; their descendants number roughly half a million, and the language they speak is a Hamgyŏng-derived Korean layered with seventy years of Russian influence.`,
          `That influence is the variety's defining feature. Russian supplies a large part of the everyday vocabulary, the phonology has been reshaped by it, and code-switching is normal — the literature describes Koryo-mar as a mixed rather than merely influenced variety. It is also severely attenuated: the 217,000 figure usually quoted dates to 1989 and has no source attached to it, and current speaker numbers are described as unknown. Younger Koryo-saram overwhelmingly speak Russian, and the language is generally assessed as moribund.`,
          `Its classification is straightforward where its future is not: it is grouped with the northern Hamgyŏng dialects, which is what the 1937 deportees brought with them, and it has no ISO 639-3 code of its own — it is registered as a dialect of Korean.`],
       t:[["1863–1937","Korean settlements grow across the Russian Far East"],
          ["1937","≈170,000 Koreans are deported to Kazakhstan and Uzbekistan"],
          ["1937–1950s","Koryo-saram communities are re-established in Central Asia; Russian becomes the dominant language"],
          ["1989","≈217,000 speakers recorded — the figure still quoted, and flagged as unsourced"],
          ["1991","The Soviet Union dissolves; the Koryo-saram are left in five newly independent states"],
          ["Today","Moribund; current speaker numbers unknown"]],
       kids:[]},


     { id:"zainichi", en:"Zainichi Korean (Japan)", nat:"재일한국어", zh:"在日朝鲜语", py:"Zàirì Cháoxiǎnyǔ", sp:"largely Japanese-dominant, by source",
       region:"Japan — above all Osaka, Tokyo and Kawasaki",
       cls:"c-dia",
       mk:[[34.69,135.50,"Osaka"],[35.68,139.69,"Tokyo"],[35.53,139.70,"Kawasaki"],[35.18,136.91,"Nagoya"],[43.06,141.35,"Sapporo"]],
       h:[`Around a million people of Korean origin or descent live in Japan, and the great majority speak Japanese as their first and often only language. Zainichi Korean — 재일한국어, or 재일조선어 — is what remains as a distinct variety: used among first-generation immigrants and in the ethnic schools supported by the Chongryon association, and largely absent from daily life for everyone else. The literature puts the share of Zainichi Koreans who actually use Korean at around ten per cent.`,
          `Where it is spoken, it is a variety reshaped by Japanese at every level. Its vowel system has five vowels against the standard's eight, with ㅜ/ㅡ and ㅗ/ㅓ merged; its consonants are distinguished by voicing rather than by the aspiration and tenseness that carry meaning in Korean, which is a Japanese pattern; and its vocabulary and phonology carry heavy Japanese influence. This is the clearest case here of a diaspora variety being defined by the language surrounding it rather than by the one it came from.`],
       t:[["1910–1945","Colonial labour policy brings Koreans to Japan"],
          ["1945–1952","A large majority of the wartime population remains after the war; the two Koreas' associations divide the community"],
          ["1965","The Japan–ROK treaty leaves most Zainichi Koreans without citizenship"],
          ["1980s–","Japanese becomes dominant across generations; Korean use contracts"],
          ["Today","≈1 million people of Korean descent; roughly 10% use Korean, and the variety follows Japanese phonology"]],
       kids:[]}
    ]}
  ]};


/* ---------- ISO 639-3 codes (SIL) — the codes behind the Forvo links ---------- */
const ISO = {
 korean:'kor · jje', protokorean:'—', oldkorean:'oko', middlekorean:'okm',
 modernkorean:'kor', jungbu:'kor', pyongan:'kor', hamgyong:'kor', yukjin:'kor (a dialect — Vovin argues otherwise)',
 gyeongsang:'kor', jeolla:'kor', chungcheong:'kor', gangwon:'kor', jeju:'jje',
 diaspora:'kor', yonbyon:'kor', koryomar:'kor (a dialect)', zainichi:'kor (a dialect)'
};

/* ---------- what makes each variety distinctive: structure, not history ---------- */
const FEATURES = {
 korean:[
  `<b>Two living members, not one</b> — Korean and Jeju, with Yukjin argued by some scholars to be a third. This is one of the world's smallest language families.`,
  `<b>No demonstrated relatives.</b> The Altaic hypothesis is abandoned; Koreanic is normally treated as standing alone, and the proposed Buyeo languages (Goguryeo, Baekje) are too thinly attested to settle.`,
  `<b>Honorifics as grammar, not politeness.</b> Speech levels, honorific inflections and address forms are obligatory parts of the verb, not optional registers.`,
  `<b>Agglutinative, no gender, no articles</b> — a large suffix inventory and a strict suffix order.`,
  `<b>Hangul</b>, created in 1443 and promulgated in 1446, is the only writing system the family has ever had of its own.`,
  `<b>Split standards</b>: Pyojuneo in the South and Munhwaŏ in the North, differing in orthography, vocabulary and some endings.`
 ],
 protokorean:[
  `<b>Reconstructable because Jeju exists</b> — a family of two yields a proto-language; a family of one does not.`,
  `<b>Homeland unresolved</b>: northern Korea and the Yalu–Tumen corridor are both argued, and the choice changes whether Koreanic spread <em>into</em> the peninsula or formed there.`,
  `<b>No proto-text</b>: everything known comes from correspondences between the descendants.`
 ],
 oldkorean:[
  `<b>Written with Chinese characters, not in a script of its own</b> — the point of the period.`,
  `<b>Three devices, three purposes</b>: idu for documents, hyangchal for poetry, gugyeol for glossing Chinese.`,
  `<b>Hyangchal is the linguist's source</b>, because it records the language rather than a bureaucratic register.`,
  `<b>Fragmentary and contested</b>: place-names and glosses read cleanly, whole poems do not.`
 ],
 middlekorean:[
  `<b>Tonal</b> — pitch was marked with dots in the sources, and the system is recoverable.`,
  `<b>Vowel harmony</b> between stems and suffixes, largely lost in modern Korean.`,
  `<b>Arae-a (ㆍ)</b>, a vowel that vanished from Seoul speech in the 16th century and marks the period's end.`,
  `<b>The alphabet arrives</b>: 28 letters in 1443, promulgated in the <i>Hunmin Chŏngŭm</i> in October 1446.`,
  `<b>Earliest dated texts</b> are both of 1447 — the <i>Yongbi Ŏch'ŏn Ka</i> and the <i>Wŏrin Ch'ŏngang Chigok</i>.`
 ],
 modernkorean:[
  `<b>Two standards</b>: Pyojuneo (Seoul-based, ROK) and Munhwaŏ (Pyongyang-based, DPRK).`,
  `<b>Pitch accent in the standard, tone in the south-east</b> — the tonal system survives regionally, not nationally.`,
  `<b>Hangul-only in practice since the 1960s</b> in the South; characters abolished in the North in 1949.`,
  `<b>Chinese-derived vocabulary remains</b> in both Koreas even where the characters are no longer written.`
 ],
 jungbu:[
  `<b>The standard's home</b>: Seoul speech is the regional base of Pyojuneo.`,
  `<b>Largest area on the peninsula</b>, held together by a bundle of features rather than by internal intelligibility.`,
  `<b>Pitch accent lost</b>, where the south-east keeps tone.`,
  `<b>The ㅔ/ㅐ merger</b> is spreading outward from Seoul across the whole peninsula.`
 ],
 pyongan:[
  `<b>The DPRK standard's base</b>: Munhwaŏ is built on Pyongyang speech.`,
  `<b>Its own pitch accent</b>, distinct from the Seoul pattern.`,
  `<b>Conservative vocabulary</b> relative to the standard — a trait shared with the north-east.`,
  `<b>A debated southern boundary</b>: whether Hwanghae belongs here is unsettled.`
 ],
 hamgyong:[
  `<b>The most conservative mainland dialect</b>, by common account — and the furthest from the other conservative area, Gyeongsang.`,
  `<b>Strong pitch accent</b> and a distinctive set of verb endings.`,
  `<b>Source of Koryo-mar</b>: the 1937 deportees were largely Hamgyŏng speakers.`,
  `<b>Yukjin at its north-eastern corner</b> is sometimes split off entirely.`
 ],
 yukjin:[
  `<b>Named for six garrison towns</b> planted along the Tumen in the 15th century.`,
  `<b>Argued to be a third Koreanic language</b> (Vovin 2013), on divergent phonology and lexicon.`,
  `<b>Links to the south-east</b> — its founding settlers came from the opposite corner of the peninsula.`,
  `<b>Contiguous with Yanbian Korean</b> across the Tumen.`
 ],

 gyeongsang:[
  `<b>The tonal mainland dialect</b> — pitch distinguishes words here where the standard has lost the system.`,
  `<b>The best-studied regional variety</b> in Korea, precisely because of the tones.`,
  `<b>Conservative vocabulary</b>, like the north-east at the opposite end of the peninsula.`,
  `<b>An interrogative in <i>-no</i></b> where the standard has <i>-ni</i>.`
 ],
 jeolla:[
  `<b>Prosodically the most distinctive mainland dialect</b>, with heavy pitch movement.`,
  `<b>A conservative vowel system</b> — more distinctions than the standard retains.`,
  `<b>Conventionally split</b> into northern (Jeonbuk) and southern (Jeonnam) varieties.`,
  `<b>A stigmatised public image</b> in South Korean broadcasting, which has affected how much survives in younger speech.`
 ],
 chungcheong:[
  `<b>Usually not a separate area at all</b> — standard dialectology puts it inside the central block.`,
  `<b>A transition zone</b> whose features sit between the central and south-western areas.`,
  `<b>Its south sometimes grouped with the south-west</b>, its north with Gyeonggi.`
 ],
 gangwon:[
  `<b>Divided by mountains, and the dialect division follows them</b>: Yŏngdong on the coast, Yŏngsŏ inland.`,
  `<b>The stated reason for splitting it is tonal</b> — the eastern coast behaves differently.`,
  `<b>A boundary case</b> in the conventional five-way map of the peninsula.`
 ],
 jeju:[
  `<b>A language or a dialect, depending on who is asked</b> — and both positions are official somewhere.`,
  `<b>Mutually unintelligible with mainland Korean</b>; UNESCO graded it critically endangered in 2010.`,
  `<b>Archaic verb endings and a conservative vowel system</b>, plus a large stock of vocabulary with no mainland cognate.`,
  `<b>Its vocabulary is bound to the island</b>: the <i>haenyeo</i> diving lexicon, and terms for Jeju's kinship and household arrangements.`,
  `<b>ISO 639-3 <code>jje</code></b> — the code that makes its language status visible even where official usage calls it a dialect.`
 ],
 diaspora:[
  `<b>Three movements, three outcomes</b>: China (supported, official), Central Asia (forced, moribund), Japan (attenuated, Japanese-dominant).`,
  `<b>Speaker figures are the weakest here</b>, and that is said at every entry.`,
  `<b>Orthographic, not just linguistic, divergence</b>: China follows North Korean norms, so written Korean differs before spoken Korean does.`
 ],
 yonbyon:[
  `<b>An official language of a Chinese prefecture</b>: Yanbian, constituted in 1952.`,
  `<b>Its own norm</b>: the <i>Chosŏnmal Kyubŏmjip</i> (1977, revised 1984), built on North Korea's rather than the South's.`,
  `<b>Not one variety</b> — the settlers came from the north-west, north-east and south-east of the peninsula at different times.`,
  `<b>Two competing norms now</b>, as South Korean usage spreads through business and teaching.`
 ],
 koryomar:[
  `<b>A mixed variety</b>, not merely an influenced one: Russian supplies much of the everyday vocabulary and has reshaped the phonology.`,
  `<b>Hamgyŏng-derived</b>, which is what the 1937 deportees brought with them.`,
  `<b>Its 217,000 figure dates to 1989</b> and the source flags it as needing a citation; current numbers are unknown.`,
  `<b>No ISO code of its own</b> — registered as a dialect of Korean.`
 ],
 zainichi:[
  `<b>Five vowels against the standard's eight</b>: ㅜ/ㅡ and ㅗ/ㅓ merged.`,
  `<b>Consonants distinguished by voicing</b>, not by aspiration and tenseness — a Japanese pattern.`,
  `<b>Around 10% of Zainichi Koreans use Korean</b>; most speak Japanese in daily life.`,
  `<b>The clearest case here</b> of a diaspora variety defined by the surrounding language rather than the source one.`
 ]
};


/* ---------- schematic outline (simplified, embedded; [lng,lat] rings) ----------
   Drawn by hand for this atlas: the Korean peninsula, Jeju island, the
   north-east China / Primorye block the diaspora markers sit in, and Sakhalin.
   Not a coastline survey — see the sketch caption. */
const KOREA = [[124.4,40.1],[125.0,39.7],[125.2,38.7],[126.0,38.3],[126.6,37.7],[126.4,37.0],[126.3,36.5],[126.5,36.0],[126.3,35.3],[126.4,34.7],[127.0,34.3],[127.7,34.3],[128.5,34.7],[129.1,35.1],[129.4,35.6],[129.4,36.4],[129.4,37.2],[129.3,38.0],[128.6,38.5],[128.4,38.7],[128.3,39.3],[127.9,39.7],[128.2,40.2],[129.0,40.7],[129.6,41.3],[130.2,42.0],[130.6,42.3],[129.7,42.0],[128.3,41.5],[127.0,41.1],[126.0,40.7],[124.9,40.3],[124.4,40.1]];
const JEJU_IS = [[126.15,33.58],[126.95,33.58],[126.98,33.28],[126.55,33.20],[126.16,33.34],[126.15,33.58]];
const MANCHURIA_NE = [[124.5,46.0],[128.0,47.5],[132.0,47.5],[135.0,46.5],[135.0,43.0],[131.0,42.2],[128.0,41.8],[125.0,42.0],[124.0,43.5],[124.5,46.0]];
const SAKHALIN = [[142.6,54.4],[143.4,53.0],[143.6,51.5],[143.4,50.0],[143.0,48.5],[142.7,47.0],[142.4,46.0],[142.0,46.5],[141.8,47.5],[141.7,48.5],[141.9,49.5],[141.6,51.0],[141.7,52.5],[142.0,53.5],[142.6,54.4]];
const KOREA_GEO = { type:'FeatureCollection', features:[KOREA,JEJU_IS,MANCHURIA_NE,SAKHALIN].map(r=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };

/* ---------- approximate "core areas" ----------
   Hand-drawn coarse blocks showing roughly where each variety is rooted — NOT
   surveyed boundaries, and deliberately crude. Dialect boundaries on this
   peninsula are transition zones, not lines, and the atlas's own prose says so
   at Chungcheong and Gangwon in particular. The marker layer remains the
   factual one. */
const AREAS = {
 'c-anc':[[[124.4,43.2],[129.8,43.6],[130.6,41.2],[128.6,38.9],[125.6,39.4],[124.0,41.0]]],
 'c-old':[[[127.9,37.3],[129.6,37.6],[129.6,35.2],[128.3,34.6],[127.8,35.7]]],
 'c-mid':[[[124.5,40.0],[129.0,41.0],[130.0,42.2],[129.5,38.0],[129.3,35.2],[126.5,34.4],[126.3,36.5],[126.5,37.8],[125.0,39.6]]],
 'c-mod':[[[126.3,37.9],[127.9,37.9],[127.9,36.9],[126.3,36.9]]],
 'c-nw':[[[124.7,40.2],[126.7,40.2],[126.7,38.9],[125.2,38.5],[124.6,39.4]]],
 'c-ne':[[[126.9,41.2],[130.6,42.3],[130.3,40.3],[128.3,39.3],[127.2,39.6]]],
 'c-se':[[[127.7,37.0],[129.6,37.4],[129.6,35.0],[128.3,34.6],[127.7,35.7]]],
 'c-sw':[[[125.9,36.2],[127.9,36.4],[128.4,35.0],[127.4,34.3],[126.3,34.5],[126.3,35.5]]],
 'c-cen':[[[126.4,38.0],[128.9,38.4],[129.0,37.0],[127.4,36.1],[126.4,36.6]]],
 'c-jeju':[[[126.1,33.6],[127.0,33.6],[127.0,33.2],[126.1,33.2]]],
 'c-dia':[
  [[127.4,43.9],[130.6,43.9],[130.6,42.1],[127.4,42.1]],
  [[141.6,49.6],[143.7,49.6],[143.7,46.0],[141.6,46.0]],
  [[68.4,42.1],[70.6,42.1],[70.6,40.7],[68.4,40.7]]
 ]
};


/* ---------- listen links: an Omniglot page where one exists, plus the engine's
   YouTube-search fallback on every node. Omniglot coverage for this family is
   thin — only the Korean and Jeju language pages exist — and the URLs were
   checked 2026-09-26; see research.md, KO-109 "Link health". ---------- */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 korean:      [['Koreanic — Omniglot family index', OM+'langfam.htm'], ['Korean — Omniglot', OM+'korean.htm']],
 protokorean: [],
 oldkorean:   [['Korean — Omniglot (the pre-Hangul systems are described here)', OM+'korean.htm']],
 middlekorean:[['Korean — Omniglot', OM+'korean.htm']],
 modernkorean:[['Korean — Omniglot (with alphabet and sample text)', OM+'korean.htm']],
 jungbu:      [['Korean — Omniglot', OM+'korean.htm']],
 pyongan:     [['Korean — Omniglot', OM+'korean.htm']],
 hamgyong:    [['Korean — Omniglot', OM+'korean.htm']],
 yukjin:      [],
 gyeongsang:  [['Korean — Omniglot', OM+'korean.htm']],
 jeolla:      [['Korean — Omniglot', OM+'korean.htm']],
 chungcheong: [['Korean — Omniglot', OM+'korean.htm']],
 gangwon:     [['Korean — Omniglot', OM+'korean.htm']],
 jeju:        [['Jeju — Omniglot', OM+'jeju.htm']],
 diaspora:    [['Korean — Omniglot', OM+'korean.htm']],
 yonbyon:     [['Korean — Omniglot', OM+'korean.htm']],
 koryomar:    [],
 zainichi:    []
};

/* ===================== the atlas contract (languages.md §1.3) ===================== */
window.ATLASES = window.ATLASES || {};
window.ATLASES.korean = {
  key: 'korean',
  title:   { zh: '朝鲜语族', en: 'Koreanic' },
  tagline: 'The peninsula\'s own family — idu and hyangchal before Hangul, two standards after the armistice, and Jeju at the end of the line',
  stats:   [['2', 'living languages, by most counts'], ['≈81 million', 'speakers, by source'], ['1446', 'the year Hangul was promulgated']],
  palette: {
    anc: '#b9c6cf', old: '#8fa3b8', mid: '#6d87a6', mod: '#3f6ea8', nw: '#5b8fc9',
    ne: '#7aa8d6', se: '#3fa08c', sw: '#57b39a', cen: '#8acdb2', jeju: '#d4713f', dia: '#c9a24f'
  },
  legend:  [['anc','Proto-Koreanic'],['old','Old Korean (Silla)'],['mid','Middle Korean'],['mod','Modern Korean · Central'],['nw','North-west (P’yŏngan)'],['ne','North-east (Hamgyŏng · Yukjin)'],['se','South-east (Gyeongsang)'],['sw','South-west (Jeolla)'],['cen','Ch’ungch’ŏng · Kangwŏn'],['jeju','Jeju — a separate language'],['dia','Diaspora varieties']],
  view:    { center: [127.5, 38.5], zoom: 4.8 },
  outline: { color: '#3f6ea8', fill: 'rgba(63,110,168,0.06)' },
  sketchGeo: KOREA_GEO,
  captions: {
    note:   '● Markers show <b>representative cities and districts</b> where the selected variety is rooted, plus diaspora points at Yanji, Yuzhno-Sakhalinsk, Tashkent and Osaka. A marker means <em>a place where the variety is the local speech</em> — not that everyone there uses it, and least of all for the diaspora varieties, where daily use is now a minority practice. Clicking any entry fits the map to its markers, which is how the Sakhalin and Central Asian points are reached from the initial view.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — coarse hand-drawn blocks showing roughly where each dialect is rooted. Korean dialect geography is a study of <em>transition zones</em>, not lines: Chungcheong and Gangwon are marked here because the literature distinguishes them, but the text here records that the standard five-way division puts both inside the central block. The marker layer is the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn Korean peninsula, Jeju island, the north-east China / Primorye block and Sakhalin, simplified from memory of the geography; the markers sit at true coordinates. Works fully offline.'
  },
  fonts: ['Noto Serif KR', 'Noto Sans SC'],
  filterPlaceholder: 'e.g. Jeju, Hamgyŏng, Yukjin, Koryo-mar…',
  listen: {
    om: 'https://www.omniglot.com/writing/',
    fv: 'https://forvo.com/languages/',
    search: 'Korean language native speaker'
  },
  rootId: 'korean',
  stages: ['protokorean', 'oldkorean', 'middlekorean'],
  sources: 'Sources: Lee &amp; Ramsey, <i>The Korean Language</i> · S. E. Martin, <i>A Reference Grammar of Korean</i> · K.-M. Lee, <i>A History of the Korean Language</i> · the Korean dialect survey literature, above all 방언연구회, <i>방언학 사전</i> (2001), whose five-way division of the peninsula this atlas follows · A. Vovin on Yukjin and on the Koreanic family · S. J. Song, <i>The Korean Language: Structure, Use and Context</i> (2005) · UNESCO\'s <i>Atlas of the World\'s Languages in Danger</i> for the Jeju grade · Ethnologue and Glottolog for ISO 639-3 codes and counts. Two figures here are weaker than the rest and are marked as such in the prose: the Koryo-mar count is a 1989 number that its own source flags as needing a citation, and the Zainichi Korean share is an estimate. Jeju has its own entry without a side being taken on whether it is a language or a dialect — both positions are official somewhere, and that is stated.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();

