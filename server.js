const http = require('http');
const fs = require('fs');
const { getData, saveData } = require('./Filehandler');

const port = 3000;
const host = 'localhost';


if (!fs.existsSync('./data.json')) {
  const defaultData = { movies: [], songs: [], series: [] };
  fs.writeFileSync('./data.json', JSON.stringify(defaultData, null, 2));
}

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Something went wrong, G.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
    return;
  }

  const routes = ['movies', 'songs', 'series'];
  const [_, type] = req.url.split('/');

  if (routes.includes(type)) {
    if (req.method === 'GET') {
      const data = getData();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data[type]));
    }

    else if (req.method === 'POST' || req.method === 'PUT') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const newItem = JSON.parse(body);
        const data = getData();
        const existingIndex = data[type].findIndex(item => item.title === newItem.title);

        if (existingIndex !== -1 && req.method === 'PUT') {
          data[type][existingIndex] = newItem;
        } else if (req.method === 'POST') {
          data[type].push(newItem);
        }

        saveData(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data[type]));
      });
    }

    else if (req.method === 'DELETE') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const { title } = JSON.parse(body);
        const data = getData();
        data[type] = data[type].filter(item => item.title !== title);
        saveData(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data[type]));
      });
    }

    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end("404 - Not Found, fam");
});

server.listen(port, host, () => {
  console.log(`Server vibing at http://${host}:${port}`);
});
