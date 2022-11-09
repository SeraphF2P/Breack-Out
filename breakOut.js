"use strict";
let playGround = document.querySelector('.playGround');
const blockWidth = 80;
const blockHeight = 20;
let direction = 'toTopLeft';
function blocking() {
    for (let i = 0; i < blocks.length; i++) {
        let block = document.createElement('div');
        block.classList.add('block');
        playGround === null || playGround === void 0 ? void 0 : playGround.appendChild(block);
        block.style.translate = `${blocks[i].bottomLeft[0]}px ${blocks[i].bottomLeft[1]}px`;
    }
}
class block {
    constructor(Xaxis, yaxis) {
        this.topLeft = [Xaxis, yaxis];
        this.bottomRight = [Xaxis + blockWidth, yaxis + blockHeight];
        this.bottomLeft = [Xaxis, yaxis + blockHeight];
        this.topRight = [Xaxis + blockWidth, yaxis];
    }
}
let blocks = [
    new block(20, 130),
    new block(120, 130),
    new block(220, 130),
    new block(320, 130),
    new block(420, 130),
    new block(520, 130),
    new block(20, 90),
    new block(120, 90),
    new block(220, 90),
    new block(320, 90),
    new block(420, 90),
    new block(520, 90),
    new block(20, 50),
    new block(120, 50),
    new block(220, 50),
    new block(320, 50),
    new block(420, 50),
    new block(520, 50),
    new block(20, 10),
    new block(120, 10),
    new block(220, 10),
    new block(320, 10),
    new block(420, 10),
    new block(520, 10),
];
blocking();
let userX = 240, userY = 260;
let user = document.createElement('div');
user.classList.add('user');
playGround === null || playGround === void 0 ? void 0 : playGround.appendChild(user);
user.style.translate = `${userX}px ${userY}px`;
function move(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (userX > 10) {
                userX -= 20;
            }
            break;
        case 'ArrowRight':
            if (userX < 510) {
                userX += 20;
            }
            break;
    }
    user.style.translate = `${userX}px ${userY}px`;
}
document.addEventListener('keydown', move);
let ballX = 260, ballY = 220;
function youLose() {
    if (ballY == 280) {
        document.removeEventListener('keydown', move);
        clearInterval(ballTimer);
    }
}
let ball = document.createElement('div');
ball.classList.add('ball');
playGround === null || playGround === void 0 ? void 0 : playGround.appendChild(ball);
ball.style.translate = `${ballX}px ${ballY}px`;
function changeDirction() {
    switch (direction) {
        case 'toBottomLeft':
            ballX -= 20;
            ballY += 20;
            youLose();
            break;
        case 'toTopLeft':
            ballX -= 20;
            ballY -= 20;
            break;
        case 'toTopRight':
            ballX += 20;
            ballY -= 20;
            break;
        case 'toBottomRight':
            ballX += 20;
            ballY += 20;
            break;
    }
}
function checkForAhit() {
    for (let i = 0; i < blocks.length; i++) {
        if ((direction == 'toTopLeft' || direction == 'toTopRight') && ballX >= blocks[i].bottomLeft[0] && ballX <= blocks[i].bottomRight[0] && ballY - 10 == blocks[i].bottomLeft[1]) {
            let deleted = document.querySelector(`[style='translate: ${blocks[i].bottomLeft[0]}px ${blocks[i].bottomLeft[1]}px;']`);
            deleted === null || deleted === void 0 ? void 0 : deleted.remove();
            blocks.splice(blocks.indexOf(blocks[i]), 1);
            if (direction == 'toTopLeft') {
                direction = 'toBottomLeft';
            }
            else if (direction == 'toTopRight') {
                direction = 'toBottomRight';
            }
        }
        if ((direction == 'toBottomLeft' || direction == 'toBottomRight') && ballX >= blocks[i].topLeft[0] && ballX <= blocks[i].bottomRight[0] && ballY + 10 == blocks[i].topLeft[1]) {
            let deleted = document.querySelector(`[style='translate: ${blocks[i].bottomLeft[0]}px ${blocks[i].bottomLeft[1]}px;']`);
            deleted === null || deleted === void 0 ? void 0 : deleted.remove();
            blocks.splice(blocks.indexOf(blocks[i]), 1);
            if (direction == 'toBottomLeft') {
                direction = 'toTopLeft';
            }
            else if (direction == 'toBottomRight') {
                direction = 'toTopRight';
            }
        }
    }
}
function ballMove() {
    let userArrayOfIndex = [userX, userX + 20, userX + 40, userX + 60, userX + 80, userX + 100];
    if (ballY == userY - 20 && userArrayOfIndex.some((a) => a == ballX) && direction == 'toBottomLeft') {
        direction = 'toTopLeft';
    }
    else if (ballY == userY - 20 && userArrayOfIndex.some((a) => a == ballX) && direction == 'toBottomRight') {
        direction = 'toTopRight';
    }
    if (direction == 'toTopLeft' && ballX == 0) {
        direction = 'toTopRight';
    }
    else if (ballX == 0 && direction == 'toBottomLeft') {
        direction = 'toBottomRight';
    }
    if (direction == 'toTopRight' && ballY == 0) {
        direction = 'toBottomRight';
    }
    else if (direction == 'toTopLeft' && ballY == 0) {
        direction = 'toBottomLeft';
    }
    if (ballX == 600 && direction == 'toTopRight') {
        direction = 'toTopLeft';
    }
    else if (ballX == 600 && direction == 'toBottomRight') {
        direction = 'toBottomLeft';
    }
    changeDirction();
    checkForAhit();
    ball.style.translate = `${ballX}px ${ballY}px`;
}
let ballTimer = setInterval(ballMove, 200);
