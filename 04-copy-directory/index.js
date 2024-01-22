const fs = require('fs');
const path = require('path');

const { promises } = fs;

const copyDir = (dir, copy) => {
  promises
    .mkdir(copy, { recursive: true })
    .then(() => promises.readdir(dir))
    .then((files) => {
      files.forEach((fileName) => {
        const file = path.join(dir, fileName);
        const fileCopy = path.join(copy, fileName);

        promises.stat(file).then((stat) => {
          if (stat.isDirectory()) copyDir(file, fileCopy);
          else promises.copyFile(file, fileCopy);
        });
      });
    });
};

promises
  .rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true })
  .then(() =>
    copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy')),
  );
