/*jshint node: true */
/*jshint jasmine: true */
'use strict';
const rewire = require('rewire');
const validate = require('html-angular-validate');
const gen_modal = rewire('../lib/gen_modal');
const utils = require('./utils');
const fs = require('fs');

describe('Gen Modal', () => {
  const folderName = 'test_files';
  const componentName = 'myComponent';
  const fsStub = {
    mkdir: (path, callback) => {
      callback(null, []);
    },
    writeFile: (path, data, callback) => { 
      callback(null, []);
    }
  };
  
  beforeEach(() => {
    spyOn(fsStub, 'writeFile');
    gen_modal.__set__('fs', fsStub);
  });

  it('makes a folder', () => {
    spyOn(fsStub, 'mkdir');
    gen_modal.makeFolder(folderName);
    expect(fsStub.mkdir).toHaveBeenCalledWith(folderName);
  });

  it('makes a css file', () => {
    gen_modal.makeCss(componentName, folderName);
    expect(fsStub.writeFile)
      .toHaveBeenCalledWith(`./${folderName}/${componentName}.component.scss`, '');
  });

  it('makes a html file', () => {
    gen_modal.makeHtml(componentName, folderName);
    expect(fsStub.writeFile)
      .toHaveBeenCalledWith(`./${folderName}/${componentName}.component.html`, gen_modal.html(componentName));
  });

  it('makes a typescript file', () => {
    gen_modal.makeTS(componentName, folderName);
    expect(fsStub.writeFile)
      .toHaveBeenCalledWith(`./${folderName}/${componentName}.component.ts`, gen_modal.tsCode(componentName));
  });

  it('makes a spec file', () => {
    gen_modal.makeSpec(componentName, folderName);
    expect(fsStub.writeFile)
      .toHaveBeenCalledWith(`./${folderName}/${componentName}.component.spec.ts`, '');
  });

  describe('HTML generator', () => {
    let htmlFile;

    beforeEach(() => {
      htmlFile = utils.createTempFile('html');
    });

    afterEach(() => {
      fs.unlinkSync(htmlFile);
    });

    it('creates valid HTML', (done) => {
      let html = gen_modal.html(componentName);
      fs.writeFileSync(htmlFile, html);
      validate.validate([htmlFile], {
        relaxerror: [
          'Start tag seen without seeing a doctype first. Expected e.g. “<!DOCTYPE html>”.',
          'Element “head” is missing a required instance of child element “title”.'
        ]
      }).then((r) => {
          expect(r.filessucceeded).toBe(1);
          done();
        });
    });
  });
});