/*
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulated login validation - replace this with your authentication logic
        if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
            // If login is successful, redirect to the homepage (index.html)
            window.location.href = '/FrontEnd/index.html?name=sophie';
        } else {
            // If login fails, display an error message or take appropriate action
            alert('Invalid email or password. Please try again.');
        }
    });
});
*/

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
          
        //Depending on the answer (return code, userid and token), redirect to the home page with the userid and token in parameters
        //actual login validation 
     /*   if (returnCode == 200) {
            // If login is successful, redirect to the homepage (index.html)
            window.location.href = '/FrontEnd/index.html?name=sophie';
        } else {
            // If login fails, display an error message or take appropriate action
            alert('Invalid email or password. Please try again.');
        }
    */
    });
});




