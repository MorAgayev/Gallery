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
        createProj('Minesweeper', 'Minesweeper Game', 'Find all mines on bourd', 'https://moragayev.github.io/MineSweeper/', 'October 2021', 'Games'),
        createProj('In-Picture', 'In-Picture Game', 'What In the picture?', 'https://moragayev.github.io/MineSweeper/', 'October 2021','Games'),
        createProj('Ball Board', ' Ball Board Game', 'Ball Board', 'https://moragayev.github.io/MineSweeper/', 'October 2021', 'Games'),
        createProj('Books Shop', 'Books Shop - online store', 'Books Shop online', 'https://moragayev.github.io/MineSweeper/', 'October 2021','Online Shops'),
        
    ];
    return projs;
}

function createProj(name, title, desc, url, publishedAt, labels) {
    return {
        id: name,
        name,
        title,
        desc,
        url,
        publishedAt,
        labels,
    }
}