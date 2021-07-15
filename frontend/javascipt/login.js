const form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', (event=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log('coucou')
    if(!testMail(email) || !testPassword(password)){
        alert("Veuillez renseignez des champs corrects");
    } else{
        const user = { email: email, password: password };
        console.log(user);
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
                window.location.href = "home.html";
            } else{
                switch (response.message){
                    case "wrong password": alert("Mote de passe incorrect");
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
 * Vérification d'un mail d'une apparence valide
 * @param {String} mail 
 * @returns {Boolean}
 */
 const testMail = (mail) =>{
    let regMail = new RegExp ("^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}");
    console.log("coucou mail");
    return regMail.test(mail);
};

/**
 * Vérification d'un mot de passe contenant au moins 8 caractères
 * et contenant des chiffres, des lettres et seulement ._- comme caractères spéciaux
 * @param {String} password 
 * @returns {Boolean}
 */
const testPassword = (password) =>{
    let regPassword = new RegExp ("^[0-9a-zA-Z._-]{8,}");
    console.log("coucou password");
    return regPassword.test(password);
};