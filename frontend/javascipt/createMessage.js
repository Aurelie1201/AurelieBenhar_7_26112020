if(!sessionStorage.token){
    window.location.href = "login.html";
};

const userId = sessionStorage.userId;
const form = document.getElementsByTagName('form')[0];

/**
 * Form to post a message
 */
form.addEventListener('submit', (event=>{
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const file = document.getElementById("file").files[0];
    let message = {};
    let header = {};

    if(file){
        const formData = new FormData();
        formData.append('image', file);
        formData.append('message', JSON.stringify({
            title: title,
            content: content,
            userId: userId
        }));
        message = formData;
        header = { Accept: "application/json",  Authorization: "Bearer "+sessionStorage.token}
    } else{
        message = JSON.stringify( {title: title, content: content, userId: userId} );
        header = { "Content-Type": "application/json",  Authorization: "Bearer "+sessionStorage.token}
    }
   
    fetch(apiRoute("message"), {
        method: "POST", 
        headers: header,
        body: message
    })
        .then(response =>{
            alert("Votre message a bien été posté");
            window.location.href = "home.html";
        })
        .catch(error =>{console.log(error)});

    event.preventDefault();
}));