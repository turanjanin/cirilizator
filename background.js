var currentTab;
var enabledDomains = [];
var enabledRedirects = [];

var redirects = [
      { enabled: false, filter: '*://jadovno.com/*',                  match: '^(https?)://jadovno.com/(.*)?lng=lat$',                redirect: '$1://jadovno.com/$2?lng=cir'                 }
    , { enabled: false, filter: '*://lat.rtrs.tv/*',                  match: '^(https?)://lat.rtrs.tv/(.*?)$',                       redirect: '$1://www.rtrs.tv/$2'                         }
    , { enabled: false, filter: '*://pravda.rs/*',                    match: '^(https?)://pravda.rs/lat/(.*)$',                      redirect: '$1://pravda.rs/$2'                           }
    , { enabled: false, filter: '*://*.sputniknews.com/*',            match: '^(https?)://rs-lat.sputniknews.com/(.*?)$',            redirect: '$1://rs.sputniknews.com/$2'                  }
    , { enabled: false, filter: '*://sr.wikipedia.org/*',             match: '^(https?)://sr.wikipedia.org/sr-el/(.*)$',             redirect: '$1://sr.wikipedia.org/sr-ec/$2'              }
    , { enabled: false, filter: '*://srna.rs/',                       match: '^(https?)://srna.rs/$',                                redirect: '$1://srna.rs/index1.aspx'                    }
    , { enabled: false, filter: '*://srna.rs/*',                      match: '^(https?)://srna.rs/(.*)(?<!1).aspx(.*)$',             redirect: '$1://srna.rs/$21.aspx$3'                     }
    , { enabled: false, filter: '*://tanjug.rs/',                     match: '^(https?)://tanjug.rs/$',                              redirect: '$1://tanjug.rs/index1.aspx'                  }
    , { enabled: false, filter: '*://tanjug.rs/*',                    match: '^(https?)://tanjug.rs/(.*)(?<!1).aspx(.*)$',           redirect: '$1://tanjug.rs/$21.aspx$3'                   }
    , { enabled: false, filter: '*://www.bbc.com/serbian/*',          match: '^(https?)://www.bbc.com/serbian/lat(/?)(.*)$',         redirect: '$1://www.bbc.com/serbian/cyr$2$3'            }
    , { enabled: false, filter: '*://www.glassrpske.com/*',           match: '^(https?)://www.glassrpske.com/lat(/?)(.*)$',          redirect: '$1://www.glassrpske.com/cir$2$3'             }
    , { enabled: false, filter: '*://www.glaszapadnesrbije.rs/*',     match: '^(https?)://www.glaszapadnesrbije.rs/(.*)#lat$',       redirect: '$1://www.glaszapadnesrbije.rs/$2#cyr'        }
    , { enabled: false, filter: '*://www.mod.gov.rs/*',               match: '^(https?)://www.mod.gov.rs/lat(.*)$',                  redirect: '$1://mod.gov.rs/cir$2'                       }
    , { enabled: false, filter: '*://www.novosti.rs/*',               match: '^(https?)://www.novosti.rs/(?!c/)(.*?)$',              redirect: '$1://www.novosti.rs/c/$2'                    }
    , { enabled: false, filter: '*://www.nspm.rs/*',                  match: '^(https?)://www.nspm.rs/(.*)?alphabet=l$',             redirect: '$1://www.nspm.rs/$2?alphabet=c'              }
    , { enabled: false, filter: '*://www.politika.rs/*',              match: '^(https?)://www.politika.rs/sr/(.*)$',                 redirect: '$1://www.politika.rs/scc/$2'                 }
    , { enabled: false, filter: '*://www.rts.rs/*/sr.html',           match: '^(https?)://www.rts.rs/(.*)/sr.html$',                 redirect: '$1://www.rts.rs/$2/ci.html'                  }
    , { enabled: false, filter: '*://www.rts.rs/*/sr/*',              match: '^(https?)://www.rts.rs/(.*)/sr/(.*)$',                 redirect: '$1://www.rts.rs/$2/ci/$3'                    }
    , { enabled: false, filter: '*://www.rtv.rs/sr_lat/*',            match: '^(https?)://www.rtv.rs/sr_lat/(.*)$',                  redirect: '$1://www.rtv.rs/sr_ci/$2'                    }
    , { enabled: false, filter: '*://www.rtvbn.com/*',                match: '^(https?)://www.rtvbn.com/(?!cirilica(/?))(.*)$',      redirect: '$1://www.rtvbn.com/cirilica/$3'              }
    , { enabled: false, filter: '*://www.standard.rs/*',              match: '^(https?)://www.standard.rs/(.*)?alphabet=latin(.*)$', redirect: '$1://www.standard.rs/$2?alphabet=cyrillic$3' }
    , { enabled: false, filter: '*://www.uns.org.rs/sr.html',         match: '^(https?)://www.uns.org.rs/sr.html$',                  redirect: '$1://www.uns.org.rs/'                        }
    , { enabled: false, filter: '*://www.uns.org.rs/sr/*',            match: '^(https?)://www.uns.org.rs/sr/(.*)$',                  redirect: '$1://www.uns.org.rs/$2'                      }
    , { enabled: false, filter: '*://www.yugoimport.com/*',           match: '^(https?)://www.yugoimport.com/lat(.*)$',              redirect: '$1://www.yugoimport.com/cir$2'               }
];

function matchRule(url, rule) {
    let escapeRegex = (url) => url.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(url);
}

function getRedirectIndex(url) {
    for (let i = 0; i < enabledRedirects.length; i++) {
        if (matchRule(currentTab.url, redirects[i].filter)) {
            return i;
        }
    }

    return -1;
}

function isRedirected(url) {
    let redirectIndex = getRedirectIndex(url);
    if (redirectIndex != -1) {
        return redirects[redirectIndex].enabled;
    }

    return false;
}

function setRedirect(filter, enabled) {
    for (let i = 0; i < redirects.length; i++) {
        if (redirects[i].filter == filter) {
            redirects[i].enabled = enabled;
            return;
        }
    }
}

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

    chrome.storage.local.get({ enabledRedirects: [] }, function (result) {
        if (result.enabledRedirects.length > 0) {
            return;
        }

        let initialEnabledRedirects = [];

        for (var i = 0; i < redirects.length; i++) {
            initialEnabledRedirects.push(redirects[i].filter);
        }

        enabledRedirects = initialEnabledRedirects;
        chrome.storage.local.set({ enabledRedirects: initialEnabledRedirects });
        console.log('Initial redirect list stored');
    });

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

    let redirectIndex = getRedirectIndex(currentTab.url);
    if (redirectIndex != -1) {

        let filter = redirects[redirectIndex].filter;
        redirects[redirectIndex].enabled = !redirects[redirectIndex].enabled;

        if (!redirects[redirectIndex].enabled) {
            enabledRedirects = enabledRedirects.filter(item => item !== filter);
            chrome.storage.local.set({ enabledRedirects: enabledRedirects });
            showOriginalPage();
            return;
        }

        enabledRedirects.push(filter);
        chrome.storage.local.set({ enabledRedirects: enabledRedirects });
        redirectedPage();

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

function redirectedPage() {
    updateExtensionIcon(true);
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

                if (isRedirected(currentTab.url)) {
                    redirectedPage();
                } else if (enabledDomains.includes(currentTabDomain)) {
                    transliteratePage();
                } else {
                    showOriginalPage();
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

chrome.storage.local.get({ enabledRedirects: [] }, function (result) {
    enabledRedirects = result.enabledRedirects;
    console.log('Loaded redirects', enabledRedirects);

    for (let i = 0; i < enabledRedirects.length; i++) {
        setRedirect(enabledRedirects[i], true);
    }

    let urls = [];
    for (var i = 0; i < redirects.length; i++) {
        urls.push(redirects[i].filter);
    }

    function onRequest(info) {
        let redirect = info.url;

        for (let i = 0; i < redirects.length; i++) {

            if (redirects[i].enabled) {

                let rx = new RegExp(redirects[i].match, 'gi');
                let matches = rx.exec(info.url);

                if (matches) {

                    redirect = redirects[i].redirect;

                    for (let j = 0; j < matches.length; j++) {

                        let str = matches[j] || '';
                        redirect = redirect.replace(new RegExp('\\$' + j, 'gi'), str);
                    }

                    break;
                }
            }
        }

        if (redirect == info.url) {
            return;
        }

        return { redirectUrl: redirect };
    }

    const filter = { urls: urls, types: [ 'main_frame' ] };
    browser.webRequest.onBeforeRequest.addListener(onRequest, filter, ["blocking"]);
});

chrome.storage.local.get({enabledDomains: []}, function (result) {
    enabledDomains = result.enabledDomains;
    console.log('Loaded domains', enabledDomains);
});

chrome.browserAction.onClicked.addListener(toggleDomain);
chrome.tabs.onUpdated.addListener(updateActiveTab);
chrome.tabs.onActivated.addListener(updateActiveTab);
chrome.windows.onFocusChanged.addListener(updateActiveTab);


updateActiveTab();
