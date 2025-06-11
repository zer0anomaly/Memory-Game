let pairCount = document.getElementById('pairCount');
let startBtn = document.getElementById('startBtn');
let cardGrid = document.getElementById('cardGrid');

let storageOfImg = [
  'images/one.png',
  'images/two.png',
  'images/three.png',
  'images/four.png',
  'images/five.png'
];

let flippedCards = [];
let lockBoard = false;

startBtn.addEventListener('click', startGame);

function startGame() {
  cardGrid.textContent = "";
  flippedCards = [];
  lockBoard = false;

  let pairCountNumber = parseInt(pairCount.value);

  if (pairCountNumber % 2 !== 0 || pairCountNumber > storageOfImg.length * 2) {
    alert("Please enter an even number up to " + (storageOfImg.length * 2));
    return;
  }

  let shuffledImages = shuffleArray(storageOfImg);
  let selectedImages = shuffledImages.slice(0, pairCountNumber / 2);
  let imagePairs = [...selectedImages, ...selectedImages];
  let imagePairsShuffled = shuffleArray(imagePairs);

  for (let i = 0; i < pairCountNumber; i++) {
    let divcreation = document.createElement("div");
    divcreation.setAttribute("data-id", `${i}`);
    divcreation.className = "card";

    let childDivOne = document.createElement("div");
    childDivOne.className = "card-inner";

    let childDivTwo = document.createElement("div");
    childDivTwo.className = "card-front";

    let childDivThree = document.createElement("div");
    childDivThree.className = "card-back";

    let imagecrt = document.createElement("img");
    imagecrt.src = imagePairsShuffled[i];
    childDivThree.appendChild(imagecrt);

    childDivOne.appendChild(childDivTwo);
    childDivOne.appendChild(childDivThree);
    divcreation.appendChild(childDivOne);
    cardGrid.appendChild(divcreation);

    divcreation.addEventListener("click", () => {
      if (lockBoard || divcreation.classList.contains("matched") || divcreation.classList.contains("flipped")) {
        return;
      }

      divcreation.classList.add("flipped");
      flippedCards.push(divcreation);

      if (flippedCards.length === 2) {
        lockBoard = true;

        const firstImg = flippedCards[0].querySelector(".card-back img").src;
        const secondImg = flippedCards[1].querySelector(".card-back img").src;

        if (firstImg === secondImg) {
          flippedCards.forEach(card => card.classList.add("matched"));
        } else {
          setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove("flipped"));
          }, 1000);
        }

        setTimeout(() => {
          flippedCards = [];
          lockBoard = false;

          const totalMatched = document.querySelectorAll('.matched').length;
          if (totalMatched === pairCountNumber) {
            setTimeout(() => {
              alert(" You matched all pairs! Restarting the game...");
              startGame(); // Restart the game
            }, 800);
          }
        }, 1000);
      }
    });
  }
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
