if (window.contentScriptInjected !== true) {
    window.contentScriptInjected = true;

    var isEnabled = true;
    const initialMap = {
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
        "Lj": "Љ",
        "M": "М",
        "N": "Н",
        "NJ": "Њ",
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
        "DŽ": "Џ", // D + Z with caron
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
        "j": "ј",
        "k": "к",
        "l": "л",
        "lj": "љ",
        "m": "м",
        "n": "н",
        "nj": "њ",
        "o": "о",
        "p": "п",
        "r": "р",
        "s": "с",
        "t": "т",
        "ć": "ћ",
        "ć": "ћ", // c with acute accent
        "u": "у",
        "f": "ф",
        "h": "х",
        "c": "ц",
        "č": "ч",
        "č": "ч", // c with caron
        "dž": "џ",
        "dž": "џ", // d + z with caron
        "dz": "џ",
        "š": "ш",
        "š": "ш", // s with caron
    };

    const serbianWordsWithDoubleLetters = [
        "ddor",
        "dss",
        "dvadesettrog",
        "epp",
        "gss",
        "kss",
        "mmf",
        "poddres",
        "posttraum",
        "ptt",
        "sbb",
        "sssr",
        "tridesettrog",
    ];

    const commonForeignWords = [
        "administration",
        "adobe",
        "advanced",
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
        "cooking",
        "cool",
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
        "porsche",
        "postpaid",
        "printscreen",
        "procredit",
        "renault",
        "school",
        "share",
        "shop",
        "smartphone",
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

    const foreignCharacters = [
        'q',
        'w',
        'x',
        'y',
        '&',
        '@',
        '#',
        'bb',
        'cc',
        'dd',
        'ff',
        'gg',
        'kk',
        'll',
        'mm',
        'nn',
        'pp',
        'rr',
        'ss',
        'tt',
        'zz',
        '\'s',
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
            "izblijedjel",
            "nadjaha",
            "nadjača",
            "nadjunači",
            "nenadjačan",
            "odjah",
            "odjav",
            "odjaš",
            "odjeb",
            "odjeci",
            "odjed",
            "odjek",
            "odjel",
            "odjezd",
            "odjur",
            "podjamči",
            "podjar",
            "podjarmi",
            "podjednak",
            "podjel",
            "podjezič",
            "predjel",
            "razdjel",
            "udjel",
            "vindjakn",
            "zapodjen",
            "zdjel",
        ],
        "dz": [
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
        ],
        "dž": [
            "feldžandarmerij",
            "nadždrel",
            "nadžet",
            "nadživ",
            "nadživljava",
            "nadžnje",
            "nadžup",
            "odžali",
            "odžari",
            "odžive",
            "odživljava",
            "odžubor",
            "odžvaka",
            "podžanr",
            "podžnje",
            "podžupan",
            "predželuda",
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
        "dz": {
            "dz": "d\u200Cz",
            "Dz": "D\u200Cz",
            "DZ": "D\u200CZ",
        },
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

        for (var key in obj) {
            currentNode = trie;

            for (var char of key) {
                currentNode[char] = currentNode[char] || {};
                currentNode = currentNode[char];
            }

            currentNode.value = obj[key];
        }

        return trie;
    }

    var trie = buildTrie(initialMap);
    processText(document.body, 'cache-replace');
    console.log('Caching and replacing text on page');

    // Parse DOM on change
    const observer = new MutationObserver(mutations => {
        for (var mutation of mutations) {
            for (var node of mutation.addedNodes) {
                processText(node, !document.hidden && isEnabled ? 'cache-replace' : 'cache');
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
    });

    // Listen for messages from background script.
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.isEnabled === window.isEnabled) {
            console.log("State is unchanged, doing nothing");
            return;
        }

        console.log("Received message ", (message.isEnabled ? "enabled" : "disabled"));

        window.isEnabled = message.isEnabled;
        processText(document.body, isEnabled ? 'replace' : 'restore');
    });

    // Recursively process text within descendent text nodes.
    function processText(parentNode, mode) {
        for (var node of parentNode.childNodes) {
            switch (node.nodeType) {
                case 1:    // Element node
                case 11:   // Document fragment node
                    if (!/SCRIPT|STYLE/.test(node.nodeName)) {
                        processText(node, mode);
                    }

                    break;
                case 3:    // Text node
                    switch (mode) {
                        case 'cache':    // Cache text
                            node.originalText = node.nodeValue;
                            break;
                        case 'restore':    // Restore text
                            node.nodeValue = node.originalText;
                            break;
                        case 'cache-replace':    // Cache and replace text
                            node.originalText = node.nodeValue;
                        case 'replace':    // Replace text
                            let str = node.originalText || node.nodeValue;

                            node.nodeValue = convertNode(str);
                    }
            }
        }
    }

    function convertNode(str) {
        let words = str.split(' ');

        for (var i = 0, length = words.length; i < length; i++) {
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

        if (wordStartsWith(word, serbianWordsWithDoubleLetters)) {
            return false;
        }

        if (wordStartsWith(word, commonForeignWords)) {
            return true;
        }

        if (wordInArray(word, foreignCharacters)) {
            return true;
        }

        return false;
    }

    function convertToCyrillic(str) {
        str = splitDigraphs(str);

        let out = '';

        for (var i = 0, sLen = str.length; i < sLen; i++) {
            if (!trie[str[i]]) {
                out += str[i];
            } else {
                // Search trie
                let currentNode = trie[str[i]];
                let depth = 0;
                let result = '';
                while (true) {
                    if (currentNode.value) {
                        result = currentNode.value;
                    }

                    if (currentNode[str[i + depth + 1]]) {
                        currentNode = currentNode[str[i + ++depth]];
                    } else {
                        break;
                    }
                }
                // Insert original text if match is incomplete
                out += result || str.substr(i, depth + 1);
                i += depth;
            }
        }

        return out;
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
        for (var arrayWord of array) {
            if (word.includes(arrayWord)) {
                return true;
            }
        }

        return false;
    }
}
