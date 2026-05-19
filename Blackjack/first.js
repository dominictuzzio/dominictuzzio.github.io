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

let deck, hand, dealersHand;
function setupGame() {
    deck = shuffleArray([
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10,
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10,
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10,
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10,
    ])
    hand = []
    dealersHand = []
}
setupGame()
// event handler here
const hitEvent = document.getElementById("hit");
const standEvent = document.getElementById("stand");
const resetEvent = document.getElementById("reset");
const betConfirm = document.getElementById("betEvent");
const betInput = document.getElementById("betInput");
const betOutput = document.getElementById("betOutput");

hitEvent.addEventListener("click", requestHit);
function requestHit() {
    hit()
}

function updateDisplay() {
    let sum = sumHand()
    document.getElementById("handDisplay").textContent = "Hand: " + hand
    document.getElementById("sumDisplay").textContent = "Sum: " + sum
    if (sum < 21) {
        console.log("Would you like to draw another card?")
        endingOutput.textContent = "Would you like to draw another card?"
    } else if (sum === 21) {
        console.log("Congratulations! You've got twenty-one!")
        endingOutput.textContent = "Congratulations! You've got twenty-one!"
    } else if (sum > 21) {
        console.log("Sorry, you're over twenty-one. ")
        endingOutput.textContent = "Sorry, you're over twenty-one."
    }
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


function dealerHit() {
    dealersHand.push(deck.pop())
    dealerDisplay()
}

function dealerDisplay() {

    document.getElementById("dealersHandDisplay").textContent = "Dealer's Visible Card: " + dealersHand[0]

}






function sumDealerHand() {
    let sumDealer = 0
    for (let card of dealersHand) {
        sumDealer += card
    }
    for (let card of dealersHand) {
        if (sumDealer > 21) {
            if (card == 11) {
                sumDealer -= 10
            }
        }
    }
    return sumDealer
}


function displayDealersHand() {
    document.getElementById("dealersHandDisplay").textContent = "Dealer's Hand: " + dealersHand
}

function displayDealerSum(){
    let sumDealer = sumDealerHand()
    document.getElementById("dealerSumDisplay").textContent = "Dealer's Sum: " + sumDealer
}


standEvent.addEventListener("click", requestStand);
function requestStand() {
    stand()
}

//betting event listener
// betConfirm.addEventListener("click", () => {
//     let bet = betInput.value;
//     betOutput.textContent = "Please confirm the bet:" +  bet
// });

function stand() {
    while (sumDealerHand() < 17) {
        dealerHit()
    }
    displayDealersHand()
    displayDealerSum()
    document.getElementById("finalOutput")
    let dealerSum = sumDealerHand()
    let playerSum = sumHand()
    if (dealerSum > playerSum && dealerSum <= 21) {
        console.log("Sorry the dealer beat you.")
        finalOutput.textContent = "Sorry the dealer beat you."
    } 
    else if (dealerSum < playerSum && playerSum <= 21) {
        console.log("Congratulations, you beat the dealer!")
        finalOutput.textContent = "Congratulations, you beat the dealer!"
    } 
    else if (dealerSum == playerSum && dealerSum <= 21 && playerSum <= 21) {
        console.log("It's a push (draw). Try again.")
        finalOutput.textContent = "It's a push (draw). Try again."
    }
    else if(dealerSum > 21){
        console.log("The dealer bust. You win!")
        finalOutput.textcontent = "The dealer bust. You win!"
    }
    else if(dealerSum == 21){
        console.log("Sorry, the dealer got twenty-one.")
        finalOutput.textcontent = "Sorry, the dealer got twenty-one."
    }
    else if (playerSum > 21) {
        console.log("Sorry, you're over twenty-one. ")
        finalOutput.textContent = "Sorry, you're over twenty-one."
    }
}



// let sumDealersHand = sumDealerHand()
// let playersSum = sumHand()

// // player's final outcome compared to the dealer's outcome
// if (stand()){
//  if (sumDealersHand > playersSum && sumDealersHand <= 21) {
//      console.log("Sorry the dealer beat you.")
//      finalOutput.textContent = "Sorry the dealer beat you."
//  } else if(sumDealersHand < playersSum && playersSum <= 21){
//      console.log("Congratulations, you beat the dealer!")
//      finalOutput.textContent = "Congratulations, you beat the dealer!"
//  } else if(sumDealersHand == playersSum && sumDealersHand <= 21 && playersSum <= 21)
//      console.log("It's a push (draw). Try again.")
//      finalOutput.textContent = "It's a push (draw). Try again."
// }


// a reset function here to refresh the game 
resetEvent.addEventListener("click", requestReset);
function requestReset() {
    sumHand()
    sumDealerHand()
    setupGame()
    startGame()
    finalOutput.textContent = " "
}



function startGame() {
    hit()
    hit()
    dealerHit()
    dealerHit()
}

startGame()