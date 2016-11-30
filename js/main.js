window.onload = function() {
  'use strict';

  let activeInterval = 1000;

  /*
  The sequences elements have a value of 1-4 representing pieces
  */
  //Game generated
  let simonSequence = [];
  //User generated
  let userSequence = [];

  let pieceElements = {
    1: document.getElementById('1'),
    2: document.getElementById('2'),
    3: document.getElementById('3'),
    4: document.getElementById('4'),
  };

  let pieces = document.getElementsByClassName('piece');

  let randomPiece = function() {
    return Math.floor((Math.random() * 4) + 1); //Generate rand num 1-4
  };

  let incrementSimonSequence = function() {
    simonSequence.push(randomPiece());
  };

  let resetSimonSequence = function() {
    simonSequence = [];
  };

  let sleep = function(interval) {
    return new Promise((resolve) => setTimeout(resolve, interval));
  };

  let displaySimonSequence = function(simonSequence) {
    if(simonSequence.length !== 0) {
      let currentPiece = simonSequence.pop(); //removes element/shortens array
      pieceElements[currentPiece].classList.add('active');
      sleep(activeInterval).then(() => {
        pieceElements[currentPiece].classList.remove('active');
        displaySimonSequence(simonSequence);
      });
    }
  };

  let correctUserSequence = function() {
    let currentMove = userSequence.length - 1;
    if (userSequence[currentMove] === simonSequence[currentMove]) {
      return true;
    } else {
      return false;
    }
  };

  let updateGame = function() {
    incrementSimonSequence();
    displaySimonSequence();
  };

  let pieceClickHandler = function(event) {
    let thisPiece = this.id;
    userSequence.push(thisPiece);
    if (correctUserSequence) {
      updateGame();
    }
  };

  for (let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener('click', pieceClickHandler, false);
  }

  //Begin game
  incrementSimonSequence();
  displaySimonSequence(simonSequence);

};
