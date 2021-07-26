var currentTab;
var enabledDomains = [];
var enabledRedirects = [];
var lastRedirectedUrl = '';

var redirects = [
      { enabled: false, filter: '*://elementarium.cpn.rs/*',      rules: [ { match: '^(https?)://elementarium.cpn.rs/(.*)?script=lat$',               redirect: '$1://elementarium.cpn.rs/$2?script=cir'      }
                                                                         , { match: '^(https?)://elementarium.cpn.rs/((?!.*\?script=(?:cir|lat)).*)', redirect: '$1://elementarium.cpn.rs/$2?script=cir'      } ] }
    , { enabled: false, filter: '*://jadovno.com/*',              rules: [ { match: '^(https?)://jadovno.com/(.*)?lng=lat$',                          redirect: '$1://jadovno.com/$2?lng=cir'                 }
                                                                         , { match: '^(https?)://jadovno.com/((?!.*\?lng=(?:cir|lat)).*)',            redirect: '$1://jadovno.com/$2?lng=cir'                 } ] }
    , { enabled: false, filter: '*://kim.gov.rs/*',               rules: [ { match: '^(https?)://kim.gov.rs/lat/(.*)$',                               redirect: '$1://kim.gov.rs/$2'                          } ] }
    , { enabled: false, filter: '*://nbs.rs/*',                   rules: [ { match: '^(https?)://nbs.rs/sr/(.*)$',                                    redirect: '$1://nbs.rs/sr_RS/$2'                        } ] }
    , { enabled: false, filter: '*://*.sputniknews.com/*',        rules: [ { match: '^(https?)://rs-lat.sputniknews.com/(.*?)$',                      redirect: '$1://rs.sputniknews.com/$2'                  } ] }
    , { enabled: false, filter: '*://*.rtrs.tv/*',                rules: [ { match: '^(https?)://lat.rtrs.tv/(.*?)$',                                 redirect: '$1://www.rtrs.tv/$2'                         } ] }
    , { enabled: false, filter: '*://pravda.rs/*',                rules: [ { match: '^(https?)://pravda.rs/lat/(.*)$',                                redirect: '$1://pravda.rs/$2'                           } ] }
    , { enabled: false, filter: '*://sr.wikipedia.org/*',         rules: [ { match: '^(https?)://sr.wikipedia.org/(?:wiki|sr|sr-el)/(.*)$',           redirect: '$1://sr.wikipedia.org/sr-ec/$2'              } ] }
    , { enabled: false, filter: '*://srna.rs/*',                  rules: [ { match: '^(https?)://srna.rs/$',                                          redirect: '$1://srna.rs/index1.aspx'                    }
                                                                         , { match: '^(https?)://srna.rs/(.*)(?<!1).aspx(.*)$',                       redirect: '$1://srna.rs/$21.aspx$3'                     } ] }
    , { enabled: false, filter: '*://tanjug.rs/*',                rules: [ { match: '^(https?)://tanjug.rs/$',                                        redirect: '$1://tanjug.rs/index1.aspx'                  }
                                                                         , { match: '^(https?)://tanjug.rs/(.*)(?<!1).aspx(.*)$',                     redirect: '$1://tanjug.rs/$21.aspx$3'                   } ] }
    , { enabled: false, filter: '*://www.arhiv-beograda.org/*',   rules: [ { match: '^(https?)://www.arhiv-beograda.org/sr/(.*)$',                    redirect: '$1://www.arhiv-beograda.org/rs/$2'           } ] }
    , { enabled: false, filter: '*://www.beograd.rs/*',           rules: [ { match: '^(https?)://www.beograd.rs/lat(.*)$',                            redirect: '$1://www.beograd.rs/cir$2'                   } ] }
    , { enabled: false, filter: '*://www.bbc.com/serbian/*',      rules: [ { match: '^(https?)://www.bbc.com/serbian/lat(/?)(.*)$',                   redirect: '$1://www.bbc.com/serbian/cyr$2$3'            } ] }
    , { enabled: false, filter: '*://www.glassrpske.com/*',       rules: [ { match: '^(https?)://www.glassrpske.com/lat(/?)(.*)$',                    redirect: '$1://www.glassrpske.com/cir$2$3'             } ] }
    , { enabled: false, filter: '*://www.glaszapadnesrbije.rs/*', rules: [ { match: '^(https?)://www.glaszapadnesrbije.rs/(.*)#lat$',                 redirect: '$1://www.glaszapadnesrbije.rs/$2#cyr'        } ] }
    , { enabled: false, filter: '*://www.intermagazin.rs/*',      rules: [ { match: '^(https?)://www.intermagazin.rs/(.*)?lang=lat$',                 redirect: '$1://www.intermagazin.rs/$2?lang=cir'        }
                                                                         , { match: '^(https?)://www.intermagazin.rs/((?!.*\?lang=(?:cir|lat)).*)',   redirect: '$1://www.intermagazin.rs/$2?lang=cir'        } ] }
    , { enabled: false, filter: '*://www.kragujevac.rs/*',        rules: [ { match: '^(https?)://www.kragujevac.rs/(.*)?script=lat$',                 redirect: '$1://www.kragujevac.rs/$2?script=cir'        }
                                                                         , { match: '^(https?)://www.kragujevac.rs/((?!.*\?script=(?:cir|lat)).*)',   redirect: '$1://www.kragujevac.rs/$2?script=cir'        } ] }
    , { enabled: false, filter: '*://www.mod.gov.rs/*',           rules: [ { match: '^(https?)://www.mod.gov.rs/lat(.*)$',                            redirect: '$1://www.mod.gov.rs/cir$2'                   } ] }
    , { enabled: false, filter: '*://www.novosti.rs/*',           rules: [ { match: '^(https?)://www.novosti.rs/(?!c/)(.*?)$',                        redirect: '$1://www.novosti.rs/c/$2'                    } ] }
    , { enabled: false, filter: '*://www.nspm.rs/*',              rules: [ { match: '^(https?)://www.nspm.rs/(.*)?alphabet=l$',                       redirect: '$1://www.nspm.rs/$2?alphabet=c'              } ] }
    , { enabled: false, filter: '*://www.politika.rs/*',          rules: [ { match: '^(https?)://www.politika.rs/sr(/?)(.*)$',                        redirect: '$1://www.politika.rs/scc$2$3'                } ] }
    , { enabled: false, filter: '*://posta.rs/*',                 rules: [ { match: '^(https?)://(?:.*\.)?posta.rs/lat/(.*)$',                        redirect: '$1://posta.rs/cir/$2'                        }
                                                                         , { match: '^(https?)://(?:.*\.)?posta.rs/index-privreda-lat.aspx$',         redirect: '$1://posta.rs/index-privreda-cir.aspx'       }
                                                                         , { match: '^(https?)://(?:.*\.)?posta.rs/index-stanovnistvo-lat.aspx$',     redirect: '$1://posta.rs/index.aspx'                    } ] }
    , { enabled: false, filter: '*://www.rts.rs/*',               rules: [ { match: '^(https?)://www.rts.rs/(.*)/sr.html$',                           redirect: '$1://www.rts.rs/$2/ci.html'                  }
                                                                         , { match: '^(https?)://www.rts.rs/(.*)/sr/(.*)$',                           redirect: '$1://www.rts.rs/$2/ci/$3'                    } ] }
    , { enabled: false, filter: '*://www.rtv.rs/*',               rules: [ { match: '^(https?)://www.rtv.rs/sr_lat/(.*)$',                            redirect: '$1://www.rtv.rs/sr_ci/$2'                    } ] }
    , { enabled: false, filter: '*://www.rtvbn.com/*',            rules: [ { match: '^(https?)://www.rtvbn.com/(?!cirilica(/?))(.*)$',                redirect: '$1://www.rtvbn.com/cirilica/$3'              } ] }
    , { enabled: false, filter: '*://www.standard.rs/*',          rules: [ { match: '^(https?)://www.standard.rs/(.*)?alphabet=latin(.*)$',           redirect: '$1://www.standard.rs/$2?alphabet=cyrillic$3' } ] }
    , { enabled: false, filter: '*://www.uns.org.rs/*',           rules: [ { match: '^(https?)://www.uns.org.rs/sr.html$',                            redirect: '$1://www.uns.org.rs/'                        }
                                                                         , { match: '^(https?)://www.uns.org.rs/sr/(.*)$',                            redirect: '$1://www.uns.org.rs/$2'                      } ] }
    , { enabled: false, filter: '*://www.vs.rs/*',                rules: [ { match: '^(https?)://www.vs.rs/sr_lat(.*)$',                              redirect: '$1://www.vs.rs/sr_cyr$2'                     } ] }
    , { enabled: false, filter: '*://www.yugoimport.com/*',       rules: [ { match: '^(https?)://www.yugoimport.com/lat(.*)$',                        redirect: '$1://www.yugoimport.com/cir$2'               } ] }
    , { enabled: false, filter: '*://dveri.rs/*',                 rules: [ { match: '^(https?)://dveri.rs/(.*)?#lat$',                                redirect: '$1://dveri.rs/$2#cyr'                        } ] }
    , { enabled: false, filter: '*://www.ff.uns.ac.rs/*',         rules: [ { match: '^(https?)://www.ff.uns.ac.rs/sr-lat/(.*)$',                      redirect: '$1://www.ff.uns.ac.rs/sr/$2'                 } ] }
    , { enabled: false, filter: '*://www.ossrb.org/*',            rules: [ { match: '^(https?)://www.ossrb.org/(.*)?#lat$',                           redirect: '$1://www.ossrb.org/$2#cyr'                   } ] }
    , { enabled: false, filter: '*://www.etf.bg.ac.rs/*',         rules: [ { match: '^(https?)://www.etf.bg.ac.rs/sr-lat/(.*)$',                      redirect: '$1://www.etf.bg.ac.rs/sr/$2'                 } ] }
    , { enabled: false, filter: '*://www.tf.uns.ac.rs/*',         rules: [ { match: '^(https?)://www.tf.uns.ac.rs/(.*)?#lat$',                        redirect: '$1://www.tf.uns.ac.rs/$2#cyr'                } ] }
];

function matchRule(url, rule) {
    let escapeRegex = (url) => url.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(url);
}

function getRedirectIndex(url) {
    for (let i = 0; i < redirects.length; i++) {
        if (matchRule(url, redirects[i].filter)) {
            return i;
        }
    }

    return -1;
}

function setRedirect(filter, enabled) {
    for (let i = 0; i < redirects.length; i++) {
        if (redirects[i].filter === filter) {
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
            'bankar.rs',
            'besplatniprogrami.org',
            'beta.rs',
            'bif.rs',
            'brainz.center',
            'bujanovacke.co.rs',
            'buro247.rs',
            'daljine.rs',
            'direktno.rs',
            'dmotion.rs',
            'etrebinje.com',
            'fonet.rs',
            'glasbanjaluke.net',
            'happytv.rs',
            'hbogo.rs',
            'hotsport.rs',
            'indeksonline.rs',
            'infoklix.com',
            'infoliga.rs',
            'insajder.net',
            'jugmedia.rs',
            'kaldrma.rs',
            'luftika.rs',
            'mondo.rs',
            'moravainfo.rs',
            'nadlanu.com',
            'naslovi.net',
            'newsflash.rs',
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
            'redportal.rs',
            'restartmagazin.rs',
            'rs.n1info.com',
            'rtvnp.rs',
            'sandzakpress.net',
            'sport.blic.rs',
            'sportklub.rs',
            'sportskastranajuga.com',
            'sportske.net',
            'srpskainfo.com',
            'startit.rs',
            'studiob.rs',
            'svet-scandal.rs',
            'talas.rs',
            'tangosix.rs',
            'toppress.rs',
            'topzdravlje.rs',
            'ucentar.rs',
            'vijestisrpske.com',
            'vrbasmedia.com',
            'vrelegume.rs',
            'wannabemagazine.com',
            'www.011info.com',
            'www.021.rs',
            'www.alo.rs',
            'www.ana.rs',
            'www.anem.org.rs',
            'www.argumenti.rs',
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
            'www.glas-javnosti.rs',
            'www.glas-zajecara.com',
            'www.glasamerike.net',
            'www.glassumadije.rs',
            'www.halooglasi.com',
            'www.ikragujevac.com',
            'www.infokg.rs',
            'www.informer.rs',
            'www.istinomer.rs',
            'www.istorijskizabavnik.rs',
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
            'www.mojnovisad.com',
            'www.moto-berza.com',
            'www.mozzartsport.com',
            'www.nacionalnaklasa.com',
            'www.ndnv.org',
            'www.nedeljnik.rs',
            'www.nezavisne.com',
            'www.novaenergija.net',
            'www.novimagazin.rs',
            'www.novine.ca',
            'www.nuns.rs',
            'www.okradio.rs',
            'www.personalmag.rs',
            'www.pink.rs',
            'www.plusonline.rs',
            'www.polovniautomobili.com',
            'www.posnajela.rs',
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
            'www.vesti.rs',
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
    if (redirectIndex !== -1) {
        let filter = redirects[redirectIndex].filter;
        const redirectIsEnabled = redirects[redirectIndex].enabled;
        redirects[redirectIndex].enabled = !redirects[redirectIndex].enabled;

        if (redirectIsEnabled) {
            enabledRedirects = enabledRedirects.filter(item => item !== filter);
            chrome.storage.local.set({ enabledRedirects: enabledRedirects });
            showOriginalPage();

            return;
        }

        enabledRedirects.push(filter);
        chrome.storage.local.set({ enabledRedirects: enabledRedirects });
        redirectPage(redirects[redirectIndex]);

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

function redirectPage(redirect) {
    updateExtensionIcon(true);

    const newUrl = getCyrillicVersionUrl(currentTab.url, redirect);
    if (currentTab.url !== newUrl) {
        chrome.tabs.executeScript(currentTab.id, {
            code: `window.location.replace('${newUrl}');`
        });
    }
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
                let redirectIndex = getRedirectIndex(currentTab.url);
                if (redirectIndex !== -1 && redirects[redirectIndex].enabled) {
                    redirectPage(currentTab.url, redirects[redirectIndex]);
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

function getCyrillicVersionUrl(originalUrl, redirect) {
    if (!redirect.enabled) {
        return originalUrl;
    }

    let cyrillicVersionUrl = originalUrl;

    for (let i = 0; i < redirect.rules.length; i++) {
        const rule = redirect.rules[i];

        const rx = new RegExp(rule.match, 'gi');
        const matches = rx.exec(originalUrl);

        if (matches) {
            cyrillicVersionUrl = rule.redirect;

            for (let j = 0; j < matches.length; j++) {
                let str = matches[j] || '';
                cyrillicVersionUrl = cyrillicVersionUrl.replace(new RegExp('\\$' + j, 'gi'), str);
            }

            break;
        }
    }

    return cyrillicVersionUrl;
}

function handleNewRequest(info) {
    let redirectUrl = info.url;
    const redirectIndex = getRedirectIndex(info.url);

    if (redirectIndex !== -1) {
        const redirect = redirects[redirectIndex];
        redirectUrl = getCyrillicVersionUrl(info.url, redirect);
    }

    if (redirectUrl === info.url) {
        return;
    }

    if (redirectUrl === lastRedirectedUrl) {
        console.log('Redirect loop detected. Aborting...');
        return;
    }

    lastRedirectedUrl = redirectUrl;

    return { redirectUrl: redirectUrl };
}

chrome.storage.local.get({ enabledRedirects: [] }, function (result) {
    enabledRedirects = result.enabledRedirects;
    console.log('Loaded redirects', enabledRedirects);

    for (let i = 0; i < enabledRedirects.length; i++) {
        setRedirect(enabledRedirects[i], true);
    }

    let urls = [];
    for (let i = 0; i < redirects.length; i++) {
        urls.push(redirects[i].filter);
    }

    const filter = { urls: urls, types: ['main_frame'] };
    chrome.webRequest.onBeforeRequest.addListener(handleNewRequest, filter, ['blocking']);
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
