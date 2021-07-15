console.log(apiRoute("signup"));

const form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', (event=>{
    const firstName = document.getElementById("prenom").value;
    const lastName = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(!testMot(firstName) || !testMot(lastName) || !testMail(email || !testPassword(password))){
        alert("Veuillez renseignez des champs corrects");
    } else{
        const user = { firstName: firstName, lastName: lastName, email: email, password: password };
        console.log(user);
        fetch(apiRoute("signup"), {
            method: "POST",
            headers:{ Accept: "application/json", "Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(response =>{
            if(response.message === "user created"){
                alert("Votre inscription a bien été effectuée. Vous pouvez à présent vous connecter");
                window.location.href="login.html";
            } else if(response.message === "user already exists"){
                alert("Vous êtes déjà inscrit");
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

/**
 * Vérification d'un mot sans caractères spéciaux
 * @param {String} mot 
 * @returns {Boolean}
 */
const testMot = (mot) =>{
    let regMot = new RegExp ("^[a-zA-ZéèàçîïÉÈÎÏ '-]+$");

    return regMot.test(mot);
};