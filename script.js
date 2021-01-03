let cardsAll = document.querySelectorAll('.card');
let alreadyFlippedCard = false;
let firstCard;
let secondCard;
let blockBoard = false;
let moveFlag = 0;
let spanEl = document.querySelector('span');

let startAgain = document.querySelector('.restartGame');
startAgain.addEventListener('click',restartGame);

function flipCard(){
  if(blockBoard) return;
  if(this === firstCard) return;

  this.classList.add('flip');

  if(!alreadyFlippedCard){
    alreadyFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  alreadyFlippedCard = false;

  checkMatchingCards();
  moveFlag ++;
  spanEl.innerText = moveFlag;
}

function checkMatchingCards(){
  if(firstCard.dataset.framework  === secondCard.dataset.framework){
    disableCards();
    return;
    //Вариант записи этого же условия через тернарный оператор!
    //let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    //isMatch ? disableCards() : unflipCards()
  }
  unflipCards();
}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
};

function unflipCard(){
  blockBoard = true;
}

function unflipCards(){
  blockBoard = true;

  setTimeout(function(){
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  },1500)
};

function resetBoard(){
  [alreadyFlippedCard, blockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function restartGame(){
  window.location.reload();
}

//(Immediately Invoked Function Expression - выполняется сразу же после того, как она была определена.
(function shuffleCards(){
  cardsAll.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

function restartGame(){
    moveFlag = 0;
    spanEl.innerText = moveFlag;

    for(let card of cardsAll){
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
    }

    resetBoard();

      cardsAll.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
  })
}

cardsAll.forEach( card => card.addEventListener('click', flipCard));
