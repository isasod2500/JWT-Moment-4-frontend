document.addEventListener("DOMContentLoaded", () => {
  console.log(`DOM Loaded`)

  document.getElementById("login").addEventListener("click", login)
})

async function login(event) {
  //Sidan ska inte laddas om vid submit, endast redirect i fall allt godkänns
  event.preventDefault()

  //Array för errors
  const errors = [];

  let errorList = document.getElementById("errorList")
  errors.length = 0;
  errorList.innerHTML = "";

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  //Bägge fält måste fyllas i
  if (!username || !password) {
    errors.push(`Username and password must be filled in.`)
    return;
  }
  //Om errors inte är tom
  if (errors.length > 0) {
    errors.forEach(error => {
      let errorLine = document.createElement("li")
      errorLine.innerHTML = error

      errorList.appendChild(errorLine)
      return;
    })
  }

  //Om errors är tom, fetcha.
  if (errors.length === 0) {
    try {
      let response = await fetch(`https://jwt-moment-4-backend.onrender.com/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      if (!response.ok) {
        throw new Error(`Login failed`)
      }


      const fetchResult = await response.json();

      localStorage.setItem("token", fetchResult.token);

      const token = localStorage.getItem("token")
      const protResponse = await fetch(
        "https://jwt-moment-4-backend.onrender.com/signedin",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      //Om svaret är fel/null så nekas inloggning. 
      const protData = protResponse.json()
      if(!protResponse.ok) {
        throw new Error(`Protected route failed`)
      }
      window.location.href = "/signedin.html";

    } catch (err) {
      console.error(err)
    }
  }
}
