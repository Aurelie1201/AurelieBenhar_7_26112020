console.log(sessionStorage);
if(!sessionStorage.token){
    window.location.href = "login.html";
};


const btnDisconnection = document.getElementById("disconnect");
const wall = document.getElementsByClassName("wall")[0];

/**
 * disconnection
 */
btnDisconnection.onclick = ()=>{ sessionStorage.clear()};

const allMessages = async ()=>{
    const getAllMessages = await fetch(apiRoute("message"), {
        method: "GET", 
        headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token} 
    });
    
    const allMessages = await getAllMessages.json();
    const name = await getName(5);
    console.log(name);
    for(let i=0; i < allMessages.length; i++){
        let title = allMessages[i].title;
        let content = allMessages[i].content;
        let messageId = allMessages[i].id;
        let url = allMessages[i].attachment;
        let name = await getName(allMessages[i].userId);
        let nbComments = await getNbComments(messageId);
        let writeComments = "";
        
        if(nbComments === 0){
            writeComments = "aucun commentaire";
        } else{
            writeComments += nbComments +" commentaires";
        }
        if(!url){
            url = "../assetts/icon.png";
        }
        wall.innerHTML += '<a href="message.html?id='+ messageId +'"><div class="wall__message"><div class="wall__message--content">' +
                        '<h2>'+ title +'</h2>' +
                        '<p>'+ content +'</p>' +
                        '<span>Posté par '+ name + ', '+ writeComments +'</span></div>'+
                        '<img src="'+ url +'" alt="groupomania"/></div></a>';
    }
};

allMessages();