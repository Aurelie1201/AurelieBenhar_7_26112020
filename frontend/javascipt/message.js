if(!sessionStorage.token){
    window.location.href = "login.html";
};
const Url = new URL(window.location.href);
const id = Url.searchParams.get("id");

/**
 * get a message
 */
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
    
    h1.innerHTML = name;
    divMessage.innerHTML = '<div class="message--content">'+
                            '<h2>'+ title + '</h2>'+
                            '<p>'+ content + '</p></div>'+
                            '<img src="'+ url +'" alt="image du message"/>';

    if (message.userId == sessionStorage.userId || sessionStorage.isAdmin == "true"){
        const btnDelete = document.createElement('input');
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("value", "Supprimer votre message");
        btnDelete.classList.add("btnDelete");
        parentElement.insertBefore(btnDelete, nextElement);
        const body = JSON.stringify({"userId": message.userId});
        
        btnDelete.onclick = () =>{
            fetch(apiRoute("message")+id, {
                method: "DELETE", 
                headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token},
                body: body
            })
            .then(response =>{
                alert("Votre message a bien été supprimé");
                window.location.href = "home.html";
            })
            .catch(error => console.log(error))
        };
    };
};

/**
 * get all comments of a message
 */
const getComments = async ()=>{
    const allComments = await fetch(apiRoute("comment")+id, {
        method: "GET", 
        headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token} 
    });

    const allOfComments = await allComments.json();
    const comments = allOfComments.rows;
    const divComments = document.getElementsByClassName("allComments")[0];
    let writeHtml = "";
    
    for(i = 0; i < comments.length; i++){
        
        let userId = comments[i].userId;
        let content = comments[i].content;
        let date = new Date(comments[i].createdAt).toLocaleDateString('fr-FR', { year: "numeric", month: "long", day: "numeric" });
        let name = await getName(userId);
        
        if(userId == sessionStorage.userId || sessionStorage.isAdmin == "true"){
            writeHtml += '<div class="oneComment">'+
                        '<div>'+ content +'</div>'+
                        '<span>Posté par '+ name +' le '+ date +'</span>'+
                        '<a href="comment.html?id='+ comments[i].id +'">Supprimer votre commentaire</a></div>';
        } else{
            writeHtml += '<div class="oneComment">'+
                    '<div>'+ content +'</div>'+
                    '<span>Posté par '+ name +' le '+ date +'</span></div>';
        };
    };

    writeHtml += '<form id="formComment">'+
                '<label for="comment">Ajouter un commentaire :</label>'+
                '<textarea id="comment" name="comment" rows="4" cols="30" placeholder="Ecrivez votre commentaire"></textarea>'+
                '<input type="button" id="btnComment" value="Envoyer mon commentaire"/></form>'

    divComments.innerHTML = writeHtml;

    document.getElementById("btnComment").onclick = () =>{
        const userId = sessionStorage.userId;
        const messageId = id;
        const content = document.getElementById("comment").value;
        const comment = JSON.stringify({userId: userId, messageId: messageId, content: content}) ;
        
        fetch(apiRoute("comment"), { method: "POST",
            headers:{ "Content-Type": "application/json", Authorization: "Bearer "+sessionStorage.token},
            body: comment
        })
            .then(response => response.json())
            .then(response =>{
                if(response.message == "comment created"){
                    alert("Votre commentaire est posté");
                    location.reload();
                } else{
                    alert("Une erreur est survenue");
                };
            })
            .catch(error => console.log(error));
    };
};

oneMessage();
getComments();



