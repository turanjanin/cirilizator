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
        "ǈ": "Љ",
        "M": "М",
        "N": "Н",
        "NJ": "Њ",
        "Ǌ": "Њ",
        "Nj": "Њ",
        "ǋ": "Њ",
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
        "ǅ": "Џ",
        "Dž": "Џ", // D + z with caron
        //"Dz": "Џ",
        "Š": "Ш",
        "Š": "Ш", // S with caron
        "a": "а",
        "æ": "ае",
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
    var fontAffectedSites = [
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

    var serbianWordsWithForeignCharacterCombinations = [
        "ammar",
        "amss",
        "aparthejd",
        "ddor",
        "dss",
        "dvadesettrog",
        "epp",
        "fss",
        "gss",
        "interreakc",
        "interresor",
        "izzzdiovns",
        "kss",
        "llsls",
        "mmf",
        "naddu",
        "natha",
        "natho",
        "ommetar",
        "penthaus",
        "poddirektor",
        "poddisciplin",
        "poddomen",
        "poddres",
        "posthumn",
        "posttrans",
        "posttraum",
        "pothodni",
        "pothranj",
        "preddijabetes",
        "prethod",
        "ptt",
        "sbb",
        "sdss",
        "ssp",
        "ssrnj",
        "sssr",
        "superračun",
        "tass",
        "transseks",
        "transsibir",
        "tridesettrog",
        "uppr",
        "vannastav",
    ];

    var commonForeignWords = [
        "administration",
        "adobe",
        "advanced",
        "advertising",
        "autocad",
        "bitcoin",
        "book",
        "boot",
        "cancel",
        "canon",
        "carlsberg",
        "cisco",
        "clio",
        "cloud",
        "coca-col",
        "cookie",
        "cooking",
        "cool",
        "covid",
        "dacia",
        "default",
        "develop",
        "e-mail",
        "edge",
        "email",
        "emoji",
        "english",
        "facebook",
        "fashion",
        "food",
        "foundation",
        "gaming",
        "gmail",
        "gmt",
        "good",
        "google",
        "hdmi",
        "image",
        "iphon",
        "ipod",
        "javascript",
        "jazeera",
        "joomla",
        "league",
        "like",
        "linkedin",
        "look",
        "macbook",
        "mail",
        "manager",
        "maps",
        "mastercard",
        "mercator",
        "microsoft",
        "mitsubishi",
        "notebook",
        "nvidia",
        "online",
        "outlook",
        "panasonic",
        "pdf",
        "peugeot",
        "podcast",
        "postpaid",
        "printscreen",
        "procredit",
        "project",
        "punk",
        "renault",
        "rock",
        "screenshot",
        "seen",
        "selfie",
        "share",
        "shift",
        "shop",
        "smartphone",
        "space",
        "steam",
        "stream",
        "subscrib",
        "tool",
        "topic",
        "trailer",
        "ufc",
        "unicredit",
        "username",
        "viber",
    ];

    var wholeForeignWords = [
        "air",
        "alpha",
        "and",
        "back",
        "bitcoin",
        "celebrities",
        "conditions",
        "co2",
        "cpu",
        "creative",
        "disclaimer",
        "dj",
        "electronics",
        "fresh",
        "fun",
        "geographic",
        "gmbh",
        "h2o",
        "hair",
        "have",
        "home",
        "ii",
        "iii",
        "idj",
        "idjtv",
        "life",
        "live",
        "login",
        "national",
        "made",
        "makeup",
        "must",
        "previous",
        "public",
        "reserved",
        "terms",
        "url",
        "vii",
        "viii",
        "visa",
    ];

    var foreignCharacterCombinations = [
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
        '.org',
        '©',
        '®',
        '™',
    ];

    var digraphExceptions = {
        "dj": [
            "adjektiv",
            "adjunkt",
            "bazdje",
            "bdje",
            "bezdje",
            "blijedje",
            "bludje",
            "bridjе",
            "vidjel",
            "vidjet",
            "vindjakn",
            "višenedje",
            "vrijedje",
            "gdje",
            "gudje",
            "gdjir",
            "daždje",
            "dvonedje",
            "devetonedje",
            "desetonedje",
            "djb",
            "djeva",
            "djevi",
            "djevo",
            "djed",
            "djejstv",
            "djel",
            "djenem",
            "djeneš",
            //"djene" rare (+ Дјене (town)), but it would colide with ђене-ђене, ђеневљанка, ђенерал итд.
            "djenu",
            "djet",
            "djec",
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
            "ludjel",
            "ludjet",
            "makfadjen",
            "marmadjuk",
            "međudjel",
            "nadjaha",
            "nadjača",
            "nadjeb",
            "nadjev",
            "nadjenul",
            "nadjenuo",
            "nadjenut",
            "negdje",
            "nedjel",
            "nadjunač",
            "nenadjača",
            "nenadjebi",
            "nenavidje",
            "neodje",
            "nepodjarm",
            "nerazdje",
            "nigdje",
            "obdjel",
            "obnevidje",
            "ovdje",
            "odjav",
            "odjah",
            "odjaš",
            "odjeb",
            "odjev",
            "odjed",
            "odjezd",
            "odjek",
            "odjel",
            "odjen",
            "odjeć",
            "odjec",
            "odjur",
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
            "podjakn",
            "podjamč",
            "podjastu",
            "podjemč",
            "podjar",
            "podjeb",
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
            "radjard",
            "razvidje",
            "razdjev",
            "razdjel",
            "razodje",
            "raspodje",
            "rasprdje",
            "remekdjel",
            "rudjen",
            "rudjet",
            "sadje",
            "svagdje",
            "svidje",
            "svugdje",
            "sedmonedjelj",
            "sijedje",
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
            "nadžanj",
            "nadždrel",
            "nadžel",
            "nadžeo",
            "nadžet",
            "nadživ",
            "nadžinj",
            "nadžnj",
            "nadžrec",
            "nadžup",
            "odžali",
            "odžari",
            "odžel",
            "odžive",
            "odživljava",
            "odžubor",
            "odžvaka",
            "odžval",
            "odžvać",
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
            "injaric",
            "injekc",
            "injekt",
            "injicira",
            "injurij",
            "kenjon",
            "konjug",
            "konjunk",
            "nekonjug",
            "nekonjunk",
            "ssrnj",
            "tanjug",
            "vanjezičk",
        ],
    };

    // See: https://en.wikipedia.org/wiki/Zero-width_non-joiner
    var digraphReplacements = {
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

    var trie = buildTrie(initialMap);
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
    function processText(node, mode) {
        if (/SCRIPT|STYLE/.test(node.nodeName)) {
            return;
        }

        if (node.nodeType === 3) {
            if (node.parentElement && !/SCRIPT|STYLE/.test(node.parentElement.nodeName)) {
                processTextNode(node, mode);
            }

            return;
        }

        for (let childNode of node.childNodes) {
            switch (childNode.nodeType) {
                case 1:    // Element node
                    processAttribute(childNode, 'title', mode);
                    processAttribute(childNode, 'placeholder', mode);

                    if (childNode.nodeName == "INPUT"
                        && childNode.attributes.getNamedItem("NAME") == null
                        && childNode.attributes.getNamedItem("TYPE") != null
                        && ["submit", "button"].some(elem => elem === childNode.attributes.getNamedItem("TYPE").value)) {

                            processAttribute(childNode, 'value', mode);
                    }

                case 11:   // Document fragment node
                    processText(childNode, mode);
                    break;

                case 3:    // Text node
                    processTextNode(childNode, mode);
            }
        }
    }

    function processTextNode(node, mode) {
        if (mode === "cache") {
            if (!node.originalText) {
                node.originalText = node.nodeValue;
            }
            return;
        }

        if (mode === "restore") {
            node.nodeValue = node.originalText;
            return;
        }

        if (mode === "cache-replace") {
            if (!node.originalText) {
                node.originalText = node.nodeValue;
            }
        }

        let text = node.originalText || node.nodeValue;
        node.nodeValue = textToCyrillic(text);
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
        node.setAttribute(attribute, textToCyrillic(text));
    }

    function textToCyrillic(text) {
        if (text.trim().length === 0) {
            return text;
        }

        let words = text.split(/(\s+)/);

        for (let i = 0, length = words.length; i < length; i++) {
            let index = transliterationIndexOfWordStartsWith(words[i], wholeForeignWords, "-");
            if (index >= 0) {
                words[i] = words[i].substring(0, index) + wordToCyrillic(words[i].substring(index));
            } else if (!looksLikeForeignWord(words[i])) {
                words[i] = wordToCyrillic(words[i]);
            }
        }

        return words.join('');
    }

    function looksLikeForeignWord(word) {
        trimmedWord = trimExcessiveCharacters(word);
        word = trimmedWord.toLowerCase();
        if (word === "") {
            return false;
        }

        if (wordStartsWith(word, serbianWordsWithForeignCharacterCombinations)) {
            return false;
        }

        if (wordContainsString(word, foreignCharacterCombinations)) {
            return true;
        }

        if (wordStartsWith(word, commonForeignWords)) {
            return true;
        }

        if (wordIsEqualTo(word, wholeForeignWords)) {
            return true;
        }

        if (wordContainsMeasurementUnit(trimmedWord)) {
            return true;
        }

        return false;
    }


    function wordToCyrillic(word) {
        word = splitDigraphs(word);

        let result = '';

        for (let i = 0, length = word.length; i < length; i++) {
            if (!trie[word[i]]) {
                result += word[i];
                continue;
            }

            // Search trie
            let currentNode = trie[word[i]];
            let currentDepth = 0;
            let valueDepth = 0;
            let value = '';

            while (true) {
                if (currentNode.value) {
                    value = currentNode.value;
                    valueDepth = currentDepth;
                }

                if (currentNode[word[i + currentDepth + 1]]) {
                    currentDepth++;
                    currentNode = currentNode[word[i + currentDepth]];
                } else {
                    break;
                }
            }

            // Insert original text if match is incomplete
            result += value || word.substr(i, valueDepth + 1);
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

    function wordContainsString(word, array) {
        for (let arrayWord of array) {
            if (word.includes(arrayWord)) {
                return true;
            }
        }

        return false;
    }

    function wordIsEqualTo(word, array) {
        for (let arrayWord of array) {
            if (word === arrayWord) {
                return true;
            }
        }

        return false;
    }

    function wordContainsMeasurementUnit(word) {
        const unitAdjacentToSth = "([zafpnμmcdhKMGTPEY]?([BVWJFSHCΩATNhlmg]|m[²³]|s[²]|cd|Pa|Wb|Hz))";
        const unitOptionalyAdjacentToSth = "(°[FC]|[kMGTPZY](B|Hz)|[pnμmcdhk]m[²³]?|m[²³]|[mcdkh][lg])";
        const number = "(\\d+([\.,]\\d)*)";
        const regExp = new RegExp("^("+ number + unitAdjacentToSth + ")|("
            + number + "?(" + unitOptionalyAdjacentToSth + "|" + unitAdjacentToSth + "/" + unitAdjacentToSth + "))$");

        if (word.match(regExp)) {
            return true;
        }

        return false;
    }

    /*
     * Retrieves index of the first character of the word that should be transliterated.
     * Function examines only words that have a root that is a foreign word, followed by
     * some separator character and remainder of the word which is in Serbian.
     * Example: dj-evi should be transliterated as dj-еви so the function retrieves 3.
     */
    function transliterationIndexOfWordStartsWith(word, array, charSeparator) {
        word = trimExcessiveCharacters(word).toLowerCase();
        if (word === "") {
            return -1;
        }

        let appendedForeignWords = array.map(el => el + charSeparator);

        for (let arrayWord of appendedForeignWords) {
            if (word.startsWith(arrayWord)) {
                return arrayWord.length;
            }
        }

        return -1;
    }

    /*
     * Trims white spaces and punctuation marks from the start and the end of the word.
     */
    function trimExcessiveCharacters(word) {
        const excessiveChars = "[\\s!?,:;.\*\\-—~`'\"„”“”‘’(){}\\[\\]<>«»\\/\\\\]";
        const regExp = new RegExp("^(" + excessiveChars + ")+|(" + excessiveChars + ")+$", "g");

        return word.replace(regExp, '');
    }

}
