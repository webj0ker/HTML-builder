const readline = require('readline');
const fs = require('fs');

const myConsole = new console.Console(fs.createWriteStream('./02-write-file/text.txt'));

const message = {
  greeting: 'Please enter text',
  success: 'Done',
  exit: 'exit',
  goodbye: '\n Goodbye'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'enter text> '
});

console.log(message.greeting);
rl.prompt();


rl.on('line', (line) => {
  line = line.trim();
  if (line !== message.exit) {
    myConsole.log(line);
    console.log(message.success);
    rl.prompt();
  } else {
    console.log(message.goodbye);
    process.exit(0);
  }
});
rl.on('close', () => {
  rl.close();
  console.log(message.goodbye);
  process.exit(0);
});