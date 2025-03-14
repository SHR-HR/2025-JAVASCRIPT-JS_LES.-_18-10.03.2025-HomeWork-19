// ========================================================================================================
// Урок от 12 марта 2025. Домашняя работа.
// ========================================================================================================

// ========================================================================================================
// Курс: Разработка интерфейса на JavaScript
// ========================================================================================================

// ========================================================================================================
// Дисциплина: Основы  JavaScript
// ========================================================================================================

// ========================================================================================================
// Домашнее задание №19: Практика по обработке событий на JavaScript.
// ========================================================================================================

// ========================================================================================================
// Решите данную задачу.
// Напиши калькулятор с функционалом для кнопок, а также для ввода с клавиатуры функции.
// Закончить оставшиеся функции в калькуляторе. (если в них есть смысл)
// ========================================================================================================










// ========================== ОСНОВНЫЕ ЭЛЕМЕНТЫ ==========================

// Получаем элемент дисплея по ID
const display = document.getElementById("display");


// ========================== ФУНКЦИИ ==========================

// === Добавление значения в дисплей ===
// value — это значение, переданное при нажатии кнопки
function appendValue(value) {
    // Проверяем длину содержимого дисплея (не более 16 символов)
    if (display.value.length < 16) {
        // Добавляем значение в дисплей
        display.value += value;
    }
}

// === Удаляем последний символ из дисплея ===
function deleteLast() {
    // Метод slice обрезает строку на 1 символ с конца
    display.value = display.value.slice(0, -1);
}

// === Очищаем дисплей ===
function clearDisplay() {
    // Просто присваиваем пустую строку — дисплей становится пустым
    display.value = "";
}

// === Выполняем расчет выражения ===
function calculateResult() {
    try {
        // Проверяем на наличие недопустимых символов в выражении
        if (/[^0-9+\-*/().%]/.test(display.value)) {
            throw new Error("Недопустимый ввод");
        }
        // Выполняем расчет с помощью eval (ОПАСНО в реальном коде!)
        display.value = eval(display.value);
    } catch (error) {
        // В случае ошибки выводим сообщение "Ошибка"
        display.value = "Ошибка";
    }
}

// === Вычисляем квадратный корень ===
function squareRoot() {
    // Преобразуем содержимое дисплея в число
    let num = parseFloat(display.value);

    // Проверяем, что число положительное
    if (num < 0) {
        display.value = "Ошибка"; // Если число отрицательное — ошибка
        return;
    }

    // Вычисляем квадратный корень с помощью Math.sqrt()
    display.value = Math.sqrt(num);
}

// === Вычисляем факториал ===
function calculateFactorial() {
    // Преобразуем содержимое дисплея в число
    let num = parseFloat(display.value);

    // Факториал определён только для положительных целых чисел
    if (num < 0 || !Number.isInteger(num)) {
        display.value = "Ошибка"; // Ошибка при неправильных данных
        return;
    }

    // Вычисляем факториал через цикл
    let result = 1;
    for (let i = 1; i <= num; i++) {
        result *= i;
    }

    // Выводим результат в дисплей
    display.value = result;
}

// ========================== ПОДСВЕТКА ПРИ НАЖАТИИ ==========================

// === Подсветка кнопки при нажатии с клавиатуры ===
function highlightButton(value) {
    // Ищем кнопку с таким же текстом, как значение value
    const button = [...document.querySelectorAll('.btn')].find(btn => 
        btn.textContent === value || 
        (value === '*' && btn.textContent === '×') || 
        (value === '/' && btn.textContent === '÷') || 
        (value === '^' && btn.textContent === '^')
    );

    if (button) {
        // Добавляем CSS-класс "active" для подсветки
        button.classList.add('active');
        // Через 150 мс удаляем класс "active"
        setTimeout(() => button.classList.remove('active'), 150);
    }
}

// ========================== ОБРАБОТКА СОБЫТИЙ ==========================

// === Обработка событий с клавиатуры ===
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Если нажата клавиша Enter — выполняем расчёт
    if (key === "Enter") {
        calculateResult();
        highlightButton('=');
    } 
    // Если нажата клавиша Backspace — удаляем последний символ
    else if (key === "Backspace") {
        deleteLast();
        highlightButton('←');
    } 
    // Если нажата клавиша умножения (*)
    else if (key === '*') {
        appendValue('*');
        highlightButton('×');
    } 
    // Если нажата клавиша деления (/)
    else if (key === '/') {
        appendValue('/');
        highlightButton('÷');
    } 
    // Если нажата клавиша возведения в степень (^)
    else if (key === '^') {
        appendValue('**');
        highlightButton('^');
    } 
    // Если нажата любая допустимая цифра или символ
    else if (!isNaN(key) || ["+", "-", "%", "."].includes(key)) {
        appendValue(key);
        highlightButton(key);
    }
});

// === Обработка нажатий кнопок мышью ===
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        // Получаем значение из data-value
        const value = btn.dataset.value;
        const action = btn.dataset.action;

        // Если действие — очистка
        if (action === "clear") clearDisplay();
        // Если действие — удаление последнего символа
        else if (action === "delete") deleteLast();
        // Если действие — выполнение расчёта
        else if (action === "calculate") calculateResult();
        // Если действие — квадратный корень
        else if (action === "sqrt") squareRoot();
        // Если действие — факториал
        else if (action === "factorial") calculateFactorial();
        // Если передано значение (например, число или оператор)
        else appendValue(value);
    });
});

// ========================== СМЕНА ТЕМЫ ==========================

// Получаем элемент переключателя темы
const themeToggle = document.getElementById('theme-toggle');

// Обработчик события для смены темы
themeToggle.addEventListener('click', () => {
    // Переключаем класс "dark" у body
    document.body.classList.toggle('dark');

    // Сохраняем выбранную тему в localStorage
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Проверяем сохранённую тему при загрузке страницы
if (localStorage.getItem('theme') === 'dark') {
    // Если тема "dark" — добавляем класс "dark"
    document.body.classList.add('dark');
}



