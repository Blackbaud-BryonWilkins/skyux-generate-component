/*jshint node: true */
'use strict';

let fs = require('fs');

var name = '';
var folder = `${name}-modal`;
//folder
const makeFolder = (folder) => {
  fs.mkdir(folder);
};

//css
const cssFileName = (componentName) => {
  return `${componentName}.component.scss`;
};

const makeCss = (componentName, folderName) => {
  fs.writeFile(`./${folderName}/${cssFileName(componentName)}`, '');
};

//html
const html = (componentName) => {
  return [
    '<sky-modal>',
    `  <sky-modal-header>${componentName}!</sky-modal-header>`,
    '  <sky-modal-content></sky-modal-content>',
    '</sky-modal>',
  ].join('\n');
};

const htmlFileName = (folderName) => {
  return `${folderName}.component.html`;
};

const makeHtml = (componentName, folderName) => {
  fs.writeFile(`./${folderName}/${htmlFileName(componentName)}`, html(componentName));
};
//ts
let className = name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
let tsFileName = `${folder}/${folder}.component.ts`;
let code = [
"import { Component } from '@angular/core';",
"import { SkyModalInstance } from '@blackbaud/skyux/dist/core';",
"",
"@Component({",
`  selector: '${folder}',`,
`  templateUrl: '${htmlFileName}',`,
`  styleUrls: ['${cssFileName()}']`,
"});",
"",
`export class ${className}ModalComponent {`,
"",
"  constructor(public instance: SkyModalInstance) { };",
"",
"};",
""
].join('\n');
const makeTS = () => {
  fs.writeFile('./'+tsFileName, code);
};
//spec
let specFileName = `./${folder}/${folder}.component.spec.ts`;
const makeSpec = () => {
  fs.writeFile('./'+specFileName, '');
};

//Add to app-extras.module.ts

module.exports = {
  html,
  makeFolder,
  makeCss,
  makeHtml,
  makeTS,
  makeSpec
};