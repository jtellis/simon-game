window.onload = function() {
  'use strict';

  let activeInterval = 1000;

  let currentMove = 0;

  //The sequences elements have a value of 1-4 representing pieces
  let simonSequence = [];

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

  let displaySimonSequence = function(sequence) {
    sequence = sequence.slice(0);
    if(sequence.length !== 0) {
      let currentPiece = sequence.shift();
      pieceElements[currentPiece].classList.add('active');
      sleep(activeInterval).then(() => {
        pieceElements[currentPiece].classList.remove('active');
        sleep(100).then(() => {
          displaySimonSequence(sequence);
        });
      });
    }
  };

  let correctMove = function(piece) {
    if (piece === simonSequence[currentMove]) {
      return true;
    } else {
      return false;
    }
  };

  let updateGame = function() {
    incrementSimonSequence();
    displaySimonSequence(simonSequence);
    currentMove = 0;
  };

  let pieceClickHandler = function(event) {
    if (currentMove < simonSequence.length) {
      let thisPiece = parseInt(this.id);
      if (correctMove(thisPiece)) {
        console.log('Correct move');
        currentMove += 1;
        if(currentMove === simonSequence.length) {
          updateGame();
        }
      } else {
        console.log('Game over');
        //TODO restart game
      }
    } else {
      updateGame();
    }
  };

  let startGame = function() {
    resetSimonSequence();
    updateGame();
  };

  for (let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener('click', pieceClickHandler, false);
  }

  //Begin game
  startGame();

};
