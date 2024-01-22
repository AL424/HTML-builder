const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'secret-folder');
fs.readdir(dir, (err, files) => {
  if (err) throw new Error(err.message);

  files.forEach((item) => {
    const file = path.join(dir, item);

    fs.stat(file, (err, stat) => {
      if (err) throw new Error(err.message);

      if (!stat.isFile()) return;

      const { name, ext } = path.parse(file);
      const { size } = stat;

      console.log(`${name} - ${ext.slice(1)} - ${size}b`);
    });
  });
});
