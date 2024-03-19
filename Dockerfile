# Используем образ с Node.js
FROM node:latest

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем зависимости и файл package.json для установки
COPY package.json ./
COPY package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения в контейнер
COPY . .

# Собираем приложение React
RUN npm run build

# Команда, которая будет выполнена при запуске контейнера
CMD ["npm", "start"]
