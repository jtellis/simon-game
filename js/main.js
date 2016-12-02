window.onload = function() {
  'use strict';

  const baseInterval = 1000;
  let startInterval;
  let activeInterval;

  let difficulty;

  let currentMove = 0;

  //The sequences elements have a value of 1-4 representing pieces
  let simonSequence = [];

  let $pieces = $('.piece');

  let $startButton = $('#start').prop('disabled', true);

  let $difficultyButtons = $('.difficulty');

  let $sideInfo = $('.side-info');

  let $buzzer = $('.sound.buzzer').get(0); //get DOM element

  let playPieceSound = function(piece) {
    $(`.sound.beep.${piece}`).get(0).play();
  };

  let displayGameOver = function() {
    $sideInfo.children('.headline').text("Game Over!");
    $sideInfo.children('.message').empty().append($('<p>Choose a difficulty, and try again!</p>'));
  };

  let clearSideInfo = function() {
    $sideInfo.children('.headline').text('Focus!');
    $sideInfo.children('.message').empty();
  };

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
    if (sequence.length !== 0) {
      let currentPiece = sequence.shift();
      let $currentPiece = $(`#${currentPiece}`);
      $currentPiece.addClass('active');
      playPieceSound(currentPiece);
      sleep(activeInterval).then(() => {
        $currentPiece.removeClass('active');
        sleep(100).then(() => {
          displaySimonSequence(sequence);
        });
      });
    } else {
      $pieces.on('click', pieceClickHandler); //enable click after Simon sequence
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
    if (currentMove > 2) {
      activeInterval = startInterval / Math.log(currentMove);
    } else {
      activeInterval = startInterval;
    }
    incrementSimonSequence();
    $pieces.off('click'); //disable click during Simon sequence
    displaySimonSequence(simonSequence);
    currentMove = 0;
  };

  let startGame = function() {
    clearSideInfo();
    switch (difficulty) {
      case 'easy':
        startInterval = baseInterval;
        break;
      case 'medium':
        startInterval = baseInterval * 0.75;
        break;
      case 'hard':
        startInterval = baseInterval / 2;
        break;
    }
    $startButton.prop('disabled', true);
    resetSimonSequence();
    updateGame();
  };

  $startButton.on('click', startGame); //begins game

  $difficultyButtons.on('click', function(event) {
    difficulty = this.value;
    $difficultyButtons.prop('disabled', true);
    $startButton.prop('disabled', false);
  });

  let pieceClickHandler = function() {
    let $this = $(this);
    let thisPiece = parseInt($this.attr('id'));
    playPieceSound(thisPiece);
    $this.addClass('active');
    sleep(250).then(() => {
      $this.removeClass('active');
    });
    if (currentMove < simonSequence.length) {
      if (correctMove(thisPiece)) {
        currentMove += 1;
        if (currentMove === simonSequence.length) {
          sleep(1000).then(() => {
            updateGame();
          });
        }
      } else {
        sleep(150).then(() => { //let piece beep before buzzer
          $buzzer.play();
          $pieces.off('click');
          $difficultyButtons.prop('disabled', false);
          displayGameOver();
        });
      }
    } else {
      updateGame();
    }
  };

};
