const robo = document.getElementById("robo");
const obstaculo = document.getElementById("obstaculo");
const scoreEl = document.getElementById("score");

let isJumping = false;
let score = 0;

// Pulo do robô
function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpHeight = 0;
    const upInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(upInterval);
            const downInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                jumpHeight -= 5;
                robo.style.bottom = jumpHeight + "px";
            }, 20);
        }
        jumpHeight += 5;
        robo.style.bottom = jumpHeight + "px";
    }, 20);
}

// Controle pelo teclado
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump();
});

// Movimento do obstáculo e colisão
let obstaculoPosition = 600; // posição inicial
const gameLoop = setInterval(() => {
    obstaculoPosition -= 5;
    if (obstaculoPosition < -20) {
        obstaculoPosition = 600;
        score++;
        scoreEl.textContent = score;
    }
    obstaculo.style.right = (600 - obstaculoPosition) + "px";

    // Colisão
    const roboBottom = parseInt(robo.style.bottom.replace("px", "")) || 0;
    if (obstaculoPosition <= 70 && obstaculoPosition >= 30 && roboBottom < 50) {
        alert("💀 Fim de jogo! Sua pontuação: " + score);
        obstaculoPosition = 600;
        score = 0;
        scoreEl.textContent = score;
    }
}, 20);
