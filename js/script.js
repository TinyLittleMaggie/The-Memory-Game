// Define the suffle function
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Initialise an array to store the innerHTML to put inside the front side of each card
const symbols = [
  '<i class="fa fa-star"></i>', '<i class="fa fa-star"></i>',
  '<i class="fas fa-moon"></i>', '<i class="fas fa-moon"></i>',
  '<i class="fas fa-cloud"></i>', '<i class="fas fa-cloud"></i>',
  '<i class="fas fa-fish"></i>', '<i class="fas fa-fish"></i>',
  '<i class="fa fa-heart"></i>', '<i class="fa fa-heart"></i>',
  '<i class="fas fa-cannabis"></i>', '<i class="fas fa-cannabis"></i>',
  '<i class="fas fa-paw"></i>', '<i class="fas fa-paw"></i>',
  '<i class="fas fa-bone"></i>', '<i class="fas fa-bone"></i>'
];

// Shuffle the symbols
shuffle(symbols);

// Select the cards and place the shuffled symbols inside
const cards = document.querySelectorAll('.card');
for (let i = 0; i < 16; i++) {
  cards[i].firstElementChild.innerHTML = symbols[i];
}


// Use a variable to count the number of moves.
let moves = 0;

// Use an array to store the cards that are clicked.
let clickedCards = [];

// Add an Event Listener to each card so that when they're clicked, they flip over.
// Need to come back to this later: event delegation & consider refactoring "toggling cards" into its own function
for (let i = 0; i < 16; i++) {
  cards[i].addEventListener('click', function() {
    moves++;
    clickedCards.push(cards[i].querySelector('i').classList);
    cards[i].classList.add('show');

    console.log("You've made " + moves + " moves.");
    console.log("Card" + i + " has been clicked!");

if (moves%2 === 0 && moves > 0) {
  // comparison only happens on even moves and when moves > 0
  if (clickedCards[moves-1].value === clickedCards[moves-2].value) {
    console.log("It's a match!");
  } else {
    console.log("It's not a match!");
  }
}

  });
}
