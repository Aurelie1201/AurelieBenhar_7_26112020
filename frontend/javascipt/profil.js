if(!sessionStorage.token){
    window.location.href = "login.html";
}

const modifyButton = document.getElementById("btnModifyPassword");
const deleteButton = document.getElementById("delete");
const userId = sessionStorage.userId;

/**
 * get datas of a user
 */
fetch(apiRoute("getOneUser")+userId, {
    method: "GET",
    headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token}
})
    .then(response => response.json())
    .then(response => {
        const firstName = response.firstName;
        const lastName = response.lastName;
        const email = response.email;
        const numberOfMessages = response.messagesCount;
        let plural = "";
        if(numberOfMessages > 1){
            plural = "s";
        }
        document.getElementById("name").innerHTML = firstName + " " + lastName;
        document.getElementById("email").innerHTML = email;
        document.getElementById("messages").innerHTML = "Vous avez posté " + numberOfMessages + " message" + plural;
    })
    .catch(error =>{console.log(error)});

/**
 * Function to delete a user
 */
deleteButton.onclick = () =>{
    fetch(apiRoute("getOneUser")+userId, {
        method: "DELETE",
        headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token},
        body: userId
    })
        .then(response =>{
            if(response.status == 200){
                alert("Votre compte a bien été supprimé");
                sessionStorage.clear();
                window.location.href = "index.html";
            } else{
                alert("une erreur est survenue")
            };
        })
        .catch(error =>{console.log(error)});
};

/**
 * Function to modify password
 */
modifyButton.onclick = () =>{
    const newPassword = document.getElementById("password").value;
    fetch(apiRoute("getOneUser")+userId, {
        method: "PUT",
        headers:{ Accept: "application/json", "Content-Type": "application/json", Authorization: "Bearer "+sessionStorage.token},
        body: JSON.stringify({newPassword})
    })
        .then(response => response.json())
        .then(response =>{
            if(response.message == "password changed"){
                alert("Votr mot de passe a bien été changé");
                window.location.href = "home.html";
            }
        })
        .catch(error => console.log(error));
};