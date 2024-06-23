/**
 * Represents the dealer's hidden card as "Value-Suit"
 */
var hidden;

/**
 * Numerical value of the player's first card
 */
var firstCardValue;

/**
 * Numerical value of the player's second card
 */
var secondCardValue;

/**
 * Numerical value of the dealer's revealed card
 */
var dealerCardValue;

/**
 * Stores all the cards as "Value-Suit"
 */
var deck;

/**
 * Total chip count of the player
 */
var chips = 1000;

/**
 * The bid on the current hand
 */
var bet = 0;

// Sets up the deck and game
window.onload = function() {
    // Adding functionality to buttons
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("split").addEventListener("click", split);
    document.getElementById("double-down").addEventListener("click", doubleDown);
    document.getElementById("restart").addEventListener("click", restart);

    gameLoop();
}

/**
 * Calls the main loop for the game
 */
function gameLoop() {
    document.getElementById("chip-count").innerText = chips;
    document.getElementById("game").style.display = "none";

    buildDeck();
    shuffleDeck();
    placeBets();
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
        bet = document.getElementById("inputBid").value;

        if (bet <= chips) {
            chips -= bet;
            document.getElementById("chip-count").innerText = chips;
            document.getElementById("submit").style.display = "none";
        }
        
        // Added here to prevent game evaluation from happening before
        // bids were placed
        setUpBoard();
        startGame();
    }
}

/**
 * Sets up the board by dealing the player and dealer two cards each
 */ 
function setUpBoard() {
    document.getElementById("game").style.display = "inline";
    document.getElementById("split-hand").style.display = "none";

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
    // For testing - REMOVE LATER
    // let card;
    // if (deck.length != 50 && deck.length != 49) {
    //     card = deck.pop();
    // }
    // else {
    //     if (deck.length == 50) {
    //         card = deck.splice(deck.indexOf("2-D"), 1)[0];
    //     }
    //     else {
    //         card = deck.splice(deck.indexOf("2-H"), 1)[0];
    //     }
    // }
    cardImg.src = "./card-images/" + card + ".png";

    if (isDealer) {
        dealerSum += getValue(card);
        dealerCardValue = getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    else {
        // Saving first two cards dealt to player so they can be split
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
 * Checks if the player can split and checks if
 * either player starts with blackjack
 */
function startGame() {
    if (firstCardValue == secondCardValue) {
        canSplit = true;
    }

    // Ends the game if either player starts with 21
    if (dealerSum == 21 || playerSum == 21) {
        goDealer();
        evaluateGame();
    }
    else {
        recommendMove();
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
    dealerCardValue = 0;
    splitPlayerSum = 0;
    dealerAceCount = 0;
    playerAceCount = 0;
    splitPlayerAceCount = 0;

    hidden = null;
    deck = null;

    isSplit = false;
    splitHand = false;
    
    canHit = true;
    canDoubleDown = true;
    canSplit = false;
    canStand = true;

    document.getElementById("submit").style.display = "inline";
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("player-split-cards").innerHTML = "";
    document.getElementById("player-sum").innerHTML = "";
    document.getElementById("dealer-sum").innerHTML = "";
    document.getElementById("player-split-sum").innerHTML = "";
    document.getElementById("results").innerHTML = "";
    document.getElementById("recommended-move").innerHTML = "";
}