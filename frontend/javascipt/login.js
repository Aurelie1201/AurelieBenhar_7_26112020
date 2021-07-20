sessionStorage.clear();
const form = document.getElementsByTagName('form')[0];

/**
 * Form to login
 */
form.addEventListener('submit', (event=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if(!testMail(email) || !testPassword(password)){
        alert("Veuillez renseignez des champs corrects");
    } else{
        const user = { email: email, password: password };
        
        fetch(apiRoute("login"), {
            method: "POST",
            headers:{ Accept: "application/json", "Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(response =>{
            if(response.token){
                sessionStorage.setItem("userId", response.userId);
                sessionStorage.setItem("token", response.token);
                sessionStorage.setItem("isAdmin", response.isAdmin);
                window.location.href = "home.html";
            } else{
                switch (response.message){
                    case "wrong password": alert("Mot de passe incorrect");
                    break;
                    case "user do not exists": alert("Aucun utilisateur correspond à cette adresse mail");
                    break;
                    default: alert("Une erreur est survenue");
                };
            }
        }) 
        .catch(error =>{console.log(error)});
    };

    event.preventDefault();
}));

/**
 * Check an email with a valid appearance
 * @param {String} mail 
 * @returns {Boolean}
 */
 const testMail = (mail) =>{
    let regMail = new RegExp ("^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}");
    return regMail.test(mail);
};

/**
 *Checking a password containing at least 8 characters
 * and containing numbers, letters and only ._- as special characters
 * @param {String} password 
 * @returns {Boolean}
 */
const testPassword = (password) =>{
    let regPassword = new RegExp ("^[0-9a-zA-Z._-]{8,}");
    return regPassword.test(password);
};