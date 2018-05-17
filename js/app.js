//Define arrays for matching logic
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(card); //HTMLCollection
console.log(cards); //Array
let matchedCard = document.getElementsByClassName("match");
var openedCards = [];

//Define variables for rating and timer
const deck = document.getElementById("card-deck");
let stars = document.querySelectorAll(".fa-star");

let moves = 0;
let counter = document.querySelector(".moves");

var second = 0;
var minute = 0;
var timer = document.querySelector(".timer");
var interval;

let restart = document.querySelector(".restart");
restart.addEventListener("click", resetGame);

//Define variables for success window
let modal = document.getElementById("popupParentDiv")
let closeButton = document.querySelector(".close");
let playAgain = document.getElementById("play-again");

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

document.body.onload = resetGame();

//Clear the divs from dynamically added attributes from previous play
function resetGame(){
  //Shuffle an array using a function above
  cards = shuffle(cards);

  //Clear each card from existing classes
  for (var i = 0; i < cards.length; i++){
    deck.innerHTML = "";
      [].forEach.call(cards, function(item) {
        deck.appendChild(item);
      });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }

  //Reset stars attribution
  for (var i= 0; i < stars.length; i++){
    stars[i].style.visibility = "visible";
  }

  //Reset user's moves
  moves = 0;
  counter.innerHTML = moves;

  //Reset timer
  second = 0;
  minute = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = minute+"mins "+second+"secs";
  clearInterval(interval);
}

//Create a function toggling the classes from .css template and store it in a variable displayCard
var displayCard = function (){
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

//Populate an empty array openedCards with push() method
function openCard() {
  openedCards.push(this);
  if(openedCards.length === 2){
    moveCounter();
    if(openedCards[0].isEqualNode(openedCards[1])){
      matched();
    } else {
      unmatched();
    }
  }
};

//Add & remove attributes when cards match
function matched(){
  for(let i = 0; i < 2; i++){
    openedCards[i].classList.add("match", "disabled");
    openedCards[i].classList.remove("show", "open", "no-event");
  }
  openedCards.length = 0;
}

//Add & remove class attributes when cards don't match
function unmatched(){
  for(let i = 0; i < 2; i++){
    openedCards[i].classList.add("unmatched");
  }
  disable();

  setTimeout(function(){
    for(let i = 0; i < 2; i++){
      openedCards[i].classList.remove("show", "open", "no-event","unmatched");
    }
    enable();
    openedCards.length = 0;
  },1000);
}

//Disable cards temporarely
function disable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.add('disabled');
  });
}

//Disable matched cards
function enable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove('disabled');

    for(var i = 0; i < matchedCard.length; i++){
      matchedCard[i].classList.add("disabled");
    }
  });
}

//Count user's moves
function moveCounter(){
  moves++;
  counter.innerHTML = moves;

  //Start timer at first move
  if(moves === 1){
    second = 0;
    minute = 0;
    startTimer();
  }

  //Set rates based on moves
  if (moves === 12){
    stars[4].style.visibility = "hidden";
  }
  else if (moves === 18){
    stars[3].style.visibility = "hidden";
  }
  else if (moves === 22){
    stars[2].style.visibility = "hidden";
  }
  else if (moves === 26){
    stars[1].style.visibility = "hidden";
  }
}

//Set timer functionality
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute+" mins "+second+" secs";
    second++;
    if(second == 60){
      minute++;
      second=0;
    }
    if(minute == 60){
      hour++;
      minute = 0;
    }
  },1000);
}

//Show success window
function successWindow(){
  if (matchedCard.length === 16){
    clearInterval(interval);
    finalTime = timer.innerHTML;
    modal.classList.add("show");

    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    closeSuccessWindow();
  };
}

//Close success window
function closeSuccessWindow(){
  closeButton.addEventListener("click", function(e){
    modal.classList.remove("show");
    resetGame();
  });
  playAgain.addEventListener("click", function(e){
    modal.classList.remove("show");
    resetGame();
  });
}

//Add event listeners to all elements of the array cars in a loop
for (var i = 0; i < cards.length; i++){
  cards[i].addEventListener("click", displayCard);
  cards[i].addEventListener("click", openCard);
  cards[i].addEventListener("click", successWindow);
}
