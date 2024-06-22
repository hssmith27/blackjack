// List of recommended moves accessed by player hand then dealer card
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

const nonAceRecommendations = new Map([
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
])

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

function recommendMoveAce() {
    if (playerAceCount == 2) {
        return "Split"
    }
    else {
        if (playerSum == 19) {
            return "Stand";
        }
        return aceRecommendations.get(playerSum).get(dealer)
    }
}

function recommendMoveNoAce() {
    if (playerSum == 8) {
        return "Hit";
    }
    if (playerSum == 17 || playerSum == 20) {
        return "Stand";
    }
}