const fs = require('fs');
const path = require('path');

const readableStream = new fs.ReadStream(path.join(__dirname, '/text.txt'), 'utf8');

readableStream.on('data', (data) => console.log(data));
readableStream.on('error', (error) => console.log(`${error}`));