# Moment 4 - Frontend - JSON Web Tokens

## [Render - Frontend - lab4](https://jwt-moment-4-frontend.onrender.com)

Enkel webbplats med startsida för inloggning, undersida för registrering, en "Mina Sidor" och en länk däri som endast nås med giltig token.
Registrering och inlogging valideras med fälten innan fetch. Ytterligare en verifiering sker med en GET-fetch, för att jämföra lediga uppgifter (register) och att användarnamn finns (login).

Vid giltig token kan man nå "secret"-sidan som printar ut för- och efternamn, e-post och datum kontot skapades för inloggad användare.
