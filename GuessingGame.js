function generateWinningNumber(){
  var rando = Math.floor(Math.random()*100+1);
  return rando;
}

function shuffle(arr){
  //takes and arr and returns an array
  var m = arr.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
  this.guessCount = 0;
}

Game.prototype.difference = function(){
  return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function(){
  if (this.playersGuess < this.winningNumber){
    return true;
  }
  else {
    return false;
  }
};

Game.prototype.playersGuessSubmission = function(num){
  this.playersGuess = num;
  if (num < 1 || num > 100 || typeof num !== 'number'){
    throw "That is an invalid guess.";
  }
  else {
    return this.checkGuess();
  }
};

Game.prototype.checkGuess = function(){
  if (this.pastGuesses.indexOf(this.playersGuess) === -1){
    this.pastGuesses.push(this.playersGuess);
    this.guessCount++;
    $('#guess'+this.guessCount).text(this.playersGuess);
  }
  if (this.playersGuess === this.winningNumber){
    $('#main-header').text("You Win!");
    $('#subheading').text("Woohooooo :D");
    addDisable();
    return "You Win!";
  }
  else if (this.pastGuesses.indexOf(this.playersGuess) !== -1 ) {
    $('#main-header').text("You have already guessed that number. Try again!");
    return "You have already guessed that number.";
  }
  
  if (this.pastGuesses.length === 5){
    $('#main-header').text("You lose :(");
    $('#subheading').text("Hit the reset button to start a new game.")
    addDisable();
    return "You Lose.";
  }
  if (this.difference() < 10){
    $('#subheading').text("You're burning up!");
    return "You're burning up!";
  }
  if (this.difference() >= 10 && this.difference() < 25){
    $('#subheading').text("You're lukewarm.");
    return "You're lukewarm.";
  }
  if (this.difference() < 50 && this.difference() >= 25){
    $('#subheading').text("You're a bit chilly.");
    return "You're a bit chilly.";
  }
  if (this.difference() >= 50 && this.difference() < 100){
    $('#subheading').text("You're ice cold!");
    return "You're ice cold!";
  }
};

var newGame = function(){
  var createdGame = new Game();
  return createdGame;
}

Game.prototype.provideHint = function(){
  //creates an array with 3 items;
  var arr = [this.winningNumber,generateWinningNumber(),generateWinningNumber()];
  //one of the items must be the winning number
  //calls generate winning number twice for the other two numbers
  return shuffle(arr).join(", ");
};

$(document).ready(function(){
  var newGame = new Game();
//create function that does the following
//gets the player input
//clear input element
//passing the value to the playersGuessSubmission
//console logging the output
//bonus to add enter keypress event to handle this function
function getPlayerInput(){
  var current = +$('#player-input').val();
  newGame.playersGuessSubmission(current);
  $('#player-input').val("");
}

$('#submit').on('click', function(){
  console.log("The submit button has been pressed!");
  getPlayerInput();
});

$('#player-input').on('keypress', function(event){
  if (event.which === 13){
    event.preventDefault();
    getPlayerInput();
  }
});

$('#hintButton').on('click', function(){
  $('#main-header').text("Hint...it's one of these numbers: " + newGame.provideHint());
});

$('#resetButton').on('click', function(){
  newGame = new Game();
  removeDisable();
  $('#main-header').text("Play the Guessing Game!");
  $('#subheading').text('Enter a number between 1 and 100 to start playing:');
  $('.guess').text('-');
});

});

function addDisable(val){
  $('#submit').attr('disabled', 'true');
  $('#hintButton').attr('disabled', 'true');
}

function removeDisable(val){
  $('#submit').removeAttr('disabled');
  $('#hintButton').removeAttr('disabled');
}

function getGuessNum(){
  return this.pastGuesses;
}
//if guess is duplicate, then change the h1 tag to say to choose another number
//otherwise add the guess to the guesses ul
//use h1 to tell win or lose
//use h2 to prompt reset
//win or lose, disable the #submit and #hint buttons
//if not win or lose, simply tell the user how close or far they are














