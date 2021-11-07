const path = require('path');
const fs = require('fs');

const dirpath = path.join(__dirname, './secret-folder');

fs.readdir(dirpath, { withFileTypes: true }, (error, files) => {

  if (error) throw error;

  files.forEach(file => {
    if (file.isFile()) {
      let extname = path.extname(file.name);
      let name = path.basename(file.name, extname);

      fs.stat(path.join(dirpath, file.name), (error, stats) => {

        if (error) throw error;

        console.log(`${name} - ${extname} - ${(stats.size / 1024).toFixed(3)} kb`);
      });

    }
  });
});