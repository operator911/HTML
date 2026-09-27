/* atlas-hmongmien.js — Hmong–Mien 苗瑶语族
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (see languages.md §1.3 for the contract,
 * §2.8 for this family's brief, and research.md §"Hmong–Mien (Phase 7)" for the
 * evidence log — every load-bearing date and figure below is logged there as
 * HM-101 … HM-109).
 *
 * Three things this atlas is careful about:
 *  1. The family has TWO indigenous scripts, not one, and they are rivals: the
 *     Pollard script (an abugida, ca. 1936, still used by A-Hmao) and Pahawh
 *     Hmong (a semisyllabary invented in 1959 by Shong Lue Yang, with a
 *     messianic origin story). Neither is an ancestor of the other.
 *  2. "Miao" and "Yao" are Chinese administrative labels covering far more
 *     people than speak Hmongic or Mienic languages — She is the extreme case,
 *     with 710,000 ethnic She and around 900 speakers of the She language.
 *  3. The brief's phrase "the 'lantern writing' tradition" could not be
 *     verified against any source and has been CUT rather than shipped. See
 *     HM-107, which records the cut.
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree =====================
   Two branches, following the family's own literature: Hmongic (Miao) and
   Mienic (Yao). The Hmongic branch is the larger and the messier of the two,
   and its internal shape is still being argued. */
const DATA = {
 id:"hmongmien", en:"Hmong–Mien", zh:"苗瑶语族", py:"Miáoyáo yǔzú", sp:"≈6 million, by source",
 region:"The hill country of southern China — Guizhou, Hunan, Yunnan, Guangxi — and, since the 1970s, the Hmong diaspora in the United States, France and French Guiana",
 cls:"c-anc",
 mk:[[26.58,107.98,"Guizhou — the Hmongic core"],[28.23,112.94,"Hunan — Xong"],[24.31,109.42,"Guangxi — Mienic core"],[19.89,102.13,"Laos — the 1960s–70s war zone"],[36.75,-119.77,"Fresno, California"],[4.94,-52.33,"Cayenne, French Guiana"]],
 h:[`Hmong–Mien is a family of two branches, and the two branches are not equal in anything except tone. <b>Hmongic</b> — called Miao in Chinese usage — is the larger, with the Hmong of Laos, Vietnam and the American diaspora at one end and a scatter of hill languages across Guizhou, Hunan and Yunnan at the other. <b>Mienic</b> — Yao — is smaller and tighter, built around Iu Mien and Kim Mun. Both branches are strongly tonal, both are largely monosyllabic, and both have been in contact with Sinitic for so long that a large part of their vocabulary is Chinese in origin. That contact is also why the family is hard to describe from the outside: it has no written tradition older than the twentieth century, and no literature of its own before missionaries and literacy workers arrived.`,
   `The family's own names need care. <b>Miao</b> and <b>Yao</b> are Chinese administrative categories covering far more people than speak Hmongic or Mienic languages, and the mismatch runs in both directions: many Yao speak Hmongic languages, many Miao speak languages classified as neither, and the She — a Miao–Yao people by every official account — number 710,000 by ethnicity and about 900 by language. The atlas uses the linguistic names Hmongic and Mienic for the branches, and records the administrative labels where they are what the sources use.`,
   `Two writing systems were invented for these languages in the twentieth century, and neither descends from the other. The <b>Pollard script</b>, an abugida devised around 1936 by the Methodist missionary Sam Pollard, is still in use for A-Hmao and related languages in Yunnan and Guizhou. <b>Pahawh Hmong</b> is a semisyllabary created in 1959 by Shong Lue Yang, a Hmong farmer who was later killed and whose followers treated the script as revealed; it has an origin story rather than a philology, and it is now one of the scripts used for White and Green Hmong alongside several Romanisations.`,
   `The twentieth century moved the family twice. The First Indochina and then the Laotian Civil War drew the Hmong of Laos into the fighting on the royalist side; after 1975 a large part of that population left, first for camps in Thailand and then for third countries. Around 364,000 people of Hmong descent now live in the United States, most of them in California's Central Valley and in Minnesota, and there is a smaller community in French Guiana. Those communities are the reason this family's atlas has markers on three continents.`],
 t:[["before 1000 BCE","Hmong–Mien speakers are conventionally placed in the middle Yangtze basin before Sinitic expansion pushed them south"],
    ["ca. 1936","Sam Pollard devises the Pollard script for A-Hmao"],
    ["1959","Shong Lue Yang creates Pahawh Hmong"],
    ["1960–1975","The Laotian Civil War; Hmong communities are drawn into the fighting"],
    ["1975–","Refugee movement to Thailand, then resettlement in the United States, France and French Guiana"],
    ["2023","363,565 people of Hmong descent recorded in the United States"]],
 kids:[

  { id:"protohm", en:"Proto-Hmong–Mien", zh:"原始苗瑶语", py:"Yuánshǐ Miáoyáo yǔ", sp:"reconstructed",
    region:"Reconstructed; the homeland is placed in the middle Yangtze basin",
    cls:"c-anc",
    mk:[[30.5,114.3,"Middle Yangtze basin (the conventional homeland)"]],
    h:[`The reconstructed ancestor of the two branches, worked out chiefly by Martha Ratliff and by Japanese scholars including Iwata, from correspondences in tone and vocabulary across Hmongic and Mienic. The reconstruction is more secure than the family's archaeology: the tone system can be reconstructed in detail, because both branches preserve its categories and their reflexes are regular.`,
       `The homeland is placed in the middle Yangtze basin — the argument being that the family's speakers were there before Sinitic expansion pushed them south and west into the hills, which is the same story the Kra–Dai and Austroasiatic atlases tell about their own families. It is a reconstruction from vocabulary and from later geography rather than a documented event, and no text of any kind survives.`],
    t:[["before 1000 BCE","The conventional date for the family's presence in the middle Yangtze basin"],
       ["1970s–","Ratliff's and Iwata's comparative work establishes the reconstruction"],
       ["—","No proto-text: the reconstruction rests on tone correspondences and lexicon"]],
    kids:[]},

  { id:"hmongic", en:"Hmongic (Miao)", zh:"苗语支", py:"Miáoyǔ zhī", sp:"≈5 million, by source",
    region:"Guizhou, Hunan, Yunnan, Sichuan, Guangxi and Guangdong; Laos, Vietnam, Thailand and Myanmar",
    cls:"c-hmo",
    mk:[[26.58,107.98,"Guizhou"],[28.23,112.94,"Hunan"],[25.04,102.71,"Kunming (Yunnan)"],[21.03,105.85,"Hanoi region"],[19.89,102.13,"Laos"]],
    h:[`Hmongic is the larger and the more internally diverse of the two branches, and its classification is genuinely unsettled: the reference account lists <b>Bahengic</b>, <b>Sheic</b>, <b>West Hmongic</b> (Chuanqiandian Miao), <b>Xong</b> and <b>Hmu</b> as its divisions and then adds "possibly other, unclassified branches" — an honest admission that the smaller languages of the Guizhou–Hunan hills have not been placed.`,
       `Its geography is a thousand kilometres wide and entirely upland. The languages sit in the hill country that Sinitic and then Kra–Dai lowland populations pushed them into, which is why they form a scatter rather than a block, and why the branches that look most like each other are often not the ones nearest each other. Two of its members — Xong and Hmu — have several hundred thousand speakers each; the rest range down to a few thousand.`],
    t:[["before 1000 BCE","Hmongic speakers are placed in the middle Yangtze basin with the rest of the family"],
       ["Song–Ming","Sinitic and Kra–Dai expansion pushes Hmongic populations into the uplands"],
       ["1890s–1930s","Missionary and colonial-era descriptions begin"],
       ["1950s–","The Chinese state standardises and describes the Miao varieties"],
       ["Today","≈5 million speakers, in a scatter of languages whose internal classification is still argued"]],
    kids:[

     { id:"xong", en:"Xong (Xiangxi Miao)", nat:"Dut Xonb", zh:"湘西苗语", py:"Xiāngxī Miáoyǔ", sp:"≈900,000 (2005), by source",
       region:"Western Hunan, with outliers in Guizhou, Hubei, Guangxi and Chongqing",
       cls:"c-xon",
       mk:[[28.23,112.94,"Hunan (the core area)"],[26.58,107.98,"Guizhou (outliers)"],[29.56,106.55,"Chongqing (outliers)"]],
       h:[`Xong — <em>Dut Xonb</em>, also called Xiangxi Miao — is the Hmongic language of western Hunan and one of the branch's two large members, with around 900,000 speakers in the reference count. It is spoken by the Qo Xiong, and its range has outliers far from the Hunan core, in Guizhou, Hubei, Guangxi and Chongqing, the product of several centuries of movement within the hill country.`,
          `It divides conventionally into a western variety, which is Xong proper, and an eastern one called Suang; the two are separate ISO codes and separate varieties rather than one language with an accent. Like the rest of the branch it is tonal, monosyllabic, and carries a large Chinese-derived vocabulary, and like most of its relatives it has no pre-twentieth-century written tradition — it is written today in a Romanisation, and the atlas's script slot shows that Romanisation rather than a script of its own.`],
       t:[["Ming–Qing","Sinitic records name the Miao of western Hunan; the uplands fill with Hmongic speakers"],
          ["1795–1806","The Miao rebellions of the Hunan–Guizhou borderlands; the area is repeatedly depopulated and re-settled"],
          ["1950s–","Chinese descriptive work and a Romanisation for the Xiangxi variety"],
          ["2005","≈900,000 speakers, in the reference count"]],
       kids:[]},


     { id:"hmu", en:"Hmu (Qiandong Miao)", nat:"hveb Hmub", zh:"黔东苗语", py:"Qiándōng Miáoyǔ", sp:"by source — several hundred thousand",
       region:"Mostly Guizhou, with speakers in neighbouring provinces; formerly also in Vietnam",
       cls:"c-hmu",
       mk:[[26.58,107.98,"Guizhou (the core area)"],[26.25,105.93,"Anshun"],[27.71,106.93,"Zunyi"],[22.82,104.98,"Hà Giang (Ná-Meo, Vietnam)"]],
       h:[`Hmu — <em>hveb Hmub</em>, also Qiandong Miao or "Black Miao" — is the Hmongic language of eastern Guizhou and the other large member of the branch, with several hundred thousand speakers. It is the basis of what the sources call "Standard Miao", and it is the most institutionally supported of the Hmongic languages in China: it has the largest body of descriptive and pedagogical material, and a Romanisation built for it.`,
          `Its ISO situation is unusual and worth reading carefully. Hmu is registered as <b>three</b> languages — Northern (hea), Eastern (hmq) and Southern (hms) — because the varieties are treated as separate codes, and a fourth code (neo) covers <b>Ná-Meo</b>, a Hmu variety spoken in northern Vietnam. So a single language of several hundred thousand speakers appears in the register as four entries, which is the same pattern the Kra–Dai atlas found for Zhuang and the Tibeto-Burman atlas for the Yi varieties.`],
       t:[["Ming–Qing","Sinitic expansion and the Guizhou uplands consolidate the Hmu area"],
          ["1854–1873","The Miao rebellion in Guizhou; the region is devastated and the population displaced"],
          ["1950s–","Standard Miao is developed on a Hmu base, with a Romanisation"],
          ["Today","Registered as three ISO codes in China plus Ná-Meo in Vietnam"]],
       kids:[]},

     { id:"ahmao", en:"A-Hmao (Large Flowery Miao)", nat:"𖽃𖽔𖾐 𖽑𖼄𖽻𖾐", zh:"大花苗语", py:"Dàhuā Miáoyǔ", sp:"300,000 (1999), by source",
       region:"Guizhou and Yunnan — the Diandongbei (north-east Yunnan) highlands",
       cls:"c-ahm",
       mk:[[26.58,107.98,"Guizhou"],[27.34,103.72,"Zhaotong (NE Yunnan)"],[25.04,102.71,"Kunming"],[26.65,104.87,"Weining"]],
       h:[`A-Hmao — <em>ad Hmaob lul</em>, "Large Flowery Miao" (大花苗) — is a West Hmongic language of the Guizhou–Yunnan highlands with about 300,000 speakers. It is the language for which the <b>Pollard script</b> was created, and it is the main reason that script survives: while most Hmongic and Mienic languages moved to Romanisations in the twentieth century, A-Hmao and its neighbours kept an abugida designed for them by a missionary in the 1930s.`,
          `The script is the node's interest. Pollard's design took the vowel as the organising element and attached the consonant as a smaller mark to its side, which is the opposite arrangement from the Brahmic scripts of South-East Asia and, as it happens, from Pahawh Hmong. It spread beyond A-Hmao — the reference account lists Lipo, Sichuan Miao and Nasu among the languages written in it — and it is one of the very few scripts in this atlas that was designed for a minority language by an outsider and then genuinely adopted by its speakers.`],
       t:[["1890s–1900s","Sam Pollard works among the A-Hmao in Yunnan and Guizhou"],
          ["ca. 1936","The Pollard script is devised for A-Hmao"],
          ["1936–","The script spreads to Lipo, Sichuan Miao and Nasu; A-Hmao texts are printed"],
          ["1999","300,000 speakers, in the reference count"],
          ["Today","A-Hmao is written in both Pollard script and a Romanisation"]],
       kids:[]},

     { id:"chuanqiandian", en:"Chuanqiandian Hmong (West Hmongic)", zh:"川黔滇苗语", py:"Chuān-Qián-Diān Miáoyǔ", sp:"≈4.5 million, by source",
       region:"Sichuan, Guizhou, Yunnan and Guangxi; Laos, Vietnam, Thailand and Myanmar; and the diaspora",
       cls:"c-cqd",
       mk:[[26.58,107.98,"Guizhou"],[25.04,102.71,"Kunming (Yunnan)"],[23.36,103.36,"Yunnan–Vietnam border"],[19.89,102.13,"Laos"],[18.79,98.98,"Chiang Mai (Thailand)"]],
       h:[`Chuanqiandian — the cluster named for the three provinces Sichuan, Guizhou and Yunnan — is the Hmongic branch that left China. Its speakers are the Hmong of the highlands of northern Laos, Vietnam, Thailand and Myanmar, and it is their descendants who became the American, French and Guianese communities. The reference count for Hmong as a whole is 4.5 million (2015), and most of that number is this cluster.`,
          `The name is a Chinese administrative convenience for a dialect continuum that does not respect provincial lines, and the continuum is the point: the varieties within it are conventionally grouped as White Hmong (Hmong Daw) and Green or Blue Hmong (Hmong Njua), with further divisions inside each. Which of the many Romanisations is used for a given community is often a matter of which missionary or which literacy programme reached it first, and that is why the same language appears in print under several different spellings.`,
          `Its writing situation is the family's most complicated. There are multiple Latin standards — RPA (the Romanised Popular Alphabet, the most widely used), several church-based alternatives, and Pahawh Hmong, the 1959 semisyllabary. Hmong in the United States is written mainly in RPA and Pahawh, sometimes in the same document. The atlas's script slot shows <em>lus Hmoob</em>, the autonym, which is what the infobox gives.`],
       t:[["Ming–Qing","Hmongic populations move south-west into Yunnan and then into the Indochinese highlands"],
          ["1890s–1950s","Missionary work produces the first Romanisations"],
          ["1959","Pahawh Hmong is created by Shong Lue Yang"],
          ["1960–1975","The Laotian Civil War; Hmong communities are drawn into the fighting"],
          ["1975–","Refugee movement to Thailand and resettlement in third countries"],
          ["2015","4.5 million Hmong speakers, in the reference count"]],
       kids:[


        { id:"hmongdaw", en:"White Hmong (Hmong Daw)", nat:"𖬇𖬰𖬞 𖬌𖬣𖬵", zh:"白苗语", py:"Báimiáo yǔ", sp:"the larger variety, by source",
          region:"Northern Laos, north-western Vietnam, Thailand; and the diaspora in the United States, France and French Guiana",
          cls:"c-cqd",
          mk:[[19.89,102.13,"Luang Prabang (Laos)"],[21.03,105.85,"Hanoi region"],[18.79,98.98,"Chiang Mai"],[44.95,-93.09,"St Paul, Minnesota"],[36.75,-119.77,"Fresno, California"]],
          h:[`White Hmong — <em>lus Hmoob</em>, the "white" referring to the traditional dress of the women — is the variety most often meant when the word Hmong is used without qualification, and the one most widely written. The Romanised Popular Alphabet (RPA) was developed on it, and the conventions of that alphabet are why Hmong in print looks the way it does: consonant digraphs and a <b>final consonant letter marking the tone</b>, so that a written word's last letter is usually not a consonant at all but a pitch instruction. The atlas's script slot shows the name in <b>Pahawh Hmong</b>, the 1959 semisyllabary, because for this variety that script is a live alternative to the Romanisation rather than a historical curiosity.`,
             `Its phonology is the family's signature sound. Hmong is tonal with a system that includes a <b>creaky</b> register and, in some varieties, a <b>breathy</b> one — a contrast that RPA encodes by doubling a letter — and it has a large inventory of voiceless nasals and of prenasalised stops. English speakers who meet Hmong in Minnesota or Wisconsin are most likely hearing this variety.`],
          t:[["1890s–1950s","Missionary work in Laos and Yunnan produces the first Romanisations"],
             ["1953–1975","The Laotian Civil War; White Hmong communities are drawn into it"],
             ["1975–1990s","Refugee camps in Thailand; resettlement in the United States, France and French Guiana"],
             ["Today","The most widely written variety, in RPA and Pahawh Hmong"]],
          kids:[]},

        { id:"hmongnjua", en:"Green Hmong (Hmong Njua)", nat:"lug Moob", zh:"青苗语", py:"Qīngmiáo yǔ", sp:"by source",
          region:"Northern Laos and Vietnam, with communities in Thailand and the diaspora",
          cls:"c-cqd",
          mk:[[19.89,102.13,"Laos"],[22.50,103.94,"Lào Cai (Vietnam)"],[18.79,98.98,"Chiang Mai"],[35.18,-80.84,"Charlotte, North Carolina"]],
          h:[`Green Hmong — <em>Hmoob Ntsuab</em>, also called Blue Hmong — is the other main division of Chuanqiandian, distinguished from White Hmong by dialect, by traditional dress, and by a set of phonological and lexical differences that make the two less than fully mutually intelligible in some areas. The division is one the communities themselves make and use, not a linguist's convenience.`,
             `Like White Hmong it is tonal, and like White Hmong it is written in more than one system; the choice of orthography tends to follow the community and the church or agency that introduced literacy rather than any standard authority. The atlas keeps the two as separate nodes because the sources do, and because "Hmong" alone conceals a distinction that matters to the people concerned.`],
          t:[["Ming–Qing","Hmongic populations settle the Indochinese highlands"],
             ["1890s–1950s","Missionary work produces Romanisations for the several varieties"],
             ["1960–1975","The Laotian Civil War"],
             ["1975–","Diaspora resettlement in the United States and France"],
             ["Today","Written in RPA, Pahawh Hmong and church-based alternatives"]],
          kids:[]}
       ]},


     { id:"bunu", en:"Bunu", nat:"Buod Nuox", zh:"布努语", py:"Bùnǔ yǔ", sp:"359,474 (2001), by source",
       region:"Guangxi, with varieties reaching into Guizhou and Yunnan; speakers are classified as Yao in China",
       cls:"c-bun",
       mk:[[23.73,109.21,"Guangxi (the core area)"],[24.31,109.42,"Liuzhou region"],[24.78,110.49,"Guilin region"]],
       h:[`Bunu is the name for a group of Hmongic varieties spoken in Guangxi by people the Chinese state classifies as <b>Yao</b> — one of the clearest cases of the mismatch between administrative label and linguistic classification that runs through this whole family. Its speakers are Yao by ethnicity and Hmongic by language, which is exactly the situation the atlas's root node warns about.`,
          `The varieties are conventionally divided into several groups — the reference account names Dongnu, Nunu and Bunuo — and their classification inside Hmongic has been argued for decades, placing them in a Bu–Nao grouping within West Hmongic. The reference count is <b>359,474</b> speakers (2001), which makes Bunu one of the larger languages in this atlas despite its obscurity outside China. Notably, it has <b>no ISO 639-3 code of its own</b>: the varieties are registered separately, so a language of over 350,000 speakers has no single code to look up.`],
       t:[["Ming–Qing","Hmongic-speaking populations are classified as Yao within the Chinese administrative system"],
          ["1950s–","Chinese descriptive work on the Bunu varieties begins"],
          ["2001","359,474 speakers, in the reference count"],
          ["Today","Several varieties, no single ISO code, and an argued internal classification"]],
       kids:[]},

     { id:"bahengic", en:"Bahengic (Pa-Hng)", zh:"巴哼语支", py:"Bā-hēng yǔ zhī", sp:"Pa-Hng: 33,610 (1995–2009), by source",
       region:"The Hunan–Guangxi–Guizhou borderland",
       cls:"c-bun",
       mk:[[26.15,109.83,"Hunan–Guangxi borderland"],[26.58,107.98,"Guizhou"]],
       h:[`Bahengic is one of the Hmongic divisions named in the reference account, and it is small: a group of closely related varieties spoken in the hill country where Hunan, Guangxi and Guizhou meet, by communities classified in China as Yao. Its best-documented member is <b>Pa-Hng</b> (also Pateng), with 33,610 speakers in the reference count and its own ISO code, <code>pha</code> — and it is the only language in this atlas that UNESCO grades <b>Vulnerable</b> rather than endangered, which makes it the family's comparatively healthy outlier.`,
          `Its interest is structural. Bahengic preserves features that the larger Hmongic languages have changed, and its position in the family has been used as evidence about what Hmongic looked like before the branches separated. As with Bunu, the speakers are administratively Yao and linguistically Hmongic, and the atlas records the label rather than resolving it. The node is named for the branch rather than for Pa-Hng because the branch is what the classification literature lists; Pa-Hng is its member with a code and a speaker count.`],
       t:[["Ming–Qing","Hmongic-speaking populations in the borderland are classified as Yao"],
          ["1950s–","Descriptive work identifies Bahengic as a separate Hmongic division"],
          ["1995–2009","33,610 Pa-Hng speakers, in the reference count"],
          ["Today","Pa-Hng is graded Vulnerable by UNESCO — the family's least endangered language"]],
       kids:[]},

     { id:"she", en:"She", nat:"Ho Le", zh:"畲语", py:"Shē yǔ", sp:"910 (1999), by source",
       region:"A handful of localities in Guangdong — Zengcheng, Boluo, Huidong and Haifeng",
       cls:"c-she",
       mk:[[23.29,113.83,"Zengcheng (Guangzhou)"],[23.17,114.29,"Boluo County"],[22.98,114.72,"Huidong County"],[22.97,115.33,"Haifeng County"]],
       h:[`She is the family's clearest illustration of what a Chinese administrative label conceals. The <b>She people</b> number about 710,000 by the 2000 census; the <b>She language</b> was recorded with <b>910 speakers</b> in 1999, all of them in a few localities in Guangdong. Almost everyone else who is She by ethnicity speaks a Sinitic variety — most often Hakka, or the distinct She Chinese of Zhejiang and Fujian — and has done for centuries.`,
          `That the language survives at all in four Guangdong districts is a consequence of geography: those communities stayed out of the main Hakka migration currents and kept the older speech. Its classification places it in <b>Sheic</b>, with the closely related Pana language, and it is severely endangered by any measure — a language with fewer speakers than a single village, belonging to a people of three-quarters of a million. The atlas marks the four Guangdong localities because those are where it still is.`,
          `Its autonym is <em>Ho Le</em>, and it is tonal and monosyllabic like the rest of the family. It has no indigenous script and is not written in ordinary use; the atlas's script slot shows the Romanised autonym for that reason.`],
       t:[["Song–Yuan","She ancestors are pushed south by Sinitic and Hakka expansion"],
          ["Ming–Qing","Most She communities shift to Sinitic varieties; a few in Guangdong retain She"],
          ["1950s–","Chinese descriptive work identifies the surviving She-speaking localities"],
          ["1999","910 speakers recorded — against 710,000 ethnic She (2000 census)"],
          ["Today","Severely endangered; confined to a few districts of Guangdong"]],
       kids:[]}
    ]},


  { id:"mienic", en:"Mienic (Yao)", zh:"瑶语支", py:"Yáoyǔ zhī", sp:"≈1.5 million, by source",
    region:"Guangxi, Hunan, Yunnan and Guangdong; Vietnam, Laos, Thailand; and communities in the United States and France",
    cls:"c-mie",
    mk:[[24.31,109.42,"Guangxi"],[25.04,102.71,"Yunnan"],[21.03,105.85,"Vietnam"],[19.89,102.13,"Laos"],[38.58,-121.49,"Sacramento, California"]],
    h:[`Mienic — Yao — is the smaller and the tighter of the two branches, and unlike Hmongic its internal shape is not much disputed. The reference account lists five members: <b>Iu Mien</b>, <b>Biao Mon</b>, <b>Kim Mun</b>, <b>Biao Min</b>, and the Zaominic pair <b>Dzao Min</b> and Yangchun Pai Yao. Iu Mien and Kim Mun are close enough that the literature gives their lexical similarity as a percentage; the others are further out.`,
       `Its speakers are the Yao peoples — the label again covering more than one linguistic reality, since the Mienic Yao and the Hmongic-speaking Yao are classified together in China and are not related within the family. Mienic's own name comes from the Iu Mien autonym, and the branch is where the family's most successful diaspora community is found: the Iu Mien of California and the Pacific Northwest, who arrived by the same route as the Hmong and whose language is more widely maintained than Hmong in some American communities.`],
    t:[["Ming–Qing","Mienic-speaking populations consolidate in the Guangxi–Hunan–Yunnan hill country"],
       ["1890s–1950s","Missionary and colonial-era descriptions; Romanisations are developed"],
       ["1960–1975","The Laotian Civil War displaces Mienic communities alongside the Hmong"],
       ["1975–","Resettlement in the United States and France"],
       ["Today","≈1.5 million speakers across five languages"]],
    kids:[

     { id:"iumien", en:"Iu Mien", nat:"Iu Mienh", zh:"勉语", py:"Miǎn yǔ", sp:"837,400 (1995–2019), by source",
       region:"Guangxi, Hunan, Yunnan and Guangdong; Vietnam, Laos and Thailand; and the United States",
       cls:"c-mie",
       mk:[[24.31,109.42,"Jinxiu (Guangxi) — the standard's base"],[25.04,102.71,"Yunnan"],[21.03,105.85,"Vietnam"],[19.89,102.13,"Laos"],[38.58,-121.49,"Sacramento, California"]],
       h:[`Iu Mien — <em>Iu Mienh</em> — is the largest Mienic language and the one with a standard: the Chinese literature takes the dialect of Changdong in the Jinxiu Yao Autonomous County of Guangxi as the reference form, and that standard is used in the bilingual education of the county. The reference count is about 837,000 speakers, spread from Guangxi through Yunnan to Vietnam, Laos and Thailand.`,
          `Like the rest of the family it is tonal and monosyllabic, and its Romanisation — a missionary product of the twentieth century — is the form in which it is normally written. Its American community, concentrated in California and the Pacific Northwest, is one of the better-documented refugee language communities in the United States, and the language is generally reported as more actively maintained there than Hmong. The atlas marks Jinxiu as the standard's base and Sacramento as the diaspora anchor.`],
       t:[["Ming–Qing","Mienic populations settle the Guangxi hills and move south-west"],
          ["1950s–","Jinxiu Yao Autonomous County is established; its dialect becomes the standard"],
          ["1960–1975","The Laotian Civil War displaces Iu Mien communities"],
          ["1975–","Resettlement in the United States; Sacramento becomes a centre"],
          ["1995–2019","837,400 speakers, in the reference count"]],
       kids:[]},

     { id:"kimmun", en:"Kim Mun (Lanten)", zh:"金门方言", py:"Jīnmén fāngyán", sp:"ca. 400,000 (1995–1999), by source — see the note",
       region:"Guangxi, Hunan and Yunnan; about 61,000 in Hainan; Vietnam, Laos and Thailand",
       cls:"c-mie",
       mk:[[24.31,109.42,"Guangxi"],[25.04,102.71,"Yunnan"],[19.20,109.70,"Hainan (≈61,000)"],[21.03,105.85,"Vietnam"],[19.89,102.13,"Laos"]],
       h:[`Kim Mun — also called <b>Lanten</b> or Landian (蓝靛, "indigo", after the dye crop its speakers grew) — is the second Mienic language, spoken in Guangxi, Hunan and Yunnan and across the border into Vietnam, Laos and Thailand. It is close to Iu Mien, and the two are conventionally treated as a single grouping within Mienic on the strength of their lexical similarity.`,
          `⚠ Its speaker figures do not agree with each other, and the atlas reports both rather than choosing. The reference infobox gives <b>ca. 400,000</b>; the same source's prose gives <b>200,000</b> speakers among the Yao of Guangxi, Hunan and Yunnan with about <b>61,000</b> in Hainan — which sums to roughly 261,000, not 400,000. The node's population chip carries the infobox figure and the prose records the discrepancy. This is logged at HM-106.`,
          `Kim Mun's most distinctive feature is not linguistic but economic and religious: its communities are associated with indigo cultivation and with a body of Daoist ritual texts written in Chinese characters and read in Kim Mun pronunciation — a written register that is Chinese in script and Mienic in language, and one of the few cases in this family of a text tradition older than the twentieth century.`],
       t:[["Ming–Qing","Lanten communities cultivate indigo across the Guangxi–Yunnan hills"],
          ["19th–20th c.","Migration into Vietnam, Laos and Thailand"],
          ["1950s–","Chinese descriptive work; the Hainan community is documented"],
          ["1995–1999","ca. 400,000 in the reference infobox, against ≈261,000 in its own prose"]],
       kids:[]},


     { id:"biaomin", en:"Biao Min (Biao-Jiao Mien)", nat:"Biao-Jiao Mien", zh:"标敏方言", py:"Biāomǐn fāngyán", sp:"43,000 (1995), by source",
       region:"The Guangxi–Hunan borderland, around Quanzhou and Gongcheng",
       cls:"c-min",
       mk:[[25.93,111.07,"Quanzhou (Guangxi)"],[24.83,110.83,"Gongcheng (Guangxi)"],[26.15,111.60,"Hunan borderland"]],
       h:[`Biao Min is a Mienic language of the Guangxi–Hunan borderland, conventionally divided into a northern and a southern variety and placed in the branch's outer group alongside Dzao Min rather than with Iu Mien and Kim Mun. It is a Yao language in the administrative sense, spoken by communities in the hills around Quanzhou and Gongcheng.`,
          `Its interest for the family's classification is that it sits between the two Mienic groupings: close enough to Iu Mien to be obviously Mienic, far enough that the shared vocabulary is not sufficient for intelligibility. Its two varieties — Biao Min proper and Jiaogong Mian — are, in the reference account's own words, "evidently not mutually intelligible", which is why they share a single ISO code (<code>bje</code>) despite that. The reference count is 43,000 speakers (1995).`],
       t:[["Ming–Qing","Yao communities settle the Guangxi–Hunan borderland"],
          ["1950s–","Chinese descriptive work identifies Biao Min as a distinct Mienic variety"],
          ["1995","43,000 speakers, in the reference count"],
          ["Today","Two varieties, registered under one ISO code"]],
       kids:[]},

     { id:"dzaomin", en:"Dzao Min (Zaominic)", nat:"Ba Pai", zh:"藻敏方言", py:"Zǎomǐn fāngyán", sp:"60,000 (1995), by source",
       region:"North-western Guangdong, around Liannan and Ruyuan",
       cls:"c-min",
       mk:[[24.57,112.43,"Liannan (Guangdong)"],[24.78,113.28,"Ruyuan (Guangdong)"],[24.20,112.80,"North-west Guangdong"]],
       h:[`Dzao Min is the Mienic language of north-western Guangdong, in the Yao districts around Liannan and Ruyuan. The reference account groups it with Yangchun Pai Yao as <b>Zaominic</b>, a subgroup within Mienic rather than a single language, and that grouping is the branch's most recent internal proposal — which is why the atlas names the subgroup in the node's title.`,
          `It is one of the branch's more peripheral members geographically, sitting east of the Mienic core in an area where Sinitic pressure has been heaviest for longest. Its speakers are Yao administratively, Mienic linguistically, and the reference count is 60,000 (1995). Its autonym, <em>Ba Pai</em>, is what the atlas's script slot shows; the Chinese name 藻敏 is a classification label rather than a name its speakers use.`],
       t:[["Ming–Qing","Yao communities are established in the north-west Guangdong hills"],
          ["1950s–","Descriptive work separates Dzao Min from the other Mienic varieties"],
          ["1995","60,000 speakers, in the reference count"],
          ["Today","Grouped with Yangchun Pai Yao as Zaominic"]],
       kids:[]},

     { id:"biaomon", en:"Biao Mon (Changping Mien)", zh:"标曼方言", py:"Biāomàn fāngyán", sp:"20,000 (1995), by source",
       region:"The Guangxi–Hunan borderland; the least documented of the Mienic languages",
       cls:"c-mie",
       mk:[[24.31,109.42,"Guangxi"],[26.15,111.60,"Hunan borderland"]],
       h:[`Biao Mon is the least documented member of the Mienic branch, named in the reference account's list of five but with little published description. It is spoken in the same Guangxi–Hunan borderland as Biao Min, by communities classified as Yao, and it is conventionally placed closer to the Iu Mien–Kim Mun grouping than to the Biao Min–Dzao Min one.`,
          `The atlas includes it because omitting it would misrepresent the branch: a five-member list with one member dropped is not the same claim as a four-member branch. Its reference count is 20,000 speakers (1995) and its autonym is given in the literature as [bjau31 moːn31] — a phonetic form rather than a written one, because the language has no established orthography. That is why this node's script slot is empty while its neighbours' are not: the atlas shows a written form only where one exists.`],
       t:[["1950s–","Named in descriptive surveys of the Mienic varieties"],
          ["1995","20,000 speakers, in the reference count"],
          ["Today","No established orthography; described phonetically rather than in writing"]],
       kids:[]}
    ]},


  { id:"diaspora", en:"Hmong–Mien diaspora", zh:"苗瑶离散社群", py:"Miáoyáo lísàn shèqún", sp:"≈400,000, by source",
    region:"The United States, France and French Guiana, after the refugee movement of 1975 and after",
    cls:"c-dia",
    mk:[[36.75,-119.77,"Fresno, California"],[44.95,-93.09,"St Paul, Minnesota"],[38.58,-121.49,"Sacramento, California"],[4.94,-52.33,"Cayenne, French Guiana"],[48.86,2.35,"Paris"]],
    h:[`The family's diaspora is a product of one war. The Hmong of Laos fought on the royalist side through the 1960s and early 1970s, and when the Pathet Lao took power in 1975 a large part of that population crossed into Thailand. Camps along the border held them for years, and resettlement agreements then moved them to third countries — above all the United States, but also France and French Guiana, both of which had Indochinese connections from the colonial period.`,
       `The result is a family with two centres: the Chinese hill country, where the great majority of its speakers still live, and a set of Western communities that are small in absolute terms but culturally prominent, because they are the ones with publishing, broadcasting and university programmes in the languages. The atlas marks both ends — Fresno and St Paul in the United States, and Cayenne — and the caption notes that the far markers need the map panned or a node clicked to be seen.`],
    t:[["1960–1975","The Laotian Civil War; Hmong communities are drawn into the fighting"],
       ["1975","The Pathet Lao take power; large-scale movement into Thailand begins"],
       ["1975–1990s","Refugee camps in Thailand; resettlement in the United States, France and French Guiana"],
       ["1976–","Hmong communities form in California, Minnesota and Wisconsin"],
       ["2023","363,565 people of Hmong descent recorded in the United States"]],
    kids:[

     { id:"unitedstates", en:"Hmong Americans", zh:"美国苗族", py:"Měiguó Miáozú", sp:"363,565 (2023), by source",
       region:"California's Central Valley, Minnesota, Wisconsin, North Carolina and Oklahoma",
       cls:"c-dia",
       mk:[[36.75,-119.77,"Fresno, California"],[44.95,-93.09,"St Paul, Minnesota"],[43.07,-89.40,"Madison, Wisconsin"],[35.18,-80.84,"Charlotte, North Carolina"],[36.15,-95.99,"Tulsa, Oklahoma"]],
       h:[`The largest Hmong community outside Asia is in the United States: <b>363,565</b> people by the 2023 census count, concentrated in California's Central Valley — Fresno above all — and in the Twin Cities, with further communities in Wisconsin, North Carolina and Oklahoma. The first arrivals came in 1975–76; later waves followed through the 1980s and 1990s, mostly from the Thai camps.`,
          `The community is the reason the Hmong language has a modern written presence at all. Fresno and St Paul have Hmong-language broadcasting, school programmes and publishing, and both Pahawh Hmong and the Romanised Popular Alphabet are used in them. It is also where the language is being lost fastest: by the third generation, English is dominant, and the sources that count Hmong speakers in the United States disagree about how many are left. The atlas records the census figure for the population without claiming it is a figure for speakers.`],
       t:[["1975–1976","The first Hmong refugees arrive from the Thai camps"],
          ["1980s–1990s","Further resettlement waves; communities consolidate in California and Minnesota"],
          ["2000s–","Hmong-language broadcasting, school programmes and publishing"],
          ["2023","363,565 people of Hmong descent in the United States"]],
       kids:[]},


     { id:"guiana", en:"Hmong in French Guiana", zh:"法属圭亚那苗族", py:"Fǎshǔ Guīyànà Miáozú", sp:"by source — a few thousand",
       region:"The coastal strip of French Guiana, near Cayenne and along the Maroni",
       cls:"c-dia",
       mk:[[4.94,-52.33,"Cayenne"],[5.16,-52.65,"Kourou"],[5.50,-54.03,"Saint-Laurent-du-Maroni"]],
       h:[`French Guiana has the smallest of the family's three overseas communities and the least well documented. Hmong families were resettled there from the Thai camps in the late 1970s, largely as agricultural settlers, and they established villages in the coastal strip where they grow fruit and vegetables for the Cayenne market. The community is usually given as a few thousand people.`,
          `Its interest in this atlas is comparative. It is a Hmong-speaking community in a French overseas department, on the same continent as — and administratively part of the same state as — the Parisian Hmong community, and it has kept the language in agricultural village settings rather than losing it in an urban diaspora. The atlas marks it because a map that showed only Fresno and St Paul would be telling the American half of the story and presenting it as the whole.`],
       t:[["1975–1980s","Hmong families are resettled in French Guiana as agricultural settlers"],
          ["1980s–","Villages established on the coastal strip; market gardening around Cayenne"],
          ["Today","A few thousand speakers, in a community that has kept the language in village settings"]],
       kids:[]},

     { id:"laos", en:"Laos — where it began", zh:"老挝苗族", py:"Lǎowō Miáozú", sp:"by source",
       region:"The highlands of northern and central Laos, and the Thai border camps",
       cls:"c-dia",
       mk:[[19.89,102.13,"Luang Prabang"],[19.45,103.22,"Xieng Khouang — the war's centre"],[17.97,102.60,"Vientiane"],[17.87,102.75,"Nong Khai (the Thai border)"]],
       h:[`This node is in the atlas to hold the place where the diaspora story starts. The Hmong of Laos are the Chuanqiandian cluster that moved south-west into the Indochinese highlands over several centuries, and by the 1960s they were a substantial minority in the uplands of Xieng Khouang and the north. The Laotian Civil War put them at the centre of the fighting, and the consequences for the community — a large part of it displaced, a large part of it leaving, and those who stayed facing a difficult position after 1975 — are the reason this family's atlas has markers on other continents at all.`,
          `It is marked inside the diaspora branch rather than the Chuanqiandian one because that is what it became in the atlas's narrative: the origin point of a movement rather than a stable community. The Hmong still living in Laos are of course not a diaspora, and the node's prose says so rather than letting the tree's position imply otherwise.`],
       t:[["16th–18th c.","Hmongic populations move into the Laotian highlands"],
          ["1893–1954","French Laos; the Hmong are a substantial upland minority"],
          ["1960–1975","The Laotian Civil War; Xieng Khouang is a centre of the fighting"],
          ["1975","The Pathet Lao take power; large-scale displacement follows"],
          ["Today","A Hmong population remains in Laos, alongside the overseas communities"]],
       kids:[]}
    ]}
  ]};


/* ---------- ISO 639-3 codes (SIL) — the codes behind the Forvo links ---------- */
const ISO = {
 hmongmien:'hmx (family) · hmn (macrolanguage)', protohm:'—', hmongic:'hmn (branch)',
 xong:'mmr · muq', hmu:'hea · hmq · hms · neo', ahmao:'hmd',
 chuanqiandian:'hmn', hmongdaw:'mww', hmongnjua:'hnj',
 bunu:'— (its varieties are registered separately)', bahengic:'pha', she:'shx',
 mienic:'ium · mji · bje · bmt · bpn (branch)', iumien:'ium', kimmun:'mji',
 biaomin:'bje', dzaomin:'bpn', biaomon:'bmt',
 diaspora:'—', unitedstates:'—', guiana:'—', laos:'—'
};

/* ---------- what makes each variety distinctive: structure, not history ---------- */
const FEATURES = {
 hmongmien:[
  `<b>Tone everywhere, and a lot of it.</b> Both branches are strongly tonal; the proto-language's tone categories are reconstructable and their reflexes are regular, which is what makes the family a family.`,
  `<b>Monosyllabic and analytic</b> — little inflection, and grammatical relations carried by word order and particles rather than by suffixes.`,
  `<b>Chinese vocabulary in quantity.</b> Long contact with Sinitic has put a large Chinese-derived layer in every branch, which is one reason classification was difficult for so long.`,
  `<b>Two invented scripts, unrelated to each other</b>: the Pollard script (abugida, ca. 1936) and Pahawh Hmong (semisyllabary, 1959). Neither descends from the other.`,
  `<b>Administrative labels that do not match the languages</b> — Miao and Yao cover far more people than speak Hmongic or Mienic, in both directions.`
 ],
 protohm:[
  `<b>Reconstructable tone system</b> — the strongest evidence for the family, and the reason Hmongic and Mienic are grouped together at all.`,
  `<b>Homeland by inference</b>: the middle Yangtze basin, argued from vocabulary and later geography rather than from any document.`,
  `<b>No proto-text</b> — nothing written in this family predates the twentieth century.`
 ],
 hmongic:[
  `<b>The larger and messier branch.</b> The reference account names five divisions and then adds "possibly other, unclassified branches".`,
  `<b>Geographically a scatter, not a block</b> — a thousand kilometres of upland, from Hunan to the Indochinese highlands.`,
  `<b>Two large members and a long tail</b>: Xong and Hmu have hundreds of thousands of speakers; most others have thousands.`
 ],
 xong:[
  `<b>Around 900,000 speakers</b> — one of the branch's two large languages.`,
  `<b>Two varieties, two codes</b>: Western Xong proper (mmr) and Eastern Suang (muq).`,
  `<b>Outliers far from the Hunan core</b>, in Guizhou, Hubei, Guangxi and Chongqing.`,
  `<b>Written in a Romanisation</b>; no indigenous script.`
 ],
 hmu:[
  `<b>The basis of "Standard Miao"</b> in Chinese practice, with the largest descriptive and pedagogical corpus of any Hmongic language.`,
  `<b>Registered as four codes</b>: Northern (hea), Eastern (hmq), Southern (hms) and Ná-Meo (neo, in Vietnam) — one language, four register entries.`,
  `<b>A rebellion in its history</b>: the Miao uprising of 1854–1873 devastated the Guizhou core.`
 ],
 ahmao:[
  `<b>The Pollard script's home language</b>, and the reason that abugida survived into the twenty-first century.`,
  `<b>An abugida with the vowel as the organising element</b> — the consonant is the attached mark, the opposite of the Brahmic arrangement.`,
  `<b>The script spread beyond A-Hmao</b> to Lipo, Sichuan Miao and Nasu.`,
  `<b>Written in both Pollard and a Romanisation</b> today.`
 ],
 chuanqiandian:[
  `<b>The branch that left China</b> — the Hmong of Laos, Vietnam, Thailand and Myanmar, and the source of the Western diaspora.`,
  `<b>A dialect continuum named for three provinces</b> (Sichuan, Guizhou, Yunnan), which the continuum does not respect.`,
  `<b>Several Latin standards plus Pahawh Hmong</b>, so the same language appears in print under different spellings depending on who introduced literacy.`,
  `<b>4.5 million speakers</b> in the reference count — most of the family.`
 ],
 hmongdaw:[
  `<b>The variety behind the Romanised Popular Alphabet</b> (RPA), the most widely used Hmong orthography.`,
  `<b>Tone written as a final consonant letter</b> — the last letter of a written word is usually a pitch instruction, not a consonant.`,
  `<b>A creaky register</b>, and in some varieties a breathy one, which RPA encodes by doubling a letter.`,
  `<b>Voiceless nasals and prenasalised stops</b> in quantity — the family's signature sound inventory.`
 ],
 hmongnjua:[
  `<b>The other main division</b> of Chuanqiandian, distinguished by dialect, dress and lexicon.`,
  `<b>A distinction the communities themselves make</b>, not a linguist's convenience — which is why it gets its own node.`,
  `<b>Less than fully mutually intelligible with White Hmong</b> in some areas.`
 ],
 bunu:[
  `<b>359,474 speakers and no ISO code of its own</b> — the varieties are registered separately.`,
  `<b>Speakers are Yao administratively and Hmongic linguistically</b> — the mismatch in its clearest form.`,
  `<b>Three named varieties</b>: Dongnu, Nunu and Bunuo, in a Bu–Nao grouping.`
 ],
 bahengic:[
  `<b>Pa-Hng is the family's least endangered language</b> — UNESCO grades it Vulnerable, where everything else in this atlas is endangered or worse.`,
  `<b>33,610 speakers</b>, with its own ISO code (pha).`,
  `<b>A branch in its own right</b>, not a subgroup of one of the large divisions.`
 ],
 she:[
  `<b>910 speakers against 710,000 ethnic She</b> — the starkest label-versus-language mismatch in the family.`,
  `<b>Survives in four Guangdong districts</b> — Zengcheng, Boluo, Huidong and Haifeng — because those communities stayed out of the main Hakka migration currents.`,
  `<b>Most ethnic She now speak Sinitic</b>: Hakka, or the separate She Chinese of Zhejiang and Fujian.`,
  `<b>Grouped with Pana in Sheic</b>, not with any of the large Hmongic divisions.`
 ],

 mienic:[
  `<b>Five members, and its internal shape is not much disputed</b> — unlike Hmongic.`,
  `<b>Iu Mien and Kim Mun form one grouping</b>, with Biao Min and Dzao Min outside it.`,
  `<b>The family's most successfully maintained diaspora</b>: Iu Mien in California and the Pacific Northwest.`,
  `<b>Kim Mun has a text tradition in Chinese characters</b> read in Kim Mun pronunciation — rare in this family.`
 ],
 iumien:[
  `<b>Has a standard</b>: the dialect of Changdong in Jinxiu Yao Autonomous County, Guangxi, used in the county's bilingual education.`,
  `<b>837,400 speakers</b> in the reference count — the largest Mienic language.`,
  `<b>Written in a missionary-derived Romanisation</b>, and reported as better maintained in the United States than Hmong.`
 ],
 kimmun:[
  `<b>Its own figures contradict each other</b>: ca. 400,000 in the reference infobox against ≈261,000 in that source's own prose.`,
  `<b>Indigo growers</b> — the name Lanten or Landian comes from the dye crop.`,
  `<b>Daoist ritual texts in Chinese characters</b>, read aloud in Kim Mun pronunciation: a written register Chinese in script and Mienic in language.`
 ],
 biaomin:[
  `<b>Two varieties under one code</b> (bje) that are, in the source's words, "evidently not mutually intelligible".`,
  `<b>43,000 speakers</b>, in the Guangxi–Hunan borderland.`,
  `<b>Outside the Iu Mien–Kim Mun grouping</b>, nearer Dzao Min.`
 ],
 dzaomin:[
  `<b>The Mienic language of north-western Guangdong</b>, around Liannan and Ruyuan.`,
  `<b>Grouped with Yangchun Pai Yao as Zaominic</b> — the branch's most recent internal proposal.`,
  `<b>Its autonym is Ba Pai</b>; the Chinese 藻敏 is a classification label, not a name its speakers use.`
 ],
 biaomon:[
  `<b>The least documented Mienic language</b>, with 20,000 speakers in the reference count.`,
  `<b>No established orthography</b> — the autonym is recorded phonetically as [bjau31 moːn31], which is why this node's script slot is empty.`,
  `<b>Included because a five-member list with one member dropped is a different claim</b> from a four-member branch.`
 ],
 diaspora:[
  `<b>One war produced all of it</b> — the Laotian Civil War and the 1975 change of government.`,
  `<b>Small in numbers, prominent in publishing</b>: the Western communities are where the languages have broadcasting, school programmes and university teaching.`,
  `<b>Three destinations</b>: the United States (largest), France, and French Guiana.`
 ],
 unitedstates:[
  `<b>363,565 people of Hmong descent</b> (2023 census) — the largest Hmong community outside Asia.`,
  `<b>Two centres</b>: California's Central Valley (Fresno) and the Twin Cities (St Paul).`,
  `<b>Where the written language lives</b>: broadcasting, publishing and school programmes in both RPA and Pahawh Hmong.`,
  `<b>The census counts people, not speakers</b> — the atlas says so rather than presenting it as a speaker figure.`
 ],
 guiana:[
  `<b>Agricultural settlers</b>, resettled from the Thai camps in the late 1970s and growing market produce for Cayenne.`,
  `<b>Kept the language in village settings</b>, unlike the urban diaspora communities.`,
  `<b>A few thousand speakers</b>, and the least documented of the three overseas communities.`
 ],
 laos:[
  `<b>The origin point of the diaspora</b>, not a diaspora itself — and the node says so.`,
  `<b>Xieng Khouang was the centre of the fighting</b> in the 1960s and early 1970s.`,
  `<b>Hmong people remain in Laos</b>, alongside the overseas communities.`
 ]
};


/* ---------- schematic outline (simplified, embedded; [lng,lat] rings) ----------
   Drawn by hand for this atlas: the southern-China hill country, Hainan, and a
   coarse Indochina block so the Laos and Vietnam markers are not floating in
   space. Not a coastline survey — see the sketch caption. */
const CHINA_SOUTH = [[97.8,29.2],[102.0,29.6],[106.0,30.6],[109.6,31.2],[112.6,30.2],[114.6,28.6],[116.6,27.2],[117.6,25.6],[116.2,23.6],[114.2,22.4],[112.0,21.4],[108.0,21.2],[106.4,22.4],[105.2,23.4],[103.8,22.8],[102.6,22.2],[101.2,21.6],[99.8,21.6],[98.6,23.2],[97.6,25.4],[97.8,27.4],[97.8,29.2]];
const HAINAN = [[108.6,20.1],[110.6,20.1],[111.0,18.4],[109.2,18.2],[108.6,19.2],[108.6,20.1]];
const INDOCHINA = [[99.0,22.5],[102.0,22.6],[105.0,23.3],[107.0,22.0],[109.0,21.5],[109.5,18.0],[109.0,15.0],[107.0,11.0],[105.0,9.0],[103.0,10.5],[101.0,12.5],[99.5,15.0],[98.0,17.5],[97.5,19.0],[98.5,21.5],[99.0,22.5]];
const HM_GEO = { type:'FeatureCollection', features:[CHINA_SOUTH,HAINAN,INDOCHINA].map(r=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };

/* ---------- approximate "core areas" ----------
   Hand-drawn coarse blocks showing roughly where each branch is rooted — NOT
   surveyed boundaries. The Hmongic blocks in particular are a scatter of
   settlements across upland, not territories: the atlas's own prose says the
   languages form a scatter rather than a block. The marker layer is the
   factual one. */
const AREAS = {
 'c-anc':[[[98.0,29.0],[106.0,30.5],[112.0,29.0],[113.0,26.0],[108.0,24.0],[102.0,24.5],[98.0,26.0]]],
 'c-hmo':[[[104.0,29.0],[110.0,30.0],[114.0,28.0],[112.0,25.0],[107.0,24.0],[104.0,25.5]]],
 'c-xon':[[[109.5,30.0],[113.5,29.5],[113.0,26.8],[110.0,26.5]]],
 'c-hmu':[[[105.0,28.5],[109.5,29.0],[109.5,26.0],[105.0,25.5]]],
 'c-ahm':[[[103.0,28.0],[107.5,28.0],[107.5,25.0],[103.0,25.0]]],
 'c-cqd':[[[101.0,25.0],[106.5,25.5],[107.0,22.5],[103.0,21.5],[101.0,22.5]],
          [[101.5,22.5],[105.0,22.6],[106.0,20.0],[103.0,18.0],[100.5,19.5]]],
 'c-bun':[[[105.5,26.5],[110.0,26.5],[110.5,23.5],[106.0,23.0]]],
 'c-she':[[[113.0,23.7],[115.6,23.7],[115.6,22.6],[113.0,22.6]]],
 'c-mie':[[[108.5,26.5],[112.5,26.5],[112.5,23.5],[108.5,23.5]]],
 'c-min':[[[110.5,26.0],[113.0,25.5],[113.0,23.5],[110.5,23.5]]],
 'c-dia':[
  [[-120.5,37.5],[-118.5,37.5],[-118.5,35.8],[-120.5,35.8]],
  [[-94.0,45.5],[-92.0,45.5],[-92.0,44.0],[-94.0,44.0]],
  [[-53.0,5.5],[-51.5,5.5],[-51.5,4.3],[-53.0,4.3]]
 ]
};


/* ---------- listen links: an Omniglot page where one exists, plus the engine's
   YouTube-search fallback on every node. Omniglot coverage for this family is
   three pages — hmong, yao and she — and the URLs were checked 2026-09-26; see
   research.md, HM-109 "Link health". ---------- */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 hmongmien:   [['Hmong–Mien — Omniglot family index', OM+'langfam.htm'], ['Hmong — Omniglot', OM+'hmong.htm']],
 protohm:     [],
 hmongic:     [['Hmong — Omniglot', OM+'hmong.htm']],
 xong:        [['Hmong — Omniglot (covers the Hmongic group)', OM+'hmong.htm']],
 hmu:         [['Hmong — Omniglot', OM+'hmong.htm']],
 ahmao:       [['Hmong — Omniglot', OM+'hmong.htm']],
 chuanqiandian:[['Hmong — Omniglot (with alphabet and sample text)', OM+'hmong.htm']],
 hmongdaw:    [['Hmong — Omniglot (with Pahawh Hmong)', OM+'hmong.htm']],
 hmongnjua:   [['Hmong — Omniglot', OM+'hmong.htm']],
 bunu:        [],
 bahengic:    [],
 she:         [['She — Omniglot', OM+'she.htm']],
 mienic:      [['Yao — Omniglot', OM+'yao.htm']],
 iumien:      [['Yao / Iu Mien — Omniglot', OM+'yao.htm']],
 kimmun:      [['Yao — Omniglot (covers the Mienic group)', OM+'yao.htm']],
 biaomin:     [],
 dzaomin:     [],
 biaomon:     [],
 diaspora:    [['Hmong — Omniglot', OM+'hmong.htm']],
 unitedstates:[['Hmong — Omniglot', OM+'hmong.htm']],
 guiana:      [],
 laos:        [['Hmong — Omniglot', OM+'hmong.htm']]
};

/* ===================== the atlas contract (languages.md §1.3) ===================== */
window.ATLASES = window.ATLASES || {};
window.ATLASES.hmongmien = {
  key: 'hmongmien',
  title:   { zh: '苗瑶语族', en: 'Hmong–Mien' },
  tagline: 'The tone-heavy hill languages of southern China — two invented scripts, one long migration, and a diaspora on three continents',
  stats:   [['22', 'nodes in this atlas'], ['≈6 million', 'speakers, by source'], ['2', 'scripts invented in the 20th c.']],
  palette: {
    anc: '#c9c2cf', hmo: '#a349a4', xon: '#c47fc5', hmu: '#d8bfd8', ahm: '#8e3a8f',
    cqd: '#ff7f27', bun: '#8b5a2b', she: '#fc89b1', mie: '#55d400', min: '#3f48cc', dia: '#c9a24f'
  },
  legend:  [['anc','Proto-Hmong–Mien'],['hmo','Hmongic (Miao) — the branch'],['xon','Xong'],['hmu','Hmu'],['ahm','A-Hmao — Pollard script'],['cqd','Chuanqiandian Hmong'],['bun','Bunu · Bahengic'],['she','She'],['mie','Mienic (Yao) — the branch'],['min','Biao Min · Dzao Min'],['dia','Diaspora']],
  view:    { center: [107, 25], zoom: 4.2 },
  outline: { color: '#a349a4', fill: 'rgba(163,73,164,0.06)' },
  sketchGeo: HM_GEO,
  captions: {
    note:   '● Markers show <b>representative localities</b> where the selected variety is rooted, plus diaspora points at Fresno, St Paul, Sacramento and Cayenne. For the Hmongic languages in particular a marker means <em>a district where the language is present</em> — the scatter is real, and no marker implies a territory. Clicking any node fits the map to that node’s markers, which is how the American and Guianese points are reached from the initial view.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — coarse hand-drawn blocks showing roughly where each branch is rooted. Hmongic boundaries are the least surveyable in this atlas: the languages form a scatter across upland, and the blocks here deliberately omit enclaves and the many small localities outside them. The marker layer is the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn southern-China hill country, Hainan and a coarse Indochina block, simplified from memory of the geography; the markers sit at true coordinates. The American and Guianese markers lie outside this outline by design, since the atlas’s own subject extends there. Works fully offline.'
  },
  fonts: ['Noto Sans Pahawh Hmong', 'Noto Sans Miao', 'Noto Serif SC'],
  filterPlaceholder: 'e.g. Hmong, Mien, She, Bunu, Pahawh…',
  listen: {
    om: 'https://www.omniglot.com/writing/',
    fv: 'https://forvo.com/languages/',
    search: 'Hmong language native speaker'
  },
  rootId: 'hmongmien',
  stages: ['protohm'],
  sources: 'Sources: M. Ratliff, <i>Hmong-Mien Language History</i> (2010) · K. Iwata on Hmong–Mien correspondences · R. K. Sprigg and the Chinese descriptive tradition on the Miao varieties · S. Pollard and the history of the Pollard script · W. Smalley, C. Vang and G. Y. Yang, <i>Mother of Writing: The Origin and Development of a Hmong Messianic Script</i> (1990) on Pahawh Hmong · J. Lemoine’s nineteenth-century notes, cited as historiography rather than as data · the UNESCO <i>Atlas of the World’s Languages in Danger</i> for the Pa-Hng and She grades · Ethnologue and Glottolog for ISO 639-3 codes and counts. Two things in this atlas are deliberately not resolved: Kim Mun’s own sources disagree with each other about its speaker count (ca. 400,000 in the infobox against ≈261,000 in the same source’s prose), and the brief’s phrase "the lantern-writing tradition" could not be verified against any source and has been cut. Both are recorded in research.md at HM-106 and HM-107.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();

