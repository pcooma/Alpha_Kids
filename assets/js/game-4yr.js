'use strict';

/**
 * Alpha Kids Math Explorer - Universal Edition (En/Si)
 * Version: 2.1 (Consolidated)
 */

/* --- LOCALIZATION DATA & HELPER --- */
const STRINGS = {
    en: {
        app_title: "Alpha Kids<br><span class=\"highlight\">Math Explorer (Age 4+)</span>",
        parents: "Parents",
        stickers: "🎒 Stickers",
        start: "START",
        win_sticker: "Win: ",
        all_collected: "All Stickers Collected! 🏆",
        footer: "&copy; 2026 Alpha Kids Sri Lanka<br><span style=\"font-size: 0.8em;\">Version 2026.2.0</span>",
        game_count: "Counting",
        game_sort: "Sorting",
        game_odd: "Find Odd",
        game_pattern: "Patterns",
        game_compare: "Compare",
        game_add: "Addition",
        game_sub: "Subtraction",
        game_mem: "Memory Match",

        // Instructions
        instr_count: (target, name, emoji) => `Count the ${name} ${emoji}!`,
        instr_count_ask: (name, emoji) => `How many ${name} ${emoji} are there?`,
        instr_compare: "Which side has more? Tap the bigger group!",
        instr_pattern: "Complete the pattern! What comes next?",
        instr_odd: "Find the odd one out! Which one is different?",
        instr_sort: "Put them in the correct basket!",
        instr_add: (name, emoji) => `How many ${name} ${emoji} are there in total?`,
        instr_living_count: "How many beings are there?", // Fallback if needed
        instr_obj_count: "How many objects are there?", // Fallback if needed
        instr_sub: (n1, n2) => `You have ${n1}. Take away ${n2}. How many left?`,
        instr_mem: "Find the matching pairs! Tap two cards.",

        // Celebration
        praise: ["Awesome!", "Great!", "Super!", "Fantastic!", "Well Done!", "You Did It!", "Amazing!", "Good Job!"],
        new_sticker: "New Sticker!",

        // Gate
        gate_msg: "Parents Only<br>Press & Hold to Unlock",
        gate_hold: "HOLD (3s)",
        gate_cancel: "CANCEL",
        gate_title: "Parents Area",
        btn_settings: "Settings",
        btn_guide: "Guide",
        btn_reset: "RESET PROGRESS",
        btn_exit: "EXIT",
        btn_close: "CLOSE",
        progress_lbl: "Progress: ⭐",
        stickers_lbl: "Stickers: 🎁",
        reset_confirm: "Delete All Progress?",
        yes: "YES",
        no: "NO",

        // Baskets
        cat_ANIMALS: "Animals",
        cat_FOODS: "Foods",
        cat_VEHICLES: "Vehicles",
        cat_SHAPES: "Shapes",
        cat_NATURE: "Nature",

        // Guide Content
        guide_title: "Parents Guide",
        guide_aim_title: "Aim & Objectives",
        guide_aim_text: "The aim of this app is to improve mathematical knowledge, logical thinking, and eye, hand, ear, and brain coordination for children in Age 4+.",
        guide_usage_title: "How to Use",
        guide_usage_text: "We recommend playing this game with your child for 30 minutes a day. Engage with them, ask questions, and celebrate their success to maximize learning.",
        guide_precautions_title: "Precautions",
        guide_precautions_text: "Ensure the device is held at a safe distance from the eyes. Recommended to take breaks every 10-15 minutes. Always supervise your child while using the app.",
        guide_games_title: "Games & Variations",
        guide_games_text: "<ul><li><b>Counting:</b> Numbers 1-20 with normal, mixed, and skip counting (by 2s and 5s).</li><li><b>Sorting:</b> Living/Non-living categories and advanced 3-basket sorting.</li><li><b>Find Odd:</b> Category and visual differences in grids up to 3x3.</li><li><b>Patterns:</b> Complex sequences (AABB, ABC, ABBA, ABAC).</li><li><b>Compare:</b> Visual quantity comparison (1-20).</li><li><b>Addition:</b> Visual-based addition with sums up to 20.</li><li><b>Subtraction:</b> Taking away with visual aids (up to 20).</li><li><b>Memory Match:</b> Progressive grid sizes to strengthen recall.</li></ul>"

    },
    si: {
        app_title: "Alpha Kids<br><span class=\"highlight\">ගණිත ගවේෂක (වයස 4+)</span>",
        parents: "දෙමාපියන්ට",
        stickers: "🎒 ස්ටිකර්",
        start: "පටන් ගමු",
        win_sticker: "දිනාගන්න: ",
        all_collected: "ඔක්කොම ස්ටිකර් හරි! 🏆",
        footer: "&copy; 2026 Alpha Kids Sri Lanka<br><span style=\"font-size: 0.8em;\">Version 2026.2.0</span>",
        game_count: "ගණන් කරමු",
        game_sort: "වෙන් කරන්න",
        game_odd: "වෙනස් එක මොකක්ද?",
        game_pattern: "රටා හදමු",
        game_compare: "මොන කූඩයේද වැඩියෙන් තියෙන්නේ?",
        game_add: "එකතු කරමු",
        game_sub: "අඩු කරමු",
        game_mem: "මතක ශක්තිය",

        // Instructions
        instr_count: (target, name, emoji, isLiving) => isLiving ? `${emoji} කීදෙනෙක් ඉන්නවාද?` : `${emoji} කීයක් තියෙනවාද?`,
        instr_count_ask: (name, emoji, isLiving) => isLiving ? `${emoji} කීදෙනෙක් ද?` : `${emoji} කීයක් ද?`,
        instr_compare: "වැඩි පැත්ත තෝරන්න!",
        instr_pattern: "බලන්න, ඊළඟට එන්නේ මොකක්ද?",
        instr_odd: "වෙනස් එක මොකක්ද?",
        instr_sort: "හරි කූඩයට දාන්න!",
        instr_add: (name, emoji, isLiving) => isLiving ? `${emoji} ඔක්කොම කීදෙනක් ඉන්නවාද?` : `${emoji} එකතු කරලා කීයක් වෙනවාද?`,
        instr_living_count: "කීදෙනෙක් ඉන්නවාද?", // Specially requested
        instr_obj_count: "කීයක් තියෙනවාද?",     // Specially requested
        instr_sub: (n1, n2) => `${n1}න් ${n2}ක් අයින් කළාම කීයක් ඉතුරුද?`,
        instr_mem: "ගැලපෙන ජෝඩු සොයන්න!",

        // Celebration
        praise: ["හරි හොඳයි!", "සුපිරි!", "නියමයි!", "හරියටම හරි!", "ගොඩක් හොඳයි!", "ෂෝක්!", "අපූරුයි!", "වාව්!"],
        new_sticker: "ඔන්න තවත් ස්ටිකරයක්!",

        // Gate
        gate_msg: "දෙමාපියන්ට පමණි<br>විවෘත කිරීමට ඔබා අල්ලාගෙන සිටින්න",
        gate_hold: "ඔබාගෙන සිටින්න (3s)",
        gate_cancel: "අවලංගු කරන්න",
        gate_title: "දෙමාපිය අංශය",
        btn_settings: "සැකසුම්",
        btn_guide: "භාවිත උපදෙස්",
        btn_reset: "මුල සිට පටන් ගන්න",
        btn_exit: "ඉවත් වන්න",
        btn_close: "වසන්න",
        progress_lbl: "ප්‍රගතිය: ⭐",
        stickers_lbl: "ස්ටිකර්: 🎁",
        reset_confirm: "ඔක්කොම මකන්නද?",
        yes: "ඔව්",
        no: "එපා",

        // Baskets
        cat_ANIMALS: "සතුන්",
        cat_FOODS: "කෑම",
        cat_VEHICLES: "වාහන",
        cat_SHAPES: "හැඩතල",
        cat_NATURE: "ස්වභාවික",

        // Guide Content
        guide_title: "දෙමාපිය උපදෙස්",
        guide_aim_title: "අරමුණ සහ ඉලක්ක",
        guide_aim_text: "මෙම යෙදුමේ අරමුණ වයස 4+ දරුවන්ගේ ගණිත දැනුම, තර්කන හැකියාව සහ අත, ඇස, කන සහ මොළය අතර සම්බන්ධීකරණය දියුණු කිරීමයි.",
        guide_usage_title: "භාවිතා කරන ආකාරය",
        guide_usage_text: "දිනකට විනාඩි 30ක් ඔබේ දරුවා සමඟ මෙම ක්‍රීඩාවේ නිරත වන්න. ඔවුන්ට ප්‍රශ්න අසන්න, උදව් කරන්න සහ ඔවුන් දිනන විට අගය කරන්න.",
        guide_precautions_title: "පූර්වෝපායන්",
        guide_precautions_text: "දුරකථනය දරුවාගේ ඇස් වලට සුදුසු දුරකින් තබාගන්න. සෑම විනාඩි 10-15 කට වරක් විවේකයක් ලබා දෙන්න. සැමවිටම දරුවා ගැන අවධානයෙන් සිටින්න.",
        guide_games_title: "ක්‍රීඩා සහ වෙනස්කම්",
        guide_games_text: "<ul><li><b>ගණන් කිරීම:</b> 1-20 දක්වා සාමාන්‍ය, මිශ්‍ර සහ මඟහැර ගණන් ක්‍රම (2, 5 බැගින්).</li><li><b>වෙන් කිරීම:</b> සජීවී/අජීවී වර්ගීකරණය සහ සංකීර්ණ 3-කූඩ වර්ග කිරීම.</li><li><b>වෙනස් දේ සෙවීම:</b> 3x3 දක්වා ජාලවල වර්ග සහ දෘශ්‍ය වෙනස්කම්.</li><li><b>රටා:</b> සංකීර්ණ රටා (AABB, ABC, ABBA, ABAC).</li><li><b>සංසන්දනය:</b> දෘශ්‍ය ප්‍රමාණ සංසන්දනය (1-20).</li><li><b>එකතු කිරීම:</b> රූප ආධාරයෙන් 20 දක්වා එකතු කිරීම.</li><li><b>අඩු කිරීම:</b> රූප ආධාරයෙන් 20 දක්වා අඩු කිරීම.</li><li><b>මතක ශක්තිය:</b> සමප්‍රමාණික ජෝඩු සෙවීමෙන් මතකය වර්ධනය කිරීම.</li></ul>"
    }
};

const LANG = window.currentLang || 'en'; // Global config
const TXT = STRINGS[LANG];

// Apply language class to body for CSS scoping
if (document.body) {
    document.body.classList.add('lang-' + LANG);
} else {
    window.addEventListener('DOMContentLoaded', () => document.body.classList.add('lang-' + LANG));
}

// Pluralize helper for English
function pluralize(word) {
    if (LANG === 'si') return word; // Sinhala doesn't plurals in this context usually
    const irregulars = {
        'mouse': 'mice', 'goose': 'geese', 'child': 'children', 'person': 'people', 'man': 'men',
        'woman': 'women', 'foot': 'feet', 'tooth': 'teeth', 'sheep': 'sheep', 'fish': 'fish', 'deer': 'deer'
    };
    if (irregulars[word.toLowerCase()]) return irregulars[word.toLowerCase()];
    // Basic rules
    if (word.endsWith('s') || word.endsWith('sh') || word.endsWith('ch') || word.endsWith('x') || word.endsWith('z')) return word + 'es';
    if (word.endsWith('y') && !/[aeiou]y/.test(word)) return word.slice(0, -1) + 'ies';
    return word + 's';
}

/* --- CORE: Emoji Bank (Bilingual) --- */
class EmojiBank {
    static ANIMALS = [
        { char: "🐶", en: "dog", si: "බල්ලා" }, { char: "🐱", en: "cat", si: "පූසා" }, { char: "🐭", en: "mouse", si: "මීයා" },
        { char: "🐹", en: "hamster", si: "හැම්ස්ටර්" }, { char: "🐰", en: "rabbit", si: "හාවා" }, { char: "🦊", en: "fox", si: "නරියා" },
        { char: "🐻", en: "bear", si: "වලසා" }, { char: "🐼", en: "panda", si: "පැන්ඩා" }, { char: "🐨", en: "koala", si: "කෝලා" },
        { char: "🐯", en: "tiger", si: "කොටියා" }, { char: "🦁", en: "lion", si: "සිංහයා" }, { char: "🐮", en: "cow", si: "ගවයා" },
        { char: "🐷", en: "pig", si: "ඌරා" }, { char: "🐸", en: "frog", si: "ගෙම්බා" }, { char: "🐵", en: "monkey", si: "වඳුරා" },
        { char: "🐔", en: "chicken", si: "කුකුළා" }, { char: "🐧", en: "penguin", si: "පෙන්ගුයින්" }, { char: "🐦", en: "bird", si: "කුරුල්ලා" },
        { char: "🐤", en: "chick", si: "පැටව්" }, { char: "🦆", en: "duck", si: "තාරාවා" }, { char: "🦅", en: "eagle", si: "රාජාලියා" },
        { char: "🦉", en: "owl", si: "බකමූණා" }, { char: "🐝", en: "bee", si: "මීමැස්සා" }, { char: "🐛", en: "caterpillar", si: "කැදැල්ලා" },
        { char: "🦋", en: "butterfly", si: "සමනලයා" }, { char: "🐞", en: "ladybug", si: "කුරුමිණියා" }, { char: "🐢", en: "turtle", si: "ඉබ්බා" },
        { char: "🐍", en: "snake", si: "සර්පයා" }, { char: "🐙", en: "octopus", si: "බූවල්ලා" }, { char: "🐠", en: "fish", si: "මාළුවා" },
        { char: "🐬", en: "dolphin", si: "ඩොල්ෆින්" }, { char: "🐳", en: "whale", si: "තල්මසා" }, { char: "🐊", en: "crocodile", si: "කිඹුලා" },
        { char: "🐘", en: "elephant", si: "අලියා" }, { char: "🦒", en: "giraffe", si: "ජිරාෆ්" }, { char: "🦓", en: "zebra", si: "සීබ්රා" },
        { char: "🦚", en: "peacock", si: "මොණරා" }, { char: "🦜", en: "parrot", si: "ගිරවා" }
    ];

    static FOODS = [
        { char: "🍏", en: "apple", si: "ඇපල්" }, { char: "🍎", en: "apple", si: "ඇපල්" }, { char: "🍐", en: "pear", si: "පේර" },
        { char: "🍊", en: "orange", si: "දොඩම්" }, { char: "🍋", en: "lemon", si: "ලෙමන්" }, { char: "🍌", en: "banana", si: "කෙසෙල්" },
        { char: "🍉", en: "watermelon", si: "කොමඩු" }, { char: "🍇", en: "grapes", si: "මිදි" }, { char: "🍓", en: "strawberry", si: "ස්ට්රෝබෙරි" },
        { char: "🍒", en: "cherries", si: "චෙරි" }, { char: "🍑", en: "peach", si: "පීච්" }, { char: "🍍", en: "pineapple", si: "අන්නාසි" },
        { char: "🥝", en: "kiwi", si: "කිවි" }, { char: "🍅", en: "tomato", si: "තක්කාලි" }, { char: "🌽", en: "corn", si: "බඩඉරිඟු" },
        { char: "🥕", en: "carrot", si: "කැරට්" }, { char: "🍞", en: "bread", si: "පාන්" }, { char: "🧀", en: "cheese", si: "චීස්" },
        { char: "🥚", en: "egg", si: "බිත්තර" }, { char: "🍕", en: "pizza", si: "පීසා" }, { char: "🍦", en: "ice cream", si: "අයිස්ක්රීම්" },
        { char: "🍪", en: "cookie", si: "කුකී" }, { char: "🍩", en: "donut", si: "ඩෝනට්" }, { char: "🍫", en: "chocolate", si: "චොකලට්" },
        { char: "🥭", en: "mango", si: "අඹ" }, { char: "🥥", en: "coconut", si: "පොල්" }, { char: "🍈", en: "papaya", si: "පැපොල්" },
        { char: "🍚", en: "rice", si: "බත්" }, { char: "🍛", en: "curry", si: "කරි" }
    ];

    static VEHICLES = [
        { char: "🚗", en: "car", si: "කාරය" }, { char: "🚕", en: "taxi", si: "ටැක්සිය" }, { char: "🚙", en: "suv", si: "ජීප්" },
        { char: "🚌", en: "bus", si: "බස් රථය" }, { char: "🚓", en: "police car", si: "පොලිස් රථය" }, { char: "🚑", en: "ambulance", si: "ගිලන්රථය" },
        { char: "🚒", en: "fire truck", si: "ගිනි නිවන රථය" }, { char: "🚚", en: "truck", si: "ට්රක් රථය" }, { char: "🚜", en: "tractor", si: "ට්රැක්ටරය" },
        { char: "🚲", en: "bicycle", si: "බයිසිකලය" }, { char: "🚂", en: "train", si: "දුම්රිය" }, { char: "🚁", en: "helicopter", si: "හෙලිකොප්ටරය" },
        { char: "✈️", en: "airplane", si: "ගුවන් යානය" }, { char: "🚀", en: "rocket", si: "රොකට්ටුව" }, { char: "⛵", en: "boat", si: "බෝට්ටුව" },
        { char: "🛺", en: "tuk tuk", si: "ත්‍රී වීලරය" }, { char: "🏍️", en: "motorcycle", si: "මෝටර් බයිකය" }
    ];

    static SHAPES = [
        { char: "🔴", en: "red circle", si: "රතු කවය" }, { char: "🔵", en: "blue circle", si: "නිල් කවය" },
        { char: "🟢", en: "green circle", si: "කොළ කවය" }, { char: "🟡", en: "yellow circle", si: "කහ කවය" },
        { char: "🟠", en: "orange circle", si: "තැඹිලි කවය" }, { char: "🟣", en: "purple circle", si: "ජම්බු කවය" },
        { char: "🟥", en: "red square", si: "රතු සතරැස" }, { char: "🟦", en: "blue square", si: "නිල් සතරැස" },
        { char: "🟩", en: "green square", si: "කොළ සතරැස" }, { char: "🟨", en: "yellow square", si: "කහ සතරැස" },
        { char: "🔺", en: "red triangle", si: "රතු ත්‍රිකෝණය" }, { char: "⭐", en: "star", si: "තරුව" },
        { char: "💛", en: "yellow heart", si: "කහ හදවත" }, { char: "💚", en: "green heart", si: "කොළ හදවත" },
        { char: "💙", en: "blue heart", si: "නිල් හදවත" }, { char: "💜", en: "purple heart", si: "ජම්බු හදවත" },
        { char: "💠", en: "diamond", si: "දියමන්ති" }
    ];

    static NATURE = [
        { char: "🌸", en: "flower", si: "මල" }, { char: "🌹", en: "rose", si: "රෝස මල" },
        { char: "🌺", en: "hibiscus", si: "සපත්තු මල" }, { char: "🌻", en: "sunflower", si: "සූරියකාන්ත මල" },
        { char: "🌳", en: "tree", si: "ගස" }, { char: "🌴", en: "palm tree", si: "පෙති ගස" },
        { char: "🌵", en: "cactus", si: "කැක්ටස්" }, { char: "🍄", en: "mushroom", si: "බිම්මල" },
        { char: "🌞", en: "sun", si: "හිරු" }, { char: "🌝", en: "moon", si: "සඳ" },
        { char: "⭐", en: "star", si: "තරුව" }, { char: "☁️", en: "cloud", si: "වලාකුළ" },
        { char: "🌈", en: "rainbow", si: "දේදුන්න" }, { char: "🔥", en: "fire", si: "ගින්දර" },
        { char: "💧", en: "water drop", si: "ජල බිංදුව" }, { char: "❄️", en: "snowflake", si: "හිම පියලි" }
    ];

    static getAllCategories() {
        return ['ANIMALS', 'FOODS', 'VEHICLES', 'SHAPES', 'NATURE'];
    }

    static getRandom(category = 'ANIMALS') {
        const arr = this[category] || this.ANIMALS;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    static getRandomSet(category, count) {
        const arr = [...(this[category] || this.ANIMALS)];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.slice(0, count);
    }

    static isLiving(char) {
        return this.ANIMALS.some(a => a.char === char);
    }

    static getNumberWord(num) {
        const SINHALA_NUMBERS = {
            1: "එක", 2: "දෙක", 3: "තුන", 4: "හතර", 5: "පහ",
            6: "හය", 7: "හත", 8: "අට", 9: "නවය", 10: "දහය",
            11: "එකොළහ", 12: "දොළහ", 13: "දහතුන", 14: "දහහතර", 15: "පහළොව",
            16: "දහසය", 17: "දහහත", 18: "දහඅට", 19: "දහනවය", 20: "විස්ස"
        };
        if (LANG === 'si') return SINHALA_NUMBERS[num] || String(num);
        return String(num);
    }

    static getName(item) {
        return item[LANG] || item.en;
    }

    static getItemsNotInCategory(category, count) {
        const allCats = this.getAllCategories().filter(c => c !== category);
        const otherItems = [];
        allCats.forEach(c => otherItems.push(...this[c]));
        // Shuffle
        for (let i = otherItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [otherItems[i], otherItems[j]] = [otherItems[j], otherItems[i]];
        }
        return otherItems.slice(0, count);
    }
}

/* --- CORE: Store (Language Segregated) --- */
class Store {
    constructor() {
        this.listeners = new Set();
        this.storageKey = `alpha-kids-${LANG}-v2`; // Separate progress for En/Si
        this.state = this.loadState() || this.getDefaultState();
    }

    getDefaultState() {
        return {
            settings: { isMuted: false },
            progress: { correctAnswers: 0, level: 1, stickers: [] },
            session: { streak: 0 }
        };
    }

    loadState() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || null;
        } catch (e) { return null; }
    }

    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.state));
        } catch (e) { /* ignore */ }
    }

    update(updater) {
        const oldState = JSON.parse(JSON.stringify(this.state));
        if (typeof updater === 'function') updater(this.state);
        this.save();
        this.notify(oldState);
    }

    notify(oldState) {
        for (const listener of this.listeners) listener(this.state, oldState);
    }

    unlockSticker(emojiChar) {
        if (!this.state.progress.stickers.includes(emojiChar)) {
            this.update(s => s.progress.stickers.push(emojiChar));
            return true;
        }
        // Fallback: Substitute
        const all = ['ANIMALS', 'FOODS', 'VEHICLES', 'SHAPES', 'NATURE'];
        let unowned = [];
        for (const cat of all) {
            EmojiBank[cat].forEach(item => {
                if (!this.state.progress.stickers.includes(item.char)) unowned.push(item.char);
            });
        }
        if (unowned.length > 0) {
            const lucky = unowned[Math.floor(Math.random() * unowned.length)];
            this.update(s => s.progress.stickers.push(lucky));
            return true;
        }
        return false;
    }
}

/* --- CORE: Audio Manager --- */
class AudioManager {
    constructor(store) {
        this.store = store;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
    }
    resume() {
        if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => { });
    }
    attachUnlocker() {
        const unlock = () => {
            this.resume();
            if (this.ctx.state === 'running') {
                ['click', 'touchstart', 'keydown'].forEach(e => document.removeEventListener(e, unlock));
            }
        };
        ['click', 'touchstart', 'keydown'].forEach(e => document.addEventListener(e, unlock, { passive: true }));
    }
    playTone(freq, type = 'sine', duration = 0.1) {
        if (this.store.state.settings.isMuted) return;
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
    playSfx(key) {
        const now = this.ctx.currentTime;
        if (this.lastSfx === key && now - this.lastSfxTime < 0.1) return;
        this.lastSfx = key; this.lastSfxTime = now;

        if (key === 'correct') {
            this.playTone(600, 'sine', 0.1); setTimeout(() => this.playTone(800, 'sine', 0.2), 100);
        } else if (key === 'wrong') {
            this.playTone(150, 'triangle', 0.1);
        } else if (key === 'pop') {
            this.playTone(400, 'sine', 0.05);
        } else if (key === 'win') {
            [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, i) => setTimeout(() => this.playTone(f, 'sine', 0.2), i * 150));
        }
    }
    speak(text) {
        if (this.store.state.settings.isMuted) return;

        // Strip emojis for better speech (Universal cleanup)
        // Ranges include standard emojis, symbols, and dingbats often used as emojis
        const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{2934}\u{2935}]/gu, '').trim();

        // Sinhala TTS check
        if (LANG === 'si') {
            const voices = window.speechSynthesis.getVoices();
            const sinhalaVoice = voices.find(v => v.lang.includes('si'));
            if (sinhalaVoice) {
                const u = new SpeechSynthesisUtterance(cleanText);
                u.voice = sinhalaVoice;
                u.lang = 'si-LK';
                u.rate = 0.9;
                window.speechSynthesis.speak(u);
                return;
            }
            return;
        }

        // English TTS
        const u = new SpeechSynthesisUtterance(cleanText);
        u.pitch = 1.2; u.rate = 0.9;
        window.speechSynthesis.speak(u);
    }
}

/* --- CORE: Child UX Helper (Safety Fixed) --- */
class ChildUXHelper {
    constructor(scene) {
        this.scene = scene;
        this.idleTimer = null;
        this.hintElement = null;
        this.startIdleTimer();
        this.resetHandler = () => this.resetTimer();
        document.addEventListener('pointerdown', this.resetHandler);
    }
    startIdleTimer() {
        if (this.idleTimer) clearTimeout(this.idleTimer);
        this.removeHint();
        this.idleTimer = setTimeout(() => this.showHint(), 4000); // 4s wait
    }
    resetTimer() {
        if (this.idleTimer) clearTimeout(this.idleTimer);
        this.removeHint();
        this.idleTimer = setTimeout(() => this.showHint(), 4000);
    }
    showHint() {
        if (!this.scene.getCorrectTarget) return;
        const target = this.scene.getCorrectTarget();
        // Safety check: target must exist and be in DOM
        if (!target || !document.body.contains(target)) return;

        target.classList.add('pulse'); // Add pulse effect

        const rect = target.getBoundingClientRect();
        this.hintElement = document.createElement('div');
        this.hintElement.className = 'hand-pointer';
        this.hintElement.innerHTML = '👆';
        this.hintElement.style.position = 'fixed';
        this.hintElement.style.left = (rect.left + rect.width / 2) + 'px';
        this.hintElement.style.top = (rect.top + rect.height / 2) + 'px';
        this.hintElement.style.fontSize = '4rem';
        this.hintElement.style.zIndex = '1000';
        this.hintElement.style.pointerEvents = 'none';
        this.hintElement.style.animation = 'point-click 1s infinite';
        document.body.appendChild(this.hintElement);
        this.currentTarget = target; // Track current target to remove pulse later
    }
    removeHint() {
        if (this.hintElement) { this.hintElement.remove(); this.hintElement = null; }
        if (this.currentTarget) {
            this.currentTarget.classList.remove('pulse');
            this.currentTarget = null;
        }
    }
    destroy() {
        if (this.idleTimer) clearTimeout(this.idleTimer);
        this.removeHint();
        document.removeEventListener('pointerdown', this.resetHandler);
    }
}

/* --- CORE: Drag Helper --- */
class DragHelper {
    static makeDraggable(element, onDrop) {
        let isDragging = false, startX, startY, initialLeft, initialTop;
        element.style.touchAction = 'none'; element.style.cursor = 'grab';

        const onStart = (e) => {
            if (e.target !== element && !element.contains(e.target)) return;
            isDragging = true;
            element.hasMoved = false; // Reset move flag
            /* Capture start position */
            startX = e.touches ? e.touches[0].clientX : e.clientX;
            startY = e.touches ? e.touches[0].clientY : e.clientY;

            element.style.cursor = 'grabbing'; element.style.zIndex = 1000;
            element.classList.add('dragging');
            document.body.style.overflow = 'hidden'; document.body.style.touchAction = 'none';
            const rect = element.getBoundingClientRect();
            initialLeft = rect.left; initialTop = rect.top;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            this.updatePosition(element, clientX, clientY, true);

            // Attach window listeners only during drag (prevents global leak)
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onEnd);
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('touchend', onEnd);

            e.preventDefault();
        };

        const onMove = (e) => {
            if (!isDragging) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            // Detect movement threshold to differentiate click vs drag
            if (Math.hypot(clientX - startX, clientY - startY) > 5) {
                element.hasMoved = true;
            }
            this.updatePosition(element, clientX, clientY, true);
        };

        const onEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            element.style.cursor = 'grab'; element.style.zIndex = 'auto';
            element.classList.remove('dragging');
            document.body.style.overflow = ''; document.body.style.touchAction = '';

            // Remove window listeners
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);

            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dropped = onDrop(centerX, centerY, element);

            if (!dropped) {
                element.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                element.style.left = initialLeft + 'px'; element.style.top = initialTop + 'px';
                element.style.transform = 'none';
                setTimeout(() => {
                    element.style.position = ''; element.style.transition = '';
                    element.style.width = ''; element.style.height = '';
                    element.style.left = ''; element.style.top = ''; element.style.transform = '';
                }, 500);
            }
        };

        element.addEventListener('mousedown', onStart);
        element.addEventListener('touchstart', onStart, { passive: false });

        // Prevent click if dragged
        element.addEventListener('click', (e) => {
            if (element.hasMoved) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    }

    static updatePosition(element, x, y, useOffset = false) {
        element.style.position = 'fixed';
        const rect = element.getBoundingClientRect();
        let targetX = x - (rect.width / 2);
        let targetY = y - (rect.height / 2);
        if (useOffset) targetY -= 70;

        // Boundary Checks
        const viewport = { w: window.innerWidth, h: window.innerHeight };
        targetX = Math.max(0, Math.min(targetX, viewport.w - rect.width));
        targetY = Math.max(0, Math.min(targetY, viewport.h - rect.height));

        element.style.left = targetX + 'px';
        element.style.top = targetY + 'px';
    }
}

/* --- CORE: Game Generator --- */
class GameGenerator {
    static generateLevel(difficulty, forcedMode = null) {
        let modes = ['COUNT', 'FIND_ODD', 'SORT', 'PATTERN', 'COMPARE', 'ADD', 'SUBTRACT', 'MEMORY'];
        let mode = forcedMode;
        if (!mode || mode === 'RANDOM') {
            let available = ['COUNT', 'FIND_ODD'];
            if (difficulty > 2) available.push('SORT');
            if (difficulty > 4) available.push('PATTERN', 'COMPARE');
            if (difficulty > 5) available.push('ADD', 'SUBTRACT');
            if (difficulty > 6) available.push('MEMORY');
            mode = available[Math.floor(Math.random() * available.length)];
        }
        const maxNum = Math.min(5 + Math.floor(difficulty * 1.5), 20); // Slower ramp up: 6, 8, 9, 11...
        const minNum = 1;

        // Variations logic with enhanced difficulty scaling
        let variation = 'normal';
        let skipBy = null; // For skip counting
        let gridSize = 4; // For find odd game

        if (mode === 'COUNT') {
            const r = Math.random();
            if (difficulty >= 5 && r < 0.25) {
                variation = 'skip_count';
                skipBy = r < 0.15 ? 2 : 5; // Count by 2s or 5s
            } else if (r < 0.5) {
                variation = 'mixed';
            } else {
                variation = 'normal';
            }
        }
        if (mode === 'PATTERN') {
            const r = Math.random();
            if (r < 0.2) variation = 'abab';
            else if (r < 0.4) variation = 'aabb';
            else if (r < 0.6) variation = 'abc';
            else if (r < 0.8) variation = 'abba';
            else variation = 'abac';
        }
        if (mode === 'FIND_ODD') {
            const r = Math.random();
            variation = r > 0.5 ? 'category' : 'visual';
            // Progressive grid size based on difficulty
            if (difficulty < 3) gridSize = 4;       // 2x2
            else if (difficulty < 6) gridSize = 6;  // 2x3
            else gridSize = 9;                       // 3x3
        }
        if (mode === 'SORT') {
            const r = Math.random();
            if (difficulty >= 5 && r < 0.33) {
                variation = 'three_basket'; // 3 categories
            } else if (r < 0.5) {
                variation = 'living';
            } else {
                variation = 'category';
            }
        }

        return {
            mode,
            variation,
            difficulty,
            range: [minNum, maxNum],
            target: Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum,
            skipBy,
            gridSize
        };
    }

    static getMemoryGridSize(difficulty) {
        if (difficulty < 4) return 4; // 2x2
        if (difficulty < 7) return 6; // 2x3
        return 8; // 2x4 or 4x2
    }

}


/* --- SCENES & ACTIVITIES --- */

class Scene {
    constructor(app, props = {}) {
        this.app = app;
        this.props = props;
        this.element = document.createElement('div');
        this.element.className = 'scene full-screen flex-center';
        this.cleanup = [];
    }

    onDestory() {
        this.cleanup.forEach(fn => fn());
        this.element.remove();
    }

    fireConfetti() {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        for (let i = 0; i < 30; i++) {
            const el = document.createElement('div');
            el.className = 'confetti-particle';
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.left = Math.random() * 100 + 'vw';
            el.style.top = '-20px';
            el.style.transform = `rotate(${Math.random() * 360}deg)`;
            const duration = Math.random() * 2 + 1;
            el.style.animation = `fall ${duration}s linear forwards`;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), duration * 1000);
        }
    }
}

class StickerScene extends Scene {
    constructor(app) {
        super(app);
        this.render();
    }
    render() {
        const stickers = this.app.store.state.progress.stickers;
        this.element.innerHTML = `
            <div class="sticker-book full-screen flex-center column">
                <div class="sticker-header">
                    <h1>${TXT.stickers}</h1>
                    <button id="btn-back" class="btn-icon">🏠</button>
                </div>
                <div class="sticker-grid">
                    ${stickers.length > 0
                ? stickers.map(s => `<div class="sticker-item animate-pop">${s}</div>`).join('')
                : `<div class="empty-msg">${TXT.start}</div>`}
                </div>
            </div>
        `;
        this.element.querySelector('#btn-back').onclick = () => {
            this.app.audio.playSfx('pop');
            this.app.router.go(TitleScene);
        };
    }
}

class ParentsGate {
    constructor(app, onUnlock) {
        this.app = app;
        this.onUnlock = onUnlock;
        this.holdTimer = null;
        this.holdDuration = 3000;
    }
    show() {
        const overlay = document.createElement('div');
        overlay.className = 'parents-gate animate-pop';
        overlay.innerHTML = `
            <div class="gate-msg">${TXT.gate_msg}</div>
            <div class="gate-actions column">
                <button id="btn-hold" class="btn-giant gate-hold-btn">${TXT.gate_hold}</button>
                <div class="progress-bar-container"><div id="hold-progress" class="progress-bar-fill"></div></div>
                <button class="gate-btn btn-cancel" style="margin-top:20px">${TXT.gate_cancel}</button>
            </div>
        `;
        const holdBtn = overlay.querySelector('#btn-hold');
        const progress = overlay.querySelector('#hold-progress');

        const startHold = (e) => {
            e.preventDefault();
            holdBtn.classList.add('holding');
            progress.style.transition = `width ${this.holdDuration}ms linear`;
            progress.style.width = '100%';
            this.holdTimer = setTimeout(() => {
                this.app.audio.playSfx('correct');
                overlay.remove();
                this.onUnlock();
            }, this.holdDuration);
        };
        const endHold = (e) => {
            e.preventDefault();
            if (this.holdTimer) { clearTimeout(this.holdTimer); this.holdTimer = null; }
            holdBtn.classList.remove('holding');
            progress.style.transition = 'width 0.2s';
            progress.style.width = '0%';
        };
        holdBtn.addEventListener('mousedown', startHold);
        holdBtn.addEventListener('touchstart', startHold);
        holdBtn.addEventListener('mouseup', endHold);
        holdBtn.addEventListener('mouseleave', endHold);
        holdBtn.addEventListener('touchend', endHold);
        holdBtn.addEventListener('touchcancel', endHold);
        overlay.querySelector('.btn-cancel').onclick = () => overlay.remove();
        document.body.appendChild(overlay);
    }
}

class TitleScene extends Scene {
    constructor(app) {
        super(app);
        this.games = [
            { id: 'DOT_FLASH', label: TXT.game_count, icon: '1️⃣', mode: 'COUNT', color: 'tile-red' },
            { id: 'HUNGRY_DOG', label: TXT.game_sort, icon: '🧺', mode: 'SORT', color: 'tile-orange' },
            { id: 'HIDE_FIND', label: TXT.game_odd, icon: '🔎', mode: 'FIND_ODD', color: 'tile-green' },
            { id: 'BUILDER', label: TXT.game_pattern, icon: '🧩', mode: 'PATTERN', color: 'tile-blue' },
            { id: 'TRAIN', label: TXT.game_compare, icon: '⚖️', mode: 'COMPARE', color: 'tile-purple' },
            { id: 'STORY_ADD', label: TXT.game_add, icon: '➕', mode: 'ADD', color: 'tile-blue' },
            { id: 'SUB_GAME', label: TXT.game_sub, icon: '➖', mode: 'SUBTRACT', color: 'tile-orange' },
            { id: 'MEM_GAME', label: TXT.game_mem, icon: '🧠', mode: 'MEMORY', color: 'tile-green' }
        ];
        this.render();
    }
    render() {
        this.element.innerHTML = `
            <div class="top-bar">
                <div style="display:flex; gap:15px;">
                    <button id="btn-exit" class="btn-nav" style="border-color:#FFCDD2; background:#FFEBEE; color:#D32F2F;">✖ ${TXT.btn_exit}</button>
                    <button id="btn-parents" class="btn-nav"><span class="icon-lock">🔒</span> ${TXT.parents}</button>
                </div>
                <button id="btn-stickers" class="btn-nav">${TXT.stickers}</button>
            </div>
            <div class="title-container text-center animate-pop">
                <img src="assets/logo.png" alt="Logo" style="max-width: 14vmin; margin-bottom: 2vmin; margin-left: auto; margin-right: auto; display: block; border-radius: 50%;">
                <h1 class="game-title">${TXT.app_title}</h1>
                <div id="btn-daily" class="daily-adventure-card">
                    <span class="rocket-icon">🚀</span>
                    <div class="cta-text">${TXT.start}</div>
                    <div id="sticker-preview" style="font-size: 1.5rem; color: #555; margin-top: 5px;"></div>
                </div>
                <div style="margin-top: 25px; font-size: 0.9rem; color: #5D4037; opacity: 0.8; line-height: 1.5;">${TXT.footer}</div>
            </div>
            <div class="carousel-strip">
                <div class="carousel-arrow" id="scroll-left">◀</div>
                <div class="carousel-track" id="track">
                    ${this.games.map(g => `<div class="game-tile ${g.color}" data-id="${g.id}"><span class="tile-icon">${g.icon}</span><span class="tile-label">${g.label}</span></div>`).join('')}
                </div>
                <div class="carousel-arrow" id="scroll-right">▶</div>
            </div>
        `;

        this.updateStickerPreview();

        this.element.querySelector('#btn-stickers').onclick = () => { this.app.audio.playSfx('pop'); this.app.router.go(StickerScene); };
        this.element.querySelector('#btn-parents').onclick = () => {
            this.app.audio.playSfx('pop');
            new ParentsGate(this.app, () => this.showParentSettings()).show();
        };
        this.element.querySelector('#btn-exit').onclick = () => {
            this.app.audio.playSfx('pop');
            location.href = 'launch-4yr.html';
        };
        this.element.querySelector('#btn-daily').onclick = () => {
            this.app.audio.playSfx('win');
            this.app.router.go(GameScene, { mode: 'RANDOM' });
        };

        const track = this.element.querySelector('#track');
        this.element.querySelector('#scroll-left').onclick = () => track.scrollBy({ left: -200, behavior: 'smooth' });
        this.element.querySelector('#scroll-right').onclick = () => track.scrollBy({ left: 200, behavior: 'smooth' });

        this.element.querySelectorAll('.game-tile').forEach(tile => {
            tile.onclick = () => {
                const gameId = tile.dataset.id;
                const gameConfig = this.games.find(g => g.id === gameId);
                tile.classList.add('selected');
                this.app.audio.playSfx('pop');
                setTimeout(() => this.app.router.go(GameScene, { mode: gameConfig.mode }), 300);
            };
        });
    }

    updateStickerPreview() {
        const stickers = this.app.store.state.progress.stickers;
        const allCategories = EmojiBank.getAllCategories();
        let unowned = [];
        for (const cat of allCategories) {
            EmojiBank[cat].forEach(item => { if (!stickers.includes(item.char)) unowned.push(item.char); });
        }
        const previewEl = this.element.querySelector('#sticker-preview');
        if (unowned.length > 0) {
            const previewSticker = unowned[Math.floor(Math.random() * unowned.length)];
            previewEl.innerHTML = `${TXT.win_sticker}<span class="animate-pulse" style="display:inline-block">${previewSticker}</span>`;
        } else {
            previewEl.innerHTML = TXT.all_collected;
        }
    }

    showParentSettings() {
        // Simplified settings for brevity
        const overlay = document.createElement('div');
        overlay.className = 'parents-gate animate-pop';
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        overlay.style.color = '#333';
        overlay.innerHTML = `
            <div class="gate-msg" style="color:#333">${TXT.gate_title}</div>
            <div class="gate-actions column">
                <div style="font-size:1.5rem; margin-bottom:20px">
                    ${TXT.progress_lbl} ${this.app.store.state.progress.correctAnswers} <br>
                    ${TXT.stickers_lbl} ${this.app.store.state.progress.stickers.length}
                </div>
                <button id="btn-guide-open" class="btn-giant" style="background:#2196F3; border-color:#1976D2; font-size:1.5rem; margin-bottom: 10px;">${TXT.btn_guide}</button>
                <button id="btn-reset" class="btn-giant" style="background:#F44336; border-color:#d32f2f; font-size:1.5rem">${TXT.btn_reset}</button>
                <button id="btn-close" class="gate-btn btn-confirm" style="margin-top:20px">${TXT.btn_close}</button>
            </div>
        `;
        overlay.querySelector('#btn-guide-open').onclick = () => {
            overlay.remove(); // Close settings to open guide
            this.showGuide();
        };
        overlay.querySelector('#btn-reset').onclick = () => {
            if (confirm(TXT.reset_confirm)) {
                localStorage.removeItem(this.app.store.storageKey);
                location.reload();
            }
        };
        overlay.querySelector('#btn-close').onclick = () => overlay.remove();
        document.body.appendChild(overlay);
    }

    showGuide() {
        const overlay = document.createElement('div');
        overlay.className = 'parents-gate animate-pop';
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        overlay.style.color = '#333';
        overlay.style.overflowY = 'auto';
        overlay.style.display = 'block'; // Ensure block display for scrolling

        overlay.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #E91E63; text-align: center; margin-bottom: 30px;">${TXT.guide_title}</h1>
                
                <section style="margin-bottom: 30px;">
                    <h2 style="color: #3F51B5; border-bottom: 2px solid #ddd; padding-bottom: 10px;">${TXT.guide_aim_title}</h2>
                    <p style="font-size: 1.2rem; line-height: 1.6;">${TXT.guide_aim_text}</p>
                </section>

                <section style="margin-bottom: 30px;">
                    <h2 style="color: #009688; border-bottom: 2px solid #ddd; padding-bottom: 10px;">${TXT.guide_usage_title}</h2>
                    <p style="font-size: 1.2rem; line-height: 1.6;">${TXT.guide_usage_text}</p>
                </section>

                <section style="margin-bottom: 30px;">
                    <h2 style="color: #FF9800; border-bottom: 2px solid #ddd; padding-bottom: 10px;">${TXT.guide_precautions_title}</h2>
                    <div style="background: #FFF3E0; padding: 15px; border-radius: 8px; border-left: 5px solid #FF9800;">
                        <p style="font-size: 1.2rem; line-height: 1.6; margin: 0;">${TXT.guide_precautions_text}</p>
                    </div>
                </section>

                <section style="margin-bottom: 30px;">
                    <h2 style="color: #9C27B0; border-bottom: 2px solid #ddd; padding-bottom: 10px;">${TXT.guide_games_title}</h2>
                    <div style="font-size: 1.2rem; line-height: 1.6; padding-left: 20px;">
                        ${TXT.guide_games_text}
                    </div>
                </section>

                <div style="text-align: center; margin-top: 40px;">
                    <button id="btn-guide-close" class="btn-giant" style="background: #4CAF50; border-color: #388E3C;">${TXT.btn_close}</button>
                </div>
                
                <div style="margin-top: 40px; text-align: center; border-top: 1px solid #eee; padding-top: 20px; font-size: 0.9rem; color: #777;">
                    ${TXT.footer}
                </div>
            </div>
        `;

        overlay.querySelector('#btn-guide-close').onclick = () => {
            overlay.remove();
            this.showParentSettings(); // Re-open settings when guide is closed
        };

        document.body.appendChild(overlay);
    }
}

class SplashScreen {
    constructor(onDismiss) { this.onDismiss = onDismiss; this.render(); }
    render() {
        this.element = document.createElement('div');
        this.element.className = 'splash-screen full-screen flex-center';
        this.element.style.background = 'white';
        this.element.style.zIndex = '2000';
        this.element.style.flexDirection = 'column';
        this.element.innerHTML = `
            <img src="assets/splash.png" alt="Welcome" style="max-width: 90%; max-height: 60%; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <button id="btn-start-app" class="btn-giant pulse" style="margin-top: 30px; background: #FF9800; border-color: #fff; font-size: 3rem;">
                PLAY ▶
            </button>
        `;
        this.element.querySelector('#btn-start-app').onclick = (e) => {
            e.stopPropagation();
            this.dismiss();
        };
        document.body.appendChild(this.element);
    }
    dismiss() {
        this.element.style.transition = 'opacity 0.5s';
        this.element.style.opacity = '0';
        setTimeout(() => { this.element.remove(); this.onDismiss(); }, 500);
    }
}


class GameScene extends Scene {
    constructor(app, props = {}) {
        super(app);
        this.currentMode = props.mode;
        this.levelData = GameGenerator.generateLevel(this.app.store.state.progress.level, this.currentMode);
        this.score = 0;
        this.correctTargetElement = null;
        this.render();
        this.startLevel();
        this.uxHelper = new ChildUXHelper(this);
        this.cleanup.push(() => this.uxHelper.destroy());
    }

    getCorrectTarget() { return this.correctTargetElement; }

    render() {
        this.element.innerHTML = `
            <div class="game-header">
                <button id="btn-home" class="btn-icon">🏠</button>
                <div class="spacer" style="flex:1"></div>
                <button id="btn-replay" class="btn-icon" style="margin-right:10px">🔊</button>
                <div class="level-indicator" style="opacity:1">⭐ ${this.app.store.state.progress.correctAnswers}</div>
            </div>
            <div id="game-viewport" class="game-viewport"></div>
            <div id="feedback-overlay" class="feedback-overlay"></div>
        `;
        this.element.querySelector('#btn-home').onclick = () => this.app.router.go(TitleScene);
        this.element.querySelector('#btn-replay').onclick = () => {
            this.app.audio.speak(this.instructionText); // Cached text
            this.element.querySelector('#btn-replay').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 300 });
        };
        this.viewport = this.element.querySelector('#game-viewport');
    }

    startLevel() {
        this.viewport.innerHTML = '';
        this.viewport.className = 'game-viewport ' + this.levelData.mode.toLowerCase();
        this.correctTargetElement = null;
        if (this.uxHelper) this.uxHelper.startIdleTimer();

        switch (this.levelData.mode) {
            case 'COUNT': this.setupCountGame(); break;
            case 'COMPARE': this.setupCompareGame(); break;
            case 'PATTERN': this.setupPatternGame(); break;
            case 'FIND_ODD': this.setupFindOddGame(); break;
            case 'SORT': this.setupSortGame(); break;
            case 'ADD': this.setupAddGame(); break;
            case 'SUBTRACT': this.setupSubtractGame(); break;
            case 'MEMORY': this.setupMemoryGame(); break;
            default: this.setupCountGame();
        }
    }

    setInstruction(text) {
        this.instructionText = text;
        // Toast removed per user feedback (redundant with main instruction)
        this.app.audio.speak(text);
    }

    /* --- GAME MODES --- */

    setupAddGame() {
        const n1 = Math.floor(Math.random() * 5) + 1;
        const n2 = Math.floor(Math.random() * 5) + 1;
        const sum = n1 + n2;
        const emoji = EmojiBank.getRandom();
        const itemName = EmojiBank.getName(emoji);
        const namePlural = pluralize(itemName);

        const container = document.createElement('div');
        container.className = 'add-game flex-center column';
        container.style.gap = '20px';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        const isLiving = EmojiBank.isLiving(emoji.char);
        instructionDiv.innerText = TXT.instr_add(namePlural, emoji.char, isLiving);
        this.setInstruction(instructionDiv.innerText);
        container.appendChild(instructionDiv);

        const equationDiv = document.createElement('div');
        equationDiv.className = 'flex-center';
        equationDiv.style.fontSize = '4rem';
        equationDiv.style.fontWeight = 'bold';

        const group = (n) => `<div class="group-box">${Array(n).fill(emoji.char).join('')}</div>`;
        equationDiv.innerHTML = `${group(n1)} + ${group(n2)} = <span id="q-mark">?</span>`;
        container.appendChild(equationDiv);

        const style = document.createElement('style');
        // Prevent overflow with flex-wrap and smaller font if needed
        style.innerHTML = `
            .group-box { 
                background: rgba(255,255,255,0.5); 
                padding: 2px 5px; 
                border-radius: 8px;  
                margin: 0 5px; 
                display:flex; 
                flex-wrap:wrap; 
                max-width: 40vw;
                justify-content:center;
            }
            .add-game .flex-center {
                flex-wrap: wrap; 
            }
        `;
        container.appendChild(style);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row';
        let options = [sum];
        while (options.length < 3) {
            let r = Math.floor(Math.random() * 5) + 2;
            if (r !== sum && !options.includes(r)) options.push(r);
        }
        options.sort((a, b) => a - b).forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-tile option';
            btn.innerText = opt;
            btn.onclick = () => {
                if (opt === sum) {
                    this.element.querySelector('#q-mark').innerText = sum;
                    this.checkAnswer(true, btn);
                } else this.checkAnswer(false, btn);
            };
            if (opt === sum) this.correctTargetElement = btn;
            optionsDiv.appendChild(btn);
        });
        container.appendChild(optionsDiv);
        this.viewport.appendChild(container);
    }

    setupCountGame() {
        const { target, variation, skipBy } = this.levelData;
        const emoji = EmojiBank.getRandom();
        const itemName = EmojiBank.getName(emoji);
        const itemPlural = pluralize(itemName);

        const container = document.createElement('div');
        container.className = 'count-container flex-center';

        const instruction = document.createElement('div');
        instruction.className = 'instruction-sub';

        // Initial instruction based on variation
        const isLiving = EmojiBank.isLiving(emoji.char);
        let initText;

        if (variation === 'skip_count' && skipBy) {
            // Skip counting instruction
            const skipText = LANG === 'si'
                ? `${skipBy} බැගින් ගණන් කරන්න! ${emoji.char}`
                : `Count by ${skipBy}s! ${emoji.char}`;
            initText = skipText;
        } else {
            initText = TXT.instr_count(target, itemPlural, emoji.char, isLiving);
        }

        // Sinhala specific request: living vs non-living
        if (LANG === 'si') {
            // Redundant check removed as logic is now in STRINGS.si
            // Keeping distinct logic just in case variation needs it later, but using new instruction format
            if (variation === 'mixed') {
                // For mixed games, specify the item name or just use emoji (user prefers emoji)
                // Keeping it consistent with STRINGS.si
            }
        }

        instruction.innerText = initText;
        this.setInstruction(initText);
        container.appendChild(instruction);

        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'items-grid';
        let counted = 0;
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row hidden';

        // Calculate items for skip counting
        const actualTarget = variation === 'skip_count' && skipBy ? Math.ceil(target / skipBy) * skipBy : target;
        const itemCount = variation === 'skip_count' && skipBy ? actualTarget / skipBy : target;

        // Prepare items list
        let itemsList = [];
        // Add targets
        for (let i = 0; i < itemCount; i++) itemsList.push({ ...emoji, isTarget: true });

        // Add distractors if mixed
        if (variation === 'mixed') {
            const distractorCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 distractors
            let distractor;
            // Ensure distractor is different
            do { distractor = EmojiBank.getRandom(); } while (distractor.char === emoji.char);

            for (let i = 0; i < distractorCount; i++) itemsList.push({ ...distractor, isTarget: false });

            // Shuffle
            for (let i = itemsList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [itemsList[i], itemsList[j]] = [itemsList[j], itemsList[i]];
            }
        }

        itemsList.forEach((itemData, idx) => {
            const item = document.createElement('div');
            item.className = 'game-item animate-drop';
            item.innerText = itemData.char;
            item.onclick = () => {
                if (item.classList.contains('counted')) return;

                if (!itemData.isTarget) {
                    this.app.audio.playSfx('wrong');
                    item.animate([
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(5px)' },
                        { transform: 'translateX(-5px)' },
                        { transform: 'translateX(0)' }
                    ], { duration: 200 });
                    return;
                }

                this.app.audio.playSfx('pop');
                counted++;

                // Speak the count (skip count or normal)
                const spokenNumber = variation === 'skip_count' && skipBy
                    ? counted * skipBy
                    : counted;
                this.app.audio.speak(EmojiBank.getNumberWord ? EmojiBank.getNumberWord(spokenNumber) : String(spokenNumber));

                item.classList.add('counted');
                item.style.opacity = '1'; item.style.filter = 'none';
                item.style.transform = 'scale(1.2)';
                item.style.border = '4px solid #4CAF50'; // Visual feedback
                setTimeout(() => item.style.transform = 'scale(1)', 200);

                const nextItem = Array.from(itemsDiv.children).find((el, i) => itemsList[i].isTarget && !el.classList.contains('counted'));
                if (nextItem) {
                    this.correctTargetElement = nextItem;
                    // Reset idle timer to guide to next item
                    if (this.uxHelper) this.uxHelper.resetTimer();
                }

                if (counted === itemCount) {
                    this.app.audio.playSfx('correct');
                    optionsDiv.classList.remove('hidden');
                    optionsDiv.classList.add('animate-pop');

                    const finalAnswer = variation === 'skip_count' && skipBy ? itemCount * skipBy : target;
                    const askText = variation === 'skip_count' && skipBy
                        ? (LANG === 'si' ? `මුළු ගණන කීයක්ද?` : `What's the total?`)
                        : TXT.instr_count_ask(itemPlural, emoji.char, isLiving);
                    instruction.innerText = askText;
                    this.setInstruction(askText);

                    const correctBtn = Array.from(optionsDiv.children).find(b => parseInt(b.innerText) === finalAnswer);
                    if (correctBtn) this.correctTargetElement = correctBtn;
                }
            };
            itemsDiv.appendChild(item);
        });

        const firstTargetIdx = itemsList.findIndex(x => x.isTarget);
        if (firstTargetIdx >= 0) this.correctTargetElement = itemsDiv.children[firstTargetIdx];

        // Generate answer options
        const finalAnswer = variation === 'skip_count' && skipBy ? itemCount * skipBy : target;
        let options = [finalAnswer];
        while (options.length < 3) {
            // Ensure n is always valid logic, handling small target numbers
            let minVal = Math.max(1, finalAnswer - (skipBy || 2));
            let n = Math.floor(Math.random() * 10) + minVal;
            if (n > 0 && !options.includes(n)) options.push(n);
        }
        options.sort((a, b) => a - b).forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'btn-tile option';
            btn.innerText = num;
            btn.onclick = () => this.checkAnswer(num === finalAnswer, btn);
            optionsDiv.appendChild(btn);
        });
        container.appendChild(itemsDiv); container.appendChild(optionsDiv);
        this.viewport.appendChild(container);
    }

    setupCompareGame() {
        const maxCount = Math.min(10, 3 + Math.floor(this.levelData.difficulty * 0.8)); // Scale: 3-10 based on difficulty
        const leftCount = Math.floor(Math.random() * maxCount) + 1;
        let rightCount;
        do { rightCount = Math.floor(Math.random() * maxCount) + 1; } while (rightCount === leftCount);

        const container = document.createElement('div');
        container.className = 'compare-container';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_compare;
        this.setInstruction(TXT.instr_compare);

        const wrapper = document.createElement('div');
        wrapper.className = 'flex-center column';
        wrapper.style.width = '100%';
        wrapper.appendChild(instructionDiv);
        wrapper.appendChild(container);

        const createSide = (count, emoji, isLeft) => {
            const side = document.createElement('div');
            side.className = 'compare-side';
            const grid = document.createElement('div');
            grid.className = 'mini-grid four-year';
            for (let i = 0; i < count; i++) grid.innerHTML += `<div class="mini-item">${emoji.char}</div>`;
            side.appendChild(grid);
            side.onclick = () => {
                const isCorrect = isLeft ? leftCount > rightCount : rightCount > leftCount;
                this.checkAnswer(isCorrect, side);
            };
            return side;
        };
        const leftSide = createSide(leftCount, EmojiBank.getRandom(), true);
        const rightSide = createSide(rightCount, EmojiBank.getRandom(), false);
        container.appendChild(leftSide); container.appendChild(rightSide);
        this.correctTargetElement = (leftCount > rightCount) ? leftSide : rightSide;
        this.viewport.appendChild(wrapper);
    }

    setupPatternGame() {
        const { variation } = this.levelData;
        let e1 = EmojiBank.getRandom();
        let e2, e3;
        do { e2 = EmojiBank.getRandom(); } while (e2.char === e1.char);

        let sequence = [];
        let nextItem;

        if (variation === 'aabb') {
            sequence = [e1, e1, e2, e2, e1];
            nextItem = e1;
        } else if (variation === 'abc') {
            do { e3 = EmojiBank.getRandom(); } while (e3.char === e1.char || e3.char === e2.char);
            sequence = [e1, e2, e3, e1, e2];
            nextItem = e3;
        } else if (variation === 'abac') {
            do { e3 = EmojiBank.getRandom(); } while (e3.char === e1.char || e3.char === e2.char);
            sequence = [e1, e2, e1, e3, e1];
            nextItem = e2;
        } else if (variation === 'abba') {
            // Symmetry pattern: A B B A ?
            // After ABBA, the next logical item is A (starting a new cycle)
            sequence = [e1, e2, e2, e1];
            nextItem = e1; // New ABBA cycle starts with A
        } else {
            sequence = [e1, e2, e1, e2, e1];
            nextItem = e2;
        }

        const container = document.createElement('div');
        container.className = 'pattern-container flex-center column';
        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_pattern;
        this.setInstruction(TXT.instr_pattern);
        container.appendChild(instructionDiv);

        const seqDiv = document.createElement('div');
        seqDiv.className = 'sequence-row';
        sequence.forEach(e => seqDiv.innerHTML += `<div class="seq-item">${e.char}</div>`);

        const dropZone = document.createElement('div');
        dropZone.className = 'seq-item question drop-zone';
        dropZone.innerText = '?';
        dropZone.onclick = () => this.app.audio.playSfx('pop');
        seqDiv.appendChild(dropZone);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row';

        let distractors = [nextItem, EmojiBank.getRandom()];
        if (e3 && Math.random() > 0.5) distractors[1] = e3;
        else if (Math.random() > 0.5) distractors[1] = variation === 'aabb' ? e2 : e1;

        while (distractors[1].char === nextItem.char) distractors[1] = EmojiBank.getRandom();

        distractors.sort(() => Math.random() - 0.5);

        distractors.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'btn-tile option draggable';
            btn.innerText = opt.char;

            DragHelper.makeDraggable(btn, (x, y, el) => {
                const rect = dropZone.getBoundingClientRect();
                if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
                    if (opt.char === nextItem.char) {
                        this.checkAnswer(true);
                        dropZone.innerText = opt.char; dropZone.style.background = '#fff'; dropZone.style.border = 'none';
                        el.remove(); return true;
                    } else {
                        this.app.audio.playSfx('wrong'); return false;
                    }
                }
                return false;
            });
            if (opt.char === nextItem.char) this.correctTargetElement = btn;

            btn.onclick = () => {
                if (opt.char === nextItem.char) {
                    this.checkAnswer(true);
                    dropZone.innerText = opt.char; dropZone.style.background = '#fff'; dropZone.style.border = 'none';
                    btn.remove();
                } else {
                    this.app.audio.playSfx('wrong');
                    btn.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(-10px)' }, { transform: 'translateX(0)' }], { duration: 200 });
                }
            };
            optionsDiv.appendChild(btn);
        });
        container.appendChild(seqDiv); container.appendChild(optionsDiv);
        this.viewport.appendChild(container);
    }

    setupFindOddGame() {
        const { variation, gridSize } = this.levelData;

        let gridItems = [];
        let oddIdx = -1;
        const total = gridSize || 9; // Default to 9 if not specified

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_odd;
        this.setInstruction(TXT.instr_odd);
        this.viewport.appendChild(instructionDiv);

        const grid = document.createElement('div');
        grid.className = 'odd-grid four-year';

        // Set grid columns based on total items
        if (total <= 4) {
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            grid.classList.add('grid-small');
        } else if (total <= 6) {
            grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            grid.classList.add('grid-medium');
        } else {
            grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            grid.classList.add('grid-large');
        }

        if (variation === 'category') {
            const cats = EmojiBank.getAllCategories();
            const mainCat = cats[Math.floor(Math.random() * cats.length)];
            const mainCount = Math.max(2, total - 1);
            const mainItems = EmojiBank.getRandomSet(mainCat, mainCount);
            const otherItems = EmojiBank.getItemsNotInCategory(mainCat, 1);
            const oddItemData = otherItems[0];

            gridItems = [...mainItems, oddItemData];
            // Shuffle
            for (let i = gridItems.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [gridItems[i], gridItems[j]] = [gridItems[j], gridItems[i]];
            }
            oddIdx = gridItems.indexOf(oddItemData);
        } else {
            const main = EmojiBank.getRandom();
            let odd;
            do { odd = EmojiBank.getRandom(); } while (odd.char === main.char);
            oddIdx = Math.floor(Math.random() * total);
            for (let i = 0; i < total; i++) gridItems.push(i === oddIdx ? odd : main);
        }

        gridItems.forEach((itemData, i) => {
            const item = document.createElement('div');
            item.className = 'grid-item';
            item.innerText = itemData.char;
            item.onclick = () => this.checkAnswer(i === oddIdx, item);
            if (i === oddIdx) this.correctTargetElement = item;
            grid.appendChild(item);
        });
        this.viewport.appendChild(grid);
    }

    setupSortGame() {
        const { variation } = this.levelData;
        const allCats = EmojiBank.getAllCategories();

        let cat1, cat2, cat3;
        let b1Label, b2Label, b3Label;
        let icon1, icon2, icon3;
        const isThreeBasket = variation === 'three_basket';

        if (variation === 'three_basket') {
            // Randomize 3 categories
            const cats = [];
            while (cats.length < 3) {
                const c = allCats[Math.floor(Math.random() * allCats.length)];
                if (!cats.includes(c)) cats.push(c);
            }
            [cat1, cat2, cat3] = cats;
            b1Label = TXT['cat_' + cat1];
            b2Label = TXT['cat_' + cat2];
            b3Label = TXT['cat_' + cat3];
            icon1 = EmojiBank[cat1][0].char;
            icon2 = EmojiBank[cat2][0].char;
            icon3 = EmojiBank[cat3][0].char;
        } else if (variation === 'living') {
            cat1 = 'ANIMALS';
            cat2 = 'FOODS';
            b1Label = TXT.cat_ANIMALS;
            b2Label = LANG === 'si' ? 'දේවල්' : 'Objects';
            icon1 = '🐶';
            icon2 = '🍎';
        } else {
            const cats = [];
            while (cats.length < 2) {
                const c = allCats[Math.floor(Math.random() * allCats.length)];
                if (!cats.includes(c)) cats.push(c);
            }
            [cat1, cat2] = cats;
            b1Label = TXT['cat_' + cat1];
            b2Label = TXT['cat_' + cat2];
            icon1 = EmojiBank[cat1][0].char;
            icon2 = EmojiBank[cat2][0].char;
        }

        let allItems = [];
        if (variation === 'three_basket') {
            // 2 items from each category = 6 items total
            const c1Items = EmojiBank.getRandomSet(cat1, 2);
            const c2Items = EmojiBank.getRandomSet(cat2, 2);
            const c3Items = EmojiBank.getRandomSet(cat3, 2);
            allItems = [...c1Items, ...c2Items, ...c3Items].sort(() => Math.random() - 0.5);
        } else if (variation === 'living') {
            const animals = EmojiBank.getRandomSet('ANIMALS', 2);
            const food = EmojiBank.getRandom('FOODS');
            const vehicle = EmojiBank.getRandom('VEHICLES');
            allItems = [...animals, food, vehicle].sort(() => Math.random() - 0.5);
        } else {
            const c1Items = EmojiBank.getRandomSet(cat1, 2);
            const c2Items = EmojiBank.getRandomSet(cat2, 2);
            allItems = [...c1Items, ...c2Items].sort(() => Math.random() - 0.5);
        }

        const container = document.createElement('div');
        container.className = 'sort-game';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_sort;
        this.setInstruction(TXT.instr_sort);
        container.appendChild(instructionDiv);

        const basketsRow = document.createElement('div');
        basketsRow.className = isThreeBasket ? 'baskets-row three-baskets' : 'baskets-row';
        const createBasket = (id, label, icon) => {
            const b = document.createElement('div');
            b.id = id; b.className = 'basket';
            b.innerHTML = `${icon}<br>${label}`;
            return b;
        };
        const b1 = createBasket('basket-1', b1Label, icon1);
        const b2 = createBasket('basket-2', b2Label, icon2);
        basketsRow.appendChild(b1); basketsRow.appendChild(b2);

        let b3 = null;
        if (isThreeBasket) {
            b3 = createBasket('basket-3', b3Label, icon3);
            basketsRow.appendChild(b3);
        }

        const itemsRow = document.createElement('div');
        itemsRow.className = 'items-pool';
        let remaining = allItems.length;

        allItems.forEach((item, idx) => {
            const el = document.createElement('div');
            el.className = 'sort-item draggable';
            el.innerText = item.char;

            let itemCategory = '1';
            if (isThreeBasket) {
                // Determine which category the item belongs to
                if (EmojiBank[cat1].some(e => e.char === item.char)) itemCategory = '1';
                else if (EmojiBank[cat2].some(e => e.char === item.char)) itemCategory = '2';
                else if (EmojiBank[cat3].some(e => e.char === item.char)) itemCategory = '3';
            } else if (variation === 'living') {
                itemCategory = EmojiBank.isLiving(item.char) ? '1' : '2';
            } else {
                itemCategory = EmojiBank[cat1].some(e => e.char === item.char) ? '1' : '2';
            }

            el.dataset.type = itemCategory;
            if (idx === 0) this.correctTargetElement = el;

            DragHelper.makeDraggable(el, (x, y, draggedEl) => {
                const r1 = b1.getBoundingClientRect();
                const r2 = b2.getBoundingClientRect();
                const r3 = b3 ? b3.getBoundingClientRect() : null;
                const distTo = (rect) => Math.hypot(x - (rect.left + rect.width / 2), y - (rect.top + rect.height / 2));
                const threshold = 150;
                let targetBasket = null;

                if (distTo(r1) < threshold) targetBasket = '1';
                else if (distTo(r2) < threshold) targetBasket = '2';
                else if (r3 && distTo(r3) < threshold) targetBasket = '3';

                if (targetBasket && el.dataset.type === targetBasket) {
                    this.fireConfetti();
                    this.app.audio.playSfx('correct');
                    draggedEl.remove();
                    remaining--;
                    setTimeout(() => {
                        if (remaining > 0) {
                            const nextEl = this.viewport.querySelector('.sort-item');
                            if (nextEl) this.correctTargetElement = nextEl;
                        }
                    }, 100);
                    if (remaining === 0) this.checkAnswer(true);
                    return true;
                } else if (targetBasket) {
                    this.app.audio.playSfx('wrong');
                    return false;
                }
                return false;
            });

            el.onclick = () => {
                const type = el.dataset.type;
                let correctBasket = b1;
                if (type === '2') correctBasket = b2;
                else if (type === '3' && b3) correctBasket = b3;

                const targetRect = correctBasket.getBoundingClientRect();
                el.style.transition = 'all 0.5s ease-out';
                el.style.zIndex = 1000;
                el.style.position = 'fixed';
                const rect = el.getBoundingClientRect();
                el.style.left = rect.left + 'px'; el.style.top = rect.top + 'px';

                requestAnimationFrame(() => {
                    el.style.left = (targetRect.left + 50) + 'px';
                    el.style.top = (targetRect.top + 50) + 'px';
                    el.style.opacity = '0'; el.style.transform = 'scale(0.5)';
                });
                setTimeout(() => el.remove(), 500);
                this.fireConfetti();
                this.app.audio.playSfx('correct');
                remaining--;
                if (remaining === 0) setTimeout(() => this.checkAnswer(true), 500);
            };
            itemsRow.appendChild(el);
        });
        container.appendChild(itemsRow); container.appendChild(basketsRow);
        this.viewport.appendChild(container);
    }

    checkAnswer(isCorrect, element) {
        if (isCorrect) {
            this.app.audio.playSfx('correct');
            this.showFeedback('🎉');
            this.app.store.update(s => {
                s.progress.correctAnswers++;
                if (s.progress.correctAnswers % 3 === 0) s.progress.level++;
            });
            this.showCelebration();
        } else {
            this.app.audio.playSfx('wrong');
            if (element) {
                element.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(-10px)' }, { transform: 'translateX(0)' }], { duration: 300 });
            }
        }
    }

    showFeedback(emoji) {
        const overlay = this.element.querySelector('#feedback-overlay');
        overlay.innerText = emoji;
        overlay.classList.add('active');
        setTimeout(() => overlay.classList.remove('active'), 1000);
    }


    setupSubtractGame() {
        // Scale difficulty: start simple (3-6), progress to harder (up to 10)
        const level = this.app.store.state.progress.level || 1;
        const maxRange = Math.min(5 + Math.floor(level / 2), 10); // Scales from 5 to 10
        const minRange = Math.max(3, Math.floor(maxRange / 2)); // Minimum starting value

        const n1 = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        const n2 = Math.floor(Math.random() * (n1 - 1)) + 1; // n2 < n1
        const ans = n1 - n2;
        const emoji = EmojiBank.getRandom();

        const container = document.createElement('div');
        container.className = 'sub-game flex-center column';
        container.style.gap = '20px';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_sub(n1, n2);
        this.setInstruction(instructionDiv.innerText);
        container.appendChild(instructionDiv);

        const visualDiv = document.createElement('div');
        visualDiv.className = 'flex-center';
        visualDiv.style.flexWrap = 'wrap';
        visualDiv.style.maxWidth = '80vw';

        for (let i = 0; i < n1; i++) {
            const el = document.createElement('div');
            el.className = 'sub-item animate-pop';
            el.innerText = emoji.char;
            if (i >= (n1 - n2)) {
                // Mark as removed
                setTimeout(() => {
                    el.classList.add('removed');
                    el.style.opacity = '0.4';
                    el.style.textDecoration = 'none'; // Removed verify line-through as animation handles it
                    el.style.color = '#F44336';
                }, 500 + (i * 200)); // Stagger slightly faster
            }
            visualDiv.appendChild(el);
        }
        container.appendChild(visualDiv);

        const equationDiv = document.createElement('div');
        equationDiv.className = 'flex-center';
        equationDiv.style.fontSize = '4rem';
        equationDiv.style.fontWeight = 'bold';
        equationDiv.style.marginTop = '20px';
        equationDiv.innerHTML = `${n1} - ${n2} = <span id="q-mark">?</span>`;
        container.appendChild(equationDiv);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row';
        let options = [ans];
        while (options.length < 3) {
            // Generate options in range 0 to n1, but prefer non-zero unless ans is 0
            let r = Math.floor(Math.random() * (n1 + 1));
            if (r !== ans && !options.includes(r) && (r > 0 || ans === 0)) options.push(r);
        }
        options.sort((a, b) => a - b).forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-tile option';
            btn.innerText = opt;
            btn.onclick = () => {
                if (opt === ans) {
                    this.element.querySelector('#q-mark').innerText = ans;
                    this.checkAnswer(true, btn);
                } else this.checkAnswer(false, btn);
            };
            if (opt === ans) this.correctTargetElement = btn;
            optionsDiv.appendChild(btn);
        });
        container.appendChild(optionsDiv);
        this.viewport.appendChild(container);

        // Add CSS for sub-item if not exists
        if (!document.getElementById('sub-style')) {
            const style = document.createElement('style');
            style.id = 'sub-style';
            style.innerHTML = `
                .sub-item { font-size: 4rem; margin: 5px; transition: all 0.5s; position: relative; }
                .sub-item.removed { 
                    animation: fly-away 1s forwards;
                    opacity: 0;
                    pointer-events: none;
                }
                @keyframes fly-away {
                    0% { transform: scale(1) translate(0, 0) rotate(0deg); opacity: 1; }
                    100% { transform: scale(0.5) translate(100px, -100px) rotate(45deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupMemoryGame() {
        const numPairs = GameGenerator.getMemoryGridSize(this.app.store.state.progress.level || 1) / 2;
        // Select random emojis pairs
        let selectedEmojis = [];
        for (let i = 0; i < numPairs; i++) {
            let e;
            // Compare by char value, not object reference, to avoid duplicates
            do { e = EmojiBank.getRandom(); } while (selectedEmojis.some(x => x.char === e.char));
            selectedEmojis.push(e);
        }

        let cards = [...selectedEmojis, ...selectedEmojis];
        // Shuffle
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        const container = document.createElement('div');
        container.className = 'memory-game flex-center column';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_mem;
        this.setInstruction(TXT.instr_mem);
        container.appendChild(instructionDiv);

        const grid = document.createElement('div');
        grid.className = 'memory-grid';
        grid.style.display = 'grid';
        grid.style.gap = '15px';
        grid.style.marginTop = '20px';

        if (numPairs * 2 <= 4) grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        else if (numPairs * 2 <= 6) grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        else grid.style.gridTemplateColumns = 'repeat(4, 1fr)';

        let flippedCards = [];
        let matchedPairs = 0;
        let isLocked = false;

        cards.forEach((data, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.char = data.char;
            card.dataset.index = index;

            card.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-front">❓</div>
                    <div class="memory-back">${data.char}</div>
                </div>
            `;

            card.onclick = () => {
                if (isLocked || card.classList.contains('flipped') || card.classList.contains('matched')) return;

                this.app.audio.playSfx('pop');
                card.classList.add('flipped');
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    isLocked = true;
                    const c1 = flippedCards[0];
                    const c2 = flippedCards[1];

                    if (c1.dataset.char === c2.dataset.char) {
                        // Match
                        setTimeout(() => {
                            this.app.audio.playSfx('correct');
                            c1.classList.add('matched');
                            c2.classList.add('matched');
                            flippedCards = [];
                            isLocked = false;
                            matchedPairs++;
                            if (matchedPairs === numPairs) {
                                setTimeout(() => this.checkAnswer(true), 500);
                            }
                        }, 600);
                    } else {
                        // No match
                        this.app.audio.playSfx('wrong');
                        setTimeout(() => {
                            c1.classList.remove('flipped');
                            c2.classList.remove('flipped');
                            flippedCards = [];
                            isLocked = false;
                        }, 1000);
                    }
                }

                // Update hint to next available card if current is flipped
                if (this.correctTargetElement && this.correctTargetElement.classList.contains('flipped')) {
                    const nextCard = Array.from(grid.querySelectorAll('.memory-card:not(.flipped):not(.matched)'))[0];
                    if (nextCard) this.correctTargetElement = nextCard;
                }
            };

            grid.appendChild(card);

            // Hint for first card to ensure it's clickable
            if (index === 0) this.correctTargetElement = card;
        });

        container.appendChild(grid);
        this.viewport.appendChild(container);

        // Inject styles
        if (!document.getElementById('mem-style')) {
            const style = document.createElement('style');
            style.id = 'mem-style';
            style.innerHTML = `
                .memory-card {
                    width: 80px; height: 80px;
                    perspective: 1000px;
                    cursor: pointer;
                }
                .memory-card-inner {
                    position: relative;
                    width: 100%; height: 100%;
                    text-align: center;
                    transition: transform 0.6s;
                    transform-style: preserve-3d;
                }
                .memory-card.flipped .memory-card-inner {
                    transform: rotateY(180deg);
                }
                .memory-front, .memory-back {
                    position: absolute;
                    width: 100%; height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 3rem;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                .memory-front { background: #FF9800; color: white; }
                .memory-back { background: white; transform: rotateY(180deg); border: 2px solid #FF9800; }
                .memory-card.matched .memory-back { background: #4CAF50; border-color: #388E3C; }
            `;
            document.head.appendChild(style);
        }
    }

    showCelebration() {
        const celebrationPhrases = TXT.praise;
        const celebrationEmojis = ["🌟", "⭐", "🎉", "🏆", "👏", "💪"];
        const randomPhrase = celebrationPhrases[Math.floor(Math.random() * celebrationPhrases.length)];
        const randomEmoji = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
        const overlay = document.createElement('div');
        overlay.className = 'celebration-overlay full-screen flex-center column';
        overlay.innerHTML = `
            <div class="celebration-emoji animate-pop">${randomEmoji}</div>
            <h1 style="color:white; font-size:4rem; text-shadow:0 5px 10px rgba(0,0,0,0.5)">${randomPhrase}</h1>
            <div id="confetti-container"></div>
        `;
        this.element.appendChild(overlay);
        this.app.audio.playSfx('win');
        this.app.audio.speak(randomPhrase);
        const confettiContainer = overlay.querySelector('#confetti-container');
        for (let i = 0; i < 50; i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti';
            conf.style.left = Math.random() * 100 + '%';
            conf.style.animationDelay = Math.random() * 2 + 's';
            conf.style.backgroundColor = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'][Math.floor(Math.random() * 6)];
            confettiContainer.appendChild(conf);
        }
        if (this.app.store.state.progress.correctAnswers % 3 === 0) {
            const stickerObj = EmojiBank.getRandom();
            // Use translation for sticker name
            const stickerName = EmojiBank.getName(stickerObj);
            if (this.app.store.unlockSticker(stickerObj.char)) {
                setTimeout(() => {
                    overlay.innerHTML = `
                        <div class="celebration-emoji animate-pop">🎁</div>
                        <h1 style="color:white; font-size:3rem;">${TXT.new_sticker}</h1>
                        <div class="sticker-reward animate-pop">${stickerObj.char}</div>
                        <div id="confetti-container"></div>
                     `;
                    this.app.audio.playSfx('win');
                    this.app.audio.speak(stickerName);
                }, 1500);
            }
        }
        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => { overlay.remove(); this.newRound(); }, 500);
        }, 3500);
    }

    newRound() {
        this.levelData = GameGenerator.generateLevel(this.app.store.state.progress.level, this.currentMode);
        this.startLevel();
        this.element.querySelector('.level-indicator').innerHTML = '⭐ ' + this.app.store.state.progress.correctAnswers;
    }
}



/* --- APP ENTRY --- */
class App {
    constructor() {
        this.store = new Store();
        this.audio = new AudioManager(this.store);
        this.audio.attachUnlocker();
        this.router = {
            go: (SceneClass, props) => {
                if (this.currentScene) this.currentScene.onDestory();
                this.currentScene = new SceneClass(this, props);
                document.getElementById('app').appendChild(this.currentScene.element);
            }
        };
        this.init();
    }
    init() {
        document.getElementById('app').innerHTML = '';
        new SplashScreen(() => this.router.go(TitleScene));
    }
}

// Start
window.startApp = (lang) => {
    // CurrentLang is already set by the global constant logic at top, but we can double check
    // In this architecture, LANG is a constant evaluated at load time. 
    // Ideally we rely on window.currentLang being set BEFORE this script loads.
    new App();
};

if (document.readyState === 'complete') {
    window.startApp();
} else {
    window.addEventListener('load', window.startApp);
}
