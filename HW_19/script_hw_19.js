let activeCalculator = 'basic'; // переменная для отслеживания активного калькулятора

function toggleCalculator() {
    if (activeCalculator === 'basic') {
        document.getElementById('basic-calculator').classList.remove('active');
        document.getElementById('scientific-calculator').classList.add('active');
        activeCalculator = 'scientific';
    } else {
        document.getElementById('scientific-calculator').classList.remove('active');
        document.getElementById('basic-calculator').classList.add('active');
        activeCalculator = 'basic';
    }
}

function appendValue(value) {
    const display = activeCalculator === 'basic' ? document.getElementById('display') : document.getElementById('scientific-display');
    display.value += value;
}

function clearDisplay() {
    const display = activeCalculator === 'basic' ? document.getElementById('display') : document.getElementById('scientific-display');
    display.value = '';
}

function calculate() {
    const display = activeCalculator === 'basic' ? document.getElementById('display') : document.getElementById('scientific-display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        alert('Ошибка в выражении');
    }
}

// Обработка ввода с клавиатуры
document.addEventListener('keydown', (event) => {
    const display = activeCalculator === 'basic' ? document.getElementById('display') : document.getElementById('scientific-display');
    
    if ('0123456789+-*/.()'.includes(event.key)) {
        appendValue(event.key); // Добавляем символы в дисплей
    } else if (event.key === 'Enter') {
        calculate(); // Если нажали Enter, вычисляем
    } else if (event.key === 'Backspace') {
        display.value = display.value.slice(0, -1); // Удаление последнего символа
    } else if (event.key === 'Escape') {
        clearDisplay(); // Очистить дисплей
    }
});

// Футбольное поле и мяч
const ball = document.getElementById('ball');
const field = document.getElementById('football-field');

field.addEventListener('click', (event) => {
    const fieldRect = field.getBoundingClientRect();
    const x = event.clientX - fieldRect.left - 50; // центр мяча
    const y = event.clientY - fieldRect.top - 50;

    const maxX = fieldRect.width - 100; // ограничение по ширине
    const maxY = fieldRect.height - 100; // ограничение по высоте

    const finalX = Math.max(0, Math.min(x, maxX)); // ограничиваем мяч по оси X
    const finalY = Math.max(0, Math.min(y, maxY)); // ограничиваем мяч по оси Y

    ball.style.transition = 'left 0.5s, top 0.5s'; // плавное движение мяча
    ball.style.left = finalX + 'px';
    ball.style.top = finalY + 'px';
});


