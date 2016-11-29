window.onload = function() {
  'use strict';

  let sequence = []; //elements have a value of 1-4 representing pieces

  let randomPiece = function() {
    Math.floor((Math.random() * 4) + 1);
  };

  let incrementSequence = function() {
    sequence.push(randomPiece());
  };

  let resetSequence = function() {
    squence = [];
  };

};
