 /* VARIABLES */
 const loginApi = "http://localhost:5678/api/users/login";

 document.getElementById("contactform").addEventListener("submit", handleSubmit);
 
 async function handleSubmit(event) {
     event.preventDefault();
 
     let user = {
         email: document.getElementById("email").value,
         password: document.getElementById("password").value
     };
 
     const errorMessageElement = document.getElementById("error-message");
 
     try {
         let response = await fetch(loginApi, {
             method: "POST",
             headers: {  
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(user)
         });
 
         if (!response.ok) {
             const errorText = await response.text();
             errorMessageElement.textContent = "Identifiant ou mot de passe incorrect.";
             errorMessageElement.style.display = "block";
             console.error(`Erreur: ${response.status} ${errorText}`);
             return;
         }
 
         let result = await response.json();
         localStorage.setItem("token", result.token);
         window.location.href = "index.html";
     } catch (error) {
         console.error("Erreur lors de la requête fetch :", error);
     }
 }