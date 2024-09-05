let enabledDomains = [];
let enabledRedirects = [];

let patternsToRules = {
    '*://elementarium.cpn.rs/*': [1],
    '*://jadovno.com/*': [2],
    '*://kim.gov.rs/*': [3],
    '*://nbs.rs/*': [4],
    '*://*.sputniknews.com/*': [5],
    '*://*.sputnikportal.rs/*': [6],
    '*://*.rt.rs/*': [7],
    '*://*.rtrs.tv/*': [8],
    '*://pravda.rs/*': [9],
    '*://sr.wikipedia.org/*': [10],
    '*://www.arhiv-beograda.org/*': [11],
    '*://www.beograd.rs/*': [12],
    '*://www.bbc.com/serbian/*': [13],
    '*://www.glassrpske.com/*': [14],
    '*://www.intermagazin.rs/*': [15],
    '*://www.kragujevac.rs/*': [16, 17],
    // '*://www.novosti.rs/*': [19],
    '*://www.magazin.novosti.rs/*': [20, 21],
    '*://www.nspm.rs/*': [22],
    '*://www.politika.rs/*': [23],
    '*://posta.rs/*': [24, 25, 26],
    '*://www.rts.rs/*': [27],
    '*://rts.rs/*': [27],
    '*://www.rtv.rs/*': [28],
    // '*://www.rtvbn.com/*': [29],
    '*://www.standard.rs/*': [30],
    '*://standard.rs/*': [31],
    '*://www.uns.org.rs/*': [32, 33],
    '*://www.vs.rs/*': [34],
    '*://www.yugoimport.com/*': [35],
    '*://www.ff.uns.ac.rs/*': [36],
    '*://www.etf.bg.ac.rs/*': [37],
    '*://www.tf.uns.ac.rs/*': [38],
    '*://www.gspns.co.rs/*': [39],
};

function updateExtensionIcon(tab, isEnabled) {
    chrome.action.setIcon({
        path: isEnabled ? {
            "16": "icons/icon-on-16.png",
            "32": "icons/icon-on-32.png",
            "48": "icons/icon-on-48.png",
            "128": "icons/icon-on-128.png"
        } : {
            "16": "icons/icon-off-16.png",
            "32": "icons/icon-off-32.png",
            "48": "icons/icon-off-48.png",
            "128": "icons/icon-off-128.png"
        },
        tabId: tab.id
    });

    chrome.action.setTitle({
        title: isEnabled ? 'Прикажи оригинал' : 'Ћирилизуј',
        tabId: tab.id
    });
}

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('Extension installed');

    chrome.storage.local.get({ enabledRedirects: [] }, function (result) {
        if (result.enabledRedirects.length > 0) {
            return;
        }

        const initialEnabledRedirects = [];

        enabledRedirects = initialEnabledRedirects;
        chrome.storage.local.set({ enabledRedirects: initialEnabledRedirects });
        console.log('Initial redirect list stored');
    });

    chrome.storage.local.get({ enabledDomains: [] }, function (result) {
        if (result.enabledDomains.length > 0) {
            return;
        }

        const initialEnabledDomains = [
            '24sedam.rs',
            '6yka.com',
            'autoblog.rs',
            'autorepublika.com',
            'balkanrock.com',
            'balkans.aljazeera.net',
            'banjaluka.net',
            'bankar.rs',
            'besplatniprogrami.org',
            'beta.rs',
            'bif.rs',
            'brainz.center',
            'bujanovacke.co.rs',
            'buro247.rs',
            'chicagodesavanja.us',
            'chicagoglasnik.com',
            'daljine.rs',
            'ddl.rs',
            'direktno.rs',
            'dmotion.rs',
            'etrebinje.com',
            'euromedic.rs',
            'evrsac.rs',
            'fonet.rs',
            'forbes.n1info.rs',
            'glasbanjaluke.net',
            'happytv.rs',
            'hotsport.rs',
            'indeksonline.rs',
            'infoklix.com',
            'infoliga.rs',
            'informer.rs',
            'insajder.net',
            'jugmedia.rs',
            'kaldrma.rs',
            'kossev.info',
            'luftika.rs',
            'maliproizvodjaci.rs',
            'mondo.rs',
            'moravainfo.rs',
            'n1info.rs',
            'nadlanu.com',
            'naslovi.net',
            'newsflash.rs',
            'niskevesti.rs',
            'noizz.rs',
            'nova.rs',
            'novaekonomija.rs',
            'novidani.com',
            'novimagazin.rs',
            'nultatacka.rs',
            'objektiv.rs',
            'pcpress.rs',
            'pescanik.net',
            'pink.rs',
            'politicki.rs',
            'poslovi.infostud.com',
            'putujsigurno.rs',
            'redportal.rs',
            'restartmagazin.rs',
            'rtvnp.rs',
            'sandzakpress.net',
            'serbiantimes.info',
            'sportal.blic.rs',
            'sportklub.n1info.rs',
            'sportskastranajuga.com',
            'sportske.net',
            'srpskainfo.com',
            'startit.rs',
            'studiob.rs',
            'superzena.b92.net',
            'svet-scandal.rs',
            'talas.rs',
            'tangosix.rs',
            'toppress.rs',
            'topzdravlje.rs',
            'ucentar.rs',
            'video.novosti.rs',
            'vijestisrpske.com',
            'vojvodinainfo.rs',
            'vrbasmedia.com',
            'vrelegume.rs',
            'wannabemagazine.com',
            'webtribune.rs',
            'www.011info.com',
            'www.021.rs',
            'www.alo.rs',
            'www.ana.rs',
            'www.anem.org.rs',
            'www.argumenti.rs',
            'www.arte.rs',
            'www.atvbl.rs',
            'www.automagazin.rs',
            'www.b92.net',
            'www.bastabalkana.com',
            'www.benchmark.rs',
            'www.beograduzivo.rs',
            'www.bizlife.rs',
            'www.bl-portal.com',
            'www.blic.rs',
            'www.cenzolovka.rs',
            'www.danas.rs',
            'www.dominomagazin.com',
            'www.economy.rs',
            'www.ekapija.com',
            'www.espreso.co.rs',
            'www.euronews.rs',
            'www.glas-javnosti.rs',
            'www.glas-zajecara.com',
            'www.glasamerike.net',
            'www.glassumadije.rs',
            'www.glaszapadnesrbije.rs',
            'www.halooglasi.com',
            'www.helloworld.rs',
            'www.ikragujevac.com',
            'www.infokg.rs',
            'www.informer.rs',
            'www.istinomer.rs',
            'www.istorijskizabavnik.rs',
            'www.itsvet.com',
            'www.izletijada.rs',
            'www.juznevesti.com',
            'www.k1info.rs',
            'www.kamatica.com',
            'www.koreni.rs',
            'www.kragujevacke.rs',
            'www.krstarica.com',
            'www.kupindo.com',
            'www.kupujemprodajem.com',
            'www.kurir.rs',
            'www.kuvarancije.com',
            'www.lekovitobilje.rs',
            'www.lepotaizdravlje.rs',
            'www.limundo.com',
            'www.mojkvadrat.rs',
            'www.mojnovisad.com',
            'www.moto-berza.com',
            'www.mozzartsport.com',
            'www.nacionalnaklasa.com',
            'www.navidiku.rs',
            'www.ndnv.org',
            'www.nedeljnik.rs',
            'www.netokracija.rs',
            'www.nezavisne.com',
            'www.novaenergija.net',
            'www.novimagazin.rs',
            'www.novine.ca',
            'www.nuns.rs',
            'www.okradio.rs',
            'www.ossrb.org',
            'www.personalmag.rs',
            'www.pink.rs',
            'www.pirotskevesti.rs',
            'www.plusonline.rs',
            'www.polovniautomobili.com',
            'www.posnajela.rs',
            'www.prirodnolecenje.com',
            'www.probjave.com',
            'www.prva.rs',
            'www.pulsonline.rs',
            'www.radiostoplus.com',
            'www.republika.rs',
            'www.rina.rs',
            'www.satplus.rs',
            'www.saznajnovo.com',
            'www.slobodnaevropa.org',
            'www.srbijadanas.com',
            'www.subotica.com',
            'www.sumedija.rs',
            'www.svetplus.com',
            'www.tanjug.rs',
            'www.telegraf.rs',
            'www.telegraf.tv',
            'www.totalcar.rs',
            'www.travelmagazine.rs',
            'www.valjevskaposla.info',
            'www.vesti-online.com',
            'www.vesti.rs',
            'www.viabalkans.com',
            'www.vranjenews.rs',
            'www.vreme.com',
            'www.xxzmagazin.com',
            'www.zrenjaninski.com',
            'www.zurnal.rs',
            'zadovoljna.nova.rs',
            'zdravljeizivot.rs',
            'zena.blic.rs',
            'zoomue.rs'
        ];

        enabledDomains = initialEnabledDomains;
        chrome.storage.local.set({ enabledDomains: initialEnabledDomains });
        console.log('Initial domain list stored');
    });
});


function toggleDomain(tab) {
    const tabDomain = getDomain(tab.url);

    if (tabDomain === '') {
        return;
    }

    const matchingPattern = getMatchingPattern(tab.url);
    if (matchingPattern) {
        if (enabledRedirects.includes(matchingPattern)) {
            enabledRedirects = enabledRedirects.filter(item => item !== matchingPattern);
            chrome.storage.local.set({ enabledRedirects: enabledRedirects });

            chrome.declarativeNetRequest.updateStaticRules({
                rulesetId: 'map',
                disableRuleIds: patternsToRules[matchingPattern],
            })

            showOriginalPage(tab);

            return;
        }

        enabledRedirects.push(matchingPattern);
        chrome.storage.local.set({ enabledRedirects: enabledRedirects });
        redirectPage(tab);

        chrome.declarativeNetRequest.updateStaticRules({
            rulesetId: 'map',
            enableRuleIds: patternsToRules[matchingPattern],
        });

        return;
    }

    if (enabledDomains.includes(tabDomain)) {
        enabledDomains = enabledDomains.filter(item => item !== tabDomain);
        chrome.storage.local.set({ enabledDomains: enabledDomains });
        showOriginalPage(tab);

        return;
    }

    enabledDomains.push(tabDomain);
    chrome.storage.local.set({ enabledDomains: enabledDomains });
    transliteratePage(tab);
}


function transliteratePage(tab) {
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id,
            allFrames: true
        },
        files: ['/content.js']
    });

    updateExtensionIcon(tab, true);
    chrome.tabs.sendMessage(tab.id, { isEnabled: true });
}

function matchPattern(url, pattern) {
    let escapeRegex = (url) => url.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp("^" + pattern.split("*").map(escapeRegex).join(".*") + "$").test(url);
}

function getMatchingPattern(url) {
    for (const [pattern, rules] of Object.entries(patternsToRules)) {
        if (matchPattern(url, pattern)) {
            return pattern;
        }
    }

    return '';
}

function redirectPage(tab) {
    updateExtensionIcon(tab, true);
}

function showOriginalPage(tab) {
    updateExtensionIcon(tab, false);

    chrome.tabs.sendMessage(tab.id, { isEnabled: false }, function (response) {
        if (chrome.runtime.lastError) {
            // The content script is not present in this tab. Do nothing.
        }
    });
}

function updateActiveTab() {
    chrome.tabs.query({active: true, currentWindow: true}, ([activeTab]) => {
        if (!activeTab) {
            return;
        }

        const activeTabDomain = getDomain(activeTab.url);
        if (activeTabDomain === '') {
            return;
        }

        const matchingPattern = getMatchingPattern(activeTab.url);
        if (enabledRedirects.includes(matchingPattern)) {
            redirectPage(activeTab);
            return;
        }

        if (enabledDomains.includes(activeTabDomain)) {
            transliteratePage(activeTab);
            return;
        }

        showOriginalPage(activeTab);
    });
}

function getDomain(urlString) {
    if (urlString === '') {
        return '';
    }

    const url = new URL(urlString)

    if (url.protocol === 'file:') {
        return url.pathname;
    }

    const supportedProtocols = ['https:', 'http:', 'ftp:'];
    if (!supportedProtocols.includes(url.protocol)) {
        return '';
    }

    return url.hostname;
}

chrome.storage.local.get({ enabledRedirects: [] }, function (result) {
    enabledRedirects = result.enabledRedirects;
    console.log('Loaded redirects', enabledRedirects);
});

chrome.storage.local.get({enabledDomains: []}, function (result) {
    enabledDomains = result.enabledDomains;
    console.log('Loaded domains', enabledDomains);
});


chrome.action.onClicked.addListener(toggleDomain);

chrome.tabs.onUpdated.addListener(updateActiveTab);
chrome.tabs.onActivated.addListener(updateActiveTab);
chrome.windows.onFocusChanged.addListener(updateActiveTab);


updateActiveTab();
