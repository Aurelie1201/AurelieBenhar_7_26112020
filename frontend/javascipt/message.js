console.log(sessionStorage);
if(!sessionStorage.token){
    window.location.href = "login.html";
};
const Url = new URL(window.location.href);
const id = Url.searchParams.get("id");

const oneMessage = async ()=>{
    const getOneMessage = await fetch(apiRoute("message")+id, {
        method: "GET", 
        headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token} 
    });

    const message = await getOneMessage.json();
    const title = message.title;
    const content = message.content;
    let url = message.attachment;
    const name = await getName(message.userId);
    const comments = await getAllComments(message.id);
    const h1 = document.getElementById("h1");
    const divMessage = document.getElementsByClassName("message")[0];
    const parentElement = document.getElementsByClassName("main-message")[0];
    const nextElement = document.getElementsByClassName("wall")[0];

    if(!url){
        url = "../assetts/icon.png";
    }
    console.log(comments);
    h1.innerHTML = name;
    divMessage.innerHTML = '<div class="message--content">'+
                            '<h2>'+ title + '</h2>'+
                            '<p>'+ content + '</p></div>'+
                            '<img src="'+ url +'" alt="image du message"/>';

    if (message.userId == sessionStorage.userId){
        const btnDelete = document.createElement('input');
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("value", "Supprimer votre message");
        btnDelete.classList.add("btnDelete");
        parentElement.insertBefore(btnDelete, nextElement);
        const body = JSON.stringify({"userId": message.userId});
        console.log("body"+body);
        btnDelete.onclick = () =>{
            fetch(apiRoute("message")+id, {
                method: "DELETE", 
                headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token},
                body: body
            })
            .then(response =>{
                console.log(response);
                alert("Votre message a bien été supprimé");
                window.location.href = "home.html";
            })
            .catch(error => console.log(error))
        };
    };
};

oneMessage();



