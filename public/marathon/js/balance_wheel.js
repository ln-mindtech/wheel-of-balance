//functions section
function scoresStringRebuild(scoreArray) {
    var repScoresStr = '', scCounter = 0;
    for (let score of scoreArray) {
        scCounter++;
        if (scCounter > (scoreArray.length - 1)) {
            repScoresStr = repScoresStr + score['name'];
        } else {
            repScoresStr = repScoresStr + score['name'] + ", ";
        }
    }
    return repScoresStr;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function scrollFunc(duration) {
    const element = document.getElementById("goToPack");    
    //element.scrollIntoView({ behavior: "smooth" });
    smoothScroll(element, duration);
}

function smoothScroll(target, duration) {     
    const tsElem = document.querySelector("#goToPack .pc-violet-bg"); 
    const tsMarg = document.querySelector("#goToPack .ttl-wide-desktop");    
    const topShift = parseInt(window.getComputedStyle(tsElem, null).getPropertyValue('padding-top')) + parseInt(window.getComputedStyle(tsMarg, null).getPropertyValue('margin-top')) - 20;
    const targetPosition = target.offsetTop + topShift;
    console.log(topShift);
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;    
    let start = null;
    
    window.requestAnimationFrame(step);
  
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      // window.scrollTo(0, distance*(progress/duration) + startPosition);
      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
      if (progress < duration) window.requestAnimationFrame(step);
    }
  }
  
  // Easing Functions
  
  function linear(t, b, c, d) {
      return c*t/d + b;
  };
  
  function easeInOutQuad(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
  };
  
  function easeInOutCubic(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t + b;
      t -= 2;
      return c/2*(t*t*t + 2) + b;
  };

//code section

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let maxMarkValue = 10;
let quesions = [], colors = ["#CA2F0D", "#F4AD18", "#F97503", "#FF9763", "#859C37", "#D89748", "#FF4778", "#459A9B"];
var clientEMail = '', idParticipant = '', clientName = '', clientVersion = '';

const entries = urlParams.entries();
var colorNum = 0, entryNum = 0;
var paramsAreCorrupted = false;

for (const entry of entries) {
    let eMark = `${entry[1]}`, eName = `${entry[0]}`;
    let q = {
        "mark": eMark, "name": eName, "color": colors[colorNum]
    }
    if (eName === 'Email') { clientEMail = eMark; } else {
        if (eName === 'idParticipant') { idParticipant = eMark } else {
            if ((eName === 'Name') || (eName === 'name')) { clientName = eMark } else {
                if ((eName === 'Version') || (eName === 'version')) { clientVersion = eMark } else {
                    if (entryNum < 8) {
                        quesions.push(q);
                        colorNum++;
                        entryNum++;
                        if (!((parseInt(eMark) >= 0) && (parseInt(eMark) < 11))) { paramsAreCorrupted = true; }
                    }
                }  
            }                     
        }
    }
}
if (quesions.length < 8) { paramsAreCorrupted = true; }
if (paramsAreCorrupted) {
    //if params broken
    console.log('get-parameters are broken');
    document.querySelector('header').classList.add('disp-none');
    document.querySelector('.diagram').classList.add('disp-none');
} else {
    //if params ok
    var selfDevName = quesions[quesions.length - 1].name;
    var hiScores = [], medScores = [], lowScores = [],
        hiScoresUntrimmed = [], medScoresUntrimmed = [], lowScoresUntrimmed = [];

    //wheel params
    let segments = quesions.length;
    let segmentAngle = (Math.PI * 2) / segments;
    let angelOffset = - (Math.PI / 8) - ((Math.PI * 2) / 4);
    let canvas = document.getElementById("balance-wheel");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radius = 250; // radius of the biggest circle
    let gap = 25; // gap between circles
    let textRadius = 280; // radius from center for displayed text
    var color = "";   

    //build canvas
    for (var i = 0; i < maxMarkValue; i++) {
        var currentRadius = radius - i * gap;
        context.strokeStyle = "#DFDFDF";
        context.beginPath();
        context.arc(centerX, centerY, currentRadius, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
    }

    for (let quesion of quesions) {
        if (quesion['mark'] !== undefined) {
            let currentMark = quesion['mark'];
            let currentColor = quesion['color'];
            if (parseInt(quesion['mark']) === 0) { currentMark = 1; currentColor = '#FFF'; }
            var angel = angelOffset + segmentAngle / 2;
            var x = centerX + Math.cos(angel) * textRadius + Math.cos(angel) * (quesion['name']).length;
            var y = centerY + Math.sin(angel) * textRadius;

            color = context.createLinearGradient(centerX, centerY, x, y);
            color.addColorStop(0, currentColor);
            color.addColorStop(1, currentColor);
            context.fillStyle = color;
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, (currentMark * gap), angelOffset, angelOffset + segmentAngle, false);
            context.fill();

            if (Math.sin(angel) < -0.7) {
                y = y + 10;
            }

            context.font = '900 22px Trebuchet MS';
            context.fillStyle = 'white';
            context.textAlign = 'center';

            var numbX = centerX + Math.cos(angel) * (currentMark * gap - 25);
            var numbY = centerY + Math.sin(angel) * (currentMark * gap - 25);

            context.save();
            context.translate(numbX, numbY);
            context.rotate(angel + Math.PI / 2);
            context.textAlign = "center";
            context.fillText(quesion['mark'], 0, 0);
            context.restore();
            angelOffset = angelOffset + segmentAngle;
        }
    }

    //sort results
    var n = quesions.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (parseInt(quesions[j].mark) < parseInt(quesions[j + 1].mark)) {
                var temp = quesions[j];
                quesions[j] = quesions[j + 1];
                quesions[j + 1] = temp;
            }
        }
    }

    //view "What Do Your Scores Mean?" block
    var hiMax = 0, medMax = 0;
    for (let quesion of quesions) {
        if (quesion['mark'] !== undefined) {
            if (quesion['mark'] > 7) {
                if (hiMax < 3) {
                    hiScores.push(quesion);
                    hiScoresUntrimmed.push(quesion);
                }
                hiMax++;
            } else {
                if (quesion['mark'] > 3) {
                    medScores.push(quesion);
                    medScoresUntrimmed.push(quesion);
                } else {
                    if (quesion['mark'] > 0) {
                        lowScores.push(quesion);
                        lowScoresUntrimmed.push(quesion);
                    }
                }
            }
        }
    }

    var lowMax = lowScores.length;
    for (var i = 0; i < lowMax; i++) {
        if (lowScores.length > 3) {
            lowScores.shift();
        }
    }

    var medMax = medScores.length;
    for (var i = 0; i < medMax; i++) {
        if (medScores.length > 3) {
            if ((parseInt(medScores[i].mark) < 5) || (parseInt(medScores[i].mark) > 6)) {
                medScores.splice(i, 1);
                medMax--;
                i--;
            }
        }
    }

    for (var i = 0; i < medMax; i++) {
        if (medScores.length > 3) {
            medScores.splice(getRandomInt(medMax), 1);
            medMax--;
            i--;
        }
    }

    var rebuildHi = ', such as <b>' + scoresStringRebuild(hiScores) + '</b>',
        rebuildMed = ', as seen in <b>' + scoresStringRebuild(medScores) + '</b>',
        rebuildLow = ', such as <b>' + scoresStringRebuild(lowScores) + '</b>,';
    if (hiScores.length === 0) { rebuildHi = ''; }
    if (medScores.length === 0) { rebuildMed = ''; }
    if (lowScores.length === 0) { rebuildLow = ''; }
    var hiRes = document.getElementById("hi-res-span");
    if (hiRes != null) {
        hiRes.innerHTML = rebuildHi;
        document.getElementById("med-res-span").innerHTML = rebuildMed;
        document.getElementById("low-res-span").innerHTML = rebuildLow;
    }

    //view "How Can You Improve" block
    var rebuildTtl = 'Life Areas', rebuildArea = 'Career, Love';
    var ql = quesions.length, mirrors = [];
    for (var i = 0; i < ql; i++) {
        if (parseInt(quesions[i].mark) === 0) {
            //remove 0-elements        
            quesions.splice(i, 1);
            ql--;
            i--;
        } else {
            if (quesions[i].mark === quesions[ql - 1].mark) {
                mirrors.push(quesions[i]);
            }
        }
    }

    var mirrors2ndLevel = [];
    for (var i = 0; i < ql; i++) {
        if ((quesions[i].mark === quesions[ql - 2].mark) && (quesions[i].mark != quesions[ql - 1].mark)) {
            mirrors2ndLevel.push(quesions[i]);
        }
    }
    if (mirrors.length > 2) {
        mirrors.splice(mirrors.length - 1, 1);
        let randLower = getRandomInt(mirrors.length);
        let mirror1 = mirrors[randLower].name;
        mirrors.splice(randLower, 1);
        randLower = getRandomInt(mirrors.length);
        let mirror2 = mirrors[randLower].name;
        rebuildTtl = mirror1 + ' and ' + mirror2;
        rebuildArea = mirror1 + ', ' + mirror2;
    } else {
        if (mirrors2ndLevel.length > 1) {
            if (mirrors2ndLevel[mirrors2ndLevel.length - 1].name === selfDevName) {
                mirrors2ndLevel.splice(mirrors2ndLevel.length - 1, 1);
            };
            let randLower = getRandomInt(mirrors2ndLevel.length);
            let mirror1 = mirrors2ndLevel[randLower].name;
            rebuildTtl = mirror1 + ' and ' + quesions[ql - 1].name;
            rebuildArea = mirror1 + ', ' + quesions[ql - 1].name;

        } else {
            rebuildTtl = quesions[ql - 2].name + ' and ' + quesions[ql - 1].name;
            rebuildArea = quesions[ql - 2].name + ', ' + quesions[ql - 1].name;
        }
    }

    var careerScores = document.getElementById("career-scores");
    if (careerScores != null) {
        careerScores.innerHTML = rebuildTtl;
        document.getElementById("area-lowest").innerHTML = rebuildArea;
    }
}

/*button*/
function clickPack(thisBtn) {    
    /* Endpoint JSON Post*/
    let packPrice = thisBtn.getAttribute('data-price');
    const data = {
        email: clientEMail,
        type: packPrice
    };
    const jsonData = JSON.stringify(data);
    const url = 'https://api.mindtech.health/payments/participant/' + idParticipant + '/save/';
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': '8a5da52ed126447d359e70c05721a8aa',
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);            
            window.location.href = "https://wheelofbalance.mindtech.health/frontend/marathon/thanks/?Email=" + clientEMail + "&idParticipant=" + idParticipant + "&Name=" + clientName + "&p=" + packPrice + "&Version=" + clientVersion;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });   
}




