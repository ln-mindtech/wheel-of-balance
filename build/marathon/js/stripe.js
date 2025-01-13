function clickFormBtn(thisBtn) { 
        /* Endpoint JSON Post*/
        let packPrice = thisBtn.getAttribute('data-price');
        let packPayment = thisBtn.getAttribute('data-method');
        let paramSting = '';
        paramSting = packPrice + '-' + packPayment;
        console.log(paramSting); 
        var hrefParams = "?Email=" + clientEMail + "&idParticipant=" + idParticipant + "&Name=" + clientName + "&p=" + paramSting + "&Version=" + clientVersion;
            hrefParams = "?idParticipant=" + idParticipant;
        endpointPost(paramSting, hrefParams);    
}

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

