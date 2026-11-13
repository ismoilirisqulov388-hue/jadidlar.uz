/**
 * Jadidlar.uz - Universal Common JavaScript
 * Handles navigation dropdowns, modal windows, live search, and scroll utilities.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-to-top button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. Global Search Modal
    initGlobalSearch();

    // 3. Tab filter initializers
    initTabs();

    // 4. Modal window handlers
    initModalHandlers();

    // 5. In-page live filter search
    initPageSearch();

    // 6. Interactive Pagination
    initPagination();

    // 7. Initialize Saved Language across the whole page
    const savedLang = localStorage.getItem('jadid_selected_lang') || 'uz';
    applyLanguageToPage(savedLang);
});

// ==========================================================================
// COMPREHENSIVE MULTI-LANGUAGE SYSTEM (Uzbek Latin, Uzbek Cyrillic, English)
// Translates all navigation, headers, cards, modals, buttons, and content across all pages
// ==========================================================================

const JADID_DICTIONARY = {
    // --- MAIN NAVIGATION ---
    'JADIDLAR': { oz: 'ЖАДИДЛАР', en: 'JADIDS' },
    'MANBALAR': { oz: 'МАНБАЛАР', en: 'SOURCES' },
    'IZLANISHLAR': { oz: 'ИЗЛАНИШЛАР', en: 'RESEARCH' },
    'TIL VA IMLO': { oz: 'ТИЛ ВА ИМЛО', en: 'LANGUAGE & SPELLING' },
    'TURKISTON MUXTORIYATI': { oz: 'ТУРКИСТОН МУХТОРИЯТИ', en: 'TURKESTAN AUTONOMY' },
    'VOQEALAR': { oz: 'ВОҚЕАЛАР', en: 'EVENTS' },
    "KO'R-ESHIT-O'QI": { oz: 'КЎР-ЭШИТ-ЎҚИ', en: 'MEDIA' },
    "KO‘R-ESHIT-O‘QI": { oz: 'КЎР-ЭШИТ-ЎҚИ', en: 'MEDIA' },
    'BIZ HAQIMIZDA': { oz: 'БИЗ ҲАҚИМИЗДА', en: 'ABOUT US' },
    'Bosh sahifa': { oz: 'Бош саҳифа', en: 'Home' },

    // --- SUBMENUS & CATEGORIES ---
    'Arxiv hujjatlari': { oz: 'Архив ҳужжатлари', en: 'Archive Documents' },
    'Matbuot': { oz: 'Матбуот', en: 'Press' },
    'Asarlar': { oz: 'Асарлар', en: 'Works' },
    'Maqolalar': { oz: 'Мақолалар', en: 'Articles' },
    'Dissertatsiyalar': { oz: 'Диссертациялар', en: 'Dissertations' },
    'Esdaliklar': { oz: 'Эсдаликлар', en: 'Memoirs' },
    'Hikmatlar': { oz: 'Ҳикматлар', en: 'Aphorisms' },
    'Sherlar': { oz: 'Шеърлар', en: 'Poems' },
    'Seminarlar': { oz: 'Семинарлар', en: 'Seminars' },
    'Yangiliklar': { oz: 'Янгиликлар', en: 'News' },
    "Yig'inlar": { oz: 'Йиғинлар', en: 'Conferences' },
    "Yig‘inlar": { oz: 'Йиғинлар', en: 'Conferences' },
    'Suratlar': { oz: 'Суратлар', en: 'Photographs' },
    'Koruvlar': { oz: 'Кўрувлар', en: 'Video Materials' },
    "Ko'ruvlar": { oz: 'Кўрувлар', en: 'Video Materials' },
    'Eshituvlar': { oz: 'Эшитувлар', en: 'Audio Recordings' },

    // --- SECTION TITLES & HEADINGS ---
    'Jadid Namoyandalari': { oz: 'Жадид Намояндалари', en: 'Jadid Figures' },
    'Loyiha haqida': { oz: 'Лойиҳа ҳақида', en: 'About the Project' },
    'Bizning bosh maqsadimiz': { oz: 'Бизнинг бош мақсадимиз', en: 'Our Main Mission' },
    "To'liq raqamlashtirish": { oz: 'Тўлиқ рақамлаштириш', en: 'Full Digitization' },
    'Ochiq ilmiy qidiruv': { oz: 'Очиқ илмий қидирув', en: 'Open Academic Search' },
    'Xalqaro integratsiya': { oz: 'Халқаро интеграция', en: 'International Integration' },
    'Biz bilan hamkorlik qiling': { oz: 'Биз билан ҳамкорлик қилинг', en: 'Partner With Us' },
    "Bo'limlar": { oz: 'Бўлимлар', en: 'Sections' },
    'Media': { oz: 'Медиа', en: 'Media' },
    'Aloqa': { oz: 'Алоқа', en: 'Contact' },
    'Yangiliklar va maqolalar': { oz: 'Янгиликлар ва мақолалар', en: 'News & Articles' },
    'Nodir arxiv hujjatlari': { oz: 'Нодир архив ҳужжатлари', en: 'Rare Archive Documents' },
    'Matbuot va matnlar': { oz: 'Матбуот ва матнлар', en: 'Press & Historical Texts' },
    'Izlanishlar va Asarlar': { oz: 'Изланишлар ва Асарлар', en: 'Research & Literary Works' },
    'Hamkor tashkilotlar': { oz: 'Ҳамкор ташкилотлар', en: 'Partner Organizations' },
    'Foydali havolalar': { oz: 'Фойдали ҳаволалар', en: 'Useful Resources' },
    'Elektron pochta': { oz: 'Электрон почта', en: 'Email Address' },
    'Telefon raqam': { oz: 'Телефон рақам', en: 'Phone Number' },
    'Ijtimoiy tarmoqlar': { oz: 'Ижтимоий тармоқлар', en: 'Social Networks' },

    // --- BUTTONS & ACTIONS ---
    "Barchasini ko'rish": { oz: 'Барчасини кўриш', en: 'View All' },
    "To'liq ma'lumot": { oz: 'Тўлиқ маълумот', en: 'Full Information' },
    "Batafsil ma'lumot": { oz: 'Батафсил маълумот', en: 'Detailed Information' },
    'Merosi →': { oz: 'Мероси →', en: 'Legacy →' },
    'Merosi': { oz: 'Мероси', en: 'Legacy' },
    'Saytdan qidirish': { oz: 'Сайтдан қидириш', en: 'Search Site' },
    'Yuklab olish': { oz: 'Юклаб олиш', en: 'Download' },
    'Ulashish': { oz: 'Улашиш', en: 'Share' },
    "O'qish": { oz: 'Ўқиш', en: 'Read' },
    "Ko'rish": { oz: 'Кўриш', en: 'View' },
    'Tinglash': { oz: 'Тинглаш', en: 'Listen' },
    'Qidirish': { oz: 'Қидириш', en: 'Search' },
    'Yopish': { oz: 'Ёпиш', en: 'Close' },
    'Menyu': { oz: 'Меню', en: 'Menu' },
    'Yuqoriga': { oz: 'Юқорига', en: 'To Top' },
    'Oldingi': { oz: 'Олдинги', en: 'Previous' },
    'Keyingi': { oz: 'Кейинги', en: 'Next' },
    'Barchasi': { oz: 'Барчаси', en: 'All' },
    'Tarix': { oz: 'Тарих', en: 'History' },
    'Adabiyot': { oz: 'Адабиёт', en: 'Literature' },
    "Ma'rifat": { oz: 'Маърифат', en: 'Enlightenment' },
    'Teatr': { oz: 'Театр', en: 'Theatre' },
    'Nashrlar': { oz: 'Нашрлар', en: 'Publications' },
    'Ilmiy maqola': { oz: 'Илмий мақола', en: 'Academic Article' },
    'Dissertatsiya': { oz: 'Диссертация', en: 'Dissertation' },
    'Arxiv hujjati': { oz: 'Архив ҳужжати', en: 'Archive Record' },
    'Muallif:': { oz: 'Муаллиф:', en: 'Author:' },
    'Muallif': { oz: 'Муаллиф', en: 'Author' },
    'Nashr yili:': { oz: 'Нашр йили:', en: 'Publication Year:' },
    'Nashr yili': { oz: 'Нашр йили', en: 'Publication Year' },
    'Sahifalar:': { oz: 'Саҳифалар:', en: 'Pages:' },
    'Sahifalar soni': { oz: 'Саҳифалар сони', en: 'Page Count' },
    'Hajmi:': { oz: 'Ҳажми:', en: 'Size:' },
    'Hajmi': { oz: 'Ҳажми', en: 'Size' },

    // --- SEARCH & MODALS ---
    "Sayt bo'yicha qidiruv": { oz: 'Сайт бўйича қидирув', en: 'Site Search' },
    'Jadidlar portalidan qidirish': { oz: 'Жадидлар порталидан қидириш', en: 'Search Jadidlar Portal' },
    'Jadid ismi, asar yoki mavzuni kiriting...': { oz: 'Жадид исми, асар ёки мавзуни киритинг...', en: 'Search Jadid names, works, or topics...' },
    'Jadid ismi, asar nomi yoki maqola...': { oz: 'Жадид исми, асар номи ёки мақола...', en: 'Enter Jadid name, work title, or article...' },
    'Hech narsa topilmadi.': { oz: 'Ҳеч нарса топилмади.', en: 'Nothing found.' },
    'Hech narsa topilmadi': { oz: 'Ҳеч нарса топилмади', en: 'Nothing found' },
    'Qidirish uchun kamida 2 ta harf kiriting...': { oz: 'Қидириш учун камида 2 та ҳарф киритинг...', en: 'Type at least 2 characters to search...' },
    'Qidiruv natijalari': { oz: 'Қидирув натижалари', en: 'Search Results' },

    // --- ORGANIZATIONS & FOOTER ---
    "O'zFA Tarix instituti": { oz: 'ЎзФА Тарих институти', en: 'Institute of History, Academy of Sciences' },
    "O'zbekiston Milliy kutubxonasi": { oz: 'Ўзбекистон Миллий кутубхонаси', en: 'National Library of Uzbekistan' },
    "O'zbekiston Milliy arxivi": { oz: 'Ўзбекистон Миллий архиви', en: 'National Archives of Uzbekistan' },
    "Qatag'on qurbonlari xotirasi muzeyi": { oz: 'Қатағон қурбонлари хотираси музейи', en: 'Museum of Victims of Repression' },
    "O'zFA Sharqshunoslik instituti": { oz: 'ЎзФА Шарқшунослик институти', en: 'Institute of Oriental Studies, Academy of Sciences' },
    "O'zFA MDA fondi": { oz: 'ЎзФА МДА фонди', en: 'UzAS Central State Archive Fund' },
    "O'zbekiston Respublikasi Fanlar akademiyasi Tarix instituti": { oz: 'Ўзбекистон Республикаси Фанлар академияси Тарих институти', en: 'Institute of History, Academy of Sciences of the Republic of Uzbekistan' },
    "<Jadidlar> Barcha huquqlar himoyalangan.": { oz: '«Жадидлар» Барча ҳуқуқлар ҳимояланган.', en: '«Jadidlar» All rights reserved.' },
    "Barcha huquqlar himoyalangan.": { oz: 'Барча ҳуқуқлар ҳимояланган.', en: 'All rights reserved.' },

    // --- DESCRIPTIONS & KEY PARAGRAPHS ---
    "XX asr boshidagi ma'rifatparvarlik harakati, jadid bobolarimizning ilmiy, adabiy va ijtimoiy merosini o'rganishga bag'ishlangan yagona raqamli portal.": {
        oz: 'XX аср бошидаги маърифатпарварлик ҳаракати, жадид боболаримизнинг илмий, адабий ва ижтимоий меросини ўрганишга бағишланган ягона рақамли портал.',
        en: 'The premier digital portal dedicated to the early 20th-century enlightenment movement and the scientific, literary, and social heritage of our Jadid forefathers.'
    },
    "Bizning bosh maqsadimiz — Turkiston jadidlarining bebaho ilmiy-ma'rifiy merosini to'plash, zamonaviy axborot texnologiyalari orqali xalqaro miqyosda ommalashtirish hamda yosh avlodga yetkazishdir.": {
        oz: 'Бизнинг бош мақсадимиз — Туркистон жадидларининг бебаҳо илмий-маърифий меросини тўплаш, замонавий ахборот технологиялари орқали халқаро миқёсда оммалаштириш ҳамда ёш авлодга етказишдир.',
        en: 'Our primary mission is to collect the priceless intellectual and cultural heritage of Turkestan Jadids, popularize it globally through modern technologies, and pass it on to future generations.'
    },
    "Arxiv hujjatlari, nodir qo'lyozmalar, davriy matbuot va kitoblarni yuqori sifatda skanerlab, yagona raqamli bazaga jamlash.": {
        oz: 'Архив ҳужжатлари, нодир қўлёзмалар, даврий матбуот ва китобларни юқори сифатда сканерлаб, ягона рақамли базага жамлаш.',
        en: 'Digitizing archival records, rare manuscripts, periodicals, and books in high resolution to assemble them into a unified digital repository.'
    },
    "Matnlarni semantik qidiruv, to'liq matnli indekslash va xronologik tasniflash orqali tadqiqotchilar uchun qulay sharoit yaratish.": {
        oz: 'Матнларни семантик қидирув, тўлиқ матнли индекслаш ва хронологик таснифлаш орқали тадқиқотчилар учун қулай шароит яратиш.',
        en: 'Providing researchers with semantic search, full-text indexing, and chronological classification of historical sources.'
    },
    "Tarixiy manbalarni xorijiy tillarga tarjima qilish va xalqaro ilmiy platformalar bilan hamkorlikda global jamoatchilikka taqdim etish.": {
        oz: 'Тарихий манбаларни хорижий тилларга таржима қилиш ва халқаро илмий платформалар билан ҳамкорликда глобал жамоатчиликка тақдим этиш.',
        en: 'Translating historical sources into international languages and sharing them globally in cooperation with international academic platforms.'
    },
    "Agar sizda jadidlar merosiga oid nodir manbalar, fotosuratlar yoki tadqiqotlar bo'lsa, portalimizni boyitishda ishtirok eting.": {
        oz: 'Агар сизда жадидлар меросига оид нодир манбалар, фотосуратлар ёки тадқиқотлар бўлса, порталимизни бойитишда иштирок этинг.',
        en: 'If you possess rare historical documents, photographs, or research materials on Jadid heritage, join us in enriching the portal.'
    },

    // --- BIOGRAPHIES ---
    "Turkiston jadidchilik harakatining yetakchisi, <Padarkush> pyesasi muallifi. 1919-yilda Qarshida Buxoro amiri beklari tomonidan qatl etilgan.": {
        oz: 'Туркистон жадидчилик ҳаракатининг етакчиси, «Падаркуш» пьесаси муаллифи. 1919-йилда Қаршида Бухоро амири беклари томонидан қатл этилган.',
        en: 'Leader of the Turkestan Jadid movement, author of the play <Padarkush>. Martyred in 1919 in Qarshi by officials of the Bukhara Emirate.'
    },
    "O'zbek romanchiligining asoschisi, <O'tkan kunlar>, <Mehrobdan chayon> asarlari orqali millat dardini ko'tarib chiqqan adib.": {
        oz: 'Ўзбек романчилигининг асосчиси, «Ўткан кунлар», «Меҳробдан чаён» асарлари орқали миллат дардини кўтариб чиққан адиб.',
        en: 'Founder of the Uzbek novel, celebrated author of <Days Gone By> and <Scorpion from the Altar> who voiced the nation’s aspirations.'
    },
    "Toshkent jadidchiligining yetakchisi, <Adibi avval> darsligi muallifi, milliy maorif va matbuot homiysi.": {
        oz: 'Тошкент жадидчилигининг етакчиси, «Адиби аввал» дарслиги муаллифи, миллий маориф ва матбуот ҳомийси.',
        en: 'Leader of Tashkent Jadidism, author of the textbook <Adibi Avval>, and patron of national enlightenment and press.'
    },
    "Faylasuf, yozuvchi, sharqshunos olim. O'zbek tili va adabiyotini ilmiy tizimga solgan zabardast siymo.": {
        oz: 'Файласуф, ёзувчи, шарқшунос олим. Ўзбек тили ва адабиётини илмий тизимга солган забардаст сиймо.',
        en: 'Philosopher, writer, and orientalist scholar who scientifically systematized Uzbek language and literature.'
    },
    "Yangi o'zbek she'riyatining asoschisi, dramaturg va tarjimon. Erkinlik va milliy uyg'onish g'oyalarini kuylagan.": {
        oz: 'Янги ўзбек шеъриятининг асосчиси, драматург ва таржимон. Эркинлик ва миллий уйғониш ғояларини куйлаган.',
        en: 'Founder of modern Uzbek poetry, playwright, and translator who championed ideals of freedom and national awakening.'
    },
    "<Tarbiya biz uchun yo hayot - yo mamot, yo najot - yo halokat> shiorini o'rtaga tashlagan buyuk ma'rifatparvar.": {
        oz: '«Тарбия биз учун ё ҳаёт - ё мамот, ё нажот - ё ҳалокат» шиорини ўртага ташлаган буюк маърифатпарвар.',
        en: 'Great enlightener who proclaimed: "For us, education is life or death, salvation or destruction".'
    },
    "O'zbek matbaachiligining fidoyisi, ko'p tilli lug'atlar tuzuvchisi va ilm-fan targ'ibotchisi.": {
        oz: 'Ўзбек матбаачилигининг фидойиси, кўп тилли луғатлар тузувчиси ва илм-фан тарғиботчиси.',
        en: 'Pioneer of Uzbek printing, compiler of multilingual dictionaries, and prominent science advocate.'
    },
    "Shoir, dramaturg, xalq maorifi jonkuyari va teatr san'ati asoschilaridan biri.": {
        oz: 'Шоир, драматург, халқ маорифи жонкуяри ва театр санъати асосчиларидан бири.',
        en: 'Poet, playwright, education reformer, and one of the founding fathers of Uzbek theater.'
    },
    "Buxoro jadid maktablari uchun <Tahzibus-sibyon> kitobini yozgan atoqli adib va olim.": {
        oz: 'Бухоро жадид мактаблари учун «Таҳзибус-сибён» китобини ёзган атоқли адиб ва олим.',
        en: 'Renowned author and scholar who wrote <Tahzib us-Sibyan> for Bukhara new-method schools.'
    },
    "Farg'ona vodiysi jadid matbuotining bosh muharriri, pedagog va tilshunos.": {
        oz: 'Фарғона водийси жадид матбуотининг бош муҳаррири, педагог ва тилшунос.',
        en: 'Chief editor of the Fergana Valley Jadid press, educator, and distinguished linguist.'
    },
    "Turkiston milliy matbuotining yorqin publitsisti, hajvchi va jamoat arbobi.": {
        oz: 'Туркистон миллий матбуотининг ёрқин публицисти, ҳажвчи ва жамоат арбоби.',
        en: 'Prominent publicist of Turkestan national press, satirist, and influential civic figure.'
    },
    "O'zbek jadidchilik harakati va Milliy uyg'onish davri adabiyotini ilmiy asoslab bergan zabardast olim.": {
        oz: 'Ўзбек жадидчилик ҳаракати ва Миллий уйғониш даври адабиётини илмий асослаб берган забардаст олим.',
        en: 'Distinguished scholar who scientifically established the study of the Jadid movement and National Renaissance literature.'
    }
};

// Pre-sorted dictionary entries by key length descending for reliable substring matching in English
const DICT_SORTED_ENTRIES = Object.entries(JADID_DICTIONARY).sort((a, b) => b[0].length - a[0].length);

function latinToCyrillicUz(text) {
    if (!text || typeof text !== 'string') return text;
    let s = text
        .replace(/(^|[\s\(\[\"\'«])ye/gi, (m, p) => p + (m.slice(-2) === 'YE' ? '\u0415' : (m.slice(-2) === 'Ye' ? '\u0415' : '\u0435')))
        .replace(/(^|[\s\(\[\"\'«])e/gi, (m, p) => p + (m.slice(-1) === 'E' ? '\u042D' : '\u044D'))
        .replace(/Sh/g, '\u0428').replace(/SH/g, '\u0428').replace(/sh/g, '\u0448')
        .replace(/Ch/g, '\u0427').replace(/CH/g, '\u0427').replace(/ch/g, '\u0447')
        .replace(/O['\u02BB\u2019\u2018`]/g, '\u040E').replace(/o['\u02BB\u2019\u2018`]/g, '\u045E')
        .replace(/G['\u02BB\u2019\u2018`]/g, '\u0492').replace(/g['\u02BB\u2019\u2018`]/g, '\u0493')
        .replace(/Yu/g, '\u042E').replace(/YU/g, '\u042E').replace(/yu/g, '\u044E')
        .replace(/Ya/g, '\u042F').replace(/YA/g, '\u042F').replace(/ya/g, '\u044F')
        .replace(/Yo/g, '\u0401').replace(/YO/g, '\u0401').replace(/yo/g, '\u0451');

    const chars = {
        'A': '\u0410', 'a': '\u0430', 'B': '\u0411', 'b': '\u0431', 'D': '\u0414', 'd': '\u0434',
        'E': '\u0415', 'e': '\u0435', 'F': '\u0424', 'f': '\u0444', 'G': '\u0413', 'g': '\u0433',
        'H': '\u04B2', 'h': '\u04B3', 'I': '\u0418', 'i': '\u0438', 'J': '\u0416', 'j': '\u0436',
        'K': '\u041A', 'k': '\u043A', 'L': '\u041B', 'l': '\u043B', 'M': '\u041C', 'm': '\u043C',
        'N': '\u041D', 'n': '\u043D', 'O': '\u041E', 'o': '\u043E', 'P': '\u041F', 'p': '\u043F',
        'Q': '\u049A', 'q': '\u049B', 'R': '\u0420', 'r': '\u0440', 'S': '\u0421', 's': '\u0441',
        'T': '\u0422', 't': '\u0442', 'U': '\u0423', 'u': '\u0443', 'V': '\u0412', 'v': '\u0432',
        'X': '\u0425', 'x': '\u0445', 'Y': '\u0419', 'y': '\u0439', 'Z': '\u0417', 'z': '\u0437',
        "'": '\u044A', "\u2019": '\u044A', "\u02BB": '\u044A', "\u2018": '\u044A'
    };

    return s.split('').map(c => chars[c] || c).join('');
}

function translateString(text, langCode) {
    if (!text || typeof text !== 'string') return text;
    if (langCode === 'uz') return text;

    const trimmed = text.trim();
    if (trimmed.length === 0) return text;

    // 1. Direct dictionary match
    if (JADID_DICTIONARY[trimmed]) {
        const trans = JADID_DICTIONARY[trimmed][langCode];
        if (trans) {
            return text.replace(trimmed, trans);
        }
    }

    // 2. Cyrillic (automatic complete phonetic transliteration)
    if (langCode === 'oz') {
        return latinToCyrillicUz(text);
    }

    // 3. English (phrase & vocabulary replacement)
    if (langCode === 'en') {
        let result = text;
        for (const [key, val] of DICT_SORTED_ENTRIES) {
            if (val.en && result.includes(key)) {
                result = result.split(key).join(val.en);
            }
        }
        return result;
    }

    return text;
}

let isTranslating = false;

function translateDOM(root, langCode) {
    if (!root || isTranslating) return;
    isTranslating = true;

    try {
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const tag = node.tagName.toUpperCase();
                        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'SVG' || tag === 'CODE' || tag === 'PRE') {
                            return NodeFilter.FILTER_REJECT;
                        }
                        if (node.classList && (node.classList.contains('lang-dropdown-menu') || node.classList.contains('lang-btn'))) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    if (node.nodeType === Node.TEXT_NODE) {
                        if (node.parentNode && node.parentNode.classList && 
                           (node.parentNode.classList.contains('lang-btn') || node.parentNode.classList.contains('lang-dropdown-menu'))) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        if (node.textContent.trim().length > 0) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        const nodesToProcess = [];
        let currentNode = walker.nextNode();
        while (currentNode) {
            nodesToProcess.push(currentNode);
            currentNode = walker.nextNode();
        }

        nodesToProcess.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                ['placeholder', 'title', 'alt'].forEach(attr => {
                    if (node.hasAttribute(attr)) {
                        const origKey = '_orig_' + attr;
                        if (!node[origKey]) node[origKey] = node.getAttribute(attr);
                        node.setAttribute(attr, translateString(node[origKey], langCode));
                    }
                });
            } else if (node.nodeType === Node.TEXT_NODE) {
                if (node._origText === undefined) {
                    node._origText = node.textContent;
                }
                node.textContent = translateString(node._origText, langCode);
            }
        });

        // Translate document title
        if (document._origTitle === undefined) {
            document._origTitle = document.title;
        }
        document.title = translateString(document._origTitle, langCode);

    } finally {
        isTranslating = false;
    }
}

function applyLanguageToPage(langCode) {
    const labels = {
        'uz': "O'zbekcha",
        'oz': '\u040E\u0437\u0431\u0435\u043A\u0447\u0430',
        'en': 'English'
    };
    const currentLabel = labels[langCode] || "O'zbekcha";
    const btnText = document.getElementById('currentLangText');
    if (btnText) btnText.textContent = currentLabel;

    const menu = document.getElementById('langDropdownMenu');
    if (menu) {
        menu.querySelectorAll('button').forEach(btn => {
            const onclickAttr = btn.getAttribute('onclick') || '';
            if (onclickAttr.includes(`'${langCode}'`)) {
                btn.classList.add('active-lang');
            } else {
                btn.classList.remove('active-lang');
            }
        });
    }

    // Translate the entire page body DOM
    if (document.body) {
        translateDOM(document.body, langCode);
    }

    document.documentElement.lang = langCode === 'oz' ? 'uz-Cyrl' : langCode;
}

window.toggleLangMenu = function() {
    const menu = document.getElementById('langDropdownMenu');
    const box = document.querySelector('.lang-select-box');
    if (menu) {
        menu.classList.toggle('show');
        if (box) box.classList.toggle('open');
    }
};

window.selectLang = function(langCode, label) {
    applyLanguageToPage(langCode);
    try {
        localStorage.setItem('jadid_selected_lang', langCode);
    } catch(e) {}
    const menu = document.getElementById('langDropdownMenu');
    const box = document.querySelector('.lang-select-box');
    if (menu) menu.classList.remove('show');
    if (box) box.classList.remove('open');
};

// Global helper to translate dynamic modals on open
window.translateDynamicContent = function(element) {
    const currentLang = localStorage.getItem('jadid_selected_lang') || 'uz';
    if (currentLang !== 'uz' && element) {
        translateDOM(element, currentLang);
    }
};

window.toggleMobileMenu = function() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.toggle('mobile-open');
};

window.openSearchModal = function() {
    initGlobalSearch();
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.classList.add('active');
        const input = document.getElementById('modalSearchInput');
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }
};

document.addEventListener('click', (e) => {
    const langBox = document.querySelector('.lang-select-box');
    const langMenu = document.getElementById('langDropdownMenu');
    if (langBox && !langBox.contains(e.target) && langMenu) {
        langMenu.classList.remove('show');
    }
});

function initPageSearch() {
    const inputs = document.querySelectorAll('.filter-search-input, #docSearchInput, #bookSearchInput, #pressSearchInput, #langBookSearch, #pressResearchSearch');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.doc-card-modern, .person-card-modern, .filterable-item, .card-maqola-item');
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (query === '' || text.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Mock database for global live search
const siteDatabase = [
    { title: "Mahmudxo'ja Behbudiy", category: "Jadidlar", desc: "Jadidchilik harakati yetakchisi, 'Padarkush' dramasi muallifi.", link: "../Jadidlar/Jadidlar.html" },
    { title: "Abdulla Qodiriy", category: "Jadidlar", desc: "O'zbek romanchiligining asoschisi, 'O'tkan kunlar' va 'Mehrobdan chayon'.", link: "../Jadidlar/Jadidlar.html" },
    { title: "Munavvarqori Abdurashidxonov", category: "Jadidlar", desc: "Usuli jadid maktablari asoschisi, matbuot homiysi va jamoat arbobi.", link: "../Jadidlar/Jadidlar.html" },
    { title: "Abdurauf Fitrat", category: "Jadidlar", desc: "Yozuvchi, faylasuf, tilshunos va ma'rifatparvar olim.", link: "../Jadidlar/Jadidlar.html" },
    { title: "Abdulhamid Cho'lpon", category: "Jadidlar", desc: "Shoir, dramaturg, 'Kecha va kunduz' romani muallifi.", link: "../Jadidlar/Jadidlar.html" },
    { title: "Padarkush dramasi", category: "Izlanishlar / Asarlar", desc: "1911-yilda yozilgan Turkistondagi birinchi milliy drama.", link: "../Izlanishlar/Asarlar/index.html" },
    { title: "O'tkan kunlar romani", category: "Izlanishlar / Asarlar", desc: "Tarixiy roman, millat taqdiri va ma'rifat g'oyalari.", link: "../Izlanishlar/Asarlar/index.html" },
    { title: "Turkiston Muxtoriyati e'loni", category: "Turkiston muxtoriyati", desc: "1917-yil Qo'qon shahrida e'lon qilingan ilk demokratik davlat.", link: "../Turkiston-muxtoriyati/Asarlar/index.html" },
    { title: "Oyina jurnali (1913-1915)", category: "Manbalar / Matbuot", desc: "Samarqandda Behbudiy muharrirligida chiqqan ilmiy-adabiy jurnal.", link: "../Manbalar/Matbuot/index.html" },
    { title: "Tarjimon gazetasi", category: "Manbalar / Matbuot", desc: "Ismoil Gasprinskiy asos solgan umumturkiy gazeta.", link: "../Manbalar/Matbuot/index.html" },
    { title: "Ona tili va imlo islohoti", category: "Til va imlo", desc: "Jadidlarning imlo va yozuv islohoti bo'yicha maqolalari.", link: "../Til-va-imlo/Maqolalar/index.html" }
];

function initGlobalSearch() {
    let searchModal = document.getElementById('searchModal');
    if (!searchModal) {
        searchModal = document.createElement('div');
        searchModal.id = 'searchModal';
        searchModal.className = 'modal-overlay';
        searchModal.innerHTML = `
            <div class="modal-dialog">
                <button class="modal-close-btn" id="closeSearchModal">&times;</button>
                <h3 style="font-family: Georgia, serif; font-size: 22px; margin-bottom: 16px; color: #081736;">Sayt bo'yicha qidiruv</h3>
                <div style="position: relative; margin-bottom: 20px;">
                    <input type="text" id="modalSearchInput" placeholder="Jadid ismi, asar nomi yoki maqola..." 
                        style="width: 100%; padding: 12px 16px; font-size: 15px; border: 2px solid #1852bd; border-radius: 8px; outline: none;">
                </div>
                <div id="modalSearchResults" style="max-height: 350px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;">
                    <p style="color: #64748b; font-size: 13.5px;">Qidirish uchun kamida 2 ta harf kiriting...</p>
                </div>
            </div>
        `;
        document.body.appendChild(searchModal);
    }

    const searchBtns = document.querySelectorAll('.search-toggle-btn, .search-btn');
    searchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            searchModal.classList.add('active');
            const input = document.getElementById('modalSearchInput');
            if (input) {
                setTimeout(() => input.focus(), 100);
            }
        });
    });

    const closeBtn = document.getElementById('closeSearchModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => searchModal.classList.remove('active'));
    }

    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) searchModal.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') searchModal.classList.remove('active');
    });

    const modalInput = document.getElementById('modalSearchInput');
    const resultsContainer = document.getElementById('modalSearchResults');

    if (modalInput && resultsContainer) {
        modalInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                resultsContainer.innerHTML = `<p style="color: #64748b; font-size: 13.5px;">Qidirish uchun kamida 2 ta harf kiriting...</p>`;
                return;
            }

            const matches = siteDatabase.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.desc.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );

            if (matches.length === 0) {
                resultsContainer.innerHTML = `<p style="color: #ef4444; font-size: 14px; padding: 10px 0;">Hech narsa topilmadi.</p>`;
                return;
            }

            resultsContainer.innerHTML = matches.map(item => `
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; transition: background 0.2s;">
                    <div style="font-size: 11.5px; color: #d97706; font-weight: 700; text-transform: uppercase;">${item.category}</div>
                    <div style="font-size: 16px; font-weight: 700; color: #081736; margin: 4px 0;"><a href="${item.link}" style="text-decoration: none; color: inherit;">${item.title}</a></div>
                    <div style="font-size: 13px; color: #475569;">${item.desc}</div>
                </div>
            `).join('');
        });
    }
}

function initTabs() {
    const tabButtons = document.querySelectorAll('.filter-tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter') || 'all';
            const cards = document.querySelectorAll('.filterable-item');

            cards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initModalHandlers() {
    window.openDetailModal = function(title, content) {
        let detailModal = document.getElementById('detailModal');
        if (!detailModal) {
            detailModal = document.createElement('div');
            detailModal.id = 'detailModal';
            detailModal.className = 'modal-overlay';
            detailModal.innerHTML = `
                <div class="modal-dialog">
                    <button class="modal-close-btn" onclick="document.getElementById('detailModal').classList.remove('active')">&times;</button>
                    <h2 id="modalDetailTitle" style="font-family: Georgia, serif; font-size: 24px; color: #081736; margin-bottom: 15px;"></h2>
                    <div id="modalDetailBody" style="font-size: 14.5px; line-height: 1.7; color: #334155;"></div>
                </div>
            `;
            document.body.appendChild(detailModal);
            detailModal.addEventListener('click', (e) => {
                if (e.target === detailModal) detailModal.classList.remove('active');
            });
        }
        document.getElementById('modalDetailTitle').textContent = title;
        document.getElementById('modalDetailBody').innerHTML = content;
        detailModal.classList.add('active');
    };
}

function initPagination() {
    const wrappers = document.querySelectorAll('.pagination-wrapper');
    if (!wrappers.length) return;

    wrappers.forEach(wrapper => {
        const container = wrapper.closest('main') || document.body;
        const grid = container.querySelector('.items-grid, .cardMaqolalar, #jadidGrid');
        if (!grid) return;

        // Collect all items in the grid (excluding any accidental non-card elements)
        let allItems = Array.from(grid.children).filter(el => !el.classList.contains('pagination-wrapper') && !el.classList.contains('modal-overlay'));
        if (allItems.length === 0) return;

        const totalPages = 3;
        let perPage = Math.max(1, Math.ceil(allItems.length / totalPages));
        let currentPage = 1;

        function renderPage(page, shouldScroll = false) {
            currentPage = page;
            const start = (page - 1) * perPage;
            const end = start + perPage;

            allItems.forEach((item, index) => {
                if (index >= start && index < end) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });

            // Update active state on pagination buttons
            const btns = wrapper.querySelectorAll('.page-num');
            btns.forEach(b => {
                const p = (b.getAttribute('data-page') || b.textContent).trim();
                if (p === String(page)) {
                    b.classList.add('active');
                } else if (p !== '›' && p !== 'next') {
                    b.classList.remove('active');
                }
            });

            // Smooth scroll up to top of grid only on user click
            if (shouldScroll) {
                const gridRect = grid.getBoundingClientRect();
                if (gridRect.top < 0 || gridRect.top > 350) {
                    window.scrollTo({
                        top: window.scrollY + gridRect.top - 120,
                        behavior: 'smooth'
                    });
                }
            }
        }

        // Attach event listeners to all pagination buttons
        wrapper.querySelectorAll('.page-num').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const p = (btn.getAttribute('data-page') || btn.textContent).trim();
                if (p === '›' || p === 'next') {
                    let next = currentPage + 1;
                    if (next > totalPages) next = 1;
                    renderPage(next, true);
                } else {
                    const target = parseInt(p, 10);
                    if (!isNaN(target)) {
                        renderPage(target, true);
                    }
                }
            });
        });

        // Listen to tab filter clicks to reset or update pagination
        const tabBtns = container.querySelectorAll('.filter-tab-btn');
        tabBtns.forEach(tBtn => {
            tBtn.addEventListener('click', () => {
                setTimeout(() => {
                    const filter = tBtn.getAttribute('data-filter') || 'all';
                    if (filter === 'all') {
                        wrapper.style.display = 'flex';
                        renderPage(1, false);
                    } else {
                        wrapper.style.display = 'none';
                    }
                }, 50);
            });
        });

        // Listen to search inputs to manage pagination visibility
        const searchInput = container.querySelector('.filter-search-input, #jadidSearchInput, #docSearchInput, #bookSearchInput, #pressSearchInput, #langBookSearch, #pressResearchSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 0) {
                    wrapper.style.display = 'none';
                } else {
                    wrapper.style.display = 'flex';
                    renderPage(1, false);
                }
            });
        }

        // Initialize first page without scrolling
        renderPage(1, false);
    });
}
