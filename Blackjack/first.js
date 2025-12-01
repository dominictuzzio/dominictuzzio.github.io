// Utility function
function shuffleArray(array) {
    // Create a shallow copy to avoid modifying the original array if desired
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Generate a random index j between 0 and i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

let deck = shuffleArray([
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10,
])


let hand = []

// event handler here
const hitEvent = document.getElementById("hit")

hitEvent.addEventListener("click", requestHit);
function requestHit() {
    hit()
}

function updateDisplay() {
    let sum = sumHand()
    
    document.getElementById("handDisplay").textContent = "Hand: " + hand
    document.getElementById("sumDisplay").textContent = "Sum: " + sumHand()
    if (sum < 21) {
        console.log("Would you like to draw another card?")
        //create a text content + event listner 
        endingOutput.textContent = "Would you like to draw another card?"
        // hit()
    } else if (sum === 21) {
        console.log("Congratulations! You've got twenty-one!")
        endingOutput.textContent = "Congratulations! You've got twenty-one!"
    } else if (sum > 21) {
        console.log("Sorry, you're over twenty-one. ")
        endingOutput.textContent = "Sorry, you're over twenty-one."
    }
   

function hit() {
    hand.push(deck.pop())
    updateDisplay()
}

function sumHand() {
    let sum = 0
    for (let card of hand) {
        sum += card
    }
    for (let card of hand) {
        if (sum > 21) {
            if (card == 11) {
                sum -= 10
            }
        }
    }
    return sum
}

let dealersHand = []

function dealerHit() {
    dealersHand.push(deck.pop())
    dealerDisplay()
}

function dealerDisplay() {
    document.getElementById("dealersHandDisplay").textContent = "Visible Card: " + dealersHand[0]
}



function startGame() {
    hit()
    hit()
    dealerHit()
    dealerHit()
}

startGame()


function sumDealerHand() {
    let sum = 0
    for (let card of dealersHand) {
        sum += card
    }
    for (let card of dealersHand) {
        if (sum > 21) {
            if (card == 11) {
                sum -= 10
            }
        }
    }
    return sum
}


function displayDealersHand(){
    document.getElementById("dealersHandDisplay").textContent = "Dealer's Hand: " + dealersHand
}

const standEvent = document.getElementById("stand")

standEvent.addEventListener("click", requestStand);
function requestStand() {
    stand()
}

function stand() {
while (sumDealerHand() < 17) {
    dealerHit()
    displayDealersHand()
    let dealerSum = sumDealersHand()
    // make sure dealer's sum is less than 21
    if (dealerSum > sum ) {
        console.log("Would you like to draw another card?")
        endingOutput.textContent = "Would you like to draw another card?"

    }
}
}

 
}