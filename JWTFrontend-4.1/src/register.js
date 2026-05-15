document.addEventListener("DOMContentLoaded", () => {
    console.log(`DOM Loaded`)

    document.getElementById("registerForm").addEventListener("submit", register)
});

async function register(event) {

    event.preventDefault();
    
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
    let firstname = document.getElementById("firstname").value
    let surname = document.getElementById("surname").value
    let email = document.getElementById("email").value
    let birthdate = document.getElementById("birthdate").value

    //Anv.namn måste fyllas i
    if (username === "") {
        errors.push(`Användarnamn måste anges`)
    }

    //If-sats för saknat lösenord och i fall fälten inte matchar.
    if (password === "") {
        errors.push(`Lösenord måste anges`)
    } else if (password != verifyPassword) {
        document.getElementById("password").value = "";
        document.getElementById("verifyPassword").value = "";
        errors.push(`Lösenorden stämmer inte överens`)
    }


    //e-post måste ha "@"
    if (email === "" || !email.includes("@")) {
        errors.push(`E-post i fel format eller saknas`)
        document.getElementById("email").value = ""
    }

    //Födelsedatum kan inte vara tom
    if (birthdate === "") {
        errors.push(`Födelsedatum måste anges`)
    }



    //Kolla ifall användarnamn eller e-post redan finns
    Object.values(fetchResult).forEach(entry => {
        if (username.toLowerCase() === entry.username.toLowerCase()) {
            errors.push(`Användarnamn används redan.`)
        }
        if (email.toLowerCase() === entry.email.toLowerCase()) {
            errors.push(`E-post används redan`)
        }

        return;
    })

        //Om errors finns
    if (errors.length > 0) {
        errors.forEach(error => {
            let errorLine = document.createElement("li")
            errorLine.innerHTML = error;
            errorList.appendChild(errorLine)
            return;
        })
    }

    if (errors.length === 0) {

        try {
            let response = await fetch(`https://jwt-moment-4-backend.onrender.com/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    username: username,
                    password: password,
                    firstname: firstname,
                    surname: surname,
                    email: email,
                    birthdate: birthdate

                })
            })


            if (!response.ok) {
                throw new Error(`Registration failed`)
            }
            let success = document.getElementById("success")
            success.innerHTML = `Konto skapat!`
        } catch (err) {
            console.error(err)
        }
    }

    document.getElementById("registerForm").reset()
}

