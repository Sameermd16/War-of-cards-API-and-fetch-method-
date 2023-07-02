//"https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"

const drawCardsBtn = document.getElementById("draw-cards")
const cards = document.getElementById('cards')
let deckId

document.getElementById("new-deck").addEventListener('click', handleClick)

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
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
        })
    }