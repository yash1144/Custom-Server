const http = require('http');
const fs = require('fs');

function serveFile(res, fileName, contentType, statusCode = 200) {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    const url = req.url;

    switch (url) {
        case '/':
        case '/home':
            serveFile(res, './index.html', 'text/html');
            break;

        case '/about':
            serveFile(res, './about.html', 'text/html');
            break;

        case '/contact':
            serveFile(res, './contact.html', 'text/html');
            break;

        case '/styles.css':
            serveFile(res, './styles.css', 'text/css');
            break;

        default:
            serveFile(res, './pnf.html', 'text/html', 404);
            break;
    }
});

const PORT = 8001;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
