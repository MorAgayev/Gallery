'use strict'

var gProjs = createProjs() ;

function getProjById(projId) {
    return gProjs.find(proj => proj.id === projId )
}

function getProjs() {
    return gProjs;
}

function createProjs() {
    var projs = [
        createProj('Minesweeper', 'Minesweeper Game', 'Find all mines on bourd', 'https://moragayev.github.io/MineSweeper/', 'October 2021', 'Games', 'img/proj-img/minesweeper.png'),
        createProj('In-Picture', 'In-Picture Game', 'What In the picture?', 'projects/proj-inPicture', 'October 2021','Games', 'img/proj-img/in-picture.png'),
        createProj('Ball Board', ' Ball Board Game', 'Ball Board', 'projects/ballBoard', 'October 2021', 'Games', 'img/proj-img/ball.png'),
        createProj('Books Shop', 'Books Shop - online store', 'Books Shop online', 'https://moragayev.github.io/MineSweeper/', 'October 2021','Online Shops', 'img/proj-img/book.png'),
    ];
    return projs;
}

function createProj(name, title, desc, url, publishedAt, labels, img) {
    return {
        id: name,
        name,
        title,
        desc,
        url,
        publishedAt,
        labels,
        img
    }
 }