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