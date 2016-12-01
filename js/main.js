window.onload = function() {
  'use strict';

  const baseInterval = 1000;
  let startInterval;
  let activeInterval;

  let difficulty;

  let currentMove = 0;

  //The sequences elements have a value of 1-4 representing pieces
  let simonSequence = [];

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
      sleep(activeInterval).then(() => {
        $currentPiece.removeClass('active');
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
    console.log(currentMove, startInterval, activeInterval);
    if (currentMove > 2) {
      activeInterval = startInterval / Math.log(currentMove);
    } else {
      activeInterval = startInterval;
    }
    incrementSimonSequence();
    displaySimonSequence(simonSequence);
    currentMove = 0;
  };

  $('.piece').on('click', function(event) {
    let $this = $(this);
    $this.addClass('active');
    sleep(250).then(() => {
      $this.removeClass('active');
    });
    if (currentMove < simonSequence.length) {
      console.log($this, $this.attr('id'));
      let thisPiece = parseInt($this.attr('id'));
      if (correctMove(thisPiece)) {
        console.log('Correct move');
        currentMove += 1;
        if (currentMove === simonSequence.length) {
          sleep(1000).then(() => {
            updateGame();
          });
        }
      } else {
        console.log('Game over');
      }
    } else {
      updateGame();
    }
  });

  let startGame = function() {
    switch(difficulty) {
      case 'easy':
        startInterval = baseInterval;
        break;
      case 'medium':
        startInterval = baseInterval * 0.75;
        break;
      case 'medium':
        startInterval = baseInterval / 2;
        break;
    }
    $startButton.prop('disabled', true);
    resetSimonSequence();
    updateGame();
  };

  let $startButton = $('#start').prop('disabled', true);

  let $difficultyButtons = $('.difficulty');
  $difficultyButtons.on('click', function(event) {
    difficulty = this.value;
    $difficultyButtons.prop('disabled', true);
    $startButton.prop('disabled', false);
  });

  //Begin game
  $startButton.on('click', startGame);

};
