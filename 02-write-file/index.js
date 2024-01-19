const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = process;

const file = path.join(__dirname, 'text.txt');

const stream = fs.createWriteStream(file);

stdout.write('Введите текст для записи или exit для выхода\n');
stdin.on('data', (data) => {
  const text = data.toString();
  if (text.trim().toLowerCase() === 'exit') exit();
  stream.write(data);
});
process.on('exit', () => stdout.write('До свидания'));
process.on('SIGINT', () => exit());
