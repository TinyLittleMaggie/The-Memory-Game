// Define the shuffle function
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

// Use another variable to count the matched pairs.
let matchedPairs = 0;

// Use an array to store the cards that are clicked.
let clickedCards = [];

// Add an Event Listener to each card so that when they're clicked, they flip over.
// Need to come back to this later: event delegation & consider refactoring "toggling cards" into its own function
for (let i = 0; i < 16; i++) {
  cards[i].addEventListener('click', function() {

    if (clickedCards.length < 2) { // This prevents the player from clicking a third card while the comparison is still in progress

      if (!cards[i].classList.contains('show')) { // This prevents the player from clicking on a showing card
        moves++;
        clickedCards.push(cards[i]);
        cards[i].classList.add('show');
      }

      if (moves % 2 === 0 && moves > 0) { // comparison only happens on even moves and when moves > 0
        let currentSymbol = clickedCards[0].querySelector('i').classList.value;
        let previousSymbol = clickedCards[1].querySelector('i').classList.value;
        console.log(currentSymbol + "  " + previousSymbol);
        if (currentSymbol === previousSymbol) {
          matchedPairs++;
          console.log("It's a match!");
          console.log("Matched pairs = " + matchedPairs + ".");
          setTimeout(function() { // clear up the array once the comparison is done
            clickedCards = [];
          }, 300);
        } else {
          setTimeout(function() {
            clickedCards[0].classList.remove('show');
            clickedCards[1].classList.remove('show');
          }, 1000);
          setTimeout(function() { // clear up the array once the comparison is done
            clickedCards = [];
          }, 1300);
        }

        // Updating the star rating in real time:
        let emm = moves + (8-matchedPairs)*2; // Estimated mimimum moves: If the player plays all remaining cards perfectly, (s)he will have made this many moves when (s)he wins.
        if (emm >= 32 && emm <= 38) {
          document.querySelector('.starRating').innerHTML =
          `<i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i>`;
        } else if (emm > 38 && emm <= 46) {
          document.querySelector('.starRating').innerHTML =
          `<i class="fas fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>`;
        } else if (emm > 46){
          document.querySelector('.starRating').innerHTML =
          `<i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>`;
        }
        console.log(emm);
      }

    }

    // Display number of moves to the page:
    document.querySelector('.moveCounter').innerHTML = moves + " moves";

    // Checking for the winning condition:
    if (matchedPairs === 8) {
      console.log("Yay! You won the game!");
    }

  });
}
