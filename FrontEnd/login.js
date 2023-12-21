
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        //Prepare a request to send to the API based on email and password
        let requestBody = {
            "email": email,
            "password": password
        }
        let requestUrl="http://localhost:5678/api/users/login"

        //Send the request to the API and get the Answer

        const reponse = await fetch(requestUrl, {
            method: 'POST', 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody) 
          });
        const result = await reponse.json()
          console.log(reponse)
          console.log(result)
          localStorage.setItem("token",result.token)

          if (reponse.ok){
            window.location.href="/"
          }
          else {
            alert('Invalid email or password. Please try again.');
          }
    });
});




