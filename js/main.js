window.onload = function() {
  'use strict';

  const oneSecond = 1000; //in milliseconds
  const baseInterval = oneSecond / 2;
  const quarterSecond = oneSecond / 4;
  const decisecond = oneSecond / 10;
  let startInterval;
  let activeInterval;
  let difficulty;
  let bestScore = 0;
  let currentMove = 0;
  //The sequences elements have a value of 1-4 representing pieces
  let simonSequence = [];

  //jQuery objects and DOM elements
  let $pieces = $('.piece');
  let $startButton = $('#start').prop('disabled', true);
  let $difficultyButtons = $('.difficulty');
  let $sideInfo = $('.side-info');
  let $buzzer = $('.sound.buzzer').get(0); //get DOM element
  let $centerScore = $('.center .score');

  //Helper functions and event handler callback functions
  let playPieceSound = function(piece) {
    $(`.sound.beep.${piece}`).get(0).play();
  };

  let displayGameOver = function() {
    $sideInfo.children('.headline').text("Game Over!");
    let $message = $(`<p>Choose a difficulty, and try again!<br>Your best score is <span class="score">${bestScore}</span>.</p>`);
    $sideInfo.children('.message').empty().append($message);
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

  //https://davidwalsh.name/javascript-sleep-function
  let sleep = function(interval) {
    return new Promise((resolve) => setTimeout(resolve, interval));
  };

  //Note: this functions is called recursively
  let displaySimonSequence = function(sequence) {
    sequence = sequence.slice(0);
    if (sequence.length !== 0) {
      let currentPiece = sequence.shift();
      let $currentPiece = $(`#${currentPiece}`);
      $currentPiece.addClass('active');
      playPieceSound(currentPiece);
      sleep(activeInterval).then(() => {
        $currentPiece.removeClass('active');
        sleep(decisecond).then(() => {
          displaySimonSequence(sequence); //recursive call
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
    if(currentMove > bestScore) {
      bestScore = currentMove;
    }
    if(currentMove < 9) {
      $centerScore.text(`0${currentMove}`);
    } else {
      $centerScore.text(currentMove);
    }
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

  //This is callback function really drives the game
  //this is where all the "magic" happens
  let pieceClickHandler = function() {
    let $this = $(this);
    let thisPiece = parseInt($this.attr('id'));
    playPieceSound(thisPiece);
    $this.addClass('active');
    sleep(quarterSecond).then(() => {
      $this.removeClass('active');
    });
    if (currentMove < simonSequence.length) {
      if (correctMove(thisPiece)) {
        currentMove += 1;
        if (currentMove === simonSequence.length) {
          sleep(oneSecond).then(() => {
            updateGame();
          });
        }
      } else {
        sleep(decisecond).then(() => { //let piece beep before buzzer
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

  //attach event handlers
  $difficultyButtons.on('click', function(event) {
    difficulty = this.value;
    $difficultyButtons.prop('disabled', true);
    $startButton.prop('disabled', false);
  });

  $startButton.on('click', startGame); //begins game

};
