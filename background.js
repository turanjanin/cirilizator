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
            'www.kurir.rs',
            'www.blic.rs',
            'www.kupujemprodajem.com',
            'www.alo.rs',
            'www.espreso.rs',
            'www.srbijadanas.com',
            'www.b92.net',
            'www.polovniautomobili.com',
            'www.telegraf.rs',
            'www.informer.rs',
            'www.pink.rs',
            'pink.rs',
            'www.limundo.com',
            'mondo.rs',
            'rs.n1info.com',
            'sport.blic.rs',
            'www.halooglasi.com',
            'www.danas.rs',
            'www.kupindo.com',
            'www.juznevesti.com',
            'poslovi.infostud.com',
            'www.ana.rs',
            'hbogo.rs'
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


function transliteratePage()
{
    chrome.tabs.executeScript(currentTab.id, {
        allFrames: true,
        file: '/content.js',
        runAt: 'document_end'
    });

    updateExtensionIcon(true);
    chrome.tabs.sendMessage(currentTab.id, { isEnabled: true });
}

function showOriginalPage()
{
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

function getDomain(urlString)
{
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