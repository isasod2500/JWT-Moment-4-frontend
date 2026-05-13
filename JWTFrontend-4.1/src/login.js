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

  //Dubbelkolla i fall e-post eller anv.namn redan är upptaget
  let result = await fetch(`https://jwt-moment-4-backend.onrender.com/api/users`, {
    headers: {
      "Content-Type": "application/json"
    }

  })

  let fetchResult = await result.json()

  const findUser = Object.values(fetchResult).some(entry =>
    username === entry.username || username === entry.email
  );
  if (!findUser) {
    errors.push(`Anv.namn/e-post eller lösenord är felaktigt.`)
  }

  if (errors.length > 0) {
    errors.forEach(error => {
      let errorLine = document.createElement("li")
      errorLine.innerHTML = error

      errorList.appendChild(errorLine)
      return;
    })
  }

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
      console.log(fetchResult)
      console.log(response.status)

    } catch (err) {
      console.error(err)
    }
  }
}
