window.onload = function() {
  'use strict';

  /*
  The sequences elements have a value of 1-4 representing pieces
  */
  //Game generated
  let simonSequence = [];
  //User generated
  let userSequence = [];

  let randomPiece = function() {
    Math.floor((Math.random() * 4) + 1); //Generate rand num 1-4
  };

  let incrementSimonSequence = function() {
    sequence.push(randomPiece());
  };

  let resetSimonSequence = function() {
    squence = [];
  };

  let displaySimonSequence = function() {
  };

  let correctUserSequence = function() {
    let currentMove = userSequence.length - 1;
    if(userSequence[currentMove] === simonSequence[currentMove]) {
      return true;
    } else {
      return false;
    }
  };

  let pieceClickHandler = function(event) {
    let thisPiece = this.dataset.piece;
    userSequence.push(thisPiece);
    if(correctUserSequence) {
      incrementSimonSequence();
      displaySimonSequence();
    }
  };

  let pieces = document.getElementsByClassName('piece');

  for(let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener('click', pieceClickHandler, false);
  }

};
