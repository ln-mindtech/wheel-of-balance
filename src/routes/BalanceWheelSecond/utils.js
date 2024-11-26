export const renderWheel = (responseData, maxMarkValue) => {
    let quesions = responseData.questions;

    let segments = quesions.length;
    let segmentAngle = (Math.PI * 2) / segments;
    let angelOffset = 0;
    let canvas = document.getElementById("balance-wheel");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radius = 120; // radius of the biggest circle
    let gap = 12; // gap between circles
    let textRadius = 150; // radius from center for displayed text
    var color = "";

    for (var i = 0; i < maxMarkValue; i++) {
        var currentRadius = radius - i * gap;
        context.strokeStyle = "grey";
        context.beginPath();
        context.arc(centerX, centerY, currentRadius, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
    }

    for (let quesion of quesions) {
        if (quesion['mark'] !== undefined) {
            var angel = angelOffset + segmentAngle / 2;
            var x = centerX + Math.cos(angel) * textRadius + Math.cos(angel) * (quesion['name']).length;
            var y = centerY + Math.sin(angel) * textRadius;

            color = context.createLinearGradient(centerX, centerY, x, y);
            color.addColorStop(0, quesion['color']);
            color.addColorStop(1, quesion['color']);

            context.fillStyle = color;
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, (quesion['mark'] * gap), angelOffset, angelOffset + segmentAngle, false);
            context.fill();

            if (Math.sin(angel) < -0.7) {
                y = y + 10;
            }
            context.font = '12pt serif';
            context.fillStyle = 'black';//quesion['color'];
            context.textAlign = 'center';
            context.fillText(quesion['name'] + ' ' + quesion['mark'], x, y);

            angelOffset = angelOffset + segmentAngle;
        }
    }
    return canvas.toDataURL();
}

export const renderWheelSecond = (responseData, maxMarkValue) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

//code section
    let quesions = responseData.questions;

    let segments = quesions.length;
    let segmentAngle = (Math.PI * 2) / segments;
    let angelOffset = - (Math.PI / 8) - ((Math.PI * 2) / 4);
    let canvas = document.getElementById("balance-wheel");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radius = 125; // radius of the biggest circle
    let gap = 12.5; // gap between circles
    let textRadius = 150; // radius from center for displayed text
    var color = "";
    var hiScores = [], medScores = [], lowScores = [];

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
            var angel = angelOffset + segmentAngle / 2;
            var x = centerX + Math.cos(angel) * textRadius + Math.cos(angel) * (quesion['name']).length;
            var y = centerY + Math.sin(angel) * textRadius;

            color = context.createLinearGradient(centerX, centerY, x, y);
            color.addColorStop(0, quesion['color']);
            color.addColorStop(1, quesion['color']);

            context.fillStyle = color;
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, (quesion['mark'] * gap), angelOffset, angelOffset + segmentAngle, false);
            context.fill();

            if (Math.sin(angel) < -0.7) {
                y = y + 10;
            }

            context.font = 'bold 13px trebuchet ms sans-serif';
            // context.fillStyle = 'white';
            // context.textAlign = 'center';

            var numbX = centerX + Math.cos(angel) * (quesion['mark'] * gap - 15);
            var numbY = centerY + Math.sin(angel) * (quesion['mark'] * gap - 15);

            context.save();
            context.translate(numbX, numbY);
            context.rotate(angel + Math.PI / 2);
            context.textAlign = "center";

            if (!quesion['mark']) {
                console.log(x);
                console.log(y);
                context.fillStyle = 'black';

            }
            context.fillText(quesion['name'], x, y);
            context.fillText(quesion['mark'], 0, 0);
            context.restore();


            angelOffset = angelOffset + segmentAngle;
        }
    }

    return canvas.toDataURL();
}