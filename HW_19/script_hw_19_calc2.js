var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '/'];
var decimalAdded = false;

for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function(e) {
        var input = document.querySelector('#display');
        var inputVal = input.innerHTML;
        var btnVal = this.innerHTML;
        
        // Очистка дисплея
        if (btnVal == 'C') {
            input.innerHTML = '';
            decimalAdded = false;
        }
        // Вычисление результата
        else if (btnVal == '=') {
            var equation = inputVal;
            var lastChar = equation[equation.length - 1];
            
            equation = equation.replace(/x/g, '*');
            
            if (operators.indexOf(lastChar) > -1 || lastChar == '.')
                equation = equation.replace(/.$/, '');
            
            if (equation)
                input.innerHTML = eval(equation);
            
            decimalAdded = false;
        }
        // Обработка операторов
        else if (operators.indexOf(btnVal) > -1) {
            var lastChar = inputVal[inputVal.length - 1];
            
            if (inputVal != '' && operators.indexOf(lastChar) == -1) 
                input.innerHTML += btnVal;
            
            else if (inputVal == '' && btnVal == '-') 
                input.innerHTML += btnVal;
            
            if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                input.innerHTML = inputVal.replace(/.$/, btnVal);
            }
            
            decimalAdded = false;
        }
        // Обработка десятичного разделителя
        else if (btnVal == '.') {
            if (!decimalAdded) {
                input.innerHTML += btnVal;
                decimalAdded = true;
            }
        }
        // Обработка чисел
        else {
            input.innerHTML += btnVal;
        }
        
        e.preventDefault();
    } 
}



