const apiRoute = (route) =>{
    const api ={
        signup: "http://localhost:8080/api/users/signup",
        login: "http://localhost:8080/api/users/login",
        getOneUser: "http://localhost:8080/api/users/",
        message: "http://localhost:8080/api/messages/",
        comment: "http://localhost:8080/api/comments/"
    }
    return api[route];
};

const getName = async (userId)=>{
    const getUser = await fetch(apiRoute("getOneUser")+userId, { 
        method: "GET", 
        headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token}
    });
    const user = await getUser.json();
    const firstName = user.firstName;
    const lastName = user.lastName;
    const name = firstName +" "+ lastName;
    return name;
};

const getNbComments = async (messageId) =>{
    const NbComments = await fetch(apiRoute("comment")+messageId, {
        method: "GET",
        headers: { Accept: "application/json", Authorization: "Bearer "+sessionStorage.token }
    });
    const comments = await NbComments.json();
    const countComments = comments.count;
    console.log(comments);
    return countComments;
};

const getAllComments = async (messageId) =>{
    const NbComments = await fetch(apiRoute("comment")+messageId, {
        method: "GET",
        headers: { Accept: "application/json", Authorization: "Bearer "+sessionStorage.token }
    });
    const allcomments = await NbComments.json();
    const comments = allcomments.rows;
    return comments;
};