// Китайские иероглифы для фона
const chineseSymbols = [
    "福", "喜", "愛", "夢", "力", "氣", "龍", "虎", "火", "水",
    "風", "山", "天", "地", "人", "心", "神", "美", "樂", "和",
    "平", "安", "幸", "運", "財", "富", "貴", "祥", "瑞", "壽",
    "春", "夏", "秋", "冬", "日", "月", "星", "辰", "光", "明"
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация загрузки
    initLoader();
    
    // Создание фоновых иероглифов
    createBackgroundSymbols();
    
    // Настройка навигации
    setupNavigation();
    
    // Настройка кнопок назад
    setupBackButtons();
});

// Функция инициализации загрузки
function initLoader() {
    const loader = document.getElementById('loader');
    const loaderFill = document.querySelector('.loader-fill');
    const mainContent = document.getElementById('main-content');
    
    // Имитация загрузки
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Задержка перед скрытием загрузки
            setTimeout(() => {
                loader.classList.add('hidden');
                mainContent.style.display = 'block';
                
                // Показать основной контент
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }
        loaderFill.style.width = `${progress}%`;
    }, 100);
}

// Создание фоновых иероглифов
function createBackgroundSymbols() {
    const container = document.querySelector('.background-symbols');
    const symbolCount = 50;
    
    for (let i = 0; i < symbolCount; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.textContent = chineseSymbols[Math.floor(Math.random() * chineseSymbols.length)];
        
        // Случайная позиция
        const left = Math.random() * 100;
        const top = Math.random() * 100 + 100; // Начинаем ниже экрана
        
        // Случайный размер
        const size = 16 + Math.random() * 32;
        
        // Случайная скорость
        const duration = 20 + Math.random() * 40;
        const delay = Math.random() * 20;
        
        // Случайный оттенок красного
        const redValue = Math.floor(50 + Math.random() * 150);
        const opacity = 0.05 + Math.random() * 0.1;
        
        // Применение стилей
        symbol.style.left = `${left}%`;
        symbol.style.top = `${top}%`;
        symbol.style.fontSize = `${size}px`;
        symbol.style.color = `rgba(${redValue}, 0, 0, ${opacity})`;
        symbol.style.animationDuration = `${duration}s`;
        symbol.style.animationDelay = `${delay}s`;
        
        // Случайное вращение
        symbol.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(symbol);
    }
}

// Настройка навигации
function setupNavigation() {
    const buttons = document.querySelectorAll('.btn[data-target]');
    const screens = document.querySelectorAll('.screen');
    const mainScreen = document.getElementById('home-screen');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Скрыть главный экран
            mainScreen.classList.remove('active');
            
            // Скрыть все экраны
            screens.forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Показать целевой экран
            const targetScreen = document.getElementById(`${target}-screen`);
            if (targetScreen) {
                targetScreen.classList.add('active');
                // Прокрутка наверх
                targetScreen.scrollTop = 0;
            }
        });
    });
}

// Настройка кнопок назад
function setupBackButtons() {
    const backButtons = document.querySelectorAll('.back-btn');
    const screens = document.querySelectorAll('.screen');
    const mainScreen = document.getElementById('home-screen');
    
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Скрыть все экраны
            screens.forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Показать главный экран
            mainScreen.classList.add('active');
        });
    });
}

// Добавляем эффект параллакса для фоновых символов
window.addEventListener('scroll', function() {
    const symbols = document.querySelectorAll('.symbol');
    const scrollY = window.scrollY;
    
    symbols.forEach(symbol => {
        const speed = 0.5;
        const yPos = -(scrollY * speed);
        symbol.style.transform += ` translateY(${yPos}px)`;
    });
});

// Добавляем эффект при наведении на кнопки
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const span = document.createElement('span');
        
        span.style.left = x + 'px';
        span.style.top = y + 'px';
        
        this.appendChild(span);
        
        setTimeout(() => {
            span.remove();
        }, 1000);
    });
});

// Добавляем звуковой эффект при клике на кнопки (опционально)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Создаем звуковой контекст (браузеры требуют взаимодействия пользователя)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Настройки звука
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.1;
            
            // Воспроизведение и остановка звука
            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Если AudioContext не поддерживается, просто игнорируем
            console.log("AudioContext not supported");
        }
    });
});

// Анимация появления элементов при прокрутке
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами с анимацией
    document.querySelectorAll('.price-card, .project-card').forEach(card => {
        observer.observe(card);
    });
}

// Инициализация анимаций при прокрутке после загрузки
setTimeout(setupScrollAnimations, 1000);
