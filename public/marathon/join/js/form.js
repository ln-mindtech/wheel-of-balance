/* \/ read get-parameters \/ */
//console.log("ADD ANALITYC");
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
var nameInput = document.getElementById("user_name"),
    emailInput = document.getElementById("user_email"),
    lblError = document.querySelector('.mp-form-label'),
    validRegex = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
/* /\  endof reading params /\ */

if (InitateCheckout === 'true') {
    console.log('InitateCheckout started');
    fbq('trackCustom', 'FbEvents.InitiateCheckout');
    console.log('InitateCheckout ended');
}

function changePrice(state) {
    if (state) {
        document.querySelector('#price').innerHTML = 'US $96.99/year';
        document.querySelector('#pr-descr').innerHTML = 'Billed yearly after a 7-day free trial.';
        document.querySelector('#pr-options .order-summary__switch-monthly').classList.remove('active');
        document.querySelector('#pr-options .order-summary__switch-yearly').classList.add('active');
        document.querySelector('#ttl-change').innerHTML = 'MindTech Premium Subscription (Yearly)';    
        
    } else {        
        document.querySelector('#price').innerHTML = 'US $11.99/month';
        document.querySelector('#pr-descr').innerHTML = 'Billed monthly after a 7-day free trial.';
        document.querySelector('#pr-options .order-summary__switch-monthly').classList.add('active');
        document.querySelector('#pr-options .order-summary__switch-yearly').classList.remove('active');
        document.querySelector('#ttl-change').innerHTML = 'MindTech Premium Subscription (Monthly)';  
    }  
    setDataPrice();
}

function changePayment(activeId) {   
    var radList = document.getElementById("rad-group").getElementsByTagName("label");
    for (var i = 0; i < radList.length; i++) {
        radList[i].classList.remove('mepr-payment-option-label--selected');
    }
    activeClass = "." + activeId;   
    document.querySelector(activeClass).classList.add('mepr-payment-option-label--selected');  
    setDataMethod();
}

function setDataPrice() {
    var dataBtn = document.getElementById("form-next-btn"), 
        value = 6.29 /*document.querySelector("#pr-options .active").getAttribute('data-price')*/;   
    dataBtn.setAttribute('data-price', value);
}

function setDataMethod() {
    var dataBtn = document.getElementById("form-next-btn"),
        value = document.querySelector("#rad-group .mepr-payment-option-label--selected input").getAttribute('data-payment-method-type');
    dataBtn.setAttribute('data-method', value);
}

function radioCh(event) {    
    changePayment(event.target.id);
}

function clickFormBtn(thisBtn) {      
    clientEMail = emailInput.value;
    clientName = nameInput.value;  
    /*Name + Email check*/
  //  if (emailInput.value.match(validRegex)) {
        console.log("valid email!");
        emailInput.classList.remove('invalid');
        lblError.removeAttribute("style");
        /*send data if email valid*/
        /* Endpoint JSON Post*/
        let packPrice = thisBtn.getAttribute('data-price');
        let packPayment = thisBtn.getAttribute('data-method');
        let paramSting = '';
        paramSting = packPrice + '-' + packPayment;
        console.log(paramSting); 
        var hrefParams = "?Email=" + clientEMail + "&idParticipant=" + idParticipant + "&Name=" + clientName + "&p=" + paramSting + "&Version=" + clientVersion;
            hrefParams = "?idParticipant=" + idParticipant;
        endpointPost(paramSting, hrefParams); 
    // } else {
    //     console.log("Invalid email address!");
    //     emailInput.classList.add('invalid');
    //     lblError.style.display = 'block';
    //     emailInput.focus();       
    // }   
}
// function endpointPost(paramSting, hrefParams) {
//     const data = {
//         name: clientName,
//         email: clientEMail,
//         type: paramSting,
//         version: clientVersion
//     };
//     console.log(data);    

//     const jsonData = JSON.stringify(data);
//     console.log(jsonData);  

//     const url = 'https://api.mindtech.health/payments/participant/' + idParticipant + '/save/';   
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Authorization': '8a5da52ed126447d359e70c05721a8aa',
//             'Content-Type': 'application/json'
//         },
//         body: jsonData
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);              
//             const urlPaid = 'https://api.mindtech.health/payments/' + data.id + '/paid/';           
//             fetch(urlPaid, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': '8a5da52ed126447d359e70c05721a8aa',
//                     'Content-Type': 'application/json'
//                 }
//             })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log(data);  
//                     const urlStripe = "https://api.mindtech.health/stripe/checkout/link/" + hrefParams;
//                     fetch(urlStripe, {
//                         method: 'GET',
//                         headers: {
//                             'Authorization': '8a5da52ed126447d359e70c05721a8aa',
//                             'Content-Type': 'application/json'
//                         }
//                     })
//                         .then(response => {                        
//                             if (!response.ok) {
//                                 throw new Error('Network response was not ok');
//                             }
//                             return response.json();
//                         })  
//                         .then(data => {
//                             console.log(data);                        
//                         })
//                 })
                
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }
function endpointPost(paramSting, hrefParams) {
    const data = {
        name: clientName,
        email: clientEMail,
        type: paramSting,
        version: clientVersion
    };
    console.log(data);    

    const jsonData = JSON.stringify(data);
    console.log(jsonData);  

     //stripe
     const urlStripe = "https://api.mindtech.health/stripe/checkout/link/" + hrefParams;
     fetch(urlStripe, {
         method: 'GET',
         headers: {
             'Authorization': '8a5da52ed126447d359e70c05721a8aa',
             'Content-Type': 'application/json'
         }
     })
         .then(response => {
         
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
             return response.json();
         })  
         .then(data => {
             console.log(data.checkoutUrl);
            
            window.location.href = data.checkoutUrl;
             //window.location.href = "http://94.245.109.165/lending/thanks/" + hrefParams;
         })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

emailInput.addEventListener("focusout", (event) => {
    if (emailInput.value.match(validRegex)) {
        emailInput.classList.remove('invalid');
        lblError.removeAttribute("style");
    } else {
        emailInput.classList.add('invalid');
        lblError.style.display = 'block';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    var switcher = document.querySelector('#switcher'),
        radCard = document.querySelector('#pay-card'); 
   /* changePrice(switcher.checked);*/
    if (radCard.checked) {
        changePayment('pay-card');
    } else {
        changePayment('pay-pal');
    }
   
    //switcher.addEventListener('change', (event) => {
    //    if (event.currentTarget.checked) {
    //        changePrice(switcher.checked);
    //    } else {
    //        changePrice(switcher.checked);
    //    }
    //})
    
    document.querySelectorAll("#rad-group input[name='mepr_payment_method']").forEach((input) => {
        input.addEventListener('change', radioCh);
    });
    setDataPrice();
    setDataMethod();    
    
    /*Name + Email preload*/  
    // if ((clientName === 'undefined')) {
    //     //do nothing
    // } else {
    //     if (clientName.length > 0) {            
    //         nameInput.value = clientName;
    //     }
    // }
    // console.log(clientEMail);
    // if ((clientEMail === 'undefined')) {
    //     document.getElementById("hideIfMailExist").classList.remove('hidden');
    // } else {
    //     if (clientEMail.length > 0) {
    //         emailInput.value = clientEMail;
    //     } else {
    //         document.getElementById("hideIfMailExist").classList.remove('hidden');
    //     }
    // }
});


