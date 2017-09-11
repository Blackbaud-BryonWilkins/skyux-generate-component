/*jshint node: true */
'use strict';
const gen_modal = require('../lib/gen_modal');
const prompt = require('promptly');

prompt.prompt("What is the modal's name? (do not include the word `modal`) ")
  .then((result) => {
    gen_modal.genFiles(result);
  });