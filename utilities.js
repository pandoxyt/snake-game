window.onload = function () {
    setTimeout(function () {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("score-display").style.display = "block";
        document.getElementById("best-score-display").style.display = "flex";
        document.getElementById("options-container").style.display = "flex";
        document.getElementById("instructions-container").style.display = "block";
    }, 3000);
};


function showGameOver() {
    document.querySelector('canvas').style.display = 'none';
    document.getElementById("game-over").style.display = 'block';
    document.getElementById("final-score").innerText = snake.score;
}
function restartGame() {
    document.querySelector('canvas').style.display = 'block';
    document.getElementById("game-over").style.display = 'none';
    document.getElementById("final-score").innerText = snake.score;
    document.getElementById('randomImage').src = getRandomImage();
    snake.reset();
    enemy.reset();
    updateScoreDisplay();
}

function updateScoreDisplay() {
    document.getElementById('score').innerText = snake.score;
    document.getElementById('best-score').innerText = bestScore;
    if (snake.score > bestScore) {
        document.getElementById("score-display").style.animation = "blink 0.1s infinite alternate";
        document.getElementById("best-score-display").style.animation = "blink 0.1s infinite alternate";
        saveBestScore();
    } else {
        document.getElementById("score-display").style.animation = "none";
        document.getElementById("best-score-display").style.animation = "none";
    }
}

function saveBestScore() {
    localStorage.setItem('bestScore', snake.score);
}

function saveLocalStore(name, value) {
    localStorage.setItem(name, value);
}
function loadLocalStore(name) {
    return localStorage.getItem(name);
}

function loadBestScore() {
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
        bestScore = parseInt(savedBestScore, 10);
    }
}

function getRandomImage() {
    const images = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png'];
    const randomIndex = Math.floor(Math.random() * images.length);
    console.log(randomIndex);
    return 'imgs/'+images[randomIndex];
}

document.getElementById('randomImage').src = getRandomImage();