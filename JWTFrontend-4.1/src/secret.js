document.addEventListener("DOMContentLoaded", () => {
    console.log(`DOM Loaded`)
    getSecret()
});

async function getSecret() {
    const token = localStorage.getItem("token");

    const response = await fetch("https://jwt-moment-4-backend.onrender.com/api/secret", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    let credentials = document.getElementById("credentials")

    let nameLine = document.createElement("p")
    let email = document.createElement("p")
    let created = document.createElement("p")

    let date = data.created.slice(0, 10)

    nameLine.innerHTML = `${data.firstname} ${data.surname}`
    email.innerHTML = `${data.email}`
    created.innerHTML = `Konto skapat: ${date}`
    
    credentials.appendChild(nameLine)
    credentials.appendChild(email)
    credentials.appendChild(created)

    console.log(data);
}