// Tracks current hand values
var dealerSum = 0;
var playerSum = 0;
var splitPlayerSum = 0;

// Tracked since Aces can be treated as 1 or 11
var dealerAceCount = 0;
var playerAceCount = 0;
var splitPlayerAceCount = 0;

/**
 * Evaluates the winner of the game
 */
function evaluateGame() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);
    canHit = false;
    let message = "";
    var playerWon = false;
    var splitPlayerWon = false;

    if (playerSum > 21) { 
        message = "You Busted!";
    }
    else if (dealerSum > 21) {
        message = "Dealer Busted!";
        playerWon = true;
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
            playerWon = true;
        }
    }

    if (splitHand) {
        splitPlayerSum = reduceAce(splitPlayerSum, splitPlayerAceCount);
        if (splitPlayerSum > 21) { 
            message += " You Busted!";
        }
        else if (dealerSum > 21) {
            message += " Dealer Busted!";
            splitPlayerWon = true;
        }
        else {
            if (splitPlayerSum == dealerSum) {
                message += " Tie, Dealer Wins";
            }
            else if (splitPlayerSum < dealerSum) {
                message += " You Lose.";
            }
            else {
                message += " You Win.";
                splitPlayerWon = true;
            }
        }
        document.getElementById("player-split-sum").innerText = splitPlayerSum;
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("results").innerText = message;

    if (playerWon) {
        chips += 2 * bet;
        document.getElementById("chip-count").innerText = chips;
    }
    if (splitPlayerWon) {
        chips += 2 * bet;
        document.getElementById("chip-count").innerText = chips;
    }
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