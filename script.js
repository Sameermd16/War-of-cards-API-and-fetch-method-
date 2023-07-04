//"https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"

const drawCardsBtn = document.getElementById("draw-cards")
const newDeckBtn = document.getElementById("new-deck")
const cards = document.getElementById('cards')
const winnerDisplayEl = document.getElementById("winner-display")
const remainingCardsEl = document.getElementById("remaining-cards")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")
let computerScore = 0
let myScore = 0

let deckId

newDeckBtn.addEventListener('click', newDeck)

function newDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.remaining)
            remainingCardsEl.textContent = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
            console.log(deckId)
        })
}

drawCardsBtn.addEventListener('click', drawCards)

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const images = data.cards.map((object) => {
                return object.image
            })
            console.log(images)
            cards.children[0].innerHTML = `<img src="${images[0]}" style="width:100%; height: 100%" />`
            cards.children[1].innerHTML = `<img src="${images[1]}" style="width:100%; height: 100%" />`

            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            winnerDisplayEl.textContent = winnerText
            remainingCardsEl.textContent = `Remaining Cards: ${data.remaining}`

            computerScoreEl.textContent = `Computer Score: ${computerScore}`
            myScoreEl.textContent = `My Score: ${myScore}`

            if(data.remaining === 0) {
                drawCardsBtn.setAttribute('disabled', '')  //drawCardsBtn.disabled = true
                if(computerScore > myScore) {
                    winnerDisplayEl.textContent = `Computer Wins!`
                }else if(myScore > computerScore) {
                    winnerDisplayEl.textContent = `You Won!`
                }else {
                    winnerDisplayEl.textContent = `It's tie game!`
                }
            }
        })
    }

    //card1 = {value : '5'}
function determineCardWinner(card1, card2) {
    const valueOptions = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']
    const card1ValueIndex = valueOptions.indexOf(card1.value) 
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    if(card1ValueIndex > card2ValueIndex) {
        computerScore++
        return 'Computer Wins!'
        
    } else if(card2ValueIndex > card1ValueIndex) {
        myScore++
        return 'You Won!'
        
    }else {
        return 'War!'
    }
}

const card1Obj = {
    value: "JACK"
}
const card2Obj = {
    value: "QUEEN"
}
