/**
 * List of recommended moves accessed by player hand then dealer card
 */
const aceRecommendations = new Map([
    [13, new Map([
        [2, "Hit"], [3, "Hit"], [4, "Hit"], [5, "Double Down"], [6, "Double Down"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [14, new Map([
        [2, "Hit"], [3, "Hit"], [4, "Hit"], [5, "Double Down"], [6, "Double Down"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [15, new Map([
        [2, "Hit"], [3, "Hit"], [4, "Double Down"], [5, "Double Down"], [6, "Double Down"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [16, new Map([
        [2, "Hit"], [3, "Hit"], [4, "Double Down"], [5, "Double Down"], [6, "Double Down"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [17, new Map([
        [2, "Hit"], [3, "Double Down"], [4, "Double Down"], [5, "Double Down"], [6, "Double Down"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [18, new Map([
        [2, "Stand"], [3, "Double Down"], [4, "Double Down"], [5, "Double Down"], [6, "Double Down"], [7, "Stand"], [8, "Stand"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])]
]);

/**
 * List of recommended moves when splitting is an option
 */
const splitRecommendations = new Map([
    [4, new Map([
        [2, "Hit"], [3, "Hit"], [4, "Split"], [5, "Split"], [6, "Split"], [7, "Split"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [6, new Map([
        [2, "Hit"], [3, "Hit"], [4, "Split"], [5, "Split"], [6, "Split"], [7, "Split"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [10, new Map([
        [2, "Double Down"], [3, "Double Down"], [4, "Double Down"], [5, "Double Down"], [6, "Double Down"], [7, "Double Down"], [8, "Double Down"], [9, "Double Down"], [10, "Hit"], [11, "Hit"]
    ])],
    [12, new Map([
        [2, "Hit"], [3, "Split"], [4, "Split"], [5, "Split"], [6, "Split"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [14, new Map([
        [2, "Split"], [3, "Split"], [4, "Split"], [5, "Split"], [6, "Split"], [7, "Split"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [18, new Map([
        [2, "Split"], [3, "Split"], [4, "Split"], [5, "Split"], [6, "Split"], [7, "Stand"], [8, "Split"], [9, "Split"], [10, "Stand"], [11, "Stand"]
    ])]
])

/**
 * List of recommended moves when no aces are involved
 */
const nonAceRecommendations = new Map([
    [9, new Map([
        [2, "Hit"], [3, "Double Down"], [4, "Double Down"], [5, "Double Down"], [6, "Double Down"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [10, new Map([
        [2, "Double Down"], [3, "Double Down"], [4, "Double Down"], [5, "Double Down"], [6, "Double Down"], [7, "Double Down"], [8, "Double Down"], [9, "Double Down"], [10, "Hit"], [11, "Hit"]
    ])],
    [12, new Map([
        [2, "Hit"], [3, "Hit"], [4, "Stand"], [5, "Stand"], [6, "Stand"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [13, new Map([
        [2, "Stand"], [3, "Stand"], [4, "Stand"], [5, "Stand"], [6, "Stand"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [14, new Map([
        [2, "Stand"], [3, "Stand"], [4, "Stand"], [5, "Stand"], [6, "Stand"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [15, new Map([
        [2, "Stand"], [3, "Stand"], [4, "Stand"], [5, "Stand"], [6, "Stand"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])],
    [16, new Map([
        [2, "Stand"], [3, "Stand"], [4, "Stand"], [5, "Stand"], [6, "Stand"], [7, "Hit"], [8, "Hit"], [9, "Hit"], [10, "Hit"], [11, "Hit"]
    ])]
])

/**
 * Recommends a move to the player by updating the UI
 */
function recommendMove() {
    var recommendation;
    if (playerAceCount > 0) {
        recommendation = recommendMoveAce();
    }
    else {
        recommendation = recommendMoveNoAce();
    }
    document.getElementById("recommended-move").innerText = recommendation;
}

/**
 * Recommends a move when the player has an ace
 * @returns the recommended move
 */
function recommendMoveAce() {
    if (playerAceCount == 2) {
        return "Split"
    }
    else {
        if (playerSum >= 19) {
            return "Stand";
        }
        return aceRecommendations.get(playerSum).get(dealerCardValue)
    }
}

/**
 * Recommends a move when the player has no ace
 * @returns the recommended move
 */
function recommendMoveNoAce() {
    if (playerSum <= 8) {
        return "Hit";
    }
    if (playerSum == 11) {
        return "Double Down";
    }
    if (playerSum >= 17) {
        return "Stand";
    }
    if (canSplit) {
        if (playerSum == 8) {
            return "Hit";
        }
        if (playerSum == 16) {
            return "Split";
        }
        return splitRecommendations.get(playerSum).get(dealerCardValue);
    }
    return nonAceRecommendations.get(playerSum).get(dealerCardValue);
}