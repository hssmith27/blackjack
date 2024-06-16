/**
 * Deals a card to the player
 */
function hit() {
    canSplit = false;
    canDoubleDown = false;
    if (canHit) {
        deal(false, splitHand);
    }
    if (!splitHand && reduceAce(playerSum, playerAceCount) >= 21) {
        canHit = false;
    }
    else if (splitHand && reduceAce(splitPlayerSum, splitPlayerAceCount) >= 21) {
        canHit = false;
    }
}

/**
 * Calls for the dealer to take their actions and
 * end the game
 */
function stand() {
    if (isSplit) {
        isSplit = false;
        splitHand = true;
        canHit = true;
    }
    else {
        goDealer();
        evaluateGame();
    }
}

/**
 * A player can split two identical value cards
 * into two separate hands when they are initially dealt
 */
function split() {
    if (canSplit) {
        canSplit = false;
        canDoubleDown = false;
        document.getElementById("player-split-cards").append(document.getElementById("second-card"));
        playerAceCount = playerAceCount / 2;
        playerSum = playerSum / 2;
        splitPlayerAceCount = playerAceCount;
        splitPlayerSum = playerSum;
        isSplit = true;

        chips -= bet;
        document.getElementById("chip-count").innerText = chips;
    }
}

/**
 * Causes the player to double down, can only be done
 * after the first dealing
 */
function doubleDown() {
    if (canDoubleDown) {
        canSplit = false;
        chips -= bet;
        document.getElementById("chip-count").innerText = chips;
        bet *= 2;
        canHit = false;
        deal(false);
        stand();
    }
}

/**
 * Restarts the game, does not change chip count
 */
function restart() {
    reset();
    gameLoop();
}

