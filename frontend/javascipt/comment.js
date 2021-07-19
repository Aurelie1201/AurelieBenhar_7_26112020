console.log(sessionStorage);
if(!sessionStorage.token){
    window.location.href = "login.html";
};
const Url = new URL(window.location.href);
const id = Url.searchParams.get("id");
const div = document.getElementsByClassName("main-comment")[0];


div.innerHTML = '<button class="btnDelete" type="button">Voulez-vous vraiment supprimer votre commentaire ?</button>';

document.getElementsByClassName("btnDelete")[0].onclick = () => {
    deleteComment(id);
};

const deleteComment = async (commentId) =>{
    const dltComment = await fetch(apiRoute("comment")+commentId, { method: "DELETE", headers: { Accept: "application/json", Authorization: "Bearer "+sessionStorage.token}});
    const response = await dltComment.json();
    if(response.message == "Comment deleted"){
        alert("Votre commentaire a bien été supprimé");
        window.location.href = "home.html";
    } else{
        alert("Vous n'êtes pas autorisés à supprimer ce commentaire");
    };
};