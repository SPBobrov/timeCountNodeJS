const http = require('http');
const fs = require('fs');
const path = require('path');

// Создаем HTTP сервер
const server = http.createServer((req, res) => {
    // Используем современный URL API вместо устаревшего url.parse()
    const baseURL = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseURL);
    
    // Обслуживаем статические файлы из папки public
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index.html') {
        serveStaticFile(res, '/index.html', 'text/html');
    } else if (parsedUrl.pathname === '/style.css') {
        serveStaticFile(res, '/style.css', 'text/css');
    } else if (parsedUrl.pathname === '/favicon.png') {
        serveStaticFile(res, '/favicon.png', 'image/png');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

// Функция для обслуживания статических файлов (без изменений)
function serveStaticFile(res, filePath, contentType) {
    const fullPath = path.join(__dirname, 'public', filePath);
    
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            console.error('File not found:', fullPath);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Запуск сервера с обработкой ошибок
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy. Trying port ${PORT + 1}...`);
        server.listen(PORT + 1);
    } else {
        console.error('Server error:', err);
    }
});