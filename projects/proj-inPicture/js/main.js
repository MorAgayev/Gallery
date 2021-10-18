'use strict'
var gCurrQuestIdx;

var gQuests = [
    { id: 1, opts: ['Banana', 'Apple'], correctOptIndex: 1 },
    { id: 2, opts: ['Banana', 'Orange'], correctOptIndex: 0 },
    { id: 2, opts: ['Watermelon', 'Grapes'], correctOptIndex: 0 },
    { id: 2, opts: ['Grapefruit', 'Melon'], correctOptIndex: 1 }
];

function initGame() {
    gCurrQuestIdx = 0;
    randerBtns();
    randerImg();
}

function victoriousMsg() {
    var elBoard = document.querySelector('.game-board');
    elBoard.style.display = 'none'
    var elBtn = document.querySelector('.start-btn');
    elBtn.innerText = 'Victorious!'; 
    elBtn.style.display = 'inline';
    gCurrQuestIdx = 0;
    randerBtns();
    randerImg();
}

function CheckAnswer(idx) {
    var currectOpt = gQuests[gCurrQuestIdx].correctOptIndex;
    if (idx === currectOpt) {
        gCurrQuestIdx++;
        if (gCurrQuestIdx < gQuests.length) {
            randerBtns();
            randerImg();
        } else victoriousMsg();
    }
}

function randerBtns() {
    var currOpts = gQuests[gCurrQuestIdx].opts;
    var strHTML = ''
    for (var i = 0; i < 2; i++) {
        var currOpt = currOpts[i]
        strHTML += `<button class ="opts-btn" onclick="CheckAnswer(${i})">${currOpt}</button>`;
    }
    var elOpts = document.querySelector('.opts');
    elOpts.innerHTML = strHTML;
}

function randerImg() {
    var strHTML = `<img src="img/${gCurrQuestIdx}.jpg">`;
    var elImg = document.querySelector('.imgs');
    elImg.innerHTML = strHTML;
}

function startBtn(elBtn) {
    elBtn.style.display = 'none';
    var elgameBoard = document.querySelector('.game-board');
    elgameBoard.style.display = 'block';
}