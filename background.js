var currentTab;
var enabledDomains;

function updateExtensionIcon(isEnabled) {
    chrome.browserAction.setIcon({
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
        tabId: currentTab.id
    });

    chrome.browserAction.setTitle({
        title: isEnabled ? 'Прикажи оригинал' : 'Ћирилизуј',
        tabId: currentTab.id
    });
}

chrome.runtime.onInstalled.addListener(function () {
    console.log('Extension installed');

    chrome.storage.local.get({ enabledDomains: [] }, function (result) {
        if (result.enabledDomains.length > 0) {
            return;
        }

        const initialEnabledDomains = [
            'autoblog.rs',
            'balkanrock.com',
            'balkans.aljazeera.net',
            'besplatniprogrami.org',
            'beta.rs',
            'bif.rs',
            'brainz.center',
            'bujanovacke.co.rs',
            'buro247.rs',
            'daljine.rs',
            'direktno.rs',
            'fonet.rs',
            'happytv.rs',
            'hbogo.rs',
            'hotsport.rs',
            'indeksonline.rs',
            'infoliga.rs',
            'insajder.net',
            'jugmedia.rs',
            'luftika.rs',
            'mondo.rs',
            'moravainfo.rs',
            'naslovi.net',
            'niskevesti.rs',
            'noizz.rs',
            'nova.rs',
            'novimagazin.rs',
            'objektiv.rs',
            'pcpress.rs',
            'pescanik.net',
            'pink.rs',
            'poslovi.infostud.com',
            'putujsigurno.rs',
            'restartmagazin.rs',
            'rs.n1info.com',
            'rtvnp.rs',
            'sandzakpress.net',
            'sport.blic.rs',
            'sportklub.rs',
            'sportskastranajuga.com',
            'sportske.net',
            'startit.rs',
            'studiob.rs',
            'svet-scandal.rs',
            'talas.rs',
            'tangosix.rs',
            'toppress.rs',
            'topzdravlje.rs',
            'ucentar.rs',
            'vrelegume.rs',
            'wannabemagazine.com',
            'www.011info.com',
            'www.021.rs',
            'www.alo.rs',
            'www.ana.rs',
            'www.anem.org.rs',
            'www.arte.rs',
            'www.automagazin.rs',
            'www.b92.net',
            'www.benchmark.rs',
            'www.bizlife.rs',
            'www.blic.rs',
            'www.cenzolovka.rs',
            'www.danas.rs',
            'www.dominomagazin.com',
            'www.economy.rs',
            'www.ekapija.com',
            'www.espreso.rs',
            'www.glas-zajecara.com',
            'www.glasamerike.net',
            'www.glassumadije.rs',
            'www.halooglasi.com',
            'www.ikragujevac.com',
            'www.infokg.rs',
            'www.informer.rs',
            'www.itsvet.com',
            'www.juznevesti.com',
            'www.kamatica.com',
            'www.kragujevacke.rs',
            'www.krstarica.com',
            'www.kupindo.com',
            'www.kupujemprodajem.com',
            'www.kurir.rs',
            'www.lekovitobilje.rs',
            'www.lepotaizdravlje.rs',
            'www.limundo.com',
            'www.mojkvadrat.rs',
            'www.moto-berza.com',
            'www.mozzartsport.com',
            'www.nacionalnaklasa.com',
            'www.ndnv.org',
            'www.nedeljnik.rs',
            'www.novaenergija.net',
            'www.novimagazin.rs',
            'www.novine.ca',
            'www.nuns.rs',
            'www.okradio.rs',
            'www.personalmag.rs',
            'www.pink.rs',
            'www.plusonline.rs',
            'www.polovniautomobili.com',
            'www.probjave.com',
            'www.prva.rs',
            'www.pulsonline.rs',
            'www.radiostoplus.com',
            'www.republika.rs',
            'www.rina.rs',
            'www.saznajnovo.com',
            'www.slobodnaevropa.org',
            'www.srbijadanas.com',
            'www.subotica.com',
            'www.sumedija.rs',
            'www.svetplus.com',
            'www.telegraf.rs',
            'www.totalcar.rs',
            'www.travelmagazine.rs',
            'www.valjevskaposla.info',
            'www.vesti-online.com',
            'www.viabalkans.com',
            'www.vranjenews.rs',
            'www.vreme.com',
            'www.xxzmagazin.com',
            'www.zrenjaninski.com',
            'www.zurnal.rs',
            'zena.blic.rs',
            'zoomue.rs'
        ];

        enabledDomains = initialEnabledDomains;
        chrome.storage.local.set({ enabledDomains: initialEnabledDomains });
        console.log('Initial domain list stored');
    });
});


function toggleDomain() {
    const currentTabDomain = getDomain(currentTab.url);

    if (currentTabDomain === '') {
        return;
    }

    if (enabledDomains.includes(currentTabDomain)) {
        enabledDomains = enabledDomains.filter(item => item !== currentTabDomain);
        chrome.storage.local.set({ enabledDomains: enabledDomains });

        showOriginalPage();

        return;
    }

    enabledDomains.push(currentTabDomain);
    chrome.storage.local.set({ enabledDomains: enabledDomains });

    transliteratePage();
}


function transliteratePage() {
    chrome.tabs.executeScript(currentTab.id, {
        allFrames: true,
        file: '/content.js',
        runAt: 'document_end'
    });

    updateExtensionIcon(true);
    chrome.tabs.sendMessage(currentTab.id, { isEnabled: true });
}

function showOriginalPage() {
    updateExtensionIcon(false);
    chrome.tabs.sendMessage(currentTab.id, { isEnabled: false });
}

function updateActiveTab() {
    function updateTab(tabs) {
        if (tabs[0]) {
            currentTab = tabs[0];

            const currentTabDomain = getDomain(currentTab.url);

            if (currentTabDomain) {
                if (enabledDomains.includes(currentTabDomain)) {
                    transliteratePage();
                } else {
                    chrome.tabs.sendMessage(currentTab.id, { isEnabled: false });
                    updateExtensionIcon(false);
                }
            }
        }
    }

    chrome.tabs.query({active: true, currentWindow: true}, updateTab);
}

function getDomain(urlString) {
    if (urlString === "") {
        return "";
    }

    const url = new URL(urlString)
    const supportedProtocols = ["https:", "http:", "ftp:", "file:"];

    if (!supportedProtocols.includes(url.protocol)) {
        return "";
    }

    return url.hostname;
}

chrome.storage.local.get({enabledDomains: []}, function (result) {
    enabledDomains = result.enabledDomains;
    console.log('Loaded domains', enabledDomains);
});

chrome.browserAction.onClicked.addListener(toggleDomain);
chrome.tabs.onUpdated.addListener(updateActiveTab);
chrome.tabs.onActivated.addListener(updateActiveTab);
chrome.windows.onFocusChanged.addListener(updateActiveTab);


updateActiveTab();
