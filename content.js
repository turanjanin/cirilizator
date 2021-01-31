if (window.contentScriptInjected !== true) {
    window.contentScriptInjected = true;

    let isEnabled = true;
    let initialMap = {
        "A": "А",
        "B": "Б",
        "V": "В",
        "G": "Г",
        "D": "Д",
        "Đ": "Ђ",
        "Ð": "Ђ",
        "DJ": "Ђ",
        "Dj": "Ђ",
        "E": "Е",
        "Ž": "Ж",
        "Ž": "Ж", // Z with caron
        "Z": "З",
        "I": "И",
        "J": "Ј",
        "K": "К",
        "L": "Л",
        "LJ": "Љ",
        "Ǉ": "Љ",
        "Lj": "Љ",
        "M": "М",
        "N": "Н",
        "NJ": "Њ",
        "Ǌ": "Њ",
        "Nj": "Њ",
        "O": "О",
        "P": "П",
        "R": "Р",
        "S": "С",
        "T": "Т",
        "Ć": "Ћ",
        "Ć": "Ћ", // C with acute accent
        "U": "У",
        "F": "Ф",
        "H": "Х",
        "C": "Ц",
        "Č": "Ч",
        "Č": "Ч", // C with caron
        "DŽ": "Џ",
        "Ǆ": "Џ",
        "DŽ": "Џ", // D + Z with caron
        //"DZ": "Џ",
        "Dž": "Џ",
        "Dž": "Џ", // D + z with caron
        "Dz": "Џ",
        "Š": "Ш",
        "Š": "Ш", // S with caron
        "a": "а",
        "b": "б",
        "v": "в",
        "g": "г",
        "d": "д",
        "đ": "ђ",
        "dj": "ђ",
        "e": "е",
        "ž": "ж",
        "ž": "ж", // z with caron
        "z": "з",
        "i": "и",
        "ĳ": "иј",
        "j": "ј",
        "k": "к",
        "l": "л",
        "lj": "љ",
        "ǉ": "љ",
        "m": "м",
        "n": "н",
        "nj": "њ",
        "ǌ": "њ",
        "o": "о",
        "œ": "ое",
        "p": "п",
        "r": "р",
        "s": "с",
        "ﬆ": "ст",
        "t": "т",
        "ć": "ћ",
        "ć": "ћ", // c with acute accent
        "u": "у",
        "f": "ф",
        "ﬁ": "фи",
        "ﬂ": "фл",
        "h": "х",
        "c": "ц",
        "č": "ч",
        "č": "ч", // c with caron
        "dž": "џ",
        "ǆ": "џ",
        "dž": "џ", // d + z with caron
        //"dz": "џ",
        "š": "ш",
        "š": "ш", // s with caron
    };


    // Temporary fix for United Media sites with faulty "Exo 2" font.
    const fontAffectedSites = [
        "ba.n1info.com",
        "hr.n1info.com",
        "rs.n1info.com",
        "sportklub.rs",
    ];
    if (fontAffectedSites.includes(window.location.hostname)) {
        initialMap["đ"] = "ћ";
        initialMap["ć"] = "ђ";
        initialMap["ć"] = "ђ";
    }


    const serbianWordsWithForeignCharacterCombinations = [
        "aparthejd",
        "ddor",
        "dss",
        "dvadesettrog",
        "epp",
        "gss",
        "interreakc",
        "interresor",
        "kss",
        "mmf",
        "ommetar",
        "poddirektor",
        "poddres",
        "posthumn",
        "posttrans",
        "posttraum",
        "pothranj",
        "prethod",
        "ptt",
        "sbb",
        "sssr",
        "superračun",
        "transseks",
        "transsibir",
        "tridesettrog",
        "urla",
    ];

    const commonForeignWords = [
        "administration",
        "adobe",
        "advanced",
        "advertising",
        "alpha",
        "autocad",
        "bluetooth",
        "book",
        "boot",
        "bosch",
        "canon",
        "carlsberg",
        "chat",
        "chevrolet",
        "chrome",
        "cisco",
        "clio",
        "cloud",
        "coca-col",
        "conditions",
        "cookie",
        "cooking",
        "cool",
        "covid",
        "cpu",
        "dacia",
        "default",
        "developer",
        "e-mail",
        "edge",
        "electronics",
        "email",
        "english",
        "facebook",
        "fashion",
        "food",
        "foundation",
        "gaming",
        "ghz",
        "github",
        "gmail",
        "gmbh",
        "gmt",
        "good",
        "google",
        "hdmi",
        "iphon",
        "ipod",
        "javascript",
        "joomla",
        "khz",
        "league",
        "like",
        "linkedin",
        "login",
        "look",
        "macbook",
        "mail",
        "maps",
        "mastercard",
        "mercator",
        "mhz",
        "microsoft",
        "mitsubishi",
        "notebook",
        "nvidia",
        "online",
        "outlook",
        "panasonic",
        "peugeot",
        "podcast",
        "porsche",
        "postpaid",
        "printscreen",
        "procredit",
        "renault",
        "school",
        "selfie",
        "share",
        "shift",
        "shop",
        "smartphone",
        "space",
        "ssd",
        "steam",
        "subscrib",
        "tech",
        "technology",
        "terms",
        "the",
        "thinkpad",
        "thread",
        "tool",
        "topic",
        "trailer",
        "unicredit",
        "url",
        "username",
        "viber",
        "viii",
        "visa",
    ];

    const foreignCharacterCombinations = [
        'q',
        'w',
        'x',
        'y',
        'ü',
        'ö',
        'ä',
        'ø',
        'ß',
        '&',
        '@',
        '#',
        'bb',
        'cc',
        'dd',
        'ff',
        'gg',
        'hh',
        'kk',
        'll',
        'mm',
        'nn',
        'pp',
        'rr',
        'ss',
        'tt',
        'zz',
        'ch',
        'gh',
        'th',
        '\'s',
        '\'t',
        '.com',
        '.net',
        '.info',
        '.rs',
        '.org'
    ];

    const digraphExceptions = {
        "dj": [
          "adjektiv",
          "adjunkt",
          "bazdjeti",
          "bdje",
          "bezdje",
          "blijedje",
          "bludje",
          "bridjе",
          "vidje",
          "vindjakn",
          "višenedje",
          "vrijedje",
          "gdje",
          "gudjer",
          "gudje",
          "gdjir",
          "daždje",
          "dvonedje",
          "devetonedje",
          "desetonedje",
          "djev",
          "djed",
          "djejstv",
          "djejstv",
          "djelat",
          "djel",
          "djelc",
          "djelj",
          "djenut",
          "djet",
          "djeca",
          "dječ",
          "djuar",
          "djubison",
          "djubouz",
          "djuer",
          "djui",
        // "djuk", djuk (engl. Duke) косило би се нпр. са Djukanović
          "djuks",
          "djulej",
          "djumars",
          "djupont",
          "djurant",
          "djusenberi",
          "djuharst",
          "djuherst",
          "dovdje",
          "dogrdje",
          "dodjel",
          "dodjelj",
          "drvodje",
          "drugdje",
          "elektrosnabdje",
          "žudje",
          "zabludje",
          "zavidje",
          "zavrijedje",
          "zagudje",
          "zadjev",
          "zadjen",
          "zalebdje",
          "zaludje",
          "zaodje",
          "zapodje",
          "zarudje",
          "zasjedje",
          "zasmrdje",
          "zastidje",
          "zaštedje",
          "zdjel",
          "zdjelj",
          "zdje",
          "zlodje",
          "igdje",
          "izbledje",
          "izblijedje",
          "izvidje",
          "izdjejst",
          "izdjelj",
          "izludje",
          "isprdje",
          "jednonedje",
          "kojegdje",
          "kudjelj",
          "lebdje",
          "ludjet",
          "makfadjen",
          "marmadjuk",
          "međudjel",
          "nadjaha",
          "nadjača",
          "nadjeb",
          "nadjev",
          "nadjen",
          "negdje",
          "nedjel",
          "nedjelj",
          "nadjunač",
          "nenavidje",
          "neodje",
          "nepodjarm",
          "nerazdje",
          "nigdje",
          "obdjel",
          "obdjelj",
          "obnevidje",
          "ovdje",
          "ovdje-ondje",
          "odjav",
          "odjah",
          "odjaš",
          "odjeb",
          "odjev",
          "odjed",
          "odjezd",
          "odjek",
          "odjel",
          "odjelj",
          "odjen",
          "odjeć",
          "odjec",
          "odjur",
          "odsjed"
          "odsjedje",
          "ondje",
          "opredje",
          "osijedje",
          "osmonedje",
          "pardju",
          "perdju",
          "petonedje",
          "poblijedje",
          "povidje",
          "pogdjegdje",
          "pogdje",
          "podjamč",
          "podjemč",
          "podjar",
          "podjeb",
          "podjebrad",
          "podjed",
          "podjezič",
          "podjel",
          "podjen",
          "podjet",
          "pododjel",
          "pozavidje",
          "poludje",
          "poljodjel",
          "ponegdje",
          "ponedjelj",
          "porazdje",
          "posijedje",
          "posjedje",
          "postidje",
          "potpodjel",
          "poštedje",
          "pradjed",
          "prdje",
          "preblijedje",
          "previdje",
          "predvidje",
          "predjel",
          "preodjen",
          "preraspodje",
          "presjedje",
          "pridjev",
          "pridjen",
          "prismrdje",
          "prištedje",
          "probdje",
          "problijedje",
          "prodjen",
          "prolebdje",
          "prosijedje",
          "prosjedje",
          "protivdjel",
          "prošlonedje",
          "razvidje",
          "razdjev",
          "razdjel",
          "razdjelj",
          "razodje",
          "raspodje",
          "rasprdje",
          "remekdjel",
          "rudjeti",
          "sadjelj",
          "svagdje",
          "svidje",
          "svugdje",
          "sedmonedjelj",
          "sijedje",
          "sjedjelj",
          "sjedje",
          "smrdje",
          "snabdje",
          "snovidje",
          "starosjedje",
          "stidje",
          "studje",
          "sudjel",
          "tronedje",
          "ublijedje",
          "uvidje",
          "udjel",
          "udjen",
          "uprdje",
          "usidjel",
          "usjedje",
          "usmrdje",
          "uštedje",
          "cjelonedje",
          "četvoronedje",
          "čukundjed",
          "šestonedjelj",
          "štedje",
          "štogdje",
          "šukundjed",
        ],
        /*"dz": [
            "budzašto",
            "lindzi",
            "nadzemaljsk",
            "nadzemn",
            "nadzid",
            "nadzir",
            "nadznanj",
            "nadzor",
            "odzada",
            "odziv",
            "odzvanja",
            "odzvoni",
            "podzadaci",
            "podzadat",
            "podzakon",
            "podzakup",
            "podzemaljsk",
            "podzemlj",
            "podzemn",
            "podznaci",
            "podznak",
            "predzadnj",
            "predznaci",
            "predznak",
            "predznanje",
        ],*/
        "dž": [
          "feldžandarm",
          "nadždrel",
          "nadžet", "nadžanj", "nadžm", "nadžnj", "nadžeo", "nadžel",
          "nadživ",
          "nadžinj",
          "nadžnje",
          "nadžrec",
          "nadžup",
          "odžali",
          "odžari",
          "odžel",
          "odželj",
          "odžive",
          "odživljava",
          "odžubor",
          "odžvaka",
          "odžval",
          "podžanr",
          "podžel",
          "podže",
          "podžig",
          "podžiz",
          "podžil",
          "podžnje",
          "podžupan",
          "predželu",
          "predživot",
        ],
        "nj": [
            "anjon",
            "injekc",
            "injekt",
            "konjug",
            "konjunk",
            "nekonjug",
            "nekonjunk",
            "tanjug",
            "vanjezičk",
        ],
    };

    // See: https://en.wikipedia.org/wiki/Zero-width_non-joiner
    const digraphReplacements = {
        "dj": {
            "dj": "d\u200Cj",
            "Dj": "D\u200Cj",
            "DJ": "D\u200CJ",
        },
        /*"dz": {
            "dz": "d\u200Cz",
            "Dz": "D\u200Cz",
            "DZ": "D\u200CZ",
        },*/
        "dž": {
            "dž": "d\u200Cž",
            "Dž": "D\u200Cž",
            "DŽ": "D\u200CŽ",
        },
        "nj": {
            "nj": "n\u200Cj",
            "Nj": "N\u200Cj",
            "NJ": "N\u200CJ",
        }
    };

    function buildTrie(obj) {
        let trie = {};
        let currentNode;

        for (let key in obj) {
            currentNode = trie;

            for (let char of key) {
                currentNode[char] = currentNode[char] || {};
                currentNode = currentNode[char];
            }

            currentNode.value = obj[key];
        }

        return trie;
    }

    const trie = buildTrie(initialMap);
    console.log("Ћирилизатор - Caching and replacing text on page " + window.location.href);
    processText(document, 'cache-replace');

    // Parse DOM on change
    const observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {
            for (let node of mutation.addedNodes) {
                processText(node, !document.hidden && isEnabled ? 'cache-replace' : 'cache');
            }
        }
    });

    observer.observe(document, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
    });

    // Listen for messages from background script.
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.isEnabled === isEnabled) {
            return;
        }

        isEnabled = message.isEnabled;

        console.log("Ћирилизатор - Update status to " + (isEnabled ? "enabled" : "disabled") + " for " + window.location.href);
        processText(document, isEnabled ? 'replace' : 'restore');
    });

    // Recursively process text within descendent text nodes.
    function processText(parentNode, mode) {
        if (parentNode.nodeType === 3) {
            processTextNode(parentNode, mode);
        }

        if (/SCRIPT|STYLE/.test(parentNode.nodeName)) {
            return;
        }

        for (let node of parentNode.childNodes) {
            switch (node.nodeType) {
                case 1:    // Element node
                    processAttribute(node, 'title', mode);
                    processAttribute(node, 'placeholder', mode);

                case 11:   // Document fragment node
                    if (!/SCRIPT|STYLE/.test(node.nodeName)) {
                        processText(node, mode);
                    }

                    break;
                case 3:    // Text node
                    processTextNode(node, mode);
            }
        }
    }

    function processTextNode(node, mode) {
        if (mode === "cache") {
            node.originalText = node.nodeValue;
            return;
        }

        if (mode === "restore") {
            node.nodeValue = node.originalText;
            return;
        }

        if (mode === "cache-replace") {
            node.originalText = node.nodeValue;
        }

        let text = node.originalText || node.nodeValue;
        node.nodeValue = transliterate(text);
    }

    function processAttribute(node, attribute, mode) {
        if (node.getAttribute(attribute) === null) {
            return;
        }

        node.originalAttributes = node.originalAttributes || {};

        if (mode === "cache") {
            node.originalAttributes[attribute] = node.getAttribute(attribute);
            return;
        }

        if (mode === "restore") {
            node.setAttribute(attribute, node.originalAttributes[attribute]);
            return;
        }

        if (mode === "cache-replace") {
            node.originalAttributes[attribute] = node.getAttribute(attribute);
        }

        let text = node.originalAttributes[attribute] || node.getAttribute(attribute);
        node.setAttribute(attribute, transliterate(text));
    }

    function transliterate(text) {
        if (text.trim().length === 0) {
            return text;
        }

        let words = text.split(' ');

        for (let i = 0, length = words.length; i < length; i++) {
            if (!looksLikeForeignWord(words[i])) {
                words[i] = convertToCyrillic(words[i]);
            }
        }

        return words.join(' ');
    }

    function looksLikeForeignWord(word) {
        word = word.trim().toLowerCase();
        if (word === "") {
            return false;
        }

        if (wordStartsWith(word, serbianWordsWithForeignCharacterCombinations)) {
            return false;
        }

        if (wordInArray(word, foreignCharacterCombinations)) {
            return true;
        }

        if (wordStartsWith(word, commonForeignWords)) {
            return true;
        }

        return false;
    }

    function convertToCyrillic(str) {
        str = splitDigraphs(str);

        let result = '';

        for (let i = 0, length = str.length; i < length; i++) {
            if (!trie[str[i]]) {
                result += str[i];
                continue;
            }

            // Search trie
            let currentNode = trie[str[i]];
            let currentDepth = 0;
            let valueDepth = 0;
            let value = '';

            while (true) {
                if (currentNode.value) {
                    value = currentNode.value;
                    valueDepth = currentDepth;
                }

                if (currentNode[str[i + currentDepth + 1]]) {
                    currentDepth++;
                    currentNode = currentNode[str[i + currentDepth]];
                } else {
                    break;
                }
            }

            // Insert original text if match is incomplete
            result += value || str.substr(i, valueDepth + 1);
            i += valueDepth;
        }

        return result;
    }

    function splitDigraphs(str) {
        const lowercaseStr = str.trim().toLowerCase();

        for (const digraph in digraphExceptions) {
            if (!lowercaseStr.includes(digraph)) {
                continue;
            }

            for (const word of digraphExceptions[digraph]) {
                if (!lowercaseStr.startsWith(word)) {
                    continue;
                }

                // Split all possible occurrences, regardless of case.
                for (const key in digraphReplacements[digraph]) {
                    str = str.replace(key, digraphReplacements[digraph][key]);
                }

                break;
            }
        }

        return str;
    }

    function wordStartsWith(word, array) {
        for (let arrayWord of array) {
            if (word.startsWith(arrayWord)) {
                return true;
            }
        }

        return false;
    }

    function wordInArray(word, array) {
        for (let arrayWord of array) {
            if (word.includes(arrayWord)) {
                return true;
            }
        }

        return false;
    }
}
