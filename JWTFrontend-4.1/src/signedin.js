document.addEventListener("DOMContentLoaded", () => {
    console.log(`DOM Loaded`)

    const token = localStorage.getItem("token")

    if(!token) {
        console.log(`Access denied`)
        return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    document.getElementById("userHeader").innerHTML = `Välkommen ${payload.username}`
});

