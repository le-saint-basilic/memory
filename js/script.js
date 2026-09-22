const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;
let images = [];
let seconds = 0;
let timerInterval = null;
let timerDisplay = document.getElementById("temps")
let moveDisplay = document.getElementById("coups")

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;
let displayResult = document.getElementById("result");
let displayReset = document.getElementById("reset");

const board = document.getElementById("game-board")

function shuffle(cards) {
    for (let index = cards.length - 1; index >= 0; index--) {
        const i = Math.floor(Math.random() * (index + 1));
        [cards[i], cards[index]] = [cards[index], cards[i]];
    }
    return cards;
}

for (let index = imgStart; index < (imgStart + 8); index++) {
    images.push(`https://picsum.photos/seed/${index}/${dimension}/${dimension}`);
}

let cards = [...images, ...images];
displayReset.addEventListener('click', () => initGame());

function initGame() {
    board.innerHTML = "";
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    clearInterval(timerInterval);
    seconds = 0;
    moves = 0;
    matchedCount = 0;
    cards = shuffle(cards);
    displayResult.innerText = "";
    timerDisplay.textContent = `Temps : 00:00`;
    moveDisplay.textContent = `Coups : 0`
    displayReset.innerText = "Réinitialiser";
    cards.forEach(url => {
        const card = document.createElement("div");
        card.className = "cards";
        card.dataset.value = url;
        card.role = "button";
        card.tabIndex = '0';
        card.addEventListener('click', () => handleCardClick(card));
        board.appendChild(card)
    });
    startTimer();
}

function handleCardClick(card) {
    if (firstCard == card || lockBoard || card.classList.contains("matched")) {
        return;
    }
    showCard(card)
    if (firstCard == null) {
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true;
        moves++;
        moveDisplay.textContent = `Coups : ${moves}`
        checkMatch();
    }
}

function showCard(card) {
    let img = document.createElement("img")
    img.src = card.dataset.value
    img.alt = "image memory"
    card.appendChild(img);
}

function checkMatch() {
    if (firstCard.dataset.value == secondCard.dataset.value) {
        firstCard.className = "matched"
        secondCard.className = "matched";
        matchedCount = matchedCount + 2;
        checkVictory();
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    } else {
        setTimeout(() => {
            if (firstCard != null) {
                firstCard.innerHTML = "";
                secondCard.innerHTML = "";
                firstCard = null;
                secondCard = null;
                lockBoard = false;
            }
        }, 800);
    }
}

function formatTime(sec) {
    return Math.floor(sec / 60).toString().padStart(2, '0') + ":" + (sec % 60).toString().padStart(2, '0')
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Temps : ${formatTime(seconds)}`;
    }, 1000);
}

function checkVictory() {
    if (matchedCount === cards.length) {
        clearInterval(timerInterval);
        displayResult.innerText = `Bravo vous avez gagné en ${formatTime(seconds)} avec ${moves} coups !!!`
    }
}