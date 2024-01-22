const fs = require('fs');
const { promises } = fs;
const path = require('path');

const bundleStyles = require('../05-merge-styles');
const copyDir = require('../04-copy-directory');

const createHTML = (template, componentsDir, bundle) => {
  let result = '';
  promises
    .readFile(template, 'utf-8')
    .then((template) => (result = template))
    .then(() => promises.readdir(componentsDir))
    .then((components) =>
      components.map((component) => path.join(componentsDir, component)),
    )
    .then(async (components) => {
      for (let component of components) {
        const data = await promises.readFile(component, 'utf-8');
        const { name } = path.parse(component);
        result = result.replaceAll(
          `{{${name}}}`,
          `\n<!-- ${name} -->\n${data}`,
        );
      }
      return result;
    })
    .then((data) => promises.writeFile(bundle, data));
};

const bundleProject = () => {
  const projectDist = path.join(__dirname, 'project-dist');

  promises.rm(projectDist, { recursive: true, force: true }).then(() => {
    promises.mkdir(projectDist, { recursive: true }).then(() => {
      copyDir(path.join(__dirname, 'assets'), path.join(projectDist, 'assets'));
      bundleStyles(
        path.join(__dirname, 'styles'),
        path.join(projectDist, 'style.css'),
      );
      createHTML(
        path.join(__dirname, 'template.html'),
        path.join(__dirname, 'components'),
        path.join(projectDist, 'index.html'),
      );
    });
  });
};

bundleProject();
