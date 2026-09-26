/* atlas-sinitic.js — Sinitic 汉语
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html. Phase 0 extraction: the DATA / ISO /
 * FEATURES / SOUND / AREAS tables and the schematic outline below are lifted
 * *verbatim* from ChineseLanguagesMap.html (frozen v1), so this atlas renders
 * exactly what v1 rendered. Prose and figures predate the research protocol in
 * languages.md §1.6 — see the "Sinitic retrofit" section of research.md.
 *
 * Loaded by injecting <script src="atlas-sinitic.js"> — no fetch(), so it works
 * from file:// and from GitHub Pages with one code path (languages.md §1.2).
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree ===================== */
const DATA = {
 id:"sinitic", en:"Chinese (Sinitic)", zh:"汉语", py:"Hànyǔ", sp:"~1.4 billion",
 region:"China, Taiwan, Singapore and overseas Chinese communities worldwide", cls:"c-anc", mk:[],
 h:[`Chinese — the <em>Sinitic</em> branch of the Sino-Tibetan family — is one of the world's great language lineages, with roughly 1.4 billion speakers. What are popularly called "dialects" are in reality a spectrum of languages as mutually unintelligible as those of Romance: a Beijing speaker cannot understand Wenzhounese or Taishanese without study.`,
   `The writing system, continuous since the oracle bones of ca. 1250 BCE, historically unified these varieties: for two millennia, literate speakers of mutually unintelligible speech read the same classics. The standard scholarly map — the <em>Language Atlas of China</em> (1987, revised 2012) — recognises ten main branches (older textbooks still teach seven or eight; the Atlas promoted Jin, Hui and Ping on phonological grounds), preceded here by the three attested ancestral stages from which they descend. Fieldwork has since become a race against time: the 中国语言资源保护工程 (Chinese Language Resources Protection Project, launched 2015) has recorded 1,700-plus survey points, while everyday transmission in the cities collapses.`],
 t:[["c. 1250 BCE","Earliest attested Chinese: Shang 甲骨文 jiǎgǔwén oracle-bone inscriptions"],
    ["601 CE","《切韵》 Qièyùn rhyme dictionary fixes the Middle Chinese reading"],
    ["1932 / 1955–56","Beijing-based standard adopted: 1932 《国音常用字汇》, PRC 普通话 definition 1955–56"]],
 kids:[
  { id:"ancient", en:"Ancestral stages", zh:"古", py:"", sp:"attested & reconstructed", region:"The historical record", cls:"c-anc", mk:[],
    h:[`Not living varieties, but the attested ancestors and reconstructions behind every branch below.`], kids:[
   { id:"old", en:"Old Chinese", zh:"上古", py:"Shànggǔ Hànyǔ", sp:"—", region:"Yellow River basin, Zhou through Han dynasties", cls:"c-anc",
     mk:[[34.34,108.94,"Wei valley – Qinling heartland"]],
     h:[`Old Chinese — the language of the Zhou court, the <em>Book of Songs</em> and the earliest classics — is reconstructed from <em>Shijing</em> 《诗经》 rhymes, character phonetics and Sino-Tibetan comparison (Baxter–Sagart; 郑张尚芳 Zhèngzhāng Shàngfāng). It differs radically from any living variety: consonant clusters (*kl-, *pl-), prefix syllables, and — in most current theories — <em>no lexical tones at all</em>. The tones of every modern variety later arose by "tonogenesis" (梅祖麟 Méi Zǔlín, 1970) from the loss of finals such as *-s and *-ʔ.`,
       `Under Qin and Han (221 BCE onward) this ancestral speech first moved south of the Yangtze: Qin sent hundreds of thousands of conscripts into Lingnan after 214 BCE (the moment the 灵渠 Língqú Canal was cut), and Han armies extinguished 闽越 Mǐnyuè (110 BCE) and 南越 Nányuè (111 BCE). Those garrisons planted Chinese in Fujian and Guangdong — where their descendants, isolated from later northern changes, became the deep strata of Min and Yue.`],
     t:[["c. 1250 BCE","Oracle-bone inscriptions of the Shang"],
        ["214 BCE","Qin conquest of Lingnan; garrisons settle the far south"],
        ["110 BCE","Han destroy Minyue; Chinese foothold established in Fujian"]]},
   { id:"middle", en:"Middle Chinese", zh:"中古", py:"Zhōnggǔ Hànyǔ", sp:"—", region:"Sui–Tang literary standard, exported across East Asia", cls:"c-anc",
     mk:[[34.34,108.94,"Chang'an"],[34.62,112.45,"Luoyang"],[32.06,118.8,"Jiankang (Nanjing)"]],
     h:[`Middle Chinese is the reading tradition of the Sui and Tang, captured with famous precision in the rhyme dictionary 《切韵》 <em>Qièyùn</em> (601 CE), compiled by 陆法言 Lù Fǎyán and eight colleagues who reconciled the literary readings of the northern and southern courts. Its sound system — four tone classes, full sets of voiced obstruents, and finals <em>-p, -t, -k, -m</em> — is documented in rhyme tables like the 《韵镜》 <em>Yùnjìng</em> and survives in the "Sino-Xenic" strata of Japanese, Korean and Vietnamese, and in the checked tones of modern Cantonese.`,
       `Most modern branches descend from the regional spoken Middle Chinese of their area, and their innovations are predictable: northern varieties devoiced the stops and lost the checked tones; southern ones kept them wholly or partly. The great exception is <em>Min</em>, whose everyday layer split off before the Qieyun synthesis existed.`],
     t:[["601 CE","Lu Fayan compiles the Qieyun"],
        ["7th–9th c.","Tang koine spreads; readings borrowed into Japanese, Korean, Vietnamese"],
        ["1127","Fall of the Northern Song drives the prestige standard south to Hangzhou"]]},
   { id:"oldmand", en:"Old Mandarin", zh:"早期官话", py:"", sp:"—", region:"North China, Jin–Yuan period", cls:"c-gu",
     mk:[[39.9,116.4,"Dadu (Beijing)"],[34.75,113.6,"Kaifeng"]],
     h:[`The ancestor of today's Mandarin — of that branch alone, not of the other nine — was forged after 1127, when the Jurchen Jin and then the Mongol Yuan ruled a north cut off from the southern court. Northern speech changed swiftly: voiced obstruents devoiced, the entering tone vanished, *-m merged into *-n. The rhyme book 《中原音韵》 <em>Zhōngyuán Yīnyùn</em> (1324, 周德清 Zhōu Déqīng) already records this "Old Mandarin" — four tones, no checked tone — the language of Yuan <em>zájù</em> 雜劇 drama and of the Mongol-era capital Dadu. The Ming and Qing koines of Nanjing and Beijing descend from it.`],
     t:[["1127","North China passes to Jurchen Jin rule"],
        ["1324","Zhongyuan Yinyun records Old Mandarin phonology"],
        ["1368 / 1644","Nanjing, then Beijing, become dynastic capitals"]]},
  ]},
 { id:"guanhua", en:"Mandarin", zh:"官", py:"Guānhuà", sp:"≈800–940 million L1 (by source)",
    region:"Northern, central & southwestern China — ~70% of all Chinese speakers", cls:"c-gu",
    mk:[[39.9,116.4,"Beijing"],[34.75,113.6,"Zhengzhou"],[30.57,104.07,"Chengdu"]],
    h:[`Mandarin (官话 <em>guānhuà</em>, "officials' speech") is the largest Sinitic branch: its eight subgroups cover the North China plain, the Northwest, the Yangtze corridor and the southwest — about 70% of all Chinese speakers. Its name records its history: it spread as the koinè of imperial bureaucracy, exam candidates, military colonies and long-distance trade, while the sedentary south preserved older, more fragmented lineages.`,
      `Two innovations unite most of it: the voiced stops of Middle Chinese devoiced, and the entering tone (入声 rùshēng) vanished, its words scattered among the surviving tones — though the Jianghuai subgroup keeps a reduced 入声, so the criterion is a strong tendency, not a law. Standard Chinese (普通话 Pǔtōnghuà / 國語 Guóyǔ) is simply one variety of one subgroup — Beijing Mandarin — elevated in the 20th century. The map of Mandarin's subgroups is largely a map of dynastic history: old capitals in the central plains, Ming garrisons in the southwest, and 19th-century pioneers in Manchuria.`],
    t:[["1324","Zhongyuan Yinyun records the northern koinè"],
       ["1368–1644","Mandarin spreads south with Ming officialdom and garrisons"],
       ["1932 / 1955–56","Beijing-based standard adopted in China (普通话) and Taiwan (國語)"]],
    kids:[
     { id:"beifang", en:"Northern group", zh:"北", py:"Běifāng Guānhuà", sp:"≈260 million", region:"Manchuria, Hebei, Shandong (Tianjin belongs to Ji–Lu)", cls:"c-gu", mk:[],
       h:[`Four subgroups — Northeastern, Beijing, Ji–Lu and Jiaoliao — form the homogeneous north: big plains, constant movement, recent settlement. Differences are shallow and mutual intelligibility near-total.`], kids:[
      { id:"dongbei", en:"Northeastern", zh:"东", py:"Dōngběi Guānhuà", sp:"≈90 million", region:"Heilongjiang, Jilin, NE Inner Mongolia, N Liaoning", cls:"c-gu",
        mk:[[45.75,126.65,"Harbin"],[43.88,125.32,"Changchun"],[41.8,123.43,"Shenyang"]],
        h:[`The youngest dialect zone in China. The Qing reserved Manchuria behind the 柳条边 Liǔtiáobiān ("Willow Palisade"), barring most Han settlement until the ban eroded after 1860. Tens of millions then flooded north from overpopulated Shandong and Zhili in the migration remembered as <em>Chuǎng Guāndōng</em> (闯关东, "crashing into the passes east").`,
          `Because settlement is barely a century old and mixed speakers from many northern origins, Northeastern Mandarin is remarkably homogeneous. Manchu left solid traces in vocabulary — 靰鞡 wùla "fur-lined boot", 哈拉巴 hālabā "shoulder-blade", 嘎拉哈 gālahà "knucklebone game" — and in toponyms like Jilin (from Manchu <em>Girin ula</em>). Popular lists also credit everyday words such as 邋遢 lāta "slovenly" to Manchu, but 邋遢 is attested in Ming and earlier vernacular writing, so that attribution is disputed. Harbin and Dalian absorbed small Russian and Japanese loan layers.`],
        t:[["1668–1860","Qing closure of Manchuria to Han settlement"],
           ["1860–1930","Chuang Guandong mass migration from Shandong/Hebei"]]},
      { id:"beijingmd", en:"Beijing", zh:"京", py:"Jīngxiāng", sp:"≈35 million", region:"Beijing & surrounding Hebei and Inner Mongolia (Chengde, Chifeng)", cls:"c-gu",
        mk:[[39.9,116.4,"Beijing"],[40.97,117.94,"Chengde"],[42.26,118.96,"Chifeng"]],
        h:[`The prestige variety of modern China. Beijing's speech rose with the city: Jurchen Jin capital from 1153, Mongol Dadu, Ming–Qing Beijing. Conquest dynasties, garrisons and the court layered its speech; contacts with Mongol and Manchu speakers are popularly credited with pervasive <em>érhuà</em> (儿化, the er-suffix) and light syllables, though scholars debate how deep that influence really was.`,
          `In 1913 China's 读音统一会 Commission on Unification of Reading met to settle a national standard; after years of dispute, the 1932 <em>Guóyīn Chángyòng Zìhuì</em> (《国音常用字汇》) conceded living Beijing phonology outright. The PRC's 1955 definition of 普通话 Pǔtōnghuà — "Beijing pronunciation as the standard" — sealed its global reach: it is now a second language for nearly every Chinese person.`],
        t:[["1153 / 1267","Jin Zhongdu, then Yuan Dadu, established at Beijing"],
           ["1913","读音统一会 Commission on Unification of Reading convenes"],
           ["1932","《国音常用字汇》 Guóyīn Chángyòng Zìhuì adopts the Beijing-based new guoyin"],
           ["1955–56","Putonghua (普通话) standard defined and promoted nationwide"]]},
      { id:"jiaoliao", en:"Jiaoliao", zh:"胶", py:"Jiāoliáo Guānhuà", sp:"≈25 million", region:"Shandong peninsula & Liaodong peninsula across the Bohai", cls:"c-gu",
        mk:[[37.54,121.39,"Yantai"],[37.51,122.12,"Weihai"],[38.91,121.61,"Dalian"],[39.998,123.429,"Dandong"]],
        h:[`A dialect split in two by a sea. Jiaoliao Mandarin spans the Shandong Peninsula (Jiao) and the Liaodong (Liao) peninsula opposite, because the Bohai Strait was a highway, not a barrier: centuries of fishing and the great Shandong-to-Manchuria boat migrations carried peninsula speech to ports like Dalian and Dandong.`,
          `Its tone patterns and vocabulary diverge noticeably from the Ji–Lu plain behind it, marking it as a coastal bridge between the north China plain and the new dialect frontier of Manchuria.`],
        t:[["1850s–1930","Mass boat migration carries Shandong speech to Liaodong"]]},
      { id:"jilu", en:"Ji–Lu", zh:"冀鲁", py:"Jìlǔ Guānhuà", sp:"≈110 million", region:"Hebei & Shandong plains, plus the Tianjin enclave", cls:"c-gu",
        mk:[[36.65,117,"Jinan"],[38.04,114.51,"Shijiazhuang"],[38.87,115.46,"Baoding"],[39.13,117.2,"Tianjin"]],
        h:[`The speech of the North China plain proper — Hebei (Ji) and Shandong (Lu), named for their old provincial abbreviations. It shades into Beijing Mandarin to the north and Zhongyuan Mandarin to the south; Tianjin, on its eastern edge, is a Ji–Lu enclave whose speech descends largely from Ming garrisons recruited in Anhui and Jiangsu (曾晓渝 Zēng Xiǎoyú's studies) — the origin of its famously comic cadence. Peasant, dense and ancient: this population was repeatedly crushed and replenished — Yellow River floods, the 14th-century 洪洞大槐树 Hóngdòng dàhuáishù resettlement legends, the 1942 Henan famine — yet its dialect remained the placid centre of gravity from which Northeastern and Jiaoliao speech were cast.`],
        t:[["1368–1417","Ming resettlements from Shanxi repopulate the plain"]]}
     ]},
     { id:"zhongyuan", en:"Zhongyuan", zh:"中原", py:"Zhōngyuán Guānhuà", sp:"≈150–190 million (by source)", region:"Middle & lower Yellow River: Henan, Shaanxi, Gansu, Qinghai, Ningxia, Xinjiang", cls:"c-gu",
       mk:[[34.75,113.6,"Zhengzhou"],[34.62,112.45,"Luoyang"],[34.34,108.94,"Xi'an"],[36.06,103.83,"Lanzhou"],[43.83,87.6,"Urumqi"],[36.62,101.77,"Xining"]],
       h:[`The largest Mandarin subgroup by area — and the oldest heartland. The central plains (中原 Zhōngyuán, "the middle districts") between Xi'an and Luoyang were the capital zone of Western Han, Sui and Tang; the prestige spoken standard of the Tang poets was essentially the speech of this corridor. When the north fell in 1127 the court left, but the land's speech kept its gravity: today Zhongyuan Mandarin runs from Henan and southern Shanxi west along the Silk Road through Lanzhou and Xining to the garrisons of Xinjiang.`,
         `Its varieties are conservative within Mandarin, and its western reaches reached Xinjiang with 18th–19th-century Qing garrison colonies — 左宗棠 Zuǒ Zōngtáng's Hunan army reconquered the region in 1876–79. Xinjiang's Chinese is a mosaic rather than a block: Zhongyuan-derived speech in the southern oases, Lan–Yin in the north, and smaller speech islands carried by later settlers from Hunan and Sichuan.`],
       t:[["202 BCE–904 CE","Chang'an/Luoyang capital zone sets the northern standard"],
          ["1876–79","Zuo Zongtang's reconquest of Xinjiang plants colonial Mandarin enclaves"]]},
     { id:"lanyin", en:"Lan–Yin", zh:"兰银", py:"Lányín Guānhuà", sp:"≈35 million", region:"Gansu, Ningxia, N Shaanxi, N Qinghai & Xinjiang — and the Chuy (Chüi) valley in Kyrgyzstan", cls:"c-gu",
       mk:[[36.06,103.83,"Lanzhou"],[38.49,106.2,"Yinchuan"],[34.58,105.72,"Tianshui"],[42.87,74.59,"Bishkek (Dungan)"]],
       h:[`Named for Lanzhou and Yinchuan, Lan–Yin Mandarin is the Chinese of the dry northwestern corridor — the old Hexi relay road to Central Asia, home to Han and Hui Muslim farming frontiers. Its tones and vocabulary preserve the speech of successive Ming–Qing garrison-agriculture colonies that pushed Chinese up the Silk Road.`,
         `Its most remarkable offshoot is the <strong>Dungan language</strong> (东干语 Dōnggānyǔ). After the crushed Muslim revolts of 1862–77, tens of thousands of Chinese-speaking Hui (回族 Huízú) fled into Russian Central Asia. Their descendants — some 100,000 in Kyrgyzstan and Kazakhstan — still speak a Lan–Yin variety written in Cyrillic with Russian and Arabic loan layers: northwestern Mandarin preserved in nineteenth-century amber under a different alphabet.`],
       t:[["1368–1785","Ming–Qing garrison colonies spread Chinese through Gansu–Ningxia"],
          ["1878","东干 Dungan refugees reach Russia; today written in Cyrillic"]]},
     { id:"xinan", en:"Southwestern", zh:"西南", py:"Xīnán Guānhuà", sp:"≈270 million", region:"Sichuan, Chongqing, Yunnan, Guizhou, Hubei, parts of Hunan & Guangxi", cls:"c-gu",
       mk:[[30.57,104.07,"Chengdu"],[29.56,106.55,"Chongqing"],[25.04,102.71,"Kunming"],[26.65,106.63,"Guiyang"],[25.27,110.29,"Guilin"],[30.59,114.3,"Wuhan"]],
       h:[`Southwestern Mandarin — among the largest Sinitic varieties on earth — covers the entire upper and middle Yangtze basin and the southwest plateau. Its spread is a story of state-engineered colonisation: Yunnan received Han garrisons under the Mongols (governor 赛典赤·赡思丁 Sayyid Ajall Shams al-Dīn, 1270s) and Ming military settlers whose families claimed Nanjing ancestry, memorialised in the 朱氏巷 Zhūshìxiàng ("Zhu-family lane") and 柳树湾 Liǔshùwān origin legends of Guizhou and Yunnan clan genealogies.`,
         `Sichuan, catastrophically depopulated in the wars of the 1640s, was repopulated by the great 湖广填四川 <em>Huguang tián Sìchuān</em> ("Huguang fills Sichuan") migration from Hubei, Hunan and Guangdong — the mingling of those groups produced modern Sichuanese's striking homogeneity, with the checked tone merged wholesale into 阳平 yángpíng, the region's calling card (except in the 岷江小片 Mínjiāng sub-group around Leshan and Yibin, which keeps a distinct 入声 rùshēng tone). Guilin's Mandarin enclave dates to Ming garrisons; Wuhan's speech links the whole river together.`],
       t:[["1270s","Mongol garrisons settle Yunnan"],
          ["1380s–1600s","Ming military colonies populate Guizhou and Yunnan"],
          ["1660–1770","Huguang fills Sichuan repopulates the basin"]]},
     { id:"jianghuai", en:"Jianghuai (Lower Yangtze)", zh:"江淮", py:"Jiānghuái Guānhuà", sp:"≈45 million", region:"Anhui & Jiangsu along the lower Yangtze — Nanjing, Yangzhou, Hefei", cls:"c-gu",
       mk:[[32.06,118.8,"Nanjing"],[32.4,119.42,"Yangzhou"],[31.82,117.22,"Hefei"],[31.98,120.86,"Nantong"]],
       h:[`Jianghuai Mandarin is the meeting-edge of north and south: a Mandarin system laid over the Yangtze delta's southern linguistic terrain, keeping the trait the rest of Mandarin lost — a 入声 rùshēng class, short and glottal-final, still distinct in most of its varieties. Its frontier character was forged by population turnover at the eastern capital 建康 Jiànkāng / Nanjing, which received northern elites in 317 and 1127, superstrating northern speech onto local 江東 Jiāngdōng Chinese.`,
         `Nanjing Mandarin (南京话 Nánjīnghuà) was the Ming koine after 1368 and stayed influential in Qing officialdom long after Beijing took over; much of the "Mandarin" of early Western phrasebooks is Nanjing-flavoured. The Taiping devastation of the lower Yangtze (1864) emptied Nanjing itself, which was then repopulated by immigrants from Hubei and Yangzhou — levelling the city once more.`],
       t:[["317 / 1127","Northern courts at Jiankang/Lin'an reshape Jiangdong speech"],
          ["1368","Ming capital makes Nanjing Mandarin the court koine"],
          ["1864","Fall of Taiping Nanjing; immigration re-levels the city"]]}
    ]},
  { id:"jin", en:"Jin", zh:"晋", py:"Jìnyǔ", sp:"≈45–63 million (by source)",
    region:"Shanxi, central Inner Mongolia, parts of Hebei, Henan, Shaanxi", cls:"c-jin",
    mk:[[37.87,112.55,"Taiyuan"],[40.08,113.3,"Datong"],[40.84,111.75,"Hohhot"],[36.09,111.5,"Linfen"],[37.52,111.14,"Lüliang"]],
    h:[`Jin broke away from the Mandarin mainstream — and stayed broken off. Enclosed by the Taihang and Lüliang mountains and the Ordos loop, the Shanxi plateau preserved the Middle Chinese <em>entering tone</em> (入声 rùshēng), reduced today to a tight glottal catch (Taiyuan 一 <em>[iəʔ]</em> "one", 六 <em>[luəʔ]</em> "six"), while the plains around it lost it entirely. On this criterion 李荣 Lǐ Róng's 1985 reclassification, adopted by the 1985–87 Language Atlas, promoted Jin from "Mandarin dialect" to a branch of its own — one of the 20th century's most consequential reclassifications.`,
      `Jin's geography is the map of Shanxi's history: a dry, fortified frontier whose men served as soldiers on the Ming's 九边 Nine Borders and as the <em>Shanxi merchants</em> (晋商 Jìnshāng) who ran the salt and tea trades and, from the 平遥 Píngyáo banking houses of the 1820s, the Qing draft-trade. Jin-speaking farming colonies dot Inner Mongolia beyond the Great Wall, following routes the merchant caravans first opened.`],
    t:[["c. 600–1300","Jin's ancestors keep the Middle Chinese entering tone as plains lose it"],
       ["1368–1644","Ming border garrisons; rise of 晋商 Jìnshāng merchant networks"],
       ["1823","日昇昌 Rìshēngchāng exchange bank founded in 平遥 Píngyáo"],
       ["1985–87","李荣 Lǐ Róng's reclassification; the Language Atlas recognises Jin as a separate branch"]]},
  { id:"wu", en:"Wu", zh:"吴", py:"Wúyǔ", sp:"≈83 million",
    region:"Shanghai, Zhejiang, southern Jiangsu; fringe in Anhui & Jiangxi", cls:"c-wu",
    mk:[[31.23,121.47,"Shanghai"],[31.3,120.62,"Suzhou"],[30.27,120.16,"Hangzhou"],[29.87,121.55,"Ningbo"],[28.0,120.67,"Wenzhou"],[29.08,119.65,"Jinhua"],[30.95,118.76,"Xuancheng"]],
    h:[`Wu is the speech of the Yangtze delta — the rice-and-silk heartland that made China rich from the Tang onward — and a living archive of every southern migration. Its substratum is non-Chinese: the ancient kingdoms of Wu and Yue spoke a different language, and substrate vocabulary is often suspected — though words like Shanghainese <em>luosu</em> 落苏 "eggplant" (recorded for the Jinling area in the Five Dynasties 《清异录》) are more plausibly old Chinese dialect words. What is certain is the famously "soft," voiced-initial aesthetic Chinese poets praised for a thousand years.`,
      `The Chinese layer arrived in waves — the Yongjia catastrophe (311), the Hou Jing rebellion (548), the An Lushan and Huang Chao wars (755, 879), and the Northern Song collapse (1127, when Hangzhou became the Southern Song capital Lin'an) — each replenishing Jiangdong with northern families who merged with local speakers. The result: double literary/colloquial readings (文白异读 wénbái yìdú, e.g. 人 nyin / zen), Middle Chinese's voiced series preserved (Shanghainese <em>bo</em> 爬 "climb"), and an east–west split between innovative Northern Wu and conservative Southern Wu.`,
      `The modern era has been brutal. Suzhou — the language of 昆曲 Kūnqǔ opera and of the gentry — yielded prestige to treaty-port Shanghai (1843+), which tripled its population on immigration from Suzhou, Ningbo and Canton, levelling its own koine. Since the 1990s, Putonghua schooling and internal migration have collapsed transmission: 2010s surveys found Shanghai children far less fluent than their grandparents. Wenzhounese, locked in mountain pockets, remains the most resilient.`],
    t:[["311 / 317","Yongjia catastrophe: northern elite floods south of the Yangtze"],
       ["1127–1276","Southern Song capital at Lin'an (Hangzhou)"],
       ["1843","Shanghai opens; Wu prestige shifts to Shanghai"],
       ["1990s–now","Putonghua schooling and migration sharply reduce transmission"]],
    kids:[
     { id:"nwu", en:"Northern Wu", zh:"北吴", py:"Běiwú", sp:"≈70 million", region:"Shanghai, S Jiangsu, N & E Zhejiang plain", cls:"c-wu",
       mk:[[31.23,121.47,"Shanghai"],[31.3,120.62,"Suzhou"],[30.0,120.58,"Shaoxing"],[29.87,121.55,"Ningbo"],[32.48,119.92,"Changzhou"]],
       h:[`The plain varieties — Shanghai, Suzhou, Wuxi, Shaoxing, Ningbo — form a tightly knit, sharply innovative family: checked tones eroded to glottal stops, tone systems streamlined into pitch-accent sandhi chains. Their shared innovations make Northern Wu best described as a <em>language family in miniature</em> — varieties closer to each other than Dutch is to German — and the delta's canal-and-market economy has kept them in constant contact ever since.`], kids:[
       { id:"shanghainese", en:"Shanghainese", zh:"沪", py:"Hù", sp:"≈14 million", region:"Shanghai metro & satellite districts", cls:"c-wu",
         mk:[[31.23,121.47,"Shanghai"]],
         h:[`A hybrid city-dialect born almost overnight. Before 1843 Shanghai was a modest walled county town; as the treaty port exploded it swallowed waves from Suzhou (the old prestige, still audible in "elegant" readings), Ningbo (the commercial backbone) and a dozen other homelands. The merged koine kept an elaborate tone-sandhi system and a cosmopolitan vocabulary (<em>delegon</em> 得律风 délǜfēng "telephone," from English, before 电话 diànhuà took over).`,
           `Western lexicons of the 1850s–1940s treated Shanghainese as <em>the</em> Wu variety, and Republican popular culture — 时调 shídiào song, the first dialect cinema — spread it across the delta. Today its speakers are ageing: of the city's 24 million residents, many children grow up in Putonghua or migrant Mandarin.`] },
       { id:"suzhounese", en:"Suzhounese", zh:"苏", py:"Sūzhōuhuà", sp:"≈8 million", region:"Suzhou, Wuxi, Changshu, Kunshan", cls:"c-wu",
         mk:[[31.3,120.62,"Suzhou"],[31.49,120.31,"Wuxi"]],
         h:[`For a millennium the prestige of Jiangnan: the gentry's "elegant" speech and the stage language of Kunqu opera, mother of Chinese theatre, built on Suzhou norms; 19th-century Western philologists likewise took Suzhou as refined Wu. It conserves Northern Wu's elaborate sandhi chains more fully than Shanghai and remains the vehicle of Suzhou 评弹 píngtán storytelling and 古琴 gǔqín song.`] },
       { id:"ningbomd", en:"Ningbo", zh:"甬", py:"Yǒnghuà", sp:"≈8 million", region:"Ningbo, Zhoushan, Hangzhou-bay ports", cls:"c-wu",
         mk:[[29.87,121.55,"Ningbo"],[30.01,122.11,"Zhoushan"]],
         h:[`Harbour-city speech of the Ningbo plain — homeland of the traders, shipbuilders and bankers who dominated Republican-era commerce and ran Shanghai's workshops. Ningbo preserves the checked-tone contrasts of coastal Wu and odd conservatisms lost upriver, and its colonies survived for generations in old Shanghai neighbourhoods.`] }
     ]},
     { id:"swu", en:"Southern Wu", zh:"南吴", py:"Nánwú", sp:"≈13 million", region:"Zhejiang interior: Wenzhou (Oujiang), Quzhou (Chu–Qu), Jinhua basin", cls:"c-wu",
       mk:[[28.0,120.67,"Wenzhou"],[29.08,117.33,"Quzhou"],[29.08,119.65,"Jinhua"]],
       h:[`Beyond the delta's canals the mountains begin, and Wu turns conservative and fragmented: the Oujiang (Wenzhou) and Chu–Qu varieties keep checked tones and voiced series that Shanghai smoothed away, and valley-to-valley divergence makes neighbouring counties mutually opaque.`,
         `This is the Wu closest to the lost speech of medieval Jiangdong — which is why Wenzhou is nicknamed the "devil's language" (恶魔之语 èmó zhī yǔ). Local legend holds that its unintelligibility served as an improvised field code in the 1979 Sino-Vietnamese border war — a story repeated in Chinese media but never documented, and the WWII version that circulates online is rejected by Chinese dialectologists. Either way, Wenzhou and 青田 Qīngtián merchants turned that same opacity into diaspora network capital.`] }
    ]},
  { id:"xiang", en:"Xiang", zh:"湘", py:"Xiāngyǔ", sp:"≈38 million",
    region:"Central & SW Hunan, parts of Guangxi, Guizhou, Sichuan, Jiangxi, Hubei", cls:"c-xiang",
    mk:[[28.23,112.94,"Changsha"],[27.47,111.67,"Shuangfeng"],[27.7,111.99,"Loudi"],[26.9,112.57,"Hengyang"],[26.42,111.61,"Yongzhou"],[27.55,109.998,"Huaihua"]],
    h:[`Hunan — south of the mountains, along the Xiang River — was the land of Chu, a rival civilization that absorbed into the Han world only after 278 BCE, and stayed thinly settled until the Tang–Song expansions. Modern Xiang descends largely from Song–Ming colonization of the middle Yangtze, layered by the <em>Jiangxi fills Hunan</em> migrations of the 14th–17th centuries, which flooded eastern Hunan with Gan-speaking families — hence Xiang's encirclement by, and shared vocabulary with, Gan and Mandarin.`,
      `Its celebrated fact is <strong>Old Xiang</strong> (Loudi–Shuangfeng): among the very few Chinese varieties anywhere that still pronounce Middle Chinese's voiced stops as true voiced initials, preserving a three-way contrast the north lost 800 years ago. New Xiang (Changsha), pressed by Mandarin, has devoiced. The five recognised subgroups — Chang–Yi (New), Lou–Shao (Old), Hengzhou, Chen–Xu and Yong–Quan — form one of the most debated patchworks in Sinitic linguistics.`,
      `Xiang speakers punch above their weight: 曾国藩 Zēng Guófān's 湘军 Xiāngjūn and Mao Zedong's deep-Hunanese speech reshaped modern China, and near 江永 Jiāngyǒng women devised <em>Nüshu</em> 女书 Nǚshū, the only known script created and used exclusively by women — written for the local 江永土话 Jiāngyǒng tǔhuà vernacular, a 湘南土话 variety whose affiliation (Xiang or northern-Guangxi Pinghua) is still debated.`],
    t:[["278 BCE","Qin conquers Chu; slow Chinese settlement of Hunan begins"],
       ["1368–1644","Jiangxi fills Hunan: Gan-speakers pour into eastern Hunan"],
       ["1850s","Xiang Army era spreads Hunanese prestige"],
       ["20th c.","Old Xiang retreats before New Xiang and Putonghua"]],
    kids:[
     { id:"nxiang", en:"New Xiang", zh:"新湘", py:"Xīn Xiāng", sp:"≈20 million", region:"Changsha, Xiangtan, Yiyang — the Chang–Yi plain", cls:"c-xiang",
       mk:[[28.23,112.94,"Changsha"],[27.83,112.94,"Xiangtan"]],
       h:[`Changsha-centred, Mandarin-leaning, expanding. New Xiang has devoiced its ancient voiced initials like the north, but keeps an entering-tone class and signature pronoun and demonstrative systems that mark it unmistakably. As Changsha's economy grows, New Xiang is swallowing Old Xiang county by county.`] },
     { id:"oxiang", en:"Old Xiang", zh:"老湘", py:"Lǎo Xiāng", sp:"≈15 million", region:"Loudi, Shuangfeng, Xiangxiang, Wugang (Lou–Shao)", cls:"c-xiang",
       mk:[[27.7,111.99,"Loudi"],[27.47,111.67,"Shuangfeng"],[27.74,112.53,"Xiangxiang"]],
       h:[`The living fossil. In Shuangfeng and Loudi, Middle Chinese *b-, *d-, *g- are still voiced — a distinction lost in every Mandarin variety and surviving, among major branches, only here and in Wu. A Beijing speaker understands nothing of it: dense sandhi and vowel systems make Old Xiang one of the most phonologically complex varieties in the family, fossilized in the inland rice country imperial settlement reached last.`] }
    ]},
  { id:"gan", en:"Gan", zh:"赣", py:"Gànyǔ", sp:"≈48 million total (Jiangxi core ≈22 million)",
    region:"Central & N Jiangxi; parts of Hunan, Hubei, Anhui, Fujian borderlands", cls:"c-gan",
    mk:[[28.68,115.88,"Nanchang"],[29.71,116.0,"Jiujiang"],[27.8,114.39,"Yichun"],[28.23,117.07,"Yingtan"],[30.1,114.96,"Daye"]],
    h:[`Gan is the speech of Jiangxi, the corridor province linking the Yangtze to Guangdong through the Gan River and Meiguan pass — the highway every southbound army, exile and merchant used. Refugees fleeing the An Lushan and later wars settled its valleys in mass; by the Song, Jiangxi was among China's most populous and cultured regions — Ouyang Xiu, Wang Anshi and Zeng Gong, three of the Eight Great Prose Masters, were all Gan men, and its kilns (Jingdezhen) supplied the world.`,
      `Then it emptied. The great mid-15th-century risings — 邓茂七 Dèng Mǎoqī's revolt in Fujian (1448–49) and 叶宗留 Yè Zōngliú's in the Zhejiang–Jiangxi hills — were crushed and scattered thousands of Jiangxi and Fujian families, many merging into the Hakka world. Ming–Qing 江西填湖广 "Jiangxi fills Hunan (and Sichuan)" migrations spread Gan settlers onward, leaving Gan today as a diminished core — Nanchang, the Poyang lakeshore, the Yi and Xin river basins — ringed by Hakka, Xiang and Mandarin. The standard division recognises nine sub-groups: 昌都 Chāngdū, 宜浏 Yíliú, 吉茶 Jíchá, 抚广 Fǔguǎng, 鹰弋 Yīngyì, 大通 Dàtōng, 耒资 Lěizī, 洞绥 Dòngsuí and 怀岳 Huáiyuè.`],
    t:[["755–880s","War-refugee settlement fills Gan river valleys"],
       ["11th c.","Song-era Jiangxi: demographic and literary zenith"],
       ["1448–49","邓茂七 Dèng Mǎoqī's revolt crushed; families scattered into Hakka country"],
       ["1660s–18th c.","江西填湖广 Jiangxi fills Hunan/Sichuan; Gan speakers disperse"]]},
  { id:"hakka", en:"Hakka", zh:"客", py:"Kèjiāhuà", sp:"≈44 million",
    region:"NE Guangdong, S Fujian, S Jiangxi; Taiwan; Hainan, Guangxi; overseas", cls:"c-hak",
    mk:[[24.29,116.12,"Meizhou"],[23.74,114.7,"Heyuan"],[25.83,114.93,"Ganzhou"],[25.83,116.36,"Changting"],[23.11,114.42,"Huizhou"],[24.56,120.82,"Miaoli, Taiwan"],[22.87,120.56,"Meinong, Taiwan"],[22.55,114.11,"Shenzhen/New Territories"],[5.84,118.12,"Sandakan, Sabah"]],
    h:[`<em>Hakka</em> 客家 means "guest families" — the name their Cantonese neighbours gave them, and the key to their history. Hakka historiography tells of families driven south in waves from the war-torn North-West (the Yongjia collapse of 311, the Tang–Song transition, the Mongol conquest), taking up residence in the mountainous corner where Guangdong, Fujian and Jiangxi meet. Modern linguistics tempers the legend — the genealogies were glorified by Qing compilers, and Hakka's closest relative is <em>Gan</em>, marking a long shared history in the Gan–Zhe–Min highlands — but the language itself confirms a layered, migratory origin.`,
      `Pressure from established "landed" (本地) lineages pushed Hakka further: into Sichuan with the Qing repopulation, into Taiwan — where the 六堆 Liùduī Hakka militias, first organised during the 朱一貴 Zhū Yīguì rising of 1721 and mobilised again in the 吳福生 Wú Fúshēng rising of 1732, held the southern frontier (the Qing's "righteous" 義民 yìmín title is most firmly attached to the 林爽文 Lín Shuǎngwén war of 1787–88) — and beyond, across the sea. The Punti–Hakka clan wars of 1854–67 in the Pearl Delta — among the deadliest conflicts few textbooks mention, hundreds of thousands dead — ended with displaced Hakka communities, some resettled by decree, others emigrating as labourers to the Straits Settlements, Borneo's gold fields (Sandakan, a Hakka-majority town), California and Australia.`,
      `Meizhou speech became the Hakka prestige standard. In Taiwan, Hakka (Sixian and Hailu dialects, spoken by roughly one in five islanders) was suppressed under martial law, rehabilitated by the 1988 還我母語 <em>Return Our Mother Tongue</em> movement, given standing by the 2010 客家基本法 Hakka Basic Act, and in 2018 made a <em>national language</em> under the 國家語言發展法 National Languages Development Act — train and subway announcements include it today.`],
    t:[["4th–13th c.","North-to-south migrations into the Gan–Yue–Min highlands (as remembered & debated)"],
       ["1721 / 1732","六堆 Liùduī militias formed (1721); mobilised again in the 1732 吳福生 rising"],
       ["1854–67","Punti–Hakka clan wars in the Pearl Delta; diaspora accelerates"],
       ["1988 / 2010 / 2018","Return Our Mother Tongue movement; Hakka Basic Act; national-language status"]]},
  { id:"min", en:"Min", zh:"闽", py:"Mǐnyǔ", sp:"≈75 million",
    region:"Fujian, Hainan, Leizhou, parts of Zhejiang & Jiangxi; Taiwan, SE Asia", cls:"c-min",
    mk:[[26.07,119.3,"Fuzhou"],[27.03,118.12,"Jian'ou"],[25.43,119.01,"Putian"],[24.87,118.67,"Quanzhou"],[24.51,117.65,"Zhangzhou"],[23.35,116.68,"Shantou"],[20.04,110.34,"Haikou"]],
    h:[`Min is the family's deep outlier. Almost all Chinese varieties descend from the Middle Chinese of the Qieyun era — Min's everyday layer does not. Its ancestors split from the family earlier, in the spoken Chinese of the Han expansion into Fujian, and linguists reconstruct a <strong>Proto-Min</strong> (with its own tonal and consonantal system) that predates the Tang: Min "softens" the old nasals in its everyday layer where the rest of Chinese kept them (Norman's <em>softened initials</em>): *m- → b- (Hokkien <em>ba̍k</em> 目 "eye", <em>bīn</em> 面 "face"), *ŋ- → g- (我 <em>guá</em> "I", 五 <em>gōo</em> "five"). The same colloquial layer keeps 知-group words with t-/tʰ- (茶 <em>tê</em> "tea", 陳 <em>tân</em>), a further hallmark of its early separation from the family.`,
      `Fujian — "eight parts mountains, one part water, one part field" — received its first Chinese garrisons after 110 BCE, but its decisive Sinification came in two great entries from Guangshan (固始) in Henan: General Chen Zheng and his son Chen Yuanguang, who pacified the region for the Tang in 669 and settled an army there, and in 885 the three 固始 Gùshǐ Wang brothers — 王潮 Wáng Cháo, 王審邽 Wáng Shěnkuī and the young 王審知 Wáng Shěnzhī, later founder of the Min kingdom (開閩三王, the "Three Kings who opened Min") — bringing hundreds of named clans; "the eighteen surnames that followed Wang to open Min" still figures in temple genealogies from Taipei to Penang. Each entry laid a new literary stratum over the older colloquial one, giving Min its famous double (文读/白读) readings.`,
      `Mountain fragmentation then did the rest, shattering Min into mutually unintelligible branches — the classic five-way split (Northern 闽北, Eastern 闽东, Central 闽中, Pu–Xian 莆仙, Southern 闽南), with 邵将 Shàojiāng (the Min–Gan–Hakka transition) and 琼文 Qióngwén / 雷州 Léizhōu (Hainan and Leizhou) as further primary divisions in the 2012 Atlas — of which the coastal south, through the seafaring peoples of Quanzhou, Zhangzhou and Chaozhou, became the most globally dispersed Chinese speech of all.`],
    t:[["110 BCE","Han destroy Minyue; first Chinese garrisons in Fujian"],
       ["669","Chen Zheng & Chen Yuanguang settle a Tang garrison army"],
       ["885","The Wang brothers' entry; medieval stratum of 18-surname genealogies"],
       ["1661–1683","Zheng Chenggong's conquest opens mass Hokkien settlement of Taiwan"]],
    kids:[
     { id:"nmin", en:"Northern Min", zh:"北", py:"Běimǐnyǔ", sp:"≈1 million", region:"Jian'ou, Jianyang, Chaogang — the Jian valley, N Fujian", cls:"c-min",
       mk:[[27.03,118.12,"Jian'ou"],[27.33,118.12,"Jianyang"],[26.8,117.4,"Chaogang"]],
       h:[`The most archaic Min, and arguably the most archaic Chinese of the east: spoken in the Jian (建) valley that medieval book-printers made one of China's publishing capitals ("Jian editions" of the classics), it keeps Proto-Min distinctions lost elsewhere — most famously, Middle Chinese 來母 *l- surfaces as a fricative (建甌 Jiàn'ōu 六・雷・露 read with s-), while 知-group words keep t- (竹). Its tone system is often judged the most conservative in Min. Its isolation behind the Wuyi mountains also made it the only Min with significant contact with Gan and Hakka neighbours.`] },
     { id:"emin", en:"Eastern Min", zh:"东", py:"Dōngmǐnyǔ", sp:"≈10 million", region:"Fuzhou, Fuqing, Changle, Fu–Ning coast, Matsu", cls:"c-min",
       mk:[[26.07,119.3,"Fuzhou"],[25.72,119.36,"Fuqing"],[26.16,119.93,"Matsu"],[26.66,119.55,"Ningde"]],
       h:[`The speech of Fujian's capital — Fuzhou (Fu) state since the early 4th century, treaty port from 1844 — and of the indented Fu–Ning coast behind it. Eastern Min is famous for ferocious tone sandhi (a whole phrase fuses into one pitch contour), a seven-tone system with a checked-tone pair, and 聲母類化 shēngmǔ lèihuà — initial-consonant alternation across word boundaries. Its 1840s–1940s emigration gave Singapore a large Hokchia (福清 Hok-chhia, Fuqing) community and, from the 1980s, Changle and Fuqing towns America's "Little Fuzhous" — Sunset Park in Brooklyn, East Broadway in Manhattan and Flushing in Queens.`] },
     { id:"cmin", en:"Shao–Jiang (transition)", zh:"邵将", py:"Shàojiāng Mǐnyǔ", sp:"several hundred thousand", region:"Shaowu, Jiangle, Taining, Mingxi — the NW Fujian uplands", cls:"c-min",
       mk:[[27.34,117.49,"Shaowu"],[26.8,117.4,"Jiangle"]],
       h:[`The Min–Gan–Hakka transition belt of the northwest uplands — a mixed group that some scholars file under Northern Min, others under Gan (撫廣片 Fǔguǎng). Central Min proper (閩中片 Mǐnzhōng piàn) lies further south in the 沙溪 Shāxī basin around 三明 Sānmíng, 沙縣 Shāxiàn and 永安 Yǒng'ān, whose 永安話 Yǒng'ānhuà is its representative variety; both are among the least-studied corners of Min.`] },
     { id:"pxmin", en:"Pu–Xian Min", zh:"莆仙", py:"Púxiān Mǐnyǔ", sp:"≈4 million", region:"Putian & Xianyou (old Xinghua prefecture)", cls:"c-min",
       mk:[[25.43,119.01,"Putian"],[25.36,118.68,"Xianyou"]],
       h:[`The speech of Xinghua prefecture (兴化), between Fuzhou and Quanzhou: neither one nor the other — its own branch, with vowels that broke diphthongs apart in ways unique in Min, and a dramatic, archaic opera tradition of its own. Putian's compact plains and clan solidarity made its migrants — in Singapore, Malaysia and now Europe — a distinct and tightly networked community. Putian's merchant clans ran the shoe and timber trades abroad, and in recent decades the private-hospital chains known as the 莆田系 Pútiánxì — a reminder that diaspora networks here rest on hometown ties rather than on mutual intelligibility with other Min speakers.`] },
     { id:"smin", en:"Southern Min", zh:"闽南", py:"Mǐnnányǔ", sp:"≈48 million", region:"Quanzhou–Zhangzhou–Chaozhou coast, Leizhou, Hainan, Taiwan, SE Asia", cls:"c-min",
       mk:[[24.87,118.67,"Quanzhou"],[24.51,117.65,"Zhangzhou"],[24.48,118.08,"Xiamen"],[22.99,120.2,"Tainan"],[23.35,116.68,"Shantou"],[21.27,110.36,"Zhanjiang"],[20.04,110.34,"Haikou"]],
       h:[`Southern Min (Min Nan) is Min of the sea. From the ports of Quanzhou, Zhangzhou and Chaozhou its speakers became Southeast Asia's Chinese — and after 1661, Taiwan's. Its dialect continuum runs southwest along the coast from Quanzhou and Zhangzhou (the Hokkien heartland) through the Teochew delta, onto the Leizhou peninsula and across the strait to Hainan, with 浙南閩語 Zhènán Mǐnyǔ islands stranded in Zhejiang. (This page groups Hainan and Leizhou under Southern Min, as older schemes did; the 2012 Atlas makes 瓊文 Qióngwén and 雷州 Léizhōu their own primary divisions.)`,
         `Quanzhou was the great port of the Maritime Silk Road — Zayton, which Marco Polo reached on the eve of sailing home in 1291–92 and where Ibn Battuta marvelled at the great ships two generations later; its Maritime Trade Supervisory Bureau dates to 1087. When the Ming sea-bans and 16th-century pirate wars hardened, its people went underground or overseas; when the Qing lifted the bans in 1684, they colonised Taiwan and the Straits in force.`],
       t:[["1087","Quanzhou gets a Maritime Trade Supervisory Bureau"],
          ["c. 1291 / 1345","Marco Polo and Ibn Battuta describe Zayton (Quanzhou)"],
          ["1684","Qing lifts sea ban; explosion of Hokkien emigration"]],
       kids:[
        { id:"hokkien", en:"Hokkien", zh:"闽南", py:"Bân-lâm-gí", sp:"≈35 million (incl. Taiwan & SE Asia)", region:"Quanzhou, Zhangzhou, Xiamen, Taiwan, Penghu, SW Taiwan plain; diaspora across SE Asia", cls:"c-min",
          mk:[[24.87,118.67,"Quanzhou"],[24.51,117.65,"Zhangzhou"],[24.48,118.08,"Xiamen"],[25.03,121.56,"Taipei"],[22.99,120.2,"Tainan"],[14.6,120.98,"Manila"],[5.41,100.33,"Penang"],[3.59,98.67,"Medan"],[1.35,103.82,"Singapore"]],
          h:[`"Hokkien" (福建, literally just "Fujian-ese" in its local pronunciation <em>Hok-kiàn</em>) is the speech of the Quanzhou–Zhangzhou plain, carried to Taiwan by 17th–18th-century settlers — Tainan first, then north — and still the mother tongue of most older Hoklo households, though self-reported ability has fallen sharply among the young after decades of Mandarin-only schooling. Its overseas reaches define the Chinese of Southeast Asia, and their accents preserve the settlement map: Penang Hokkien descends from Zhangzhou (海澄 Hǎichéng), that of Singapore and southern Malaysia from Quanzhou, Manila's from 晉江 Jìnjiāng and 漳州 Zhāngzhōu, Medan's largely from Quanzhou.`,
            `The prestige standard crystallised at treaty-port Xiamen (Amoy): its 1873 dictionaries and the <em>pe̍h-ōe-jī</em> romanisation created by missionaries in the 1850s gave Hokkien a written vernacular tradition, and under Japanese rule (1895–1945) Taiwan's spoken-language schools standardised "Taiwanese" along Amoy lines. The accent map is still a social map: the Quanzhou-leaning (偏泉), Zhangzhou-leaning (偏漳) and mixed (混合) accents of Taiwan trace straight back to which plain your ancestors crossed.`],
          t:[["1661–1683","Zheng Chenggong's conquest; organised Zhangzhou/Quanzhou settlement of Taiwan"],
             ["1850s–1873","pe̍h-ōe-jī romanisation; first Amoy dictionaries"],
             ["1945–1987","Mandarin-only policy in Taiwan; Hokkien recedes from schools"],
             ["2019–","國家語言發展法 National Languages Development Act; local-language classes expand"]]},
        { id:"teochew", en:"Teochew", zh:"潮州", py:"Diâ-siu / Tiô-chiu-miân", sp:"≈10 million", region:"Chaoshan plain (Chaozhou, Shantou, Jieyang); Thailand, Singapore, Vietnam, Malaysia, Cambodia", cls:"c-min",
          mk:[[23.66,116.62,"Chaozhou"],[23.35,116.68,"Shantou"],[23.55,116.58,"Jieyang"],[13.75,100.5,"Bangkok"],[1.35,103.82,"Singapore"],[10.76,106.66,"Ho Chi Minh City"],[11.57,104.92,"Phnom Penh"]],
          h:[`Teochew (潮州话, "Chaozhou speech") is the southwestermost Southern Min language, spoken on the fertile Han River delta where it meets the sea — home base Chaozhou (the old prefectural seat, famous for Han Yu's 819 exile and the crocodile-driving legend), with Shantou, opened as Swatow treaty port in 1860, as its modern face and Jieyang its ancient county core (Han-dynasty Jieyang county). Intelligible with Hokkien only partially: it sits closest to the 漳州 Zhāngzhōu end of Southern Min, not to the Quanzhou-flavoured 浙南閩語 of Zhejiang.`,
            `Poor land between mountains and sea drove the Teochew to emigrate early and massively. In Thailand — where they form the largest single Chinese dialect group, concentrated in Bangkok around Sampeng and the old canals — Teochew was so dominant that King Taksin (r. 1767–82), of mixed Teochew descent, owed his throne to the Teochew trading networks around the capital, and Thai still carries a stratum of Teochew loanwords for trade, fruit and kinship. Teochew lineages ran the rice trade of the Chao Phraya, the rice mills of Vietnamese Cholon, and Singapore's early gambier and pepper estates — the Teochew 义安公司 Yì'ān Gōngsī (Ngee Ann Kongsi, founded in the 1840s) is among the island's oldest Chinese associations.`,
            `Like other southern languages, Teochew is now squeezed between Mandarin at school and Thai/English in the diaspora: Chaoshan children's fluency has fallen two generations running, even as the region's gongfu tea ceremony, Chaozhou opera and cuisine keep the name famous.`],
          t:[["819 CE","Han Yu exiled to Chaozhou — prefecture enters Chinese literary memory"],
             ["1400s–1800s","Chaoshan plain fully dyked & settled; mass out-migration begins"],
             ["1767","King Taksin of Siam, of Teochew descent, founds Thonburi"],
             ["1860","Swatow (Shantou) opens as treaty port; global diaspora institutionalises"]]},
        { id:"leizhou", en:"Leizhou Min", zh:"雷州", py:"Lui-tsiu Min", sp:"≈2–3 million", region:"Leizhou peninsula — Leizhou, Zhanjiang, Lianjiang, Wenchang contacts", cls:"c-min",
          mk:[[20.93,110.06,"Leizhou"],[21.27,110.36,"Zhanjiang"],[21.42,110.06,"Lianjiang"]],
          h:[`The Min of the bare southern peninsula (雷州 Lěizhōu, 湛江 Zhànjiāng) — settled by waves of Fujianese farmers and fisher-folk under the Tang–Song, then sealed off by the inland Yue and Zhuang-speaking country. Cut from its parent coast, Leizhou Min absorbed deep Cantonese and Kra-Dai (Zhuang) vocabulary and simplified its tones, and today is retreating fast inside its own cities before Cantonese- and Mandarin-flavoured urban speech.`] },
        { id:"hainan", en:"Hainan Min", zh:"海南", py:"Hainan-lae", sp:"millions (island's main Han speech)", region:"Hainan coast: Haikou, Wenchang, Qionghai, Boao; Qiongwén literary register", cls:"c-min",
          mk:[[20.04,110.34,"Haikou"],[19.61,110.8,"Wenchang"],[19.25,110.47,"Qiongzhou/Hainan island"]],
          h:[`Hainan's Chinese arrived from southern Fujian and Pu-Tian across the 19-km storm-strait in Song–Ming centuries, and today Hainan Min (with the old written register scholars call 瓊文 Qióngwén) is the everyday majority speech of the island's Han, far more widely than the Mandarin promoted since 1988, when Hainan became a province. The island layers are old: Han commanderies here from 110 BCE, the 6th-century 冼夫人 Xiǎn fūrén (Lady Xian) who unified the aboriginal and Chinese populations, and — in the 12th–13th centuries — a stream of Vietnamese refugees of the Lý clan, whose descendants near Haikou still keep ancestral halls honouring their Vietnamese origin.`] }
       ]}
    ]},
  { id:"yue", en:"Yue (Cantonese)", zh:"粤", py:"Yuhtyuht", sp:"≈86 million (85–120 million incl. diaspora, by source)",
    region:"Pearl River Delta & Guangdong coast, Guangxi, HK, Macau; global diaspora", cls:"c-yue",
    mk:[[23.13,113.26,"Guangzhou"],[22.32,114.17,"Hong Kong"],[22.2,113.55,"Macau"],[22.25,112.79,"Taishan"],[23.48,111.28,"Wuzhou"],[22.63,110.16,"Yulin"],[21.97,108.62,"Qinzhou"],[37.77,-122.42,"San Francisco"]],
    h:[`Yue is the Chinese of Lingnan — the land south of the Ridge. Its cradle is 赵佗 Zhào Tuó's kingdom of 南越 Nányuè (founded 204 BCE by a Qin general at 番禺 Pānyú, today's Guangzhou, whose 南越王墓 tomb, excavated in 1983, still stops tourists); when Han armies annexed it in 111 BCE, garrison speech began fusing with the Yue substratum whose echo survives in a substrate vocabulary Austroasiatic and Kra-Dai linguists still unpack.`,
      `Guangzhou's geography made it the last port and the first window: Tang-era Arab and Persian warehouses (the 蕃坊 fānfāng quarter, brutally sacked by 黄巢 Huáng Cháo in 879), Ming–Qing cantonment trade, and after 1842 a treaty-port century that exported Taishan and Sze Yi villagers to every goldfield and railway camp on earth — North American Chinatowns spoke Taishanese, not Mandarin, until the 1960s.`,
      `Linguistically Yue is Middle Chinese's most complete conservative: six tones plus three checked tones (-p, -t, -k) and the -m final intact — you can recite 杜甫 Dù Fǔ in Cantonese and hear the entering-tone rhymes Mandarin has broken. Cantonese (Guangzhou Yuehai, with Hong Kong as its modern amplifier) built a mass-media empire — Cantonese opera, 1970s–90s Cantopop, kung-fu cinema — and a living written vernacular (冇 mou5, 啲 di1, 乜 mat1) unique among modern Chinese. Subgroups: Yuehai (Cantonese proper), Siyi (Taishan), Gao–Yang, Wu–Hua, Qin–Lian and Guangxi's Goulou/Yongjiang branches.`],
    t:[["204 BCE","Zhao Tuo founds Nanyue kingdom at Panyu (Guangzhou)"],
       ["111 BCE","Han annexation begins garrison-Sinitic layering of Lingnan"],
       ["714 / 879","Tang maritime trade office; Huang Chao sacks the foreign quarters"],
       ["1842–61","Treaty ports open; Siyi emigration builds overseas Chinatowns"],
       ["1970s–90s","Cantopop & cinema globalise Cantonese"]],
    kids:[
     { id:"yuehai", en:"Cantonese (Yuehai)", zh:"粵語", py:"Jyut6 jyu5", sp:"≈64 million", region:"Guangzhou, Pearl Delta, Hong Kong, Macau, Guangxi cities", cls:"c-yue",
       mk:[[23.13,113.26,"Guangzhou"],[22.32,114.17,"Hong Kong"],[22.2,113.55,"Macau"],[23.08,113.7,"Dongguan"]],
       h:[`The standard Yuehai variety (廣州話 Gwóngjāu wá): Guangzhou norms, Hong Kong's global megaphone. Hong Kong and Macau — never subjected to mainland-style Putonghua-only schooling — have kept Cantonese as the language of government, courts and classrooms, making it the strongest non-Mandarin Chinese on earth institutionally; Guangzhou's 2010 "protect Cantonese" protests voiced the mainland delta's anxiety as Putonghua overtakes the crèche.`] },
     { id:"siyi", en:"Siyi (Sze Yi)", zh:"四邑", py:"Ssei ngap", sp:"≈10 million", region:"Taishan, Kaiping, Xinhui, Enping — the “Four Counties”", cls:"c-yue",
       mk:[[22.25,112.79,"Taishan"],[22.37,112.69,"Kaiping"],[22.52,113.03,"Xinhui"]],
       h:[`The "Four Counties" south of the delta, whose people — first mass Chinese emigrants of the gold-rush era (1848+) — built the Chinatowns of San Francisco and Victoria and the railroad camps of the western US; Angel Island's interrogations were conducted in Taishanese. Its divergent vowels (三 sāam → <em>ɬaam</em> "three" is heard by English ears as "ham") made old America's "Cantonese" sound like this, not Hong Kong's. The 开平碉楼 Kāipíng diāolóu watchtowers — UNESCO-listed — were built by its overseas-silver returnees.`] }
    ]},
  { id:"hui", en:"Hui", zh:"徽", py:"Huīyǔ", sp:"≈3–4 million",
    region:"Huizhou core: Shexian, Jixi, Tunxi (S Anhui) & neighbours in Zhejiang (Chun'an)", cls:"c-hui",
    mk:[[29.87,118.43,"Shexian"],[29.79,118.57,"Jixi"],[29.71,118.34,"Tunxi"],[29.6,119.02,"Chun'an"]],
    h:[`Hui is the puzzle of Sinitic classification — variously filed with Wu, with Gan, or left independent for seventy years — and that ambiguity is the point: it is the ancient mixed speech of the 新安江 Xīn'ān river valley, at the hinge of the Yangtze delta, the Poyang corridor and the Gan uplands, with a tonal map wildly divergent from every neighbour (eight tones in some valleys, tone correspondences that defeat the usual geography).`,
      `Its carriers were the <em>Huizhou merchants</em> (徽商 Huīshāng), for five centuries (14th–19th) the most famous merchant network of China — salt monopolists, bankers, timber and book traders whose guild-halls stood in every city from Yangzhou to Chengdu, and whose home-valley villages (宏村 Hóngcūn and 西递 Xīdì, the postcard "Villages of South Anhui") still stand as built proof of their profits. As Huizhou capital shrivelled after the Taiping wars gutted the salt trade, Hui became a rural pocket language, retreating before Mandarin even in its ancestral county seats.`],
    t:[["1121","歙州 Shèzhōu renamed 徽州 Huīzhōu — the name “Hui” attaches to this country"],
       ["1370–1500s","Huizhou merchant networks rise with the salt monopoly"],
       ["1850s–64","Taiping wars devastate Huizhou; language begins urban retreat"]]},
  { id:"ping", en:"Ping", zh:"平", py:"Pínghuà", sp:"≈2–3 million",
    region:"Guangxi river corridors: Yongjiang (Nanning area), Rongjiang (Rong'an), north-east enclaves", cls:"c-ping",
    mk:[[22.82,108.32,"Nanning/Yongjiang"],[22.64,109.7,"Hengzhou"],[25.28,109.87,"Rong'an"],[24.27,109.73,"Luzhai"]],
    h:[`Ping (平话 Pínghuà, "flat/garrison speech") is the Chinese of the Guangxi river lanes — the 灵渠 Língqú Canal route by which Qin's armies reached Lingnan in 214 BCE, and by which garrison and merchant Chinese lingered among a Zhuang-speaking sea for two thousand years. Its deep Kra-Dai (Zhuang) imprint — in vocabulary, tone behaviour and even syntax — marks it as the oldest sustained Chinese–southeast-Asian contact zone in China; many Ping speakers are officially counted as Zhuang.`,
      `Historically it was the urban layer: for centuries Ping was the market-town speech of Guangxi while Zhuang tongues held the countryside (平人 "Ping people" vs 山人 "mountain people" in Qing gazetteers). It split into northern (Rongjiang / Liuzhou area) and southern (Yongjiang) branches; both are now hemmed in — the north by Southwestern Mandarin, the south by Cantonese — making Ping one of China's most endangered larger varieties.`],
    t:[["214 BCE","灵渠 Língqú Canal links Guilin to the Xi Jiang; first garrison Chinese"],
       ["Ming–Qing","“Ping people” form the urban layer over a Zhuang countryside"],
       ["20th c.","Mandarin & Cantonese squeeze both Ping branches"]]},
  { id:"unc", en:"Unclassified varieties", zh:"未分", py:"", sp:"≈1.5 million combined", region:"W Hunan (Waxiang), NE Guangdong (Tuhua), NW Hainan (Danzhou), W Guangdong (Mai)", cls:"c-unc",
    mk:[[28.46,110.39,"Yuanling (Waxiang)"],[24.06,117.81,"Xinfeng (Shaozhou Tuhua)"],[19.52,109.58,"Danzhou (Danzhouhua)"],[18.35,109.17,"Yacheng (Maihua)"],[35.52,102.01,"Tongren (Wutun)"]],
    h:[`The family tree's fog bank: varieties that refuse classification. <strong>瓦乡话 Wǎxiānghuà</strong> (also 乡话 Xiānghuà, "local speech"; ~700k speakers around 沅陵 Yuánlíng, 泸溪 Lúxī and 古丈 Gǔzhàng in west Hunan) layers a conservative Sinitic core over a heavy substrate of disputed origin — an early Chinese layer, some argue, or a Miao–Yao (Hmong–Mien) imprint; it is emphatically not a "Ba–Shu" relic, a label that belongs to Sichuan. <strong>韶州土话 Sháozhōu tǔhuà</strong> (around Shaoguan) is a cluster of mutually strange varieties long dismissed as "unclear Cantonese," now recognised as a lineage apart. On Hainan, <strong>迈话 Màihuà</strong> (崖城 Yáchéng, Sanya) and the Yue-related <strong>儋州话 Dānzhōuhuà</strong> (~700k speakers, sometimes argued to be an earlier northern speech) sit beside the Mandarin-based <strong>军话 Jūnhuà</strong> islands; in Qinghai, <strong>五屯话 Wǔtúnhuà</strong> mixes Chinese with Tibetan and Mongolic so thoroughly that its family membership is still argued. The honest footnote stands: the atlas still has blank quarters, and every field survey since 1990 moves the borders.`],
    t:[["1987 / 2012","The Language Atlas leaves these “other dialects” (其他方言) unassigned"]]}
 ]
};

/* ---------- ISO 639-3 codes (SIL) — the codes behind the Forvo links ---------- */
const ISO = {
 sinitic:'zho', old:'och', middle:'ltc', oldmand:'cmn (early)', guanhua:'cmn', beifang:'cmn',
 dongbei:'cmn', beijingmd:'cmn', jiaoliao:'cmn', jilu:'cmn', zhongyuan:'cmn', lanyin:'cmn · dng (Dungan)',
 xinan:'cmn', jianghuai:'cmn', jin:'cjy', wu:'wuu', nwu:'wuu', shanghainese:'wuu',
 suzhounese:'wuu', ningbomd:'wuu', swu:'wuu', xiang:'hsn', nxiang:'hsn', oxiang:'hsn',
 gan:'gan', hakka:'hak', min:'nan · cdo · cpx · mnp', nmin:'mnp', emin:'cdo', cmin:'czo',
 pxmin:'cpx', smin:'nan', hokkien:'nan', teochew:'nan', leizhou:'nan (Leizhou)',
 hainan:'nan (Hainanese)', yue:'yue', yuehai:'yue', siyi:'yue', hui:'czh', ping:'cnp · csp'
};

/* ---------- what makes each variety distinctive: structure, not history ---------- */
const FEATURES = {
 sinitic:[
  `<b>Tone counts</b> run from 3–4 (Mandarin) to 6–9 (Yue, Hakka, Min, Gan), and up to ~10 in some Pinghua varieties.`,
  `<b>Checked syllables</b> (入声 rùshēng) survive in Yue, Hakka, Min, Gan, Jin, Jianghuai Mandarin and Wu (as a glottal stop) — but not in standard Mandarin.`,
  `<b>Voiced obstruents</b> (Middle Chinese 全浊 quánzhuó b-, d-, g-) survive only in Wu, Old Xiang and a few Hui and Ping varieties.`,
  `<b>Final consonants</b> -p, -t, -k and -m survive in Yue, Hakka, Min and partly Gan; they are gone in Mandarin and mostly gone in Wu and Xiang.`,
  `<b>Written vernaculars</b> exist beside the shared script: pe̍h-ōe-jī (Min), 粵拼 Jyutping (Yue), 客語白話字 (Hakka), 東干文 Dungan Cyrillic, 女書 Nǚshū (Jiangyong).`
 ],
 old:[
  `<b>Reconstruction</b>: Baxter–Sagart and 郑张尚芳 Zhèngzhāng Shàngfāng — no lexical tones, but *-ʔ and *-s finals that later became tones.`,
  `<b>Sounds nothing like modern Chinese</b>: initial clusters (*kl-, *pl-), prefix syllables, voiceless nasals.`
 ],
 middle:[
  `<b>Four tone classes</b> (平 píng, 上 shǎng, 去 qù, 入 rù), a full voiced series (b-, d-, g-, dz-), and the finals -p, -t, -k, -m.`,
  `<b>Why it matters</b>: every branch's tone names (陰平 yīnpíng, 陽入 yángrù …) are labels inherited from these Middle Chinese categories.`
 ],
 oldmand:[
  `<b>Traits</b>: four tones with 入声 redistributed among them, *-m merged into *-n, and the Middle Chinese voiced initials devoiced.`,
  `<b>Evidence</b>: 《中原音韵》 Zhōngyuán Yīnyùn (1324) — the first full picture of a Mandarin-type phonology.`
 ],
 guanhua:[
  `<b>Four tones</b> (陰平・陽平・上・去) plus a neutral tone (輕聲 qīngshēng); no 入声 except in Jianghuai.`,
  `<b>Initials</b>: retroflex zh/ch/sh, r, and a fricative f- (absent in Min, rare in Wu).`,
  `<b>Signature grammar</b>: 兒化 érhuà (er-suffixation, 花 → 花兒), 把 bǎ and 被 bèi constructions, V-得/V-不 complements, aspect markers 了 le・著 zhe・過 guo.`,
  `<b>Vocabulary</b>: 什麼 shénme "what", 的 de (possessive), 和 hé "and".`
 ],
 dongbei:[
  `<b>Very close to standard Mandarin</b>: four tones, no 入声, flat intonation, near-total mutual intelligibility with Beijing speech.`,
  `<b>Loan layers</b>: Manchu-era words (靰鞡 wùla "fur boot", 嘎拉哈 gālahà "knucklebones"), plus small Russian and Japanese layers in Harbin and Dalian.`,
  `<b>Vocabulary</b>: 咋 zǎ "how", 整 zhěng "do, fix", 埋汰 máitai "dirty".`
 ],
 beijingmd:[
  `<b>Prestige</b>: the reference pronunciation for 普通话 Pǔtōnghuà worldwide.`,
  `<b>Heavy 兒化 érhuà</b> and neutral-tone reduction — a trait of the court city rather than of Mandarin as a whole.`,
  `<b>Vocabulary</b>: 您 nín (polite "you"), 胡同 hútòng "lane" (Mongolic), 京片子 Jīngpiànzi for the local accent.`
 ],
 jiaoliao:[
  `<b>Tone values</b> differ sharply from the Ji–Lu plain and from Beijing — the accent northerners nickname 海蠣子味 hǎilìzi wèi, "oyster flavour".`,
  `<b>Split by a sea</b>: the Shandong and Liaodong halves stay mutually intelligible; the coastal-to-inland contrast is much sharper.`,
  `<b>Migration</b>: 19th-century boat migration carried the accent to Dalian, Dandong and the Manchurian ports.`
 ],
 jilu:[
  `<b>Four tones</b>, no 入声; the 上聲 shǎngshēng is a low, flat-sounding tone to southern ears.`,
  `<b>Tianjin enclave</b>: its 陰平 yīnpíng is a low tone unlike surrounding speech — a legacy of Ming garrisons raised in Anhui and Jiangsu.`,
  `<b>Vocabulary</b>: 嘛呢 mánī "what" and 哏儿 génr "funny" (Tianjin).`
 ],
 beifang:[
  `<b>Homogeneous</b>: Northeastern, Beijing, Ji–Lu and Jiaoliao share a four-tone system with no 入声 — differences are shallow and mutual intelligibility is near-total.`,
  `<b>Recent spread</b>: the northern half of this group was largely created by Ming–Qing migration into Manchuria and the frontier zones.`
 ],
 zhongyuan:[
  `<b>Four tones</b>, no 入声; 陰平 yīnpíng is typically low and 去聲 qùshēng falling.`,
  `<b>Conservative</b> within Mandarin: some rhyme classes look older than Beijing's.`,
  `<b>Spread</b>: the Chinese of Xinjiang's southern oases is Zhongyuan-derived.`
 ],
 lanyin:[
  `<b>Three or four tones</b> with 入声 redistributed; distinctive 去聲 qùshēng values in Lanzhou and Yinchuan.`,
  `<b>Dungan</b> (東干語 Dōnggānyǔ) — a Lan–Yin variety with its own Cyrillic orthography, the only Sinitic variety normally written in another script.`
 ],
 xinan:[
  `<b>Four tones</b>; 入声 merged into 陽平 yángpíng across most of the area — Sichuanese's calling card.`,
  `<b>Exception</b>: the 岷江小片 Mínjiāng sub-group (Leshan, Yibin) keeps a separate 入声 tone.`,
  `<b>Grammar</b>: freer use of 把 bǎ than in Beijing speech; 曉得 xiǎode "know"; V + 得/不 complements.`
 ],
 jianghuai:[
  `<b>Keeps 入声</b> as a short glottal-final tone — unique among the Mandarin sub-groups.`,
  `<b>Consonants</b> behave more like the south: 平/翹 distinctions and n/l are handled differently from northern Mandarin.`,
  `<b>Heritage</b>: 南京话 Nánjīnghuà was the Ming court koine and the model for early Western "Mandarin" textbooks.`
 ],
 jin:[
  `<b>Five to seven tones</b>, including 入声 with a glottal stop (Taiyuan 一 [iəʔ], 六 [luəʔ]).`,
  `<b>分音詞 fēnyīncí</b>: one syllable split into two — 窟窿 kūlong for 孔 kǒng "hole".`,
  `<b>圪- prefix</b>: 圪蹲 gēdūn "squat", 圪針 gēzhēn "thorn"; plus 忽- words and dense tone sandhi.`,
  `<b>Vocabulary</b>: 兀 wù demonstratives (兀个 wùge "that one"), 老 lǎo "that" in some areas.`
 ],
 wu:[
  `<b>Voiced initials</b>: Middle Chinese 全浊 preserved — Shanghai 爬 bo "climb", 病 bin "ill".`,
  `<b>Sandhi</b>: in Shanghainese a word's tone pattern is fixed by its first syllable (pitch-accent-like); Suzhou keeps fuller chains.`,
  `<b>Checked tones</b> as a glottal stop: 5 tones in Shanghai, 7 in Suzhou.`,
  `<b>Grammar</b>: 勿 wù "not", 伐 fá (yes/no question particle), 阿 a- interrogative prefix.`,
  `<b>Vocabulary</b>: 囡囡 nānnān "child", 汏 dà "wash", 面孔 miànkǒng "face", 白相 báixiàng "play".`
 ],
 nwu:[
  `<b>Pitch-accent sandhi</b>: word-level tone patterns; 5 tones in Shanghai, 7 in Suzhou.`,
  `<b>Innovations</b>: 陰入/陽入 merging in several cities; 文白異讀 doublets (人 nyin / zen).`
 ],
 shanghainese:[
  `<b>Five tones</b> with glottal-stop 入声; sandhi spreads rightwards from the first syllable.`,
  `<b>Pronouns</b>: 我 ngu "I", 儂 nóng "you", 阿拉 ala "we"; 勿 "not"; 伐 question particle.`,
  `<b>Lexicon</b>: treaty-port loans and calques (得律风 dé lǜ fēng "telephone", from English).`
 ],
 suzhounese:[
  `<b>Seven tones</b> and the most elaborate sandhi chains of the delta.`,
  `<b>Prestige heritage</b>: the stage language of 崑曲 Kūnqǔ opera and 評彈 píngtán storytelling.`
 ],
 ningbomd:[
  `<b>Conservative checked tones</b> and vowel contrasts that Shanghai smoothed away.`,
  `<b>Reputation</b>: described across the delta as 石骨鐵硬 "hard as stone and iron", against Suzhou's softness.`
 ],
 swu:[
  `<b>Conservative</b>: keeps voiced initials and checked tones (温州话 Wēnzhōuhuà).`,
  `<b>Opaque</b> even to other Wu speakers — a valley-by-valley patchwork; the famous "code talker" story is undocumented (see History).`
 ],
 xiang:[
  `<b>Old Xiang keeps voiced initials</b> (b-, d-, g-, dz-); New Xiang has devoiced.`,
  `<b>Tones</b>: six in Changsha, more in the conservative south.`,
  `<b>Grammar</b>: 噠 da perfective; 子-suffix nouns.`,
  `<b>Vocabulary</b>: 伢子 yázi "child", 堂客 tángkè "wife", 呷 xiā "eat", 霸蠻 bàmán "stubborn".`
 ],
 nxiang:[
  `<b>Six tones</b>; voiced initials devoiced (often aspirated), but an 入声 class is kept.`,
  `<b>Expanding</b> into Old Xiang territory as Changsha's economy grows.`
 ],
 oxiang:[
  `<b>Voiced initials survive</b> (雙峰 Shuāngfēng, 婁底 Lóudǐ): b-, d-, g-, dz- — a three-way contrast lost in the north 800 years ago.`,
  `<b>Complex</b>: dense sandhi and vowel systems; unintelligible to Beijing speakers.`,
  `<b>Retreating</b>: among the most conservative and most endangered varieties in the family.`
 ],
 gan:[
  `<b>送氣分調 sòngqì fēndiào</b>: aspiration splits tone classes into pairs — a hallmark shared with Wu.`,
  `<b>Middle Chinese 全浊 → aspirated voiceless</b> (the 客贛 Kè–Gàn shared trait).`,
  `<b>Seven tones in Nanchang</b>, with 入声 kept (stop codas in the 昌都 core).`,
  `<b>Vocabulary</b>: 曉得 xiǎode "know", 話 wá "speak, speech", 崽 zǎi "child".`
 ],
 hakka:[
  `<b>Six tones</b> (梅縣 Méixiàn: 陰平・陽平・上・去・陰入・陽入).`,
  `<b>Full -m/-n/-ŋ and -p/-t/-k</b>; Middle Chinese voiced stops become aspirated.`,
  `<b>Grammar</b>: 𠊎 ngai "I", 係 he "to be", 唔 m "not", 冇 mo "not have", 分 bun "give / passive" (分人罵 "be scolded").`,
  `<b>Vocabulary</b>: 屋下 vuk-ha "home", 食朝/食晝/食夜 "breakfast / lunch / dinner", 目汁 "tears".`
 ],
 min:[
  `<b>Seven tones</b> (Taiwanese) with the famous tone circle: a syllable's tone depends on its position in the phrase.`,
  `<b>入声</b> with -p/-t/-k and a glottal -h.`,
  `<b>Two reading strata</b>: 文讀 wéndú / 白讀 báidú — the deepest doublets in Sinitic (石 chio̍h "stone" colloquial, se̍k literary).`,
  `<b>Archaic colloquial layer</b>: no labiodental f- (火 hué "fire", 飛 pe "fly"), 知-group read t-/tʰ- (茶 tê, 陳 tân), softened nasals (*m- → b-, *ŋ- → g-).`,
  `<b>Grammar</b>: 有/無 questions, 咧 teh progressive, 咱 lán "we (inclusive)" vs 阮 gún "we (exclusive)", 予 hō͘ "give", 佇 tī "at".`
 ],
 nmin:[
  `<b>Most archaic Min</b>: Middle Chinese 來母 *l- becomes a fricative (建甌 六・雷・露 with s-), and 知-group keeps t- (竹).`,
  `<b>Isolated</b> behind the Wuyi mountains; the Jian valley was a medieval print capital (建本 Jiànběn editions).`
 ],
 emin:[
  `<b>Seven tones</b> and the most aggressive sandhi in Sinitic — whole phrases fuse into one contour.`,
  `<b>Initial alternation</b>: 聲母類化 shēngmǔ lèihuà changes onsets across word boundaries.`,
  `<b>Diaspora</b>: Hokchia (福清 Hok-chhia) and 長樂 Chánglè speakers built the "Little Fuzhou" districts of New York.`
 ],
 cmin:[
  `<b>Transitional</b>: a Min–Gan–Hakka mix; some scholars class it with Northern Min, others with Gan 撫廣片.`,
  `<b>Neighbour</b>: Central Min proper (閩中片, 三明/沙縣/永安) is the better-defined group to the south, represented by 永安話 Yǒng'ānhuà.`
 ],
 pxmin:[
  `<b>Neither Fuzhou nor Quanzhou</b>: distinctive vowel developments (broken diphthongs) and a tone system that matches neither parent.`,
  `<b>Local identity</b>: 興化 Xīnghuà opera, compact clan plains, and dense hometown networks abroad (the 莆田系 Pútiánxì hospital chains).`
 ],
 smin:[
  `<b>Seven tones</b> with sandhi that swaps tones between syllables; 入声 with -p/-t/-k/-h.`,
  `<b>Continuum</b>: 泉州–漳州–廈門–潮州–雷州–海南, plus 浙南閩語 islands in Zhejiang.`,
  `<b>Grammar</b>: 阮 gún "we (excl.)", 咱 lán "we (incl.)", 食 tsia̍h "eat/drink", 走 cháu "run" (the old sense).`
 ],
 hokkien:[
  `<b>Written tradition</b>: 白話字 pe̍h-ōe-jī (1850s) and 台羅 Tâi-lô; Douglas's Amoy dictionary (1873).`,
  `<b>Accents</b>: 偏泉 piān-Choân, 偏漳 piān-Chiang and mixed (混合 hùnhé) accents map onto settlement history.`,
  `<b>Grammar</b>: 有/無 questions (食飽未? "have you eaten?"), 咧 teh progressive, 予 hō͘ "give", 甲 kah "and, with".`
 ],
 teochew:[
  `<b>Eight tones</b> (more than Taiwanese Hokkien) with a two-syllable sandhi chain; 入声 with -p/-t/-k/-h.`,
  `<b>Vocabulary</b>: 食 tsia̍h "eat", 厝 tshù "house", 目 bák "eye"; Thai loanwords in the Bangkok variety.`,
  `<b>Written</b>: a small 潮州白話字 tradition from 19th-century Presbyterian missions.`
 ],
 leizhou:[
  `<b>Simplified tone system</b> and heavy Cantonese and Kra-Dai contact vocabulary.`,
  `<b>Retreating</b> before Cantonese- and Mandarin-flavoured urban speech inside its own cities.`
 ],
 hainan:[
  `<b>Island conservatism</b>: keeps 入声 codas and early Min layers; 瓊文 Qióngwén is the literary register.`,
  `<b>Contact layers</b>: 黎 Lí (Hlai) and 臨高 Língāo (Kra-Dai) substrate, plus Vietnamese-era settler families near Haikou.`
 ],
 yue:[
  `<b>Nine tones</b> (6 + 3 checked: -p, -t, -k) with -m, -n, -ŋ all intact.`,
  `<b>變調 biàndiào</b> creates new words: 女 neoi5 → neoi2 "daughter", 袋 doi6 → doi2 "bag", 糖 tong4 → tong2 "sweets".`,
  `<b>Grammar</b>: 冇 mou5 "not have", 唔 m4 "not", 係 hai6 "is", 佢 keoi5 "he/she", 哋 dei6 (plural), 嘅 ge3 (possessive), 咗 zo2 (perfective), 緊 gan2 (progressive), 喺 hai2 "at", 俾 bei2 "give".`,
  `<b>Word order</b>: postverbal 先 sin1 "first" and 多啲 "more"; V-得/唔- complements; 過 gwo3 comparatives.`,
  `<b>Vocabulary</b>: 睇 tai2 "look", 企 kei5 "stand", 攰 gui6 "tired", 煲 bou1 "pot, cook", 沖涼 "bathe", 雪櫃 "fridge", 飲 jam2 "drink".`
 ],
 yuehai:[
  `<b>Standard</b>: 廣州話 Gwóngjāu wá — six tones with a rich 變調 system.`,
  `<b>Written</b>: 粵語白話文 vernacular writing and 粵拼 Jyutping romanisation.`,
  `<b>Institutional</b>: official in Hong Kong and Macau, and the language of courts, media and schools there.`
 ],
 siyi:[
  `<b>Divergent</b>: 台山話 Hoi-saan-wá has simplified some affricate contrasts and pronounces 三 with a lateral fricative (ɬaam).`,
  `<b>Diaspora</b>: the 19th-century emigrant language of North American Chinatowns and railroad camps.`
 ],
 hui:[
  `<b>Many tones</b> (6–8 in different valleys) with correspondences that cross-cut geography — the reason it was made a top-level branch.`,
  `<b>Transitional vocabulary</b> between Wu, Gan and Jianghuai; urban 屯溪 Túnxī speech is now heavily Mandarin-influenced.`
 ],
 ping:[
  `<b>Large tone inventories</b> (up to ~10 in some Nanning-area varieties) and 入声 kept.`,
  `<b>Kra-Dai imprint</b> in vocabulary, tone behaviour and syntax; 桂南平話 (Yongjiang) shares much with Yue, 桂北平話 is more divergent.`,
  `<b>Endangered</b>: squeezed by Southwestern Mandarin in the north and Cantonese in the south.`
 ],
 unc:[
  `<b>瓦鄉話 Wǎxiānghuà</b>: a conservative Sinitic core over a contested substrate; ~700k speakers; no standard romanisation.`,
  `<b>Others</b>: 韶州土話 (Shaoguan), 邁話 (Hainan), 儋州話 (Hainan, Yue-related), 軍話 (Mandarin-based islands), 五屯話 Wǔtúnhuà (Chinese–Tibetan–Mongolic mix in Qinghai).`
 ]
};

/* ---------- schematic outline (simplified, embedded; [lng,lat] rings) ---------- */
/* ---------- schematic China outline (simplified, embedded; [lng,lat] rings) ---------- */
const MAINLAND = [[124.3,40.0],[122.5,39.6],[121.3,38.8],[121.9,40.4],[121.0,40.9],[119.6,39.9],[117.7,39.0],[118.9,38.2],[119.2,37.9],[120.3,37.6],[121.4,37.5],[122.7,37.4],[120.4,36.1],[119.5,35.4],[119.4,34.8],[120.9,32.6],[121.5,31.7],[121.9,31.0],[121.3,30.4],[121.6,29.6],[121.3,28.4],[120.7,28.0],[120.2,27.3],[119.6,26.0],[119.5,25.3],[118.7,24.9],[118.1,24.5],[117.4,23.6],[116.7,23.4],[115.9,22.9],[114.8,22.6],[114.1,22.4],[113.5,22.1],[112.7,21.6],[110.4,21.2],[110.3,20.2],[109.9,21.4],[109.2,21.4],[108.6,21.7],[108.0,21.5],[106.6,22.4],[105.3,23.2],[104.3,22.8],[102.9,22.4],[101.7,21.1],[100.1,21.4],[99.2,22.2],[99.5,22.9],[99.0,23.1],[98.9,24.1],[97.6,23.9],[97.7,24.8],[98.7,25.8],[98.4,27.0],[97.9,28.3],[96.6,28.4],[95.0,29.0],[93.0,28.6],[92.0,27.7],[90.0,28.0],[88.9,27.9],[86.0,28.1],[85.0,28.3],[84.0,29.3],[82.0,30.0],[81.0,30.2],[79.7,30.9],[78.7,31.3],[78.8,32.5],[78.8,34.4],[77.0,35.3],[75.9,36.0],[74.6,37.0],[74.9,37.4],[74.9,38.5],[73.5,39.4],[73.6,39.9],[74.8,40.3],[76.6,41.0],[80.2,42.2],[80.3,43.0],[80.1,44.1],[80.4,44.7],[81.9,45.3],[82.6,45.2],[83.2,47.2],[85.5,47.1],[87.3,49.0],[87.8,49.2],[89.1,48.0],[90.7,45.2],[94.1,44.7],[96.4,42.9],[100.0,42.7],[102.0,42.2],[104.9,41.6],[107.4,42.4],[109.9,42.6],[111.9,43.7],[111.5,44.4],[111.9,45.1],[113.6,44.7],[116.0,45.7],[117.4,46.6],[118.5,46.7],[119.3,47.5],[117.9,49.5],[119.8,49.4],[120.7,51.3],[120.5,52.5],[121.6,53.2],[123.5,53.5],[124.5,53.1],[126.5,52.8],[126.0,51.6],[127.3,50.3],[127.5,49.6],[129.0,49.4],[130.5,48.9],[131.5,48.4],[134.3,48.3],[133.7,47.9],[132.5,47.7],[131.3,47.7],[131.0,46.8],[130.6,46.4],[131.3,45.6],[131.1,44.9],[130.4,43.9],[131.3,43.4],[131.3,42.9],[130.4,42.7],[130.6,42.5],[129.0,42.3],[128.1,41.4],[127.0,41.5],[126.9,41.8],[126.1,41.1],[125.5,40.4],[124.3,40.0]];
const TAIWAN = [[121.6,25.2],[121.9,24.6],[121.6,23.4],[121.1,22.5],[120.8,21.9],[120.2,22.5],[120.3,23.6],[120.6,24.4],[121.1,25.1],[121.6,25.2]];
const HAINAN = [[110.3,20.1],[110.7,19.6],[110.5,18.8],[109.6,18.3],[108.8,19.0],[109.3,19.8],[110.3,20.1]];
const CHINA_GEO = { type:'FeatureCollection', features:[MAINLAND,TAIWAN,HAINAN].map(r=>({
  type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };

/* ---------- approximate dialect "core areas" ----------
   Hand-drawn coarse blocks showing roughly where each branch is rooted — NOT surveyed
   dialect boundaries. They deliberately omit enclaves (Jin inside Mandarin, Hakka and
   Mandarin islands, Xinjiang's mixed Chinese) and simplify coastlines. The Language
   Atlas of China's surveyed boundaries are not available as open data, so treat these
   as orientation only; the marker layer remains the factual one. */
/* ---------- approximate dialect "core areas" ----------
   Hand-drawn coarse blocks showing roughly where each branch is rooted — NOT surveyed
   dialect boundaries. They deliberately omit enclaves (Jin inside Mandarin, Hakka and
   Mandarin islands, Xinjiang's mixed Chinese) and simplify coastlines. The Language
   Atlas of China's surveyed boundaries are not available as open data, so treat these
   as orientation only; the marker layer remains the factual one. */
const AREAS = {
 'c-gu':[
  [[112.5,35.2],[116.5,34.9],[118.6,36.2],[119.6,38.2],[118.2,40.6],[120.0,42.6],[123.6,44.2],[126.6,47.2],[127.4,49.6],[123.8,50.2],[121.6,46.4],[119.2,42.4],[114.6,40.6],[113.4,38.2]],
  [[100.6,37.2],[104.2,37.6],[108.2,37.0],[110.0,35.4],[109.4,33.0],[105.8,32.0],[102.8,32.6],[100.6,34.2]],
  [[84.6,43.6],[88.8,44.2],[92.2,43.6],[93.2,42.0],[90.0,40.9],[86.0,41.4],[83.8,42.6]],
  [[102.4,31.6],[106.2,32.6],[108.6,32.0],[110.2,30.8],[111.6,29.4],[110.0,27.4],[108.0,24.8],[105.0,23.8],[102.0,24.4],[100.2,25.6],[99.2,28.2],[100.6,30.2]],
  [[116.4,33.6],[119.0,34.6],[120.6,33.0],[121.0,31.4],[119.0,30.4],[117.0,30.4],[116.0,32.0]]
 ],
 'c-jin':[[[110.6,35.0],[112.6,34.9],[114.4,36.0],[114.6,38.6],[113.6,40.6],[111.6,41.2],[109.8,40.2],[110.2,38.0],[110.0,36.6]]],
 'c-wu':[[[118.6,31.8],[120.0,32.4],[121.6,31.6],[122.2,30.0],[120.6,28.0],[119.0,27.4],[117.8,28.4],[117.6,30.4]]],
 'c-hui':[[[117.3,30.3],[118.6,30.5],[119.3,29.6],[118.6,29.0],[117.5,29.3]]],
 'c-gan':[[[114.0,29.8],[116.6,29.9],[117.6,28.0],[116.6,26.0],[114.6,25.8],[113.6,27.0],[113.6,28.8]]],
 'c-xiang':[[[109.4,29.6],[112.0,29.8],[113.6,28.4],[113.0,26.0],[111.0,25.0],[109.0,26.0],[108.8,28.0]]],
 'c-hak':[
  [[113.4,25.6],[116.6,26.0],[117.0,24.4],[115.4,23.0],[113.4,23.0],[112.4,24.0]],
  [[120.1,25.3],[121.5,25.3],[121.5,22.5],[120.2,22.4]]
 ],
 'c-min':[
  [[116.5,27.8],[118.6,28.0],[120.0,27.0],[119.5,25.0],[118.0,24.3],[116.8,25.0],[116.5,26.5]],
  [[115.8,24.0],[117.2,24.4],[117.2,23.0],[115.8,22.8]],
  [[119.9,27.5],[121.0,27.5],[121.0,26.8],[119.9,26.9]],
  [[108.6,20.1],[110.6,20.1],[110.6,18.2],[108.6,18.4]],
  [[109.7,21.5],[110.6,21.5],[110.6,20.3],[109.8,20.3]]
 ],
 'c-yue':[[[110.8,23.6],[113.6,23.8],[114.6,22.8],[114.0,21.8],[112.4,21.6],[109.2,21.3],[108.0,22.4],[110.0,23.6]]],
 'c-ping':[
  [[107.8,23.2],[109.4,23.4],[109.4,22.4],[107.9,22.4]],
  [[108.9,25.6],[110.3,25.7],[110.3,24.4],[108.9,24.4]]
 ],
 'c-unc':[
  [[110.0,29.0],[111.2,29.0],[111.2,28.2],[110.0,28.2]],
  [[113.3,25.3],[114.5,25.3],[114.5,24.3],[113.3,24.4]],
  [[109.0,19.9],[109.9,19.9],[109.9,19.2],[109.0,19.2]]
 ]
};

/* ---------- listen links: curated audio where a stable public source exists,
   plus a never-rotting YouTube search fallback on every node ---------- */
/* ---------- listen links: curated audio where a stable public source exists,
   plus a never-rotting YouTube search fallback on every node ---------- */
const yt = q => 'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
const OM = 'https://www.omniglot.com/chinese/';   // per-variety pages with recordings & samples
const FV = 'https://forvo.com/languages/';        // word-level native pronunciations (by ISO code)
const SOUND = {
 sinitic:    [['Spoken Chinese — Omniglot', OM+'spoken.htm']],
 ancient:    [],
 old:        [['How Old Chinese sounded ▶', yt('Old Chinese reconstruction pronunciation audio')]],
 middle:     [['Middle Chinese pronunciation ▶', yt('Middle Chinese reconstruction pronunciation audio Qieyun')]],
 oldmand:    [['Zhongyuan Yinyun ▶', yt('Zhongyuan Yinyun 中原音韻 pronunciation demo')]],
 guanhua:    [['Mandarin — Omniglot', OM+'mandarin.htm'], ['Word audio — Forvo', FV+'zh/']],
 dongbei:    [['东北话 ▶', yt('东北话 Dongbei dialect native speaker')]],
 beijingmd:  [['北京话 ▶', yt('北京话 old Beijing dialect speaker')]],
 jiaoliao:   [['烟台话 ▶', yt('烟台话 Yantai Jiaoliao dialect')]],
 jilu:       [['济南话 ▶', yt('济南话 Jinan dialect')]],
 zhongyuan:  [['河南话 ▶', yt('河南话 Henan dialect native')]],
 lanyin:     [['兰州话 ▶', yt('兰州话 Lanzhou dialect')], ['Dungan — Omniglot', OM+'dungan.htm']],
 xinan:      [['四川话 ▶', yt('四川话 Sichuanese dialect native speaker')]],
 jianghuai:  [['南京话 ▶', yt('南京话 Nanjing dialect')]],
 jin:        [['Jin word audio — Forvo', FV+'cjy/'], ['太原话 ▶', yt('太原话 Taiyuan Jin dialect')]],
 wu:         [['Wu — Omniglot', OM+'wu.htm'], ['Wu word audio — Forvo', FV+'wuu/']],
 shanghainese:[['Shanghainese — Omniglot', OM+'shanghainese.htm'], ['Word audio — Forvo', FV+'wuu/']],
 suzhounese: [['苏州话 ▶', yt('苏州话 Suzhou dialect speaker')]],
 ningbomd:   [['宁波话 ▶', yt('宁波话 Ningbo dialect speaker')]],
 swu:        [['Wenzhounese — Omniglot', OM+'wenzhounese.htm']],
 xiang:      [['Xiang — Omniglot', OM+'xiang.htm'], ['Xiang word audio — Forvo', FV+'hsn/']],
 nxiang:     [['长沙话 ▶', yt('长沙话 Changsha dialect')]],
 oxiang:     [['老湘语 娄底 ▶', yt('娄底话 old Xiang Loudi Shuangfeng dialect')]],
 gan:        [['Gan — Omniglot', OM+'gan.htm'], ['Gan word audio — Forvo', FV+'gan/']],
 hakka:      [['Hakka — Omniglot', OM+'hakka.htm'], ['Hakka word audio — Forvo', FV+'hak/']],
 min:        [['Min — Omniglot', OM+'min.htm']],
 nmin:       [['Jian\'ou — Omniglot', OM+'jianou.htm'], ['建瓯话 ▶', yt('建瓯话 Jian\'ou dialect')]],
 emin:       [['Fuzhounese — Omniglot', OM+'fuzhounese.htm'], ['Word audio — Forvo', FV+'cdo/']],
 cmin:       [['邵武话 ▶', yt('邵武话 Shaowu dialect')]],
 pxmin:      [['Puxian — Omniglot', OM+'puxian.htm'], ['莆田话 ▶', yt('莆田话 Puxian dialect')]],
 smin:       [['Min Nan word audio — Forvo', FV+'nan/']],
 hokkien:    [['Hokkien — Omniglot', OM+'taiwanese.htm'], ['Word audio — Forvo', FV+'nan/']],
 teochew:    [['Teochew — Omniglot', OM+'teochew.htm'], ['潮州话 ▶', yt('Teochew dialect native speaker 潮州话')]],
 leizhou:    [['雷州话 ▶', yt('雷州话 Leizhou dialect')]],
 hainan:     [['海南话 ▶', yt('海南话 Hainanese Haikou dialect')]],
 yue:        [['Yue — Omniglot', OM+'yue.htm']],
 yuehai:     [['Cantonese — Omniglot', OM+'cantonese.htm'], ['Cantonese word audio — Forvo', FV+'zh-yue/']],
 siyi:       [['Taishanese ▶', yt('Taishanese Sze Yup dialect native speaker')]],
 hui:        [['徽语 ▶', yt('徽语 歙县方言 Huizhou dialect')]],
 ping:       [['平话 ▶', yt('广西平话 Pinghua dialect')]],
 unc:        [['瓦乡话 ▶', yt('Waxiang 瓦乡话 language')]]
};

/* ===================== the atlas contract (languages.md §1.3) ===================== */
window.ATLASES = window.ATLASES || {};
window.ATLASES.sinitic = {
  key: 'sinitic',
  title:   { zh: '汉语', en: 'Branches of Chinese' },
  tagline: 'An interactive atlas of the Sinitic languages — family tree, geography, and history',
  stats:   [["10","branches"],["~1.4B","speakers"],["3,000","yrs attested"]],
  palette: {
    "anc": "#e8dcc0",
    "gu": "#e0b558",
    "jin": "#ef8354",
    "wu": "#4fc3d9",
    "xiang": "#b07de0",
    "gan": "#e2657a",
    "hak": "#5a8fe8",
    "min": "#4ecf8f",
    "yue": "#e64f5e",
    "hui": "#a9be5c",
    "ping": "#d98cc4",
    "unc": "#8b94a8"
  },
  legend:  [["anc","Ancestral / proto"],["gu","Mandarin"],["jin","Jin"],["wu","Wu"],["xiang","Xiang"],["gan","Gan"],["hak","Hakka"],["min","Min"],["yue","Yue"],["hui","Hui"],["ping","Ping"],["unc","Unclassified"]],
  view:    { center: [110, 32.5], zoom: 3.8 },
  outline: { color: '#d4a94f', fill: 'rgba(212,169,79,0.06)' },
  sketchGeo: CHINA_GEO,
  captions: {
    note:   "● Markers show <b>representative cities</b> where the selected variety is rooted; diaspora points appear for overseas communities. Markers mark where a variety is <em>rooted</em>, not the everyday speech of a whole city — most large Chinese cities are now heavily Mandarin-speaking.",
    areas:  "<b style=\"color:var(--gold)\">Approximate core areas</b> — hand-drawn blocks showing roughly where each branch is rooted. They follow no surveyed boundary, omit enclaves (Jin inside Mandarin, Hakka and Mandarin islands, Xinjiang's mixed Chinese) and are deliberately coarse: real dialect boundaries are graded and follow valleys and rivers. The <i>Language Atlas of China</i>'s surveyed boundaries are not available as open data.",
    sketch: "<b style=\"color:var(--gold)\">Schematic map</b> — simplified coastline &amp; borders drawn from memory of the geography; city markers sit at true coordinates. Works fully offline."
  },
  fonts: ['Noto Serif SC'],
  filterPlaceholder: 'e.g. Teochew, Wu, Hakka…',
  listen: {
    om: 'https://www.omniglot.com/chinese/',
    fv: 'https://forvo.com/languages/',
    search: 'Chinese dialect listening native speaker'
  },
  rootId: 'sinitic',
  stages: ['ancient', 'old', 'middle', 'oldmand'],
  zhSuppress: ['古', '未分'],
  sources: "Sources: <b>Language Atlas of China</b> 中国语言地图集 (1987; 2nd ed. 2012) · J. Norman, <i>Chinese</i> (1988) · 曹志耘 (ed.), 汉语方言地图集 / <i>Linguistic Atlas of Chinese Dialects</i> (2008) · 李荣 (1985) on the Mandarin sub-groups · Ethnologue (2021-era counts). Speaker figures are approximations and vary widely between sources, because dialects form continua rather than bounded areas. Romanisation: Hanyu Pinyin unless marked — Jyutping for Cantonese, pe̍h-ōe-jī for Hokkien, ISO 639-3 codes from SIL; where a non-Mandarin character is glossed with its Mandarin pinyin reading, that is a guide for English readers, not a phonetic transcription of the local pronunciation.",
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();
