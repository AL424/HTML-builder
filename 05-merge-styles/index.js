const fs = require('fs');
const path = require('path');
const { promises } = fs;

const dirStyles = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

promises
  .readdir(dirStyles)
  .then((files) => files.filter((file) => path.extname(file) === '.css'))
  .then((files) => files.map((file) => path.join(dirStyles, file)))
  .then((files) => files.map((file) => promises.readFile(file, 'utf-8')))
  .then((files) => Promise.all(files))
  .then((files) => files.join('\n'))
  .then((styles) => promises.writeFile(bundle, styles));
