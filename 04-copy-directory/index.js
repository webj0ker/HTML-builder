const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'files/');
let copyFolder = path.join(__dirname, 'files-copy/');

fs.rm(copyFolder, { recursive: true }, (err) => {
  // if (err) {
  //   console.error(err.message);
  //   return;
  // }

  fs.mkdir(copyFolder, { recursive: true, force: true }, (error) => {
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

});