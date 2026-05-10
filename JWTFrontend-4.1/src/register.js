document.addEventListener("DOMContentLoaded", () => {
    console.log(`DOM Loaded`)

    document.getElementById("register").addEventListener("click", () => {
        register()
    })
})

async function register() {
    //Stoppa sidan från att ladda om
    event.preventDefault()

    //Validera alla inputs först och skapa errorList
    const errors = [];
    errors.length = 0;

    let errorList = document.getElementById("errorList")
    errorList.innerhTML = "";

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value
    let birthdate = document.getElementById("birthdate").value

    //Bägge fält måste fyllas i
    if (username === "") {
        errors.push(`Användarnamn måste anges`)
    }

    if(password === "") {
        errors.push(`Lösenord måste anges`)
    }  if (password != verifyPassword) {
        document.getElementById("password").value = "";
        document.getElementById("verifyPassword").value = "";
        errors.push(`Lösenorden stämmer inte överens`)
    }

    if(email === "") {
        errors.push(`E-post måste anges`)
    }

    if(birthdate === "") {
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
    

    if(errors.length === 0) {
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
        let result = await fetch(`https://jwt-moment-4-backend.onrender.com/api/register`)

    }

}