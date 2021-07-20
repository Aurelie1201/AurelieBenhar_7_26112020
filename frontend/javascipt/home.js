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

/**
 * get all messages
 */
const allMessages = async ()=>{
    const getAllMessages = await fetch(apiRoute("message"), {
        method: "GET", 
        headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token} 
    });
    
    const allMessages = await getAllMessages.json();

    for(let i=0; i < allMessages.length; i++){
        let title = allMessages[i].title;
        let content = allMessages[i].content;
        let messageId = allMessages[i].id;
        let url = allMessages[i].attachment;
        let name = await getName(allMessages[i].userId);
        let nbComments = await getNbComments(messageId);
        let writeComments = "";
        let date = new Date(allMessages[i].createdAt).toLocaleDateString('fr-FR', { year: "numeric", month: "long", day: "numeric" });
        
        if(nbComments === 0 ){
            writeComments = "aucun commentaire";
        } else if(nbComments === 1){
            writeComments += nbComments +" commentaire";
            } else{
                writeComments += nbComments +" commentaires";
            }
        if(!url){
            url = "../assetts/icon.png";
        };
        wall.innerHTML += '<div class="wall__message"><div class="wall__message--content">' +
                        '<h2>'+ title +'</h2>' +
                        '<p>'+ content +'</p>' +
                        '<span>Posté par '+ name + ', le '+ date +', '+ writeComments +'</span>'+
                        '<a href="message.html?id='+ messageId +'" class="wall__message--addCom">Voir plus et commenter</a></div>'+
                        '<img src="'+ url +'" alt="image du message"/></div>';
    };
};

allMessages();