/**
 * Deals a card to the player
 */
function hit() {
    if (canHit) {
        deal(false);
    }
    if (reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
    }
}

/**
 * Calls for the dealer to take their actions and
 * end the game
 */
function stand() {
    goDealer();
    evaluateGame();
}

/**
 * A player can split two identical value cards
 * into two separate hands when they are initially dealt
 */
function split() {
    if (canSplit) {
        canSplit = false;111
    }
}

/**
 * Causes the player to double down, can only be done
 * after the first dealing
 */
function doubleDown() {
    if (canDoubleDown) {
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