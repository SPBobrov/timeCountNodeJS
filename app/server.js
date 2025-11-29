const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');



// Создаем HTTP сервер
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    // Обслуживаем статические файлы из папки public
    if (req.url === '/' || req.url === '/index.html') {
        serveStaticFile(res, '/index.html', 'text/html');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

// Функция для обслуживания статических файлов
function serveStaticFile(res, filePath, contentType) {
    const fullPath = path.join(__dirname, 'public', filePath);
    
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    
});