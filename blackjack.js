// Tracks current hand values
var dealerSum = 0;
var playerSum = 0;
var splitPlayerSum = 0;

// Tracked since Aces can be treated as 1 or 11
var dealerAceCount = 0;
var playerAceCount = 0;
var splitPlayerAceCount = 0;

// Keeping track of specific cards
var hidden;
var firstCardValue;
var secondCardValue;

// Deck of cards
var deck;

var canHit = true;
var canSplit = false;
var canDoubleDown = true;

// Chip count and bid
var chips = 1000;
var bet = 0;

var isSplit = false;
var splitHand = false;

// Sets up the deck and game
window.onload = function() {
    gameLoop();
}



// Calls the main loop for the game
function gameLoop() {
    document.getElementById("chip-count").innerText = chips;
    buildDeck();
    shuffleDeck();
    placeBets();
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
 * Prompts the user to enter their chip bid
 */
function placeBets() {
    document.getElementById("submit").onclick = function() {
        document.getElementById("submit").style.display = "none";
        bet = document.getElementById("inputBid").value;
        chips -= bet;
        document.getElementById("chip-count").innerText = chips;
    }
}

/**
 * Sets up the board by dealing the player and dealer two cards each
 */ 
function setUpBoard() {
    // Hidden dealer card
    let hiddenImg = document.createElement("img");
    hiddenImg.src = "./card-images/BACK.png";
    hiddenImg.id = "hidden";
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    document.getElementById("dealer-cards").append(hiddenImg)

    // Revealed dealer card
    deal(true, false);

    // Player Starting Cards
    for (let i = 0; i < 2; i++ ) {
        deal(false, false);
    }
}

/**
 * Deals a card to the dealer or player
 * @param {*} isDealer if true, deals a card to the dealer, otherwise to the player
 */
function deal(isDealer, dealSplit) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./card-images/" + card + ".png";

    if (isDealer) {
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    else {
        if (deck.length == 49) {
            firstCardValue = getValue(card);
            cardImg.id = "first-card";
        }
        if (deck.length == 48) {
            secondCardValue = getValue(card);
            cardImg.id = "second-card";
        }
        if (!dealSplit) {
            playerSum += getValue(card);
            playerAceCount += checkAce(card);
            document.getElementById("player-cards").append(cardImg);
        }
        if (dealSplit) {
            splitPlayerSum += getValue(card);
            splitPlayerAceCount += checkAce(card);
            document.getElementById("player-split-cards").append(cardImg);
        }
    }
}

/**
 * Allows the player to begin interacting
 */
function startGame() {
    if (firstCardValue == secondCardValue) {
        canSplit = true;
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("split").addEventListener("click", split);
    document.getElementById("double-down").addEventListener("click", doubleDown);
    document.getElementById("restart").addEventListener("click", restart);

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
    canHit = false;
    canSplit = false;
    canDoubleDown = false;

    document.getElementById("hidden").src = "./card-images/" + hidden + ".png";
    while (dealerSum < 17) {
        deal(true, false);
    }
}

/**
 * Resets variables besides chip counts to zero
 */
function reset() {
    dealerSum = 0;
    playerSum = 0;
    splitPlayerSum = 0;
    dealerAceCount = 0;
    playerAceCount = 0;
    splitPlayerAceCount = 0;
    hidden = null;
    deck = null;
    canHit = true;
    canDoubleDown = true;

    document.getElementById("submit").style.display = "inline";
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("player-split-cards").innerHTML = "";
    document.getElementById("player-sum").innerHTML = "";
    document.getElementById("dealer-sum").innerHTML = "";
    document.getElementById("results").innerHTML = "";
}