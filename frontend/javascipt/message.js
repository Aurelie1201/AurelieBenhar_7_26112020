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
    
    if(!url){
        url = "../assetts/icon.png";
    }
    console.log(comments);
    document.getElementById("h1").innerHTML = name;
    document.getElementsByClassName("message")[0].innerHTML = '<div class="message--content">'+
                                                            '<h2>'+ title + '</h2>'+
                                                            '<p>'+ content + '</p></div>'+
                                                            '<img src="'+ url +'" alt="image du message"/>'
};

oneMessage();