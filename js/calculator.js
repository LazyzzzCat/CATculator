const field = document.getElementById("field");
field.focus();
field.addEventListener("blur", () => field.focus());
///////////////////////////////////////////////
const allowedChars = /^[0-9+\-*/()×]*$/;
field.addEventListener("input", () => {
field.value = field.value.replace(/\*/g, "×");
if (!allowedChars.test(field.value)) {
    field.value = field.value.replace(/[^0-9+\-×/()]/g, "");
}
});
//////////////////////////////////////////////
const buttons = document.querySelectorAll(".button");
let openBrackets = 0; // Количество открытых скобок
// Обработчики для кнопок
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        if (value === "ac") {
            // Очистка поля
            field.value = "";
            openBrackets = 0; // Сбрасываем счётчик скобок
        } else if (value === "c") {
            // Удаление последнего символа
            const lastChar = field.value.slice(-1);
            if (lastChar === "(") openBrackets--; // Удаляем открывающую скобку
            if (lastChar === ")") openBrackets++; // Удаляем закрывающую скобку
            field.value = field.value.slice(0, -1);
        } else if (value === "=") {
            try {
                // Заменяем × на * и вычисляем выражение
                field.value = eval(field.value.replace(/×/g, "*"));
                if(field.value ==="Infinity"){
                    field.value = "FUCK YOU!"
                }
                else if(field.value ==="-Infinity"){
                    field.value = "FUCK YOU!"
                }
                else if(field.value ==="undefined"){
                    field.value = "WHERE?!"
                }
                else if(field.value ==="NaN"){
                    field.value = "?!"
                }
            } catch {
                field.value = "mew, error!";
            }
            openBrackets = 0; // Сбрасываем счётчик скобок после вычислений
        } else if (value === "( )") {
            // Логика для одной кнопки со скобками
            const lastChar = field.value.slice(-1);

            if (
                !lastChar || // Если строка пустая
                ["+", "-", "×", "/", "("].includes(lastChar) // Если перед этим был оператор или (
            ) {
                field.value += "("; // Добавляем открывающую скобку
                openBrackets++;
            } else if (openBrackets > 0) {
                field.value += ")"; // Добавляем закрывающую скобку
                openBrackets--;
            }
        } else {
            // Добавляем любой другой текст (цифры или операторы)
            field.value += value;
        }
    });
});
////////////////////////////////////////////////////////////////
const catButton = document.getElementById("cat");
const body = document.body;
const catImage = document.getElementById("cat-img");  // Ссылаемся на саму картинку
// Изначально у нас будет светлая тема по умолчанию
let currentTheme = "light";

catButton.addEventListener("click", () => {
    // Убираем все возможные классы для тем
    body.classList.remove("dark", "sea", "forest", "light");

    if (currentTheme === "light") {
        body.classList.add("sea");  // Переключаем на тему "sea"
        currentTheme = "sea";
        catImage.src = "images/blue.png";  // Меняем картинку
    } else if (currentTheme === "sea") {
        body.classList.add("forest"); // Переключаем на тему "forest"
        currentTheme = "forest";
        catImage.src = "images/gray.png"; // Меняем картинку
    } else if (currentTheme === "forest") {
        body.classList.add("dark"); // Переключаем на тему "dark"
        currentTheme = "dark";
        catImage.src = "images/ncat.png"; // Меняем картинку
    } else if (currentTheme === "dark") {
        body.classList.add("light"); // Вернуться к светлой теме
        currentTheme = "light";
        catImage.src = "images/white.png"; // Меняем картинку
    }
});
//////////////////////////////////////////////////////////////////////
if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.getElementById('field').setAttribute('readonly', true);
  }
/////////////////////////////////////////////////////////////////////


//   Вспоминают старые математики:
// - Когда-то я знал первые 100 знаков числа Пи.
// - А я - последние.
