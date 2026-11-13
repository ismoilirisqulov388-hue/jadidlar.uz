// JADIDLAR.UZ — RASMIY ASIL INTERAKTIV JAVASCRIPT
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. HERO BANNER SLIDER
       ========================================================================== */
    const heroSlides = [
        {
            name: "Mahmudxo'ja Behbudiy",
            badge: "Jadidchilik yetakchisi • (1875 — 1919)",
            quote: "«Dunyoda turmoq uchun dunyoviy fan va ilm lozimdir, zamona ilmidan bebahra millat boshqalarga poymol bo'lur.»",
            bio: "Turkiston jadidchilik harakatining tan olingan yetakchisi, yirik ma'rifatparvar, birinchi o'zbek dramaturgi («Padarkush»), publitsist va noshir. «Samarqand» gazetasi hamda mashhur «Oyina» jurnali asoschisi.",
            portrait: "portraits/behbudiy.jpg",
            bg: "portraits/behbudiy.jpg"
        },
        {
            name: "Abdurauf Fitrat",
            badge: "Faylasuf va alloma • (1886 — 1938)",
            quote: "«Har bir bola go'dakligidan onasining tarbiyasiga mahkum, binobarin, biz dastlabki tarbiyani o'z onamizdan olamiz, bu onalar bashariyatning tarbiyachilaridir.»",
            bio: "Sharqshunos olim, adib, faylasuf va davlat arbobi. O'zbek tili va adabiyoti ilmiy asoschilaridan biri. «Munozara», «Hind sayyohi», «Rahbari najot», «O'zbek klassik musiqasi tarixi» kabi bebaho asarlar muallifi.",
            portrait: "portraits/fitrat.jpg",
            bg: "portraits/fitrat.jpg"
        },
        {
            name: "Abdulla Avloniy",
            badge: "Millat muallimi • (1878 — 1934)",
            quote: "«Tarbiya biz uchun yo hayot — yo mamot, yo najot — yo halokat, yo saodat — yo falokat masalasidir.»",
            bio: "Atoqli pedagog, shoir, dramaturg va jamoat arbobi. Yangi usuldagi maktablar tashkilotchisi, «Turkiy Guliston yoxud axloq», «Birinchi muallim», «Ikkinchi muallim» kabi darsliklar yaratuvchisi.",
            portrait: "portraits/avloniy.jpg",
            bg: "portraits/avloniy.jpg"
        },
        {
            name: "Abdulhamid Cho'lpon",
            badge: "Istiqlol kuychisi • (1897 — 1938)",
            quote: "«Kishan kiyma, bo'yin egma, ki sen ham hur tug'ilg'onsen!»",
            bio: "O'zbek yangi she'riyatining asoschisi, betakror shoir, nosir va dramaturg. «Kecha va kunduz» romani, «Uyg'onish», «Buloqlar» to'plamlari, Shekspirning «Hamlet» tragediyasining tengsiz tarjimoni.",
            portrait: "portraits/cholpon.jpg",
            bg: "portraits/cholpon.jpg"
        },
        {
            name: "Munavvarqori Abdurashidxonov",
            badge: "Toshkent jadidlari sarboni • (1878 — 1931)",
            quote: "«Millatning taraqqiy etishi uchun zamonaviy ilm, to'g'ri axloq va birlik suv va havodek zarurdir.»",
            bio: "Toshkentdagi ilk usuli jadid maktabi asoschisi, «Xurshid», «Najot» gazetalari bosh muharriri, «Turon» madaniy-ma'rifiy jamiyati tashkilotchisi va yetakchisi.",
            portrait: "portraits/munavvarqori.jpg",
            bg: "portraits/munavvarqori.jpg"
        },
        {
            name: "Begali Qosimov",
            badge: "Jadidshunos olim • (1942 — 2002)",
            quote: "«... yolg'iz din ushlansa, dunyo qo'ldan ketadi. Faqat o'zlik, millat desak, yana dunyodan ajrab qolamiz. Ovrupolashsak, o'zlik yo'qoladi. Bu ham fojia.»",
            bio: "O'zbekiston Respublikasi fan arbobi, filologiya fanlari doktori, professor. O'zbekistonda jadidshunoslik ilmiy maktabining asoschisi, jadidlar merosini xalqqa qaytargan fidoiy alloma.",
            portrait: "portraits/qosimov.jpg",
            bg: "portraits/qosimov.jpg"
        }
    ];

    let currentHeroIndex = 0;
    let heroInterval = null;

    const heroTitle = document.getElementById('heroSlideName');
    const heroBadge = document.getElementById('heroSlideBadge');
    const heroQuote = document.getElementById('heroSlideQuote');
    const heroImg = document.getElementById('heroSlideImg');
    const heroBg = document.getElementById('heroBgImg');
    const heroPrevBtn = document.getElementById('heroPrevBtn');
    const heroNextBtn = document.getElementById('heroNextBtn');
    const heroDotsContainer = document.getElementById('heroDots');

    function getImagePath(rel) {
        // works both from root index.html or src/pages/jadidlar-bosh oyna/index.html
        const isSubpage = window.location.pathname.includes('/src/pages/');
        const prefix = isSubpage ? '../../../public/image/' : 'public/image/';
        return prefix + rel;
    }

    function initHeroDots() {
        if (!heroDotsContainer) return;
        heroDotsContainer.innerHTML = '';
        heroSlides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = `slider_dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                goToHeroSlide(i);
                resetHeroAutoplay();
            });
            heroDotsContainer.appendChild(dot);
        });
    }

    function renderHeroSlide(index) {
        const slide = heroSlides[index];
        if (!slide) return;

        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(10px)';
        }
        if (heroQuote) heroQuote.style.opacity = '0';
        if (heroImg) heroImg.style.opacity = '0';

        setTimeout(() => {
            if (heroTitle) {
                heroTitle.textContent = slide.name;
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }
            if (heroBadge) heroBadge.textContent = slide.badge;
            if (heroQuote) {
                heroQuote.textContent = slide.quote;
                heroQuote.style.opacity = '1';
            }
            if (heroImg) {
                heroImg.src = getImagePath(slide.portrait);
                heroImg.alt = slide.name;
                heroImg.style.opacity = '1';
            }
            if (heroBg) {
                heroBg.src = getImagePath(slide.bg);
            }

            // update dots
            if (heroDotsContainer) {
                const dots = heroDotsContainer.querySelectorAll('.slider_dot');
                dots.forEach((d, i) => {
                    d.classList.toggle('active', i === index);
                });
            }
        }, 180);
    }

    function goToHeroSlide(index) {
        currentHeroIndex = (index + heroSlides.length) % heroSlides.length;
        renderHeroSlide(currentHeroIndex);
    }

    function resetHeroAutoplay() {
        if (heroInterval) clearInterval(heroInterval);
        heroInterval = setInterval(() => {
            goToHeroSlide(currentHeroIndex + 1);
        }, 6500);
    }

    if (heroPrevBtn && heroNextBtn) {
        heroPrevBtn.addEventListener('click', () => {
            goToHeroSlide(currentHeroIndex - 1);
            resetHeroAutoplay();
        });
        heroNextBtn.addEventListener('click', () => {
            goToHeroSlide(currentHeroIndex + 1);
            resetHeroAutoplay();
        });
    }

    initHeroDots();
    renderHeroSlide(0);
    resetHeroAutoplay();

    /* ==========================================================================
       2. JADID SCHOLARS DATA & MODAL VIEWER
       ========================================================================== */
    const scholarsData = {
        behbudiy: {
            name: "Mahmudxo'ja Behbudiy",
            years: "1875 — 1919 (Samarqand)",
            badge: "Turkiston jadidchilik harakatining otasi",
            image: "portraits/behbudiy.jpg",
            desc: "Mahmudxo'ja Behbudiy Samarqand yaqinidagi Baxshitepa qishlog'ida ma'rifatli oilada tavallud topgan. Yoshligidan arab, fors va rus tillarini mukammal egallab, zamonasining eng ilg'or allomalaridan biriga aylandi.",
            achievements: [
                "1903-yildan Samarqandda yangi usul maktablari ochib, o'quv dasturlari va darsliklar yaratgan («Risolai asbobi savod», «Kitobat ul-atfol»).",
                "1911-yilda o'zbek milliy dramaturgiyasining tamal toshi hisoblangan «Padarkush yoxud o'qimagan bolaning holi» dramasini yozgan.",
                "1913-yilda «Samarqand» gazetasi hamda betakror «Oyina» ma'rifiy-ijtimoiy jurnalini nashr ettirgan.",
                "1919-yilda Qarshi shahrida Buxoro amiri beklari tomonidan vaxshiylarcha qatl etilgan."
            ]
        },
        qodiriy: {
            name: "Abdulla Qodiriy (Julqunboy)",
            years: "1894 — 1938 (Toshkent)",
            badge: "O'zbek milliy romanchiligining asoschisi",
            image: "portraits/behbudiy.jpg", // fallback if qodiriy portrait is not separate, or public/image
            desc: "Abdulla Qodiriy Toshkentda tug'ilgan. O'zbek adabiyoti tarixidagi eng mashhur romannavis, satirik va tarjimon. Uning asarlari millat o'zligini anglashda buyuk ma'naviy mayoqdir.",
            achievements: [
                "1922-yilda o'zbek adabiyotidagi birinchi tarixiy roman — «O'tkan kunlar»ni e'lon qildi.",
                "1928-yilda ikkinchi yirik asari — «Mehrobdan chayon» romanini yaratdi.",
                "«Mushtum» jurnali asoschilaridan biri sifatida millat qusurlari va illatlarini fosh etuvchi mashhur hajviyalar yozdi.",
                "1938-yil 4-oktyabrda sovet mustabid tuzumi qatag'oni qurboni bo'ldi."
            ]
        },
        fitrat: {
            name: "Abdurauf Fitrat",
            years: "1886 — 1938 (Buxoro)",
            badge: "Alloma, faylasuf, davlat arbobi",
            image: "portraits/fitrat.jpg",
            desc: "Abdurauf Fitrat Buxoroda tug'ilgan. Istanbul dorilfununida tahsil olgan. Buxoro yoshlar tashkiloti rahbari, keyinchalik Buxoro Xalq Sovet Respublikasida nozir va professor.",
            achievements: [
                "«Munozara», «Sayha», «Hind sayyohi bayonoti» asarlari bilan butun Turkiston va Sharq uyg'onishiga turtki berdi.",
                "O'zbek tili grammatikasi, til qoidalari, adabiyot nazariyasi va o'zbek klassik musiqasi asoslarini fanga kiritdi.",
                "Samarqand va Toshkentdagi oliy ta'lim muassasalarida professor sifatida yuzlab shogirdlar yetishtirdi.",
                "1938-yil 4-oktyabrda qatl etilgan."
            ]
        },
        cholpon: {
            name: "Abdulhamid Sulaymon o'g'li Cho'lpon",
            years: "1897 — 1938 (Andijon)",
            badge: "Yangi o'zbek she'riyati asoschisi",
            image: "portraits/cholpon.jpg",
            desc: "Abdulhamid Cho'lpon Andijonda tavallud topgan. O'zbek lirikasining eng buyuk namoyandasi, istiqlol va ozodlik uchun kurashgan vatanparvar shoir va yozuvchi.",
            achievements: [
                "«Uyg'onish», «Buloqlar», «Tong sirlari» she'riy to'plamlari bilan milliy she'riyatni yangi cho'qqiga ko'tardi.",
                "«Kecha va kunduz» romani orqali mustamlaka zulmi ostidagi xalq fojiasini teran ochib berdi.",
                "Shekspirning «Hamlet», Pushkinning «Boris Godunov» asarlarini o'zbek tiliga yuksak mahorat bilan o'girdi.",
                "1938-yilda otib o'ldirildi."
            ]
        },
        munavvarqori: {
            name: "Munavvarqori Abdurashidxonov",
            years: "1878 — 1931 (Toshkent)",
            badge: "Pedagog, noshir va jamoat arbobi",
            image: "portraits/munavvarqori.jpg",
            desc: "Munavvarqori Toshkent jadidchiligining tan olingan yetakchisi, butun umrini yosh avlodni zamonaviy ilm-fan va ma'rifat bilan qurollantirishga bag'ishlagan mutafakkir.",
            achievements: [
                "1901-yilda o'z uyida yangi usul maktabini ochgan.",
                "«Adibi avval», «Adibi soniy», «Usuli hisob», «Yer yuzi» kabi ko'plab darsliklar yozgan.",
                "«Xurshid», «Najot», «Kengash» gazetalari noshiri va muharriri.",
                "«Turon» jamiyatini tuzib, milliy teatr va xayriya ishlarini rivojlantirdi."
            ]
        },
        avloniy: {
            name: "Abdulla Avloniy",
            years: "1878 — 1934 (Toshkent)",
            badge: "Millat muallimi va ma'rifatparvar adib",
            image: "portraits/avloniy.jpg",
            desc: "Abdulla Avloniy Toshkentning Mergancha mahallasida tug'ilgan. Maktabdor, darsliklar muallifi, teatr tashkilotchisi va davlat arbobi.",
            achievements: [
                "«Turkiy Guliston yoxud axloq» kitobi bilan milliy pedagogika va axloqshunoslik poydevorini qo'ydi.",
                "«Shuhrat», «Osiyo» gazetalari hamda «Maktab» jurnalini tashkil qildi.",
                "1913-yilda «Turon» teatr truppasini tuzib, sahna san'atini xalq ma'rifati vositasiga aylantirdi."
            ]
        },
        hamza: {
            name: "Hamza Hakimzoda Niyoziy",
            years: "1889 — 1929 (Qo'qon)",
            badge: "Shoir, dramaturg va bastakor",
            image: "portraits/hamza.jpg",
            desc: "Qo'qonda tug'ilgan. Yangi usuldagi maktablar tashkilotchisi, «Yengil adabiyot», «Qiroat kitobi» darsliklari va o'nlab dramatik asarlar yaratuvchisi.",
            achievements: [
                "«Maysaraning ishi», «Boy ila xizmatchi», «Zaharli hayot» kabi mashhur pyesalar muallifi.",
                "Milliy musiqiy merosni to'plash va ommalashtirishda faol qatnashgan."
            ]
        },
        ayniy: {
            name: "Sadriddin Ayniy",
            years: "1878 — 1954 (Buxoro)",
            badge: "Buxoro jadidi, atoqli adib va olim",
            image: "portraits/ayniy.jpg",
            desc: "Buxoro amirligida jadidchilik harakatining faol ishtirokchisi. «Yosh buxoroliklar» tashkiloti a'zosi, darsliklar va tarixiy romanlar muallifi.",
            achievements: [
                "«Buxoro jallodlari», «Doxunda», «Qullar» romanlari hamda «Esdaliklar» asari muallifi.",
                "O'zbek va tojik adabiyotshunosligi rivojiga beqiyos hissa qo'shgan."
            ]
        },
        ibrat: {
            name: "Is'hoqxon To'ra Ibrat",
            years: "1862 — 1937 (To'raqo'rg'on)",
            badge: "Poliglot alloma, sayyoh va noshir",
            image: "portraits/ibrat.jpg",
            desc: "Namangan viloyati To'raqo'rg'on qishlog'ida tug'ilgan. Arab, fors, rus, ingliz, turk, urdu tillarini bilgan buyuk tilshunos va ma'rifatparvar.",
            achievements: [
                "1908-yilda Orenburgdan litografik bosmaxona olib kelib, «Matbaai Is'hoqiya»ni ochgan.",
                "«Lug'ati sitta al-sina» (6 tilli lug'at), «Tarixi chopxona», «Jome' ul-xutut» asarlarini yozgan."
            ]
        },
        zohiriy: {
            name: "Ashurali Zohiriy",
            years: "1885 — 1938 (Qo'qon)",
            badge: "Tilshunos, adabiyotshunos va matbuot arbobi",
            image: "portraits/zohiriy.jpg",
            desc: "Farg'ona vodiysi jadidlarining yirik vakili. «Sadoi Farg'ona» gazetasi muharriri, o'zbek imlosi va tili bo'yicha muhim tadqiqotlar muallifi.",
            achievements: [
                "«Imlo va qoidai xat», «Turkiston adabiyoti» darsliklarini yaratgan.",
                "1917-yilda Turkiston Muxtoriyati hukumatida faol qatnashgan."
            ]
        },
        sofizoda: {
            name: "Muhammadsharif So'fizoda",
            years: "1880 — 1937 (Chust)",
            badge: "O'zbek xalq shoiri va ma'rifatparvar",
            image: "portraits/sofizoda.jpg",
            desc: "Chust shahrida tug'ilgan. Xalq dardi va ma'rifatni kuylagan, yangi maktablar ochgani uchun tazyiqlarga uchragan jasur shoir.",
            achievements: [
                "O'zbekistonda xizmat ko'rsatgan xalq shoiri unvoni bilan taqdirlangan ilk ijodkorlardan biri."
            ]
        },
        gozi: {
            name: "G'ozi Yunus",
            years: "1889 — 1942 (Toshkent)",
            badge: "Publitsist va siyosiy arbob",
            image: "portraits/gozi.jpg",
            desc: "Toshkent jadidlari safida matbuot va teatr sohalarida faol ishlagan, Turkiston istiqloli g'oyasiga sodiq bo'lgan qalamkash.",
            achievements: [
                "«Qizil bayroq», «Turkiston» gazetalarida o'tkir tahliliy maqolalar chop etgan."
            ]
        },
        xoji: {
            name: "Hoji Muin Shukrullo o'g'li",
            years: "1883 — 1942 (Samarqand)",
            badge: "Dramaturg va jurnalist",
            image: "portraits/xoji.jpg",
            desc: "Mahmudxo'ja Behbudiyning eng yaqin safdoshi va shogirdi. «Zarafshon», «Mehnatkashlar tovushi» gazetalari tashkilotchisi.",
            achievements: [
                "«Eski maktab — yangi maktab», «To'y», «Mazluma xotin» dramalari muallifi.",
                "Behbudiyning «Oyina» jurnalida muharrirlik vazifalarini bajargan."
            ]
        },
        vadud: {
            name: "Vadud Mahmud",
            years: "1898 — 1976 (Samarqand)",
            badge: "Adabiyotshunos va tanqidchi",
            image: "portraits/vadud.jpg",
            desc: "Samarqandda tug'ilgan. Fitrat va Cho'lpon ijodini chuqur tahlil qilgan ilk professional o'zbek adabiy tanqidchilaridan biri.",
            achievements: [
                "Jadid adabiyotining g'oyaviy-badiiy xususiyatlarini ilmiy asoslab bergan o'nlab maqolalar yozgan."
            ]
        }
    };

    window.openScholarModal = function(key) {
        const item = scholarsData[key];
        if (!item) return;

        const modal = document.getElementById('scholarModal');
        const modalBody = document.getElementById('scholarModalBody');
        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <div style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap; margin-bottom: 20px;">
                <img src="${getImagePath(item.image)}" alt="${item.name}" style="width: 140px; height: 180px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
                <div style="flex: 1; min-width: 240px;">
                    <span style="display: inline-block; background: #eef2ff; color: #0e2b65; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 8px;">${item.badge}</span>
                    <h2 style="font-size: 24px; color: #0e2b65; margin-bottom: 4px;">${item.name}</h2>
                    <p style="color: #6b1324; font-weight: 700; font-size: 14px; margin-bottom: 12px;">${item.years}</p>
                    <p style="font-size: 14px; line-height: 1.6; color: #334155;">${item.desc}</p>
                </div>
            </div>
            <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
                <h4 style="font-size: 16px; color: #0e2b65; margin-bottom: 10px;">Asosiy xizmatlari va merosi:</h4>
                <ul style="list-style: disc; padding-left: 20px; font-size: 14px; color: #475569; line-height: 1.7;">
                    ${item.achievements.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
        `;

        modal.classList.add('active');
    };

    window.closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    };

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    /* ==========================================================================
       3. NEWS DETAIL MODAL
       ========================================================================== */
    const newsData = [
        {
            title: "«Jadidlar avlodlari uchrashuvi» umummilliy ilmiy-ma'rifiy yig'ini bo'lib o'tdi",
            date: "26.10.2026",
            category: "Yangiliklar",
            img: "news/news-jadid-descendants.jpg",
            text: "O'zbekiston Fanlar akademiyasi Tarix institutida mamlakatimiz hamda xorijdan tashrif buyurgan jadid bobolarimiz avlodlari, taniqli tarixchi olimlar, tadqiqotchilar va yoshlar ishtirokida «Jadidlar avlodlari uchrashuvi» mavzusidagi nufuzli anjuman bo'lib o'tdi. Anjumanda yangi topilgan arxiv hujjatlari va shaxsiy xotiralar taqdim etildi."
        },
        {
            title: "Azamat Ziyo: «Jadidlar orzu qilgan taraqqiyot g'oyalari bugun...»",
            date: "24.10.2026",
            category: "Tadqiqot",
            img: "news/news-islam-civilization.jpg",
            text: "O'zFA Tarix instituti direktori, akademik Azamat Ziyo jadidchilik harakatining yangi O'zbekiston taraqqiyotidagi o'rni haqida tahliliy ma'ruza qildi. Olim jadid bobolarimizning maorif, matbuot va milliy taraqqiyotga doir ilg'or dasturlari bugungi islohotlar bilan to'la hamohang ekanini ta'kidladi."
        },
        {
            title: "Cho'lponning «Aldanish» va «Vijdon uyg'onishi» asarlari qayta nashr etildi",
            date: "20.10.2026",
            category: "Nashrlar",
            img: "news/news-cholpon-aldanish.jpg",
            text: "Abdulhamid Cho'lponning uzoq yillar arxivlarda saqlanib kelgan nodir maqolalari, publitsistik chiqishlari va dramatik parchalari jamlangan maxsus to'plam kitobxonlar qo'liga yetkazildi. Ushbu nashr jadid adabiyotining noma'lum sahifalarini ochib beradi."
        },
        {
            title: "Jadid avlodlari Islom sivilizatsiyasi markazida bo'ldi",
            date: "18.10.2026",
            category: "Tashrif",
            img: "news/news-cholpon-vijdon.jpg",
            text: "Toshkent shahrida qad ko'tarayotgan Islom sivilizatsiyasi markazida jadidlar bo'limi uchun ajratilgan ekspozitsiya zallari bilan tanishuv tashkil etildi. Markazda jadidlar merosini namoyish etuvchi zamonaviy multimediaviy zallar barpo etilmoqda."
        },
        {
            title: "Obidjon Mahmudov va Farg'ona ma'rifatparvarlari fotoxronikasi",
            date: "15.10.2026",
            category: "Fotoxronika",
            img: "news/news-obidjon-mahmud.jpg",
            text: "Farg'ona vodiysi jadidchilik harakatining faol namoyandasi, «Sadoi Farg'ona» gazetasi homiysi va tashkilotchisi Obidjon Mahmudovga oid yangi fotosuratlar hamda arxiv hujjatlari portal elektron bazasiga kiritildi."
        }
    ];

    window.openNewsModal = function(index) {
        const item = newsData[index];
        if (!item) return;

        const modal = document.getElementById('scholarModal');
        const modalBody = document.getElementById('scholarModalBody');
        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <img src="${getImagePath(item.img)}" alt="${item.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 12px; margin-bottom: 20px;">
            <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 12px;">
                <span style="background: #eef2ff; color: #0e2b65; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px;">${item.category}</span>
                <span style="color: #6b1324; font-weight: 700; font-size: 13px;">📅 ${item.date}</span>
            </div>
            <h2 style="font-size: 22px; color: #0e2b65; line-height: 1.4; margin-bottom: 16px;">${item.title}</h2>
            <p style="font-size: 15px; line-height: 1.7; color: #334155;">${item.text}</p>
        `;

        modal.classList.add('active');
    };

    /* ==========================================================================
       4. TAB SWITCHING LOGIC (Manbalar, Izlanishlar, Til va Imlo, Turkiston)
       ========================================================================== */
    window.switchTab = function(sectionId, tabName, btnElement) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        // buttons active state
        const buttons = section.querySelectorAll('.tab_navbar button');
        buttons.forEach(b => b.classList.remove('active'));
        if (btnElement) btnElement.classList.add('active');

        // content panes
        const panes = section.querySelectorAll('.tab-pane');
        panes.forEach(p => {
            if (p.getAttribute('data-tab') === tabName) {
                p.style.display = 'block';
            } else {
                p.style.display = 'none';
            }
        });
    };

    /* ==========================================================================
       5. SEARCH FUNCTIONALITY (MODAL SEARCH)
       ========================================================================== */
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('siteSearchInput');
    const searchResults = document.getElementById('searchResults');

    window.openSearchModal = function() {
        if (!searchModal) return;
        searchModal.classList.add('active');
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
            renderSearchResults('');
        }
    };

    function renderSearchResults(query) {
        if (!searchResults) return;
        const q = query.trim().toLowerCase();

        const allItems = Object.keys(scholarsData).map(k => ({
            type: 'Jadid namoyandasi',
            name: scholarsData[k].name,
            desc: scholarsData[k].badge,
            image: scholarsData[k].image,
            action: () => {
                closeModal('searchModal');
                openScholarModal(k);
            }
        }));

        const filtered = q === '' 
            ? allItems.slice(0, 5) 
            : allItems.filter(item => item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q));

        if (filtered.length === 0) {
            searchResults.innerHTML = '<p style="text-align:center; padding: 20px; color:#94a3b8;">Hech narsa topilmadi</p>';
            return;
        }

        searchResults.innerHTML = filtered.map((item, idx) => `
            <div class="search-result-item" data-idx="${idx}">
                <img src="${getImagePath(item.image)}" alt="${item.name}">
                <div>
                    <h4 style="font-size: 14.5px; color: #0e2b65; font-weight: 700;">${item.name}</h4>
                    <p style="font-size: 12px; color: #64748b;">${item.desc}</p>
                </div>
            </div>
        `).join('');

        // click handlers
        searchResults.querySelectorAll('.search-result-item').forEach((el, idx) => {
            el.addEventListener('click', () => {
                filtered[idx].action();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderSearchResults(e.target.value);
        });
    }

    /* ==========================================================================
       6. LANGUAGE SWITCHER & MOBILE HAMBURGER
       ========================================================================== */
    // Language switching handled universally by common.js

    window.toggleMobileMenu = function() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.toggle('mobile-open');
    };

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        const langBox = document.querySelector('.lang-select-box');
        const langMenu = document.getElementById('langDropdownMenu');
        if (langBox && !langBox.contains(e.target) && langMenu) {
            langMenu.classList.remove('show');
        }
    });

    /* ==========================================================================
       7. SCROLL TO TOP
       ========================================================================== */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       8. NOTIFICATION TOAST FOR DOWNLOAD/SHARE
       ========================================================================== */
    window.downloadItem = function(title) {
        alert(`«${title}» kitobining elektron nusxasi yuklab olinmoqda...`);
    };

    window.shareItem = function(title) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Jadidlar.uz portalida: ${title}`);
        window.open(`https://telegram.me/share/url?url=${url}&text=${text}`, '_blank');
    };
});
