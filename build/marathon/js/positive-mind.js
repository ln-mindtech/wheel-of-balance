//answers render
var resCol_1 = document.getElementById("dg-col-1");
var resCol_2 = document.getElementById("dg-col-2");
if ((resCol_1 != null) && (resCol_2 != null)) {
    resCol_1.innerHTML = "";
    resCol_2.innerHTML = "";
}

var answers = [];
const entriesMind = urlParams.entries(); //get unsorted array
entryNum = 0;
for (const entry of entriesMind) {
    let eMark = `${entry[1]}`, eName = `${entry[0]}`;
    let q = {
        "mark": eMark, "name": eName, "color": colors[colorNum]
    }
    if (entryNum < 8) {
        answers.push(q);
        entryNum++;
    }
}

for (let i = 0; i < answers.length; i++) {
    var rebuildEl = document.createElement('p');
    rebuildEl.innerHTML = answers[i].name + ": " + answers[i].mark;
    if ((resCol_1 != null) && (resCol_2 != null)) {
        if (i < 4) {
            resCol_1.appendChild(rebuildEl);
        } else { resCol_2.appendChild(rebuildEl); }
    }   
}

//description list render
var lowest3Res = [], reserveRes = [], cntr = 0;
for (let i = quesions.length - 1; i >= 0; i--) {
    if ((parseInt(quesions[i].mark) > 0) && (cntr < 3)) {
        lowest3Res.push(quesions[i].name);
        cntr++;
    } else {
        reserveRes.push(quesions[i].name);
    }
}

if (lowest3Res.length < 3) {
    do {
        var y = getRandomInt(reserveRes.length);
        lowest3Res.push(reserveRes[y]);
        reserveRes.splice(y, 1);
    } while (lowest3Res.length < 3)
}

var results = document.getElementsByClassName("result-element");
var resMixed = [];
for (var i = 0; i < results.length; i++) {
    let name = results[i].getAttribute("data-name");
    if (lowest3Res.includes(name)) {
        resMixed.push(results[i]);
    }
}

for (var i = 0; i < resMixed.length; i++) {
    resMixed[i].classList.remove("disp-none");
}

var parentUl = document.getElementById("res-ul");
if (parentUl != null) {
    parentUl.appendChild(resMixed[1]);
    parentUl.appendChild(resMixed[3]);
    parentUl.appendChild(resMixed[5]);
}

//resize positive/negative mind block columns
function recalculateWidth(negativeList, positiveList, plusValue) {
    for (var i = 0; i < negativeList.length; i++) {
        var posOffset = positiveList[i].offsetHeight;
        if (negativeList[i].offsetHeight < posOffset) {
            var eWidth = negativeList[i].getBoundingClientRect().width - negativeList[i].querySelector('span').getBoundingClientRect().width + plusValue;
            negativeList[i].style.paddingRight = eWidth + 'px';
        } else {
            if (negativeList[i].offsetHeight > posOffset) {
                var eWidth = positiveList[i].getBoundingClientRect().width - positiveList[i].querySelector('span').getBoundingClientRect().width + plusValue;
                positiveList[i].style.paddingLeft = eWidth + 'px';
            }
        }
    }
}
function rebalanceColumns() {
    window.setTimeout(function () {
        var negativeList = document.getElementById("negative-list").getElementsByTagName("li");
        var positiveList = document.getElementById("positive-list").getElementsByTagName("li");

        for (var i = 0; i < negativeList.length; i++) {
            negativeList[i].removeAttribute("style");
            positiveList[i].removeAttribute("style");
        }
        if (window.innerWidth > 980) {
            recalculateWidth(negativeList, positiveList, 22)
            recalculateWidth(negativeList, positiveList, 110)
        }
        positiveImgTop = document.querySelector('#b-pos-scoll').offsetTop,
            scrollImgTop = document.querySelector('#b-neg-scoll').offsetTop;
        scrollImgLeft = document.querySelector('#b-neg-scoll').offsetLeft; //detect brain position
        scrollBrain.querySelector('.overlay').removeAttribute("style");
        scrollBrain.querySelector('.overlay').style.left = scrollImgLeft + 'px';
        scrBottonsRender();
    }, 200);
}

var positiveImgTop = document.querySelector('#b-pos-scoll').offsetTop,
    scrollImgTop = document.querySelector('#b-neg-scoll').offsetTop,
    scrollImgLeft = document.querySelector('#b-neg-scoll').offsetLeft; //detect brain position

window.onresize = rebalanceColumns;

//scroll brain
let lastKnownScrollPosition = 0;
let ticking = false;

if ((clientName === 'undefined')) {
    //do nothing
} else {
    if (clientName.length > 0) {
        var nameItem1 = document.querySelector('.result-block .naming'),
            nameItem2 = document.querySelector('#pr-go-1 .naming'),
            nameItem3 = document.querySelector('#pr-go-2 .naming');
        let nameObjects = [nameItem1, nameItem2, nameItem3];
        for (var i = 0; i < nameObjects.length; i++) {
            nameObjects[i].querySelector('.disp-none').classList.add("manipulate");
            nameObjects[i].querySelector('.delete-if-name-exist').classList.add("disp-none");
            nameObjects[i].querySelector('.manipulate').classList.remove("disp-none");
            nameObjects[i].querySelector('.manipulate span').innerHTML = clientName;
        }
    }
}

///vertical scroll buttons

function bScoll(direction) {
    var scrBlock = document.querySelector('#scr-block'),
        btnLeft = document.querySelector('#scr-left'),
        btnRt = document.querySelector('#scr-right');
    var scrBy = document.querySelector('.scr-imgs').clientWidth;
    var toX = scrBlock.scrollLeft - scrBy;
    if (direction != 'left') {
        toX = scrBlock.scrollLeft + scrBy;
    }
    scrBlock.scrollTo({
        top: 0,
        left: toX,
        behavior: 'smooth'
    });
}

function scrBottonsRender() {
    var currentX = scrBlock.scrollLeft;
    let maxX = scrBlock.scrollWidth - scrBlock.clientWidth;
    if (currentX > maxX - 20) {
        btnRt.classList.add('hide');
    } else {
        if (btnRt.classList.contains('hide')) {
            btnRt.classList.remove('hide');
        }
    }
    if (currentX === 0) {
        btnLeft.classList.add('hide');
    } else {
        if (btnLeft.classList.contains('hide')) {
            btnLeft.classList.remove('hide');
        }
    }
}

scrBlock.addEventListener("scroll", (event) => {
    scrBottonsRender();
});

/*doc ready*/
document.addEventListener("DOMContentLoaded", () => {
    rebalanceColumns();
});

function setPayment(thisBtn) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var clientEMail = '', idParticipant = '', clientName = '', clientVersion = '';
    const entries = urlParams.entries();
    for (const entry of entries) {
        let eMark = `${entry[1]}`, eName = `${entry[0]}`;

        if (eName === 'Email') { clientEMail = eMark; } else {
            if (eName === 'idParticipant') { idParticipant = eMark } else {
                if ((eName === 'Name') || (eName === 'name')) { clientName = eMark } else {
                    if ((eName === 'Version') || (eName === 'version')) { clientVersion = eMark }
                }
            }
        }
    }

    window.location.href = "https://wheelofbalance.mindtech.health/frontend/marathon/join/?Email=" + clientEMail + "&idParticipant=" + idParticipant + "&Name=" + clientName + "&Version=" + clientVersion+ "&InitateCheckout=true";
    /*window.location.href = "http://94.245.109.165/lending/join/?Email=" + clientEMail + "&idParticipant=" + idParticipant + "&Name=" + clientName + "&Version=" + clientVersion;*/
}









