const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist/');

fs.mkdir(projectDist, { recursive: true }, (error) => {
  if (error) throw error;
});



// let writeableStream = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');



let template = fs.createReadStream(path.join(__dirname, '/template.html'), 'utf8');
template.on('error', (error) => console.log(`${error}`));

// Читаем файлы находящиеся в папке components
const components = path.join(__dirname, 'components/');

fs.readdir(components, { withFileTypes: true }, (error, files) => {

  if (error) throw error;

  files.forEach(file => {
    let extname = path.extname(file.name);
    let name = path.basename(file.name, extname);

    if (file.isFile() && extname === '.html') {
      let component = fs.createReadStream(path.join(__dirname, `/components/${file.name}`), 'utf8');
      // let component = fs.readFile(path.join(__dirname, `/components/${file.name}`), 'utf8', (error, content) => {});
      component.on('data', (codeHtml) => {



        template.on('data', (data) => {


          if (data.includes(`{{${name}}}`)) {

            let reg = `/{{${name}}}/g`;
            // console.log(reg);
            // let det = toString(data).replace(reg, `${codeHtml}`);
            data.replace(reg, codeHtml);
            // console.log(det);

            // data = data.replace(reg, `${codeHtml}`);
          }
          // console.log(data.includes('{{header}}'));
          // data.replace('{{header}}', '<header> </header>');
        });
        // let writeableStream = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');

        // console.log(data.includes('{{header}}'));
        // data.replace('{{header}}', '<header> </header>');
      });

      // readableStream.pipe(writeableStream);
    }
  });
});

// Привет!, Прошу Вас проверить мою работу в последний день проверки дедлайна... Буду очень вам признателен, 
// пожалуйста оставьте видными контакты, чтоб я мог Вас поблагодарить через 👍gratitude. 