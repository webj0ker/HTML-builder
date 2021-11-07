const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'files/');
const copyFolder = path.join(__dirname, 'files-copy/');

fs.mkdir(copyFolder, { recursive: true }, (error) => {
  if (error) throw error;
});

fs.readdir(folder, { withFileTypes: true }, (error, files) => {

  if (error) throw error;

  files.forEach(file => {
    if (file.isFile()) {
      fs.createReadStream(`${folder}${file.name}`).pipe(fs.createWriteStream(`${copyFolder}${file.name}`));
    }
  });
});