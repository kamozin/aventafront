# Aventa front
Структура:
```
app/
  |--scss/
     |--global/
     |--blocks/
     |--vendors/
     |--variables.scss
     |--functions.scss
     |--mixins.scss
     |--styles.scss
  |--fonts/
  |--js/
     |--plugins/
     |--script.js
  |--img/
     |--svg-icons/
     |--svg-symbols/ (для объединения в один файл symbols.svg)
  |--blocks (инклюды)

build/
  |--css/
  |--fonts/
  |--js/
  |--img/
     symbols.svg

other/ (Разные файлы, папка добавлена в .gitignore)
   |--psd
```

## Установка
1. Перейти в родительскую папку проектов
2. Запустить консоль Git Bash
3. Ввести команду `git clone https://github.com/corvus-007/aventafront`,
4. Перейти в каталог проекта `cd aventafront`
5. Установить модули из package.json — `npm install`

## Запуск проекта
`npm start`
## Сборка проекта
`npm run build`
## Удаление папки build
`gulp clean`

Из папки js/plugins/ объединяются js-файлы и помещаются в js/plugins.js
Из папки img/svg-symbols/ объединяются svg-файлы и помещаются в img/symbols.svg
