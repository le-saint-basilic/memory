const dimension = 150;
const imgStart = Math.floor(Math.random()*100)+1;
let images = [];

const board = document.getElementById("game-board")

function shuffle(cards){
    for (let index = cards.length-1; index >= 0; index--) {
        const i = Math.floor(Math.random()*(index+1));
        [cards[i], cards[index]] = [cards[index], cards[i]];
    }
    return cards;
}

for (let index = imgStart; index < (imgStart + 8); index++) {
    images.push(`https://picsum.photos/seed/${index}/${dimension}/${dimension}`);
}

let cards = [...images, ...images];

function initGame(){
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let moves = 0;
    let matchedCount = 0;
    cards = shuffle(cards);
    cards.forEach(url => {
        const card  = document.createElement("div");
        card.className = "cards";
        card.dataset.value = url;
        card.role = "button";
        card.tabIndex='0';
        card.addEventListener('click', () => handleCardClick(card));
        board.appendChild(card)
    });
    
}

function handleCardClick(card){
    if (firstCard == card || lockBoard || card.classList.contains("matched")){
        return;
    }
    if (firstCard == null){
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true;
        moves++;
        checkMatch();
    }
}

function checkMatch(){
    if (firstCard.dataset.value == secondCard.dataset.value){
        firstCard.className = "matched"
        secondCard.className = "matched";
    } else {
        etTimeout(() => {
            firstCard.innerHTML = "";
            secondCard.innerHTML = "";
        }, 800);
    }
}

initGame();

