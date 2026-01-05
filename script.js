
/* --- Configuration & State --- */
const ThemePresets = {
    modern: {
        '--bg-color': '#0f172a',
        '--blob-color-1': '#4f46e5',
        '--blob-color-2': '#ec4899',
        '--text-primary': '#ffffff',
        '--text-secondary': 'rgba(255,255,255,0.6)',
        '--glass-bg': 'rgba(255, 255, 255, 0.05)',
        '--modal-bg': 'rgba(30, 41, 59, 0.95)',
        '--operator-bg': '#ff9f0a',
        '--btn-bg': 'rgba(255, 255, 255, 0.1)'
    },
    light: {
        '--bg-color': '#e2e8f0',
        '--blob-color-1': '#3b82f6',
        '--blob-color-2': '#f43f5e',
        '--text-primary': '#1e293b',
        '--text-secondary': '#475569',
        '--glass-bg': 'rgba(255, 255, 255, 0.6)',
        '--modal-bg': 'rgba(255, 255, 255, 0.95)',
        '--operator-bg': '#007bff',
        '--btn-bg': 'rgba(255, 255, 255, 0.8)'
    },
    dark: {
        '--bg-color': '#000000',
        '--blob-color-1': '#333333',
        '--blob-color-2': '#1a1a1a',
        '--text-primary': '#ffffff',
        '--text-secondary': '#888888',
        '--glass-bg': 'rgba(20, 20, 20, 0.6)',
        '--modal-bg': 'rgba(20, 20, 20, 0.95)',
        '--operator-bg': '#333333',
        '--btn-bg': 'rgba(255, 255, 255, 0.1)'
    },
    amoled: {
        '--bg-color': '#000000',
        '--blob-color-1': '#000000',
        '--blob-color-2': '#000000',
        '--text-primary': '#ffffff',
        '--text-secondary': '#666666',
        '--glass-bg': 'rgba(0,0,0,0)',
        '--modal-bg': '#000000',
        '--operator-bg': '#1a1a1a',
        '--btn-bg': 'rgba(20, 20, 20, 1)'
    },
    retro: {
        '--bg-color': '#d4c5a2',
        '--blob-color-1': '#c1b085',
        '--blob-color-2': '#a39265',
        '--text-primary': '#3e2723',
        '--text-secondary': '#5d4037',
        '--glass-bg': 'rgba(255, 255, 255, 0.3)',
        '--modal-bg': 'rgba(240, 230, 210, 0.95)',
        '--operator-bg': '#795548',
        '--btn-bg': 'rgba(255, 255, 255, 0.5)'
    },
    classic: {
        '--bg-color': '#8fbc8f', /* SeaGreenish */
        '--blob-color-1': '#2e8b57',
        '--blob-color-2': '#3cb371',
        '--text-primary': '#000000',
        '--text-secondary': '#222222',
        '--glass-bg': 'rgba(255, 255, 255, 0.3)',
        '--modal-bg': 'rgba(220, 255, 220, 0.95)',
        '--operator-bg': '#2f4f4f',
        '--btn-bg': 'rgba(255, 255, 255, 0.5)'
    },
    volcano: {
        '--bg-color': '#2c0b0e',
        '--blob-color-1': '#b91c1c',
        '--blob-color-2': '#f87171',
        '--text-primary': '#ffffff',
        '--text-secondary': '#fca5a5',
        '--glass-bg': 'rgba(50, 0, 0, 0.3)',
        '--modal-bg': 'rgba(40, 10, 15, 0.95)',
        '--operator-bg': '#ef4444',
        '--btn-bg': 'rgba(255, 255, 255, 0.1)'
    },
    forest: {
        '--bg-color': '#052e16',
        '--blob-color-1': '#15803d',
        '--blob-color-2': '#4ade80',
        '--text-primary': '#f0fdf4',
        '--text-secondary': '#86efac',
        '--glass-bg': 'rgba(0, 50, 0, 0.3)',
        '--modal-bg': 'rgba(5, 40, 20, 0.95)',
        '--operator-bg': '#22c55e',
        '--btn-bg': 'rgba(255, 255, 255, 0.1)'
    },
    desert: {
        '--bg-color': '#78350f',
        '--blob-color-1': '#ca8a04',
        '--blob-color-2': '#fbbf24',
        '--text-primary': '#fef3c7',
        '--text-secondary': '#fcd34d',
        '--glass-bg': 'rgba(100, 50, 0, 0.3)',
        '--modal-bg': 'rgba(120, 50, 15, 0.95)',
        '--operator-bg': '#d97706',
        '--btn-bg': 'rgba(255, 255, 255, 0.1)'
    }
};

const CalculatorModes = {
    basic: [
        { text: 'AC', type: 'function', action: 'clear' },
        { text: '+/-', type: 'function', action: 'sign' },
        { text: '%', type: 'function', action: 'percent' },
        { text: '÷', type: 'operator', action: 'divide' },
        { text: '7', type: 'number', number: '7' },
        { text: '8', type: 'number', number: '8' },
        { text: '9', type: 'number', number: '9' },
        { text: '×', type: 'operator', action: 'multiply' },
        { text: '4', type: 'number', number: '4' },
        { text: '5', type: 'number', number: '5' },
        { text: '6', type: 'number', number: '6' },
        { text: '−', type: 'operator', action: 'subtract' },
        { text: '1', type: 'number', number: '1' },
        { text: '2', type: 'number', number: '2' },
        { text: '3', type: 'number', number: '3' },
        { text: '+', type: 'operator', action: 'add' },
        { text: '0', type: 'number', number: '0' },
        { text: '00', type: 'number', number: '00' },
        { text: '.', type: 'number', number: '.' },
        { text: '=', type: 'equal', action: 'calculate' }
    ]
};

/* --- Logic Classes --- */

class HistoryManager {
    constructor() {
        this.listElement = document.getElementById('history-list');
        this.clearBtn = document.getElementById('clear-history');
        this.sidebar = document.getElementById('history-sidebar');
        this.openBtn = document.getElementById('history-btn');
        this.closeBtn = this.sidebar.querySelector('.close-sidebar');

        this.history = JSON.parse(localStorage.getItem('calctech-history') || '[]');
        this.render();
        this.setupEvents();
    }

    add(expression, result) {
        if (!expression || !result) return;
        this.history.unshift({ expression, result, timestamp: Date.now() });
        if (this.history.length > 50) this.history.pop(); // Limit size
        this.save();
        this.render();
    }

    save() {
        localStorage.setItem('calctech-history', JSON.stringify(this.history));
    }

    clear() {
        this.history = [];
        this.save();
        this.render();
    }

    render() {
        this.listElement.innerHTML = '';
        if (this.history.length === 0) {
            this.listElement.innerHTML = '<div style="text-align:center; color:var(--text-secondary); padding:20px;">No History</div>';
            return;
        }

        this.history.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="history-input">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
            `;
            div.onclick = () => {
                calculator.currentOperand = item.result.toString();
                calculator.updateDisplay();
                this.toggleSidebar();
            };
            this.listElement.appendChild(div);
        });
    }

    setupEvents() {
        this.clearBtn.onclick = () => this.clear();
        this.openBtn.onclick = () => this.toggleSidebar();
        this.closeBtn.onclick = () => this.toggleSidebar();
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('active');
    }
}

class Calculator {
    constructor(prevOperandElem, currOperandElem) {
        this.prevOperandElem = prevOperandElem;
        this.currOperandElem = currOperandElem;
        this.settings = {
            precision: 8,
            format: 'us', // us, eu, in
            wakelock: false,
            base: 10 // 10, 16, 2
        };
        this.isScientific = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        // Prevent invalid digits for the base
        if (this.settings.base === 2 && !['0', '1'].includes(number.toString())) return;
        if (this.settings.base === 10 && 'ABCDEF'.includes(number.toString())) return;

        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }

    advancedFunction(funcName) {
        // Advanced functions strictly in Decimal for now
        let val = parseFloat(this.currentOperand);
        if (this.settings.base !== 10) val = parseInt(this.currentOperand, this.settings.base);

        if (isNaN(val)) return;
        let res = 0;
        switch (funcName) {
            case 'sin': res = Math.sin(val); break;
            case 'cos': res = Math.cos(val); break;
            case 'tan': res = Math.tan(val); break;
            case 'log': res = Math.log10(val); break;
            case 'ln': res = Math.log(val); break;
            case 'sqrt': res = Math.sqrt(val); break;
            default: return;
        }
        this.currentOperand = res; // internal result is decimal
        if (this.settings.base !== 10) {
            this.currentOperand = Math.floor(res).toString(this.settings.base).toUpperCase();
        }
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    compute() {
        let computation;
        let prev, current;

        if (this.settings.base === 10) {
            prev = parseFloat(this.previousOperand);
            current = parseFloat(this.currentOperand);
        } else {
            prev = parseInt(this.previousOperand, this.settings.base);
            current = parseInt(this.currentOperand, this.settings.base);
        }

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '×': computation = prev * current; break;
            case '÷': computation = prev / current; break;
            case '^': computation = Math.pow(prev, current); break;
            default: return;
        }

        // History Tracking (Display in current base)
        const expression = `${this.previousOperand} ${this.operation} ${this.currentOperand}`;

        let resString;
        if (this.settings.base === 10) {
            resString = computation;
            this.currentOperand = computation;
        } else {
            // Integer math for non-decimal
            computation = Math.floor(computation);
            resString = computation.toString(this.settings.base).toUpperCase();
            this.currentOperand = resString;
        }

        historyManager.add(expression, resString);

        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        if (this.settings.base !== 10) {
            return stringNumber.toUpperCase();
        }

        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            let locale = 'en-US';
            if (this.settings.format === 'eu') locale = 'de-DE';
            if (this.settings.format === 'in') locale = 'en-IN';
            integerDisplay = integerDigits.toLocaleString(locale, { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits.slice(0, this.settings.precision)}`;
        } else {
            return integerDisplay;
        }
    }

    setBase(newBase) {
        if (this.settings.base === newBase) return;

        // Convert current operand to new base
        // First parse current to decimal number
        let val;
        if (this.settings.base === 10) {
            val = parseFloat(this.currentOperand); // Handle float in decimal
            val = Math.floor(val); // Integer for programmer mode transition
        } else {
            val = parseInt(this.currentOperand, this.settings.base);
        }

        if (isNaN(val)) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = val.toString(newBase).toUpperCase();
        }

        this.settings.base = newBase;
        this.updateDisplay();
    }

    updateDisplay() {
        this.currOperandElem.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.prevOperandElem.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.prevOperandElem.innerText = '';
        }
    }

    toggleSign() {
        if (this.currentOperand === '0') return;
        // Simplified sign toggle for decimal only usually, but let's try
        if (this.settings.base === 10) {
            this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
        } else {
            // For hex/bin, sign is complex (2's complement vs - sign). 
            // Let's just do math negate
            let val = parseInt(this.currentOperand, this.settings.base);
            val = -val;
            this.currentOperand = val.toString(this.settings.base).toUpperCase();
        }
    }

    percentage() {
        if (this.settings.base !== 10) return; // No percent in Hex
        this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
    }
}

/* --- Initialization --- */

const prevOpElem = document.getElementById('previous-operand');
const currOpElem = document.getElementById('current-operand');
const calculator = new Calculator(prevOpElem, currOpElem);
const historyManager = new HistoryManager();

/* --- Mode Switcher --- */
// const modeSelector = document.getElementById('mode-selector'); 
// Removed mode selector logic as it's just basic now.

// Initialize Layout
const keypad = document.querySelector('.keypad');

function loadBasicMode() {
    // Reset base to 10 on mode switch unless it's programmer
    if ('basic' !== 'programmer' && calculator.settings.base !== 10) {
        calculator.setBase(10);
    }

    keypad.innerHTML = '';
    const layout = CalculatorModes['basic'];

    // Always use 4 columns for consistency, adapt content to rows
    keypad.style.gridTemplateColumns = 'repeat(4, 1fr)';

    layout.forEach(btnConfig => {
        const btn = document.createElement('button');
        btn.className = `btn ${btnConfig.class || ''}`;

        if (btnConfig.type === 'number') btn.classList.add('btn-number');
        if (btnConfig.type === 'operator') btn.classList.add('btn-operator');
        if (btnConfig.type === 'function') btn.classList.add('btn-function');
        if (btnConfig.type === 'equal') btn.classList.add('btn-equal');

        btn.innerText = btnConfig.text;

        // Attach Logic
        btn.onclick = () => {
            handleInput(btnConfig, btn.innerText);
            animateButton(btn);
            playClickSound();
            triggerVibration();
        };

        keypad.appendChild(btn);
    });
}

function handleInput(config, text) {
    if (config.type === 'number') {
        calculator.appendNumber(config.number);
    } else if (config.type === 'operator') {
        calculator.chooseOperation(config.action === 'multiply' ? '×' : config.action === 'divide' ? '÷' : config.action === 'subtract' ? '-' : config.action === 'add' ? '+' : text);
    } else if (config.type === 'equal') {
        calculator.compute();
    } else if (config.type === 'function') {
        if (config.action === 'clear') calculator.clear();
        if (config.action === 'sign') calculator.toggleSign();
        if (config.action === 'percent') calculator.percentage();
        if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(config.action)) calculator.advancedFunction(config.action);
        if (['base_hex', 'base_bin', 'base_dec'].includes(config.action)) {
            const baseMap = { base_hex: 16, base_bin: 2, base_dec: 10 };
            calculator.setBase(baseMap[config.action]);
        }
    }
    calculator.updateDisplay();
}

// modeSelector.addEventListener('change', (e) => loadMode(e.target.value));
// Initial Load
loadBasicMode();

function handleInput(config, text) {
    if (config.type === 'number') {
        calculator.appendNumber(config.number);
    } else if (config.type === 'operator') {
        calculator.chooseOperation(config.action === 'multiply' ? '×' : config.action === 'divide' ? '÷' : config.action === 'subtract' ? '-' : config.action === 'add' ? '+' : text);
    } else if (config.type === 'equal') {
        calculator.compute();
    } else if (config.type === 'function') {
        if (config.action === 'clear') calculator.clear();
        if (config.action === 'sign') calculator.toggleSign();
        if (config.action === 'percent') calculator.percentage();
    }
    calculator.updateDisplay();
}


/* --- Advanced Customization & Settings --- */

const inputs = {
    '--blob-color-1': document.getElementById('blob-color-1'),
    '--blob-color-2': document.getElementById('blob-color-2'),
    '--text-primary': document.getElementById('text-primary'),
    '--text-secondary': document.getElementById('text-secondary'),
    '--operator-bg': document.getElementById('operator-bg'),
};

// Shape & Elevation
document.getElementById('btn-shape-select').addEventListener('change', (e) => {
    document.documentElement.style.setProperty('--btn-radius', e.target.value);
    document.querySelectorAll('.btn').forEach(b => b.style.borderRadius = e.target.value);
});
document.getElementById('elevation-select').addEventListener('change', (e) => {
    const val = e.target.value;
    const calc = document.querySelector('.calculator');
    if (val === 'flat') {
        calc.style.boxShadow = 'none';
        calc.style.border = '1px solid rgba(255,255,255,0.05)';
    } else if (val === '2d') {
        calc.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.3)';
    } else if (val === '3d') {
        calc.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px var(--glass-border)';
    }
});
document.getElementById('font-select').addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value;
});

// Presets
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const themeName = btn.dataset.theme;
        const theme = ThemePresets[themeName];
        if (!theme) return;

        for (const [key, val] of Object.entries(theme)) {
            document.documentElement.style.setProperty(key, val);
            // Update inputs if they exist
            if (inputs[key]) inputs[key].value = val;
        }
    });
});

// BG Image
document.getElementById('bg-image-upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            document.body.style.backgroundImage = `url(${ev.target.result})`;
            document.body.style.backgroundSize = 'cover';
        };
        reader.readAsDataURL(file);
    }
});

// Settings Input Logic
document.getElementById('precision-input').addEventListener('input', (e) => {
    calculator.settings.precision = parseInt(e.target.value);
    calculator.updateDisplay();
});
document.getElementById('number-format').addEventListener('change', (e) => {
    calculator.settings.format = e.target.value;
    calculator.updateDisplay();
});
document.getElementById('wakelock-toggle').addEventListener('change', async (e) => {
    if (e.target.checked && 'wakeLock' in navigator) {
        try {
            await navigator.wakeLock.request('screen');
        } catch (err) { console.log(err); }
    }
});


// Reuse existing Modal & Sound logic...
const modalOverlay = document.getElementById('modal-overlay');
const themeModal = document.getElementById('theme-modal');
const settingsModal = document.getElementById('settings-modal');
const aboutModal = document.getElementById('about-modal');

document.getElementById('theme-btn').onclick = () => openModal(themeModal);
document.getElementById('settings-btn').onclick = () => openModal(settingsModal);
document.getElementById('brand-link').onclick = () => openModal(aboutModal);
modalOverlay.onclick = () => closeModal();
document.querySelectorAll('.close-modal').forEach(b => b.onclick = closeModal);

function openModal(m) {
    modalOverlay.classList.add('active');
    m.classList.add('active');
}
function closeModal() {
    modalOverlay.classList.remove('active');
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// Sound & Haptics (Simplified for length)
let soundEnabled = false, vibrationEnabled = false;
document.getElementById('sound-toggle').addEventListener('change', (e) => soundEnabled = e.target.checked);
document.getElementById('vibration-toggle').addEventListener('change', (e) => vibrationEnabled = e.target.checked);

function playClickSound() {
    if (!soundEnabled) return;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}
function triggerVibration() { if (vibrationEnabled && navigator.vibrate) navigator.vibrate(5); }
function animateButton(btn) { btn.classList.add('pressed'); setTimeout(() => btn.classList.remove('pressed'), 100); }
