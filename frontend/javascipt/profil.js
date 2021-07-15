console.log(sessionStorage);
if(!sessionStorage.token){
    window.location.href = "login.html";
}

const deleteButton = document.getElementById("delete");

/**
 * affichage des données de l'utilisateur
 */
fetch(apiRoute("getOneUser")+sessionStorage.userId, {
    method: "GET",
    headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token}
})
    .then(response => response.json())
    .then(response => {
        const firstName = response.firstName;
        const lastName = response.lastName;
        const numberOfMessages = response.messagesCount;
        let plural = "";
        if(numberOfMessages > 1){
            plural = "s";
        }
        document.getElementById("name").innerHTML = firstName + " " + lastName;
        document.getElementById("messages").innerHTML = "Vous avez posté " + numberOfMessages + " message" + plural;
    })
    .catch(error =>{console.log(error)});

deleteButton.onclick = () =>{
    fetch(apiRoute("getOneUser")+sessionStorage.userId, {
        method: "DELETE",
        headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token}
    })
        .then(response =>{
            alert("Votre compte a bien été supprimé");
            sessionStorage.clear();
            window.location.href = "index.html";
        })
        .catch(error =>{console.log(error)});
};