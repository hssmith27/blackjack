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