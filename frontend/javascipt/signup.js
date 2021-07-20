console.log(apiRoute("signup"));

const form = document.getElementsByTagName('form')[0];

/**
 * form to signup
 */
form.addEventListener('submit', (event=>{
    const firstName = document.getElementById("prenom").value;
    const lastName = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    
    const user = { firstName: firstName, lastName: lastName, email: email, password: password };
    console.log(user);
    fetch(apiRoute("signup"), {
        method: "POST",
        headers:{ Accept: "application/json", "Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(response =>{
            switch (response.message){
                case "missing parameters": alert("Veuillez remplir tous les champs");
                break;
                case "email address invalid": alert("Veuillez entrer une adresse mail valide");
                break;
                case "password invalid": alert("Veuillez entrer un mot de passe d'au moins 8 caractères, les seules caractères spéciaux autorisés sont: ._-");
                break;
                case "word invalid": alert("Votre nom ou votre prénom ne sont pas valides");
                break;
                case "user already exists": alert("un utilisateur est déjà enregistré avec cette adresse mail");
                break;
                case "user created": {
                                        alert("Vous êtes bien enregistré, vous pouvez vous connecter");
                                        window.location.href = "login.html";
                                    };
                break;
                default: alert("un problème est survenu");
            }
        })
        .catch(error =>{console.log(error)});

    event.preventDefault();
}));