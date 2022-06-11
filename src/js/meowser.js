document.addEventListener("DOMContentLoaded", () => {
    let zipcodeSearchButton = document.querySelector("#zipcodeSearchButton");
    console.log("zipcodeSearchButton: ", zipcodeSearchButton);
    zipcodeSearchButton.addEventListener("click", (e) => {
        let zipcodeSearchInputValue = document.querySelector("#zipcodeSearchInput").value;
        console.log(`zipcodeSearchInputValue: ${zipcodeSearchInputValue}`);
    })
    testRequest();
});

function testRequest() {
    let accessResponse;
    fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            grant_type: "client_credentials",
            client_id: `${APIKEY}`,
            client_secret: `${SECRET}`,
        })
    })
        .then(response => response.json())
        .then(response => {
            accessResponse = response;
            console.log("accessResponse: ", accessResponse);
            return accessResponse;
        })
    // fetch("https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}", {
        .then(() => {
            console.log("accessResponse:");
            console.log(accessResponse);
            console.log("accessToken: ");
            let accessToken = accessResponse["access_token"];
            console.log(accessToken);
            fetch("https://api.petfinder.com/v2/animals", {
                headers: {
                    Authorization: `Bearer: ${accessToken}`
                }
            })
                .then(response => response.json())
                .then(response => {
                    console.log("response: ", response);
                })
p
        });
}
document.addEventListener("DOMContentLoaded", () => {
    let zipcodeSearchButton = document.querySelector("#zipcodeSearchButton");
    console.log("zipcodeSearchButton: ", zipcodeSearchButton);
    zipcodeSearchButton.addEventListener("click", (e) => {
        let zipcodeSearchInputValue = document.querySelector("#zipcodeSearchInput").value;
        console.log(`zipcodeSearchInputValue: ${zipcodeSearchInputValue}`);
    })
    testRequest();
});

function testRequest() {
    let accessResponse;
    fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            grant_type: "client_credentials",
            client_id: `${APIKEY}`,
            client_secret: `${SECRET}`,
        })
    })
        .then(response => response.json())
        .then(response => {
            accessResponse = response;
            console.log("accessResponse: ", accessResponse);
            return accessResponse;
        })
    // fetch("https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}", {
        .then(() => {
            console.log("accessResponse:");
            console.log(accessResponse);
            console.log("accessToken: ");
            let accessToken = accessResponse["access_token"];
            console.log(accessToken);
            fetch("https://api.petfinder.com/v2/animals", {
                headers: {
                    Authorization: `Bearer: ${accessToken}`
                }
            })
                .then(response => response.json())
                .then(response => {
                    console.log("response: ", response);
                })
p
        });
}
