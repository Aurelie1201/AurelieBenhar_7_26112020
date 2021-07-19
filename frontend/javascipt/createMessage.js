console.log(sessionStorage);
if(!sessionStorage.token){
    window.location.href = "login.html";
};

const userId = sessionStorage.userId;
const form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', (event=>{
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const file = document.getElementById("file").files[0];
    let message = {};

    if(file){
        const formData = new FormData();
        formData.append('image', file);
        formData.append('message', JSON.stringify({
            title: title,
            content: content,
            userId: userId
        }));
        message = formData;
        // message = {title: title, content: content, userId: userId, file: file};
    } else{
        message = JSON.stringify( {title: title, content: content, userId: userId} );
    }
   
    fetch(apiRoute("message"), {
        method: "POST", 
        headers:{ "Content-Type": "application/json", Authorization: "Bearer "+sessionStorage.token},
        body: message
    })
        .then(response =>{
            alert("Votre message a bien été posté");
            window.location.href = "home.html";
        })
        .catch(error =>{console.log(error)});

    event.preventDefault();
}));