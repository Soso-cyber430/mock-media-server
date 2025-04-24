const fs = require('fs');
const path = './data.json';

function getData() {
  const rawData = fs.readFileSync(path, 'utf8');
  return JSON.parse(rawData);
}

function saveData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = { getData, saveData };
