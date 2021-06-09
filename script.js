const cards = document.querySelectorAll(".card");

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return
    this.classList.toggle('flip');
    console.log(this)

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    } 
    
    //second click
    secondCard = this;
    //do cards match
    checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.dataset.frame === secondCard.dataset.frame;

    isMatch ? disableCards() : unFlipCards();
}

function disableCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;
  //its not a match
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard(); 
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard ] = [null , null];
}


( function shuffle(){
    cards.forEach(card => {
      let ranPos = Math.floor(Math.random() * 12);
      card.style.order = ranPos;
    })
 })();


cards.forEach (card => card.addEventListener('click', flipCard));