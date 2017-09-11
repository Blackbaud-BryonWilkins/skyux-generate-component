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
/*
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { expect, SkyAppTestModule } from '@blackbaud/skyux-builder/runtime/testing/browser';
import {
  SkyModalInstance,
  SkyModalHostService,
  SkyModalConfiguration
} from '@blackbaud/skyux/dist/core';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { MockModalInstance } from '../shared/testing/mocks/modal-instance.mock';
import { MockModalHostService } from '../shared/testing/mocks/modal-host.service.mock';
import { MockModalConfiguration } from '../shared/testing/mocks/modal-configuration.mock';

describe('Confirmation Modal', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let de: DebugElement;
  let modalInstance: MockModalInstance;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule],
      providers: [
      {
        provide: SkyModalHostService,
        useValue: new MockModalHostService()
      },
      {
        provide: SkyModalConfiguration,
        useValue: new MockModalConfiguration()
      },
      {
        provide: SkyModalInstance,
        useValue: modalInstance
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  fit('renders the title', () => {
    expect(de.query(By.css('sky-modal-header')).nativeElement)
    .toHaveText('Connect your Azure AD Single sign-on');
  });
});
*/
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