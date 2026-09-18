const dimension = 150;
const imgStart = Math.floor(Math.random()*100)+1;
let images = [];

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
cards = shuffle(cards);


console.log(cards);
