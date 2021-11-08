const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, 'styles/');

let writeableStream = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');

fs.readdir(folder, { withFileTypes: true }, (error, files) => {

  if (error) throw error;

  files.forEach(file => {
    let extname = path.extname(file.name);

    if (file.isFile() && extname === '.css') {
      let readableStream = fs.createReadStream(`./05-merge-styles/styles/${file.name}`, 'utf8');
      readableStream.pipe(writeableStream);
    }
  });
});