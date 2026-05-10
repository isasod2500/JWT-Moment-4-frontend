document.addEventListener("DOMContentLoaded", () => {
    console.log(`DOM Loaded`)

    document.getElementById("register").addEventListener("click", () => {
        register()
    })
})

async function register() {


    //Hämtar länk från början, och jobbar utifrån en fetch istället för flera
    let result = await fetch(`https://jwt-moment-4-backend.onrender.com/api/users`)
    let fetchResult = await result.json();



    //Validera alla inputs först och skapa errorList
    const errors = [];
    errors.length = 0;

    let errorList = document.getElementById("errorList")
    errorList.innerHTML = "";

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let verifyPassword = document.getElementById("verifyPassword").value
    let email = document.getElementById("email").value
    let birthdate = document.getElementById("birthdate").value

    //Bägge fält måste fyllas i
    if (username === "") {
        errors.push(`Användarnamn måste anges`)
    }

    if (password === "") {
        errors.push(`Lösenord måste anges`)
    } else if (password != verifyPassword) {
        document.getElementById("password").value = "";
        document.getElementById("verifyPassword").value = "";
        errors.push(`Lösenorden stämmer inte överens`)
    }


    
    if (email === "" || !email.includes("@")) {
        errors.push(`E-post i fel format eller saknas`)
        document.getElementById("email").value = ""
    }


    if (birthdate === "") {
        errors.push(`Födelsedatum måste anges`)
    }

    if (errors.length > 0) {
        errors.forEach(error => {
            let errorLine = document.createElement("li")
            errorLine.innerHTML = error;
            errorList.appendChild(errorLine)
        })
    }

    //Kolla ifall användarnamn eller e-post redan finns
    Object.values(fetchResult).forEach(entry => {
        if (username === entry.username) {
            errors.push(`Användarnamn används redan.`)
        }
        if (email === entry.email) {
            errors.push(`E-post används redan`)
        }

        return;
    })

    if (errors.length === 0) {
        let success = document.getElementById("success")
        success.innerHTML = `Konto skapat!`

        let user = {
            username: username,
            password: password,
            firstname: firstname,
            surname: surname,
            email: email,
            birthdate: birthdate
        }

        FormData.reset

    }

}