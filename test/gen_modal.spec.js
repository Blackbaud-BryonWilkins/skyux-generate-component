/*jshint node: true */
/*jshint jasmine: true */
'use strict';
const rewire = require('rewire');
const gen_modal = rewire('../lib/gen_modal');

describe('Gen Modal', () => {
  const folderName = 'test_files';
  const fsStub = {
    mkdir: (path, callback) => {
      callback(null, []);
    },
    writeFile: (path, data, callback) => { 
      callback(null, []);
    }
  };
  beforeEach(() => {
    gen_modal.__set__('fs', fsStub);
  });

  it('makes a folder', () => {
    spyOn(fsStub, 'mkdir');
    gen_modal.makeFolder(folderName);
    expect(fsStub.mkdir).toHaveBeenCalledWith(folderName);
  });

  describe('with a test folder created', () => {
    let componentName = 'myComponent';

    it('makes css', () => {
      spyOn(fsStub, 'writeFile');
      gen_modal.makeCss(componentName, folderName);
      expect(fsStub.writeFile)
        .toHaveBeenCalledWith(`./${folderName}/${componentName}.component.scss`, '');
    });

    it('makes html', () => {
      spyOn(fsStub, 'writeFile');
      gen_modal.makeHtml(componentName, folderName);
      expect(fsStub.writeFile)
        .toHaveBeenCalledWith(`./${folderName}/${componentName}.component.html`, gen_modal.html(componentName));
    });
  });
});