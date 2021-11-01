const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
let pulos = 0;
let cactusPosition = 1500;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 160) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
         }else {
          position -= 40;
          dino.style.bottom = position + 'px';
          if (cactusPosition <= 140 && position >= 120 ) { pulos++; }
        }
      }, 40);
    } else {
      // Subindo
      position += 40;
      dino.style.bottom = position + 'px';
    }
  }, 40);
}

function createCactus() {
  const cactus = document.createElement('div');
  cactusPosition = 1500;
  let randomTime = Math.random() * 15000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -50) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 50 && position < 50) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
/*      document.body.innerHTML = '<h1 class = "game-over">"Fim de jogo !"</h1>';*/
      var numeroPulos = "Fim do Jogo !     =>   Pulos certos: " + pulos;
      document.body.innerHTML = numeroPulos;
    } else
      cactusPosition -= 20;
      cactus.style.left = cactusPosition + 'px';
  }, 50);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
