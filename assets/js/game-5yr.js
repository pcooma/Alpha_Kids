'use strict';

/**
 * Alpha Kids Math Explorer - Universal Edition (En/Si)
 * Version: 2.1 (Consolidated)
 */

/* --- LOCALIZATION DATA & HELPER --- */
const STRINGS = {
    en: {
        app_title: "Alpha Kids<br><span class=\"highlight\">Math Explorer (Age 5+)</span>",
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
        game_sequence: "Number Sequence",
        game_mult: "Multiplication",
        game_greater_less: "Greater or Less",
        game_time: "Time Telling",
        game_fraction: "Fractions",
        game_shape_adv: "Geometry",
        game_add_sym: "Math Whiz",

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
        instr_missing: "Find the missing number!",
        instr_mem: "Find the matching pairs! Tap two cards.",
        instr_backward_count: "Count backwards! Start from the highest number.",
        instr_sequence: "Find the missing numbers in the sequence!",
        instr_mult: (groups, items) => `${groups} groups of ${items}. How many in total?`,
        instr_greater_less: "Which number is greater?",
        instr_time: "What time is it?",
        instr_fraction: "Find the fraction shown!",
        instr_shape_adv: "Find the 3D shape!",
        instr_add_sym: "Solve the problem!",

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
        cat_LIVING: "Living Things",
        cat_NON_LIVING: "Non-Living Things",
        cat_SHAPES: "Shapes",
        cat_NATURE: "Nature",

        // Guide Content
        guide_title: "Parents Guide",
        guide_aim_title: "Aim & Objectives",
        guide_aim_text: "The aim of this app is to improve mathematical knowledge, logical thinking, and eye, hand, ear, and brain coordination for children in Age 5+.",
        guide_usage_title: "How to Use",
        guide_usage_text: "We recommend playing this game with your child for 30 minutes a day. Engage with them, ask questions, and celebrate their success to maximize learning.",
        guide_precautions_title: "Precautions",
        guide_precautions_text: "Ensure the device is held at a safe distance from the eyes. Recommended to take breaks every 10-15 minutes. Always supervise your child while using the app.",
        guide_games_title: "Games & Variations",
        guide_games_text: "<ul><li><b>Counting:</b> Numbers 1-20 with skip counting (2s, 5s, 10s) and backward counting.</li><li><b>Sorting:</b> Multi-category sorting (up to 4 baskets) including Living/Non-living.</li><li><b>Find Odd:</b> Progressive grids (2x2 to 4x4) with category and visual variations.</li><li><b>Patterns:</b> Complex sequences (ABC, ABBA, ABAC, ABCA, AABCC).</li><li><b>Compare:</b> Visual and symbolic number comparison, Greater/Less reasoning.</li><li><b>Addition:</b> Visual and symbolic addition, missing addend problems.</li><li><b>Subtraction:</b> Visual and symbolic subtraction operations.</li><li><b>Memory Match:</b> Progressive grids (2x2 to 4x4) for enhanced memory.</li><li><b>Time Telling:</b> O'Clock and Half Past clock reading.</li><li><b>Fractions:</b> Basic (1/2, 1/4) and advanced (1/3, 2/3, 3/4) fractions.</li><li><b>Geometry:</b> 3D shape identification and spatial reasoning.</li></ul>"

    },
    si: {
        app_title: "Alpha Kids<br><span class=\"highlight\">ගණිත ගවේෂක (වයස 5+)</span>",
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
        game_sequence: "අංක මාලාව",
        game_mult: "ගුණ කිරීම",
        game_greater_less: "වැඩි හෝ අඩු",
        game_time: "වෙලාව කීයද?",
        game_fraction: "භාග",
        game_shape_adv: "හැඩතල",
        game_add_sym: "ගණිත ඥානි",

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
        instr_missing: "අඩුවෙලා තියෙන අංකය හොයන්න!",
        instr_mem: "ගැලපෙන ජෝඩු සොයන්න!",
        instr_backward_count: "පිටුපස ගණන් කරන්න! ඉහළ අංකයෙන් පටන් ගන්න.",
        instr_sequence: "අංක මාලාවේ අඩු අංක සොයන්න!",
        instr_mult: (groups, items) => `එක කන්ඩායමක ${items} බැගින් කන්ඩායම් ${groups} ක්.`,
        instr_greater_less: "වැඩියෙන් තියෙන අංකය මොකක්ද?",
        instr_time: "වෙලාව කීයද?",
        instr_fraction: "පෙන්වා ඇති භාගය සොයන්න!",
        instr_shape_adv: "ත්‍රිමාණ හැඩය සොයන්න!",
        instr_add_sym: "ගැටලුව විසඳන්න!",

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
        cat_LIVING: "පණ ඇති දේවල්",
        cat_NON_LIVING: "පණ නැති දේවල්",
        cat_SHAPES: "හැඩතල",
        cat_NATURE: "ස්වභාවික",

        // Guide Content
        guide_title: "දෙමාපිය උපදෙස්",
        guide_aim_title: "අරමුණ සහ ඉලක්ක",
        guide_aim_text: "මෙම යෙදුමේ අරමුණ වයස 5+ දරුවන්ගේ ගණිත දැනුම, තර්කන හැකියාව සහ අත, ඇස, කන සහ මොළය අතර සම්බන්ධීකරණය දියුණු කිරීමයි.",
        guide_usage_title: "භාවිතා කරන ආකාරය",
        guide_usage_text: "දිනකට විනාඩි 30ක් ඔබේ දරුවා සමඟ මෙම ක්‍රීඩාවේ නිරත වන්න. ඔවුන්ට ප්‍රශ්න අසන්න, උදව් කරන්න සහ ඔවුන් දිනන විට අගය කරන්න.",
        guide_precautions_title: "පූර්වෝපායන්",
        guide_precautions_text: "දුරකථනය දරුවාගේ ඇස් වලට සුදුසු දුරකින් තබාගන්න. සෑම විනාඩි 10-15 කට වරක් විවේකයක් ලබා දෙන්න. සැමවිටම දරුවා ගැන අවධානයෙන් සිටින්න.",
        guide_games_title: "ක්‍රීඩා සහ වෙනස්කම්",
        guide_games_text: "<ul><li><b>ගණන් කිරීම:</b> 1-20 දක්වා මඟහැර (2, 5, 10 බැගින්) සහ පසුපස ගණන් කිරීම.</li><li><b>වෙන් කිරීම:</b> කූඩ 4ක් දක්වා බහු-වර්ග වර්ගීකරණය (සජීවී/අජීවී ඇතුළත්).</li><li><b>වෙනස් දේ සෙවීම:</b> සමප්‍රමාණික ජාල (2x2 සිට 4x4) වර්ග සහ දෘශ්‍ය වෙනස්කම් සමඟ.</li><li><b>රටා:</b> සංකීර්ණ අනුක්‍රම (ABC, ABBA, ABAC, ABCA, AABCC).</li><li><b>සංසන්දනය:</b> දෘශ්‍ය සහ සංකේතාත්මක අංක සංසන්දනය, වැඩි/අඩු තර්කනය.</li><li><b>එකතු කිරීම:</b> දෘශ්‍ය සහ සංකේතාත්මක, අඩුවූ එකතු ගැටලු.</li><li><b>අඩු කිරීම:</b> දෘශ්‍ය සහ සංකේතාත්මක අඩු කිරීම් ක්‍රියා.</li><li><b>මතක ශක්තිය:</b> සමප්‍රමාණික ජාල (2x2 සිට 4x4) මතක වර්ධනයට.</li><li><b>කාලය:</b> O'Clock සහ Half Past ඔරලෝසු කියවීම.</li><li><b>භාග:</b> මූලික (1/2, 1/4) සහ සංකීර්ණ (1/3, 2/3, 3/4) භාග.</li><li><b>ජ්‍යාමිතිය:</b> ත්‍රිමාණ හැඩතල හඳුනා ගැනීම සහ අවකාශීය තර්කනය.</li></ul>"

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
        { char: "🥭", en: "mango", si: "අඹ" }, { char: "🥥", en: "coconut", si: "පොල්" }, { char: "🍈", en: "melon", si: "කෙටිපත්" },
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
        { char: "⚫", en: "black circle", si: "කළු කවය" }, { char: "⚪", en: "white circle", si: "සුදු කවය" },
        { char: "🟥", en: "red square", si: "රතු සතරැස" }, { char: "🟦", en: "blue square", si: "නිල් සතරැස" },
        { char: "🟩", en: "green square", si: "කොළ සතරැස" }, { char: "🟨", en: "yellow square", si: "කහ සතරැස" },
        { char: "🟧", en: "orange square", si: "තැඹිලි සතරැස" }, { char: "🟪", en: "purple square", si: "ජම්බු සතරැස" },
        { char: "⬛", en: "black square", si: "කළු සතරැස" }, { char: "⬜", en: "white square", si: "සුදු සතරැස" },
        { char: "🔺", en: "red triangle", si: "රතු ත්‍රිකෝණය" }, { char: "🔻", en: "red triangle down", si: "ත්‍රිකෝණය" },
        { char: "💠", en: "diamond", si: "දියමන්ති" }, { char: "⭐", en: "star", si: "තරුව" },
        { char: "💛", en: "yellow heart", si: "කහ හදවත" }, { char: "💚", en: "green heart", si: "කොළ හදවත" }
    ];

    static NATURE = [
        { char: "🌸", en: "flower", si: "මල" }, { char: "🌹", en: "rose", si: "රෝස මල" },
        { char: "🌺", en: "hibiscus", si: "සපත්තු මල" }, { char: "🌻", en: "sunflower", si: "සූරියකාන්ත මල" },
        { char: "🌳", en: "tree", si: "ගස" }, { char: "🌴", en: "palm tree", si: "පෙති ගස" },
        { char: "🌵", en: "cactus", si: "කැක්ටස්" }, { char: "🍀", en: "clover", si: "හතර කොළ" },
        { char: "🍁", en: "maple leaf", si: "කොළය" }, { char: "🍂", en: "fallen leaf", si: "වැටුණු කොළ" },
        { char: "🌞", en: "sun", si: "හිරු" }, { char: "🌝", en: "moon", si: "සඳ" },
        { char: "🌙", en: "crescent moon", si: "අඩ සඳ" }, { char: "⭐", en: "star", si: "තරුව" },
        { char: "💫", en: "dizzy", si: "දීප්ති" }, { char: "✨", en: "sparkle", si: "දිලිසීම" },
        { char: "☁️", en: "cloud", si: "වලාකුළ" }, { char: "🌈", en: "rainbow", si: "දේදුන්න" },
        { char: "⛈️", en: "storm", si: "කුණාටුව" }, { char: "❄️", en: "snowflake", si: "හිම පියලි" },
        { char: "💧", en: "water drop", si: "ජල බිංදුව" }, { char: "🌊", en: "wave", si: "රළ" }
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

    static getRandomSticker() {
        const cats = this.getAllCategories();
        const cat = cats[Math.floor(Math.random() * cats.length)];
        return this.getRandom(cat);
    }

    static isLiving(char) {
        // Only return true for Animals, specific Nature items (Plants), and Living Foods (Fruits/Veggies)
        const plants = ['🌸', '🌹', '🌺', '🌻', '🌳', '🌴', '🌵', '🍀', '🍁', '🍂'];
        const livingFoods = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝', '🍅', '🌽', '🥕', '🥭', '🥥', '🍈'];
        return this.ANIMALS.some(a => a.char === char) || plants.includes(char) || livingFoods.includes(char);
    }

    static getLivingFoods() {
        const livingChars = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝', '🍅', '🌽', '🥕', '🥭', '🥥', '🍈'];
        return this.FOODS.filter(f => livingChars.includes(f.char));
    }

    static getNonLivingFoods() {
        const livingChars = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝', '🍅', '🌽', '🥕', '🥭', '🥥', '🍈'];
        return this.FOODS.filter(f => !livingChars.includes(f.char));
    }

    static isAnimate(char) {
        // Only Animals are grammatically "Animate" in Sinhala (usually)
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
        const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{2934}\u{2935}]/gu, '').trim();

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
        this.hintElement.style.fontSize = '15vmin';
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

            // Attach window listeners only during drag
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
        if (useOffset) targetY -= window.innerHeight * 0.15; // Shift up by 15% of viewport height

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
        let mode = forcedMode;
        if (!mode || mode === 'RANDOM') {
            // Progressive mode unlock based on difficulty
            // Start simple, gradually introduce more complex games
            let available = ['COUNT', 'FIND_ODD'];

            // Difficulty 2+: Basic sorting
            if (difficulty > 1) available.push('SORT');

            // Difficulty 4+: Patterns and comparisons
            if (difficulty > 3) available.push('PATTERN', 'COMPARE');

            // Difficulty 5+: Time telling introduced early for 5-year-olds
            if (difficulty > 4) available.push('TIME');

            // Difficulty 6+: Basic arithmetic (addition, subtraction, fractions)
            if (difficulty > 5) available.push('ADD', 'SUBTRACT', 'FRACTION');

            // Difficulty 7+: Memory and multiplication
            if (difficulty > 6) available.push('MEMORY', 'MULT', 'GREATER_LESS');

            // Difficulty 8+: Advanced concepts (sequences, symbolic math, geometry)
            if (difficulty > 7) available.push('SHAPE_ADV', 'SEQUENCE', 'ADD_SYM', 'SUB_SYM', 'MATH_WHIZ');

            mode = available[Math.floor(Math.random() * available.length)];
        }

        // 5-Year Requirement: Range 1-50
        // Slower ramp up but deeper reach
        // Lvl 1: 1-5
        // Lvl 5: 1-15
        // Lvl 10: 1-30
        // Lvl 15+: 1-50
        let maxNum = Math.min(5 + Math.floor(difficulty * 3), 50);
        const minNum = 1;

        // CRITICAL UPDATE: Cap max number for Counting Game to 50 (Groups of 10 supported)
        if (mode === 'COUNT' || forcedMode === 'COUNT') {
            maxNum = Math.min(maxNum, 50);
        }

        // Variations logic with enhanced difficulty scaling
        let variation = 'normal';
        let skipBy = null; // For skip counting
        let gridSize = 4; // For find odd game

        if (mode === 'COUNT') {
            const r = Math.random();
            if (difficulty >= 5 && r < 0.3) {
                variation = 'skip_count';
                // Enhanced skip counting for 5yo: 2s, 5s, 10s
                const subR = Math.random();
                if (subR < 0.33) skipBy = 2;
                else if (subR < 0.66) skipBy = 5;
                else skipBy = 10;
            } else if (difficulty >= 8 && r < 0.5) {
                variation = 'backward'; // Enabled for 5-6 year olds
            } else if (r < 0.7) {
                variation = 'mixed';
            } else {
                variation = 'normal';
            }
        }
        if (mode === 'PATTERN') {
            const r = Math.random();
            if (difficulty < 3) {
                variation = r < 0.5 ? 'abab' : 'aabb';
            } else {
                // Complex patterns for 5yo
                if (r < 0.2) variation = 'abc';
                else if (r < 0.4) variation = 'abba';
                else if (r < 0.6) variation = 'abac';
                else if (r < 0.8) variation = 'abca'; // New
                else variation = 'aabcc'; // New
            }
        }
        if (mode === 'FIND_ODD') {
            const r = Math.random();
            variation = r > 0.5 ? 'category' : 'visual';
            // Progressive grid size based on difficulty
            if (difficulty < 3) gridSize = 4;       // 2x2
            else if (difficulty < 6) gridSize = 9;  // 3x3 (Standard start for 5yo?)
            else if (difficulty < 9) gridSize = 12; // 3x4
            else gridSize = 16;                     // 4x4 (Max Cap)
        }
        if (mode === 'SORT') {
            const r = Math.random();
            // 5yo: More categories earlier
            if (difficulty >= 4 && r < 0.4) {
                variation = 'three_basket';
            } else if (difficulty >= 8 && r < 0.6) {
                variation = 'three_basket'; // Keep it at three baskets for complexity management
            } else if (r < 0.8) {
                variation = 'living';
            } else {
                variation = 'category';
            }
        }
        if (mode === 'COMPARE') {
            if (difficulty >= 5 && Math.random() < 0.5) {
                variation = 'symbolic'; // New: Numbers only compare
            }
        }
        if (mode === 'ADD') {
            if (difficulty >= 5 && Math.random() < 0.4) {
                variation = 'missing_addend'; // New: 3 + ? = 5
            }
            if (difficulty >= 6 && Math.random() < 0.5) variation = 'symbolic';
        }
        if (mode === 'SUBTRACT') {
            if (difficulty >= 6 && Math.random() < 0.5) variation = 'symbolic';
        }

        // Time Game Logic
        // Variation: 'oclock', 'half_past'
        if (mode === 'TIME') {
            variation = difficulty > 6 && Math.random() > 0.5 ? 'half_past' : 'oclock';
        }

        // Fraction Game Logic
        // Variation: 'basic' (1/2, 1/4), 'advanced' (1/3, 2/3, 3/4)
        if (mode === 'FRACTION') {
            variation = difficulty > 7 ? 'advanced' : 'basic';
        }

        // Shape Adv Logic
        // Variation: 3d shapes
        if (mode === 'SHAPE_ADV') {
            variation = '3d';
        }



        // Safety: Cap 'normal' count to 20 to prevent UI clutter
        // (Handled above by capping maxNum directly)

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
        if (difficulty < 3) return 4; // 2x2
        if (difficulty < 6) return 8; // 4x2
        if (difficulty < 9) return 12; // 4x3
        return 16; // 4x4
    }

}


/* --- SCENES & ACTIVITIES --- */

class Scene {
    constructor(app, props = {}) {
        this.app = app;
        this.props = props;
        this.element = document.createElement('div');
        this.element.className = 'scene full-screen flex-center page-transition';
        this.cleanup = [];
    }

    onDestroy() {
        this.cleanup.forEach(fn => fn());
        this.element.remove();
    }

    fireConfetti() {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        const shapes = ['50%', '0%', '0%']; // Circle, Square, Triangle (via clip-path or border-radius)

        for (let i = 0; i < 50; i++) {
            const el = document.createElement('div');
            el.className = 'confetti-particle';
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.left = Math.random() * 100 + 'vw';
            el.style.top = '-5vmin';

            // Random shape
            const shapeType = Math.random();
            if (shapeType < 0.33) {
                el.style.borderRadius = '50%'; // Circle
            } else if (shapeType < 0.66) {
                el.style.borderRadius = '0%'; // Square
            } else {
                el.style.width = '0';
                el.style.height = '0';
                el.style.background = 'transparent';
                el.style.borderLeft = '1.5vmin solid transparent';
                el.style.borderRight = '1.5vmin solid transparent';
                el.style.borderBottom = `3vmin solid ${colors[Math.floor(Math.random() * colors.length)]}`;
                el.style.borderRadius = '0';
            }

            el.style.transform = `rotate(${Math.random() * 360}deg)`;
            const duration = Math.random() * 2 + 1.5; // Slower fall
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
                <div class="sticker-grid-container">
                    <div class="sticker-grid">
                        ${stickers.length > 0
                ? stickers.map(s => `<div class="sticker-item animate-pop">${s}</div>`).join('')
                : `<div class="empty-state">
                        <div style="font-size:4rem; margin-bottom:3vmin;">🎒</div>
                        <div style="font-size:1.5rem; color:#8D6E63;">${TXT.start}</div>
                   </div>`}
                    </div>
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
                <button class="gate-btn btn-cancel" style="margin-top:3vmin">${TXT.gate_cancel}</button>
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
            { id: 'MEM_GAME', label: TXT.game_mem, icon: '🧠', mode: 'MEMORY', color: 'tile-green' },
            { id: 'TIME_GAME', label: TXT.game_time, icon: '⏰', mode: 'TIME', color: 'tile-purple' },
            { id: 'FRAC_GAME', label: TXT.game_fraction, icon: '🍰', mode: 'FRACTION', color: 'tile-orange' },
            { id: 'SHAPE_ADV', label: TXT.game_shape_adv, icon: '🧊', mode: 'SHAPE_ADV', color: 'tile-red' },
            { id: 'SEQ_GAME', label: TXT.game_sequence, icon: '🔢', mode: 'SEQUENCE', color: 'tile-blue' },
            { id: 'MULT_GAME', label: TXT.game_mult, icon: '✖️', mode: 'MULT', color: 'tile-purple' },
            { id: 'GL_GAME', label: TXT.game_greater_less, icon: '🆚', mode: 'GREATER_LESS', color: 'tile-green' },
            { id: 'WHIZ_GAME', label: TXT.game_add_sym, icon: '🧙', mode: 'MATH_WHIZ', color: 'tile-orange' }
        ];
        this.render();
    }
    render() {
        this.element.innerHTML = `
            <div class="top-bar">
                <div style="display:flex; gap:2vmin;">
                    <button id="btn-exit" class="btn-nav" style="border-color:#FFCDD2; background:#FFEBEE; color:#D32F2F;">✖ ${TXT.btn_exit}</button>
                    <button id="btn-parents" class="btn-nav"><span class="icon-lock">🔒</span> ${TXT.parents}</button>
                </div>
                <div style="display:flex; gap:2vmin;">
                    <button id="btn-fullscreen" class="btn-nav" style="background:#E3F2FD; border-color:#2196F3; color:#1565C0;">⛶</button>
                    <button id="btn-stickers" class="btn-nav">${TXT.stickers}</button>
                </div>
            </div>
            <div class="title-container text-center animate-pop">
                <img src="assets/logo.png" alt="Logo" style="max-width: 14vmin; margin-bottom: 2vmin; margin-left: auto; margin-right: auto; display: block; border-radius: 50%;">
                <h1 class="game-title">${TXT.app_title}</h1>
                <div id="btn-daily" class="daily-adventure-card">
                    <span class="rocket-icon">🚀</span>
                    <div class="cta-text">${TXT.start}</div>
                    <div id="sticker-preview" style="font-size: 1.5rem; color: #555; margin-top: 1vmin;"></div>
                </div>
                <div style="margin-top: 4vmin; font-size: 0.9rem; color: #5D4037; opacity: 0.8; line-height: 1.5;">${TXT.footer}</div>
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
        this.element.querySelector('#btn-fullscreen').onclick = () => {
            this.app.audio.playSfx('pop');
            const doc = document.documentElement;
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                // Cross-browser fullscreen request
                if (doc.requestFullscreen) {
                    doc.requestFullscreen().catch(e => console.error(e));
                } else if (doc.webkitRequestFullscreen) {
                    doc.webkitRequestFullscreen(); // Safari/iOS
                } else if (doc.msRequestFullscreen) {
                    doc.msRequestFullscreen(); // IE11
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen().catch(e => console.error(e));
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen(); // Safari
                }
            }
        };
        this.element.querySelector('#btn-parents').onclick = () => {
            this.app.audio.playSfx('pop');
            new ParentsGate(this.app, () => this.showParentSettings()).show();
        };
        this.element.querySelector('#btn-exit').onclick = () => {
            this.app.audio.playSfx('pop');
            location.href = 'launch-5yr.html';
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
                <div style="font-size:1.5rem; margin-bottom:3vmin">
                    ${TXT.progress_lbl} ${this.app.store.state.progress.correctAnswers} <br>
                    ${TXT.stickers_lbl} ${this.app.store.state.progress.stickers.length}
                </div>
                <button id="btn-guide-open" class="btn-giant" style="background:#2196F3; border-color:#1976D2; font-size:1.5rem; margin-bottom: 1.5vmin;">${TXT.btn_guide}</button>
                <div style="height: 1vmin;"></div>
                <button id="btn-reset" class="btn-giant" style="background:#F44336; border-color:#d32f2f; font-size:1.5rem">${TXT.btn_reset}</button>
                <button id="btn-close" class="gate-btn btn-confirm" style="margin-top:3vmin">${TXT.btn_close}</button>
            </div>
        `;
        overlay.querySelector('#btn-guide-open').onclick = () => {
            overlay.remove(); // Close settings to open guide
            this.showGuide();
        };
        // Fix: Capture storageKey before event handler to avoid scoping issues
        const storageKey = this.app.store.storageKey;
        overlay.querySelector('#btn-reset').onclick = () => {
            if (confirm(TXT.reset_confirm)) {
                localStorage.removeItem(storageKey);
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
            <div style="max-width: 90vmin; margin: 0 auto; padding: 3vmin;">
                <h1 style="color: #E91E63; text-align: center; margin-bottom: 5vmin;">${TXT.guide_title}</h1>
                
                <section style="margin-bottom: 5vmin;">
                    <h2 style="color: #3F51B5; border-bottom: 0.4vmin solid #ddd; padding-bottom: 1.5vmin;">${TXT.guide_aim_title}</h2>
                    <p style="font-size: 1.2rem; line-height: 1.6;">${TXT.guide_aim_text}</p>
                </section>

                <section style="margin-bottom: 5vmin;">
                    <h2 style="color: #009688; border-bottom: 0.4vmin solid #ddd; padding-bottom: 1.5vmin;">${TXT.guide_usage_title}</h2>
                    <p style="font-size: 1.2rem; line-height: 1.6;">${TXT.guide_usage_text}</p>
                </section>

                <section style="margin-bottom: 5vmin;">
                    <h2 style="color: #FF9800; border-bottom: 0.4vmin solid #ddd; padding-bottom: 1.5vmin;">${TXT.guide_precautions_title}</h2>
                    <div style="background: #FFF3E0; padding: 2.5vmin; border-radius: 1.5vmin; border-left: 1vmin solid #FF9800;">
                        <p style="font-size: 1.2rem; line-height: 1.6; margin: 0;">${TXT.guide_precautions_text}</p>
                    </div>
                </section>

                <section style="margin-bottom: 5vmin;">
                    <h2 style="color: #9C27B0; border-bottom: 0.4vmin solid #ddd; padding-bottom: 1.5vmin;">${TXT.guide_games_title}</h2>
                    <div style="font-size: 1.2rem; line-height: 1.6; padding-left: 3vmin;">
                        ${TXT.guide_games_text}
                    </div>
                </section>

                <div style="text-align: center; margin-top: 5vmin;">
                    <button id="btn-guide-close" class="btn-giant" style="background: #4CAF50; border-color: #388E3C;">${TXT.btn_close}</button>
                </div>
                
                <div style="margin-top: 5vmin; text-align: center; border-top: 0.2vmin solid #eee; padding-top: 3vmin; font-size: 0.9rem; color: #777;">
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
            <img src="assets/splash.png" alt="Welcome" style="max-width: 90%; max-height: 60%; border-radius: 4vmin; box-shadow: 0 2vmin 5vmin rgba(0,0,0,0.2);">
            <button id="btn-start-app" class="btn-giant pulse" style="margin-top: 5vmin; background: #FF9800; border-color: #fff; font-size: 3rem;">
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

    generateNumericOptions(correct, count = 3, range = 5) {
        const options = [correct];
        // Create pool of unique integers around correct answer
        const pool = [];
        const min = Math.max(1, typeof correct === 'number' ? correct - range : 1); // Handle non-numeric case safety
        const max = typeof correct === 'number' ? correct + range : 10;

        for (let i = min; i <= max; i++) {
            if (i !== correct) pool.push(i);
        }

        // Shuffle pool
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }

        // Fill options
        while (options.length < count) {
            if (pool.length > 0) options.push(pool.pop());
            else {
                // Emergency fallback if pool exhausted (shouldn't happen with default range)
                let r = Math.floor(Math.random() * 20) + 1;
                if (!options.includes(r)) options.push(r);
            }
        }

        return options.sort(() => Math.random() - 0.5);
    }

    render() {
        this.element.innerHTML = `
            <div class="game-header">
                <button id="btn-home" class="btn-icon">🏠</button>
                <div class="spacer" style="flex:1"></div>
                <button id="btn-replay" class="btn-icon" style="margin-right:1.5vmin">🔊</button>
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
            case 'TIME': this.setupTimeGame(); break;
            case 'FRACTION': this.setupFractionGame(); break;
            case 'SHAPE_ADV': this.setupShapeAdvGame(); break;
            case 'SEQUENCE': this.setupSequenceGame(); break;
            case 'MULT': this.setupMultiplicationGame(); break;
            case 'GREATER_LESS': this.setupGreaterLessGame(); break;
            case 'ADD_SYM': this.setupSymbolicAdd(); break;
            case 'SUB_SYM': this.setupSymbolicSub(); break;
            case 'MATH_WHIZ': this.setupMathWhiz(); break;
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
        // Extended range for 5-6 year olds: use 1-10 for higher difficulties
        const maxAddend = this.levelData.difficulty < 5 ? 5 : 10;
        const n1 = Math.floor(Math.random() * maxAddend) + 1;
        const n2 = Math.floor(Math.random() * maxAddend) + 1;
        const sum = n1 + n2;
        const emoji = EmojiBank.getRandom();
        const itemName = EmojiBank.getName(emoji);
        const namePlural = pluralize(itemName);

        const container = document.createElement('div');
        container.className = 'add-game flex-center column';
        container.style.gap = '3vmin';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        // Use isAnimate for grammar, not isLiving (which now includes plants)
        const isAnimate = EmojiBank.isAnimate(emoji.char);
        instructionDiv.innerText = TXT.instr_add(namePlural, emoji.char, isAnimate);
        this.setInstruction(instructionDiv.innerText);
        container.appendChild(instructionDiv);

        const equationDiv = document.createElement('div');
        equationDiv.className = 'flex-center';
        equationDiv.style.fontSize = '4rem';
        equationDiv.style.fontWeight = 'bold';

        const group = (n) => `<div class="group-box">${Array(n).fill(emoji.char).join('')}</div>`;

        if (this.levelData.variation === 'missing_addend') {
            const instrMissing = TXT.instr_missing || "Find the missing number!";
            this.setInstruction(instrMissing);

            // Equation: n1 + ? = sum
            equationDiv.innerHTML = `${n1} + <span id="q-mark" class="missing-box">?</span> = ${sum}`;

        } else if (this.levelData.variation === 'symbolic') {
            const instrSym = TXT.instr_add_sym || "Solve the problem!";
            this.setInstruction(instrSym);
            equationDiv.innerHTML = `${n1} + ${n2} = <span id="q-mark">?</span>`;

        } else {
            equationDiv.innerHTML = `${group(n1)} + ${group(n2)} = <span id="q-mark">?</span>`;
        }

        container.appendChild(equationDiv);

        const style = document.createElement('style');
        // Prevent overflow with flex-wrap and smaller font if needed
        style.innerHTML = `
            .group-box { 
                background: rgba(255,255,255,0.5); 
                padding: 0.5vmin 1vmin; 
                border-radius: 1.5vmin;  
                margin: 0 1vmin; 
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

        const correctVal = this.levelData.variation === 'missing_addend' ? n2 : sum;
        const options = this.generateNumericOptions(correctVal, 3, 5); // Range +/- 5

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-tile option';
            btn.innerText = opt;
            btn.onclick = () => {
                const isMissingMode = this.levelData.variation === 'missing_addend';
                const correctVal = isMissingMode ? n2 : sum;

                if (opt === correctVal) {
                    if (isMissingMode) {
                        this.element.querySelector('#q-mark').innerText = n2;
                        this.element.querySelector('#q-mark').classList.remove('missing-box');
                    } else {
                        this.element.querySelector('#q-mark').innerText = sum;
                    }
                    this.checkAnswer(true, btn);
                } else this.checkAnswer(false, btn);
            };
            const correctVal = this.levelData.variation === 'missing_addend' ? n2 : sum;
            if (opt === correctVal) this.correctTargetElement = btn;
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
        } else if (variation === 'backward') {
            // Backward counting instruction
            initText = TXT.instr_backward_count || (LANG === 'si' ? 'පිටුපස ගණන් කරන්න!' : 'Count backwards!');
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
        // Optimize for larger numbers (13-20)
        if (target > 12) {
            itemsDiv.classList.add('dense-grid');
        }
        let counted = 0;
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row hidden';

        // Calculate items for skip counting and grouping
        const actualTarget = variation === 'skip_count' && skipBy ? Math.ceil(target / skipBy) * skipBy : target;
        // SAFETY: Only cap if we CANNOT group. But now we have grouping.
        // So we allow up to 50.
        const safeActualTarget = Math.min(actualTarget, 50);

        // itemCount = number of physical items to click
        // For skip counting: we show fewer items (groups), each worth skipBy
        // For regular: itemCount = target
        let itemCount = 0;

        // This is strictly for PROGRESS tracking (how many clicks total)
        let totalItemsToClick = 0;

        // Prepare items list
        let itemsList = [];

        if (variation === 'skip_count' && skipBy) {
            // Create groups for skip counting
            const groupCount = Math.ceil(safeActualTarget / skipBy);
            itemCount = groupCount; // Number of clickable groups
            for (let i = 0; i < groupCount; i++) {
                itemsList.push({ ...emoji, isTarget: true, isGroup: true, count: skipBy });
            }
            totalItemsToClick = groupCount;
        } else if (target > 20) {
            // GROUPING MODE (Tens + Units)
            const tens = Math.floor(safeActualTarget / 10);
            const units = safeActualTarget % 10;

            // Add Tens
            for (let i = 0; i < tens; i++) {
                itemsList.push({ ...emoji, isTarget: true, isGroup: true, count: 10 });
            }
            // Add Units
            for (let i = 0; i < units; i++) {
                itemsList.push({ ...emoji, isTarget: true, isGroup: false, count: 1 });
            }
            itemCount = target; // The actual value counted
            totalItemsToClick = tens + units;
        } else {
            // Standard (1-20)
            for (let i = 0; i < safeActualTarget; i++) itemsList.push({ ...emoji, isTarget: true, isGroup: false, count: 1 });
            itemCount = target;
            totalItemsToClick = safeActualTarget;
        }

        // Add distractors if mixed
        if (variation === 'mixed') {
            const distractorCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 distractors
            let distractor;
            // Ensure distractor is different
            do { distractor = EmojiBank.getRandom(); } while (distractor.char === emoji.char);

            for (let i = 0; i < distractorCount; i++) itemsList.push({ ...distractor, isTarget: false, count: 1 });

            // Shuffle
            for (let i = itemsList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [itemsList[i], itemsList[j]] = [itemsList[j], itemsList[i]];
            }
        }

        let currentTotalValue = 0;

        itemsList.forEach((itemData, idx) => {
            const item = document.createElement('div');
            item.className = 'game-item animate-drop';

            if (itemData.isGroup) {
                item.classList.add('group-item');
                // 5 rows × 2 columns grid for group blocks (styled in CSS)
                const containerStyle = "";

                // If it's a 10-group, specific styling
                item.innerHTML = `
                    <div class="group-cnt" style="position:absolute; top:-1.5vmin; right:-1.5vmin; background:#FF9800; color:white; border-radius:50%; width:4vmin; height:4vmin; font-size:0.8rem; display:flex; align-items:center; justify-content:center;">${itemData.count}</div>
                    <div class="mini-grid-group" style="${containerStyle}">
                        ${Array(itemData.count).fill(itemData.char).join('')}
                    </div>`;

                item.style.position = 'relative';
                // item.style.border = '2px solid #ccc';
                item.style.padding = '1vmin';
                item.style.borderRadius = '1.5vmin';
            } else {
                item.innerText = itemData.char;
            }
            item.onclick = () => {
                if (item.classList.contains('counted')) return;

                if (!itemData.isTarget) {
                    this.app.audio.playSfx('wrong');
                    item.animate([
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(1vmin)' },
                        { transform: 'translateX(-1vmin)' },
                        { transform: 'translateX(0)' }
                    ], { duration: 200 });
                    return;
                }

                this.app.audio.playSfx('pop');
                counted++;

                // Logic update: Add actual valid value
                const val = itemData.count || 1;
                currentTotalValue += val;

                // Speak the accumulated total
                this.app.audio.speak(EmojiBank.getNumberWord ? EmojiBank.getNumberWord(currentTotalValue) : String(currentTotalValue));

                item.classList.add('counted');
                item.style.opacity = '1'; item.style.filter = 'none';
                item.style.transform = 'scale(1.2)';
                item.style.border = '0.8vmin solid #4CAF50'; // Visual feedback
                setTimeout(() => item.style.transform = 'scale(1)', 200);

                const nextItem = Array.from(itemsDiv.children).find((el, i) => itemsList[i].isTarget && !el.classList.contains('counted'));
                if (nextItem) {
                    this.correctTargetElement = nextItem;
                    // Reset idle timer to guide to next item
                    if (this.uxHelper) this.uxHelper.resetTimer();
                }

                if (counted === totalItemsToClick) {
                    this.app.audio.playSfx('correct');
                    optionsDiv.classList.remove('hidden');
                    optionsDiv.classList.add('animate-pop');

                    // Calculate correct final answer
                    // For skip counting: itemCount groups × skipBy per group
                    // For grouping and normal: use currentTotalValue (actual sum)
                    const finalAnswer = variation === 'skip_count' && skipBy ? itemCount * skipBy : currentTotalValue;

                    const askText = variation === 'skip_count' && skipBy
                        ? (LANG === 'si' ? `මුළු ගණන කීයක්ද?` : `What's the total?`)
                        : TXT.instr_count_ask(itemPlural, emoji.char, isAnimate);
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
        let expectedTotal;
        if (variation === 'skip_count' && skipBy) {
            const groupCount = Math.ceil(safeActualTarget / skipBy);
            expectedTotal = groupCount * skipBy;
        } else {
            expectedTotal = safeActualTarget;
        }

        const options = this.generateNumericOptions(expectedTotal, 3, 5);

        options.forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'btn-tile option';
            btn.innerText = num;
            btn.onclick = () => this.checkAnswer(num === expectedTotal, btn);
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

            if (this.levelData.variation === 'symbolic') {
                side.innerHTML = `<div class="symbolic-number animate-pop">${count}</div>`;
                side.classList.add('symbolic');
            } else {
                const grid = document.createElement('div');
                grid.className = 'mini-grid four-year';
                // Improve grid layout for larger numbers (up to 10-15)
                if (count > 9) grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                else if (count > 4) grid.style.gridTemplateColumns = 'repeat(3, 1fr)';

                for (let i = 0; i < count; i++) grid.innerHTML += `<div class="mini-item">${emoji.char}</div>`;
                side.appendChild(grid);
            }

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

        // Add CSS for symbolic
        if (!document.getElementById('symbolic-style')) {
            const s = document.createElement('style');
            s.id = 'symbolic-style';
            s.innerHTML = `.symbolic-number { font-size: 15vmin; font-weight: bold; color: #3F51B5; } .compare-side.symbolic { justify-content: center; background: #E8EAF6; border-radius: 4vmin; }`;
            document.head.appendChild(s);
        }
    }

    setupPatternGame() {
        const { variation } = this.levelData;
        // 5-Year Variation: Occasionally use SHAPES category instead of Animals
        let useShapes = Math.random() < 0.4 || this.levelData.difficulty > 5;

        let e1 = useShapes ? EmojiBank.getRandom('SHAPES') : EmojiBank.getRandom();
        let e2, e3;
        do { e2 = useShapes ? EmojiBank.getRandom('SHAPES') : EmojiBank.getRandom(); } while (e2.char === e1.char);

        let sequence = [];
        let nextItem;

        if (variation === 'aabb') {
            sequence = [e1, e1, e2, e2, e1];
            nextItem = e1;
        } else if (variation === 'abc') {
            do { e3 = useShapes ? EmojiBank.getRandom('SHAPES') : EmojiBank.getRandom(); } while (e3.char === e1.char || e3.char === e2.char);
            sequence = [e1, e2, e3, e1, e2];
            nextItem = e3;
        } else if (variation === 'abac') {
            do { e3 = useShapes ? EmojiBank.getRandom('SHAPES') : EmojiBank.getRandom(); } while (e3.char === e1.char || e3.char === e2.char);
            sequence = [e1, e2, e1, e3, e1];
            nextItem = e2;
        } else if (variation === 'abba') {
            // Symmetry pattern: A B B A ?
            // After ABBA, the next logical item is A (starting a new cycle)
            sequence = [e1, e2, e2, e1];
            nextItem = e1; // New ABBA cycle starts with A
        } else if (variation === 'abca') {
            do { e3 = useShapes ? EmojiBank.getRandom('SHAPES') : EmojiBank.getRandom(); } while (e3.char === e1.char || e3.char === e2.char);
            sequence = [e1, e2, e3, e1];
            nextItem = e2; // Next is B
        } else if (variation === 'aabcc') {
            do { e3 = useShapes ? EmojiBank.getRandom('SHAPES') : EmojiBank.getRandom(); } while (e3.char === e1.char || e3.char === e2.char);
            sequence = [e1, e1, e2, e3, e3];
            nextItem = e1; // Next is A (new cycle)
            // Logic: A A B C C [A] ...
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

        let distractors = [nextItem, useShapes ? EmojiBank.getRandom('SHAPES') : EmojiBank.getRandom()];
        if (e3 && Math.random() > 0.5) distractors[1] = e3;
        else if (Math.random() > 0.5) distractors[1] = variation === 'aabb' ? e2 : e1;

        while (distractors[1].char === nextItem.char) distractors[1] = useShapes ? EmojiBank.getRandom('SHAPES') : EmojiBank.getRandom();

        distractors.sort(() => Math.random() - 0.5);

        distractors.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'btn-tile option draggable';
            btn.innerText = opt.char;

            DragHelper.makeDraggable(btn, (x, y, el) => {
                const rect = dropZone.getBoundingClientRect();
                // Widen hit detection: explicit center check with margin or overlap
                // Standard rect check:
                const hit = x > rect.left - 20 && x < rect.right + 20 && y > rect.top - 20 && y < rect.bottom + 20;

                if (hit) {
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
                    btn.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(2vmin)' }, { transform: 'translateX(-2vmin)' }, { transform: 'translateX(0)' }], { duration: 200 });
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
        // Safety cap: ensure total never exceeds 16 to prevent UI overflow
        const total = Math.min(gridSize || 9, 16);

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
        } else if (total <= 16) {
            grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
            grid.classList.add('grid-large');
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
            // Three basket mode: Animals, Foods, Vehicles
            cat1 = 'ANIMALS';
            cat2 = 'FOODS';
            cat3 = 'VEHICLES';
            b1Label = TXT.cat_ANIMALS;
            b2Label = TXT.cat_FOODS;
            b3Label = TXT.cat_VEHICLES;
            icon1 = '🐶';
            icon2 = '🍎';
            icon3 = '🚗';
        } else if (variation === 'living') {
            cat1 = 'ANIMALS'; // Represents Living (Animals + Nature)
            cat2 = 'FOODS';   // Represents Non-Living
            b1Label = TXT.cat_LIVING || (LANG === 'si' ? "පණ ඇති" : "Living");
            b2Label = TXT.cat_NON_LIVING || (LANG === 'si' ? "පණ නැති" : "Non-Living");
            icon1 = '🌸'; // Flower represents nature/life
            icon2 = '🚗'; // Car represents non-living
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
            const animals = EmojiBank.getRandomSet('ANIMALS', 2);
            const foods = EmojiBank.getRandomSet('FOODS', 2);
            const vehicles = EmojiBank.getRandomSet('VEHICLES', 2);
            allItems = [...animals, ...foods, ...vehicles].sort(() => Math.random() - 0.5);
        } else if (variation === 'living') {
            const animals = EmojiBank.getRandomSet('ANIMALS', 2);

            // Mix Nature and Living Foods for the 3rd living item
            const plantTypes = [...EmojiBank.getLivingFoods(), ...EmojiBank.getRandomSet('NATURE', 5).filter(n => EmojiBank.isLiving(n.char))];
            const randomPlant = plantTypes[Math.floor(Math.random() * plantTypes.length)];

            // Non-Living items: Vehicle, Non-Living Food, Shape
            const vehicle = EmojiBank.getRandom('VEHICLES');
            const processedFoods = EmojiBank.getNonLivingFoods();
            const junkFood = processedFoods[Math.floor(Math.random() * processedFoods.length)];
            const shape = EmojiBank.getRandom('SHAPES');

            // 3 Living vs 3 Non-Living = 6 Items Total
            allItems = [...animals, randomPlant, vehicle, junkFood, shape].sort(() => Math.random() - 0.5);
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
                if (EmojiBank.ANIMALS.some(e => e.char === item.char)) itemCategory = '1';
                else if (EmojiBank.FOODS.some(e => e.char === item.char)) itemCategory = '2';
                else if (EmojiBank.VEHICLES.some(e => e.char === item.char)) itemCategory = '3';
            } else if (variation === 'living') {
                // Correct Logic: Living (Animals/Nature) -> Basket 1, Non-Living (Food/Vehicles) -> Basket 2
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
                const threshold = window.innerWidth * 0.15; // 15% of width threshold
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
                // Removed auto-solve logic. User must drag to play.
                // Optional: Hint animation if user taps instead of drags?
                if (!el.hasMoved) {
                    el.animate([
                        { transform: 'rotate(0deg)' },
                        { transform: 'rotate(-5deg)' },
                        { transform: 'rotate(5deg)' },
                        { transform: 'rotate(0deg)' }
                    ], { duration: 200 });
                }
            };
            itemsRow.appendChild(el);
        });
        container.appendChild(itemsRow); container.appendChild(basketsRow);
        this.viewport.appendChild(container);
    }

    checkAnswer(isCorrect, element) {
        if (isCorrect) {
            this.app.audio.playSfx('correct');
            // Show large graphical feedback
            this.showFeedback('🎉');

            // Highlight element if provided
            if (element) {
                element.style.transform = 'scale(1.2)';
                element.style.boxShadow = '0 0 5vmin #4CAF50';
                element.style.zIndex = '100';
                setTimeout(() => {
                    element.style.transform = '';
                    element.style.boxShadow = '';
                    element.style.zIndex = '';
                }, 500);
            }

            this.app.store.update(s => {
                s.progress.correctAnswers++;
                if (s.progress.correctAnswers % 3 === 0) s.progress.level++;
            });

            setTimeout(() => this.showCelebration(), 800); // Delay slightly for feedback to register
        } else {
            this.app.audio.playSfx('wrong');
            this.showFeedback('❌'); // Large cross
            if (element) {
                element.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(2vmin)' },
                    { transform: 'translateX(-2vmin)' },
                    { transform: 'translateX(0)' }
                ], { duration: 300 });
                element.style.backgroundColor = '#FFEBEE'; // Slight red tint
                setTimeout(() => element.style.backgroundColor = '', 300);
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
        container.style.gap = '3vmin';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_sub(n1, n2);
        this.setInstruction(instructionDiv.innerText);
        container.appendChild(instructionDiv);

        const visualDiv = document.createElement('div');
        visualDiv.className = 'flex-center';
        visualDiv.style.flexWrap = 'wrap';
        visualDiv.style.maxWidth = '80vw';

        // Only show visuals for non-symbolic variation
        if (this.levelData.variation !== 'symbolic') {
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
        } else {
            // Update instruction for symbolic mode
            const instrSym = TXT.instr_add_sym || "Solve the problem!";
            instructionDiv.innerText = instrSym;
            this.setInstruction(instrSym);
        }

        const equationDiv = document.createElement('div');
        equationDiv.className = 'flex-center';
        equationDiv.style.fontSize = '4rem';
        equationDiv.style.fontWeight = 'bold';
        equationDiv.style.marginTop = '3vmin';
        equationDiv.innerHTML = `${n1} - ${n2} = <span id="q-mark">?</span>`;
        container.appendChild(equationDiv);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row';

        const options = this.generateNumericOptions(ans, 3, 5);

        options.forEach(opt => {
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
                .sub-item { font-size: 6vmin; margin: 1vmin; transition: all 0.5s; position: relative; }
                .sub-item.removed { 
                    animation: fly-away 1s forwards;
                    opacity: 0;
                    pointer-events: none;
                }
                @keyframes fly-away {
                    0% { transform: scale(1) translate(0, 0) rotate(0deg); opacity: 1; }
                    100% { transform: scale(0.5) translate(20vmin, -20vmin) rotate(45deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupMemoryGame() {
        const difficulty = this.app.store.state.progress.level || 1;
        const gridSize = GameGenerator.getMemoryGridSize(difficulty);
        const numPairs = gridSize / 2;
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
        container.className = 'memory-game full-screen flex-center column';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_mem;
        this.setInstruction(TXT.instr_mem);
        container.appendChild(instructionDiv);

        const grid = document.createElement('div');
        grid.className = 'memory-grid';

        // Dynamic grid columns
        if (gridSize === 16) {
            grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
            grid.style.maxWidth = '90vmin';
        } else if (gridSize === 12) {
            grid.style.gridTemplateColumns = 'repeat(4, 1fr)'; // 4x3
        } else if (gridSize === 8) {
            grid.style.gridTemplateColumns = 'repeat(4, 1fr)'; // 4x2
        } else {
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)'; // 2x2
        }

        let firstCard = null;
        let locked = false;
        let matches = 0;

        cards.forEach(emoji => {
            const card = document.createElement('div');
            card.className = 'mem-card';
            card.innerHTML = `<div class="front">❓</div><div class="back">${emoji.char}</div>`;

            card.onclick = () => {
                if (locked || card.classList.contains('flipped') || card.classList.contains('matched')) return;

                this.app.audio.playSfx('pop');
                card.classList.add('flipped');

                if (!firstCard) {
                    firstCard = card;
                } else {
                    locked = true;
                    // Check match
                    if (firstCard.querySelector('.back').innerText === emoji.char) {
                        setTimeout(() => {
                            this.app.audio.playSfx('correct');
                            firstCard.classList.add('matched');
                            card.classList.add('matched');
                            firstCard = null;
                            locked = false;
                            matches++;
                            if (matches === numPairs) {
                                setTimeout(() => this.checkAnswer(true), 500);
                            }
                        }, 500);
                    } else {
                        setTimeout(() => {
                            this.app.audio.playSfx('wrong');
                            firstCard.classList.remove('flipped');
                            card.classList.remove('flipped');
                            firstCard = null;
                            locked = false;
                        }, 1000);
                    }
                }
            };
            grid.appendChild(card);
        });

        container.appendChild(grid);
        this.viewport.appendChild(container);

        // Inject styles
        if (!document.getElementById('mem-style')) {
            const s = document.createElement('style');
            s.id = 'mem-style';
            s.innerHTML = `
                .memory-grid { display: grid; gap: 1.5vmin; padding: 1.5vmin; }
                .mem-card { 
                    width: 16vmin; height: 16vmin; 
                    position: relative; transform-style: preserve-3d; transition: transform 0.5s; 
                    cursor: pointer;
                }
                .mem-card.flipped { transform: rotateY(180deg); }
                .mem-card .front, .mem-card .back {
                    position: absolute; width: 100%; height: 100%;
                    backface-visibility: hidden;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 4vmin; border-radius: 2vmin;
                    box-shadow: 0 0.5vmin 1vmin rgba(0,0,0,0.1);
                }
                .mem-card .front { background: #FF9800; color: white; }
                .mem-card .back { background: white; transform: rotateY(180deg); border: 0.4vmin solid #FF9800; }
                .mem-card.matched { visibility: hidden; opacity: 0; transition: opacity 0.5s; }
            `;
            document.head.appendChild(s);
        }
    }

    /* --- NEW 5-YEAR GAMES --- */

    setupTimeGame() {
        // Simple clock game: O'clock or Half-past
        const { variation } = this.levelData;
        const isHalfPast = variation === 'half_past';

        let hour = Math.floor(Math.random() * 12) + 1;
        let minute = isHalfPast ? 30 : 0;

        const container = document.createElement('div');
        container.className = 'time-game flex-center column';
        container.style.gap = '3vmin';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_time;
        this.setInstruction(TXT.instr_time);
        container.appendChild(instructionDiv);

        // Clock Face
        const clock = document.createElement('div');
        clock.className = 'clock-face';

        // Numbers
        // Numbers - using percentages
        for (let i = 1; i <= 12; i++) {
            const num = document.createElement('div');
            num.className = 'clock-num';
            num.innerText = i;
            const angle = (i * 30 - 90) * (Math.PI / 180); // -90 to start at 12
            // Radius as percentage (e.g., 40% of container)
            const r = 40;
            const x = 50 + r * Math.cos(angle);
            const y = 50 + r * Math.sin(angle);
            num.style.left = x + '%';
            num.style.top = y + '%';
            clock.appendChild(num);
        }

        // Hands
        const center = document.createElement('div');
        center.className = 'clock-center';
        clock.appendChild(center);

        // Hour Hand
        // Hour moves slightly if half past? simplified: just point to hour or halfway
        const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
        const hourHand = document.createElement('div');
        hourHand.className = 'hand hour-hand';
        hourHand.style.transform = `rotate(${hourAngle}deg)`;
        clock.appendChild(hourHand);

        // Minute Hand
        const minAngle = minute * 6;
        const minHand = document.createElement('div');
        minHand.className = 'hand min-hand';
        minHand.style.transform = `rotate(${minAngle}deg)`;
        clock.appendChild(minHand);

        container.appendChild(clock);

        // Options
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row';

        const formatTime = (h, m) => `${h}:${m.toString().padStart(2, '0')}`;
        const correctTime = formatTime(hour, minute);

        const options = [correctTime];
        // Generate time distractors manually since they are strings
        let attempts = 0;
        while (options.length < 3 && attempts < 20) {
            attempts++;
            let h = Math.floor(Math.random() * 12) + 1;
            let m = isHalfPast ? 30 : 0;
            // Mixed variation sometimes? Keep simple for now
            if (this.levelData.difficulty > 8 && Math.random() > 0.5) m = m === 0 ? 30 : 0; // Swap min

            const t = formatTime(h, m);
            if (t !== correctTime && !options.includes(t)) options.push(t);
        }

        options.sort(() => Math.random() - 0.5).forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-tile option';
            btn.innerText = opt;
            btn.onclick = () => this.checkAnswer(opt === correctTime, btn);
            if (opt === correctTime) this.correctTargetElement = btn;
            optionsDiv.appendChild(btn);
        });

        container.appendChild(optionsDiv);
        this.viewport.appendChild(container);

        if (!document.getElementById('clock-style')) {
            const s = document.createElement('style');
            s.id = 'clock-style';
            s.innerHTML = `
                .clock-face { 
                    background: white; border: 1.5vmin solid #3F51B5; border-radius: 50%; 
                    position: relative; box-shadow: 0 1vmin 3vmin rgba(0,0,0,0.2);
                    width: 60vmin; height: 60vmin;
                    margin-bottom: 3vmin;
                }
                .clock-num {
                    position: absolute; width: 6vmin; height: 6vmin; 
                    text-align: center; line-height: 6vmin; font-weight: bold; color: #333;
                    font-size: 4vmin;
                    transform: translate(-50%, -50%);
                }
                .clock-center {
                    position: absolute; width: 3vmin; height: 3vmin; background: #333; 
                    border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 10;
                }
                .hand {
                    position: absolute; bottom: 50%; left: 50%; transform-origin: bottom center;
                    background: #333; border-radius: 1vmin;
                }
                .hour-hand {
                    width: 1.5vmin; height: 25%; background: #3F51B5; margin-left: -0.75vmin; z-index: 5;
                }
                .min-hand {
                    width: 1vmin; height: 35%; background: #E91E63; margin-left: -0.5vmin; z-index: 6;
                }
            `;
            document.head.appendChild(s);
        }
    }

    setupFractionGame() {
        const { variation } = this.levelData;
        const available = variation === 'advanced'
            ? [{ n: 1, d: 2 }, { n: 1, d: 3 }, { n: 1, d: 4 }, { n: 2, d: 3 }, { n: 3, d: 4 }]
            : [{ n: 1, d: 2 }, { n: 1, d: 4 }, { n: 1, d: 3 }];

        const targetFrac = available[Math.floor(Math.random() * available.length)];

        const container = document.createElement('div');
        container.className = 'fraction-game flex-center column';
        container.style.gap = '3vmin';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_fraction;
        this.setInstruction(TXT.instr_fraction);
        container.appendChild(instructionDiv);

        // --- Visualization Logic ---
        // Decide which shape to use
        // simple: Pie is always okay. Bar is always okay. Grid is good for 4 (2x2) or even numbers, but let's stick to 4 for 5-6yo 2x2.

        let shapes = ['pie', 'bar'];
        if (targetFrac.d === 4) shapes.push('grid');
        // Triangle works well for 1/2, 1/3, 1/4 (sub-triangles)
        if ([2, 3, 4].includes(targetFrac.d)) shapes.push('triangle');
        // Hexagon works well for 1/2, 1/3, 1/6 (but we don't have 1/6 yet, so just 2, 3)
        if ([2, 3].includes(targetFrac.d)) shapes.push('hexagon');

        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        let visualEl;

        if (shapeType === 'pie') {
            visualEl = this.renderPie(targetFrac);
        } else if (shapeType === 'bar') {
            visualEl = this.renderBar(targetFrac);
        } else if (shapeType === 'triangle') {
            visualEl = this.renderTriangle(targetFrac);
        } else if (shapeType === 'hexagon') {
            visualEl = this.renderHexagon(targetFrac);
        } else {
            visualEl = this.renderGrid(targetFrac);
        }

        container.appendChild(visualEl);
        // ---------------------------

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row';

        const formatFrac = (f) => `${f.n}/${f.d}`;
        const correctStr = formatFrac(targetFrac);

        let options = [correctStr];
        let attempts = 0;
        while (options.length < 3 && attempts < 20) {
            attempts++;
            let f = available[Math.floor(Math.random() * available.length)];
            let s = formatFrac(f);
            if (s !== correctStr && !options.includes(s)) options.push(s);

            if (attempts > 10 && options.length < 3) {
                const d = Math.floor(Math.random() * 5) + 2;
                const fake = `1/${d}`;
                if (!options.includes(fake)) options.push(fake);
            }
        }

        options.sort(() => Math.random() - 0.5).forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-tile option';
            const [num, den] = opt.split('/');
            btn.innerHTML = `<div class="frac"><span class="num">${num}</span><span class="bar">/</span><span class="den">${den}</span></div>`;
            btn.onclick = () => this.checkAnswer(opt === correctStr, btn);
            if (opt === correctStr) this.correctTargetElement = btn;
            optionsDiv.appendChild(btn);
        });

        container.appendChild(optionsDiv);
        this.viewport.appendChild(container);

        if (!document.getElementById('frac-style')) {
            const s = document.createElement('style');
            s.id = 'frac-style';
            s.innerHTML = `
                .pie-chart { 
                    width: 40vmin; height: 40vmin; border-radius: 50%; 
                    border: 0.8vmin solid #555; position: relative;
                    margin-bottom: 3vmin;
                }
                .pie-lines {
                    position: absolute; top:0; left:0; width:100%; height:100%;
                    border-radius: 50%;
                }
                .bar-chart {
                    width: 60vmin; height: 15vmin; border: 0.8vmin solid #555;
                    display: flex; position: relative;
                    border-radius: 2vmin; overflow: hidden;
                    margin-bottom: 3vmin;
                }
                .bar-segment {
                    height: 100%; border-right: 0.4vmin solid #555;
                    box-sizing: border-box;
                }
                .bar-segment:last-child { border-right: none; }
                
                .grid-chart {
                    display: grid; gap: 1vmin; padding: 1vmin;
                    border: 0.8vmin solid #555; border-radius: 2vmin;
                    margin-bottom: 3vmin;
                }
                .grid-cell {
                    width: 15vmin; height: 15vmin;
                    border: 0.4vmin solid #ccc; border-radius: 1vmin;
                }
                .grid-cell.fill { background: #4CAF50; border-color: #388E3C; }

                .frac { display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; }
                .frac .num { border-bottom: 0.4vmin solid #333; padding-bottom: 0.4vmin; }
                .frac .den { padding-top: 0.4vmin; }
                .frac .bar { display: none; }
                .btn-tile .frac { font-size: 4vmin; font-weight: bold; }

                .tri-chart {
                    width: 40vmin; height: 35vmin;
                    margin-bottom: 3vmin;
                }
                .hex-chart {
                    width: 40vmin; height: 40vmin;
                    margin-bottom: 3vmin;
                }
                .tri-svg, .hex-svg {
                    width: 100%; height: 100%;
                    overflow: visible; /* Ensure strokes don't clip */
                }
            `;
            document.head.appendChild(s);
        }
    }

    renderPie(frac) {
        const pie = document.createElement('div');
        pie.className = 'pie-chart animate-pop';

        // Use SVG for robust rendering on all devices
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "-1 -1 2 2");
        svg.style.transform = "rotate(-90deg)"; // Start at 12 o'clock
        svg.setAttribute("class", "pie-svg");
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.borderRadius = "50%";

        // Background circle
        const bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        bg.setAttribute("bx", "0"); bg.setAttribute("cy", "0"); bg.setAttribute("r", "1");
        bg.setAttribute("fill", "#E0E0E0");
        svg.appendChild(bg);

        // Filled sectors
        // Calculate cumulative percent for multiple sectors if needed, 
        // but for 1/n we just fill 0 to angle.
        // For n/d, we fill n sectors.

        const totalSlices = frac.d;
        const filledSlices = frac.n;

        // We can draw one large sector or multiple depending on style.
        // Let's draw the filled portion as one arc.
        const percent = filledSlices / totalSlices;
        const largeArcFlag = percent > 0.5 ? 1 : 0;
        const endX = Math.cos(2 * Math.PI * percent);
        const endY = Math.sin(2 * Math.PI * percent);

        const pathData = `M 0 0 L 1 0 A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

        const segment = document.createElementNS("http://www.w3.org/2000/svg", "path");
        segment.setAttribute("d", pathData);
        segment.setAttribute("fill", "#4CAF50");
        svg.appendChild(segment);

        // Draw dividing lines
        // We need lines at every 1/d interval
        for (let i = 0; i < totalSlices; i++) {
            const angle = (i / totalSlices) * 2 * Math.PI;
            const x = Math.cos(angle);
            const y = Math.sin(angle);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", "0");
            line.setAttribute("x2", x);
            line.setAttribute("y2", y);
            line.setAttribute("stroke", "#555");
            line.setAttribute("stroke-width", "0.02"); // Relative to viewBox size 2
            svg.appendChild(line);
        }

        pie.appendChild(svg);
        return pie;
    }

    renderBar(frac) {
        const bar = document.createElement('div');
        bar.className = 'bar-chart animate-pop';

        // We can just create 'd' divs, and color 'n' of them
        for (let i = 0; i < frac.d; i++) {
            const seg = document.createElement('div');
            seg.className = 'bar-segment';
            seg.style.flex = '1';
            seg.style.background = (i < frac.n) ? '#2196F3' : '#E0E0E0'; // Blue for bar
            bar.appendChild(seg);
        }
        return bar;
    }

    renderGrid(frac) {
        const grid = document.createElement('div');
        grid.className = 'grid-chart animate-pop';

        // Robust grid logic
        let cols = 2;
        if (frac.d % 3 === 0) cols = 3;
        else if (frac.d % 4 === 0) cols = 4;
        else if (frac.d > 4) cols = Math.ceil(Math.sqrt(frac.d)); // Square-ish

        grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        for (let i = 0; i < frac.d; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            if (i < frac.n) cell.classList.add('fill');
            grid.appendChild(cell);
        }
        return grid;
    }

    renderTriangle(frac) {
        const tri = document.createElement('div');
        tri.className = 'tri-chart animate-pop';
        // SVG Triangle
        // Points: Top(100,0), Left(0, 173), Right(200, 173) -> Equilateral
        // Viewbox 0 0 200 173

        let pathD = "";
        let fillPaths = [];

        // Triangle Coords
        const p1 = { x: 100, y: 10 };  // Top
        const p2 = { x: 10, y: 165 };  // Bottom Left
        const p3 = { x: 190, y: 165 }; // Bottom Right
        const center = { x: 100, y: 113 }; // Centroid approx

        if (frac.d === 2) {
            // Split vertical
            // Left half filled?
            const midBase = { x: 100, y: 165 };
            fillPaths.push(`M${p1.x},${p1.y} L${p2.x},${p2.y} L${midBase.x},${midBase.y} Z`);
            // Lines
            pathD = `M${p1.x},${p1.y} L${midBase.x},${midBase.y}`;
        } else if (frac.d === 3) {
            // Split to center
            // Fill 1/3 (Top-Right section? or Bottom?)
            // P1-Center-P3
            fillPaths.push(`M${p1.x},${p1.y} L${p3.x},${p3.y} L${center.x},${center.y} Z`);

            // Lines
            pathD = `M${p1.x},${p1.y} L${center.x},${center.y} M${p2.x},${p2.y} L${center.x},${center.y} M${p3.x},${p3.y} L${center.x},${center.y}`;
        } else if (frac.d === 4) {
            // 4 sub triangles
            // Midpoints
            const m12 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
            const m23 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
            const m31 = { x: (p3.x + p1.x) / 2, y: (p3.y + p1.y) / 2 };

            // Fill top one
            fillPaths.push(`M${p1.x},${p1.y} L${m12.x},${m12.y} L${m31.x},${m31.y} Z`);

            // Lines
            pathD = `M${m12.x},${m12.y} L${m23.x},${m23.y} L${m31.x},${m31.y} L${m12.x},${m12.y}`;
        }

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 200 180");
        svg.setAttribute("class", "tri-svg");

        // Base Triangle Outline
        const base = document.createElementNS("http://www.w3.org/2000/svg", "path");
        base.setAttribute("d", `M${p1.x},${p1.y} L${p2.x},${p2.y} L${p3.x},${p3.y} Z`);
        base.setAttribute("fill", "#E0E0E0");
        base.setAttribute("stroke", "#555");
        base.setAttribute("stroke-width", "4");
        svg.appendChild(base);

        // Filled Sections
        // Filled Sections
        const fillPolys = [];
        if (frac.d === 3) {
            // Rhombus-like sections for 3rds?
            // Center -> P1 -> P2 -> Center is too big? No, it's 1/3?
            // Triangle area = 3 equal areas meeting at center.
            fillPolys.push(`M${p1.x},${p1.y} L${p3.x},${p3.y} L${center.x},${center.y} Z`); // Right
            fillPolys.push(`M${p1.x},${p1.y} L${p2.x},${p2.y} L${center.x},${center.y} Z`); // Left
            // Third one would be bottom: P2-P3-Center
            fillPolys.push(`M${p2.x},${p2.y} L${p3.x},${p3.y} L${center.x},${center.y} Z`); // Bottom
        } else if (frac.d === 4) {
            const m12 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
            const m23 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
            const m31 = { x: (p3.x + p1.x) / 2, y: (p3.y + p1.y) / 2 };
            fillPolys.push(`M${p1.x},${p1.y} L${m12.x},${m12.y} L${m31.x},${m31.y} Z`); // Top
            fillPolys.push(`M${p2.x},${p2.y} L${m12.x},${m12.y} L${m23.x},${m23.y} Z`); // Left
            fillPolys.push(`M${p3.x},${p3.y} L${m31.x},${m31.y} L${m23.x},${m23.y} Z`); // Right
            fillPolys.push(`M${m12.x},${m12.y} L${m23.x},${m23.y} L${m31.x},${m31.y} Z`); // Center
        } else if (frac.d === 2) {
            const midBase = { x: 100, y: 165 };
            fillPolys.push(`M${p1.x},${p1.y} L${p2.x},${p2.y} L${midBase.x},${midBase.y} Z`);
        }

        for (let i = 0; i < frac.n && i < fillPolys.length; i++) {
            const patch = document.createElementNS("http://www.w3.org/2000/svg", "path");
            patch.setAttribute("d", fillPolys[i]);
            patch.setAttribute("fill", "#4CAF50");
            svg.appendChild(patch);
        }

        // Division Lines
        const lines = document.createElementNS("http://www.w3.org/2000/svg", "path");
        lines.setAttribute("d", pathD);
        lines.setAttribute("stroke", "#555");
        lines.setAttribute("stroke-width", "2");
        lines.setAttribute("fill", "none");
        svg.appendChild(lines);

        tri.appendChild(svg);
        return tri;
    }

    renderHexagon(frac) {
        const hex = document.createElement('div');
        hex.className = 'hex-chart animate-pop';

        // Hexagon Points (Center 100,100, Radius 90)
        // Flat top? No, pointy top usually better for vertical split. Let's do Pointy Top.
        // Angles: 30, 90, 150, 210, 270, 330
        const r = 90; const cx = 100; const cy = 100;
        const pts = [];
        for (let i = 0; i < 6; i++) {
            const ag = (30 + i * 60) * Math.PI / 180;
            pts.push({ x: cx + r * Math.cos(ag), y: cy + r * Math.sin(ag) });
        }
        // pts[0] is bottom-right-ish (30deg)

        let pathD = "";

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 200 200");
        svg.setAttribute("class", "hex-svg");

        const base = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        base.setAttribute("points", pts.map(p => `${p.x},${p.y}`).join(" "));
        base.setAttribute("fill", "#E0E0E0");
        base.setAttribute("stroke", "#555");
        base.setAttribute("stroke-width", "4");
        svg.appendChild(base);

        if (frac.d === 2) {
            // Vertical Split
            const patch = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            // Points 1, 2, 3, 4 ?? 
            // 30(0), 90(1 - Bottom), 150(2), 210(3), 270(4 - Top), 330(5)
            // Left half: 2, 3, 4. Center is split.
            patch.setAttribute("points", `${pts[1].x},${pts[1].y} ${pts[2].x},${pts[2].y} ${pts[3].x},${pts[3].y} ${pts[4].x},${pts[4].y}`);
            patch.setAttribute("fill", "#2196F3");
            svg.appendChild(patch);

            pathD = `M${pts[1].x},${pts[1].y} L${pts[4].x},${pts[4].y}`;
        } else if (frac.d === 3) {
            // 3 Rhombuses
            // Center to 1(90), Center to 3(210), Center to 5(330)
            const center = { x: 100, y: 100 };
            const patches = [];
            pathD = `M${center.x},${center.y} L${pts[1].x},${pts[1].y} M${center.x},${center.y} L${pts[3].x},${pts[3].y} M${center.x},${center.y} L${pts[5].x},${pts[5].y}`;

            // Define patches for 3rds
            patches.push(`${center.x},${center.y} ${pts[5].x},${pts[5].y} ${pts[0].x},${pts[0].y} ${pts[1].x},${pts[1].y}`);
            patches.push(`${center.x},${center.y} ${pts[1].x},${pts[1].y} ${pts[2].x},${pts[2].y} ${pts[3].x},${pts[3].y}`);
            patches.push(`${center.x},${center.y} ${pts[3].x},${pts[3].y} ${pts[4].x},${pts[4].y} ${pts[5].x},${pts[5].y}`);

            if (patches.length > 0) {
                for (let i = 0; i < frac.n && i < patches.length; i++) {
                    const patch = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                    patch.setAttribute("points", patches[i]);
                    patch.setAttribute("fill", "#2196F3");
                    svg.appendChild(patch);
                }
            } else if (frac.d === 2 && frac.n === 1) {
                // Simple split for half (left side)
                const patch = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                patch.setAttribute("points", `${pts[1].x},${pts[1].y} ${pts[2].x},${pts[2].y} ${pts[3].x},${pts[3].y} ${pts[4].x},${pts[4].y}`);
                patch.setAttribute("fill", "#2196F3");
                svg.appendChild(patch);
            }
        }

        const lines = document.createElementNS("http://www.w3.org/2000/svg", "path");
        lines.setAttribute("d", pathD);
        lines.setAttribute("stroke", "#555");
        lines.setAttribute("stroke-width", "2");
        lines.setAttribute("fill", "none");
        svg.appendChild(lines);

        hex.appendChild(svg);
        return hex;
    }

    setupShapeAdvGame() {
        // 3D Shapes: Cube, Sphere, Cylinder, Cone
        // Using Emojis or CSS? Emojis are easier but might vary.
        // Let's use CSS 3D for "cool" factor or specific images?
        // Let's try Emojis first, if they look bad we swap. 
        // 🧊 (Ice/Cube), ⚾ (Sphere-ish), 🥫 (Cylinder), 🎉 (Cone-ish)
        // Better: Custom SVG or CSS. 
        // Let's use simple CSS 2D representations of 3D logic?
        // Actually, just standard items that ARE that shape is better for kids.
        // "Find the Sphere" -> Show Ball, Marble, Orange

        const shapes = [
            // 3D Shapes
            { id: 'cube', label: { en: 'Cube', si: 'ඝනකය' }, items: ['🧊', '📦', '🎲'] },
            { id: 'sphere', label: { en: 'Sphere', si: 'ගෝලය' }, items: ['⚽', '🔮', '🍊', '🧶', '🌕'] },
            { id: 'cylinder', label: { en: 'Cylinder', si: 'සිලින්ඩරය' }, items: ['🛢️', '🥫', '🔋', '🕯️'] },
            { id: 'cone', label: { en: 'Cone', si: 'කේතුව' }, items: ['🍦', '🎉'] },

            // 2D Shapes (New Variety)
            { id: 'circle', label: { en: 'Circle', si: 'කවය' }, items: ['🔴', '🔵', '🟢', '🟡', '⚫', '⚪'] },
            { id: 'square', label: { en: 'Square', si: 'සතරැස' }, items: ['🟥', '🟦', '🟩', '🟨', '⬛', '⬜'] },
            { id: 'triangle', label: { en: 'Triangle', si: 'ත්‍රිකෝණය' }, items: ['🔺', '🔻'] },
            { id: 'star', label: { en: 'Star', si: 'තරුව' }, items: ['⭐', '🌟'] }
        ];

        const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
        const targetItem = targetShape.items[Math.floor(Math.random() * targetShape.items.length)];

        const container = document.createElement('div');
        container.className = 'shape-game flex-center column';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        // "Find the Cube!"
        const name = LANG === 'si' ? targetShape.label.si : targetShape.label.en;
        // Generic instruction fallback if specific mapping fails
        const msg = (TXT.instr_shape_adv || "Find the Shape!").replace("3D shape", name).replace("ත්‍රිමාණ හැඩය", name);
        instructionDiv.innerText = msg;
        this.setInstruction(msg);
        container.appendChild(instructionDiv);

        const grid = document.createElement('div');
        grid.className = 'shape-grid grid-medium';
        grid.style.marginTop = '3vmin';

        let gridItems = [{ ...targetShape, char: targetItem, isTarget: true }];
        // Fill with distractors
        const total = 4; // 2x2 grid is enough for 3D recognition
        while (gridItems.length < total) {
            const distShape = shapes[Math.floor(Math.random() * shapes.length)];
            if (distShape.id === targetShape.id) continue;
            const distItem = distShape.items[Math.floor(Math.random() * distShape.items.length)];
            // Avoid duplicates
            if (!gridItems.some(x => x.char === distItem)) {
                gridItems.push({ ...distShape, char: distItem, isTarget: false });
            }
        }

        gridItems.sort(() => Math.random() - 0.5);

        gridItems.forEach(item => {
            const el = document.createElement('div');
            el.className = 'grid-item animate-pop';
            el.innerText = item.char;
            el.onclick = () => this.checkAnswer(item.isTarget, el);
            if (item.isTarget) this.correctTargetElement = el;
            grid.appendChild(el);
        });

        container.appendChild(grid);
        this.viewport.appendChild(container);
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
            <h1 style="color:white; font-size:8vmin; text-shadow:0 1vmin 2vmin rgba(0,0,0,0.5)">${randomPhrase}</h1>
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
            const stickerObj = EmojiBank.getRandomSticker();
            // Use translation for sticker name
            const stickerName = EmojiBank.getName(stickerObj);
            if (this.app.store.unlockSticker(stickerObj.char)) {
                setTimeout(() => {
                    overlay.innerHTML = `
                        <div class="celebration-emoji animate-pop">🎁</div>
                        <h1 style="color:white; font-size:6vmin;">${TXT.new_sticker}</h1>
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

    setupSequenceGame() {
        const diff = this.levelData.difficulty;
        let start = Math.floor(Math.random() * 50) + 1; // Updated to 50 for 5-6 year olds
        let step = 1;
        if (diff > 5) step = Math.random() > 0.5 ? 2 : 1;
        if (diff > 8) step = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3 for advanced

        const length = 5;
        let sequence = [];
        for (let i = 0; i < length; i++) sequence.push(start + (i * step));

        // Hide one
        const hideIdx = Math.floor(Math.random() * length);
        const answer = sequence[hideIdx];
        sequence[hideIdx] = '?';

        const container = document.createElement('div');
        container.className = 'sequence-game flex-center column';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_sequence || "Find the missing number!";
        this.setInstruction(instructionDiv.innerText);
        container.appendChild(instructionDiv);

        const seqRow = document.createElement('div');
        seqRow.className = 'sequence-row';
        sequence.forEach((val, i) => {
            const el = document.createElement('div');
            el.className = val === '?' ? 'seq-item question' : 'seq-item';
            el.innerText = val;
            if (val === '?') {
                el.id = 'seq-missing';
                el.onclick = () => this.app.audio.playSfx('pop');
            }
            seqRow.appendChild(el);
        });
        container.appendChild(seqRow);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row';

        const options = this.generateNumericOptions(answer, 3, 5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-tile option';
            btn.innerText = opt;
            btn.onclick = () => {
                if (opt === answer) {
                    this.element.querySelector('#seq-missing').innerText = answer;
                    this.element.querySelector('#seq-missing').classList.remove('question');
                    this.checkAnswer(true, btn);
                } else this.checkAnswer(false, btn);
            };
            if (opt === answer) this.correctTargetElement = btn;
            optionsDiv.appendChild(btn);
        });
        container.appendChild(optionsDiv);
        this.viewport.appendChild(container);
    }

    setupMultiplicationGame() {
        const diff = this.levelData.difficulty;
        const maxFactor = diff > 6 ? 5 : 3;
        const groups = Math.floor(Math.random() * maxFactor) + 2; // 2 to 5
        const perGroup = Math.floor(Math.random() * maxFactor) + 1; // 1 to 5
        const answer = groups * perGroup;
        const emoji = EmojiBank.getRandom();

        const container = document.createElement('div');
        container.className = 'mult-game flex-center column';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        // Fallback for missing string
        instructionDiv.innerText = (TXT.instr_mult && TXT.instr_mult(groups, perGroup)) || `${groups} groups of ${perGroup}. How many in total?`;
        this.setInstruction(instructionDiv.innerText);
        container.appendChild(instructionDiv);

        const visualDiv = document.createElement('div');
        visualDiv.className = 'mult-visual';
        for (let i = 0; i < groups; i++) {
            const g = document.createElement('div');
            g.className = 'group-box';
            g.style.border = '0.4vmin dashed #ccc';
            g.style.padding = '1vmin';
            g.style.margin = '1vmin';
            for (let j = 0; j < perGroup; j++) {
                g.innerHTML += `<span style="font-size:4vmin">${emoji.char}</span>`;
            }
            visualDiv.appendChild(g);
        }
        container.appendChild(visualDiv);

        const eqDiv = document.createElement('div');
        eqDiv.className = 'equation';
        eqDiv.style.fontSize = '6vmin';
        eqDiv.innerHTML = `${groups} x ${perGroup} = ?`;
        container.appendChild(eqDiv);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row';

        const options = this.generateNumericOptions(answer, 3, 5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-tile option';
            btn.innerText = opt;
            btn.onclick = () => {
                if (opt === answer) {
                    eqDiv.innerHTML = `${groups} x ${perGroup} = ${answer}`;
                    this.checkAnswer(true, btn);
                } else this.checkAnswer(false, btn);
            };
            if (opt === answer) this.correctTargetElement = btn;
            optionsDiv.appendChild(btn);
        });
        container.appendChild(optionsDiv);
        this.viewport.appendChild(container);
    }

    setupGreaterLessGame() {
        const max = 50;
        const n1 = Math.floor(Math.random() * max) + 1;
        let n2;
        do { n2 = Math.floor(Math.random() * max) + 1; } while (n2 === n1);

        const container = document.createElement('div');
        container.className = 'gl-game flex-center column';
        container.style.gap = '5vmin';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = TXT.instr_greater_less || "Which number is greater?";
        this.setInstruction(instructionDiv.innerText);
        container.appendChild(instructionDiv);

        const compareRow = document.createElement('div');
        compareRow.className = 'flex-center';
        compareRow.style.gap = '6vmin';

        const b1 = document.createElement('button');
        b1.className = 'btn-tile giant';
        b1.innerText = n1;
        b1.onclick = () => this.checkAnswer(n1 > n2, b1);

        const b2 = document.createElement('button');
        b2.className = 'btn-tile giant';
        b2.innerText = n2;
        b2.onclick = () => this.checkAnswer(n2 > n1, b2);

        compareRow.appendChild(b1);
        compareRow.appendChild(document.createTextNode('vs'));
        compareRow.appendChild(b2);

        if (n1 > n2) this.correctTargetElement = b1;
        else this.correctTargetElement = b2;

        container.appendChild(compareRow);
        this.viewport.appendChild(container);
    }

    setupSymbolicAdd() {
        const max = 50; // Updated to 50 for 5-6 year olds
        const n1 = Math.floor(Math.random() * max) + 1;
        const n2 = Math.floor(Math.random() * max) + 1;
        const ans = n1 + n2;

        this._setupSymbolicOp(n1, n2, '+', ans, TXT.instr_add_sym || "Solve the problem!");
    }

    setupSymbolicSub() {
        const max = 50; // Updated to 50 for 5-6 year olds
        const n1 = Math.floor(Math.random() * max) + 5;
        const n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
        const ans = n1 - n2;

        this._setupSymbolicOp(n1, n2, '-', ans, TXT.instr_add_sym || "Solve the problem!");
    }

    setupMathWhiz() {
        if (Math.random() > 0.5) this.setupSymbolicAdd();
        else this.setupSymbolicSub();
    }

    _setupSymbolicOp(n1, n2, op, ans, instr) {
        const container = document.createElement('div');
        container.className = 'sym-game flex-center column';

        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-sub';
        instructionDiv.innerText = instr;
        this.setInstruction(instr);
        container.appendChild(instructionDiv);

        const eqDiv = document.createElement('div');
        eqDiv.className = 'equation';
        eqDiv.style.fontSize = '10vmin';
        eqDiv.style.fontWeight = 'bold';
        eqDiv.innerText = `${n1} ${op} ${n2} = ?`;
        container.appendChild(eqDiv);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-row';

        const options = this.generateNumericOptions(ans, 3, 5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-tile option';
            btn.innerText = opt;
            btn.onclick = () => {
                if (opt === ans) {
                    eqDiv.innerText = `${n1} ${op} ${n2} = ${ans}`;
                    this.checkAnswer(true, btn);
                } else this.checkAnswer(false, btn);
            };
            if (opt === ans) this.correctTargetElement = btn;
            optionsDiv.appendChild(btn);
        });
        container.appendChild(optionsDiv);
        this.viewport.appendChild(container);
    }
}



/* --- CORE: Store (State Management) --- */
class Store {
    constructor() {
        this.listeners = new Set();
        this.storageKey = `alpha-kids-5-${LANG}-v2`; // Separate progress key for this app
        this.state = this.load() || {
            settings: { isMuted: false },
            progress: {
                level: 1,
                correctAnswers: 0,
                stickers: []
            }
        };
    }

    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Save load failed', e);
            return null;
        }
    }

    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.state));
        } catch (e) {
            console.error('Save failed', e);
        }
    }

    update(fn) {
        const oldState = JSON.parse(JSON.stringify(this.state));
        fn(this.state);
        this.save();
        this.notify(oldState);
    }

    notify(oldState) {
        for (const listener of this.listeners) listener(this.state, oldState);
    }

    unlockSticker(char) {
        if (!this.state.progress.stickers.includes(char)) {
            this.update(s => s.progress.stickers.push(char));
            return true;
        }
        // Fallback: Substitute with another unowned sticker
        const all = EmojiBank.getAllCategories();
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

/* --- APP ENTRY --- */
class App {
    constructor() {
        this.store = new Store();
        this.audio = new AudioManager(this.store);
        this.audio.attachUnlocker();
        this.router = {
            go: (SceneClass, props) => {
                if (this.currentScene) this.currentScene.onDestroy();
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

// Auto-start if not called externally
window.addEventListener('DOMContentLoaded', () => {
    if (!window.appStarted) {
        window.appStarted = true;
        window.startApp();
    }
});
