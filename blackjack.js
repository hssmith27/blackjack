// Tracks current hand values
var dealerSum = 0;
var playerSum = 0;

// Tracked since Aces can be treated as 1 or 11
var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

// Allows player to draw while playerSum <= 21
var canHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    setUpBoard();
    startGame();
}

// Initializes an array of all 52 cards
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

// Shuffles the deck
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Sets up the board by dealing the player and dealer two cards each
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

// If isDealer is true, deals a card to the dealer, otherwise to the player
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

function startGame() {
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
}

function hit() {
    if (canHit) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./card-images/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount+= checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }

    if (reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
    }
}

function stand() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./card-images/" + hidden + ".png";

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

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}