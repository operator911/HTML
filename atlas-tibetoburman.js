/* atlas-tibetoburman.js — Tibeto-Burman 藏缅语族
 * ---------------------------------------------------------------------------
 * Data file for EastAsiaAtlas.html (see languages.md §1.3 for the contract,
 * §2.7 for this family's brief, and research.md §"Tibeto-Burman (Phase 6)" for
 * the evidence log — every load-bearing date, figure and classification below
 * is logged there as TB-101 … TB-110).
 *
 * THE HEADLINE CAVEAT, and it is not a small one. This atlas is titled
 * "Tibeto-Burman" because that is the conventional name, but the conventional
 * name describes a grouping that has NOT been demonstrated to be a valid
 * subgroup in its own right — see research.md [TB-101], where Benedict (1972)
 * and Matisoff are quoted saying so. The atlas therefore presents the tree as
 * a working classification rather than a proven one, and says so on the root
 * node and in the caption. If you are reading this file to reuse its shape,
 * read [TB-101] first.
 *
 * Second caveat: 350+ languages are known in this grouping. This atlas picks
 * ~55 nodes and groups the rest, in the "honest fog bank" style the Sinitic
 * atlas already uses. The `more` node exists to say so out loud.
 * ---------------------------------------------------------------------------
 */
(function () {
'use strict';

/* ===================== classification tree ===================== */
const DATA = {
 id:"tibetoburman", en:"Tibeto-Burman", zh:"藏缅语族", py:"Zàng-Miǎn yǔzú",
 sp:"≈330 million, by source — the second-largest grouping in the series",
 region:"The Tibetan plateau, the Himalayan arc, Sichuan and Yunnan, Nepal, Bhutan, Northeast India, Bangladesh and Myanmar",
 cls:"c-anc", mk:[],
 h:[`Tibeto-Burman is the rest of Sino-Tibetan: everything in that family that is not Sinitic. It runs from the Tibetan plateau down the Himalayan arc into Nepal, Bhutan, Northeast India and Myanmar, and east into the Sichuan and Yunnan highlands where China's own minority languages are concentrated. By speaker numbers it is dominated by Burmese and the Tibetic languages; by language numbers it is the most diverse grouping in Asia.`,
   `<b>But the grouping itself is contested, and the atlas leads with that.</b> Tibeto-Burman is conventionally treated as one half of Sino-Tibetan, and the tree below follows that convention. The convention is not a demonstration: the standard critical position is that Tibeto-Burman "has not been demonstrated to be a valid subgroup in its own right", and that the family's shape depends heavily on whether Sinitic is placed inside it or beside it. The tree here is therefore a working map of scholarly usage, not a proven genealogy — see <i>research.md</i> TB-101.`,
   `A second honest limit: there are <b>350 or more</b> languages in this grouping. This atlas shows about fifty-five of them, chosen because they are the ones with literary traditions, official status, or a place in the comparative literature. The remaining hundreds are represented by a single node that says so rather than by silence. That is the same device the Sinitic atlas uses for its own smaller languages.`,
   `What unites the branch as a story is script. This is where the series' writing systems multiply: the Tibetan script and its descendant Dzongkha, the Limbu script, the Yi syllabary still taught in Sichuan schools, the pictographic Dongba corpus of the Naxi, and — cross-listed from the Silk Road atlas — the extinct Tangut script of the Western Xia.`],
 t:[["mid-7th c. CE","The Tibetan Empire adopts writing; Old Tibetan documents begin"],
    ["1038–1227","Tangut and its script flourish in the Western Xia, then vanish"],
    ["11th–15th c.","Burmese, Newar and Tibetan literary traditions mature"],
    ["1974","The modern Yi syllabary is standardised for Liangshan Nuosu"],
    ["20th–21st c.","Nepal, Bhutan, India and China all legislate on these languages"]],
 kids:[
  { id:"prototb", en:"Proto-Tibeto-Burman", zh:"原始藏缅语", py:"Yuánshǐ Zàng-Miǎn yǔ",
    sp:"reconstructed", region:"Homeland argued to lie in the eastern Himalayan margin or the Sichuan–Yunnan highlands",
    cls:"c-anc", mk:[[28.0,88.0,"Proposed Himalayan-margin homeland"],[27.0,101.0,"Proposed Sichuan–Yunnan homeland"]],
    h:[`The reconstructed ancestor of the non-Sinitic half of Sino-Tibetan, assembled chiefly by James Matisoff in the <i>Handbook of Proto-Tibeto-Burman</i> (2003) and in a long series of papers. It is a reconstruction of the same order as Proto-Tungusic or Proto-Mongolic, and like them it has no agreed date.`,
       `<b>Its status is the family's central problem.</b> Paul Benedict (1972) and later Matisoff both held that Tibeto-Burman "has not been demonstrated to be a valid subgroup in its own right" — meaning that the languages grouped under it may not descend from a single ancestor to the exclusion of Sinitic, and that the division of Sino-Tibetan into "Sinitic" and "everything else" is a convenience. Matisoff also demoted Karen from its old position, and explicitly declined to claim that the large geographic groupings he used (Kamarupan, Himalayish) have any special relationship to each other "other than a geographic one".`,
       `The atlas shows the reconstruction because the tree needs a root, not because the root is secure. Where Matisoff's own groupings are openly geographic, the nodes below are named so that a reader can see it.`],
    t:[["1972","Benedict's <i>Sino-Tibetan: A Conspectus</i> fixes the conventional shape"],
       ["1974–","Matisoff's <i>STEDT</i> project assembles the comparative database"],
       ["2003","Matisoff, <i>Handbook of Proto-Tibeto-Burman</i>"]],
    kids:[

     { id:"oldtibetan", en:"Old Tibetan", zh:"古藏语", py:"Gǔ Zàngyǔ",
       sp:"extinct as a spoken stage; the written standard persists", region:"The Tibetan Empire — Lhasa, the Yarlung valley, and the Dunhuang cave library",
       cls:"c-tib", mk:[[29.65,91.14,"Lhasa"],[29.24,91.79,"Yarlung valley — the empire's origin"],[40.14,94.66,"Dunhuang — the cave library documents"],[29.65,91.10,"Samye"]],
       h:[`Old Tibetan is the earliest recorded stage of the language, "reflected in documents from the adoption of writing by the Tibetan Empire in the mid-7th century to the early 9th century". The script was devised then, on an Indian model, and it has been in continuous use ever since — which makes Tibetan one of the few writing traditions in this atlas that never lapsed.`,
          `Its most important archive is unexpected: the sealed cave library at <b>Dunhuang</b>, on the Silk Road's Hexi corridor, where Tibetan-ruled documents sat undisturbed for centuries alongside Chinese, Sogdian and Uyghur material. The Tibetan occupation of Dunhuang is why Old Tibetan is as well documented as it is.`,
          `Old Tibetan is a <em>stage</em>, not a branch: the modern Tibetic languages descend from it and from the varieties contemporary with it, and the written classical language derived from it remained the vehicle of Tibetan Buddhist scholarship long after the spoken forms had diverged.`],
       t:[["mid-7th c.","The Tibetan Empire adopts writing; Old Tibetan texts begin"],
          ["c. 779","Samye monastery founded; translation of Buddhist canon begins"],
          ["781–848","Tibetan rule at Dunhuang; the cave library accumulates"],
          ["early 9th c.","Old Tibetan gives way to Classical Tibetan as a written standard"],
          ["1900","The Dunhuang cave library is rediscovered"]],
       kids:[

        { id:"tibetic", en:"Tibetic", zh:"藏语支", py:"Zàngyǔ zhī",
          sp:"≈6 million, by source", region:"The Tibetan plateau and the Himalayan rim — Tibet, Qinghai, Sichuan, Bhutan, Ladakh, Baltistan, Nepal",
          cls:"c-tib", mk:[],
          h:[`The Tibetic languages are the descendants of Old Tibetan, spread across the whole plateau and over the Himalayan rim into Bhutan, Ladakh, Baltistan, Nepal and northern India. They form a dialect continuum rather than a set of sharply separated languages, and how many "languages" there are depends entirely on where a scholar draws the lines.`,
             `The traditional three-way division is geographic and reflects the history of Tibetan political fragmentation: <b>Ü-Tsang</b> in the centre (Lhasa and Shigatse), <b>Kham</b> in the east, and <b>Amdo</b> in the northeast. The western and southern varieties — Ladakhi, Balti, Sherpa, Dzongkha — sit outside that division and are the ones that became national or regional languages in other states.`,
             `Script is what holds the group together visually. All of them use the Tibetan script, and the written classical language is shared, so a Ladakhi and a Bhutanese reader share a literary inheritance even where their speech is not mutually intelligible.`],
          t:[["mid-7th c.","Old Tibetan writing; the ancestor of the group"],
             ["9th–10th c.","The empire fragments; regional varieties diverge"],
             ["17th c.","Dzongkha and the Bhutanese state; Ladakh under Tibetan cultural influence"],
             ["1950s–","Chinese administration in Tibet reshapes the language's public role"]],
          kids:[

           { id:"lhasa", en:"Lhasa Tibetan (Ü-Tsang)", zh:"拉萨藏语", py:"Lāsà Zàngyǔ",
             sp:"the standard variety, by source", region:"Lhasa, Shigatse and the Ü-Tsang provinces of central Tibet",
             cls:"c-tib", mk:[[29.65,91.14,"Lhasa"],[29.27,88.88,"Shigatse"],[29.30,90.30,"Yamdrok"],[29.70,91.10,"Sera / Drepung monasteries"]],
             h:[`The central Tibetan varieties of Ü and Tsang, and the basis of the modern standard. Lhasa speech is what a learner outside Tibet is most likely to be taught, and it is the variety with the largest literary and broadcast presence.`,
                `It is tonal, like most Tibetic varieties but not all — the group's tonality is a development from a non-tonal ancestor, and the tones correspond systematically to lost initial consonants. That is the same process, in the same family, that the Sinitic atlas describes for Chinese.`],
             t:[["7th c.","Old Tibetan at Lhasa and the Yarlung valley"],
                ["1642","The Dalai Lamas' government centres on Lhasa; the dialect's prestige follows"],
                ["1959–","Emigration spreads Lhasa speech to India and the West"],
                ["20th–21st c.","Standard Tibetan in broadcasting and teaching"]],
             chips:[["Tibetan script","scr"],["tonal","scr"]] },

           { id:"kham", en:"Kham Tibetan (Khams)", zh:"康巴藏语", py:"Kāngbā Zàngyǔ",
             sp:"≈1.5 million, by source", region:"Eastern Tibet and western Sichuan — Chamdo, Dêgê, Garzê and the Yunnan Tibetan areas",
             cls:"c-tib", mk:[[31.14,97.17,"Chamdo (Qamdo)"],[31.81,99.25,"Dêgê (the printing house)"],[31.62,100.00,"Garzê"],[27.83,99.71,"Dechen, Yunnan"]],
             h:[`The eastern Tibetan varieties, spread across a region that is now split between the Tibet Autonomous Region, Sichuan, Qinghai and Yunnan. Kham is politically fragmented and linguistically diverse: "Kham Tibetan" names a group of varieties, not one language, and mutual intelligibility across the group is limited.`,
                `Its cultural weight is out of proportion to its population. Dêgê's printing house was for centuries one of the great centres of Tibetan textual production, and Kham was the base for much of the nineteenth-century Buddhist revival movement that later travelled to the West.`],
             t:[["9th–10th c.","Kham varieties diverge as the empire fragments"],
                ["1441","Dêgê printing house founded"],
                ["19th c.","The <i>ris med</i> non-sectarian movement spreads from Kham"],
                ["20th c.","Kham divided between several Chinese provinces"]],
             chips:[["Tibetan script","scr"],["dialect cluster","scr"]] },

           { id:"amdo", en:"Amdo Tibetan", zh:"安多藏语", py:"Ānduō Zàngyǔ",
             sp:"≈1.8 million, by source", region:"Qinghai, southern Gansu and northern Sichuan — Xining and the Kokonor region",
             cls:"c-tib", mk:[[36.62,101.78,"Xining"],[36.20,100.60,"Kokonor (Qinghai Lake)"],[35.00,102.90,"Labrang"],[34.30,103.20,"Tewo / Gannan"]],
             h:[`The northeastern Tibetan varieties, in Qinghai, Gansu and northern Sichuan. Amdo is the most conservative of the three great divisions in some respects — notably it retains initial consonant clusters that Lhasa has simplified — and it is the variety in which the classic grammatical descriptions of Tibetan were built.`,
                `Amdo was politically independent of the Lhasa government for long periods, and the Dalai Lama was born in Amdo — a fact that matters for how the region's religious and linguistic geography is understood.`],
             t:[["9th–10th c.","Amdo varieties separate from central Tibetan"],
                ["17th–18th c.","Labrang monastery becomes a major scholarly centre"],
                ["20th c.","Amdo's varieties documented in detail by Western and Chinese linguists"]],
             chips:[["Tibetan script","scr"],["conservative — keeps old clusters","scr"]] },

           { id:"dzongkha", en:"Dzongkha", zh:"宗喀语", py:"Zōngkā yǔ",
             sp:"≈640,000 total speakers, by source", region:"Bhutan — Thimphu and the western valleys, with a national role",
             cls:"c-bod", mk:[[27.47,89.64,"Thimphu"],[27.43,89.42,"Paro"],[27.58,89.86,"Punakha"],[27.10,89.30,"Phuentsholing"]],
             h:[`Dzongkha is the national language of Bhutan — the one Tibetic variety that is the language of a state rather than of a province or a diaspora. It is a Tibetic language "primarily spoken by the Bhutanese people", and it is closest to the Tibetan varieties of the western valleys.`,
                `Its official status is recent and its position is genuinely complicated. Bhutan's population is linguistically diverse — Sharchop in the east, Nepali-speaking communities in the south — and Dzongkha is the language of the western region elevated to national use. The source gives total speakers as <b>640,000</b>.`,
                `The script is the Tibetan script with Bhutanese orthographic conventions; the name <i>Dzongkha</i> means "the language of the fortress", from the <i>dzong</i> citadels that are Bhutan's administrative and monastic centres.`],
             t:[["17th c.","The Bhutanese state consolidates around the western valleys and their speech"],
                ["1950s–1960s","Dzongkha is promoted as the national language"],
                ["1980s–","Schooling in Dzongkha expands; southern Nepali-speaking communities are affected"],
                ["21st c.","≈640,000 speakers, by source"]],
             chips:[["Tibetan script","scr"],["national language of Bhutan","scr"]] },

           { id:"ladakhi", en:"Ladakhi (Bhoti)", zh:"拉达克语", py:"Lādákè yǔ",
             sp:"≈110,000, by source", region:"Ladakh, in the Indian union territory — Leh and the Indus valley",
             cls:"c-bod", mk:[[34.16,77.58,"Leh"],[34.55,76.13,"Kargil (Purik)"],[33.50,78.20,"Hanle"],[34.00,77.00,"Indus valley"]],
             h:[`Ladakhi is the westernmost Tibetic language of any size, spoken in the Indus valley of Ladakh — now a union territory of India, on the frontier between the Tibetan, Indian and Central Asian worlds. It is written in the Tibetan script, and the whole of its literary and religious inheritance is Tibetan Buddhist.`,
                `Its position is a study in how political borders cut language areas. Ladakhi is a Tibetan language in an Indian territory, next to Balti (a Tibetan language in Pakistan), with Chinese-administered Tibet to the east — so the same dialect continuum is divided between three states with three different language policies.`],
             t:[["10th–17th c.","The Namgyal dynasty rules Ladakh; Tibetan script and Buddhism arrive"],
                ["1834–1842","Dogra conquest; Ladakh joins the Dogra state, then India"],
                ["1947–","Ladakh's position on the India–China frontier hardens"],
                ["2019","Ladakh becomes a union territory of India"]],
             chips:[["Tibetan script","scr"],["split by an international border","scr"]] },

           { id:"balti", en:"Balti", zh:"巴尔蒂语", py:"Bā'ěrdì yǔ",
             sp:"≈400,000, by source", region:"Baltistan, in Pakistan-administered Gilgit-Baltistan — Skardu and the Indus and Shyok valleys",
             cls:"c-bod", mk:[[35.30,75.63,"Skardu"],[35.85,74.55,"Gilgit area"],[35.10,76.20,"Shigar"],[35.25,76.15,"Khaplu"]],
             h:[`Balti is a Tibetic language of the Karakoram, spoken in Baltistan — the same dialect continuum as Ladakhi, on the other side of a border. It is the westernmost Tibetic variety of all, and it is unusual within the group in that most of its speakers are <b>Muslim</b> rather than Buddhist, so its literary language is Urdu and its religious vocabulary Persian and Arabic rather than Tibetan.`,
                `That combination — a Tibetic language with a Perso-Arabic literary superstratum — makes Balti the atlas's clearest illustration that a language family is not a culture. The grammar is Tibetan; the written world it belongs to is not.`],
             t:[["c. 700–","Tibetan expansion reaches Baltistan; the language is established"],
                ["14th–15th c.","Islam spreads in Baltistan; Persian and Arabic vocabulary enters"],
                ["1842–1947","Part of the Dogra state; then Pakistan-administered"],
                ["21st c.","≈400,000 speakers, by source"]],
             chips:[["Tibetan script historically","scr"],["Urdu / Perso-Arabic literacy","scr"]] },

           { id:"sherpa", en:"Sherpa", zh:"夏尔巴语", py:"Xià'ěrbā yǔ",
             sp:"≈150,000, by source", region:"Solukhumbu and the Everest region of Nepal, with communities in Darjeeling and abroad",
             cls:"c-bod", mk:[[27.80,86.71,"Namche Bazaar, Solukhumbu"],[27.82,86.71,"Everest region"],[27.04,88.26,"Darjeeling"],[27.72,85.30,"Kathmandu valley"]],
             h:[`Sherpa is a Tibetic language of the Everest region of Nepal — the language of the people who made high-altitude mountaineering a profession. It is closely related to the Tibetan of the border valleys and is written, when written, in the Tibetan script.`,
                `Its speaker base is unusual among Tibetic languages: migration to Kathmandu, Darjeeling and overseas has created communities well beyond the original valleys, so Sherpa is one of the few Tibetic varieties with a significant diaspora and a tourist-driven reason for outsiders to learn it.`],
             t:[["c. 15th–16th c.","Sherpa communities settle the Solukhumbu from the Tibetan border"],
                ["1830s–","Migration to Darjeeling begins"],
                ["1953","The Everest ascent makes Sherpa a global word"],
                ["20th–21st c.","Diaspora in Kathmandu and abroad; tourism sustains the language"]],
             chips:[["Tibetan script","scr"],["significant diaspora","scr"]] },

           { id:"zhangzhung", en:"Zhangzhung", zh:"象雄语", py:"Xiàngxióng yǔ",
             sp:"extinct", region:"Western Tibet — the Ngari region and around Mount Kailash",
             cls:"c-zz", mk:[[31.07,81.31,"Mount Kailash"],[30.63,81.20,"Lake Manasarovar"],[32.50,80.10,"Ngari / Guge"]],
             h:[`The pre-Buddhist language of the western plateau, preserved almost entirely in the <b>Bon</b> religious corpus — the tradition that predates Buddhism in Tibet and kept Zhangzhung material alive inside its texts.`,
                `It is <b>cross-listed</b>: the Silk Road atlas carries the same node, because Zhangzhung belongs both to the Tibetic story and to the Silk Road's account of lost languages. See <a href="#silkroad/zhangzhung">Silk Road → Zhangzhung</a>.`],
             t:[["c. 1st millennium CE","Zhangzhung is the kingdom of the western plateau"],
                ["c. 7th–8th c.","The Tibetan empire absorbs it; the language recedes"],
                ["c. 10th–11th c.","Zhangzhung material survives inside the Bon canon"]],
             chips:[["Zhangzhung script (Bon)","scr"],["partial","dec und"],["cross-listed → Silk Road","scr"]] }] }] },

     { id:"bodish", en:"Bodish / Greater Tibetan", zh:"藏语群（广义）", py:"Zàngyǔ qún (guǎngyì)",
       sp:"a geographic grouping", region:"Bhutan, Nepal, and the Himalayan rim from Arunachal to western Nepal",
       cls:"c-bod", mk:[],
       h:[`The languages grouped here are the Himalayan rim's Tibetic-related languages: Tshangla and Bumthang in Bhutan, Tamang and Gurung in Nepal. They are conventionally placed together as "Greater Tibetan" or "Bodish", and they share much of the Tibetan lexicon and a Tibetan-derived script tradition.`,
          `<b>The grouping is partly geographic, and the atlas says so.</b> The "Bodish" label covers languages whose relationship to Tibetic proper varies — some are close enough to be treated as Tibetan varieties, others are distinct enough that their inclusion is argued about. This is exactly the caution Matisoff attached to his own large groupings, noted at the root node and in <i>research.md</i> TB-101.`,
          `The area is also where the family meets the Indo-Aryan world: Tamang and Gurung speakers in Nepal live alongside Nepali, an Indo-Aryan language, and the vocabulary traffic runs both ways.`],
       t:[["c. 10th–13th c.","Tibetan cultural and religious expansion along the Himalayan rim"],
          ["17th c.","The Bhutanese state consolidates; Bumthang and Tshangla areas included"],
          ["18th c.","The Gorkha conquest unifies Nepal; Nepali becomes dominant"],
          ["20th–21st c.","Tamang and Gurung recognised as national languages of Nepal"]],
       kids:[

        { id:"tshangla", en:"Tshangla (Sharchop)", zh:"仓洛语", py:"Cāngluò yǔ",
          sp:"≈170,000, by source", region:"Eastern Bhutan (Trashigang, Mongar) and adjacent Arunachal Pradesh",
          cls:"c-bod", mk:[[27.33,91.55,"Trashigang, east Bhutan"],[27.28,91.24,"Mongar"],[27.10,92.00,"Samdrup Jongkhar"],[27.30,93.00,"Arunachal Pradesh"]],
          h:[`Tshangla is the language of the Sharchop — "easterners" — who form a large part of Bhutan's population. It is the major language of eastern Bhutan, unrelated in origin to the Dzongkha of the west, and it is not mutually intelligible with it.`,
             `Its position in Bhutan is the atlas's neat illustration of how a small state handles internal diversity: one national language in the west, a large and separate Tibetic-related language in the east, and a Nepali-speaking population in the south. Tshangla is written, when written, in the Tibetan script.`],
          t:[["c. 10th–13th c.","Tibetan-related settlement of eastern Bhutan"],
             ["17th c.","The Bhutanese state forms in the west; the east keeps its own speech"],
             ["20th–21st c.","≈170,000 speakers, by source"]],
          chips:[["Tibetan script","scr"]] },

        { id:"bumthang", en:"Bumthang", zh:"布姆唐语", py:"Bùmǔtáng yǔ",
          sp:"≈30,000, by source", region:"Central Bhutan — the Bumthang valleys of Jakar, Ura and Tang",
          cls:"c-bod", mk:[[27.55,90.75,"Jakar, Bumthang"],[27.62,90.90,"Ura"],[27.52,90.60,"Tang"],[27.55,91.00,"Zhemgang"]],
          h:[`Bumthang is the language of central Bhutan, and it belongs to a small cluster of related central Bhutanese languages that are among the least documented Tibetic-related varieties of the Himalayan rim. The Bumthang valleys are historically the spiritual heartland of Bhutan — the first Buddhist temples are there — so the language sits in a place of great cultural weight with a small speaker base.`,
             `Like Tshangla it is distinct from Dzongkha, and the two are not mutually intelligible, which is why "Bhutanese" is not a single language and the atlas does not treat it as one.`],
          t:[["7th–8th c.","The Bumthang valleys receive the earliest Buddhist temples in Bhutan"],
             ["17th c.","The Bhutanese state forms; Bumthang is incorporated"],
             ["20th–21st c.","≈30,000 speakers, by source"]],
          chips:[["Tibetan script","scr"],["central Bhutan cluster","scr"]] },

        { id:"tamang", en:"Tamang", zh:"塔芒语", py:"Tǎmáng yǔ",
          sp:"≈1.35 million, by source", region:"Nepal — the Kathmandu valley rim, Rasuwa, Sindhupalchok and the hills around the capital",
          cls:"c-bod", mk:[[28.10,85.30,"Rasuwa"],[27.78,85.70,"Sindhupalchok"],[27.70,85.30,"Kathmandu valley rim"],[28.00,84.90,"Dhading"]],
          h:[`Tamang is the largest Tibetic-related language of Nepal after Nepali itself, spoken around and north of the Kathmandu valley by the Tamang people — one of Nepal's largest ethnic groups. It has a Tibetan-derived script tradition and a strong oral literature.`,
             `Tamang is where the atlas's family meets its politics. Nepal's 2015 constitution and subsequent legislation recognised a long list of "national languages", Tamang among them, but Nepali remains the language of administration and schooling, and Tamang — like most of Nepal's minority languages — is losing ground among younger urban speakers even as its official recognition grows.`],
          t:[["c. 10th–13th c.","Tibetan-related populations settle the Nepal hills"],
             ["18th c.","Gorkha unification; Nepali becomes the state language"],
             ["1990 / 2015","Nepal's constitutions address minority language rights"],
             ["21st c.","≈1.35 million speakers, by source — but shifting to Nepali"]],
          chips:[["Tibetan-derived script","scr"],["Nepal national language","scr"]] },

        { id:"gurung", en:"Gurung (Tamu Kyi)", zh:"古隆语", py:"Gǔlóng yǔ",
          sp:"≈325,000, by source", region:"Central Nepal — Lamjung, Gorkha, Kaski and the Annapurna region, with Gurkha diaspora communities",
          cls:"c-bod", mk:[[28.30,84.20,"Lamjung"],[28.28,84.63,"Gorkha"],[28.21,83.99,"Pokhara (Kaski)"],[27.60,84.00,"Chitwan"]],
          h:[`Gurung is a Tibetic-related language of central Nepal, in the hills north of Pokhara. Its speakers are historically associated with the Gurkha regiments, and the resulting diaspora — in Britain, India and Hong Kong — has shaped the language's modern demography as much as anything at home.`,
             `It is a good example of the difference between a language's *ethnic* population and its *speaker* population. Many people who identify as Gurung no longer speak the language, which is why the atlas carries a "by source" hedge on the figure rather than a single number.`],
          t:[["c. 10th–13th c.","Tibetan-related settlement of the Annapurna region"],
             ["18th c.","Gurung soldiers in the Gorkha army; later the British Gurkhas"],
             ["1815–1947","Gurkha recruitment under British India; then Britain"],
             ["21st c.","≈325,000 speakers, by source; diaspora worldwide"]],
          chips:[["Tibetan-derived script","scr"],["Gurkha diaspora","scr"]] }] },

     { id:"newaric", en:"Newaric", zh:"尼瓦尔语支", py:"Níwǎ'ěr yǔ zhī",
       sp:"≈850,000, by source", region:"The Kathmandu valley and the towns of central Nepal",
       cls:"c-new", mk:[],
       h:[`A small branch of the family with an outsized literary history, represented in this atlas by Newar — the language of the Kathmandu valley, with a written tradition going back centuries and a script of its own.`,
          `Newaric is the atlas's reminder that "Tibeto-Burman" does not mean "tribal" or "unwritten". The Kathmandu valley produced chronicles, poetry, legal documents and Buddhist scholarship in Newar while much of the surrounding hill country was pre-literate.`],
       t:[["c. 5th–8th c.","The Licchavi period; the Kathmandu valley's early epigraphy"],
          ["12th–18th c.","The Malla period: Newar literature and architecture flourish"],
          ["1768–1769","Gorkha conquest; Nepali becomes the state language"],
          ["20th–21st c.","Revitalisation movement; official recognition"]],
       kids:[
        { id:"newar", en:"Newar (Nepal Bhasa)", zh:"尼瓦尔语", py:"Níwǎ'ěr yǔ",
          sp:"≈850,000, by source", region:"The Kathmandu valley — Kathmandu, Patan and Bhaktapur — and the surrounding towns",
          cls:"c-new", mk:[[27.72,85.32,"Kathmandu"],[27.67,85.32,"Patan (Lalitpur)"],[27.67,85.43,"Bhaktapur"],[27.60,85.10,"Kirtipur"]],
          h:[`Newar is "spoken natively by the Newar people, the indigenous inhabitants of Nepal Mandala, which consists of the Kathmandu Valley and surrounding regions in Nepal". It is the language of the valley's old urban civilisation — its architecture, its Buddhist and Hindu scholarship, its chronicles and its poetry.`,
             `<b>The name is contested in a small way, and the atlas notes it.</b> "The name <i>Nepal Bhasa</i> was historically used for the language and is also the name used in official contexts by the Government of Nepal." So the same language appears in the literature as <i>Newar</i>, <i>Newari</i> and <i>Nepal Bhasa</i> — the atlas uses Newar with the official alternative given, rather than choosing silently.`,
             `Its script is the Nepal script — a family of Brāhmī-derived scripts with several regional variants, of which Devanagari has largely displaced the traditional forms in print. That is a different history from the Tibetan-script languages around it: Newar's writing tradition is Indian, not Tibetan, despite the language being Tibeto-Burman.`],
          t:[["c. 5th–8th c.","Early epigraphy in the Kathmandu valley"],
             ["1200–1769","The Malla period: the literary and architectural peak"],
             ["1768–1769","Prithvi Narayan Shah conquers the valley; Nepali becomes official"],
             ["1990–","Revitalisation and official recognition; Nepal Bhasa in official use"]],
          chips:[["Nepal script / Devanagari","scr"],["old literary language","scr"]] }] },

     { id:"kiranti", en:"Kiranti", zh:"基兰蒂语支", py:"Jīlándì yǔ zhī",
       sp:"≈700,000 across the branch, by source", region:"Eastern Nepal — the hills between the Arun and the Mechi, and Sikkim",
       cls:"c-kir", mk:[],
       h:[`The Kiranti languages are the Tibeto-Burman group of eastern Nepal, in the hills of the Arun and Tamur basins — a compact area with unusually high linguistic diversity, and the part of the family where a distinctive verbal system reaches its most elaborate form.`,
          `Kiranti verbs agree with both subject and object, in some languages with a prefixal system that is rare in the family — a set of forms that has been central to arguments about what Proto-Tibeto-Burman was like. The group also has its own script tradition in Limbu, which makes it one of the few Tibeto-Burman clusters with an indigenous writing system.`],
       t:[["c. 10th–15th c.","Kiranti populations established in eastern Nepal"],
          ["c. 18th c.","The Limbu script is devised or revived by Sirijanga"],
          ["18th c.","Gorkha conquest incorporates the Kiranti areas"],
          ["20th–21st c.","Kiranti languages documented; several endangered"]],
       kids:[

        { id:"limbu", en:"Limbu (Yakthung)", zh:"林布语", py:"Línbù yǔ",
          sp:"≈380,000, by source", region:"Far eastern Nepal and Sikkim — Taplejung, Ilam, Dhankuta and the Arun–Tamur hills",
          cls:"c-kir", mk:[[27.35,87.67,"Taplejung"],[26.91,87.92,"Ilam"],[27.04,88.26,"Darjeeling / Sikkim"],[27.20,87.30,"Dhankuta"]],
          h:[`Limbu is the largest Kiranti language, and the one with its own script. The <b>Limbu script</b> — also called Sirijanga after the eighteenth-century figure credited with its revival — is an indigenous Brāhmī-derived system used for Limbu, and it makes the Limbu one of the few Tibeto-Burman peoples with a writing tradition that is not borrowed from Tibetan, Devanagari or Latin.`,
             `The script's history is a case study in how writing systems survive or don't. It fell out of use and was revived, and it is now taught and used in Nepal and Sikkim; the atlas marks the node as script-bearing rather than script-less, which is unusual in this family.`],
          t:[["c. 18th c.","Sirijanga and the Limbu script tradition"],
             ["1774","Gorkha conquest of the Limbuwan area"],
             ["20th c.","The script is revived and taught"],
             ["21st c.","≈380,000 speakers, by source"]],
          chips:[["Limbu script (Sirijanga)","scr"],["indigenous script","scr"]] },

        { id:"yakkha", en:"Yakkha", zh:"雅卡语", py:"Yǎkǎ yǔ",
          sp:"≈20,000, by source", region:"Eastern Nepal — Sankhuwasabha, Dhankuta and the Arun valley",
          cls:"c-kir", mk:[[27.30,87.20,"Sankhuwasabha"],[27.20,87.30,"Dhankuta"],[27.10,87.00,"Arun valley"]],
          h:[`Yakkha is a Kiranti language of the Arun valley, with a speaker base in the low tens of thousands and a language shift toward Nepali well under way. It is one of the group's better-documented members, thanks to recent descriptive work, and it is a good example of a language that is *not* listed as critically endangered but is nonetheless being lost.`],
          t:[["c. 18th c.","Gorkha conquest; Nepali becomes the language of administration"],
             ["20th–21st c.","Shift to Nepali among younger speakers; ≈20,000 by source"]],
          chips:[["Devanagari","scr"]] },

        { id:"sunwar", en:"Sunwar", zh:"苏努瓦尔语", py:"Sūnǔwǎ'ěr yǔ",
          sp:"≈25,000, by source", region:"Eastern Nepal — Okhaldhunga and the Likhu and Sun Koshi valleys",
          cls:"c-kir", mk:[[27.30,86.50,"Okhaldhunga"],[27.35,86.20,"Likhu valley"],[27.50,86.00,"Sun Koshi"]],
          h:[`Sunwar is a Kiranti language of the middle hills of eastern Nepal. It is one of the westernmost members of the group, and its position between the Kiranti area proper and the Tamang and Newar areas to the west makes it useful for arguments about how the branch is bounded.`],
          t:[["c. 18th c.","Gorkha conquest incorporates the area"],
             ["20th–21st c.","≈25,000 speakers, by source; shifting to Nepali"]],
          chips:[["Devanagari","scr"]] },

        { id:"bantawa", en:"Bantawa", zh:"班塔瓦语", py:"Bāntǎwǎ yǔ",
          sp:"≈170,000, by source", region:"Eastern Nepal — Bhojpur and the Arun valley, and into Sikkim",
          cls:"c-kir", mk:[[27.17,87.05,"Bhojpur"],[27.00,87.20,"Arun valley"],[27.04,88.26,"Sikkim"]],
          h:[`Bantawa is one of the largest Kiranti languages by speaker count, spoken in the Bhojpur district of eastern Nepal and across the border in Sikkim. Its size has made it the language most often used to illustrate Kiranti grammar in the comparative literature.`,
             `"Bantawa" also names a wider dialect cluster in some classifications, which is why the figure carries a "by source" hedge: the number depends on whether the related varieties are counted with it.`],
          t:[["c. 18th c.","Gorkha conquest; the area is incorporated into Nepal"],
             ["20th–21st c.","≈170,000 speakers, by source (cluster-dependent)"]],
          chips:[["Devanagari","scr"],["dialect cluster","scr"]] }] },

     { id:"qiangic", en:"Qiangic", zh:"羌语支", py:"Qiāngyǔ zhī",
       sp:"≈200,000 across the branch, by source", region:"North-central Sichuan and northwestern Yunnan — the eastern edge of the Tibetan plateau",
       cls:"c-qia", mk:[],
       h:[`Qiangic is the family's eastern edge, in the river valleys of north-central Sichuan where the Tibetan plateau drops toward the Sichuan basin. It is a group of languages with a striking typological profile — complex consonant clusters, elaborate verb morphology, and in some members a system of stem alternation unlike anything else in the family.`,
          `It is also where the family produced one of its two great writing systems, and lost it: <b>Tangut</b>, the logographic script of the Western Xia state, belongs here, and it is cross-listed to the Silk Road atlas where its decipherment story is told in full.`,
          `The Qiangic languages are under heavy pressure from Chinese. They are spoken in small communities in a region where Mandarin is the language of schooling and administration, and several are down to a few thousand speakers.`],
       t:[["c. 7th–9th c.","Qiangic varieties established in the Sichuan highlands"],
          ["1038–1227","Tangut and the Western Xia script"],
          ["20th c.","Chinese linguists survey the Qiangic languages in depth"],
          ["21st c.","Mandarin pressure; several varieties endangered"]],
       kids:[
        { id:"rgyalrong", en:"Rgyalrong", zh:"嘉绒语", py:"Jiāróng yǔ",
          sp:"≈85,000, by source", region:"Western Sichuan — the Barkam (Aba) and Danba area of the eastern plateau edge",
          cls:"c-qia", mk:[[31.90,102.22,"Barkam (Aba)"],[30.88,101.88,"Danba"],[31.00,102.00,"Xiaojin"]],
          h:[`Rgyalrong is a small group of closely related languages in western Sichuan — <b>Japhug</b>, <b>Situ</b> and <b>Tshobdun</b> are the three usually named — and it has become disproportionately important to comparative Tibeto-Burman. Its verb morphology is archaic enough that it has been used to argue about what the proto-language's verb system looked like.`,
             `The name is Tibetan in form, and the speakers are historically part of the Tibetan cultural sphere while speaking a non-Tibetic language. That combination — Tibetan religion and writing, Qiangic speech — is common along this frontier and is worth keeping in view: the atlas's family lines and its cultural lines do not coincide.`],
          t:[["c. 7th–9th c.","Rgyalrong varieties established along the plateau edge"],
             ["18th c.","Qing campaigns in the Jinchuan area; the region is incorporated"],
             ["20th–21st c.","Japhug and the others become key sources for comparative work"]],
          chips:[["Tibetan script (liturgical)","scr"],["archaic verb morphology","scr"]],
          kids:[
           { id:"japhug", en:"Japhug", zh:"扎坝语", py:"Zhābà yǔ",
             sp:"≈4,000–6,000, by source", region:"Mabtang and the surrounding valleys, Barkam county, Sichuan",
             cls:"c-qia", mk:[[31.90,102.20,"Mabtang, Barkam"]],
             h:[`Japhug is the best-described Rgyalrong language, and its description is one of the reasons the group is so prominent in the literature. It retains consonant clusters and a verb system that have been argued to preserve features lost everywhere else in the family.`,
                `It is spoken by a few thousand people in a handful of valleys. That is the scale at which most of the languages in this atlas actually exist: well enough described to matter to science, small enough that its future is not assured.`],
             t:[["20th–21st c.","Documented in detail; ≈4,000–6,000 speakers, by source"]],
             chips:[["no traditional script","scr"]] },

           { id:"situ", en:"Situ (Eastern Rgyalrong)", zh:"四土语", py:"Sìtǔ yǔ",
             sp:"≈70,000, by source", region:"Barkam, Xiaojin and the surrounding counties of western Sichuan",
             cls:"c-qia", mk:[[31.90,102.22,"Barkam"],[31.00,102.00,"Xiaojin"],[31.30,102.30,"Zamtang area"]],
             h:[`Situ is the largest Rgyalrong language, with roughly seventy thousand speakers across several counties. It is more widely spoken than Japhug and therefore in a comparatively better position, though still without official status and under pressure from Mandarin.`],
             t:[["20th–21st c.","≈70,000 speakers, by source"]],
             chips:[["no traditional script","scr"],["largest Rgyalrong language","scr"]] },

           { id:"tshobdun", en:"Tshobdun", zh:"草登语", py:"Cǎodēng yǔ",
             sp:"≈4,000, by source", region:"Caodeng and the surrounding valleys, Barkam county, Sichuan",
             cls:"c-qia", mk:[[31.80,102.00,"Caodeng, Barkam"]],
             h:[`Tshobdun is the third of the three named Rgyalrong languages — closely related to Japhug, spoken in adjacent valleys, and distinguished from it by systematic sound correspondences rather than by anything obvious to a casual listener.`,
                `The three together are a neat demonstration of the atlas's recurring problem: whether Japhug, Tshobdun and Situ are three languages or one language with three varieties is a decision about criteria, not a fact about the world.`],
             t:[["20th–21st c.","≈4,000 speakers, by source"]],
             chips:[["no traditional script","scr"]] }] },

        { id:"qiang", en:"Qiang", zh:"羌语", py:"Qiāng yǔ",
          sp:"≈140,000, by source", region:"North-central Sichuan — Maoxian, Wenchuan, Lixian and the Min river valley",
          cls:"c-qia", mk:[[31.68,103.85,"Maoxian (Mao)"],[31.47,103.58,"Wenchuan"],[31.43,103.17,"Lixian"],[31.90,103.60,"Songpan area"]],
          h:[`Qiang is "a Sino-Tibetan language cluster of the Qiangic branch spoken by approximately 140,000 people in north-central Sichuan Province, China" — and the word <em>cluster</em> is doing real work in that sentence. Qiang is not one uniform language: its varieties differ enough that the literature treats it as a set, with northern and southern groups that are not mutually intelligible.`,
             `The name has an older spelling in Western sources — <em>Kʻiang</em> — which is worth knowing when reading nineteenth- and twentieth-century accounts. The Qiang are one of China's officially recognised ethnic groups, and the language has a Latin-based romanisation developed for it in the 1980s, which is the closest thing it has to a standard written form.`,
             `The area is earthquake country, and the 2008 Wenchuan earthquake struck the heart of it — a reminder that these languages face pressures that have nothing to do with language policy.`],
          t:[["c. 7th–9th c.","Qiangic varieties established in the Min river valleys"],
             ["18th c.","Qing administration in the area; Chinese contact intensifies"],
             ["1989–","A romanisation is commissioned by local and provincial authorities"],
             ["2008","The Wenchuan earthquake strikes the Qiang heartland"],
             ["21st c.","≈140,000 speakers, by source, across a cluster of varieties"]],
          chips:[["Latin romanisation (1980s)","scr"],["language cluster","scr"]] },

        { id:"pumi", en:"Pumi", zh:"普米语", py:"Pǔmǐ yǔ",
          sp:"≈35,000, by source", region:"Northwestern Yunnan and southwestern Sichuan — Lanping, Ninglang and Yanyuan",
          cls:"c-qia", mk:[[26.45,99.42,"Lanping"],[27.28,100.85,"Ninglang"],[27.42,101.50,"Yanyuan"]],
          h:[`Pumi is a Qiangic language of the Yunnan–Sichuan border country, spoken by an officially recognised minority group of northwestern Yunnan. It sits geographically between the Qiangic area and the Burmic languages of Yunnan, which is why its classification has been discussed more than its size would suggest.`],
          t:[["c. 13th–17th c.","Pumi communities established in the Yunnan–Sichuan borderland"],
             ["20th c.","Classified as Qiangic in the Chinese-language literature"],
             ["21st c.","≈35,000 speakers, by source"]],
          chips:[["no traditional script","scr"]] },

        { id:"tangut", en:"Tangut", zh:"西夏语", py:"Xīxià yǔ",
          sp:"extinct", region:"The Hexi corridor — the Western Xia capital near Yinchuan and Khara-Khoto",
          cls:"c-tan", mk:[[38.49,106.23,"Yinchuan — Western Xia capital"],[41.76,101.14,"Khara-Khoto"],[40.14,94.66,"Dunhuang"]],
          h:[`The extinct language of the Western Xia state, and the one Qiangic language that had a script, a literature and an empire. Tangut is <b>cross-listed</b> with the Silk Road atlas, where the decipherment story is told in full — the logographic script, the 5,863 known characters, the Khara-Khoto library removed by Kozlov's expedition in 1909, and the twentieth-century reconstruction.`,
             `Its place in <em>this</em> atlas is as the easternmost and most historically consequential member of Qiangic: a language of the same group as Qiang and Japhug that briefly ran a state on the Silk Road. See <a href="#silkroad/tangut">Silk Road → Tangut</a> for the script and the recovery.`],
          t:[["1038","The Western Xia state is founded; Tangut becomes a written language"],
             ["1227","The Mongol Empire annexes the Western Xia"],
             ["16th c.","Tangut is last reported in use, by source"],
             ["1909 / 20th c.","The Khara-Khoto library; the script is deciphered"]],
          chips:[["Tangut script","scr"],["deciphered (20th c.)","dec"],["cross-listed → Silk Road","scr"]] }] },

     { id:"burmic", en:"Burmic (Lolo–Burmese)", zh:"缅语支（彝缅语）", py:"Miǎnyǔ zhī (Yí-Miǎn yǔ)",
       sp:"≈50 million, by source — dominated by Burmese", region:"Myanmar, Yunnan and southwestern China, with the Yi and Hani in the Yunnan–Guizhou plateau",
       cls:"c-bur", mk:[],
       h:[`Burmic is the family's demographic centre of gravity: Burmese alone accounts for most of the branch's speakers, and the group also contains the Yi languages of the Yunnan–Guizhou plateau, the Hani, Lisu, Lahu, Naxi and the Jingpo-adjacent languages of the border country.`,
          `It is also where the atlas's script diversity peaks. Burmese has a Brāhmī-derived script of its own with a long literary tradition; the Yi languages have the <b>modern Yi syllabary</b>, standardised in 1974 and still in use; the Naxi have the <b>Dongba</b> pictographic corpus, which is not a script for everyday writing at all but a mnemonic system for ritual recitation. Three different answers to "how do you write this language", in one branch.`,
          `The branch straddles the China–Myanmar frontier, which means its languages are split between two very different language-policy regimes — a theme that recurs across the whole atlas.`],
       t:[["c. 1st–9th c. CE","The Pyu city-states; early Tibeto-Burman writing in Myanmar"],
          ["1044–1287","The Pagan kingdom; Burmese becomes a literary language"],
          ["11th–13th c.","Burmese script and Theravada Buddhist literature mature"],
          ["1974","The modern Yi syllabary is standardised in Sichuan"],
          ["20th–21st c.","Chinese language policy and Burmese politics both reshape the branch"]],
       kids:[
        { id:"burmese", en:"Burmese (Myanmar)", zh:"缅甸语", py:"Miǎndiàn yǔ",
          sp:"≈33 million first-language, by source", region:"Myanmar — the Irrawaddy valley, Yangon, Mandalay and Bagan",
          cls:"c-bur", mk:[[16.87,96.20,"Yangon"],[21.98,96.08,"Mandalay"],[21.17,94.86,"Bagan"],[19.75,96.10,"Naypyidaw"],[18.80,95.30,"Sri Ksetra (Pyu)"],[16.82,96.13,"Thaton"]],
          h:[`Burmese is "a Tibeto-Burman language spoken in Myanmar, where it is the official language, lingua franca, and the native language of the Bamar, the country's largest ethnic group". It is by a wide margin the largest language in this atlas, and one of the few Tibeto-Burman languages with a continuous written literature reaching back nearly a thousand years.`,
             `Its script descends from the Brāhmī-derived script of the Pyu, the Tibeto-Burman people whose city-states preceded the Burmese kingdom in the Irrawaddy valley. That inheritance — an Indian script adapted for a Tibeto-Burman language — is the same pattern as Tibetan, Newar and Limbu, and it is the single most striking structural fact about this family: almost all of its writing systems are ultimately Indian.`,
             `Burmese is tonal and has a distinctive register contrast between "creaky" and "clear" voice quality rather than a simple pitch distinction, which is one of the things that makes it difficult for outsiders to learn. Its literary register and its spoken form differ substantially.`],
          t:[["c. 2nd–9th c. CE","The Pyu city-states use a Brāhmī-derived script"],
             ["1044–1287","The Pagan kingdom; Burmese becomes the language of state and literature"],
             ["c. 1113","The Myazedi inscription — the key early bilingual text"],
             ["19th–20th c.","British rule; Burmese becomes a nationalist symbol"],
             ["21st c.","≈33 million first-language speakers, by source"]],
          chips:[["Burmese script (from Pyu/Brāhmī)","scr"],["tonal","scr"],["1,000 years of literature","scr"]] },

        { id:"rakhine", en:"Rakhine (Arakanese)", zh:"若开语", py:"Ruòkāi yǔ",
          sp:"≈2 million, by source", region:"Rakhine State, Myanmar — Sittwe, Mrauk U and the coastal strip",
          cls:"c-bur", mk:[[20.15,92.90,"Sittwe"],[20.59,93.19,"Mrauk U (the old capital)"],[18.90,93.50,"Sandoway / Thandwe"]],
          h:[`Rakhine — also called Arakanese — is the Tibeto-Burman language of the Rakhine coastal strip of western Myanmar, closely related to Burmese and sometimes treated as a dialect of it. It was the language of the <b>Mrauk U</b> kingdom, which ruled the coast from the fifteenth to the eighteenth century and was for a period one of the wealthiest ports in the Bay of Bengal.`,
             `The "language or dialect" question is live here: Rakhine is close enough to Burmese that the two are often described as members of one cluster, and distinct enough in phonology — it retains an /r/ sound that standard Burmese has lost — that its speakers treat it as a language. The atlas shows it as a separate node and states the closeness.`],
          t:[["1430–1785","The Mrauk U kingdom; Rakhine is the language of the Arakanese court"],
             ["1785","Burmese conquest ends the kingdom"],
             ["1826–1948","British rule; Rakhine is administered with Burma"],
             ["21st c.","≈2 million speakers, by source"]],
          chips:[["Burmese-derived script","scr"],["retains /r/ — Burmese has lost it","scr"]] },

        { id:"achang", en:"Achang", zh:"阿昌语", py:"Āchāng yǔ",
          sp:"≈60,000, by source", region:"Western Yunnan — Lianghe, Longchuan and Luxi, on the Myanmar border",
          cls:"c-bur", mk:[[24.80,98.30,"Lianghe"],[24.42,97.80,"Longchuan"],[24.45,98.20,"Luxi"]],
          h:[`Achang is a Burmic language of the western Yunnan border country, closely related to Burmese and to Zaiwa. Its speakers are one of China's smaller recognised ethnic groups, and the language is under pressure from both Chinese and Jingpo in the same region.`,
             `Its position on the atlas is a reminder of how the China–Myanmar frontier cuts through language areas: Achang is spoken on the Chinese side of a border that the Burmic languages cross freely in their distribution.`],
          t:[["c. 13th–16th c.","Achang communities established on the Yunnan frontier"],
             ["20th c.","Recognised as a distinct ethnic group in China"],
             ["21st c.","≈60,000 speakers, by source"]],
          chips:[["Latin orthography","scr"]] },

        { id:"zaiwa", en:"Zaiwa (Atsi)", zh:"载瓦语", py:"Zàiwǎ yǔ",
          sp:"≈100,000, by source", region:"Western Yunnan — Dehong prefecture, Luxi and Longchuan",
          cls:"c-bur", mk:[[24.45,98.20,"Luxi"],[24.42,97.80,"Longchuan"],[24.30,98.00,"Ruili area"]],
          h:[`Zaiwa, also called Atsi, is a Burmic language of the Dehong prefecture in western Yunnan, closely related to Achang and Burmese. It is the language of the Jingpo nationality's Zaiwa-speaking population — a situation worth noting, because the Jingpo nationality in China includes speakers of both Jingpo (a Sal language) and Zaiwa (a Burmic one), so the ethnic label does not match the linguistic one.`,
             `That mismatch between official ethnicity and language is common in this atlas and is one of the reasons it is difficult to count speakers from census categories.`],
          t:[["c. 13th–16th c.","Zaiwa-speaking communities established in Dehong"],
             ["20th c.","Grouped under the Jingpo nationality in China"],
             ["21st c.","≈100,000 speakers, by source"]],
          chips:[["Latin orthography","scr"],["ethnic label ≠ language","scr"]] },

        { id:"lisu", en:"Lisu", zh:"傈僳语", py:"Lìsù yǔ",
          sp:"≈1 million, by source", region:"Nujiang (Salween) valley, Yunnan; northern Myanmar; Thailand and India",
          cls:"c-bur", mk:[[25.85,98.85,"Nujiang (Salween) valley"],[24.70,97.90,"Dehong"],[19.30,97.95,"Mae Hong Son, Thailand"],[28.20,97.30,"Arunachal Pradesh, India"]],
          h:[`Lisu is one of the Burmic languages with a genuinely wide spread: the Nujiang valley of Yunnan, northern Myanmar, northern Thailand and Arunachal Pradesh. Its distribution follows the mountains rather than the borders, and Lisu communities are found in four countries.`,
             `It has two distinctive script stories. Missionaries created a Latin-based <b>Fraser alphabet</b> in the early twentieth century, written with letters that can be typed on a standard keyboard by turning them upside down — a genuinely unusual design. And a <b>syllabary</b> was devised for Lisu in the 1920s by a Lisu farmer, Wang Renbo, in the same period that produced several other indigenous scripts in this region.`],
          t:[["c. 15th–18th c.","Lisu communities spread along the Salween corridor"],
             ["c. 1915","The Fraser alphabet is devised for Lisu"],
             ["1920s","The Lisu syllabary is created by Wang Renbo"],
             ["20th–21st c.","Communities in China, Myanmar, Thailand and India"]],
          chips:[["Fraser alphabet (1915)","scr"],["Lisu syllabary (1920s)","scr"],["four countries","scr"]] },

        { id:"lahu", en:"Lahu", zh:"拉祜语", py:"Lāhù yǔ",
          sp:"≈500,000, by source", region:"Southwestern Yunnan; eastern Myanmar; northern Thailand and Laos",
          cls:"c-bur", mk:[[22.55,99.93,"Lancang, Yunnan"],[22.00,99.20,"Mengliang"],[19.90,99.20,"Chiang Rai, Thailand"],[20.30,101.20,"Laos"]],
          h:[`Lahu is a Burmic language of the Yunnan–Myanmar–Thailand–Laos borderlands, spoken across the same mountain corridor as Lisu and Akha. It is closely related to Lisu, and the two are often described together in the literature.`,
             `Lahu has a Latin orthography devised by missionaries and is one of the more widely used minority languages of the Golden Triangle region. Like the others here, its speakers are spread over several states with different policies toward minority languages.`],
          t:[["c. 15th–18th c.","Lahu communities spread through the border highlands"],
             ["19th–20th c.","Missionary orthography; Lahu written and printed"],
             ["21st c.","≈500,000 speakers, by source, across four countries"]],
          chips:[["Latin orthography","scr"]] },

        { id:"hani", en:"Hani / Akha", zh:"哈尼语", py:"Hāní yǔ",
          sp:"≈1.5 million, by source", region:"Southern Yunnan (Honghe, Yuanyang); Myanmar, Laos, Thailand and Vietnam",
          cls:"c-bur", mk:[[23.37,102.83,"Honghe, Yunnan"],[23.17,102.83,"Yuanyang (the terraces)"],[21.30,100.00,"Shan State, Myanmar"],[20.30,100.10,"Laos"]],
          h:[`Hani is the language of the Yunnan–Myanmar–Laos–Thailand borderlands, called <b>Akha</b> outside China — so the atlas's node name carries both, because the same language appears in the literature under two names depending on which side of a border the writer is standing.`,
             `In China the Hani are the people of the Yuanyang rice terraces, and Hani is an officially recognised minority language with a romanisation. In Myanmar, Laos and Thailand the Akha are one of the region's many highland groups, with an oral tradition and a village-based social organisation that has been extensively described by anthropologists.`,
             `The Hani–Akha case is the atlas's clearest example of a naming problem that is also a political one: whether you call a language Hani or Akha depends on which state's categories you are using.`],
          t:[["c. 15th–18th c.","Hani/Akha communities spread through the border highlands"],
             ["20th c.","Chinese romanisation; Akha documented in Thailand and Laos"],
             ["21st c.","≈1.5 million speakers, by source, across four countries"]],
          chips:[["Latin orthography","scr"],["two names — Hani / Akha","scr"]] },

        { id:"naxi", en:"Naxi", zh:"纳西语", py:"Nàxī yǔ",
          sp:"≈300,000, by source", region:"Northwestern Yunnan — Lijiang and the surrounding counties",
          cls:"c-bur", mk:[[26.87,100.23,"Lijiang"],[27.20,100.30,"Baoshan / Lijiang area"],[26.50,99.80,"Weixi"],[27.80,99.70,"Shangri-La area"]],
          h:[`Naxi is the language of Lijiang in northwestern Yunnan, and it is in this atlas above all because of its scripts. The <b>Dongba</b> script is a system of pictographic characters used by the <i>dongba</i> ritual specialists — but it is not a script for writing in the ordinary sense: it is a mnemonic system for reciting ritual texts, in which one glyph can cue a whole phrase. Alongside it sits the <b>Geba</b> syllabary, which is closer to a conventional writing system.`,
             `The distinction matters and the atlas states it, because "the Naxi have a pictographic script" is the kind of half-fact that gets repeated. The source is explicit that Naxi "can be written in the Geba syllabary, Latin script or Fraser alphabet, but they are rarely used in everyday life and few people are able to read Naxi" — so the ritual script is not evidence that the language is written in daily use.`,
             `Lijiang is also the site of one of the more unusual modern language situations in China: the town's tourism industry trades heavily on Naxi and Dongba imagery while the language itself recedes.`],
          t:[["c. 7th–13th c.","The Naxi established at Lijiang; Dongba ritual tradition develops"],
             ["13th c.","Mongol conquest; Lijiang becomes a local administrative centre"],
             ["1997","Lijiang's old town is inscribed as a UNESCO World Heritage site"],
             ["21st c.","≈300,000 speakers, by source; Dongba studied and taught"]],
          chips:[["Dongba pictographs","scr"],["Geba syllabary","scr"],["Fraser alphabet","scr"],["ritual script, not everyday writing","scr"]] },

        { id:"nuosu", en:"Nuosu Yi", zh:"凉山彝语", py:"Liángshān Yíyǔ",
          sp:"≈2 million, by source", region:"Liangshan Yi Autonomous Prefecture, southern Sichuan — Xichang and the Anning river valley",
          cls:"c-bur", mk:[[27.88,102.26,"Xichang, Liangshan"],[27.50,102.50,"Zhaojue"],[27.20,102.30,"Xide"],[28.30,102.00,"Mianning"],[26.60,102.80,"Ningnan"]],
          h:[`Nuosu is the largest of the Yi languages, spoken in the Liangshan Yi Autonomous Prefecture of southern Sichuan, and it is one of the very few Tibeto-Burman languages with a modern standardised writing system in daily use.`,
             `<b>The script is the story.</b> "The Modern Yi script (ꆈꌠꁱꂷ <i>nuosu bburma</i>) is a standardized syllabary derived from the classic script in 1974. There are 756 basic glyphs based on the Liangshan dialect, plus 63 for syllables only found in Chinese borrowings." That is a specific, checkable design: a syllabary, standardised on one dialect, with a defined glyph inventory — and unlike the classical Yi script, which had thousands of variant characters, the 1974 system was made to be learnable and printable.`,
             `The classical Yi script is much older and much larger, with thousands of glyphs and regional variants; the 1974 syllabary was a deliberate standardisation of it. The atlas therefore shows Nuosu as script-bearing in the modern sense, which is rare in this family and worth the emphasis.`],
          t:[["c. 1st millennium CE","The classical Yi script develops; later, thousands of variants"],
             ["c. 13th–17th c.","Yi polities and the <i>tusi</i> system in the Liangshan area"],
             ["1950s–1970s","The Yi script is standardised; competing schemes proposed"],
             ["1974","The modern Yi syllabary is standardised on the Liangshan dialect"],
             ["21st c.","≈2 million speakers, by source; the syllabary is taught in schools"]],
          chips:[["Modern Yi syllabary (1974)","scr"],["756 + 63 glyphs","scr"],["in daily use","scr"]] }] },

     { id:"sal", en:"Sal / Bodo–Garo", zh:"萨尔语群（博多-加罗）", py:"Sà'ěr yǔ qún",
       sp:"≈5 million, by source", region:"Northeast India (Assam, Meghalaya, Nagaland) and northern Myanmar",
       cls:"c-sal", mk:[],
       h:[`The Sal languages — also called Bodo–Garo–Konyak — are the family's western and southern flank in Northeast India and northern Myanmar. This is where Tibeto-Burman meets Indo-Aryan: Bodo, Garo and Dimasa are spoken in Assam and Meghalaya, in close contact with Assamese and Bengali, and their vocabularies show it.`,
          `The branch's best-known member outside India is <b>Jingpho</b>, called Kachin in older literature, which is the language of the Kachin hills of northern Myanmar. The atlas names it Jingpho with the older name given, because "Kachin" is the term a reader is more likely to have met.`,
          `Politically this is the most consequential branch in the atlas. Bodo is an Eighth Schedule language of India, and the Bodo Territorial Region is a product of a long armed conflict; the languages here are bound up with questions of autonomy and identity in ways that most of the family's other members are not.`],
       t:[["c. 1st millennium CE","Tibeto-Burman populations established in the Brahmaputra valley"],
          ["13th c.","Ahom and other Tai groups arrive in Assam; the region becomes multilingual"],
          ["19th–20th c.","British administration and Christian missions; romanised orthographies"],
          ["2003","Bodo is added to India's Eighth Schedule"]],
       kids:[
        { id:"jingpho", en:"Jingpho (Kachin)", zh:"景颇语", py:"Jǐngpō yǔ",
          sp:"≈1 million, by source", region:"Kachin State, northern Myanmar; Dehong prefecture, Yunnan; Assam and Arunachal",
          cls:"c-sal", mk:[[25.38,97.39,"Myitkyina, Kachin State"],[24.45,98.20,"Dehong, Yunnan"],[25.90,95.20,"Hukawng valley"],[27.30,97.40,"Putao"]],
          h:[`Jingpho is the language of the Kachin hills of northern Myanmar — called Kachin in older literature, and still called that by many writers. It is the largest Sal language and the one with the widest geographical spread, reaching into Yunnan, Assam and Arunachal Pradesh.`,
             `A naming caution, because it matters for reading the sources: "Kachin" in Myanmar usage covers several distinct groups and languages, of which Jingpho is one. The atlas uses Jingpho for the language and notes the older label rather than treating them as interchangeable.`],
          t:[["c. 15th–18th c.","Jingpho-speaking communities established in the Kachin hills"],
             ["19th c.","Missionary romanisation; Jingpho written and printed"],
             ["1948–","Kachin State within Myanmar; decades of conflict"],
             ["21st c.","≈1 million speakers, by source"]],
          chips:[["Latin orthography","scr"],["also called Kachin","scr"]] },

        { id:"bodo", en:"Bodo (Boro)", zh:"博多语", py:"Bódūo yǔ",
          sp:"≈1.5 million, by source", region:"Assam, India — the Bodoland Territorial Region, Kokrajhar and the Brahmaputra valley",
          cls:"c-sal", mk:[[26.40,90.27,"Kokrajhar"],[26.14,91.74,"Guwahati"],[26.70,91.50,"Nalbari area"],[26.60,92.80,"Sonitpur"]],
          h:[`Bodo is the largest Tibeto-Burman language of Assam and one of the few in this atlas with constitutional standing: it was added to India's <b>Eighth Schedule</b> in 2003, which gives it recognition and a claim on resources for its development.`,
             `Its modern history is inseparable from conflict. Decades of agitation for autonomy produced the Bodo Territorial Region and a series of accords, and the language question — Bodo in schools, Bodo in administration — has been one of the things at stake. That is worth stating plainly, because the atlas's other entries are mostly about scholarship and this one is about politics.`,
             `Bodo is written in Devanagari, not in a script of its own, which places it with the Indian-script group rather than the Tibetan one.`],
          t:[["c. 1st millennium CE","Tibeto-Burman populations in the Brahmaputra valley"],
             ["1967–","Agitation for a separate Bodo state begins"],
             ["1993 / 2003","Bodoland accords; Bodo added to the Eighth Schedule"],
             ["21st c.","≈1.5 million speakers, by source"]],
          chips:[["Devanagari","scr"],["India Eighth Schedule (2003)","scr"]] },

        { id:"garo", en:"Garo", zh:"加罗语", py:"Jiāluó yǔ",
          sp:"≈1.1 million, by source", region:"Meghalaya, India — the Garo Hills, and into Assam and Bangladesh",
          cls:"c-sal", mk:[[25.51,90.22,"Tura, Garo Hills"],[25.58,91.89,"Shillong"],[25.20,90.60,"Baghmara"],[24.50,90.40,"Bangladesh (Mymensingh)"]],
          h:[`Garo is the language of the Garo Hills of Meghalaya, and it is one of the few Tibeto-Burman languages with a substantial Christian literary tradition: nineteenth-century missionary work produced a romanised orthography and a printed literature, and most Garo speakers are Christian.`,
             `Its speakers are spread across Meghalaya, Assam and into Bangladesh, which means the same language sits under three different language regimes — two Indian states and a different country.`],
          t:[["c. 1st millennium CE","Tibeto-Burman settlement of the Garo Hills"],
             ["1860s–","Baptist missions; the romanised Garo orthography is developed"],
             ["1972","Meghalaya becomes a state of India"],
             ["21st c.","≈1.1 million speakers, by source, across India and Bangladesh"]],
          chips:[["Latin orthography","scr"],["Christian literary tradition","scr"]] },

        { id:"dimasa", en:"Dimasa", zh:"迪马萨语", py:"Dímǎsà yǔ",
          sp:"≈110,000, by source", region:"Assam, India — the Dima Hasao district and the Barak valley",
          cls:"c-sal", mk:[[25.17,93.02,"Haflong, Dima Hasao"],[24.80,92.80,"Barak valley"],[25.50,93.00,"Nagaon area"]],
          h:[`Dimasa is a Bodo–Garo language of Assam, spoken in the Dima Hasao hills. It is the language of the descendants of the Dimasa kingdom — a Tibeto-Burman state that ruled parts of the Brahmaputra and Barak valleys before Ahom expansion — and it survives today with a small speaker base and a Devanagari orthography.`,
             `It is one of several Bodo–Garo languages that fall into this atlas's "and more" category yet are historically important: the Dimasa kingdom was a real polity, and its language is what is left of it.`],
          t:[["c. 13th–16th c.","The Dimasa kingdom rules parts of Assam"],
             ["16th–19th c.","Ahom and then British expansion reduces its territory"],
             ["20th c.","Dima Hasao district; the language is documented"],
             ["21st c.","≈110,000 speakers, by source"]],
          chips:[["Devanagari","scr"]] }] },

     { id:"kukichin", en:"Kuki-Chin", zh:"库基-钦语支", py:"Kùjī-Qīn yǔ zhī",
       sp:"≈3 million, by source", region:"Mizoram and Manipur in India; Chin State in Myanmar; the Chittagong Hill Tracts",
       cls:"c-kuk", mk:[],
       h:[`The Kuki-Chin languages run along the hill country that separates India's northeast from Myanmar — Mizoram, Manipur and Chin State — and they are divided between two states by an international border that the languages ignore.`,
          `The branch's linguistic interest is in its verb system, which in several members is famously complex, and its sociological interest is in how quickly Christian missionary work in the nineteenth and twentieth centuries gave these languages romanised orthographies and printed literatures. Mizo, in particular, went from an unwritten oral language to a standardised written one within a couple of generations.`,
          `The names are a minefield and the atlas notes it: <i>Kuki</i> is the term used from the Indian side, <i>Chin</i> from the Myanmar side, and the groups themselves often use neither.`],
       t:[["c. 1st millennium CE","Tibeto-Burman populations in the India–Myanmar hills"],
          ["1870s–1930s","Missions and British administration; romanised orthographies"],
          ["1948–","Mizoram and Manipur within India; Chin State within Myanmar"],
          ["21st c.","≈3 million speakers, by source, across the branch"]],
       kids:[
        { id:"mizo", en:"Mizo (Duhlian)", zh:"米佐语", py:"Mǐzuǒ yǔ",
          sp:"≈850,000, by source", region:"Mizoram, India, and the adjacent Chin hills of Myanmar",
          cls:"c-kuk", mk:[[23.73,92.72,"Aizawl, Mizoram"],[23.30,93.00,"Champhai"],[22.90,92.50,"Lunglei"],[22.00,93.50,"Chin State, Myanmar"]],
          h:[`Mizo is the official language of the Indian state of Mizoram, and it is the branch's success story: a language that was largely unwritten before the late nineteenth century and now has a standard orthography, a printed literature and a state to run.`,
             `The name is a modern coinage — <i>Mizo</i> means "highlander" — adopted to replace the external labels <i>Lushai</i> and <i>Kuki</i>. That deliberate renaming is itself worth recording, because a reader consulting older sources will not find "Mizo" at all.`],
          t:[["c. 1st millennium CE","Tibeto-Burman settlement of the Mizoram hills"],
             ["1894–","Missionary work produces the romanised Duhlian orthography"],
             ["1972 / 1987","Mizoram becomes a union territory, then a state"],
             ["21st c.","≈850,000 speakers, by source"]],
          chips:[["Latin orthography","scr"],["name is a modern coinage","scr"]] },

        { id:"thadou", en:"Thadou", zh:"塔杜语", py:"Tǎdù yǔ",
          sp:"≈300,000, by source", region:"Manipur and Mizoram, India, and adjacent areas of Myanmar",
          cls:"c-kuk", mk:[[24.82,93.94,"Imphal, Manipur"],[25.20,94.20,"Senapati area"],[23.80,93.30,"Mizoram border"]],
          h:[`Thadou is a Kuki-Chin language of Manipur, spoken by one of the largest of the Kuki groups. It sits at the centre of the naming problem the branch is known for: the same communities are labelled Kuki, Chin or by their own group names depending on the speaker's vantage point, and the resulting confusion affects censuses and language policy.`,
             `Manipur's hill districts are linguistically extremely diverse, and Thadou is one of several Kuki-Chin languages there, alongside a larger number of Naga-group languages belonging to other branches.`],
          t:[["c. 1st millennium CE","Kuki-Chin settlement of the Manipur hills"],
             ["19th–20th c.","Missions; romanised orthographies"],
             ["21st c.","≈300,000 speakers, by source"]],
          chips:[["Latin orthography","scr"],["Kuki / Chin naming problem","scr"]] },

        { id:"tedim", en:"Tedim (Tiddim Chin)", zh:"铁定语", py:"Tiědìng yǔ",
          sp:"≈340,000, by source", region:"Chin State, Myanmar, and adjacent Mizoram — the Tedim and Tonzang area",
          cls:"c-kuk", mk:[[23.37,93.50,"Tedim, Chin State"],[23.20,93.10,"Tonzang"],[23.73,92.72,"Aizawl side"]],
          h:[`Tedim, also called Tiddim Chin, is a Kuki-Chin language of Chin State in Myanmar. It is one of the better-documented members of the branch — it has a grammatical literature going back to the British period — and its speakers are split across the Myanmar–India border like the rest of the group.`,
             `The atlas includes it rather than one of its many neighbours partly because documentation matters: a language with a grammar written about it in the 1930s is a language that can be checked, and much of the rest of the branch is far thinner in print.`],
          t:[["c. 1st millennium CE","Chin settlement of the hill country"],
             ["1890s–1930s","British administration and mission work; grammatical description"],
             ["21st c.","≈340,000 speakers, by source"]],
          chips:[["Latin orthography","scr"]] }] },

     { id:"karenic", en:"Karenic", zh:"克伦语支", py:"Kèlún yǔ zhī",
       sp:"≈4 million, by source", region:"Kayin and Kayah States in Myanmar, and the Thai border — the Salween and Moei valleys",
       cls:"c-kar", mk:[],
       h:[`Karenic is the branch that gave the comparative literature one of its long-running arguments. Paul Benedict and then James Matisoff both treated Karen as a divergent member of Tibeto-Burman rather than as a separate branch of Sino-Tibetan — Matisoff's formulation, quoted at the root node, is that he "proposes a modification of Benedict that demoted Karen but kept the divergent position of Sinitic". So Karen's exact position is a matter of which reconstruction you follow, and the atlas places it with the others while flagging that.`,
          `Its speakers straddle the Myanmar–Thailand border, and the Karen conflict in Myanmar has made the border camps and the Thai side a significant part of the language's modern demography. That is not a footnote to the linguistics; it is why some Karen varieties have more speakers outside their home area than inside it.`],
       t:[["c. 1st millennium CE","Karen populations established in the Salween valley"],
          ["19th c.","Baptist missions; romanised S'gaw orthography"],
          ["1948–","Karen conflict in Myanmar; refugee movements to Thailand"],
          ["20th–21st c.","Border camps and diaspora reshape the speaker map"]],
       kids:[
        { id:"sgaw", en:"S'gaw Karen", zh:"斯高克伦语", py:"Sīgāo Kèlún yǔ",
          sp:"≈1.5 million, by source", region:"Kayin State, Myanmar — Hpa-an and the Salween delta — and the Thai border",
          cls:"c-kar", mk:[[16.89,97.63,"Hpa-an, Kayin State"],[16.87,96.20,"Yangon area"],[15.20,98.40,"Thai border"],[17.30,97.90,"Mawlamyine hinterland"]],
          h:[`S'gaw Karen is the largest Karenic language, spoken in Kayin State in southeastern Myanmar and along the Thai border. It has a romanised orthography created by nineteenth-century Baptist missionaries, and — unusually for this branch — a substantial printed literature and a history of being taught in schools on both sides of the border.`,
             `It is also the language of the Karen nationalist movement's institutions, which is why the written standard matters more here than speaker numbers alone would suggest.`],
          t:[["c. 1st millennium CE","Karen settlement of the lower Salween"],
             ["1830s–","Baptist missions; the romanised S'gaw orthography"],
             ["1948–","Karen conflict; displacement to the Thai border"],
             ["21st c.","≈1.5 million speakers, by source, inside and outside Myanmar"]],
          chips:[["Latin orthography","scr"],["conflict diaspora","scr"]] },

        { id:"pwo", en:"Pwo Karen", zh:"波克伦语", py:"Bō Kèlún yǔ",
          sp:"≈1 million, by source", region:"Lower Myanmar and central Thailand — from the Irrawaddy delta to the Chao Phraya basin",
          cls:"c-kar", mk:[[16.80,96.30,"Irrawaddy delta"],[17.00,97.50,"Thaton area"],[18.16,97.93,"Mae Sariang, Thailand"],[14.00,99.50,"Kanchanaburi, Thailand"]],
          h:[`Pwo Karen is the second major Karenic language, and its distribution is the most striking in the branch: it is spoken from the Irrawaddy delta in Myanmar all the way into central Thailand, where Karen communities have been settled for centuries.`,
             `It has two literary traditions — a Burmese-based orthography on the Myanmar side and a Thai-influenced one in Thailand — so the same language is written two different ways depending on which country a speaker is in. That is the same pattern as Oirat in the Mongolic atlas and Chinese in the Sinitic one.`],
          t:[["c. 1st millennium CE","Pwo settlement from the Salween to the delta"],
             ["c. 18th–19th c.","Karen communities established in central Thailand"],
             ["19th–20th c.","Two orthographies develop, one per country"],
             ["21st c.","≈1 million speakers, by source"]],
          chips:[["Burmese-based orthography","scr"],["Thai-based orthography","scr"],["written two ways","scr"]] },

        { id:"kayah", en:"Kayah (Karenni)", zh:"克耶语", py:"Kèyē yǔ",
          sp:"≈300,000, by source", region:"Kayah State, Myanmar — Loikaw and the surrounding hills — and the Thai border",
          cls:"c-kar", mk:[[19.67,97.21,"Loikaw, Kayah State"],[19.30,97.40,"Demoso"],[18.80,97.90,"Thai border"]],
          h:[`Kayah, also called Karenni, is the Karenic language of Kayah State in eastern Myanmar — the smallest state in the country and one of the most affected by decades of conflict. Like the rest of the branch it is split across the Thai border, and a substantial part of its speaker population is in camps or settled in Thailand.`,
             `Its inclusion completes the branch as the brief sketches it, and it is a reminder that for Karenic the atlas is describing a language map that has been redrawn by war rather than by language policy.`],
          t:[["c. 1st millennium CE","Kayah settlement of the eastern hills"],
             ["19th c.","Missionary orthography"],
             ["1957–","Kayah State; the Karenni conflict continues for decades"],
             ["21st c.","≈300,000 speakers, by source; heavy displacement"]],
          chips:[["Latin orthography","scr"],["conflict displacement","scr"]] }] },

     { id:"more", en:"…and 200+ more languages", zh:"及其他两百多种语言", py:"Jí qítā liǎngbǎi duō zhǒng yǔyán",
       sp:"not a language — a statement of scale", region:"Everywhere this atlas's markers stop",
       cls:"c-anc", mk:[[28.00,97.00,"Northeast India — dozens of unlisted languages"],[26.00,99.00,"Yunnan — dozens more"],[20.00,96.00,"Myanmar's hill states"],[28.50,84.00,"Nepal's hills"]],
       h:[`<b>This node is not a language.</b> It exists so that the atlas does not imply that the fifty-odd entries above are the whole family. The grouping contains <b>350 or more</b> languages, and this atlas shows roughly fifty-five of them — chosen for having a literary tradition, an official status, or a place in the comparative literature.`,
          `What is left out is not marginal to the family; it is most of it. Northeast India alone has dozens of Tibeto-Burman languages with a few thousand speakers each, and the Himalayan hills of Nepal, Bhutan and northern Myanmar have more. Some have never been described. Others are described in a single article or dissertation. Several are down to a few hundred speakers.`,
          `The atlas states this rather than filling the tree with names it cannot support, which is the same choice the Sinitic atlas makes for its own smaller languages. If a later phase wants to go deeper, this is the node to replace — and the honest way to replace it is to research one region at a time, not to add names to fill space.`],
       t:[["1972–","Comparative work makes the family's scale visible"],
          ["1990s–","Documentation projects record languages with no prior description"],
          ["21st c.","350+ languages; a large minority have no grammar or dictionary"]],
       chips:[["not a language — a scale marker","scr"],["the honest fog bank","scr"]] }] }
    ]
 };


/* ===================== ISO 639-3 =====================
   Read out of the SIL register (iso-639-3.tab, retrieved 2026-09-26), not
   recalled — see research.md [TB-105]. Three classes of finding are recorded
   here because the atlas's chips would otherwise mislead:
     · the register uses different NAMES in five places: Nepal Bhasa (not
       Newar), Sichuan Yi (not Nuosu), Kachin (not Jingpho), Lushai (not Mizo),
       Bumthangkha, Yakha, Thado Chin;
     · the register SPLITS four of this atlas's nodes across several codes:
       Tamang → taj/tdg/tge, Qiang → cng/qxs, Pumi → pmi/pmj;
     · and it LUMPS one: Japhug, Situ and Tshobdun share the single code `jya`
       ("Jiarong"), because the register does not distinguish them.
   A node whose name has no code of its own shows the nearest code with the
   scope stated. */
const ISO = {
 tibetoburman:'— (no 639-3 code for the grouping; 639-5 has no collective either)',
 prototb:      '— (reconstruction, no code)',
 oldtibetan:   'otb (type H — historical)',
 tibetic:      '— (branch; the register codes its members individually)',
 lhasa:        'bod (type L — “Tibetan”; a macrolanguage, not Lhasa alone)',
 kham:         'khg (type L — “Khams Tibetan”)',
 amdo:         'adx (type L — “Amdo Tibetan”)',
 dzongkha:     'dzo (type L)',
 ladakhi:      'lbj (type L)',
 balti:        'bft (type L)',
 sherpa:       'xsr (type L)',
 zhangzhung:   'xzh (type H — historical)',
 bodish:       '— (grouping, no code)',
 tshangla:     'tsj (type L)',
 bumthang:     'kjz (type L — register spelling “Bumthangkha”)',
 tamang:       'taj · tdg · tge (the register splits Tamang three ways)',
 gurung:       'gvr (type L)',
 newaric:      '— (branch, no code)',
 newar:        'new (type L — register name “Nepal Bhasa”); nwc = Classical Newari (H)',
 kiranti:      '— (branch, no code)',
 limbu:        'lif (type L)',
 yakkha:       'ybh (type L — register spelling “Yakha”)',
 sunwar:       'suz (type L)',
 bantawa:      'bap (type L)',
 qiangic:      '— (branch, no code)',
 rgyalrong:    'jya (type L — “Jiarong”; the register does not separate its members)',
 japhug:       'jya (no separate code — shares “Jiarong” with Situ and Tshobdun)',
 situ:         'jya (no separate code)',
 tshobdun:     'jya (no separate code)',
 qiang:        'cng · qxs (the register splits Qiang into Northern and Southern)',
 pumi:         'pmi · pmj (the register splits Pumi into Northern and Southern)',
 tangut:       'txg (type H — historical)',
 burmic:       '— (branch, no code)',
 burmese:      'mya (type L; my)',
 rakhine:      'rki (type L)',
 achang:       'acn (type L)',
 zaiwa:        'atb (type L)',
 lisu:         'lis (type L)',
 lahu:         'lhu (type L)',
 hani:         'hni (type L)',
 naxi:         'nxq (type L)',
 nuosu:        'iii (type L — register name “Sichuan Yi”; ii)',
 sal:          '— (grouping, no code)',
 jingpho:      'kac (type L — register name “Kachin”)',
 bodo:         'brx (type L — “Bodo (India)”)',
 garo:         'grt (type L)',
 dimasa:       'dis (type L)',
 kukichin:     '— (branch, no code)',
 mizo:         'lus (type L — register name “Lushai”)',
 thadou:       'tcz (type L — register name “Thado Chin”)',
 tedim:        'ctd (type L — “Tedim Chin”)',
 karenic:      '— (branch, no code)',
 sgaw:         'ksw (type L)',
 pwo:          'pwo (type L — “Pwo Western Karen”; the eastern varieties are coded separately)',
 kayah:        'kyu (type L — “Western Kayah”; the eastern varieties are coded separately)',
 more:         '— (not a language — a scale marker, so no code is possible)'
};


/* ===================== per-node feature lists ===================== */
const FEATURES = {
 tibetoburman:[
  `<b>The grouping is contested and the atlas leads with that.</b> "Tibeto-Burman" has not been demonstrated to be a valid subgroup in its own right — Benedict (1972) and Matisoff both say so. This is a working map of scholarly usage, not a proven genealogy.`,
  `<b>350+ languages; about 55 shown.</b> The selection favours languages with a literary tradition, an official status or a place in the comparative literature. The "and 200+ more" node states the shortfall rather than hiding it.`,
  `<b>Almost every script here is ultimately Indian.</b> Tibetan, Burmese, Newar, Limbu and the Yi syllabary all descend from Brāhmī-derived or Indian-model scripts — the family borrowed its writing from outside it.`],
 prototb:[
  `<b>Matisoff's reconstruction</b>, in the <i>Handbook of Proto-Tibeto-Burman</i> (2003) and the STEDT project.`,
  `<b>Its status is the family's central problem:</b> the languages grouped under it may not descend from a single ancestor to the exclusion of Sinitic.`,
  `<b>Some of its own large groupings are openly geographic</b> — Matisoff declined to claim that Kamarupan or Himalayish have any special relationship "other than a geographic one".`],
 oldtibetan:[
  `<b>Attested from the mid-7th to the early 9th century</b>, from the adoption of writing by the Tibetan Empire.`,
  `<b>The Dunhuang cave library is its key archive</b> — Tibetan-ruled documents preserved alongside Chinese, Sogdian and Uyghur material.`,
  `<b>A stage, not a branch.</b> The modern Tibetic languages descend from it, and the classical written language derived from it outlived the spoken forms' unity.`],
 tibetic:[
  `<b>A dialect continuum, not a set of languages.</b> How many "languages" there are depends entirely on where lines are drawn.`,
  `<b>Three traditional divisions</b> — Ü-Tsang (Lhasa), Kham and Amdo — reflect Tibetan political fragmentation rather than linguistic distance.`,
  `<b>The Tibetan script is shared</b>, so a Ladakhi and a Bhutanese reader share a literary inheritance even where their speech is not mutually intelligible.`],
 lhasa:[
  `<b>The basis of the modern standard</b> and the variety most learners outside Tibet are taught.`,
  `<b>Tonal, like most Tibetic varieties but not all</b> — the tones correspond systematically to lost initial consonants, the same process the Sinitic atlas describes for Chinese.`],
 kham:[
  `<b>Politically fragmented and linguistically diverse.</b> "Kham Tibetan" names a group of varieties; mutual intelligibility across them is limited.`,
  `<b>Dêgê's printing house</b> was for centuries a great centre of Tibetan textual production.`,
  `<b>The <i>ris med</i> non-sectarian movement</b> of the 19th century began here and later travelled to the West.`],
 amdo:[
  `<b>The most conservative of the three great divisions</b> in some respects — it keeps initial clusters that Lhasa has simplified.`,
  `<b>The classic grammatical descriptions of Tibetan were largely built on Amdo varieties.</b>`,
  `<b>Amdo was often politically independent of Lhasa</b>, which matters for how the region's religious geography is read.`],
 dzongkha:[
  `<b>The one Tibetic variety that is a state's national language</b> — Bhutan's.`,
  `<b>≈640,000 total speakers, by source</b>, and a genuinely complicated position inside a linguistically diverse country.`,
  `<b>The name means "the language of the fortress"</b>, from the <i>dzong</i> citadels at the centre of Bhutanese administration.`],
 ladakhi:[
  `<b>The westernmost Tibetic language of any size</b>, in the Indus valley.`,
  `<b>A Tibetan language in an Indian territory</b>, next to Balti in Pakistan and Chinese-administered Tibet — one continuum, three states.`,
  `<b>Its whole literary inheritance is Tibetan Buddhist</b>, which makes its modern Indian context linguistically unusual.`],
 balti:[
  `<b>The westernmost Tibetic variety of all</b>, in the Karakoram.`,
  `<b>A Tibetic language with a Perso-Arabic literary superstratum</b> — most speakers are Muslim, so its written world is Urdu and Persian, not Tibetan.`,
  `<b>The atlas's clearest proof that a language family is not a culture.</b>`],
 sherpa:[
  `<b>The language of the Everest region</b>, and of the people who made high-altitude mountaineering a profession.`,
  `<b>One of the few Tibetic varieties with a significant diaspora</b> — Kathmandu, Darjeeling, and overseas.`,
  `<b>Tourism gives outsiders a reason to learn it</b>, which is rare for a language this size.`],
 zhangzhung:[
  `<b>Preserved by a religion</b> — almost entirely in the Bon corpus, beneath later Tibetan.`,
  `<b>Cross-listed with the Silk Road atlas</b>, which carries the same node for its own reasons.`],

 bodish:[
  `<b>Partly a geographic grouping, and the atlas says so.</b> Its members' relationship to Tibetic proper varies from close to arguable.`,
  `<b>This is where the family meets Indo-Aryan</b> — Tamang and Gurung speakers in Nepal live alongside Nepali, and vocabulary traffic runs both ways.`],
 tshangla:[
  `<b>The language of the Sharchop — "easterners" — who form a large part of Bhutan's population.</b>`,
  `<b>Not mutually intelligible with Dzongkha</b>, which is why "Bhutanese" is not a single language.`],
 bumthang:[
  `<b>Central Bhutan's language</b>, in the valleys that are the country's spiritual heartland — the first Buddhist temples are there.`,
  `<b>Great cultural weight, small speaker base</b> — ≈30,000, by source.`],
 tamang:[
  `<b>The largest Tibetic-related language of Nepal after Nepali itself</b>, ≈1.35 million by source.`,
  `<b>Officially a "national language" of Nepal</b>, but losing ground among younger urban speakers to Nepali.`,
  `<b>The register splits Tamang three ways</b> — Eastern, Western and Eastern Gorkha Tamang.`],
 gurung:[
  `<b>Historically associated with the Gurkha regiments</b>, and the resulting diaspora has shaped its modern demography.`,
  `<b>A clear case of ethnic population ≠ speaker population</b> — many who identify as Gurung no longer speak the language, hence the "by source" hedge.`],
 newaric:[
  `<b>A small branch with an outsized literary history</b> — the Kathmandu valley produced chronicles, poetry and scholarship while much of the surrounding hill country was pre-literate.`,
  `<b>"Tibeto-Burman" does not mean "unwritten"</b>, and this branch is the proof.`],
 newar:[
  `<b>The language of the Kathmandu valley's old urban civilisation</b> — its architecture, scholarship and poetry.`,
  `<b>Three names in circulation:</b> Newar, Newari, and Nepal Bhasa — the last is the name the Government of Nepal uses officially, and the atlas gives both rather than choosing silently.`,
  `<b>Its script tradition is Indian, not Tibetan</b> — the Nepal script, largely displaced by Devanagari in print, despite the language being Tibeto-Burman.`],
 kiranti:[
  `<b>Eastern Nepal's Tibeto-Burman group</b>, in a compact area with unusually high linguistic diversity.`,
  `<b>Kiranti verbs agree with both subject and object</b>, and some members have a prefixal system that is rare in the family — central to arguments about Proto-Tibeto-Burman.`,
  `<b>One of the few Tibeto-Burman clusters with an indigenous script</b> — Limbu.`],
 limbu:[
  `<b>The largest Kiranti language, and the one with its own script.</b>`,
  `<b>The Limbu script (Sirijanga)</b> is an indigenous Brāhmī-derived system, revived in the 18th century and now taught in Nepal and Sikkim.`,
  `<b>One of the very few Tibeto-Burman peoples with a writing tradition not borrowed from Tibetan, Devanagari or Latin.</b>`],
 yakkha:[
  `<b>A good example of a language being lost without being listed as critically endangered.</b>`,
  `<b>Well documented by recent descriptive work</b>, which makes it checkable in a way most of its neighbours are not.`],
 sunwar:[
  `<b>One of the westernmost Kiranti languages</b>, between the Kiranti area proper and the Tamang and Newar areas.`,
  `<b>Its position matters for arguments about where the branch is bounded.</b>`],
 bantawa:[
  `<b>One of the largest Kiranti languages by speaker count.</b>`,
  `<b>Its size has made it the language most often used to illustrate Kiranti grammar.</b>`,
  `<b>"Bantawa" also names a wider dialect cluster</b> in some classifications, which is why the figure carries a hedge.`],

 qiangic:[
  `<b>The family's eastern edge</b>, in the river valleys where the Tibetan plateau drops toward the Sichuan basin.`,
  `<b>Complex consonant clusters and elaborate verb morphology</b> — a typological profile unlike anything else in the family.`,
  `<b>Where the family produced one great script and lost it:</b> Tangut belongs here, and is cross-listed to the Silk Road atlas.`],
 rgyalrong:[
  `<b>A small group with disproportionate importance</b> to comparative Tibeto-Burman, because its verb morphology is archaic.`,
  `<b>Speakers are historically part of the Tibetan cultural sphere while speaking a non-Tibetic language</b> — Tibetan religion and writing, Qiangic speech.`,
  `<b>Family lines and cultural lines do not coincide here</b>, which is worth keeping in view along the whole frontier.`],
 japhug:[
  `<b>The best-described Rgyalrong language</b>, and one of the reasons the group is so prominent in the literature.`,
  `<b>Retains consonant clusters and a verb system argued to preserve features lost everywhere else in the family.</b>`,
  `<b>A few thousand speakers in a handful of valleys</b> — the scale at which most languages in this atlas actually exist.`],
 situ:[
  `<b>The largest Rgyalrong language</b>, with roughly seventy thousand speakers across several counties.`,
  `<b>Comparatively better placed than Japhug, but still without official status and under pressure from Mandarin.</b>`],
 tshobdun:[
  `<b>The third of the three named Rgyalrong languages</b>, distinguished from Japhug by systematic sound correspondences rather than anything obvious to a listener.`,
  `<b>A neat demonstration of the atlas's recurring problem:</b> whether these are three languages or one is a decision about criteria, not a fact about the world.`],
 qiang:[
  `<b>A language cluster, not one language</b> — its northern and southern groups are not mutually intelligible.`,
  `<b>≈140,000 speakers, by source</b>, in north-central Sichuan.`,
  `<b>The 2008 Wenchuan earthquake struck the heart of the Qiang area</b> — these languages face pressures unrelated to language policy.`],
 pumi:[
  `<b>A Qiangic language of the Yunnan–Sichuan border country</b>, spoken by an officially recognised minority group.`,
  `<b>Sits geographically between the Qiangic area and the Burmic languages of Yunnan</b>, which is why its classification has been discussed more than its size suggests.`],
 tangut:[
  `<b>The one Qiangic language that had a script, a literature and an empire.</b>`,
  `<b>Cross-listed with the Silk Road atlas</b>, where the decipherment story — 5,863 characters, the Khara-Khoto library, the 20th-century reconstruction — is told in full.`,
  `<b>A language of the same group as Qiang and Japhug that briefly ran a state on the Silk Road.</b>`],
 burmic:[
  `<b>The family's demographic centre of gravity</b> — Burmese alone accounts for most of the branch's speakers.`,
  `<b>Where the atlas's script diversity peaks:</b> the Burmese script, the modern Yi syllabary, and the Naxi Dongba pictographs — three different answers to "how do you write this language".`,
  `<b>Straddles the China–Myanmar frontier</b>, so its languages sit under two very different language-policy regimes.`],
 burmese:[
  `<b>The largest language in this atlas</b>, and one of the few Tibeto-Burman languages with a continuous written literature reaching back nearly a millennium.`,
  `<b>Its script descends from the Pyu</b>, the Tibeto-Burman people whose city-states preceded the Burmese kingdom — an Indian script adapted for a Tibeto-Burman language.`,
  `<b>Tonal, with a creaky/clear register contrast</b> rather than a simple pitch distinction — one of the things that makes it hard for outsiders.`],
 rakhine:[
  `<b>The language of the Mrauk U kingdom</b>, which ruled the Arakan coast from the 15th to the 18th century.`,
  `<b>Close to Burmese, but retains an /r/ that standard Burmese has lost</b> — the "language or dialect" question is genuinely live here.`,
  `<b>The atlas shows it as a separate node and states the closeness</b> rather than deciding for the reader.`],

 achang:[
  `<b>A small Burmic language of the western Yunnan border country</b>, under pressure from both Chinese and Jingpo.`,
  `<b>Its position shows how the China–Myanmar frontier cuts through language areas.</b>`],
 zaiwa:[
  `<b>The language of the Jingpo nationality's Zaiwa-speaking population</b> — and that phrase hides a mismatch.`,
  `<b>China's Jingpo nationality includes speakers of both Jingpo (a Sal language) and Zaiwa (a Burmic one)</b>, so the official ethnicity does not match the linguistic grouping.`,
  `<b>One of the reasons speaker counts from census categories are unreliable for this family.</b>`],
 lisu:[
  `<b>Spread across four countries</b> — China, Myanmar, Thailand and India — following the mountains rather than the borders.`,
  `<b>Two distinctive scripts:</b> the Fraser alphabet (c. 1915), designed to be typed with rotated keyboard letters, and a syllabary devised in the 1920s by a Lisu farmer, Wang Renbo.`],
 lahu:[
  `<b>One of the borderland languages of the Yunnan–Myanmar–Thailand–Laos corridor.</b>`,
  `<b>Closely related to Lisu</b>, and often described together with it in the literature.`,
  `<b>Missionary Latin orthography</b>, and one of the more widely used minority languages of the Golden Triangle.`],
 hani:[
  `<b>Two names for one language</b> — Hani in China, Akha outside it — depending on which state's categories you are using.`,
  `<b>The people of the Yuanyang rice terraces</b>, and an officially recognised minority language with a Chinese romanisation.`,
  `<b>The atlas's clearest example of a naming problem that is also a political one.</b>`],
 naxi:[
  `<b>The Dongba script is a mnemonic system, not a script for writing in the ordinary sense</b> — one glyph can cue a whole phrase in ritual recitation.`,
  `<b>The Geba syllabary sits alongside it and is closer to a conventional writing system</b>, but the sources say both are rarely used in daily life and few can read Naxi.`,
  `<b>"The Naxi have a pictographic script" is the kind of half-fact this atlas exists to correct</b> — a ritual script is not evidence of everyday literacy.`,
  `<b>Lijiang's tourism trades heavily on Naxi and Dongba imagery while the language itself recedes.</b>`],
 nuosu:[
  `<b>One of the very few Tibeto-Burman languages with a modern standardised writing system in daily use.</b>`,
  `<b>The Modern Yi script is a syllabary standardised in 1974</b>, with <b>756 basic glyphs</b> based on the Liangshan dialect plus <b>63</b> for syllables found only in Chinese borrowings.`,
  `<b>Deliberately designed to be learnable and printable</b>, unlike the classical Yi script with its thousands of regional variants.`],
 sal:[
  `<b>The family's western and southern flank</b>, where Tibeto-Burman meets Indo-Aryan in Assam and Meghalaya.`,
  `<b>Politically the most consequential branch in the atlas</b> — Bodo's Eighth Schedule status and the Bodo Territorial Region are products of a long armed conflict.`,
  `<b>Jingpho is the best-known member outside India</b>, called Kachin in older literature.`],
 jingpho:[
  `<b>The largest Sal language</b>, and the one with the widest spread — Myanmar, Yunnan, Assam, Arunachal.`,
  `<b>A naming caution:</b> "Kachin" in Myanmar usage covers several distinct groups and languages, of which Jingpho is one. The atlas does not treat them as interchangeable.`],
 bodo:[
  `<b>One of the few languages in this atlas with constitutional standing</b> — added to India's Eighth Schedule in 2003.`,
  `<b>Its modern history is inseparable from conflict:</b> decades of autonomy agitation produced the Bodo Territorial Region and a series of accords.`,
  `<b>Written in Devanagari</b>, not in a script of its own.`],
 garo:[
  `<b>One of the few Tibeto-Burman languages with a substantial Christian literary tradition</b> — 19th-century missionary work produced a romanised orthography and a printed literature.`,
  `<b>Its speakers sit under three language regimes:</b> two Indian states and Bangladesh.`],
 dimasa:[
  `<b>The language of the descendants of a real polity</b> — the Dimasa kingdom ruled parts of the Brahmaputra and Barak valleys before Ahom expansion.`,
  `<b>Small speaker base, Devanagari orthography</b>, and a place in the "and more" category that its history does not deserve.`],

 kukichin:[
  `<b>Divided between two states by a border the languages ignore</b> — Mizoram and Manipur in India, Chin State in Myanmar.`,
  `<b>Famously complex verb systems</b>, and a rapid nineteenth- and twentieth-century shift from unwritten oral languages to standardised printed ones.`,
  `<b>The names are a minefield:</b> <i>Kuki</i> from the Indian side, <i>Chin</i> from the Myanmar side, and often neither from the groups themselves.`],
 mizo:[
  `<b>The branch's success story</b> — largely unwritten before the late 19th century, now a standard orthography, a printed literature and a state to run.`,
  `<b>The name is a modern coinage</b> meaning "highlander", replacing the external labels <i>Lushai</i> and <i>Kuki</i>. A reader consulting older sources will not find "Mizo" at all.`],
 thadou:[
  `<b>At the centre of the branch's naming problem</b> — the same communities are labelled Kuki, Chin or by their own group names depending on the vantage point.`,
  `<b>Manipur's hill districts are extremely diverse</b>, and Thadou is one of several Kuki-Chin languages there alongside Naga-group languages of other branches.`],
 tedim:[
  `<b>One of the better-documented members of the branch</b>, with a grammatical literature going back to the British period.`,
  `<b>Included partly because documentation matters:</b> a language with a 1930s grammar can be checked, and much of the branch is far thinner in print.`],
 karenic:[
  `<b>The branch at the centre of a long-running comparative argument</b> — Matisoff "demoted Karen but kept the divergent position of Sinitic", so its exact place depends on which reconstruction you follow.`,
  `<b>The Myanmar–Thailand border has reshaped its demography:</b> some Karen varieties have more speakers outside their home area than inside it.`,
  `<b>That is not a footnote to the linguistics</b> — it is why the atlas's Karen markers extend into Thailand.`],
 sgaw:[
  `<b>The largest Karenic language</b>, with a romanised orthography from 19th-century Baptist missions.`,
  `<b>A substantial printed literature and a history of being taught in schools on both sides of the border.</b>`,
  `<b>The written standard matters more here than speaker numbers alone suggest</b>, because it is the language of the Karen nationalist movement's institutions.`],
 pwo:[
  `<b>The most striking distribution in the branch:</b> from the Irrawaddy delta to central Thailand, where Karen communities have been settled for centuries.`,
  `<b>Two literary traditions</b> — a Burmese-based orthography in Myanmar and a Thai-influenced one in Thailand — so the same language is written two ways.`,
  `<b>The same pattern as Oirat in the Mongolic atlas and Chinese in the Sinitic one.</b>`],
 kayah:[
  `<b>The Karenic language of Myanmar's smallest state</b>, and one of the most affected by decades of conflict.`,
  `<b>A substantial part of its speaker population is in camps or settled in Thailand.</b>`,
  `<b>For Karenic the atlas is describing a language map redrawn by war rather than by language policy.</b>`],
 more:[
  `<b>Not a language. A statement of scale.</b> The grouping contains 350+ languages and this atlas shows about fifty-five.`,
  `<b>What is left out is most of the family, not its margins</b> — Northeast India alone has dozens of Tibeto-Burman languages with a few thousand speakers each.`,
  `<b>Some have never been described</b>; others appear in a single article or dissertation; several are down to a few hundred speakers.`,
  `<b>Replacing this node honestly means researching one region at a time</b>, not adding names to fill space.`]
};


/* ===================== links (Omniglot) =====================
   Every URL requested before being written down — see research.md [TB-110],
   which records the traps found:
     · Omniglot's Jingpho page is jingpho.htm — jingpo.htm is 404;
     · its Newari page is a 302 redirect to ranjana.htm (the script page), and
       newar.htm is the direct 200 — the atlas uses the direct one;
     · there is NO page for Dzongkha, Qiang or Rgyalrong under any name tried.
   Nodes with no page carry an empty list; the engine's search fallback covers
   them. */
const OM = 'https://www.omniglot.com/writing/';
const SOUND = {
 tibetoburman:[['Omniglot — writing systems index', 'https://www.omniglot.com/writing/langfam.htm']],
 prototb:     [],
 oldtibetan:  [['Tibetan script — Omniglot', OM+'tibetan.htm']],
 tibetic:     [['Tibetan script — Omniglot', OM+'tibetan.htm']],
 lhasa:       [['Tibetan script — Omniglot', OM+'tibetan.htm']],
 kham:        [['Tibetan script — Omniglot', OM+'tibetan.htm']],
 amdo:        [['Tibetan script — Omniglot', OM+'tibetan.htm']],
 dzongkha:    [],
 ladakhi:     [['Ladakhi — Omniglot', OM+'ladakhi.htm']],
 balti:       [['Balti — Omniglot', OM+'balti.htm']],
 sherpa:      [['Sherpa — Omniglot', OM+'sherpa.htm']],
 zhangzhung:  [],
 bodish:      [],
 tshangla:    [],
 bumthang:    [],
 tamang:      [['Tamang — Omniglot', OM+'tamang.htm']],
 gurung:      [['Gurung — Omniglot', OM+'gurung.htm']],
 newaric:     [['Newar (Ranjana script) — Omniglot', OM+'ranjana.htm']],
 newar:       [['Newar — Omniglot', OM+'newar.htm'], ['Ranjana script — Omniglot', OM+'ranjana.htm']],
 kiranti:     [['Limbu script — Omniglot', OM+'limbu.htm']],
 limbu:       [['Limbu script — Omniglot', OM+'limbu.htm']],
 yakkha:      [],
 sunwar:      [],
 bantawa:     [],
 qiangic:     [],
 rgyalrong:   [],
 japhug:      [],
 situ:        [],
 tshobdun:    [],
 qiang:       [],
 pumi:        [],
 tangut:      [['Tangut — Omniglot', OM+'tangut.htm']],
 burmic:      [['Burmese script — Omniglot', OM+'burmese.htm']],
 burmese:     [['Burmese script — Omniglot', OM+'burmese.htm']],
 rakhine:     [['Burmese script — Omniglot', OM+'burmese.htm']],
 achang:      [],
 zaiwa:       [],
 lisu:        [['Lisu (Fraser alphabet) — Omniglot', OM+'lisu.htm']],
 lahu:        [['Lahu — Omniglot', OM+'lahu.htm']],
 hani:        [['Akha — Omniglot', OM+'akha.htm'], ['Hani — Omniglot', OM+'hani.htm']],
 naxi:        [['Naxi and Dongba — Omniglot', OM+'naxi.htm']],
 nuosu:       [['Yi syllabary — Omniglot', OM+'yi.htm']],
 sal:         [['Bodo — Omniglot', OM+'bodo.htm']],
 jingpho:     [['Jingpho — Omniglot', OM+'jingpho.htm']],
 bodo:        [['Bodo — Omniglot', OM+'bodo.htm']],
 garo:        [['Garo — Omniglot', OM+'garo.htm']],
 dimasa:      [],
 kukichin:    [['Mizo — Omniglot', OM+'mizo.htm']],
 mizo:        [['Mizo — Omniglot', OM+'mizo.htm']],
 thadou:      [],
 tedim:       [],
 karenic:     [['Karen — Omniglot', OM+'karen.htm']],
 sgaw:        [['Karen — Omniglot', OM+'karen.htm']],
 pwo:         [['Karen — Omniglot', OM+'karen.htm']],
 kayah:       [['Karen — Omniglot', OM+'karen.htm']],
 more:        []
};

/* ===================== schematic outline (hand-drawn, offline) =====================
   Coarse rings for the Tibetan plateau, the Himalayan arc, the Yunnan–Myanmar
   hill country and Northeast India. Simplified from memory of the geography, NOT
   surveyed boundaries; the markers sit at true coordinates. */
const PLATEAU  = [[78.0,36.0],[88.0,37.0],[95.0,36.0],[99.0,34.0],[99.0,30.0],[92.0,28.0],[82.0,30.0],[78.0,33.0],[78.0,36.0]];
const HIMALAYA = [[74.0,35.0],[80.0,31.0],[86.0,28.0],[92.0,28.0],[96.0,29.0],[95.0,27.0],[88.0,26.0],[80.0,28.0],[74.0,32.0],[74.0,35.0]];
const YUNNAN   = [[97.0,29.0],[104.0,29.0],[105.0,22.0],[99.0,20.0],[96.0,23.0],[95.0,27.0],[97.0,29.0]];
const NEINDIA  = [[88.0,27.0],[96.0,28.0],[97.0,24.0],[93.0,22.0],[89.0,23.0],[88.0,27.0]];
const MYANMAR  = [[92.0,28.0],[99.0,28.0],[99.0,16.0],[94.0,15.0],[92.0,20.0],[92.0,28.0]];
const TB_GEO = { type:'FeatureCollection',
  features:[PLATEAU,HIMALAYA,YUNNAN,NEINDIA,MYANMAR].map(r=>({
    type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[r] } })) };

/* ---------- approximate "core areas" ----------
   Coarse hand-drawn blocks showing roughly where each branch is rooted — NOT
   surveyed boundaries. For a family this diverse a block is a region of
   CONCENTRATION: the languages of each branch are scattered within it, and the
   block omits enclaves, ignores the scatter, and simplifies coastlines. The
   marker layer remains the factual one. */
const AREAS = {
 'c-anc':[[[78.0,36.0],[99.0,35.0],[99.0,29.0],[79.0,30.0],[78.0,36.0]]],
 'c-tib':[[[78.0,36.0],[99.0,35.0],[99.0,29.0],[79.0,30.0],[78.0,36.0]]],
 'c-bod':[[[74.0,35.0],[92.0,29.0],[95.0,27.5],[86.0,26.5],[77.0,29.0],[74.0,32.0],[74.0,35.0]]],
 'c-zz':[[[79.0,33.5],[86.0,33.5],[86.0,29.5],[79.0,29.5],[79.0,33.5]]],
 'c-new':[[[84.5,28.5],[86.5,28.5],[86.5,27.0],[84.5,27.0],[84.5,28.5]]],
 'c-kir':[[[86.0,28.5],[88.5,28.5],[88.5,26.5],[86.0,26.5],[86.0,28.5]]],
 'c-qia':[[[101.0,33.5],[105.5,33.0],[105.5,26.5],[100.0,27.0],[101.0,33.5]]],
 'c-tan':[[[99.0,43.0],[107.5,42.5],[107.5,38.0],[99.0,38.5],[99.0,43.0]]],
 'c-bur':[[[96.0,29.0],[105.0,29.0],[105.0,20.0],[99.0,18.0],[95.0,22.0],[95.0,27.0],[96.0,29.0]],
          [[94.0,28.0],[99.0,28.0],[99.0,16.0],[94.0,15.0],[92.0,20.0],[92.0,26.0],[94.0,28.0]]],
 'c-sal':[[[88.0,27.5],[97.0,28.5],[98.0,24.0],[93.0,22.0],[88.5,23.0],[88.0,27.5]]],
 'c-kuk':[[[92.0,25.5],[94.5,25.5],[94.5,22.0],[92.0,22.0],[92.0,25.5]]],
 'c-kar':[[[96.0,19.5],[99.0,19.0],[99.0,15.0],[96.5,14.5],[96.0,19.5]],
          [[97.0,19.0],[99.5,19.0],[99.5,13.5],[97.5,13.5],[97.0,19.0]]]
};


/* ===================== registration ===================== */
window.ATLASES = window.ATLASES || {};
window.ATLASES.tibetoburman = {
  key: 'tibetoburman',
  title:   { zh: '藏缅语族', en: 'Tibeto-Burman' },
  tagline: 'The rest of Sino-Tibetan — from the Tibetan plateau down the Himalayan arc to Yunnan, Nepal, Northeast India and Myanmar',
  stats:   [['56', 'nodes, from a 350-language grouping'], ['≈330 million', 'speakers, by source'], ['7', 'writing systems in the atlas']],
  palette: {
    anc: '#cdd7de', tib: '#c98a4b', bod: '#d0a06a', zz: '#a08040', new: '#c07fa8',
    kir: '#a06fb8', qia: '#8f7fc0', tan: '#4f9f7f', bur: '#6fa88f', sal: '#b08050',
    kuk: '#c09060', kar: '#a8b84f'
  },
  legend:  [['anc','Ancestral / scale marker'],['tib','Tibetic'],['bod','Bodish / Greater Tibetan'],
            ['zz','Zhangzhung (extinct)'],['new','Newaric'],['kir','Kiranti'],['qia','Qiangic'],
            ['tan','Tangut (extinct)'],['bur','Burmic (Lolo–Burmese)'],['sal','Sal / Bodo–Garo'],
            ['kuk','Kuki-Chin'],['kar','Karenic']],
  view:    { center: [94, 30], zoom: 4.0 },
  outline: { color: '#c98a4b', fill: 'rgba(201,138,75,0.05)' },
  sketchGeo: TB_GEO,
  captions: {
    note:   '● Markers show <b>representative centres</b> where each variety is rooted — capitals, monastery towns, district headquarters, and a few diaspora points (Darjeeling, the Thai border camps, the Gurkha diaspora). For a family spread across seven countries and 350+ languages these are <em>anchors, not territories</em>: a marker means the variety is centred there, not that it is the only language spoken there. In Northeast India and the Myanmar hills in particular, every marker sits in a district where several unrelated languages are also spoken.',
    areas:  '<b style="color:var(--gold)">Approximate core areas</b> — coarse hand-drawn blocks showing roughly where each branch is concentrated. They follow no surveyed boundary, omit enclaves, and flatten a scatter into a shape. The Burmic and Karenic blocks in Myanmar in particular are <em>regions of concentration</em>, not territories, and the Tibetan plateau block is drawn over a landscape where the population is a thin ribbon of valley settlements. The marker layer remains the factual one.',
    sketch: '<b style="color:var(--gold)">Schematic map</b> — a hand-drawn Tibetan plateau, Himalayan arc, Yunnan–Myanmar hill country, Northeast India and the Irrawaddy valley, simplified from memory of the geography; the markers sit at true coordinates. Works fully offline.'
  },
  fonts: ['Noto Serif Tibetan', 'Noto Sans Myanmar', 'Noto Sans Yi', 'Noto Serif SC'],
  filterPlaceholder: 'e.g. Tibetan, Burmese, Yi, Mizo, Karen…',
  listen: {
    om: 'https://www.omniglot.com/writing/',
    fv: 'https://forvo.com/languages/',
    search: 'language listening native speaker'
  },
  /* Every node's `sp` string is already a complete phrase, so the engine must
     not append its default " speakers" — otherwise "≈6 million, by source"
     becomes "≈6 million, by source speakers". */
  spSuffix: '',
  rootId: 'tibetoburman',
  stages: ['prototb', 'oldtibetan'],
  sources: 'Sources: J. Matisoff, <i>Handbook of Proto-Tibeto-Burman</i> (2003) and the STEDT project · P. Benedict, <i>Sino-Tibetan: A Conspectus</i> (1972) · G. Thurgood &amp; R. J. LaPolla (eds.), <i>The Sino-Tibetan Languages</i> (2003, 2nd ed. 2017) · Sun Hongkai (孙宏开) and colleagues on the Qiangic languages and Chinese minority languages · Gong Hwang-cherng (龚煌城) and T. Nishida on Tangut · G. van Driem, <i>Languages of the Himalayas</i> · the SIL ISO 639-3 register (<i>iso-639-3.tab</i>, retrieved 2026-09-26) for every code quoted, including the five register names that differ from common usage and the four nodes the register splits across several codes (see <i>research.md</i> TB-105) · Ethnologue and Glottolog for counts. <b>Two caveats govern this whole atlas and both are stated on the root node:</b> first, the grouping "Tibeto-Burman" has not been demonstrated to be a valid subgroup in its own right — the tree is a map of scholarly usage, not a proven genealogy (TB-101); second, the grouping contains 350+ languages and this atlas shows about fifty-five, with the shortfall declared on the "and 200+ more" node rather than hidden. Speaker figures are approximations and vary widely between censuses; where sources disagree the hedge "by source" is used rather than a single figure. See <i>research.md</i> TB-101 to TB-110.',
  tree: DATA, iso: ISO, features: FEATURES, sound: SOUND, areas: AREAS
};
})();

