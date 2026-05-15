document.addEventListener("DOMContentLoaded", () => {
    console.log(`DOM Loaded`)

    const token = localStorage.getItem("token")
    //Saknas token nekas åtkomst.
    if(!token) {
        console.log(`Access denied`)
        return;
    }
    //Avkryptera token
    const payload = JSON.parse(atob(token.split(".")[1]));

    document.getElementById("userHeader").innerHTML = `Välkommen ${payload.username}`
});

