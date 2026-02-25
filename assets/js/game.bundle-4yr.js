'use strict';


/* --- src/core/Store.js --- */
class Store {
    constructor() {
        this.listeners = new Set();
        this.memoryStore = null;
        this.isPersistent = true; // Assume true until failed
        this.state = this.loadState() || this.getDefaultState();
    }

    getDefaultState() {
        return {
            settings: {
                volumeMaster: 1.0,
                volumeBgm: 0.3,
                volumeSfx: 1.0,
                volumeVoice: 1.0,
                isMuted: false,
                lowStimulation: false,
                numeralsVisible: false // Default off for "Meaning before symbols"
            },
            progress: {
                // Track completed activities per domain
                // Domains: A, B, C, D, E, F
                unlockedDomains: ['A'],
                completedActivities: {}, // id -> { stars: 1-3, timestamp }
                streak: 0,
                lastSessionDate: null
            },
            session: {
                // Daily session tracking
                activitiesDoneToday: 0,
                isSessionComplete: false
            },
            stickers: [] // Array of emoji strings
        };
    }

    // Actions
    unlockSticker(emoji) {
        if (!this.state.stickers.includes(emoji)) {
            this.update(s => {
                s.stickers.push(emoji);
            });
            return true; // New unlock
        }
        return false; // Already had it
    }

    loadState() {
        try {
            const data = localStorage.getItem('alpha-kids-state');
            if (!data) return null;

            const loaded = JSON.parse(data);
            const defaults = this.getDefaultState();

            // Shallow merge basics (settings, progress, session, stickers)
            // ensuring new keys from defaults exist in loaded
            return {
                ...defaults,
                ...loaded,
                settings: { ...defaults.settings, ...(loaded.settings || {}) },
                progress: { ...defaults.progress, ...(loaded.progress || {}) },
                session: { ...defaults.session, ...(loaded.session || {}) },
                // Ensure stickers array exists if loaded state is old
                stickers: loaded.stickers || defaults.stickers
            };
        } catch (e) {
            console.error("Failed to load state", e);
            return null;
        }
    }

    save() {
        try {
            localStorage.setItem('alpha-kids-state', JSON.stringify(this.state));
        } catch (e) {
            // Check if quota or security error
            console.warn("Save failed (using memory only):", e);
            if (!this.memoryStore) this.memoryStore = {};
            Object.assign(this.memoryStore, this.state);
        }
    }

    // Simple Action/Reducer pattern
    update(updater) {
        const oldState = JSON.parse(JSON.stringify(this.state));
        // Updater can be a partial object or a function
        if (typeof updater === 'function') {
            updater(this.state);
        } else {
            this._merge(this.state, updater);
        }

        this.save();
        this.notify(oldState);
    }

    _merge(target, source) {
        for (const key of Object.keys(source)) {
            if (source[key] instanceof Object && !Array.isArray(source[key])) {
                Object.assign(source[key], this._merge(target[key] || {}, source[key]));
            } else {
                target[key] = source[key];
            }
        }
        Object.assign(target || {}, source);
        return target;
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    notify(oldState) {
        for (const listener of this.listeners) {
            listener(this.state, oldState);
        }
    }

    // Helpers
    getSetting(key) {
        return this.state.settings[key];
    }

    setSetting(key, value) {
        this.update(s => s.settings[key] = value);
    }
}

/* --- src/core/AssetLoader.js --- */
class AssetLoader {
    constructor() {
        this.images = new Map();
        this.audio = new Map();
        this.json = new Map();
    }

    async loadBatch(assets) {
        if (!assets || assets.length === 0) return Promise.resolve([]);
        const promises = assets.map(asset => this.load(asset));
        return Promise.all(promises);
    }

    async load(asset) {
        const { id, src, type } = asset;
        if (this.get(id, type)) return this.get(id, type);

        try {
            let result;
            if (type === 'image') {
                result = await this.loadImage(src);
                this.images.set(id, result);
            }
            // Audio is now synthetic, no need to load

            return result;
        } catch (e) {
            console.error(`Failed to load asset: ${id}`, e);
            return null;
        }
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    loadAudio(src) {
        // For simple usage, we can use Audio Objects. 
        // For more complex mixing, we might fetch arraybuffer.
        // Let's stick to HTML5 Audio for simplicity unless we need precise timing (WebAudio better for games)
        // Given requirements: "delightful sound design", "voice over", "bgm". 
        // WebAudio is safer for mobile (no delay). Let's fetch as buffer for AudioManager to use.
        return fetch(src)
            .then(response => response.arrayBuffer());
    }

    get(id, type) {
        if (type === 'image') return this.images.get(id);
        if (type === 'audio') return this.audio.get(id);
        if (type === 'json') return this.json.get(id);
        return null;
    }
}

/* --- src/core/AudioManager.js --- */
class AudioManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);

        this.isMuted = false;
        this.volumes = {
            master: 0.5,
            sfx: 0.5,
            voice: 1.0
        };
    }

    async resumeContext() {
        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }
    }

    playSfx(type) {
        if (this.isMuted) return;
        this.resumeContext();

        // Simple Synth Mappings
        // buffer argument is actually the 'key' (string) now
        // if type is object (AudioBuffer), ignore or re-map.
        // We expect strings like 'sfx-correct'

        // Naive fallback if object passed
        const key = typeof type === 'string' ? type : 'pop';

        if (key.includes('correct')) this.playTone(600, 'sine', 0.1, 800);
        else if (key.includes('wrong')) this.playTone(150, 'sawtooth', 0.3, 100);
        else if (key.includes('pop')) this.playTone(400, 'sine', 0.05);
        else if (key.includes('snap')) this.playTone(800, 'triangle', 0.05);
        else this.playTone(440, 'sine', 0.1); // default
    }

    playTone(freq, type, duration, slideTo = null) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        if (slideTo) {
            osc.frequency.linearRampToValueAtTime(slideTo, this.ctx.currentTime + duration);
        }

        gain.gain.setValueAtTime(this.volumes.sfx, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playVoice(text) {
        if (this.isMuted) return;
        // Text-to-Speech
        // buffer arg might be object, we need text.
        // If we passed an object (AudioBuffer placeholder), we can't speak it.
        // We need to change call sites to pass Text strings? 
        // Or we map Keys to Text.

        // For now, let's assume if it receives a string it speaks it.
        // If it receives an object it ignores.

        // Actually, the app likely calls playVoice('voice-welcome')
        // We need a map of ID -> Text
        const textMap = {
            'voice-welcome': "Welcome to Alpha Kids!",
            'voice-count': "How many?",
            'voice-good': "Good job!",
            'voice-try': "Try again."
        };

        const phrase = textMap[text] || text;
        if (typeof phrase === 'string') {
            const u = new SpeechSynthesisUtterance(phrase);
            u.rate = 1.0;
            u.pitch = 1.2;

            // Attempt to find a better voice
            const voices = window.speechSynthesis.getVoices();
            // Preference list: Google US, Samantha (Mac), Zira (Win), or any Female/English-US
            const preferred = voices.find(v =>
                v.name.includes("Google US English") ||
                v.name.includes("Samantha") ||
                v.name.includes("Zira")
            );
            if (preferred) u.voice = preferred;

            window.speechSynthesis.speak(u);
        }
    }

    playBgm() {
        // No BGM for now in synth mode to keep it clean
        // Or generated ambient loop?
        // Skip for MVP Commercial.
    }

    stopBgm() { }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
            window.speechSynthesis.cancel();
        } else {
            this.masterGain.gain.setValueAtTime(this.volumes.master, this.ctx.currentTime);
        }
        return this.isMuted;
    }
}

/* --- src/core/EmojiBank.js --- */
class EmojiBank {
    static ANIMALS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵"];
    static FOODS = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍒", "🍑", "🍍", "🥝", "🥕", "🌽", "🥦", "🍕", "🍔", "🍦"];
    static VEHICLES = ["🚗", "🚕", "🚙", "🚌", "🚓", "🚑", "🚒", "🚜", "🚂", "🚀", "🚁", "✈️", "🛳️", "🚲", "🛵"];
    static OBJECTS = ["⚽", "🏀", "🏈", "⚾", "🎾", "🎈", "🎁", "🧸", "🧩", "🎨", "🥁", "🎷", "🎸", "📷", "⏰"];

    static getRandom(category = 'ANIMALS') {
        const arr = this[category] || this.ANIMALS;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    static getRandomSet(category = 'ANIMALS', count = 3) {
        const arr = [...(this[category] || this.ANIMALS)];
        // Fisher-Yates shuffle
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.slice(0, count);
    }
}

/* --- src/core/SceneManager.js --- */
class SceneManager {
    constructor(app) {
        this.app = app;
        this.currentScene = null;
        this.container = document.getElementById('app');
        // We could have layers: 
        // - default layer (scenes)
        // - overlay layer (modals, parent gate)
    }

    async goTo(SceneClass, props = {}) {
        try {
            if (this.currentScene) {
                await this.currentScene.onExit(); // Cleanup/Animation
                if (this.currentScene.destroy) this.currentScene.destroy();
            }

            // Clear container (simple approach) or fade out
            this.container.innerHTML = '';

            // Initialize new scene
            this.currentScene = new SceneClass(this.app, props);
            await this.currentScene.onInit();

            // Render
            const element = this.currentScene.render(); // Returns HTML element
            this.container.appendChild(element);

            // Start
            if (this.currentScene.onEnter) await this.currentScene.onEnter();

        } catch (e) {
            console.error("Critical Scene Transition Error:", e);
            // Fallback UI
            this.container.innerHTML = `
                <div style="color: white; padding: 20px; font-family: monospace;">
                    <h1>😵 Suggestion to Restore</h1>
                    <p>Something went wrong loading functionality.</p>
                    <pre style="background: rgba(0,0,0,0.5); padding: 10px;">${e.message}\n${e.stack}</pre>
                    <button onclick="location.reload()" style="padding: 10px;">Reload</button>
                    <button onclick="document.getElementById('btn-back-home').click()">Go Home</button>
                </div>
            `;
            // Attempt home fallback
            const btn = document.createElement('button');
            btn.id = 'btn-back-home';
            btn.style.display = 'none';
            btn.onclick = () => location.reload();
            this.container.appendChild(btn);
        }
    }
}

// Base Scene Class
class Scene {
    constructor(app, props) {
        this.app = app;
        this.props = props;
        this.element = document.createElement('div');
        this.element.className = 'scene-container full-screen';
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'column';
    }

    async onInit() { } // Load specific assets
    render() { return this.element; } // construct DOM
    async onEnter() { } // Animate in
    async onExit() { } // Animate out
    destroy() { this.element.remove(); }
}

/* --- src/activities/BaseActivity.js --- */



class BaseActivity extends Scene {
    constructor(app, props) {
        super(app, props);
        this.difficulty = props.difficulty || 1; // A=1, B=2, C=3
        this.score = 0;
        this.maxRounds = 3; // Short sessions
        this.currentRound = 0;
        this._windowListeners = []; // Registry for cleanup
    }

    // Helper to auto-cleanup window events
    addWindowListener(type, handler, options) {
        window.addEventListener(type, handler, options);
        this._windowListeners.push({ type, handler, options });
    }

    async onExit() {
        // Cleanup all window listeners attached by this scene
        this._windowListeners.forEach(l => {
            window.removeEventListener(l.type, l.handler, l.options);
        });
        this._windowListeners = [];
    }

    render() {
        // New Layout: Centered "Tablet" on the Table

        // 1. Top Bar (Global Navigation)
        const topBar = document.createElement('div');
        topBar.style.position = 'absolute';
        topBar.style.top = '0';
        topBar.style.left = '0';
        topBar.style.width = '100%';
        topBar.style.height = '60px'; // Slim
        topBar.style.zIndex = 10;
        topBar.style.display = 'flex';
        topBar.style.justifyContent = 'space-between';
        topBar.style.padding = '10px 20px';

        topBar.innerHTML = `
            <button id="btn-back" class="btn-core red" style="font-size: 1.2rem; width: 50px; height: 50px; border-radius: 50%;">
                ↩
            </button>
            <div id="progress-dots" class="flex-center" style="gap: 8px; background: rgba(0,0,0,0.2); padding: 5px 15px; border-radius: 20px;">
                ${this.renderProgressDots()}
            </div>
            <div style="width: 50px;"></div>
        `;

        // 2. Game Container (The White Panel)
        const container = document.createElement('div');
        container.className = 'game-panel';
        container.style.width = '90%';
        container.style.maxWidth = '800px';
        container.style.height = '80%';
        container.style.margin = 'auto'; // Center in flex body
        container.style.marginTop = '70px'; // Offset for topbar

        this.gameArea = document.createElement('div');
        this.gameArea.id = 'game-area';
        this.gameArea.style.flex = '1';
        this.gameArea.style.position = 'relative';
        this.gameArea.style.overflow = 'hidden';

        container.appendChild(this.gameArea);

        // Main Wrapper
        this.element.appendChild(topBar);
        this.element.appendChild(container);

        this.element.querySelector('#btn-back').onclick = () => this.onBack();

        this.element.querySelector('#btn-back').onclick = () => this.onBack();

        return this.element;
    }

    renderProgressDots() {
        // Simple dots to show round progress
        return Array(this.maxRounds).fill(0).map((_, i) =>
            `<div class="dot" id="dot-${i}" style="width:10px; height:10px; border-radius:50%; background: #ddd;"></div>`
        ).join('');
    }

    updateProgress() {
        for (let i = 0; i < this.maxRounds; i++) {
            const dot = this.element.querySelector(`#dot-${i}`);
            if (dot) {
                if (i < this.currentRound) dot.style.background = '#4CAF50'; // Bright Green
                else if (i === this.currentRound) dot.style.background = '#FFEB3B'; // Active Yellow
                else dot.style.background = 'rgba(255,255,255,0.5)';
            }
        }
    }

    async onEnter() {
        await super.onEnter();
        this.startRound();
    }

    startRound() {
        this.updateProgress();
        // Child implements this
    }

    async onCorrect() {
        this.app.audio.playSfx('correct');
        this.app.audio.playVoice('good');

        // Visual flare
        const flare = document.createElement('div');
        flare.className = 'feedback-flare';
        flare.style.position = 'absolute';
        flare.style.top = '50%';
        flare.style.left = '50%';
        flare.style.transform = 'translate(-50%, -50%)';
        flare.style.fontSize = '5rem';
        flare.innerText = '🌟';
        flare.style.pointerEvents = 'none';

        flare.animate([
            { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
        ], { duration: 600 });

        this.gameArea.appendChild(flare);
        setTimeout(() => flare.remove(), 600);

        this.currentRound++;
        if (this.currentRound >= this.maxRounds) {
            setTimeout(() => this.onComplete(), 1000);
        } else {
            setTimeout(() => this.startRound(), 1000);
        }
    }

    onIncorrectListener() {
        // Gentle shake or sound
    }

    onComplete() {
        // 1. Unlock Reward
        const rewardEmoji = EmojiBank.getRandom('ANIMALS'); // Or vary category
        const isNew = this.app.store.unlockSticker(rewardEmoji);

        // 2. Show Reward Screen
        this.gameArea.innerHTML = `
            <div class="flex-center full-screen" style="flex-direction: column; background: rgba(255,255,255,0.95); z-index: 100;">
                <h1 style="color: var(--color-accent-mint); font-size: 2.5rem; margin-bottom: 0;">Great Job!</h1>
                
                <div style="margin: 20px; position: relative;">
                    <div style="font-size: 8rem; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2)); animation: float 3s infinite ease-in-out;">
                        ${rewardEmoji}
                    </div>
                    ${isNew ? '<div style="position: absolute; top: -10px; right: -10px; background: #FFD700; color: #d35400; font-weight: bold; padding: 5px 15px; border-radius: 20px; transform: rotate(10deg); box-shadow: 0 4px 0 rgba(0,0,0,0.2);">NEW!</div>' : ''}
                </div>

                <div style="font-size: 1.2rem; color: #555; margin-bottom: 20px;">You earned a sticker!</div>

                <div style="display: flex; gap: 20px;">
                    <button id="btn-replay" class="btn-core" style="background: var(--color-brand-green);">
                        🔄 Again
                    </button>
                    <button id="btn-done" class="btn-core" style="background: var(--color-brand-purple);">
                        🏠 Home
                    </button>
                </div>
            </div>
        `;

        // Add float keyframes if needed (global css likely has float-anim, but simple here)

        this.app.audio.playSfx('correct'); // Fanfare replacement

        this.gameArea.querySelector('#btn-replay').onclick = () => {
            this.currentRound = 0;
            this.startRound();
        };
        this.gameArea.querySelector('#btn-done').onclick = () => this.onBack();
    }

    onBack() {
        this.app.scenes.goTo(HomeScene);
    }
}

/* --- src/activities/domainA/DotFlashActivity.js --- */


class DotFlashActivity extends BaseActivity {
    constructor(app, props) {
        super(app, props);
        this.dotsCount = 0;
        this.flashDuration = 1500; // ms, starts slow
    }

    startRound() {
        super.startRound();

        // Random 1-3
        this.dotsCount = Math.floor(Math.random() * 3) + 1;
        this.renderFlashPhase();
    }

    renderFlashPhase() {
        this.gameArea.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'flex-center full-screen';

        // Card
        const card = document.createElement('div');
        card.style.width = '300px';
        card.style.height = '300px';
        card.style.background = 'white';
        card.style.borderRadius = 'var(--radius-md)';
        card.style.boxShadow = 'var(--shadow-lg)';
        card.style.position = 'relative';

        // Render Dots randomly but no overlap (simple grid for v1)
        // Grid 2x2 for up to 4, but we need dynamic for 5 later.
        // For 1-3, we can just place them nicely.
        const positions = [
            { top: '50%', left: '50%' }, // 1 center
            { top: '50%', left: '30%' }, { top: '50%', left: '70%' }, // 2
            { top: '30%', left: '50%' }, { top: '70%', left: '30%' }, { top: '70%', left: '70%' } // 3 triangle
        ];

        let activePos = [];
        if (this.dotsCount === 1) activePos = [positions[0]];
        else if (this.dotsCount === 2) activePos = [positions[1], positions[2]];
        else activePos = [positions[3], positions[4], positions[5]];

        activePos.forEach(pos => {
            const dot = document.createElement('div');
            dot.className = 'bead green'; // New class
            dot.style.position = 'absolute';
            dot.style.width = '60px';
            dot.style.height = '60px';
            dot.style.top = pos.top;
            dot.style.left = pos.left;
            dot.style.transform = 'translate(-50%, -50%)';
            card.appendChild(dot);
        });

        container.appendChild(card);
        this.gameArea.appendChild(container);

        // Hide after duration
        setTimeout(() => {
            card.innerHTML = ''; // Clear dots
            const q = document.createElement('div');
            q.innerText = '?';
            q.style.fontSize = '5rem';
            q.style.color = '#ccc';
            q.className = 'flex-center full-screen';
            card.appendChild(q);

            setTimeout(() => this.renderChoicePhase(), 500);
        }, this.flashDuration);
    }

    renderChoicePhase() {
        this.gameArea.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'flex-center full-screen';
        container.style.flexDirection = 'column';
        container.style.gap = 'var(--spacing-lg)';

        const prompt = document.createElement('h2');
        prompt.innerText = "How many?";
        prompt.style.color = '#555';
        container.appendChild(prompt);

        const optionsRow = document.createElement('div');
        optionsRow.className = 'flex-center';
        optionsRow.style.gap = '20px';

        // Options 1, 2, 3
        [1, 2, 3].forEach((num, idx) => {
            const btn = document.createElement('button');
            // Distinct colors for options
            const colorClass = idx === 0 ? 'green' : idx === 1 ? 'orange' : 'red';
            btn.className = `btn-tile ${colorClass}`;
            btn.style.width = '80px';
            btn.style.height = '80px';

            // ... (settings check omitted for brevity, keeping existing logic structure)
            const showNumerals = this.app.store.getSetting('numeralsVisible');
            if (showNumerals) {
                btn.innerText = num;
            } else {
                btn.appendChild(this.createMiniDots(num));
            }

            btn.onclick = () => {
                if (num === this.dotsCount) this.onCorrect();
                else {
                    // Shake
                    btn.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(0)' }], { duration: 200 });
                }
            };
            optionsRow.appendChild(btn);
        });

        container.appendChild(optionsRow);
        this.gameArea.appendChild(container);
    }

    createMiniDots(count) {
        const wrap = document.createElement('div');
        wrap.className = 'flex-center';
        wrap.style.gap = '4px';
        for (let i = 0; i < count; i++) {
            const d = document.createElement('div');
            d.className = 'bead yellow'; // tiny beads
            d.style.width = '12px';
            d.style.height = '12px';
            d.style.boxShadow = 'none'; // too small for shadow
            wrap.appendChild(d);
        }
        return wrap;
    }
}

/* --- src/activities/domainA/FeedTheAnimalActivity.js --- */


class FeedTheAnimalActivity extends BaseActivity {
    constructor(app, props) {
        super(app, props);
        this.targetCount = 0;
        this.currentCount = 0;
    }

    startRound() {
        super.startRound();
        this.targetCount = Math.floor(Math.random() * 4) + 1; // 1 to 5 actually? Let's do 1-4 for now.
        this.currentCount = 0;
        this.renderGame();
    }

    renderGame() {
        this.gameArea.innerHTML = '';
        this.gameArea.style.display = 'flex';
        this.gameArea.style.flexDirection = 'column';
        this.gameArea.style.alignItems = 'center';
        this.gameArea.style.justifyContent = 'space-between';
        this.gameArea.style.padding = '20px';

        // Random Animal & Food
        const animal = EmojiBank.getRandom('ANIMALS');
        const food = EmojiBank.getRandom('FOODS');

        // 1. Instruction
        const instruction = document.createElement('h2');
        instruction.style.textAlign = 'center';
        instruction.style.margin = '0';
        instruction.style.color = 'var(--color-text-main)';
        instruction.innerHTML = `Give the <span style="font-size:1.5em">${animal}</span> <strong style="color:#d32f2f; font-size:1.2em">${this.targetCount}</strong> snacks.`;
        this.gameArea.appendChild(instruction);

        // 2. The Animal
        const dog = document.createElement('div');
        dog.id = 'dog-target';
        dog.style.flex = '1';
        dog.style.display = 'flex';
        dog.style.alignItems = 'center';
        dog.style.justifyContent = 'center';

        dog.innerHTML = `
            <div style="
                width: 180px; height: 180px; 
                background: #fff; 
                border: 4px solid var(--color-panel-border);
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: 6rem;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            ">${animal}</div>
        `;
        this.gameArea.appendChild(dog);

        // Save food choice for creating bones
        this.currentFoodEmoji = food;

        // 3. The Food Source (Bowl)
        const foodContainer = document.createElement('div');
        foodContainer.style.width = '100%';
        foodContainer.style.height = '100px';
        foodContainer.style.display = 'flex';
        foodContainer.style.justifyContent = 'center';
        foodContainer.style.gap = '15px';
        foodContainer.style.background = 'rgba(0,0,0,0.05)'; // Shelf look
        foodContainer.style.borderRadius = '12px';
        foodContainer.style.alignItems = 'center';

        // Create plenty of bones
        for (let i = 0; i < 6; i++) {
            foodContainer.appendChild(this.createBone());
        }
        this.gameArea.appendChild(foodContainer);
    }

    createBone() {
        const bone = document.createElement('div');
        bone.innerText = this.currentFoodEmoji || '🍪'; // Fallback
        bone.style.fontSize = '3rem';
        bone.style.cursor = 'grab';
        bone.style.touchAction = 'none'; // Critical for custom drag

        // Draggable Logic
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        const onStart = (e) => {
            isDragging = true;
            bone.style.position = 'fixed'; // Float above everything
            bone.style.zIndex = 1000;

            // Get coordinates
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            // Align center to finger
            bone.style.left = (clientX - 25) + 'px';
            bone.style.top = (clientY - 25) + 'px';

            e.preventDefault();
        };

        const onMove = (e) => {
            if (!isDragging) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            bone.style.left = (clientX - 25) + 'px';
            bone.style.top = (clientY - 25) + 'px';
        };

        const onEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;

            // Hit test
            const dogRect = this.gameArea.querySelector('#dog-target').getBoundingClientRect();
            const boneRect = bone.getBoundingClientRect();

            // Simple intersection
            if (
                boneRect.left < dogRect.right &&
                boneRect.right > dogRect.left &&
                boneRect.top < dogRect.bottom &&
                boneRect.bottom > dogRect.top
            ) {
                // Success drop
                this.onBoneFed(bone);
            } else {
                // Return to shelf (simplified: just remove and recreate or snap back)
                // For this quick impl, let's just create a new one in place
                bone.style.position = 'static';
                bone.style.zIndex = 'auto';
            }
        };

        bone.addEventListener('mousedown', onStart);
        this.addWindowListener('mousemove', onMove);
        this.addWindowListener('mouseup', onEnd);

        bone.addEventListener('touchstart', onStart, { passive: false });
        this.addWindowListener('touchmove', onMove, { passive: false });
        this.addWindowListener('touchend', onEnd);

        return bone;
    }

    onBoneFed(bone) {
        // Animation: bone disappears
        bone.remove();

        this.currentCount++;

        // Count aloud (Simulated)
        // Count aloud (Simulated)
        this.app.audio.playVoice(String(this.currentCount));
        console.log(`Fed! Total: ${this.currentCount}`);

        // Visual feedback
        const dog = this.gameArea.querySelector('#dog-target');
        dog.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
        ], { duration: 300 });

        // Check win
        if (this.currentCount === this.targetCount) {
            setTimeout(() => this.onCorrect(), 500);
        } else if (this.currentCount > this.targetCount) {
            // Too many! Reset round or gentle hint?
            // Reset for simple logic
            setTimeout(() => {
                this.currentRound--; // Don't advance
                this.startRound();
            }, 1000);
        }
    }
}

/* --- src/activities/domainB/WhichHasMoreActivity.js --- */


class WhichHasMoreActivity extends BaseActivity {
    constructor(app, props) {
        super(app, props);
        this.leftCount = 0;
        this.rightCount = 0;
    }

    startRound() {
        super.startRound();

        // Ensure they are different
        this.leftCount = Math.floor(Math.random() * 4) + 1; // 1-4
        this.rightCount = Math.floor(Math.random() * 4) + 1;
        while (this.leftCount === this.rightCount) {
            this.rightCount = Math.floor(Math.random() * 4) + 1;
        }

        this.renderGame();
    }

    renderGame() {
        this.gameArea.innerHTML = '';

        // Instruction
        const instruction = document.createElement('h2');
        instruction.style.textAlign = 'center';
        instruction.style.marginTop = 'var(--spacing-md)';
        instruction.innerText = "Which has MORE?";
        this.gameArea.appendChild(instruction);

        // Split View
        const container = document.createElement('div');
        container.className = 'flex-center';
        container.style.width = '100%';
        container.style.height = '60%'; // Occupy mid section
        container.style.gap = 'var(--spacing-md)';
        container.style.marginTop = '20px';

        // Random Categories
        const category = Math.random() > 0.5 ? 'VEHICLES' : 'FRUITS';
        const [itemLeft, itemRight] = EmojiBank.getRandomSet(category, 2);

        // Left Plate
        const leftPlate = this.createPlate(this.leftCount, itemLeft);
        leftPlate.onclick = () => this.checkAnswer(this.leftCount > this.rightCount, leftPlate);

        // Right Plate
        const rightPlate = this.createPlate(this.rightCount, itemRight);
        rightPlate.onclick = () => this.checkAnswer(this.rightCount > this.leftCount, rightPlate);

        container.appendChild(leftPlate);
        container.appendChild(rightPlate);

        this.gameArea.appendChild(container);
    }

    createPlate(count, emoji) {
        const plate = document.createElement('div');
        plate.className = 'game-panel'; // Use game panel style for inner cards too? Or custom
        // Let's make a custom "Card" look
        plate.style.width = '45%';
        plate.style.height = '100%';
        plate.style.background = '#fff';
        plate.style.border = '4px solid #E0E0E0';
        plate.style.borderRadius = '16px';
        plate.style.display = 'flex';
        plate.style.flexDirection = 'column';
        plate.style.cursor = 'pointer';
        plate.style.position = 'relative';
        plate.style.boxShadow = '0 4px 0 #ccc';
        plate.style.transition = 'transform 0.1s';

        plate.onclick = (e) => {
            // We attach handler in renderGame, but style here for active state
            // Manual active effect handling or CSS
        };
        plate.style.active = 'transform: translateY(4px); boxShadow: none;';

        // Populate items simply for now (random scatter or grid)
        const itemsWrap = document.createElement('div');
        itemsWrap.style.display = 'flex';
        itemsWrap.style.flexWrap = 'wrap';
        itemsWrap.style.justifyContent = 'center';
        itemsWrap.style.alignContent = 'center';
        itemsWrap.style.gap = '10px';
        itemsWrap.style.pointerEvents = 'none'; // click goes to plate

        for (let i = 0; i < count; i++) {
            const item = document.createElement('div');
            item.innerText = emoji;
            item.style.fontSize = '3rem';
            itemsWrap.appendChild(item);
        }

        plate.appendChild(itemsWrap);
        return plate;
    }

    checkAnswer(isCorrect, element) {
        if (isCorrect) {
            this.onCorrect();
        } else {
            // Shake logic
            element.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 300 });
        }
    }
}

/* --- src/activities/domainC/JoinTheStoryActivity.js --- */


class JoinTheStoryActivity extends BaseActivity {
    constructor(app, props) {
        super(app, props);
        this.baseCount = 0;
        this.addCount = 0;
    }

    startRound() {
        super.startRound();
        this.baseCount = Math.floor(Math.random() * 3) + 1; // 1-3
        this.addCount = 1; // Start with +1 for simplicity
        this.renderSequence();
    }

    async renderSequence() {
        this.gameArea.innerHTML = '';

        // Scene Backdrop (Park/Pond)
        const scene = document.createElement('div');
        scene.className = 'full-screen';
        scene.style.background = 'linear-gradient(to bottom, #87CEEB 0%, #E0F7FA 100%)'; // Sky
        scene.style.position = 'relative';

        // Pond
        const pond = document.createElement('div');
        pond.style.position = 'absolute';
        pond.style.bottom = '0';
        pond.style.width = '100%';
        pond.style.height = '40%';
        pond.style.background = '#4FC3F7';
        scene.appendChild(pond);

        this.gameArea.appendChild(scene);

        // Step 1: Initial Group
        const ducks = [];
        for (let i = 0; i < this.baseCount; i++) {
            const duck = this.createDuck();
            duck.style.left = (20 + i * 15) + '%';
            duck.style.top = '70%';
            pond.appendChild(duck);
            ducks.push(duck);
        }

        // Narrate
        this.showText(`Look! ${this.baseCount} ducks.`);
        await this.wait(2000);

        // Step 2: Addition
        this.showText(`${this.addCount} more duck comes!`);
        await this.wait(1000);

        const newDuck = this.createDuck();
        newDuck.style.left = '110%'; // Offscreen
        newDuck.style.top = '70%';
        pond.appendChild(newDuck);

        // Animate in
        newDuck.animate([
            { left: '110%' },
            { left: (20 + this.baseCount * 15) + '%' }
        ], { duration: 1000, fill: 'forwards' });

        await this.wait(1500);

        // Step 3: Question
        this.showText("How many ducks now?");
        this.renderOptions(this.baseCount + this.addCount);
    }

    createDuck() {
        const d = document.createElement('div');
        d.innerText = '🦆';
        d.style.fontSize = '4rem';
        d.style.position = 'absolute';
        d.style.transition = 'left 1s';
        return d;
    }

    showText(msg) {
        let txt = this.gameArea.querySelector('#story-text');
        if (!txt) {
            txt = document.createElement('div');
            txt.id = 'story-text';
            txt.style.position = 'absolute';
            txt.style.top = '20%';
            txt.style.width = '100%';
            txt.style.textAlign = 'center';
            txt.style.fontSize = '2rem';
            txt.style.fontWeight = 'bold';
            txt.style.color = '#333';
            txt.style.textShadow = '0 2px 4px rgba(255,255,255,0.8)';
            this.gameArea.appendChild(txt);
        }
        txt.innerText = msg;
        // Pulse
        txt.animate([
            { transform: 'scale(0.9)', opacity: 0.8 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration: 300 });
    }

    renderOptions(correctAnswer) {
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.bottom = '20px';
        container.style.width = '100%';
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.gap = '20px';

        // Choices around the answer
        const choices = [correctAnswer, correctAnswer + 1, correctAnswer - 1].sort(() => Math.random() - 0.5); // unsafe dupes possible but rare/ok
        // Fix dupes naive
        const unique = [...new Set(choices)];
        if (unique.length < 3) unique.push(correctAnswer + 2);

        unique.forEach(num => {
            if (num <= 0) return; // ignore invalid
            const btn = document.createElement('button');
            btn.className = 'btn-core';
            btn.style.width = '70px';
            btn.style.height = '70px';
            btn.style.background = 'white';
            btn.style.borderRadius = '50%';
            btn.style.fontSize = '1.8rem';
            btn.style.boxShadow = 'var(--shadow-md)';
            btn.innerText = num;
            btn.onclick = () => {
                if (num === correctAnswer) this.onCorrect();
                else {
                    btn.style.background = '#ffcdd2';
                    setTimeout(() => btn.style.background = 'white', 500);
                }
            };
            container.appendChild(btn);
        });

        this.gameArea.appendChild(container);
    }

    wait(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
}

/* --- src/activities/domainC/HideAndFindActivity.js --- */


class HideAndFindActivity extends BaseActivity {
    constructor(app, props) {
        super(app, props);
        this.totalCount = 0;
        this.hiddenCount = 0;
    }

    startRound() {
        super.startRound();
        this.totalCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 items totals
        this.hiddenCount = 1; // Start simple, always hide 1 first
        this.renderSequence();
    }

    async renderSequence() {
        this.gameArea.innerHTML = '';

        // Table
        const table = document.createElement('div');
        table.className = 'flex-center full-screen';
        table.style.flexDirection = 'column';
        table.style.background = '#fcfcfc';
        this.gameArea.appendChild(table);

        const instruction = document.createElement('h2');
        instruction.innerText = `Here are ${this.totalCount} toys.`;
        table.appendChild(instruction);

        // Items Container
        const itemsRow = document.createElement('div');
        itemsRow.className = 'flex-center';
        itemsRow.style.gap = '20px';
        itemsRow.style.height = '150px';
        table.appendChild(itemsRow);

        // Create Items
        const items = [];
        for (let i = 0; i < this.totalCount; i++) {
            const item = document.createElement('div');
            item.innerText = '🚙'; // Car
            item.style.fontSize = '3.5rem';
            itemsRow.appendChild(item);
            items.push(item);
        }

        await this.wait(2000);

        // Hiding Phase
        instruction.innerText = "Close your eyes...";
        await this.wait(1000);

        // Determine which to hide (last N)
        const toHide = items.slice(items.length - this.hiddenCount);

        // Create the Box/Cover
        const box = document.createElement('div');
        box.style.width = '120px';
        box.style.height = '120px';
        box.style.background = '#8D6E63'; // Brown box
        box.style.borderRadius = 'var(--radius-sm)';
        box.style.position = 'absolute';
        box.style.top = '-200px'; // Drop from top
        box.style.left = '50%'; // Approximate
        box.style.transition = 'top 0.5s ease-in';
        box.style.zIndex = 10;
        box.innerText = '?';
        box.style.color = 'white';
        box.style.fontSize = '3rem';
        box.style.display = 'flex';
        box.style.alignItems = 'center';
        box.style.justifyContent = 'center';

        this.gameArea.appendChild(box);

        // Compute position to cover the last item(s) - simplified visual
        // We'll just hide the DOM elements and put the box there visually
        // For simplicity, let's just replace the items with the box in the flex flow?
        // Or overlay. Overlay is cooler.

        // Get rect of last item
        const targetRect = toHide[0].getBoundingClientRect();
        box.style.left = targetRect.left + 'px';
        box.style.top = (targetRect.top - 200) + 'px'; // Start above

        // Trigger generic reflow
        box.offsetHeight;

        // Drop
        box.style.top = (targetRect.top - 10) + 'px';

        await this.wait(500); // Wait for drop

        // Hide items visually
        toHide.forEach(el => el.style.opacity = '0');

        instruction.innerText = "Whoops! Something is hiding.";
        await this.wait(1000);

        instruction.innerText = "How many are hiding?";
        this.renderKeypad(this.hiddenCount);
    }

    renderKeypad(correctAnswer) {
        const keypad = document.createElement('div');
        keypad.className = 'flex-center';
        keypad.style.gap = '20px';
        keypad.style.marginTop = '40px';

        [1, 2, 3].forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'btn-core';
            btn.style.width = '60px';
            btn.style.height = '60px';
            btn.style.borderRadius = '12px';
            btn.style.background = 'var(--color-primary)';
            btn.style.color = 'white';
            btn.style.fontSize = '1.5rem';
            btn.innerText = num;

            btn.onclick = () => {
                if (num === correctAnswer) {
                    // Reveal
                    const box = this.gameArea.querySelector('div[style*="background: rgb(141, 110, 99)"]'); // loose selector for box
                    if (box) box.style.top = '-200px'; // Lift box
                    this.gameArea.querySelectorAll('div').forEach(d => d.style.opacity = '1'); // Show all

                    setTimeout(() => this.onCorrect(), 800);
                } else {
                    btn.style.background = '#d32f2f'; // Red
                    setTimeout(() => btn.style.background = 'var(--color-primary)', 500);
                }
            };
            keypad.appendChild(btn);
        });

        this.gameArea.querySelector('div.flex-center').appendChild(keypad);
    }

    wait(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
}

/* --- src/activities/domainD/ShapeBuilderActivity.js --- */


class ShapeBuilderActivity extends BaseActivity {
    constructor(app, props) {
        super(app, props);
        this.piecesPlaced = 0;
    }

    startRound() {
        super.startRound();
        this.piecesPlaced = 0;
        this.renderGame();
    }

    renderGame() {
        this.gameArea.innerHTML = '';

        const instruction = document.createElement('h2');
        instruction.innerText = "Build a House";
        instruction.style.textAlign = 'center';
        instruction.style.marginTop = '20px';
        this.gameArea.appendChild(instruction);

        // Workspace
        const workspace = document.createElement('div');
        workspace.style.position = 'relative';
        workspace.style.height = '60%';
        workspace.style.width = '100%';
        workspace.style.marginTop = '20px';
        this.gameArea.appendChild(workspace);

        // Targets (Outline)
        const targetGroup = document.createElement('div');
        targetGroup.style.position = 'absolute';
        targetGroup.style.left = '50%';
        targetGroup.style.top = '50%';
        targetGroup.style.transform = 'translate(-50%, -50%)';
        targetGroup.id = 'target-group';

        // House Body Target (Square)
        const bodyTarget = this.createDropZone('square', 100, 100, '#eee');
        bodyTarget.style.top = '50px';

        // Roof Target (Triangle wrapper or Clip-path)
        const roofTarget = this.createDropZone('triangle', 100, 60, '#eee');
        roofTarget.style.top = '-10px';
        // Clip path for triangle
        roofTarget.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        roofTarget.style.background = '#ddd';

        targetGroup.appendChild(bodyTarget);
        targetGroup.appendChild(roofTarget);
        workspace.appendChild(targetGroup);

        // Draggables (Parts) on the "floor"
        const tray = document.createElement('div');
        tray.style.position = 'absolute';
        tray.style.bottom = '10px';
        tray.style.width = '100%';
        tray.style.display = 'flex';
        tray.style.justifyContent = 'center';
        tray.style.gap = '40px';

        const roofPiece = this.createDraggable('triangle', 100, 60, '#ef5350');
        roofPiece.dataset.targetId = 'target-triangle';

        const bodyPiece = this.createDraggable('square', 100, 100, '#42a5f5');
        bodyPiece.dataset.targetId = 'target-square';

        tray.appendChild(bodyPiece);
        tray.appendChild(roofPiece);
        workspace.appendChild(tray);
    }

    createDropZone(type, w, h, color) {
        const d = document.createElement('div');
        d.className = 'drop-zone';
        d.id = 'target-' + type;
        d.style.width = w + 'px';
        d.style.height = h + 'px';
        d.style.background = 'rgba(255,255,255,0.3)'; // Semi-transparent
        d.style.position = 'absolute';
        d.style.border = '3px dashed #7AC70C'; // Brand Green dashed
        d.style.borderRadius = '8px';

        if (type === 'triangle') {
            d.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            d.style.background = 'rgba(255,255,255,0.3)';
            d.style.border = 'none'; // Border trickier with clip-path, skip for now or use SVG
        }

        return d;
    }

    createDraggable(type, w, h, color) {
        const d = document.createElement('div');
        d.className = 'btn-tile'; // Use existing 3D button class
        d.style.width = w + 'px';
        d.style.height = h + 'px';
        d.style.background = color; // Override gradient with specific piece color?
        // Let's keep the tile 3D props but set specific bg
        if (color) d.style.background = color;
        // Add shadow manually if overriding background removes tile shadow
        d.style.boxShadow = '0 6px 0 rgba(0,0,0,0.2)';

        d.style.cursor = 'grab';
        if (type === 'triangle') {
            d.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            d.style.borderRadius = '0';
            d.style.boxShadow = 'none'; // Shadow clipped
            d.style.filter = 'drop-shadow(0 4px 0 rgba(0,0,0,0.2))';
        }

        this.makeDraggable(d);
        return d;
    }

    makeDraggable(element) {
        let isDragging = false;

        const onStart = (e) => {
            isDragging = true;
            element.style.position = 'fixed';
            element.style.zIndex = 1000;
            element.style.pointerEvents = 'none'; // so we can check elementBelow

            const cx = e.touches ? e.touches[0].clientX : e.clientX;
            const cy = e.touches ? e.touches[0].clientY : e.clientY;

            // Center anchor
            const rect = element.getBoundingClientRect();
            element.dataset.offX = rect.width / 2;
            element.dataset.offY = rect.height / 2;

            element.style.left = (cx - element.dataset.offX) + 'px';
            element.style.top = (cy - element.dataset.offY) + 'px';
            e.preventDefault();
        };

        const onMove = (e) => {
            if (!isDragging) return;
            const cx = e.touches ? e.touches[0].clientX : e.clientX;
            const cy = e.touches ? e.touches[0].clientY : e.clientY;

            element.style.left = (cx - element.dataset.offX) + 'px';
            element.style.top = (cy - element.dataset.offY) + 'px';
        };

        const onEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            element.style.pointerEvents = 'auto'; // restore

            const cx = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            const cy = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

            // Simple hit check via DOM
            // Hide element temporarily to pick what's under
            element.style.display = 'none';
            const elemBelow = document.elementFromPoint(cx, cy);
            element.style.display = 'block';

            if (elemBelow && elemBelow.closest('.drop-zone')) {
                const zone = elemBelow.closest('.drop-zone');
                if (element.dataset.targetId === zone.id) {
                    // Snap
                    this.onPiecePlaced(element, zone);
                } else {
                    this.resetPiece(element);
                }
            } else {
                this.resetPiece(element);
            }
        };

        element.addEventListener('mousedown', onStart);
        this.addWindowListener('mousemove', onMove);
        this.addWindowListener('mouseup', onEnd);
        element.addEventListener('touchstart', onStart, { passive: false });
        this.addWindowListener('touchmove', onMove, { passive: false });
        this.addWindowListener('touchend', onEnd);
    }

    onPiecePlaced(piece, zone) {
        // Snap visuals
        piece.style.position = 'absolute';
        piece.style.left = '0';
        piece.style.top = '0';
        piece.style.transform = 'none';
        piece.style.zIndex = 10;
        zone.appendChild(piece);
        zone.style.border = 'none'; // remove outline

        // Remove listeners
        const newPiece = piece.cloneNode(true);
        piece.replaceWith(newPiece); // strip listeners

        this.app.audio.playSfx(this.app.assets.get('sfx-snap', 'audio'));

        this.piecesPlaced++;
        if (this.piecesPlaced >= 2) {
            setTimeout(() => this.onCorrect(), 500);
        }
    }

    resetPiece(piece) {
        piece.style.position = 'static';
        piece.style.zIndex = 'auto';
        // Animate back? For now just snap back to flex flow
    }
}

/* --- src/activities/domainE/PatternTrainActivity.js --- */


class PatternTrainActivity extends BaseActivity {
    constructor(app, props) {
        super(app, props);
        this.pattern = []; // e.g. ['red', 'blue', 'red', 'blue']
        this.missingIndex = 3;
    }

    startRound() {
        super.startRound();
        // Generate AB Pattern
        const colors = ['#f44336', '#2196f3', '#4caf50', '#ffeb3b'];
        const c1 = colors[Math.floor(Math.random() * colors.length)];
        let c2 = colors[Math.floor(Math.random() * colors.length)];
        while (c1 === c2) c2 = colors[Math.floor(Math.random() * colors.length)];

        this.pattern = [c1, c2, c1, null];
        this.missingColor = c2;

        this.renderGame();
    }

    renderGame() {
        this.gameArea.innerHTML = '';

        const instruction = document.createElement('h2');
        instruction.innerText = "Finish the Pattern";
        instruction.style.textAlign = 'center';
        instruction.style.marginTop = '20px';
        this.gameArea.appendChild(instruction);

        // Train Track
        const track = document.createElement('div');
        track.style.position = 'absolute';
        track.style.top = '50%';
        track.style.left = '0';
        track.style.width = '100%';
        track.style.height = '10px';
        track.style.background = '#555';
        this.gameArea.appendChild(track);

        // Train Cars
        const trainContainer = document.createElement('div');
        trainContainer.className = 'flex-center';
        trainContainer.style.position = 'absolute';
        trainContainer.style.top = 'calc(50% - 60px)';
        trainContainer.style.width = '100%';
        trainContainer.style.gap = '5px';

        // Engine
        const engine = document.createElement('div');
        engine.innerText = '🚂';
        engine.style.fontSize = '4rem';
        trainContainer.appendChild(engine);

        // Cars
        this.pattern.forEach((color, idx) => {
            const car = document.createElement('div');
            car.style.width = '70px';
            car.style.height = '60px';
            car.style.background = '#ccc'; // chassis
            car.style.display = 'flex';
            car.style.justifyContent = 'center';
            car.style.alignItems = 'flex-start';
            car.style.border = '2px solid #555';

            if (color) {
                // Cargo
                const blob = document.createElement('div');
                blob.style.width = '50px';
                blob.style.height = '40px';
                blob.style.background = color;
                blob.style.marginTop = '-10px';
                blob.style.borderRadius = '50%';
                car.appendChild(blob);
            } else {
                // Empty / Dropzone
                car.className = 'drop-zone';
                car.style.background = '#ffeb3b44'; // Highlight
                car.style.border = '2px dashed #333';
            }

            trainContainer.appendChild(car);
        });

        this.gameArea.appendChild(trainContainer);

        // Options Shelf
        const shelf = document.createElement('div');
        shelf.className = 'flex-center';
        shelf.style.position = 'absolute';
        shelf.style.bottom = '20px';
        shelf.style.width = '100%';
        shelf.style.gap = '30px';

        // Correct + Distractor
        const options = [this.missingColor, this.pattern[0]].sort(() => Math.random() - 0.5);

        options.forEach(color => {
            const opt = document.createElement('div');
            opt.className = 'draggable-item';
            opt.style.width = '60px';
            opt.style.height = '50px';
            opt.style.background = color;
            opt.style.borderRadius = '50%';
            opt.style.cursor = 'pointer';

            opt.onclick = () => {
                if (color === this.missingColor) {
                    // Fill the spot
                    const zone = this.gameArea.querySelector('.drop-zone');
                    zone.innerHTML = '';
                    const fill = document.createElement('div');
                    fill.style.width = '50px';
                    fill.style.height = '40px';
                    fill.style.background = color;
                    fill.style.marginTop = '-10px';
                    fill.style.borderRadius = '50%';
                    zone.appendChild(fill);
                    zone.className = '';
                    zone.style.background = '#ccc';
                    zone.style.border = '2px solid #555';

                    this.onCorrect();
                } else {
                    // Shake
                    opt.animate([
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(10px)' },
                        { transform: 'translateX(-10px)' },
                        { transform: 'translateX(0)' }
                    ], { duration: 300 });
                }
            };
            shelf.appendChild(opt);
        });

        this.gameArea.appendChild(shelf);
    }
}

/* --- src/activities/domainF/SortingBasketActivity.js --- */


class SortingBasketActivity extends BaseActivity {
    constructor(app, props) {
        super(app, props);
        this.itemsLeft = 0;
    }

    startRound() {
        super.startRound();
        this.props.difficulty = 1; // force simple for now
        this.renderGame();
    }

    renderGame() {
        this.gameArea.innerHTML = '';

        const instruction = document.createElement('h2');
        instruction.innerText = "Sort by Color";
        instruction.style.textAlign = 'center';
        instruction.style.marginTop = '20px';
        this.gameArea.appendChild(instruction);

        // Attributes: Red vs Blue
        const typeA = '#ef5350'; // Red
        const typeB = '#42a5f5'; // Blue

        // Baskets
        const basketsRow = document.createElement('div');
        basketsRow.className = 'flex-center';
        basketsRow.style.gap = '40px';
        basketsRow.style.marginTop = '20px';

        const basketA = this.createBasket(typeA);
        const basketB = this.createBasket(typeB);

        basketsRow.appendChild(basketA);
        basketsRow.appendChild(basketB);
        this.gameArea.appendChild(basketsRow);

        // Items Pool
        const pool = document.createElement('div');
        pool.style.display = 'flex';
        pool.style.flexWrap = 'wrap';
        pool.style.justifyContent = 'center';
        pool.style.gap = '20px';
        pool.style.marginTop = '40px';

        const items = [typeA, typeA, typeB, typeB, typeA].sort(() => Math.random() - 0.5);
        this.itemsLeft = items.length;

        items.forEach(color => {
            const item = document.createElement('div');
            item.style.width = '60px';
            item.style.height = '60px';
            item.style.background = color;
            item.style.borderRadius = '50%';
            item.style.cursor = 'pointer';
            item.style.border = '2px solid white';
            item.style.boxShadow = 'var(--shadow-sm)';

            // Simple Click-to-sort for accessibility/ease
            item.onclick = () => {
                // Animate to proper basket
                const targetBasket = color === typeA ? basketA : basketB;
                const rect = item.getBoundingClientRect();
                const targetRect = targetBasket.getBoundingClientRect();

                // Flight animation
                const clone = item.cloneNode(true);
                clone.style.position = 'fixed';
                clone.style.left = rect.left + 'px';
                clone.style.top = rect.top + 'px';
                clone.style.zIndex = 100;
                document.body.appendChild(clone);

                item.style.opacity = '0';
                item.style.pointerEvents = 'none';

                const anim = clone.animate([
                    { left: rect.left + 'px', top: rect.top + 'px', transform: 'scale(1)' },
                    { left: (targetRect.left + 50) + 'px', top: (targetRect.top + 50) + 'px', transform: 'scale(0.5)' }
                ], { duration: 500, easing: 'ease-in-out' });

                anim.onfinish = () => {
                    clone.remove();
                    this.checkCompletion();
                };
            };

            pool.appendChild(item);
        });

        this.gameArea.appendChild(pool);
    }

    createBasket(color) {
        const b = document.createElement('div');
        b.style.width = '120px';
        b.style.height = '100px';
        b.style.borderBottomLeftRadius = '20px';
        b.style.borderBottomRightRadius = '20px';
        b.style.border = `4px solid ${color}`;
        b.style.borderTop = 'none';
        b.style.background = 'rgba(255,255,255,0.5)';
        b.style.display = 'flex';
        b.style.alignItems = 'flex-end';
        b.style.justifyContent = 'center';
        b.style.paddingBottom = '10px';
        b.innerHTML = `<div style="width:100%; height:10px; background:${color}; opacity:0.3"></div>`;
        return b;
    }

    checkCompletion() {
        this.itemsLeft--;
        if (this.itemsLeft <= 0) {
            setTimeout(() => this.onCorrect(), 500);
        }
    }
}

/* --- src/scenes/ParentGateScene.js --- */


 // To go back

class ParentGateScene extends Scene {
    render() {
        this.element.className = 'scene-gate full-screen flex-center';
        this.element.style.background = 'rgba(0,0,0,0.8)'; // Dim overlay
        this.element.style.color = 'white';
        this.element.style.flexDirection = 'column';
        this.element.style.gap = 'var(--spacing-md)';

        this.element.innerHTML = `
            <h2>Adults Only</h2>
            <p>Hold the button for 3 seconds to unlock.</p>
            <button id="btn-unlock" class="btn-core" style="
                width: 80px; height: 80px; 
                border-radius: 50%; 
                background: #ccc; 
                color: #333;
                font-size: 1.5rem;
            ">🔒</button>
            <button id="btn-cancel" class="btn-core" style="margin-top: 20px; background: transparent; color: #aaa; font-weight: normal">Cancel</button>
        `;

        const btn = this.element.querySelector('#btn-unlock');

        let pressTimer;
        const startPress = () => {
            btn.style.transform = 'scale(1.2)';
            btn.style.background = 'white';
            pressTimer = setTimeout(() => this.unlock(), 3000);
        };
        const endPress = () => {
            btn.style.transform = 'scale(1)';
            btn.style.background = '#ccc';
            clearTimeout(pressTimer);
        };

        // Touch events
        btn.addEventListener('touchstart', (e) => { e.preventDefault(); startPress(); });
        btn.addEventListener('touchend', (e) => { e.preventDefault(); endPress(); });
        // Mouse events
        btn.addEventListener('mousedown', startPress);
        btn.addEventListener('mouseup', endPress);
        btn.addEventListener('mouseleave', endPress);

        this.element.querySelector('#btn-cancel').onclick = () => {
            this.app.scenes.goTo(HomeScene); // Go back home
        };

        return this.element;
    }

    unlock() {
        this.app.scenes.goTo(ParentDashboardScene);
    }
}

/* --- src/scenes/ParentDashboard.js --- */



class ParentDashboardScene extends Scene {
    render() {
        this.element.className = 'scene-dashboard full-screen';
        this.element.style.background = '#f0f0f0';
        this.element.style.padding = 'var(--spacing-md)';
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'column';
        this.element.style.overflowY = 'auto'; // Scrollable

        const header = document.createElement('header');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.innerHTML = `
            <h1 style="margin:0; font-size: 1.5rem;">Parent Dashboard</h1>
            <button id="btn-close" class="btn-core" style="padding: 8px 16px; background: var(--color-primary); color: white; border-radius: var(--radius-sm)">
                Back to Kid Mode
            </button>
        `;

        const content = document.createElement('div');
        content.style.marginTop = 'var(--spacing-lg)';
        content.style.maxWidth = '600px';
        content.style.width = '100%';
        content.style.alignSelf = 'center';

        // Settings Section
        const settings = this.app.store.state.settings;
        content.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm); margin-bottom: 20px;">
                <h3 style="margin-top:0">Settings</h3>
                
                <label class="flex-center" style="justify-content: space-between; margin-bottom: 10px;">
                    <span>Low Stimulation Mode</span>
                    <input type="checkbox" id="chk-low-stim" ${settings.lowStimulation ? 'checked' : ''}>
                </label>
                
                <label class="flex-center" style="justify-content: space-between; margin-bottom: 10px;">
                    <span>Show Numerals (1, 2, 3)</span>
                    <input type="checkbox" id="chk-numerals" ${settings.numeralsVisible ? 'checked' : ''}>
                </label>
            </div>

            <div style="background: white; padding: 20px; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm);">
                <h3 style="margin-top:0">Progress</h3>
                <p>Child has unlocked Domain: <strong style="color: var(--color-primary)">${this.app.store.state.progress.unlockedDomains.join(', ')}</strong></p>
                <!-- Simple placeholder graph -->
                <div style="height: 20px; background: #eee; border-radius: 10px; overflow: hidden;">
                   <div style="width: 10%; height: 100%; background: var(--color-secondary);"></div>
                </div>
                <small>10% complete</small>
            </div>
        `;

        this.element.appendChild(header);
        this.element.appendChild(content);

        // Events
        this.element.querySelector('#btn-close').onclick = () => {
            this.app.scenes.goTo(HomeScene);
        };

        // Toggles
        const chkLowStim = this.element.querySelector('#chk-low-stim');
        chkLowStim.onchange = (e) => {
            this.app.store.setSetting('lowStimulation', e.target.checked);
        };

        const chkNumerals = this.element.querySelector('#chk-numerals');
        chkNumerals.onchange = (e) => {
            this.app.store.setSetting('numeralsVisible', e.target.checked);
        };

        return this.element;
    }
}

/* --- src/scenes/DailySessionScene.js --- */






class DailySessionScene extends Scene {
    async onInit() {
        this.activities = [
            { Scene: DotFlashActivity, label: "Warm Up!" },
            { Scene: FeedTheAnimalActivity, label: "Let's Count!" },
            { Scene: ShapeBuilderActivity, label: "Build Time!" }
        ];
        this.currentIndex = 0;
    }

    render() {
        this.element.className = 'scene-session full-screen';
        this.element.style.background = 'var(--color-bg-warm)';
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'column';

        // Initial "Ready?" screen
        this.showIntermission("Ready to Play?", () => this.startNextActivity());

        return this.element;
    }

    showIntermission(text, onNext) {
        this.element.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'flex-center full-screen';
        container.style.flexDirection = 'column';
        container.style.gap = 'var(--spacing-lg)';

        // Add Back Button (Top Left)
        const btnBack = document.createElement('button');
        btnBack.className = 'btn-core red';
        btnBack.innerText = '↩';
        btnBack.style.position = 'absolute';
        btnBack.style.top = '20px';
        btnBack.style.left = '20px';
        btnBack.style.width = '50px';
        btnBack.style.height = '50px';
        btnBack.style.borderRadius = '50%';
        btnBack.onclick = () => this.app.scenes.goTo(HomeScene);
        container.appendChild(btnBack);

        // Animated icon
        const icon = document.createElement('div');
        icon.innerText = '🚀';
        icon.style.fontSize = '5rem';
        icon.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-20px)' },
            { transform: 'translateY(0)' }
        ], { duration: 1000, iterations: Infinity });

        const title = document.createElement('h1');
        title.innerText = text;
        title.style.color = 'var(--color-primary)';

        const btn = document.createElement('button');
        btn.className = 'btn-core';
        btn.innerText = "Let's Go!";
        btn.style.background = 'var(--color-secondary)';
        btn.style.color = 'var(--color-text-main)';
        btn.style.padding = '15px 40px';
        btn.style.fontSize = '1.5rem';
        btn.style.borderRadius = 'var(--radius-lg)';
        btn.onclick = onNext;

        container.appendChild(icon);
        container.appendChild(title);
        container.appendChild(btn);

        this.element.appendChild(container);
    }

    startNextActivity() {
        if (this.currentIndex >= this.activities.length) {
            this.finishSession();
            return;
        }

        const config = this.activities[this.currentIndex];

        // We render the activity INSIDE this scene container properly?
        // Or we use SceneManager? 
        // SceneManager replaces the whole view. 
        // TO avoid complex nesting, let's use SceneManager but we need to know we are in a session.
        // Alternative: Pass "callback" to activities.
        // Let's instantiate the Activity Scene manually here and append it.

        this.runActivity(config);
    }

    async runActivity(config) {
        this.element.innerHTML = ''; // Clear intermission

        const ActivityClass = config.Scene;
        const activityInstance = new ActivityClass(this.app, { difficulty: 1 });

        // Override onBack/onComplete for Session flow
        activityInstance.onBack = () => {
            this.app.scenes.goTo(HomeScene);
        };

        activityInstance.onComplete = () => {
            // Activity done, success!
            this.currentIndex++;
            if (this.currentIndex >= this.activities.length) {
                this.finishSession();
            } else {
                this.showIntermission("Next Game!", () => this.startNextActivity());
            }
        };

        await activityInstance.onInit();

        // Fix: Render FIRST, then Enter
        const el = activityInstance.render();
        this.element.appendChild(el);

        if (activityInstance.onEnter) await activityInstance.onEnter();

        // Hack: Activity might need to be attached to DOM before onEnter sometimes? 
        // BaseActivity logic seems self-contained.

        // Also show a simplified progress bar top
        this.showSessionProgress();
    }

    showSessionProgress() {
        const bar = document.createElement('div');
        bar.style.position = 'absolute';
        bar.style.top = '10px';
        bar.style.left = '50%';
        bar.style.transform = 'translateX(-50%)';
        bar.style.display = 'flex';
        bar.style.gap = '5px';

        this.activities.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.style.width = '30px';
            dot.style.height = '8px';
            dot.style.borderRadius = '4px';
            dot.style.background = idx < this.currentIndex ? 'var(--color-accent-mint)' :
                idx === this.currentIndex ? 'var(--color-secondary)' : '#ddd';
            bar.appendChild(dot);
        });

        this.element.appendChild(bar);
    }

    finishSession() {
        this.element.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'flex-center full-screen';
        container.style.flexDirection = 'column';
        container.style.background = 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)';

        container.innerHTML = `
            <h1 style="font-size: 3rem; color: var(--color-primary); margin-bottom: 20px;">All Done!</h1>
            <div style="font-size: 6rem;">🎉</div>
            <p style="font-size: 1.5rem; color: var(--color-text-light);">You did great today.</p>
            <button id="btn-home" class="btn-core" style="
                margin-top: 40px; 
                background: var(--color-primary); 
                color: white; 
                padding: 15px 40px; 
                border-radius: var(--radius-lg);
                font-size: 1.5rem;
            ">Go Home</button>
        `;

        this.element.appendChild(container);

        // unlocking random sticker
        // EmojiBank is available globally in the bundle
        const newSticker = EmojiBank.getRandom();
        const unlocked = this.app.store.unlockSticker(newSticker);

        if (unlocked) {
            // Show new sticker animation? For now, the Sticker page will show it.
            // Maybe add "New Sticker!" text
            const msg = document.createElement('div');
            msg.innerHTML = `You earned: <span style="font-size:2rem">${newSticker}</span>!`;
            msg.style.fontSize = '1.5rem';
            msg.style.marginTop = '20px';
            msg.style.color = '#e91e63';
            container.appendChild(msg);
        }

        // Fire confetti!
        this.fireConfetti();

        container.querySelector('#btn-home').onclick = () => {
            this.app.scenes.goTo(HomeScene);
        };
    }

    fireConfetti() {
        // Simple CSS/JS confetti implementation
        for (let i = 0; i < 50; i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti';
            conf.style.left = Math.random() * 100 + '%';
            conf.style.top = '-10px';
            conf.style.backgroundColor = ['#f44336', '#2196f3', '#ffeb3b', '#4caf50'][Math.floor(Math.random() * 4)];
            conf.style.animationDelay = Math.random() * 2 + 's';
            this.element.appendChild(conf);
        }
    }
}

/* --- src/scenes/StickerBookScene.js --- */



class StickerBookScene extends Scene {
    render() {
        this.element.className = 'scene-sticker-book full-screen';
        this.element.style.background = 'var(--color-bg-page)';
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'column';

        // 1. Header
        const header = document.createElement('div');
        header.style.padding = '20px';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent = 'space-between';

        const btnBack = document.createElement('button');
        btnBack.className = 'btn-core red';
        btnBack.innerText = '↩';
        btnBack.style.width = '60px';
        btnBack.style.height = '60px';
        btnBack.style.borderRadius = '50%';
        btnBack.onclick = () => this.app.scenes.goTo(HomeScene);

        const title = document.createElement('h1');
        title.innerText = 'My Sticker Book';
        title.style.margin = '0';
        title.style.color = 'var(--color-brand-purple)';

        header.appendChild(btnBack);
        header.appendChild(title);
        header.appendChild(document.createElement('div')); // Spacer

        // 2. State & Persistence Check
        const isPersistent = this.app.store.isPersistent;

        // 3. Grid Area
        const gridContainer = document.createElement('div');
        gridContainer.style.flex = '1';
        gridContainer.style.padding = '20px';
        gridContainer.style.overflowY = 'auto';
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(100px, 1fr))';
        gridContainer.style.gap = '20px';
        gridContainer.style.alignContent = 'start';

        // Assemble in SAFE linear order
        this.element.appendChild(header);

        // 4. Persistence Warning
        // Only append warning if needed
        if (!isPersistent) {
            const warning = document.createElement('div');
            warning.style.background = '#FFF3E0';
            warning.style.color = '#E65100';
            warning.style.padding = '10px';
            warning.style.margin = '0 20px 10px 20px';
            warning.style.borderRadius = '8px';
            warning.style.border = '1px solid #FFCC80';
            warning.style.fontSize = '0.9rem';
            warning.innerHTML = '⚠️ <b>Note:</b> Progress will not be saved if you close the browser (File Mode).';
            this.element.appendChild(warning);
        }

        this.element.appendChild(gridContainer);

        // Debug/Test Button (Only if empty)
        const stickers = this.app.store.state.stickers || [];
        // Debug/Test Button (Always Show for Verification)
        const debugWrapper = document.createElement('div');
        debugWrapper.style.gridColumn = "1/-1";
        debugWrapper.style.textAlign = "center";

        const debugBtn = document.createElement('button');
        debugBtn.innerText = "🎁 TEST: Get Free Sticker";
        debugBtn.className = "btn-core";
        debugBtn.style.margin = "20px";
        debugBtn.style.background = "#9C27B0";
        debugBtn.onclick = () => {
            this.app.store.unlockSticker("🐛");
            this.app.scenes.goTo(StickerBookScene); // Reload
        };
        debugWrapper.appendChild(debugBtn);
        gridContainer.appendChild(debugWrapper);

        if (stickers.length === 0) {
            // Only show placeholder if we haven't added the debug button (or show below it)
            const placeholder = document.createElement('div');
            placeholder.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; margin-top: 50px; color: #888;">
                    <div style="font-size: 4rem; opacity: 0.5;">📖</div>
                    <h2>No stickers yet!</h2>
                    <p>Play games to earn them.</p>
                </div>
            `;
            gridContainer.appendChild(placeholder);
        } else {
            stickers.forEach(emoji => {
                const sticker = document.createElement('div');
                sticker.className = 'btn-tile'; // Reuse tile look
                sticker.style.background = 'white';
                sticker.style.color = '#333';
                sticker.style.fontSize = '4rem';
                sticker.style.display = 'flex';
                sticker.style.alignItems = 'center';
                sticker.style.justifyContent = 'center';
                sticker.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                sticker.innerText = emoji;

                // Pop animation on load
                sticker.animate([
                    { transform: 'scale(0)' },
                    { transform: 'scale(1)' }
                ], { duration: 400, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });

                gridContainer.appendChild(sticker);
            });
        }

        return this.element;
    }
}

/* --- src/scenes/HomeScene.js --- */













class HomeScene extends Scene {
    async onInit() {
        this.cardColors = [
            'var(--color-card-1)', 'var(--color-card-2)', 'var(--color-card-3)',
            'var(--color-card-4)', 'var(--color-card-5)'
        ];
    }

    render() {
        this.element.className = 'scene-home full-screen';
        // this.element.style.background = 'var(--color-bg-page)'; // Removed to show Wood Table
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'column';
        this.element.style.overflow = 'hidden';

        // 1. Top Bar (Brand)
        const header = document.createElement('header');
        header.style.backgroundColor = 'var(--color-brand-purple)';
        header.style.height = '60px';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent = 'space-between';
        header.style.padding = '0 var(--spacing-md)';
        header.style.boxShadow = '0 4px 0 rgba(0,0,0,0.1)';
        header.style.zIndex = 10;

        header.innerHTML = `
            <div style="color: white; font-weight: 900; font-size: 1.5rem; letter-spacing: 1px;">
                ALPHA KIDS
            </div>
            <div style="display: flex; gap: 10px;">
                <button id="btn-sticker-book" class="btn-core" style="background: #FFD700; color: #D84315; padding: 5px 15px; border-radius: 20px; box-shadow: 0 4px 0 #F57F17;">
                    📖 Stickers
                </button>
                <button id="btn-parents" class="btn-core" style="background: rgba(255,255,255,0.2); color: white; padding: 5px 15px; border-radius: 20px;">
                    Parents 🔒
                </button>
            </div>
        `;

        // 2. Hero Section (Yellow "Picks of the Week" style)
        // 2. Hero Section (Yellow "Picks of the Week" style)
        const hero = document.createElement('section');
        hero.style.flex = '1'; // Takes remaining space
        hero.style.background = 'var(--color-bg-hero)'; // Yellow
        hero.style.position = 'relative';
        hero.style.display = 'flex';
        hero.style.flexDirection = 'column';
        hero.style.alignItems = 'center';
        hero.style.justifyContent = 'center';
        hero.style.padding = '20px';
        hero.style.margin = '20px';
        hero.style.borderRadius = '20px';
        hero.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
        hero.style.border = '4px solid white'; // Poster look

        // "Start Adventure" content
        const heroContent = document.createElement('div');
        heroContent.className = 'flex-center';
        heroContent.style.width = '100%';
        heroContent.style.maxWidth = '600px';
        heroContent.style.gap = '20px';

        // Character/Icon Left (Placeholder)
        const heroIcon = document.createElement('div');
        heroIcon.innerText = '🚀';
        heroIcon.style.fontSize = '6rem';
        heroIcon.className = 'float-anim';

        // Text & Button Right
        const heroText = document.createElement('div');
        heroText.innerHTML = `
            <h2 style="margin: 0; font-size: 1.2rem; color: #555; text-transform: uppercase;">Daily Adventure</h2>
            <h1 style="margin: 5px 0 15px 0; font-size: 2rem; color: var(--color-brand-purple);">Let's Play Math!</h1>
            <button id="btn-play-hero" class="btn-core" style="
                background: var(--color-brand-green);
                color: white;
                font-size: 1.5rem;
                padding: 10px 40px;
                border-radius: var(--radius-btn);
                box-shadow: 0 4px 0 #5DA000;
            ">
                ▶ START
            </button>
        `;

        heroContent.appendChild(heroIcon);
        heroContent.appendChild(heroText);
        hero.appendChild(heroContent);

        // Wave divider at bottom of hero
        const wave = document.createElement('div');
        wave.style.position = 'absolute';
        wave.style.bottom = '-1px'; // Overlap slightly
        wave.style.left = 0;
        wave.style.width = '100%';
        wave.style.height = '40px';
        wave.style.background = 'var(--color-bg-page)';
        wave.style.clipPath = 'ellipse(70% 100% at 50% 100%)'; // Curved cut
        hero.appendChild(wave);


        // 3. Carousel Section ("All Shows" style)
        const carouselSection = document.createElement('section');
        carouselSection.style.height = '220px'; // Fixed height for carousel
        carouselSection.style.position = 'relative';
        carouselSection.style.display = 'flex';
        carouselSection.style.alignItems = 'center';
        carouselSection.style.padding = '0 10px';

        // Left Arrow
        const btnLeft = document.createElement('button');
        btnLeft.className = 'btn-core btn-nav-arrow left';
        btnLeft.innerHTML = '➤'; // Unicode arrow
        btnLeft.onclick = () => this.scrollCarousel(-1);

        // Scroll Container
        const scrollContainer = document.createElement('div');
        scrollContainer.id = 'carousel-scroll';
        scrollContainer.style.flex = 1;
        scrollContainer.style.height = '100%';
        scrollContainer.style.display = 'flex';
        scrollContainer.style.alignItems = 'center';
        scrollContainer.style.gap = '15px';
        scrollContainer.style.overflowX = 'auto'; // Native scroll
        scrollContainer.style.scrollBehavior = 'smooth';
        scrollContainer.style.padding = '0 10px';
        scrollContainer.style.scrollbarWidth = 'none'; // Hide scrollbar FF

        // Activities
        const activities = [
            { id: 'dot-flash', label: 'Dot Flash', Scene: DotFlashActivity, icon: '⚡' },
            { id: 'feed-anim', label: 'Hungry Dog', Scene: FeedTheAnimalActivity, icon: '🐶' },
            { id: 'more', label: 'More?', Scene: WhichHasMoreActivity, icon: '⚖️' },
            { id: 'join', label: 'Story Add', Scene: JoinTheStoryActivity, icon: '➕' },
            { id: 'hide', label: 'Hide Find', Scene: HideAndFindActivity, icon: '🙈' },
            { id: 'shape', label: 'Builder', Scene: ShapeBuilderActivity, icon: '🏠' },
            { id: 'pattern', label: 'Train', Scene: PatternTrainActivity, icon: '🚂' },
            { id: 'sort', label: 'Sorting', Scene: SortingBasketActivity, icon: '🧺' }
        ];

        activities.forEach((act, idx) => {
            const card = this.createCard(act, idx);
            scrollContainer.appendChild(card);
        });

        // Right Arrow
        const btnRight = document.createElement('button');
        btnRight.className = 'btn-core btn-nav-arrow';
        btnRight.innerHTML = '➤';
        btnRight.onclick = () => this.scrollCarousel(1);

        carouselSection.appendChild(btnLeft);
        carouselSection.appendChild(scrollContainer);
        carouselSection.appendChild(btnRight);

        // Assemble
        this.element.appendChild(header);
        this.element.appendChild(hero);
        this.element.appendChild(carouselSection);

        // Events
        this.element.querySelector('#btn-play-hero').onclick = () => this.onStartDailySession();
        this.element.querySelector('#btn-parents').onclick = () => this.onParentGate();
        this.element.querySelector('#btn-sticker-book').onclick = () => this.app.scenes.goTo(StickerBookScene);

        return this.element;
    }

    createCard(act, idx) {
        const card = document.createElement('div');
        card.className = 'card-activity btn-core';
        card.style.minWidth = '140px';
        card.style.height = '180px';

        // Cycle colors
        const colorVar = this.cardColors[idx % this.cardColors.length];
        card.style.background = colorVar; // Fallback

        card.innerHTML = `
            <div style="font-size: 3.5rem; margin-bottom: 10px;">${act.icon}</div>
            <div style="font-size: 1rem; text-align: center; line-height: 1.2;">
                ${act.label.replace(' ', '<br>')}
            </div>
        `;

        // Random slight rotation for fun - Removed for better hover UX
        // const rot = (Math.random() * 4 - 2).toFixed(1); // -2 to 2 deg
        // card.style.transform = `rotate(${rot}deg)`;

        card.onclick = () => {
            this.app.scenes.goTo(act.Scene);
        };

        return card;
    }

    scrollCarousel(dir) {
        const container = this.element.querySelector('#carousel-scroll');
        const scrollAmount = 200; // approx one card + gap
        container.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
    }

    onStartDailySession() {
        this.app.scenes.goTo(DailySessionScene);
    }

    onParentGate() {
        this.app.scenes.goTo(ParentGateScene);
    }
}

/* --- src/core/App.js --- */






class App {
    constructor() {
        this.container = document.getElementById('app');
        this.store = new Store();
        this.assets = new AssetLoader();
        this.audio = new AudioManager();
        this.scenes = new SceneManager(this);
    }

    async init() {
        console.log("Alpha Kids Math Explorer v1.2 Starting...");

        // 1. Load critical assets
        await this.preload();

        // 2. Setup event listeners (global)
        this.setupInput();

        // 3. Start Home Scene
        await this.scenes.goTo(HomeScene);
    }

    async preload() {
        // Only preload critical UI assets if any.
        // For standalone, most assets are code-generated or data-uris (if added).
        // Since we use synthetic audio and CSS shapes, we can skip big loads.
        const assetsToLoad = [];
        await this.assets.loadBatch(assetsToLoad);
        console.log("Assets loaded");
    }

    setupInput() {
        window.addEventListener('contextmenu', (e) => e.preventDefault());

        // Detect "Escape" to go back (useful for dev)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.scenes.currentScene instanceof HomeScene === false) {
                // For now, no back button logic, but good for testing
                // this.scenes.goTo(HomeScene); 
            }
        });
    }
}

/* --- src/main.js --- */


// Initialize the application once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    window.app = app; // For debugging
    app.init().catch(err => {
        console.error("Failed to initialize app:", err);
    });
});
