const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist/');

fs.mkdir(projectDist, { recursive: true }, (error) => {
  if (error) throw error;
});

let readableStream = fs.createReadStream(path.join(__dirname, '/template.html'), 'utf8');

readableStream.on('error', (error) => console.log(`${error}`));

readableStream.on('data', (data) => {

  console.log(data.includes('{{header}}'));
  // data.replace('{{header}}', '<header> </header>');
});

// Привет!, Прошу Вас проверить мою работу в последний день проверки дедлайна... Буду очень вам признателен, 
// пожалуйста оставьте видными контакты, чтоб я мог Вас поблагодарить через 👍gratitude. 