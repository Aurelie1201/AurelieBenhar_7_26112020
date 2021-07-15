console.log(sessionStorage);
if(!sessionStorage.token){
    window.location.href = "login.html";
}

/**
 * disconnection
 */
const btnDisconnection = document.getElementById("disconnect");
btnDisconnection.onclick = ()=>{ sessionStorage.clear()};

