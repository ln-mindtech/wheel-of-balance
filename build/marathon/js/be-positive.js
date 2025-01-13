//answers render
const colsNum = 3;
var resCols = [], scores = [hiScoresUntrimmed, medScoresUntrimmed, lowScoresUntrimmed];
for (var i = 0; i < colsNum; i++) {
    resCols.push(document.getElementById("scores-ul-" + (i + 1)));
    resCols[i].innerHTML = "";
}
for (let j = 0; j < colsNum; j++) {
    for (let i = 0; i < scores[j].length; i++) {
        var rebuildEl = document.createElement('li');
        rebuildEl.innerHTML = scores[j][i].name + ": " + scores[j][i].mark;
        resCols[j].appendChild(rebuildEl);
    }
}







