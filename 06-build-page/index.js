// Привет!, Прошу Вас проверить мою работу в последний день проверки дедлайна... Буду очень вам признателен, 
// пожалуйста оставьте видными контакты, чтоб я мог Вас поблагодарить через 👍gratitude. 

const fs = require('fs/promises');
const path = require('path');
const folderStyles = path.join(__dirname, 'styles');
const folderDist = path.join(__dirname, 'project-dist');
const bundleHtml = path.join(__dirname, 'project-dist/index.html');
const bundleStyle = path.join(__dirname, 'project-dist/style.css');
const folderOut = path.join(__dirname, 'assets');

function createHTML() {
  fs.readdir(path.join(__dirname, 'components')).then(items => {
    fs.readFile(path.join(__dirname, 'template.html'), 'utf-8').then(data => {
      items.forEach(el => {
        fs.readFile(path.join(__dirname, 'components', el), 'utf-8').then(component => {
          data = data.replace(`{{${el.split('.')[0]}}}`, component);
          fs.writeFile(path.join(bundleHtml), data);
        });
      });
    });
  });
}

function createStyles() {
  fs.writeFile(path.join(bundleStyle), '', (err) => { if (err) throw err; });
  fs.readdir(folderStyles, { withFileTypes: true }).then(files => {
    for (let i = 0; i < files.length; i++) {
      files.forEach(el => {
        const pathName = path.join(folderStyles, `${el.name}`);
        if (files[i].isFile() && path.extname(pathName) === '.css') {
          fs.readFile(pathName, 'utf-8').then(data => fs.appendFile(bundleStyle, `${data}\n`));
        }
      });
    }
  });
}

function copyDir(folderOut, place) {
  const nameNewFolder = path.basename(folderOut);
  const newFolder = path.join(place, `${nameNewFolder}`);
  fs.mkdir(newFolder, { recursive: true }).then(() => {
    fs.readdir(folderOut, { withFileTypes: true }).then(items => {
      items.forEach(el => {
        if (!el.isFile()) {
          const newFolderOut = path.join(folderOut, `${el.name}`);
          copyDir(newFolderOut, newFolder);
        } else {
          fs.copyFile(path.join(folderOut, `${el.name}`), path.join(newFolder, `${el.name}`));
        }
      });
    });
  });
}

function build() {
  fs.mkdir(folderDist, { recursive: true }).then(() => {
    createHTML();
    createStyles();
    copyDir(folderOut, folderDist);
  });
}

build();