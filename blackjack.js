// Tracks current hand values
var dealerSum = 0;
var playerSum = 0;

// Tracked since Aces can be treated as 1 or 11
var dealerAceCount = 0;
var playerAceCount = 0;

// Hidden card for dealer
var hidden;

// Deck of cards
var deck;

// Allows player to draw while playerSum <= 21
var canHit = true;

// Sets up the deck and game
window.onload = function() {
    buildDeck();
    shuffleDeck();
    setUpBoard();
    startGame();
}

/**
 * Initializes an array of all 52 cards
 */
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

/**
 * Shuffles the deck
 */
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

/**
 * Sets up the board by dealing the player and dealer two cards each
 */ 
function setUpBoard() {
    // Hidden dealer card
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    // Revealed dealer card
    deal(true);

    // Player Starting Cards
    for (let i = 0; i < 2; i++ ) {
        deal(false);
    }
}

/**
 * Deals a card to the dealer or player
 * @param {*} isDealer if true, deals a card to the dealer, otherwise to the player
 */
function deal(isDealer) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./card-images/" + card + ".png";

    if (isDealer) {
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    else {
        playerSum += getValue(card);
        playerAceCount+= checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }
}

/**
 * Allows the player to begin interacting
 */
function startGame() {
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);

    // Ends the game if either player starts with 21
    if (dealerSum == 21 || playerSum == 21) {
        goDealer();
        evaluateGame();
    }
}

/**
 * Dealer reveals their hidden and draws until they have 
 * a hand sum of at least 17
 */
function goDealer() {
    document.getElementById("hidden").src = "./card-images/" + hidden + ".png";
    while (dealerSum < 17) {
        deal(true);
    }
}

/**
 * Evaluates the winner of the game
 */
function evaluateGame() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);
    canHit = false;
    let message = "";

    if (playerSum > 21) { 
        message = "You Busted!";
    }
    else if (dealerSum > 21) {
        message = "Dealer Busted!";
    }
    else {
        if (playerSum == dealerSum) {
            message = "Tie, Dealer Wins";
        }
        else if (playerSum < dealerSum) {
            message = "You Lose.";
        }
        else {
            message = "You Win.";
        }
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("results").innerText = message;
}

/**
 * Returns the number value of a card
 * Number cards return their own value
 * Face cards return 10, and aces return 11
 * @param {*} card the card whose number value is returned
 * @returns the number value of a given card
 */
function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    // Handles Aces and Face Cards
    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        // Jack, Queen or King
        return 10;
    }

    return parseInt(value);
}

/**
 * Returns whether a card is an ace
 * @param {*} card the card being checked if it is an ace
 * @returns 1 if a card is an ace, 0 otherwise
 */
function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

/**
 * Reduces ace values to 1 until the player's sum is 
 * less than or equal to 21
 * @param {*} sum the total point value of a player's hand
 * @param {*} aceCount the number of aces a player has
 * @returns the reduced sum based on the number of aces a player has
 */
function reduceAce(sum, aceCount) {
    while (sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount -= 1;
    }
    return sum;
}