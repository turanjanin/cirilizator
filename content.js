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
        "DJ": "Ђ",
        "Dj": "Ђ",
        "E": "Е",
        "Ž": "Ж",
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
        "U": "У",
        "F": "Ф",
        "H": "Х",
        "C": "Ц",
        "Č": "Ч",
        "DŽ": "Џ",
        "Dž": "Џ",
        "Dz": "Џ",
        "Š": "Ш",
        "a": "а",
        "b": "б",
        "v": "в",
        "g": "г",
        "d": "д",
        "đ": "ђ",
        "dj": "ђ",
        "e": "е",
        "ž": "ж",
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
        "u": "у",
        "f": "ф",
        "h": "х",
        "c": "ц",
        "č": "ч",
        "dž": "џ",
        "š": "ш",
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

        const exceptions = [
            "username",
            "password",
            "facebook",
            "viber",
            "login",
            "faq",
            "google",
            "maps",
            "feed",
            "share",
            "like",
            "subscribe",
            "e-mail",
            "email",
            "tech",
            "linkedin",
            "microsoft",
            "google",
            "iphone",
            "apple",
            "developer",
            "online",
            "english",
            "steam",
            "cookie",
            "chat",
            "shop"
        ];

        if (exceptions.includes(word)) {
            return true;
        }

        const characters = [
            'q',
            'w',
            'x',
            'y',
            '@',
            '#'
            'ee',
            'll',
            'tt',
            'gg',
            'rr',
            'ss',
            'ff',
            'pp',
            'oo',
            'cc',
            '.com',
            '.net',
            '.info',
            '.rs'
        ];

        for (var char of characters) {
            if (word.includes(char)) {
                return true;
            }
        }

        return false;
    }

    function convertToCyrillic(str) {
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
}
