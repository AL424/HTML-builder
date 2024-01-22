const fs = require('fs');
const path = require('path');
const { promises } = fs;

const dirStyles = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

const bundleStyles = (dir, bundle) =>
  promises
    .readdir(dir)
    .then((files) => files.filter((file) => path.extname(file) === '.css'))
    .then((files) => files.map((file) => path.join(dir, file)))
    .then((files) => files.map((file) => promises.readFile(file, 'utf-8')))
    .then((files) => Promise.all(files))
    .then((files) => files.join('\n'))
    .then((styles) => promises.writeFile(bundle, styles));

bundleStyles(dirStyles, bundle);

module.exports = bundleStyles;
