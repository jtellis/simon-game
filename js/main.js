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

  let pieceClickHandler = function(event) {
    console.log(this.dataset.piece);
  };

  let pieces = document.getElementsByClassName('piece');

  for(let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener('click', pieceClickHandler, false);
  }

};
