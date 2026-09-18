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
    cards = shuffle(cards);
    cards.forEach(url => {
        const card  = document.createElement("div");
        card.className = "cards";
        card.dataset.value = url;
        card.role = "button";
        card.tabIndex='0';
        board.appendChild(card)
    });
    
}


initGame();

