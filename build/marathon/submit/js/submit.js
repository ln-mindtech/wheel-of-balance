const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var clientEMail = '', idParticipant = 1, clientName = '', clientVersion = '', InitateCheckout = 'false';
const entries = urlParams.entries();
for (const entry of entries) {
    let eMark = `${entry[1]}`, eName = `${entry[0]}`;

    if (eName === 'Email') { clientEMail = eMark; } else {
        if (eName === 'idParticipant') { idParticipant = eMark } else {
            if ((eName === 'Name') || (eName === 'name')) { clientName = eMark } else {
                if ((eName === 'Version') || (eName === 'version')) { clientVersion = eMark } else {
                    if ((eName === 'InitateCheckout') || (eName === 'initatecheckout')) { InitateCheckout = eMark }
                }
            }
        }
    }
}


function toggleDrop() {
    var item = document.getElementById("drop-toggle");
    if (item.classList.contains('showHide')) {
        item.classList.remove('showHide');
    } else {
        item.classList.add('showHide');
    }
}

function chechSubmit() {
    var inpItem = document.getElementById("getInpVal"),
        string = inpItem.value,
        fbProfileLink = string.toLowerCase(),
        checkIndex = fbProfileLink.indexOf("facebook"),
        checkShort = fbProfileLink.indexOf("fb.com"),
        isValid = false;
    if ((checkIndex >= 0)||(checkShort >= 0)) {
        console.log('valid fb profile');
        isValid = true;
    } else {
        isValid = false;
        console.log('invalid fb profile');
    }
    if (isValid) {
        inpItem.classList.remove('notvalid');
        document.getElementById("hiddenValidTxt").classList.add('hidden');
        submitPost(fbProfileLink)
    } else {
        inpItem.classList.add('notvalid');
        document.getElementById("hiddenValidTxt").classList.remove('hidden');
    }
}

function submitPost(fbParams) {
    fbq('trackCustom', 'FbEvents.FbSubmit');
    
    const dataSend = {
        idParticipant: idParticipant,
        facebookLink: fbParams
    };

    const jsonData = JSON.stringify(dataSend);
    console.log(jsonData);

    const url = 'https://api.mindtech.health/participants/add/facebook/';

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
            window.location.href = "https://wheelofbalance.mindtech.health/frontend/marathon/thanks/?idParticipant=" + idParticipant;

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}